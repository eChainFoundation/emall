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
	<title>订单详情</title>
</head>
<body>
<section>
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
						<div class="order-img"><img src="<%=basePath%>/static/img/e-shop-list.png" /></div>
						<div class="t-box-flex1 mar-l mar-r">
							<h4 class="f-s2">eChain纪念版T-Shirt</h3>
							<div class="order-infor mar-t">
								<p class="f-s1 color-gray">尺码：均码</p>
							</div>
							<div class="t-box mar-t">
								<p class="color-blue f-s2 t-box-flex1">10 eCoin</p>
								<p class="f-s2 color-gray">×1</p>
							</div>
						</div>
					</div>
				</div>	
			</li>
			<li class="pad-tb bg-white"></li>
		</ul>
	</article>
	<article class="bg-white mar-t mar-b">
		<div class="auto">
			<ul>
				<li class="t-box list-height border-b">
					<i class="iconfont icon-baoxian mar-r10"></i>
					<h3 class="f-s4">保险信息</h3>
				</li>
				<li class="border-b">
					<p class="pad-tb line-height48 f-s2 color-gray">保障内容：商品在发货后，在卖家承诺的时效内未      收到货物，按照保险公司理赔标准给与培付。</p>
				</li>
				<li class="t-box border-b list-height">
					<p class="f-s2 color-gray mar-r10">标准时效：3天</p>
					<i class="iconfont icon-yiwen color-blue"></i>
				</li>
			</ul>
		</div>
	</article>
	<article class="bg-white mar-t mar-b">
		<div class="auto">
			<ul>
				<li class="t-box list-height border-b">
					<i class="iconfont icon-wodezijin mar-r10"></i>
					<h3 class="f-s4">资金信息</h3>
				</li>
				<li class="t-box border-b list-height f-s2 color-gray capital-information">
					<p class="active">买家已付款</p>
					<div class="e-solid active"></div>
					<p class="active">卖家已收到货款</p>
				</li>
			</ul>
		</div>
	</article>

	<article class="bg-white mar-t logistics-box">
		<div class="auto">
			<ul>
				<li class="t-box list-height border-b">
					<i class="iconfont icon-wuliu1 mar-r10"></i>
					<h3 class="f-s4 t-box-flex1">物流信息</h3>
					<i class="iconfont icon-jiantou_down"></i>
				</li>
			</ul>
			<dl class="logistics-dl color-gray">
				<dt></dt>
				<dd class="t-box">
					<div class="logistics-time">
						<p class="f-s1">02-01 06:12</p>
					</div>
					<div class="logistics-infor">
						<p class="f-s2">卖家已发货卖家已发货卖家已发货卖家已发货卖家已发货</p>
						<p class="f-s2">卖家已发货</p>
						<p class="f-s2">卖家已发货</p>
						<p class="f-s2">卖家已发货</p>
						<p class="f-s2">卖家已发货</p>
						<p class="f-s2">卖家已发货</p>
					</div>
				</dd>

				<dt></dt>
				<dd class="t-box">
					<div class="logistics-time">
						<p class="f-s1">02-01 06:12</p>
					</div>
					<div class="logistics-infor">
						<p class="f-s2">卖家已发货</p>
						<p class="f-s2">卖家已发货</p>
						<p class="f-s2">卖家已发货</p>
					</div>
				</dd>
				
			</dl>
		</div>
	</article>
</section>
<script type="text/javascript" src="<%=basePath%>/static/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/comm.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/swiper.min.js"></script>
<script>

	$(function(){
		
	})


</script>
</body>
</html>