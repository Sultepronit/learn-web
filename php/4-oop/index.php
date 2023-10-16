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