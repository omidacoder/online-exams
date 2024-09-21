<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|unique:exams,name',
            'description' => 'present',
            'field' => 'required|in:math,science,lit',
            'level' => 'required|integer|between:1,4',
            'lesson' => 'required',
            'number_of_questions' => 'required|integer',
            'image' => 'mimes:jpg,jpeg,png|file',
            'time' => 'required|integer|gt:0',
            'price' => 'required|integer|gte:0'
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'لطفا نام آزمون را وارد کنید',
            'name.unique' => 'این نام از قبل وجود دارد',
            'description.present' => 'خطا در توضیحات',
            'field.required' => 'لطفا رشته خود را وارد کنید',
            'field.in'=>'لطفا رشته خود را درست وارد کنید',
            'level.required' => 'لطفا مقطع تخصیلی خود را وارد کنید',
            'level.integer' => 'لطفا مقطع تحصیلی خود را درست وارد کنید',
            'level.between' => 'لطفا مقطع تحصیلی خود را درست وارد کنید',
            'lesson.required' => 'لطفا درس این آزمون را وارد کنید',
            'number_of_questions.required' => 'لطفا تعداد سوالات را وارد کنید',
            'number_of_questions.integer' => 'لطفا تعداد سوالات را درست وارد نمایید',
            'image_file.mimes' => 'فرمت عکس آپلود شده نا درست میباشد',
            'image_file.file' => 'عکس به درستی آپلود نشده است',
            'time.required' => 'لطفا زمان آزمون را وارد کنید',
            'time.integer' => 'لطفا زمان را درست وارد کنید',
            'time.gt' => 'زمان باید بزرگتر از 0 باشد',
            'price.required' => 'لطفا هزینه آزمون را وارد کنید',
            'price.integer' => 'لطفا هزینه را درست وارد کنید',
            'price.gte' => 'هزینه باید بزرگتر مساوی از 0 باشد',


        ];
    }
}
