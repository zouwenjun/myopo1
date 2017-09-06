<?php

 header('content-Type:application/json;charset=utf-8');
 @$uid=$_REQUEST['uid']or die('{"code":-2,"uid required"}');
 require("1_init.php");


$sql = "SELECT pid,pdevice,price,pic,did,count FROM r_phone,oppo_cart_detail WHERE cartId=( SELECT cid FROM oppo_cart WHERE userId=$uid ) AND pid=productId";
$result = mysqli_query($conn, $sql);

$list = mysqli_fetch_all($result, MYSQLI_ASSOC);


echo json_encode($list);
?>