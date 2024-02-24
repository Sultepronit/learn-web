<?php

$host = '127.0.0.1'; // or 'localhost' if MySQL server is running on the same machine
$dbname = 'docker-php';
$username = 'root';
$password = 'secret';
$port = 3316; // Specify the port number

$pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);

echo '<pre>';
print_r($_SERVER);