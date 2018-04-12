/**!
 * @Author   BlueFox
 * @Date     2015年4月14日
 * @Version  1.0.0
 * @Use      摇一摇
 */
(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(global, global.document);
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(global, global.document);
    } else {
        global.Shake = factory(global, global.document);
    }
} (typeof window !== 'undefined' ? window : this, function (window, document) {

    'use strict';

    function Shake(options) {
        //feature detect
        this.hasDeviceMotion = 'ondevicemotion' in window;

        this.options = {
            threshold: 5, //default velocity threshold for shake to register
            timeout: 1000 //default interval between events
        };

        if (typeof options === 'object') {
            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }
        }

        //use date to prevent multiple shakes firing
        this.lastTime = new Date();

        //accelerometer values
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;

        //create custom event
        if (typeof document.CustomEvent === 'function') {
            this.event = new document.CustomEvent('shake', {
                bubbles: true,
                cancelable: true
            });
        } else if (typeof document.createEvent === 'function') {
            this.event = document.createEvent('Event');
            this.event.initEvent('shake', true, true);
        } else {
            return false;
        }
    }

    //reset timer values
    Shake.prototype.reset = function () {
        this.lastTime = new Date();
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    };

    //start listening for devicemotion
    Shake.prototype.start = function () {
        this.reset();
        if (this.hasDeviceMotion) {
            window.addEventListener('devicemotion', this, false);
        }
    };

    //stop listening for devicemotion
    Shake.prototype.stop = function () {
        if (this.hasDeviceMotion) {
            window.removeEventListener('devicemotion', this, false);
        }
        this.reset();
    };

    //calculates if shake did occur
    Shake.prototype.devicemotion = function (e) {
        var current = e.accelerationIncludingGravity;
        var currentTime;
        var timeDifference;
        var deltaX = 0;
        var deltaY = 0;
        var deltaZ = 0;

        if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
            return;
        }

        deltaX = Math.abs(this.lastX - current.x);
        deltaY = Math.abs(this.lastY - current.y);
        deltaZ = Math.abs(this.lastZ - current.z);

        if (((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
            //calculate time in milliseconds since last shake registered
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();

            if (timeDifference > this.options.timeout) {
                window.dispatchEvent(this.event);
                this.lastTime = new Date();
            }
        }

        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;

    };

    //event handler
    Shake.prototype.handleEvent = function (e) {
        if (typeof (this[e.type]) === 'function') {
            return this[e.type](e);
        }
    };

    return Shake;
}));

//常用FUN 封装
var CommonLib = {
'opacity0':function (ele){
    $(ele).animate({
		 opacity:0
		},3000);
		setTimeout(function(){
			 $(ele).hide();
		},3000);
   },
   //
   'opacity1':function(ele){
    $(ele).show().animate({
		 opacity:1
		},3000);
   },
     //点击后的反触 类似pc的hover
  'ClickHover':function (ele,ele1){
	$(ele).click(function(){
	    var _this = $(this);
		_this.addClass(ele1);
		setTimeout(function(){
		_this.removeClass(ele1);
	  },200);
	});
	} 
}

 //获取Url上的参数
function GetUrlVal(name,Url) {
        //URL GET 获取值
　　	 var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i"),
			 url = Url || location.href;
　　	 if (reg.test(url))
　　	 return unescape(RegExp.$2.replace(/\+/g, " "));
　　	 return "";
}; 
// 参数 YNShow 为 0 不会自动关闭，大于0的数为计时关闭
function alert_show(Text){
	
	var Html = '<div id="PullInfo">'+Text+'</div>'; 
	 var _PullInfo = $("#PullInfo");
   
	if ( _PullInfo.length == 0 ){
	  $("body").append(Html);
	}
	_PullInfo.html(Text);
	CommonLib.opacity1('#PullInfo'); 
	
	setTimeout(function(){ CommonLib.opacity0('#PullInfo'); },3000);
}
	
