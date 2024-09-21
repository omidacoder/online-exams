<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'questions';
    protected $fillable = ['description' , 'path' , 'first_ans' , 'second_ans' , 'third_ans' , 'fourth_ans' , 'correct'];
    public function exams(){
        return $this->belongsToMany(Exam::class , 'exam_question' ,'question_id' ,'exam_id' )
            ->using(ExamQuestion::class);
    }
}
