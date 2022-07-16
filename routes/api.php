<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DatadocController;
use Dflydev\DotAccessData\Data;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum', 'token'])->get('/user', function (Request $request) {
    $user = $request->user();
    return $request->ip();
});
Route::middleware(['auth:sanctum'])->resource('/datadoc', DatadocController::class);