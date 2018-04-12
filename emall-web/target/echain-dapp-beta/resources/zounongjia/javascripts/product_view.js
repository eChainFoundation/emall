$(document).ready(function() {   
    	//判断加载各个分辨率的图片
    	
    	 var mySwiper = new Swiper('.swiper-container',{
    			calculateHeight:true,
    			paginationClickable: true,
    			autoplay:3800,
    			speed:950,
    			loop:true,
    			slidesPerView:1,
    			pagination: '.pagination',
        		paginationClickable: true
    		});
    	
    	var tabsSwiper = new Swiper('.tabs_1',{
    			speed:500,
    			calculateHeight:true,
    			onSlideChangeStart: function(){
    			  $(".tabsNav_1 .active").removeClass('active');
    			  $(".tabsNav_1 a").eq(tabsSwiper.activeIndex).addClass('active')  ;
    			}
    		  })
    		  $(".tabsNav_1 a").on('touchstart mousedown',function(e){
    			e.preventDefault()
    			$(".tabsNav_1 .active").removeClass('active')
    			$(this).addClass('active')
    			tabsSwiper.swipeTo( $(this).index() )
    		  })
    		  $(".tabsNav_1 a").click(function(e){
    			e.preventDefault()
    		  });
    	
    	
    
    	
    	  $.ajax({
               url: "/app_user/check_collect",
               cache: false,
               data: "userInfoId="+processIfEmpty($("#userInfoId").val()),
               dataType:"json",
               success: function(data) { 
            	    if(data.collected == "1"){
            	    	$("#collectEle").addClass("active");
            	    }else{
            	    	regCollectShop();
            	    }
               }
    	  }); 
    	  
    	  $("#addCartEle").unbind("click").bind("click", function() {
    		  var recommandShopId = $("#recommandShopId").val();
    		  add_product_cart(
    				{"product_id":$("#productId").val(),"agt_uid":recommandShopId,"order_number":1,"is_set":false}
    		   );
    		  
    	  });
    	  
    	  
    	  $("#buyProductEle").unbind("click").bind("click", function() {
    		  var product_id = $("#productId").val();
    		  var recommandShopId = $("#recommandShopId").val();
    		  var order = new Order();
    		  order.addProduct(product_id,1,recommandShopId); 
    		  setOrderJson(order.getOrderJson());
    		  //clickUrl("/app_product/order/check_order?orderJson="+order.getOrderJson()) 
    		  clickUrl("/app_product/order/check_order")
    	  });
    	  
    	  $("#confirm_ele").unbind("click").bind("click", function() {  
    		  var _this = $(this);
    	     var operate_type =  _this.attr("operate_type");
    	     if(operate_type=="add_cart"){
    	    	 add_to_cart(); 
    	         $('.productAttr').slideUp(300);
        		 $('.maskBg').fadeOut(300);
    	     }else   if(operate_type=="buy"){
    	    	 buy_product()
    	     }
    	  
    	  }); 
    	  
    	  $("#shopCartEle").unbind("click").bind("click", function() {  
    		  clickUrl("/app_product/cart")
    	  
    	  }); 
    	  
    	  
    		$('.productToolBtn2').click(function(){
    			$("#confirm_ele").attr("operate_type","add_cart");
    			$('.productAttr').slideDown(400);
    			$('.maskBg').fadeIn(300);
    		});
    		
    		$('.productToolBtn3').click(function(){
    			$("#confirm_ele").attr("operate_type","buy");
    			$('.productAttr').slideDown(400);
    			$('.maskBg').fadeIn(300);
    		});
    		$('.productClose,.productAttrBtn2,.productAttrBtn3').click(function(){
    			$('.productAttr').slideUp(300);
    			$('.maskBg').fadeOut(300);
    		});
    		
    		$('.maskBg').click(function(){
    			$('.productAttr').slideUp(300);
    			$(this).fadeOut(300);
    		});
    		
    		//加票数
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
				_this.siblings('input').val(num);
			}
    	  
    	   $(".scrollLoading").scrollLoading();  
 });


function buy_product(){ 
	  var product_id = $("#productId").val();
	  var recommandShopId = $("#recommandShopId").val();
	  var order = new Order();
	  order.addProduct(product_id,get_product_number(),recommandShopId); 
	  setOrderJson(order.getOrderJson());
	  //clickUrl("/app_product/order/check_order?orderJson="+order.getOrderJson()) 
	  clickUrl("/app_product/order/check_order")
}

function add_to_cart(){ 
	  var recommandShopId = $("#recommandShopId").val();
	  add_product_cart(
			{"product_id":$("#productId").val(),"agt_uid":recommandShopId,"order_number":get_product_number(),"is_set":false}
	  );
}

function get_product_number(){
	var product_number = $("#product_number").val();
	if(isEmpty(product_number) || product_number < 1 ){
		return 1;
	}
	return product_number;
}


