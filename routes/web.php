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

Route::get('/gamess', function () {
    return Inertia::render('Gamess');
})->name('gamess');

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
    Route::put('/schools/{school}', [SchoolController::class, 'update'])->name('schools.update');
    Route::delete('/schools/{school}', [SchoolController::class, 'destroy'])->name('schools.destroy');

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
    // Route::resource('artikels', ArtikelController::class);
    Route::resource('artikels', ArtikelController::class)->except(['show']);
    Route::post('/registrations', [RegistrationController::class, 'store'])->name('registrations.store');

    // Game Items CRUD
    Route::get('/gizi', [TebakGiziController::class, 'index'])->name('gizi.index'); // list semua item
    Route::get('/gizi/create', [TebakGiziController::class, 'create'])->name('gizi.create'); // form tambah
    Route::post('/gizi', [TebakGiziController::class, 'store'])->name('gizi.store'); // simpan item baru
    Route::get('/gizi/{item}/edit', [TebakGiziController::class, 'edit'])->name('gizi.edit'); // form edit
    Route::patch('/gizi/{item}', [TebakGiziController::class, 'update'])->name('gizi.update'); // update item
    Route::delete('/gizi/{item}', [TebakGiziController::class, 'destroy'])->name('gizi.destroy'); // hapus item

    // Questions per Item
    Route::get('/gizi/{item}/questions', [TebakGiziController::class, 'questions'])->name('gizi.questions.index'); // list pertanyaan
    Route::get('/gizi/{item}/questions/create', [TebakGiziController::class, 'createQuestion'])->name('gizi.questions.create'); // form tambah pertanyaan
    Route::post('/gizi/{item}/questions', [TebakGiziController::class, 'storeQuestion'])->name('gizi.questions.store'); // simpan pertanyaan
    Route::get('/gizi/{item}/questions/{question}/edit', [TebakGiziController::class, 'editQuestion'])->name('gizi.questions.edit'); // form edit pertanyaan
    Route::put('/gizi/{item}/questions/{question}', [TebakGiziController::class, 'updateQuestion'])->name('gizi.questions.update'); // update pertanyaan
    Route::delete('/gizi/{item}/questions/{question}', [TebakGiziController::class, 'destroyQuestion'])->name('gizi.questions.destroy'); // hapus pertanyaan

});

require __DIR__ . '/auth.php';
