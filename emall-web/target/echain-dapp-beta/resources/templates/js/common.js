//本文件依赖于jq
//后台通用函数
//window.onerror = function(){return true;} //发布时必须使用
var mle = {};

// 给表格中的TR添加交替背景色
// 需三个名为 odd、even、activity 的样式支持
// 本函数需在页面加载完或表格后执行
// @param string table_id：表格id
mle.alternately = function(table_id){
	$('.'+table_id+' tr:odd').addClass('odd');  //奇数行
	$('.'+table_id+' tr:even').addClass('even'); //偶数行
	$('.'+table_id+' tr').hover( //活动行
		function(){
			$(this).addClass('activity'); //滑入时追加一个活动样式
		},
		function(){
			$(this).removeClass('activity'); //移出时删除活动样式
		}
	);			
};

//将元素中的 title 标签中的内容转换成 div 显示
//本函数需在对象后调用
// 需一个名为 title_div 的样式支持，可以通过样式固定该容器的宽度，也可以在内容中使用手动换行
// @param string css：要转换的元素CSS名称，将当前标签中的 title 转成 div
mle.title2div = function(css){
	var title;
	$('.'+css).hover(
		function(){
			
			//获取当前 title 字串并将立即将其设置为空，防止a标签中系统自动显示
			title = this.title;
			this.title = '';
			
			$(this).css('cursor','pointer'); //手形
			
			//创建一个div
			$('body').append('<div id="titlediv_jq" class="title_div rounded">'+title+'</div>');

			//当前可视窗口宽
			var win_width = document.documentElement.clientWidth ? document.documentElement.clientWidth : (window.innerWidth ? window.innerWidth : (document.body.clientWidth ? document.body.clientWidth : 1024));
			
			//div宽度
			var width = $('#titlediv_jq').width();
			//if(width > 400){width = 400;}	
					
			//div定位x，1、当前元素位于屏幕左侧时：左边距离 = 当前元素x座标 + 当前元素宽度。2、当前元素位于屏幕右侧时：左边距 = 当前元素Y座标 - div宽
			var x = $(this).offset().left;
			var left = x < (win_width/2) ? x+$(this).width() : x-width;
			
			//div定位y，顶部距离 = 当前元素y坐标 + 当前元素高度
			var top = $(this).offset().top + $(this).height(); 
			
			//div重新定位
			$('#titlediv_jq').css({'top':top+"px","left":left+"px","opacity":'0'});
			$('#titlediv_jq').animate({opacity:'0.9'},600); // 透明度
		
		},
		function(){
			this.title = title; //还原当前 title
			$('#titlediv_jq').remove(); //删除创建的 div
		}		
	);
};

//通过点击元素或按下 Ctrl+Enter 组合键提交表单，用于一般常规性的表单提交按钮
//本函数需在对象后调用
// @param string form_id：要提交的表单ID
// @param string button_id：绑定事件的按钮id，可以是一个字符，如：<span id="keysubmit">提交</span>
// @param string detect_func：表单检测函数，将会在本函数中执行该指定的函数，执行结果为 true 时提交表单
// @example：
// function detect(){return true;} //先建立一个表单检测函数
// mle.keysubmit('afc','keysubmit','detect()');
mle.keysubmit = function(form_id,button_id,detect_func){
	$('#'+button_id).click(function(){ // 点击按钮提交表单
		if(eval(detect_func) === true) $('#'+form_id).submit();
	});

	$(document).bind('keydown',function(e){
		e = window.event || e;
		if(e.ctrlKey && e.keyCode == 13){
			if(eval(detect_func) === true) $('#'+form_id).submit();
		}	
	});
	

//	$(window).keydown(function(event){
//		if(event.ctrlKey && event.keyCode==13){
//			if(eval(detect_func) === true) $('#'+form_id).submit();
//		}
//	});
};

