 

function bindPublishClick(){
	 var pub_edit_ele = $("#product_edit_ele");
	 
	 
//	   if($("#productName").val() == ""){
//		   alert("请填写产品名");
//		   return ;
//	   }
//	 
	 
	   
	 pub_edit_ele.unbind("click").bind("click", function() {
		 
		 var productDescription = CKEDITOR.instances.productDescription.getData();
		 var sellNumber = $("#sellNumber").val();
		 if(isEmpty(sellNumber)){
			 sellNumber = "";
		 } 
		  $.ajax({
		        url: "/ZnjProduct/saveOrUpdateZnjProducts",
		        data:{"id":$("#id").val(),"productName":$("#productName").val(),"productCat":$("#productCat").val(),"productPicture":$("#productPicture").val()
		        	,"productSmallDesc":$("#productSmallDesc").val(),"productPhone":$("#productPhone").val(),"productDanwei":$("#productDanwei").val()
		        	,"luruAdmin":$("#luruAdmin").val(),"productDescription":productDescription,"productType":$("#productType").val()
		        	,"price":$("#price").val(),"zhekouPrice":$("#zhekouPrice").val(),"sellNumber":sellNumber,
		        	"startTime":$("#startTime").val(),"endTime":$("#endTime").val()},
		        dataType:"json",
		        type: 'POST',
		        traditional:true,
		        error: function(e) { 
		        	bindPublishClick();
		         }, 
		        success: function(data) { 
		      	    if(data.status=="1"){
//		      	    	var callBackFunc = 'clickUrl("/app_user/my_publish.html")';
		      	    	if($("#id").val()==""){
		      	    		alert("添加成功");
//		      	    		showMessageWithCallBack("添加成功",callBackFunc);
		      	    	}else{
		      	    		alert("修改成功");
		      	    	}
		      	       
		      	    	$("#id").val(data.id);
		      	    	$("#product_edit_ele").text("保存");
		      	     
		      	    }else{
		      	    	alert(data.errorMessage);	
		      	    }
		      	  
		         
		        }
			  });
      });
	
} 
 

$(document).ready(function() {    
	bindPublishClick();
});

	
