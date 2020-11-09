<?php 
    session_start();
?>

<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>PHP Login System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="css/main.css">
    </head>
        
    <body>
    <header class="header">
            <nav class="header__navbar">
                <div class="wrapper">
                    <div class="header__navbar-logo">
                        <img src="images/new-php-logo.png" alt="PHP Logo">
                    </div>
                    <ul class="header__navbar-links">
                        <li class="list-item">
                            <a href="index.php" class="navbar-link">Home</a>
                        </li>

                        <?php
                            if(isset($_SESSION['userId'])){
                                echo "<li class=\"list-item\"><a href=\"profile.php\" class=\"navbar-link\">Profile Page</a></li>";
                                echo "<li class=\"list-item\"><a href=\"includes/logout.inc.php\" class=\"navbar-link\">Log Out</a></li>";
                            } else {
                                echo "<li class=\"list-item\"><a href=\"signup.php\" class=\"navbar-link\">Signup</a></li>";
                                echo "<li class=\"list-item\"><a href=\"login.php\" class=\"navbar-link\">Login</a></li>";
                            }
                        ?>

                        <li class="list-item">
                            <a href="#" class="navbar-link">Github</a>
                        </li>
                    </ul>
                    <div class="header__navbar-hamburger">
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                    </div>
                </div>
            </nav>
    </header>