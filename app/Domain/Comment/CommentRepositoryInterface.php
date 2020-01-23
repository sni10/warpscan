<?php

namespace App\Domain\Comment;

interface CommentRepositoryInterface
{
    public function writeBatchComment($data);
}
