<?php
declare(strict_types=1);

$url = 'https://dictionary.cambridge.org/dictionary/english-ukrainian/check';

$pageContent = file_get_contents($url);

echo $pageContent;