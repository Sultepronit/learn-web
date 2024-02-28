<?php

$dbImport = file_get_contents('jap_words (3).sql');

$host = 'db';
$dbname = 'jap';
$username = 'root';
$password = 'secret';

$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

// print_r($pdo);

$pdo->exec($dbImport);

$thedb = $pdo->query('SELECT * FROM jap_words')->fetchAll(PDO::FETCH_ASSOC);

// echo '<pre>';
// print_r($thedb);
echo json_encode($thedb);