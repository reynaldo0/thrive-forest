<?php

namespace App\Http\Controllers;

use App\Models\Plant;
use App\Models\UserPoint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GameController extends Controller
{
    public function index(Request $request)
    {
        $plants = $request->user()->plants()->get();

        return inertia('Dashboard/Game/GamePage', [
            'plants' => $plants,
        ]);
    }

    public function plant(Request $request)
    {
        $user = $request->user();

        Plant::create([
            'user_id' => $user->id,
            'type' => 'bibit',
            'grow_time' => 20, // 1 menit untuk testing
            'planted_at' => now(),
        ]);

        return back()->with('success', 'Bibit berhasil ditanam!');
    }

    public function harvest(Plant $plant)
    {
        $user = Auth::user();

        // Pastikan tanaman milik user ini
        if ($plant->user_id !== $user->id) {
            abort(403, 'Tidak boleh panen tanaman orang lain.');
        }

        // Cek sudah dipanen atau belum
        if ($plant->harvested) {
            return back()->with('error', 'Tanaman ini sudah dipanen.');
        }

        // Tandai tanaman sudah dipanen
        $plant->update(['harvested' => true]);

        // Tambahkan poin untuk user
        UserPoint::create([
            'user_id' => $user->id,
            'points' => 10,
            'reason' => 'Panen tanaman',
        ]);

        // Tambahkan poin ke sekolah user
        if ($user->school) {
            $user->school->increment('points', 10);
        }

        return back()->with('success', 'Berhasil panen! +10 poin untuk sekolahmu 🌟');
    }
}
