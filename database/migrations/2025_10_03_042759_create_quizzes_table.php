<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->string('item_id'); // contoh: banana, tomato, corn
            $table->string('item_name'); // nama lengkap: Pisang, Tomat, Jagung
            $table->string('img'); // path gambar
            $table->text('question');
            $table->json('options'); // pilihan jawaban
            $table->string('answer'); // jawaban benar
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
