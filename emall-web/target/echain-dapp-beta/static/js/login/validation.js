	
/**自定义JQuery插件*/

	/**@author  zhuxw*/

/**非空验证：*/
//errorContent参数为待验证的JQuery文本对象，
//errorMsg为字符串表示提示信息
$.fn.notNullRequired = function(errorContent, errorMsg) {
	var val =  $.trim($(this).val());
	$(errorContent).attr('class','error_msg');
	$(errorContent).attr('class','error_msg');
	$(errorContent).css({'font-weight':'','color':'red'});
	if (val != null && val.length > 0) {
		$(this).removeClass('input_error');
		$(errorContent).css('visibility','hidden');
		$(errorContent).text("");
		return true;
	} else {
		$(this).attr('class','input_error');
		$(errorContent).css('visibility','visible');
		$(errorContent).text(errorMsg);
		return false;
	}
}

/**最大长度验证和非空验证综合：*/
//minLength为指定的最小长度
//errorContent参数为待验证的JQuery文本对象，
//errorMsg1为字符串表示超过指定长度的提示信息
//errorMsg2为字符串表示为空值时候的提示信息
$.fn.maxLength = function(maxLength, errorContent, errorMsg1,errorMsg2) {
	var val =  $.trim($(this).val()); 
	$(errorContent).attr('class','error_msg');
	$(errorContent).css({'font-weight':'','color':'red'});
	if (val != "" && val.length <= maxLength) {
		$(this).removeClass('input_error');
		$(errorContent).css('visibility','hidden');
		$(errorContent).text("");
		return true;
	}else if(val == ""){
		$(this).attr('class','input_error');
		$(errorContent).css('visibility','visible');
		$(errorContent).text(errorMsg2);		
		return false;
	}else {
		$(this).attr('class','input_error');
		$(errorContent).css('visibility','visible');
		$(errorContent).text(errorMsg1);		
		return false;
	}
}

/**最大长度验证：*/
//minLength为指定的最小长度
//errorContent参数为待验证的JQuery文本对象，
//errorMsg为字符串表示超过指定长度的提示信息
$.fn.maxLength2 = function(maxLength, errorContent, errorMsg) {
	var val =  $.trim($(this).val()); 
	$(errorContent).attr('class','error_msg');
	$(errorContent).css({'font-weight':'','color':'red'});
	if (val.length <= maxLength) {
		$(this).removeClass('input_error');
		$(errorContent).css('visibility','hidden');
		$(errorContent).text("");
		return true;
	}else {
		$(this).attr('class','input_error');
		$(errorContent).css('visibility','visible');
		$(errorContent).text(errorMsg);
		return false;
	}
}

/**最大长度验证和非空验证以及不可包含特殊字符验证之综合：*/
//minLength为指定的最小长度
//errorContent参数为待验证的JQuery文本对象，
//errorMsg1为字符串表示超过指定长度的提示信息
//errorMsg2为字符串表示为空值时候的提示信息
$.fn.maxLength3 = function(maxLength, errorContent, errorMsg1,errorMsg2) {
	var val =  $.trim($(this).val()); 
	$(errorContent).attr('class','error_msg');
	$(errorContent).css({'font-weight':'','color':'red'});
	var reg = /^[\u4e00-\u9fa5A-Za-z0-9]+$/;
	 if(val == ""){
			$(this).attr('class','input_error');
			$(errorContent).css('visibility','visible');
			$(errorContent).text(errorMsg2);		
			return false;
		}else if(reg.test(val)){
			if (val != "" && val.length <= maxLength) {
				$(this).removeClass('input_error');
				$(errorContent).css('visibility','hidden');
				$(errorContent).text("");
				return true;
			}else {
				$(this).attr('class','input_error');
				$(errorContent).css('visibility','visible');
				$(errorContent).text(errorMsg1);		
				return false;
			}
		}else{
			$(this).attr('class','input_error');
			$(errorContent).css('visibility','visible');
			$(errorContent).text("不能含有特殊字符");
			return false;
		}
}	

/**整数或小数验证*/
$.fn.validateNumber = function(errorContent,errorMsg) {
	//首先获得文本框中的值
	var val = $.trim($(this).val()); 
	$(errorContent).attr('class','error_msg');
	var reg = /^\d+(\.\d+)?$/;
	$(errorContent).css({'font-weight':'','color':'red'});
	if(reg.test(val)){
		$(this).removeClass('input_error');
	   $(errorContent).css('visibility','hidden');
		$(errorContent).text("");
		return true;
	}else{			
		$(this).attr('class','input_error');
		$(errorContent).css('visibility','visible');
		$(errorContent).text(errorMsg);			
		return  false;			
	}
}

