<?php

$input_filename = "../json/animals.json";
$json_input = file_get_contents($input_filename);
$dogsJson = json_decode($json_input,true);
$dogLengthJson = sizeof($dogsJson["animals"]["dogs"]);

function nextId($dogsJson, $dogLengthJson) {
    $lastDogId = $dogsJson["animals"]["dogs"][$dogLengthJson-1]["dogId"];
    $number = (int)substr($lastDogId, -3)+1;
    $length = 3;
    return "DW-" . substr(str_repeat(0, $length).$number, - $length);
}

$dogsJson["animals"]["dogs"][$dogLengthJson]["dogId"] = nextId($dogsJson, $dogLengthJson);
$dogsJson["animals"]["dogs"][$dogLengthJson]["dogName"] = $_POST["dogName"];
$dogsJson["animals"]["dogs"][$dogLengthJson]["dogType"] = $_POST["dogType"];
$dogsJson["animals"]["dogs"][$dogLengthJson]["dogSize"] = $_POST["dogSize"];
$dogsJson["animals"]["dogs"][$dogLengthJson]["description"] = $_POST["description"];
$dogsJson["animals"]["dogs"][$dogLengthJson]["pricePerHour"] = $_POST["pricePerHour"];
$json_output = json_encode($dogsJson, JSON_PRETTY_PRINT)."\n";
file_put_contents($input_filename,$json_output);
header("Location: ../admin/editor.php");