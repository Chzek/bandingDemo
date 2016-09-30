<?php
$mysqli = new mysqli("mandrake.corp.pvt","nmars","nmars","protoDrake");
if($mysqli->connect_errno){
	echo "Failed to connect to MySQL: ". $mysqli->connect_error;
}

$node = $_GET['node'];
$info = array("node" => $node, "neModel" => null);
$ports = [];

$sql = "SELECT NE, NEMODEL, NE_COMP_ID, IndexName
				FROM portDetail
				WHERE NE = '$node'
				ORDER BY IndexName ASC";

$result = $mysqli->query($sql);
if($result){
	while($row = $result->fetch_object()){
		if($info['neModel'] == null){
			$info['neModel'] = $row->NEMODEL;
		}
		$ports[] = array("neComp" => $row->NE_COMP_ID, "Index" => $row->IndexName);
	}
}else{
	header("HTTP/1.0 404 Not Found");
}

$json['info'] = $info;
$json['ports'] = $ports;

echo json_encode($json);

?>