<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Psy\Util\Str;

class StudentRequest extends FormRequest
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
                'username' => 'required|unique:students,username|regex:/(^[A-Za-z0-9_]+$)+/',
                'password' => 'required|between:8,32|alpha_num',
                'name' => 'required',
                'national_code' => 'required|digits:10',
                'phone_number' => 'required|digits:11|starts_with:09',
                'avg'=>'required|numeric|between:0,20',
                'field' => 'required|in:math,science,lit',
                'level' => 'required|integer|between:1,4',
                'email'=> 'present'
        ];
    }
    protected function getValidatorInstance(){

        $validator = parent::getValidatorInstance();

        $validator->sometimes('email', 'email', function($input)
        {
            return $this->email != '' || $this->email != null;
        });

        return $validator;
    }
    public function messages()
    {
        return [
          'username.required' => 'لطفا نام کاربری را وارد کنید',
          'username.unique' => 'این نام کاربری از قبل انتخاب شده است',
           'username.regex' => 'نام کاربری باید شامل حروف انگلیسی و اعداد باشد',
          'password.required' => 'لطفا رمز عبور را وارد کنید',
          'password.between' => 'رمز عبور باید بین 8 تا 32 رقم باشد',
          'password.alpha_num' => 'رمز عبور باید شامل عدد و حروف باشد',
          'name.required' => 'لطفا نام و نام خانوادگی خود را وارد کنید',
          'national_code.required' => 'لطفا کد ملی خود را وارد کنید',
          'national_code.digits' => 'کد ملی باید 10 رقمی باشد',
          'phone_number.required' => 'لطفا شماره تلفن همراه خود را وارد کنید',
          'phone_number.digits' => 'شماره تلفن همراه باید 11 رقم باشد',
          'phone_number.starts_with' => 'شماره تلفن همراه خود را درست وارد کنید',
          'avg.required' => 'لطفا معدل خود را وارد کنید',
          'avg.numeric' => 'لطفا معدل خود را درست وارد کنید',
          'avg.between' => 'لطفا معدل خود را درست وارد کنید',
          'field.required' => 'لطفا رشته خود را وارد کنید',
            'field.in'=>'لطفا رشته خود را درست وارد کنید',
          'level.required' => 'لطفا مقطع تخصیلی خود را وارد کنید',
          'level.integer' => 'لطفا مقطع تحصیلی خود را درست وارد کنید',
          'level.between' => 'لطفا مقطع تحصیلی خود را درست وارد کنید',
          'email.present' => 'لطفا ایمیل خود را وارد کنید',
          'email.email'=>'لطفا ایمیل خود را درست وارد کنید'
        ];
    }
}
