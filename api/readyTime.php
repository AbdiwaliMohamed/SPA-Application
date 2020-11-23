<?php
include("config.php");
$data=json_decode(file_get_contents("php://input"),true);
$id=$_POST["id"];
$resp["status"]=mysqli_query($con,"UPDATE `test` SET `ready_time` = CURRENT_TIME()"); // step 2 & 3
$resp["status"]=mysqli_query($con,"UPDATE test SET cust_status='Your order is ready'"); // step 2 & 3

echo json_encode($resp); // step 4

echo mysqli_error($con)



?>