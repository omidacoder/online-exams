<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Hash;

class Administration
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        if(session()->has('admin_username') && session()->has('admin_password') && session()->has('X_API_TOKEN')){
            $request->headers->set('admin_username' , session()->get('admin_username'));
            $request->headers->set('admin_password' , session()->get('admin_password'));
            $request->headers->set('X_API_TOKEN' , session()->get('X_API_TOKEN'));
        }

        if($request->headers->has('admin_username') && $request->headers->has('admin_password') && $request->headers->has('X_API_TOKEN' )){
            if($request->headers->get('X_API_TOKEN') == env('ADMIN_TOKEN') && $request->headers->get('admin_username') == env('ADMIN_USERNAME') && Hash::check($request->headers->get('admin_password'), env('ADMIN_PASSWORD'))){
                return $next($request);
            }
            else{
//                echo 'request prolem';
                return view('unauthorized');
            }
        }
//        echo 'others';
        return view('unauthorized');
    }
}
