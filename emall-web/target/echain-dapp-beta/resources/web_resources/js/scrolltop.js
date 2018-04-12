// JavaScript Document
/*导航定位*/
$(function(){
	$(window).scroll(function(){//定义页面滚动函数
		function get_scrollTop_of_body(){ //scrollTop能力检测函数
			var scrollTop; 
			if(typeof window.pageYOffset != 'undefined'){ 
			scrollTop = window.pageYOffset; 
			} 
			else 
			if(typeof document.compatMode != 'undefined' && 
			document.compatMode != 'BackCompat'){ 
			scrollTop = document.documentElement.scrollTop; 
			} 
			else 
			if(typeof document.body != 'undefined'){ 
			scrollTop = document.body.scrollTop; 
			} 
			return scrollTop; 
		}
		var myScrollTop = parseInt(get_scrollTop_of_body());//获取ScrollTop的值
	
		if(myScrollTop >= 100){//subnav不固定区块定位，注意此值要减掉fixed定位后的top值
			$('.nav').addClass('isStuck');
		}else{$('.nav').removeClass('isStuck');}
	})	
})
	
/*回到顶部*/
function goTopEx(){
        var obj=document.getElementById("goTopBtn");
        function getScrollTop(){
                return document.documentElement.scrollTop;
            }
        function setScrollTop(value){
                document.documentElement.scrollTop=value;
            }    
        window.onscroll=function(){getScrollTop()>0?obj.style.display="":obj.style.display="none";}
        obj.onclick=function(){
            var goTop=setInterval(scrollMove,10);
            function scrollMove(){
                    setScrollTop(getScrollTop()/1.1);
                    if(getScrollTop()<1)clearInterval(goTop);
                }
        }
    }
/*轮播图*/
$(function(){
			var num = 1;
			var timer;
			$('#banner ol li').mouseover(function(){
				$(this).addClass('current').siblings().removeClass();
				$('#banner ul li').eq($(this).index()).fadeIn(500).siblings().hide();
				num = $(this).index()+1;
				});
		    function run(){
				if(num == 4){
					num=0;}
			     $('#banner ol li').eq(num).addClass('current').siblings().removeClass();
				 $('#banner ul li').eq(num).fadeIn(500).siblings().hide();
				 num++;
				}
		   timer = setInterval(run,3000);  
		$('li').mouseover(function(){
			clearInterval(timer);
		}) .mouseout(function(){
			timer = setInterval(run,3000); 
		})
			})
			
			
/*解决方案切换------------*/
	   $(function(){
		   $('.planLeft dd').click(function(){
			   $(this).addClass('current0').siblings().removeClass();
		       $('.planRight>ul>li').eq($(this).index()-1).addClass('xianshi').siblings().removeClass();
			   })
		   })
		  
		  
/*解决方案二级菜单----------------------------------*/
//返回顶部
/*function scroll_backtop(){
	 //判断滚动条距离上面的高度是否为0来判断是否显示返回头部模块
	 $(window).scroll(function(){
	 	 var top=$(window).scrollTop();
	 	  if(top>210){
		   $("#scrolltop").fadeIn("slow"); 
		  }else{
		   $("#scrolltop").fadeOut("slow");
		  }
	 });
}
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
		$(".planLeft").stop().animate({
			right:1, top: _windowScrollTop+210
		}, "normal");
	}
})();*/


/*无缝链接图------------------------*/
$(function(){
	//制作默认的运动
	var num=0;
	function sport(){
		$('.In1 ul').css('left',num-=2);
		if(num<-1160){
			num=0;
		}
	}
	var mytime=setInterval(sport,100)
	$('.In1 li').mouseover(function(e) {
        clearInterval(mytime);
		$(this).siblings().stop()
    }).mouseout(function(e) {
        mytime=setInterval(sport,100)
		$('.In1 li').stop()
    });
})
