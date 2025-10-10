<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Mail\EventRegistrationMail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\EventUnregistrationMail;
use App\Notifications\EventRegistrationNotification;
use App\Notifications\EventUnregistrationNotification;

class EventController extends Controller
{
    /**
     * Display a listing of events with optional filters.
     */
    public function index(Request $request)
    {
        $query = Event::query();

        // Optional filters
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('location')) {
            $query->where('location', 'like', "%{$request->location}%");
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Eager load organizer relation
        $events = $query->with('organizer')
            ->latest()
            ->paginate(5);

        return response()->json([
            'status' => 'success',
            'events' => $events
        ]);
    }

    /**
     * Store a newly created event.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after_or_equal:start_time',
            'location' => 'required|string',
            'category' => 'required|string',
            'price' => 'nullable|numeric',
            'available_seats' => 'nullable|integer',
            'status' => 'nullable|in:draft,published,cancelled',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('events', 'public');
        }

        $event = Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'location' => $request->location,
            'category' => $request->category,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'price' => $request->price ?? 0,
            'available_seats' => $request->available_seats ?? 0,
            'status' => $request->status ?? 'draft',
            'image' => $path,
            'organizer_id' => auth()->id(),
        ]);

        return response()->json([
            'success' => true,
            'event' => $event
        ]);
    }


    /**
     * Display a specific event.
     */
    public function show(Event $event)
    {
        $event->load('organizer', 'attendees');

        return response()->json([
            'status' => 'success',
            'event' => $event
        ]);
    }

    /**
     * Update the specified event.
     */
    public function update(Request $request, Event $event)
    {
        $user = Auth::user();

        if (!$user || $user->id !== $event->organizer_id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not authorized to update this event'
            ], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|max:1000',
            'location' => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:100',
            'start_time' => 'sometimes|date|after:now',
            'end_time' => 'sometimes|date|after:start_time',
            'price' => 'sometimes|numeric|min:0',
            'available_seats' => 'sometimes|integer|min:1',
            'status' => 'sometimes|in:draft,published,cancelled'
        ]);

        $event->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Event updated successfully',
            'event' => $event
        ]);
    }

    /**
     * Remove the specified event.
     */
    public function destroy(Event $event)
    {
        $user = Auth::user();

        if (!$user || $user->id !== $event->organizer_id) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not authorized to delete this event'
            ], 403);
        }

        $event->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Event deleted successfully'
        ]);
    }

    /**
     * Register the authenticated user for an event.
     */
    public function register(Event $event)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Authentication required'
            ], 401);
        }

        try {
            DB::transaction(function () use ($event, $user) {
                // Lock event row to prevent race conditions
                $event = Event::lockForUpdate()->find($event->id);

                // Check if user is already registered
                if ($event->attendees()->where('user_id', $user->id)->exists()) {
                    throw new \Exception('You are already registered for this event');
                }

                // Check if seats are available
                if ($event->available_seats <= 0) {
                    throw new \Exception('No seats available');
                }

                // Attach user and decrement seat count
                $event->attendees()->attach($user->id);
                $event->decrement('available_seats');

                // Send email confirmation
                Mail::to($user->email)->send(new EventRegistrationMail($event));

                // Send in-app notification
                $user->notify(new EventRegistrationNotification($event));
            });
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 400);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'You have successfully registered for this event'
        ], 200);
    }

    /**
     * Unregister the authenticated user from an event.
     */
    public function unregister(Event $event)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Authentication required'
            ], 401);
        }

        // Check if user is registered
        if (!$event->attendees()->where('user_id', $user->id)->exists()) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not registered for this event'
            ], 400);
        }

        DB::transaction(function () use ($event, $user) {
            // Detach user and increment seats
            $event->attendees()->detach($user->id);
            $event->increment('available_seats');

            // Send email notification
            Mail::to($user->email)->send(new EventUnregistrationMail($event));

            // Send in-app notification
            $user->notify(new EventUnregistrationNotification($event));
        });

        return response()->json([
            'status' => 'success',
            'message' => 'You have successfully unregistered from the event'
        ], 200);
    }
}
