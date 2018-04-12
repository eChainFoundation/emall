$(document).ready(function() { 
	
   
   $(".selectsubmit").mouseenter( function() {
	   
	   var userInfoId = $(this).attr("u_id"); 
		  $.ajax({  
				url : "/ZnjProduct/select_user.action",  
				data :"&userInfoId="+userInfoId,    
				type : "post",  
				cache : false,  
				async:false, 
				dataType : "json", 
				error: function(e) { 
					 	$("#showUserName").text("<....>");
	            }, 
				success:function(data){
					if(data.status=="1"){ 
						$("#showUserName").text(data.userName);
					}else{
						 alert(data.errorMessage);
					}
				}
		  });
	   
   });
  
   refreshAgentClick()
   
   

   
});

function refreshAgentClick(){
	   $(".agentHrefEle").each(function() {
	        var _this = $(this);
	         var product_id =_this.attr("product_id");
	         
	         $.get("/product/check_agent?productId="+product_id,function(data){
	        	 data = eval("(" + data + ")");
	        	 var linkUrl = "";
	        	 if(data.agented=="0"){
	        		 linkUrl = "/product/agentProduct"; 
	        		 _this.text("代理");
	        	 }else{
	        		 if(data.owned=="0"){
	        			 linkUrl = "/product/cancel_agent"; 
	            		 _this.text("取消代理");
	        		 }else {
	        			 _this.text("自有产品");
	        		 }
	        	
	        	 }
	        	 
	        	  _this.unbind("click").bind("click", function() {
	        		  if(linkUrl==""){
	        			  return ;
	        		  } 
	        		  
	        		  $.get(linkUrl+"?productId="+product_id,function(agt_data){
	        			  agt_data = eval("(" + agt_data + ")");
	        			  refreshAgentClick();
	        			  if(agt_data.status=="1"){
	        				  alert(_this.text()+"成功");
	        			  }else{
	        				  alert("你已理"+_this.text());
	        			  }
	        		  }); 
	              });
	        	 
	         }); 
	         
	       
	   }); 
}