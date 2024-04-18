<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDirectionsTable extends Migration
{
    public function up()
    {
        Schema::create('directions', function (Blueprint $table) {
            $table->id();
            $table->string('DirLibelle_ar');
            $table->string('DirLibelle_fr');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('directions');
    }
}

