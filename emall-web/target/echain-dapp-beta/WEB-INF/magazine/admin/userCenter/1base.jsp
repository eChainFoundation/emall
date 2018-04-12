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
				<div class="data">
			<div class="d0"><a href="#" group="statistics" title="为用户提供在微信公众号里酒店房间全景展示、房间预定、留言的功能"><h1>1</h1><h2>微商城</h2></a></div>
							<div class="d1"><a href="#" group="statistics" title="为用户提供在微信公众号里汽车商品报价展示、在线预约、留言、客服回复的功能"><h1>3</h1><h2>微汽车</h2></a></div>
							<div class="d2"><a href="#"   group="app" title="为餐饮行业提供便捷的服务渠道"><h1>2</h1><h2>微餐饮</h2></a></div>
							<div class="d3"><a href="#"   group="action" title="为用户提供在微信公众号里酒店房间全景展示、房间预定、留言的功能"><h1>4</h1><h2>微酒店</h2></a></div>
					</div>
		<div class="clear"></div>
	</div>
	<div class="list">
		<div><img src="<%=basePath %>resources_admin/images/list-app.png"></div>
		<ul>
			<li title="查看账户信息"><a href="<%=basePath %>userinfo/queryUserinfoByUserId/${userInfo.userId }" group="#"><img src="<%=basePath %>resources_admin/images/account.png"><br>我的帐号</a></li>
			<li title="首次订阅回复"><a href="<%=basePath %>back/wxback_guanzhu" group="wechat"><img src="<%=basePath %>resources_admin/images/wechat.png"><br>我的账户</a></li>
			<li title="提供关键词、字回复多种类型素材"><a href="<%=basePath %>rule/wxrule" group="wechat"><img src="<%=basePath %>resources_admin/images/reply_keyword.png"><br>关键字回复</a></li>
			<li title="管理单图文、多图文、语音、视频、图片等素材"><a href="<%=basePath %>wxMaterial/materia_new" group="material"><img src="<%=basePath %>resources_admin/images/material.png"><br>图文消息设置</a></li>
			<li title="营销活动--团购"><img src="<%=basePath %>resources_admin/images/tuan.png"><br>微团购</li>			
			<li title="提升粉丝利器"><img src="<%=basePath %>resources_admin/images/user.png"><br>会员卡</li>
			<li title="提供万能预约功能"><img src="<%=basePath %>resources_admin/images/reserve.png"><br>在线预约</li>
			<li title="提供在线留言、回复的功能"><img src="<%=basePath %>resources_admin/images/liuyan.png"><br>在线留言</li>
			<li title="提供调查问卷的功能"><img src="<%=basePath %>resources_admin/images/survey.png"><br>微调研</li>			
			<li title="提供图片展示的功能"><img src="<%=basePath %>resources_admin/images/albums.png"><br>微相册</li>			
			<li title="营销活动--刮刮卡"><img src="<%=basePath %>resources_admin/images/turntable.png"><br>刮刮卡</li>
			<li title="营销活动--大转盘"><img src="<%=basePath %>resources_admin/images/scratch.png"><br>欢乐大转盘</li>
			<li title="婚庆应用"><img src="<%=basePath %>resources_admin/images/app_wedding.png"><br>微喜帖</li>	
			<li title="展示公司、个人的魅力"><img src="<%=basePath %>resources/juju/images/wmp.png" width="65" height="65"><br>微名片</li>	
			<li title="各种插件，提供粉丝数量"><img src="<%=basePath %>resources/juju/images/wtg.png" width="65" height="65"><br>微插件</li>	
			<li title="查看自己粉丝"><img src="<%=basePath %>resources/juju/images/yonghu.png" width="65" height="65"><br>粉丝管理</li>	
		</ul>
	</div>
	<div class="clear"></div>
			<div class="list">
			<div><img src="<%=basePath %>resources_admin/images/list-trade.png"></div>
			<ul>
				<li title="为用户提供在微信公众号里建设一个官方网站的功能，通过几种不同风格的模板，将企业的信息用很优美的形式展现出来，告别以往回复1、回复2这种单调的信息展现形式。">
					<img src="<%=basePath %>resources_admin/images/web.png"><br>微官网
				</li>			
				<li title="为用户提供在微信公众号里商品展示、购买、支付的功能">
					<img src="<%=basePath %>resources_admin/images/shop.png"><br>微商城
				</li>
				<!-- <li><a href="http://admin.gxyidai.com/weixinpl/dingcan.php?customer_id=1504" group="trade_app" onclick="showAlert(this,'您购买的版本不支持此功能，请联系购买高版本')" >
				<img src="<%=basePath %>resources_admin/images/canyin.png"><br>微餐饮</a></li> -->
                <li title="为用户提供在微信公众号里酒店房间全景展示、房间预定、留言的功能">
					<img src="<%=basePath %>resources_admin/images/jiudian.png"><br>微酒店
				</li>
				<!-- <li><a href="http://admin.gxyidai.com/weixinpl/ktv.php?customer_id=1504" group="trade_app"  onclick="showAlert(this,'您购买的版本不支持此功能，请联系购买高版本')" >
				<img src="<%=basePath %>resources_admin/images/ktv.png"><br>KTV</a></li>
				<li><a href="http://admin.gxyidai.com/weixinpl/machine.php?customer_id=1504" group="trade_app" onclick="showAlert(this,'您购买的版本不支持此功能，请联系购买高版本')" >
				<img src="<%=basePath %>resources_admin/images/jiadian.png"><br>家电</a></li>
				<li><a href="http://admin.gxyidai.com/weixinpl/shop.php?customer_id=1504" group="trade_app" onclick="showAlert(this,'您购买的版本不支持此功能，请联系购买高版本')" >
				<img src="<%=basePath %>resources_admin/images/shop.png"><br>微超市</a></li> 
				<li><a href="http://admin.gxyidai.com/weixinpl/wshop.php?customer_id=1504" group="trade_app" onclick="showAlert(this,'您购买的版本不支持此功能，请联系购买高版本')" >
				<img src="<%=basePath %>resources_admin/images/wshop.png"><br>微服装店</a></li>
				<li><a href="http://admin.gxyidai.com/weixinpl/pearl.php?customer_id=1504" group="trade_app" onclick="showAlert(this,'您购买的版本不支持此功能，请联系购买高版本')" >
				<img src="<%=basePath %>resources_admin/images/shoushi.png"><br>微首饰店</a></li>-->
				<li title="为用户提供在微信公众号里汽车商品报价展示、在线预约、留言、客服回复的功能">
					<img src="<%=basePath %>resources_admin/images/app_car.png"><br>微汽车
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