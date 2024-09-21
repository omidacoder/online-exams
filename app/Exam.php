<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $table = 'exams';
    protected $fillable = ['name','description' , 'field' , 'level' , 'lesson' , 'number_of_questions' , 'verified','time','price'];
    public function questions(){
        return $this->belongsToMany(Question::class , 'exam_question','exam_id','question_id')
            ->using(ExamQuestion::class);
    }
    public function answer(){
        return $this->hasOne(Answer::class , 'exam_id' ,'id');
    }
}
