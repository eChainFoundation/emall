

function sendMessage(sendCodeEleId,phoneEleId,verifyCodeId) {
	 var phone = $("#"+phoneEleId).val();
	 var login_yzm = $("#login_yzm").val();
	  if(isEmpty(phone) ){
		  showMessage("请先输入手机号"); 
		  return ;
	  }
	  
	  if(!isMobilePhoneNumber(phone)){
		  showMessage("请输入正确的手机号"); 
		  return ;
	  }
	 
	  $("#"+sendCodeEleId).unbind("click");
      var curCount = 90; 
     //设置button效果，开始计时
      $("#"+sendCodeEleId).addClass("disabled");
      $("#"+sendCodeEleId).text(curCount + "秒重新发送");
      var  InterValObj = window.setInterval(function (){
     	    if (curCount == 0) {                
                 window.clearInterval(InterValObj);//停止计时器
                 $("#"+sendCodeEleId).removeClass("disabled");//启用按钮
                 $("#"+sendCodeEleId).text("重新发送验证码");
                 bindSendCode();
             }
             else {
                 curCount--;
                 $("#"+sendCodeEleId).text(curCount + "秒重新发送");
             }
     	 
      }, 1000); //启动计时器，1秒执行一次
//向后台发送处理数据
 		$.get("/Msms/send_sms?phoneNumber="+phone+"&loginYzm="+login_yzm,function(data){
  			showMessage(data); 
	    });
}
