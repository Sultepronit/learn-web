<?php
declare(strict_types=1);

/* echo '<pre>';
print_r($_SERVER);
echo '</pre>'; */

require_once 'app/Router.php';
require_once 'app/Exceptions/RouteNotFoundException.php';
require_once 'app/Classes/Home.php';
require_once 'app/Classes/Invoice.php';

$router = new App\Router();

/* $router->register('/', function() {
    return 'Home';
}); */

$router->register('/invoices', function() {
    return 'Invoices';
});

$router->register('/', [App\Classes\Home::class, 'index'])
    ->register('/invoices', [App\Classes\Invoice::class, 'index'])
    ->register('/invoices/create', [App\Classes\Invoice::class, 'create']);

echo $router->resolve($_SERVER['REQUEST_URI']);