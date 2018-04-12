function isDefined(value){
	if(typeof(value)!="undefined"){
		return true;
	}else{
		return false;
	}
	
}

function clickUrl(url){ 
	 location.href =url;  
}


function closeSelfPage(){
	if(browser.versions.isWeixin){
	    WeixinJSBridge.call('closeWindow');
	}else{
		var userAgent = navigator.userAgent;
		if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Presto") != -1) {
		    window.location.replace("about:blank");
		} else {
		    window.opener = null;
		    window.open("", "_self");
		    window.close();
		}
	}
	

}

function isEmptyInEles(eles){
	 for(var loop = 0 ; loop <eles.length;loop++ ){ 
   	   var ele = eles[loop];
		var value = $("#"+ele).val();
		if(isEmpty(value)){
			return true;
		}
	};
	
	return false;
}

function linkUrl(url){ 
	 location.href =url;  
}


function isEmpty(str){
	if(!isDefined(str) || str == null || str == ""){
		return true;
	}else{
		return false;
	}
	
}

function isNotEmpty(str){
	return !isEmpty(str);
	
}


function isChinese(str){  //判断字符是否全是中文字符 

	var reg = /^[\u4E00-\u9FA5]+$/; 
	if(!reg.test(str)){  
		return false; 
	}else{ 
		return true; 
	} 
} 

function isUserLogin(){ 
	 if(isEmpty(getUserId())||isEmpty(getCookie("relogin_for_weixin_user_name"))){
		 return false;
	 }else{
		 return true;
	 }
}

function limitImg(ele,width,height){
	if(ele.width >= width){
		ele.width = width;
	}
	
	if(ele.height >= height){
		ele.height = height;
	}
}

function getCheckBoxSingleValue(valueName){
	
	var rsValue ="";
	$('input[name="'+valueName+'"]').each(function(){ 
		var _this = $(this);
		
		if(_this.is(':checked')){
			rsValue =  _this.val(); 
		     return ;
			//  alert( _this.val()+" "+_this.is(':checked')); 
		}
	
	 });
	
	return rsValue;
}


function isCheckBoxChecked(valueName){
	
	var rsValue =false;
	
	$('input[name="'+valueName+'"]').each(function(){ 
		var _this = $(this); 
		if(_this.is(':checked')){ 
			rsValue =true;
		    return ; 
		}
	
	 }); 
	return rsValue;
}

function getUserId(){
	 var userId = getCookie("loginUserId");
	 if(userId==null || userId ==""){
		 return "";
	 }else{
		 return userId;
	 }
}

function encryptPassword(password){
	   password = rsaEncrypt(password);
	   password =  $.md5(password); 
	   return password;
}

//RSA加密function
function rsaEncrypt(thisPwd){
	var key ;  
	setMaxDigits(130);
	key = new RSAKeyPair ($("#exponent").val(),"",$("#modulus").val());
	var result = encryptedString(key, encodeURIComponent(thisPwd));  
	return result;
 }




function trim(stri) { 
	return stri.replace(/(^\s*)|(\s*$)/g, ""); 
} 

function cutString(s,maxLength){ 
	if(isEmpty(s)){
		return "";
	} 
	if(s.length > maxLength ){
		return s.substring(0,maxLength)+"...";
	} 
	return s;
	
} 


function subString(s,maxLength){
	if(isEmpty(s)){
		return "";
	} 
	if(s.length > maxLength ){
		return s.substring(0,maxLength);
	} 
	return s;
}

function radioCheck(radioEleName,defaultValue){
	radio_oj = document.getElementsByName(radioEleName);
	 for(var i=0;i<radio_oj.length;i++) {//循环 
	        if(radio_oj[i].value==defaultValue){  //比较值
	            radio_oj[i].checked=true; //修改选中状态
	            break; //停止循环
	        }
	   }
}


function isNumberic(value){
    var patrn= /^[1-9]+[0-9]*]*$/; 
 	if (!patrn.exec(value)) return false ;
    return true; 
  } 
		 
function isDigit(value){
	     var patrn=/^\d+(\.\d+)?$/; 
	 	if (!patrn.exec(value)) return false ;
        return true;
 }

function isMobilPhoneNumber(s) 
{ 
	var patrn=/1[3-9]+\d{9}/; 
	if (!patrn.exec(s)) return false ;
	if(s.length == 11){
		 return true 
	}else{
		return false;
	}
	
}


function isEmailAddress(emailValue){
		var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; 
		if(!reg.test(emailValue)) {
		   return false;
		}
		
		return true;
}

