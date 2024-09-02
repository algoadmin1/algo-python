<!-- 
  < ?php 
session_start();
if (!isset($_SESSION["user"])) {
   header("Location: login.php");
}else{
    // there should be isset here... !!!!   FIX !!!!
    $email1=$_SESSION["user"];
    $userId=$_SESSION["userId"];
    // echo "<br />Logged in as: $email1";
 }
?> 
-->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="shortcut icon" type="image/png"  href="favicon.ico" />

    <title>Videos</title>

    <!-- custom css stylesheet -->
    <link rel="stylesheet" href="css/styletry.css">





</head>
<body>
<h3 class="heading">Fighting FasterClass</h3>

<div class="container">
        <!-- <div style="text-align: center;">
                <div class="logo1">
                <img src="logo256x144.jpg" alt="Logo">
                </div>
            </div> -->

        <div class="main-video">
            <div class="video">
                <video src="img/vid01-01.mp4" controls muted autoplay></video>
                <h3 class="title">Level 01a The Jab</h3>
            </div>
        </div>

        <div class="video-list">
            <div class="vid active">
                <video src="img/vid01-01.mp4" muted ></video>
                <h3 class="title">Level 01-1 The Jab</h3>
            </div>
            <div class="vid">
                <video src="img/vid01-02.mp4" muted ></video>
                <h3 class="title">Level 01-2 The Jab</h3>
            </div>
            <div class="vid">
                <video src="img/vid01-03.mp4" muted ></video>
                <h3 class="title">Level 01-3 The Jab</h3>
            </div>
            <div class="vid">
                <video src="img/vid01-04.mp4" muted ></video>
                <h3 class="title">Level 01-4 The Jab</h3>
            </div>
            <div class="vid">
                <video src="img/vid01-05.mp4" muted ></video>
                <h3 class="title">Level 01-5 The Jab</h3>
            </div>
            <div class="vid">
                <video src="img/vid01-06.mp4" muted ></video>
                <h3 class="title">Level 01-6 The Jab</h3>
            </div>
        </div>
     

        
<!-- conta1ner -->
</div>

<script> 
let listVideo = document.querySelectorAll('.video-list .vid');
let mainVideo = document.querySelector('.main-video video');
let mainVideo = document.querySelector('.main-video .title');

listVideo.forEach( video =>{
    video.onclick = () =>{
        listVideo.forEach(vid => vid.classList.remove('active'));
        video.classList.add('active');
        if(video.classList.contains('active')){
            let src= video.children[0].getAttribute('src');
            mainVideo.src = src;
        };
    };
});

</script>
</body>
</html>