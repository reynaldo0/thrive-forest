<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'school_id',
        'avatar',
        'role',
        'points',
        'energy',
        'max_energy',
        'last_energy_reset',
        'pot_capacity',
        'fertilizer',
        'fertilizer_boost',
        'boots_pupuk',
        'temporary_fertilizer', 
    ];

    protected $casts = [
        'fertilizer' => 'boolean',
        'last_energy_reset' => 'datetime',
    ];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    // Relasi ke tanaman (game)
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany|Plant[]
     */
    public function plants()
    {
        return $this->hasMany(Plant::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany|Inventory[]
     */
    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }

    // Relasi ke poin histori
    public function getTotalPointsAttribute()
    {
        return $this->points()->sum('points');
    }

    public function getAvatarUrlAttribute()
    {
        if ($this->avatar) {
            return asset('storage/' . $this->avatar);
        }

        // default avatar dari inisial nama
        $initials = strtoupper(substr($this->name, 0, 1));
        return "https://ui-avatars.com/api/?name={$initials}&background=random";
    }
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    public function resetEnergyIfNeeded()
    {
        if (!$this->last_energy_reset || $this->last_energy_reset->isToday() === false) {
            $this->energy = $this->max_energy;
            $this->last_energy_reset = now();
            $this->save();
        }
    }
}
