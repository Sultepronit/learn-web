<?php
namespace App;

class Class3
{
    private string $priv1;

    public function __construct(int $priv1)
    {
        $this->priv1 = 'Privare field #' . $priv1;
    }
}