<?php
namespace App;

class InterfaceImpl1 implements Interface1, Interface2
{
    public function fn1(): string
    {
        return 'This is implementation of Interface1 method!<br>';
    }

    public function fn2(): string
    {
        return 'This is implementation of Interface2 method!<br>';
    }
}