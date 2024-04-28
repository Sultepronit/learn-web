<?php
declare(strict_types=1);
namespace Tests\DataProviders;

class RouterDataProvider
{
    public function routeNotFoundCases(): array
    { # this will procude 4 tests
        return [
            ['/users', 'put'],
            ['/invoices', 'post'],
            ['/users', 'get'],
            ['/users', 'post']
        ];
    }
}