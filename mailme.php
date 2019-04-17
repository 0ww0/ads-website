<?php
if(isset($_POST['submit'])){
    $to = 'eden@appsdesignstudio.com'; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $name = $_POST['name'];
    $subject = $_POST['subject'];
    $message = $name . ' wrote the following:' . '\n\n' . $_POST['message'];
    $headers = 'From:' . $from;
    if(mail($to,$subject,$message,$headers)){
        echo 'E-mail message sent!';
    } else {
        echo 'E-mail delivery failure!';
    }
} else {
    echo 'Error';
}
?>
