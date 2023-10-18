<?php

class Promotion
{
    private string $str;
    private int $int;
    //private float $flo;

    public function __construct(
        int $int,
        //float $flo

        private float $flo, # now we cat do it like this
        # datatype is optional, accessibility is must
        private $def = 'default val'
    )
    {
        $this->str = 'constructor property promotion, since php 8';
        $this->int = $int;
        //$this->flo = $flo;

        echo $this->def, '<br>';
        echo $def, '<br>'; # and like that!
        //echo $str, '<br>'; # Warning: Undefined variable $str ...
    }
}