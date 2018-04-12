
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
<html lang="">
<head>
	<title>中建八局溧水区市民中心工程平台</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
	<link rel="stylesheet" href="<%=basePath%>resources/css/base.css" />
	<link rel="stylesheet" href="<%=basePath%>resources/css/template1.css" />
	<link rel="stylesheet" href="<%=basePath%>resources/css/font-awesome.min.css" />
	<link rel="stylesheet" href="<%=basePath%>resources/css/interact/wsite.css" media="screen" />
	<link href="<%=basePath %>resources/css/bundle-bundle_bootstrap_head.css" type="text/css" rel="stylesheet" media="screen, projection" />
	<link href="<%=basePath %>resources/css/bundle-bundle_fontawesome_head.css" type="text/css" rel="stylesheet" media="screen, projection" />
	<link href="<%=basePath %>resources/css/bundle-bundle_bootstrap_utils_head.css" type="text/css" rel="stylesheet" media="screen, projection" />
	<link href="<%=basePath %>resources/css/bundle-bundle_jqueryui_head.css" type="text/css" rel="stylesheet" media="screen, projection" />
	<link rel="stylesheet" href="<%=path %>/resources/css/interact/jquery-ui-1.10.0.custom.min.css" media="screen" />
	<link rel="stylesheet" href="<%=path %>/resources/css/interact/jquery-ui-timepicker-addon.css" media="screen" />
	<meta name="layout" content="kickstart"/>
	<link rel="stylesheet" href="<%=basePath %>resources/css/bundle-bundle-manage.css" />
	<!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
	<!--[if lt IE 9]>
		<script src="https://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<style type="text/css">
		body * {font-family: 微软雅黑;}
		#Header .title {font-size: 36px;}
		h1 {font-size: 26px;}
		h2 {font-size: 25px;}
		h3 {font-size: 20px;}
		section p {font-size: 18px; line-height: 25px;}
		.table th, .table td {text-align: center;vertical-align: middle;}
		.first {margin-top:10px}
		.navbar-fixed-bottom,.navbar-fixed-top{z-index:10000}
	</style>
	
	<!-- 上传所需文件 -->
	<script type="text/javascript" src="<%=basePath%>resources/material/js/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="<%=basePath%>resources/js/jquery.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=basePath %>resources/material/css/default/om-default.css" />
	<script type="text/javascript" src="<%=basePath%>resources/material/js/operamasks-ui.min.js"></script>	
	<script type="text/javascript" src="<%=path %>/resources/js/interact/jquery-ui-1.10.0.custom.min.js"></script>
	<script type="text/javascript" src="<%=path %>/resources/js/interact/jquery-ui-timepicker-addon.js"></script>
    <script type="text/javascript" src="<%=path %>/resources/js/interact/jquery-ui-timepicker-zh-CN.js"></script>
	
	<script type="text/javascript">
	
	<c:if test="${not empty message}">
		alert("${message}");
	</c:if>
	
	function checkForm($form) {
		var pass = $("#password").val();
		var word = $("#password1").val();
		
		if(pass != word) {
			alert("两次密码不一致！");
			return false;
		}
		return true;
	}
	
	</script>
</head>
<body>
<div id="Content" class="container" style="min-height:850px">
	<div class="row row-offcanvas row-offcanvas-right">
	<style>
		<!--
		td:last-child {text-align:left}
		input {width:300px}
		-->
	</style>
<form id="main_form" name="main_form" action="<%=basePath %>Jrj/saveAdmin" method="post" onsubmit="if(checkForm($(this))) doSubmit($(this)); return false;">
	<div class="top-guide">
	
		<div class="title">管理员管理<span style="margin-left: 4px;">|</span></div>
		<div class="step">注册新管理员 
		</div>
	</div>	
<section style="padding-top:0">
	<table class="table table-bordered">
		<tbody>
			<tr>
				<td style="width:200px">管理员名</td>
      			<td>
      				<input type="text" maxlength="50" name="userName" required="true" value="${loginAdmin.userName}" id="userName" />
      			</td>
			</tr>
			<tr>
				<td style="width:200px">真实姓名</td>
      			<td>
      				<input type="text" maxlength="50" name="realName" required="true" value="${loginAdmin.realName}" id="realName" />
      			</td>
			</tr>
			<tr>
				<td style="width:200px">所属部门</td>
      			<td>
      				<input type="text" maxlength="50" name="department" required="true" value="${loginAdmin.department}" id="department" />
      			</td>
			</tr>
			<tr>
				<td style="width:200px">密码</td>
      			<td>
      				<input type="password" name="password" value="${loginAdmin.password}" id="password" required="true">
      			</td>
			</tr>
			<tr>
				<td style="width:200px">重复密码</td>
      			<td>
      				<input type="password" name="password1" value="${loginAdmin.password}" id="password1" required="true">
      			</td>
			</tr>
			<tr>
				<td></td>
				<td style="border-left:none">
				<input type="hidden" name="id" value="${loginAdmin.id}" id="id" />
					<button class="submitBtn btn btn-success">保存</button>
					<a href="javascript:window.history.back();" class="btn btn-default">返回</a>
				</td>
			</tr>
		</tbody>
	</table>
</section>
</form>


	
	</div>
</div>
</body>

</html>