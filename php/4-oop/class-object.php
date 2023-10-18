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




echo '<br> The end! <br>';
# Destruct unneeded
