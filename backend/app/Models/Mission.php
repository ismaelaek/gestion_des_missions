<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    use HasFactory ;
    protected $fillable = [
        'NummeroMission',
        'TypeMission',
        'DateAller',
        'DateRetour',
        'DateEdition',
        'idEtatMission',
        'idProfessionnel',
        'idJuridiction',
    ];
}
