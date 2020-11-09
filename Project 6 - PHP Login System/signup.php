<?php
    include_once 'header.php';
?>
        
<section class="signup">
    <form action="includes/signup.inc.php" method="POST" class="signup__form">
        <h1 class="heading-one">Sign Up</h1>
        <input type="text" name="name" placeholder="Full name...">
        <input type="email" name="email" placeholder="E-mail...">
        <input type="text" name="userid" placeholder="Username...">
        <input type="password" name="password" placeholder="Password...">
        <input type="password" name="repeatPassword" placeholder="Repeat password...">
        <button type="submit" name="submit" class="button primary-button">Sign Up</button>
    </form>
    <?php
        if(isset($_GET['error'])){
            if($_GET['error'] === "emptyinput"){
                echo "<p>Fill in all fields!</p>";
            }
            if($_GET['error'] === "invalidUid"){
                echo "<p>Choose a proper username!</p>";
            }
            elseif($_GET['error'] === "invalidEmail"){
                echo "<p>The email is not valid!</p>";
            }
            elseif($_GET['error'] === "passwordsDontMatch") {
                echo "<p>Passwords doesn't match!</p>";
            }
            elseif($_GET['error'] === "stmtFailed") {
                echo "<p>Something went wrong, try again!</p>";
            }
            elseif($_GET['error'] === "ussernameTaken") {
                echo "<p>Username is taken!</p>";
            }
            elseif($_GET['error'] === "none") {
                echo "<p>You have signed up!</p>";
            }
        }
    ?>
</section>



<?php
    include_once 'footer.php';
?>
       