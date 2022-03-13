<?php
    $fp  = fopen('file.json','w');
    fwrite($fp,"[]");
    fclose($fp);
?>