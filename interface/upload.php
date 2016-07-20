<?php
if (isset($_FILES['file'])) {
  // Example:
  writeLog($_FILES);
  move_uploaded_file($_FILES['file']['tmp_name'], "../uploads/" . $_FILES['file']['name']);
  echo 'successful';
}
function writeLog($log){
  if(is_array($log) || is_object($log)){
    $log = json_encode($log);
  }
  $log = $log."\r\n";

  file_put_contents('log.log', $log,FILE_APPEND);
}
?>
