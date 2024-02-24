<?php

echo 'Here we go!';
// $host = '127.0.0.1'; // or 'localhost' if MySQL server is running on the same machine
// $host = 'localhost';
// $host = '0.0.0.0';
$host = 'db';
$dbname = 'docker-php';
$username = 'root';
$password = 'secret';
$port = 3306; // Specify the port number

$pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);

print_r($pdo);

echo '<pre>';
print_r($_SERVER);

echo file_get_contents('https://example.com');