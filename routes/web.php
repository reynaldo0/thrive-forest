<?php

use App\Http\Controllers\FarmController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/article', function () {
    return Inertia::render('Article');
})->name('article');

Route::get('/product', function () {
    return Inertia::render('Product');
})->name('product');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Overview');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Farm Manage
    Route::get('/farm', [FarmController::class, 'index'])->name('farm.index');
    Route::post('/farm/add', [FarmController::class, 'addFarm'])->name('farm.add');
    Route::post('/farm/{farm}/plant', [FarmController::class, 'plant'])->name('farm.plant');
    Route::post('/farm/{farm}/water', [FarmController::class, 'water'])->name('farm.water');
    Route::post('/farm/{farm}/harvest', [FarmController::class, 'harvest'])->name('farm.harvest');
    Route::post('/farm/donate', [FarmController::class, 'donate'])->name('farm.donate');
});

require __DIR__ . '/auth.php';
