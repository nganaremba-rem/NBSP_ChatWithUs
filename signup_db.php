<?php
    include 'connect.php';
    session_start();

    // check if table exist else create a new one

    if(mysqli_num_rows(mysqli_query($con,"show tables like 'user_details'"))==0){
        mysqli_query($con,'
            create table `user_details` (
                `Username` varchar(100),
                `Password` varchar(50),
                primary key (`Username`)
            )
        ');
    }

    // check if user_records table created or create a new one
    if(mysqli_num_rows(mysqli_query($con,"show tables like 'user_records'"))==0){
        mysqli_query($con,'
            create table `user_records` (
                `User` varchar(100),
                `To` varchar(100),
                `Status` varchar(10)
            )
        ');
    }

    // insertion
    if(isset($_POST['sbtn'])){
        $username = $_POST['username'];
        $password = $_POST['password'];
        if(mysqli_num_rows(mysqli_query($con,"select * from `user_details` where `Username`='$username'"))==0){
            mysqli_query($con,"
                insert into `user_details` values ('$username','$password');
            ");
            setcookie('Username',$username);
            header('Location:./homepage');
        }else{
            $_SESSION['msg']="Username already exist. Please try another.";
            header('Location: ./signup');
        }
    }else{
        echo "Please signup again.";
    }

?>