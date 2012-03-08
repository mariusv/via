<?php
/*
Credits: Bit Repository
URL: http://www.bitrepository.com/
*/

include '../config.php';

error_reporting (E_ALL ^ E_NOTICE);

$post = (!empty($_POST)) ? true : false;

if($post)
{
include 'functions.php';

$name = stripslashes($_POST['name']);
$email = trim($_POST['email']);
$message = stripslashes($_POST['message']);


$error = '';

// Check name

if(!$name)
{
$error .= '<div class="name_border"></div>';
}

// Check email

if(!$email)
{
$error .= '<div class="email_border"></div>';
}

if($email && !ValidateEmail($email))
{
$error .= '<div class="email_border"></div>';
}

// Check message (length)

if(!$message || strlen($message) < 15)
{
$error .= '<div class="message_border"></div>';
}


if(!$error)
{
$mail = mail(WEBMASTER_EMAIL, REQUEST, $message,
     "From: ".$name." <".$email.">\r\n"
    ."Reply-To: ".$email."\r\n"
    ."X-Mailer: PHP/" . phpversion());


if($mail)
{
echo 'OK';
}

}
else
{
echo '<div class="notification_error">'.$error.'</div>';
}

}
?>