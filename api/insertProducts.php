<?php
include("config.php");

$data=json_decode(file_get_contents("php://input"),true);
$name=$data["name"];
$price=$data["price"];
$type=$data["type"];
$img=$data["img"];
$resp["status"]=mysqli_query($con,"insert into products(name,price,type,img) values('$name','$price','$type','$img')"); // step 2 & 3

echo json_encode($resp);

?>