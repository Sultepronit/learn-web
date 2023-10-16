<?php

declare(strict_types=1);

class Transaction {
    public $amount;
    public $description;
    private $priv;
    public string $str;
    public float $flo = 17;
    public int $constructed;

    public function __construct(int $constructed)
    {
        $this->constructed = $constructed;
    }
}