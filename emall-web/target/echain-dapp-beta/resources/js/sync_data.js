(function($) {
	$.fn.animateProgress = function(progress, callback) {
		return this.each(function() {
			$(this).animate({
				width : progress + '%'
			}, {
				duration : 1000,
				easing : 'swing',
				step : function(progress) {
					if (Math.ceil(progress) == 100) {
						$('.ProgressShow').text('100%');
						$('.ProgressShow').fadeOut();
					} else {
						$('.ProgressShow').text(Math.ceil(progress) + '%');
					}
				},
				complete : function(scope, i, elem) {
					if (callback) {
						callback.call(this, i, elem);
					}
					;
				}
			});
		});
	};

})(jQuery);

function _progress(){
	var cur_status = true;
	var randNum=Math.floor(Math.random()*70)+5;
	$('#progress_bar .ProgressCer').css('width', '1%');
	$('.ProgressShow').fadeIn();
	$('#progress_bar .ProgressCer').animateProgress(
			1,
			function() {
				$.ajax({
					url:"/ajax-synmaterial.action",
					type:"post",
					dataType:"json",
					timeout:100000,
					success:function(data){
						if(data.code == "A00006"){
							cur_status = true;
							return false;
						}else{
							cur_status = false;
							return false;
						}
					}
				});
				
				$(this).animateProgress(
				randNum,
				function() {
					_reset= setInterval(function(){
						if(cur_status == true){
							clearInterval(_reset);
							$('#progress_bar .ProgressCer').animateProgress(100, function() {
								$(".Progress_show,.Platform").hide();
								$(".Platform02").fadeIn();
								
							});
						}else{
							if(cur_status == false){
								clearInterval(_reset);
								$(".Progress_show,.Platform").hide();
								$(".Platform04").fadeIn();
								return false;
								
							}
						}
					},600);
					
				});
			});

};
$(document).ready(function(){
	//加载完成（完全加载）
	$( ".Platform" ).draggable();
		$(".close_01").click(function(){
			$(".Platform").hide();
		});
		$(".close_02").click(function(event){
			 event.stopPropagation();   
			$(".Platform").hide();
		});
		$(".close_03").click(function(){
			$(".Platform").hide();
		});
		$(".close_04").click(function(){
			$(".Platform").hide();
		});
		
		$(".PlatCancel").click(function(){
			$(".Platform01").hide();
		});
		
		$(".Platform02_look").click(function(){
			$(".Platform02").hide();
			location.href = "/materials.action?op=getAll";
		});
		
});