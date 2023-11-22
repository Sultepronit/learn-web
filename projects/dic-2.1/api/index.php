<?php
declare(strict_types=1);

/* header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *"); */

if(isset($_GET['dic'])) {
    $word = explode('word=', $_SERVER['QUERY_STRING'])[1];
    if($_GET['dic'] === 'glosbe') {
        $url = 'https://uk.glosbe.com/en/uk/' . $word;
    } else if($_GET['dic'] === 'lingvo') {
        $url = 'https://www.lingvolive.com/en-us/translate/en-uk/' . $word;
    } else if($_GET['dic'] === 'cambridge') {
        $url = 'https://dictionary.cambridge.org/dictionary/english-ukrainian/' . $word;
    }
    //echo $url;
    $pageContent = file_get_contents($url); 
    echo $pageContent;

    /* $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    //curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    $pageContent = curl_exec($curl);
    echo $pageContent;
    curl_close($curl); */
} else {
    echo 'Nothing here!';
}
