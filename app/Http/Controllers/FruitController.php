<?php

namespace App\Http\Controllers;

use App\Models\Fruit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FruitController extends Controller
{
    public function publicIndex()
    {
        $fruits = Fruit::all()->map(function ($fruit) {
            return [
                'id' => $fruit->id,
                'name' => $fruit->name,
                'points' => $fruit->points,
                'img' => $fruit->img,
                'stages' => is_string($fruit->stages) ? json_decode($fruit->stages, true) : $fruit->stages,
            ];
        });

        return Inertia::render('Games', [
            'fruits' => $fruits,
        ]);
    }

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

        $imgPath = $request->file('img')->store('fruits', 'public');

        $stages = [];
        if ($request->hasFile('stages')) {
            foreach ($request->file('stages') as $stage) {
                if ($stage) {
                    $path = $stage->store('fruits/stages', 'public');
                    $stages[] = '/storage/' . $path;
                }
            }
        }

        Fruit::create([
            'name' => $request->name,
            'points' => $request->points,
            'img' => '/storage/' . $imgPath,
            'stages' => json_encode($stages),
        ]);

        return redirect()->route('fruits.index')->with('success', 'Buah berhasil ditambahkan!');
    }



    public function edit(Fruit $fruit)
    {
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

        // update nama
        $fruit->name = $request->name;
        $fruit->points = $request->points;

        // update icon jika ada file baru
        if ($request->hasFile('img')) {
            $imgPath = $request->file('img')->store('fruits/icons', 'public');
            $fruit->img = '/storage/' . $imgPath;
        }

        // pastikan stages lama dalam bentuk array
        $oldStages = $fruit->stages;
        if (is_string($oldStages)) {
            $oldStages = json_decode($oldStages, true) ?? [];
        } elseif (!is_array($oldStages)) {
            $oldStages = [];
        }

        // update stages per index
        $newStages = [];
        for ($i = 0; $i < 5; $i++) {
            if ($request->hasFile("stages.$i")) {
                $path = $request->file("stages.$i")->store('fruits/stages', 'public');
                $newStages[$i] = '/storage/' . $path;
            } else {
                $newStages[$i] = $oldStages[$i] ?? null; // pakai lama jika tidak ada perubahan
            }
        }

        $fruit->stages = json_encode($newStages, JSON_UNESCAPED_SLASHES);

        $fruit->save();

        return redirect()->route('fruits.index')->with('success', 'Data buah berhasil diupdate');
    }

    public function destroy(Fruit $fruit)
    {
        $fruit->delete();
        return redirect()->route('fruits.index')->with('success', 'Buah berhasil dihapus!');
    }
}
