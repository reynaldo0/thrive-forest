<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Artikel extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'desc',
        'img',
        'tag',
        'user_id',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected static function booted()
    {
        static::creating(function ($artikel) {
            $artikel->slug = Str::slug($artikel->title);
        });

        static::updating(function ($artikel) {
            $artikel->slug = Str::slug($artikel->title);
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
