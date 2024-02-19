<?php
declare(strict_types=1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');

$url = 'http://localhost:8080' . $_SERVER['REQUEST_URI'];
// print_r($_SERVER);

$method = $_SERVER['REQUEST_METHOD'];
if($method === 'OPTIONS') {
    exit(); 
} else {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    if($method === 'POST' || $method ===  'PATCH') {
        $data = file_get_contents('php://input');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    }

    $response = curl_exec($ch);
    curl_close($ch);
    echo $response;
}
