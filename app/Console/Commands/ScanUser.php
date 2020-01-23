<?php

namespace App\Console\Commands;

use App\Http\Scanner\Scanner;
use Illuminate\Console\Command;

class ScanUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scan {user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    
    /**
     * @var Scanner
     */
    private $scanner;
    
    /**
     * Create a new command instance.
     *
     * @param Scanner $scanner
     */
    public function __construct( Scanner $scanner )
    {
        parent::__construct();
    
        $this->scanner = $scanner;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $user = $this->argument('user');
        $this->scanner->setUserName($user);
        $this->scanner->scanUser();
    }
}
