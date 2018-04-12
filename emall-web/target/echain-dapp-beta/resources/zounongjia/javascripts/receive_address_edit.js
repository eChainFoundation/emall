 

function saveAddressClick(){
	 var edit_address = $("#save_address"); 
	 
	 edit_address.unbind("click").bind("click", function() {
		var is_status_check= $("#status").is(":checked");
//		var status = $('input:checkbox[name="status"]:checked').val(); 
		var status =default_value($("#default_status").val(),"0");;
		if(is_status_check){ 
			 status = "1";
		}
		  
		if(isEmpty($("#districtId").val())){
			 showMessage("请选择区域");
			 return ;
		}
		if(isEmpty($("#address").val())){
			 showMessage("请填写详细地址");
			 return ;
		}
		if(isEmpty($("#linkPerson").val())){
			 showMessage("请填写收货人姓名");
			 return ;
		}
		if(isEmpty($("#linkPhone").val())  ){
			 showMessage("请填写收货人电话");
			 return ;
		}else if(!isMobilePhoneNumber($("#linkPhone").val())  ){
			 showMessage("请填写正确的手机号");
			 return ;
		} 
		
		var postCode = $("#postCode").val();
		if(isEmpty(postCode)){
			// showMessage("请填写邮政编码");
			 //return ;
			postCode = "";
		}
		 
		var id = $("#id").val();
		var provinceId = $("#provinceId").val();
		var cityId = $("#cityId").val();
		var districtId = $("#districtId").val();
		 
		  $.ajax({
		        url: "/address/edit_address",
		        data:{"id": id,"provinceId": provinceId,"cityId": cityId,"districtId": districtId
		        	,"address":$("#address").val(),"linkPerson":$("#linkPerson").val(),"linkPhone":$("#linkPhone").val()
		        	,"postCode":postCode,"status": status},
		        dataType:"json",
		        type: 'POST',
		        traditional:true,
		        error: function(e) { 
		        	saveAddressClick();
		         }, 
		        success: function(data) { 
		      	    if(data.status=="1"){
 	      	    	  var callBackFunc = 'clickUrl("/address/to_select_address")';
		 	      	  if(isEmpty(getOrderJson())){
		 	      	    	callBackFunc = 'clickUrl("/address/to_manage_address")';
		 	      	   }
		      	    	if($("#id").val()==""){ 
 		      	    		showMessageWithCallBack("添加成功",callBackFunc);
		      	    	}else{
		      	    		showMessageWithCallBack("修改收货地址成功",callBackFunc); 
		      	    	} 
		      	    	$("#id").val(data.id);
		      	    	$("#save_address").text("保存地址");
		      	     
		      	    }else{
		      	    	showMessage(data.errorMessage);	
		      	    }
		         
		        }
			 });
      });
	
} 
 

$(document).ready(function() {    
	
	
	  if(!isUserLogin()){
		  setDirectUrl();
		  showMessageWithCallBack("请先登录",function (){
			  redirectToLogin();
		  }) ;
		  return ;
	  } 	
	
	saveAddressClick(); 
	 $(".delAddressEle").unbind("click").bind("click", function() {
	
	 var _this = $(this);	
	 var addr_id = _this.attr("addr_id");
	 
	 var message_config = {"msg":"确认要删除?","ok_func":function(){ 
		  $.ajax({
		        url: "/address/delete_address",
		        data:{"id": addr_id},
		        dataType:"json",
		        type: 'POST',
		        traditional:true,
		        success: function(data) {  
		        	if(data.status=="1"){
		        		 showMessageWithCallBack("删除成功",function(){clickUrl("/address/to_manage_address")});
		        	}else{
		        		showMessage("删除失败");
		        	}
		        }
		  }) 
		
	 }};
	 
	 confirmDialog(message_config);
	
	 });
});

