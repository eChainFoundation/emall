/*var currentPage = 0;
var stop=true; 
$(window).scroll(function(){ 
	var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); 
	if($(document).height()-100 <= totalheight){ 
    	if(stop==true){ 
    	stop = false;
	        var newContent = "";       
	        $.get("/MyZounongjia/shoucangMore?currentPage="+(++currentPage),function(res){
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
 	                   url: "/MyZounongjia/shoucangMore",
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
 		                	  
	 		                	list_content+= "<li class=\"pageList clearfix\">" + "<dt><a href=\"" + "/Zounongjia/index/"
	 								+ ele.userInfoId + "\" target=\"_self\" data-ajax=\"false\"><img class='scrollLoading' src='"+ default_show_img+"' data-url=\""
	 								+ ele.headshot.replace("weixin_image", "/weixin_image_small/") + "\" /></a></dt>" + "<dd>"
	 								+ "<h2 class=\"f16\"><a href=\"" + "/Zounongjia/index/" + ele.userInfoId
	 								+ "\" class=\"cBlack\" target=\"_self\" data-ajax=\"false\">"
 		                	  
	 		             		list_content+= "<h2 class=\"f16\">" + cutString(ele.userName,8) + "</h2>";
		 		   			  
		 		   				list_content+= "</a></h2><p class=\"cGrey mt5\">收藏时间：" + ele.createTime
		 							+ "</p><div class=\"list_1Foot\"><a class='deleteIcon btn_1' href='javascript:;' shoucang_id='"
		 							+ ele.id + "' >取消收藏</a></div></dd></li>";
			 					
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
		    		       
	 	                 $(".deleteIcon").each(function() {
			       	            var _this = $(this);
			       	            var id = _this.attr("shoucang_id");
			       	            _this.unbind("click").bind("click", function() {
			       	             $.ajax({
				 	                   url: "/app_user/delete_collect",
				 	                   data:"id="+id,
				 	                   dataType:"json",  
				 	                   success: function(data) {
				 	                	   if(data.status == "1"){ 
				 	                		  _this.parent().parent().parent().remove();
				 	                	   }else{
				 	                		  showMessage(data.errorMessage); 
				 	                	   }
				 	                   }
			       	             });    
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