var prizeOrderArr=new Array()
prizeOrderArr[0]="一";
prizeOrderArr[1]="二";
prizeOrderArr[2]="三";
prizeOrderArr[3]="四";
prizeOrderArr[4]="五";
prizeOrderArr[5]="六";
prizeOrderArr[6]="七";
prizeOrderArr[7]="八";
prizeOrderArr[8]="九"; 	

$(function(){
	if(!isUserLogin()){
		setDirectUrl();
		clickUrl("/MyZounongjia/my");
		return ;
	}
	
     $(".prizeOrder").each(function() {
           var _this = $(this);
	        var prizeOrd = _this.text();   
	        _this.text(prizeOrderArr[prizeOrd-1]);
        });
	

	
	FastClick.attach(document.body);
	
	var _PullLoad = $("#PullLoad"),
	    _PullWarp = $("#PullWarp"),
	   _repeatCon = $("#repeatCon"),
	    _WinNWarp = $("#WinNWarp"),
	     _HSurNum = $("#HSurNum"),
		    _body = $("body"),
	    _Hsurplus = $("#Hsurplus"),
	 _shakeresult = $("#shakeresult"),
	         Font = {}, 
	     Shakeing = 0,  //用于判断摇一摇进行中 0 未开始 1进行中
	    FirstLoad = 1,  //判断页面是第一次加载
	 SetData = Init.data;
	
	
	Init.activeID = SetData.activeID;
	Init.Who = SetData.who;
	
	CommonLib.YNshowAwd = SetData.yy.xs; //判断是否显示奖项 0不显示 1显示 
	
	
	  Font.NotAd = '没有找到本活动对应的奖项设置 商家什么奖品都没放 太不像话了';
	  Font.SorryNo = '对不起，您的抽奖次数达到上限了 ';
	  Font.WinNameEr = '中奖名单保存繁忙请稍后再试';
	  Font.SorryWin = '真遗憾，什么奖品都没摇到...';
	  Font.NotI = '今天的摇一摇次数木有了';
	
    var shakeEvent = {
		shakeMain:function(){
		  var That = this;	 
		  
		 // _WinNWarp.show();
		  
		  window.onload = function() {
	
			//create a new instance of shake.js.
			var myShakeEvent = new Shake({
				threshold: 15
			});
		
			// start listening to device motion
			myShakeEvent.start();
		
			// register a shake event
			window.addEventListener('shake', shakeEventDidOccur, false);
		   
			//shake event callback
			function shakeEventDidOccur () {
				_shakeresult.removeClass('cfs_curveInUp');
			
				//如果用户上次中奖，没有提交，并且打开了填写表单页，则重新摇一摇时隐藏
				if ( $(".WinNWarp").css('display') == 'block' ){
				   _WinNWarp.hide();
				    That.PostEd();
				}
				
				//如果在摇一摇的同时，获奖层也还没有关闭，先自动隐藏去
				if ( _PullWarp.css('display') == 'block' ){
				 _PullWarp.hide();
				}
				
				
				if ( Shakeing == 1 ){
				  return false;
				}
				
				Shakeing = 1;
				FirstLoad++;
				
				var myAuto = document.getElementById('myaudio');
				myAuto.play();
				alert_show('摇一摇进行中，结果马上出来哦！' );
				_PullLoad.show();
				setTimeout(
						function(){That.shakeKeyAJAX();}
				,100);		
			 
			}
			//That.shakeKeyAJAX();
			
			setTimeout(function(){
				_body.append('<audio id="myaudio" src="'+Init.Mp3+'" controls="controls" hidden="true"></audio>');
			},100);
			
			/* setTimeout(function(){
				_body.append('<audio id="myaudioMp3End" src="'+Init.Mp3End+'" controls="controls" hidden="true"></audio>');
			},1000); */
			
				
	    };
			
		var _Htitle  = $("#Htitle"),
		  _AwadsList = $("#AwadsList"),
		    _TabsCon = $(".TabsCon"),
		   _everyday = $("#everyday"),
		   _Totleday = $("#Totleday"),
		  _HContent  = $("#HContent");
		  
		//_HSurNum.text(SetData.yy.mt); 
		_Htitle.text(SetData.yy.mc); //标题
		
		_HContent.html(SetData.yy.bz); //内容说明
 
		if ( SetData.yy.mt == 0 ){
		  _everyday.closest('span').hide();
		}
		if ( SetData.yy.zg == 0 ){
		  _everyday.closest('span').hide();
		}
		
		
		//奖项设置内容初始化
		if ( CommonLib.YNshowAwd == 1 ){
			var AdData = {};
			AdData.data = Init.data.Prize_details; //奖项的JSON
			var AdHtml = template("AwadsList_Tpl",AdData);
			_AwadsList.find('ul').append(AdHtml);
		}else{
			$(".Tabs span").eq(1).hide();
		}
		
		
		
		
		//Tabs切换
		$(".Tabs span").click(function(){
			var This = $(this),
			     Num = This.index(),
			 dataNum = This.attr('data');
			This.addClass('this').siblings().removeClass('this');
			_TabsCon.find(".TabConLi").eq(Num).show().siblings().hide();
			
			//点击查看中奖记录
			if ( dataNum == 3 ) {
				That.WinUserListAJAX();
			}else{
				 window.scrollTo(0,$(window).height());
			}
			
			
		});
		 
		//中奖后，提交个人信息 PostUserInfoAJAX
		$(".TabsCon").on("click","#SubMit",function(){  
			That.PostUserInfoAJAX();
		});
		
		//中奖后，选择填写个人信息 
		$(document).on("click",".pSeTi",function(){  
			//填写中奖个人信息 
		    var InfoHtml = template("WinInput_Tpl",CommonLib);
			$(".WinNWarp").show().html(InfoHtml).siblings().hide();
			 CommonLib.opacity0('#PullWarp');
			 $(".Winid").val(CommonLib.user_prizeid);
			 
			 window.scrollTo(0,$(window).height());
			 
		});
		
		//放弃填写个人信息
		$(document).on("click",".pSeTiHi",function(){  
			CommonLib.opacity0('#PullWarp');
		});
		
		
		
		
		},
		//查看中奖记录
		WinUserListAJAX:function(){ 
			var _WinUserList = $("#WinUserList .ConHistory");
		
			$.ajax({
			         type: 'POST',
			         url: Init.myshakelist,
			         data: { 
			           "lotteryDetailId":Init.lotteryDetailId, //活动ID
			         },
			         dataType: 'json',
			         timeout: 30000,
			         cache: false,
			         beforeSend:function() {},
			         success: function(data){ 
			         	
						if ( data.status == "1" && data.winningNumber > 0) {
							
						    var WinUserListHtml ="<dl>";
						    
						    var dataList = data.dataList;
						    
						    for(var loop = 0 ; loop < dataList.length;loop++){
						    	var ele = dataList[loop];
						    	
						    	WinUserListHtml += ' <a href="javascript:;"> <dt>' +
								' <div class="winName">'+prizeOrderArr[ele.prizeOrder-1]+'等奖:'+ele.prizeName+'</div>' +
								'  <div class="ConHistoryTime">' +
								'   <div> 奖项状态：'+ele.prizeStatus+'</div>' +
								'   <div> 兑&nbsp&nbsp换&nbsp&nbsp码：'+ele.prizeSerialNumber+'</div>' +
								'  <div>获奖时间： <font class="CdTime">'+ele.createTime+'</font></div>' + 
								' </div>' +
								' </dt>' +
								' <dd class="disnone"></dd>' +
								'  </a>';
						    }
						    WinUserListHtml +='</dl>';
							_WinUserList.html(WinUserListHtml);
							
							
						}else{
						 var msg = "暂时没有中奖记录";
						   _WinUserList.html('<dl>'+msg+'</dl>');	
						   alert_show(msg);  
						}
						
						 window.scrollTo(0,$(window).height());
			
			         },
			         complete:function() {},
			         error: function(xhr, type){
			        
			         }
			    });
			
			
		},
		//提交个人信息
		PostUserInfoAJAX:function(){ 
			alert("不用提交")
		},
		//提交用户信息之后， 活动说明和奖项设置 恢复原样
		PostEd:function(){
			
			$("#shakeresult").empty();
			$(".Tabs span").eq(0).addClass('this').siblings().removeClass('this');
			$(".TabsCon .TabConLi").eq(0).show().siblings().hide();
			
		},
		//跟服务交互
		shakeKeyAJAX:function(){
			var That = this;
			
		/*	if ( FirstLoad > 2 ){
			  YNLoadCanNum = 0;
			}else{
			  YNLoadCanNum = 1;
			}*/
 
			$.ajax({
					 type: 'get',
					 url: Init.shakeKeyAJAX,
					 data: {  
						"lotteryDetailId":Init.lotteryDetailId, 
						"userInfoId":Init.userInfoId,
						
					 },
					 dataType: 'json',
					 timeout: 30000,
					  cache: false,
					  beforeSend:function() {
					_PullLoad.show();
					},
					 success: function(data){ 
						//alert( JSON.stringify(data));
						var data = data || {};
						data.LogoImg = SetData.p[4];
						CommonLib.shakeLeftTimes = data.leftTimes;  
						if(data.status == "1" && data.win_status != "0"){
							  _Hsurplus.html('<div class="Hsurplus">你已中奖，不能再摇了</div>');
						}else  {
						  _Hsurplus.html('<div class="Hsurplus"><span class="">摇一摇剩余<font id="HSurNum">'+data.leftTimes+'</font>次</span></div>');
						} 
						
					  Shakeing = 0;	
					  if ( data.status == "1" ){
						  if(data.win_status == "0"){
							  alert_show(data.errorMessage);	
							  _repeatCon.text(data.errorMessage);	
						 }else{
							 var prize_msg = prizeOrderArr[data.prize_order-1]+"等奖"+data.prize_title;
							 var msg = "";
							 if(data.win_status == "1"){
								  msg = '恭喜您，摇中了'+prize_msg;
							 }else{
								  msg = '你已摇中了'+prize_msg+',不能再摇了'; 
							 } 
							  alert_show(msg);	
							// That.shakeSuccess(data);
							 _repeatCon.text(msg);
						 }
						  
						  /*
						var SuVal = data.success;
						
						switch(SuVal){
							case 1:
								That.shakeSuccess(data);
								_repeatCon.text('恭喜您，获取了'+data.name);
							break;
							case 3:
								alert_show(Font.NotAd);
								_repeatCon.text(Font.NotAd);
										
							break;
							case 4: 
							  alert_show(Font.SorryNo);	
							  _repeatCon.text(Font.SorryNo);		
							break;
							case 5: 
								alert_show(Font.WinNameEr);	
								_repeatCon.text(Font.WinNameEr);
							break;
							default:
							
							alert_show(Font.SorryWin);
							_repeatCon.text(Font.SorryWin);
						} 
					 */
					   CommonLib.opacity1('#repeatCon');
				    }
					 CommonLib.opacity0('#PullInfo');
					 
					 
					 },
					 complete:function() {
					 _PullLoad.hide();
					  Shakeing = 0;	
					},
					 error: function(xhr, type){
					    alert_show('服务器忙');
					 }
			});
			
			
		},
		//成功事件
		shakeSuccess:function(data){ 
			
		},
		Init:function(){
			var That = this;
			That.shakeMain();
		},
		
	};
	shakeEvent.Init();
	//shakeEvent.shakeKeyAJAX();
});