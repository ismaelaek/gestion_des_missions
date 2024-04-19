<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Professionnel;
use Illuminate\Support\Facades\Validator;

class ProfessionnelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $professionnels = Professionnel::get();
        return response()->json($professionnels);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'NumeroSomme' => 'required|string|max:255',
            'Email' => 'required|email|unique:professionnels',
            'IdCadre' => 'required|exists:cadres,id',
            'IdDirection' => 'required|exists:directions,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $professionnel = new Professionnel();
        $professionnel->nom = $request->nom;
        $professionnel->prenom = $request->prenom;
        $professionnel->NumeroSomme = $request->NumeroSomme;
        $professionnel->Email = $request->Email;
        $professionnel->IdCadre = $request->IdCadre;
        $professionnel->IdDirection = $request->IdDirection;
        $professionnel->save();

        return response()->json(['message' => '! تمت إضافة الموظف بمجاح'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Professionnel $professionnel)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Professionnel $professionnel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Professionnel $professionnel)
    {
        //
    }
}
