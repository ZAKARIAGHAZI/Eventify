<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Event::query();

        // Optional filters
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }
        if ($request->has('location')) {
            $query->where('location', 'like', "%{$request->location}%");
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Eager load organizer relationship (if exists)
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
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Authentication required'
            ], 401);
        }

        if (!$user->hasRole('organizer')) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not authorized to create an event'
            ], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'location' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
            'price' => 'required|numeric|min:0',
            'available_seats' => 'required|integer|min:1',
        ]);

        // Prevent duplicates (same title & time)
        $exists = Event::where('title', $validated['title'])
            ->where('start_time', $validated['start_time'])
            ->where('end_time', $validated['end_time'])
            ->exists();

        if ($exists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Event already exists'
            ], 409);
        }

        $validated['organizer_id'] = $user->id;

        $event = Event::create($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Event created successfully',
            'event' => $event
        ], 201);
    }

    /**
     * Display the specified event.
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
        ]);

        $event->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Event updated successfully',
            'event' => $event
        ]);
    }

    /**
     * Remove the specified event from storage.
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
     * Register the authenticated user to an event.
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

        if ($event->attendees()->where('user_id', $user->id)->exists()) {
            return response()->json([
                'status' => 'error',
                'message' => 'You are already registered for this event'
            ], 409);
        }

        if ($event->available_seats <= 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'No seats available'
            ], 400);
        }

        $event->attendees()->attach($user->id);

        return response()->json([
            'status' => 'success',
            'message' => 'Registered successfully'
        ]);
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

        $event->attendees()->detach($user->id);

        return response()->json([
            'status' => 'success',
            'message' => 'Unregistered successfully'
        ]);
    }
}
