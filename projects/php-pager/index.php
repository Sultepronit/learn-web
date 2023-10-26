<?php
declare(strict_types=1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");

if(isset($_GET['dic'])) {
    if($_GET['dic'] === 'glosbe') {
        $url = 'https://uk.glosbe.com/en/uk/' . $_GET['word'];
    } else if($_GET['dic'] === 'lingvo') {
        $url = 'https://www.lingvolive.com/en-us/translate/en-uk/' . $_GET['word'];
    }
    //echo $url;
    $pageContent = file_get_contents($url); 
    echo $pageContent;
} else {
    require_once 'index-2.html';
}
