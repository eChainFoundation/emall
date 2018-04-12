
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
		
		<c:if test="${message != null}">
			alert("${message}");
		</c:if>
		
			function ConfirmDeleB(scratchcard_id )     
	   		{     
	      		if(confirm("\n确认删除活动吗?"))     
	      		{     
	        		location.href="<%=path %>/WxScratchcard/scratchcard_delete/"+scratchcard_id;     
	      		}     
	   		} 
	   		
	 	</script>

<title>微官网-详细设置</title>
<style type="text/css">
<!--
.STYLE2 {color: #000000}
-->
</style>
</head>
<body>

	<div class="top-guide">
	
		<div class="title">施工班组管理<span style="margin-left: 4px;">|</span></div>
		<div class="step">
					<a class="btn btn-info" href="<%=basePath %>Jrj/showDepartment">添加施工班组</a>
		</div>
	</div>	
    <table class="table table-bordered">
        <thead>
            <tr  class="STYLE2">
					<th>施工班组名 </th>
					<th>编辑 </th>
					<th>删除 </th>
		  </tr>
        </thead>
        <tbody>
        <c:forEach items="${deps}" var="dep">
                    <tr>
                        <td> <font style="font-size: 12px;"> </font>${dep.departmentName }</td>
                       <td>  <a href="<%=basePath %>Jrj/showDepartment?depId=${dep.id}">编辑</a></td>
                       <td>
                         	<a href="<%=path %>/Jrj/deleteDep?departmentId=${dep.id}" onclick="return confirm('确定要删除这个施工班组么？');"><font color="blue">删除</font></a>
						</td>
                    </tr>
               </c:forEach>     
        </tbody>
        
    </table>
    <c:if test="${currentPage > 0}"><a href="<%=path %>/User/searchUser?currentPage=${currentPage-1}&userName=${userName}&email=${email}&phoneNumber=${phoneNumber}">[上一页]</a></c:if>
        每页显示10条 共${allRows}条
        <c:if test="${currentPage*10 < allRows-10}"><a href="<%=path %>/User/searchUser?currentPage=${currentPage+1}&userName=${userName}&email=${email}&phoneNumber=${phoneNumber}">[下一页]</a></c:if>
    
</body>
</html>
