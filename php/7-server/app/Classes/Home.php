<?php

declare(strict_types=1);
namespace App\Classes;

class Home
{
    public function index(): string
    {
        //return 'Home!';

        return '<form action="/?status=success" method="post"><label>Text</label><input type="text" name="amout"></input><form>';
    }
}
