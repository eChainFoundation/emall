$(document).ready(function() {  
	
    $(".product_del_ele").each(function() {
           var _this = $(this);
           _this.unbind("click").bind("click", function() {
        	   var product_id = _this.attr("ele_id");
        	   delete_product(product_id);
        	   $("#product_div_"+product_id).remove();
        	   recheck_shop_div();
        	   recalcurate_money();
        	   recheck_shop_checkbox();
        	   //location.reload();
     });
    });
     
    
    $('.plusBtn').click(function(){
    	add_number($(this),1);
	})
	//减票数
	$('.minusBtn').click(function(){
		add_number($(this),-1);
	})
	
	var add_number = function (_this,incr_number){
    	var num = _this.siblings('input').val();
		if( num==''  ){ 
			num = 1;
		}else{
			num = parseInt(num)+incr_number;
		}  
		if(num < 1){
			num = 1;
		} 
		
		var product_id = _this.attr("ele_id");
	    var agentUserInfoId = $("#agentUserInfoId_"+product_id).val();
		add_product_cart({"product_id":product_id,"order_number":num,"agt_uid":agentUserInfoId,"show_success":false});
		
		var sp = $("#singlePrice_"+product_id); 
		
		var total_p = $("#totalPrice_"+product_id);
		total_p.text((sp.text()*num).toFixed(2));
		_this.siblings('input').val(num);
		 recalcurate_money();
    } 
    $(".scrollLoading").scrollLoading();  
    
 
    
    $(".shop_checkbox").unbind("click").bind("click", function() {
  	  var _this = $(this);
  	   var shop_id = _this.attr("shop_id");
  	   var checked = _this.is(':checked'); 
  		$('[parent_id="shop_checkbox_'+shop_id+'"]').each(function() {
  	        var _this = $(this); 
  	      _this.prop("checked",checked);
  	       recalcurate_money();
  		}); 
  	});
    
    $(".product_checkbox").unbind("click").bind("click", function() {
    	  var _this = $(this); 
    	  recheck_shop_checkbox();
    	  recalcurate_money();
	});
    
    $("#all_check_ele").unbind("click").bind("click", function() {
    	  var _this = $(this);
    	  var is_checked =_this.is(":checked"); 
    	  $(".product_checkbox").each(function(){
    		  var _product_this = $(this); 
    		  _product_this.prop("checked",is_checked);
    	});
    	 recheck_shop_checkbox();
    	 recalcurate_money();
    });
    
    $("#checkOrderEle").unbind("click").bind("click", function() {
    	
  	  if(!isUserLogin()){
		  setDirectUrl();
		  showMessageWithCallBack("请先登录",function (){
			  redirectToLogin();
		  }) ;
		  return ;
	  } 	
	
     	  var _this = $(this); 
      	  var order = new Order(); 
      	  $(".product_checkbox").each(function(){
      		  var _product_this = $(this); 
      	 	  var is_checked =_product_this.is(":checked"); 
      	 	  if(is_checked){
      	 		  var product_id = _product_this.attr("product_id");
      	 		  var order_number = $("#orderNumber_"+product_id).val();
      	 		  var agentUserInfoId = $("#agentUserInfoId_"+product_id).val();
      	 		  order.addProduct(product_id,order_number,agentUserInfoId); 
      	 	  } 
           });  
      	  if(!order.isOrderEmpty()){
      		  setOrderJson(order.getOrderJson());
      		  clickUrl("/app_product/order/check_order")
      		 // clickUrl("/app_product/order/check_order?orderJson="+order.getOrderJson());
      	  } 
     
    	
 
  	
    });
    
    
});

function recheck_shop_checkbox(){ 
	$(".shop_checkbox").each(function(){
		  var _this = $(this);
		  var shop_id = _this.attr("shop_id"); 
		  _this.prop("checked",has_children_checked(shop_id)); 
	});
}

function has_children_checked(shop_id){
	var has_child = false;
	  $('[parent_id="shop_checkbox_'+shop_id+'"]').each(function() {
	        var _sub_this = $(this); 
	        if(_sub_this.is(":checked")){
	        	has_child =  true;
	        } 
		}); 
	  return has_child;
}

function recheck_shop_div(){
	$(".shop_checkbox").each(function(){
		  var _this = $(this);
		  var shop_id = _this.attr("shop_id"); 
		  if(!has_children(shop_id)){
			  $("#shop_div_"+shop_id).remove();
		  }
	});
}


function has_children(shop_id){
	var has_child = false;
	  $('[parent_id="shop_checkbox_'+shop_id+'"]').each(function() {
			has_child =  true;
		}); 
	  return has_child;
}

function recalcurate_money(){
	var money = 0;
	$(".shop_checkbox").each(function(){
		  var _this = $(this);
		  var shop_id = _this.attr("shop_id"); 
		  if(_this.is(':checked')){
			  $('[parent_id="shop_checkbox_'+shop_id+'"]').each(function() {
		  	        var _sub_this = $(this); 
		  	        if(_sub_this.is(":checked")){
		  	        	 var product_id = _sub_this.attr("product_id");
		  	        	 var sp = $("#totalPrice_"+product_id).text();
		  	        	 money = money + parseFloat(sp); 
		  	        } 
		  		}); 
		  }  
	});
	 $("#total_money").text(money.toFixed(2));
}
