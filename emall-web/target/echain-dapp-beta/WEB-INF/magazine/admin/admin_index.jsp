<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="com.hisodata.entity.LoginAdmin"%> 
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false"%> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>

<html style="overflow: hidden;">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="renderer" content="webkit">
<title>中建八局溧水区市民中心工程平台</title>
<script type="text/javascript" src="<%=basePath %>resources_admin/js/jquery.js"></script>
<script type="text/javascript" src="<%=basePath %>resources_admin/js/yyucadapter.js"></script>
<link href="<%=basePath %>resources_admin/css/global.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>resources_admin/css/main.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="<%=basePath %>resources_admin/js/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=basePath %>resources_admin/js/global.js"></script>
 
 
 
 
</head>

<body style="overflow: hidden;">
<script type="text/javascript" src="<%=basePath %>resources_admin/js/jquery.mousewheel.js"></script>
<script type="text/javascript" src="<%=basePath %>resources_admin/js/jquery.jscrollpane.js"></script>
<link href="<%=basePath %>resources_admin/css/jquery.jscrollpane.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<%=basePath %>resources_admin/js/main.js"></script>
<script language="javascript">$(document).ready(main_obj.page_init); window.onresize=main_obj.page_init;</script>
<div id="header">
	<c:if test="${empty wxBasic.basicLogoImages}">	
	<div class="logo"><img src="<%=basePath %>resources_admin/images/jrj.jpeg" style="width:182px;height: 50px;"></div>
	</c:if>
	<c:if test="${not empty wxBasic.basicLogoImages}">	
	<div class="logo"><img src="<%=basePath %>${wxBasic.basicLogoImages}" style="width:182px;height: 50px;"></div>
	</c:if>
	<ul>
		<li class="ico-0"><a href="#" >员工管理</a></li>
        <li class="ico-0"><a href="<%=basePath %>admin/ind.dhtml">用户：<nobr>${admin.userName}</nobr></a></li>
	</ul>
</div>
<div id="main" style="height: auto;">
	<div class="menu" style="overflow: auto; padding: 0px; width: 220px;">
		
	<div class="jspContainer" style="width: 220px; height: 1024px;">
	<div class="jspPane" style="padding: 0px; top: 0px; width: 220px;">
	<dl>
		<dt  group="wechat"> <img src="<%=basePath %>resources_admin/images/m-ico-4.png">员工管理</dt>
		<dd style="display: block;">
	    	<div>+ <a href="<%=basePath %>Jrj/listUsers" target="mainFrame">员工列表</a></div>
	    	<div>+ <a href="<%=basePath %>Jrj/showUser" target="mainFrame">添加员工</a></div>
		</dd>
    	<dt  group="wechat"> <img src="<%=basePath %>resources_admin/images/m-ico-1.png">前端管理员管理</dt>
		<dd style="display: none;">
        	<div>+ <a href="<%=basePath %>Jrj/listAdmins" target="mainFrame">前端管理员列表</a></div>
        	<div>+ <a href="<%=basePath %>Jrj/showAdmin" target="mainFrame">添加前端管理员</a></div>
		</dd>
    	<dt  group="wechat"> <img src="<%=basePath %>resources_admin/images/m-ico-1.png">施工班组管理</dt>
		<dd style="display: none;">
        	<div>+ <a href="<%=basePath %>Jrj/listDepartments" target="mainFrame">施工班组列表</a></div>
        	<div>+ <a href="<%=basePath %>Jrj/showDepartment" target="mainFrame">添加施工班组</a></div>
		</dd>
		<dt  group="wechat"> <img src="<%=basePath %>resources_admin/images/m-ico-1.png">实测实量管理</dt>
		<dd style="display: none;">
        	<div>+ <a href="<%=basePath %>Jrj/listQicais" target="mainFrame">实测实量列表</a></div>
        	<div>+ <a href="<%=basePath %>Jrj/showQicai" target="mainFrame">添加实测实量</a></div>
		</dd>
		<dt  group="wechat"> <img src="<%=basePath %>resources_admin/images/m-ico-1.png">危险源管理</dt>
		<dd style="display: none;">
        	<div>+ <a href="<%=basePath %>Jrj/listWeixianyuans" target="mainFrame">危险源列表</a></div>
        	<div>+ <a href="<%=basePath %>Jrj/showWeixianyuan" target="mainFrame">添加危险源</a></div>
        	<div>+ <a href="<%=basePath %>Jrj/listCheckWeixianyuans" target="mainFrame">危险源签到列表</a></div>
		</dd>
	</dl>
	  </div>
   </div>
</div>
	
	<div class="mainFrame">
	  <iframe src="<%=basePath %>Jrj/listUsers" name="mainFrame" frameborder="0" scrolling="auto"></iframe>
	</div>
	
	<div class="clear"></div>
</div>
<div id="footer">
	<c:if test="${empty wxBasic.basicCopyright}">
	<div class="oem" style="text-align: center;">中建八局溧水区市民中心工程工人信息平台</div>
	</c:if>
	<c:if test="${not empty wxBasic.basicCopyright}">
	<div class="oem" style="text-align: center;"></div>
	</c:if>
</div>
 
</body></html>