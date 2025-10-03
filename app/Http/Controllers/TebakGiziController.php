<?php

namespace App\Http\Controllers;

use App\Models\ItemGame;
use App\Models\Questation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TebakGiziController extends Controller
{
    public function index()
    {
        $items = ItemGame::all();
        return Inertia::render('Dashboard/Gizi/Index', compact('items'));
    }

    // Form Create / Edit Item
    public function create()
    {
        return Inertia::render('Dashboard/Gizi/GameForm', ['item' => null]);
    }

    public function edit(ItemGame $item)
    {
        return Inertia::render('Dashboard/Gizi/GameForm', compact('item'));
    }

    // Store Item
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'img_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // validasi image
        ]);

        // Jika ada file gambar, simpan ke storage
        if ($request->hasFile('img_path')) {
            $path = $request->file('img_path')->store('images/items', 'public');
            $validated['img_path'] = $path;
        }

        ItemGame::create($validated);

        return redirect()->route('gizi.index')->with('success', 'Item berhasil dibuat!');
    }

    // Update Item
    public function update(Request $request, ItemGame $item)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'img_path' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('img_path')) {
            // Hapus file lama jika ada
            if ($item->img_path && Storage::disk('public')->exists($item->img_path)) {
                Storage::disk('public')->delete($item->img_path);
            }

            $path = $request->file('img_path')->store('images/items', 'public');
            $validated['img_path'] = $path;
        } else {
            unset($validated['img_path']); // tidak ubah jika tidak ada file baru
        }

        $item->update($validated);

        return redirect()->route('gizi.index')->with('success', 'Item berhasil diperbarui!');
    }


    // Delete Item
    public function destroy(ItemGame $item)
    {
        $item->delete();
        return redirect()->route('gizi.index')->with('success', 'Item berhasil dihapus!');
    }

    // Show Questions for one Item
    public function questions(ItemGame $item)
    {
        $item->load('questions');
        return Inertia::render('Dashboard/Gizi/GameQuestions', compact('item'));
    }

    // Add Question
    public function storeQuestion(Request $request, ItemGame $item)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'options' => 'required|array|min:2',
            'answer' => 'required|string',
        ]);

        $item->questions()->create($validated);

        return redirect()->route('gizi.questions.index', $item->id)
            ->with('success', 'Pertanyaan berhasil ditambahkan!');
    }

    // Edit Question
    public function editQuestion(ItemGame $item, Questation $question)
    {
        return Inertia::render('Dashboard/Gizi/QuestionForm', compact('item', 'question'));
    }

    public function updateQuestion(Request $request, ItemGame $item, Questation $question)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'options' => 'required|array|min:2',
            'answer' => 'required|string',
        ]);

        $question->update($validated);

        return redirect()->route('gizi.questions', $item->id)
            ->with('success', 'Pertanyaan berhasil diperbarui!');
    }

    public function destroyQuestion(ItemGame $item, Questation $question)
    {
        $question->delete();
        return redirect()->route('gizi.questions', $item->id)
            ->with('success', 'Pertanyaan berhasil dihapus!');
    }
    // Form Create Question
    public function createQuestion(ItemGame $item)
    {
        // Tidak ada pertanyaan karena ini create
        $question = null;
        return Inertia::render('Dashboard/Gizi/QuestionForm', compact('item', 'question'));
    }
}
