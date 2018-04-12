
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
	
		<div class="title">用户管理<span style="margin-left: 4px;">|</span></div>
		<div class="step">
					<a class="btn btn-info" href="<%=basePath %>Jrj/showUser">添加用户</a>
		</div>
	</div>	
	<form action="<%=basePath %>/Jrj/listUsers" name="form" method="post">
	施工班组:<select name="departmentId"> 
		<option value ="${department.id}">${department.departmentName}</option>
		<c:forEach items="${deps}" var="dep">
			<option value ="${dep.id}">${dep.departmentName}</option> 
		</c:forEach> 
	</select>
	是否入场安全学习<select name="isSafeStudy"> 
		<option value =""></option>
		<option value ="1" <c:if test="${isSafeStudy eq '1'}">selected</c:if>>是</option>
		<option value ="0" <c:if test="${isSafeStudy eq '0'}">selected</c:if>>否</option>
	</select>
	<br/>
	是否早班安全学习<select name="morningSaveStudy"> 
		<option value =""></option>
		<option value ="1" <c:if test="${morningSaveStudy eq '1'}">selected</c:if>>是</option>
		<option value ="0" <c:if test="${morningSaveStudy eq '0'}">selected</c:if>>否</option>
	</select>
	是否办理市民卡<select name="citizenState"> 
		<option value =""></option>
		<option value ="1" <c:if test="${citizenState eq '1'}">selected</c:if>>是</option>
		<option value ="0" <c:if test="${citizenState eq '0'}">selected</c:if>>否</option>
	</select>
	<input type="submit" value="查询"/>
	</form>
    <table class="table table-bordered">
        <thead>
            <tr  class="STYLE2">
					<th>姓名</th>
					<th>二维码编号</th>
					<th>二维码</th>
					<th>入场时间</th>
					<th>是否入场安全学习</th>
					<th>是否早班安全学习</th>
					<th>施工班组</th>
					<th>宿舍号</th>
					<th>操作</th>
		  </tr>
        </thead>
        <tbody>
        <c:forEach items="${users}" var="user">
                    <tr>
                        <td> <font style="font-size: 12px;"> </font>${user.realName}</td>
                        <td> <font style="font-size: 12px;"> </font>${user.id}</td>
                        <td> <font style="font-size: 12px;"> </font><img class="img" src="<%=basePath%>${user.qrcode}" width="30px"/></td>
                        <td><font style="font-size: 12px;"> </font>${user.workDate}</td>
                        <td> <font style="font-size: 12px;"> </font>
						<c:if test="${user.isSafeStudy eq '1'}">是</c:if>
						<c:if test="${user.isSafeStudy eq '0'}">否</c:if>
						</td>
                        <td> <font style="font-size: 12px;"> </font>
						<c:if test="${user.morningSaveStudy eq '1'}">是</c:if>
						<c:if test="${user.morningSaveStudy eq '0'}">否</c:if>
						</td>
                       <td><font style="font-size: 12px;"> </font>${user.department}</td>
                       <td><font style="font-size: 12px;"> </font>${user.dormitoryNo}</td>
                       
                       <td>  <a href="<%=basePath %>Jrj/showUser?userId=${user.id}">编辑</a>|
                         	<a href="<%=path %>/Jrj/deleteUser?userId=${user.id}" onclick="return confirm('确定要删除这个用户么？');"><font color="blue">删除</font></a> 
						</td>
                    </tr>
               </c:forEach>     
        </tbody>
        
    </table>
    <c:if test="${currentPage > 0}"><a href="<%=path %>/Jrj/listUsers?currentPage=${currentPage-1}&departmentId=${departmentId}&isSafeStudy=${isSafeStudy}&morningSaveStudy=${morningSaveStudy}&citizenState=${citizenState}">[上一页]</a></c:if>
        每页显示20条 共${allRows}条
    <c:if test="${currentPage*20 < allRows-20}"><a href="<%=path %>/Jrj/listUsers?currentPage=${currentPage+1}&departmentId=${departmentId}&isSafeStudy=${isSafeStudy}&morningSaveStudy=${morningSaveStudy}&citizenState=${citizenState}">[下一页]</a></c:if>
    
</body>
</html>
