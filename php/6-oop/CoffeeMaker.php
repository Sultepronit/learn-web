<?php

class CoffeeMaker
{
    public function makeCoffee()
    {
        echo static::class, ' is making coffee', PHP_EOL;
    }

    public function prepareCoffee()
    {
        echo 'preparing coffee!', PHP_EOL;
    }
}