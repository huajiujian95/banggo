<?php


$db = mysqli_connect("127.0.0.1","root","","banggo");
$db->query("SET NAMES utf8");
$page = $_REQUEST["page"];
$start = ($page - 1) * 40;

$type = $_REQUEST["type"];
if($type == "default") {
    $sql = "SELECT * FROM goods LIMIT $start,40";
} elseif ($type == "dsc") {
    $sql = "SELECT * FROM goods ORDER BY title DESC LIMIT $start,40";
} elseif ($type == "asc") {
    $sql = "SELECT * FROM goods ORDER BY title ASC LIMIT $start,40";
}

$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);
?>