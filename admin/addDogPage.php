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


    <h1>Add New Dog</h1>
</header>

<main class="banner">
    <div class="editor">
        <form id="newDogForm" action="../app/addNewDog.php" method="post">
            <fieldset>
                <legend>Enter Details Here:</legend>
                <p>
                    <label for="dogName">Dog Name:</label>
                    <input type="text" name="dogName" id="dogName" required="required">
                </p>
                <p>
                    <label for="dogType">Dog Type:</label>
                    <input type="text" name="dogType" id="dogType" required="required">
                </p>
                <p>
                    <label for="dogSize">Dog Size:</label>
                    <select name="dogSize" id="dogSize">
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Huge">Huge</option>
                    </select>
                </p>
                <p>
                    <label for="description">Description:</label>
                    <input type="text" name="description" id="description" size="50" required="required">
                </p>
                <p>
                    <label for="pricePerHour">Price Per Hour:</label>
                    <select name="pricePerHour" id="pricePerHour">
                        <option value="1.0">$1.0</option>
                        <option value="2.0">$2.0</option>
                        <option value="3.0">$3.0</option>
                        <option value="4.0">$4.0</option>
                        <option value="5.0">$5.0</option>
                        <option value="6.0">$6.0</option>
                        <option value="7.0">$7.0</option>
                        <option value="8.0">$8.0</option>
                        <option value="9.0">$9.0</option>
                        <option value="10.0">$10.0</option>

                    </select>
                </p>
            <button type="submit" id='addNewDog'>Add dog</button>
        </form>
    </div>
    <div>
        <p id="errorMessage"></p>
    </div>

</main>

<footer class="footer">
    <p>Dog Hiring Services is not a real store. No products are available, and no money will be accepted.</p>
    <p>All images from Wikimedia Commons and are believed to be in the public domain.</p>
</footer>

</body>
</html>
