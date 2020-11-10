<?php
    $serverName = "localhost";
    $dbUsername = "root";
    $dbPassword = "";
    $dbName = "uploadproject7";

    $connection = mysqli_connect($serverName, $dbUsername, $dbPassword, $dbName);

    if(!$connection){
        die("Connection failed: " . mysqli_connect_error());
    }
?>