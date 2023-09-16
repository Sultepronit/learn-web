<?php
    $greet = "Hello World!";
    # data types
    $int = 55; #integer
    $doub = 13.3; #double
    $boo = true; #boolean?
    $arr = array('a', 'b', 'c'); #array
    #objects...

    # constants 
    define('DAYS_IN_YEAR', 365);

    $first = 'Anna';
    $second = 'Yamada';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Basics!</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php echo "<h1>{$greet}</h1>" ?>
    <p>
        <?php echo $arr[2] ?>
    </p>
    <p><?php echo DAYS_IN_YEAR ?></p>
    <p><?php echo $first . ' ' . $second ?></p>
    <?php
        $abc = 'abc';
        $abc .= 'd';
        echo "<p>{$abc}</p>";

        echo "<p>top" . nl2br("\n") . "bottom</p>";

        echo "<p>{DAYS_IN_YEAR + 1}</p>";
        echo "<p>" . DAYS_IN_YEAR + 1 . "</p>";
        echo "<p>" . DAYS_IN_YEAR - 300 . "</p>";
        echo "<p>" . DAYS_IN_YEAR * 2 . "</p>";
        echo "<p>" . DAYS_IN_YEAR / 2 . "</p>";
        echo "<p>" . DAYS_IN_YEAR % 2 . "</p>";

        $num2 = 1000;
        $num2 += 100;
        echo "<p>{$num2}</p>";
        $num2 /= 100;
        echo "<p>{$num2}</p>";
        $num2 %= 3;
        echo "<p>{$num2}</p>";
        $num2++;
        echo "<p>{$num2}</p>";

        $style = "highlight";
    ?>

    <p <?php if($style === "highlight"): ?>class="highlight"<?php endif ?>>
        Some text
    </p>
    
</body>
</html>