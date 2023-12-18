<?php
declare(strict_types=1);
function create() {
    try {
        $db = new PDO('mysql:host=localhost;dbname=php_db', 'root', 'password', []);
        
        $email = 'new@one.com';
        $name = 'Anna Yamada';
        $isActive = 1;
        $createdAt = date('Y-m-d h:i:s', strtotime('08/11/2023 10:00PM'));

        # placeholders
        $query = 'INSERT INTO users (email, full_name, is_active, created_at)
                    VALUES (?, ?, ?, ?)';
        // echo '<pre>', $query;
        $stmt = $db->prepare($query);
        $stmt->execute([$email, $name, $isActive, $createdAt]);
        # or use:
        # $stmt->bindValue(1, $email);
        # $stmt->bindValue(2, $name);
        # ...
        # $stmt->execute();

        $id = (int) $db->lastInsertId();
        $newUser = $db->query("SELECT * FROM users WHERE id = {$id}")->fetch();

        echo '<pre>';
        print_r($newUser);
        echo '</pre>';
    } catch(\PDOException $e) {
         # to hide sensitive info
        // throw new \PDOException($e->getMessage(), $e->getCode());
        # to understand what's happening
        echo '<pre>';
        print_r($e);
        echo '</pre>';
    }
}

function create2() {
    try {
        $db = new PDO('mysql:host=localhost;dbname=php_db', 'root', 'password', []);
        
        $email = 'new@three.com';
        $name = 'Anna Yoshida';
        $isActive = 1;
        $createdAt = date('Y-m-d h:i:s', strtotime('08/12/2023 10:00PM'));

        # named parameters
        $query = 'INSERT INTO users (email, full_name, is_active, created_at)
                    VALUES (:email, :name, :active, :date)';
        // echo '<pre>', $query;
        $stmt = $db->prepare($query);

        // $stmt->execute([
        //     'name' => $name,
        //     'email' => $email,
        //     'active' => $isActive,
        //     'date' => $createdAt
        // ]);

        # : are optional, but recomended
        $stmt->bindValue('name', $name, /* PDO::PARAM_STR */);
        $stmt->bindParam(':email', $email);
        $stmt->bindValue(':active', $isActive, PDO::PARAM_BOOL);
        $stmt->bindValue(':date', $createdAt);
        # bindParam: if we change $email variable before the execute, it will change
        $stmt->execute();

        $id = (int) $db->lastInsertId();
        $newUser = $db->query("SELECT * FROM users WHERE id = {$id}")->fetch();

        echo '<pre>';
        print_r($newUser);
        echo '</pre>';
    } catch(\PDOException $e) {
         # to hide sensitive info
        // throw new \PDOException($e->getMessage(), $e->getCode());
        # to understand what's happening
        echo '<pre>';
        print_r($e);
        echo '</pre>';
    }
}

function create3() {
    try {
        $db = new PDO('mysql:host=localhost;dbname=php_db', 'root', 'password');
    } catch(\PDOException $e) {
        # to hide sensitive info
        throw new \PDOException($e->getMessage(), $e->getCode());
        # to understand what's happening
        // echo '<pre>';
        // print_r($e);
        // echo '</pre>';
    }

    $email = 'john3@doe.com';
    $name = 'John Doe';
    $amount = 25;

    try{
        $db->beginTransaction();

        $newUserStmt = $db->prepare(
            'INSERT INTO users (email, full_name, is_active, created_at)
            VALUES (?, ?, 1, NOW())'
        );
    
        $newInvoiceStmt = $db->prepare(
            'INSERT INTO invoices (amount, user_id)
            VALUES (?, ?)'
        );
    
        $newUserStmt->execute([$email, $name]);
    
        $userId = (int)$db->lastInsertId();
        // var_dump($userId);

        // throw new \Exception('test');
        $newInvoiceStmt->execute([$amount, $userId]);

        $db->commit();
    } catch(\Throwable $e) {
        if($db->inTransaction()) {
            $db->rollBack();
        }
        print_r($e);
    }

    $fetchStmt = $db->prepare(
        'SELECT invoices.id AS invoice_id, amount, user_id, full_name
        FROM invoices
        INNER JOIN users ON user_id = users.id
        WHERE email = ?'
    );

    $fetchStmt->execute([$email]);

    echo '<pre>';
    var_dump($fetchStmt->fetch(PDO::FETCH_ASSOC));
    echo '</pre>';
}