<!DOCTYPE html>
<html>
<head>
    <title>Event Registration Confirmation</title>
</head>
<body>
    <h2>Hello!</h2>
    <p>You have successfully registered for the event:</p>
    <p><strong>{{ $event->title }}</strong></p>
    <p>Date: {{ \Carbon\Carbon::parse($event->start_time)->format('Y M d H:i') }}</p>
    <p>Location: {{ $event->location }}</p>
    <p>Thank you for joining Eventify!</p>
</body>
</html>
