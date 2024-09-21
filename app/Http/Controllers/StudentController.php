<?php

namespace App\Http\Controllers;

use App\Exam;
use App\Http\Requests\StudentRequest;
use App\Repositories\StudentRepository;
use App\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StudentEditRequest;

class StudentController extends Controller
{
    public function searchByUsername($username){
        $student = Student::all()->where('username' , '=' , $username)->first();
        if($student != null){
            return response()->json(['status' => 's' , 'data'=>['student' => $student] , 'message' => ''] , 200);
        }
        else{
            return response()->json(['status' => 's' , 'data' => [] , 'message' => ''] , 200);
        }
    }

    private function check_for_existance($value,$values){
     foreach ($values as $array_value){
         if($array_value['id'] === $value['id']) {
             return true;
         }
     }
     return false;
    }
    public function getSuitableExams(){
        try {

            if ($student = Auth::user()) {
                $purchased_exams = $student->exams;
                foreach ($purchased_exams as $purchased_exam){
                     unset($purchased_exam->questions);
                    if($purchased_exam->pivot->start_time == null){
                        $purchased_exam->purchased = true;
                        $purchased_exam->take_part = false;
                        $purchased_exam->running = false;
                    }
                    else{
                        if($purchased_exam->pivot->end_time == null)
                        {
                            $purchased_exam->running = true;
                            $purchased_exam->take_part = false;
                        }
                        else{
                            $purchased_exam->take_part = true;
                            $purchased_exam->running = false;
                        }
                        $purchased_exam->purchased = false;

                    }
                }
                if($student->username == 'omidamusici')
                    $suitable_exams = Exam::all();
                    else
                $suitable_exams = Exam::all()->where('verified' , 1)->sortBy('created_at');
                foreach ($suitable_exams as $exam){
                    if(!$this->check_for_existance($exam , $purchased_exams) && count($exam->questions) == $exam->number_of_questions){
                        unset($exam->questions);
                        $exam->purchased = false;
                        $exam->take_part = false;
                        $purchased_exams[]=$exam;
                    }
                }
                //reversing
                $j = count($purchased_exams)-1;
                $result = [];
                for($i = 0;$i<count($purchased_exams);$i++){
                    $result[$i] = $purchased_exams[$j];
                    $j--;
                }
                return response()->json(['status' => 's', 'data' => ['exams' => $result ], 'message' => ''], 200);

            } else {
                return response()->json(['status' => 'f', 'data' => [], 'message' => 'unauthorized'], 200);
            }
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }
    public function sendAgain($id){
        $student = Student::all()->find($id);
        $stu_rep = new StudentRepository();
        if($stu_rep->sendAgain($student)){
            return \response()->json(['status' => 's' , 'data' => [] , 'message' => 'کد شش رقمی دوباره برای شما ارسال شد'] , 200);
        }
        else{
            return \response()->json(['status' => 'f' , 'data' => [] , 'message' => 'هنوز 2 دقیقه از زمان ارسال قبلی نگذشته است'] , 200);
        }
    }
    public function showVerify(Request $request){
           return view('verify')->with(['user_id' => $request->user_id]);
    }
    public function verify(Request $request,$id){
        $stu_rep = new StudentRepository();
        if($stu_rep->verifyPhoneNumber($id,$request->code)){
            return response()->json(['status' => 's' , 'data' => []] , 200);
        }
        else{
            return response()->json(['status' => 'f' , 'data' => [$request->code], 'message' => 'not_found'] , 200);
        }

    }
    public function adminCreate(StudentRequest $request)
    {
        try {
            $stu_rep = new StudentRepository();
            $user = $stu_rep->create($request,'a');
            return \response()->json(['status' => 's' , 'data' => ['student' => $user]] , 201);
        }
        catch (\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }
    public function userCreate(StudentRequest $request)
    {
        try {
            $stu_rep = new StudentRepository();
            $user = $stu_rep->create($request,'u');
            $stu_rep->sendSMS($user);
            return \response()->json(['status' => 's' , 'data' => ['studentId' => $user->id]] , 201);
        }
        catch (\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }
    public function userIndex(){
        try {
            if ($user = Auth::user()) {
                unset($user->password);
                unset($user->verification_code);
                unset($user->zarin_authority);
                unset($user->purchased);
                unset($user->verified);
                unset($user->sent_code_date);
                unset($user->last_purchase_id);
                return response()->json(['status' => 's', 'data' => ['student' => $user]], 200);
            } else {
                return response()->json(['status' => 'f', 'data' => [],'message'=>'unauthorized'], 200);
            }
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }
    public function adminIndex($id = null){
        try {
           $stu_rep = new StudentRepository();
           $students = $stu_rep->index($id);
           if($students != null)
           return response()->json(['status' => 's' , 'data' => ['students' => $students]] , 200);
           else{
               return response()->json(['status' => 'f' , 'data' => [], 'message' => 'not_found'] , 200);
           }
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }
    public function adminUpdate(StudentEditRequest $request,$id){
        try{
            $stu_rep = new StudentRepository();
            if($stu_rep->update($request,$id))
            return response()->json(['status' => 's' , 'data' => []],200);
            else{
                return response()->json(['status' => 'f' , 'data' => [], 'message' => 'not_found'] , 200);
            }
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }
    public function userUpdate(StudentEditRequest $request){
        try {
            $user = Auth::user();
            $stu_rep = new StudentRepository();
            if ($stu_rep->update($request, $user->id)){
                return response()->json(['status' => 's' , 'data' => []],200);
            }
            else{
                return response()->json(['status' => 'f' , 'data' => [], 'message' => 'not_found'] , 200);
            }
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }
    public function destroy($id){
        try{
            $stu_rep = new StudentRepository();
            if($stu_rep->destroy($id)){
                return response()->json(['status' => 's' , 'data' => []],200);
            }
            else{
                return response()->json(['status' => 'f' , 'data' => [], 'message' => 'not_found'] , 200);
            }
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }

}
