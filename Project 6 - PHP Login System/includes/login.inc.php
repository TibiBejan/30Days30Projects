<?php
    if(isset($_POST['submit'])){

        $username = $_POST['userid'];
        $password = $_POST['password'];

        require_once 'dbh.inc.php';
        require_once 'functions.inc.php';

        if(emptyInputLogin($username, $password) !== false){
            header("Location: ../login.php?error=emptyinput");
            exit();
        }

        loginUser($connection, $username, $password);
    } else {
        header("Location: ../login.php");
        exit();
    }
?>