/**
 + ---------------------------------------- +
 + 365框架 v1.0
 + Author: 杜恒
 + QQ: 252072933
 + Mail: duheng1100@163.com
 + ---------------------------------------- +
 + Date: 2013-05-06
 + ---------------------------------------- +
**/
 ;(function ($) {
	
	 $.fn.extend({
        popup: function(options) {
			var defaults = { 
				p_width:'350', //窗体宽度
				p_height:'400', //窗体高度
				p_bgcolor:'#fff', //窗体背景
				p_borderradius:'5',//圆角像素，不需要显示圆角时设置为0
				p_borderw:'solid 3px #e0e0e0',//窗体边框
				p_speed:400, //展开速度
				p_show:'slide',//显示方式****** [slide,show,fadein]
				p_titleht:'25', //title高度
				p_titlebg:'#ccc',//title部分背景色
				p_titlebgimg:'url(/tools/frame/img/title-bg01.png)',//title背景图片
				p_titletst:'这里是标题部分',//title
				p_YN_icon:'y', //是否显示图标
				p_YN_iframe:'n',// 是否启用外部框架
				p_iframeUrl:'http://www.baidu.com/',//外部框架地址
				p_YN_mask:'n', //是否显示遮罩
				p_calback:null  //回调
			}
			var _sel = this.selector; //当前调用的对象
			var options = $.extend({},defaults, options);
            return this.each(function() {
				var o = options,_this = this;
				b_calback = o.p_calback;b_YN_mask = o.p_YN_mask;
			    width = o.p_width ; height = o.p_height ; bgcolor = o.p_bgcolor ; b_border = o.p_borderw ; b_speed = o.p_speed ; b_borderradius = o.p_borderradius; b_iframeUrl=o.p_iframeUrl;b_show=o.p_show;//获取窗体样式和属性
				t_bgcolor = o.p_titlebg ;b_titlebgimg = o.p_titlebgimg; t_titleht = o.p_titleht; b_titletst = o.p_titletst; b_YN_iframe = o.p_YN_iframe;//获取窗体title样式和属性
				b_YN_icon = o.p_YN_icon ;//是否显示图标
				b_positionw =  (width - width*2)/2  ;//窗体定位
				b_positionh = (height - height*2)/2 ;
				var container_h = height- t_titleht;
				if(0<$('#dhauthordiv').length)return;
				if(b_YN_mask == 'y'){
					dh_mask = $('<div class="y_dh_mask"></div>').css({position:'absolute',opacity:0.6, top:0,left:0, width:100+'%',height:100+'%',backgroundColor:'black'});
					$("body").append(dh_mask);
				}
				var item = $('<div id="dhauthordiv"></div>').width(width).height(height)
					.css({margin:0,padding:0,borderRadius:b_borderradius+'px',zIndex:999,boxShadow:'0 0 10px #ddbea1', backgroundColor:bgcolor,display:'none',borderTop:b_border,borderBottom:b_border,borderLeft:b_border,borderRight:b_border}) ;
					item.addClass('popup-box');
					item.html("<div></div><div></div>");
					item.children().eq(0).html('<dl><dd></dd><dt></dt><dd></dd></dl>').addClass("tite");
					item.children().eq(1).width('100%').height(container_h).addClass('content_popup').css('backgroundColor',bgcolor);
					$("body").append(item);
					$('.tite').height(t_titleht).css({backgroundColor:t_bgcolor,backgroundImage:b_titlebgimg,backgroundPosition:'0 -33px',backgroundRepeat:'repeat-x'});
					$('.tite').find('dl,dt,dd').css({margin:0,lineHeight:t_titleht+'px'});
					$('.tite').find('dt,dd').height(t_titleht);
					$('.tite').find('dt').css({float:'left',fontFamily:'&#23435;&#20307;',fontSize:'12px',paddingLeft:5+'px'});
					$('.tite').find('dt').html(b_titletst);
					$('.tite').find('dd:first').attr('b_YN_icon','y').addClass('ynicon').width(30).css({float:'left',background:'url(/tools/frame/img/tag.png) 3px 2px no-repeat'});
					$('.tite').find('dd:last').width(20).css({float:'right',background:'url(/tools/frame/img/tag.png) -30px 2px no-repeat',cursor:'pointer'});
					$('.tite').find('dd:last').addClass('close').attr('title','关闭');
					//解决内容区兼容问题
					$('.content_popup').children().css('overflow','hidden');
					$('.content_popup').css('overflow','auto');
					//是否显示图标判断
					var YN_icon = $('.tite').find('dd:first').attr('b_YN_icon');
					if(b_YN_icon != YN_icon){
						$('.ynicon').remove();
					}
					//窗体定位
					$('.popup-box').css({position:'fixed',top:'30%',left:'50%',marginLeft:b_positionw});
					
					
					if(b_YN_iframe == 'y'){ //是否启用外部框架
						var objwrap = '<iframe src='+b_iframeUrl+' width=100% height='+container_h+' frameborder=no border=0 marginwidth=0 marginheight=0 scrolling=auto allowtransparency=yes></iframe>'
							item.find('.content_popup').append(objwrap);		
					}else{
						$(_sel).clone(true).appendTo(item.find('.content_popup'));
						$('.content_popup').children().show();
					}
				
					//删除遮罩方法
					var del_mask = function(){
						$(".y_dh_mask").remove();
					};
					//自定义进入特效
					if(b_show == 'slide'){
						item.slideDown(b_speed);
					}else if(b_show == 'show'){
						item.show("slow");
					}else if(b_show == 'fadein'){
						 item.fadeIn("slow");
					}else if(b_show == 'transform'){
						item.show('fast',function(){
							$(this).css({transform:'rotate(360deg)',transition:'1s'})
						});
					}else if(b_show == 'transform3d'){
						item.show('fast',function(){
							$(this).css({transform:'rotateY(360deg)',transform:'rotateZ(360deg)',transition:'2s'})
						});
					}
					
					$(".close").click(function(event){
				     	 event.preventDefault();
						 if(b_show == 'slide'){
							$(this).parents('.popup-box').slideUp(b_speed);
							$(this).parents(".popup-box").remove();
							del_mask();
						 }else if(b_show == 'show'){
							item.hide("slow");
							$(this).parents(".popup-box").remove();
							del_mask();
						}else if(b_show == 'fadein'){
							 item.fadeOut("slow");
							$(this).parents(".popup-box").remove();
							del_mask();
						}else if(b_show == 'transform'){
							item.hide('fast',function(){
								$(this).parents(".popup-box").css({transform:'rotate(360deg)',transition:'1s'})
							});
							$(this).parents(".popup-box").parents(".popup-box").remove();
							del_mask();
						}else if(b_show == 'transform3d'){
							item.hide('fast',function(){
								$(this).parents(".popup-box").css({transform:'rotateY(360deg)',transform:'rotateZ(360deg)',transition:'2s'})
							});
							$(this).parents(".popup-box").remove();
							del_mask();
						}
						
					});
					//回调函数
					if(b_calback != null){
						b_calback();
					};
				
            });
        },
	
		
		//状态提示
		tip: function(options){
			var defaults = { 
				width:'490',
				height:'30',
				status:'statusing', //操作状态提示 statusing(操作进行中) , error(操作错误) ,right (操作正确)
				content:'这里是提示内容',//这里是提示内容
				position:'fixed',//定位方式 fixed，absolute ,relative(relative暂未开放，用得到再加)
				ynclose:'y',//是否开启自动关闭；
				dis_time:1500,//需要显示时间
				top:0,
				left:50
			};
			
			var _seltip = this.selector; //当前调用的对象
			var options = $.extend({},defaults, options);
			 return this.each(function() {
				if(0 < $("#tip-box").length) return;
			    var o = options,_this = this;
					d_status = o.status , d_width = o.width , d_height = o.height ,d_content = o.content ,d_position = o.position ,d_top = o.top , d_left = o.left ,d_ynclose = o.ynclose ,d_dis_time = o.dis_time;
				var item = $('<div id="tip-box" style="z-index:99999;"><em id="closess-status" class="closess-status" title="关闭"></em><span>'+d_content+'</span><em id="tip-status" class="tip-status"></em></div>').width(d_width).height(d_height).css({display:'none',fontFamily:'&#23435;&#20307;',fontSize:'12'+'px',color:'#fff',borderRadius:'5px',lineHeight:d_height+'px'});
					 $('body').append(item);
					
					if(d_status =='statusing'){
						item.css({backgroundColor:'#0c71c7',boxShadow:'0 4px 4px rgba(0, 0, 0, 0.2)',border:'1px solid #006096'});
						$('.tip-status').width(16).height(16).css({display:'block',float:'left',background:'url(/tools/frame/img/micon.png) 0 -132px no-repeat',margin:'7'+'px'});
						$('.closess-status').width(8).height(8).css({display:'block',float:'right',background:'url(/tools/frame/img/mclose.png) no-repeat',margin:'11'+'px',cursor:'pointer'});
					}else if(d_status =='error'){
						item.css({backgroundColor:'#CD3237',boxShadow:'0 4px 4px rgba(0, 0, 0, 0.2)',border:'1px solid #CA3E3E'});
						$('.tip-status').width(16).height(16).css({display:'block',float:'left',background:'url(/tools/frame/img/micon.png) no-repeat',margin:'7'+'px'});
						$('.closess-status').width(8).height(8).css({display:'block',float:'right',background:'url(/tools/frame/img/mclose.png) -8px 0 no-repeat',margin:'11'+'px',cursor:'pointer'});
					}else{
						if(d_status =='right'){
							item.css({backgroundColor:'#43AB00',boxShadow:'0 4px 4px rgba(0, 0, 0, 0.2)',border:'1px solid #338100'});
							$('.tip-status').width(16).height(16).css({display:'block',float:'left',background:'url(/tools/frame/img/micon.png) 0 -66px no-repeat',margin:'7'+'px'});
							$('.closess-status').width(8).height(8).css({display:'block',float:'right',background:'url(/tools/frame/img/mclose.png) -16px 0 no-repeat',margin:'11'+'px',cursor:'pointer'});
						}
					}
					//出现位置
					if(d_position == 'fixed'){
						item.css({position:d_position,top:d_top+'px',left:d_left+'%',marginLeft:-d_width/2+'px'});
					}else if(d_position == 'absolute'){
						item.css({position:d_position,top:d_top+'px',left:d_left+'%',marginLeft:-d_width/2+'px'});
					}else{
						if(d_position == 'relative'){
						return true;
						}
					}
					
					
					//出现方式
					item.slideDown("fast",function(){
					d_ynclose=='y' &&
						setTimeout(function(){
							item.slideUp('slow',function(){
								item.remove();
							});
						},d_dis_time);
					
					});
					
					//关闭方式
					$("#closess-status").die().live("click",function(){
						$(this).parent().slideUp('slow',function(){
						item.remove();
						});
						
					});
					
					
					
				
					
					
				   
			 });
		},
		
		//动态监听		
		event_s:function(options){
			var defaults = {
				defnub:5
			};
			var eventobj = this.selector ;
			var options =$.extend({},defaults,options);
				
			return this.each(function(){
			var o = options ; 
				e_defnub = o.defnub ;
				$(eventobj).wrap('<div id="popup_event_s"></div>');
			var item = '<label>还可输入<span id="nub">'+e_defnub+'</span>字</label>' ;
				$(eventobj).after(item);
				$(eventobj).attr({"oninput":"OnInput(event)","onpropertychange":"OnPropChanged(event)"});
			});
		}
		
		
		
		
    });
})(jQuery);


	//非ie下监听OnPropChanged
function OnInput(event){// event.target 等同于this
	var testvalue =  event.target.value;
	var testval =  event.target.value.length;
	var test = e_defnub - parseInt(testval) ;
	var Nub = $(event.target).next().find("#nub");
	if(0 <= test){
		Nub.html(test);
		}else{
			var newvalue = testvalue.toString().substring(0,e_defnub);
			$(event.target).val(newvalue);
	} 
}

//ie下监听OnPropChanged
function OnPropChanged(event){ //event.srcElement等同于this
	if (event.propertyName.toLowerCase () == "value") {
		var testvalue =  event.srcElement.value;
		var testval =  event.srcElement.value.length;
		var test = e_defnub - parseInt(testval) ;
		var Nub = $(event.srcElement).next().find("#nub");
		if(0 <= test){
			Nub.html(test);
			}else{
				var newvalue = testvalue.toString().substring(0,e_defnub);
				$(event.srcElement).val(newvalue);
		} 
	}
	
}