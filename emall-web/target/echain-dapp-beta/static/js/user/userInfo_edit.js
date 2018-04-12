//修改员工考勤信息
$(function() {
	initScreen('410002');
	var name;
	var sett = new $.Settings();
	sett.execute = function() {
		name = $('#real_name').val();
		if(name ==""){
			$('#prompt_msg').text("- - - - - - - - - -个人信息添加- - - - - - - - - -");
		}else{
			$('#prompt_msg').text("- - - - - - - - - -个人信息修改- - - - - - - - - -");
		}
	}
	$.sync(1,sett);
	$('#editBtn').click(function() {
		var setting = new $.Settings();
		setting.execute = function(data) {
			if (!data.error) {
				$.closed();
			}
		}
		if(check()){
			if(name ==""){
				$.sync(3, setting);
			}else{
				$.sync(2, setting);
			}
				
		}	
	});
	
	$("#real_name").blur(function(){		
		$(this).maxLength(30,'#real_name_span','限30字符以内','用户名不能为空');
	});
	$("#mobile").blur(function(){		
		$(this).validateMobile('#mobile_span');
	});
	$("#qq").blur(function(){		
		$(this).validateQQ('#qq_span');
	});
	$("#telephone").blur(function(){		
		$(this).validateTelephone('#telephone_span');
	});
	$("#email").blur(function(){		
		$(this).validateEmail('#email_span');
	});
	$("#extension").blur(function(){
		$(this).validateExtension('#extension_span');
	});
	$("#birth_date").change(function(){
		$(this).checkDate('#birth_date_span') ;
	});
	
	function check(){
		var ok =
		$("#real_name").maxLength(30,'#real_name_span','限30字符以内','用户名不能为空')	
		$("#mobile").validateMobile('#mobile_span')
		&$("#qq").validateQQ('#qq_span')
		&$("#telephone").validateTelephone('#telephone_span')
		&$("#email").validateEmail('#email_span')
		&$("#extension").validateExtension('#extension_span')
		&$("#birth_date").checkDate('#birth_date_span');
		return ok;
	}
	// 设置日期插件
	var dateS = new Date();
	dateS.setDate(dateS.getDate());
	var dateE = new Date();
	dateE.setDate(dateE.getDate());
	$("#birth_date").datepicker( {
		maxDate : dateS
	});
	
});	