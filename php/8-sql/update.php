<?php
declare (strict_types=1);

function update($table, $id, $changes, ) {
    echo $table, '<br>';
    echo $id, '<br>';
    // print_r($changes);
    // echo '<br>';
    $changesString = '';
    foreach($changes as $key => $value) {
        $changesString .= "{$key} = '{$value}', ";
    }
    // echo $changesString, '<br>';
    $changesString = substr($changesString, 0, -2);
    echo $changesString, '<br>';

    $query = "UPDATE {$table} SET {$changesString} WHERE id = {$id}";

    try {
        $db = new PDO('mysql:host=localhost;dbname=php_db', 'root', 'password');
        echo $db->exec($query);
        echo '<br>success!<br>';
    } catch (\PDOException $e) {
        # to hide sensitive info
        throw new \PDOException($e->getMessage(), (int)$e->getCode());
        // echo '<pre>';
        // print_r($e);
    }

}

