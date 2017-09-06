<?php
header('Content-Type: application/json');
@$uname=$_REQUEST['username']or die('{"code":-2,"msg":"username required"}');
@$code=$_REQUEST['password']or die('{"code":-3,"msg":"password required"}');
require('1_init.php');
$sql="INSERT INTO myopo_user VALUES(NULL,'$uname','$code')";
$result=mysqli_query($conn,$sql);
$uid = mysqli_insert_id($conn);
$output = [
    'code'=>1,
    'msg'=>'新用户添加成功',
    'uid'=>$uid
];
echo json_encode($output);

