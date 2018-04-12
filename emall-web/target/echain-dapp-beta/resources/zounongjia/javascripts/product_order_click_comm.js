$(document).ready(function() {  

	reg_order_comm_click();
    
});   

function reg_order_comm_click(){
	$(".shop_ele").each(function() {
	      var _this = $(this);
	      _this.unbind("click").bind("click", function() {
	       clickUrl("/Zounongjia/index/"+_this.attr("shop_id"));
	 		 return false;
	      });
	  });
	    
	    $(".product_ele").each(function() {
	     var _this = $(this);
	     _this.unbind("click").bind("click", function() {
	    	 
	    var product_id = 	 _this.attr("product_id");
	    var agt_shop_id = 	 _this.attr("agt_shop_id")
	    if(isEmpty(agt_shop_id)){
	    	agt_shop_id = 0;
	    }
	    	 
	      clickUrl("/product/index_"+product_id+"_"+agt_shop_id+"_0.html");
	 		 return false;
	      });
	  });
	    
	       $(".pay_ele").each(function() {
	            var _this = $(this);
	            _this.unbind("click").bind("click", function() {
	             var order_id = _this.attr("order_id");
	       	      	 var wx_pay_config = {"order_id":order_id,	
	       	      			    "fail_call_back":function(){clickUrl("/app_product/order/my_order");},
								"success_call_back":function(){clickUrl("/app_product/order/my_order");}
	       	      	  };
					 invoke_weixin_pay(wx_pay_config);
		    		 return false;
		         });
	         }); 
	       
	       
	       $(".refund_ele").each(function() {
	           var _this = $(this);
	            var order_id =_this.attr("order_id");
	           _this.unbind("click").bind("click", function() {
	            $.ajax({
	                 url: "/app_order/refund_order.action",
	                 cache: false,
	                 data: "orderId="+order_id,
	                 dataType:"json",
	 	               success: function(data) { 
	 	                	if(data.status =="1"){
	 	                	    clickUrl("/app_product/order/my_order");
	 	                	}else{
	 	                		showMessage(data.errorMessage);
	 	                	}
	 	                }
	            });
	 	         });
	       });    
 
	    
	    $(".delete_order_ele").each(function() {
	        var _this = $(this);
			  _this.unbind("click").bind("click", function() {        
			   	    var message_config = {"msg":"确认要删除?","ok_func":function(){ 
			   	     var order_id =_this.attr("order_id"); 
			   	     $.ajax({
			   	            url: "/app_order/delete_order.action",
			   	            cache: false,
			   	            data: "orderId="+order_id,
			   	            dataType:"json",
			   	             success: function(data) { 
			   	                	if(data.status =="1"){
			   	                		showMessage("删除订单成功"); 
			   	                		 clickUrl("/app_product/order/my_order");
			   	                	}else{
			   	                		showMessage(data.errorMessage);
			   	                	}
			   	                }
			   	       });
			   	      }   
			   	 } ;   
			   	 confirmDialog(message_config);  
	     });
	    }); 
	    
	      $(".confirm_receive_ele").each(function() {
	        var _this = $(this);
	  	    _this.unbind("click").bind("click", function() {        
			   	 var message_config = {"msg":"确认收货?","ok_func":function(){ 
			   		  var order_id =_this.attr("order_id"); 
			   	       $.ajax({
			   	            url: "/app_order/confirm_receive.action",
			   	            cache: false,
			   	            data: "orderId="+order_id,
			   	            dataType:"json",
			   	               success: function(data) { 
			   	                	if(data.status =="1"){
			   	                		  clickUrl("/app_product/order/my_order");
			   	                	}else{
			   	                		showMessage(data.errorMessage);
			   	                	}
			   	                }
			   	       });
			   	      
			   	 }
			   	 };
			   	 confirmDialog(message_config);
	  	 });     
	       
	    });    
}