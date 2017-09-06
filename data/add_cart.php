<?php
@$uid=$_REQUEST['uid'] or die('"code":-2,"require uid"');
@$pid=$_REQUEST['pid'] or die('"code":-3,"require pid"');
//@$did=$_REQUEST['did'] or die('"code":-3,"require pid"');
@$count=$_REQUEST['cnt'] or die ('"code":-4,"require count"');
header('Content-Type:application/json;charset=utf-8');
require("1_init.php");
$sql="SELECT cid from oppo_cart WHERE userId='$uid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row===null){
	$sql="INSERT INTO oppo_cart VALUES(NULL,'$uid')";
	mysqli_query($conn,$sql);
	$cartId=mysqli_insert_id($conn);
}else{
	$cartId=$row[0];
}
$sql="SELECT did,count FROM oppo_cart_detail WHERE cartId='$cartId' AND productId='$pid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row ($result);
if($row===null){//该用户购物车中还没有该产品
	$sql="INSERT INTO oppo_cart_detail VALUES(NULL,'$cartId','$pid','$count')";
	mysqli_query($conn,$sql);
}else {
	$did=$row[0];
	$count=$row[1]+$count;
	//var_dump($count);
	$sql="UPDATE oppo_cart_detail SET count='$count' WHERE did='$did'";
	mysqli_query($conn,$sql);
	}
echo '{"code":1,"msg":"购买成功","count":'.$count.'}';
 ?>