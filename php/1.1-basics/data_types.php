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

#################################
echo '<br>----------------float/double----------------';
$x = 5.6;
echo '<br>', $x;
$y = 5.6e3;
echo '<br>', $y; # 5600
echo '<br>'; var_dump($y); # float(5600)
$z = 5.6e-3;
echo '<br>', $z; # 0.0056
$f1 = 1_000.5e2;
echo '<br>', $f1; # 100050

echo '<br>', PHP_FLOAT_MAX; # 1.7976931348623E+308
echo '<br>', PHP_FLOAT_MIN; # 2.2250738585072E-308

echo '<br>', (0.1 + 0.7); # 0.8
echo '<br>', var_dump(0.1 + 0.7); # float(0.7999999999999999)
echo '<br>', floor((0.1 + 0.7) * 10); # 7
echo '<br>', (0.1 + 0.2); # 0.3
echo '<br>', var_dump(0.1 + 0.2); # float(0.30000000000000004)
echo '<br>', ceil((0.1 + 0.2) * 10); # 4

$f2 = 0.23;
$f3 = 1 - 0.77;
echo '<br>'; var_dump($f2, $f3); # float(0.23) float(0.22999999999999998)
echo '<br>';
if($f2 == $f3) echo 'Equal!'; else echo 'Not equal!'; # Not equal!

echo '<br>', log(-1); # NAN
// echo '<br>', 1 / 0; # Fatal error
$f4 = PHP_FLOAT_MAX * 2;
echo '<br>', $f4; # INF
echo '<br>'; var_dump($f4); # float(INF)
echo '<br>', is_infinite($f4); # 1
echo '<br>', is_finite($f3); # 1
echo '<br>', is_nan(log(-1)); # 1

# casting
$int1 = 5;
echo '<br>'; var_dump($int1); # int(5)
$f5 = (float) $int1;
echo '<br>'; var_dump($f5); # float(5)
echo '<br>'; var_dump(floatval($int1)); # int(5)

echo '<br>'; var_dump((float) '75.4abd'); # float(75.4)
echo '<br>'; var_dump((float) '75,4abd'); # float(75)
echo '<br>'; var_dump((float) 't75,4abd'); # float(0)

#################################
echo '<br>----------------string----------------';
$name = 'Stefko';
echo "<br>{$name[0]}"; # S
echo "<br>{$name[-1]}"; # o
$name[-1] = 'O';
echo "<br>{$name}"; # StefkO
$name[10] = 'M';
echo '<br>'; var_dump($name); # string(11) "StefkO M"
echo "<br>[{$name[20]}]"; # [] # + warning!

# Heredoc
# acts like "" - can contain variables
$heredoc = <<<TEXT
line 1
"Moe's"
$name
TEXT;
echo "<br>{$heredoc}"; # line 1 "Moe's" StefkO M
echo '<br>' . nl2br($heredoc); # line 1<br>...

# Nowdoc
# acts like '' - can not contain variables
$nowdoc = <<<'TEXT'
line 1
"Moe's"
$name
TEXT;
echo "<br>{$nowdoc}"; # line 1 "Moe's" $name
echo '<br>' . nl2br($nowdoc); # line 1<br>...

#################################
echo '<br>----------------null----------------';
$x = null;
echo "<br>$x";
var_dump($x); # NULL
echo '<br>' . gettype($x); # NULL
echo '<br>' . is_null($x); # 1
echo '<br>' . ($x === null); # 1

###### little experiment
function pl($arg) {
    echo "<br> $arg";
}
######
echo '<br>'; var_dump($noexist); # NULL # + warning!
$y = 5;
pl($y); # 5
unset($y);
pl('');
var_dump($y); # NULL


echo "<h1>-</h1><br>";
