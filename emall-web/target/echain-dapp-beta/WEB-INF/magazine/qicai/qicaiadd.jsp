
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core_rt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page isELIgnored="false"%> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String OAthu2_path = request.getServerName();
%>
<!DOCTYPE html>
<html lang="">
<head>
	<title>欢迎您使用溧水区市民中心工程平台</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
	<link rel="stylesheet" href="<%=basePath%>resources/css/base.css" />
	<link rel="stylesheet" href="<%=basePath%>resources/css/template1.css" />
	<link rel="stylesheet" href="<%=basePath%>resources/css/font-awesome.min.css" />
	<link rel="stylesheet" href="<%=basePath%>resources/css/interact/wsite.css" media="screen" />
	<link href="<%=basePath %>resources/css/bundle-bundle_bootstrap_head.css" type="text/css" rel="stylesheet" media="screen, projection" />
	<link href="<%=basePath %>resources/css/bundle-bundle_fontawesome_head.css" type="text/css" rel="stylesheet" media="screen, projection" />
	<link href="<%=basePath %>resources/css/bundle-bundle_bootstrap_utils_head.css" type="text/css" rel="stylesheet" media="screen, projection" />
	<link href="<%=basePath %>resources/css/bundle-bundle_jqueryui_head.css" type="text/css" rel="stylesheet" media="screen, projection" />
	<link rel="stylesheet" href="<%=path %>/resources/css/interact/jquery-ui-1.10.0.custom.min.css" media="screen" />
	<link rel="stylesheet" href="<%=path %>/resources/css/interact/jquery-ui-timepicker-addon.css" media="screen" />
	<meta name="layout" content="kickstart"/>
	<link rel="stylesheet" href="<%=basePath %>resources/css/bundle-bundle-manage.css" />
	<!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
	<!--[if lt IE 9]>
		<script src="https://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<style type="text/css">
		body * {font-family: 微软雅黑;}
		#Header .title {font-size: 36px;}
		h1 {font-size: 26px;}
		h2 {font-size: 25px;}
		h3 {font-size: 20px;}
		section p {font-size: 18px; line-height: 25px;}
		.table th, .table td {text-align: center;vertical-align: middle;}
		.first {margin-top:10px}
		.navbar-fixed-bottom,.navbar-fixed-top{z-index:10000}
	</style>
	
	<!-- 上传所需文件 -->
	<script type="text/javascript" src="<%=basePath%>resources/material/js/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="<%=basePath%>resources/js/jquery.js"></script>
	<link rel="stylesheet" type="text/css" href="<%=basePath %>resources/material/css/default/om-default.css" />
	<script type="text/javascript" src="<%=basePath%>resources/material/js/operamasks-ui.min.js"></script>	
	<script type="text/javascript" src="<%=path %>/resources/js/interact/jquery-ui-1.10.0.custom.min.js"></script>
	<script type="text/javascript" src="<%=path %>/resources/js/interact/jquery-ui-timepicker-addon.js"></script>
    <script type="text/javascript" src="<%=path %>/resources/js/interact/jquery-ui-timepicker-zh-CN.js"></script>
	
	<script type="text/javascript">
			 $(function () {
			
			  $('#file_upload').omFileUpload({
			    action : '<%=path%>/OmFileUploadServlet',
			    swf : '<%=basePath%>resources/material/swf/om-fileupload.swf',
			    buttonText:'选择图片',
			    sizeLimit : 5028000,
			     onError:function(ID,fileObj,errorObj,event){
					if(errorObj.type == "File Size"){
						alert("上传图片(微信接口中设置)的大小不能超过5M");					
					}
				},
			    autoUpload: true,
				 onComplete : function(ID,fileObj,response,data,event){
		            var myDate = new Date();
					var nian = myDate.getFullYear(); 
					var yue = myDate.getMonth()+1; 
					yue =(yue<10 ? "0"+yue:yue); 
					var ri = myDate.getDate();
					ri =(ri<10 ? "0"+ri:ri);
		            var jsonData = eval("("+response+")");
		            var a = jsonData.fileUrl.split("/");
		            var b = a.length;
		            var str  = a[b-1].toString();
		           var url = 'static/image/'+nian+'/'+yue+'/'+ri+'/'+str;
			    	$('.cover-bd').html('<img class="img" src="<%=basePath%>'+url+'"/> <input type="hidden" id="idpictemp" name="tupian" value="'+url+'" />');
		        }
			  });
			 
			});
			
			</script>
			<script type="text/javascript">
			<script type="text/javascript">
			function checkForm($form) {
				var result = true;
				$form.find('input[required=true]').each(function(){
					if(!$.trim($(this).val())) {
						return false;
					}
					
				});
				return true;
			}
			
			</script>
