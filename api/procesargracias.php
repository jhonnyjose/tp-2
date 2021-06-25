<?php
$host  = $_SERVER['HTTP_HOST'];
$uri   = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
$enviado = 'gracias.html';




$nombre = $_POST['icon_prefix'];
$correo = $_POST['email'];
$tel = $_POST['icon_telephone'];
$mensaje = $_POST['textarea1'];
$subject = 'mensaje app';

$enviaPara = 'jhonny.diaz@davinci.edu.ar';



$textoCorreo = '';
$textoCorreo .= "<p>".$nombre."</p>";
$textoCorreo .= "<p>Su correo es: ".$correo."</p>";
$textoCorreo .= "<p>Su telefono es: ".$tel."</p>";
$textoCorreo .= "<p>dice: ".$mensaje ."</p>";
$textoCorreo .= "<hr />";



$mail_headers  = "MIME-Version: 1.0\r\n";
$mail_headers .= "Content-type: text/html; charset=utf-8\r\n";
$mail_headers .= 'From: ' . $correo . "\r\n";
@mail($enviaPara, $subject, $textoCorreo, $mail_headers);

header("Location: http://$host$uri/$enviado");
exit;
?>