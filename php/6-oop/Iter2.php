<?php

class Iter2 implements \IteratorAggregate
{
    public $someField = 'something...';
    public $list = ['first', 'second', 'third'];

    public function getIterator(): Traversable
    {
        return new \ArrayIterator($this->list);
    }
}