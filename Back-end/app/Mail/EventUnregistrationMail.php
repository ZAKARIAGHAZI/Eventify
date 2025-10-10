<?php

    namespace App\Mail;

    use App\Models\Event;
    use Illuminate\Bus\Queueable;
    use Illuminate\Mail\Mailable;
    use Illuminate\Queue\SerializesModels;

    class EventUnregistrationMail extends Mailable
    {
        use Queueable, SerializesModels;

        public $event;

        public function __construct(Event $event)
        {
            $this->event = $event;
        }

        public function build()
        {
            return $this->subject("You have unregistered from {$this->event->title}")
            ->view('emails.event_unregistration');
        }
    }
