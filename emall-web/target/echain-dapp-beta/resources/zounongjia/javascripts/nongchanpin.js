/*var currentPage = 0;
var stop=true; 
$(window).scroll(function(){ 
	var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); 
	if($(document).height()-100 <= totalheight){ 
    	if(stop==true){ 
    		stop = false;
	        var newContent = "";   
    		var area = $('.area a.active').text();
    		var cat = $('.cat a.active').text();
    		var paixu = $('.paixu a.active').text();
    		var userId = $('#userId').val();
    		var shopTitle = $('#shopTitle').val();
    		var productType = $('#productType').val();
			$.get("/Zounongjia/nongchanpinParam?currentPage="+(++currentPage)+"&userId="+userId+"&shopTitle="+shopTitle+"&productType="+productType+"&area="+area+"&cat="+cat+"&paixu="+paixu,function(res){
				if(res == "") {
					newContent = "<div class='searchDiv'>加载完毕!</div>";
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
		    rs = "pageSize=" + f.pageSize + "&pageNo=" + f.pageNo +"&"+processIfEmpty($('.area a.active').attr("params")) +"&"+processIfEmpty($('.paixu a.active').attr("params")); 
   			var cat =  processIfEmpty($('.cat a.active').text());
   			var userId =  processIfEmpty($('#userId').val());
    		var shopTitle = processIfEmpty( $('#shopTitle').val());
    		var productType =  processIfEmpty($('#productType').val());
   			
    		rs += "&userId="+userId+"&shopTitle="+shopTitle+"&productType="+productType+"&cat="+cat; 
           
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
 	                   url: "/Zounongjia/nongchanpinParam",
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
 		                	  
 		                	 list_content+= "<div class=\"searchDiv ele_div\" agent_user_info_id='"+ele.agentUserInfoId
 		                	    +"' ele_id='"+ele.id+"'><a href='javascript:;' data-ajax=\"false\"><ul>"
 		                	 		+ "<li class=\"tc\"><img class='scrollLoading' src='"+ default_show_img+"' data-url=\"" 
 		                	 		+ ele.product_picture + "\" /></li>";
 		                	
	 		             		list_content+= "<li class=\"tc\">" + cutString(ele.product_name,8) + "</li>";
	 		             		list_content+= "<li class=\"cBlack\">商家：" + cutString(ele.agentUserName,6) +"</li>";
	 		             		
		 		             	if(ele.zhekou_price == null || ele.zhekou_price == "" ){
		 		             		list_content+= "<li>￥<font color=red>"+ ele.price + "</font>"+"/" + cutString(ele.product_unit,4) +"</li>";
		 		   				}else{
		 		   					list_content+= "<li>￥<font color=red>"+ ele.zhekou_price + "</font>"+"/" + cutString(ele.product_unit,4) +"</li>";
		 		   				}
		 		   			  
		 		   				list_content+="</ul></a></div>";
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
			       	             var pId = 	_this.attr("ele_id");
			       	             var agent_user_info_id = _this.attr("agent_user_info_id"); 
			       	             //alert(getShareUserId()+" "+getUserId())
			       	             clickUrl("/product/index_"+pId+"_"+agent_user_info_id+"_"+getShareUserId()+".html");
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
        
        
      $('.screenBtn').on('click', function(e){
              $(this).parent('').find(".screenMain").slideToggle();
              $(this).parent('').toggleClass('active');
              $(this).parent('').siblings('.screenSpan').removeClass('active');
              $(this).parent('').siblings('.screenSpan').find(".screenMain").hide(500); 
       });
      
      $('.area a').on('click', function(e){
    	     var area=$(this).text(); 
    		 var cat = $("#cat").val();
    		 var paixu = $("#paixu").val();
             $(this).addClass('active').siblings('').removeClass('active'); 
             $(this).parents('.screenMain').hide(500);
             $("#areaSpan").text($(this).text());
             submit.getInitPage(); 
          });
      
      $('.cat a').on('click', function(e){
    	    var area=$("#area").val();
    		var cat = $(this).text();
    		var paixu = $("#paixu").val();
    		$(this).addClass('active').siblings('').removeClass('active'); 
    		$(this).parents('.screenMain').hide(500);
    		$("#categorySpan").text($(this).text()); 
    		submit.getInitPage(); 
    	});
    	
    	$('.paixu a').on('click', function(e){
    	    var area= $("#area").val();
    	    var cat = $("#cat").val();
    		var paixu = $(this).text(); 
    		$(this).addClass('active').siblings('').removeClass('active'); 
    		$(this).parents('.screenMain').hide(500);
    		$("#sortTypeSpan").text($(this).text()); 
    		submit.getInitPage(); 
    	});
    	
    	$('#searchShop').unbind("click").bind("click", function(e){
    		submit.getInitPage();  
	    });
    	
    	
});

