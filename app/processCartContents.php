<?php
session_start();
$booking = json_decode(file_get_contents("php://input"), true);
echo "<h2>Completed booking:</h2>";
echo "Booking for: " . $booking["booking"][0]["name"] . "<br>";
echo "Pickup time: " . $booking["booking"][0]["pickup"]["day"] . "/" . $booking["booking"][0]["pickup"]["month"] . "/" .
    $booking["booking"][0]["pickup"]["year"] . " " . $booking["booking"][0]["pickup"]["time"] . "<br>";
echo "Number of hours: " . $booking["booking"][0]["numHours"] . "<br>";

$input_filename = "../json/bookings.json";
$json_input = file_get_contents($input_filename);
$json_bookings = json_decode($json_input,true);
$bookings_size = sizeof($json_bookings["bookings"]["booking"]);
$json_bookings["bookings"]["booking"][$bookings_size]["dogId"] = $booking["booking"][0]["dogId"];
$json_bookings["bookings"]["booking"][$bookings_size]["name"] = $booking["booking"][0]["name"];
$json_bookings["bookings"]["booking"][$bookings_size]["pickup"]["day"] = $booking["booking"][0]["pickup"]["day"];
$json_bookings["bookings"]["booking"][$bookings_size]["pickup"]["month"] = $booking["booking"][0]["pickup"]["month"];
$json_bookings["bookings"]["booking"][$bookings_size]["pickup"]["year"] = $booking["booking"][0]["pickup"]["year"];
$json_bookings["bookings"]["booking"][$bookings_size]["pickup"]["time"] = $booking["booking"][0]["pickup"]["time"];
$json_bookings["bookings"]["booking"][$bookings_size]["numHours"] = $booking["booking"][0]["numHours"];
$json_output = json_encode($json_bookings,JSON_PRETTY_PRINT)."\n";
file_put_contents($input_filename,$json_output);
echo "<pre>"; echo print_r($json_output); echo "</pre>";

