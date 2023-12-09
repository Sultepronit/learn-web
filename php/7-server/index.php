<?php
declare(strict_types=1);

use App\Exceptions\RouteNotFoundException;

require_once 'app/Router.php';
require_once 'app/View.php';
require_once 'app/Controllers/HomeController.php';
require_once 'app/Controllers/InvoiceController.php';
require_once 'app/Controllers/UploadController.php';
require_once 'app/Exceptions/RouteNotFoundException.php';
require_once 'app/Exceptions/ViewNotFoundException.php';

session_start();

define('STORAGE_PATH', __DIR__ . '/storage');
define('VIEW_PATH', __DIR__ . '/views');

try {
    $router = new App\Router();

    $router->get('/', [App\Controllers\HomeController::class, 'index'])
        ->get('/invoices', [App\Controllers\InvoiceController::class, 'index'])
        ->get('/invoices/create', [App\Controllers\InvoiceController::class, 'create'])
        ->post('/invoices/create', [App\Controllers\InvoiceController::class, 'store'])
        ->get('/upload', [App\Controllers\UploadController::class, 'upload'])
        ->post('/upload', [App\Controllers\UploadController::class, 'loaded'])
        ->get('/download', [App\Controllers\UploadController::class, 'download']);

    echo $router->resolve(
        $_SERVER['REQUEST_URI'],
        strtolower($_SERVER['REQUEST_METHOD'])
    );
} catch(RouteNotFoundException $e) {
    // echo $e->getMessage();

    // header('HTTP/1.1 404 Not Found');
    http_response_code(404);
    echo \App\View::make('error/404');
}

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




