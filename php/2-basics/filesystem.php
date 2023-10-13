<?php

$currentDir = scandir(__DIR__);
print_r($currentDir);
# Array ( [0] => . [1] => .. [2] => array-functions.php [3] => date-time.php [4] => errors.php [5] => file1.php [6] => file2.php [7] => file3.php [8] => files.php [9] => filesystem.php [10] => functions.php )
echo "<br> {$currentDir[2]} <br>"; # array-functions.php
var_dump(is_file($currentDir[2])); # bool(true)

echo "<br> {$currentDir[3]} <br>"; # date-time.php
var_dump(is_dir($currentDir[3])); # bool(false)

mkdir('created-by-php');
rmdir('created-by-php');
rmdir('nothing'); # Warning: rmdir(nothing): No such file or directory ...

mkdir('created/nested', recursive: true);
rmdir('created/nested'); # removes only last one

if(file_exists('file')) {
    echo filesize('file');
} else {
    echo 'File not exists!<br>';
} # File not exists!

if(file_exists('created/file1')) {
    echo filesize('created/file1');
} else {
    echo 'File not exists!<br>';
} # *11

echo filesize('created/file1'), '<br>'; # *256 # old result
$text = 'go! ';
$rand = random_int(0, 100);
for($i = 0; $i < $rand; $i++) {
    $text .= 'go! ';
}
file_put_contents('created/file1', $text);
echo filesize('created/file1'), '<br>'; # *256 # old result!!!
# filesize() is cached, and doesn't react to changes!
clearstatcache(); # cleared the cache
echo filesize('created/file1'), '<br>'; # *344 # new result

$file = fopen('created/file1', 'r'); # opened for reading
var_dump($file); # resource(5) of type (stream)

fopen('nothing', 'r'); # Warning: fopen(nothing): Failed to open stream: No such file or directory ...
@fopen('nothing', 'r'); # ... # !BAD PRACTICE! of suppressing warnings

$textFile = fopen('created/text', 'r');
while(($line = fgets($textFile)) !== false) {
    echo $line, '<br>';
} # first line ...
fclose($textFile);

$commas = fopen('created/commas', 'r');
while(($line = fgetcsv($commas)) !== false) {
    print_r($line); echo '<br>';
}
fclose($commas); # Array ( [0] => a [1] => b [2] => c ) ...

$textContent = file_get_contents('created/text');
echo($textContent); # first line second line last line
echo '<br>';
$part = file_get_contents('created/text', offset: 2, length: 3);
echo($part); # rst

# creates file if it doesn't exists
file_put_contents('created/file2', 'some text');
# cannot create directories
file_put_contents('nothing/file', 'content!'); # Warning: file_put_contents(nothing/file): Failed to open stream: No such file or directory ....

# this version updates existing file
file_put_contents('created/file2', ' +this text', FILE_APPEND);

file_put_contents('created/new-file', 'some text');
copy('created/new-file', 'created/new-file2'); # overwrites existing files!
unlink('created/new-file'); 

# cannot move file to uexisting directory
rename('created/new-file2', 'created/nothing/new'); # Warning: rename(created/new-file2,created/nothing/new): No such file or directory in
rename('created/new-file2', 'created/sub/new'); # yeah, it can move files & dirs too!
$info = pathinfo('created/sub/new');
print_r($info); # Array ( [dirname] => created/sub [basename] => new [filename] => new )
echo '<br>';
$info = pathinfo('errors.php');
print_r($info); # Array ( [dirname] => . [basename] => errors.php [extension] => php [filename] => errors )
