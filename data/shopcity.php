<?php
 header('content-Type:application/json');
 require("1_init.php");
 $sql="SELECT * FROM r_phone";
 $result=mysqli_query($conn,$sql);
 $list=mysqli_fetch_all($result,MYSQLI_ASSOC);
 //var_dump($list);
 echo json_encode($list);
