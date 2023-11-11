<?php

class AllInOneCoffeeMaker extends CoffeeMaker
{
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
}
