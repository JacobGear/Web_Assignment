<?php
$order = json_decode(file_get_contents("php://input"));
$order = (int)$order;
$input_filename = "../json/bookings.json";
$json_input = file_get_contents($input_filename);
$json = json_decode($json_input,true);
unset($json["bookings"]["booking"][$order-1]);
$json['bookings']['booking'] = array_values($json['bookings']['booking']);
$json_output = json_encode($json, JSON_PRETTY_PRINT)."\n";
file_put_contents($input_filename,$json_output);
echo("<meta http-equiv='refresh' content='0'>");