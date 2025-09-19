<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Farm extends Model
{
    protected $fillable = ['user_id', 'plant_id', 'planted_at', 'watered'];

    public function plant()
    {
        return $this->belongsTo(Plant::class);
    }
}
