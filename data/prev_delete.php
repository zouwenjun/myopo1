<?php
header('Content-Type:application/json;charset=utf-8');
@$did=$_REQUEST["did"]or die('"code":-1,"require did"');
require("1_init.php");
$sql="SELECT productId FROM oppo_order_prev WHERE did=$did";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
$productId=$row[0];
$sql="DELETE FROM oppo_order_prev WHERE productId=$productId";
$result=mysqli_query($conn,$sql);
echo'{"code":1,"msg":"删除成功"}';
?>