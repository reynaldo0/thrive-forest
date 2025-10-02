<?php

use App\Http\Controllers\FarmController;
use App\Http\Controllers\FruitController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\SeminarController;
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

Route::get('/games', [FruitController::class, 'publicIndex'])->name('games');

Route::get('/product', [SeminarController::class, 'publicIndex'])
    ->name('product');

Route::post('/seminars/{seminar}/register', [RegistrationController::class, 'store'])
    ->name('seminars.register');


// Route::get('/forum-komunitas', function () {
//     return Inertia::render('Product/ForumKomunitas');
// });

// Route::get('/buku-terpadu', fn() => Inertia::render('Article/BukuTerpadu'))->name('buku-terpadu');
// Route::get('/produk-unggul', fn() => Inertia::render('Product/ProdukUnggul'))->name('produk-unggul');
// Route::get('/komunitas', fn() => Inertia::render('Product/Komunitas'))->name('komunitas');
// Route::get('/ai', fn() => Inertia::render('Ai'))->name('ai');

Route::get('/admin/overview', function () {
    return Inertia::render('Dashboard/Overview');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Farm Manage
    // Route::get('/farm', [FarmController::class, 'index'])->name('farm.index');
    // Route::post('/farm/add', [FarmController::class, 'addFarm'])->name('farm.add');
    // Route::post('/farm/{farm}/plant', [FarmController::class, 'plant'])->name('farm.plant');
    // Route::post('/farm/{farm}/water', [FarmController::class, 'water'])->name('farm.water');
    // Route::post('/farm/{farm}/harvest', [FarmController::class, 'harvest'])->name('farm.harvest');
    // Route::post('/farm/donate', [FarmController::class, 'donate'])->name('farm.donate');

    Route::get('/fruits', [FruitController::class, 'index'])->name('fruits.index');       // list data
    Route::get('/fruits/create', [FruitController::class, 'create'])->name('fruits.create'); // form tambah
    Route::post('/fruits/store', [FruitController::class, 'store'])->name('fruits.store');   // simpan data
    Route::get('/fruits/{fruit}/edit', [FruitController::class, 'edit'])->name('fruits.edit'); // form edit
    Route::put('/fruits/{fruit}/update', [FruitController::class, 'update'])->name('fruits.update'); // update data
    Route::delete('/fruits/{fruit}/delete', [FruitController::class, 'destroy'])->name('fruits.destroy');

    // game manage
    Route::get('/game', [GameController::class, 'index']);
    Route::post('/plant', [GameController::class, 'plant']);
    Route::post('/harvest', [FruitController::class, 'harvest'])->name('harvest');
    Route::post('/harvest/{plant}', [GameController::class, 'harvest']);

    Route::get('/schools', [SchoolController::class, 'index'])->name('schools.index');
    Route::post('/schools', [SchoolController::class, 'store'])->name('schools.store');

    // join teamcode
    Route::get('/join-school', [SchoolController::class, 'joinTeamcode'])
        ->middleware('auth')
        ->name('schools.join.form');

    Route::post('/leave-school', [SchoolController::class, 'leaveSchool'])
        ->name('schools.leave');

    Route::post('/join-school', [SchoolController::class, 'joinSchool'])
        ->name('schools.join');
    Route::get('/leaderboard', [SchoolController::class, 'leaderboard']);

    // mail manage
    Route::get('/mails', [MailController::class, 'index'])->name('mails.index');
    Route::post('/mails', [MailController::class, 'store'])->name('mails.store');

    Route::resource('seminars', SeminarController::class);
    Route::post('/registrations', [RegistrationController::class, 'store'])->name('registrations.store');
});

require __DIR__ . '/auth.php';
