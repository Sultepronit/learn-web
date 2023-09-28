<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello PHP!</title>
</head>
<body>
    <?php echo 'Long way' ?>
    <br>
    <?= 'Short way' ?>

    <?php $number = 10 ?>
    <?php if ($number >= 1000): ?>
        <p>1000+</p>
    <?php elseif($number >= 100): ?>
        <p>100+</p>
    <?php else: ?>
        <p>less than 100!</p>
    <?php endif ?>

</body>
</html>