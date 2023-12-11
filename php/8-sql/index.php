<?php
declare(strict_types=1);

echo 'Lets SQL! <br>';

// $db = new PDO('mysql:host=localhost;dmname=php_db', 'root', 'password');
# may show sensitive information!

# default PDO::FETCH_BOTH gets row an array with both types indexes for all the fields
# PDO::FETCH_OBJ gets row as an object

try {
    $db = new PDO('mysql:host=localhost;dbname=php_db', 'root', 'password', [
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
    ]);
    $query = 'SELECT * FROM users WHERE id = 2';
    $stmt = $db->query($query);
    // $allTheData = $stmt->fetchAll(PDO::FETCH_OBJ);
    $allTheData = $stmt->fetchAll();
    echo '<pre>';
    print_r($allTheData);
    echo '</pre>';

    $query = 'SELECT * FROM users WHERE email LIKE ?';
    $stmt = $db->prepare($query);
    $stmt->execute(['Jo%']);
    $allTheData = $stmt->fetchAll();
    echo '<pre>';
    print_r($allTheData);
    echo '</pre>';
    
} catch(\PDOException $e) {
    # to hide sensitive info
    // throw new \PDOException($e->getMessage(), $e->getCode());
    # to understand what's happening
    print_r($e);
}

require_once 'create.php';
// create();
// create2();