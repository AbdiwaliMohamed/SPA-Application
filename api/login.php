<?php

include("config.php");
$data=json_decode(file_get_contents("php://input"),true);
$type=$data["type"]; // cust or rest
$user=$data["user"];
$pass=$data["pass"];

$result=mysqli_query($con,"select id from $type where user='$user' and pass='$pass'"); // step 2
// {status:true,id:18} or {status:false}
if(mysqli_num_rows($result)==0)
    $resp["status"]=false;
else{
    $resp["status"]=true;
    $row=mysqli_fetch_all($result,MYSQLI_ASSOC); //[{id}]
    $resp["id"]=$row[0]["id"]; // step 3
}


echo json_encode($resp); // step 4




?>