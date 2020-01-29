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

Route::get('forbidden', 'Auth\ForbiddenController');

Route::group([
    'prefix' => 'v1',
    'middleware' => 'auth:api' // проверка аутентификации на мидлварах
], function () {
    
    Route::group([
        'middleware' => 'client_credentials'
    ], function() {
    
        Route::get('user', 'FakeController@user');
        
    });
});

