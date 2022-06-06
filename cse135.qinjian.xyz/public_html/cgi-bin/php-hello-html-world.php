<html>
<head>
    <title>Hello PHP World</title>
</head>

<body>
    <h1 style="text-align: center;">Hello PHP World</h1>
    <hr>
    <?php
        echo "Hello World";
        echo "This page was generated with the PHP programming language";
        echo "This program was run at: " . date('Y-m-d', time()) . "<br>";
        echo "Your current IP address is " . $_SERVER['REMOTE_ADDR'] . "<br>";
    ?>


</body>
</html>