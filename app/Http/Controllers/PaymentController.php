<?php

namespace App\Http\Controllers;

use App\Exam;
use App\Repositories\StudentRepository;
use App\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Zarinpal\Laravel\Facade\Zarinpal;



class PaymentController extends Controller
{
    //method for initializing the payment
    public function initialize(Request $request)
    {
        if($student = Auth::user()) {

            $exam_id = $request->query('exam_id');
            try {

                $exam_id = intval($exam_id);
            } catch (\Exception $exception) {
                return 'اطلاعات شما اشتباه است';
            }

            $exam = Exam::find($exam_id);
            if (!$student || !$exam)
                return 'اطلاعات شما ناقص است';
            if (!$exam->verified)
                return 'شما مجاز به شرکت در این آزمون نیستید';
            $zarinpal = new \Zarinpal\Zarinpal('faf9f107-4add-436f-96d6-c9fabd11e972');
            $results = $zarinpal->request(
                "https://dominokonkur.ir/payment/finalize",
                $exam->price,
                'ثبت نام آزمون آنلاین دومینو کنکور '
            );
            $student->zarin_authority = $results['Authority'];
            $student->last_purchase_id = $exam_id;
            $student->save();
            $zarinpal->redirect();
        }
        else{
            return 'اطلاعات شما اشتباه است';
        }
    }

    public function finalize(Request $request)
    {
        $student_rep = new StudentRepository();
        $student = $student_rep->getStudentWithAuthority($request->query('Authority'));
        if($student == null) return 'در کامل کردن پرداخت مشکلی به وجود آمده و هزینه شما برگشت میخورد';
        if($request->query('Status') == 'OK') {
            $exam = Exam::find($student->last_purchase_id);
             Zarinpal::verify('OK',$exam->price,$student->zarin_authority);
            //setting things
            $student->exams()->attach($exam);
            session()->put('payment' , 'success');
            return redirect()->to('https://dominokonkur.ir/student/panel');
        }
        else{
            session()->put('payment' , 'failed');
            return redirect()->to('https://dominokonkur.ir/student/panel');
        }
    }
}
