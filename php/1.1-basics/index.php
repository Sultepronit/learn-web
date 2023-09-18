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

# file that constains only php should not end with closig tag
