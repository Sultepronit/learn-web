<?php
declare(strict_types=1);
namespace dir1;

//require_once 'Nested.php';

class Tween
{
    # Nested from global space
    public \Nested $globalNested;
    # dir1\Nested
    public Nested $nested;
    function __construct()
    {
        $this->nested = new Nested();
        $this->globalNested = new \Nested();
    }

    # we can use global functions from within namespase
    public function useExplode() {
        print_r(explode(' ', 'Hello there!'));
        echo  '<br>';
    }
}
