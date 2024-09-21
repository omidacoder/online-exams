<?php


namespace App\Repositories;


use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;

class ImageRepository implements ImageRepositoryInterface
{

    public function upload($request,$directory_name,$model)
    {
        try {
            //the field in the request is image_file
            $image = $request->file('image');
            $path = Storage::disk('public')->put($directory_name, $image);
            //save path in database
            $model->path = $path;
            $model->save();
            return true;
        }
        catch (\Exception $e){
//            var_dump($e->getMessage());
            return false;
        }
    }
}
