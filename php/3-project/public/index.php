<?php

declare(strict_types = 1);

$root = dirname(__DIR__) . DIRECTORY_SEPARATOR;

define('APP_PATH', $root . 'app' . DIRECTORY_SEPARATOR);
define('FILES_PATH', $root . 'transaction_files' . DIRECTORY_SEPARATOR);
define('VIEWS_PATH', $root . 'views' . DIRECTORY_SEPARATOR);

include APP_PATH . 'App.php';

$fileNames = getTransactionFiles(FILES_PATH);

$transactions = readCSVFiles($fileNames, FILES_PATH);

$parsedTransactions = parseTransactions($transactions);

$total = getTotals($parsedTransactions);

include APP_PATH . 'helpers.php';

include VIEWS_PATH . 'transactions.php';


