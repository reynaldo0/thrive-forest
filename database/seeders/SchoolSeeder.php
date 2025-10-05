<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schools = [
            ['name' => 'SD Harapan Bangsa', 'team_code' => 'SDHB01', 'points' => 0],
            ['name' => 'SMP Cemerlang', 'team_code' => 'SMPC01', 'points' => 0],
            ['name' => 'SMA Mandiri', 'team_code' => 'SMAM01', 'points' => 0],
            ['name' => 'SMK Kreatif', 'team_code' => 'SMKK01', 'points' => 0],
            ['name' => 'SD Nusantara', 'team_code' => 'SDN01', 'points' => 0],
        ];

        foreach ($schools as $school) {
            DB::table('schools')->insert([
                'name' => $school['name'],
                'team_code' => $school['team_code'],
                'points' => $school['points'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
