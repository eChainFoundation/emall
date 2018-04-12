/**
 * 365客服网站挂载核心对像
 */
var popimhost = "http://www.365wos.com";
if(location.href.substring(0, 23)=="http://devel.365wos.org"
		|| location.href.substring(0, 21)=="http://hao.365wos.org"
		|| location.href.substring(0, 20)=="http://we.365wos.org"
		|| location.href.substring(0, 16)=="http://localhost"){
	popimhost = "http://devel.365wos.org";
}

var callerSetting = {
	businessid : "B0005",
	language : "zh",
	callertype : 0,			// 呼入类型（0：外链，1：内嵌）
	btnimage : "http://www.365wos.com/images/callservice/callservice_1.png",
	btnimage_width : 95,
	btnimage_height : 95,
	pos_bottom :300,
	pos_bottom2 :300,
	style:"",
	popup : false,
	popup_time : 3000,
	
	popimURL : popimhost + "/im/popim.action"
};
var oWosq = window._wosq || {};

// 加载自定义配置参数
for(var key in callerSetting){
	if(oWosq[key]!=null){
		callerSetting[key]=oWosq[key];
	}
}

;var woscaller = {
	setting : callerSetting,
	
	version : "0.1",
	
	langlib : {
		"zh" : {
			"popup_title" : "在线客服",
			"popup_message" : "亲，您好！很高兴为您服务，请问有什么能帮到您的呢？",
			"popup_btn_accept" : "点击咨询",
			"popup_btn_close" : "稍后询问"
		},
		"en" : {
			"popup_title" : "Online Services",
			"popup_message" : "Hello guest! I am pleased to serve you, Can I help you?",
			"popup_btn_accept" : "Consulting",
			"popup_btn_close" : "Close"
			
		},
		"py" : {
			"popup_title" : "Онлайн сервиса",
			"popup_message" : "Привет!Я рад служить вам,чем могу вам помочь?",
			"popup_btn_accept" : "консалтинг",
			"popup_btn_close" : "близко"
		}
	},
	
	
	init : function(){},
	
	show : function(){},
	
	hide : function(){},
	
	callservice : function(businessid){
		function openWnd(popimURL) {
		    var wndparam = "height=460,width=690,directories=no,location=no,menubar=no,resizable=yes,status=no,toolbar=no,top=100,left=200";
		    try {
		        var talkWnd = window.open(popimURL, "" + + new Date, wndparam);
		        talkWnd.focus();
		    } catch (err) {
		        if (E.force) {
		            window.location = D;
		        }
		    }
		    return false;
		}
		
		businessid = businessid || woscaller.setting.businessid;
		if(woscaller.setting.callertype==1 && window.UUIM){
			UUIM.service.ContactDesignatedBusiness(businessid);
		} else {
			openWnd(woscaller.setting.popimURL + "?b=" + businessid + "&lang=" + woscaller.setting.language +"&style=" + woscaller.setting.style);
		}
	},
	
	
	
	//弹出框
	Popup : function(){
		if(woscaller.setting.popup == true){
			setTimeout(function(){
				$("body").append('<div id="Invite" class="PopupService" style=" width:433px; height:130px; background:url( '+ popimhost +'/home/images/service.png)  no-repeat; padding-top:8px; padding-left:8px; cursor:move; position:fixed; _position:absolute; top:200px; left:50%; margin-left:-215px; z-index:10001;">'
					+'<dl>'
				    +'<dt style="float:left; width:132px; height:122px;"><img src="'+ popimhost +'/home/images/m2.gif" /></dt>'
					+'<dd style="float:left; width:270px; height:50px; margin:20px 0 10px 15px; display:inline; font-size:14px; line-height:24px;">' + woscaller.langlib[woscaller.setting.language].popup_message + '</dd>'
					+'<a class="InviteBtn Consultation" style="color:#FFF; background:url('+ popimhost +'/home/images/zixun.gif) no-repeat;float:left;  width:75px; height:26px;line-height:26px;padding-left:35px;  font-size:14px; margin-left:14px; display:inline; cursor:pointer;">'+ woscaller.langlib[woscaller.setting.language].popup_btn_accept+'</a>'
					+'<a class="InviteBtn_1 AnotherTime" style="color:#3e3e3e; background:url('+ popimhost +'/home/images/shaohou.gif) no-repeat;float:left;  width:75px; height:26px;line-height:26px;padding-left:35px;  font-size:14px; margin-left:14px; display:inline; cursor:pointer;">'+woscaller.langlib[woscaller.setting.language].popup_btn_close+'</a>'
					+'</dl>'
					+'</div>');
				$(".PopupService .Consultation").click(function(){
					woscaller.callservice();
					$(".PopupService").remove();
				});
				$(".PopupService .AnotherTime").click(function(){
					$(".PopupService").fadeOut("slow");
					$(".PopupService").remove();
				});
			},woscaller.setting.popup_time);
		}	
	}
};

// 悬浮效果
(function showQQPanel(){
	var _windowScrollTop;	//滚动条距离顶端距离
	var _windowWidth; //窗口宽度
	jQuery(window).scroll(actionEvent).resize(actionEvent);  //监听滚动条事件和窗口缩放事件
 
	//响应事件
	function actionEvent(){
		_windowScrollTop = jQuery(window).scrollTop();	//获取当前滚动条高度
		_windowWidth=jQuery(window).width();	//获取当前窗口宽度
		moveQQonline();	//移动面板
	}
	//移动面板
	function moveQQonline(){
		$("#WOSBtn").stop().animate({
			right:1, top: _windowScrollTop+300
		}, "normal");
	}
})();
/**
 * 悬浮效果1
 */

(function(caller){
	
	caller.init = function(){
	};
	
	caller.show = function(){
		var WOSBtnHTML = "";
		WOSBtnHTML += "<div id=\"WOSBtn\" style=\"position:absolute; right:1px;top:" + caller.setting.pos_bottom + "px;_top:" + caller.setting.pos_bottom2 + "px;width:" + caller.setting.btnimage_width + "px;height:" + caller.setting.btnimage_height + "px;cursor:pointer;z-index:1000;\" >";
		WOSBtnHTML += "<a class=\"online_s\" style=\"display:block; width:" + caller.setting.btnimage_width + "px; height:" + caller.setting.btnimage_height + "px; border:0px; background-image:url(" + caller.setting.btnimage + "); background-repeat:no-repeat; background-position: -7px -10px; border:none;  \" onclick='woscaller.callservice();'></a>";
		WOSBtnHTML += "</div>";

		$('body').append(WOSBtnHTML);
		
	};
	
	//弹出框
	caller.Popup();
	
})(woscaller);

$(document).ready(function(){
	$(".online_s").live('mouseover',function(){
		if(!$(this).is(":animated")){
		$(this).stop().animate({opacity:0.7},100).animate({opacity:1.0},400);
		}
		$(this).css("background-position","-115px -10px");	
	});
	$(".online_s").live('mouseout',function(){
		$(this).css("background-position","-7px -10px");
	});

	$(".shaker").css("position","relative");
    $(".shaker").mouseover(function(){//鼠标移动到图片触发事件
		if(!$(this).is(":animated")){//判断，如果图片不在运动，执行下面代码
			$(this).animate({top:-3},100).animate({top:0},180).animate({top:-2},150).animate({top:0},130).animate({top:-1},100).animate({top:0},80);
		
		}
	});
});

/**
 * WOSCaller Starter
 */
if(woscaller){
	woscaller.init();
	woscaller.show();
}
