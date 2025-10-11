<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $img_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Questation> $questions
 * @property-read int|null $questions_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ItemGame newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ItemGame newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ItemGame query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ItemGame whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ItemGame whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ItemGame whereImgPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ItemGame whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ItemGame whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ItemGame extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'img_path'];

    public function questions()
    {
        return $this->hasMany(Questation::class);
    }
}
