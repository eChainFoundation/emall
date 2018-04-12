

function invoke_weixin_pay(weixin_pay_config){
	var order_bill_id = default_value(weixin_pay_config.order_bill_id,"");
	var order_id = default_value(weixin_pay_config.order_id,"");
	var success_call_back = default_value(weixin_pay_config.success_call_back,null);
	var fail_call_back = default_value(weixin_pay_config.fail_call_back,null);
	var complete_call_back = default_value(weixin_pay_config.complete_call_back,null);
	var before_call_back = default_value(weixin_pay_config.before_call_back,null);
	if(before_call_back!=null){
		before_call_back();
	}
	
		  $.ajax({  
				url : "/app_user_get_weixin_prepay_info.action",  
				data :"orderBillId="+processIfEmpty(order_bill_id) +"&orderId="+processIfEmpty(order_id),    
				type : "post",  
				cache : false,  
				async:false, 
				dataType : "json",  
				success:  function(data){
					if(data.status == "1"){ 
						if(data.payStatus == "0"){
							
						 if(data.weixinBound == "0"){
								setDirectUrl();
								showMessageWithCallBack("请先绑定微信",'clickUrl("'+data.weixinLoginUrl+'")'); 
								return ;
							}
						 
						 if(browser.versions.isWeixin){  
							  //showMessage(data.appId+" "+data.timeStamp+" "+data.nonceStr+" "+data.packageString+" "+data.signType+" "+data.paySign);	
								WeixinJSBridge.invoke('getBrandWCPayRequest',{
									"appId" :data.appId, //公众号名称，由商户传入
									"timeStamp":data.timeStamp.toString() , //时间戳，自 1970 年以来的秒数
									"nonceStr" :data.nonceStr, //随机串
									"package" :data.packageString,
									"signType" : data.signType, //微信签名方式:
									"paySign" : data.paySign //微信签名
									},
									function(res){
										//showMessage(res.err_desc+res.err_msg);
										if(res.err_msg == "get_brand_wcpay_request:ok" ) {
											// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg 将在用户支付成功后返 回 ok，但幵丌保证它绝对可靠。	
											complete_call_back_func(complete_call_back);  
											suc_call_back_func(success_call_back); 
										}else{
											complete_call_back_func(complete_call_back); 
											 fail_call_back_func(function(){ 
												 showMessageWithCallBack("支付失败",fail_call_back)
											}); 
											//showMessage("支付失败");
										}  
									
									});
							}else{
								 complete_call_back_func(complete_call_back); 
								 fail_call_back_func(function(){ 
									 showMessageWithCallBack("请在微信浏览器内支付",fail_call_back)
									}); 
								// showMessage();
							}
						 }else{ 
							 complete_call_back_func(complete_call_back); 
							 suc_call_back_func(function(){ 
								 showMessageWithCallBack("已经支付成功",success_call_back)
								}); 
						
						 } 
					}else{
						 complete_call_back_func(complete_call_back); 
						 
						 fail_call_back_func(function(){ 
							 showMessageWithCallBack(data.errorMessage,fail_call_back)
							}); 
					
					}
					
				}
		  });  
	
	
	
} 


function fail_call_back_func(fail_call_back_f){ 
	if(fail_call_back_f!=null){
		fail_call_back_f();
	}
}

function suc_call_back_func(suc_call_back_f){ 
	if(suc_call_back_f!=null){
		suc_call_back_f();
	}
}


function complete_call_back_func(complete_call_back_f){ 
	if(complete_call_back_f!=null){
		complete_call_back_f();
	}
}


 
