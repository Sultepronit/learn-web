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
require_once 'AnotherTrait.php';
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
$allInOneCoffeeMaker->makeLatteCap(); # making latte cappuccino way!
# and here was used CappuccinoTrait::makeLatte as makeLatteCap;

$allInOneCoffeeMaker->secretTechnique(); # this is private method inside the latte trait
# we changed visibility of private method using LatteTrait::secretTechnique as public;

$allInOneCoffeeMaker->printMilkStatus(); # bool(false)
# we can declare a property inside a trait with setter, because we caanot change the proterty directly

$allInOneCoffeeMaker->abstractExample(); # This is implementation of abstract method declared in a trait!

# the "final" KEYWORD can be used inside a trait, BUT DOESN'T DO A THING!

#############################################################################
# anonymous classes
$obj6 = new class('A', 'B') {
    public function __construct(public string $a, public string $b) {}
};

var_dump($obj6); # object(class@anonymous)#9 (2) { ["a"]=> string(1) "A" ["b"]=> string(1) "B" }
echo get_class($obj6), PHP_EOL; # class@anonymous/home/step/WEB/php/6-oop/index.php:170$0
echo get_class($allInOneCoffeeMaker), PHP_EOL; # AllInOneCoffeeMaker

##################################################################
# object comparison
echo 'object comparison', PHP_EOL;
require_once 'Class7.php';
$obj71 = new Class7(77, 'hello');
$obj72 = new Class7(77, 'world');

# comparison operator
echo '== ', $obj71 == $obj72, PHP_EOL; # == 
$obj72->text = 'hello';
echo '== ', $obj71 == $obj72, PHP_EOL; # == 1

# identity operator
echo '=== ', $obj71 === $obj72, PHP_EOL; # ===
$obj72 = $obj71;
echo '=== ', $obj71 === $obj72, PHP_EOL; # === 1

$obj73 = new Class7(99, 'st');
echo '> ', $obj73 > $obj72, PHP_EOL; # > 1

##################################################################
# DockBlock
require_once 'DockBlock.php';
new DockBlock();

##################################################################
# cloning
echo 'cloning!', PHP_EOL;
require_once 'Class8.php';
$obj81 = new Class8();
$obj82 = new Class8();
echo $obj81->id, PHP_EOL; # 1
echo $obj82->id, PHP_EOL; # 2
$obj83 = clone $obj81;
echo $obj83->id, PHP_EOL; # 3
# but without magit method __clone it would be 1

##################################################################
# serialization
echo 'serialization!', PHP_EOL;
echo serialize(true), PHP_EOL; # b:1;
echo serialize('hello there'), PHP_EOL; # s:11:"hello there";
echo serialize([1, 2, 3]), PHP_EOL; # a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}
echo serialize(['a' => false, 'b' => 1.5, 'c' => 'C']), PHP_EOL;
# a:3:{s:1:"a";b:0;s:1:"b";d:1.5;s:1:"c";s:1:"C";}
var_dump(unserialize('a:3:{s:1:"a";b:0;s:1:"b";d:1.5;s:1:"c";s:1:"C";}'));

require_once 'Class9.php';
$obj9 = new Class9();
$ser1 = serialize($obj9);
echo $ser1, PHP_EOL;
// O:6:"Class9":3:{
//     s:18:"Class9privateInt";i:99; # Class9 = private
//     s:18:"*protectedString";s:5:"text!"; # * = protected
//     s:11:"publicFloat";d:3.15;
// }
$obj9ser = unserialize($ser1);
var_dump($obj9ser); # object(Class9)#16 (3) { ...
echo $obj9 == $obj9ser, PHP_EOL; # 1

# __sleep() __wakeup() __serialize() __unserialize()
require_once 'Class10.php';
$obj10 = new Class10();
$ser2 = serialize($obj10);
echo $ser2, PHP_EOL; # O:7:"Class10":4:{s:2:"id";i:11;s:4:"name";s:4:"Anna";s:3:"pin";s:8:"MTQ1Ng==";s:9:"something";s:3:"new";}
$obj10ser = unserialize($ser2);
/* Array
(
    [id] => 11
    [name] => Anna
    [pin] => MTQ1Ng==
    [something] => new
) */
var_dump($obj10ser); # object(Class10)#18 (3) { ...
var_dump($obj10 == $obj10ser); # bool(true)
