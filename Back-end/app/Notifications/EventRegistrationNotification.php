<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Event;

class EventRegistrationNotification extends Notification
{
    use Queueable;

    protected $event;

    public function __construct(Event $event)
    {
        $this->event = $event;
    }

    // Define the channels
    public function via($notifiable)
    {
        return ['database']; // database for in-app
    }

    // Define the database payload
    public function toDatabase($notifiable)
    {
        return [
            'event_id' => $this->event->id,
            'title' => $this->event->title,
            'message' => 'You have successfully registered for this event.',
            'start_time' => $this->event->start_time,
            'location' => $this->event->location,
        ];
    }

    // Define the mail message
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Event Registration Confirmation')
            ->greeting('Hello ' . $notifiable->name)
            ->line('You have successfully registered for the event: ' . $this->event->title)
            ->line('Start time: ' . $this->event->start_time)
            ->line('Location: ' . $this->event->location)
            ->action('View Event', url('/events/' . $this->event->id))
            ->line('Thank you for using our application!');
    }
}
