 

$(document).ready(function() {    
	
	   var f = {
		        sortID: "", 
		        pageNo: 1,
		        pageSize: 3
	  };
	   
	   var r = function() {
		    rs = "pageSize=" + f.pageSize + "&pageNo=" + f.pageNo ; 
   			var  orderStatus=  processIfEmpty($('#orderStatus').val());
   		 
   			
    		rs += "&status="+orderStatus; 
           
		    return rs;
       };
       
       
       var load_more_ele = $("#btnMore");
        var submitObj = function(){ 
        	
        	 var hasMore = true;
  	         var isLoading = false;
	    	 var submitOp = function(shouldRollbackPageNo) {
	    		   if(isLoading || !hasMore){
	    			   return ;
	    		   } 
	    		   isLoading = true;
	    		   load_more_ele.unbind("click");
	    		   load_more_ele.show(); 
		           load_more_ele.text("正在加载数据...");
 	               $.ajax({
 	                   url: "/app_product/order/my_order.action",
 	                   cache: false,
 	                   data: r(),
 	                   dataType:"json",
 	                   error: function(e) {  
	                	   if(shouldRollbackPageNo &&  f.pageNo > 0){
	                		   f.pageNo = f.pageNo - 1;
	                	   }
	                	   load_more_ele.show(); 
	    		           load_more_ele.text("数据加载失败,点击重新加载");
	    		           load_more_ele.unbind("click").bind("click", function() { 
		    		        	 submit.getNextPage();
		    		    		 return false;
		    		         });
	                    }, 
	                    complete: function(e) { 
	                    	 isLoading = false;
		                }, 
 	                   success: function(data) { 
 	                	   var default_show_img = global_default_show_img;
 	                	   var dataList = data.orderList;
 		                   var list_content = "";
 		              
 		                   for(var loop = 0 ; loop <dataList.length;loop++ ){
 		                	  var order_detail = dataList[loop]; 
 		                    var 	styleClas = '';
 		                    if(loop < dataList.length ){
 		                    	//styleClas = 'style="border-bottom:25px solid  #ddd;"';
 		                    }
 		                    
 		                    var status_operate = "";
 		                    var status_desc = "";
 		                    var canDelete = (order_detail.canDelete == "1");
 		                    if(order_detail.orderStatus=="0" ){
 		                    	status_desc ="等待付款";
 		                    	status_operate += '<a class="btn2 pay_ele"  order_id="'+order_detail.id+'" href="javascript:;">付款</a>';
 		                    	 
 		                    }else if(order_detail.orderStatus=="1" ){
 		                    	status_desc ="等待发货";
 		                    }else if(order_detail.orderStatus=="2" ){
 		                    	status_desc ="等待收货";
 		                    	status_operate += '<a class="btn2 confirm_receive_ele" order_id="'+order_detail.id+'" href="javascript:;">确认收货</a>';
 		                    }else if(order_detail.orderStatus=="9" ){
 		                    	status_desc ="交易完成";
 		                     
 		                     }else if(order_detail.orderStatus=="3" ){
 		                    	status_desc ="申请退货中"; 
 		                     }else if(order_detail.orderStatus=="5" ){
 		                    	status_desc ="交易有异议-平台已处理"; 
 		                    	 
 		                     }else if(order_detail.orderStatus=="4" ){
 		                    	status_desc ="交易有异议-等待处理"; 
 		                    	 
 		                     }else if(order_detail.orderStatus=="8" ){
 		                    	status_desc ="退货成功"; 
 		                    	 
 		                     }
 		                    
 		                	list_content +=  ' <div '+styleClas+'  class="rowBlock f14 "  >'+
 		                	'  <div class="rowLine pl10 shop_ele"  shop_id="'+order_detail.shopId+'"  >'+
 		                	'  <span class="cOrange fr">'+status_desc+'</span>'+
 		                	'   <a href="javascript:;" class="cBlack">'+order_detail.shopName+'</a>'+
 		                	' </div>'; 
 		                	  
 		                	  var productList = order_detail.productList;
 		                	  for(var pro_loop = 0 ; pro_loop <productList.length;pro_loop++ ){
 		                		  var product_detail = productList[pro_loop];
 		                			list_content +=	' <div class="rowLine p10 clearfix order_ele" style="background:#f5f5f5;"   order_id="'+order_detail.id+'" product_id="'+product_detail.productId+'" >'+
 		 		                     
 		 		                	'  <a href="javascript:;" class="fl"><img class="scrollLoading" src="'+ global_default_show_img+'" data-url="/' 
 		                	 		+ product_detail.productImage + '"  width="70" /> </a>'+
 		 		                	'  <div class="orderProductAttr">'+
 		 		                	'    <a href="javascript:;" class="cBlack">'+product_detail.productTile+'</a>'+  
 		 		                	'    <div class="cGrey pt5 f12">￥'+product_detail.dealPrice.toFixed(2)+' / '+product_detail.productUnit+'    &nbsp;&nbsp;x'+product_detail.orderNumber+'&nbsp;</div>'+
 		 		                	'   <div class="clearfix pt5">'+
 		 		                	//'  <span class="fr">x '+product_detail.orderNumber+'</span>'+
 		 		                            '      <b class="cOrange">￥'+product_detail.orderMoney.toFixed(2)+'</b>'+
 		 		                           '    </div>'+
 		 		                          '  </div>'+
 		 		                         '  </div>';
 		 		                      
 		                	  } 
 		                
 		                	  
 		                	 list_content +=   ' <div class="rowLine tr f12">'+
		                       '  共计'+order_detail.productOrderNumber+'件商品 总计:￥'+order_detail.orderMoney.toFixed(2)+'元'+
	 		                       ' </div>'+
	 		                      ' <div class="rowLine tr f12">';
 		                	 if(canDelete){
 		                      list_content +=  '<a class="btn3 delete_order_ele"  order_id="'+order_detail.id+'" href="javascript:;">删除订单</a>';
 		  		               
 		                	 }
 		                 	 list_content +=   status_operate+ 
	 		                   ' </div>'+
	 		                    ' </div>';
 		                   }
 		                   
 		                 
 		              	  $("#dataListUl").append(list_content); 
	 	                   $(".scrollLoading").scrollLoading();  
	 	                   
	 	                  if(data.hasMore == "1"){ 
		    		        	 hasMore =true;
		    		        	 load_more_ele.hide();
		    		             
		    		      }else{ 
		    		        	 hasMore =false;
		    		        	 load_more_ele.show(); 
		    		        	 load_more_ele.text("没有更多数据了");
		    		       }
		    		      
	 	                    reg_click();
 	                   } 
 	               });
 	    	   }
 	    	   
	    	   this.getInitPage = function() {
	        	    hasMore =true;
	                f.pageNo = 1; 
	                $("#dataListUl").empty();
	                submitOp(false);
	            };
	            this.getFirstPage = function() {
	            	 hasMore =true;
	            	 f.pageNo = 1; 
	            	 submitOp(false);
	            };
	            this.getCurrentPage = function() { 
	                submitOp(false);
	            }
	            this.getNextPage = function() {
	        	   if(isLoading || !hasMore){
	    			   return ;
	    		    }
	                f.pageNo += 1; 
	                submitOp(true);
	            }
        }; 
        submit = new submitObj(); 
        
        submit.getInitPage();  
        
        
        var reg_click =  function(){
       	 
        	reg_order_comm_click(); 
		       
		       $(".order_ele").each(function() {
	 	            var _this = $(this);
	 	             var order_id =_this.attr("order_id");
	 	            _this.unbind("click").bind("click", function() { 
	 	            	clickUrl("/app_product/order/detail?id="+order_id);
	 	            	
	 	            });
		       });  
		       
		
     } 
        
        $(window).scroll(function(){ 
           	var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); 
           	if($(document).height()-100 <= totalheight){  
               		submit.getNextPage();  
               } 
         });
        
        $(window).keydown( function(event){
        	 if (event.keyCode==13){
        		 submit.getInitPage(); 
        	 }  
        } );
      
        $("[check_order_number]").each(function() {
            var _this = $(this);
            var order_status = _this.attr("order_status");
            
            $.ajax({
                 url: "/app_product/order/my_order_status_check.action?status="+order_status,
                 cache: false,
                 dataType:"json",  
                 success: function(data) {
                	if(data.status=="1"){
                		//alert(data.number)
                		if(data.number > 0){
                			_this.siblings('span').show();
                		}
                		
                	} 
                 }
            }); 
          
     });
  
        
     
        $("[order_status]").each(function() {
	            var _this = $(this);
	            var order_status = _this.attr("order_status");
	            var now_status = $("#orderStatus").val();
	            if(now_status == order_status){
	            	  _this.parent().addClass("active");
	            }
	            
	            _this.unbind("click").bind("click", function() { 
	            	
	                $("[order_status]").each(function() {
	    	            var _this = $(this);
	    	            _this.parent().removeClass("active");
	                });
	             _this.parent().addClass("active");
	             $("#orderStatus").val(order_status);
	             submit.getInitPage(); 
         });
        });
    	
    	
});

