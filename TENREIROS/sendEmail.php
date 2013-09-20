<?php

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $from = 'From:'.$email; 
    $body = 'E-mail: ' .$email." Nombre: ".$name." Mensaje: ".$message;
    $to = 'tenreiroramon@gmail.com'; 
    $subject = 'from tenreiros site'; 
    if(mail($to, $subject, $body))
        echo "mail send successful";
    else
        echo "mail send fail";


?>