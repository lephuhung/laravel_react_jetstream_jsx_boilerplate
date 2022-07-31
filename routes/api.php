<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DatadocController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\CommnentController;
use App\Http\Controllers\SearchController;

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
// Route::middleware()->group(function () {
    Route::resource('/datadoc', DatadocController::class);
    Route::resource('/post',    PostController::class); 
    Route::resource('/page',    PageController::class); 
    Route::resource('/comment',    CommnentController::class); 
    Route::get('/elasticsearch', [SearchController::class,'ElasticInfo']);
    Route::post('/search', [SearchController::class,'ElasticSearch']);
// });