<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\CadreController;
use App\Http\Controllers\DirectionController;
use App\Http\Controllers\JuridictionController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\ProfessionnelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/auth/login', [AuthController::class, 'login']);

Route::prefix('/data')->middleware('auth:api')->group(function () {
    Route::get('/juridictions/{idTypeJurid}/{IdJuridictionParent?}', [JuridictionController::class, 'index']);
    Route::get('/directions', [DirectionController::class, 'index']);
    Route::get('/caders', [CadreController::class, 'index']);
    Route::get('/professionnels', [ProfessionnelController::class, 'index']);
    Route::get('/missions', [MissionController::class, 'index']);

});

// TODO : fix invalid token on auth midllware
Route::prefix('/professionnels')->group(function () {
    Route::post('/store', [ProfessionnelController::class, 'store']);
    Route::delete('/{professionnel}', [ProfessionnelController::class, 'destroy']);

});

Route::prefix('/missions')->group(function () {
    Route::post('/store', [MissionController::class, 'store']);
    Route::delete('/{professionnel}', [MissionController::class, 'destroy']);
});