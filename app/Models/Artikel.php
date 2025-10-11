<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $desc
 * @property string $img
 * @property string|null $tag
 * @property string $slug
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Artikel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Artikel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Artikel query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Artikel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Artikel whereDesc($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Artikel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Artikel whereImg($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Artikel whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Artikel whereTag($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Artikel whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Artikel whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Artikel whereUserId($value)
 * @mixin \Eloquent
 */
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
