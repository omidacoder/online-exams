<?php


namespace App\Repositories;


use App\Http\Requests\StudentRequest;
use App\Student;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StudentEditRequest;

class StudentRepository implements StudentRepositoryInterface
{

    public function create(StudentRequest $request , $type)
    {
        $request->username = strtolower($request->username);
        if($request->username === 'admin') return null;
        foreach (Student::all() as $student){
            if($student == $request->username){
                return null;
            }
        }

        $student = new Student($request->only(['username', 'name', 'national_code', 'phone_number', 'avg', 'field', 'level', 'email']));
        $student->password = Hash::make($request->password);
        if($type == 'a'){
        $student->verified = true;
        $student->purchased = true;
        }
        else{
            $student->verification_code = $this->generateCode();
            $student->sent_code_date = Carbon::now();
            $student->verified = false;
        $student->purchased = false;
        }
        $student->save();
        return $student;
    }

    public function index($id)
    {
        if($id == null){
            return Student::where('verified' , 1)->orderByDesc('created_at')->get();
        }
        else{
            return Student::all()->find($id);
        }
    }

    public function update(StudentEditRequest $request,$id)
    {
        $student = Student::all()->find($id);
        if($student == null){
            return false;
        }
        else{
            $student->update($request->only(['username', 'name', 'national_code', 'phone_number', 'avg', 'field', 'level', 'email']));
            $student->password = Hash::make($request->password);
            $student->save();
            return true;
        }
    }

    public function destroy($id)
    {
        $student = Student::all()->find($id);
        if($student == null){
            return false;
        }
        else{
            $student->delete();
            return true;
        }
    }
    private function generateCode()
    {
        $alowed_numbers = ['0','1','2','3','4','5','6','7','8','9'];
        $code = '';
        for($i = 0;$i<6;$i++){
            $code .= $alowed_numbers[rand(0,9)];
        }
        return $code;
    }
    public function sendAgain($student)
    {      if(Carbon::parse($student->sent_code_date)->diffInMinutes(Carbon::now())>2){
            $student->verification_code = $this->generateCode();
            $student->send_code_date = Carbon::now();
            $student->save();
             $this->sendSMS($student);
            return true;
            }
            else{
                return false;
            }

    }

    public function verifyPhoneNumber($id, $number)
    {
        if($student = Student::all()->find($id)){
            if($student->verification_code == $number ){
                $student->verified = true;
                $student->save();
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    public function sendSMS( $student){
        $phone_number = $student->phone_number;
        $code = $student->verification_code;
            $username = env('SMS_USERNAME');
            $password = env('SMS_PASSWORD');
            $from = env('SMS_FROM');
            $pattern_code = env('SMS_PATTERN_CODE');
            $to = array($phone_number);
            $input_data = array("verification-code" => $code);
            $url = "https://ippanel.com/patterns/pattern?username=" . $username . "&password=" . urlencode($password) . "&from=$from&to=" . json_encode($to) . "&input_data=" . urlencode(json_encode($input_data)) . "&pattern_code=$pattern_code";
            $handler = curl_init($url);
            curl_setopt($handler, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($handler, CURLOPT_POSTFIELDS, $input_data);
            curl_setopt($handler, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec($handler);
            $student->sent_code_date = Carbon::now();
            $student->save();
            return $response;

    }
    public function getStudentWithAuthority($authority){
        return Student::where('zarin_authority' , $authority)->get()[0];

    }
}
