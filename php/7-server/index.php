<?php
declare(strict_types=1);

require_once 'app/Router.php';
require_once 'app/Exceptions/RouteNotFoundException.php';
require_once 'app/Classes/Home.php';
require_once 'app/Classes/Invoice.php';
require_once 'app/Classes/Upload.php';

session_start();

define('STORAGE_PATH', __DIR__ . '/storage');

$router = new App\Router();

/* $router->register('/', function() {
    return 'Home';
}); */

/* $router->register('/invoices', function() {
    return 'Invoices';
}); */

$router->get('/', [App\Classes\Home::class, 'index'])
    ->get('/invoices', [App\Classes\Invoice::class, 'index'])
    ->get('/invoices/create', [App\Classes\Invoice::class, 'create'])
    ->post('/invoices/create', [App\Classes\Invoice::class, 'store'])
    ->get('/upload', [App\Classes\Upload::class, 'load'])
    ->post('/upload', [App\Classes\Upload::class, 'loaded']);

echo $router->resolve(
    $_SERVER['REQUEST_URI'],
    strtolower($_SERVER['REQUEST_METHOD'])
);

echo '<pre>';
// print_r($_SERVER);
print_r($_GET); # array of get arguments
print_r($_POST); # array of post arguments
print_r($_REQUEST); # array of get/post arguments
# post agrument will rewrite get's one with the same name

echo 'session: ';
print_r($_SESSION);

echo 'cookie: ';
print_r($_COOKIE);
echo '</pre>';

// phpinfo();





