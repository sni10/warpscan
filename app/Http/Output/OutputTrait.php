<?php
namespace App\Http\Output;


trait OutputTrait
{
    /**
     * @param $string string Alert message
     * @param $style string color from App\Http\Output\Colors
     * stdout colored formatted message to console
     */
    protected function out( string $string, string $style):void
    {
        echo $this->out->getColoredString($string,$style);
    }
}
