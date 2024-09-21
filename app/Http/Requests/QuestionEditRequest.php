<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuestionEditRequest extends FormRequest
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
            'description' => 'required',
            'image' => 'mimes:jpg,jpeg,png|file',
            'first_ans' => 'required',
            'second_ans' => 'required',
            'third_ans' => 'required',
            'fourth_ans' => 'required',
            'exam_ids' => 'present'

        ];
    }
    public function messages()
    {
        return [
            'description.required' => 'لطفا شناسه آزمون را وارد کنید',
            'image.mimes' => 'لطفا فایل عکسی را برای آپلود انتخاب کنید',
            'image.file' => 'لطفا عکس را درست وارد کنید',
            'first_ans.required' => 'لطفا گزینه اول را وارد کنید',
            'second_ans.required' => 'لطفا گزینه ئوم را وارد کنید',
            'third_ans.required' => 'لطفا گزینه سوم را وارد کنید',
            'fourth_ans.required' => 'لطفا گزینه چهارم را وارد کنید',
            'exam_ids.present' => 'مشکلی در درخواست شما وجود دارد'
        ];
    }
}
