<?php
namespace App\Http\Requester;

use App\Http\Output\Colors;
use GuzzleHttp\Client;

class Request
{
    const END_LINE = "\n";
    
    private $client;
    private $baseUrl;
    private $uri;
    /**
     * @var Colors
     */
    private $out;
    
    /**
     * Request constructor.
     * @param Client $client
     * @param Colors $colors
     */
    public function __construct(Client $client , Colors $colors)
    {
        $this->client = $client;
        $this->baseUrl = env('SCAN_BASE_URL');
        $this->uri = env('SCAN_USER_COMMENT_URI');
        $this->out = $colors;
    }
    
    public function get( string $userName, int $page = 1 )
    {
        try {
            $result = $this->client->get( sprintf( $this->uri, $userName ), [
                'base_uri' => $this->baseUrl,
                'query' => ['page' => $page]
            ]);
        } catch (\Exception $e) {
            $code = $e->getCode();
            $code;
    
            echo $this->out->getColoredString(  "404 {$userName} not exist, check your userName" . self::END_LINE , 'red' );
            echo $this->out->getColoredString( "Exiting program..." . self::END_LINE , 'red' );
            exit;
        }
        
        $result = $result->getBody()->getContents();
    
        return json_decode($result);

    }


}
