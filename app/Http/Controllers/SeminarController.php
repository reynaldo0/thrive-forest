<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Seminar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeminarController extends Controller
{
    public function publicIndex()
    {
        $seminars = Seminar::latest()->get()->map(fn($s) => [
            'id' => $s->id,
            'title' => $s->title,
            'date' => $s->date,
            'location' => $s->location,
            'description' => $s->description,
        ]);
        
        $posts = Post::with(['user', 'comments.user'])->latest()->get();

        return Inertia::render('Product', [
            'seminars' => $seminars,
            'posts' => $posts,
        ]);
    }


    public function index()
    {
        $seminars = Seminar::with('registrations')->latest()->paginate(10);

        return Inertia::render('Dashboard/Seminar/Index', [
            'seminars' => $seminars,
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Seminar/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string',
            'description' => 'required|string',
        ]);

        Seminar::create($request->all());

        return redirect()->route('seminars.index')->with('success', 'Seminar berhasil dibuat!');
    }

    public function edit(Seminar $seminar)
    {
        return Inertia::render('Dashboard/Seminar/Edit', [
            'seminar' => $seminar,
        ]);
    }

    public function update(Request $request, Seminar $seminar)
    {
        $request->validate([
            'title' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string',
            'description' => 'required|string',
        ]);

        $seminar->update($request->all());

        return redirect()->route('seminars.index')->with('success', 'Seminar berhasil diperbarui!');
    }

    public function destroy(Seminar $seminar)
    {
        $seminar->delete();
        return redirect()->route('seminars.index')->with('success', 'Seminar berhasil dihapus!');
    }
}
