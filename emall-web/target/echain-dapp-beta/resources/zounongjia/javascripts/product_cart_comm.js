var product_cart_cookie_name = "products_json";
function add_product_cart(config_json){  
	
	product_id = config_json.product_id;
	order_number = config_json.order_number;
	agt_uid = config_json.agt_uid;
	is_set= default_value(config_json.is_set,true);
	show_success= default_value(config_json.show_success,true);
	//alert(show_success);
$.ajax({ 
	     url: "/app_product/isAvailable.action",
                data: "productId=" + product_id +"&orderNumber="+order_number,
                dataType:"json",
                cache: false, 
                success: function(data) {
                    if (data.status == "0") {
                       showMessage(data.errorMessage);
                    } else { 
                        var maxNumber = parseInt(data.maxNumber);
                        var codeid = product_id;
                        var json = getCookie(product_cart_cookie_name);
                        if (isEmpty(json)) {
                            var val = "[{'pId':" + codeid + ",'num':" +order_number + ",'agt_uid':" +agt_uid +"}]";
                            setCookieForever(product_cart_cookie_name, val);
                        } else {
                            var flag = false;
                            json = eval("(" + json + ")");
                            $.each(json,
                            function(n, value) {
                                if (codeid == value.pId) {
                                	  if(is_set){ 
                                		  value.num = order_number; 
                                	  }else{
                                		  value.num = (parseInt(value.num) + parseInt(order_number)); 
                                		   if ( value.num > maxNumber && maxNumber >= 0) {
                                               value.num = maxNumber
                                          } 
                                	  }  
                                    flag = true
                                }
                            });
                            if (!flag) {
                                json.push({
                                    pId: codeid,
                                    agt_uid: agt_uid,
                                    num: order_number
                                })
                            }
                            json = JSON.stringify(json);
                            setCookieForever(product_cart_cookie_name, json);
                            if(show_success){
                            	 showMessage("添加成功"); 
                            }
                           
                        } 
                    	}
                }
            })   
}    


function delete_product(product_id){
	   var json = getCookie(product_cart_cookie_name);
	   if (isEmpty(json)) {
		   return false;
	   }
	   json = eval("(" + json + ")");
	   var arr = new Array();
	   $.each(json,
               function(n, value) {
                   if (product_id != value.pId) { 
                	   arr.push(value);
                   }
        }); 
	   if(arr.length > 0){
		   json = JSON.stringify(arr); 
	   }else{
		   json = "";
	   }  
       setCookieForever(product_cart_cookie_name, json); 
       return true;
} 