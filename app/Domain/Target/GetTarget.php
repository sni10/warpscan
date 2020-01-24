<?php
namespace App\Domain\Target;

class GetTarget
{
    /**
     * @var CommentRepository
     */
    private $targetRepository;

    public function __construct(TargetRepository $targetRepository)
    {
        $this->targetRepository = $targetRepository;
    }

    public function getTargetsList()
    {
        return $this->targetRepository->getAll();
    }
    
}
