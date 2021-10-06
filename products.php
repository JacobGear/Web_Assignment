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
  <script src="javascript/animalsImport.js"></script>
  <script src="javascript/addBooking.js"></script>
  <script src="javascript/showCustomerBookings.js"></script>
  <script src="javascript/login.js"></script>

</head>

<body>
<div class="container">

  <div class="menu">
    <ul>
      <li class="logo"><img src="images/pug_logo.png"></li>
      <li><a href="index.php">Home</a></li>
      <li class="active">Products</li>
      <li><a href="contact.php">Contact</a></li>
      <li><a href="cart.php">Cart</a></li>
        <?php if (isset($_SESSION['authenticatedUser'])) {
            echo '<li><a href="admin/editor.php">Admin</a></li>';
            echo "Welcome, " . $_SESSION['authenticatedUser'];
            echo '<form id="logoutForm" action="app/logout.php" method="post">';
            //echo '<li><a href="#" class="signOut"><span>Log Out</span></a></li>';
            echo '<input type="submit" class="signOut" value="Logout">';
            echo '</form>';
        } elseif (isset($_SESSION['publicUser'])) {
            echo "Welcome, " . $_SESSION['publicUser'];
            echo '<form id="logoutForm" action="app/logout.php" method="post">';
            //echo '<li><a href="#" class="signOut"><span>Log Out</span></a></li>';
            echo '<input type="submit" class="signOut" value="Logout">';
            echo '</form>';
        } else { ?>
            <li><a href="#" class="sign"><span>Log In</span></a></li>
        <?php } ?>
    </ul>
  </div>

  <h1 id="productsHead">Our Dogs:</h1>
  <div id="products">
  </div>

</div>

<footer class="footer">
  <p>Dog Hiring Services is not a real store. No products are available, and no money will be accepted.</p>
  <p>All images from Wikimedia Commons and are believed to be in the public domain.</p>
</footer>

</body>
</html>
