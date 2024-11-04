<?php
$servername = "db";
$username = "myuser";
$password = "mypassword";
$database = "mydatabase";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// usersテーブルの作成
$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
)";

if ($conn->query($sql) === TRUE) {
    echo "Table users created successfully.\n";
} else {
    echo "Error creating table: " . $conn->error . "\n";
}

// 初期ユーザーの追加
$username = 'name';
$password = 'pass'; // パスワードをハッシュ化

$sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "Initial user created successfully.\n";
} else {
    echo "Error inserting initial user: " . $conn->error . "\n";
}

$conn->close();
?>
