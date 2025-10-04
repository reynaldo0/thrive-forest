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
                'desc'  => 'Para ilmuwan dari Institut Bose di Kolkata, India, mengembangkan varietas padi transgenik yang toleran dengan garam, dalam kondisi rumah kaca, menunjukkan pertumbuhan dan hasil gabah yang normal.',
                'img'   => '/images/article/article1.png',
                'tag'   => 'IRRI',
            ],
            [
                'title' => 'Beras Daging',
                'desc'  => 'beras hasil inovasi peneliti Korea Selatan yang mengandung protein hewani, yaitu sel daging sapi dan lemak ikan yang ditumbuhkan di dalam butiran beras melalui proses kultur sel di laboratorium.',
                'img'   => '/images/article/article2.png',
                'tag'   => 'BBC',
            ],
            [
                'title' => 'Melon Hitam',
                'desc'  => 'Mahasiswi program doktoral Universitas Brawijaya (UB) bernama Astrid Ika Paramitha berhasil menciptakan varietas melon hitam melalui rekayasa genetika dengan metode iradiasi sinar gamma.',
                'img'   => '/images/article/article3.png',
                'tag'   => 'Univ. Brawijaya',
            ],
            [
                'title' => 'Melon transgenik',
                'desc'  => 'Aplikasi telah di Kembangkan pada Tanaman Transgenik. Beberapa tanaman transgenik telah diaplikasikan untuk menghasilkan tiga macam sifat unggul, yaitu tahan hama, tahan herbisida, dan tidak mudah busuk.',
                'img'   => '/images/article/article1.png',
                'tag'   => 'Mutiarosa',
            ],
            [
                'title' => 'Kapas BT',
                'desc'  => 'kapas menghasilkan toksin yang aktivitasnya hampir terbatas hanya pada hama ulat (Lepidoptera) dan  galur Bacillus thuringiensis lainnya memiliki gen yang mengkode toksin dengan aktivitas insektisida.',
                'img'   => '/images/article/article2.png',
                'tag'   => 'Utcrops',
            ],
            [
                'title' => 'Tebu PRG NXI-4T',
                'desc'  => 'Tebu Produk Rekayasa Genetika ( PRG ) toleran kekeringan klon NXI-4T merupakan varietas tebu baru hasil perakitan melalui proses transformasi genetika menggunakan bakteri Agrobacterium temefaciens.',
                'img'   => '/images/article/article3.png',
                'tag'   => 'Pgpradjekan',
            ],
            [
                'title' => 'Beras Emas',
                'desc'  => 'Beras Emas hadir sebagai alternatif  pangan yang dikembangkan pemerintah . Rekayasa genetika sekarang memainkan peran penting dalam memodifikasi susunan genetik organisme hidup untuk memenuhi kebutuhan manusia.',
                'img'   => '/images/article/article3.png',
                'tag'   => 'IPB',
            ],
        ];

        foreach ($articles as $article) {
            Artikel::create($article);
        }
    }
}
