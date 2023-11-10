<?php

trait LatteTrait
{
    public function makeLatte()
    {
        echo static::class, ' is making latte', PHP_EOL;
    }

    public function prepareCoffee()
    {
        echo 'preparing coffee for the latte!', PHP_EOL;
    }
}