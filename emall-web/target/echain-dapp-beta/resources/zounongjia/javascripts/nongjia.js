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
		    var shopTitle = $('#shopTitle').val();
		    var nzType = $('#nzType').val();
			var czType = $('#czType').val();
			var skType = $('#skType').val();
			var styType = $('#styType').val();
			var ncType = $('#ncType').val();
			var cdType = $('#cdType').val();
			var isHot = $('#isHot').val();
			if(nzType == '1'){
				$.get("/Zounongjia/nongjiaParam?currentPage="+(++currentPage)+"&shopTitle="+shopTitle+"&nzType="+nzType+"&area="+area+"&cat="+cat+"&paixu="+paixu+"&isHot="+isHot;,function(res){
					if(res == "") {
						newContent = "<li class='pageList clearfix'><span class='listLast'>加载完毕！</span></li>";
						stop = false;
					} else {
						newContent = res;
						stop = true;
					}
					$("#Loading").before(newContent); 
			    });
			}else if(czType == '1'){
				$.get("/Zounongjia/nongjiaParam?currentPage="+(++currentPage)+"&shopTitle="+shopTitle+"&czType="+czType+"&area="+area+"&cat="+cat+"&paixu="+paixu+"&isHot="+isHot;,function(res){
					if(res == "") {
						newContent = "<li class='pageList clearfix'><span class='listLast'>加载完毕！</span></li>";
						stop = false;
					} else {
						newContent = res;
						stop = true;
					}
					$("#Loading").before(newContent); 
			    });
			}else if(skType == '1'){
				$.get("/Zounongjia/nongjiaParam?currentPage="+(++currentPage)+"&shopTitle="+shopTitle+"&skType="+skType+"&area="+area+"&cat="+cat+"&paixu="+paixu+"&isHot="+isHot;,function(res){
					if(res == "") {
						newContent = "<li class='pageList clearfix'><span class='listLast'>加载完毕！</span></li>";
						stop = false;
					} else {
						newContent = res;
						stop = true;
					}
					$("#Loading").before(newContent); 
			    });
			}else if(styType == '1'){
				$.get("/Zounongjia/nongjiaParam?currentPage="+(++currentPage)+"&shopTitle="+shopTitle+"&styType="+styType+"&area="+area+"&cat="+cat+"&paixu="+paixu+"&isHot="+isHot;,function(res){
					if(res == "") {
						newContent = "<li class='pageList clearfix'><span class='listLast'>加载完毕！</span></li>";
						stop = false;
					} else {
						newContent = res;
						stop = true;
					}
					$("#Loading").before(newContent); 
			    });
			}else if(ncType == '1'){
				$.get("/Zounongjia/nongjiaParam?currentPage="+(++currentPage)+"&shopTitle="+shopTitle+"&ncType="+ncType+"&area="+area+"&cat="+cat+"&paixu="+paixu+"&isHot="+isHot;,function(res){
					if(res == "") {
						newContent = "<li class='pageList clearfix'><span class='listLast'>加载完毕！</span></li>";
						stop = false;
					} else {
						newContent = res;
						stop = true;
					}
					$("#Loading").before(newContent); 
			    });
			}else if(cdType == '1'){
				$.get("/Zounongjia/nongjiaParam?currentPage="+(++currentPage)+"&shopTitle="+shopTitle+"&cdType="+cdType+"&area="+area+"&cat="+cat+"&paixu="+paixu+"&isHot="+isHot;,function(res){
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
//		    var area = processIfEmpty($('.area a.active').text());
   			var cat = processIfEmpty($('.cat a.active').text());
//   			var paixu = processIfEmpty($('.paixu a.active').text());
   			var shopTitle = processIfEmpty($('#shopTitle').val());
		    var nzType = processIfEmpty($('#nzType').val());
			var czType = processIfEmpty($('#czType').val());
			var skType = processIfEmpty($('#skType').val());
			var styType = processIfEmpty($('#styType').val());
			var ncType = processIfEmpty($('#ncType').val());
			var cdType = processIfEmpty($('#cdType').val());
			var isHot = $('#isHot').val();
			if(nzType == '1'){
				rs += "&shopTitle="+shopTitle+"&nzType="+nzType+"&cat="+cat+"&isHot="+isHot;;
			}else if(czType == '1'){
				rs += "&shopTitle="+shopTitle+"&czType="+czType+"&cat="+cat+"&isHot="+isHot;;
			}else if(skType == '1'){
				rs += "&shopTitle="+shopTitle+"&skType="+skType+"&cat="+cat+"&isHot="+isHot;;
			}else if(styType == '1'){
				rs += "&shopTitle="+shopTitle+"&styType="+styType+"&cat="+cat+"&isHot="+isHot;;
			}else if(ncType == '1'){
				rs += "&shopTitle="+shopTitle+"&ncType="+ncType+"&cat="+cat+"&isHot="+isHot;;
			}else if(cdType == '1'){
				rs += "&shopTitle="+shopTitle+"&cdType="+cdType+"&cat="+cat+"&isHot="+isHot;;
			}else if(nzType == '' && czType == '' && skType == '' && styType == '' && ncType == '' && cdType == ''){
				rs += "&shopTitle="+shopTitle+"&cat="+cat+"&isHot="+isHot;;
			}
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
 	                   url: "/Zounongjia/nongjiaParam",
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
 		                	  
	 		             		list_content+= "<a href=\"" +"/Zounongjia/index/"
	 		             				+ ele.id + "\" target=\"_self\" data-ajax=\"false\"><li class=\"pageList clearfix\">" + 
	 		             				"<dt><img class='scrollLoading' src='"+ default_show_img+"' data-url=\"" + 
	 		             				ele.headshot.replace("/weixin_image/","/weixin_image_small/") + "\" /></dt><dd>";  
	 		             	 
	 		             		list_content+= "<h2 class=\"f16\">" + cutString(ele.userName,8) + "</h2>";
	 		             		list_content+= "<p class=\"cGrey mt5\">" + cutString(ele.storeAddr,12)+ "</p>";
		 		   			  
		 		   				list_content+= "<div class=\"clearfix mt5\"><span class=\"fr\">";
		 		   				var distance = ele.distance;
		 		   			 
			 					if (distance < 1) {
			 						list_content+= toDecimal(distance*1000) + "K</span>";
			 					} else {
			 						list_content+= toDecimal(distance) + "KM</span>";
			 					}   
			 					list_content+= "农家乐&nbsp;&nbsp;"+ ele.typeSon +"</div></dd></li></a>"
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
        
        
      //保留两位小数    功能：将浮点数四舍五入，取小数点后2位          
		function toDecimal(x) {   
		    var f = parseFloat(x);              
			f = Math.round(x*100)/100;              
			return f;          
		}  
    
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
    	
});