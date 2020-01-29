<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     * Always send a JSON, so call a dedicated route to show the needed response.
     *
     * @param  Request  $request
     * @return string
     */
    protected function redirectTo($request)
    {
        return 'api/forbidden';
    }
}
