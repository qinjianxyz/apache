<html>

<head>
    <title>GET Request Echo</title>
</head>

<body>
    <h1 style="text-align: center;">GET Request Echo</h1>
    <hr>
<?php
    echo "<b>Query String:</b>: " . $_SERVER["QUERY_STRING"] . "<br>";
    if (!empty($_SERVER["QUERY_STRING"])) {
        $pairs = explode("&", $_SERVER["QUERY_STRING"]);
        foreach ($pairs as $index => $value) {
            $pair = explode("=", $value);
            print $pair[0] . "=" . $pair[1] . "<br>";
        }
    }

?>


</body>

</html>