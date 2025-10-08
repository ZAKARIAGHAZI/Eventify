<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'organizer_id',
        'title',
        'description',
        'location',
        'category',
        'start_time',
        'end_time',
        'price',
        'status',
        'available_seats',
    ];

    // Each event belongs to an organizer (user)
    public function organizer()
    {
        return $this->belongsTo(User::class, 'organizer_id');
    }

    // Each event can have many attendees (users)
    public function attendees()
    {
        return $this->belongsToMany(User::class, 'events_users')
            ->withTimestamps();
    }
}
