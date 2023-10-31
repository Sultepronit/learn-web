<?php
namespace App;

// final class Parent1
# Class App\Child1 cannot extend final class App\Parent1
class Parent1
{
    public $pubStr1 = 'This is parent\'s public property';
    protected $protStr1 = 'This is parent\'s protected property';
    private $privStr1 = 'This is parent\'s private property';

    public function getAll()
    {
        echo $this->pubStr1, '<br>';
        echo $this->protStr1, '<br>';
        echo $this->privStr1, '<br>';
    }

    protected string $protStr2;
    protected string $protStr3;

    public function __construct()
    {
        $this->protStr2 = 'second one';
        $this->protStr3 = 'third one';
    }

    public function printNext() {
        echo $this->protStr2, '<br>';
        echo $this->protStr3, '<br>';
    }

    public final function finalMethod()
    {
        echo 'This method is final, and cannot be overridden!';
    }
}