<?php

declare(strict_types=1);

require_once 'Transaction.php';

# $transaction = new Transaction();
# before adding a constructor
$transaction = new Transaction(55);
var_dump($transaction);
# when it was empty:
# object(Transaction)#1 (0) { } 
# with first two fields without values
# object(Transaction)#1 (2) { ["amount"]=> NULL ["description"]=> NULL }

# object(Transaction)#1 (3) { ["amount"]=> NULL ["description"]=> NULL ["priv":"Transaction":private]=> NULL }

# object(Transaction)#1 (3) { ["amount"]=> NULL ["description"]=> NULL ["priv":"Transaction":private]=> NULL ["str"]=> uninitialized(string) }

# object(Transaction)#1 (4) { ["amount"]=> NULL ["description"]=> NULL ["priv":"Transaction":private]=> NULL ["str"]=> uninitialized(string) ["flo"]=> float(17) }
# object(Transaction)#1 (5) { ["amount"]=> NULL ["description"]=> NULL ["priv":"Transaction":private]=> NULL ["str"]=> uninitialized(string) ["flo"]=> float(17) ["constructed"]=> int(55) }

# object(Transaction)#1 (5) { ["amount"]=> NULL ["description"]=> NULL ["priv":"Transaction":private]=> string(14) "private filed!" ["str"]=> uninitialized(string) ["flo"]=> float(17) ["constructed"]=> int(55) }

echo '<br>';
var_dump($transaction->amount); # NULL

$transaction->amount = 77;
echo '<br>';
var_dump($transaction->amount); # int(77)
echo '<br>';

/* echo '<br>';
var_dump($transaction->priv); */
# Fatal error: Uncaught Error: Cannot access private property Transaction

#var_dump($transaction->str);
# Fatal error: Uncaught Error: Typed property Transaction::$str must not be accessed before initialization ...

var_dump($transaction->flo); # float(17)
echo '<br>';

$transaction->increment(); # 56
$transaction->increment(); # 57
$transaction->increment(); # 58

echo $transaction->getPriv(), '<br>'; # private filed!

# method chaining
$transaction->printFlo()->printPriv(); # 17 / private filed!

$variableContainingClassName = 'Transaction';
$trans2 = new $variableContainingClassName(99);
var_dump($trans2);
# object(Transaction)#2 (5) { ["amount"]=> NULL ["description"]=> NULL ["priv":"Transaction":private]=> string(14) "private filed!" ["str"]=> uninitialized(string) ["flo"]=> float(17) ["constructed"]=> int(99) }
echo '<br>';

$flo = (new Transaction(11))->flo;
# Destruct unneeded
echo $flo, '<br>'; # 17

//$transaction = 'nothing here!';
unset($transaction);
# Destruct unneeded

###############################################
# JSON $ stdClass!
$json1 = '{"a":1, "b":2, "c": 3}';

$object1 = json_decode($json1);
var_dump($object1);
# object(stdClass)#1 (3) { ["a"]=> int(1) ["b"]=> int(2) ["c"]=> int(3) }
echo '<br>';

$array1 = json_decode($json1, true);
print_r($array1); # Array ( [a] => 1 [b] => 2 [c] => 3 )
echo '<br>';

$object2 = new \stdClass(); # normal stdClass() also works..........
$object2->filed = 'data';
var_dump($object2);
# object(stdClass)#3 (1) { ["filed"]=> string(4) "data" }
echo '<br>';

# casting
$array2 = [1, 2, 3];
$object3 = (object) $array2;
var_dump($object3);
# object(stdClass)#4 (3) { ["0"]=> int(1) ["1"]=> int(2) ["2"]=> int(3) }
echo '<br>';
echo $object3->{0}, '<br>'; # 1

var_dump((object) 77);
# object(stdClass)#5 (1) { ["scalar"]=> int(77) }
echo '<br>';

var_dump((object) false);
# object(stdClass)#5 (1) { ["scalar"]=> bool(false) }
echo '<br>';

var_dump((object) null);
# object(stdClass)#5 (0) { }
echo '<br>';

################################################
# constructor property promotion, since php 8
require_once 'Promotion.php';

$promoted = new Promotion(44, 77);
# default val
# default val
var_dump($promoted);
# object(Promotion)#5 (4) { ["str":"Promotion":private]=> string(43) "constructor property promotion, since php 8" ["int":"Promotion":private]=> int(44) ["flo":"Promotion":private]=> float(77) ["def":"Promotion":private]=> string(11) "default val" }
echo '<br>';

##################################################
# nested classes & nullsafe operator
require_once 'Nest.php';

$nest = new Nest();
var_dump($nest);
# object(Nest)#6 (2) { ["a"]=> string(2) "A!" ["nestedNull"]=> NULL }
echo '<br>';

//echo $nest->nestedNull->d;
# Warning: Attempt to read property "d" on null
echo "[ {$nest->nestedNull?->d} ] <br>"; # [ ]
echo "[ {$nest->nested?->d} ] <br>"; # [ D! ]

#############################################
# namespaces

require_once './dir1/Tween.php';
require_once './dir2/Tween.php';
require_once './dir1/Nested.php';

$tween1 = new dir1\Tween();
var_dump($tween1); # object(dir1\Tween)#8 (0) { }
echo '<br>';
$tween1->useExplode();

use dir2\Tween;
$tween2 = new Tween();
var_dump($tween2); # object(dir2\Tween)#8 (0) { }
echo '<br>';
$tween2->useExplode();
$tween2->useGlobalExplode();

//use dir1\Tween;
# we can use use only once with the same classname!
use dir1\Tween as Tween1;
$tween1_2 = new Tween1();

# several classes from the same namespace
use dir1\{Tween as Tween1_, Nested};

/*
we can use:
use dir1\dir2\dir3\Class;
new Class();
or:
use dir1\dir2\dir3;
new dir3\Class();
or: 
use dri1\dir2\dir3 as dirs;
new dirs\Class();
*/

########################################################
# constants

const CONSTANT1 = '"const" outside of a class in PHP may result in a parse error';
echo CONSTANT1, '<br>';

require_once 'Constants.php';
echo Constants::CONST_ONE, '<br>'; # This is constant!

$consts1 = new Constants();
echo $consts1::CONST_ONE, '<br>'; # This is constant!

$consts1->printPrivate();
# This is private territory!
# This is private territory!

# magic constants:
echo $consts1::class, '<br>'; # Constants # class name

# using class constants as enum:
require_once 'EnumLike.php';
require_once 'Enums/Status.php';
use Enums\Status;
$object4 = new EnumLike();
var_dump($object4);
# object(EnumLike)#18 (1) { ["status":"EnumLike":private]=> string(7) "pending" }
echo '<br>';
//$object4->setStatus(EnumLike::STATUS_PAID);
$object4->setStatus(Status::PAID);
var_dump($object4);
echo '<br>';
# object(EnumLike)#18 (1) { ["status":"EnumLike":private]=> string(4) "paid" }

########################################################
# static fields

echo Constants::$instanceCount, '<br>'; # 1
$const2 = new Constants();
echo $const2::$instanceCount, '<br>'; # 2

# singleton pattern
require_once 'Singleton.php';
$singleton1 = Singleton::getInstance(null);
var_dump($singleton1); # object(Singleton)#20 (1) { ["param"]=> NULL }
// $singleton2 = new Singleton(); # Uncaught Error: Call to private Singleton::__construct() ...



echo '<br> The end! <br>';
# Destruct unneeded
