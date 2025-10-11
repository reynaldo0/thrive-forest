<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use App\Models\Fruit;

class FruitSeeder extends Seeder
{
    public function run(): void
    {
        $sourceDir = public_path('gameicon');
        $targetDir = storage_path('app/public/fruits/stages'); // 👈 gunakan path fisik langsung

        echo "🔍 Mengecek folder sumber: {$sourceDir}\n";

        // 1️⃣ Pastikan folder sumber ada
        if (!File::isDirectory($sourceDir)) {
            echo "❌ Folder sumber {$sourceDir} tidak ditemukan.\n";
            return;
        }

        // 2️⃣ Pastikan folder tujuan ada (dibuat secara fisik)
        if (!File::isDirectory($targetDir)) {
            File::makeDirectory($targetDir, 0755, true);
            echo "📁 Folder tujuan '{$targetDir}' dibuat.\n";
        } else {
            echo "📁 Folder tujuan '{$targetDir}' sudah ada.\n";
        }

        // 3️⃣ Ambil semua file PNG di folder sumber
        $files = File::files($sourceDir);

        if (empty($files)) {
            echo "⚠️ Tidak ada file di folder {$sourceDir}\n";
        }

        foreach ($files as $file) {
            $filename = $file->getFilename();
            $targetPath = $targetDir . '/' . $filename;

            if (!File::exists($targetPath)) {
                File::copy($file->getPathname(), $targetPath);
                echo "✅ Menyalin {$filename} ke {$targetPath}\n";
            } else {
                echo "ℹ️ File {$filename} sudah ada, dilewati.\n";
            }
        }

        // 4️⃣ Buah-buahan (contoh data)
        $fruits = [
            [
                'name' => 'Jeruk',
                'img' => 'gameicon/jeruk.png',
                'stages' => [
                    'tanah1.png',
                    'bibit_jeruk.png',
                    'tunas_jeruk.png',
                    'pohon_jeruk.png',
                    'pohonbesar_jeruk.png',
                ],
                'points' => 100,
            ],
            [
                'name' => 'Wortel',
                'img' => 'gameicon/wortel.png',
                'stages' => [
                    'tanah1.png',
                    'bibit_wortel.png',
                    'tunas_wortel.png',
                    'pohon_wortel.png',
                    'pohonbesar_wortel.png',
                ],
                'points' => 100,
            ],
        ];

        // 5️⃣ Simpan ke database
        foreach ($fruits as $fruitData) {
            $stages = array_map(fn($f) => 'storage/fruits/stages/' . $f, $fruitData['stages']);

            Fruit::updateOrCreate(
                ['name' => $fruitData['name']],
                [
                    'img' => $fruitData['img'],
                    'stages' => $stages,
                    'points' => $fruitData['points'],
                ]
            );
        }

        echo "🎉 Seeder selesai dijalankan.\n";
        echo "🔗 Jangan lupa jalankan: php artisan storage:link\n";
    }
}
