<?php

use App\Http\Controllers\FarmController;
use App\Http\Controllers\FruitController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\SchoolController;
use App\Http\Controllers\SeminarController;
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\TebakGiziController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * ROUTE PUBLIK
 */
Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/about', fn() => Inertia::render('About'))->name('about');
Route::get('/article', fn() => Inertia::render('Article'))->name('article');
Route::get('/product', fn() => Inertia::render('Product'))->name('product');
Route::get('/gamess', fn() => Inertia::render('Gamess'))->name('gamess');

Route::get('/games', [FruitController::class, 'publicIndex'])->name('games');
Route::get('/product', [SeminarController::class, 'publicIndex'])->name('product');

Route::post('/seminars/{seminar}/register', [RegistrationController::class, 'store'])
    ->name('seminars.register');

/**
 * ROUTE ADMIN (role: admin)
 */
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {

    Route::get('/overview', fn() => Inertia::render('Dashboard/Overview'))->name('dashboard');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Fruits CRUD
    Route::get('/fruits', [FruitController::class, 'index'])->name('fruits.index');
    Route::get('/fruits/create', [FruitController::class, 'create'])->name('fruits.create');
    Route::post('/fruits/store', [FruitController::class, 'store'])->name('fruits.store');
    Route::get('/fruits/{fruit}/edit', [FruitController::class, 'edit'])->name('fruits.edit');
    Route::put('/fruits/{fruit}/update', [FruitController::class, 'update'])->name('fruits.update');
    Route::delete('/fruits/{fruit}/delete', [FruitController::class, 'destroy'])->name('fruits.destroy');

    // Schools CRUD + join/leave
    Route::get('/schools', [SchoolController::class, 'index'])->name('schools.index');
    Route::post('/schools', [SchoolController::class, 'store'])->name('schools.store');
    Route::put('/schools/{school}', [SchoolController::class, 'update'])->name('schools.update');
    Route::delete('/schools/{school}', [SchoolController::class, 'destroy'])->name('schools.destroy');

    Route::get('/join-school', [SchoolController::class, 'joinTeamcode'])->name('schools.join.form');
    Route::post('/join-school', [SchoolController::class, 'joinSchool'])->name('schools.join');
    Route::post('/leave-school', [SchoolController::class, 'leaveSchool'])->name('schools.leave');

    // Mail
    Route::get('/mails', [MailController::class, 'index'])->name('mails.index');
    Route::post('/mails', [MailController::class, 'store'])->name('mails.store');

    // Seminars & Articles
    Route::resource('seminars', SeminarController::class);
    Route::resource('artikels', ArtikelController::class)->except(['show']);

    // Game Items (TebakGizi)
    Route::get('/gizi', [TebakGiziController::class, 'index'])->name('gizi.index');
    Route::get('/gizi/create', [TebakGiziController::class, 'create'])->name('gizi.create');
    Route::post('/gizi', [TebakGiziController::class, 'store'])->name('gizi.store');
    Route::get('/gizi/{item}/edit', [TebakGiziController::class, 'edit'])->name('gizi.edit');
    Route::patch('/gizi/{item}', [TebakGiziController::class, 'update'])->name('gizi.update');
    Route::delete('/gizi/{item}', [TebakGiziController::class, 'destroy'])->name('gizi.destroy');

    // Questions per Item
    Route::prefix('/gizi/{item}/questions')->name('gizi.questions.')->group(function () {
        Route::get('/', [TebakGiziController::class, 'questions'])->name('index');
        Route::get('/create', [TebakGiziController::class, 'createQuestion'])->name('create');
        Route::post('/', [TebakGiziController::class, 'storeQuestion'])->name('store');
        Route::get('/{question}/edit', [TebakGiziController::class, 'editQuestion'])->name('edit');
        Route::put('/{question}', [TebakGiziController::class, 'updateQuestion'])->name('update');
        Route::delete('/{question}', [TebakGiziController::class, 'destroyQuestion'])->name('destroy');
    });
});

Route::middleware(['auth', 'role:user'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('user.dashboard');


    // User bisa join/leave sekolah
    Route::get('/join-school', [SchoolController::class, 'joinTeamcode'])->name('schools.join.form');
    Route::post('/join-school', [SchoolController::class, 'joinSchool'])->name('schools.join');
    Route::post('/leave-school', [SchoolController::class, 'leaveSchool'])->name('schools.leave');

    // User bisa akses permainan/game
    Route::get('/games', [FruitController::class, 'publicIndex'])->name('games');
});

require __DIR__ . '/auth.php';
