<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EtatMission extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'code', 'EtatLibelle_ar', 'EtatLibelle_fr'
    ];
}
