<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTypeJuridictionsTable extends Migration

{
    public function up()
    {
        Schema::create('type_juridctions', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('TypeJurLibelle_ar');
            $table->string('TypeJurLibelle_fr');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('type_juridctions');
    }
}
