<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Dog Hiring Services</title>
    <link rel="stylesheet" href="style/style.css">
    <script src="javascript/jquery-3.6.0-un.js"></script>
    <script src="javascript/showReviews.js"></script>
</head>

<body>
<header class="menu">
    <ul>
        <li class="logo"><img src="images/pug_logo.png"></li>
        <li><a href="index.php">Home</a></li>
        <li><a href="products.php">Products</a></li>
        <li><a href="contact.php">Contact</a></li>
        <li><a href="cart.php">Cart</a></li>
    </ul>

    <h1>Dog Hiring Services</h1><br>
</header>
<br><br>

<main id="login">
    <form id="loginForm" action="app/login.php" method="post">
        <label for="loginUser">Username: </label>
        <input type="text" name="loginUser" id="loginUser"><br>
        <label for="loginPassword">Password: </label>
        <input type="password" name="loginPassword" id="loginPassword"><br>
        <input type="submit" id="loginSubmit" value="Login">
    </form>
    <div>
        <ul id="errorMessage"></ul>
    </div>
</main>

<footer class="footer">
    <p>Dog Hiring Services is not a real store. No products are available, and no money will be accepted.</p>
    <p>All images from Wikimedia Commons and are believed to be in the public domain.</p>
</footer>

</body>
</html>
