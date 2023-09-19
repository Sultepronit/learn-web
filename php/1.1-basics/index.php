<?php

echo 'Hello World';

print '<br>How are you!';

echo print '<br>Something will happen';

echo '<br>one', ' ', 'two', ' ', 'three';

# echo is marginally faster than print

echo '<br>Moe\'s';

$x = 1;
$y = $x;
$z = &$x;
$x = 2;

echo '<br> {$x} {$y}';
echo "<br> {$x} {$y} {$z}"; # 2 1 2
echo "<br> $x $y $z"; # 2 1 2

# constants
define('MY_NAME', 'Stepan');
echo '<br>', MY_NAME;
echo '<br>', defined('MY_NAME'); # 1
echo '<br>[', defined('SOMETHING'), ']'; # []

const ABC = 'abc';
echo '<br>', ABC;
echo '<br>[', defined(ABC), ']'; # []

if(true) {
    define('NINE', 9);
    // const FIVE = 5; # don't work
}

$ok = 'OK';
define('STATUS_' . $ok, 0);
echo '<br>', STATUS_OK; # 1

echo '<br>', PHP_VERSION;

# magic constants, are actually variable
echo '<br>', __LINE__; #46
echo '<br>', __FILE__; #/home/step/WEB/php/1.1-basics/index.php

# variable variables
$vn = 'firstName';
$$vn = 'Stefko'; # = $firstName = 'Stefko';
echo '<br>', $firstName; # Stefko
echo '<br>', $$vn; # Stefko
$reverse = 'vn';
echo '<br>', $$reverse; # firstName
echo "<br> $reverse $$reverse"; # vn $vn
echo "<br> $reverse {$$reverse}"; # vn firstName
echo "<br> $reverse ${$reverse}"; # vn firstName

# Dada Types
# Scalar Types: bool/boolean, int/integer, float/double & string;
$isBoolean = true;
echo '<br>', $isBoolean; # 1
$isInt = false;
echo '<br>[', $isInt, ']'; # []
echo '<br>', gettype($isBoolean); # boolean
echo '<br>', gettype(0); # integer
echo '<br>', gettype(1.0); # double
echo '<br>', var_dump('text'); # string(4) "text"
echo '<br>', var_dump('here we go'); # string(10) "here we go"
echo '<br>', var_dump(-1.54); # float(-1.54)
echo '<br>', var_dump($isBoolean); # bool(true)
echo '<br>', var_dump(155); # int(155)

# Conpound Types
# array 
$array1 = [0, 0.5, -7, 'a', true];
echo '<br>', $array1; # Array # + warning
echo '<br>', gettype($array1); # array
echo '<br>', var_dump($array1); # array(5) { [0]=> int(0) [1]=> float(0.5) [2]=> int(-7) [3]=> string(1) "a" [4]=> bool(true) }
print_r($array1); # Array ( [0] => 0 [1] => 0.5 [2] => -7 [3] => a [4] => 1 )
# object ...
# callable ...
# iterable ...

# Special Types
# resource
# null

# arguments in functions

function sum($x, $y) {
    echo '<br>';
    var_dump($x, $y);
    return $x + $y;
}

echo sum(2, 3); # int(2) int(3) 5
echo sum(2, '3'); # int(2) string(1) "3" 5
echo sum('2', '3'); # string(1) "2" string(1) "3" 5
echo sum(2, true); # int(2) bool(true) 3
echo sum(2, false); # int(2) bool(false) 2
echo sum(2, 3.9); # int(2) float(3.9) 5.9

# type juggling/coercion
function sum2(int $x, int $y) {
    echo '<br>';
    var_dump($x, $y);
    return $x + $y;
}

echo sum2(2, 3); # int(2) int(3) 5
echo sum2(2, '3'); # int(2) int(3) 5
echo sum2('2', '3'); # int(2) int(3) 5
echo sum2(2, true); # int(2) int(1) 3
echo sum2(2, false); # int(2) int(0) 2
echo sum2(2, 3.9); # int(2) int(3) 5

# declare(strict_types=1); in the document beginning will forbid type conversion
# but int instead of float are acceptable

# type casting
$x = '5';
echo '<br>'; var_dump($x); # string(1) "5"
$y = (int) $x;
echo '<br>'; var_dump($y); # int(5)

# file that constains only php should not end with closig tag


