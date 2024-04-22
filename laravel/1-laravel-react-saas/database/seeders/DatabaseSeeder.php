<?php

namespace Database\Seeders;

use App\Models\Feature;
use App\Models\User;
use App\Models\Package;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Step',
            'email' => 'step@google.com',
            'password' => bcrypt('password')
        ]);

        Feature::create([
            'route_name' => 'feature1.index',
            'name' => 'Calculate Sum',
            'description' => 'Calculate sum of two numbers',
            'required_credits' => 1,
            'active' => true,
            'image' => 'https://uxwing.com/wp-content/themes/uxwing/download/user-interface/plus-round-icon.png'
        ]);

        Feature::create([
            'route_name' => 'feature2.index',
            'name' => 'Calculate Difference',
            'description' => 'Calculate difference of two numbers',
            'required_credits' => 3,
            'active' => true,
            'image' => 'https://uxwing.com/wp-content/themes/uxwing/download/user-interface/minus-round-icon.png'
        ]);

        Package::create([
            'name' => 'Basic',
            'price' => 5,
            'credits' => 20
        ]);

        Package::create([
            'name' => 'Silver',
            'price' => 20,
            'credits' => 100
        ]);

        Package::create([
            'name' => 'Gold',
            'price' => 50,
            'credits' => 500
        ]);
    }
}
