<?php
$dogId = file_get_contents("php://input");

$input_filename = "../json/animals.json";
$json_input = file_get_contents($input_filename);
$dogsJson = json_decode($json_input,true);
$dogLength = sizeof($dogsJson["animals"]["dogs"]);

for($i=0; $i<$dogLength; $i++) {
    if($dogsJson["animals"]["dogs"][$i]["dogId"] === $dogId) {
        unset($dogsJson["animals"]["dogs"][$i]);
        $dogsJson['animals']['dogs'] = array_values($dogsJson['animals']['dogs']);
        $json_output = json_encode($dogsJson, JSON_PRETTY_PRINT)."\n";
        file_put_contents($input_filename,$json_output);
    }

}
echo("<meta http-equiv='refresh' content='0'>");