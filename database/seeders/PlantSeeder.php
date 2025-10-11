<?php

namespace Database\Seeders;

use App\Models\Fruit;
use App\Models\Plant;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PlantSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first(); // ambil user pertama

        if ($user) {
            $wortel = Fruit::where('name', 'Wortel')->first();
            $jeruk  = Fruit::where('name', 'Jeruk')->first();

            if ($wortel) {
                Plant::create([
                    'user_id'    => $user->id,
                    'fruit_id'   => $wortel->id, // foreign key
                    'grow_time'  => 120, // 2 menit
                    'planted_at' => Carbon::now(),
                    'harvested'  => false,
                    'boost_time' => 0,
                ]);
            }

            if ($jeruk) {
                Plant::create([
                    'user_id'    => $user->id,
                    'fruit_id'   => $jeruk->id, // foreign key
                    'grow_time'  => 180, // 3 menit
                    'planted_at' => Carbon::now()->subMinutes(1),
                    'harvested'  => false,
                    'boost_time' => 10, // misal pupuk aktif
                ]);
            }
        }
    }
}
