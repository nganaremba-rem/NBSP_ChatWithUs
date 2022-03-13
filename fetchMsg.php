<?php
    include 'connect.php';
    
    if(isset($_POST['user']) && isset($_POST['to'])){
        $user = $_POST['user'];
        $to = $_POST['to'];
        
         $sql =  "SELECT * FROM `user_records` WHERE `User` in ('$user','$to') and `To` in ('$user','$to')";
         $query = mysqli_query($con,$sql);
         if(mysqli_num_rows($query)==0){
            $ok =  mysqli_query($con,"INSERT INTO `user_records` VALUES ('$user','$to','')");
            $fileName = "./chatMsg/".$user.''.$to.'.json';
            $fp = fopen("$fileName",'a');
            $fwrite = fwrite($fp,'[]');
            fclose($fp);

            
            if(!file_exists($fileName)){
                $fileName = $row['To'].''.$row['User'].'.json';
            }
            $getMsg = file_get_contents($fileName);
            $decode = json_decode($getMsg);
            exit(json_encode($decode));
         }
         else{
            $row = mysqli_fetch_assoc($query);
            $fileName = "./chatMsg/".$row['User'].''.$row['To'].'.json';
            if(!file_exists($fileName)){
                $fileName = $row['To'].''.$row['User'].'.json';
            }
            $getMsg = file_get_contents($fileName);
            $decode = json_decode($getMsg);
            exit(json_encode($decode));
         }
    }
    else{
        $fileName = './chatMsg/globalChat.json';
        $getMsg = file_get_contents($fileName);
        $decode = json_decode($getMsg);
        exit(json_encode($decode));
    }
?>