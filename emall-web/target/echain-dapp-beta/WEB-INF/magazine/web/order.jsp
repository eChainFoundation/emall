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
	<title>确认订单</title>
</head>
<body>
<section class="mar-btn">
	<article class="bg-white mar-b">
		<div class="auto">
			<div class="t-box list-height">
				<i class="iconfont icon-dizhi mar-r10"></i>
				<div class="t-box-flex1 f-s4">请填写收货地址</div>
				<i class="iconfont icon-youjiantou"></i>
			</div>
		</div>
	</article>
	<article class="mar-b">
		<ul>
			<li class="list-height bg-white">
				<div class="auto">
					<div class="t-box">
						<img src="<%=basePath%>/static/img/title-icon.png" class="title-icon mar-r" />
						<h3 class="f-s4">区块链体验商城</h3>
					</div>
				</div>	
			</li>
			<li class="pad-tb bg-light-gray">
				<div class="auto">
					<div class="t-box">
						<input type="hidden" id="productId" name="productId" value="${product.id}"></input>
						<div class="order-img"><img src="<%=basePath%>/${product.productPicture}" /></div>
						<div class="t-box-flex1 mar-l mar-r">
							<h4 class="f-s2">${product.productName}</h3>
							<div class="order-infor mar-t">
								<p class="f-s1 color-gray">尺码：均码</p>
							</div>
							<div class="t-box mar-t">
								<p class="color-blue f-s2 t-box-flex1">${product.productPrice}&nbsp;eCoin</p>
								<p class="f-s2 color-gray">×1</p>
							</div>
						</div>
					</div>
				</div>	
			</li>
			<li class="list-height bg-white f-s4">
				<div class="auto">
					<div class="t-box list-height border-b">
						<div class="t-box-flex1">配送方</div>
						<p>EMS</p>
					</div>
				</div>
			</li>
			<li class="list-height bg-white f-s4">
				<div class="auto">
					<div class="t-box list-height">
						<div class="t-box-flex1">延误险</div>
						<p>×1</p>
					</div>
				</div>
			</li>
		</ul>
	</article>
</section>
<footer class="t-box f-s4" id="footer">
	<div class="t-box-flex2 t-align-r mar-r">总计：<span class="color-blue">10 eCoin</span></div>
	<div class="t-box-flex1"><button type="button" class="color-white bg-purple-blue order-btn">提交订单</button></div>
</footer>
<script type="text/javascript" src="<%=basePath%>/static/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/swiper.min.js"></script>
<script>

	$(function(){
		
	})


</script>
</body>
</html>