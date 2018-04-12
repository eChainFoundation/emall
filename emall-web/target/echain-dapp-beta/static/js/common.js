function url(){
	//return "http://test.dousha8ao.com/" //test
	return 'http://www.dousha8ao.com/' //wwww
}
function path(){
	return 'resource/par_res/' //wwww
	//return '/'  //test
}
// 公共input 表单验证方法 判断不为空
function verify(id, value,placeholder,$) {
	var name = $(id).val();
	if (name == '') {
		alert(value)
		return false;
	}else{
		return true;
	}
	$(id).focus(function() {
		$(id).attr('placeholder', placeholder);
	})
	
}

// 手机号正则验证(公共方法，只需传入id即可)
function phoneValidation(id,$) {
	var rePhone = /^1[3|4|5|7|8][0-9]\d{4,8}$/
	var usePhone = $(id).val();
	if (usePhone == '') {
		alert( '手机号不能为空!');
		return false;
	} else if (rePhone.test(usePhone)) {
		$(id).val(usePhone);
		return true
	} else {
		$(id).val('');
		alert('请输入正确的手机号!');
		return false;
	}
	$(id).focus(function() {
		$(id).attr('placeholder', '投保人手机号码');
	})
	
}

// 获取验证码计时器
var wait = 60;
var timer = null;
function time(o) {
	if (wait == 0) {
		clearTimeout(timer);
		timer = null;
		wait = 60;
		o.text("获取验证码");
		o.css({'color':'#f275ad','borderColor':'#f275ad'})
	} else {
		o.text("重新发送(" + (wait--) + ")");
		o.css({'color':'#999','borderColor':'#999'})
		timer = setTimeout(function() {
			time(o);
		}, 1000);
	}
}

//获取url的参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}
//原型继承Date
  	Date.prototype.format = function(format){ 
		var nextDate = new Date(new Date().getTime() - 24*60*60*1000- 24*60*60*1000); //钱三天
		console.log(nextDate)
		var that=nextDate;//之前为this,指当前时间
		var o = { 
			"M+" : that.getMonth()+1, //month 
			"d+" : that.getDate(), //day 
			"h+" : that.getHours(), //hour 
			"m+" : that.getMinutes(), //minute 
			"s+" : that.getSeconds(), //second 
			"q+" : Math.floor((that.getMonth()+3)/3), //quarter 
			"S" : that.getMilliseconds() //millisecond 
		} 
		console.log(o)
		if(/(y+)/.test(format)) { 
			format = format.replace(RegExp.$1, (that.getFullYear()+"").substr(4 - RegExp.$1.length)); 
			console.log(format)
		} 

		for(var k in o) { 
			if(new RegExp("("+ k +")").test(format)) { 
				format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
			} 
		} 
		return format; 
	} 
//时间判定
function timeCompare(selTime,time){
	var s = ((new Date(selTime.replace(/-/g,"\/"))) - (new Date(time.replace(/-/g,"\/"))));
	var day=s/1000/60/60/24;
	return day;
}