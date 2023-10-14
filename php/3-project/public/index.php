<?php

declare(strict_types = 1);

$root = dirname(__DIR__) . DIRECTORY_SEPARATOR;

define('APP_PATH', $root . 'app' . DIRECTORY_SEPARATOR);
define('FILES_PATH', $root . 'transaction_files' . DIRECTORY_SEPARATOR);
define('VIEWS_PATH', $root . 'views' . DIRECTORY_SEPARATOR);

/* YOUR CODE (Instructions in README.md) */
include APP_PATH . 'App.php';

$fileNames = getTransactionFiles(FILES_PATH);
/* print_r($fileNames);
echo '<br>'; */
$transactions = readCSVFiles($fileNames, FILES_PATH);
/* echo '<pre>';
print_r($transactions); */

include VIEWS_PATH . 'transactions.php';
