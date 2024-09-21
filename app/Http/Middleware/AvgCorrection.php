<?php

namespace App\Http\Middleware;

use Closure;

class AvgCorrection
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
        $request->avg = str_replace('/', '.', $request->avg);
//        echo $request->avg;
        return $next($request);
    }
}
