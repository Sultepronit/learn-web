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

########################################################################
# exceptions
echo 'exceptions!', PHP_EOL;
require_once 'InvalidDataException.php';
require_once 'InvalidDataException2.php';
//throw new \Exception('Value should be more than 0!');
# PHP Fatal error:  Uncaught Exception: Value should be more than 0! in ...

//throw new \InvalidArgumentException('Value should be more than 0!');
# PHP Fatal error:  Uncaught InvalidArgumentException: Value should be more than 0! in ...

//throw new InvalidDataException('Value should be more than 0!');
# Fatal error: Uncaught InvalidDataException: Value should be more than 0! in ...

//throw new InvalidDataException2();
# Fatal error: Uncaught InvalidDataException2: Wrong data! in ...

try {
    throw new \Exception('message!');
} catch(\Exception $e) {
    var_dump($e);
    /* object(Exception)#19 (7) {
        ["message":protected]=>
        string(8) "message!"
        ["string":"Exception":private]=>
        string(0) ""
        ["code":protected]=>
        int(0)
        ["file":protected]=>
        string(34) "/home/step/WEB/php/6-oop/index.php"
        ["line":protected]=>
        int(272)
        ["trace":"Exception":private]=>
        array(0) {
        }
        ["previous":"Exception":private]=>
        NULL
    } */
}

try {
    throw new InvalidDataException2();
} catch(\InvalidArgumentException|InvalidDataException) {
    echo 'InvalidArgumentException or InvalidDataException cahught!', PHP_EOL;
} catch(InvalidDataException2) {
    echo 'InvalidDataException2 cahught!', PHP_EOL;
}
# InvalidDataException2 cahught!

function tryCatchFin($arg) {
    try {
        if($arg > 10) {
            throw new \Exception();
        }
        echo 'everithing\'s good!', PHP_EOL;
        return 'try!';
    } catch (\Exception) {
        echo 'exception!', PHP_EOL;
        return 'catch!';
    } finally {
        if($arg > 20 || $arg < 1) {
            return 'finally!';
        }
    }
}
echo tryCatchFin(5), PHP_EOL;
# everithing's good! / try!

echo tryCatchFin(0), PHP_EOL;
# everithing's good! / finally!

echo tryCatchFin(11), PHP_EOL;
# exception! / catch!

echo tryCatchFin(22), PHP_EOL;
# exception! / finally!
# return in the finally block overwrite others, but it still works!

# Throwable interface are implemented in Error class & it's children,
# and in Exception class & it's children
try {
    array_rand([], 2);
} catch(\Exception $e) {
    echo $e->getMessage(), PHP_EOL;
    # does'nt work, because it's not an exception!
} catch(\Error $e) {
    echo $e->getMessage(), PHP_EOL;
    # array_rand(): Argument #1 ($array) cannot be empty
}
# catch(\Throwable) { ... is universal!

##############################
# global exception handler
set_exception_handler(function(\Throwable $e) {
    echo $e->__toString(), PHP_EOL;
});
//array_rand([], 2);
# ValueError: array_rand(): Argument #1 ($array) cannot be empty in ...
# ok, this thing soesn't solve a thing, and the app breaks!!!

#####################################################################
# DateTime
echo 'DateTime!', PHP_EOL;
$currentTime = new DateTime();
var_dump($currentTime); # object(DateTime)#21 (3) { ...
$tomorrow = new DateTime('tomorrow');
var_dump($tomorrow); 
var_dump(new DateTime('tomorrow 3:55pm')); 
var_dump(new DateTime('tomorrow noon')); 
$someTime = new DateTime('07/08/2020 3:55am', new DateTimeZone('Europe/Amsterdam'));
var_dump($someTime); 

$currentTime->setTimezone(new DateTimeZone('Europe/Amsterdam'));
var_dump($currentTime);

echo $currentTime->format('d.m.Y g:i A'), PHP_EOL; # *18.11.2023 6:00 PM
//echo $currentTime->getTimezone();
echo $tomorrow->getTimezone()->getName(), PHP_EOL; # Europe/Helsinki

