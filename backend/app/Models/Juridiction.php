<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Juridiction extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'IdJuridictionParent', 'JurLibelle_ar', 'JurLibelle_fr', 'idTypeJurid'
    ];

    public function typeJuridiction()
    {
        return $this->belongsTo(TypeJuridiction::class, 'idTypeJurid');
    }
}
