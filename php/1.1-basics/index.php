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

# file that constains only php should not end with closig tag