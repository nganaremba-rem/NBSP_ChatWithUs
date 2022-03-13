<?php
    include 'connect.php';
    $username = $_COOKIE['Username'];
    $search = $_POST['search'];
    if($search!=''){
        
        $query = mysqli_query($con,"
        select `Username` from `user_details` where NOT Username='$username' and Username like '%$search%'
          ");
        $fetchAll = mysqli_fetch_all($query,MYSQLI_ASSOC);
        exit(json_encode($fetchAll));
    }else{
        $empty = array("Username" => "No Result");
        exit(json_encode($empty));
    }
?>