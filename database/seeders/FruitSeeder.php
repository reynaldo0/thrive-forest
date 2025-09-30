<?php

namespace Database\Seeders;

use App\Models\Fruit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FruitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Fruit::create([
            'name' => 'Wortel',
            'img' => '/gameicon/wortel.png',
            'stages' => [
                '/gameicon/tanah1.png',
                '/gameicon/bibit_wortel.png',
                '/gameicon/tunas_wortel.png',
                '/gameicon/pohon_wortel.png',
                '/gameicon/pohonbesar_wortel.png',
            ],
        ]);

        Fruit::create([
            'name' => 'Jeruk',
            'img' => '/gameicon/jeruk.png',
            'stages' => [
                '/gameicon/tanah1.png',
                '/gameicon/bibit_jeruk.png',
                '/gameicon/tunas_jeruk.png',
                '/gameicon/pohon_jeruk.png',
                '/gameicon/pohonbesar_jeruk.png',
            ],
        ]);
    }
}
