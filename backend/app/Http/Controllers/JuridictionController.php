<?php

namespace App\Http\Controllers;

use App\Models\Juridiction;

class JuridictionController extends Controller
{

    public function index($idTypeJurid)
    {
        $premiereTribunals = Juridiction::where('idTypeJurid', $idTypeJurid)->get();

        return response()->json($premiereTribunals);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    public function show(Juridiction $juridiction)
    {
        //
    }

    public function edit(Juridiction $juridiction)
    {
        //
    }


    public function destroy(Juridiction $juridiction)
    {
        //
    }
}
