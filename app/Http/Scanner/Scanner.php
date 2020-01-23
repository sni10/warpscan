<?php
namespace App\Http\Scanner;

use App\Console\Commands\ScanUser;
use App\Domain\Comment\WriteComment;
use Illuminate\Console\Command;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Console\Style\SymfonyStyle;

class Scanner extends AbstractScanner
{
    
    private $pageCount;
    private $comments;
    private $commentsCount;
    
    private $userOuterId;
    private $userKarma;
    
    
    protected function getPage()
    {
        $page = $this->requester->get( $this->userName, $this->currentPage );
        $this->pageCount = (int)$page->page_count;
        $this->commentsCount = (int)$page->item_count;
        $this->currentPage = (int)$page->page;
        $this->comments = $page->comments;
    }
    
    
    protected function parseCommentsByUser()
    {
        
        do {
            $this->currentPage++;
            $this->getPage();
            // Load page
    
            echo $this->out->getColoredString(  "Retrieving comments page {$this->currentPage} of ", 'green' );
            echo $this->out->getColoredString(  $this->pageCount ." : ", 'green' );
            
            $this->parseComments();
            
            $rand = rand(1,3);
            
            echo $this->out->getColoredString(  "Waiting {$rand} seconds before next request " , 'red' );
            
            $do = 1;
            do {
                $do++;
                sleep(1);
                echo $this->out->getColoredString(   "=" , 'red' );
            } while ( $do <= $rand );
            
            echo $this->out->getColoredString(  ">". self::END_LINE, 'red' );
            
        } while ( $this->currentPage <= $this->pageCount );
        
        $this->updateUser();
        
    }
    
    private function parseComments()
    {
        $insert = [];
        foreach ( $this->comments as $commentObj )
        {
            
            if ( isset($commentObj->is_hidden) ) {
                echo $this->out->getColoredString( "H", 'red' );
                continue;
            };
            
            if ( empty($insert) ) {
                $this->userOuterId = $commentObj->user->id;
                $this->userKarma = $commentObj->user->karma;
            };
            
            $insert[] = [
                'created' => (int)$commentObj->created,
                'rating' => (int)$commentObj->rating,
                'outerId' => (int)$commentObj->id,
                'prefix' => $commentObj->domain->prefix,
                'userId' => (int)$this->userId,
            ];
    
            echo $this->out->getColoredString( "." , 'green' );
            
        }
    
        $this->comment->handle($insert);
    
        echo $this->out->getColoredString( "+" . self::END_LINE  );
    }
    
    protected function saveUser(): void
    {
        $this->checkUrl();
        
        $this->out->getColoredString( "Try save user {$this->userName} :" . self::END_LINE , 'green' );
        
        $users = [];
        $users = \DB::table('writers')
            ->select()
            ->where('name', $this->userName)
            ->get();
    
        if ( count($users) > 0 )
        {
            echo $this->out->getColoredString( "Username {$this->userName} all ready exist, ID {$users[0]->id}." . self::END_LINE , 'red' );
            $this->userId = $users[0]->id;
            $this->userName = $users[0]->name;
            echo $this->out->getColoredString( "Exiting program..." . self::END_LINE , 'red' );
            exit;
        }
        
        $this->userId = \DB::table('writers')->insertGetId(
            ['name' => $this->userName]
        );
        echo $this->out->getColoredString( "User {$this->userName} saved successfully, ID {$this->userId}." . self::END_LINE , 'green' );
    }
    
    protected function updateUser(): void
    {
        \DB::table('writers')
            ->where('id', $this->userId)
            ->update([
                'outerId' => $this->userOuterId,
                'karma' => $this->userKarma,
            ]);
    }
    
    protected function checkUrl(): void
    {
        $this->requester->get( $this->userName);
    }
    
    /**
     * @param string $userName
     * @param ScanUser $commandClass
     */
    public function setUserName(string $userName): void
    {
        $this->userName = $userName;
        echo $this->out->getColoredString( "Setted {$this->userName} successfully:" . self::END_LINE , 'green' );
    }

}
