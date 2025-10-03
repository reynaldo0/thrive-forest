<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeminarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('seminars')->insert([
            [
                'title' => 'Seminar Gizi Seimbang',
                'date' => '2025-10-10',
                'location' => 'Aula SMKN 24 Jakarta',
                'description' => 'Membahas pentingnya gizi seimbang bagi remaja untuk menunjang prestasi belajar.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Seminar Inovasi Pertanian',
                'date' => '2025-11-05',
                'location' => 'Gedung Pertanian Nasional',
                'description' => 'Membahas teknologi pertanian terbaru untuk meningkatkan produktivitas pangan.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
