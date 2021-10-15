<?php
session_start();
$_SESSION['lastPage'] = $_SERVER['PHP_SELF'];
if(!isset($_SESSION['authenticatedUser'])) {
    header("Location: ../index.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Dog Hiring Services</title>
    <link rel="stylesheet" href="../style/style.css">
    <script src="../javascript/jquery-3.6.0-un.js"></script>
    <script src="../javascript/showAdminBookings.js"></script>
    <script src="../javascript/cancelOrder.js"></script>
</head>

<body>
<header class="menu">
    <ul>
        <li class="logo"><img src="../images/pug_logo.png"></li>
        <li><a href="../index.php">Home</a></li>
        <li><a href="../products.php">Products</a></li>
        <li><a href="../contact.php">Contact</a></li>
        <li><a href="../cart.php">Cart</a></li>
        <li><a href="editor.php">Admin</a></li>
        <li class="active">Bookings</li>
    </ul>
    <?php
    echo "<object class='admin'>Admin user: " . $_SESSION['authenticatedUser'] . "</object>";
    ?>
    <h1>Customer Bookings:</h1><br>
</header>

<main>
    <div class="adminBookings"> </div>
</main>

</body>
</html>
