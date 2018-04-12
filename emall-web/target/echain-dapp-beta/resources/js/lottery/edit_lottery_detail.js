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
   
   
   $("#dosubmit").unbind("click").bind("click", function() {
	   
	   var id = $("#id").val();
	   var lotteryTitle = $("#lotteryTitle").val();
	   var lotteryingType = $("#lotteryingType").val();
	   var lotteryingMaxNumber = $("#lotteryingMaxNumber").val();
	   var lotteryDesc = $("#lotteryDesc").val();
	   var startTime = $("#startTime").val();
	   var endTime = $("#endTime").val();
	   
	   var lotteryingProbability = $("#lotteryingProbability").val();
	   
	   var userInfoId = $("#userInfoId").val();
	   
	   
		if(isEmpty(lotteryTitle)){
			showMessage("抽奖名称不能为空");
			return false;
		 }
		 if(isEmpty(lotteryingType)){
			showMessage("允许用户中奖抽取次数不能为空");
			return false;
		 }
		 if(isEmpty(lotteryingMaxNumber)){
			showMessage("中奖模式下允许抽取的次数不能为空");
			return false;
		 }
		 if(isEmpty(startTime)){
			showMessage("开始时间不能为空");
			return false;
		 }
		 if(isEmpty(endTime)){
			showMessage("结束时间不能为空");
			return false;
		 }
		 if(isEmpty(lotteryDesc)){
			showMessage("抽奖描述不能为空");
			return false;
		 }
		 
		 if(isEmpty(lotteryingProbability)){
			 lotteryingProbability = 10;
		 }
		
	   
	     var ajaxData = "id="+id +"&lotteryTitle="+lotteryTitle +"&lotteryingType="+lotteryingType
			+"&lotteryingMaxNumber="+lotteryingMaxNumber
			+"&lotteryDesc="+lotteryDesc +"&userInfoId="+userInfoId
			+"&startDate="+$("#startDate").val()+"&endDate="+$("#endDate").val()
			+"&startTime="+startTime +"&endTime="+endTime +"&lotteryingProbability="+lotteryingProbability  ;
			
		  $.ajax({  
				url : "/lottery/edit.action",  
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
						 clickUrl("/lottery/detail_list.action");
					}else{
						 alert(data.errorMessage);
					}
				}
		  });
    });


});