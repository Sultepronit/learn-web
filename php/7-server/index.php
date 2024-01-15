<?php
declare(strict_types=1);

require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

use App\Router;
use App\App;
use App\Controllers;
use App\Config;

session_start();

define('STORAGE_PATH', __DIR__ . '/storage');
define('VIEW_PATH', __DIR__ . '/views');

$router = new Router();

$router
    ->get('/', [Controllers\HomeController::class, 'index'])
    ->get('/invoices', [Controllers\InvoiceController::class, 'index'])
    ->get('/invoices/create', [Controllers\InvoiceController::class, 'create'])
    ->post('/invoices/create', [Controllers\InvoiceController::class, 'store'])
    ->get('/upload', [Controllers\UploadController::class, 'upload'])
    ->post('/upload', [Controllers\UploadController::class, 'loaded'])
    ->get('/download', [Controllers\UploadController::class, 'download']);

(new App(
    $router,
    ['uri' => $_SERVER['REQUEST_URI'], 'method' => $_SERVER['REQUEST_METHOD']],
    new Config($_ENV)
    // [
    //     'host' => $_ENV['DB_HOST'],
    //     'user' => $_ENV['DB_USER'],
    //     'pass' => $_ENV['DB_PASS'],
    //     'database' => $_ENV['DB_DATABASE'],
    //     'driver' => $_ENV['DB_DRIVER'] ?? 'mysql'
    // ]
))->run();

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






