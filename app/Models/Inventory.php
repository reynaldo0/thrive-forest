<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'fruit_id', 'quantity'];

    public function fruit()
    {
        return $this->belongsTo(Fruit::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
