<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMissionsTable extends Migration
{
    public function up()
    {
        Schema::create('missions', function (Blueprint $table) {
            $table->id();
            $table->string('NummeroMission');
            $table->string('TypeMission');
            $table->date('DateAller');
            $table->date('DateRetour');
            $table->date('DateEdition');
            $table->unsignedBigInteger('idEtatMission');
            $table->foreign('idEtatMission')->references('id')->on('etat_missions');
            $table->unsignedBigInteger('idProfessionnel');
            $table->foreign('idProfessionnel')->references('id')->on('professionnels');
            $table->unsignedBigInteger('idJuridiction');
            $table->foreign('idJuridiction')->references('id')->on('juridictions');
            $table->timestamps();
        });

    }

    public function down()
    {
        Schema::dropIfExists('missions');
    }
}
