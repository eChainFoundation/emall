function newSlide(){
	var slide_box = $('#slide_box'),
		slide_box_wid = slide_box.width(),
		bg_box = $('#bg_box'),
		bg_list = $('#bg_box li'),
		bg_pic = $('#bg_box li img'),
		bg_list_len = bg_list.length;


	bg_pic.animate({opacity:1},600);

	$('#slide_box').css('height',$(window).height()+'px');
	$('#bg_box').prepend($('#bg_box').css({left:-slide_box_wid+"px"}).find("li:last"));
	bg_list.css({
		'height':$(window).height()+'px',
		'line-height':$(window).height()+'px'
	});
	
		
		

	var slide = document.getElementById('slide_box'),
		s_btn = document.getElementById('s_btn'),
		s_li = s_btn.getElementsByTagName('li'),
		startX = 0,
		endX = 0,
		diff_X = 50,
		temp_X = 0,
		_index = 0,
		timer = null,
		prevElement = s_li[0],
		wid = 0;
		
	if(bg_list_len < 2){
		clearInterval(timer);
		bg_box.css('left',"0px");
	}else{
		auto();
		slide.addEventListener('touchstart', function (e) {
			startX = e.touches[0].pageX;
			wid = slide.offsetWidth;
			clearTimeout(timer);
		},false);
		slide.addEventListener('touchmove', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var touches = e.targetTouches;
			endX = e.touches[0].pageX;
		},false);
		slide.addEventListener('touchend', function (e) {
			if(endX === 0){
				return;
			}
			temp_X = endX-startX;
			if(Math.abs(temp_X)>=diff_X){
				if (slide) {
					if (temp_X > 0 ) {
						_index--;
						if(_index < 0){
							_index=bg_list_len-1;
						}

						var _left = parseInt($('#bg_box').css('left'));
						$('#bg_box').animate({'left':_left+wid},400,function(){
							$(this).prepend($(this).css({left:-slide_box_wid+"px"}).find("li:last"));
						});
					}
					else if (temp_X < 0) {

						_index++;
						if(_index >= bg_list_len){
							_index=0;
						}

						var _left = parseInt($('#bg_box').css('left'));
						$('#bg_box').animate({'left':_left-wid},400,function(){
							$(this).css({left:-slide_box_wid+"px"}).find("li:first").appendTo(this);
						});
					}
					btnClass(_index);
				}
			}
			auto();
		},false);
		function btnClass(index){
			if(prevElement){
				prevElement.className='';
			}
			s_li[index].className="hover";
			prevElement = s_li[index];
		}
		function auto(){
			clearInterval(timer);
			timer = setInterval(function(){
				_index++
				var _left = parseInt($('#bg_box').css('left'));
				wid = slide.offsetWidth;
				if(_index >= bg_list_len){
					_index=0;
				}
				btnClass(_index);
				$('#bg_box').animate({'left':_left-wid},400,function(){
					$(this).css({left:-slide_box_wid+"px"}).find("li:first").appendTo(this);
				});
			 },5000);
		}
	}
}