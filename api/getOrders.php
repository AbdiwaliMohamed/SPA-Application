<?php
include("config.php");
$result=mysqli_query($con,"select * from test"); // step 2
$resp=mysqli_fetch_all($result,MYSQLI_ASSOC); // step 3

echo json_encode($resp); // step 4




?>