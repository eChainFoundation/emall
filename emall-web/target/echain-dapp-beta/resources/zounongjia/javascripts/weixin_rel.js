$(document).ready(function() {    

	 reset_city();
	 if(browser.versions.isWeixin){
	   $.getScript("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", function (){   
		   var lineLink = window.location.href;
		   
			  $.ajax({  
					url : "/app_weixin/get_js_ticket.action",  
					data :"requestUrl="+lineLink,    
					type : "post",  
					cache : false,  
					async:false, 
					dataType : "json",   
                    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                       
                    },
                    complete: function(XMLHttpRequest, textStatus) {
                     
                    },
					success:  function(data){ 
					 
						if(data.status == "1"){  
						    wx.config({
						        debug: false,
						        appId:  data.appId,
						        timestamp:  data.timestamp.toString(),
						        nonceStr:  data.noncestr,
						        signature:  data.signature,
						        jsApiList: [
						            // 所有要调用的 API 都要加到这个列表中
						            'checkJsApi', 
						            'onMenuShareTimeline',
						            'onMenuShareAppMessage',
						            'getLocation'
						          ],success: function (res) {
						        	 //alert('成功');
						          }
						    });
						    
							    wx.ready(function () {  
								    wx.checkJsApi({
							            jsApiList: [
					                        'onMenuShareTimeline',
								            'onMenuShareAppMessage',        
							                'getLocation' 
							            ],
							            success: function (res) { 
							            }
							        });
								    
							     wx.error(function(res){

								    // alert("dd");
								    });
								    
								 
								    wx.getLocation({
								        success: function (res) {
								            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
								            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
								            var speed = res.speed; // 速度，以米/每秒计
								            var accuracy = res.accuracy; // 位置精度 
											setLongitude(longitude);
											setLatitude(latitude);
											reset_city();
								        },
								        cancel: function (res) {
								           // alert('用户拒绝授权获取地理位置');
								        }
								    });
								    
								    
									 var imgUrl = $("#share_img_url").val();
									 var lineLink = $("#share_line_link").val();
									 var shareTitle =  $("#share_title").val();
									 var shareContent =  $("#share_content").val();
						 
									 if(isEmpty(imgUrl)){
										 imgUrl="http://www.zounongjia.com/resources/zounongjia/images/logo.png";
									 }
									 if(isEmpty(lineLink)){
										 lineLink = window.location.href;
									 }
									 if(isEmpty(shareTitle)){
										 shareTitle ="走农家网";
									 }
									 
									 if(isEmpty(shareContent)){
										 shareContent ="走农家网";
									 }
									 
									 wx.onMenuShareTimeline({//分享到朋友圈
										    title: shareTitle, // 分享标题
										    link: lineLink, // 分享链接
										    imgUrl: imgUrl, // 分享图标
										    success: function () {  
										           // 用户确认分享后执行的回调函数
										    },
										    cancel: function () { 
										        // 用户取消分享后执行的回调函数
										    }
									 }); 
									 wx.onMenuShareAppMessage({//分享给朋友
										    title: shareTitle, // 分享标题
										    link: lineLink, // 分享链接
										    imgUrl: imgUrl, // 分享图标
										    desc: shareContent, // 分享描述
										    success: function () { 
										        // 用户确认分享后执行的回调函数
										    },
										    cancel: function () { 
										        // 用户取消分享后执行的回调函数
										    }
									 });
								    
									 wx.onMenuShareQQ({//分享到QQ
										    title: shareTitle, // 分享标题
										    link: lineLink, // 分享链接
										    imgUrl: imgUrl, // 分享图标
										    desc: shareContent, // 分享描述
										    success: function () { 
										        // 用户确认分享后执行的回调函数
										    },
										    cancel: function () { 
										        // 用户取消分享后执行的回调函数
										    }
									 });
									 
									 wx.onMenuShareQZone({//分享到QQ空间
										    title: shareTitle, // 分享标题
										    link: lineLink, // 分享链接
										    imgUrl: imgUrl, // 分享图标
										    desc: shareContent, // 分享描述
										    success: function () { 
										        // 用户确认分享后执行的回调函数
										    },
										    cancel: function () { 
										        // 用户取消分享后执行的回调函数
										    }
									 });
								    
									
									 
								    });
							     
							
						}else{
					
						}
					}
			 }); 
	 });   
	
 } else{
	
	 var gps = navigator.geolocation;
	 if (gps) {
			gps.getCurrentPosition(showgps, function(error) { 
			}, {maximumAge: 1000}); // 这里设置超时为10000毫秒，即10秒
	 } else {
			showgps();
	 }
		
	 function showgps(position) {
			if (position) {
				var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;
			 
				setLongitude(longitude);
				setLatitude(latitude);
				reset_city();
			} 
	 }  
	 
 }

	
}); 



function reset_city(){
	 var reset_city_cookie_name = "reset_city_cookie_name";
	 var reset_city_cookie_name2 = "reset_city_cookie_name2";
	  var ck_value = getCookie(reset_city_cookie_name);
	  var ck_value2 = getCookie(reset_city_cookie_name2);
	
	  if(!(getLatitude()> 0 && getLongitude()> 0)){
		  return ;
	  }
	  
	  if(isEmpty(ck_value) || isEmpty(ck_value2)){
		 
		  $.ajax({  
				url : "/area/get_area_by_name.action",  
				data :"",    
				type : "post",  
				cache : false,  
				async:false, 
				dataType : "json",   
	           error: function(XMLHttpRequest, textStatus, errorThrown) { 
	           
	           },
	          success:  function(data){   
					if(data.status == "1"){  
						var cityId = getCityId();
					    //alert(cityId+" "+data.areaId);
						if(data.areaId!=cityId){
							var msg_config = {"msg":"你当前位置在"+data.areaName+",是否需要切换","ok_func":function (){
								setCityId(data.areaId);
								setCookie(reset_city_cookie_name,"no");
								setCookieByExpires(reset_city_cookie_name2,"no",6*3600 );
								var nowHref = window.location.href;
								if(!isEmpty(nowHref) && nowHref.indexOf("/Zounongjia/shouye")>-1){
									window.location.reload(); 
								}
							},"no_func":function (){
								setCookie(reset_city_cookie_name,"no");
								setCookieByExpires(reset_city_cookie_name2,"no",6*3600);
							}
							};
							
							confirmDialog(msg_config);
						}
					}
	    	}
	        
		 }); 
	  }
	
}
