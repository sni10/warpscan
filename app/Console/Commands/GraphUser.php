<?php

namespace App\Console\Commands;

use App\Http\Plotter\Plotter;
use Illuminate\Console\Command;

class GraphUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'graph {userId}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    
    /**
     * @var Plotter
     */
    private $plotter;
    
    /**
     * Create a new command instance.
     *
     * @param Plotter $plotter
     */
    public function __construct( Plotter $plotter )
    {
        parent::__construct();
        $this->plotter = $plotter;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $userId = $this->argument('userId');
        $this->plotter->setUserId($userId);
        $this->plotter->plotUser();
    }
}
