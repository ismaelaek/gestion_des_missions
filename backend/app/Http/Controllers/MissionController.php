<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
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
            'DateAller' => 'required|string',
            'DateRetour' => 'required|string',
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
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mission $mission)
    {
        $validator = Validator::make($request->all(), [
            'NummeroMission' => 'required|string',
            'TypeMission' => 'required|string',
            'DateAller' => 'required|string',
            'DateRetour' => 'required|string',
            'DateEdition' => 'required|date',
            'idEtatMission' => 'required|int',
            'idJuridiction' => 'required|int',
            'idProfessionnel' => 'required|int',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $mission->update([
            'NummeroMission' => $request->NummeroMission,
            'TypeMission' => $request->TypeMission,
            'DateAller' => $request->DateAller,
            'DateRetour' => $request->DateRetour,
            'DateEdition' => $request->DateEdition,
            'idEtatMission' => $request->idEtatMission,
            'idJuridiction' => $request->idJuridiction,
            'idProfessionnel' => $request->idProfessionnel,
        ]);

        return response()->json(['message' => 'Mission updated successfully']);
    }


    public function destroy(Mission $mission)
    {
        try {
            $destroy = $mission->delete();

            if ($destroy) {
                return response()->json(['message' => '! تم حذف المهمة بنجاح']);
            } else {
                return response()->json(['message' => "error deleting"], 500);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

    }
}
