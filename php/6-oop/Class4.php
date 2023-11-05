<?php

class Class4
{
    /* private static function printArgs($arg1, $arg2) {
        echo $arg1, $arg2, PHP_EOL;
    } */
    private function printArgs($arg1, $arg2) {
        echo "$arg1, $arg2", PHP_EOL;
    }

    public function __call($name, $arguments)
    {
        //echo "try to call {$name}({$arguments[0]}...)", PHP_EOL;
        if(method_exists($this, $name)) {
            call_user_func_array([$this, $name], $arguments);
        }
    }

    public static function __callStatic($name, $arguments)
    {
        echo "try to call static {$name}({$arguments[0]}...)", PHP_EOL;
        /* if(method_exists(self, $name)) {
            call_user_func_array([self, $name], $arguments);
        } */
    }
}