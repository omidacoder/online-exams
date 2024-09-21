<?php


namespace App\Repositories;


use App\Exam;
use App\Http\Requests\ExamEditRequest;
use App\Http\Requests\ExamRequest;
use Illuminate\Support\Facades\Request;

class ExamRepository
{

    public function create(ExamRequest $request)
    {
        //upload file later here

        $exam = new Exam($request->only(['name','description' , 'field' , 'level' , 'lesson' , 'number_of_questions','time','price']));
        $exam->verified = $request->verified == 'false' ? false : true;
        $image_rep = new ImageRepository();
        if($image_rep->upload($request,'Exams' , $exam)){
            $exam->save();
            return $exam;
        }
        else{
            return null;
        }
    }

    public function index($id)
    {
        return $id ? Exam::with('questions')->find($id)->get()[0] : Exam::all();
    }

    public function update(ExamEditRequest $request, $id)
    {
        //upload file again here

        if($exam = Exam::find($id)->get()[0]){
            $exam->update(($request->only(['name','description' , 'field' , 'level' , 'lesson' , 'number_of_questions','time','price'])));
            $exam->verified = $request->verified == 'false' ? false : true;
            $img_rep = new ImageRepository();
            $img_rep->upload($request,'Exams',$exam);
            $exam->save();
            return true;
        }
        return false;

    }

    public function destroy($id)
    {
        if($exam = Exam::all()->find($id)){
            $exam->delete();
            return true;
        }
        return false;
    }
}
