<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plant extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'type',
        'grow_time',
        'planted_at',
        'harvested',
    ];

    protected $casts = [
        'planted_at' => 'datetime',
        'harvested' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
