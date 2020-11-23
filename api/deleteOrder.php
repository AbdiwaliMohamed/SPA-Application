<?php
include("config.php");
$data=json_decode(file_get_contents("php://input"),true);
$id=$data["id"];
$resp["status"]=mysqli_query($con,"delete from test where id=$id");
json_encode($resp);
?>

