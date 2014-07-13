<?php
header("content-type:application/json; charset:utf-8");
date_default_timezone_set("Asia/Shanghai");

$con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

// some code

?>