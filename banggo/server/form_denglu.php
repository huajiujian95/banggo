<?php
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];

$db = mysqli_connect("127.0.0.1","root","","banggo");
$sql = "SELECT * FROM user WHERE username = '$username'";
$result = mysqli_query($db,$sql);
if (mysqli_num_rows($result) == 0) 
{
        echo '{"status":"error","msg":"该用户不存在！"}';
} else {
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $_password = $data[0]["password"];
    if ($_password != $password) 
    {
        echo '{"status":"error","msg":"对不起，您的密码不正确！"}';

    }else {
        echo '{"status":"success","msg":"登陆成功！！！"}';
    }
}
?>