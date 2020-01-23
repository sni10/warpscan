<?php
namespace App\Domain\Comment;



class CommentRepository implements CommentRepositoryInterface
{
    /**
     * @param $data
     */
    public function writeBatchComment($data)
    {
        \DB::table('comments')->insert($data);
    }
    
    public function getAllTimestamps($userId)
    {
        return \DB::table('comments')
            ->select(
                \DB::raw('DATE(MIN(FROM_UNIXTIME(created))) AS minDate'),
                \DB::raw('DATE(MAX(FROM_UNIXTIME(created))) AS maxDate'),
                \DB::raw('DATEDIFF(DATE(MAX(FROM_UNIXTIME(created))),DATE(MIN(FROM_UNIXTIME(created)))) AS dayCount'),
            )
            ->where('userId', '=', $userId)
            ->get()[0];
    }
    
    public function getForPlot($userId,$from,$to)
    {
    
        return \DB::table('comments')
            ->select(
                \DB::raw("*"),
                \DB::raw("((created - UNIX_TIMESTAMP('{$from}')) DIV 60 ) AS event_minute")
            )
            ->whereRaw("( created BETWEEN  UNIX_TIMESTAMP('{$from}') AND UNIX_TIMESTAMP('{$to}'))")
            ->whereRaw("( userId = {$userId} )")
            ->get()
            ->toArray();
        
    }
    
}
