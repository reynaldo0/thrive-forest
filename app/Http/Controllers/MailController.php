<?php

namespace App\Http\Controllers;

use App\Models\Mail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MailController extends Controller
{
    public function index()
    {
        $submissions = Mail::latest()->get();

        return Inertia::render('Dashboard/Mail/Index', [
            'submissions' => $submissions
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|max:255',
            'address'     => 'required|string|max:255',
            'description' => 'nullable|string',
            'story'       => 'nullable|string',
            'media'       => 'nullable|file|mimes:jpg,jpeg,png,pdf,doc,mp4|max:20480',
        ]);

        if ($request->hasFile('media')) {
            $validated['media'] = $request->file('media')->store('mail', 'public');
        }

        Mail::create($validated);

        return redirect()->back()->with('success', 'Data berhasil dikirim!');
    }
}
