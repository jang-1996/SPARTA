<html>
<title>Upload</title>
<?php
    session_start();
    $target=$_POST['directory'];
        if($target[strlen($target)-1]!='/')
                $target=$target.'/';
            $count=0;
            foreach ($_FILES['file']['name'] as $filename) 
            {
                $temp=$target;
                $tmp=$_FILES['file']['tmp_name'][$count];
                $count=$count + 1;
                $temp=$temp.basename($filename);
                move_uploaded_file($tmp,$temp);
                $temp='';
                $tmp='';
            }
    header("location:../../views/upload.php");
?>
</html>