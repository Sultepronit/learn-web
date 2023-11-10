<?php

class ClassA
{
    protected static string $name = 'A';

    public static function printName()
    {
        echo 'self::class: ', self::class, PHP_EOL;
        echo 'self::$name: ', self::$name, PHP_EOL;

        # old school method to use the called class:
        echo 'get_called_class(): ',  get_called_class(), PHP_EOL;
        # the late static binding inself:
        echo 'static::$name: ', static::$name, PHP_EOL;
    }

    public static function multyply()
    {
        return new static();
    }
}