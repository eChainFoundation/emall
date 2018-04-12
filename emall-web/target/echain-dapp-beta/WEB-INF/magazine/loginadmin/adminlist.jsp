
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

<title>员工列表</title>
<style type="text/css">
<!--
.STYLE2 {color: #000000}
-->
</style>
</head>
<body>

	<div class="top-guide">
	
		<div class="title">管理员管理<span style="margin-left: 4px;">|</span></div>
		<div class="step">
					<a class="btn btn-info" href="<%=basePath %>Jrj/showAdmin">添加管理员</a>
		</div>
	</div>	
    <table class="table table-bordered">
        <thead>
            <tr  class="STYLE2">
					<th>管理员</th>
					<th>真实姓名</th>
					<th>所属部门</th>
					<th>操作</th>
		  </tr>
        </thead>
        <tbody>
        <c:forEach items="${admins}" var="admin">
                    <tr>
                        <td> <font style="font-size: 12px;"> </font>${admin.userName}</td>
                        <td> <font style="font-size: 12px;"> </font>${admin.realName}</td>
                         <td> <font style="font-size: 12px;"> </font>${admin.department}</td>
                       <td>  
                       		<a href="<%=path %>/Jrj/showAdmin?userId=${admin.id}"><font color="blue">修改</font></a> |
                         	<a href="<%=path %>/Jrj/deleteAdmin?adminId=${admin.id}" onclick="return confirm('确定要删除这个用户么？');"><font color="blue">删除</font></a> 
						</td>
                    </tr>
               </c:forEach>     
        </tbody>
        
    </table>
    
</body>
</html>
