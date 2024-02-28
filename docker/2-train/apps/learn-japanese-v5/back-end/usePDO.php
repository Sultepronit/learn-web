<?php
declare(strict_types=1);

function usePDO(callable $action, array $args = []) {
    try {
        // $pdo = new PDO('sqlite:' . __DIR__ . '/jap.sqlite');

        $host = 'db';
        $dbname = 'jap';
        $username = 'root';
        $password = 'secret';
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

        call_user_func_array($action, [$pdo, ...$args]);  
    } catch (\Throwable $th) {
        http_response_code(500);
        print_r($th);
        // exit();
    } finally {
        $pdo = null;
    }
}