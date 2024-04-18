<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCadresTable extends Migration
{
    public function up()
    {
        Schema::create('cadres', function (Blueprint $table) {
            $table->id();
            $table->string('cadreLibelle_ar');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cadres');
    }
}