//全选/取消全选，对指定表单内的复选框进行全选或取消。例:<input name="all" type="checkbox" onclick="mle.select_all(this.form);">
mle.select_all = function(form) {
	for(var i=0; i<form.elements.length; i++){ 
		var e = form.elements[i]; 
		if (e.Name != "all" && e.disabled != true && e.type == 'checkbox'){ 
			e.checked = form.all.checked;
		}
	} 
};


//通过按钮或超链接提交表单，并将函数中的 action 值赋给当前表单中id为 action 的隐藏域。此函数用于管理页底部的全选动作提交
// @param string form_id：要提交的表单ID
// @param string button_id：绑定事件的按钮id
// @param string msg：提示消息，如：您确定要将所有选中的内容删除？
// @param string action：将该值赋给当前表单中id为 action 的隐藏域
// @param bool is_change：是否为下拉框的 change 动作触发事件，false将以 click 动作触发，true 将用作下拉框的 onchange 动作触发事件
mle.acsubmit = function(form_id,button_id,msg,action,is_change){
	if(!is_change){
		$('#'+button_id).click(function(){
			if(confirm(msg)){
				$('#action').val(action);
				$('#'+form_id).submit();
			}
		});
	} else {
		$('#'+button_id).change(function(){
			if(confirm(msg)){
				$('#action').val(action);
				$('#'+form_id).submit();
			}
		});			
	}
};

//设置Cookie
//name：Cookie变量名，value：Cookie变量值，seconds：Cookie保存周期(秒)[缺省值为浏览器进程]，path：作用路径[缺省值为"/"], domain：作用域[缺省值为当前域名]
mle.setcookie = function(name,value,seconds,path,domain) {
	var expires = new Date();
	expires.setTime(expires.getTime() + seconds * 1000);
	document.cookie = escape(name) + '=' + escape(value)
	+ (typeof(seconds) != 'undefined' ? '; expires=' + expires.toGMTString() : '')
	+ (typeof(path) != 'undefined' ? '; path=' + path : '; path=/')
	+ (typeof(domain) != 'undefined' ? '; domain=' + domain : '');
}

//获取Cookie
mle.getcookie = function(name) {
	var cookie_start = document.cookie.indexOf(name);
	var cookie_end = document.cookie.indexOf(";", cookie_start);
	return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}

//左侧菜单隐、显控制动画
mle.switchbar = function(){
	if(mle.getcookie('mlecms_admin_left_menu') != 'hide'){
		$('#frame_side').animate({'left':'-230px'},600);
		$('body').animate({'background-position':'-230px'},600);
		$('#body_box').animate({'margin-left':'0px'},600);
		$('#switch').html('打开菜单');
		mle.setcookie('mlecms_admin_left_menu','hide',86400*365); 
	} else {
		$('#frame_side').animate({'left':'0'},600);
		$('body').animate({'background-position':'0px'},600);
		$('#body_box').animate({'margin-left':'230px'},600);
		$('#switch').html('关闭菜单');
		mle.setcookie('mlecms_admin_left_menu','show',86400*365); 
	}
}

//顶部下拉菜单效果，点击或滑入当前元素时触发，通过按钮 button 对元素 element 进行隐显控制 
mle.topmenu = function(button,element){
	var oTime;
	//$('.header .top_menu').css('opacity','0.9'); //菜单透明度
	
	//滑入按钮显示菜单
	$(button).click(function(){ //滑入时显示
		$(element).slideDown('fast'); //向下增加显示关系菜单
	});
	
	//滑入菜单显示菜单,滑出菜单隐藏全部
	$(element).hover(
		function(){window.clearTimeout(oTime);	}, //取消定时器
		function(){
			oTime = window.setTimeout(function(){ //定时后隐藏
				//$('.header .top_menu').animate({opacity:'hide'},300); //保留，多个下拉时可能会用
				$(element).fadeOut(300);
			},300);
		}
	);
	
	//滑出按钮隐藏
	$(button).mouseout(function(){
		oTime = window.setTimeout(function(){ //定时后隐藏
			$(element).fadeOut(300); 				
		},300);
	});	
};

