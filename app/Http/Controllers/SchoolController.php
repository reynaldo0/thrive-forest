<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SchoolController extends Controller
{
    public function index()
    {
        $schools = School::orderBy('points', 'desc')->get();

        return Inertia::render('Dashboard/School/Index', [
            'schools' => $schools,
        ]);
    }

    // Tambah sekolah
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'team_code' => 'required|string|unique:schools,team_code',
        ]);

        School::create($validated);

        return redirect()->route('schools.index');
    }

    public function joinTeamcode()
    {
        $user = Auth::user();
        $schools = School::withCount('users')->get();

        return Inertia::render('Dashboard/School/JoinTeam', [
            'user' => $user->load('school'),
            'schools' => $schools,
        ]);
    }

    public function joinSchool(Request $request)
    {
        $request->validate([
            'team_code' => 'required|string|exists:schools,team_code',
        ]);

        $user = Auth::user();

        // 🚨 Cek apakah user sudah punya sekolah
        if ($user->school_id) {
            return back()->withErrors([
                'team_code' => 'Kamu sudah bergabung dengan sekolah. Silakan keluar dulu sebelum join sekolah lain.',
            ]);
        }

        $school = School::where('team_code', $request->team_code)->first();

        $user->school_id = $school->id;
        $user->save();

        return redirect()->back()->with('success', 'Berhasil bergabung dengan sekolah ' . $school->name);
    }

    public function leaveSchool()
    {
        $user = Auth::user();

        if (! $user->school_id) {
            return back()->withErrors([
                'team_code' => 'Kamu belum tergabung dalam sekolah manapun.',
            ]);
        }

        $user->school_id = null;
        $user->save();

        return back()->with('success', 'Kamu telah keluar dari sekolah.');
    }

    /**
     * Leaderboard sekolah
     */
    public function leaderboard()
    {
        $schools = School::orderBy('points', 'desc')->get();

        return Inertia::render('Dashboard/School/Leaderboard', [
            'schools' => $schools,
        ]);
    }
}
