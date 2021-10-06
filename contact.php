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

  <link rel="stylesheet" href="style/leaflet.css"/>
  <script src="leaflet/leaflet.js"></script>
  <script src="leaflet/leaflet-src.js"></script>
  <script src="leaflet/leaflet-src.esm.js"></script>
  <script src="javascript/map.js"></script>
  <script src="javascript/login.js"></script>

</head>

<body>

  <header class="menu">
    <ul>
      <li class="logo"><img src="images/pug_logo.png"></li>
      <li><a href="index.php">Home</a></li>
      <li><a href="products.php">Products</a></li>
      <li class="active">Contact</li>
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
    <h1>Head office, parks and walks!</h1><br>
  </header>

  <div id="map"></div><br>

  <main>
    <ul class="contact">
      <li>
        <h3>Parks</h3>
        <label for="showParks"></label> <input type="checkbox" id="showParks" name="parks">
        <p>Click to show parks!</p>
        <p></p>
      </li>
      <li>
        <h3>Head Office</h3>
        <p>
          101 The Octagon
        </p>
        <p>
          (03) 490 1234
        </p>
      </li>
      <li>
        <h3>Walks</h3>
        <label for="showWalks"></label> <input type="checkbox" id="showWalks" name="walks">
        <p>Click to show walks!</p>
        <p></p>
      </li>
    </ul>
  </main>

  <footer class="footer">
    <p>Dog Hiring Services is not a real store. No products are available, and no money will be accepted.</p>
    <p>All images from Wikimedia Commons and are believed to be in the public domain.</p>
  </footer>

</body>
</html>