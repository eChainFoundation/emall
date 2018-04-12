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
<body>
<div class="ban swiper-container">
	<div class="swiper-wrapper">
		<div class="swiper-slide" id=""><img src="<%=basePath%>/static/img/ban.png"></div>
		<div class="swiper-slide" id=""><img src="<%=basePath%>/static/img/ban.png"></div>
	</div>
	<div class="swiper-pagination"></div>
	
</div>
<section class="mar-btn">
	<article class="bg-white mar-t mar-b">
		<div class="auto">
			<div class="pad-tb">
				<div class="public-tit t-box">
					<img src="<%=basePath%>/static/img/title-icon.png" class="title-icon mar-r" />
					<h3>项目介绍</h3>
				</div>
				<p class="f-s2 line-height48">区块链+溯源+保险，全方位服务保障购物全流程可追溯，假货再也不怕去中心化业务理念，简化服务流程加盖时间戳防篡改，信息公开透明无任何中间费用，实现买卖双方互赢自动投保，售后有保障</p>
			</div>
		</div>
	</article>
	<article class="bg-white mar-t mar-b">
		<div class="auto">
			<div class="pad-tb">
				<div class="public-tit t-box">
					<img src="<%=basePath%>/static/img/title-icon.png" class="title-icon mar-r" />
					<h3>区块链体验商城</h3>
				</div>
				<div class="echain-shop">
					<ul>
					<c:if test="${products != null}">
						<c:forEach items="${products}" var="product">
						<li class="t-box">
							<input type="hidden" id="productId" name="productId" value="${product.id}"></input>
							<div class="echain-list-img"><img src="<%=basePath%>/${product.productPicture}"/></div>
							<div class="t-box-flex1 mar-l mar-f">
								<h3 class="f-s2">${product.productName}</h3>
								<p class="f-s1 ellipsis color-gray echain-list-summary mar-b">${product.productMaterial}</p>
								<div class="t-box">
									<p class="t-box-flex1 color-blue f-s1 echain-shop-num">${product.productPrice}&nbsp;eCoin</p>
									<button type="button" id="checkBuy" class="btn bg-purple-blue color-white f-s2">点击购买</button>
								</div>
							</div>
						</li>
						</c:forEach>
					</c:if>
					</ul>
				</div>
			</div>
		</div>
	</article>
</section>
<footer class="t-box" id="footer">
	<div class="t-box-flex1">
		<a class="f-s4 active"><i class="iconfont icon-shouye1 mar-r10"></i>首页</a>
	</div>
	<div class="t-box-flex1">
		<a class="f-s4"><i class="iconfont icon-gerenzhongxin mar-r10"></i>个人中心</a>
	</div>
</footer>
<script type="text/javascript" src="<%=basePath%>/static/js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/common.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/comm.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/js/swiper.min.js"></script>
<script>

$(function(){
	var mySwiper = new Swiper ('.swiper-container', {
		loop: true,
		speed:300,
		autoplay:3000,
		pagination: {
			el: '.swiper-pagination',
		},
	})  
		  
	$("#checkBuy").unbind("click").bind("click", function() {
		var _this = $(this);
		$.ajax({  
			url : "/order/check_buy.html",  
			data :"productId="+$("#productId").val(),    
			type : "post",  
			cache : false,  
			async:false, 
			dataType : "json",  
			success:  function(data){
				if(data=="1"){
					clickUrl("/order/to_buy.html?productId="+$("#productId").val());
				}else{
					alert("您已经购买过，不能重复购买！");
				}
			}
		});
	});
})


</script>
</body>
</html>