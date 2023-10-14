<?php

declare(strict_types = 1);

//error on 3:40
// Your Code
function getTransactionFiles(string $path): array {
    $items = scandir($path);
    $files = [];
    foreach($items as $item) {
        if(is_file($path . $item)) {
            $files[] = $item;
        }
        /* if(!is_dir($item)) {
            $files[] = $item;
        } */
    }
    return $files;
}

function readCSVFiles(array $fileNames, string $path): array {
    $transactions = [];
    foreach($fileNames as $fileName) {
        $fileContent = fopen(($path . $fileName), 'r');
        /* echo $fileContent;
        echo '<br>'; */
        while($line = fgetcsv($fileContent)) {
            //print_r($line); echo '<br>';
            $transactions[] = $line;
        }
    }
    return $transactions;
}