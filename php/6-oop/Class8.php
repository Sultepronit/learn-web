<?php

class Class8
{
    private static int $counter = 1;
    public int $id;

    private function generateId()
    {
        $this->id = self::$counter++;
    }

    public function __construct()
    {
        $this->generateId();
    }

    public function __clone()
    {
        $this->generateId();
    }
}