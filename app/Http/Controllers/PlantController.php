<?php

namespace App\Http\Controllers;

use App\Models\Plant;
use App\Models\Fruit;
use App\Models\Inventory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class PlantController extends Controller
{
    // 🌱 Tampilkan lahan usereb
    public function index()
    {
        $user = Auth::user();
        $plants = $user->plants()
            ->where('harvested', false)
            ->with('fruit')
            ->get();


        return back()->with([
            'plants' => $plants,
            'pot_capacity' => $user->pot_capacity,
            'energy' => $user->energy,
            'fertilizer' => $user->fertilizer,
        ]);
    }

    // 🌱 Tanam buah
    public function store(Request $request)
    {
        $user = Auth::user();

        if ($user->plants()->where('harvested', false)->count() >= $user->pot_capacity) {
            return response()->json(['error' => 'Pot penuh!'], 422);
        }

        $fruit = Fruit::findOrFail($request->fruit_id);

        $plant = $user->plants()->create([
            'fruit_id'   => $fruit->id,
            'harvested'  => false,
            'planted_at' => now(),
            'stage'      => 0,
            'grow_time'  => 30, // contoh default
        ]);

        return response()->json([
            'message' => 'Berhasil menanam!',
            'plant'   => $plant->load('fruit'),
        ]);
    }


    // 💧 Siram tanaman
    public function water($id)
    {
        $user = Auth::user();
        $plant = $user->plants()->findOrFail($id);

        if ($user->energy <= 0) {
            return response()->json(['error' => 'Energi habis!'], 400);
        }

        $user->decrement('energy', 1);

        // efek fertilizer atau boots_pupuk
        if ($user->temporary_fertilizer > 0) {
            $plant->stage = min($plant->stage + 2, 4);
            $user->temporary_fertilizer = 0; // habis
            $user->save();
        } elseif ($user->boots_pupuk > 0) {
            $plant->stage = min($plant->stage + 3, 4);
            $user->decrement('boots_pupuk', 1);
        } else {
            $plant->stage = min($plant->stage + 1, 4);
        }

        $plant->save();

        return response()->json([
            'success' => true,
            'plant' => $plant->load('fruit'),
            'energy' => $user->energy,
        ]);
    }
    // 🍊 Panen
    public function harvest(Request $request)
    {
        $plant = Plant::with('fruit')->findOrFail($request->plant_id);
        $user = $request->user();

        if ($plant->stage < 4) {
            return response()->json(['error' => 'Tanaman belum siap dipanen'], 400);
        }

        $points = $plant->fruit->points;

        DB::transaction(function () use ($user, $plant, $points) {
            // Tambah poin user
            $user->increment('points', $points);

            // Tandai tanaman sebagai sudah dipanen
            $plant->update(['harvested' => true]);

            // Masukkan buah ke inventory
            $inventory = Inventory::firstOrCreate(
                ['user_id' => $user->id, 'fruit_id' => $plant->fruit->id],
                ['quantity' => 0]
            );
            $inventory->increment('quantity');

            // ✅ Jika user punya school_id → tambahkan poin juga ke sekolah
            if ($user->school_id) {
                $user->school()->increment('points', $points);
            }
        });

        return response()->json([
            'points' => $user->points,
            'fruit' => [
                'id'     => $plant->fruit->id,
                'name'   => $plant->fruit->name,
                'img'    => $plant->fruit->img,
                'points' => $plant->fruit->points,
            ],
            'inventory' => $user->inventories()->with('fruit')->get(),
        ]);
    }


    // 🎁 Donasi (menghapus 1 buah dari inventori user)
    public function donate(Request $request)
    {
        $user = $request->user();

        // Ambil buah pertama yang quantity > 0
        $inventory = $user->inventories()->where('quantity', '>', 0)->first();

        if (!$inventory) {
            return response()->json([
                'error' => 'Tidak ada buah untuk didonasikan!',
            ], 400);
        }

        // Kurangi jumlah buah
        $inventory->quantity -= 1;

        if ($inventory->quantity <= 0) {
            $inventory->delete();
        } else {
            $inventory->save();
        }

        // Update progress global di cache
        $totalDonated = Cache::increment('global_donation', 1);

        return response()->json([
            'success' => 'Donasi diterima!',
            'inventory' => $user->inventories()->with('fruit')->get(),
            'totalDonated' => $totalDonated,
        ]);
    }



    public function useBoots($plantId)
    {
        $user = Auth::user();
        $plant = $user->plants()->where('id', $plantId)->first();

        if (!$plant) {
            return response()->json(['error' => 'Tanaman tidak ditemukan'], 404);
        }

        if ($user->boots_pupuk <= 0) {
            return response()->json(['error' => 'Kamu tidak punya boots pupuk'], 400);
        }

        // pakai boots
        $user->decrement('boots_pupuk', 1);

        // stage naik +2 tapi tidak boleh melebihi total stages
        $maxStage = $plant->fruit->stages;
        $plant->stage = min($plant->stage + 2, $maxStage);
        $plant->save();

        return response()->json([
            'message' => 'Boots pupuk digunakan! Stage tanaman naik +2',
            'plant' => $plant,
            'boots_left' => $user->boots_pupuk,
        ]);
    }

    // ❌ Hapus tanaman
    public function destroy(Plant $plant)
    {
        $user = Auth::user();
        if ($plant->user_id !== $user->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $plant->delete();

        return response()->json([
            'success' => 'Tanaman dicabut',
        ]);
    }
}
