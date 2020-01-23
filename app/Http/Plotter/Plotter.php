<?php
namespace App\Http\Plotter;

class Plotter extends AbstractPlotter
{
    
    private $minDate;
    private $maxDate;
    private $dayCount;
    
    /**
     * @throws \Exception
     */
    public function plotUser(): void
    {
        
        $data = $this->comment->getTimeStamps($this->userId);
        $this->minDate =  new \DateTimeImmutable($data->minDate);
        $this->maxDate = new \DateTimeImmutable($data->maxDate);
        $this->dayCount = $data->dayCount;
    
        $dateFrom = $this->minDate->format('Y-m-d');
        $dateTo = $this->maxDate->format('Y-m-d');
        
        $this->out("Activity span from {$dateFrom} to {$dateTo} totaling {$this->dayCount} days", 'green');
        
        $image = new ImageGenerator( $this->dayCount, $this->minDate, $this->maxDate, $this->out, $this->comment );
        $image->fillData($this->userId);
        $image->save($this->userId);
    }
}
