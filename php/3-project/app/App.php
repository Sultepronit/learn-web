<?php

declare(strict_types = 1);

function getTransactionFiles(string $path): array {
    $items = scandir($path);
    $files = [];
    foreach($items as $item) {
        if(is_file($path . $item)) {
            $files[] = $item;
        }
    }
    return $files;
}

function readCSVFiles(array $fileNames, string $path): array {
    $transactions = [];
    foreach($fileNames as $fileName) {
        $fileContent = fopen(($path . $fileName), 'r');
        while($line = fgetcsv($fileContent)) {
            $transactions[] = $line;
        }
    }
    return $transactions;
}

function parseTransactions(array $rawData): array {
    $parsed = [];
    foreach($rawData as $transaction) {
        $time = strtotime($transaction[0]);
        if(!$time) continue;

        $amount = (float) str_replace(['$', ','], '', $transaction[3]);

        $parsed[] = [
            'time' => $time,
            'check' => $transaction[1],
            'description' => $transaction[2],
            'amount' => $amount
        ];
    }
    return $parsed;
}

function getTotals(array $transactions): array {
    $total = ['income' => 0, 'expense' => 0, 'net' => 0];
    foreach($transactions as $transaction) {
        $total['net'] += $transaction['amount'];
        if($transaction['amount'] > 0) {
            $total['income'] += $transaction['amount'];
        }
    }
    $total['expense'] = $total['income'] - $total['net'];
    return $total;
}