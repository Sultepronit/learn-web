<?php

class Iter1 implements \Iterator
{
    public $someField = 'something...';
    public $list = ['first', 'second', 'third'];

    public function current(): mixed
    {
        echo __METHOD__, PHP_EOL;
        return current($this->list);
    }

    public function next(): void
    {
        echo __METHOD__, PHP_EOL;
        next($this->list);
    }

    public function key()
    {
        echo __METHOD__, PHP_EOL;
        return key($this->list);
    }

    public function valid(): bool
    {
        echo __METHOD__, PHP_EOL;
        return current($this->list) !== false;
    }

    public function rewind(): void
    {
        echo __METHOD__, PHP_EOL;
        reset($this->list);
    }
}