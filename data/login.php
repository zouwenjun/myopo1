<?php
header("Content-Type:application/json;charset=utf-8");
@$uname=$_REQUEST['username']or die('{"code":-2, "msg":"username required"}');
@$upsw=$_REQUEST['password']or die('{"code":-3, "msg":"password required"}');
require("1_init.php");
$sql="SELECT * FROM myopo_user WHERE uname='$uname' and upwd='$upsw'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);

if($row===null){
	echo '{"code":-1,"msg":"username is wrong or password id wrong"}';
}else{
	$uid = $row[0];
	//var_dump($uid);
  	$output = [
  		"code"=>1,
  		"msg"=>"success",
  		"uname"=>$uname,
  		"upsw"=>$upsw,
  		"uid"=>$uid,

  	];
  	echo json_encode($output);
  }