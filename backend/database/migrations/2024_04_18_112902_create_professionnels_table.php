<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfessionnelsTable extends Migration
{
    public function up()
    {
        Schema::create('professionnels', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('NumeroSomme');
            $table->string('Email');
            $table->unsignedBigInteger('IdCadre');
            $table->unsignedBigInteger('IdDirection');
            $table->foreign('IdCadre')->references('id')->on('cadres')->onDelete('cascade');
            $table->foreign('IdDirection')->references('id')->on('directions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('professionnels');
    }
}
