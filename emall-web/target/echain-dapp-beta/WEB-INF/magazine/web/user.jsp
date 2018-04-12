<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ page isELIgnored="false" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
<meta id="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<link href="<%=basePath %>resources/zounongjia/css/common.css" rel="stylesheet">
<link href="<%=basePath %>resources/zounongjia/css/pinwang.cc.css" rel="stylesheet"> 
<link href="<%=basePath %>resources/zounongjia/css/jquery-ui.css" rel="stylesheet">

<title>中建八局溧水区市民中心工程工人信息平台</title>
</head>

<body>
	<div class="w768">
        <!-- head 
        <div class="clearfix head">
            中建八局溧水区市民中心工程工人信息平台
        </div>
        head End -->
        
        <!-- content -->
         <div class="userBanner">
        <a href="#">
	    		<p class="tc"><img src="<%=basePath %>${user.userPhoto}" class="portrait"></p>
        </a>
        </div>

        <ul class="uDataUl mt15">
        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>${user.realName}</p>姓名</li></a>
        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>${user.birthday}</p>出生年月</li></a>
        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>${user.anquanmaoNo}</p>安全帽编号</li></a>
        	
        	<c:if test="${user.status eq '0'}">
	        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>
	        			<c:if test="${user.isSafeStudy == null}">否</c:if>
	        			<c:if test="${user.isSafeStudy eq '1'}">是</c:if>
	        			<c:if test="${user.isSafeStudy eq '0'}">否</c:if>
	        		</p>是否入场安全学习</li></a>
	        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>
	        			<c:if test="${user.morningSaveStudy == null}">否</c:if>
	        			<c:if test="${user.morningSaveStudy eq '1'}">是</c:if>
	        			<c:if test="${user.morningSaveStudy eq '0'}">否</c:if>
	        		</p>是否早班安全学习</li></a>
	        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>${user.workDate}</p>入场时间</li></a> 
	        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>${user.department}</p>施工班组</li> </a>
	        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>${user.leader}</p>施工班组长</li> </a>
	        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>${user.dormitoryNo}</p>宿舍号</li> </a>
	        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>${user.citizenCard}</p>市民卡</li> </a>
	        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>${user.weigui}</p>违规记录</li> </a>
        	</c:if>
      		<c:if test="${user.status eq '1'}">
        		<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>${user.department}</p>部门</li> </a>
        		<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>${user.zhiwu}</p>职务</li> </a>
        		<a href="#" data-ajax="false"><li class="clearfix"><p class="fr"><span class="arrow"></span>
	        			<c:if test="${user.isDaiban == null}">否</c:if>
	        			<c:if test="${user.isDaiban eq '1'}">是</c:if>
	        			<c:if test="${user.isDaiban eq '0'}">否</c:if>
	        		</p>是否带班教育</li></a>
        	</c:if>
        </ul>
        
        <!-- content End -->
    </div>
    
    
    
</body>
</html>