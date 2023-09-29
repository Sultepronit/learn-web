<?php

for($i = 0;; $i++) {
    for($j = 0;;$j++) {
        if($i === 10) break 2;
        if($j === 10) break;
        echo "$j ";
    }
    echo '<br>';
}

echo '<br>';

for($i = 0; $i < 10; $i++) {
    echo "$i: ";
    for($j = 0; $j < 10; $j++) {
        echo "$j ";
        if($i % 2 === 0) {
            echo '<br>';
            continue 2;
        }
    }
    echo '<br>';
}

echo '<br>';

for($i = 0; $i < 10; print "$i ", $i++); # 0 1 2 3 4 5 6 7 8 9
echo '<br>';
for($i = 0; print "$i ", $i < 10; $i++); # 0 1 2 3 4 5 6 7 8 9 10

echo '<br>';

$hello = 'Hello There!';
for($i = 0; $i < strlen($hello); $i++) {
    echo $hello[$i] . '_';
} # H_e_l_l_o_ _T_h_e_r_e_!_

echo '<br>';

$arr1 = [1, 2, 3, 4, 5, 'six'];
for($i = 0; $i < count($arr1); $i++) {
    echo $arr1[$i] . ' ';
} # 1 2 3 4 5 six
# function call is expensive!
echo '<br>';
for($i = 0, $length = count($arr1); $i < $length; $i++) {
    echo $arr1[$i];
} # 12345six

echo '<br>';
foreach($arr1 as $item) {
    echo "$item * ";
} # 1 * 2 * 3 * 4 * 5 * six *

echo '<br>';
foreach($arr1 as $key => $value) {
    echo "$key: $value, ";
} # 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: six,

echo '<br>';
# we can get items of array as references ,insied of foreach:
foreach($arr1 as $key => &$itemRef) {
    $itemRef = 'boo!';
}
print_r($arr1); # Array ( [0] => boo! [1] => boo! [2] => boo! [3] => boo! [4] => boo! [5] => boo! )

# variables form loops are awailable from the outside!!!
echo "<br> $i"; # 6
echo "<br> $item"; # six
echo "<br> $key"; # 5
echo "<br> $itemRef"; #boo!
$itemRef = 'new!';
echo "<br>";
print_r($arr1); # Array ( [0] => boo! ... [5] => new! )
# so, you should destory the variables:
unset($item);
echo "<br> [$item]"; # []

$arr2 = ['a' => 'one', 'b' => 'two', 'c' => 'three'];
foreach($arr2 as $key => $value) {
    echo "<br>$key: $value";
} # a: one ...

echo "<br>";
# to print nested arrays:
$arr2[] = [1, 2, 3, 5];
foreach($arr2 as $key => $value) {
    echo "<br>$key: " . json_encode($value); # ... 0: [1,2,3,5]
}

# another syntax, that can be used inside of html
foreach($arr2 as $key => $value):
    if(is_array($value)) $value = implode(',', $value);
    echo "<br>$key: $value"; # ... 0: 1,2,3,5
endforeach;

echo '<br>------------------switch------------------<br>';
switch(2) {
    case 0:
        echo 'zero';
        break;

    case 1:
        echo 'one';
        break;

    case 2:
        echo 'two';
        //break;
    
    default:
        echo ' something big!';
} # two something big!

echo '<br>';
switch(5) {
    case 0:
    case 1:
    case 2:
        echo '0-2';
        break;
    case 3:
    case 4:
    case 5:
        echo '3-5';
        break;
    default:
        echo 'something big!';
} # 3-5

