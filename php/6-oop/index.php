<?php
declare(strict_types=1);

# magic methods
# __get()
require_once 'Class1.php';
$obj1 = new Class1();
// echo $obj1->nothing, PHP_EOL; 
# PHP Warning:  Undefined property: Class1::$nothing

require_once 'Class2.php';
$obj2 = new Class2();
echo $obj2->pubField, PHP_EOL;
# public!
echo $obj2->privField, PHP_EOL;
# __get() is working!
# private!
echo "[{$obj2->nothing}]", PHP_EOL;
# __get() is working!
# No existing nothing filed was requested!
# []

###################
# __set()
$obj1->newField = 'This field was created dinamically';
echo $obj1->newField, PHP_EOL;
# This field was created dinamically

$obj2->pubField = 'New val';
echo $obj2->pubField, PHP_EOL;
# New val

$obj2->privField = 'Changed privare field?';
# __set() is working!
echo $obj2->privField, PHP_EOL;
# __get() is working!
# Changed privare field?

$obj2->nothing = 'nothing?';
# Try to set nothing? to no existing nothing!

##################
# __isset() __unset()
require_once 'Class3.php';
$obj3 = new Class3();

var_dump(isset($obj3->firstName));
# isset()!
# bool(true)

var_dump(isset($obj3->newField));
# isset()!
# bool(false)

$obj3->newField = 1457;
var_dump(isset($obj3->newField));
# isset()!
# bool(true)

unset($obj3->firstName);
# unset()!
var_dump(isset($obj3->firstName));
# isset()!
# bool(false)
echo PHP_EOL;

####################
# __call()
require_once 'Class4.php';
$obj4 = new Class4();

$obj4->printArgs('one', 2);
# one, 2

Class4::staticMethod1(457);
# try to call static staticMethod1(457...)

######################
# __toString()
require_once 'Class5.php';
$obj5 = new Class5();
echo $obj5; # __toString()!

var_dump($obj5 instanceof Stringable); # bool(true)

######################
# __invoke()
$obj5(); # invoked!
var_dump(is_callable($obj5)); # bool(true)

######################
# __debugInfo() - hiding private properties
var_dump($obj5);
// object(Class5)#5 (2) {
//     ["id"]=>
//     int(77)
//     ["codeName"]=>
//     string(10) "****cherry"
// }

#############################################################################
# late static binding
echo "the late static binding!", PHP_EOL;
require_once 'ClassA.php';
require_once 'ClassB.php';

ClassA::printName();
// self::class: ClassA
// self::$name: A
// get_called_class(): ClassA
// static::$name: A
ClassB::printName();
// self::class: ClassA
// self::$name: A
// get_called_class(): ClassB
// static::$name: B

var_dump(ClassA::multyply());
# object(ClassA)#6 (0) { }

var_dump(ClassB::multyply());
# object(ClassB)#6 (0) { }

#############################################################################
# traits
echo 'the php traits!', PHP_EOL;

require_once 'CoffeeMaker.php';
require_once 'LatteTrait.php';
require_once 'LatteMaker.php';
require_once 'CappuccinoTrait.php';
require_once 'CappuccinoMaker.php';
require_once 'AllInOneCoffeeMaker.php';

$latteMaker = new LatteMaker();
$latteMaker->makeCoffee(); # LatteMaker is making coffee
$latteMaker->makeLatte(); # LatteMaker is making latte
$cappuccinoMaker = new CappuccinoMaker();
$cappuccinoMaker->makeCappuccino(); # LatteMaker is making latte
$allInOneCoffeeMaker = new AllInOneCoffeeMaker();
$allInOneCoffeeMaker->makeCoffee(); # AllInOneCoffeeMaker is making coffee
$allInOneCoffeeMaker->makeLatte(); # AllInOneCoffeeMaker is making latte
$allInOneCoffeeMaker->makeCappuccino(); # AllInOneCoffeeMaker is making cappuccino

$cappuccinoMaker->prepareCoffee(); # preparing coffee!
# methods form traits override inherited methods:
$latteMaker->prepareCoffee(); # preparing coffee for the latte!
# method inside the class override the method from a trait:
$allInOneCoffeeMaker->prepareCoffee(); # turbo preparing coffee!

$cappuccinoMaker->makeLatte(); # making latte cappuccino way!
$allInOneCoffeeMaker->makeLatte(); # AllInOneCoffeeMaker is making latte
# the conflict was resolved by unsing LatteTrait::makeLatte insteadof CappuccinoTrait;
$allInOneCoffeeMaker->makeLatteCap(); # vmaking latte cappuccino way!
# and here was used CappuccinoTrait::makeLatte as makeLatteCap;