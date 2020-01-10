<?php
$db = mysqli_connect("127.0.0.1","root","","banggo");

$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$phone = $_REQUEST["phone"];

$sql = "SELECT * FROM user WHERE username = '$username'";

$result = mysqli_query($db,$sql);

if(mysqli_num_rows($result) == 0) {
    $sql = "INSERT INTO `user` (`id`,`username`,`password`,`phone`)
    VALUES (NULL, '$username', '$password', '$phone')";

    $result = mysqli_query($db,$sql);

    $arr = array("status"=>"success", "msg"=>"恭喜你！注册成功！");
    echo json_encode($arr);

} else {
    echo '{"status":"error","msg":"抱歉，该用户已被注册！请重新输入！"}';
}

?>