</head>
<body>
<div id="Content" class="container" style="min-height:850px">
	<div class="row row-offcanvas row-offcanvas-right">
	<style>
		<!--
		td:last-child {text-align:left}
		input {width:300px}
		-->
	</style>
<form id="main_form" name="main_form" action="<%=basePath %>Jrj/saveOrUpdateQicai" method="post" onsubmit="if(checkForm($(this))) doSubmit($(this)); return false;">
	<div class="top-guide">
	
		<div class="title">实测实量管理<span style="margin-left: 4px;">|</span></div>
		<div class="step">实测实量编辑 
		</div>
	</div>	
<input type="hidden" value="9" name="agent.id">
<section style="padding-top:0">
	<table class="table table-bordered">
		<tbody>
		<input type="hidden" name="id" value="${qicai.id}" id="id" />
			<tr>
				<td style="width:200px">实测实量名</td>
      			<td>
      				<input type="text" maxlength="50" name="qicaiName" required="true" value="${qicai.qicaiName}" id="qicaiName" />
      			</td>
			</tr>
			<tr>
				<td style="width:200px">实测实量图片</td>
      			<td>
      				<div class="cover-area" style="width: 500px">
						<div class="cover-hd">
							<input id="file_upload" name="file_upload" type="file" />
						</div>
						<p id="upload-tip" class="upload-tip">
							图片的大小不能超过5M
						</p>
						<p class="img-area cover-bd">
							<img class="img" src="<%=basePath%>${qicai.tupian}"/>
							<input id="logo" class="cover-input" value="${qicai.tupian}" name="tupian" type="hidden" width="100px"/>
						</p>
					</div>	
      			</td>
			</tr>
			<tr>
				<td style="width:200px">二维码</td>
      			<td>
      				<img class="img" src="<%=basePath%>${qicai.qrcode}" width="100px"/>
      				<input type="hidden" name="qrcode" value="${qicai.qrcode}" id="qrcode">
      			</td>
			</tr>
			
			<tr>
				<td style="width:200px">工程名</td>
      			<td>
      				<input type="text" name="projectName" value="溧水市民中心工程" id="projectName">
      			</td>
			</tr>
			<tr>
				<td style="width:200px">垂直度</td>
      			<td>
      				<input type="text" name="chuizhidu" value="${qicai.chuizhidu}" id="chuizhidu" required="true">
      			</td>
			</tr>
			<tr>
				<td style="width:200px">平整度</td>
      			<td>
      				<input type="text" name="pingzhengdu" value="${qicai.pingzhengdu}" id="pingzhengdu" required="true">
      			</td>
			</tr>
			<tr>
				<td style="width:200px">截面尺寸误差</td>
      			<td>
      				<input type="text" name="jiemianwucha" value="${qicai.jiemianwucha}" id="jiemianwucha" required="true">
      			</td>
			</tr>
			<tr>
				<td style="width:200px">标高误差</td>
      			<td>
      				<input type="text" name="biaogaowucha" value="${qicai.biaogaowucha}" id="biaogaowucha" required="true">
      			</td>
			</tr>
			<tr>
				<td style="width:200px">劳务班组</td>
      			<td>
      				<input type="text" name="laowubanzu" value="${qicai.laowubanzu}" id="laowubanzu" required="true">
      			</td>
			</tr>
			<tr>
				<td style="width:200px">轴线位置</td>
      			<td>
      				<input type="text" name="zhouxianweizhi" value="${qicai.zhouxianweizhi}" id="zhouxianweizhi" required="true">
      			</td>
			</tr>
  			<tr>
				<td style="width:200px">观感质量</td>
      			<td>
      				<input type="text" name="guanganzhiliang" value="${qicai.guanganzhiliang}" id="guanganzhiliang" required="true">
      			</td>
			</tr>
  			<tr>
				<td style="width:200px">检察人员</td>
      			<td>
      				<input type="text" name="jiancharenyuan" value="${qicai.jiancharenyuan}" id="jiancharenyuan" required="true">
      			</td>
			</tr>
			<tr>
				<td style="width:200px">总承包单位</td>
      			<td>
      				<input type="text" name="zongchengbaodanwei" id="zongchengbaodanwei" value="中建八局第三建设有限公司">
      			</td>
			</tr>
			<tr>
				<td></td>
				<td style="border-left:none">
					<button class="submitBtn btn btn-success">保存</button>
					<a href="javascript:window.history.back();" class="btn btn-default">返回</a>
				</td>
			</tr>
		</tbody>
	</table>
</section>
</form>


	
	</div>
</div>
</body>

</html>