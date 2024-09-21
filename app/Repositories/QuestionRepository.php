<?php


namespace App\Repositories;


use App\Exam;
use App\Http\Requests\QuestionEditRequest;
use App\Question;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\QuestionRequest;

class QuestionRepository
{

    public function create(QuestionRequest $request)
    {
        $question = new Question($request->only(['description'  , 'first_ans' , 'second_ans' , 'third_ans' , 'fourth_ans' , 'correct']));
        $img_rep = new ImageRepository();
        $img_rep->upload($request,'Questions',$question);
        if($this->addToExam($question,$request->exam_ids)) {
            $question->save();
            return [$question, true];
        }
        else{
            $question->save();
            return [$question , false];
        }
    }
    private function addToExam(Question $question,$exam_ids){
        //first lets detach all before relations
        foreach ($question->exams as $exam){
            $question->exams()->detach($exam->id);
        }
        if($exam_ids == '') return;
        $ids = explode(',' , $exam_ids);
        $cond = true;
        foreach ($ids as $id){
            $exam = Exam::find(intval($id));
            if($exam->number_of_questions > count($exam->questions))
            $question->exams()->attach(intval($id));
            else{
                $cond = false;
            }

        }
        return $cond;
    }

    public function index($id)
    {
        return $id ? Question::find($id)->get()[0] : Question::all();
    }

    public function update(QuestionEditRequest $request, $id)
    {
        if($question = Question::find($id)->get()[0]){
            $question->update($request->only(['description' , 'first_ans' , 'second_ans' , 'third_ans' , 'fourth_ans' , 'correct']));
            $img_rep = new ImageRepository();
            $img_rep->upload($request,'Questions',$question);
            $this->addToExam($question,$request->exam_ids);
            $question->save();
            return true;
        }
        return false;
    }

    public function destroy($id)
    {
        try {
            if ($question = Question::all()->find($id)) {
                //deleting relations with exams and image
                foreach ($question->exams as $exam) {
                    $question->exams()->detach($exam->id);
                }
                Storage::delete($question->path);
                $question->delete();
                return true;
            }
            return false;
        }
        catch(\Exception $e){
            return false;
        }
    }
}
