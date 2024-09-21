<?php

namespace App\Http\Controllers;

use App\Exam;
use Hekmatinasser\Verta\Verta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ExamFlowController extends Controller
{
    public function startExam($id){
        //we have one for purchasing with start time null and others for take part with start time not null
            $student = Auth::user();
            $exam = Exam::find($id);
            $eqs = DB::table('exam_question')->where('exam_id' , '=' , $exam->id)->join('questions' , 'question_id' , '=' , 'questions.id')->select('exam_question.id as eq_id' , 'questions.*')->orderBy('id' , 'asc')->get();

            if(DB::select('SELECT * from student_exam where student_id='.$student->id.' AND exam_id='.$id.' AND  start_time IS NOT NULL AND end_time IS NULL')){
                //means page refreshed
                //lets find start time
                $exams = $student->exams;
                $start_time = null;
                foreach ($exams as $e){

                    if($e->pivot->start_time != null && $e->pivot->exam_id == $id){
                        $start_time = $e->pivot->start_time;
                        break;
                    }
                }
                if(abs(Verta::now()->diffMinutes(Verta::parse($start_time))) < intval($exam->time)){
                    //means still have time
                    return response()->json(['status' => 'm' , 'data' => ['se_id' => $id , 'exam_questions' => $eqs,'exam_id' => $exam->id , 'time' =>intval($exam->time)*60 - abs(Verta::now()->diffSeconds(Verta::parse($start_time))) , 'lesson' => $exam->lesson] , 'message' => 'آزمون ادامه پیدا کرد'] , 200);
                }
                else{
                    return response()->json(['status'=>'u' , 'data' => [] , 'message' => 'زمان شما برای آزمون تمام شده است و میتوانید در صورت نیاز از مشاور خود بخواهید اجازه ی دوباره آزمون دادن را بدهد'] , 200);
                }

            }
        if(DB::select('SELECT * from student_exam where student_id='.$student->id.' AND exam_id='.$id.' AND  start_time IS NOT NULL AND end_time IS NOT NULL')){
            return response()->json(['status' => 'g' , 'data' => [] , 'message' => 'شما قبلا در این آزمون شرکت کرده اید'] , 200);
        }
            if($exam->price != 0)
           $result = DB::select('SELECT * from student_exam where student_id='.$student->id.' AND exam_id='.$id.' AND start_time IS NULL');
            else{
                $result = true;
                  DB::table('student_exam')->insertGetId(
                    array('student_id' => $student->id,'exam_id'=>$exam->id,'start_time' => null , 'end_time' => null)
                );
            }
           if($result){
               //now we can set start time
              $student->exams()->updateExistingPivot($exam, array('start_time' => Verta::now()), false);
              $examx = $student->exams()->where('exam_id' , $id)->get()[0];
              $id = $examx->pivot->id;
                foreach($exam->questions as $e_question){
                    $e_question->correct = -1;
                }
               return response()->json(['status' => 's' , 'data' => ['se_id' => $id , 'exam_questions' => $eqs,'exam_id' => $exam->id , 'time' => intval($exam->time) * 60 , 'lesson' => $exam->lesson] , 'message' => 'آزمون آغاز شد'] , 200);
           }
           else{
               return response()->json(['status' => 'f' , 'data' => [] , 'message' => 'متاسفانه شما هنوز هرینه ی آزمون را پرداخت نکرده اید'] , 200);
           }


    }
    public function registerAnswers(Request $request){
        try {
            $student = Auth::user();
            $exam = Exam::find($request->exam_id);
            $number_of_questions = $exam->number_of_questions;
            $student->exams()->updateExistingPivot($exam, array('end_time' => Verta::now()), false);
            $se_id = $request->se_id;
            $exam_questions = $request->exam_questions;
            if(DB::table('se_eq')->where('se_id' , '=' , $se_id)->count() > 0)
                return response()->json(['status' => 's']);
            $added_eq_ids = [];
            foreach ($exam_questions as $eq) {
                if(!array_search($eq["id"],$added_eq_ids)) {
                    DB::insert('INSERT INTO se_eq(se_id,eq_id,choice) VALUES (' . $se_id . ' , ' . $eq["id"] . ' , ' . $eq["choice"] . ')');
                    $added_eq_ids[] = $eq["id"];
                }
            }
            //now we need to do the correction
                $answers = DB::table('se_eq')->select('*')->where('se_id' , $se_id)->join('exam_question','se_eq.eq_id' , '=' ,'exam_question.id')->join('questions' , 'exam_question.question_id' , '=' , 'questions.id')->get();
                $correct = 0;
                $incorrect = 0;
                foreach ($answers as $answer){
                    if($answer->correct == $answer->choice)
                        $correct++;
                    else
                        $incorrect++;
                }
                $whites = $number_of_questions - ($correct + $incorrect);
                $percentage = (($correct*3)-$incorrect)*100/($number_of_questions*3);
                $st_ex = DB::table('student_exam')->select('start_time' , 'end_time' )->where('id' , $se_id)->get()[0];
                $period = Verta::parse($st_ex->start_time)->diffSeconds(Verta::parse($st_ex->end_time));
                    $student->exams()->updateExistingPivot($exam, array('number_of_corrects' => $correct , 'number_of_incorrects' => $incorrect , 'number_of_whites' => $whites , 'score' => $percentage , 'period' => $period), false);
            return response()->json(['status' => 's']);
        }
        catch(\Exception $e){
            return response()->json(['status' => 'e' ,'data' =>['error' => $e->getMessage()] , 'message' => 'مشکلی در ثبت جواب های شما به وجود آمد'] , 500);
        }
    }
    public function corrections(Request $request){
        $exams = Exam::all();
        $student = Auth::user();
        $results = DB::table('student_exam')->where('student_id' , $student["id"])->join('exams' , 'student_exam.exam_id' , '=' , 'exams.id')->orderByDesc('student_exam.id')->select('exams.id as exam_id','exams.*','student_exam.*')->get();
            foreach ($results as $result){
                $result->answer = $exams->find(intval($result->exam_id))->answer;
            }
        return response()->json(['status'=>'s' , 'data'=>['exams'=>$results] , 'message'=>''] , 200);
    }
    public function adminCorrections(Request $request , $id){
        $exams = Exam::all();
        $results = DB::table('student_exam')->where('student_id' , $id)->join('exams' , 'student_exam.exam_id' , '=' , 'exams.id')->orderByDesc('student_exam.id')->select('exams.id as exam_id','exams.*','student_exam.*')->get();
        foreach ($results as $result){
            $result->answer = $exams->find(intval($result->exam_id))->answer;
        }
        return response()->json(['status'=>'s' , 'data'=>['exams'=>$results] , 'message'=>''] , 200);

    }
    public function adminCheckout(Request $request , $id){
//        $ses = DB::table('se_eq')->where('se_id' , '=' , $id)
//            ->rightJoin('exam_question' , 'se_eq.eq_id' , '=' , 'exam_question.id')
//            ->join('questions' , 'exam_question.question_id' , '=' , 'questions.id')->get();
        $exam_id=DB::table('student_exam')->find($id);
//        if($exam_id->student_id != ) return response()->json(['status' => 's' , 'data' => ['exam_questions' => []] , 'message' => ''] , 200);
        $ses = DB::table('exam_question')->where('exam_id' , '=' , $exam_id->exam_id)
            ->join('questions' , 'exam_question.question_id' , '=' , 'questions.id')->select('questions.*' ,'exam_question.id as eq_id')->get();
        $se_eq = DB::table('se_eq')->where('se_id' , '=' ,$id)->get();
//        var_dump($se_eq);
        foreach ($ses as $se){
            $answered = false;
            foreach ($se_eq as $seeq){
                if($seeq->eq_id == $se->eq_id){
                    $se->choice = $seeq->choice;
                    $answered = true;
                    break;
                }
            }
            if($answered == false){
                $se->choice = null;
            }
        }

        return response()->json(['status' => 's' , 'data' => ['exam_questions' => $ses] , 'message' => ''] , 200);
    }
}
