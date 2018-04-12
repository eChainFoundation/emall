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

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<!-- Apple devices fullscreen -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<!-- Apple devices fullscreen -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<base target="mainFrame" />
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/index.css" media="all" />
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/bootstrap_min.css" media="all" />
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/bootstrap_responsive_min.css" media="all" />
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/style.css" media="all" />
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/themes.css" media="all" />
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/todc_bootstrap.css" media="all" />
<link rel="stylesheet" type="text/css" href="<%=basePath %>resources_admin/css/wm/inside.css" media="all" />
<title>走农家—东莞吃喝玩乐平台</title>
<script type="text/javascript">var yyuc_jspath = "/@system/";</script>
<script type="text/javascript" src="<%=basePath %>resources_admin/js/jquery.js"></script>
<script type="text/javascript" src="<%=basePath %>resources_admin/js/yyucadapter.js"></script>
<link rel="shortcut icon" href="/favicon.ico" />
</head>
<body class="theme-blue">
<div id="main">
        <div class="row-fluid">
            <div class="span12">
                <div class="box ">
                    <div class="box-title">
                        <h3><i class="icon-user"></i>账户信息<span style="color: red;">（后台体验全新升级啦!）</span></h3>
                    </div>
                    <div class="box-content">

                        <dl class="dl-horizontal">
                            <dt>
                              </dt> 
                            <dd style="margin-left: 20px;">
                            	
                                <p><strong>${userInfo.userName }</strong>：
                                	<c:if test="${userInfo.masterId eq '1'}"><b class="text-warning" style="color: red;">套餐级别：总管理员</b> </c:if>
                                	<c:if test="${userInfo.masterId ne '1'}"><b class="text-warning">套餐级别：普通会员</b>   </c:if>
                                	
                                    <a href="javascript:alert('马上就来,请耐心等待!');"><i class="icon-arrow-up" title="升级"></i>升级</a> 
                                </p>
                                <table class="table noborder">
							    <tbody>
							    <tr>
                                       
                                        <td>开户时间： <fmt:formatDate value="${userInfo.creatTime }" pattern="yyyy/MM/dd hh:mm:ss"/></td>
                                        <td>
                                        	<c:if test="${!empty wxContract.contractExpiredDate}">
                                       			到期时间：<fmt:formatDate value="${wxContract.contractExpiredDate }" pattern="yyyy/MM/dd hh:mm:ss"/>
                                       		</c:if>
                                        </td>
                                        <td>
                                        	续费级别：普通用户                                                                                
                                        </td>
                                        <td>未来级别到期时间：暂无</td>
                                    </tr>
                                    <tr>
                                        <td>微信号 : ${userInfo.weixinId }</td>
                                        <td>公共账号类型 :
											<c:if test="${userInfo.accountType eq 1}">服务号</c:if>
											<c:if test="${userInfo.accountType eq 2}">订阅号</c:if>
										</td>
                                        <td>appId：${userInfo.appId }</td>
                                        <td>审核状态：
											<c:if test="${userInfo.userState eq 0}">未审核</c:if>
											<c:if test="${userInfo.userState eq 1}">已审核</c:if>
										</td>
                                    </tr>
                                </tbody>
                                </table>
                                
								<p><strong>接口地址：</strong><%=basePath %>yzhCourse/main&nbsp;&nbsp;&nbsp;&nbsp;
								<strong>TOKEN：</strong>yzhCourse</p>
								<p> <img src="<%=basePath %>${userInfo.headshot }" style="width: 88px; height: 88px" class="img-rounded"></p>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
        <!-- 
		<div class="row-fluid">
            <div class="box">

                <div class="box-title">
                    <h3>
                        <i class="icon-rocket"></i>
                        快捷操作
                    </h3>
                </div>
                 <div class="box-content">
           <div class="block block-tiles block-tiles-animated clearfix">
                        <a href="/admin/businessModule/wsite.html" target="mainFrame" class="tile tile-themed">
                            <i class="icon-globe "></i>
                            <div class="tile-info"><strong>微官网</strong></div>
                        </a>
                        <a href="/admin/businessModule/microMemberCard.html" class="tile tile-themed">
                            <i class="icon-credit-card"></i>
                            <div class="tile-info"><strong>会员卡</strong></div>
                        </a>
                        <a href="/admin/marketingPromotion/ggk.html" class="tile tile-themed">
                            <i class="icon-hand-up"></i>
                            <div class="tile-info"><strong>刮刮卡</strong></div>
                        </a>
                        <a href="/admin/marketingPromotion/xydzp.html" class="tile tile-themed">
                            <i class="icon-dashboard "></i>
                            <div class="tile-info"><strong>大转盘</strong></div>
                        </a>
						<a href="/admin/marketingPromotion/discountCoupon.html" class="tile tile-themed">
                            <i class="icon-money "></i>
                            <div class="tile-info"><strong>优惠券</strong></div>
                        </a>

                        <a href="/admin/baseService/customMenu.html" class="tile tile-themed">
                            <i class="icon-reorder"></i>
                            <div class="tile-info"><strong>自定义菜单</strong></div>
                        </a>
                        <a href="/admin/baseService/keyWordReply.html" class="tile tile-themed">
                            <i class="icon-comments-alt "></i>
                            <div class="tile-info"><strong>关键词回复</strong></div>
                        </a>
                        <a href="/admin/userCenter/sysapp.html" class="tile not tile-themed">
                            <i class="icon-smile"></i>
                            <div class="tile-info"><strong>微服务</strong></div>
                        </a>
                        <a href="/admin/businessModule/microVote.html" class="tile tile-themed">
                            <i class="icon-thumbs-up"></i>
                            <div class="tile-info"><strong>微投票</strong></div>
                        </a>
                        <a href="javascript:;alert('功能开发中');" class="tile not tile-themed">
                            <i class="icon-tumblr-sign"></i>
                            <div class="tile-info"><strong>微推送</strong></div>
                        </a>
                        <a href="/admin/adds/shopkeyword.html" class="tile tile-themed">
                            <i class="icon-shopping-cart"></i>
                            <div class="tile-info"><strong>微商城</strong></div>
                        </a>
                        <a href="/admin/businessModule/microGroupBuy.html" class="tile not tile-themed">
                            <i class="icon-group"></i>
                            <div class="tile-info"><strong>微团购</strong></div>
                        </a>
                        <a href="/admin/yiliao/guahao.html" class="tile tile-themed">
                            <i class="icon-user-md"></i>
                            <div class="tile-info"><strong>微医疗</strong></div>
                        </a>
                        <a href="/admin/fangchan/loupanjianjie.html" class="tile not tile-themed">
                            <i class="icon-home"></i>
                            <div class="tile-info"><strong>微房产</strong></div>
                        </a>
                       <a href="/admin/lvyou/loupanjianjie.html" class="tile tile-themed">
                            <i class="icon-plane"></i>
                            <div class="tile-info"><strong>微旅游</strong></div>
                        </a>

                        <a href="/admin/xitie/index.html" class="tile tile-themed">
                            <i class="icon-gift"></i>
                            <div class="tile-info"><strong>微喜帖</strong></div>
                        </a>
                        <a href="/admin/adds/canyinkeyword.html" class="tile tile-themed">
                            <i class="icon-food"></i>
                            <div class="tile-info"><strong>微餐饮</strong></div>
                        </a>
						<a href="/admin/businessModule/onlineBooking.html" class="tile tile-themed">
                            <i class="icon-phone-sign"></i>
                            <div class="tile-info"><strong>微预约</strong></div>
                        </a>
                        <a href="/admin/xiangce/set.html" class="tile tile-themed">
                            <i class="icon-picture"></i>
                            <div class="tile-info"><strong>微相册</strong></div>
                        </a>
                         <a href="/admin/liuyan/set.html" class="tile tile-themed">
                            <i class="icon-edit"></i>
                            <div class="tile-info"><strong>微留言</strong></div>
                        </a>
                         <a href="/admin/businessModule/microSurvey.html" class="tile tile-themed">
                            <i class="icon-pencil"></i>
                            <div class="tile-info"><strong>微调研</strong></div>
                        </a>
                         <a href="/admin/car/keyword.html" class="tile tile-themed">
                            <i class="icon-truck"></i>
                            <div class="tile-info"><strong>微汽车</strong></div>
                        </a>

                    </div>
                       <script type="text/javascript">
                          /* $(function () {
                             var $p = window.top.document;
                             var $left_a = $("#left a", $p);
                             var keyArray = new Array;
                             $left_a.each(function () {
                                 keyArray.push($(this).attr("href"))
                             })
                             $(" div.block-tiles a:not(.not)").click(function (e) {
                                 e.preventDefault();
                                 var $this = $(this);
                                 var $h = $(this).attr("href");
                                 var $eq = $.inArray($h, keyArray);
                                 if ($eq) {
                                     window.parent.lfet_select_menu($eq);
                                     if ($this.attr("rel")) {
                                         window.top.location = $h;
                                     } else {
                                         if ($h != "javascript:void(0)") {
                                             $("#mainFrame", $p).attr("src", $h);
                                         }

                                     }
                                 } else {
                                       G.ui.tips.suc("研发中 敬请期待")
                                 }

                             });




                         });
 */
                    </script>
                </div>
            </div>
 
        </div>-->
        </div>









<script type="text/javascript">


</script>
<br/><br/><br/></body>
</html>