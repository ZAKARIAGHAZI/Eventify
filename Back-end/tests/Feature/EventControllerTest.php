<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use App\Mail\EventRegistrationMail;
use App\Mail\EventUnregistrationMail;
use App\Notifications\EventRegistrationNotification;
use App\Notifications\EventUnregistrationNotification;

class EventControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_list_events()
    {
        Event::factory()->count(3)->create();

        $response = $this->getJson('/api/events');

        $response->assertStatus(200)
            ->assertJsonStructure(['status', 'events']);
    }

    /** @test */
    public function authenticated_user_can_create_event()
    {
        $user = User::factory()->create();

        $data = [
            'title' => 'Music Festival',
            'description' => 'A great event',
            'location' => 'Casablanca',
            'category' => 'Music',
            'start_time' => now()->addDays(2)->toDateTimeString(),
            'end_time' => now()->addDays(3)->toDateTimeString(),
            'price' => 50,
            'available_seats' => 100,
            'status' => 'published'
        ];

        $response = $this->actingAs($user)->postJson('/api/events', $data);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'event' => [
                    'title' => 'Music Festival'
                ]
            ]);

        $this->assertDatabaseHas('events', [
            'title' => 'Music Festival',
            'organizer_id' => $user->id,
        ]);
    }

    /** @test */
    public function user_cannot_update_event_they_do_not_own()
    {
        $user = User::factory()->create();
        $event = Event::factory()->create();

        $response = $this->actingAs($user)
            ->putJson("/api/events/{$event->id}", [
                'title' => 'Updated Title'
            ]);

        $response->assertStatus(403)
            ->assertJson(['status' => 'error']);
    }

    /** @test */
    public function authorized_user_can_update_their_event()
    {
        $user = User::factory()->create();
        $event = Event::factory()->create(['organizer_id' => $user->id]);

        $response = $this->actingAs($user)
            ->putJson("/api/events/{$event->id}", [
                'title' => 'Updated Event'
            ]);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Event updated successfully'
            ]);

        $this->assertDatabaseHas('events', ['title' => 'Updated Event']);
    }

    /** @test */
    public function authorized_user_can_delete_their_event()
    {
        $user = User::factory()->create();
        $event = Event::factory()->create(['organizer_id' => $user->id]);

        $response = $this->actingAs($user)->deleteJson("/api/events/{$event->id}");

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'success',
                'message' => 'Event deleted successfully'
            ]);

        $this->assertDatabaseMissing('events', ['id' => $event->id]);
    }

    /** @test */
    public function it_registers_user_for_event()
    {
        Mail::fake();
        Notification::fake();

        $user = User::factory()->create();
        $event = Event::factory()->create([
            'available_seats' => 2
        ]);

        $response = $this->actingAs($user)->postJson("/api/events/{$event->id}/register");

        $response->assertStatus(200)
            ->assertJson(['status' => 'success']);

        $this->assertDatabaseHas('event_user', [
            'event_id' => $event->id,
            'user_id' => $user->id
        ]);

        Mail::assertSent(EventRegistrationMail::class);
        Notification::assertSentTo($user, EventRegistrationNotification::class);
    }

    /** @test */
    public function it_unregisters_user_from_event()
    {
        Mail::fake();
        Notification::fake();

        $user = User::factory()->create();
        $event = Event::factory()->create([
            'available_seats' => 2
        ]);

        $event->attendees()->attach($user->id);

        $response = $this->actingAs($user)->postJson("/api/events/{$event->id}/unregister");

        $response->assertStatus(200)
            ->assertJson(['status' => 'success']);

        $this->assertDatabaseMissing('event_user', [
            'event_id' => $event->id,
            'user_id' => $user->id
        ]);

        Mail::assertSent(EventUnregistrationMail::class);
        Notification::assertSentTo($user, EventUnregistrationNotification::class);
    }
}
