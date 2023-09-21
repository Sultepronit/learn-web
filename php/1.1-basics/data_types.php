<?php
# boolean/bool
$isTrue = TRUE;
echo gettype($isTrue); # boolean
echo '<br>'; var_dump($isTrue); # bool(true)

# printing to page is casting bool to string
echo '<br>' . $isTrue; # 1
echo '<br>[' . !$isTrue . ']'; # []
echo '<br>', var_dump((string) true); # string(1) "1"
echo '<br>', var_dump((string) false); # string(0) ""

echo '<br>', is_bool(false); # 1

if ($isTrue) {
    echo '<br> true!';
} else {
    echo '<br> false!';
}

# false: 0, -1, 0.0, -0.0, '0', '', [], null

#########################################
# integer/int
$x = 0x2a;
echo '<br>', $x; # 42
$y = 011;
echo '<br>', $y; # 9
$z = 0b111;
echo '<br>', $z; # 7

echo '<br>', PHP_INT_MAX; # 9223372036854775807
$big = PHP_INT_MAX + 1;
echo '<br>', $big; # 9.2233720368548E+18
echo '<br>'; var_dump($big); # float(9.223372036854776E+18)

# casting
$int = (integer) true;
echo '<br>'; var_dump($int); # int(1)
$int2 = (int) 5.99;
echo '<br>'; var_dump($int2); # int(5)
$int3 = (int) '6.99';
echo '<br>'; var_dump($int3); # int(6)
$int4 = (int) '7,99';
echo '<br>'; var_dump($int4); # int(7)
$int5 = (int) '45cd';
echo '<br>'; var_dump($int5); # int(45)
$int6 = (int) 'ab45cd';
echo '<br>'; var_dump($int6); # int(0)
echo '<br>'; var_dump( (int) null ); # int(0)

echo '<br>', is_int(-1); # 1
echo '<br>[', is_integer(-1.5), ']'; # []

$int7 = 100_000;
echo '<br>', $int7; # 100000
echo '<br>', (int) '100_000'; # 100
