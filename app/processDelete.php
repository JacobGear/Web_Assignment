<?php
$dogId = file_get_contents("php://input");

$input_filename = "../json/animals.json";
$json_input = file_get_contents($input_filename);
$dogsJson = json_decode($json_input,true);
$dogLength = sizeof($dogsJson["animals"]["dogs"]);

$input2 = "../json/bookings.json";
$json_input2 = file_get_contents($input2);
$bookingsJson = json_decode($json_input2,true);
$bookingsLength = sizeof($bookingsJson["bookings"]["booking"]);

for($i=0; $i<$bookingsLength; $i++) {
    $dogCount = sizeof($bookingsJson["bookings"]["booking"][$i]["dogId"]);
    for($j=0; $j<$dogCount; $j++) {
        if($bookingsJson["bookings"]["booking"][$i]["dogId"][$j] == $dogId) {
            echo "<script>alert('Error cannot delete dog that a customer has booked. Delete bookings with dog first');</script>";
            exit;
        }
    }
}

for($i=0; $i<$dogLength; $i++) {
    if($dogsJson["animals"]["dogs"][$i]["dogId"] === $dogId) {
        unset($dogsJson["animals"]["dogs"][$i]);
        $dogsJson['animals']['dogs'] = array_values($dogsJson['animals']['dogs']);
        $json_output = json_encode($dogsJson, JSON_PRETTY_PRINT)."\n";
        file_put_contents($input_filename,$json_output);
    }
}
echo("<meta http-equiv='refresh' content='0'>");