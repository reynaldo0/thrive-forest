<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use App\Models\Fruit;

class FruitSeeder extends Seeder
{
    public function run(): void
    {
        // Pastikan folder tujuan ada
        Storage::makeDirectory('public/fruits/stages');

        $fruits = [
            [
                'name' => 'Jeruk',
                'img' => 'gameicon/jeruk.png',
                'stages' => [
                    'gameicon/tanah1.png',
                    'gameicon/bibit_jeruk.png',
                    'gameicon/tunas_jeruk.png',
                    'gameicon/pohon_jeruk.png',
                    'gameicon/pohonbesar_jeruk.png',
                ],
                'points' => 100,
            ],
            [
                'name' => 'Wortel',
                'img' => 'gameicon/wortel.png',
                'stages' => [
                    'gameicon/tanah1.png',
                    'gameicon/bibit_wortel.png',
                    'gameicon/tunas_wortel.png',
                    'gameicon/pohon_wortel.png',
                    'gameicon/pohonbesar_wortel.png',
                ],
                'points' => 100,
            ],
        ];

        foreach ($fruits as $fruitData) {
            $newStages = [];

            foreach ($fruitData['stages'] as $path) {
                $filename = basename($path);
                $targetPath = 'public/fruits/stages/' . $filename;

                // cek dulu kalau belum ada, baru salin
                if (!Storage::exists($targetPath)) {
                    $sourcePath = public_path($path);

                    if (file_exists($sourcePath)) {
                        Storage::put($targetPath, file_get_contents($sourcePath));
                    }
                }

                // Simpan path publik baru
                $newStages[] = 'storage/fruits/stages/' . $filename;
            }

            Fruit::updateOrCreate(
                ['name' => $fruitData['name']],
                [
                    'img' => $fruitData['img'],
                    'stages' => ($newStages),
                    'points' => $fruitData['points'],
                ]
            );
        }
    }
}
