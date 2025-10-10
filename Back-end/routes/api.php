<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Public routes (accessible without login)
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Organizer routes
    Route::post('/events', [EventController::class, 'store']);    // Create event
    Route::put('/events/{event}', [EventController::class, 'update']); // Update event
    Route::delete('/events/{event}', [EventController::class, 'destroy']); // Delete event
    Route::get('/organizer/events', [EventController::class, 'organizerEvents']); // Organizer's events 

    // Registration routes (for users)
    Route::post('/events/{event}/register', [EventController::class, 'register']);
    Route::post('/events/{event}/unregister', [EventController::class, 'unregister']);
});


require __DIR__ . '/auth.php';
