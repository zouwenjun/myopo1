<?php
@$uid=$_REQUEST['uid'] or die('"code":-2,"require uid"');
@$did=$_REQUEST['did'] or die('"code":-3,"require did"');
//@$did=$_REQUEST['did'] or die('"code":-3,"require pid"');
@$count=$_REQUEST['cnt'] or die ('"code":-4,"require count"');
header('Content-Type:application/json;charset=utf-8');
require("1_init.php");
$sql="SELECT did FROM oppo_order_prev WHERE did='$did'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row===null){
$sql="SELECT cartId, productId ,count FROM oppo_cart_detail WHERE did='$did'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row ($result);
$cartId=$row[0];
$pid=$row[1];
$count=$row[2];
//if($row===null){//该用户购物车中还没有该产品
//$productId=$row[0];
//var_dump($productId);
$sql="INSERT INTO oppo_order_prev VALUES('$did','$cartId','$pid','$count')";
	mysqli_query($conn,$sql);
}

echo'{"code":1,"msg":"添加成功"}';
 ?>