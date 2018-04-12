$(document).ready(function() { 
	
   $("#dosubmit").unbind("click").bind("click", function() {
	   
	   var id = $("#id").val();
	   var detailId = $("#detailId").val();
	   var prizeTitle = $("#prizeTitle").val();
	   var prizeType = $("#prizeType").val();
	   var prizeOrder = $("#prizeOrder").val();
	   var prizeNumber = $("#prizeNumber").val();
	   
	   var userInfoId = $("#userInfoId").val();
	   
		if(isEmpty(prizeTitle)){
			showMessage("奖品名称不能为空");
			return false;
		 }
		 if(isEmpty(prizeType)){
			showMessage("奖品类型不能为空");
			return false;
		 }
		 if(isEmpty(prizeOrder)){
			showMessage("第几等奖项不能为空");
			return false;
		 }
		 if(isEmpty(prizeNumber)){
			showMessage("奖品个数不能为空");
			return false;
		 }
	   
	     var ajaxData = "id="+id +"&prizeTitle="+prizeTitle +"&prizeType="+prizeType
			+"&prizeOrder="+prizeOrder +"&detailId="+detailId
			+"&prizeNumber="+prizeNumber +"&userInfoId="+userInfoId;
		 
		  $.ajax({  
				url : "/lottery/editPrize.action",  
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
						 alert("添加奖品成功");
						 clickUrl("/lottery/list_prize.action?detailId="+data.detailId);
					}else{
						 alert(data.errorMessage);
					}
				}
		  });
    });


});