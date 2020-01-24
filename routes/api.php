<?php
use Illuminate\Http\Request;

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
# Note: we use invokable controllers

// Route::get('forbidden', 'Auth\ForbiddenController');

Route::group([
    'prefix' => 'v1',
//    'middleware' => 'client_credentials'

], function () {
    
    Route::get('site', 'FakeController@site');
    
    Route::group([
        'middleware' => 'auth:api' // проверка аутентификации на мидлварах
    ], function() {
    
        Route::get('targets', 'Target\GetTargetController');
        
        Route::group([ 'prefix' => 'target' ],
            function(){
                Route::get('list', 'Target\GetTargetController');
            });
        
    });
});

