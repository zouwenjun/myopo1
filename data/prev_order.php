<?php

 header('Content-Type:application/json;charset=utf-8');
 @$uid=$_REQUEST['uid']or die('{"code":-2,"uid required"}');
 require("1_init.php");
$sql = "SELECT pid,cartId,pdevice,price,pic,did,count FROM r_phone,oppo_cart_detail WHERE cartId=( SELECT cid FROM oppo_cart WHERE userId=$uid ) AND pid=productId";
$result = mysqli_query($conn, $sql);
$list= mysqli_fetch_all($result, MYSQLI_ASSOC);



//php for ($x=0; $x<=10; $x++) { echo "数字是:$x "; }
for($i=0;$i<sizeof($list);$i++){
$did=$list[$i]["did"];

$cartId=$list[$i]["cartId"];
$productId=$list[$i]["pid"];
$count=$list[$i]["count"];
$sql="INSERT INTO oppo_order_prev VALUES('$did','$cartId','$productId','$count')";
	$result=mysqli_query($conn,$sql);
}
//验证数据是否插入成功
//$sql = "SELECT pid,cartId,pdevice,price,pic,did,count FROM r_phone,oppo_order_prev WHERE cartId=( SELECT cid FROM oppo_cart WHERE userId=$uid ) AND pid=productId";
//$result = mysqli_query($conn, $sql);
//$list= mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($list);
?>