<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentExamTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_exam', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedbigInteger('student_id');
            $table->unsignedbigInteger('exam_id');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('no action');
            $table->foreign('exam_id')->references('id')->on('exams')->onDelete('no action');
            $table->dateTime('start_time')->nullable();
            $table->dateTime('end_time')->nullable();
            $table->float('score')->nullable();
            $table->integer('number_of_corrects')->nullable();
            $table->integer('number_of_incorrects')->nullable();
            $table->integer('number_of_whites')->nullable();
            $table->integer('period')->nullable();
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
        Schema::dropIfExists('student_exam');
    }
}
