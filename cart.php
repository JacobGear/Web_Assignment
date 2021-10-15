<?php
session_start();
$_SESSION['lastPage'] = $_SERVER['PHP_SELF'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Dog Hiring Services</title>
    <link rel="stylesheet" href="style/style.css">
    <script src="javascript/jquery-3.6.0-un.js"></script>
    <script src="javascript/showCart.js"></script>
    <script src="javascript/dateValidator.js"></script>
    <script src="javascript/login.js"></script>
</head>

<body>

    <header class="menu">
        <ul>
            <li class="logo"><img src="images/pug_logo.png"></li>
            <li><a href="index.php">Home</a></li>
            <li><a href="products.php">Products</a></li>
            <li><a href="contact.php">Contact</a></li>
            <li class="active">Cart</li>
            <?php if (isset($_SESSION['authenticatedUser'])) {
                echo '<li><a href="admin/editor.php">Admin</a></li>';
                echo '<li><a href="admin/admin.php">Bookings</a></li>';
            }
            if (!isset($_SESSION['authenticatedUser']) && !isset($_SESSION['publicUser'])) { ?>
                <li><a href="#" class="sign"><span>Log In</span></a></li>
            <?php } ?>
        </ul>
        <?php if (isset($_SESSION['authenticatedUser'])) {
            echo "<div class='welcome'>";
            echo "Welcome " . $_SESSION['authenticatedUser'];
            echo '<form id="logoutForm" action="app/logout.php" method="post">';
            //echo '<li><a href="#" class="signOut"><span>Log Out</span></a></li>';
            echo '<input type="submit" class="signOut" value="Logout">';
            echo '</form></div>';
        } elseif (isset($_SESSION['publicUser'])) {
            echo "<div class='welcome'>";
            echo "Welcome " . $_SESSION['publicUser'];
            echo '<form id="logoutForm" action="app/logout.php" method="post">';
            //echo '<li><a href="#" class="signOut"><span>Log Out</span></a></li>';
            echo '<input type="submit" class="signOut" value="Logout">';
            echo '</form></div>';
        } ?>
    </header>

    <main id="cart">
        <h2>Cart:</h2>

        <ul id="cartList"></ul>

        <h2>Total:</h2>
        <p id="total"></p>
        <input type="button" value="Clear Cart" id="clearCart">

        <br><br>
        <form id="checkoutForm" novalidate>
            <fieldset>
                <legend>Booking Form</legend>
                <p>
                    <label for="userName">User name:</label>
                    <input type="text" name="userName" id="userName">
                    <?php
                    if (isset($_SESSION['userName'])) {
                        $name = $_SESSION['userName'];
                        echo "value='$name'";
                    }
                    ?>

                </p>
                <p>
                    <label for="dateTime">Pick up time:</label>
                    <input type="datetime-local" name="mytime" id="dateTime" placeholder="Select Date time">
                    <?php
                    if (isset($_SESSION['mytime'])) {
                        $name = $_SESSION['mytime'];
                        echo "value='$name'";
                    }
                    ?>
                </p>
                <p>
                    <label for="numHours">Number of hours:</label>
                    <select name="numHours" id="numHours">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="4">5</option>
                        <option value="4">6</option>
                        <option value="4">7</option>
                        <option value="4">8</option>
                    </select>
                    <?php
                    if (isset($_SESSION['numHours'])) {
                        $name = $_SESSION['numHours'];
                        echo "value='$name'";
                    }
                    ?>
                </p>
            </fieldset>

            <button type="button" class='confirmBooking'>Confirm Booking</button>
        </form>

        <div>
            <ul id="errorMessage"></ul>
        </div>

    </main>

    <footer class="footer">
        <p>Dog Hiring Services is not a real store. No products are available, and no money will be accepted.
            All images from Wikimedia Commons and are believed to be in the public domain. </p>
    </footer>

</body>
</html>