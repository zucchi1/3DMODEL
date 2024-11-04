<?php
$servername = "db"; // Docker内のサービス名を指定
$username = "myuser";
$password = "mypassword";
$database = "mydatabase";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
