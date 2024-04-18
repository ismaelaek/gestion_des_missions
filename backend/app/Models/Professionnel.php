<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Professionnel extends Model
{
    protected $fillable = [
        'nom', 'prenom', 'NumeroSomme', 'Email', 'IdCadre', 'IdDirection'
    ];

    public function cadre()
    {
        return $this->belongsTo(Cadre::class, 'IdCadre');
    }

    public function direction()
    {
        return $this->belongsTo(Direction::class, 'IdDirection');
    }
}
