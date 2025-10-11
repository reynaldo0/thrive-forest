<?php

namespace App\Http\Controllers;

use App\Models\Fruit;
use App\Models\ItemGame;
use App\Models\School;
use App\Models\Plant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class GamesController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $schools = School::withCount('users')->orderBy('points', 'desc')->get();

        $fruits = Fruit::all()->map(function ($fruit) {
            return [
                'id' => $fruit->id,
                'name' => $fruit->name,
                'points' => (int) $fruit->points,
                'img' => $fruit->img,
                'stages' => $fruit->stages,
            ];
        });

        return Inertia::render('Games', [
            'fruits' => $fruits,
            'plants' => $user
                ? $user->plants()
                ->where('harvested', false) // 🔥 ini penting
                ->with('fruit')
                ->get()
                ->map(function ($plant) {
                    return [
                        'id'         => $plant->id,
                        'fruit_id'   => $plant->fruit_id,
                        'harvested'  => $plant->harvested,
                        'planted_at' => $plant->planted_at?->toDateTimeString(),
                        'grow_time'  => $plant->grow_time,
                        'stage'      => $plant->stage,
                        'fruit'      => $plant->fruit,
                    ];
                })
                : [],
            'schools'    => $schools ?? [],
            'potCapacity' => $user ? $user->pot_capacity : 4,
            'points' => $user ? $user->points : 0,
            'energy' => $user ? $user->energy : 10,
            'maxEnergy' => 10,
            'fertilizer' => false,
            'inventory' => $user ? $user->inventories()->with('fruit')->get() : [],
        ]);
    }

    public function addPoints(Request $request)
    {
        $request->validate([
            'points' => 'required|integer',
        ]);

        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $pointsChange = (int) $request->points;

        DB::transaction(function () use ($user, $pointsChange) {
            $user->increment('points', $pointsChange);

            if ($user->school_id) {
                $user->school()->increment('points', $pointsChange);
            }
        });

        return response()->json([
            'message' => 'Points updated successfully',
            'points' => $user->points,
        ]);
    }

    public function gizi()
    {
        $items = ItemGame::with('questions')->get()->map(function ($item) {
            $img = $item->img_path
                ? (str_starts_with($item->img_path, '/gamesicon')
                    ? $item->img_path
                    : asset('storage/' . $item->img_path))
                : '/placeholder.png';

            return [
                'id' => $item->id,
                'name' => $item->name,
                'img' => $img,
                'questions' => $item->questions->map(function ($q) {
                    return [
                        'question' => $q->question,
                        'options' => $q->options,
                        'answer' => $q->answer,
                    ];
                }),
            ];
        });

        $userPoints = Auth::user() ? Auth::user()->points : 0;
        $schools = School::withCount('users')->orderBy('points', 'desc')->get();

        return Inertia::render('Gamess', [
            'items' => $items,
            'points' => $userPoints,
            'schools' => $schools,
        ]);
    }
}
