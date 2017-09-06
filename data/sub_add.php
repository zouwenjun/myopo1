<?php
@$uid=$_REQUEST['uid'] or die('"code":-2,"require uid"');
//@$pid=$_REQUEST['pid'] or die('"code":-3,"require pid"');
@$count=$_REQUEST['cnt'] or die ('"code":-4,"require count"');
@$did=$_REQUEST['did'] or die ('"code":-5,"require did"');
header('Content-Type:application/json;charset=utf-8');
require("1_init.php");
$sql="SELECT cid from oppo_cart WHERE userId='$uid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
$cartId=$row[0];

//$sql="SELECT pid,count FROM oppo_cart_detail WHERE cartId='$cartId' AND did='$did'";
//$result=mysqli_query($conn,$sql);
//$row=mysqli_fetch_row ($result);


  $sql="UPDATE oppo_order_prev SET count='$count' WHERE did='$did'";
  mysqli_query($conn,$sql);
  $sql="UPDATE oppo_cart_detail SET count='$count' WHERE did='$did'";
	mysqli_query($conn,$sql);
echo '{"code":1,"msg":"操作成功","count":'.$count.'}';

 ?>