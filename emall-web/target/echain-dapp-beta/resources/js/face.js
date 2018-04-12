/*
*	表情渲染JS



*	@author:	杜恒；
*	@data:		2013年6月8日
*	@version:	1.0
*	@rely:		jQuery
*/
var qqImg =new Array(
		"无","(#wx)", "(#pz)", "(#se)", "(#fd)", "(#dy)", "(#ll)", "(#hx)", "(#bz)", "(#shui)", "(#dk)",
		"(#gg)", "(#fn)", "(#tp)", "(#cy)", "(#jy)", "(#ng)", "(#kuk)", "(#lengh)", "(#zk)", "(#tuu)", 
		"(#tx)", "(#ka)", "(#baiy)", "(#am)", "(#jie)", "(#kun)", "(#jk)", "(#lh)", "(#hanx)", "(#db)",
		"(#fendou)", "(#zhm)", "(#jiw)", "(#xu)", "(#yun)", "(#zhem)", "(#shuai)", "(#kl)", "(#qiao)", "(#zj)",
		"(#ch)", "(#kb)", "(#gz)", "(#qd)", "(#kuaix)", "(#zhh)", "(#yhh)", "(#hq)", "(#bs)", "(#wq)",
		"(#kk)", "(#yx)", "(#qq)", "(#xia)", "(#kel)", "(#cd)", "(#xig)", "(#pj)", "(#lq)", "(#pp)",
		"(#kf)", "(#fan)", "(#zt)", "(#mg)", "(#dx)", "(#sa)", "(#xin)", "(#xs)", "(#dg)", "(#shd)",
		"(#zhd)", "(#dao)", "(#zq)", "(#pch)", "(#bb)", "(#yl)", "(#ty)", "(#lw)", "(#yb)", "(#qiang)",
		"(#ruo)", "(#ws)","(#shl)","(#bq)","(#gy)","(#qt)","(#cj)","(#aini)","(#bu)","(#hd)"
		//,少15个
	);


