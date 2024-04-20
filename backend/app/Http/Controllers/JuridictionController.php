<?php

namespace App\Http\Controllers;

use App\Models\Juridiction;

class JuridictionController extends Controller
{

    public function index($idTypeJurid, $IdJuridictionParent = null)
    {
        $query = Juridiction::where('idTypeJurid', $idTypeJurid);

        if ($IdJuridictionParent !== null) {
            $query->where('IdJuridictionParent', $IdJuridictionParent);
        }

        $juridictions = $query->get();

        return response()->json($juridictions);
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
