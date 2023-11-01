<?php
namespace App;

class Child1 extends Parent1
{
    public $pubStr1 = 'This is child\'s public property';
    protected $protStr1 = 'This is child\'s protected property';
    private $privStr1 = 'This is child\'s private property';

    public function getLocalPriv() {
        # will print child's property
        echo $this->privStr1, '<br>';
    }

    /* public function getAll() # parent's method!
    {   
        # will print child's properties
        echo $this->pubStr1, '<br>';
        echo $this->protStr1, '<br>';
        # will print parent's property
        echo $this->privStr1, '<br>';
    } */

    # with no conctructor, parent's one will be used   
    public function __construct()
    {
        parent::__construct();
        # if child has it's own constructor, the parent's one wouldn't be called by default, and we'll get error like:
        # Typed property App\Parent1::$protStr3 must not be accessed before initialization
        $this->protStr2 = 'Second one, child\'s edition!';
    }

    // public function printNext(int $arg) {} 
    # Declaration of App\Child1::printNext(int $arg) must be compatible with App\Parent1::printNext()

    public function printNext(int $arg = 0) {}
    # it is valid if all the new arguments have default values

    // public function finalMethod() {}
    # Cannot override final method App\Parent1::finalMethod()

}
