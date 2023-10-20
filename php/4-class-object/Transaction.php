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
        $this->priv = 'private filed!';
    }

    public function increment()
    {
        $this->constructed++;
        echo $this->constructed, '<br>';
    }

    public function getPriv()
    {
        return $this->priv;
    }

    # method chaining
    public function printPriv()
    {
        echo $this->priv, '<br>';
        return $this;
    }

    public function printFlo()
    {
        echo $this->flo, '<br>';
        return $this;
    }

    public function __destruct()
    {
        echo 'Destruct unneeded ', $this->description, '<br>';
        // exit; # can abort other parts of app, including other destructors!!!
    }
}