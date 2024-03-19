<?php

xdebug_info();

require_once('../src/Database/Connection.php');

$pdo = App\Database\Connection::getInstance()->getPdo();
// print_r($pdo);
// $pdo->exex("INSERT INTO items (item) VALUES ('drill')");
$data = $pdo->query('SELECT * FROM items')->fetchAll();
echo '<pre>';
print_r($data);
echo '</pre>';

phpinfo();