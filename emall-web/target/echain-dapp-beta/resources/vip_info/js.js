//html5
(function(){
	var e = "abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(','),
		i=e.length;
	while(i--){document.createElement(e[i])}}
)();

$(function(){
	
	
	//弹出
	$("#wjmm").click(function(){
		$("#heise,#tanchu").fadeIn();
	})
	
	$(".guanbi").click(function(){
		$("#heise,#tanchu").fadeOut();
	})
	
	
	
	
	
	
	
	var bigbox = $(".yxjx_ind .thebox");
	var ulobj = $(".yxjx_ind .thebox ul");
	var imgobj = $(".yxjx_ind .thebox ul li img");
	var wt = 0;
	var winwidth = 0;
	var ino=0;

	$(window).resize(function() {
		winwidth = $(window).width();
		ulobj.width(winwidth / 3 - 10) //设置ul 的宽度
		imgobj.height(imgobj.width()*0.8333);    //-------图片高比例
		wt = parseInt(ulobj.outerWidth(true)) * ulobj.length+10;  //ul的宽度，加10 为了留出空余不挤下去
		bigbox.width(wt); //外层盒子宽度
		$(".yxjx_ind").height(ulobj.outerHeight(true)+10);  		//这是设置最大一层的高度	
		doanimate();  //每次改变大小，到达理想的位置
	})
	$(window).resize();  //默认执行
	//做点击
	$(".btl").click(function(){
		$(window).resize();
		if(ino<ulobj.length-3){
			ino++;
			doanimate();
		}		
	})	 
	//又点击
	$(".btr").click(function(){
		$(window).resize();
		if(ino>0){
			ino--;
			doanimate();
		}		
	})
	//实现	 
	function doanimate(){
		bigbox.stop(true,true).animate({"left":-ino*parseInt(ulobj.outerWidth(true))+"px"},500);  
	}
	 
	//-----------------以下是切换代码
	var dlobj=$(".listpicbox dl");
	dlobj.eq(0).show();
	var tabno=0;
	//上面的左右切换
	$(".listpic_nandr .next").click(function(){
		if(tabno<dlobj.length-1){
			tabno++;
			dlobj.hide().eq(tabno).fadeIn();
		}
	})
	$(".listpic_nandr .pre").click(function(){
		if(tabno>0){
			tabno--;
			dlobj.hide().eq(tabno).fadeIn();
		}
	})	
	//下面的点击切换
	$(".yxjx_ind ul li").click(function(){
		var ind=$(".yxjx_ind ul li").index(this);
		tabno=ind;
		dlobj.hide().eq(tabno).fadeIn();
	})
	
	
	
	$(function(){
	$(".top .top_r ul li").eq(0).css({"border-top":"0"});
	$(".top .top_r ul li").last().css({"border-bottom":"0"});
	
	$(".top .top_r p").click(function(){
	  $(this).siblings("ul").slideToggle();	
	})
	
	
	
	
	
	
})
	
	
	
	
})