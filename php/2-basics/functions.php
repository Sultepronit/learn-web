<?php

// inside_if(); # error!
if(true) {
    function inside_if() {
        echo 'Hello from function inside an if statement!';
    }
}
inside_if(); # Hello from function inside an if statement!

outer(); # !if not called first, inner wouldn't work!
inner(); # Hello form nested function!
function outer() {
    function inner() {
        echo '<br> Hello form nested function!';
    }
}

function returnInt(): int {
    //return []; # error!
    return '15';
}
echo '<br>'; var_dump(returnInt()); # int(15)
# !with declare(stict_types=1) will be an error!

function voidFunction(): void {
    # return; # will also give NULL
    //return null; # will give an error!
}
echo '<br>'; var_dump(voidFunction()); # NULL

function returnNullable(): ?int {
    if(random_int(0, 1)) {
        return 19;
    } else {
        return null;
    }
   //return; # will give an error!
}
echo '<br>'; var_dump(returnNullable()); # NULL | int(19)

# since php 8
function returnMultiple(): int|float|array {
    $random = random_int(1, 1000);
    if($random < 300) {
        return $random;
    } 
    if($random < 600) {
        return $random / 2.3;
    }
    return [1, 2, $random];
}
echo '<br>'; var_dump(returnMultiple()); # int(*) | float(*) | array(3) {*}

# since php 8
function returnMixed(): mixed {
    $random = random_int(1, 1000);
    if($random < 300) {
        return "$random";
    } 
    if($random < 600) {
        return $random / 2.3;
    }
    return [1, 2, $random];
}
echo '<br>'; var_dump(returnMixed()); # string* | float(*) | array(3) {*}

# sisce php 8
function product(int|float $x, int|float $y) {
    return $x * $y;
}
echo '<br>'; var_dump(product(2, 3.5));  # float(7)

function args(string $a, string $b, string $c = 'C'): string {
    return $a . $b . $c;
}
echo '<br>' . args('I ', 'love ', 'U'); # I love U
echo '<br>' . args('aaa', 'bbb'); # aaabbbC
//echo '<br>' . args('aaa'); # Error!
echo '<br>' . args('A ', 'B ', 'C ', 'D '); # A B C

# variadic functions, splat operator
function sum(int|float $first, int|float ...$numbers): int|float {
    echo $first, '<br>'; # 100
    return(array_sum($numbers));
}
$arr1 = [5, 15, 20];
echo '<br>', sum(100, 5, 33, 0.8, ...$arr1); # 78.8

# named arguments
function quotient(int|float $dividend, int|float $divisor): float {
    return $dividend / $divisor;
}
echo '<br>', quotient(15, 50); # 0.3
echo '<br>', quotient(divisor: 15, dividend: 50); # 3.3333333333333
$arr2 = ['dividend' => 256, 'divisor' => 4];
echo '<br>', quotient(...$arr2); # 64

setcookie(name: 'smth', value: 'val', httponly: true);
setcookie('smth2', 'val', httponly: true);

# global scope
$global = 'this is global var!';
$global2 = 1754;
# are awailable everywhere, including imported files
function fn1() {
    # but invisible form inside the function by defalut!
    global $global; 
    echo '<br>' . $global; # this is global var!
    echo "<br>" . $GLOBALS['global2']; # 1754
}
fn1();

function process() {
    echo '<br> processing...';
    return 145;
}

function handleStatic() {
    # thiv var is created one time and is saved for the next
    static $staticVar = null;

    if($staticVar === null) {
        $staticVar = process();
    }

    echo '<br>' . $staticVar;
}

handleStatic();
handleStatic();
handleStatic();

# variable functions
function pl($arg) {
    echo "<br> $arg";
}
$vfn1 = 'pl';
$vfn1('variable function!'); # variable function!
$nothing = 145;
echo '<br>', is_callable($vfn1); # 1
echo '<br>:', is_callable($nothing); # :

# anonimous functions
# can be assigned to variables, returned, or used as arguments
$anvar = function() {
    echo '<br> anominus function assigned to variable!';
};

$anvar(); # anonymous function assigned to variable!

# closure can be used with anonimous functions
# it works like another parameter - you get a acopy of it
# at a moment of function creation!!!
$smth = 456;
$anvar2 = function() use($smth) {
    $smth += 100;
    echo "<br> $smth";
};
$anvar2(); # 556
echo "<br>", ++$smth; # 457
$anvar2(); # 556

# you though can create a reference to actual variable
$anvar3 = function() use(&$smth) {
    $smth += 50;
    echo "<br> $smth";
};
$anvar3(); # 507
echo "<br>", ++$smth; # 508
$anvar3(); # 558

# type of return:
$anvar4 = function() use($smth): int|float {
    return $smth + random_int(1, 100);
};
echo "<br>", $anvar4(); # (558+)

# callbacks: anonymous functions, callable variables,
# functions, with names represented as string
$arr3 = [1, 2, 3, 4];
$arr6 = array_map(function($e) {
    return $e * 2;
}, $arr3);
echo '<br>'; print_r($arr6); # Array ( [0] => 2 [1] => 4 [2] => 6 [3] => 8 )

function byThree($arg) {
    return $arg * 3;
}

$arr9 = array_map('byThree', $arr3);
echo '<br>'; print_r($arr9); # Array ( [0] => 3 [1] => 6 [2] => 9 [3] => 12 )

# arrow functions
# since PHP 7.4
$arr10 = array_map(fn($e) => $e * $e, $arr3);
echo '<br>'; print_r($arr10); # Array ( [0] => 1 [1] => 4 [2] => 9 [3] => 16 )

# arrow functions can directly get copies of global variables
$num = 222;
$arvar1 = fn() => $num/=3;
echo '<br>', $arvar1(); # 74
echo "<br> $num"; # 222
