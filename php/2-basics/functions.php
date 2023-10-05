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