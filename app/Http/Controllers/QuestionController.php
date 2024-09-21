<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuestionEditRequest;
use App\Http\Requests\QuestionRequest;
use App\Repositories\QuestionRepository;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function adminCreate(QuestionRequest $request)
    {
        try{
            $q_rep = new QuestionRepository();
            $question = $q_rep->create($request);
            return response()->json(['status' => 's' , 'data' => ['question' => $question[0] , 'full' => $question[1]] , 'message' => 'سوال با موفقیت ایجاد شد'] , 201);
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }
    public function adminIndex($id = null)
    {
        try{
            $q_rep = new QuestionRepository();
            if($question = $q_rep->index($id)){
                return response()->json(['status' => 's' , 'data' => ['questions' => $question] , 'message' => ''] , 200);
            }
            else{
                return response()->json(['status' => 'f' , 'data' => ['questions' => []] , 'message' => 'سوال مورد نظر یافت نشد'] , 200);
            }
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }
    public function adminUpdate(QuestionEditRequest $request , $id = null)
    {
        try{
            $q_rep = new QuestionRepository();
            if($q_rep->update($request,$id)){
                return response()->json(['status' => 's' , 'data' => [] , 'message' => 'سوال با موفقیت ویرایش شد'] , 200);
            }
            else{
                return response()->json(['status' => 'f' , 'data' => ['questions' => []] , 'message' => 'سوال مورد نظر یافت نشد'] , 200);

            }
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }
    public function adminDestroy($id = null)
    {
        try{
            $q_rep = new QuestionRepository();
            if($q_rep->destroy($id)){
                return response()->json(['status' => 's' , 'data' => [] , 'message' => 'سوال با موفقیت حذف شد'] , 200);
            }
            else{
                return response()->json(['status' => 'f' , 'data' => ['questions' => []] , 'message' => 'سوال مورد نظر یافت نشد'] , 200);

            }
        }
        catch(\Exception $e){
            return \response()->json(['status' => 'e' , 'data' => ['error' => $e->getMessage()]] , 500);
        }
    }
}
