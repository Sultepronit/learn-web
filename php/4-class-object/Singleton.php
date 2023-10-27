<?php

class Singleton 
{
    private static ?Singleton $instance = null;

    private function __construct(public $param)
    {
        # something
    }

    public static function getInstance($param): Singleton
    {
        if(self::$instance === null) {
            self::$instance = new Singleton($param);
        }

        return self::$instance;
    }
}