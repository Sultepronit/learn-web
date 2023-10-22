<?php
declare(strict_types=1);

class Constants
{
    public const CONST_ONE = 'This is constant!';
    private const PRIVATE_CONST = 'This is private territory!';

    public function printPrivate()
    {
        echo Constants::PRIVATE_CONST, '<br>';
        echo self::PRIVATE_CONST, '<br>';
    }
}