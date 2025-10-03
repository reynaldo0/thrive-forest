<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Questation extends Model
{
    use HasFactory;

    protected $fillable = ['item_game_id', 'question', 'options', 'answer'];

    protected $casts = [
        'options' => 'array',
    ];

    public function item()
    {
        return $this->belongsTo(ItemGame::class, 'item_game_id');
    }
}
