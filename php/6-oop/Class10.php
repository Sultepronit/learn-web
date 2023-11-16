<?php

class Class10
{
    public int $id = 11;
    public string $name = 'Anna';
    private int $pin = 1456;

    public function __sleep()
    {
        return ['id', 'name'];
        # only that fields will be serialized:
        # O:7:"Class10":2:{s:2:"id";i:11;s:4:"name";s:4:"Anna";}
    }

    public function __wakeup()
    {
        # do something after unserialization
    }

    # will be called instead of __sleep()!
    public function __serialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'pin' => base64_encode($this->pin),
            'something' => 'new'
        ];
        # O:7:"Class10":4:{s:2:"id";i:11;s:4:"name";s:4:"Anna";s:3:"pin";s:8:"MTQ1Ng==";s:9:"something";s:3:"new";}
    }

    public function __unserialize(array $data): void
    {
        print_r($data);
    }
}