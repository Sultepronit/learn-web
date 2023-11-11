<?php

trait LatteTrait
{
    private bool $useMilk = true;

    public function setUseMilk($val)
    {
        $this->useMilk = $val;
    }

    public function makeLatte()
    {
        echo static::class, ' is making latte', PHP_EOL;
    }

    public function prepareCoffee()
    {
        echo 'preparing coffee for the latte!', PHP_EOL;
    }

    private function secretTechnique()
    {
        echo 'this is private method inside the latte trait', PHP_EOL;
    }
}