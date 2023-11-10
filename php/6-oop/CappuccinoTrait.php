<?php

trait CappuccinoTrait
{
    public function makeCappuccino()
    {
        echo static::class, ' is making cappuccino', PHP_EOL;
    }

    public function makeLatte()
    {
        echo 'making latte cappuccino way!', PHP_EOL;
    }
}