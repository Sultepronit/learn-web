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