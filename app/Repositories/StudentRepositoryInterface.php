<?php


namespace App\Repositories;


use App\Http\Requests\StudentRequest;
use App\Http\Requests\StudentEditRequest;

interface StudentRepositoryInterface
{
    public function create(StudentRequest $request,$type);
    public function index($id); //can be somthing or can be null
    public function update(StudentEditRequest $request,$id);
    public function destroy($id);
    public function verifyPhoneNumber($id,$number);
//    public function sendSmsToAll();
}
