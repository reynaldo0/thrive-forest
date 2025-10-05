<?php

namespace App\Http\Controllers;

use App\Models\Fruit;
use App\Models\Seminar;
use App\Models\User;
use App\Models\School;
use App\Models\ItemGame;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function overview()
    {
        $user = Auth::user();

        // Total data
        $totalStudents = User::count();
        $totalPoints = Fruit::sum('points');
        $totalGames = ItemGame::count() + Fruit::count(); // ✅ Gabungkan ItemGame + Fruit

        // Ambil ranking sekolah user
        $ranking = null;
        if ($user && $user->school_id) {
            $schools = School::orderBy('points', 'desc')->get();
            $ranking = $schools->search(fn($s) => $s->id === $user->school_id) + 1;
        }

        $stats = [
            ['label' => 'Siswa Aktif', 'value' => $totalStudents],
            ['label' => 'Pohon Tertanam', 'value' => $totalPoints],
            ['label' => 'Game Tersedia', 'value' => $totalGames],
            ['label' => 'Ranking Sekolah', 'value' => $ranking ? "#$ranking" : '—'],
            ['label' => 'Buah Tersedia', 'value' => Fruit::count()],
            ['label' => 'Seminar Terbaru', 'value' => Seminar::count()],
            ['label' => 'Total Sekolah', 'value' => School::count()],
            ['label' => 'Siswa Bergabung', 'value' => User::whereNotNull('school_id')->count()],
            ['label' => 'Total Poin Sekolah', 'value' => School::sum('points')],
        ];

        return Inertia::render('Dashboard/Overview', [
            'stats' => $stats,
        ]);
    }
}
