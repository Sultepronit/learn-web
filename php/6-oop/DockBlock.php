<?php

/**
 * @property string $name
 * @property-read int $counter
 * @property-write float $nothing
 * @method static int fn(string $text)
 */
class DockBlock
{
    /** @var string */
    public $name;
    public $counter;

    /**
     * @param int $num
     * @param string $text
     * @param int[]|float[] $arr 
     * 
     * @throws RuntimeException
     * @throws InvalidArgumentException
     * 
     * @return bool
     */
    public function doSmth($num, $text, $arr)
    {
        # do somtething...
        return true;
    }

    public function processArray($arr)
    {
        /** @var string $item */
        foreach($arr as $item) {
            # do something
        }
    }
}