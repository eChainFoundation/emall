$(document).ready(function() {
	
    
    $(".exchange_ele").each(function() {
    	  var ele = $(this);
    	  ele.unbind("click").bind("click",
    		        function() {
    		  var _this = $(this);
    		  var id = _this.attr("ele_id");
    		  var reload = _this.attr("reload");
    		  if(!confirm("确定兑换？")){
    			  return ;
    		  }
    		  $.ajax({  
	    		  url : "/lottery/exchange.action",  
	    				data : "&id="+id,    
	    				type : "post",  
	    				cache : false,  
	    				async : false, 
	    				dataType : "json",  
	    				error: function(e) { 
						  alert("提交失败");
		                }, 
	    				success:function(data){  
	    					  if(data.status=="1"){
	    						  alert("兑换成功"); 
	    						  if(reload=="true"){
	    							  $("#submitForm").submit();
	    						  }
	    					  }else{
							 	  alert(data.errorMessage);
							  }
	    				}
	    		  });
    		
    	    });
    });
    
	
});