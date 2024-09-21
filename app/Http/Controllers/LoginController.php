<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function adminLogin(Request $request)
    {
        //fill session data
        session()->put('admin_username',$request->admin_username);
        session()->put('admin_password',$request->admin_password);
        session()->put('X_API_TOKEN',$request->X_API_TOKEN);
        return response()->json(['status' => 's']);
    }

    public function studentLogin(Request $request)
    {
        if( $request->headers->has('Authorization')) {
            // session()->put('Content-type', $request->headers->get('Content-type'));
            session()->put('Authorization', $request->headers->get('Authorization'));
            if($request->headers->has('Accept')) session()->put('Accept' , $request->headers->get('Accept'));
            if($request->headers->has('Host')) session()->put('Host' , $request->headers->get('Host'));
            return \response()->json(['status' => 's']);
        }
        else{
            // echo 'Authorization cond is'. $request->headers->has('Authorization');
            // echo 'Content-Type cond is'. $request->headers->has('Content-type');
            // var_dump($request->headers->all());
            return response()->json(['status' => 'f']);
        }

    }

    public function advisorLogin()
    {
        //later
    }
}