//提交后显示主框架错误提示框
//@param string msg：消息内容
//@example：<div class="error rounded top_error"><ol></ol><span></span></div>
mle.top_error = function(msg){
	scroll(0,0);
	$('.top_error span').html(msg);
	$('.top_error').css({'opacity':'1'});
	$('.top_error').slideDown(400);
	return false;
};

//基本信息与高级参数切换选项卡，两个按钮[.basic_button、.advanced_button]、隐藏或显示的两个DIV[#basic_button、#advanced]
mle.option = function(){
	$('.advanced_button').click(function(){
		$('.advanced_button').css('background-image','url(../inc/templates/manage/images/switch_bg.png)');
		$('.basic_button').css('background','none');
		$('#basic').fadeOut(600);
		$('#advanced').fadeIn(600);
	});
	$('.basic_button').click(function(){
		$('.basic_button').css('background-image','url(../inc/templates/manage/images/switch_bg.png)');
		$('.advanced_button').css('background','none');
		$('#advanced').fadeOut(600);
		$('#basic').fadeIn(600);		
	});	
}

// 左侧菜单及顶部菜单绑定事件
mle.menu = function(){
	//左侧菜单控制 ===============================================================
	$('#menu ol ul').hide(); //隐藏全部子菜单

	//是否显示左侧菜单
	if(mle.getcookie('mlecms_admin_left_menu') != 'hide'){
		//左侧菜单中是否有当前页
		if($('#menu ol #current').length > 0){
			//展开当前页菜单
			$('#menu ol #current').parent().parent().slideToggle('normal'); //滑开菜单
			$('#menu ol #current').parents('ol').find('a').first().addClass('item_current'); //改变当前父级菜单样式
			$('#menu ol #current').parent().addClass('current'); //改变当前菜单样式				
		} else {
			//展开一个子菜单
			$('#menu ol ul').eq(0).slideToggle('normal'); 
		}
		$('#frame_side').css('left','0px'); //显示左侧菜单
		$('#body_box').css('margin-left','230px'); //主体框架右移			
		$('#switch').html('关闭菜单');
	} else { //隐藏左侧菜单，初始化隐藏数据
		$('#frame_side').css('left','-230px'); //隐藏左侧菜单
		$('#body_box').css('margin-left','0px'); //主体框架靠左	
		$('#switch').html('打开菜单');
		$('body').css('background-position','-230px');
	}
		
	//点击一级菜单
	$('#menu .item').click(function(){
		$(this).parent().siblings().find('ul').slideUp('normal'); //隐藏其它
		$(this).next().slideToggle('normal'); //显示当前
		return false;
	});	
	
	//滑入一级菜单
	$('#menu .item').hover(
		function(){
			$(this).stop().animate({'padding-right':'30px'},300);
		}, 
		function(){
			$(this).stop().animate({'padding-right':'10px'},300);
		}
	);	
	
	//顶部下拉菜单=====================================================================
	mle.topmenu('#lang_button','.header #lang_menu'); //语言选择
	mle.topmenu('#menu_option','.header .options'); //功能菜单	
}

// 获取当前站点语言
var lang = mle.getcookie('mlecms_global_language');
mle.lang = (isNaN(lang) || lang == '') ? 1 : lang;

//全局，页面载入完处理事件
$(function(){
	
	//关闭警告、提示等消息框
	$('.attention ol,.information ol,.success ol,.error ol').click(function(){
		$(this).parent().fadeTo(400,0,function(){	$(this).slideUp(400);});
		return false;
	});
	

});

//IE6 PNG图片透明处理
//if(document.all && /MSIE (5\.5|6)/.test(navigator.userAgent) && document.styleSheets && document.styleSheets[0] && document.styleSheets[0].addRule){
//	$.getScript('../inc/tools/iepngfix/tilebg.js');
//}
