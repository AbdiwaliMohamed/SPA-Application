<?php
include("config.php");
$cust_id=$_POST["cust_id"];
    $result = mysqli_query($con, "select * from test"); // step 2

    $resp = mysqli_fetch_all($result, MYSQLI_ASSOC); // step 3
echo json_encode($resp); // step 4




?>