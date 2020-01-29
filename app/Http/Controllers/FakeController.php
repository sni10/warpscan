<?php

namespace App\Http\Controllers;

use App\Domain\User\UseCase\Login;
use Illuminate\Http\{ Request, Response };

final class FakeController extends Controller
{

    public function site()
    {
        $jsonFile = \App::path() . '/../fake_site_settings.json';

        if ( is_file($jsonFile) ) {
            $json = file_get_contents($jsonFile);

            return $this->sendResponse( json_decode($json) , 'File settings exists');
        } else {

            return $this->sendError( json_decode( ) , 'No file :-(');
        }

    }

    public function home()
    {
        $jsonFile = \App::path() . '/../fake_home_settings.json';

        if ( is_file($jsonFile) ) {
            $json = file_get_contents($jsonFile);

            return $this->sendResponse( json_decode($json) , 'File settings exists');
        } else {

            return $this->sendError( json_decode( ) , 'No file :-(');
        }
    }

    public function test()
    {
        $jsonFile = \App::path() . '/../fake_home_settings.json';

        if ( is_file($jsonFile) ) {
            $json = file_get_contents($jsonFile);

            return $this->sendResponse( json_decode($json) , 'File settings exists');
        } else {

            return $this->sendError( json_decode( ) , 'No file :-(');
        }
    }

    public function user()
    {
        $user = \Auth::user();

        var_dump( \Auth::user() ); die;
        
        if ( $user ) {
            return $this->sendResponse( $user , 'File settings exists');
        } else {

            return $this->sendError( json_decode( 'No file :-(' ) , 'No file :-(');
        }
    }
}
