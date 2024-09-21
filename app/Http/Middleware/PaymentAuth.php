<?php

namespace App\Http\Middleware;

use Closure;

class PaymentAuth
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
        if($request->query('token')){
            $request->headers->set('Authorization' , 'Bearer '.$request->query('token'));
        }
        return $next($request);
    }
}
