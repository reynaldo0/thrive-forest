<?php

namespace App\Http\Controllers;

use App\Models\Fruit;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GamesController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $schools = School::orderBy('points', 'desc')->get();

        $fruits = Fruit::all()->map(function ($fruit) {
            return [
                'id' => $fruit->id,
                'name' => $fruit->name,
                'points' => (int) $fruit->points,
                'img' => $fruit->img,
                'stages' => is_string($fruit->stages) ? json_decode($fruit->stages, true) : $fruit->stages,
            ];
        });

        return Inertia::render('Games', [
            'fruits' => $fruits,
            'points' => $user ? $user->points : 0,
            'added' => null,
            'schools' => $schools,
        ]);
    }
}
