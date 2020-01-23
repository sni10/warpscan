<?php
namespace App\Http\Output;


trait OutputTrait
{
    /**
     * @param $string
     * @param $style
     * @return string
     * stdout colored formatted message to console
     */
    protected function out($string, $style)
    {
        echo $this->out->getColoredString($string,$style);
    }
}
