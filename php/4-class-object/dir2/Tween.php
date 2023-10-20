<?php
declare(strict_types=1);
namespace dir2;

use \dir1\Tween as Tween1;

class Tween
{
    # Nested from global space
    public \Nested $globalNested;
    # dir1\Nested
    public \dir1\Nested $dir1Nested;
    function __construct()
    {
        $this->globalNested = new \Nested();
        $this->dir1Nested = new \dir1\Nested();
    }

    # we can use global functions from within namespase
    # but local function would be called insted, if there is one
    public function useExplode() {
        print_r(explode(' ', 'Hello there!'));
        echo  '<br>';
    }

    # so here how we're doing things
    public function useGlobalExplode() {
        print_r(\explode(' ', 'Hello there!'));
        echo  '<br>';
    }
}

function explode($div, $str) {
    return ['a', 'b'];
}
