<html>

<head>
    <title>PHP Sessions</title>
</head>

<body>
    <h1 style="text-align: center;">PHP Session 2</h1>
    <hr>

    <?php
    if (isset($_POST["username"])) {
        $name = $_POST["username"];
        echo "<b>Name:</b>: " . $name . "<br>";
    } else {
        echo "<b>Name:</b>: Name Not Set<br>";
    }
    ?>

    <br>
    <form action="/cgi-bin/php-sessions-1.php" method="Post" id="form">
        <label>
            <?php
            $name = $_POST["username"];
            echo "<input type=\"hidden\" name=\"username\" value=\"$name\">";
            ?>
        </label>
        <br>
        <input type="submit" value="Go to Session 1">
    </form>

    <a href="/cgi-bin/python-destroy-session.py">Destroy Session</a>

</body>

</html>