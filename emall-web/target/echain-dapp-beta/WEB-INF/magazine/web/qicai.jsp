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
	    		<p class="tc"><img src="<%=basePath %>${qicai.tupian}" class="portrait"></p>
        </a>
        </div>

        <ul class="uDataUl mt15">
        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr">${qicai.projectName}</p>工程名</li></a>
        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr">${qicai.chuizhidu}</p>垂直度</li></a>
        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr">${qicai.pingzhengdu}</p>平整度</li></a>
        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr">${qicai.jiemianwucha}</p>截面尺寸误差</li></a>
        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr">${qicai.biaogaowucha}</p>标高误差</li></a>
        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr">${qicai.laowubanzu}</p>劳务班组</li></a>
        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr">${qicai.zhouxianweizhi}</p>轴线位置</li></a>
        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr">${qicai.guanganzhiliang}</p>观感质量</li></a>
        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr">${qicai.jiancharenyuan}</p>检察人员</li></a>
        	<a href="#" data-ajax="false"><li class="clearfix"><p class="fr">${qicai.zongchengbaodanwei}</p>总承包单位</li></a>
        	
        </ul>
        
        <!-- content End -->
    </div>
    
    
    
</body>
</html>