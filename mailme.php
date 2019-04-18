<?php
if(isset($_POST['submit'])){
    
    $to = 'info@appsdesignstudio.com'; // this is your Email address
    
    if(isset($_POST['email'])){
        $from = $_POST['email']; // this is the sender's Email address
    }

    if(isset($_POST['name'])){
        $name = $_POST['name'];
    }

    if(isset($_POST['subject'])){
        $subject = $_POST['subject'];
    }

    if(isset($_POST['g-recaptcha-response'])){
        $captcha=$_POST['g-recaptcha-response'];
    }

    if(!$captcha){
        echo '<h2>Please check the the captcha form.</h2>';
         exit;
    }
    $secretKey = "6Lfu454UAAAAANcKXiiIKOYsxs4cr3Zu1LtGJKE8";

    $url = 'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($secretKey) .  '&response=' . urlencode($captcha);
    $response = file_get_contents($url);
    $responseKeys = json_decode($response,true);
    // should return JSON with success as true
    if($responseKeys["success"]) {
        $message = $name . ' wrote the following:' . '\n\n' . $_POST['message'];
        $headers = 'From:' . $from;
        if(mail($to,$subject,$message,$headers)){
            echo 'E-mail message sent!';
        } else {
            echo 'E-mail delivery failure!';
        }
    } else {
            echo '<h2>You are spammer ! Get the @$%K out</h2>';
    }

} else {
    echo 'Error';
}
?>
