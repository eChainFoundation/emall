$(document).ready(function() { 
	 $('.backBtn').bind("click",function() {//返回按钮
		  var _this = $(this);
		  var back_url = _this.attr("back_url");  
		  if(isEmpty(back_url)){
			    bak_url();
		   }else {
			   if(isEmpty(getOrderJson())){
				   bak_url();
			   }else{
				   clickUrl(back_url);  
			   }
			   
		   } 
		
	 });  
	
});


function bak_url(){
	  if(isEmpty(document.referrer)){ 
		  clickUrl("/Zounongjia/shouye");
	  } else{
		  history.go(-1);
	  } 
}