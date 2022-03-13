<?php
    session_start();
    include 'connect.php';
    if(isset($_COOKIE['Username'])){
        $username = $_COOKIE['Username'];
    }else{
        $_SESSION['msg'] = 'Please login again';
        header('Location: login');
    }
?>

<!DOCTYPE html>
<html lang="en" id='overwrite'>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="./icon/icon.jpg" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatWithUs</title>
    <script defer src="search.js?version='<?php echo uniqid(); ?>'"></script>
    <link id='homecss' rel="stylesheet" href="homepage.css?version='<?php echo uniqid(); ?>'">
    <link rel="stylesheet" href="style.css?version='<?php echo uniqid(); ?>'" id="css" />
    <script src="https://kit.fontawesome.com/28d0d779f8.js" crossorigin="anonymous"></script>
    <script defer src="script.js" id="js"></script>
    <script id='fetchjs' defer src="fetchMsg.js?version='<?php echo uniqid(); ?>'"></script>

    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js" integrity="sha512-H6cPm97FAsgIKmlBA4s774vqoN24V5gSQL4yBTDOY2su2DeXZVhQPxFK4P6GPdnZqM9fg1G3cMv5wD7e6cFLZQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>

<body onload="fetchMainPage()">
<div class="intro">
        <h1><span class='introtext'>Welcome to</span></h1>
        <h1><span class='introtext'>Chat<span style="color: red" class="introtext">WithUs</span></span></h1>
    </div>
    <div class="container">
    
        <div class="chat-box">
            <div class="chat-header">
                <div class="back-btn" onclick="back()">
                    <button><i class="fas fa-arrow-circle-left"></i></button>
                </div>
                <div class="chat-name" id="chatname"></div>
                <div class="fullscreen">
                    <button id="fsbtn" onclick="openFullscreen()">
                        <i class="fas fa-expand-alt"></i>
                    </button>
                </div>
            </div>
            <div class="chat-area"></div>
            <div class="chat-input-area">
                <div class="chat-wrap">
                    <button class="emoji"><i class="far fa-grin-beam"></i></button>
                  <!--  <textarea rows='1' id="chat" name="chat" placeholder="Message" autocomplete="off"></textarea> -->
                     <input type="text" id="chat" name="chat" placeholder="Message" autocomplete="off" /> 
                    <button class="send"><i class="far fa-paper-plane"></i></button>
                </div>
            </div>
        </div>

    </div>

    <div class="homepage" id="homepage">
        <div class="heading">
            <div class="brand">
                <header><span class='header-firstWord'>Chat</span>WithUs</header>   
                <div class="user-title" id="userID"><?php  echo $username; ?></div>
            </div>
            <a href="logout.php">
                <div class="logout">Logout
                </div>
            </a>
        </div>
        <div class="search-area">
            <div class="search-icon">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <input type="search" name="search" id="search" autocomplete="off" placeholder="Search your friends...">

        </div>
        <div class="main-chat-list">
            <div class="chat-item-wrap" id="Global Chat" onclick='openChat(this.id)'>
                <div class="prof-icon"><img src="./icon/global.jpg" alt=""></div>
                <div class="chat-details">
                    <div class="chatname">Global Chat</div>
                    <div class="last-chat">Last Chat</div>
                </div>
            </div>
            <div class="display" id="displaySearch"></div>
        </div>
    </div>


        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js" integrity="sha512-H6cPm97FAsgIKmlBA4s774vqoN24V5gSQL4yBTDOY2su2DeXZVhQPxFK4P6GPdnZqM9fg1G3cMv5wD7e6cFLZQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

</body>

</html>