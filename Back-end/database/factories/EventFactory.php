<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'organizer_id' => \App\Models\User::factory(),
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(3),
            'location' => $this->faker->city,
            'category' => $this->faker->randomElement([
                'Music',
                'Sports',
                'Technology',
                'Education',
                'Art',
                'Networking',
                'Health'
            ]),
            'start_time' => $this->faker->dateTimeBetween('+1 days', '+10 days'),
            'end_time' => function (array $attributes) {
                return $this->faker->dateTimeBetween(
                    $attributes['start_time'],
                    $attributes['start_time']->modify('+3 hours')
                );
            },
            'price' => $this->faker->randomFloat(2, 0, 200),
            'status' => $this->faker->randomElement(['draft', 'published', 'cancelled']),
            'available_seats' => $this->faker->numberBetween(10, 500),
        ];
    }
}
