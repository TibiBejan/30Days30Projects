<?php
    include_once 'header.php';
?>
        
<section class="login">
    <form action="includes/login.inc.php" method="POST" class="login__form">
        <h1 class="heading-one">Log In</h1>
        <input type="text" name="userid" placeholder="Username / Email...">
        <input type="password" name="password" placeholder="Password...">
        <button type="submit" name="submit" class="button primary-button">Sign Up</button>
    </form>

    <?php
        if(isset($_GET['error'])){
            if($_GET['error'] == "emptyinput"){
                echo "<p class='error'>Fill in all fields!</p>";
            }
            if($_GET['error'] == "wronglogin"){
                echo "<p class='error'>The username or password does not exist!</p>";
            }
        }
    ?>
</section>

<?php
    include_once 'footer.php';
?>