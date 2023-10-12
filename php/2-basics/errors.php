<?php
# to stop reporting any error, including console!
error_reporting(0);
echo $nothing;
# ...

error_reporting(E_ALL);
echo $nothing;
# Warning: Undefined variable $a ... on line 8

# report all the errors, exept warnings
error_reporting(E_ALL & ~E_WARNING);
echo $nothing;
echo $nothing[0];
# ...

#trigger_error('Example error', E_USER_ERROR);
# Fatal error: Example error ... on line 17
# script stops executing

trigger_error('Example error', E_USER_WARNING);
#Warning: Example error ... on line 21

function errorHandler(int $type, string $msg,
    ?string $file = null, ?int $line = null) {
    echo "!$type: $msg in $file on line $line!";
    exit;
}

# this will rewrite previous error_reporting() settings
set_error_handler('errorHandler', E_ALL);
echo $nothing;
# !2: Undefined variable $nothing in ...errors.php on line 32!