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
