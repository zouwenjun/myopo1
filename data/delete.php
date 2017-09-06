<?php
header('Content-Type:application/json;charset=utf-8');
@$did=$_REQUEST["did"]or die('"code":-1,"require did"');
require("1_init.php");
$sql="DELETE FROM oppo_cart_detail WHERE did=$did";
$result=mysqli_query($conn,$sql);
echo'{"code":1,"msg":"删除成功"}';
?>