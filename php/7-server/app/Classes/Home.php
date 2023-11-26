<?php

declare(strict_types=1);
namespace App\Classes;

class Home
{
    public function index(): string
    {
        //return 'Home!';

        $_SESSION['count'] = ($_SESSION['count'] ?? 0) + 1;
        if($_SESSION['count'] > 3) unset($_SESSION['count']);

        setcookie(
            'myCookie', 
            'myValue', 
            time() + 10 # experie in 10 seconds
            // '/',
            // '',
            // false,
            // false
        );

        return '<form action="/?status=success" method="post"><label>Text</label><input type="text" name="amout"></input><form>';
    }
}
