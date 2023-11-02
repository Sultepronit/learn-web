<?php
namespace App;

class InterfaceImpl2 implements Interface3
{
    public function fn1(): string {
        return 'This is implementation of method from Interface3/1!<br>';
    }

    public function fn2(): string {
        return 'This is implementation of method from Interface3/2!<br>';
    }
}