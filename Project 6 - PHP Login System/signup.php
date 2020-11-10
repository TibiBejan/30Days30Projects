<?php
    include_once 'header.php';
?>
        
<section class="signup">
    <form action="includes/signup.inc.php" method="POST" class="signup__form">
        <h1 class="heading-one">Sign Up</h1>

        <?php
        if(isset($_GET['error'])){
            if($_GET['error'] === "emptyinput"){
                echo '
                <div class="error" style="display: block;">
                    <h2 class="heading-two">There are empty fields!</h2>
                </div>
                ';
            }

            if($_GET['error'] === "invalidUid"){
                echo '
                <div class="error" style="display: block;">
                    <h2 class="heading-two">Choose a proper username!</h2>
                </div>
                ';
            }

            if($_GET['error'] === "invalidEmail"){
                echo '
                <div class="error" style="display: block;">
                    <h2 class="heading-two">The email is not valid!</h2>
                </div>
                ';
            }

            if($_GET['error'] === "passwordsDontMatch") {
                echo '
                <div class="error" style="display: block;">
                    <h2 class="heading-two">Passwords doesn\'t match!</h2>
                </div>
                ';
            }

            if($_GET['error'] === "stmtFailed") {
                echo '
                <div class="error" style="display: block;">
                    <h2 class="heading-two">Something went wrong, try again!</h2>
                </div>
                ';
            }

            if($_GET['error'] === "ussernameTaken") {
                echo '
                <div class="error" style="display: block;">
                    <h2 class="heading-two">Username is taken!</h2>
                </div>
                ';
            }

            if($_GET['error'] === "none") {
                echo '
                <div class="error" style="display: block;">
                    <h2 class="heading-two">You have signed up!</h2>
                </div>
                ';
            }   
        }
        ?>

        <input type="text" name="name" placeholder="Full name...">
        <input type="email" name="email" placeholder="E-mail...">
        <input type="text" name="userid" placeholder="Username...">
        <input type="password" name="password" placeholder="Password...">
        <input type="password" name="repeatPassword" placeholder="Repeat password...">
        <button type="submit" name="submit" class="button primary-button">Sign Up</button>
    </form>
</section>



<?php
    include_once 'footer.php';
?>
       