<?php 
    // SIGNUP FUNCTIONS
    function emptyInputSignup ($name, $email, $username, $password, $passwordRepeat){
        $result = false;

        if(empty($name) || empty($email) || empty($username) || empty($password) || empty($passwordRepeat) ){
            $result = true;
        } else {
            $result = false;
        }

        return $result;
    }

    function invalidUsername($username){
        $result = false;

        if(!preg_match("/^[A-Za-z0-9]*$/", $username)){
            $result = true;
        } else {
            $result = false;
        }

        return $result;
    }

    // VALIDATE EMAIL
    function invalidEmail($email) {
        $result = false;

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $result = true;
        } else {
            $result = false;
        }

        return $result;
    }

    // VALIDATE PASSWORDS
    function passwordMatch($password, $passwordRepeat){
        $result = false;

        if( $password !== $passwordRepeat ) {
            $result = true;
        } else {
            $result = false;
        }

        return $result;
    }

    // CHECK IF USERNAME EXISTS
    function usernameExists($connection, $username, $email){
        $sql = "SELECT * FROM users WHERE userUid = ? OR userEmail = ?;";
        $stmt = mysqli_stmt_init($connection);

        if(!mysqli_stmt_prepare($stmt, $sql)) {
            header("Location ../signup.php?error=stmtFailed");
            exit();
        }

        mysqli_stmt_bind_param($stmt, "ss", $username, $email);
        mysqli_stmt_execute($stmt);

        $resultData = mysqli_stmt_get_result($stmt);

        if($row = mysqli_fetch_assoc($resultData)){
            return $row;
        } else {
            $result = false;
            return $result;
        }

        mysqli_stmt_close($stmt);
    }
    
    // CREATE USER AND SEND DATA TO DB
    function createUser($connection, $name, $email, $username, $password){
        $sql = "INSERT INTO users (userName, userEmail, userUid, userPassword) VALUES (?, ?, ?, ?);";
        $stmt = mysqli_stmt_init($connection);

        if(!mysqli_stmt_prepare($stmt, $sql)){
            header("Location: ../signup.php?error=stmtFailed");
            exit();
        }

        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $username, $hashedPassword);
        mysqli_stmt_execute($stmt);

        mysqli_stmt_close($stmt);
        header("Location: ../signup.php?error=none");
        exit();
    }

    // LOGIN FUNCTIONS
    function emptyInputLogin($username, $password){
        $result = false;

        if(empty($username) || empty($password)){
            $result = true;
        } else {
            $result = false;
        }

        return $result;
    }

    function loginUser($connection, $username, $password){
        $usernameExists =  usernameExists($connection, $username, $username);

        if($usernameExists === false) {
            header("Location: ../login.php?error=wronglogin");
            exit();
        }

        $passwordHashed =  $usernameExists["userPassword"];
        $checkPassword = password_verify($password, $passwordHashed);

        if($checkPassword === false) {
            header("Location: ../login.php?error=wronglogin");
            exit();
        } else if($checkPassword === true){
            session_start();
            $_SESSION["userId"] = $usernameExists["userId"];
            $_SESSION["username"] = $usernameExists["userName"];
            header("Location: ../index.php");
            exit();
        }
    }
?>