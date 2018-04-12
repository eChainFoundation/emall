$(document).ready(function() { 
	
	$.datepicker.regional['zh-CN'] = {  
	        closeText: '关闭',  
	        prevText: '<上月',  
	        nextText: '下月>',  
	        currentText: '今天',  
	        monthNames: ['一月','二月','三月','四月','五月','六月',  
	        '七月','八月','九月','十月','十一月','十二月'],  
	        monthNamesShort: ['一','二','三','四','五','六',  
	        '七','八','九','十','十一','十二'],  
	        dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],  
	        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],  
	        dayNamesMin: ['日','一','二','三','四','五','六'],  
	        weekHeader: '周',  
	        dateFormat: 'yy-mm-dd',  
	        firstDay: 1,  
	        isRTL: false,  
	        showMonthAfterYear: true,  
	        yearSuffix: '年'};  
	    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);  
	
   $("#startDate").datepicker(); 	
   $("#endDate").datepicker(); 
   
   
   $("#selectsubmit").unbind("click").bind("click", function() {
	   
	   var obj = document.getElementsByTagName("option")  
	   var userName = $("#userName").val();
	   if(isEmpty(userName)){
		    showMessage("商家名不能为空");
			return false;
	   }
	   
	    var ajaxData = "&userInfoId="+$("#userInfoId").val();
	    
		  $.ajax({  
				url : "/wx_hongbao/select_user.action",  
				data :"&userName="+userName,    
				type : "post",  
				cache : false,  
				async:false, 
				dataType : "json", 
				error: function(e) { 
					  alert("提交失败");
	            }, 
				success:function(data){
					if(data.status=="1"){
						 $("#userInfoId").val(data.userInfoId);
						//遍历option  
						for(var i=0;i<obj.length;i++){  
						    if(obj[i].value == data.userInfoId){  
						        obj[i].selected=true;  //相等则选中  
						    }  
						} 
						 
					}else{
						 alert(data.errorMessage);
					}
				}
		  });
	   
   });
   

   
   $("#dosubmit").unbind("click").bind("click", function() {
	   
	   var id = $("#id").val();
	   var moneyMax = $("#moneyMax").val();
	   var moneyAmount = $("#moneyAmount").val();
	   var numberAmount = $("#numberAmount").val();
	   var actName = $("#actName").val();
	   var remark = $("#remark").val();
	   var wishing = $("#wishing").val();
	   var sendName = $("#sendName").val();
	   var userInfoId = $("#userInfoId").val();
	   
	   if(isEmpty(userInfoId)){
			showMessage("请选择发此红包的商家");
			return false;
		 }
		if(isEmpty(moneyMax)){
			showMessage("单个红包最大金额不能为空");
			return false;
		 }
		 if(isEmpty(moneyAmount)){
			showMessage("红包能发送的总金额不能为空");
			return false;
		 }
		 if(isEmpty(numberAmount)){
			showMessage("需要发送的红包个数不能为空");
			return false;
		 }
		 if(isEmpty(actName)){
			showMessage("活动名称不能为空");
			return false;
		 }
		 if(isEmpty(remark)){
			showMessage("备注不能为空");
			return false;
		 }
		 if(isEmpty(wishing)){
			showMessage("红包祝福语不能为空");
			return false;
		 }
		 if(isEmpty(sendName)){
			showMessage("发送此红包者名称不能为空");
			return false;
		 }
	   
	     var ajaxData = "id="+id +"&moneyMax="+moneyMax +"&moneyAmount="+moneyAmount
			+"&numberAmount="+numberAmount +"&actName="+actName +"&remark="+remark
			+"&wishing="+wishing +"&sendName="+sendName +"&userInfoId="+userInfoId
			+"&startDate="+$("#startDate").val()+"&endDate="+$("#endDate").val()
			+"&startTime="+$("#startTime").val()+"&endTime="+$("#endTime").val();
			
		  $.ajax({  
				url : "/wx_hongbao/edit.action",  
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
						 clickUrl("/wx_hongbao/list.action");
					}else{
						 alert(data.errorMessage);
					}
				}
		  });
    });


});