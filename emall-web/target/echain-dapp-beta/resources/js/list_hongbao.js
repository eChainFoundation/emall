$(document).ready(function() {
	
 
    
    $(".del_ele").each(function() {
    	  var ele = $(this);
    	  ele.unbind("click").bind("click",
    		        function() {
    		  var _this = $(this);
    		  var id = _this.attr("ele_id");
    		  if(!confirm("确定删除？")){
    			  return ;
    		  }
    		  $.ajax({  
    				url : "/wx_hongbao/delete.action",  
    				data : "&id="+id,   
    				type : "post",  
    				async:false, 
    				cache : false,  
    				dataType : "json",  
    				success:  function(data){
    					  if(data.status=="1"){
    						  alert("操作成功"); 
    						  $("#submitForm").submit();
    					  }else{
						 	  alert(data.errorMessage);
						  }
    					 
    				}
    		  }); 
    	    });
    });
    
    
    $(".close_ele").each(function() {
    	  var ele = $(this);
    	  ele.unbind("click").bind("click",
    		        function() {
    		  var _this = $(this);
    		  var id = _this.attr("ele_id");
    		  if(!confirm("确定关闭？")){
    			  return ;
    		  }
    		  var reload = _this.attr("reload");
    		  $.ajax({  
    				url : "/wx_hongbao/close.action",  
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
    						  alert("操作成功"); 
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
    
    
    $(".open_ele").each(function() {
    	  var ele = $(this);
    	  ele.unbind("click").bind("click",
    		        function() {
    		  var _this = $(this);
    		  var id = _this.attr("ele_id");
    		  var reload = _this.attr("reload");
    		  if(!confirm("确定开启？")){
    			  return ;
    		  }
    		  $.ajax({  
	    		  url : "/wx_hongbao/open.action",  
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
	    						  alert("操作成功"); 
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