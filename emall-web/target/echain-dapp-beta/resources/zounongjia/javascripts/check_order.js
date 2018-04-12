$(document).ready(function() {  
	  $(".scrollLoading").scrollLoading();  
	
	 $('.add_address_ele').bind("click",function() {
		 getCheckOrderJson();
		 clickUrl("/address/to_select_address");
	 });
 
	 bind_product_order_click();

	 
});

function bind_product_order_click(){
	 $('#productOrderToolBtnEle').bind("click",function() { 
		 
		  if(!isUserLogin()){
			  setDirectUrl();
			  showMessageWithCallBack("请先登录",function (){
				  redirectToLogin();
			  }) ; 
			  return ;
		  } 	
		
		 
		    $('#productOrderToolBtnEle').unbind("click");	 
			var orderJson =  getCheckOrderJson();
			var billId = $("#orderBillId").val(); 
			
			var addressId = $("#addressId").val();
			if(isEmpty(addressId)){
				showMessage("请先选择地址");
				return false;
			 }
			
			if(isEmpty(billId)){
				 $.ajax({  
						url : "/app_order/submit_order.action",  
						data :{"orderJson":orderJson},    
						type : "post",  
						cache : false,  
						async:false, 
					
						dataType : "json", 
						success:  function(data){
							if(data.status == "1"){ 
								$("#orderBillId").val(data.orderBillId); 
								var wx_pay_config = getWeixinPayConfig(data.orderBillId);
								var productIdList = data.productIdList;
								for(var loop = 0 ; loop < productIdList.length;loop++){
									var p_id = productIdList[loop];
									delete_product(p_id);
								}
								removeOrderJson();
								invoke_weixin_pay(wx_pay_config);
							}
						}
				  });
			}else{
				var wx_pay_config = getWeixinPayConfig(billId);
				invoke_weixin_pay(wx_pay_config);
			}
		
		 });
}

function getWeixinPayConfig(billId){
	   var wx_pay_config = {"order_bill_id":billId,
			"complete_call_back":function(){bind_product_order_click();},
			"fail_call_back":function(){clickUrl("/app_product/order/my_order");},
			"success_call_back":function(){clickUrl("/app_product/order/my_order");}
	   };
	 return wx_pay_config;
}


function getCheckOrderJson(){
	  var order = new Order();  
  	   $(".product_input_eles").each(function(){
  		  var _this = $(this); 
 		  var product_id = _this.attr("product_id");
 		  var order_number =  _this.attr("order_number");
 		  var agt_uid =  _this.attr("agt_uid"); 
 		  order.addProduct(product_id,order_number,agt_uid); 
 	  
       });  
  	   
  	  $(".remark_input_eles").each(function(){
 		  var _this = $(this); 
		  var shop_id = _this.attr("shop_id");
		  var remark =  _this.val();
		  order.addRemark(shop_id,remark); 
	  
      });  
  	  order.setAddressId($("#addressId").val()); 
  	  
  	  if(!order.isOrderEmpty()){
  		  setOrderJson(order.getOrderJson()); 
  	  }  
  	  
  	  return order.getOrderJson();
	
}