function getobj(a) {
    return $("#" + a)
}
function gotoClick() {}
String.prototype.trim = function() {
    return $.trim(this)
};
function getTrimVal(a) {
    return $("#" + a).val().trim()
}
function GetRandomNum(a, c) {
    var b = c - a;
    var d = Math.random();
    return (a + Math.round(d * b))
}
function setDisabled(a) {
    getobj(a).attr("disabled", true)
}
function setEnabled(a) {
    getobj(a).removeAttr("disabled")
}
function setWait(a) {
    getobj(a).attr("disabled", true).css("cursor", "wait")
}
function setUnWait(a) {
    getobj(a).removeAttr("disabled").css("cursor", "pointer")
}
function getStrLen(a) {
    return a.replace(/[^\x00-\xff]/g, "**").length
}
function formatFloat(a) {
    a = Math.round(a * 1000) / 1000;
    a = Math.round(a * 100) / 100;
    if (/^\d+$/.test(a)) {
        return a + ".00"
    }
    if (/^\d+\.\d$/.test(a)) {
        return a + "0"
    }
    return a
}
function prohibitedCopy() {
    $(document.body).bind("copy",
    function() {
        try {
            clipboardData.setData("text", "\u672c\u9875\u5185\u5bb9\u672a\u7ecf\u5141\u8bb8\u8bf7\u4e0d\u8981\u968f\u610f\u590d\u5236")
        } catch(a) {}
        return false
    })
}
function closeWindow() {
    if (document.all) {
        window.opener = null
    }
    window.open("", "_top", "");
    window.close();
    return false
}
function getPageDataArray() {
    var b = /([^\?&]+)=([^&]*)/g;
    var a = new Object();
    while (arr = b.exec(location.href)) {
        a[arr[1]] = arr[2] ? arr[2] : ""
    }
    return a
}
function failDialog(b, a) {
    var c = '<div class="mAltFail"><s></s>' + b + "</div>";
    $.PageDialog(c, {
        W: (a === undefined ? 200 : a),
        H: 60,
        close: false,
        autoClose: true
    })
}
function okDialog(b, a) {
    var c = '<div class="mAltOK"><s></s>' + b + "</div>";
    $.PageDialog(c, {
        W: (a === undefined ? 200 : a),
        H: 60,
        close: false,
        autoClose: true
    })
}

var browser={
		versions:function(){
				var u = navigator.userAgent, app = navigator.appVersion;
				var accessType = getCookie("accessType");
				return {         //移动终端浏览器版本信息
					 trident: u.indexOf('Trident') > -1, //IE内核
					presto: u.indexOf('Presto') > -1, //opera内核
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					isAndroidApp:accessType!=null && accessType=="android", //android app
					isIOSApp:accessType!=null && accessType=="ios", //ios app
					isWeixin:u.toLowerCase().match(/MicroMessenger/i) == "micromessenger", //ios app
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
					iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf('iPad') > -1, //是否iPad
					webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
				};
			 }(),
			 language:(navigator.browserLanguage || navigator.language).toLowerCase()
 }

function setCookie(name, value) {
    document.cookie = name + "=" + escape(value) + ";id=17shenghuo;path=/;";
}

function setCookieForever(name, value) {
	//2147483647
	setCookieByExpires(name, value,2147483647);
}

function setCookieByExpires(name, value, seconds) { 
    var exp = new Date();
    exp.setTime(exp.getTime() + seconds * 1000);
    document.cookie = name + "=" + escape(value) + ";id=17shenghuo;path=/;expires=" + exp.toGMTString()
}
function getCookie(name) { 
	var arrStr = document.cookie.split("; "); 
	for(var i = 0;i < arrStr.length;i ++){ 
	var temp = arrStr[i].split("="); 
	if(temp[0] == name){
		if (temp[1]=='""'){
			return null;
		}  
		return unescape(temp[1]);  
	} 
	} 
} 

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";id=17shenghuo;path=/;expires=" + exp.toGMTString() + ";" 
    }
}
function confirmDialog(b, a) {
    $.PageDialog.showConfirm(b, a)
}
$.cookie = function(c, h, e) {
    if (typeof h != "undefined") {
        e = e || {};
        if (h === null) {
            h = "";
            e.expires = -1
        }
        var l = "";
        if (e.expires && (typeof e.expires == "number" || e.expires.toUTCString)) {
            var k;
            if (typeof e.expires == "number") {
                k = new Date();
                k.setTime(k.getTime() + (e.expires * 24 * 60 * 60 * 1000))
            } else {
                k = e.expires
            }
            l = "; expires=" + k.toUTCString()
        }
        var f = e.path ? "; path=" + (e.path) : "";
        var j = e.domain ? "; domain=" + (e.domain) : "";
        var d = e.secure ? "; secure": "";
        document.cookie = [c, "=", encodeURIComponent(h), l, f, j, d].join("")
    } else {
        var a = null;
        if (document.cookie && document.cookie != "") {
            var g = document.cookie.split(";");
            for (var i = 0; i < g.length; i++) {
                var b = jQuery.trim(g[i]);
                if (b.substring(0, c.length + 1) == (c + "=")) {
                    a = decodeURIComponent(b.substring(c.length + 1));
                    break
                }
            }
        }
        return a
    }
};
$.extend({
    loadcss: function(b, a) {
        $("head").append('<link rel="stylesheet" type="text/css" href="' + b + '">').ready(function() {
            a()
        })
    }
});