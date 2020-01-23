<?php
namespace App\Http\Scanner;

use App\Domain\Comment\WriteComment;
use App\Http\Output\Colors;
use App\Http\Output\OutputError;
use App\Http\Output\OutputTrait;
use App\Http\Requester\Request;
use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

abstract class AbstractScanner implements AbstractScannerInterface
{
    
    use OutputTrait;
    
    const END_LINE = "\n";
    
    /**
     * @var integer
     */
    protected $currentPage = 0;
    
    /**
     * @var Request
     */
    protected $requester;

    /**
     * @var WriteComment
     */
    protected $comment;
    
    /**
     * @var integer
     */
    protected $userId;
    
    /**
     * @var string
     */
    protected $userName;
    /**
     * @var OutputError
     */
    protected $out;

    
    /**
     * Scanner constructor.
     * @param Request $requester
     * @param WriteComment $comment
     * @param Colors $colors
     */
    public function __construct(Request $requester, WriteComment $comment, Colors $colors)
    {
        $this->requester = $requester;
        $this->comment = $comment;
        $this->out = $colors;
    }
    
    public function scanUser()
    {
        $this->out( "Save User start..." . self::END_LINE , 'green' );
        $this->saveUser();
        $this->out( "Save User finish." . self::END_LINE , 'green' );
        $this->out( "Parse Comments By User start..." . self::END_LINE , 'green' );
        $this->parseCommentsByUser();
        $this->out( "Parse Comments By User finish." . self::END_LINE , 'green' );
    }
    
    /**
     * @return mixed
     */
    abstract protected function saveUser();
    
    /**
     * @return mixed
     */
    abstract protected function parseCommentsByUser();
    
}
