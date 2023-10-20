<?php
declare(strict_types=1);

require_once 'Nested.php';

class Nest
{
    public string $a = 'A!';
    public ?Nested $nestedNull = null;
    //public Nested $b = new Nested();
    public Nested $nested;

    public function __construct()
    {
        $this->nested = new Nested();
    }
}