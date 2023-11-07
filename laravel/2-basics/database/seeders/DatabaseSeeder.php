<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Listing;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        # php artisan db:seed
        # php artisan migrate:refresh --seed

        \App\Models\User::factory(5)->create();
        
        /* \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]); */

        Listing::create([
            'title' => 'Laravel developer',
            'tags' => 'laravel, javascript',
            'company' => 'Acme Crop',
            'location' => 'Boston, MA',
            'email' => 'mihal@dom.com',
            'website' => 'acme.com',
            'description' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde vero autem animi omnis esse aut. Earum repellat, ex et dolor officiis modi facere praesentium dolores architecto. Nobis tenetur nulla deserunt.'
        ]);

        Listing::create([
            'title' => 'Laravel developer 2',
            'tags' => 'laravel, javascript',
            'company' => 'Acme Crop',
            'location' => 'Boston, MA',
            'email' => 'mihal@dom.com',
            'website' => 'acme.com',
            'description' => 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde vero autem animi omnis esse aut. Earum repellat, ex et dolor officiis modi facere praesentium dolores architecto. Nobis tenetur nulla deserunt.'
        ]);
    }
}
