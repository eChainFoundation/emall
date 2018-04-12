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
(function($) {
    $.fn.popupui = function(options) {
    	var defaults = {
    			click_obj:"",
    			width:500,
    			show_effect:"clip",
    			hide_effect:"clip",
    			show_duration:1000,
    			hide_duration:500,
    			yn_open:true, //是否禁用弹出框
    			p_calback:null,  //回调
    			mask:false // true 不关闭遮罩；
    			
    		};
        var _base = this.selector;
        var options = $.extend({},defaults, options);
		var popuicss = '.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br{border-bottom-right-radius:0 !important;}\
					.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl{border-bottom-left-radius:0 !important;}\
					.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr{border-top-right-radius:0 !important;}\
					.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl{border-top-left-radius:0 !important;}\
					.ui-dialog .ui-dialog-content{ background:none repeat scroll 0 0 #F3F4F4 !important;}\
					.ui-dialog-titlebar-close{background:none !important;border:none !important; }\
					.ui-dialog{border:3px solid #979280 !important; padding:0 !important;}\
					.ui-dialog-titlebar{border:none !important;border-bottom:1px solid #dedfdf !important; background:none repeat scroll 0 0 #F3F4F4 !important;}\
					.ui-dialog .ui-dialog-title{font-family:"微软雅黑"; color:#666666; font-weight:normal;font-size:18px; }\
					#Mask_pop_ui{z-index:99999 !important;}\
					.ui-dialog{z-index:999999 !important;}\
					';
        if (this.selector && 0==$('#popupui_tmp').length) $("head").append("<style type='text/css' id='popupui_tmp'>"+popuicss+"</style>");
        return this.each(function() {
        	var o = options;calback = o.p_calback;
        	    yn_open = o.yn_open;mask = o.mask;
        		width_self = o.width; click_obj_self = o.click_obj;
        		show_effect_self = o.show_effect; show_duration_self = o.show_duration;
        		hide_effect_self = o.hide_effect; hide_duration_self = o.hide_duration;
			$(_base).dialog({
				autoOpen: false,
				resizable: false,
				width:width_self,
				show: {
					effect: show_effect_self,
					duration: show_duration_self
				},
				hide: {
					effect: hide_effect_self,
					duration: hide_duration_self
				}
			});
			if(0 == $('#Mask_pop_ui').length){
				$('<div id="Mask_pop_ui" style="display:none; position:fixed; top:0;left:0; width:100%;height:100%;background-color:#000;opacity:0.5;  filter:alpha(opacity=50);"></div>').appendTo("body");
			};
			$(_base).bind("dialogbeforeclose", function(event, ui) {
				$("#Mask_pop_ui").fadeOut("slow",function(){
					$(_base).dialog( "close" );
				});
			});
			$(click_obj_self).bind("click",function() {
				YN_disable.disable(yn_open)
			});
			var YN_disable = {
	      		disable:function(yn_open_my){
					if(yn_open_my == false){
						$('#Mask_pop_ui').hide();
						$(_base).dialog( 'disable') ;
					}else{
						$('#Mask_pop_ui').fadeIn("slow");
						$(_base).dialog( "open" );
					}
	      		}
	      	}
	      	
	      	
	      	
        });
        //回调函数
		if(calback != null){
			calback();
		};
    };
    $.fn.popupui.defaults = {}
     $.fn.popupui.duheng = function(selector){
     	alert(this.opendialog)
     }
})(jQuery);

