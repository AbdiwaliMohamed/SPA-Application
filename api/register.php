<?php

include("config.php");
$data=json_decode(file_get_contents("php://input"),true);
$id=$data["id"];
$name=$data["name"];
$email=$data["email"];
$tel=$data["tel"];
$user=$data["user"];
$pass=$data["pass"];
$type=$data["type"]; // step 1
if($type== 'cust') {
    $resp["status"] = mysqli_query($con, "insert into cust(name,tel,user,pass) values('$name','$tel','$user','$pass')");
    if ($resp["status"]) {
        $result = mysqli_query($con, "select id from cust where user='$user'");// [{id}] [0]['id']
        $row = mysqli_fetch_all($result, MYSQLI_ASSOC); // [{id:9}]

        $resp["id"] = $row[0]["id"];

    }
}
else{
    $resp["status"]=mysqli_query($con,"insert into admin(name,email,user,pass) values('$name','$email','$user','$pass')");
    if($resp["status"]){
        $result=mysqli_query($con,"select id from admin where user='$user'");// [{id}] [0]['id']
        $row=mysqli_fetch_all($result,MYSQLI_ASSOC); // [{id:9}]

        $resp["id"]=$row[0]["id"]; // resp={status:true,id:18} or {status:false}
    }
}


echo json_encode($resp); // step 4





?>