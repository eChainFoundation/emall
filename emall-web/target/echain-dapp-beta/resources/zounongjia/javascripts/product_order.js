var Order = function (){  
	var products = []; 
	this.addProduct = function (product_id,product_number,agt_uid){
		   products.push({
               pId: product_id,
               agt_uid: agt_uid,
               num: product_number
           })
	}
	
	var remarks = []; 
	this.addRemark = function (shop_id,remark){
		remarks.push({
			 shopId: shop_id,
             remark: encodeURI(remark)
         })
	}
	
	var address_id = "";
	
	this.setAddressId = function (add_id){  
		address_id = add_id;
	} 
	
	this.getOrderJson = function (){  
		var rs =  "{ 'products' :" + JSON.stringify(products) +",'remarks':"+JSON.stringify(remarks)+",address_id:'"+address_id+"' }";
        return escape(rs);
	} 
	

	
	this.isOrderEmpty =function(){
		return products.length < 1;
	}
}

var order_json_cookie_name = "order_json_cookie";

function setOrderJson(orderJson){
	setCookie(order_json_cookie_name,orderJson);
}

function getOrderJson(){
	return getCookie(order_json_cookie_name);
}

function removeOrderJson(){
	delCookie(order_json_cookie_name);
	setCookie(order_json_cookie_name,'');
}