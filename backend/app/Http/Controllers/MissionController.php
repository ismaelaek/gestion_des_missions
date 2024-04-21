<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UpdateMissionRequest;
use App\Models\Mission;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $missions = Mission::get();
        return response()->json($missions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'NummeroMission' => 'required|string',
            'TypeMission' => 'required|string',
            'DateAller' => 'required|date',
            'DateRetour' => 'required|date',
            'DateEdition' => 'required|date',
            'idEtatMission' => 'required|integer',
            'idJuridiction' => 'required|integer',
            'idProfessionnel' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $mission = new Mission();
        $mission->NummeroMission = $request->NummeroMission;
        $mission->TypeMission = $request->TypeMission;
        $mission->DateAller = $request->DateAller;
        $mission->DateRetour = $request->DateRetour;
        $mission->DateEdition = $request->DateEdition;
        $mission->idEtatMission = $request->idEtatMission;
        $mission->idJuridiction = $request->idJuridiction;
        $mission->idProfessionnel = $request->idProfessionnel;
        $mission->save();

        return response()->json(['message' => 'Mission created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Mission $mission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mission $mission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMissionRequest $request, Mission $mission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mission $mission)
    {
        //
    }
}
