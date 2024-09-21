<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//    Route::get('/student/get', function (Request $request) {
//        return $request->user(); // You can use too `$request->user('admin')` passing the guard.
//    })->middleware(['multiauth:student']);

//For Student Management
Route::post('administrator/student/create' , 'StudentController@adminCreate')->middleware(['origins','administration']);
Route::post('student/create' , 'StudentController@userCreate')->middleware(['origins']);
Route::get('administrator/student/get/{id}' , 'StudentController@adminIndex')->middleware(['origins','administration']);
Route::get('administrator/student/all' , 'StudentController@adminIndex')->middleware(['origins','administration']);
Route::get('student/get' , 'StudentController@userIndex')->middleware(['multiauth:student','origins']);
Route::post('administrator/student/update/{id}' , 'StudentController@adminUpdate')->middleware(['origins','administration']);
Route::post('student/update' , 'StudentController@userUpdate')->middleware(['multiauth:student','origins']);
Route::get('administrator/student/delete/{id}' , 'StudentController@destroy')->middleware(['origins','administration']);
Route::post('student/verify/{id}' , 'StudentController@verify');
Route::get('student/send/{id}' , 'StudentController@sendAgain');
Route::get('administrator/student/search/{username}' , 'StudentController@searchByUsername');
//For Exam Management
Route::post('administrator/exam/create' , 'ExamController@adminCreate')->middleware(['origins','administration']);
Route::post('administrator/exam/get/{id}' , 'ExamController@adminIndex')->middleware(['origins','administration']);
Route::get('administrator/exam/all' , 'ExamController@adminIndex')->middleware(['origins','administration']);
Route::post('administrator/exam/update/{id}' , 'ExamController@adminUpdate')->middleware(['origins','administration']);
Route::get('administrator/exam/toggle/{id}','ExamController@adminToggle')->middleware(['origins' , 'administration']);
Route::get('administrator/exam/delete/{id}' , 'ExamController@adminDestroy')->middleware(['origins','administration']);
//for student exams
Route::get('administrator/se/delete/{id}' , 'ExamController@destroyStudentExam')->middleware(['origins' , 'administration']);
//Exam Search
Route::get('administrator/exam/search' , 'ExamController@search')->middleware(['origins' , 'administration']);
//For Question Management
Route::post('administrator/question/create' , 'QuestionController@adminCreate')->middleware(['origins','administration']);
Route::post('administrator/question/get/{id}' , 'QuestionController@adminIndex')->middleware(['origins','administration']);
Route::get('administrator/question/all' , 'QuestionController@adminIndex')->middleware(['origins','administration']);
Route::post('administrator/question/update/{id}' , 'QuestionController@adminUpdate')->middleware(['origins','administration']);
Route::get('administrator/question/delete/{id}' , 'QuestionController@adminDestroy')->middleware(['origins','administration']);
//Routes Newly Added
Route::get('student/exams/get_suitable' , 'StudentController@getSuitableExams')->middleware(['multiauth:student','origins']);
Route::get('student/exam/start/{id}' , 'ExamFlowController@startExam')->middleware(['multiauth:student','origins']);
Route::post('student/exam/end' , 'ExamFlowController@registerAnswers')->middleware(['multiauth:student','origins']);
Route::get('student/corrections' , 'ExamFlowController@corrections')->middleware(['multiauth:student','origins']);
Route::get('admin/corrections/{id}' , 'ExamFlowController@adminCorrections')->middleware(['administration' , 'origins']);
Route::get('administrator/checkout/start/{id}' , 'ExamFlowController@adminCheckout')->middleware(['administration' , 'origins']);
Route::get('checkout/start/{id}' , 'ExamFlowController@adminCheckout')->middleware(['multiauth:student' , 'origins']);
//answerController
Route::post('administrator/exam/answer/upload/{id}' , 'AnswerController@createOrUpdate')->middleware(['administration' , 'origins']);




//testing routes
