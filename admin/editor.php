<?php
session_start();
$_SESSION['lastPage'] = $_SERVER['PHP_SELF'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Dog Hiring Services</title>
    <link rel="stylesheet" href="../style/style.css">
    <script src="../javascript/jquery-3.6.0-un.js"></script>
    <script src="../javascript/submitChanges.js"></script>
</head>

<body>
<header class="menu">
    <ul>
        <li class="logo"><img src="../images/pug_logo.png"></li>
        <li><a href="../index.php">Home</a></li>
        <li><a href="../products.php">Products</a></li>
        <li><a href="../contact.php">Contact</a></li>
        <li><a href="../cart.php">Cart</a></li>
        <li class="active">Admin</li>
        <?php
         echo "Admin user: " . $_SESSION['authenticatedUser'];
        ?>
    </ul>


    <h1>Dogs:</h1>
</header>

<main class="banner">
    <br><p>To edit dog, edit text on table and then click the "Submit Changes" button</p>
    <div class="editor">
        <?php include("../app/showDogs.php"); ?>
        <button type="button" id="submitChanges">Submit Changes</button>
        <button type="button" id="addDog">Add new dog</button>
    </div>
    <div class="testing"></div>
</main>

<footer class="footer">
    <p>Dog Hiring Services is not a real store. No products are available, and no money will be accepted.</p>
    <p>All images from Wikimedia Commons and are believed to be in the public domain.</p>
</footer>

</body>
</html>
