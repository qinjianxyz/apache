<?php header('Content-type:text/json');

$t = time();
$ip   = $_SERVER['REMOTE_ADDR'];

$array = [
    "title" => "Hello, PHP!",
    "heading" => "Hello Python!",
    "message" => "This page was generated with the PHP programming language",
    "time" => $t,
    "IP" => $ip
];

echo json_encode($array) . "\n";

?>