/**版本号验证*/
$.fn.validateVersionNumber = function(errorContent) {
	//首先获得文本框中的值
	var val = $.trim($(this).val()); 
	$(errorContent).attr('class','error_msg');
	var reg = /^\d+(\.\d){1,2}$/;
	$(errorContent).css({'font-weight':'','color':'red'});
	if(reg.test(val)){
		   $(this).removeClass('input_error');
		   $(errorContent).css('visibility','hidden');
		   $(errorContent).text("");
		return true;
	}else{			
			$(this).attr('class','input_error');
			$(errorContent).css('visibility','visible');
			$(errorContent).text("版本号不正确(eg:x.x/x.x.x)");			
			return  false;			
	}
}

/**手机号码验证*/
$.fn.validateMobile = function(mobile_span) {
	var flag = true;
	//首先获得文本框中的值
	var mobileValue = $(this).val();
	$(mobile_span).attr('class','error_msg');
	var reg = /^[1][3-8]+\d{9}$/;
	$(mobile_span).css({'font-weight':'','color':'red'});
	if(reg.test(mobileValue)){
		$(this).removeClass('input_error');
		$(mobile_span).css('visibility','hidden');
		$(mobile_span).text("");
		flag = true;
	}else if(mobileValue==""){
		$(this).attr('class','input_error');
		flag = false;
		$(mobile_span).css('visibility','visible');
		$(mobile_span).text("手机号码不能为空");
	}else{
		$(this).attr('class','input_error');
		$(mobile_span).css('visibility','visible');
		$(mobile_span).text("请输入正确的手机号码");
		flag = false;
	}
	return flag;
}

/**QQ号码验证：*/
$.fn.validateQQ = function(qq_span) {
	var flag = true;
	//首先获得文本框中的值
	var qqValue = $(this).val();    
	$(qq_span).attr('class','error_msg');
	var reg =/^[1-9][0-9]{4,10}$/;
	$(qq_span).css({'font-weight':'','color':'red'});
	if(reg.test(qqValue)){
		$(this).removeClass('input_error');
		$(qq_span).css('visibility','hidden');
		$(qq_span).text("");
		flag = true;
	}else if(qqValue==""){
		$(this).attr('class','input_error');
		flag = false;
		$(qq_span).css('visibility','visible');
		$(qq_span).text("QQ号码不能为空");
	}else{
		$(this).attr('class','input_error');
		$(qq_span).css('visibility','visible');
		$(qq_span).text("请输入正确的QQ号码");
		flag = false;
	}
	return flag;
}

/**国内固定电话号码验证*/
$.fn.validateTelephone = function(telephone_span) {
	var flag = true;
	//首先获得文本框中的值
	var telephoneValue = $(this).val();
	$(telephone_span).attr('class','error_msg');
	var reg = /^(\d{3}-|\d{4}-)(\d{8}|\d{7})$/;
	$(telephone_span).css({'font-weight':'','color':'red'});
	if(reg.test(telephoneValue)){
		$(this).removeClass('input_error');
		$(telephone_span).css('visibility','hidden');
		$(telephone_span).text("");
		flag = true;
	}else if(telephoneValue==""){
		$(this).attr('class','input_error');
		flag = false;
		$(telephone_span).css('visibility','visible');
		$(telephone_span).text("固定电话号码不能为空");
	}else{
		$(this).attr('class','input_error');
		$(telephone_span).css('visibility','visible');
		$(telephone_span).text("请输入正确的固定电话号码(eg:0510-88888888)");
		flag = false;
	}
	return flag;
}

/**email验证*/
$.fn.validateEmail = function(email_span) {
	var flag = true;
	//首先获得文本框中的值
	var emailValue = $(this).val();
	$(email_span).attr('class','error_msg');
	var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	$(email_span).css({'font-weight':'','color':'red'});
	if(reg.test(emailValue)){
		$(this).removeClass('input_error');
		$(email_span).css('visibility','hidden');
		$(email_span).text("");
		flag = true;
	}else if(emailValue==""){
		$(this).attr('class','input_error');
		flag = false;
		$(email_span).css('visibility','visible');
		$(email_span).text("邮箱不能为空");
	}else{
		$(this).attr('class','input_error');
		$(email_span).css('visibility','visible');
		$(email_span).text("请输入正确的邮箱");
		flag = false;
	}
	return flag;
}

