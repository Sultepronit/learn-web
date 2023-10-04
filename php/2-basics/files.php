<?php

include 'nothing.php'; # warning

echo 'hello there!';

// require 'nothing.php'; # error
// echo 'message2!';

include 'file1.php'; # Hello form file#1

require 'file1.php'; # Hello form file#1

include_once 'file1.php'; # nothing, because the file is already required!

require_once 'file1.php'; # nothing, because the file is already required!

require 'file2.php'; # contains $int = 10;
echo '<br>' . $int++; # 10
echo '<br>' . $int++; # 11

require 'file2.php'; 
echo '<br>' . $int++; # 10
echo '<br>' . $int++; # 11

include 'file2.php'; 
echo '<br>' . $int++; # 10
echo '<br>' . $int++; # 11

$re1 = include 'file2.php'; 
echo '<br>' . $int++; # 10
echo '<br>' . $int++; # 11

echo '<br>' . $re1; # 1

$re2 = include 'file3.php'; # ends with return [1, 2, 3];
echo '<br>'; print_r($re2); # Array ( [0] => 1 [1] => 2 [2] => 3 )

ob_start();
include 'file1.php'; # <?php echo '<br>Hello form file#1';
$cont = ob_get_clean();
echo '<br>'; var_dump($cont);
# string(21) "
# Hello form file#1"
$cont = str_replace('<', '&lt;', $cont);
echo "<br> $cont"; # <br>Hello form file#1