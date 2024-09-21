<?php


namespace App\Repositories;


use App\Advisor;
use App\Exam;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Request;


class AdvisorRepository implements CrudInterface
{

    public function create(Request $request)
    {
        $advisor = new Advisor($request->only(['username' , 'name' , 'phone_number','national_code' , 'email']));
        $advisor->password = Hash::make($request->password);
        $advisor->save();
    }

    public function index($id)
    {
        return $id ? Advisor::find($id)->get() : Advisor::all();
    }

    public function update(Request $request, $id)
    {
        if($advisor = Advisor::find($id)->get()){
            $advisor->update(($request->only(['name','description' , 'filed' , 'level' , 'lesson' , 'path' , 'description' , 'number_of_questions'])));
            $advisor->save();
            return true;
        }
        return false;
    }

    public function destroy($id)
    {
        if($advisor = Advisor::find($id)->get()){
            $advisor->delete();
            return true;
        }
        return false;
    }
}
