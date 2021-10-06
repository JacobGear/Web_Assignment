<?php
session_start();
if (isset($_SESSION['authenticatedUser'])) {
    unset($_SESSION['authenticatedUser']);
}
if (isset($_SESSION['publicUser'])) {
    unset($_SESSION['publicUser']);
}
if(isset($_SESSION['lastPage'])) {
    header("Location:" . $_SESSION['lastPage']);
} else {
    header("Location: index.php");
}

