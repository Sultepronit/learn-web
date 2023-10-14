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

function formatTableData(array $rawData): array {
    $formatted = [];
    foreach($rawData as $transaction) {
        if((int) $transaction[0] === 0) continue;
        $row = [];

        $time = strtotime($transaction[0]);
        //echo $time, '<br>';
        $date = date('M j, Y', $time);
        //echo $date, '<br>';
        //$row[] = $transaction[0];
        $row[] = $date;

        $row[] = $transaction[1];
        $row[] = $transaction[2];

        if($transaction[3][0] === '$') {
            //echo 'green ';
            $row[] = "<span class='green'>{$transaction[3]}</span>";
        } else if($transaction[3][0] === '-' && $transaction[3][1] === '$') {
            //echo 'red ';
            $row[] = "<span class='red'>{$transaction[3]}</span>";
        }
        //echo $transaction[3], '<br>';
        //print_r($row); echo '<br>';
        $formatted[] = $row;
    }
    return $formatted;
}