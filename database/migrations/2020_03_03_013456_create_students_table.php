<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('username');
            $table->string('password');
            $table->string('name');
            $table->string('phone_number');
            $table->string('national_code');
            $table->string('field');
            $table->integer('level');
            $table->string('email');
            $table->boolean('purchased');
            $table->boolean('verified');
            $table->string('zarin_authority')->nullable();
            $table->string('verification_code')->nullable();
            $table->dateTime('sent_code_date')->nullable();
            $table->float('avg');
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
        Schema::dropIfExists('students');
    }
}
