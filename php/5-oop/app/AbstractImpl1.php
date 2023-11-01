<?php
namespace App;

class AbstractImpl1 extends Abstract1
{
    public function abstractMethod(): string
    {
        return 'Now this method isn\'t abstract anymore';
    }
}