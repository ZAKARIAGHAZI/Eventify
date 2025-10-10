<!DOCTYPE html>
<html>
<head>
    <title>Unregistration Confirmation</title>
</head>
<body>
    <h2>Hello,</h2>
    <p>You have successfully unregistered from the event:</p>
    <p><strong>{{ $event->title }}</strong></p>
    <p>Date: {{ $event->start_time->format('d M Y H:i') }}</p>
    <p>Location: {{ $event->location }}</p>
    <p>We hope to see you at another event soon!</p>
</body>
</html>
