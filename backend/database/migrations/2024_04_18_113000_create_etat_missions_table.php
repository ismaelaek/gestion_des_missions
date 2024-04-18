<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEtatMissionsTable extends Migration
{
    public function up()
    {
        Schema::create('etat_missions', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('EtatLibelle_ar');
            $table->string('EtatLibelle_fr');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('etat_missions');
    }
}
