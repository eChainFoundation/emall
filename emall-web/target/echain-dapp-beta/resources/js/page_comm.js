$(document).ready(function() {
	
    $(".rollPage").each(function() {
  	  var ele = $(this);
  	  ele.unbind("click").bind("click",
  		        function() {
  		  var _this = $(this);
  		  $("#pageNo").val(_this.attr("pageNo"));
  		  
  		  $("#submitForm").submit();
  	    });
  });
    
    $(".skip").each(function() {
    	  var ele = $(this);
     	  var countPage = $("#countPage").val();
    	  ele.unbind("click").bind("click",function() {
    		  var inputPageNo = $("#inputPageNo").val();
    		  $("#pageNo").val(inputPageNo);
    		  if(inputPageNo==null || inputPageNo==''){
    			  return false;
    		  }else if(inputPageNo<=countPage && inputPageNo>0){
        		  $("#submitForm").submit();
    		  }else{
    			  alert('所填页码不在页数范围内');
    			  return false;
    		  }
    		  
    	  });
    });
    
    
});