$(function(){
	/*
	*		参数说明
	*		baseUrl:	【字符串】表情路径的基地址
	*		pace:		【数字】表情弹出层淡入淡出的速度
	*		dir:		【数组】保存表情包文件夹名字
	*		text:		【二维数组】保存表情包title文字
	*		num:		【数组】保存表情包表情个数
	*		isExist:	【数组】保存表情是否加载过,对于加载过的表情包不重复请求。
	*/
	var rl_exp = {
		baseUrl:	'/tools/frame/face/',
		pace:		200,
		dir:		['qq','gnl','lxh','bzmh'],
		text:[			/*表情包title文字，自己补充*/
			[
				'无','微笑','撇嘴','色','发呆','得意','流泪','害羞','闭嘴','睡',
				'大哭','尴尬','发怒','调皮','呲牙','惊讶','难过','酷','冷汗',
				'抓狂','吐','偷笑','可爱','白眼','傲慢','饥饿','困','惊恐',
				'流汗','憨笑','大兵','奋斗','咒骂','疑问','嘘','晕','折磨',
				'衰','骷髅','敲打','再见','擦汗','抠鼻','鼓掌','糗大了','坏笑',
				'左哼哼','右哼哼','哈欠','鄙视','委屈','快哭了','阴险','亲亲','吓',
				'可怜','菜刀','西瓜','啤酒','篮球','乒乓','咖啡','饭','猪头',
				'玫瑰','凋谢','示爱','爱心','心碎','蛋糕','闪电','炸弹','刀',
				'足球','瓢虫','便便','月亮','太阳','礼物','拥抱','强','弱',
				'握手','胜利','抱拳','勾引','拳头','差劲','爱你','NO','OK',
				'爱情','飞吻','跳跳','发抖','怄火','转圈','磕头','回头','跳绳',
				'挥手','激动','街舞','献吻','左太极','右太极'

			],
			[
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试',
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试',
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试',
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试',
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试'
			],
			[
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试',
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试',
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试',
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试',
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试'
			],
			[
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试',
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试',
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试',
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试',
				'测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试','测试'
			]
		],
		num:		[105,84,84,84],
		isExist:	[0,0,0,0],
		bind:	function(i){
			$("#rl_bq .rl_exp_main").eq(i).find('.rl_exp_item').each(function(){
				$(this).bind('click',function(){
					var title = $(this).find('img').attr('title');
					if(title!="无"){
						rl_exp.insertText(document.getElementById('rl_exp_input'),'['+title+']');
					}
					$('#rl_bq').fadeOut(rl_exp.pace);
				});
			});
			
			$("#rl_bq2 .rl_exp_main").eq(i).find('.rl_exp_item').each(function(){
				$(this).bind('click',function(){
					var title = $(this).find('img').attr('title');
					if(title!="无"){
						rl_exp.insertText(document.getElementById('menukeyword'),title);
					}
					$('#rl_bq2').fadeOut(rl_exp.pace);
				});
			});
		},
		/*加载表情包函数*/
		loadImg:function(i){
			var node = $("#rl_bq .rl_exp_main").eq(i);
			node.empty();
			for(var j = 0; j<rl_exp.num[i];j++){
				var domStr = 	'<li class="rl_exp_item">' + 
									'<img src="' + rl_exp.baseUrl  + rl_exp.dir[i] + '/' + j + '.gif" alt="' + rl_exp.text[i][j] + 
									'" title="' + rl_exp.text[i][j] + '" />' +
								'</li>';
				
				$(domStr).appendTo(node);
			}
			rl_exp.isExist[i] = 1;
			rl_exp.bind(i);
		},
		loadImg2:function(i){
			var node = $("#rl_bq2 .rl_exp_main").eq(i);
			node.empty();
			for(var j = 0; j<89;j++){
				var domStr = 	'<li class="rl_exp_item">' + 
									'<img src="' + rl_exp.baseUrl  + rl_exp.dir[i] + '/' + j + '.gif" alt="' + rl_exp.text[i][j] + 
									'" title="' + qqImg[j] + '" />' +
								'</li>';
				$(domStr).appendTo(node);
			}
			rl_exp.isExist[i] = 1;
			rl_exp.bind(i);
		},
		/*在textarea里光标后面插入文字*/
		insertText:function(obj,str){
			obj.focus();
			if (document.selection) {
				var sel = document.selection.createRange();
				sel.text = str;
			} else if (typeof obj.selectionStart == 'number' && typeof obj.selectionEnd == 'number') {
				var startPos = obj.selectionStart,
					endPos = obj.selectionEnd,
					cursorPos = startPos,
					tmpStr = obj.value;
				obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
				cursorPos += str.length;
				obj.selectionStart = obj.selectionEnd = cursorPos;
			} else {
				obj.value += str;
			}
		},
		init:function(){
			$("#rl_bq > ul.rl_exp_tab > li > a").each(function(i){
				$(this).bind('click',function(){
					if( $(this).hasClass('selected') )
						return;
					if( rl_exp.isExist[i] == 0 ){
						rl_exp.loadImg(i);
					}
					$("#rl_bq > ul.rl_exp_tab > li > a.selected").removeClass('selected');
					$(this).addClass('selected');
					$('#rl_bq .rl_selected').removeClass('rl_selected').hide();
					$('#rl_bq .rl_exp_main').eq(i).addClass('rl_selected').show();
				});
			});
			
			$("#rl_bq2 > ul.rl_exp_tab > li > a").each(function(i){
				$(this).bind('click',function(){
					if( $(this).hasClass('selected') )
						return;
					if( rl_exp.isExist[i] == 0 ){
						rl_exp.loadImg(i);
					}
					$("#rl_bq2 > ul.rl_exp_tab > li > a.selected").removeClass('selected');
					$(this).addClass('selected');
					$('#rl_bq2 .rl_selected').removeClass('rl_selected').hide();
					$('#rl_bq2 .rl_exp_main').eq(i).addClass('rl_selected').show();
				});
			});
			
			/*绑定表情弹出按钮响应，初始化弹出默认表情。*/
			$("#rl_exp_btn").bind('click',function(){
				rl_exp.loadImg(0);
				var w = $(this).position();
				$('#rl_bq').css({left:-248,top:36}).fadeIn(400);
			});
			$("#rl_exp_btn2").bind('click',function(){
				rl_exp.loadImg2(0);
				var w = $(this).position();
				$('#rl_bq2').fadeIn(400);
			});
			/*绑定关闭按钮*/
			$('#rl_bq a.rl_bqclose').bind('click',function(){
				$('#rl_bq').fadeOut(rl_exp.pace);
				
			});
			/*绑定关闭按钮*/
			$('#rl_bq2 a.rl_bq2close').bind('click',function(){
				$('#rl_bq2').fadeOut(rl_exp.pace);
				
			});
			
			
			/*绑定document点击事件，对target不在rl_bq弹出框上时执行rl_bq淡出，并阻止target在弹出按钮的响应。*/
			$(document).bind('click',function(e){
				var target = $(e.target);
				if( target.closest("#rl_exp_btn").length == 1 )
					return;
				if( target.closest("#rl_bq").length == 0 ){
					$('#rl_bq').fadeOut(rl_exp.pace);
				}
			});
		}
	};
	rl_exp.init();	//调用初始化函数。
});