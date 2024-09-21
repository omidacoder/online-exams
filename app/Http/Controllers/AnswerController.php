<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Exam;
use App\Http\Requests\AnswerRequest;
use App\Student;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AnswerController extends Controller
{
    public function createOrUpdate(AnswerRequest $request,$id)
    {
        try {
            //lets upload the PDF file
            $exam = Exam::all()->find($id);
            if ($exam == null) return response()->json(['status' => 'f', 'data' => [], 'message' => 'آزمون مورد نظر یافت نشد'], 200);
            $oldAnswer = $exam->answer;
            if ($oldAnswer != null) {
                $oldAnswer->exam()->dissociate();
                $oldPath = $oldAnswer->path;
                $oldAnswer->delete();
                //delete the file here
                Storage::disk('private')->delete($oldPath);
            }
            $pdf = $request->file('answer');
            $path = Storage::disk('private')->put('Answers', $pdf);
            $answer = new Answer(['path' => $path]);
            $answer->exam()->associate($exam);
            $answer->save();
            return response()->json(['status' => 's', 'data' => [], 'message' => ''], 201);
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => [] , 'message' => $e->getMessage()] , 500);
        }
    }
    public function downloadAnswer(Request $request , $id){
        try {
            // lets see if the student finished the exam
            $se = DB::table('student_exam')->find($id);
            if($se == null) return response()->json(['status' => 'f'] , 200);
            $student = Student::all()->find($se->student_id);
            $exam = Exam::all()->find($se->exam_id);
//            $finishedCount = DB::table('student_exam')->where('student_id' , '=' , $student->id)->where('exam_id' , '=' , $se->exam_id)->count();
//            if($finishedCount == 1){
//                return \response('شما اجازه ی دسترسی به فایل را ندارید');
//            }
            //now the admin has access to the file let him or her download
            $answer = $exam->answer;
            if($answer == null) return \response('برای این آزمون پاسخی ثبت نشده است');
            return Storage::disk('private')->download($answer->path, $exam->name.'.pdf' , ['Content-Type: application/pdf']);
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => [] , 'message' => $e->getMessage()] , 500);
        }
    }
    public function studentDownloadAnswer(Request $request , $id){
        try {
            // lets see if the student finished the exam
            $se = DB::table('student_exam')->find($id);
            if($se == null) return response()->json(['status' => 'f'] , 200);
            $student = Auth::user();
            if($student->id != $se->student_id) return \response('شما اجازه ی دسترسی به فایل را ندارید');
            $exam = Exam::all()->find($se->exam_id);
            $finishedCount = DB::table('student_exam')->where('student_id' , '=' , $student->id)->where('exam_id' , '=' , $se->exam_id)->count();
            if($finishedCount == 0){
                return \response('شما اجازه ی دسترسی به فایل را ندارید');
            }
            //now the student has access to the file let him or her download
            $answer = $exam->answer;
            if($answer == null) return \response('برای این آزمون پاسخی ثبت نشده است');
            return Storage::disk('private')->download($answer->path, $exam->name.'.pdf' , ['Content-Type: application/pdf']);
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => [] , 'message' => $e->getMessage()] , 500);
        }
    }
}
