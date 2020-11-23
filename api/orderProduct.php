<?php
include("config.php");
$cust_id=$_POST["cust_id"];
$addr=$_POST["addr"];
$order_details=$_POST["order_details"];
$resp["status"]=mysqli_query($con,"insert into test(cust_id, addr, products) values('$cust_id','$addr','$order_details') ");

echo json_encode($resp);
?>