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