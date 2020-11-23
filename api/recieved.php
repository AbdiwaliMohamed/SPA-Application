<?php
include("config.php");
$id=$_POST["id"];
$resp["status"]=mysqli_query($con,"Update test set order_status='Received' "); // step 2 & 3
//$resp["status"]=mysqli_query($con,"Update test set cust_status='Received'"); // step 2 & 3

echo json_encode($resp); // step 4

echo mysqli_error($con)



?>