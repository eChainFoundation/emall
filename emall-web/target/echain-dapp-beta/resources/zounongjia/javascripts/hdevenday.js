/*var currentPage = 0;
var stop=true; 
$(window).scroll(function(){ 
	var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); 
	if($(document).height()-100 <= totalheight){ 
    	if(stop==true){ 
    		stop = false;
	        var newContent = "";       
    		$.get("/MyZounongjia/hdevendayMore?currentPage="+(++currentPage),function(res){
    			if(res == "") {
					newContent = "<li class='pageList clearfix'><span class='listLast'>加载完毕！</span></li>";
					stop = false;
				} else {
					newContent = res;
					stop = true;
				}
				$("#Loading").before(newContent); 
		   });
		}
    } 
});*/

$(document).ready(function() {    
	
	   var f = {
		        sortID: "", 
		        pageNo: 1,
		        pageSize: 10
	  };
	   
	   var r = function() {
		    rs = "pageSize=" + f.pageSize + "&pageNo=" + f.pageNo; 
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
 	                   url: "/MyZounongjia/hdevendayMore",
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
 	                	   var dataList = data.dataList;
 		                   var list_content = "";
 		                   for(var loop = 0 ; loop <dataList.length;loop++ ){
 		                	  var ele = dataList[loop];
 		                	  
	 		             		list_content+= "<a href=\"" +"/Activity/index/"
	 		             				+ ele.id + "\" target=\"_self\" data-ajax=\"false\"><li class=\"pageList clearfix\">" + 
	 		             				"<dt><img class='scrollLoading' src='"+ default_show_img+"' data-url=\"" + 
	 		             				ele.headImgUrl.replace("/weixin_image/","/weixin_image_small/") + "\" /></dt><dd>";  
	 		             	 
	 		             		list_content+= "<h2 class=\"f16\">" + cutString(ele.title,8) + "</h2>";
	 		             		list_content+= "<p class=\"cGrey mt5\">" + cutString(ele.contactAddress,12)+ "</p>";
		 		   			  
		 		   				list_content+="<div class=\"clearfix listDiv\"><span class=\"distance mt5\"></span>";
		 		   				var distance = ele.distance;
		 		   			 
			 					if(ele.end == "1"){
			 						list_content+= "活动已结束</div></dd></li></a>";
			 					}else if(ele.end == "2"){
//			 						list_content+= "活动停止预约</div></dd></li></a>";
			 						if(ele.price != ''){
			 							list_content+= "￥"+ ele.price +"元/人</div></dd></li></a>";
			 						}else{
			 							list_content+= "价格请参见活动详情</div></dd></li></a>";
			 						}
			 					}else if(ele.end == "0"){
			 						if(ele.price != ''){
			 							list_content+= "￥"+ ele.price +"元/人</div></dd></li></a>";
			 						}else{
			 							list_content+= "价格请参见活动详情</div></dd></li></a>";
			 						}
			 					}
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
		    		       
		    		       $(".ele_div").each(function() {
			       	            var _this = $(this);
			       	            _this.unbind("click").bind("click", function() {
			       	             clickUrl("/app_act_view_"+_this.attr("ele_id")+".html");
		    		    		 return false;
		    		         });
		       	         });
		    		       
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
        
        
});

