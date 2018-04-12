function regCollectShop(){
	$("#collectEle").unbind("click").bind("click", function() {
            $.ajax({
                url: "/MUserShop/collect",
                cache: false,
                data: "userInfoId="+processIfEmpty($("#userInfoId").val()),
                dataType:"json",  
                success: function(data) {
             	   if(data.status == "1"){ 
             		  showMessage("收藏成功"); 
             		  if(isDefined($("#collectEle"))){
             				$("#collectEle").addClass("current");
             				$("#collectEle").addClass("active");
             		  }
             		  
             	   }else{
             		  showMessage(data.errorMessage); 
             	   }
                }
            }); 
});
}