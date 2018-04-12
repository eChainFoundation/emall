<%@ page language="java" contentType="text/html; charset=gbk"
    pageEncoding="gbk"%>
    <%@ page import="java.io.*" %> 
 <%
  	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="pragma" content="no-cache">  
<meta http-equiv="cache-control" content="no-cache">  
<meta http-equiv="expires" content="0"> 
<title>Insert title here</title>
</head>
<body>
<script type="text/javascript" src="<%=basePath %>ckeditor/ckeditor.js"></script>

<% 
response.setHeader("Cache-Control","no-cache"); //HTTP 1.1    
response.setHeader("Pragma","no-cache"); //HTTP 1.0    
response.setDateHeader ("Expires", 0); //prevents caching at the proxy server 
String file=request.getParameter("showImagePath");
//System.out.println("************************"+request.getParameter("showImagePath"));
//System.out.println("************************"+request.getAttribute("showImagePath"));


//System.out.println("::::::::::::::::::"+request.getQueryString());
//System.out.println("::::::::::::::::::"+request.getRequestURI());
FileInputStream in = new FileInputStream(new File(file)); 
OutputStream o = response.getOutputStream(); 
  int l = 0; 
  byte[] buffer = new byte[4096]; 
while((l = in.read(buffer)) != -1){ 
o.write(buffer,0,l); 
} 
o.flush(); 
in.close(); 
o.close(); 

%> 

</body>
</html>