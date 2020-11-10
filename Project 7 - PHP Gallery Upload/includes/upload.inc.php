<?php
    if(isset($_POST['submit'])){

        $newFileName = $_POST['fileName'];
        $fileTitle = $_POST['fileTitle'];
        $fileInfo = $_POST['fileDescription'];
       

        if(empty($newFileName)){
            $newFileName = "gallery";
        } else {
            $newFileName = strtolower(str_replace(" ", "-", $newFileName));
        }

        $file = $_FILES['file'];
        $fileName = $file['name'];
        $fileType = $file['type'];
        $fileTempLocation = $file['tmp_name'];
        $fileError = $file['error'];
        $fileSize = $file['size'];


        $fileExtension = explode(".", $fileName);
        $fileActualExtension = strtolower(end($fileExtension));
        $allowed = ['jpg', 'jpeg', 'png'];

        if(in_array($fileActualExtension, $allowed)){
            if($fileError === 0) {
                if($fileSize < 5000000){
                    
                    $imageFullName = $newFileName . "." . uniqid("", true) . "." . $fileActualExtension;
                    $path = "../images/gallery/" . $imageFullName;

                    require_once 'dbh.inc.php';

                    if(empty($fileTitle) || empty($fileInfo)){
                        header("Location: ../index.php?error=empty");
                        exit();
                    } else {
                        $sql = "INSERT INTO gallery (galleryTitle, galleryDescription, galleryFullName) VALUES (?, ?, ?);";
                        $stmt = mysqli_stmt_init($connection);

                        if(!mysqli_stmt_prepare($stmt, $sql)){
                            header("Location: ../index.php?error=failed");
                            exit();
                        } else {
                            mysqli_stmt_bind_param($stmt, "sss", $fileTitle, $fileInfo, $imageFullName);
                            mysqli_stmt_execute($stmt);     
                            
                            move_uploaded_file($fileTempLocation, $path);

                            header("Location: ../index.php?upload=success");
                        }
                    }

                } else {
                    header("Location: ../index.php?error=largeFile");
                    exit();
                }
            } else {
                header("Location: ../index.php?error=imageError");
                exit();
            }
        } else {
            header("Location: ../index.php?error=fileType");
            exit();
        }
        

    } else {
        header("Location: ../index.php?error=failed");
        exit();
    }
?>