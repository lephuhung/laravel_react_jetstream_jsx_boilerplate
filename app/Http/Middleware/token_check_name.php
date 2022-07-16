<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class token_check_name
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        $sha256_token= hash('sha256', $token);
        $token_id = DB::table('personal_access_tokens')->where('token', $sha256_token)->first()->id;
        $host = DB::table('hosts')->where('tokenID', $token_id)->first()->host_id;
        $request->token= $host;
        return $next($request);
    }
}
