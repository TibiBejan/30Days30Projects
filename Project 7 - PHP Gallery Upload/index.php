<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>PHP Gallery Upload</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="css/main.css">
    </head>
    <body>
        <header class="header">
            <nav class="header__navbar">
                <div class="header__navbar-logo">
                    <img src="images/new-php-logo.png" alt="PHP Logo">
                </div>
                <ul class="header__navbar-links">
                    <li class="list-item">
                        <a href="#" class="navbar-link">Home</a>
                    </li>
                    <li class="list-item">
                        <a href="#" class="navbar-link">Contact</a>
                    </li>
                    <li class="list-item">
                        <a href="index.php" class="navbar-link">Gallery</a>
                    </li>
                </ul>
                <div class="header__navbar-hamburger">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>  
            </nav>
        </header>
        <section class="gallery">
            <h1 class="heading-one">Gallery</h1>
            <div class="gallery__cards">
            <?php

                require_once 'includes/dbh.inc.php';

                $sql = "SELECT * FROM gallery ORDER BY galleryId DESC";
                $stmt = mysqli_stmt_init($connection);

                if(!mysqli_stmt_prepare($stmt, $sql)){
                    header("Location: ../index.php?error=failed");
                    exit();
                } else {
                    mysqli_stmt_execute($stmt);
                    $result = mysqli_stmt_get_result($stmt);

                    while($row = mysqli_fetch_assoc($result)){
                        echo '<div class="card">
                        <div class="card__image" style="background-image: url(images/gallery/'. $row["galleryFullName"] .');"></div>
                        <h2 class="heading-two card__title">'. $row["galleryTitle"] .'</h2>
                        <p class="paragraph card__description">'. $row["galleryDescription"] .'</p>
                      </div>';
                    }

                }
            ?>
            </div>
            <form action="includes/upload.inc.php" method="POST" enctype="multipart/form-data" class="gallery__form">
                <h1 class="heading-one">Upload</h1>

                <?php
                    if(isset($_GET['error'])){
                        if($_GET['error'] == 'empty'){
                            echo '
                            <div class="error" style="display: block;">
                                <h2 class="heading-two">There are empty fields!</h2>
                            </div>
                            ';
                        }

                        if($_GET['error'] == 'failed'){
                            echo '
                            <div class="error" style="display: block;">
                                <h2 class="heading-two">There is an error, please try again!</h2>
                            </div>
                            ';
                        }

                        if($_GET['error'] == 'largeFile'){
                            echo '
                            <div class="error" style="display: block;">
                                <h2 class="heading-two">The file is too large!</h2>
                            </div>
                            ';
                        }

                        if($_GET['error'] == 'imageError'){
                            echo '
                            <div class="error" style="display: block;">
                                <h2 class="heading-two">The image cannot be uploaded, try again!</h2>
                            </div>
                            ';
                        }

                        if($_GET['error'] == 'fileType'){
                            echo '
                            <div class="error" style="display: block;">
                                <h2 class="heading-two">Please enter a proper image!</h2>
                            </div>
                            ';
                        }
                    }
                ?>

                
                <input type="text" name="fileName" class="form-input" placeholder="File name...">
                <input type="text" name="fileTitle" class="form-input" placeholder="File title...">
                <textarea name="fileDescription" class="form-input" placeholder="File description..."></textarea>
                <input type="file" name="file" class="form-input">
                <button name="submit" class="submit-button">Upload</button>
            </form>
        </section>
        <footer class="footer">
            <h1 class="heading-one heading-one-light">Project 7, PHP Gallery Upload</h1>
        </footer>
        <script src="script.js"></script>
    </body>
</html>