<?php
declare(strict_types=1);
# autoloader

//require_once 'app/Level1/Level2/Class1.php';
# more proper way:
//require_once __DIR__ . '/app/Level1/Level2/Class1.php';

# but we'll do things more clean way:
spl_autoload_register(function($class) {
    $path = __DIR__ . '/'
        . str_replace('\\', '/', lcfirst($class)) . '.php';
    if(file_exists($path)) {
        require $path;
    }
});

use App\Level1\Level2\Class1;

$class11 = new Class1();
var_dump($class11); # object(App\Level1\Level2\Class1)#2 (0) { }
echo '<br>';

############################################################
# *we installed the composer on pc
#cli: composer require ramsey/uuid

require __DIR__ . '/vendor/autoload.php';
$id = new \Ramsey\Uuid\UuidFactory();
echo $id->uuid4(); # *287351da-088d-4ae6-aab6-6e071664d417
echo '<br>';

# and here we'll use external autoloader for our classes:
/*
* added to composer.json:
"autoload": {
    "psr-4": {
        "App\\": "app/"
    }
}
#cli: composer dump-autoload
*/

use App\Level1\Level2B\Class2;
$class21 = new Class2();
var_dump($class11);
echo '<br>';

# to preload all the needed classes and work faster:
#cli: composer dump-autoload -o
#> Generated optimized autoload files containing 160 classes
# It should be done for every new class of course