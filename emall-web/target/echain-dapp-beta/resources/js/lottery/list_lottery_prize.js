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
    				url : "/lottery/deletePrize.action",  
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
    
    
});