<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemGame extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'img_path'];

    public function questions()
    {
        return $this->hasMany(Questation::class);
    }
}
