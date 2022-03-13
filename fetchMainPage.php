<?php
    include 'connect.php';

    // $user = $_POST['user'];
    $user = $_POST['user'];

    $result = mysqli_query($con,"SELECT * FROM `user_records` WHERE (`User` in ('$user') or `To` in ('$user')) and `Status`='Active'");
    
    $res = mysqli_fetch_all($result,MYSQLI_ASSOC);
    
    $json = json_encode($res);

    exit($json);


?>