<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCadreRequest;
use App\Http\Requests\UpdateCadreRequest;
use App\Models\Cadre;

class CadreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cadres = Cadre::get();
        return response()->json($cadres);
    }

    /**
     * Show the form for creating a new resource.
     */
    
    public function destroy(Cadre $cadre)
    {
        //
    }
}
