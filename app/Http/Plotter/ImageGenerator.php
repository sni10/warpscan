<?php
namespace App\Http\Plotter;

use App\Domain\Comment\GetComment;
use App\Http\Output\Colors;

class ImageGenerator
{
    const HOURS = 24;
    const MINUTES_PER_HOUR = 60;
    const MINUTES_PER_DAY = 60 * 24;
    const DAYS_PER_YEAR = 365;
    
    const END_LINE = "\n";
    /**
     * @var false|resource
     */
    private $image;
    /**
     * @var false|int
     */
    private $greenColor;
    /**
     * @var false|int
     */
    private $redColor;
    /**
     * @var false|int
     */
    private $neutralColor;
    /**
     * @var false|int
     */
    private $grayColor;
    /**
     * @var int
     */
    private $days;
    /**
     * @var \DateTimeInterface
     */
    private $dateFrom;
    /**
     * @var \DateTimeInterface
     */
    private $dateTo;
    /**
     * @var Colors
     */
    private $out;
    /**
     * @var GetComment
     */
    private $comment;
    
    /**
     * ImageGenerator constructor.
     * @param int $days
     * @param \DateTimeInterface $dateFrom
     * @param \DateTimeInterface $dateTo
     * @param Colors $colors
     * @param GetComment $comment
     */
    public function __construct(int $days, \DateTimeInterface $dateFrom, \DateTimeInterface $dateTo , Colors $colors, GetComment $comment)
    {
        $this->comment = $comment;
        $this->out = $colors;
        $this->days = $days;
        $this->dateFrom = $dateFrom;
        $this->dateTo = $dateTo;
        $this->image = imagecreatetruecolor(self::MINUTES_PER_DAY + 1, $this->days);
        $this->setColors();
        $this->drawGridDays();
        $this->drawGridYears();

    }
    
    private function setColors()
    {
        $this->greenColor = imagecolorallocate($this->image, 0x40, 0xFF, 0x40);
        $this->redColor = imagecolorallocate($this->image, 0xFF, 0x40, 0x40);
        $this->neutralColor = imagecolorallocate($this->image, 0x80, 0x80, 0xA0);
        $this->grayColor = imagecolorallocatealpha($this->image, 0x80, 0x80, 0x80, 0x60);
    }
    
    private function drawGridDays()
    {
        // Draw hourly/yearly grid
        for ($h = 0; $h <= self::HOURS; $h++) {
            imageline($this->image, $h * self::MINUTES_PER_HOUR, 0, $h * self::MINUTES_PER_HOUR, $this->days, $this->grayColor);
        };
    }
    
    private function drawGridYears()
    {
        for ($y = 0; $y <= intdiv($this->days, self::DAYS_PER_YEAR); $y++) {
            imageline($this->image, 0, $y * (self::DAYS_PER_YEAR), self::MINUTES_PER_DAY + 1, $y * self::DAYS_PER_YEAR, $this->grayColor);
        };
    }
    
    public function save( $userId )
    {
        imagepng($this->image, "lwgraph-{$userId}.png", -1);
        $this->cleanUp();
    }
    
    public function fillData( $userId )
    {
        for ($day = 0; $day <= $this->days; $day++) {
    
            /** @var \DateTimeInterface $from */
            $from = $this->dateFrom->add( new \DateInterval("P{$day}D") );
            $from = $from->format('Y-m-d');
            
            /** @var \DateTimeInterface $to */
            $add = $day + 1;
            $to = $this->dateFrom->add( new \DateInterval("P{$add}D") );
            $to = $to->format('Y-m-d');
    
            $result = $this->comment->getChunk($userId,$from,$to);
            echo $this->out->getColoredString(  "Find ".( count($result) )." items:" . self::END_LINE , 'green' );
            
            if (!empty($result)) {
                
                // Dataset for a day
                echo $this->out->getColoredString(  self::END_LINE . "Day $day of $this->days :" , 'green' );
                
                if (count($result) > 0) foreach ($result as $comment) {
                    // Set pixel
                    $minute = intval($comment->event_minute);
                    
                    $selectColor = $this->neutralColor;
                    
                    if (intval($comment->rating) > 0) {
                        $selectColor = $this->greenColor;
                    };
                    
                    if (intval($comment->rating) < 0) {
                        $selectColor = $this->redColor;
                    };
                    
                    imagesetpixel($this->image, $minute, $this->days - $day, $selectColor);
                    imageellipse($this->image, $minute, $this->days - $day, 3, 3, $selectColor);
                    echo $this->out->getColoredString(  "#" , 'green' );
                }
                echo self::END_LINE ;
            } else echo $this->out->getColoredString(  "." , 'green' );
        }
        
    }
    
    private function cleanUp()
    {
        imagedestroy($this->image);
    }
}
