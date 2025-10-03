<?php

namespace App\Http\Controllers;

use App\Models\Artikel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtikelController extends Controller
{
    public function index()
    {
        $artikels = Artikel::latest()->paginate(10);
        return Inertia::render('Dashboard/Article/Index', [
            'artikels' => $artikels
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Article/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'desc'  => 'required',
            'img'   => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'tag'   => 'nullable|string',
        ]);

        $data = $request->only('title', 'desc', 'tag');

        if ($request->hasFile('img')) {
            $path = $request->file('img')->store('artikels', 'public');
            $data['img'] = $path;
        }

        Artikel::create($data);

        return redirect()->route('artikels.index')->with('success', 'Artikel berhasil ditambahkan!');
    }

    public function edit(Artikel $artikel)
    {
        return Inertia::render('Dashboard/Article/Edit', [
            'artikel' => $artikel
        ]);
    }

    public function update(Request $request, Artikel $artikel)
    {
        $request->validate([
            'title' => 'required',
            'desc'  => 'required',
            'img'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'tag'   => 'nullable|string',
        ]);

        $data = $request->only('title', 'desc', 'tag');

        if ($request->hasFile('img')) {
            $path = $request->file('img')->store('artikels', 'public');
            $data['img'] = $path;
        }

        $artikel->update($data);

        return redirect()->route('artikels.index')->with('success', 'Artikel berhasil diperbarui!');
    }

    public function destroy(Artikel $artikel)
    {
        $artikel->delete();
        return redirect()->route('artikels.index')->with('success', 'Artikel berhasil dihapus!');
    }
}
