<?php
$pdo = new PDO('sqlite:' . __DIR__ . '/db.sqlite');
// $pdo->exec("
//     CREATE TABLE test (
//         a integer,
//         b integee,
//         c integer
//     );
// ");

$query = "
    INSERT INTO test (a, b, c) VALUES
    (1, 2, 4);
";
$pdo->exec($query);

$thedb = $pdo->query('SELECT * FROM test')->fetchAll(PDO::FETCH_ASSOC);

echo '<pre>';
print_r($thedb);