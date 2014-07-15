<?php
header("content-type:application/json; charset:utf-8");
date_default_timezone_set("Asia/Shanghai");

  $con = @ mysql_connect("localhost", "lihuazh1_yizhan", "xyang2012hz") or die("数据库链接错误");
  mysql_select_db("lihuazh1_yizhan", $con);
  mysql_query("set names 'utf8'");

  $title = $_POST[title];

  $sql = 'INSERT INTO `my_article` VALUES ("",2,21$title,0,"的mail()函数通常还不允许你使用你选择的SMTP服务器，并且它也根本不支持如今已被众多邮件服务器采用的SMTP验证。","sdfasdf",0,"2014-06-10 12:56:02",1000,1)';


  if (!mysql_query($sql,$con)){
  	die('Error: ' . mysql_error());
  }

  echo "asdfasdf";


?>