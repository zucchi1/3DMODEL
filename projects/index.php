<?php
session_start();

if (isset($_SESSION['user_id'])) {
    header('Location: http://localhost:3000');
    exit();
}
 else {
    // ログインしていない場合
    include 'backend/controllers/login.php';
}
?>
