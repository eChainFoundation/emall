
var totalDeg = 360 * 3 + 0;
var steps = []; 
var lostDeg = [36, 96, 156, 216, 276,336];
var prizeDeg = [6, 66, 126,186,246,306];
var prize='';var sncode;
var usenums = 0;
var count = 0; 
var now = 0;
var a = 0.01;
var outter, inner, timer, running = false;
// 首先，定义一个摇动的阀值
var SHAKE_THRESHOLD = 1000;
// 定义一个变量保存上次更新的时间
var last_update = 0;
// 紧接着定义x、y、z记录三个轴的数据以及上一次出发的时间
var x;
var y;
var z;
var last_x;
var last_y;
var last_z;   
    
$(function() { 
	if(!isUserLogin()){
		setDirectUrl();
		clickUrl("/MyZounongjia/my");
		return ;
	}
	
	document.onreadystatechange = subSomething;//当页面加载状态改变的时候执行这个方法. 
	function subSomething() 
	{ 
		if(document.readyState != "complete"){ 
		    $('.opacity').show();
			run = true;
		}else{
			$('.opacity').hide();
			run = false;
		}	
	} 
	
	   $('.quickFlip').quickFlip();
		var bW = $(document).width();
		var sW = $(".shakebgimg").width();
		var bH = $(document).height();
		var sH = $(".shakebgimg").height();
		$('.shakebgimg').css({left:((bW-sW)/2)+"px",top:((bH-sH)/2)+"px"});
		
		$('.no').css({left:((bW-240)/2)+"px",top:((bH-300)/2)+"px"});
		$('.content').css("top",(bH-300)/2+"px");
		//$('body').css({height:bH+"px"});
		$(".main").height(bH);
		$('.active-c').click(function(){
			$(this).fadeOut(); 
		});
	
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60)
        }
    })();


    function countSteps() {
        var t = Math.sqrt(2 * totalDeg / a);
        var v = a * t;
        for (var i = 0; i < t; i++) {
            steps.push((2 * v * i - a * i * i) / 2)
        }
        steps.push(totalDeg)
    }

  
    function start(deg) {       
        deg = deg || lostDeg[parseInt(lostDeg.length * Math.random())];
        running = true;
        clearInterval(timer);
        totalDeg = 360 * 5 + deg;
        steps = [];
        now = 0;
        countSteps();
        requestAnimFrame(step)
    }
    function showMsg(a,b){
	   // var c = $('.no');
		$('.no').show();
		$('#flag').text(a);
		$('.notify p').html(b);
	}
    
	$('.no').bind("click",
			function() {
		    $('.no').hide();
			$(".logo").show();
		    $("#shakingImgDiv").show(); 
		   running = false;
    });
	
	$('#result').bind("click",
			function() {
		    $('#result').hide();
			$(".logo").show();
		    $("#shakingImgDiv").show(); 
		   running = false;
    });
    
    window.start = start;
    outter = document.getElementById('outer'); 
    inner = document.getElementById('inner'); 
    i = 10;
    var end = 0;
	var sumNum = 5; 
	function setFlag(){
		 running = false;
	}
	
    function shake() { 
    
       $.ajax({
         url     : "/app_lottery/send_lottery.action",
         dataType: "json",
         type    : "POST",
         cache: false,
         data    : {
        	 "lotteryDetailId"  : $("#lotteryDetailId").val(), 
        	 "userInfoId"  : $("#userInfoId").val(), 
         },
         timeout: 15000, 
         beforeSend : function(){
            running = true;
            timer = setInterval(function() {
                i += 5;
                //outter.style.webkitTransform = 'rotate(' + i + 'deg)';
                //outter.style.MozTransform = 'rotate(' + i + 'deg)';
            },1)
         },
         success    : function(backdata){
         
			$(".logo").hide(); 
			$("#shakingImgDiv").hide();  
		    clearInterval(timer);
		    if(backdata.status == "0"){
		    	
		    }else{
		    	if(backdata.need_login == "1"){
		    		setDirectUrl();
		    		clickUrl("/MyZounongjia/my");
		    	}else{
		    	   if (backdata.win_status == "0") { 
							showMsg('',backdata.errorMessage ); 
							$(".logo").hide(); 
		                    return
		            }else{
		                if (backdata.win_status != "0") {	 
			                prize = backdata.prize_order; 
			            	var  type = prize+"等奖";
			                var  info = backdata.prize_title; 
			               /*if(backdata.win_status == "1"){
			                	type = "恭喜你获得"+type; 
			                }else{
			                	type = "你之前已获得"+type; 
			                } */
			                type = "恭喜你获得"+type; 
							$("#prizetype").text(type);
							$("#winprize").val(type);
							$("#j-info").text(info);
			                $("#pt").text(type); 
							$("#result").show(500);                  
			            }else{
			            	showMsg('',backdata.errorMessage ); 
							$(".logo").hide(); 
		                    return
			            } 
		            }  
		        
		    	}
		    	
			 
		    }
		    
		 
            count++;
		
         },
         error : function( ){  
                count++; 
         },
         complete   : function(XMLHttpRequest, textStatus){
        	  
	     		playend();
	 			shakeend(); 
        	    running = false;
        		setTimeout(setFlag,2000);
    		　　if(textStatus=='timeout'){//超时,status还有success,error等值的情况
    		 　　　　//　 ajaxTimeoutTest.abort();
    		　　　showMsg('',"网络超时，请重试" ); 
    		 　}
            //console.log('当请求完成之后调用这个函数，无论成功或失败.  请求类型:'+textStatus);  
         },
         timeout : 3000 
        
       })//ajax
    } //#inner click function;
	
	//shake
		// 首先在页面上要监听运动传感事件 
	function init(){
	　　if (window.DeviceMotionEvent && $("#lottery_detail_status").val()=="1") {
	　　　　// 移动浏览器支持运动传感事件
	　　　　window.addEventListener('devicemotion', deviceMotionHandler, false);
	　　} else{ 
	　　} 
	}
    

	function deviceMotionHandler(eventData) {
	　　// 获取含重力的加速度
	　　var acceleration = eventData.accelerationIncludingGravity; 

	　　// 获取当前时间
	　　var curTime = new Date().getTime(); 
	　　var diffTime = curTime -last_update;
	　　// 固定时间段
	　　if (diffTime > 100) {
	　　　　last_update = curTime; 

	　　　　x = acceleration.x; 
	　　　　y = acceleration.y; 
	　　　　z = acceleration.z; 

	　　　　var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000; 

	　　　　if (speed > SHAKE_THRESHOLD) {  
		        shake_prepare();
	　　　　}

	　　　　last_x = x; 
	　　　　last_y = y; 
	　　　　last_z = z; 
	　　} 
	} 
	
	function shake_prepare(){  
		  if (running != true){
			    $('.no').hide();
			    $("#shakingImgDiv").show(); 
			    running = true;
				var media=document.getElementById("musicBox");//获取音频控件				
				media.play();
				$(".logo").show();
				$(".shakebgimg img").attr('src','/resources/zounongjia/images/weixin/shake.gif');
				setTimeout(shake,1500); 
		   }
	}
	function playend(){   
		var media2=document.getElementById("musicBox2");//获取音频控件
		media2.play();
	}
	function shakeend(){
		 $(".shakebgimg img").attr('src','/resources/zounongjia/images/weixin/shake_05.png');
	}
	init(); 
	//shake_prepare(); 
	//setInterval( shake_prepare,3000);
});

 
