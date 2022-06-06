<html>

<head>
    <title>Environment Variables</title>
</head>

<body>
    <h1 style="text-align: center;">Environment Variables</h1>
    <hr>

    <?php
    foreach ($_SERVER as $key_name => $key_value) {
        print $key_name . "=" . $key_value . "<br>";
    }
    ?>

</body>

</html>