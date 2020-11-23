<?php
include("config.php");

$data=json_decode(file_get_contents("php://input"),true);

$id=$data["id"];
$name=$data["name"];
$price=$data["price"];
$type=$data["type"];
$img=$data["img"]; // step 1

$resp["status"]=mysqli_query($con,"update products set name='$name',price='$price',type='$type',img='$img' where id=$id"); // step 2 & 3

echo json_encode($resp); // step 4





?>