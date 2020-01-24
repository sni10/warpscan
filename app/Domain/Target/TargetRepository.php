<?php
namespace App\Domain\Target;



class TargetRepository implements TargetRepositoryInterface
{
    
    /**
     * @param $data
     */
    public function writeBatchComment($data)
    {
        \DB::table('writers')->insert($data);
    }
    
    public function getAll()
    {
        return \DB::table('writers')
            ->select()
            ->get()
            ->toArray();
    }
    
}
