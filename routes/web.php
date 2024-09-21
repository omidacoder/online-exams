<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//login routes
Route::post('administrator/login' , 'LoginController@adminLogin')->middleware(['origins']);
Route::get('student/login' , 'LoginController@studentLogin')->middleware(['origins']);
Route::get('advisor/login' , 'LoginController@advisorLogin')->middleware(['origins']);
Route::get('/' , function(){
    return Response::view('welcome');
});
Route::get('administrator' , function (){
    return Response::view('admin_login');
});
Route::get('administrator/panel' , function(){
    return response()->view('admin_panel');
})->middleware(['administration']);
Route::get('student/panel' , function (Illuminate\Http\Request $request){
    if(Auth::user()->verified) {
        if (session()->has('payment')) {
            if (session()->get('payment') == 'success') {
                return view('student_panel')->with(['payment' => 'success']);
            } else {
                return view('student_panel')->with(['payment' => 'failed']);
            }
        }
        if ($request->query('examEnded') == 'true') {
            return view('student_panel')->with(['ended' => 'true']);
        }

    return Response::view('student_panel');
    }
    return 'شماره تلفن شما تایید نشده است لطفا دوباره ثبت نام کنید';
})->middleware(['multiauth:student' , 'origins']);
Route::get('payment/initialize' , 'PaymentController@initialize')->middleware(['multiauth:student','origins']);
Route::get('payment/finalize' , 'PaymentController@finalize')->middleware(['origins']);
Route::get('exam/start' , function(Request $request){
    return Response::view('azmoon');
})->middleware(['origins']);
Route::get('/checkout' , function(){
   return response()->view('checkout');
});
Route::get('administrator/exam/answer/get/{id}' , 'AnswerController@downloadAnswer')->middleware(['administration']);
Route::get('student/exam/answer/get/{id}' , 'AnswerController@studentDownloadAnswer')->middleware(['multiauth:student']);
Route::get('artisan' , function(){
    \Illuminate\Support\Facades\Artisan::call('view:clear');
});
//Route::get('artisan' , function(){
//    \Illuminate\Support\Facades\Artisan::call('migrate');
//});
//Route::get('artisan' , function(){
//    $students = \App\Student::all();
//    foreach($students as $student){
//        $student->username = strtolower($student->username);
//        $student->save();
//    }
//    echo 'ended';
//});


