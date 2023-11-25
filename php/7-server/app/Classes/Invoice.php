<?php

declare(strict_types=1);
namespace App\Classes;

class Invoice       
{
    public function index(): string
    {
        return 'Invoices';
    }

    public function create(): string
    {
        // return 'Create Invoice';
        return '<form action="/invoices/create" method="post"><label>Text</label><input type="text" name="text"></input><form>';
    }

    public function store()
    {
        $text = $_POST['text'];
        echo $text, PHP_EOL;
    }
}
