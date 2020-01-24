<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

final class ForbiddenController
{
	public function __invoke(Request $request, Response $response)
	{
		return response([['message' => (new AuthenticationException())->getMessage()],
			Response::HTTP_FORBIDDEN]);
	}
}
