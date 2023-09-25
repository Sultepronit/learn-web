<?php
function pl($arg) {
    echo '<br>', $arg;
}

// Arithmetic Operators
echo(9 % 5); # 4
pl(5 ** 3); # 125

$s1 = '10';
pl(''); var_dump($s1); # string(2) "10"
pl(''); var_dump(+$s1); # int(10)
pl(''); var_dump(10 / 2); # int(5)
pl(''); var_dump(10.0 / 2); # float(5)
pl(''); var_dump(10 / 2.0); # float(5)

# pl(''); var_dump(5 / 0); # ERROR!
pl(''); var_dump(fdiv(5, 0)); # float(INF)

pl(''); var_dump(10.1 % 3.9); # int(1)
pl(''); var_dump(fmod(10.1, 3.9)); # float(2.3)
pl(''); var_dump(10 % -3); # int(1)
pl(''); var_dump(-10 % 3); # int(-1)
pl(''); var_dump(-10 % -3); # int(-1)

# comparsion operators
pl(''); var_dump('a' == 'A'); # bool(false)
pl(''); var_dump('a' <> 'A'); # bool(true)
# spaceship operator!
pl(''); var_dump(5 <=> 2); # int(1)
pl(''); var_dump(0 <=> 0); # int(0)
pl(''); var_dump(0 <=> 7); # int(-1)
pl(''); var_dump('a' <=> 'A'); # int(1)

pl(''); var_dump(0 == 'go!'); # bool(false)
# >= php8 -> '0' == 'go!' = false
# before php8 0 == 0 = true!
pl(''); var_dump(0 == (int) 'go!'); # bool(true) # like that

# only for null
pl(null ?? 'go!'); # go!
pl('[' . (false ?? 'go!') . ']'); # go! []

# Error Control Operator # NOT RECOMENDED!
# in my case removes warning from colsole, no error
$f = @file('nothing.txt');
pl(''); var_dump($f);

# null & string can be incremented
$n = null;
pl(++$n); # 1

$s = 'abc';
pl(++$s); # abd
$s = 'z';
pl(++$s); # aa

pl(''); var_dump(true xor true); # bool(false)
pl(''); var_dump(false xor true); # bool(true)
pl(''); var_dump(false xor false); # bool(false)

pl(''); var_dump(true && true and true); # bool(true)
pl(''); var_dump(false || false or true); # bool(true)

# = has higher precedence than and/or
$boo = true and false;
pl(''); var_dump($boo); # bool(true)
$boo = (true and false);
pl(''); var_dump($boo); # bool(false)
$boo = false or true;
pl(''); var_dump($boo); # bool(false)

function returnFalse() {
    pl("You've saw nothing");
    return false;
}

pl(''); var_dump(true || returnFalse()); # bool(true)
pl(''); var_dump(false && returnFalse()); # bool(false)
pl(''); var_dump(false && returnFalse() || true); # bool(true)
# && has higher precedence that ||, so "(false && returnFalse()) || true" = "false || true"

# bitwise operators
pl(6 & 3); # 2
# 110 & 011 = 010

pl(6 | 3); # 7
# 110 | 011 = 111

pl(6 ^ 3); # 5
# 110 | 011 = 101

pl(~6); # -7 # ?????

pl(~6 & 3); # 1
# 001 & 011 = 001

pl(6 << 1); # 12
# 110 to 1100 = 6 * 2;
pl(6 << 3); # 48
# 110 to 110000 = 6 * 2 * 2 * 2;
pl(6 >> 1); #3
# 110 to 011 = 6 / 2

# array operators
$a1 = [1, 2, 3];
$a2 = [4, 5, 6];
$a3 = $a1 + $a2;
pl(''); print_r($a3); # Array ( [0] => 1 [1] => 2 [2] => 3 )
$a4 = [7, 8, 9, 10];
$a5 = $a1 + $a4;
pl(''); print_r($a5); # Array ( [0] => 1 [1] => 2 [2] => 3 [3] => 10 )
# addition from second, without overwriting

$a6 = ['1', '2', '3'];
pl(''); var_dump($a1 == $a6); # bool(true)
pl(''); var_dump($a1 === $a6); # bool(false)

$a7 = [0 => 1, 2 => 3, 1 => 2];
pl(''); var_dump($a1 == $a7); # bool(true)
pl(''); var_dump($a1 === $a7); # bool(false)

$a8 = ['a', 'b', 'c'];
$a9 = ['A', 'B', 'C'];
pl(''); var_dump($a8 == $a9); # bool(false)
pl(''); var_dump($a8 <> $a9); # bool(true)

pl(''); var_dump(['a', 'b', 'c'] == ['A', 'B', 'C']); # bool(false)
pl(''); var_dump(['a', 'b', 'c'] <> ['A', 'B', 'C']); # bool(true)

pl('<h1>-</h1>');