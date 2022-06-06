<html>

<head>
    <title>General Echo Request</title>
</head>

<body>
    <h1 style="text-align: center;">General Echo Request</h1>
    <hr>

    <?php
    $protocol = $_SERVER["SERVER_PROTOCOL"];
    $method = $_SERVER["REQUEST_METHOD"];

    echo "Protocol: " . $protocol . "<br>";
    echo "Method: " . $method . "<br>";
    echo "<b>Message Body: </b>";
    print_r($_POST);
    ?>


</body>

</html>