<?php
namespace App;

class Nephew1
{
    public function __construct(private Parent1 $parent)
    {

    }

    public final function finalMethod() {
        $this->parent->finalMethod();
    }
}