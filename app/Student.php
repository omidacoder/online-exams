<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use SMartins\PassportMultiauth\HasMultiAuthApiTokens;

class Student extends Authenticatable
{
    use Notifiable, HasMultiAuthApiTokens;
    protected $table = 'students';
    protected $fillable = ['username' , 'password' , 'name','national_code' , 'phone_number' , 'avg','field','level','email'];
    public function findForPassport($username)
    {
        return $this->where('username', $username)->first();
    }
    public function exams(){
        return $this->belongsToMany(Exam::class , 'student_exam')->using(StudentExam::class)->withPivot(['id','number_of_corrects' , 'number_of_incorrects' , 'number_of_whites' , 'score','start_time' , 'end_time','created_at' , 'updated_at']);
    }
}
