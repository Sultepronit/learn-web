<?php
declare(strict_types=1);

/* $url = 'https://translate.google.com/details?hl=uk&sl=en&tl=uk&text=apple%0A&op=translate';

//$url = 'https://www.google.com/search?q=green+cat';

$url = 'https://uk.glosbe.com/en/uk/apple';

//$url = 'https://www.lingvolive.com/en-us/translate/en-uk/apple';

$pageContent = file_get_contents($url); */

//echo $pageContent;

/* $curl = curl_init($url);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
//curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);

$pageContent = curl_exec($curl);

echo $pageContent;

curl_close($curl); */

//$urlq = isset($_GET['url']) ? $_GET['url'] : '---';
//echo $_GET['url'];
/* echo '<br>';
print_r($_GET);
echo '<br>';
echo $_GET['dic'];
echo '<br>';
echo $_GET['word'];
echo '<br>'; */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

/* if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$ret = [
    'result' => 'OK',
];
print json_encode($ret); */

if($_GET['dic'] === 'glosbe') {
    $url = 'https://uk.glosbe.com/en/uk/' . $_GET['word'];
} else if($_GET['dic'] === 'lingvo') {
    $url = 'https://www.lingvolive.com/en-us/translate/en-uk/' . $_GET['word'];
}
//echo $url;
$pageContent = file_get_contents($url); 
echo $pageContent;



$script = <<<TEXT
<script>
console.log('Hello from php!');
</script>
TEXT;

echo $script;

