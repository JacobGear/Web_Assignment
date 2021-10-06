<?php
$dogChanges = json_decode(file_get_contents("php://input"), true);

$input_filename = "../json/animals.json";
$json_input = file_get_contents($input_filename);
$dogsJson = json_decode($json_input,true);

$dogLengthJson = sizeof($dogsJson["animals"]["dogs"]);
$dogLengthHtml = sizeof($dogChanges);

if($dogLengthJson !== $dogLengthHtml) {
    echo "ERROR!";
} else {
    for($i=0; $i<$dogLengthJson; $i++) {
        $dogsJson["animals"]["dogs"][$i]["dogId"] = $dogChanges[$i]["dogId"];
        $dogsJson["animals"]["dogs"][$i]["dogName"] = $dogChanges[$i]["dogName"];
        $dogsJson["animals"]["dogs"][$i]["dogType"] = $dogChanges[$i]["dogType"];
        $dogsJson["animals"]["dogs"][$i]["dogSize"] = $dogChanges[$i]["dogSize"];
        $dogsJson["animals"]["dogs"][$i]["description"] = $dogChanges[$i]["description"];
        $dogsJson["animals"]["dogs"][$i]["pricePerHour"] = $dogChanges[$i]["pricePerHour"];
    }
}

$json_output = json_encode($dogsJson, JSON_PRETTY_PRINT)."\n";
file_put_contents($input_filename,$json_output);
