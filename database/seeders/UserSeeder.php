<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan SchoolSeeder sudah dijalankan
        $schools = DB::table('schools')->get();

        if ($schools->isEmpty()) {
            $this->command->info('Seeder sekolah belum dijalankan. Jalankan SchoolSeeder dulu.');
            return;
        }

        // Ambil semua school_id
        $schoolIds = $schools->pluck('id')->toArray();

        // Data nama realistis
        $names = [
            'Ahmad Fauzi',
            'Siti Aminah',
            'Budi Santoso',
            'Dewi Lestari',
            'Rizky Pratama',
            'Indah Permatasari',
            'Agus Setiawan',
            'Lina Marlina',
            'Hendra Wijaya',
            'Nina Kurniawati'
        ];

        foreach ($names as $index => $fullName) {
            $email = strtolower(str_replace(' ', '.', $fullName)) . '@example.com';

            // Ambil school_id secara bergantian
            $schoolId = $schoolIds[$index % count($schoolIds)];

            DB::table('users')->insert([
                'name' => $fullName,
                'email' => $email,
                'role' => 'user',
                'password' => Hash::make('password'),
                'school_id' => $schoolId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('10 user berhasil di-seeder dengan school_id yang sesuai.');
    }
}
