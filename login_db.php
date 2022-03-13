<?php
    session_start();
    include 'connect.php';

    if(isset($_POST['loginbtn'])){
        $username = $_POST['username'];
        $password = $_POST['password'];
        if(mysqli_num_rows(mysqli_query($con,"
            select * from `user_details` where Username= binary '$username'
        "))==0){
            $_SESSION['msg']="Username doesn't exist";
            header('Location: ./login');
        }else{
            if(mysqli_num_rows(mysqli_query($con,"
                select * from `user_details` where Username = binary '$username' and Password = binary '$password'
            "))==0){
                $_SESSION['msg']="Wrong Username or Password. (Note: Username and Password are case sensitive)";
                header('Location: ./login');
            }else{
                setcookie('Username',$username);
                header('Location:./homepage');
            }
        }
    }else{
        echo 'Please login again';
    }
?>