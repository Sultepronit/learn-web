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

    # proper way, by the chat:
    // $columns = array_keys($changes);
    // $values = array_values($changes);

    // $setClause = implode(' = ?, ', $columns) . ' = ?'; // 'column1 = ?, column2 = ?, ...'

    // $query = "UPDATE {$table} SET {$setClause} WHERE id = ?";
    // $values[] = $id; // Add $id to the values array

    // $stmt = $pdo->prepare($query);
    // $stmt->execute($values);

}

