$(document).ready(function(){
	//题目切换	
	$(".topic_list dd").click(function() {
        $(this).addClass("cur").siblings().removeClass("cur");
    });
	//题目切换	
	$(".click_s div").click(function() {
        $(this).addClass("cur").siblings().removeClass("cur");
    });
	//屏幕自适应
	  /*var minheight = parseInt($(window.parent).height())-parseInt($(window.parent.document).find("header").outerHeight())-parseInt($(window.parent.document).find("footer").outerHeight());
	  var main = $(window.parent.document).find(".pages_cont");
	  main.css("min-height",minheight);
*/	
	
	//问卷提交
	//{itemtile:'item1', itemlist:[{itemid:1, answer:'a'},{itemid:2, answer:'b'}]} 
	$('#Reply_submit').click(function(){
		var itemarray = new Array(),answerlist = new Array();;
		itemarray['0'] = "item1";
		$(".topic_list dd").each(function(){
			if($(this).hasClass("cur")){
				var answervar = new Array();
				//answervar.itemid = $(this).parents("dl").attr("data-id");
				//answervar.answer = $(this).attr("data");
				answervar.push({"itemid":$(this).parents("dl").attr("data-id"),"answer":$(this).attr("data")});
				answerlist.push(answervar);
			}
		});
		itemarray['1'] = answerlist;
		$('#itemKaoshi').attr("action","post.php?action=itemadd&itmstr="+  $.toJSON(itemarray)).submit();
		
		/*var url = "post.php?c=itemadd&itmstr="+  $.toJSON(itemarray);
		$.ajax({ 
		  async:false,
		  type: "GET", 
		  url: url, 
		  data: "", 
		  success: function(objarray){
			  if(objarray =='1'){
				  
			  }
		  },
		  error: function(){
			  alert("机制错误");
		  }
		});*/
	});
	
	/*wheels = [];
	wheels[0] = { '年': {'2014':"2014"} };
	wheels[1] = { '月': {'1':"01"} };
	for (var i = 2015; i < 2024; i++) {
		wheels[0]['年'][i] = (i < 10) ? ('0' + i) : i;
	}
	for (var i = 2; i < 13; i++) {
		wheels[1]['月'][i] = (i < 10) ? ('0' + i) : i;
	}
	$('.monthgoto').scroller({
		setText: '确定', //确认按钮名称
		cancelText: '取消',//取消按钮名籍我
		theme: 'ios', //皮肤样式
		width: 90,
		wheels: wheels,
		formatResult: function (d) {
			  return (d[1] < 10) ? ((d[0]) + '-0' + (d[1])): ((d[0]) + '-' + (d[1]));
		},
		parseValue: function (s) {
			var d = new Array();
			d[0] = '2014';
			d[1] = '1';
			return d;
		}
	});*/
	
});


