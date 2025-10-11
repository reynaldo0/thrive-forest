<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SeminarSeeder::class,
            FruitSeeder::class,
            QuizSeeder::class,
            ArtikelSeeder::class,
            SchoolSeeder::class,
            UserSeeder::class,
            PlantSeeder::class,
        ]);

    // User::factory()->create([
    //         'name' => 'Test User',
    //         'email' => 'test@example.com',
    //     ]);
    }
}
