<?php
    if(isset($_POST['submit'])){
        
        $name = $_POST['name'];
        $email = $_POST['email'];
        $username = $_POST['userid'];
        $password = $_POST['password'];
        $passwordRepeat = $_POST['repeatPassword'];

        require_once 'dbh.inc.php';
        require_once 'functions.inc.php';

        if(emptyInputSignup($name, $email, $username, $password, $passwordRepeat) !== false){
            header("Location: ../signup.php?error=emptyinput");
            exit();
        }

        if(invalidUsername($username) !== false){
            header("Location: ../signup.php?error=invalidUid");
            exit();
        }

        if(invalidEmail($email) !== false){
            header("Location: ../signup.php?error=invalidEmail");
            exit();
        }

        if(passwordMatch($password, $passwordRepeat) !== false){
            header("Location: ../signup.php?error=passwordsDontMatch");
            exit();
        }

        if(usernameExists($connection, $username, $email) !== false){
            header("Location: ../signup.php?error=ussernameTaken");
            exit();
        }

        // CREATE USER
        createUser($connection, $name, $email,  $username, $password);

    } else {
        header("Location: ../signup.php");
    }
?>