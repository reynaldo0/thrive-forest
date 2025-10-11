<?php

namespace App\Http\Controllers;

use App\Models\Fruit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FruitController extends Controller
{
    public function index()
    {
        $fruits = Fruit::all();
        return Inertia::render('Dashboard/Fruits/Index', [
            'fruits' => $fruits,
            'success' => session('success'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Fruits/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'points' => 'required|integer|min:1',
            'img' => 'required|file|image|max:2048',
            'stages.*' => 'required|file|image|max:2048',
        ]);

        $imgPath = $request->file('img')->store('fruits/icons', 'public');

        $stages = [];
        if ($request->hasFile('stages')) {
            foreach ($request->file('stages') as $stage) {
                $path = $stage->store('fruits/stages', 'public');
                $stages[] = '/storage/' . $path;
            }
        }

        Fruit::create([
            'name' => $request->name,
            'points' => $request->points,
            'img' => '/storage/' . $imgPath,
            'stages' => $stages,
        ]);

        return redirect()->route('fruits.index')->with('success', 'Buah berhasil ditambahkan!');
    }

    public function edit(Fruit $fruit)
    {
        // pastikan stages dikembalikan dalam bentuk array agar front-end bisa tampilkan preview
        $fruit->stages = is_array($fruit->stages)
            ? $fruit->stages
            : json_decode($fruit->stages, true);

        return Inertia::render('Dashboard/Fruits/Edit', [
            'fruit' => $fruit,
        ]);
    }

    public function update(Request $request, Fruit $fruit)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'points' => 'required|integer|min:1',
            'img' => 'nullable|image|mimes:png,jpg,jpeg,webp|max:2048',
            'stages.*' => 'nullable|image|mimes:png,jpg,jpeg,webp|max:2048',
        ]);

        // pastikan data lama tetap ada
        $oldStages = is_array($fruit->stages)
            ? $fruit->stages
            : json_decode($fruit->stages, true);

        if (!is_array($oldStages)) {
            $oldStages = [];
        }

        // update nama dan poin
        $fruit->name = $request->name;
        $fruit->points = $request->points;

        // update gambar utama jika ada file baru
        if ($request->hasFile('img')) {
            $imgPath = $request->file('img')->store('fruits/icons', 'public');
            $fruit->img = '/storage/' . $imgPath;
        }

        // siapkan array stages baru
        $updatedStages = $oldStages;

        // periksa tiap stage (0–4)
        for ($i = 0; $i < 5; $i++) {
            if ($request->hasFile("stages.$i")) {
                $path = $request->file("stages.$i")->store('fruits/stages', 'public');
                $updatedStages[$i] = '/storage/' . $path; // timpa hanya yang diubah
            } elseif (!isset($updatedStages[$i])) {
                $updatedStages[$i] = $oldStages[$i] ?? null;
            }
        }

        // pastikan array-nya rapi dan urut
        $fruit->stages = array_values($updatedStages);
        $fruit->save();

        return redirect()->route('fruits.index')->with('success', 'Data buah berhasil diperbarui tanpa menghapus gambar stage lama.');
    }

    public function destroy(Fruit $fruit)
    {
        $fruit->delete();
        return redirect()->route('fruits.index')->with('success', 'Buah berhasil dihapus!');
    }

    public function harvest(Request $request)
    {
        $request->validate([
            'plant_id' => 'required|exists:plants,id',
        ]);

        $user = Auth::user();
        if (!$user) {
            return redirect()->route('login');
        }

        $plant = $user->plants()->with('fruit')->findOrFail($request->plant_id);

        if (!$plant->isReadyToHarvest()) {
            return back()->with('error', 'Tanaman belum siap dipanen!');
        }

        $fruit = $plant->fruit;
        if (!$fruit) {
            return back()->with('error', 'Buah tidak ditemukan.');
        }

        $points = (int) $fruit->points;

        DB::transaction(function () use ($user, $plant, $points) {
            $user->increment('points', $points);

            if ($user->school_id) {
                $user->school()->increment('points', $points);
            }

            $plant->harvested = true;
            $plant->save();
        });

        return redirect()->back()->with([
            'success' => "Panen berhasil! Kamu dapat $points poin.",
            'points'  => $user->points,
        ]);
    }
}
