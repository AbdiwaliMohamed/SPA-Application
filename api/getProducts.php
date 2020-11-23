<?php

include("config.php");

$result=mysqli_query($con,"select * from products"); // step 1
echo mysqli_error($con);
$data=mysqli_fetch_all($result,MYSQLI_ASSOC); // step 2

echo json_encode($data);


?>