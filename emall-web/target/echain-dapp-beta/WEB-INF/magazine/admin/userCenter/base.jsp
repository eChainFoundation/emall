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
<title>微信公众平台管理系统</title>
<link href="<%=basePath %>resources_admin/css/global.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>resources_admin/css/main.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>resources_admin/css/account.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="<%=basePath %>resources_admin/js/jquery-1.7.2.min.js"></script>

<style type="text/css">body, html{background:url(<%=basePath %>resources_admin/images/main-bg.jpg) left top fixed no-repeat;}</style>

</head>

<body>

<div id="iframe_page">
	<div class="iframe_content">
<div id="home">
	<div class="welcome"><div>
	</div>
	<span>
	<c:if test="${!empty appSysMaster.masterName}">${appSysMaster.masterName}</c:if>
	</span>
	</div>
	<div class="info">
		<div class="member">
			<div class="face">
			<c:if test="${!empty userInfo.headshot }">
			<img src="<%=basePath %>${userInfo.headshot }" width="115" height="115">	
			</c:if>	
			<c:if test="${empty userInfo.headshot }">
			<img src="<%=basePath %>resources_admin/images/face.png" width="115" height="115">	
			</c:if>		
			</div>
			<ul class="info_list">
				<li>
					<img src="<%=basePath %>resources_admin/images/icon-0.png">公众账号：
					<c:if test="${!empty userInfo.userName}">
						${userInfo.userName }
					</c:if>
					<c:if test="${empty userInfo.userName}">
						未绑定【<a href="<%=basePath %>userinfo/queryUserinfoByUserId/${userInfo.userId }">绑定帐号</a>】
					</c:if>
				</li>
				<li>
					<img src="<%=basePath %>resources_admin/images/icon-1.png">
					帐号状态：
					<c:if test="${userInfo.userState eq '0'}">未开通</c:if>
					<c:if test="${userInfo.userState eq '1'}">正常</c:if>
				</li>
			<!--	<li><img src="<%=basePath %>resources_admin/images/icon-2.png">短信余额：0条</li> 
				<li><img src="<%=basePath %>resources_admin/images/icon-3.png">开通时间：2013-11-08</li> -->
				<li><img src="<%=basePath %>resources_admin/images/icon-1.png">公共账号类型：<a  style="font-size:17px;color:#ff0000">
				<c:if test="${userInfo.accountType eq 1}">服务号</c:if>
				<c:if test="${userInfo.accountType eq 2}">订阅号</c:if>
				 </a></li> 
				<li><img src="<%=basePath %>resources_admin/images/icon-1.png">开户日期：<fmt:formatDate value="${userInfo.creatTime }" pattern="yyyy/MM/dd hh:mm:ss"/></li>
				 
				 <c:if test="${!empty wxContract.contractExpiredDate}">
				 <li><img src="<%=basePath %>resources_admin/images/icon-4.png">到期日期：<a  style="font-size:17px;color:#ff0000">${wxContract.contractExpiredDate }<a></a></li>
				 </c:if>
				  <c:if test="${empty wxContract.contractExpiredDate}">
				 <li><img src="<%=basePath %>resources_admin/images/icon-4.png">到期日期：暂无期限</li>
				 </c:if>
				 
				<!-- <li><img src="<%=basePath %>resources_admin/images/icon-1.png">今日预约数：<a href="/weixinpl/order.php?customer_id=1504" style="font-size:17px;color:#ff0000">0</a></li> --> 
			</ul>
		</div>
	<div class="list">
		<div><img src="<%=basePath %>resources_admin/images/list-app.png"></div>
		<ul>
			<li title="查看账户信息"><a href="<%=basePath %>userinfo/queryUserinfoByUserId/${userInfo.userId }" group="#"><img src="<%=basePath %>resources_admin/images/account.png"><br>我的帐号</a></li>
			<li title="首次订阅回复"><a href="<%=basePath %>back/wxback_guanzhu" group="wechat"><img src="<%=basePath %>resources_admin/images/wechat.png"><br>我的账户</a></li>
			<li title="提供关键词、字回复多种类型素材"><a href="<%=basePath %>rule/wxrule" group="wechat"><img src="<%=basePath %>resources_admin/images/reply_keyword.png"><br>关键字回复</a></li>
			<li title="管理单图文、多图文、语音、视频、图片等素材"><a href="<%=basePath %>wxMaterial/materia_new" group="material"><img src="<%=basePath %>resources_admin/images/material.png"><br>图文消息设置</a></li>
		</ul>
	</div>
	<div class="clear"></div>
			<div class="list">
			<div><img src="<%=basePath %>resources_admin/images/list-trade.png"></div>
			<ul>
				<li title="为用户提供在微信公众号里建设一个官方网站的功能，通过几种不同风格的模板，将企业的信息用很优美的形式展现出来，告别以往回复1、回复2这种单调的信息展现形式。">
					<img src="<%=basePath %>resources_admin/images/web.png"><br>微官网
				</li>			
				
				<li title="为用户提供在微信公众号里点餐支付的功能">
					<img src="<%=basePath %>resources_admin/images/canyin.png"><br>微餐饮
				</li>
			</ul>
		</div>
	</div>	</div>
<div>
</div></div>
<script type="text/javascript">
function showAlert(e,info){
	alert(info);
	stopDefault(e);

}

function stopDefault(e){
    // Prevent the default browser action (W3C)
    if ( e && e.preventDefault )
        e.preventDefault();
    // A shortcut for stoping the browser action in IE
    else
        window.event.returnValue = false;
    return false;
	}
</script>

</body>
</html>