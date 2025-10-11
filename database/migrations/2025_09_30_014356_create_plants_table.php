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
        Schema::create('plants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('fruit_id')->constrained()->onDelete('cascade');
            $table->integer('grow_time')->default(60); // detik
            $table->timestamp('planted_at');
            $table->boolean('harvested')->default(false);
            $table->integer('boost_time')->default(0);
            $table->unsignedTinyInteger('stage')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plants');
    }
};
