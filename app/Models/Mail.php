<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $address
 * @property string|null $description
 * @property string|null $story
 * @property string|null $media
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mail newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mail newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mail query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mail whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mail whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mail whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mail whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mail whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mail whereMedia($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mail whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mail whereStory($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mail whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Mail extends Model
{
    protected $fillable = [
        'name',
        'email',
        'address',
        'description',
        'story',
        'media',
    ];
}