$someTime->setDate(2025, 10, 17);
echo $someTime->format('d.m.Y'), PHP_EOL; # 17.10.2025
$someTime->setDate(2024, 1, 12)->setTime(17, 33);
echo $someTime->format('d.m.Y G:i'), PHP_EOL; # 12.01.2024 17:33

$someTime = new DateTime('05.10.2020');
echo $someTime->format('Y-m-d'), PHP_EOL; # 2020-10-05
$someTime = new DateTime('05-10-2020');
echo $someTime->format('Y-m-d'), PHP_EOL; # 2020-10-05

$someTime = new DateTime('05/10/2020');
echo $someTime->format('Y-m-d'), PHP_EOL; # 2020-05-10
$someTime = DateTime::createFromFormat('d/m/Y', '05/10/2020');
echo $someTime->format('Y-m-d'), PHP_EOL; # 2020-10-05

# the createFromFormat() method uses current time, and not 00:00:00!!!
echo $someTime->format('Y-m-d g:i:s A'), PHP_EOL; # 2020-10-05 3:35:14 PM

$time1 = new DateTime('13:15');
echo $time1->format('Y-m-d g:i:s A'), PHP_EOL; # *2023-11-20 1:15:00 PM
$time2 = new DateTime('13:16');
echo $time1 <=> $time2, PHP_EOL; # -1

var_dump($time1->diff($time2));
# object(DateInterval)#26 (16) { ... ["i"]=> int(1) ... ["invert"]=> int(0)
$dif1 = $time2->diff($time1);
echo $dif1->i, '/', $dif1->invert, PHP_EOL; # 1/1

$bd = new DateTime('31.12.1990');
$dif2 = $currentTime->diff($bd);
echo $dif2->format('%d'), PHP_EOL; # 20 !!!!
echo $dif2->format('%Y years, %m months, %d days, %h hours, %i minutes, %s seconds'), PHP_EOL;
# 32 years, 10 months, 20 days, 11 hours, 20 minutes, 53 seconds
echo $dif2->format('%a'), PHP_EOL; # 12012 # all the days
echo $dif2->format('%R%a'), PHP_EOL; # -12012 

$hundredDays = new DateInterval('P100D');
$bd->add($hundredDays);
echo $bd->format('Y.m.d') , PHP_EOL; # 1991.04.10

$bd->sub($hundredDays);
echo $bd->format('Y.m.d') , PHP_EOL; # 1990.12.31

$hundredDays->invert = 1; # now its -100 days!
$bd->add($hundredDays);
echo $bd->format('Y.m.d') , PHP_EOL; # 1990.09.22
$bd->sub($hundredDays);
echo $bd->format('Y.m.d') , PHP_EOL; # 1990.12.31

$immutableDate = new DateTimeImmutable('22.03.1995');
$interv = new DateInterval('P2M20D');
$newDate = $immutableDate->add($interv);
echo $immutableDate->format('d.m.y'), ' -> ', $newDate->format('d.m.y'), PHP_EOL; # 22.03.95 -> 11.06.95

#######################
# iteration, DatePeriod
$from = new DateTime('11/25/2007');
$to = new DateTime('11/28/2007');
$period = new DatePeriod($from, new DateInterval('P1D'), $to);
foreach($period as $date) {
    echo $date->format('d.m.Y'), PHP_EOL;
}
# 25.11.2007 / 26.11.2007 / 27.11.2007

$period2 = new DatePeriod($from, new DateInterval('P1D'), $to->modify('+1 day'));
foreach($period2 as $date) {
    echo $date->format('d.m.Y'), PHP_EOL;
}
# 25.11.2007 ... 28.11.2007
echo $to->format('d.m.Y'), PHP_EOL; # 29.11.2007

$period3 = new DatePeriod($from, new DateInterval('P5D'), 3, DatePeriod::EXCLUDE_START_DATE);
foreach($period3 as $date) {
    echo $date->format('d.m.Y'), PHP_EOL;
}
# 30.11.2007 / 05.12.2007 / 10.12.2007