<?php
function pl($data = '') {
	echo "$data <br>";
}

$a1 = ['a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5];

$a2 = array_chunk($a1, 2);
print_r($a2); # Array ( [0] => Array ( [0] => 1 [1] => 2 ) [1] => Array ( [0] => 3 [1] => 4 ) [2] => Array ( [0] => 5 ) )
pl();
print_r($a2[0]); # Array ( [0] => 1 [1] => 2 )

$a3 = array_chunk($a1, 3, true); # preserve keys
pl();
print_r($a3[0]); # Array ( [a] => 1 [b] => 2 [c] => 3 )

$keys = ['A', 'B', 'C'];
$values = [14, 58, 99];
$a4 = array_combine($keys, $values);
pl();
print_r($a4); # Array ( [A] => 14 [B] => 58 [C] => 99 )

$a5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
$even = array_filter($a5, fn($num) => $num % 2 === 0);
pl();
print_r($even); # Array ( [1] => 2 [3] => 4 [5] => 6 [7] => 8 [9] => 10 )

$a6 = array_values($even);
pl();
print_r($a6); # Array ( [0] => 2 [1] => 4 [2] => 6 [3] => 8 [4] => 10 )

$a7 = [1, 2, 'c', 0, [], null, 9, true, false];
$filtered = array_filter($a7);
pl();
print_r($filtered); # Array ( [0] => 1 [1] => 2 [2] => c [6] => 9 [7] => 1 )

# $a1 = ['a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5];
pl();
print_r(array_values($a1)); # Array ( [0] => 1 [1] => 2 [2] => 3 [3] => 4 [4] => 5 )
pl();
print_r(array_keys($a1)); # Array ( [0] => a [1] => b [2] => c [3] => d [4] => e )
pl();
print_r(array_keys($a1, 4)); # Array ( [0] => d )

$a8 = [1, 2, 3, '1'];
pl();
print_r(array_keys($a8, 1)); # Array ( [0] => 0 [1] => 3 )
pl();
print_r(array_keys($a8, 1, true)); # Array ( [0] => 0 ) # strict version

# $a5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
pl();
print_r(array_map(fn($num) => $num * 3, $a5)); # Array ( [0] => 3 [1] => 6 [2] => 9 [3] => 12 [4] => 15 [5] => 18 [6] => 21 [7] => 24 [8] => 27 [9] => 30 )

# $a1 = ['a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5];
pl();
print_r(array_map(fn($num) => $num * 2, $a1)); # Array ( [a] => 2 [b] => 4 [c] => 6 [d] => 8 [e] => 10 )

# $keys = ['A', 'B', 'C'];
# $values = [14, 58, 99];
pl();
print_r(array_map(fn($char, $num) => $char . $num, $keys, $values));
# Array ( [0] => A14 [1] => B58 [2] => C99 )

pl();
print_r(array_map(fn($char, $num) => $char . $num, $keys, $a1));
# Array ( [0] => A1 [1] => B2 [2] => C3 [3] => 4 [4] => 5 )

pl();
print_r(array_map(null, $keys, $values));
# Array ( [0] => Array ( [0] => A [1] => 14 ) [1] => Array ( [0] => B [1] => 58 ) [2] => Array ( [0] => C [1] => 99 ) )

pl();
$a9 = [1, 2, 3];
$a10 = [4, 5, 6];
$a11 = [7, 8, 9];
print_r(array_merge($a9, $a10, $a11));
# Array ( [0] => 1 [1] => 2 [2] => 3 [3] => 4 [4] => 5 [5] => 6 [6] => 7 [7] => 8 [8] => 9 )
pl();
$a12 = ['a' => 4, 'b' => 5, 'c' => 6];
print_r(array_merge($a9, $a12));
# Array ( [0] => 1 [1] => 2 [2] => 3 [a] => 4 [b] => 5 [c] => 6 ) 
pl();
print_r(array_merge($a12, $a9)); 
# Array ( [a] => 4 [b] => 5 [c] => 6 [0] => 1 [1] => 2 [2] => 3 )
pl();
$a13 = [5 => 4, 15 => 5, 22 => 6];
print_r(array_merge($a9, $a13));
# Array ( [0] => 1 [1] => 2 [2] => 3 [3] => 4 [4] => 5 [5] => 6 ) # numerical keys owerwriten
pl();
$a14 = ['c' => 7, 'd' => 8, 'e' => 9];
print_r(array_merge($a12, $a14));
#Array ( [a] => 4 [b] => 5 [c] => 7 [d] => 8 [e] => 9 ) 

pl();
pl(array_reduce([1, 50, 100], fn($sum, $item) => $sum + $item)); # 151
pl(array_reduce([1, 20, 300], fn($sum, $item) => $sum + $item, 1000)); # 1321

pl(array_search('1', [2, 1, 0, '1'])); # 1
pl(array_search('1', [2, 1, 0, '1'], true)); # 3 # strict
var_dump(array_search('5', [2, 1, 0, '1'])); # bool(false)
pl();
if(in_array(2, [2, 1, 0, '1'])) {
    pl('found!');
} # found!

print_r(array_diff([1, 2, 3, 4], [2, 7], [3, 9])); # Array ( [0] => 1 [3] => 4 )
# finds elements of the first array that are not included in any next
pl();
print_r(array_diff([1, 2, 3], ['a' => 1, 'b' => 2])); # Array ( [2] => 3 )
pl();
print_r(array_diff_assoc([1, 2, 3], ['a' => 1, 'b' => 2])); # Array ( [0] => 1 [1] => 2 [2] => 3 )
pl();
print_r(array_diff_key(['a' => 1, 'b' => 1, 'c' => 1], ['a' => 2, 'b' => 2, 'D' => 2]));
# Array ( [c] => 1 )

pl();
$a15 = ['a' => 3, 'c' => 1, 'b' => 2, 'd' => 4];
asort($a15);
print_r($a15); # Array ( [c] => 1 [b] => 2 [a] => 3 [d] => 4 )
pl();
ksort($a15);
print_r($a15); # Array ( [a] => 3 [b] => 2 [c] => 1 [d] => 4 )
pl();
usort($a15, fn($a, $b) => $b <=> $a);
print_r($a15); # Array ( [0] => 4 [1] => 3 [2] => 2 [3] => 1 )
pl();

# destructure
$a16 = [10, 20, 30];
list($a, $b, $c) = $a16;
pl("$a $b $c"); # 10 20 30

[$d, $e, $f] = $a16;
pl("$d $e $f"); # 10 20 30

[, , $g] = $a16;
pl($g); # 30

[1 => $e1] = $a16;
pl($e1); # 20

$a17 = [1, [2, 3]];
[$h, [$i, $j]] = $a17;
pl($i); # 2