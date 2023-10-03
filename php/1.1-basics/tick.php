<?php

function onTick() {
    echo 'Tick!<br>';
}

register_tick_function('onTick');
declare(ticks=1); # will be executed on every tick event
# Tick!

echo 'Hello There!<br>';
# Tick!

$i = 0;
$end = 5; 
# 2 * Tick!

while($i < $end) {
    echo $i++ . '<br>';
}
/* 
0
Tick!
1
Tick!
2
Tick!
3
Tick!
4
Tick!
Tick!
*/