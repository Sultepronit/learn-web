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