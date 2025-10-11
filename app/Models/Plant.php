<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property int $fruit_id
 * @property int $grow_time
 * @property \Illuminate\Support\Carbon $planted_at
 * @property bool $harvested
 * @property int $boost_time
 * @property int $stage
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Fruit $fruit
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Plant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Plant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Plant query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Plant whereBoostTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Plant whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Plant whereFruitId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Plant whereGrowTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Plant whereHarvested($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Plant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Plant wherePlantedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Plant whereStage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Plant whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Plant whereUserId($value)
 * @mixin \Eloquent
 */
class Plant extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'fruit_id',
        'grow_time',
        'planted_at',
        'harvested',
        'boost_time',
        'stage'
    ];

    protected $casts = [
        'planted_at' => 'datetime',
        'harvested' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function remainingTime()
    {
        $elapsed = now()->diffInSeconds($this->planted_at);
        $totalTime = $this->grow_time - $this->boost_time;

        return max(0, $totalTime - $elapsed);
    }

    public function isReadyToHarvest()
    {
        return $this->remainingTime() === 0 && !$this->harvested;
    }

    public function fruit()
    {
        return $this->belongsTo(Fruit::class);
    }

}
