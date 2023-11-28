<?php
declare(strict_types=1);
namespace App\Controllers;

class UploadController
{
    public function load()
    {
        return <<<FORM
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="receipt" />
    <input type="file" name="myimage" />
    <button type="submit">Upload</button>
</form>
FORM;

    }

    public function loaded()
    {
        echo '<pre>';
        print_r($_FILES);
        print_r(pathinfo($_FILES['receipt']['tmp_name']));
        print_r(pathinfo($_FILES['myimage']['tmp_name']));
        echo '</pre>';

        $filePath = STORAGE_PATH . '/' . $_FILES['receipt']['name'];
        move_uploaded_file($_FILES['receipt']['tmp_name'], $filePath);

        echo '<pre>';
        print_r(pathinfo($filePath));
        echo '</pre>';
    }
}