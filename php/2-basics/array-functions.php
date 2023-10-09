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