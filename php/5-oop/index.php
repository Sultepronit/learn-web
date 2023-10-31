<?php
declare(strict_types=1);
# autoloader

//require_once 'app/Level1/Level2/Class1.php';
# more proper way:
//require_once __DIR__ . '/app/Level1/Level2/Class1.php';

# but we'll do things more clean way:
spl_autoload_register(function($class) {
    $path = __DIR__ . '/'
        . str_replace('\\', '/', lcfirst($class)) . '.php';
    if(file_exists($path)) {
        require $path;
    }
});

use App\Level1\Level2\Class1;

$class11 = new Class1();
var_dump($class11); # object(App\Level1\Level2\Class1)#2 (0) { }
echo '<br>';

############################################################
# *we installed the composer on pc
#cli: composer require ramsey/uuid

require __DIR__ . '/vendor/autoload.php';
$id = new \Ramsey\Uuid\UuidFactory();
echo $id->uuid4(); # *287351da-088d-4ae6-aab6-6e071664d417
echo '<br>';

# and here we'll use external autoloader for our classes:
/*
* added to composer.json:
"autoload": {
    "psr-4": {
        "App\\": "app/"
    }
}
#cli: composer dump-autoload
*/

use App\Level1\Level2B\Class2;
$class21 = new Class2();
var_dump($class11);
echo '<br>';

# to preload all the needed classes and work faster:
#cli: composer dump-autoload -o
#> Generated optimized autoload files containing 160 classes
# It should be done for every new class of course

###################################################################
###################################################################
# OOP
# Encapsulation
# Reflection API to brake encapsulation!
use App\Class3;
use App\Nephew1;

$class31 = new Class3(15);
var_dump($class31);
# object(App\Class3)#27 (1) { ["priv1":"App\Class3":private]=> string(22) "This is private field!" }
echo '<br>';

$reflectedPriv1 = new ReflectionProperty(Class3::class, 'priv1');

echo $reflectedPriv1->getValue($class31); # Privare field #15
echo '<br>';

$reflectedPriv1->setValue($class31, 'Owerwritten, though private!!!');
var_dump($class31);
# object(App\Class3)#27 (1) { ["priv1":"App\Class3":private]=> string(30) "Owerwritten, though private!!!" }
echo '<br>';

###################################################################
# inheritance
$parent11 = new App\Parent1();
$parent11->getAll();
# This is parent's public property
# This is parent's protected property
# This is parent's private property
$parent11->printNext();
# second one
# third one

$child11 = new App\Child1();
$child11->getAll();
# This is child's public property
# This is child's protected property
# This is parent's private property
$child11->getLocalPriv();
# This is child's private property
$child11->printNext();
# Second one, child's edition!
# third one

function useParent(App\Parent1 $parent) {
    var_dump($parent);
    echo '<br>';
}
useParent($parent11);
# object(App\Parent1)#29 (5) { ["pubStr1"]=> string(32) "This is parent's public property" ["protStr1":protected]=> string(35) "This is parent's protected property" ["privStr1":"App\Parent1":private]=> string(33) "This is parent's private property" ["protStr2":protected]=> string(10) "second one" ["protStr3":protected]=> string(9) "third one" }
useParent($child11);
# object(App\Child1)#30 (6) { ["pubStr1"]=> string(31) "This is child's public property" ["protStr1":protected]=> string(34) "This is child's protected property" ["privStr1":"App\Parent1":private]=> string(33) "This is parent's private property" ["protStr2":protected]=> string(28) "Second one, child's edition!" ["protStr3":protected]=> string(9) "third one" ["privStr1":"App\Child1":private]=> string(32) "This is child's private property" }

function useChild(App\Child1 $child) {
    var_dump($child);
    echo '<br>';
}
//useChild($parent11);
# useChild(): Argument #1 ($child) must be of type App\Child1, App\Parent1 given

# conposition example
$nephew1 = new Nephew1($parent11);
$nephew1->finalMethod(); # This method is final, and cannot be overridden!