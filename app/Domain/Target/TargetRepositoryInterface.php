<?php

namespace App\Domain\Target;

interface TargetRepositoryInterface
{
    public function writeBatchComment($data);
}
