<?php
function pl($x) {
    echo "<br>$x";
}

$a1 = array(false, 1, 'two');
$a2 = [1, 2, 5.5, 'something'];
echo $a2[0]; # 1

pl(''); var_dump(isset($a1[5])); # bool(false)
pl(''); var_dump(isset($a1[1])); # bool(true)

$a2[1] = 22;
pl($a2); # Array;
pl(''); var_dump($a1); # array(3) { [0]=> bool(false) [1]=> int(1) [2]=> string(3) "two" }

echo '<pre>';
var_dump($a1); # array(3) { ...
echo '</pre>';

print_r($a2); # Array ( [0] => 1 [1] => 22 [2] => 5.5 [3] => something )

echo '<pre>';
print_r($a2); # Array ...
echo '</pre>'; 

echo count($a1); # 3

$a2[] = 'one more';
pl(''); print_r($a2); # Array ( [0] => 1 [1] => 22 [2] => 5.5 [3] => something [4] => one more )

array_push($a1, 3, 'four');
pl(''); print_r($a1); # Array ( [0] => [1] => 1 [2] => two [3] => 3 [4] => four )

# with keys
$a3 = [
    'a' => 1,
    'b' => 2,
    'c' => 3
];
pl(''); print_r($a3); # Array ( [a] => 1 [b] => 2 [c] => 3 )
pl($a3['b']); # 2
$a3['d'] = 4;
pl(''); print_r($a3); # Array ( [a] => 1 [b] => 2 [c] => 3 [d] => 4 )

$a4 = [
    'A' => [0, 1, 2],
    'B' => [3, 4, 5],
    'C' => [6, 7, 8]
];
pl(''); print_r($a4); # Array ( [A] => Array ( [0] => 0 [1] => 1 [2] => 2 ) [B] => Array ( [0] => 3 [1] => 4 [2] => 5 ) [C] => Array ( [0] => 6 [1] => 7 [2] => 8 ) )
echo '<pre>';
print_r($a4);
echo '</pre>';
pl($a4['B'][0]); # 3

$a5 = [0 => 'zero', 1 => 'one', '1' => 'one more, please!', 1.9 => 'float?'];
pl(''); print_r($a5); # Array ( [0] => zero [1] => float? )

$a5[true] = 'bool!';
pl(''); print_r($a5); # Array ( [0] => zero [1] => bool! )

$a5[null] = 'empty string!';
pl(''); print_r($a5); # Array ( [0] => zero [1] => bool! [] => empty string! )
pl($a5['']); # empty string!
$a5[false] = 'false!';
pl(''); print_r($a5); # Array ( [0] => false! [1] => bool! [] => empty string! )

$a6 = ['a', 'b', 'c', 50 => 'd', 'e', 'f'];
pl(''); print_r($a6); # Array ( [0] => a [1] => b [2] => c [50] => d [51] => e [52] => f )

$a7 = ['a', 'b', 'c', true => 'd', 'e', 'f'];
pl(''); print_r($a7); # Array ( [0] => a [1] => d [2] => c [3] => e [4] => f )

$a8 = ['a', 'b', 'c', 'D' => 'd', 'e', 'f'];
pl(''); print_r($a8); # Array ( [0] => a [1] => b [2] => c [D] => d [3] => e [4] => f )

pl(array_pop($a8)); # f
pl(''); print_r($a8); # Array ( [0] => a [1] => b [2] => c [D] => d [3] => e )

pl(array_shift($a8)); # a
pl(''); print_r($a8); # Array ( [0] => b [1] => c [D] => d [2] => e )

#reindex
pl(''); print_r($a6); # Array ( [0] => a [1] => b [2] => c [50] => d [51] => e [52] => f )
pl(array_shift($a6)); # a 
pl(''); print_r($a6); # Array ( [0] => b [1] => c [2] => d [3] => e [4] => f )

unset($a6[1], $a6[3]);
pl(''); print_r($a6); # Array ( [0] => b [2] => d [4] => f )

unset($a6[4]);
pl(''); print_r($a6); # Array ( [0] => b [2] => d )
array_push($a6, 'g'); 
pl(''); print_r($a6); # Array ( [0] => b [2] => d [5] => g )

# casting
pl(''); var_dump((array) 5); # array(1) { [0]=> int(5) }
pl(''); var_dump((array) null); # array(0) { }

$a9 = ['a' => 'A', 'b' => null];
pl(''); var_dump(isset($a9['b'])); # bool(false)
pl(''); var_dump(array_key_exists('b', $a9)); # bool(true)


pl('<h1>-</h1>');