/**分机号验证*/
$.fn.validateExtension = function(extension_span) {
	var flag = true;
	//首先获得文本框中的值
	var extensionValue = $(this).val();
	$(extension_span).attr('class','error_msg');
	var reg = /^\d{2,4}$/;//2位到4位分机号
	$(extension_span).css({'font-weight':'','color':'red'});
	if(reg.test(extensionValue)){
		$(this).removeClass('input_error');
		$(extension_span).css('visibility','hidden');
		$(extension_span).text("");
		flag = true;
	}else if(extensionValue==""){
		$(this).attr('class','input_error');
		flag = false;
		$(extension_span).css('visibility','visible');
		$(extension_span).text("分机号不能为空");
	}else{
		$(this).attr('class','input_error');
		$(extension_span).css('visibility','visible');
		$(extension_span).text("请输入正确的分机号(2-4位)");
		flag = false;
	}
	return flag;
}

/**日期验证*/
$.fn.validateDate = function() {
	var INDate =$(this).val();
	{ if (INDate=="")  
		    {return true;}  
		 subYY=INDate.substr(0,4)  
		 if(isNaN(subYY) || subYY<=0){  
		  return true;  
		 }  
		 //转换月份  
		 if(INDate.indexOf('-',0)!=-1){ separate="-"}  
		 else{  
		  if(INDate.indexOf('/',0)!=-1){separate="/"}  
		  else {return true;}  
		  }  
		  area=INDate.indexOf(separate,0)  
		  subMM=INDate.substr(area+1,INDate.indexOf(separate,area+1)-(area+1))  
		  if(isNaN(subMM) || subMM<=0){  
		  return true;  
		 }  
		  if(subMM.length<2){subMM="0"+subMM}  
		 //转换日  
		 area=INDate.lastIndexOf(separate)  
		 subDD=INDate.substr(area+1,INDate.length-area-1)  
		 if(isNaN(subDD) || subDD<=0){  
		  return true;  
		 }  
		 if(eval(subDD)<10){subDD="0"+eval(subDD)}  
		 NewDate=subYY+"-"+subMM+"-"+subDD  
		 if(NewDate.length!=10){return true;}  
		    if(NewDate.substr(4,1)!="-"){return true;}  
		    if(NewDate.substr(7,1)!="-"){return true;}  
		 var MM=NewDate.substr(5,2);  
		 var DD=NewDate.substr(8,2);  
		 if((subYY%4==0 && subYY%100!=0)||subYY%400==0){ //判断是否为闰年  
		  if(parseInt(MM)==2){  
		   if(DD>29){return true;}  
		  }  
		 }else{  
		  if(parseInt(MM)==2){  
		   if(DD>28){return true;}  
		 }   
		 }  
		 var mm=new Array(1,3,5,7,8,10,12); //判断每月中的最大天数  
		 for(i=0;i< mm.length;i++){  
		  if (parseInt(MM) == mm[i]){  
		   if(parseInt(DD)>31){return true;}  
		  }else{  
		   if(parseInt(DD)>30){return true;}  
		  }  
		 }  
		 if(parseInt(MM)>12){return true;}  
		   return false;}  
}

/**日期验证（带提示信息的（要用到上面的validateDate插件））*/
$.fn.checkDate = function checkStartDate(date_error_span){	
	var val = $.trim($(this).val()); 
	var flag = $(this).validateDate();
	$(date_error_span).attr('class','error_msg');
	//var reg = /^\d{4}-\d{1,3}-\d{1,3}$/
	var reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/; 
	if(!reg.test(val)){
		$(this).attr('class','input_error');
		$(date_error_span).css('visibility','visible');
		$(date_error_span).css({'font-weight':'','color':'red'});		
		$(date_error_span).text("日期不正确(eg:1991-01-09)");
		return false;
	}
//	else if(flag){
//		$(date_error_span).css('visibility','visible');
//		$(date_error_span).css({'font-weight':'','color':'red'});		
//		$(date_error_span).text("日期不正确(eg:1991-01-09)");
//		return false;
//	}
	else{
		$(this).removeClass('input_error');
		$(date_error_span).css('visibility','hidden');
		$(date_error_span).text("");
		return true;
	}
}

/**时间中的小时验证*/
$.fn.validateHH = function(errorContent) {
	//首先获得文本框中的值
	var val = $.trim($(this).val()); 
	$(errorContent).attr('class','error_msg');
	var reg = /^[0-1]\d|2[0-3]$/;
	$(errorContent).css({'font-weight':'','color':'red'});
	if(reg.test(val)){
	   $(this).removeClass('input_error');
	   $(errorContent).css('visibility','hidden');
		$(errorContent).text("");
		return true;
	}else{			
		$(this).attr('class','input_error');
		$(errorContent).css('visibility','visible');
		$(errorContent).text("时间格式不正确(eg:xx.xx)");			
		return  false;			
	}
}

