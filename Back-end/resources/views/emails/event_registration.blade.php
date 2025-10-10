<!DOCTYPE html>
<html>
<head>
    <title>Event Registration Confirmation</title>
</head>
<body>
    <h2>Hello!</h2>
    <p>You have successfully registered for the event:</p>
    <p><strong>{{ $event->title }}</strong></p>
    <p>Date: {{ $event->start_time->format('d M Y H:i') }}</p>
    <p>Location: {{ $event->location }}</p>
    <p>Thank you for joining Eventify!</p>
</body>
</html>
