<?php

class Class2
{
    public $pubField = 'public!';
    private $privField = 'private!';
    public function __get($name)
    {
        if(property_exists($this, $name)) {
            return $this->$name;
        } else {
            echo "No existing {$name} filed was requested!", PHP_EOL;
            return null;
        }
        
    }

    public function __set($name, $value)
    {
        echo "set {$value} to no existing {$name}", PHP_EOL;
    }
}