/**时间中的分钟验证*/
$.fn.validateMM = function(errorContent) {
	//首先获得文本框中的值
	var val = $.trim($(this).val()); 
	$(errorContent).attr('class','error_msg');
	var reg = /^[0-5]\d$/;
	$(errorContent).css({'font-weight':'','color':'red'});
	if(reg.test(val)){;
		$(this).removeClass('input_error');
	    $(errorContent).css('visibility','hidden');
		$(errorContent).text("");
		return true;
	}else{			
		$(this).attr('class','input_error');
		$(errorContent).css('visibility','visible');
		$(errorContent).text("时间格式不正确(eg:xx.xx)");			
		return  false;			
	}
}

/**验证开始时间不得小于结束时间*/
$.fn.CheckStartAndEndTime = function(start,errorContent) {
	$(errorContent).attr('class','error_msg');
	var startVal = $.trim($(start).val()); 
	var endVal = $.trim($(this).val()); 
	var start= new Array();
	var end= new Array();
	start = startVal.split("-");
	end = endVal.split("-");
	 $(errorContent).css('visibility','hidden');
	for (i=0; i<start.length; i++ ){    
       if(start[i] > end[i]){
    		$(this).attr('class','input_error');
    	   $(errorContent).css('visibility','visible');
			$(errorContent).text("结束日期不得小于开始日期");	
    	   return false;
       }else{
			$(this).removeClass('input_error');
    	   $(errorContent).css('visibility','hidden');
			$(errorContent).text("");			
       }     
    } 
	return true;
}

/**验证两个个文本框的值是否一*/
$.fn.checkIsEqual = function(equalContent,errorContent,errorMsg) {
	//首先获得文本框中的值
	var val1 = $.trim($(this).val()); 
	$(errorContent).attr('class','error_msg');
	var val2 = $.trim($(equalContent).val()); 
	$(errorContent).css({'font-weight':'','color':'red'});
	if(val1 == val2){
		$(this).removeClass('input_error');
		$(errorContent).css('visibility','hidden');
		$(errorContent).text("");
		return true;
	}else{			
		$(this).attr('class','input_error');
		$(errorContent).css('visibility','visible');
		$(errorContent).text(errorMsg);			
		return  false;			
	}
}

/**密码规则验证*/
$.fn.checkPasswd = function(errorContent) {
	//首先获得文本框中的值
	var val = $.trim($(this).val()); 
	$(errorContent).attr('class','error_msg');
	var reg = /^[a-zA-Z]\w{5,17}$/;
	$(errorContent).css({'font-weight':'','color':'red'});
	if(reg.test(val)){
		   $(this).removeClass('input_error');
		   $(errorContent).css('visibility','hidden');
			$(errorContent).text("");
		return true;
	}else{	
			$(this).attr('class','input_error');
			$(errorContent).css('visibility','visible');
			$(errorContent).text("以字母开头，长度在6~18之间，只能包含字符、数字和下划线");			
			return  false;			
	}
}


/**输入正确提示(带提示信息)*/
$.fn.checkOk = function(errorContent,errorMsg) {
	$(errorContent).attr('class','ok_msg');
	$(errorContent).css({'font-weight':'','color':'green'});
	$(errorContent).css('visibility','visible');
	$(errorContent).text(errorMsg);			
	return  true;			
}

/**输入错误提示(带提示信息)*/
$.fn.checkError = function(errorContent,errorMsg) {
	$(errorContent).attr('class','error_msg');
	$(errorContent).css({'font-weight':'','color':'red'});
	$(errorContent).css('visibility','visible');
	$(errorContent).text(errorMsg);			
	return  true;			
}

/**设置输入提示信息：*/
$.fn.promptMsg = function(msg) {
	$(this).css('visibility','visible');
	$(this).css({'font-weight':'','color':'#cc6600'});	
	$(this).attr('class','input_msg');
	$(this).text(msg);
}

/**根据指定长度截取字符串并以"..."做结尾*/
$.fn.formatString = function(length) {
	var $obj = $(this) ;
	$obj.each(function(i){
		var txt = $(this).text();
		if(txt.length > length){
			$(this).text( txt.substr(0,length-1) + "....");			
		}
   });
}

/**把相关时间用指定字符代替*/
$.fn.formatTime = function() {
	var $obj = $(this) ;
	$obj.each(function(i){
		//var txt = $(this).text();
		var txt = $('#attendence_type_id').val();
		if(txt != "0"){
			//$(this).text("----");			
		}
   });
}

/**设置span标签可见性：当内容为空时进行隐藏：*/
$.fn.setHidden = function() {
	var val =  $.trim($(this).text());
	if (val != null && val.length > 0) {
		$(this).css('visibility','visible');
	} else {
		$(this).css('visibility','hidden');
	}
}



