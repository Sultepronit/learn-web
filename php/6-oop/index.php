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
# private!
echo "[{$obj2->nothing}]", PHP_EOL;
# No existing nothing filed was requested!
# []

###################
# __set()
$obj1->newField = 'This field was created dinamically';
echo "[{$obj1->newField}]", PHP_EOL;
# [This field was created dinamically]

$obj2->newFiled = 'Use __set()!';

echo "[{$obj2->newField}]", PHP_EOL;
