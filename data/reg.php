<?php
@$n=$_REQUEST['uname']or die('uname required');

require('1_init.php');
$sql="SELECT uid FROM myopo_user WHERE uname='$n'";

$result=mysqli_query($conn,$sql);
if($result===false){
echo "sql err";
}else{
    $row=mysqli_fetch_row($result);
      if($row===null){
      echo 'bucunzai';
      }else{
       echo 'cunzai';

       }
    }
?>