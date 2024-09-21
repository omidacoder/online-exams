<?php


namespace App\Repositories;

use Illuminate\Support\Facades\Request;

interface ImageRepositoryInterface
{
    public function upload($request,$directory_name,$model); //getting file from request and upload it to storage folder and returns path of file or null
}
