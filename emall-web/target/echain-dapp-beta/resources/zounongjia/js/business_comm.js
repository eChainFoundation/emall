$(document).ready(function() {  
  
    $(document.body).prepend(' <div id="dialogAlert" class="dialogBox" title="走农家" style="display:none">'+
    	       ' style1'+
    	    '</div>'+
    	    '<div id="dialogConfirm" class="dialogBox" title="走农家" style="display:none" >'+
    	       ' style2'+
       '</div>'); 
	  
	 $('.backBtn').bind("click",function() {//返回按钮
		  var _this = $(this);
		  var is_customized = _this.attr("is_customized");
		  if(isEmpty(is_customized)){ 
			  if(isEmpty(document.referrer)){
				  clickUrl("/Zounongjia/shouye");
			  }else{
				   history.go(-1);  
			  } 
		  }
		 
		
	 });  
	 
	 $('.goHome').bind("click",function() {//返回按钮
		  var _this = $(this);
		  clickUrl("/Zounongjia/shouye"); 
		
	 });  
	 
	
});


function getLongitude(){
	var ele_value = getCookie("longitude");
	if(isEmpty(ele_value)){
		return 0;
	}
	return ele_value;
}


function getLatitude(){
	var ele_value = getCookie("latitude");
	if(isEmpty(ele_value)){
		return 0;
	}
	return ele_value;
}

function setLatitude(latitude){
	  setCookieForever("latitude",latitude); 
}

function setLongitude(longitude){
	  setCookieForever("longitude",longitude); 
}

function processIfEmpty(ele_value){
	if(isEmpty(ele_value)){
		return "";
	}else{
		return ele_value;
	}
}

function setCityId(cityId){ 
	setCookieForever("city_id",cityId); 
}

function getCityId(){
	var cityId = getCookie("city_id");
	if(isEmpty(cityId)){
		return default_city_id;
	}
	return cityId;
}


function getShareUserId(){
	 if(getUserId() !=""){
		 return getUserId();
	 }else{
		 return 0;
	 }
}

function getRecommandUserId(){
	var recommandUserId = getCookie("recommandUserId");
	if(isEmpty(recommandUserId)){
		return 0;
	}
	return recommandUserId;
}


function clickUrl(url){ 
	 location.href =url;  
}

function clearCookie(){
	
	
}

function setDirectUrl(v){//用户登录后返回的地址
	var seconds = 1800;
	if(isDefined(v)){
		setCookieByExpires("loginDirectUrl",v,seconds);
	}else{
		setCookieByExpires("loginDirectUrl",window.location.href,seconds);
	}

}

function getDirectUrl(){
	return getCookie("loginDirectUrl");
}

function redirectToLogin(){
	  var dirU = encodeURI(getDirectUrl()); 
	  clickUrl("/MyZounongjia/my?url="+dirU);
	//showMessage("请先登录"); 
}

function showMessage(msg){ 
	 $( "#dialogAlert" ).text(msg); 
	 $( "#dialogAlert" ).dialog({
		autoOpen: false,
		width: 460,
		show:200,
		hide:200,
		modal: true,
		buttons: [
			{
				class:'dialogBtn',
				text: "确定",
				click: function() {
					$(this).dialog("close"); 
				}
			}
		]
	});
	 $( '#dialogAlert' ).dialog( 'open' ); 
	 event.preventDefault();
}
function showMessageWithCallBack(msg,callFun){ 
	   showMessage(msg);
	   setTimeout(callFun,2000); 
}

function showMessageWithCallBackConfirm(msg,callFun){    
    $( "#dialogConfirm" ).text(msg); 
	$( "#dialogConfirm" ).dialog({
		autoOpen: false,
		width: 460,
		show:200,
		hide:200,
		modal: true,
		buttons: [ 
			{
				class:'dialogBtn',
				text: "确定",
				click: function() {
					callFun();
					$(this).dialog("close");
 				}
			}
		]
	});
	 $( '#dialogConfirm' ).dialog( 'open' ); 
    event.preventDefault();
}

function confirmDialog(message_config){
	var msg = default_value(message_config.msg,"");
	var ok_func = default_value(message_config.ok_func,null);
	var no_func = default_value(message_config.no_func,null); 
	 $( "#dialogConfirm" ).text(msg); 
	$( "#dialogConfirm" ).dialog({
		autoOpen: false,
		width: 460,
		show:200,
		hide:200,
		modal: true,
		buttons: [
			{
				class:'dialogCloseBtn',
				text: "取消",
				click: function() {
					if(no_func!=null){
			    		no_func();
			    	}  
					$(this).dialog("close");
 				}
			},
			{
				class:'dialogBtn',
				text: "确定",
				click: function() {
					if(ok_func!=null){
			    		ok_func();
			    	} 
					$(this).dialog("close");
 				}
			}
		]
	});
	 $( '#dialogConfirm' ).dialog( 'open' ); 
    event.preventDefault();
/*    if(confirm(msg)){
    	if(ok_func!=null){
    		ok_func();
    	} 
    }else{
    	if(no_func!=null){
    		no_func();
    	}  
    }*/

}
 