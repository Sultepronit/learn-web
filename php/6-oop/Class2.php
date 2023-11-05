<?php

class Class2
{
    public $pubField = 'public!';
    private $privField = 'private!';
    public function __get($name)
    {
        echo '__get() is working!', PHP_EOL;
        if(property_exists($this, $name)) {
            return $this->$name;
        }
        echo "No existing {$name} filed was requested!", PHP_EOL;
        return null;
    }

    public function __set($name, $value)
    {
        echo '__set() is working!', PHP_EOL;
        if(property_exists($this, $name)) {
            $this->$name = $value;
        } else {
            echo "Try to set {$value} to no existing {$name}!", PHP_EOL;
        }
    }
}