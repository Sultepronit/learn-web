<?php

class Class5
{
    public function __toString()
    {
        return '__toString()!' . PHP_EOL;
    }

    public function __invoke()
    {
        echo 'invoked!', PHP_EOL;
    }

    private int $id = 77;
    private string $codeName = '0101cherry';
    private float $quantity = 77.85;

    public function __debugInfo()
    {
        return [
            'id' => $this->id,
            'codeName' => '****' . substr($this->codeName, 4)
        ];
    }
}