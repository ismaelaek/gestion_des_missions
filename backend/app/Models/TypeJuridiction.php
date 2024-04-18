<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeJuridiction extends Model
{
    protected $fillable = [
        'code', 'TypeJurLibelle_ar', 'TypeJurLibelle_fr'
    ];

    public function juridictions()
    {
        return $this->hasMany(Juridiction::class, 'idTypeJurid');
    }
}
