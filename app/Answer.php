<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = ['path'];
    protected $table = 'answers';

    public function exam(){
        return $this->belongsTo(Exam::class ,'exam_id' ,'id');
    }
}
