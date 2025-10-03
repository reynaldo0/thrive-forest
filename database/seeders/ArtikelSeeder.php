<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Artikel;

class ArtikelSeeder extends Seeder
{
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Padi Toleran Garam',
                'desc'  => 'Para ilmuwan dari Institut Bose di Kolkata, India, mengembangkan varietas padi transgenik.',
                'img'   => '/images/article/article1.png',
                'tag'   => 'India',
            ],
            [
                'title' => 'Beras Daging',
                'desc'  => 'Inovasi peneliti Korea Selatan yang menumbuhkan sel daging sapi dan lemak ikan di dalam butiran beras.',
                'img'   => '/images/article/article2.png',
                'tag'   => 'Korea',
            ],
            [
                'title' => 'Melon Hitam',
                'desc'  => 'Mahasiswi UB berhasil menciptakan varietas melon hitam melalui rekayasa genetika dengan sinar gamma.',
                'img'   => '/images/article/article3.png',
                'tag'   => 'Univ. Brawijaya',
            ],
        ];

        foreach ($articles as $article) {
            Artikel::create($article);
        }
    }
}
