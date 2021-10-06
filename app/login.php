<?php
session_start();

function printErrorReport($errorReport) {
    echo '<p id="errorMessage">';
    echo $errorReport;
    echo '</p>';
    exit;
}

$username =  $_POST["loginUser"];
$password =  $_POST["loginPassword"];
if(strlen($username) <= 0) {
    printErrorReport("You must enter a username!");
}
if(strlen($password) <= 0) {
    printErrorReport("You must enter a password!");
}

$input_filename = "../json/login.json";
$json_input = file_get_contents($input_filename);
$json_login = json_decode($json_input,true);
$adminLength = sizeof($json_login["Users"]["Admins"]);
$adminLength = sizeof($json_login["Users"]["Admins"]);
$publicLength = sizeof($json_login["Users"]["Public"]);
for($i=0; $i<$adminLength; $i++) {
    if($username === $json_login["Users"]["Admins"][$i]["username"]) {
        if($password === $json_login["Users"]["Admins"][$i]["password"]) {
            $_SESSION['authenticatedUser'] = $username;
            if(isset($_SESSION['lastPage'])) {
                header("Location:" . $_SESSION['lastPage']);
            } else {
                header("Location: ../index.php");
            }
            exit;
        } else {
            printErrorReport("Incorrect Password!");
        }
    }
}
for($i=0; $i<$publicLength; $i++) {
    if($username === $json_login["Users"]["Public"][$i]["username"]) {
        if($password === $json_login["Users"]["Public"][$i]["password"]) {
            $_SESSION['publicUser'] = $username;
            if(isset($_SESSION['lastPage'])) {
                header("Location:" . $_SESSION['lastPage']);
            } else {
                header("Location: index.php");
            }
            exit;
        } else {
            printErrorReport("Incorrect Password!");
        }
    }
}
if(!isset($_SESSION['authenticatedUser']) && !isset($_SESSION['publicUser'])){
    printErrorReport("Error no user found!");
}
