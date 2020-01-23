<?php
namespace App\Domain\Comment;


class WriteComment
{
    /**
     * @var CommentRepository
     */
    private $commentRepository;

    public function __construct(CommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    public function handle($insert)
    {
        foreach ( $insert as $data ) {
            $this->validate($data);
        }
        $this->commentRepository->writeBatchComment($insert);
    }

    private function validate($data)
    {
        if (!isset(
            $data['created'],
            $data['rating'],
            $data['outerId'],
            $data['prefix'],
            $data['userId']
        )) {
            throw new \Exception('Some required parameters missing');
        }
    }
    
}
