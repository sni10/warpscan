<?php
namespace App\Http\Plotter;

use App\Domain\Comment\GetComment;
use App\Http\Output\Colors;
use App\Http\Output\OutputTrait;

abstract class AbstractPlotter implements AbstractPlotterInterface
{
    use OutputTrait;
    
    const END_LINE = "\n";
    
    /**
     * @var GetComment
     */
    protected $comment;
    
    /**
     * @var integer
     */
    protected $userId;
    
    /**
     * @var ImageGenerator
     */
    private $drawer;
    /**
     * @var Colors
     */
    protected $out;
    
    
    /**
     * Plotter constructor.
     * @param GetComment $comment
     * @param Colors $colors
     */
    public function __construct( GetComment $comment, Colors $colors )
    {
        $this->comment = $comment;
        $this->out = $colors;
    }
    
    /**
     * @param int $userId
     */
    public function setUserId(int $userId): void
    {
        $this->userId = $userId;
    }
    
}
