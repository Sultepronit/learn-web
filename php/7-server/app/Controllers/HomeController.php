<?php

declare(strict_types=1);
namespace App\Controllers;

use App\App;
use App\View;
use App\Models\User;
use App\Models\Invoice;
use App\Models\SignUp;

class HomeController
{
    public function index(): View
    {

        $email = 'john6@doe.com';
        $name = 'John Doe';
        $amount = 257;

        $userModel = new User();
        $invoiceModel = new Invoice();

        $invoiceId = (new SignUp($userModel, $invoiceModel))->register(
            [
                'email' => $email,
                'name' => $name
            ],
            [
                'amount' => $amount
            ]
        );

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

        return View::make(
            'index',
            ['invoice' => $invoiceModel->find($invoiceId)]
        );
    }
}
