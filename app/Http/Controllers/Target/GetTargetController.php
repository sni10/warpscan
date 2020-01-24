<?php

namespace App\Http\Controllers\Target;

use App\Domain\Target\GetTarget;
use App\Domain\Target\UseCase\RetrieveTarget;
use App\Http\Controllers\BaseApiController;
use App\Mail\TargetActivation;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

final class GetTargetController extends BaseApiController
{
    private $retrieveTarget;

    public function __construct(GetTarget $retrieveTarget)
    {
        $this->retrieveTarget = $retrieveTarget;
    }

    public function __invoke(Request $request, Response $response)
    {
        $result = $this->retrieveTarget->getTargetsList();

        return $this->sendResponse($result, 'Message RETURN');
    }
}
