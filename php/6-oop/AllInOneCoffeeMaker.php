<?php

class AllInOneCoffeeMaker extends CoffeeMaker
{
    # inside the LatteTrait: private bool $useMilk = true;
    private bool $useMilk = true;
    # you can use this, but for waht???
    //private bool $useMilk = false;
    # you cannot use this!!!
        
    use CappuccinoTrait{
        CappuccinoTrait::makeLatte as makeLatteCap;
    }
    use LatteTrait {
        LatteTrait::makeLatte insteadof CappuccinoTrait;
        LatteTrait::secretTechnique as public;
    }

    public function prepareCoffee()
    {
        echo 'turbo preparing coffee!', PHP_EOL;
    }

    public function printMilkStatus()
    {
        $this->setUseMilk(false);
        var_dump($this->useMilk); # bool(false)
    }

    use AnotherTrait;

    public function abstractExample()
    {
        echo 'This is implementation of abstract method declared in a trait!', PHP_EOL;
    }

}
