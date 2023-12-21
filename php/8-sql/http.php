<?php
declare(strict_types=1);

echo $_SERVER['REQUEST_METHOD'], '<br>';
echo '<pre>';
print_r($_GET);
echo '</pre>';
$json = file_get_contents('php://input');
echo $json, '<br>';
$input = json_decode($json, true);

$HTTP_CRUD = [
    'GET' => 'read',
    'POST' => 'create',
    'PATCH' => 'update',
    'DELETE' => 'delete'
];
require_once 'update.php';
// update($_GET['table'], $_GET['id'], $input);
// call_user_func('update', $_GET['table'], $_GET['id'], $input);
call_user_func(
    $HTTP_CRUD[$_SERVER['REQUEST_METHOD']],
    $_GET['table'],
    $_GET['id'],
    $input
);

echo '<pre>';
print_r($_SERVER);
echo '</pre>';      