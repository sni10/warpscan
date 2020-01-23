<?php
namespace App\Http\Plotter;


use App\Http\Output\OutputTrait;

interface AbstractPlotterInterface
{
    /**
     * @return void
     */
    public function plotUser(): void;
    
    /**
     * @param int $userId
     */
    public function setUserId(int $userId): void;

}
