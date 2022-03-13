<?php
    session_start();
    session_destroy();
    setcookie('Username','',time()-(60*60*24*10));
    header("Location: login.php");
?>