<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Direction extends Model
{
    protected $fillable = [
        'DirLibelle_ar', 'DirLibelle_ar'
    ];

    public function professionnels()
    {
        return $this->hasMany(Professionnel::class, 'IdDirection');
    }
}
