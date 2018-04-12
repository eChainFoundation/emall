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
			<div class="t-box">
				<div class="t-box-flex1 mar-r"><input type="text" id="phoneNumber" placeholder="输入手机号" /></div>
				<select id="country" class="login-select f-s2">
					<option value="1">中国</option>
					<option value="2">国外</option>
				</select>
			</div>
			<div class="t-box">
				<div class="t-box-flex1 mar-r"><input type="text" id="yanzhengma" placeholder="输入验证码" /></div>
				<input type="hidden" id="yanzhengma1" name="yanzhengma1">
				<button type="button" id="getYZM" class="btn bg-purple-blue vCode-btn color-white">获取验证码</button>
			</div>
			<button type="button" id="submit-btn" class="btn color-blue bg-white login-btn">确定</button>
		</div>
	</article>
</section>
<script type="text/javascript" src="<%=basePath%>/static/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/comm.js"></script>
<script>

$(function(){	  
	$("#getYZM").unbind("click").bind("click", function() {
		var phoneNumber = $("#phoneNumber").val();
		var country = $("#country").val();
		if(phoneNumber == "") {
			alert("请输入手机号!");
			return;
		}
		if(!isMobilPhoneNumber(phoneNumber)) {
			alert("手机号输入不正确!");
			return;
		}
		$.ajax({  
			url : "/user/get_yam.html",   
			data :"phoneNumber="+phoneNumber+"&country="+country,
			type : "post",  
			cache : false,  
			async:false, 
			dataType : "json",  
			success:  function(data){
				if(data!="0"){
					$("#yanzhengma1").val(data);
				}else{
					alert("获取验证码失败！");
				}
			}
		});
	});
	
	$("#submit-btn").unbind("click").bind("click", function() {
		var _this = $(this);
		var phoneNumber = $("#phoneNumber").val();
		var country = $("#country").val();
		var yanzhengma1 = $("#yanzhengma1").val();
		var yanzhengma = $("#yanzhengma").val();
		
		alert("yzm1   " + yanzhengma1);
		alert("yzm   " + yanzhengma);
		
		if(yanzhengma == "") {
			alert("请输入验证码!");
			return;
		}
		if(yanzhengma != yanzhengma1) {
			alert("验证码输入不正确!");
			return;
		}
		
		clickUrl("/user/save_user.action?phoneNumber="+phoneNumber+"&country="+country);
	});
})

</script>
</body>
</html>