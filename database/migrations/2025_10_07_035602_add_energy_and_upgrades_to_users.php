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
        Schema::table('users', function (Blueprint $table) {
            $table->integer('energy')->default(10);
            $table->integer('max_energy')->default(10);
            $table->timestamp('last_energy_reset')->nullable();

            // Upgrades system
            $table->integer('pot_capacity')->default(4);
            $table->boolean('fertilizer')->default(false);
            $table->integer('fertilizer_boost')->default(0);
            $table->integer('boots_pupuk')->default(0);
            $table->integer('temporary_fertilizer')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['energy', 'max_energy', 'last_energy_reset', 'pot_capacity', 'fertilizer','fertilizer_boost','boots_pupuk']);
        });
    }
};
