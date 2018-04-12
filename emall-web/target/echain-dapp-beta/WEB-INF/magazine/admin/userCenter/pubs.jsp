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
<title>走农家微信</title>
<script type="text/javascript" src="<%=basePath %>resources_admin/js/jquery.js"></script>
<script type="text/javascript" src="<%=basePath %>resources_admin/js/yyucadapter.js"></script>
<link rel="shortcut icon" href="/favicon.ico" />

 <!-- 授权认证弹框所需要的文件开始  如不需要可以注释掉
<base target="mainFrame">
		<link rel="stylesheet" type="text/css" href="<%=basePath %>resources/css/wedding/bootstrap_min.css" media="all" />
	   	<link rel="stylesheet" type="text/css" href="<%=basePath %>resources/css/wedding/style.css" media="all" />
	     <script type="text/javascript" src="<%=basePath %>resources/js/wedding/jQuery.js"></script>
		<script type="text/javascript" src="<%=basePath %>resources/js/wedding/bootstrap_min.js"></script>
		<script type="text/javascript" src="<%=basePath %>resources/js/wedding/application.js"></script>
		<style type="text/css">.dropdown-submenu:hover>.dropdown-menu{display:none}</style>
		<style type="text/css">
		.auth-modal p{
			text-indent: 2em;
			padding:10px 0;
		}
		.auth-modal div{
			color:#333;
			font-size: 28px;
			padding-bottom: 10px;
		}
		.authu-btn{
			display: inline-block;
			width:100px;
			height:30px;
			line-height: 30px;
			color:#fff;
			background: url(http://stc.weimob.com/img/authu.png);
			text-align: left;
			padding-left: 10px;
		}
		.authu-btn:hover{
			text-decoration:none;
			color:#fff;
		}
		</style> -->
<!-- 授权认证弹框所需要的文件结束 -->
</head>
<body class="theme-blue" data-theme="theme-blue">
	    <div id="main">
        <div class="container-fluid">

            <div class="row-fluid">
                <div class="span12">

                    <div class="box">
                        <div class="box-title">
                            <div class="span6">
                                <h3><i class="icon-table"></i>管理微信公众帐号<span style="color: red;">（后台体验全新升级啦!）</span></h3>
                            </div>

                        </div>

                        <div class="box-content nozypadding">
                            <div class="row-fluid">
                                <div class="span8 control-group">
								<a class="btn" href="<%=basePath %>userinfo/queryUserinfoByUserId/${userInfo.userId}"><i class="icon-cog"></i>管理公众帐号</a>
								<a href="http://wpa.qq.com/msgrd?v=3&uin=545740621&site=qq&menu=yes" target="_blank" class="btn btn-warning" style="cursor:pointer">微妙助手</a> 
                                </div>
                            </div>

                            <div class="row-fluid dataTables_wrapper">
                             <div class="alert">
                                    <strong>温馨提示</strong>：微信公众号配额有限，请珍惜使用名额！ <span class="line"></span>
                               </div>
                                <form method="post" action="" id="listForm">
                                <c:if test="${!empty userInfo}">
                                    <table id="listTable" class="table table-hover table-nomargin table-bordered usertable dataTable">
                                        <thead>
                                            <tr>
                                                <th width="250">公众号名称</th>
                                                <th width="100">升级级别</th>
                                                <th>创建时间/到期时间</th>
                                                <th>会员套餐</th>
                                                <th>已定义/上限</th>
                                                <th>增值服务(已使用/总购买)</th>                                                   
                                               	<th>操作</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                              <tr>
                                                <td style="text-align:center;">   
                                                <c:if test="${!empty userInfo.headshot}">
                                                	<img class="thumb_img" src="<%=basePath %>${userInfo.headshot }" id="pic_apartpic" style="max-width:80px" />
                                                	<br />
                                                </c:if>                                                
                                                 ${userInfo.userName }                                               </td>
                                                 <td>
                                                      普通级别&nbsp;&nbsp;<!-- <a href="/admin/cost/topay.html" style="color: red;">升级</a> -->
                                                </td>
                                                <td style="text-align:left;" width="160">                                                   
                                               		创建时间:<fmt:formatDate value="${userInfo.creatTime }" pattern="yyyy-MM-dd"/><br/>
                                                   	<c:if test="${!empty wxContract.contractExpiredDate}">
                                                   		到期时间:${wxContract.contractExpiredDate }
                                                   	</c:if>
                                                </td>
                                                <td align="center">
													普通会员				
                                                </td>
                                                <td>
                                                   	文本：不限<br />
                                                   	图文：不限<br />
                                                   	语音：不限<br />
                                                   	LBS :  不限<br />
                                                </td>
                                                 <td>
                                                 	<c:if test="${!empty wxSms}">短信：${wxSms.smsHaveUse }/${wxSms.smsTotalNum }条<a href="<%=basePath %>sendSMS/sms_buy.dhtml">(去购买)</a></c:if>
                                                  	<c:if test="${empty wxSms}">短信：0/0条<a href="<%=basePath %>sendSMS/sms_buy.dhtml">(去购买)</a></c:if>
                                                </td>
                                               <td>
                                                    <a href="<%=basePath %>userinfo/queryUserinfoByUserId/${userInfo.userId}" class="btn" rel="tooltip" title="编辑" style="display: block;width: 70px;"><i class="icon-edit"></i>编辑</a>
                                                    <!-- <a href="javascript:;" onClick="delchat(130,this);" class="btn" rel="tooltip" title="删除" style="display: block;margin-top: 10px;width: 70px;"><i class="icon-remove"></i>删除</a> -->
                                                    <a  href="javascript:;" onClick="parent.location.href='<%=basePath %>admin/main.dhtml'" class="btn" rel="tooltip" title="管理" style="display: block;margin-top: 10px;width: 70px;"><i class="icon-cog"></i>管理</a>
                                                </td>
                                            </tr>
                                        										   
										 </tbody>

                                    </table>
                                    </c:if>
                                    </form>
									<div class="dataTables_paginate paging_full_numbers"><span>       </span></div>                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
<script type="text/javascript">
function delchat(uid,o){
	if(confirm('您确定要删除此公众帐号吗?')){
		ajax('/admin/baseService/customPubImpower-'+uid+'-del.html',null,function(m){
			if(m=='ok'){
				tusi('公众号删除成功');
				setTimeout(function(){
					goto(location.href);
				},1500);
			}
		});
	}
}
</script>
<br/><br/><br/>

 <!-- 授权认证弹框所需要的文件开始  如不需要可以注释掉
			<div id="myauthModal" class="modal hide fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false" style="display: block; ">
	        <div class="modal-dialog">
	            <div class="modal-content">
	                    <div class="modal-header">
	                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
	                        <h4 class="modal-title"> 特 别 约 定</h4>
	                    </div>
	                    <div class="modal-body auth-modal">
                      		<p>一、本约定为深圳走农家网络科技有限公司（简称“走农家”）与使用走农家产品及服务的组织或个人（合称“您”）的相关合同的重要组成部分。除非您已阅读并接受本约定所有条款，否则您无权使用走农家提供的产品及服务。您使用走农家的产品及服务即视为您已阅读并同意接受本约定全部条款的约束。</p>
							<p>二、您在使用走农家产品及服务的过程中，可能需要注册一个账号。您保证应当按照“后台实名、前台自愿”的原则，通过真实身份信息认证后注册账号。请您保证妥善保管您的账户及密码，如有不慎丢失，责任由您自行完全承担。</p>
							<p>三、您在使用走农家产品及服务的过程中，您保证您发布或您向第三方推送任何文字、图片、视频、音频、图表等信息时，应当遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性等“七条底线”，禁止发布或转发色情低俗、暴力血腥、政治谣言、时政类新闻等违法违规或有害信息。</p>
							<p>四、您在使用走农家产品及服务的过程中，应当保证切实保护公民的个人身份信息和个人隐私。在未得到用户明确许可或同意之前，您保证不将把用户身份信息和个人隐私提供给任何第三方，保证不向用户发送商业性电子信息。</p>
							<p>五、您保证您不实施如下行为，包括但不限于，通过修改或伪造软件运行中的指令、数据，增加、删减、变动软件的功能或运行效果，或者对软件进行反向工程、反向汇编、反向编译，或者以其他方式尝试发现软件的源代码等方法进行运营或向公众传播，无论这些行为是否为商业目的。</p>
							<p>六、您违反了上述保证或约定的，相关国家行政机关、司法机关、有关组织或个人可能追究您的民事、行政乃至刑事责任。走农家将依法配合有关主管部门履行职责，提供技术支持，并履行报告义务。走农家有权不预先通知地采取消除相关信息、暂停直至终止您使用走农家产品及服务等必要措施，并保留追究您相关法律责任的权利。</p>
	                      
	                    </div>
	                    <div class="modal-footer">
	                    	走农家科技
	                    </div>
	            </div>
	        </div>
	    </div>
			<script>
			$(document).ready(function(){
				var authu=false;
				authu=true;			
				if(authu){
					$("#myauthModal").modal("show");
				}
			});
		</script> -->
	<!-- 授权认证弹框所需要的文件结束-->
 
</body>