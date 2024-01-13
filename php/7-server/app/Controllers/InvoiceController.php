<?php

declare(strict_types=1);
namespace App\Controllers;

use \App\View;

class InvoiceController    
{
    // public function index(): string
    // {
    //     return 'Invoices';
    // }
    public function index(): View
    {
        return View::make('invoices/index');
    }

    /* public function create(): string
    {
        return '<form action="/invoices/create" method="post"><label>Text</label><input type="text" name="text"></input><form>';
    } */

    public function create(): View
    {
        return View::make('invoices/create');
    }


    public function store()
    {
        $text = $_POST['text'];
        echo $text, PHP_EOL;
    }
}
