<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page isELIgnored="false" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta content="telephone=no" name="format-detection" />
	<meta content="email=no" name="format-detection" />
	<link href="<%=basePath%>/static/css/style.css" rel="stylesheet" type="text/css">
	<link href="<%=basePath%>/static/css/swiper.css" rel="stylesheet" type="text/css">
	<link href="<%=basePath%>/static/font/iconfont.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="<%=basePath%>/static/js/hotcss.js"></script>
	<title>eChain.one</title>
</head>
<body style="background: #2c0043">
<section class="login-box">
	<article class="auto login-header">
		<h3 class="t-center">基于区块链技术的<br>电商交易平台</h3>
		<fieldset class="t-center">
			<legend>内测体验版</legend>
		</fieldset>
		<p class="f-s2 mar-t mar-b t-center">仅1000个内侧名额，参与即可领取奖励</p>
	</article>
	<article class="auto">
		<div class="login-input">
			<input id="wallet" type="text" placeholder="输入钱包地址，代币即刻到账" />
			<input id="recommendId" type="text" placeholder="输入邀请码，领取奖励" />
			<button type="button" class="btn color-blue bg-white login-btn">领取</button>
		</div>
		<p class="t-center login-prompt">活动参与须知</p>
	</article>
</section>
<script type="text/javascript" src="<%=basePath%>/static/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/comm.js"></script>
<script>

$(function(){
		  
	$("#submit-btn").unbind("click").bind("click", function() {
		var _this = $(this);
		var wallet = $("#wallet").val();
		var recommendId = $("#recommendId").val();
		
		alert("wallet   " + wallet);
		alert("recommendId   " + recommendId);
		
		if(wallet == "") {
			alert("请输入钱包地址!");
			return;
		}
		
		clickUrl("/user/save_user.action?wallet="+wallet+"&recommendId="+recommendId);
	});
})

</script>
</body>
</html>