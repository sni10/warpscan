<?php
namespace App\Domain\Comment;


class GetComment
{

    /**
     * @var CommentRepository
     */
    private $commentRepository;

    public function __construct(CommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    public function getTimeStamps($userId)
    {
        return $this->commentRepository->getAllTimestamps($userId);
    }
    
    /**
     * @param $userId
     * @param $from
     * @param $to
     * @return array
     */
    public function getChunk($userId, $from, $to)
    {
        return $this->commentRepository->getForPlot($userId, $from, $to);
    }


}
