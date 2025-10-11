<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShopController extends Controller
{
    public function buy(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'item' => 'required|string|in:fertilizer,pot,energy,boots_pupuk,fertilizer_boost',
        ]);

        $success = false;
        $message = '';
        $cost = 0;

        switch ($request->item) {
            case 'fertilizer':
                $cost = 50;
                if ($user->points >= $cost) {
                    $user->decrement('points', $cost);
                    // simpan efek fertilizer 1x pakai
                    $user->temporary_fertilizer = 1; // 1 artinya punya 1x pakai
                    $user->save();
                    $success = true;
                    $message = 'Fertilizer dibeli! Gunakan untuk mempercepat pertumbuhan (+2 stage, 1x pakai).';
                }
                break;

            case 'pot':
                $cost = 100;
                if ($user->points >= $cost) {
                    $user->decrement('points', $cost);
                    $user->increment('pot_capacity', 2);
                    $user->save();
                    $success = true;
                    $message = 'Pot lebih besar dibeli! Kapasitas tanam bertambah.';
                }
                break;

            case 'energy':
                $cost = 20;
                $gain = 5;
                if ($user->points >= $cost) {
                    $user->decrement('points', $cost);
                    $user->energy = min($user->energy + $gain, $user->max_energy);
                    $user->save();
                    $success = true;
                    $message = "Energi +{$gain} berhasil dibeli!";
                }
                break;

            case 'boots_pupuk':
                $cost = 75;
                if ($user->points >= $cost) {
                    $user->decrement('points', $cost);
                    $user->increment('boots_pupuk', 1); // item 1x pakai
                    $user->save();
                    $success = true;
                    $message = 'Boots pupuk dibeli! Dapat digunakan untuk skip +3 stage (1x pakai).';
                }
                break;

            case 'fertilizer_boost':
                $cost = 75;
                if ($user->points >= $cost) {
                    $user->decrement('points', $cost);
                    $user->increment('fertilizer_boost', 1);
                    $user->save();
                    $success = true;
                    $message = 'Fertilizer Boost dibeli! Bisa mempercepat pertumbuhan tanaman.';
                }
                break;
        }

        if (! $success) {
            return response()->json([
                'success' => false,
                'message' => 'Poin tidak cukup atau item tidak valid.',
            ], 400);
        }

        return response()->json([
            'success' => true,
            'message' => $message,
            'points' => $user->points,
            'energy' => $user->energy,
            'max_energy' => $user->max_energy,
            'fertilizer' => $user->fertilizer,
            'pot_capacity' => $user->pot_capacity,
            'boots_pupuk' => $user->boots_pupuk ?? 0,
            'temporary_fertilizer' => $user->temporary_fertilizer ?? 0,
        ]);
    }
}
