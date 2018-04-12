
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored="false"%> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>404</title>
<style type="text/css">
*{
	padding:0;
	margin:0;
	list-style:none;
	font: 14px/1.42857 arial,"Microsoft Yahei","Hiragino Sans GB",sans-serif;
	}
.pic{
	padding:20% 0 0 0;
	text-align:center;
	}
.pic img{
	height:77px;
	}
.text{
	text-align:center;
	color:#666;
	font-size:16px;
	text-align:center;
	padding:30px 0 0 0;}
.btn{
	display: inline-block;
	padding:0 40px;
	border:1px solid #f96a0e;
	border-radius:30px;
	line-height:40px;
	color:#f96a0e;
	text-decoration:none;
	}
.btnBox{
	text-align:center;
	padding:40px 0 0 0;}
</style>
</head>

<body>
<div class="pic"><img src="<%=basePath %>resources/zounongjia/img/404.png" /></div>
<div class="text">对不起，您访问的页面不存在</div>
</body>
</html>
