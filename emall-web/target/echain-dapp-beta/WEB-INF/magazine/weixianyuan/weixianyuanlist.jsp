
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

		<link rel="stylesheet" href="<%=basePath%>resources/css/bootstrap.min.css" media="screen" />
		<link rel="stylesheet" href="<%=basePath%>resources/css/admin.css" media="screen" />
		<link rel="stylesheet" href="<%=basePath%>resources/css/interact/wsite.css" media="screen" />
		<link rel="stylesheet" href="<%=path %>/resources/css/interact/frame_v4.css" media="screen" />
	    
	    <script type="text/javascript" src="<%=path %>/resources/js/interact/jquery-1.7.2.min.js"></script>
	    <script type="text/javascript" src="<%=path %>/resources/js/interact/bootstrap.min.js"></script>
	    <script src="<%=path %>/resources/js/interact/ZeroClipboard.js"></script>
		<script type="text/javascript">
			function ConfirmDeleB(scratchcard_id )     
	   		{     
	      		if(confirm("\n确认删除活动吗?"))     
	      		{     
	        		location.href="<%=path %>/WxScratchcard/scratchcard_delete/"+scratchcard_id;     
	      		}     
	   		} 
	   		
	 	</script>

<title>危险源管理</title>
<style type="text/css">
<!--
.STYLE2 {color: #000000}
-->
</style>
</head>
<body>

	<div class="top-guide">
	
		<div class="title">危险源管理<span style="margin-left: 4px;">|</span></div>
		<div class="step">
					<a class="btn btn-info" href="<%=basePath %>Jrj/showWeixianyuan">添加危险源</a>
		</div>
	</div>	
    <table class="table table-bordered">
        <thead>
            <tr  class="STYLE2">
					<th>危险源名</th>
					<th>二维码编号</th>
					<th>二维码</th>
					<th>危险源所在地</th>
					<th>危险源负责人</th>
					<th>危险源安装日期</th>
					<th>操作</th>
		  </tr>
        </thead>
        <tbody>
        <c:forEach items="${weixianyuans}" var="weixianyuan">
                    <tr>
                        <td> <font style="font-size: 12px;"> </font>${weixianyuan.weixianyuanName}</td>
                        <td> <font style="font-size: 12px;"> </font>${weixianyuan.id}</td>
                        <td> <font style="font-size: 12px;"> </font><img class="img" src="<%=basePath%>${weixianyuan.qrcode}" width="30px"/></td>
                        <td><font style="font-size: 12px;"> </font>${weixianyuan.area}</td>
                       <td><font style="font-size: 12px;"> </font>${weixianyuan.fuzeren}</td>
                       <td><font style="font-size: 12px;"> </font>${weixianyuan.installTime}</td>
                       <td>  <a href="<%=basePath %>Jrj/showWeixianyuan?id=${weixianyuan.id}">编辑</a>|
                         	<a href="<%=path %>/Jrj/deleteWeixianyuan?id=${weixianyuan.id}" onclick="return confirm('确定要删除这个危险源么？');"><font color="blue">删除</font></a> 
						</td>
                    </tr>
               </c:forEach>     
        </tbody>
        
    </table>
    <c:if test="${currentPage > 0}"><a href="<%=path %>/Jrj/listWeixianyuans?currentPage=${currentPage-1}">[上一页]</a></c:if>
        当前第${currentPage+1}页 每页显示20条 共${allRows}条
    <c:if test="${currentPage*20 < allRows-20}"><a href="<%=path %>/Jrj/listWeixianyuans?currentPage=${currentPage+1}">[下一页]</a></c:if>
    
</body>
</html>
