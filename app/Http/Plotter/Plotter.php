<?php
namespace App\Http\Plotter;

class Plotter extends AbstractPlotter
{
    
    private $minDate;
    private $maxDate;
    private $dayCount;
    
    public function plotUser()
    {
        $data = $this->comment->getTimeStamps($this->userId);
    
        $this->minDate =  new \DateTimeImmutable($data->minDate);
        $this->maxDate = new \DateTimeImmutable($data->maxDate);
        $this->dayCount = $data->dayCount;
    
        $dateFrom = $this->minDate->format('Y-m-d');
        $dateTo = $this->maxDate->format('Y-m-d');
        
        echo $this->out->getColoredString(  "Activity span from {$dateFrom} to {$dateTo} totaling {$this->dayCount} days" . self::END_LINE, 'green' );
        
        $image = new ImageGenerator( $this->dayCount, $this->minDate, $this->maxDate, $this->out, $this->comment );
        $image->fillData($this->userId);
        $image->save($this->userId);
    }
    
}
