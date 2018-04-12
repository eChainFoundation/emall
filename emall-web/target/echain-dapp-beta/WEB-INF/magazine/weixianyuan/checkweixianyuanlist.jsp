
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

<title>危险源签到列表</title>
<style type="text/css">
<!--
.STYLE2 {color: #000000}
-->
</style>
</head>
<body>

	<div class="top-guide">
	
		<div class="title">危险源签到列表<span style="margin-left: 4px;"></span></div>
		<div class="step">
					
		</div>
	</div>	
	<form action="<%=basePath %>/Jrj/listCheckWeixianyuans" name="form" method="post">
	危险源:<select name="weixianyuanId"> 
		<option value ="${wxy.id}">${wxy.weixianyuanName}</option>
		<c:forEach items="${wxys}" var="wx">
			<option value ="${wx.id}">${wx.weixianyuanName}</option> 
		</c:forEach> 
	</select>
	签到人：<select name="checkUserId"> 
		<option value ="${lau.id}">${lau.realName}</option>
		<c:forEach items="${las}" var="la">
			<option value ="${la.id}">${la.realName}</option> 
		</c:forEach> 
	</select>
	<input type="submit" value="查询"/>
	</form>
    <table class="table table-bordered">
        <thead>
            <tr  class="STYLE2">
					<th>签到人</th>
					<th>签到人所在部门</th>
					<th>危险源</th>
					<th>危险源所在地</th>
					<th>签到时间</th>
		  </tr>
        </thead>
        <tbody>
        <c:forEach items="${checkWeixianyuans}" var="cw">
                    <tr>
                        <td> <font style="font-size: 12px;"> </font>${cw.realName}</td>
                        <td> <font style="font-size: 12px;"> </font>${cw.department}</td>
                        <td> <font style="font-size: 12px;"> </font><a href="<%=basePath %>Jrj/showWeixianyuan?id=${cw.weixianyuanId}">${cw.weixianyuanName}</a></td>
                        <td><font style="font-size: 12px;"> </font>${cw.area}</td>
                        <td><font style="font-size: 12px;"> </font>${cw.checkTime}</td>
                    </tr>
               </c:forEach>     
        </tbody>
        
    </table>
    <c:if test="${currentPage > 0}"><a href="<%=path %>/Jrj/listCheckWeixianyuans?currentPage=${currentPage-1}&weixianyuanId=${wxy.id}&checkUserId=${lau.id}">[上一页]</a></c:if>
        当前第${currentPage+1}页 每页显示20条 共${allRows}条
    <c:if test="${currentPage*20 < allRows-20}"><a href="<%=path %>/Jrj/listCheckWeixianyuans?currentPage=${currentPage+1}&weixianyuanId=${wxy.id}&checkUserId=${lau.id}">[下一页]</a></c:if>
    
</body>
</html>
