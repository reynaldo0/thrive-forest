<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fruit extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'img',
        'stages',
    ];

    protected $casts = [
        'stages' => 'array',
    ];

    // App\Models\Plant.php

    public function getStagesAttribute($value)
    {
        // Jika sudah berupa array dari cast
        if (is_array($value)) {
            return array_map(fn($path) => asset($path), $value);
        }

        // Jika masih berupa JSON string
        $decoded = json_decode($value, true);
        if (is_array($decoded)) {
            return array_map(fn($path) => asset($path), $decoded);
        }

        // Default kosong
        return [];
    }

    public function getImgAttribute($value)
    {
        return asset($value);
    }
}
