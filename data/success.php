<?php

 header('Content-Type:application/json;charset=utf-8');
 @$uid=$_REQUEST['uid']or die('{"code":-2,"uid required"}');
 require("1_init.php");
$sql = "SELECT pid,cartId,pdevice,price,pic,did,count FROM r_phone,oppo_order_prev WHERE cartId=( SELECT cid FROM oppo_cart WHERE userId=$uid ) AND pid=productId";
$result = mysqli_query($conn, $sql);
$list['pp']= mysqli_fetch_all($result, MYSQLI_ASSOC);
for($i=0;$i<sizeof($list['pp']);$i++){
$did=$list['pp'][$i]["did"];

$cartId=$list['pp'][$i]["cartId"];
$productId=$list['pp'][$i]["pid"];
$count=$list['pp'][$i]["count"];
$pdevice=$list['pp'][$i]["pdevice"];

//$sql="INSERT INTO oppo_order_nu VALUES(NULL,'$uid','$productId','$count','$pdevice')";
//	$result=mysqli_query($conn,$sql);
}
$sql="INSERT INTO oppo_order_nn VALUES(NULL,'$uid')";
	$result=mysqli_query($conn,$sql);
	$sql = "SELECT * FROM oppo_order_nn WHERE uid=$uid ";
  $result = mysqli_query($conn, $sql);
	$list['nn']=mysqli_fetch_all($result,MYSQLI_ASSOC);
	//var_dump($list['nn']);
	//echo json_encode($list['nn']);

//验证数据是否插入成功
//$sql = "SELECT * FROM oppo_order_nu WHERE uid=$uid ";
//$result = mysqli_query($conn,$sql);
//$list['data']= mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($list);
?>