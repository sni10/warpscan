<?php
namespace App\Http\Plotter;


interface AbstractPlotterInterface
{
    /**
     * @return mixed
     */
    public function plotUser();
    
    public function setUserId(int $userId): void;

}
