// JavaScript Document
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
	
		if(myScrollTop >= 560){//subnav不固定区块定位，注意此值要减掉fixed定位后的top值
			$('.navSmall').addClass('isStuck');
		}else{$('.navSmall').removeClass('isStuck');}
	})	
})
/*------------------------------焦点图-------------------*/
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