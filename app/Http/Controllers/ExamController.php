<?php

namespace App\Http\Controllers;

use App\Exam;
use App\Http\Requests\ExamEditRequest;
use App\Http\Requests\ExamRequest;
use App\Repositories\ExamRepository;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ExamController extends Controller
{
    public function adminCreate(ExamRequest $request){
        try {
            $ex_rep = new ExamRepository();
            $exam = $ex_rep->create($request);
            if($exam == null) return \response()->json(['status' => 'f' , 'data' => [] , 'message' => 'مشکلی در آپلود کردن عکس ها به وجود آمده است'] , 200);
            return response()->json(['status' => 's' , 'data' => ['exam' => $exam] , 'message' => 'آزمون با موفقیت ایجاد شد'] , 201);
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }


    }
    public function adminUpdate(ExamEditRequest $request,$id = null){
        try {
            $ex_rep = new ExamRepository();
            if ($ex_rep->update($request, $id)) {
                return response()->json(['status' => 's', 'data' => [], 'message' => 'آرمون با موفقیت ویرایش شد'], 200);
            } else {
                return response()->json(['status' => 'f', 'data' => [], 'message' => 'آزمون مورد نظر یافت نشد'], 200);
            }
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }

    }
    public function adminToggle($id){
        $exam = Exam::all()->find($id);
        if($exam != null){
            if($exam->verified){
                $exam->verified = false;
                $exam->save();
                return \response()->json(['status' => 's' , 'data' => ['signal' =>'1'] , 'message' => ''] , 200);
            }
            else{
                $exam->verified = true;
                $exam->save();
                return \response()->json(['status' => 's' , 'data' => ['signal' =>'0'] , 'message' => ''] , 200);
            }


        }
        else{
            return \response()->json(['status' => 'f' , 'data' => [] , 'message' => 'آزمون مورد نظر پیدا نشد'] , 200);
        }
    }
    public function adminDestroy($id = null){
        try {
            $ex_rep = new ExamRepository();
            if($ex_rep->destroy($id)){
                return response()->json(['status' => 's' , 'data' => [] , 'message' => 'آزمون با موفقیت حذف شد'] , 200);
            }
            else{
                return \response()->json(['status' => 's' , 'data' => [] , 'message' => 'آزمون مورد نظر یافت نشد'] , 200);
            }
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }
    public function adminIndex($id = null){
        try {
            $ex_rep = new ExamRepository();
            if($exams = $ex_rep->index($id)){
                return \response()->json(['status' => 's' , 'data' => ['exams' => $exams] , 'message' => ''] , 200);
            }
            else{
                return \response()->json(['status' => 'f' , 'data' => ['exams' => []] , 'message' => 'آزمون مورد نظر یافت نشد'] , 200);
            }
        }
        catch(Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }
    public function search(Request $request){
        $exams = null;
        if(!$request->has('level')){
            $exams = Exam::where('field' , $request->field)->get();
        }
        elseif (!$request->has('field')){
            $exams = Exam::where('level'  , $request->level)->get();
        }else $exams = Exam::where(['level' => $request->level , 'field' => $request->field])->get();
        return \response()->json(['status' => 's' , 'data' => ['exams' => $exams] , 'message' => ''], 200);
    }
    public function destroyStudentExam(Request $request,$id){
        try {
            $result = DB::table('student_exam')->delete($id);
            //lets delete answers
            DB::table('se_eq')->where('se_id' , '=' , $id)->delete();
            return \response()->json(['status' => 's' , 'data' => ['result' => $result] , 'message' => 'با موفقیت خذف شذ'] , 200);
        }
        catch(\Exception $e) {
            return \response()->json(['status' => 'e', 'data' => ['errors' => $e->getMessage()], 'message' => 'خطایی رخ داد'], 500);
        }
    }
}
