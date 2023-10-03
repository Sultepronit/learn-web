<?php

require 'strict.php';

echo sum(5, 10);
echo '<br>';
# no strict mode in this file:
echo sum('5', 10);