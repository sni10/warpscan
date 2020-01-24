<?php

namespace App\Http\Controllers;

// TODO review if I need it
abstract class BaseApiController extends Controller
{
    protected $id;
    protected $responseBody;
    protected $success = ['success' => 1];

//    public function __invoke(Request $request, Response $response)
//    {
//        $this->id = $request->getAttribute('id');
//        $this->validateRequest($request);
//    }
//
//    private function validateRequest(Request $request) {
//        if ($request->isGet() || $request->isPut() || $request->isDelete()) {
//            if (empty($this->id)) {
//                throw new Exception('Missing required parameter.', HTTP::HTTP_BAD_REQUEST);
//            }
//            if (!is_numeric($this->id)) {
//                throw new InvalidArgumentException('Invalid id format.', HTTP::HTTP_BAD_REQUEST);
//            }
//        }
//    }
    
    /**
     * success response method.
     *
     * Это чтобы у меня всегда был один формат ответа.
     * @param $result
     * @param $message
     * @return \Illuminate\Http\Response
     */
    public function sendResponse($result, $message)
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }


    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];


        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }


        return response()->json($response, $code);
    }

	/**
	 * Sanitize filter.
	 * Decode from JSON to an array.
	 *
	 * @param $filter
	 *
	 * @return array|mixed|null
	 */
	protected function sanitizeFilter($filter)
	{
		if (is_null($filter))
		{
			return $filter;
		}

		$filter = json_decode($filter, true);
		$filter = is_array($filter) ? $filter : null;

		return $filter;
	}
}
