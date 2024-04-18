<?php



use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJuridictionsTable extends Migration
{
    public function up()
    {
        Schema::create('juridictions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('IdJuridictionParent')->nullable();
            $table->string('JurLibelle_ar');
            $table->string('JurLibelle_fr');
            $table->unsignedBigInteger('idTypeJurid');
            $table->foreign('idTypeJurid')->references('id')->on('type_juridctions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('juridictions');
    }
}
