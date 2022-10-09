<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\datadoc;

class ApiRequestController extends Controller
{
    function datadocquerycontroller( Request $request){
        $datadoc= datadoc::paginate(15);
        return response()->json(['data' => $datadoc],200);
    }
}
