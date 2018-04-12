$(document).ready(function() { 
	
   $("#dosubmit").unbind("click").bind("click", function() {
	   
	   var id = $("#id").val();
	   var productId = $("#productId").val();
	   var platformCommissionRate = $("#platformCommissionRate").val();
	   var agentCommissionRate = $("#agentCommissionRate").val();
	   var personCommissionRate = $("#personCommissionRate").val();
	   var commissionPlatformMin = $("#commissionPlatformMin").val();
	   var commissionPlatformMax = $("#commissionPlatformMax").val();
	   
	   if(isEmpty(platformCommissionRate)){
			showMessage("平台佣金不能为空");
			return false;
	   }/*else if(platformCommissionRate < commissionPlatformMin){
		    showMessage("平台佣金不得低于"+ commissionPlatformMin + "%");
			return false;
	   }else if(platformCommissionRate > commissionPlatformMax){
		    showMessage("平台佣金不得高于"+ commissionPlatformMax + "%");
			return false;
	   }*/
	   if(isEmpty(agentCommissionRate)){
			showMessage("代销商佣金不能为空");
			return false;
	   }/*else if(agentCommissionRate < 0){
		   showMessage("代销商佣金不得小于0");
			return false;
	   }else if(agentCommissionRate > commissionPlatformMax){
		    showMessage("代销商佣金不得高于"+ commissionPlatformMax + "%");
			return false;
	   }*/
	   if(isEmpty(personCommissionRate)){
			showMessage("个人佣金不能为空");
			return false;
	   }/*else if(personCommissionRate < 0){
		   showMessage("个人佣金不得小于0");
			return false;
	   }else if(personCommissionRate > commissionPlatformMax){
		    showMessage("个人佣金不得高于"+ commissionPlatformMax + "%");
			return false;
	   }*/
		 
	     var ajaxData = "id="+id +"&productId="+productId 
	     	+"&platformCommissionRate="+platformCommissionRate
			+"&agentCommissionRate="+agentCommissionRate
			+"&personCommissionRate="+personCommissionRate;
			
		  $.ajax({  
				url : "/ZnjProduct/editYj.action",  
				data :ajaxData,    
				type : "post",  
				cache : false,  
				async:false, 
				dataType : "json", 
				error: function(e) { 
					alert("提交失败!");
	            }, 
				success: function(data){
					if(data.status=="1"){
						 alert("操作成功");
						 clickUrl("/ZnjProduct/listZnjProduct");
					}else{
						 alert(data.errorMessage);
					}
				}
		  });
    });


});