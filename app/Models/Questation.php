<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $item_game_id
 * @property string $question
 * @property array<array-key, mixed> $options
 * @property string $answer
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ItemGame $item
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Questation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Questation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Questation query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Questation whereAnswer($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Questation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Questation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Questation whereItemGameId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Questation whereOptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Questation whereQuestion($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Questation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
