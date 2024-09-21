<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnswerRequest extends FormRequest
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
            'answer' => 'file|mimes:pdf'
        ];
    }
    public function messages()
    {
        return [
            'answer.file' => 'مشکلی در آپلود فایل به وجود آمده است',
            'answer.mimes' => 'فرمت قابل قبول برای فایل pdf است'
        ];
    }
}
