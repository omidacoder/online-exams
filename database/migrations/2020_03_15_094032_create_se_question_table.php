<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeQuestionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('se_eq', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedbigInteger('se_id');
            $table->unsignedbigInteger('eq_id');
            $table->foreign('se_id')->references('id')->on('student_exam')->onDelete('no action');
            $table->foreign('eq_id')->references('id')->on('exam_question')->onDelete('no action');
            $table->integer('choice')->nullable;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('se_question');
    }
}
