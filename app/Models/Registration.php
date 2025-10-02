<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'seminar_id',
        'name',
        'email',
        'phone',
        'notes',
    ];

    public function seminar()
    {
        return $this->belongsTo(Seminar::class);
    }
}
