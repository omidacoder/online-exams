<?php


namespace App\Repositories;




use Illuminate\Support\Facades\Request;

interface CrudInterface
{
    public function create(Request $request);
    public function index($id);
    public function update(Request $request,$id);
    public function destroy($id);
}
