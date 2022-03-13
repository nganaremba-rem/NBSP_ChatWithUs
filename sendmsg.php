<?php
    include 'connect.php';
    // check table exist
    if(mysqli_num_rows(mysqli_query($con,"show tables like 'msg'"))==0){
        $create = mysqli_query($con, " create table `msg` (
            `username` varchar(100),
            `to` varchar(100),
            `msg` varchar(1000),
            primary key (`username`,`to`)
             )
        ");
    }
    // send msg

    if(isset($_POST['msg']) && $_POST['msg']!=''){
        $msg = $_POST['msg'];
        $user = $_POST['user'];
        $to = $_POST['to'];

        if($to == "Global Chat"){
            $fileName = "./chatMsg/globalChat.json";
        }else{

            $active_check = mysqli_query($con,"SELECT * from `user_records` where `User` IN ('$to','$user') AND `To` IN ('$user','$to')");
    
            $statusArray = mysqli_fetch_assoc($active_check);
            if($statusArray['Status'] != "Active"){
                mysqli_query($con,"UPDATE `user_records` SET `Status`='Active' where `User` IN ('$to','$user') AND `To` IN ('$user','$to')");
            }
            $fileName = "./chatMsg/".$user."".$to.".json";
            if(!file_exists($fileName)){
                $fileName = "./chatMsg/".$to."".$user.".json";
            }
        }
        $data['msg'] = $msg;
        $data['user'] = $user;
        $getPrevJsonContent = file_get_contents($fileName);

        $tempArray = json_decode($getPrevJsonContent);

        array_push($tempArray, $data);

        $jsonData = json_encode($tempArray);

        file_put_contents($fileName, $jsonData);

        exit($jsonData);
    }

?>