<?php
    include_once 'header.php';
?>
        
<section class="login">
    <form action="includes/login.inc.php" method="POST" class="login__form">
        <h1 class="heading-one">Log In</h1>
        <?php
        if(isset($_GET['error'])){
            if($_GET['error'] == "emptyinput"){
                echo '
                <div class="error" style="display: block;">
                    <h2 class="heading-two">There are empty fields!</h2>
                </div>
                ';
            }
            if($_GET['error'] == "wronglogin"){
                echo '
                <div class="error" style="display: block;">
                    <h2 class="heading-two">The username or password does not exist!</h2>
                </div>
                ';
            }
        }
    ?>
        <input type="text" name="userid" placeholder="Username / Email...">
        <input type="password" name="password" placeholder="Password...">
        <button type="submit" name="submit" class="button primary-button">Sign Up</button>
    </form>
</section>

<?php
    include_once 'footer.php';
?>