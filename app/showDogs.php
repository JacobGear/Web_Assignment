<?php
$input_filename = "../json/animals.json";
$json_input = file_get_contents($input_filename);
$json = json_decode($json_input,true);

echo "<table id='dogTable'>";
echo "<tr>
    <th>Dog ID</th>
    <th>Dog Name</th>
    <th>Dog Type</th>
    <th>Dog Size</th>
    <th>Description</th>
    <th>Price Per Hour</th>

  </tr>";
$dogLength = sizeof($json["animals"]["dogs"]);
for($i=0; $i<$dogLength; $i++) {
    $dogId = $json["animals"]["dogs"][$i]["dogId"];
    $dogName = $json["animals"]["dogs"][$i]["dogName"];
    $dogType = $json["animals"]["dogs"][$i]["dogType"];
    $dogSize = $json["animals"]["dogs"][$i]["dogSize"];
    $description = $json["animals"]["dogs"][$i]["description"];
    $pricePerHour = $json["animals"]["dogs"][$i]["pricePerHour"];

    echo "<tr>";
    echo "<td class='dogIdTbl'>$dogId</td>";
    echo "<td contenteditable='true'>$dogName</td>";
    echo "<td contenteditable='true'>$dogType</td>";
    echo "<td contenteditable='true'>$dogSize</td>";
    echo "<td contenteditable='true'>$description</td>";
    echo "<td contenteditable='true'>$pricePerHour</td>";
    echo '<td><button type="button" class="deleteDogBtn">Delete Dog</button></td>';
    echo "</tr>";
}
echo "</table>";
