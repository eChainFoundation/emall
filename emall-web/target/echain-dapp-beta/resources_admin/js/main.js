/*
Powered by    V I F N N.COM		h t t p : //v i f n n.com
微 风 微 信 V I F N N		Q Q (1 6 4 1 2 1 0 1 2 3)
*/

var main_obj={
	page_init:function(){
		$('body, html').css('overflow', 'hidden');
		
		$('a').click(function(){
			this.blur();
		});
		$('#header a').click(function(){
			$('#main .menu dt').removeClass('cur');
			$('#main .menu dd').hide();
			$('#main .menu div').removeClass('cur');
			main_obj.page_scroll_init();
		});
		$('#main .menu a').click(function(){
			$('#main .menu div').removeClass('cur');
			$(this).parent().addClass('cur');
		});
		
		$('#main').height($(window).height()-$('#header').height()-$('#footer').height());
		var w=$(window).width()-220;
		w=w<780?780:w;
		$('#main .mainFrame iframe').width(w);
		main_obj.page_scroll_init();
		
		$('#main .menu dt').off().click(function(){
			$('#main .menu dt').removeClass('cur');
			$('#main .menu div').removeClass('cur');
			$('#main .menu dd').not($(this).next().filter('dd')).hide();
			var url=$(this).next().find('div:first').addClass('cur').find('a:first').attr('href');
			$(this).addClass('cur').next().filter('dd').slideDown(function(){
				main_obj.page_scroll_init();
				$('iframe').attr('src', url);
			});
		});
	},
	
	page_scroll_init:function(){
		$('#main .menu').jScrollPane();
	}
}