	var content_start;
	var content_end;
	var content_1;
	var content_2;
	var content_3;
	var content_4;
	var content_menu;
	var k5;
	var now_content = 0;
	var quiz_pageNo=1;
	var quiz_pageSum=1;
	
	var voice_pageNo=1;
	var voice_pageSum=1;
	var video_pageNo=1;
	var video_pageSum=1;
	var coupon_pageNo=1;
	var coupon_pageSum=1;
	var menutextnoRepeat =1;
	
	KindEditor.ready(function(K) {
		content_menu = K.create(".content_menu_",{
				resizeType:2,
				uploadJson : '/uploadcmsimg.action',
		        fileManagerJson : '/uploadcmsimg.action',
		        allowFileManager : true,
		        items:['image','link', 'unlink','|','fontsize','forecolor','bold','italic','underline','strikethrough','removeformat','|'
				       ,'justifyleft' ,
				       'justifycenter' ,'justifyright','justifyfull','insertorderedlist','insertunorderedlist','indent','outdent', 'subscript']
			});
		 
	});

	 KindEditor.ready(function(K) {
		 content_start = K.create("#content_start",{
				resizeType:0,
				width:'50px',
				uploadJson : '/uploadcmsimg.action',
		        fileManagerJson : '/uploadcmsimg.action',
		        allowFileManager : true,
		      
		        afterChange:function(){
		        	try{ 
							var obj_length = parseInt(content_start.html().length) + $(".subMenus").html().length + content_end.html().length;
				        	var obj_val = content_start.html();
				        	var test = 2000 - parseInt(obj_length) ;
				        	if(0 < test ){
				        		$("#end_Surplus font").html(test);
				        	}else{
				        		new_len = parseInt(obj_length) - parseInt($(".subMenus").html().length) - parseInt(content_end.html().length);
				        		new_obj = obj_val.toString().substring(0,new_len);
				        		content_start.html(new_obj);
				        	}
						}catch(err){ 
							return true;
						} 
		        	
		        },
				items:['emoticons','link', 'unlink']
			});
		 
	 });

	 
		//奖
		 KindEditor.plugin('Prize', function(K) {
			    var editor = this, name = 'Prize';
			    var new_prizesAddress;
			    editor.clickToolbar(name, function() {
			    	K.ajax('/ajax-address.action', function(data){
			    		if(data.code == "A00006"){
			    			new_prizesAddress = data.prizesAddress ;
			    			var dialog = K.dialog({
							        width : 390,
							        title : '开启奖品中心',
							        body : '<div style="margin:20px;">\
							        		<h1 style="font-size:14px;line-height:28px;font-weight:bold; color:#2a2a2a;">设置奖品中心文字连接，用户可在手机端点击文字查看已获得的奖品。</h1>\
							        		<dl  style=" font-size:14px;line-height:28px; color:#2a2a2a;"><dt style="float:left; width:110px;text-align:right;">设置文字链接：</dt><dd><input id="Prize_link_kwd" style="width:214px;height:23px; line-height:23px; padding-left:5px; border:1px solid #aebac0;" type="text"/></dd></dl>\
							        		<div style="clear:both; width:100%;height:1px;"></div>\
							        		</div>\
							        		<div style="clear:both; width:100%;height:1px;"></div>',
							        closeBtn : {
							                name : '关闭',
							                click : function(e) {
							                        dialog.remove();
							                }
							        },
							        yesBtn : {
							                name : '确定',
							                click : function(e) {
							                	$("#Prize_link_kwd").focus();
							                	var obj_link_val = $(this).parents(".ke-dialog-footer").prev().find("#Prize_link_kwd").val();
							                	var new_link = '<a href="'+data.prizesAddress+'" data-ke-src="'+data.prizesAddress+'">'+obj_link_val+'</a>';
							                    editor.insertHtml(new_link);      
							                 	dialog.remove();
							                }
							        },
							        noBtn : {
							                name : '取消',
							                click : function(e) {
							                        dialog.remove();
							                }
							        }
							});
			    		}else{
			    			new_prizesAddress = 'http://www.weduty.com/';
			    			var dialog = K.dialog({
							        width : 390,
							        title : '开启奖品中心',
							        body : '<div style="margin:20px;">\
							        		<h1 style="font-size:14px;line-height:28px;font-weight:bold; color:#2a2a2a;">设置奖品中心链接文字设置</h1>\
							        		<dl  style=" font-size:14px;line-height:28px; color:#2a2a2a;"><dt style="float:left; width:90px;text-align:right;">文字链接：</dt><dd><input id="Prize_link_kwd" style="width:214px;height:23px; line-height:23px; padding-left:5px; border:1px solid #aebac0;" type="text"/></dd></dl>\
							        		<div style="clear:both; width:100%;height:1px;"></div>\
							        		</div>\
							        		<div style="clear:both; width:100%;height:1px;"></div>',
							        closeBtn : {
							                name : '关闭',
							                click : function(e) {
							                        dialog.remove();
							                }
							        },
							        yesBtn : {
							                name : '确定',
							                click : function(e) {
							                	$("#Prize_link_kwd").focus();
							                	var obj_link_val = $(this).parents(".ke-dialog-footer").prev().find("#Prize_link_kwd").val();
							                	var new_link = '<a href="'+data.prizesAddress+'" data-ke-src="'+data.prizesAddress+'">'+obj_link_val+'</a>';
							                    editor.insertHtml(new_link);      
							                 	dialog.remove();
							                }
							        },
							        noBtn : {
							                name : '取消',
							                click : function(e) {
							                        dialog.remove();
							                }
							        }
							});
			    			
			    		}
			    		
			    	});
			    	 
		    });
		});
		//徽
		
		 KindEditor.plugin('Emblem', function(K) {
			    var editor = this, name = 'Emblem' ;
			    var new_url;
			   
			 
			    editor.clickToolbar(name, function() {
			    	$("#Prize_link_kwd2").focus();
			    	 var new_url;
			    	K.ajax('/ajax-address.action', function(data) {
			    		if(data.code == "A00006"){
			    			 new_url = data.address;  
			    			 var dialog = K.dialog({
							        width : 390,
							        title : '快捷访问',
							        body : '<div style="margin:20px;">\
							        		<h1 style="font-size:14px;line-height:28px;font-weight:bold; color:#2a2a2a;">创建微网站快捷链接，用户可访问企业微网站。</h1>\
							        		<dl  style=" font-size:14px;line-height:28px; color:#2a2a2a;"><dt style="float:left; width:90px;text-align:right;">文字链接：</dt><dd><input id="Prize_link_kwd2" style="width:214px;height:23px; line-height:23px; padding-left:5px; border:1px solid #aebac0;" value="微网站" type="text"/></dd></dl>\
							        		<div style="clear:both; width:100%;height:1px;"></div>\
							        		<dl  style="font-size:14px;line-height:28px; color:#7d7d7d;"><dt style="float:left; width:90px;text-align:right;">链接地址：</dt><dd><font>'+new_url+'</font></dd></dl>\
							        		</div>\
							        		<div style="clear:both; width:100%;height:1px;"></div>',
							        closeBtn : {
							                name : '关闭',
							                click : function(e) {
							                        dialog.remove();
							                }
							        },
							        yesBtn : {
							                name : '确定',
							                click : function(e) {
							                	var obj_link_val = $(this).parents(".ke-dialog-footer").prev().find("#Prize_link_kwd2").val();
							                	var new_link = '<a href="'+new_url+'" data-ke-src="'+new_url+'">'+obj_link_val+'</a>';
							                    editor.insertHtml(new_link);      
							                 	dialog.remove();
							                }
							        },
							        noBtn : {
							                name : '取消',
							                click : function(e) {
							                        dialog.remove();
							                }
							        }
							});
			    		}else{
			    			new_url = 'http://www.weduty.com/';
			    			 var dialog = K.dialog({
							        width : 390,
							        title : '快捷访问',
							        body : '<div style="margin:20px;">\
							        		<h1 style="font-size:14px;line-height:28px;font-weight:bold; color:#2a2a2a;">创建微网站快捷链接，用户可访问企业微网站。</h1>\
							        		<dl  style=" font-size:14px;line-height:28px; color:#2a2a2a;"><dt style="float:left; width:90px;text-align:right;">设置关键字：</dt><dd><input id="Prize_link_kwd2" style="width:214px;height:23px; line-height:23px; padding-left:5px; border:1px solid #aebac0;" value="微网站" type="text"/></dd></dl>\
							        		<div style="clear:both; width:100%;height:1px;"></div>\
							        		<dl  style="font-size:14px;line-height:28px; color:#7d7d7d;"><dt style="float:left; width:90px;text-align:right;">连接地址：</dt><dd><font>'+new_url+'</font></dd></dl>\
							        		</div>\
							        		<div style="clear:both; width:100%;height:1px;"></div>',
							        closeBtn : {
							                name : '关闭',
							                click : function(e) {
							                        dialog.remove();
							                }
							        },
							        yesBtn : {
							                name : '确定',
							                click : function(e) {
							                	var obj_link_val = $(this).parents(".ke-dialog-footer").prev().find("#Prize_link_kwd2").val();
							                	var new_link = '<a href="'+new_url+'" data-ke-src="'+new_url+'">'+obj_link_val+'</a>';
							                    editor.insertHtml(new_link);      
							                 	dialog.remove();
							                }
							        },
							        noBtn : {
							                name : '取消',
							                click : function(e) {
							                        dialog.remove();
							                }
							        }
							});
			    		}
					});
			    	
		    });
		});
	
	 KindEditor.ready(function(K) {
		 content_end = K.create("#content_end",{
				resizeType:0,
				
				afterChange:function(){
					try{
						var obj_length = parseInt(content_start.html().length) + $(".subMenus").html().length + content_end.html().length;
			        	var obj_val = content_end.html();
			        	var test = 2000 - parseInt(obj_length) ;
			        	if(0 < test ){
			        		$("#end_Surplus font").html(test);
			        	}else{
			        		new_len = parseInt(obj_length) - parseInt($(".subMenus").html().length) - parseInt(content_start.html().length);
			        		new_obj = obj_val.toString().substring(0,new_len);
			        		content_end.html(new_obj);
			        	}
					}catch(err){
						return true;
					}
		        	
		        },
				items:['emoticons','link', 'unlink','Prize', 'Emblem']
			});
	 });
	 
	 KindEditor.ready(function(K) {
		 content_1 = K.create("#content_1",{
				resizeType:0,
				items:['emoticons','link', 'unlink']
			});
	 });
	 KindEditor.ready(function(K) {
		 content_2 = K.create("#content_2",{
				resizeType:0,
				items:['emoticons','link', 'unlink']
			});
	 });
	 KindEditor.ready(function(K) {
		 content_3 = K.create("#content_3",{
				resizeType:0,
				items:['emoticons','link', 'unlink']
			});
	 });
	 KindEditor.ready(function(K) {
		 content_4 = K.create("#content_4",{
				resizeType:0,
				items:['emoticons','link', 'unlink']
			});
	 });
	 
	 var bro=$.browser;
	    


function getArticles(data,ishsborderHien){
		$('.more_viewpic').remove();
		if(data.article.length>1){
			if(data.article.length>8){
				$(".articleSum").val(8);
			}else{
				$(".articleSum").val(data.article.length);
			}
			
		}else{
			$(".articleSum").val(1);
		}
		for(var i =0;i<data.article.length;i++){
			if(i<8){
				f =i+1;
				
				if(bro.msie) {
					$(".articleContent"+i).val(data.article[i].content);
				}else  if(bro.mozilla) {
					$(".articleContent"+i).html(data.article[i].content);
				}else if(bro.safari) {
					$(".articleContent"+i).html(data.article[i].content);
				}else  if(bro.opera) {
					$(".articleContent"+i).html(data.article[i].content);
			    }else{
			    	$(".articleContent"+i).html(data.article[i].content);
			    }
				$(".articleUrl"+i).val(data.article[i].url);
				if(i==0){
					$(".articleTitle0").val(data.article[i].title);
					$(".article0").val(data.article[i].articleid);
					$(".fileField0").attr("src",data.article[i].picurl);
				}else{
					$(".article"+i).val(data.article[i].articleid);
					$('<div  flag="'+f+'" class="more_viewpic"><div class="big_view2">'+
 						'<input  type="file" onchange="ajaxFileUploadF('+i+');" id="fileField'+i+'" name="mp3file"/></div><img class="articlePic'+i+'" src='+data.article[i].picurl+' />'+
 						'<div class="cent_min"><input type="text"  value="'+data.article[i].title+'" class="articleTitle'+i+'" /><br/>'+
 						'<a  class="start_modefiy" href="#" flag='+i+'>点击编辑正文</a></div>'+
 						'<div style="clear:both;width:100%; height:1px;"></div>'+
 				    	'<div><div class="rem_lt">400 x400 像素</div>'+
 				    		'<div  nowarticle='+i+' class="rem_rt removeArticle"></div></div></div>').appendTo(".allSubArticles");
				}
			}
		}
		var sumArticle = data.article.length;
		
		if(sumArticle ==8){
			$(".add_more_artilces").hide();
		}
		
		//当完全没有图文时候
		if(sumArticle==0)
			sumArticle++;
		
		while(sumArticle<=8){
			
			var f =sumArticle+1;
			$(".article"+sumArticle).val("0");
			$(".articleContent"+sumArticle).val("");
			$('<div  flag="'+f+'" class="more_viewpic" style="display:none;"><div class="big_view2">'+
					'<input  type="file" onchange="ajaxFileUploadF('+sumArticle+');" id="fileField'+sumArticle+'" name="mp3file" /></div><img class="articlePic'+sumArticle+'" src="/func/images/upimg2.png"/>'+
					'<div class="cent_min"><input type="texti" class="articleTitle'+sumArticle+'" value="" /><br/>'+
					'<a  class="start_modefiy" href="#" flag='+sumArticle+'>点击编辑正文</a></div>'
					+'<div style="clear:both;width:100%; height:1px;"></div>'
					+'<div><div class="rem_lt">400 x400 像素</div><div  nowarticle='+sumArticle+' class="rem_rt removeArticle"></div></div></div>').appendTo(".allSubArticles");
			sumArticle++;
		}
		$(' <div style="width:100%; height:0px; clear:both;"></div>').appendTo(".allSubArticles");
		$(".menuType").val(3);
		$(".menuTypeText").hide();
		$(".user_talk3").show();
		$(".menuType").parents(".hsborder:first").show();
		
		if(ishsborderHien==0){
			$(".allMenuType").show();
		}else{
			$(".allMenuType").hide();
		}
}
 function ajaxFileUpload(){
		var reg	= new RegExp(/[\.jpg || \.jpeg || \.bmp || \.png|| \.JPG|| \.JPEG || \.BMP]$/);
		var filev = $("#fileField").val();
		if (!reg.test(filev)){
			alert("图片格式必须为jpg、jpeg、png、bmp! ");
			return false;
		}
		
		$(".dh_loading").show();
	    $.ajaxFileUpload({
	      url:'/materials.action?op=upload&stats=uploadImage',            
	      secureuri:false,
	      fileElementId:'fileField',                       
	      dataType: 'json',                            
	      success: function (data) {  
	       	  $(".dh_loading").hide();
	    	  $(".articlePic").val(data.url);
	    	  $(".fileField").attr("src",data.url);
	      }
	    });
	}
 
 function ajaxFileUploadVideo(){
		var reg	= new RegExp(/[\.mp4|| \.MP4]$/);
		var filev = $("#fileFieldVideo").val();
		if (!reg.test(filev)){
			alert("视频格式必须为mp4! ");
			return false;
		}
	    $.ajaxFileUpload({
	      url:'/materials.action?op=upload&stats=uploadImage',            
	      secureuri:false,
	      fileElementId:'fileFieldVideo',                       
	      dataType: 'json',                                    
	      success: function (data) {  
	    	  showVideo(1,0,"");
	      }
	    });
	}
 function ajaxFileUpload0(){
	var reg	= new RegExp(/[\.jpg || \.jpeg || \.bmp || \.png|| \.JPG|| \.JPEG|| \.BMP]$/);
	var filev = $("#fileField0").val();
	if (!reg.test(filev)){
		alert("图片格式必须为jpg、jpeg、png、bmp! ");
		return false;
	}
	$(".dh_loading").show();
    $.ajaxFileUpload({
      url:'/materials.action?op=upload&stats=uploadImage',            
      secureuri:false,
      fileElementId:'fileField0',                       
      dataType: 'json',                                    
      success: function (data) {  
    	  $(".dh_loading").hide();
    	  $(".articlePic0").val(data.url);
    	  $(".fileField0").attr("src",data.url);
      }
    });
}
 function ajaxFileUploadF(flag){
		var reg	= new RegExp(/[\.jpg || \.jpeg || \.bmp || \.png|| \.JPG|| \.JPEG|| \.BMP]$/);
		var filev = $("#fileField"+flag).val();
		if (!reg.test(filev)){
			alert("图片格式必须为jpg、jpeg、png、bmp! ");
			return false;
		}
	    $.ajaxFileUpload({
	      url:'/materials.action?op=upload&stats=uploadImage',            
	      secureuri:false,
	      fileElementId:'fileField'+flag,                       
	      dataType: 'json',                                    
	      success: function (data) {   
	    	  $(".articlePic"+flag).val(data.url);
	    	  $(".fileField"+flag).attr("src",data.url);
	    	  $(".articlePic"+flag).attr("src",data.url);
	      }
	    });
	}
 
var articleContent;
var articleContent0;
var articleContent1;
var articleContent2;var articleContent3;
var articleContent4;var articleContent5;
var articleContent6;var articleContent7;
var repeatValue = 0;
function menutextnoRepeatValidate(){
	var menutextno = $.trim($(".menutextno").val());
	var menuid = $(".menuid").val();
	if(menutextno==""){
		$(".alertSimpleContent").html("菜单序号不能为空！");
    	$(".alertSimple").show();
    	menutextnoRepeat=0;
    	return false;
	}else{
		$.ajax({
			url:"/ajax-mpmenu.action",
	             type:"POST",dataType:"json",
	             timeout:"10000",
	             async: "true",
	             data:{	
	            	 "op":"menutextnoRepeat",
	            	 "menuid":menuid,
	            	 "menutextno":menutextno
	             },success:function(data){
	             	if(data.code=="A00006"){
	             		menutextnoRepeat=1;
	             		$(".mnonum"+menuid).html(menutextno);
	             		//$(".mnonum"+menuid).html("<strong>【</strong><font>"+menutextno+"</font><strong>】</strong>");
	             	}else if(data.code=="A00004"){
	            		 location.href="/login.jsp";
	            	}else if(data.code=="A00005"){
	            		menutextnoRepeat=0;
	            		$(".alertSimpleContent").html(data.msg);
	 			    	$(".alertSimple").show();
	            	}else{
	            		$(".alertSimpleContent").html("发生错误！code:"+data.code);
	 			    	$(".alertSimple").show();
	            	}
	             }
		});
	}
}
function repeat(){
	var keyword =$.trim($(".menukeyword").val());
	var menuid = $(".menuid").val();
	var reg2 = new RegExp(/^\d+$/); 
	if(reg2.test(keyword)){
		repeatValue=0;
		$(".alertSimpleContent").html("关键字不能为纯数字！");
	    $(".alertSimple").show();
	    return false;
	}
	
	$.ajax({
		url:"/ajax-mpmenukeyword.action",
             type:"POST",dataType:"json",
             timeout:"10000",
             async: "true",
             data:{	"op":"menuRepeat",
            	 	"menuid":menuid,
            	 	"keyword":keyword
             },success:function(data){
            	 if(data.code=="A00006"){
            		 repeatValue=1;
            		 $(".menukeyword").val(data.keyword);
            	 }else if(data.code=="A00004"){
            		 location.href="/login.jsp";
            	 }else if(data.code=="A00005"){
            			$(".alertSimpleContent").html(data.repeat);
            	    	$(".alertSimple").show();
            	    	repeatValue=0;
            	    	return false;
            	 }
             
             }
     });
	
}
$(document).ready(function(){
	
	$(".menukeyword").live("blur",function(){
		 repeat();
	});
	

	$(".save_ForArticle").click(function(){
		var menuType =$(".menuType").val();
		var fromMarticleid =$("input[name='fromMarticleid']:checked").val();
		if(menuType == 2 || menuType==9 || menuType==18){
			
			if(fromMarticleid!=null){ 
            	$.ajax({
        			url:"/ajax-mpmenu.action",
                         type:"POST",dataType:"json",
                         timeout:"10000",
                         async: "true",
                       
                         data:{	"op":"getArticle",
                        	 	"fromMarticleid":fromMarticleid
                         },success:function(data){
                        	 if(data.code=="A00006"){
                        		 getArticle(data,menuType,allMenuTypeHide,1);
                        		 
                        	 }else if(data.code=="A00004"){
                        		 location.href="/login.jsp";
                        	 }
                         
                         }
                 });
        	
            }
			
			
		}else{
			if(fromMarticleid!=null){ 
            	$.ajax({
        			url:"/ajax-mpmenu.action",
                         type:"POST",dataType:"json",
                         timeout:"10000",
                         async: "true",
                       
                         data:{	"op":"getArticleByNews",
                        	 	"fromMarticleid":fromMarticleid
                         },success:function(data){
                        	 if(data.code=="A00006"){
                        		 getArticles(data,allMenuTypeHide);
                        	 }else if(data.code=="A00004"){
                        		 location.href="/login.jsp";
                        	 }
                         
                         }
                 });
        	
            }
			
		}
		$(".only_test_box").fadeOut();
		$(".edit_mask").fadeOut();
		
	});
	$(".concel,.close_onlytest").click(function(){
		$(".only_test_box").fadeOut();
		$(".edit_mask").fadeOut();
		
	});
	
	//当为无法识别回复语时候的回复类型
	$(".r_titleNoServiceType").change(function(){
		var r = $(this).val();
		$(".menuUpdateTop").show();
 		$(".user_talk").hide();
 		$(".start_modefiy").show();
 		$(".changeOtherActivity").hide();
 		
		if(r==0){
			//菜单
     		$(".user_talk5").show();
			$(".user_talk5").find("div").hide();
		}else if(r==1){
     		$(".user_talk5").show();
			$(".user_talk5").find("div").show();
		}else if(r==2){
			$(".menuType").val(2);
			$(".user_talk2").show();
			$(".hsborder").hide();
			$(".start_modefiy").show();
		}else if(r==3){
			$(".menuType").val(3);
			$(".hsborder").hide();
			var flag =1;
			var articleSum = $(".articleSum").val();
			$(".more_viewpic").each(function(){
				flag++;
				var f = $(this).attr("flag");
				if(f>articleSum){
					$(this).hide();
				}else{
					$(this).show();
				}
			});
			$(".user_talk3").show();
			$(".articleSum").val(3);
			articleChange(3);
			$(".user_talk3").show();
			$(".start_modefiy").show();
			
			$(".user_talk5").find("div").show();
		}else if(r==6){
			$(".menuType").val(6);
			$(".user_talk6").show();
			showVoice(1,0,"");

		}else if(r==9){
			$(".start_modefiy").hide();
			$(".user_talk2").show();
			
			$.ajax({
				url:"/card/ajax-card.action",
		             type:"POST",dataType:"json",
		             timeout:"10000",
		             async: "true",
		           
		             data:{	
		             },success:function(data){
		             	if(data.code=="A00006"){
		             		getArticle(data,9,1);
		             	}else if(data.code=="A00004"){
		            		 location.href="/login.jsp";
		            	}else{
		            		$(".alertSimpleContent").html("发生错误！code:"+data.code);
		 			    	$(".alertSimple").show();
		            	}
		             }
			});
		}else if(r==10){
			$(".menuType").val(10);
			$(".coupon").show();
			showCoupon(1,0,"");

		}
		
		
	});
	
	$("#noServiceReply").live("click",function(){
		allMenuTypeHide = 1;
		if(document.getElementById('noServiceReply').checked == true){
			$(".user_talk").hide();
			$(".user_talk5").show();
			$(".r_title").hide();
			type=-2;
			$(".r_titleNoService").show();
		}else{
			$(".r_titleNoService").hide();
			$(".user_talk").hide();
	   		$(".edit_tip").show();
	   		$(".modefy_tip").show();
	   		$(".save_cunc").hide();
	   		$(".menuUpdateTop").hide();
			
		}
	});
	
	
	$(".noReply,.startReply").live("click",function(){
		
		$(".fileField").attr("src","/func/images/upimg.png");
		
		$(".articleTitle0").val("");
		$(".articlePic0").attr("src","/func/images/upimg.png");
		
		for(var i=1;i<=7;i++){
			$(".articleTitle"+i).val("");
			$(".articlePic"+i).attr("src","/func/images/upimg2.png");
		}
		for(var i=0;i<=7;i++){
			$(".article"+i).val(0);
		}
		$(".article").val(0);
		content_start.html("");
	 	content_4.html("");
	 	content_menu.html("");
	 	$(".articleContent").html("");
	 	$(".articleContent0").html("");
	 	$(".articleContent1").html("");
	 	$(".articleContent2").html("");$(".articleContent3").html("");$(".articleContent4").html("");$(".articleContent5").html("");
	 	$(".articleContent6").html("");$(".articleContent7").html("");
		$(".title_article").val("");
		
		$(".start_modefiy").show();
		$(".changeOtherActivity").hide();
		$(".only_test").show();
		
		type=$(this).attr("type");
		if(type==-2){
			$(".r_titleNoServiceTypeOther").hide();
		}else{
			$(".r_titleNoServiceTypeOther").show();
		}
		allMenuTypeHide = 1;
		$.ajax({
			url:"/ajax-mpmenu.action",
                 type:"POST",dataType:"json",
                 timeout:"10000",
                 async: "true",
               
                 data:{	"op":"getNoServiceReplay",
                	 	"type":type
                 },success:function(data){
                	 if(data.code=="A00006"){
                			$(".r_title").hide();
                			$(".r_titleNoService").show();
                	 		$(".menuUpdateTop").show();
                	 		
                	 		$(".edit_tip").hide();
                	 		$(".user_talk").hide();
                			
                			$(".r_title").hide();
                			$(".r_titleNoService").show();
                			$(".r_titleNoServiceType").val(data.type);
                			var r = data.type;
                			if(r==0){
                				$(".user_talk5").show();
                				$(".user_talk5").find("div").hide();
                			}else if(r==1){
                				$(".user_talk5").show();
                				$(".user_talk5").find("div").show();
                			}else if(r==2){
                				$(".user_talk2").show();
                				getArticle(data,2,1);
                				$(".hsborder").hide();
                			}else if(r==3){
                				getArticles(data,allMenuTypeHide);
                				$(".user_talk3").show();
                				$(".hsborder").hide();
                			}else if(r==6){
                				showVoice(data.pageNo,data.mid);
                				$(".user_talk6").show();
                			}else if(r==10){
                				showCoupon(data.pageNo,data.couponid);
                				$(".coupon").show();
                			}else if(r==9){
                				getArticle(data,9,1);
                     			$(".start_modefiy").hide();
                			}
                			
                			content_4.html(data.content);
                	 }else if(data.code=="A00004"){
                		 location.href="/login.jsp";
                	 }
                 
                 }
         });
	
		
	});
	
	$(".start_modefiy").live("click",function(){
		now_content = $(this).attr("flag");
		$(".edit_mask").show();
		$("._popup").show();
		//$(".edit_container").popup({p_titletst:'',p_height:'400',p_width:'640',p_speed:400,p_YN_icon:'n',p_show:'slide' ,p_YN_iframe:'n'});
		
		
		if(now_content==-1){
			$(".articleUrlModelValue").val($(".articleUrl").val());
			$(".titleContent").html($(".title_article").val());
			
			var content = $(".articleContent").text();
			content_menu.html(content);
			
			
			if($(".articleUrl").val()==""){
				$(".articleUrlModelValue").val("http://");
			}else{
				$(".articleUrlModelValue").val($(".articleUrl").val());
			}
			
			if($.trim($(".articleUrl").val())!=""){
				$(".articleUrlModel").click();
				
			}else{
				$(".articleTextModel").click();
			}
		}else{
			$(".articleUrlModelValue").val($(".articleUrl"+now_content).val());
			$(".titleContent").html($(".articleTitle"+now_content).val());
			var content = $(".articleContent"+now_content).text();
			content_menu.html(content);
			
			if($.trim($(".articleUrl"+now_content).val())!=""){
				$(".articleUrlModel").click();
				
			}else{
				$(".articleTextModel").click();
			}
			
			if($(".articleUrl"+now_content).val()==""){
				$(".articleUrlModelValue").val("http://");
			}else{
				$(".articleUrlModelValue").val($(".articleUrl"+now_content).val());
			}
			
		}
		
		 
	});	
	
	$(".articleUrlModelSave").live("click",function(){
		if($(".mpAccountPackageid").val()>=1){
			$(".needMoney").hide();
			if(now_content==-1){
				$(".articleUrl").val($(".articleUrlModelValue").val());
			}else{
				$(".articleUrl"+now_content).val($(".articleUrlModelValue").val());
			}
			$(".edit_mask").hide();
			$("._popup").hide();
		}else{
			$(".needMoney").show();
		}
		
	});
	
	$(".save_ForContentCancel").live("click",function(){
		$("._popup").hide();
		$(".edit_mask").hide();
	});
	$(".save_ForContent").live("click",function(){
		
		$(".edit_mask").hide();
		$("._popup").hide();
		if(now_content==-1){
			$(".articleUrl").val("");
			$(".articleContent").text(content_menu.html());
			articleContent=  content_menu.html();
		}else{
			if(now_content==0){
				articleContent0 = content_menu.html();
			}else if(now_content==1){
				articleContent1 = content_menu.html();
			}else if(now_content==2){
				articleContent2 = content_menu.html();
			}else if(now_content==3){
				articleContent3 = content_menu.html();
			}else if(now_content==4){
				articleContent4 = content_menu.html();
			}else if(now_content==5){
				articleContent5 = content_menu.html();
			}else if(now_content==6){
				articleContent6 = content_menu.html();
			}else if(now_content==7){
				articleContent7 = content_menu.html();
			}
			$(".articleUrl"+now_content).val("");
			if(bro.msie) {
				$(".articleContent"+now_content).val(content_menu.html());
			}else  if(bro.mozilla) {
				$(".articleContent"+now_content).text(content_menu.html());
			}else if(bro.safari) {
				$(".articleContent"+now_content).text(content_menu.html());
			}else  if(bro.opera) {
				$(".articleContent"+now_content).text(content_menu.html());
		    }else{
		    	$(".articleContent"+now_content).text(content_menu.html());
		    }
			
			
		}
		
		
	});
	$("._closes").live("click",function(){
		$("._popup").hide();
		$(".edit_mask").hide();
		
	});
	
	$(".menutextno").blur(function(){
		menutextnoRepeatValidate();
	});
	
	$(".save_btn").live("click",function(){
		var menutype = $(".menuType").val();
		var menuid = $(".menuid").val();
		var title = $(".menutitle").val();
		
		if($.trim(title)==""){
			$(".alertSimpleContent").html("标题不能为空且在24个字符以内！");
	    	$(".alertSimple").show();
	    	$(".menutitle").focus();
	    	return false;
		}
		if($.trim(title).length>24){
			$(".alertSimpleContent").html("标题不能为空且在24个字符以内！");
	    	$(".alertSimple").show();
	    	$(".menutitle").focus();
	    	return false;
		}
		if(type==-2 || type ==-3){
			var replyType =type;
			var url;
			var op;
			//if(type==-2){
			url ="/ajax-mpmenu.action";
			op = "updateNoServiceReplay";
//			}else{
//				 url ="/ajax-account.action";
//				 op = "updateFollowtextmsg";
//			}
			//无法识别回复语更改类型
			updateAccountReply(url,op,replyType);
		}else{
			if(menutextnoRepeat==0){
				menutextnoRepeatValidate();
			}
			if(repeatValue==0){
				
				if($(".menukeyword").val()!="" ){
					repeat();
				}
				
				
			}
			setTimeout(function(){
				if(repeatValue==1 && menutextnoRepeat==1 ){
					saveMenu(title,menuid,menutype);
				}
			},1000);
			
			
		}
    	
	});
	$(".home1_left").live("click",function(){
		var r_titleKeywordshow =1;
		if($(this).find(".mdfy").hasClass("maidmdfy")){
			$(".talk_cent03a").find("ul").show();
			$("#rl_exp_btn").hide();
			$(".r_titleKeyword").hide();
			r_titleKeywordshow =0;
		}else{
			$(".talk_cent03a").find("ul").hide();
			$("#rl_exp_btn").show();
			$(".r_titleKeyword").show();
			r_titleKeywordshow =1;
		}
		$(".edit_tip").hide();
		var menuid = $(this).find(".mdfy").attr("menuid");
		$(".menuid").val(menuid);
		
		showMenu(menuid,r_titleKeywordshow);
		//window.location.href="/mpmenu.action?op="+op+"&menuid="+menuid+"";
	});
	
	$(".Modify").live("click",function(){
		var r_titleKeywordshow =1;
		if($(this).hasClass("maidmdfy")){
			$("#rl_exp_btn").hide();
			$(".talk_cent03a").find("ul").show();
			r_titleKeywordshow =0;
			$(".r_titleMenutextno").hide();
		}else{
			$("#rl_exp_btn").show();
			$(".talk_cent03a").find("ul").hide();
			r_titleKeywordshow =1;
			$(".r_titleMenutextno").show();
		}
		$(".edit_tip").hide();
		var menuid = $(this).attr("menuid");
		$(".menuid").val(menuid);
		showMenu(menuid,r_titleKeywordshow);
		//window.location.href="/mpmenu.action?op="+op+"&menuid="+menuid+"";
	});
	$(".only_test").click(function(){
		pageArticle(1);
	});

	$(".toPage").live("click",function(){
		var pagebegin = $(this).attr("pagebegin");
		pageArticle(pagebegin);
	});
	$(".toPageArticles").live("click",function(){
		var pagebegin = $(this).attr("pagebegin");
		pageArticles(pagebegin);
	});
	
	$(".more_test").click(function(){
		pageArticles(1);
	});
	$("#toPageArticleValue").live("click",function(){
		var pagebegin = $(".toPageArticleValue").val();
		if(/^\d+$/igm.test(pagebegin)){
			if(pagebegin > articlePageSum)
				pagebegin = articlePageSum;
		}
		pageArticle(pagebegin);
	});
	$("#toPageArticlesValue").live("click",function(){
		
		var pagebegin = $(".toPageArticlesValue").val();
		if(/^\d+$/igm.test(pagebegin)){
			if(pagebegin > articlesPageSum)
				pagebegin = articlesPageSum;
		}
		pageArticles(pagebegin);
	});
}); 

var allMenuTypeHide=0;
var isUpdateQuizArticle=0;

//删除所有的图标
function removeBZ(menuid){
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("lbsbz");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("voices");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("video");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("quiz");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("picture360Sort");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("dantuwen");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("duotuwen");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("Less");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("memCard");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("appurl");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("yhq");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("wallbz");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("bespeakbz");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("chunwenben");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("picIndustryProduct");
	 $(".mnonum"+menuid).parents(".Homeml:first").removeClass("wesite");
}


//无法识别回复语更改类型
function updateAccountReply(url,op,replyType){
	var r_titleNoServiceType = $(".r_titleNoServiceType").val();
	var data = {
			"op":op,
    	 	"content":content_4.html(),
    	 	"type":r_titleNoServiceType,
    	 	
    	 	"article":$(".article").val(),
    	 	"articleUrl":$(".articleUrl").val(),
     		"articleTitle":$(".title_article").val(),
     		"articleDesc":$(".description_article").val(),
     		"articlePic":$(".fileField").attr("src"),
     		"articleContent":articleContent,
     		"articleSum":$(".articleSum").val(),
     		"replyType":replyType
	};
	if(r_titleNoServiceType == 2){
		//单图文
		var titlesum = $.trim($(".title_article").val());
		
		if(titlesum=="" || titlesum.length>36){
			$(".alertSimpleContent").html("单图文标题不能为空且36字符以内！");
	    	$(".alertSimple").show();
	    	return false;
		}
	}else if(r_titleNoServiceType==3){
		//多图文
		
		var titlesum = $.trim($(".articleTitle0").val());
		if(titlesum=="" || titlesum.length>36){
			$(".alertSimpleContent").html("多图文标题不能为空且36字符以内！");
	    	$(".alertSimple").show();
	    	return false;
		}
		var articleSum = $(".articleSum").val();
		for(var i=1;i<articleSum;i++){
			titlesum = $.trim($(".articleTitle"+i).val());
			if(titlesum=="" || titlesum.length>36){
				$(".alertSimpleContent").html("多图文标题"+(i+1)+"不能为空且36字符以内！");
		    	$(".alertSimple").show();
		    	$(".articleTitle"+i).focus();
		    	return false;
			}
		}
		
		for(var i=0;i<=7;i++){
			data["articleUrl"+i] =$(".articleUrl"+i).val();
			data["article"+i] =$(".article"+i).val();
			data["articleTitle"+i] =$(".articleTitle"+i).val();
			data["articleDesc"+i] =$(".articleDesc"+i).val();
			data["articlePic"+i] =$(".articlePic"+i).attr("src");
			data["articleContent"+i] =$(".articleContent"+i).val();
		}
		
	}else if(r_titleNoServiceType==6){
		//语音
		
		if($(".voiceid").length==0){
			$(".alertSimpleContent").html("当前并没有语音！");
	    	$(".alertSimple").show();
	    	return false;
		}
		var list= $('input:radio[name="voiceid"]:checked').val(); 
	     if(list==null){ 
	     	$(".alertSimpleContent").html("请选择语音！");
		    	$(".alertSimple").show();
		    	return false;
	     } 
        
		var voiceid =$("input[name='voiceid']:checked").val();
		data["voiceid"]=voiceid;
	}else if(r_titleNoServiceType==10){
		if($(".couponid").length==0){
			$(".alertSimpleContent").html("当前并没有优惠券！");
	    	$(".alertSimple").show();
	    	return false;
		}
		var list= $('input:radio[name="couponid"]:checked').val(); 
         if(list==null){ 
         	$(".alertSimpleContent").html("请选择优惠券！");
		    	$(".alertSimple").show();
		    	return false;
         } 
        
		var couponid =$("input[name='couponid']:checked").val(); 
		data["couponid"]=couponid;
		var appurl = $(".wedutyAddress").val()+"/couponGetCode.action?couponid="+couponid;
		
	}
	
	
	$.ajax({
		url:url,
         type:"POST",dataType:"json",
         timeout:"10000",
         async: "true",
       
         data:data,
         success:function(data){
        	 if(data.code=="A00006"){
        		 $(".user_talk").hide();
        		 $(".edit_tip").show();
        		 $(".modefy_tip").hide();
        		 $(".save_cunc").show();
        		 $(".menuUpdateTop").hide();
        		 content_4.html(data.content);
        	 }else if(data.code=="A00004"){
        		 location.href="/login.jsp";
        	 }else{
            		$(".alertSimpleContent").html("发生错误！code:"+data.code);
 			    	$(".alertSimple").show();
             }
         
         }
 });

}
function saveMenu(title,menuid,menutype){
	//保存有子菜单的菜单
		if(type==4){
			$.ajax({
				url:"/ajax-mpmenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"updateMenu",
	                 		"menuid":menuid,
	                 		"menukeyword":$(".menukeyword").val(),
	                 		"menutitle":$(".menutitle").val(),
	                 		"menucontent_head":content_start.html(),
	                 		"menucontent_tail":content_end.html(),
	                 		"menutextno":$(".menutextno").val()
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 $(".menuUpdateTop").hide();
	                		 $(".mnonum"+menuid).parent().find(".mdfy").html(data.title);
	                		 if($(".dynamicmenu").val()==2){
	                			 $(".mnonum"+menuid).html("<strong></strong>"+data.menutextno+"<strong></strong>");
	                		 }
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
		     			    	$(".alertSimple").show();
		                	 }
	                 
	                 }
	         });
		}else if(menutype==1){
			
			//出文本
			$.ajax({
				url:"/ajax-mpmenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"updateMenuText",
	                 		"menuid":menuid,
	                 		"menukeyword":$(".menukeyword").val(),
	                 		"menutitle":title,
	                 		"menucontent":content_3.html(),
	                 		"menutextno":$(".menutextno").val()
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".menuUpdateTop").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 removeBZ(menuid);
	                		 $(".mnonum"+menuid).parents(".Homeml:first").addClass("chunwenben");
	                		
	                		 $(".mnonum"+menuid).parents(".Homeml:first").find(".HomeAdd").remove();
	                		 $('<label class="HomeAdd add hovershow" title="添加子菜单" parentid='+menuid+' style="display: none;"></label>').appendTo($(".mnonum"+menuid).parents(".Homeml:first").find(".home1_right"));
	                		 $(".mnonum"+menuid).parent().find(".mdfy").html(data.title);
	                		 if($(".dynamicmenu").val()==2){
	                			 $(".mnonum"+menuid).html("<strong></strong>"+data.menutextno+"<strong></strong>");
	                		 }
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
		     			    	$(".alertSimple").show();
		                }
	                 
	                 }
	         });
			
		}else if(menutype==2 || menutype==9 || menutype==18){
			var titlesum = $.trim($(".title_article").val());
			
			if(titlesum=="" || titlesum.length>36){
				$(".alertSimpleContent").html("单图文标题不能为空且36字符以内！");
		    	$(".alertSimple").show();
		    	return false;
			}
			var op = "updateMenuAndArticle";
			if(menutype==9){
				op = "updateMemberCard";
			}else if(menutype==18){
				op = "updateWeSite";
			}
			var acontent = "";
			if(bro.msie) {
				acontent =$(".articleContent").val();
			}else  if(bro.mozilla) {
				acontent =$(".articleContent").text();
			}else if(bro.safari) {
				acontent=$(".articleContent").text();
			}else  if(bro.opera) {
				acontent =$(".articleContent").text();
		    }else{
		    	acontent=$(".articleContent").text();
		    }
			
			//单图文
			$.ajax({
				url:"/ajax-mpmenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":op,
	                 		"menuid":menuid,
	                 		"menukeyword":$(".menukeyword").val(),
	                 		"menutitle":title,
	                 		"articleUrl":$(".articleUrl").val(),
	                 		"articleTitle":$(".title_article").val(),
	                 		"articleDesc":$(".description_article").val(),
	                 		"articlePic":$(".fileField").attr("src"),
	                 		"articleContent":acontent,
	                 		"article":$(".article").val(),
	                 		"menutextno":$(".menutextno").val()
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".menuUpdateTop").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 
	                		 removeBZ(menuid);
	                		 
	                		 if(menutype==9){
	                			 $(".mnonum"+menuid).parents(".Homeml:first").addClass("memCard");
	                		 }else if(menutype==18){
	                			 $(".mnonum"+menuid).parents(".Homeml:first").addClass("wesite");
	                		 }else{
	                			 $(".mnonum"+menuid).parents(".Homeml:first").addClass("dantuwen");
	                		 }
	                		 
	                		 $(".mnonum"+menuid).parents(".Homeml:first").find(".HomeAdd").remove();
	                		 $(".mnonum"+menuid).parent().find(".mdfy").html(data.title);
	                		 if($(".dynamicmenu").val()==2){
	                			 $(".mnonum"+menuid).html(data.menutextno);
	                			 //$(".mnonum"+menuid).html("<strong></strong>"+data.menutextno+"<strong></strong>");
	                		 }
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
	                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
	     			    	$(".alertSimple").show();
	                	 }
	                 
	                 }
	         });
		}else if(menutype==3){
			var titlesum = $.trim($(".articleTitle0").val());
			if(titlesum=="" || titlesum.length>36){
				$(".alertSimpleContent").html("多图文标题不能为空且36字符以内！");
		    	$(".alertSimple").show();
		    	return false;
			}
			var articleSum = $(".articleSum").val();
			for(var i=1;i<articleSum;i++){
				titlesum = $.trim($(".articleTitle"+i).val());
				if(titlesum=="" || titlesum.length>36){
					$(".alertSimpleContent").html("多图文标题"+(i+1)+"不能为空且36字符以内！");
			    	$(".alertSimple").show();
			    	$(".articleTitle"+i).focus();
			    	return false;
				}
			}
			
			var data ={
					"op":"updateMenuAndArticles",
             		"menuid":menuid,
             		"menukeyword":$(".menukeyword").val(),
             		"menutitle":title,
             		"articleSum":articleSum,
             		"menutextno":$(".menutextno").val()
             		
			};
			
			for(var i=0;i<=7;i++){
				
				data["articleUrl"+i] =$(".articleUrl"+i).val();
				data["article"+i] =$(".article"+i).val();
				data["articleTitle"+i] =$(".articleTitle"+i).val();
				data["articleDesc"+i] =$(".articleDesc"+i).val();
				data["articlePic"+i] =$(".articlePic"+i).attr("src");
				
				if(bro.msie) {
					data["articleContent"+i] =$(".articleContent"+i).val();
				}else  if(bro.mozilla) {
					data["articleContent"+i] =$(".articleContent"+i).text();
				}else if(bro.safari) {
					data["articleContent"+i] =$(".articleContent"+i).text();
				}else  if(bro.opera) {
					data["articleContent"+i] =$(".articleContent"+i).text();
			    }else{
			    	data["articleContent"+i] =$(".articleContent"+i).text();
			    }
			}
			//多图文
			$.ajax({
				url:"/ajax-mpmenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:data,
	                 success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".menuUpdateTop").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 removeBZ(menuid);
	                		 $(".mnonum"+menuid).parents(".Homeml:first").addClass("duotuwen");
	                		 $(".mnonum"+menuid).parents(".Homeml:first").find(".HomeAdd").remove();
	                		 $(".mnonum"+menuid).parent().find(".mdfy").html(data.title);
	                		 if($(".dynamicmenu").val()==2){
	                			 $(".mnonum"+menuid).html("<strong></strong>"+data.menutextno+"<strong></strong>");
	                		 }
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
	                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
	     			    	$(".alertSimple").show();
	                	 }
	                 
	                 }
	         });
		}else if(menutype==5){
			if($(".qid").length==0){
				$(".alertSimpleContent").html("当前并没有活动！");
		    	$(".alertSimple").show();
		    	return false;
			}
			var list= $('input:radio[name="qid"]:checked').val(); 
	         if(list==null){ 
	         	$(".alertSimpleContent").html("请选择一个互动活动！");
			    	$(".alertSimple").show();
			    	return false;
	         } 

			var qid =$("input[name='qid']:checked").val(); 
			$.ajax({
				url:"/ajax-mpmenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"saveQuiz",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"qid":qid,
	                	 	
	                	 	"articleUrl":$(".articleUrl").val(),
	                 		"articleTitle":$(".title_article").val(),
	                 		"articleDesc":$(".description_article").val(),
	                 		"articlePic":$(".fileField").attr("src"),
	                 		"articleContent":articleContent,
	                 		"article":$(".article").val(),
	                 		"isUpdateQuizArticle":isUpdateQuizArticle,
	                	 	"menutextno":$(".menutextno").val()
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".menuUpdateTop").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 
	                		 removeBZ(menuid);
	                		 
	                		 $(".mnonum"+menuid).parents(".Homeml:first").addClass("quiz");
	                		 $(".mnonum"+menuid).parents(".Homeml:first").find(".HomeAdd").remove();
	                		 $(".mnonum"+menuid).parent().find(".mdfy").html(data.title);
	                		 if($(".dynamicmenu").val()==2){
	                			 $(".mnonum"+menuid).html("<strong></strong>"+data.menutextno+"<strong></strong>");
	                		 }
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
		     			    	$(".alertSimple").show();
		                	 }
	                 
	                 }
	         });
		}else if(menutype==6){

			if($(".voiceid").length==0){
				$(".alertSimpleContent").html("当前并没有语音！");
		    	$(".alertSimple").show();
		    	return false;
			}
			var list= $('input:radio[name="voiceid"]:checked').val(); 
	         if(list==null){ 
	         	$(".alertSimpleContent").html("请选择语音！");
			    	$(".alertSimple").show();
			    	return false;
	         } 
	        
			var voiceid =$("input[name='voiceid']:checked").val(); 
			$.ajax({
				url:"/ajax-mpmenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"saveVoices",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"voiceid":voiceid,
	                	 	"menutextno":$(".menutextno").val()
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".menuUpdateTop").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 
	                		 removeBZ(menuid);
	                		 $(".mnonum"+menuid).parents(".Homeml:first").addClass("voices");
	                		 $(".mnonum"+menuid).parents(".Homeml:first").find(".HomeAdd").remove();
	                		 $(".mnonum"+menuid).parent().find(".mdfy").html(data.title);
	                		 if($(".dynamicmenu").val()==2){
	                			 $(".mnonum"+menuid).html("<strong></strong>"+data.menutextno+"<strong></strong>");
	                		 }
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
		     			    	$(".alertSimple").show();
		                	 }
	                 
	                 }
	         });
		}else if(menutype==7){

			if($(".videoid").length==0){
				$(".alertSimpleContent").html("当前并没有视频！");
		    	$(".alertSimple").show();
		    	return false;
			}
			var list= $('input:radio[name="videoid"]:checked').val(); 
	         if(list==null){ 
	         	$(".alertSimpleContent").html("请选择视频！");
			    	$(".alertSimple").show();
			    	return false;
	         } 
	        
			var videoid =$("input[name='videoid']:checked").val(); 
			$.ajax({
				url:"/ajax-mpmenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"saveVoices",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"voiceid":videoid,
	                	 	"menutextno":$(".menutextno").val()
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".menuUpdateTop").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 
	                		 removeBZ(menuid);
	                		 
	                		 $(".mnonum"+menuid).parents(".Homeml:first").addClass("video");
	                		 
	                		 $(".mnonum"+menuid).parents(".Homeml:first").find(".HomeAdd").remove();
	                		 $(".mnonum"+menuid).parent().find(".mdfy").html(data.title);
	                		 if($(".dynamicmenu").val()==2){
	                			 $(".mnonum"+menuid).html("<strong></strong>"+data.menutextno+"<strong></strong>");
	                		 }
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
		     			    	$(".alertSimple").show();
		                	 }
	                 
	                 }
	         });
		}else if(menutype==8  || menutype ==14 || menutype ==16 || menutype ==17 || menutype==13){
			var appurl = $(".appUrl").val();
			var keepalive =1;
			
			if(menutype==13){
				if($(".industryProductUrl").val()==""){
					isUpdate=1;
					$("body").tip({ynclose : 'y',status : "error",content :"请选择一个商品！"});
			    	return false;
				}
				keepalive =0;
				appurl =$(".bappAddress").val()+"bapp/industryProduct.action?"+$(".industryProductUrl").val();
			}else if(menutype==14){
				var id_360 = $(".360AllPictureid").val();
				if(id_360==0){
	        		$(".alertSimpleContent").html("请选择一个360度全景视图！");
				    $(".alertSimple").show();
				    return false;
				}
				keepalive =0;
				appurl = $(".bappAddress").val()+"bapp/prospectPicture.action?id="+id_360+"&url="+$(".360AllPictureUrl").val();
			}else if(menutype ==16){
				var id_360 = $(".lbsid").val();
				if(id_360==0){
	        		$(".alertSimpleContent").html("请选择一个LBS！");
				    $(".alertSimple").show();
				    return false;
				}
				keepalive =1;
				appurl = $(".bappAddress").val()+"wall-lbs/lbs.action?sortid="+id_360;
			}else if(menutype==17){
				var bespeakid = $(".bespeakid").val();
				if(bespeakid==0){
	        		$(".alertSimpleContent").html("请选择一个微预约！");
				    $(".alertSimple").show();
				    return false;
				}
				keepalive =0;
				if($(".bespeakurl").val().indexOf("http:")>=0){
					appurl = $(".bespeakurl").val()+"?bespeakid="+bespeakid;
				}else{
					appurl = $(".wedutyAddress").val()+$(".bespeakurl").val()+"?bespeakid="+bespeakid;
				}
				
			}
			
			$.ajax({
				url:"/ajax-mpmenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"updateAppurl",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"appurl":appurl,
	                	 	"menutextno":$(".menutextno").val(),
	                	 	"keepalive":keepalive
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".menuUpdateTop").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 
	                		 removeBZ(menuid);
	                	
	                		 if(menutype ==14){
		                		 $(".mnonum"+menuid).parents(".Homeml:first").addClass("picture360Sort");
	                		 }else if(menutype ==16){
	                			 $(".mnonum"+menuid).parents(".Homeml:first").addClass("lbsbz");
	                		 }else if(menutype ==17){
		                		 $(".mnonum"+menuid).parents(".Homeml:first").addClass("bespeakbz");
	                		 }else if(menutype ==13){
		                		 $(".mnonum"+menuid).parents(".Homeml:first").addClass("picIndustryProduct");
	                		 }else{
	                			 $(".mnonum"+menuid).parents(".Homeml:first").addClass("appurl");
	                		 }
	                		
	                		 $(".mnonum"+menuid).parents(".Homeml:first").find(".HomeAdd").remove();
	                		 $(".mnonum"+menuid).parent().find(".mdfy").html(data.title);
	                		 if($(".dynamicmenu").val()==2){
	                			 $(".mnonum"+menuid).html("<strong></strong>"+data.menutextno+"<strong></strong>");
	                		 }
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
		     			    	$(".alertSimple").show();
		                	 }
	                 
	                 }
	         });
			
		}else if(menutype==10 || menutype==15){
			
			var appurl="";
			var keepalive =0;
			if(menutype==10){
				if($(".couponid").length==0){
					$(".alertSimpleContent").html("当前并没有优惠券！");
			    	$(".alertSimple").show();
			    	return false;
				}
				var list= $('input:radio[name="couponid"]:checked').val(); 
		         if(list==null){ 
		         		$(".alertSimpleContent").html("请选择优惠券！");
				    	$(".alertSimple").show();
				    	return false;
		         } 
		        
				var couponid =$("input[name='couponid']:checked").val(); 
				appurl = $(".wedutyAddress").val()+"/couponGetCode.action?couponid="+couponid;
			}else if(menutype==15){
				if($(".wallid").length==0){
					$(".alertSimpleContent").html("当前并没有微信墙！");
			    	$(".alertSimple").show();
			    	return false;
				}
				keepalive=1;
				var list= $('input:radio[name="wallid"]:checked').val(); 
		         if(list==null){ 
		         		$(".alertSimpleContent").html("请选择微信墙！");
				    	$(".alertSimple").show();
				    	return false;
		         } 
		        
				var couponid =$("input[name='wallid']:checked").val(); 
				appurl = $(".bappAddress").val()+"/wall-lbs/wall.action?wall_id="+couponid;
			}
			
			$.ajax({
				url:"/ajax-mpmenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"updateAppurl",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"keepalive":keepalive,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"appurl":appurl,
	                	 	"menutextno":$(".menutextno").val()
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".menuUpdateTop").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 
	                		 removeBZ(menuid);
	                		 
	                		 if(menutype==15){
	                			 $(".mnonum"+menuid).parents(".Homeml:first").addClass("wallbz");
	                		 }else{
	                			 $(".mnonum"+menuid).parents(".Homeml:first").addClass("yhq");
	                		 }
	                		 $(".mnonum"+menuid).parents(".Homeml:first").find(".HomeAdd").remove();
	                		 $(".mnonum"+menuid).parent().find(".mdfy").html(data.title);
	                		 if($(".dynamicmenu").val()==2){
	                			 $(".mnonum"+menuid).html("<strong></strong>"+data.menutextno+"<strong></strong>");
	                		 }
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
		     			    	$(".alertSimple").show();
		                	 }
	                 
	                 }
	         });
			
		}
		
		
 }
 


function showMenu(menuid,r_titleKeywordshow){
	
	$(".fileField").attr("src","/func/images/upimg.png");
	
	$(".articleTitle0").val("");
	$(".articlePic0").attr("src","/func/images/upimg.png");
	
	
	for(var i=1;i<=7;i++){
		$(".articleTitle"+i).val("");
		$(".articlePic"+i).attr("src","/func/images/upimg2.png");
	}
	for(var i=0;i<=7;i++){
		$(".article"+i).val(0);
	}
	$(".article").val(0);
 	content_4.html("");
 	content_menu.html("");
 	repeatValue=1;
 	
 	$(".360AllPictureid").val(0);
 	$(".lbsid").val(0);
 	$(".bespeakid").val(0);
 	$(".bespeakurl").val("");
 	$(".360AllPictureUrl").val("");
 	
 	$(".articleContent").html("");
 	$(".articleContent0").html("");
 	$(".articleContent1").html("");
 	$(".articleContent2").html("");$(".articleContent3").html("");$(".articleContent4").html("");$(".articleContent5").html("");
 	$(".articleContent6").html("");$(".articleContent7").html("");
	$(".title_article").val("");
	$(".description_article").val("");
	
	$(".start_modefiy").show();
	$(".changeOtherActivity").hide();
	$(".only_test").show();
	isUpdateQuizArticle=0;
	allMenuTypeHide=0;
	$.ajax({
		url:"/ajax-mpmenu.action",
             type:"POST",dataType:"json",
             timeout:"10000",
             async: "true",
           
             data:{	"op":"selectbymenuid",
             		"menuid":menuid
             },success:function(data){
             	if(data.code=="A00006"){
             		$(".user_talk").hide();
             		
             		$(".r_title").show();
             		if(r_titleKeywordshow==0){
             			$(".r_titleKeyword").hide();
             		}else{
             			$(".r_titleKeyword").show();
             		}
             		$(".r_titleNoService").hide();
             		$(".menuUpdateTop").show();
             		$(".start_modefiy").show();
             		
             		type =data.type;
             		$(".menukeyword").val(data.keyword);
             		$(".menutitle").val(data.title);
             		
             		if(data.type==4){
                 		$(".subMenus").empty();
                 		for(var i=0;i<data.subMenu.length;i++){
                 			var content ='<p>'+data.subMenu[i].content+'</p>';
                 			$(content).appendTo(".subMenus");
                 		}
                 		$(".menuType").parents(".hsborder:first").hide();
                 		content_start.html(data.menucontent_head);
                 		content_end.html(data.menucontent_tail);
                 		$(".menuTypeText").show();
                 		$(".user_talk1").show();
             		}else if(data.type==3){
             			getArticles(data,allMenuTypeHide);
             			
             		}else if(data.type==2){
             			getArticle(data,2,0);
             			
             		}else if(data.type==1){
             			$(".user_talk4").show();
             			content_3.html(data.content);
             			$(".menuType").val(1);
             			$(".menuTypeText").hide();
             			$(".menuType").parents(".hsborder:first").show();
             		}else if(data.type==5){
             			$(".only_test").hide();
             			$(".menuTypeText").hide();
             			$(".menuType").val(5);
             			isUpdateQuizArticle=1;
             			showQuiz(data.pageNo,data.qid,"",0);
             			getArticle(data,5,0);
             			
             			$(".start_modefiy").hide();
             			$(".changeOtherActivity").show();
             			
             		}else if(data.type==6){
             			$(".menuTypeText").hide();
             			showVoice(data.pageNo,data.mid);
             			$(".menuType").val(6);
             		}else if(data.type==8){
             			$(".menuTypeText").hide();
             			$(".D_interface").show();
             			$(".appUrl").val(data.appurl);
             			$(".menuType").val(8);
             		}else if(data.type==7){
             			$(".menuTypeText").hide();
             			$(".quiz_Videos").show();
             			showVideo(data.pageNo,data.mid);
             			$(".menuType").val(7);
             		}else if(data.type==9 || data.type==18){
             			getArticle(data,data.type,0,1);
             			$(".start_modefiy").hide();
             		}else if(data.type==10){
             			$(".menuTypeText").hide();
             			$(".coupon").show();
             			showCoupon(data.pageNo,data.couponid,"");
             			$(".menuType").val(10);
             		}else if(data.type==13){
             			$(".industryProductUrl").val(data.industryProductUrl);
             			$(".industryProductid").val(data.industryProductid);
             			showIndustryProduct(data.industryProductid);
             		}else if(data.type==14){
             			$(".360AllPictureid").val(data.pictureid);
             			$(".360AllPictureUrl").val(data.pictureurl);
             			AllPicture_360_show(data.pictureid);
             		}else if(data.type==15){
             			
             			showWall(0,data.wallid,"",1);
            			$(".wall").show();
            			$(".menuType").val(15);
             		}else if(data.type==16){
             			AllLBS(data.lbsid);
             			$(".lbsid").val(data.lbsid);
             		}else if(data.type==17){
             			bespeak(data.id);
            			$(".bespeakid").val(data.id);
             		}
             
             		
             		if($(".dynamicmenu").val()==2 && r_titleKeywordshow==1){
             			$(".r_titleMenutextno").show();
             			$(".menutextno").val(data.menutextno);
             		}else{
             			$(".r_titleMenutextno").hide();
             			$(".menutextno").val("");
             		}
             	}else if(data.code=="A00004"){
            		 location.href="/login.jsp";
            	}else{
            		$(".alertSimpleContent").html("发生错误！code:"+data.code+"<br>"+data.errormsg);
 			    	$(".alertSimple").show();
            	}
             }
	});
}
$(document).ready(function(){

	$(".menuType").change(function(){
		$(".user_talk").hide();
		$(".only_test").show();
		$(".start_modefiy").show();
		$(".changeOtherActivity").hide();
			
		var type = $(this).val();
		$(".start_modefiy").show();
		if(type==1){
			$(".user_talk4").show();
			
		}else if(type==2){
			$(".article").val(0);
			
			$(".fileField").attr("src","/func/images/upimg.png");
			$(".title_article").val("");
			$(".description_article").val("");
			$(".articleContent").val("");
			if(bro.msie) {
				$(".articleContent").val("");
			}else {
		    	$(".articleContent").html("");
		    }
			$(".articleUrl").val("http://");
			$(".user_talk2").show();
		}else if(type==3){
			/**
			var flag =0;
			var articleSum = $(".articleSum").val();
			$(".more_viewpic").each(function(){
				flag++;
				var f = $(this).attr("flag");
				if(f>articleSum){
					$(this).hide();
				}else{
					$(this).show();
				}
			});**/
			
			$(".user_talk3").show();
			$(".articleSum").val(2);
			articleChange(2);
			
		}else if(type==5){
			
			showQuiz(1,0,"");
			isUpdateQuizArticle=0;
		}else if(type==6){
			showVoice(1,0,"");
		}else if(type==8){
			$(".D_interface").show();
		}else if(type==7){
			showVideo(1,0,"");
			$(".quiz_video").show();
		}else if(type==9 || type==18){
			$(".start_modefiy").hide();
			$(".user_talk2").show();
			
			$.ajax({
				url:"/card/ajax-card.action",
		             type:"POST",dataType:"json",
		             timeout:"10000",
		             async: "true",
		           
		             data:{	
		             },success:function(data){
		             	if(data.code=="A00006"){
		             		getArticle(data,type,0,0);
		             		if(type==18){
		             				$(".description_article").val("这里是摘要信息！");
		             		}
		             	}else if(data.code=="A00004"){
		            		 location.href="/login.jsp";
		            	}else{
		            		$(".alertSimpleContent").html("发生错误！code:"+data.code);
		 			    	$(".alertSimple").show();
		            	}
		             }
			});
		}else if(type==10){
			showCoupon(1,0,"");
			$(".coupon").show();
		}else if(type==13){
			showIndustryProduct("");
		}else if(type==14){
			AllPicture_360_show(0);
		}else if(type==15){
			showWall(0,0,"");
		}else if(type==16){
			AllLBS(0,0,"");
		}else if(type==17){
 			bespeak(0);
 			$(".bespeakid").val(0);
 		}
	});
	
	$(".add_more_artilces").live("click",function(){
		var articleSum = $(".articleSum").val();
		$(".articleSum").val(++articleSum);
		articleChange(articleSum);
	});
	
	$(".articleSum").change(function(){
		articleChange($(this).val());
	});
	
	$(".removeArticle").live("click",function(){
		var articleSum = $(".articleSum").val();
		$(".articleSum").val(--articleSum);
		articleChange(articleSum);
		
		var nowarticle =$(this).attr("nowarticle");
		var articles = new Array();
		for(var i=0;i<=7;i++){
			var article = $(".article"+i).val();
			var articleTitle =$(".articleTitle"+i).val();
			var articlePic = $(".articlePic"+i).attr("src");
			var articleContent = $(".articleContent"+i).val();
			var articleUrl = $(".articleUrl"+i).val();
			
			var obj = new ObjArticles(article,articleTitle,articlePic,articleContent,articleUrl);
			articles.push(obj);
		}
		articles.splice(nowarticle,1);
		
		for(var i=0;i<articles.length;i++){
			if(i==0)
				continue;
			if(bro.msie) {
				$(".articleContent"+i).val(articles[i].articleContent);
			}else  if(bro.mozilla) {
				$(".articleContent"+i).html(articles[i].articleContent);
			}else if(bro.safari) {
				$(".articleContent"+i).html(articles[i].articleContent);
			}else  if(bro.opera) {
				$(".articleContent"+i).html(articles[i].articleContent);
		    }else{
		    	$(".articleContent"+i).html(articles[i].articleContent);
		    }
			$(".articleTitle"+i).val(articles[i].articleTitle);
			$(".articleUrl"+i).val(articles[i].articleUrl);
			$(".article"+i).val(articles[i].article);
			$(".articlePic"+i).attr("src",articles[i].articlePic);
		
		
		}
			
	});
	
	
});






	var wall_pageNo=0;
var wall_pageSum =0;
var wall_wallid=0;
function articleChange(articleSum){
	var flag =1;
	if(articleSum ==8){
		$(".add_more_artilces").hide();
	}else{
		$(".add_more_artilces").show();
	}
	
	$(".more_viewpic").each(function(){
		flag++;
		var f = $(this).attr("flag");
		if(f>articleSum){
			$(this).hide();
		}else{
			$(this).show();
		}
	});
}
function ajaxFileUploadMp3(){
	
 	var reg	= new RegExp(/[\.mp3 || \.wma || \.wav || \.amr || \.MP3 || \.WMA || \.WAV || \.AMR]$/);
	if (! reg.test($("#fileFieldMp3").val()))
	{	
		 $(".alertSimpleContent").html("语音格式必须为mp3，wma，wav，amr! ");
     	  $(".alertSimple").show();
		return false;
	}
    $.ajaxFileUpload({
      url:'/materials.action?op=upload&stats=uploadImage',             //需要链接到服务器地址
      secureuri:false,
      fileElementId:'fileFieldMp3',                         //文件选择框的id属性
      dataType: 'json',                                     //服务器返回的格式，可以是json
      success: function (data){                //相当于java中try语句块的用法
    	  if(data.code=="A00006"){
    		  showVoice(1,data.id,"");
    	  }else if(data.code="A00005"){
    		  $(".alertSimpleContent").html("上传的语音必须小于5M且长度在60秒以内！");
          	  $(".alertSimple").show();
    	  }
    	 
      }
    });
}

var ObjArticles = function(article,articleTitle,articlePic,articleContent,articleUrl){
	this.article=article;
	this.articleTitle =articleTitle;
	this.articlePic =articlePic;
	this.articleContent =articleContent;
	this.articleUrl =articleUrl;
	ObjArticles.prototype.run = function(){
		return this.title + this.desc;
	};
};


function getArticle(data,menuType,ishsborderHien,wesiteShow){
		
	
		
		$(".user_talk2").show();
		$(".title_article").val(data.article[0].title);
		
		$(".menuType").val(menuType);
		$(".menuType").parents(".hsborder:first").show();
		$(".articleContent").val(data.article[0].content);
		$(".articleUrl").val(data.article[0].url);
		$(".article").val(data.article[0].articleid);
		$(".menuTypeText").hide();
		//content_1.html(content);
		$(".description_article").val(data.article[0].description);
		if(menuType==18 && wesiteShow==0){
			$(".fileField").attr("src","/images/wesiteDefault.jpg");
			$(".img_article").attr("scr","/images/wesiteDefault.jpg");
			if(bro.msie) {
				$(".articleContent").val("");
			}else {
		    	$(".articleContent").html("");
		    }
		}else{
			$(".fileField").attr("src",data.article[0].picurl);
			$(".img_article").attr("scr",data.article[0].picurl);
			
			if(bro.msie) {
				$(".articleContent").val(data.article[0].content);
			}else {
		    	$(".articleContent").html(data.article[0].content);
		    }
		}
		
		
		if(ishsborderHien==0){
			$(".allMenuType").show();
		}else{
			$(".allMenuType").hide();
		}
		
}
function showVoice(pagebegin,voiceid,keyword){
	$(".voiceKeyword").val(keyword);
	 $.ajax({
			url:"/ajax-mpmenu.action",
             type:"POST",dataType:"json",
             timeout:"10000",
             async: "true",
           
             data:{	"op":"showVoices",
            	 	"pagebegin":pagebegin,
            	 	"keyword":keyword
             },success:function(data){
            	 if(data.code=="A00006"){
            		 $(".allVoices").empty();
            		if(data.voices.length==0){
            			$(".voicePage_None").show();
            			$(".voicePage").hide();
            		 }else{
            			$(".voicePage_None").hide();
            			$(".voicePage").show();
            		 }
            		 for(var i=0;i<data.voices.length;i++){
            			 if(voiceid==data.voices[i].id){
            				$('<li><input style="float:left; height:30px; line-height:30px; margin-right:5px; " checked="checked"  type="radio" class="voiceid" value='+data.voices[i].id+' name="voiceid"/><span style="float:left;width:190px;overflow:hidden;">'+data.voices[i].title+'</span>\
            				        <div style="clear:both; width:100%; height:1px;"></div>\
            				        <img src="/func/images/player.png" />\
            						<object id="dewplayer" width="200" height="20" data="/tools/dewplayer/dewplayer.swf?mp3='+data.voices[i].content+'" mp3count="1" type="application/x-shockwave-flash" style="position:absolute;left:29px; top:56px;">\
									<param value="transparent" name="wmode">\
									<param value="/tools/dewplayer/dewplayer.swf?mp3='+data.voices[i].content+'" name="movie">\
									</object>\
									<div style="position:absolute; width:10px; height:25px;top:51px; left:154px; background:url(/func/images/player.png) -144px -11px no-repeat;"></div>\
									<div style="position:absolute;z-index:2; left:164px; top:44px; background-color:#fff; width:65px; height:35px;"></div>\
            			    </li>').appendTo(".allVoices");
            			 }else{
            				$('<li><input style="float:left; height:30px; line-height:30px; margin-right:5px;"   type="radio" class="voiceid" value='+data.voices[i].id+' name="voiceid"/><span style="float:left;width:190px;overflow:hidden;">'+data.voices[i].title+'</span>\
            				         <div style="clear:both; width:100%; height:1px;"></div>\
            				        <img src="/func/images/player.png" />\
            						<object id="dewplayer" width="200" height="20" data="/tools/dewplayer/dewplayer.swf?mp3='+data.voices[i].content+'" mp3count="1" type="application/x-shockwave-flash" style="position:absolute;left:29px; top:56px;">\
									<param value="transparent" name="wmode">\
									<param value="/tools/dewplayer/dewplayer.swf?mp3='+data.voices[i].content+'" name="movie">\
									</object>\
									<div style="position:absolute; width:10px; height:25px;top:51px; left:154px; background:url(/func/images/player.png) -144px -11px no-repeat;"></div>\
									<div style="position:absolute;z-index:2; left:164px; top:44px; background-color:#fff; width:65px; height:35px;"></div>\
            			    </li>').appendTo(".allVoices");
            			 }
            			 
            		 }
            		 $('<div style="clear:both; width:100%; height:0px;"></div>').appendTo(".allVoices");
            		 $(".quiz_Voices").show();
            		 voice_pageNo =data.begin;
            		 voice_pageSum=data.count;
            	 }else if(data.code=="A00004"){
            		 location.href="/login.jsp";
            	 }else{
               		$(".alertSimpleContent").html("发生错误！code:"+data.code);
    			    	$(".alertSimple").show();
	             }
             
             }
     });
		
}

function showQuiz(pagebegin,qid,keyword,isshow){
	$(".activityKeyword").val(keyword);
	 $.ajax({
			url:"/ajax-mpmenu.action",
             type:"POST",dataType:"json",
             timeout:"10000",
             async: "true",
           
             data:{	"op":"showQuizs",
            	 	"pagebegin":pagebegin,
            	 	"keyword":keyword
             },success:function(data){
            	 if(data.code=="A00006"){
            		 $(".allQuizs").empty();
            		 if(data.quizs.length==0){
            			$(".activityPage_None").show();
            			$(".activityPage").hide();
            		 }else{
            			$(".activityPage_None").hide();
            			$(".activityPage").show();
            		 }
            		 for(var i=0;i<data.quizs.length;i++){
            			 if(Number(qid)==Number(data.quizs[i].id)){
            				$('<li><label><img src='+data.quizs[i].img+' /><input  checked="checked" type="radio" class="qid" value='+data.quizs[i].id+' name="qid" /></label><span>'+data.quizs[i].title+'</span></li>').appendTo(".allQuizs");
            			 }else{
            				$('<li><label><img src='+data.quizs[i].img+' /><input type="radio" class="qid" value='+data.quizs[i].id+' name="qid" /></label><span>'+data.quizs[i].title+'</span></li>').appendTo(".allQuizs");
            			 }
            			 
            		 }
            		 $('<div style="clear:both; width:100%; height:0px;"></div>').appendTo(".allQuizs");
            		 
            		 quiz_pageNo =data.pageNo;
            		 quiz_pageSum=data.pageSum;
            		 
            		 if(isshow==0){
            			 $(".quiz_Activitys").hide();
            		 }else{
            			 $(".quiz_Activitys").show();
            		 }
            	 }else if(data.code=="A00004"){
            		 location.href="/login.jsp";
            	 }else{
	                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
	     			    	$(".alertSimple").show();
	                	 }
             
             }
     });
		
}
function showVideo(pagebegin,qid,keyword){
	$(".videoKeyword").val(keyword);
	 $.ajax({
			url:"/ajax-mpmenu.action",
             type:"POST",dataType:"json",
             timeout:"10000",
             async: "true",
           
             data:{	"op":"showVideos",
            	 	"pagebegin":pagebegin,
            	 	"keyword":keyword
             },success:function(data){
            	 if(data.code=="A00006"){
            		 $(".allVideos").empty();
            		 $(".quiz_Videos").show();
            		 if(data.voices.length==0){
            			$(".videoPage_None").show();
            			$(".videoPage").hide();
            		 }else{
            			$(".videoPage_None").hide();
            			$(".videoPage").show();
            		 }
            		 for(var i=0;i<data.voices.length;i++){
            			 if(Number(qid)==Number(data.voices[i].id)){
            				$('<li><label><img src='+data.voices[i].img+' /><input  checked="checked" type="radio" class="videoid" value='+data.voices[i].id+' name="videoid" /></label><span>'+data.voices[i].title+'</span></li>').appendTo(".allVideos");
            			 }else{
            				$('<li><label><img src='+data.voices[i].img+' /><input type="radio" class="videoid" value='+data.voices[i].id+' name="videoid" /></label><span>'+data.voices[i].title+'</span></li>').appendTo(".allVideos");
            			 }
            			 
            		 }
            		 $('<div style="clear:both; width:100%; height:0px;"></div>').appendTo(".allVideos");
            		 
            		 video_pageNo =data.pageNo;
            		 video_pageSum=data.pageSum;
            	 }else if(data.code=="A00004"){
            		 location.href="/login.jsp";
            	 }else{
	                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
	     			    	$(".alertSimple").show();
	                	 }
             
             }
     });
		
}
function showCoupon(pagebegin,cid,keyword){
	$(".couponKeyword").val(keyword);
	 $.ajax({
			url:"/ajax-mpmenu.action",
            type:"POST",dataType:"json",
            timeout:"10000",
            async: "true",
          
            data:{	"op":"showCoupons",
           	 	"pagebegin":pagebegin,
           	 	"keyword":keyword
            },success:function(data){
           	 if(data.code=="A00006"){
           		 $(".allCoupons").empty();
           		 $(".conpon").show();
           		 if(data.coupons.length==0){
           			$(".couponPage_None").show();
           			$(".couponPage").hide();
           		 }else{
           			$(".couponPage_None").hide();
           			$(".couponPage").show();
           		 }
           		 for(var i=0;i<data.coupons.length;i++){
           			 if(Number(cid)==Number(data.coupons[i].id)){
           				$('<li><label><img src='+data.coupons[i].img+' /><input  checked="checked" type="radio" class="couponid" value='+data.coupons[i].id+' name="couponid" /></label><span>'+data.coupons[i].title+'</span></li>').appendTo(".allCoupons");
           			 }else{
           				$('<li><label><img src='+data.coupons[i].img+' /><input type="radio" class="couponid" value='+data.coupons[i].id+' name="couponid" /></label><span>'+data.coupons[i].title+'</span></li>').appendTo(".allCoupons");
           			 }
           			 
           		 }
           		 $('<div style="clear:both; width:100%; height:0px;"></div>').appendTo(".allCoupons");
           		 
           		coupon_pageNo =data.pageNo;
           		coupon_pageSum=data.pageSum;
           	 }else if(data.code=="A00004"){
           		 location.href="/login.jsp";
           	 }else{
	                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
	     			    	$(".alertSimple").show();
	                	 }
            
            }
    });
		
}
function showRelWall(pagebegin,wallid,keyword){
	$(".wallKeyword").val(keyword);
	 $.ajax({
			url:"/manage/microapps/wall/list.json",
           type:"get",dataType:"json",
           timeout:"10000",
           async: "true",
         
           data:{	
          	 	"begin":pagebegin*6,
          	 	"length":6,
          	 	"searchKey":keyword
           },success:function(data){
          		 $(".allWalls").empty();
          		 $(".wall").show();
          		 if(data.result.data.length==0){
          			$(".wallPage_None").show();
          			$(".wallPage").hide();
          		 }else{
          			$(".wallPage_None").hide();
          			$(".wallPage").show();
          		 }
          		 for(var i=0;i<data.result.data.length;i++){
          			 if(Number(wallid)==Number(data.result.data[i].id)){
          				$('<li><label><img src='+data.result.data[i].backgroundPicture+' /><input  checked="checked" type="radio" class="wallid" value='+data.result.data[i].id+' name="wallid" /></label><span>'+data.result.data[i].name+'</span></li>').appendTo(".allWalls");
          			 }else{
          				$('<li><label><img src='+data.result.data[i].backgroundPicture+' /><input type="radio" class="wallid" value='+data.result.data[i].id+' name="wallid" /></label><span>'+data.result.data[i].name+'</span></li>').appendTo(".allWalls");
          			 }
          			 
          		 }
          		 $('<div style="clear:both; width:100%; height:0px;"></div>').appendTo(".allCoupons");
          		 
          		wall_pageNo =data.result.page.current;
          		wall_pageSum=data.result.page.total;
          		wall_wallid =wallid;
           }
   });
}

function showWall(pagebegin,wallid,keyword,needSort){
	if(wallid!==0 && needSort==1){
		 $.ajax({
				url:"/manage/microapps/wall/list.json",
	            type:"get",dataType:"json",
	            timeout:"10000",
	            async: "true",
	          
	            data:{	
	           	 	"begin":0,
	           	 	"length":6000
	            },success:function(data){
	            	for(var i=0;i<data.result.data.length;i++){
	            		 if(Number(wallid)==Number(data.result.data[i].id)){
	            			 pagebegin = parseInt(i/6);
	            			 
	            			 showRelWall(pagebegin,wallid,keyword);
	            			 break;
	            		 }
	            		 
	            	}
	            }
		 });
	}else{
		showRelWall(pagebegin,wallid,keyword);
	}
	
		
}

$(document).ready(function(){
	$(".changeOtherActivity").live("click",function(){
		$(".start_modefiy").show();
		$(".changeOtherActivity").hide();
			
		$(".quiz_Activitys").show();
		$(".user_talk2").hide();
		isUpdateQuizArticle=0;
	});
	$(".articleUrlModelValue").live("click",function(){
		if($(".mpAccountPackageid").val()>=1){
			$(".needMoney").hide();
		}else{
			$(".needMoney").show();
		}
		
		
	});
	$(".needMoneyClose").live("click",function(){
		$(".needMoney").hide();
		
	});
	$(".activityKeywordSb").live("click",function(){
		var keyword = $(".activityKeyword").val();
		
		showQuiz(1,0,keyword);
	});
	$(".wallKeywordSb").live("click",function(){
		var keyword = $(".wallKeyword").val();
		
		showWall(0,0,keyword,0);
	});
	$(".videoKeywordSb").live("click",function(){
		var keyword = $(".videoKeyword").val();
		
		showVideo(1,0,keyword);
	});
	$(".voiceKeywordSb").live("click",function(){
		var keyword = $(".voiceKeyword").val();
		
		showVoice(1,0,keyword);
	});
	$(".couponKeywordSb").live("click",function(){
		var keyword = $(".couponKeyword").val();
		
		showCoupon(1,0,keyword);
	});
	$(".lastVideo").live("click",function(){
		var keyword = $(".videoKeyword").val();
		var p =Number(video_pageNo)-Number(1);
		if(Number(p)<=0){
			$(".alertSimpleContent").html("当前已经是第一页！");
		    $(".alertSimple").show();
		    return false;
		}else{
			showVideo(p,0,keyword);
		}
		
		
	});
	$(".nextVideo").live("click",function(){
		var keyword = $(".videoKeyword").val();
		var p = Number(video_pageNo)+Number(1);
		if(Number(p)>=Number(video_pageSum)){
			$(".alertSimpleContent").html("当前已经最后一页！");
		    $(".alertSimple").show();
		    return false;
		}else{
			showVideo(p,0,keyword);
		}
		
	});
	$(".lastVoice").live("click",function(){
		var keyword = $(".voiceKeyword").val();
		var p =Number(voice_pageNo)-Number(1);
		if(Number(p)<=0){
			$(".alertSimpleContent").html("当前已经是第一页！");
		    $(".alertSimple").show();
		    return false;
		}else{
			showVoice(p,0,keyword);
		}
		
		
	});

	$(".articleUrlModelCancel").live("click",function(){
		/**
		$(".articleUrlModelValue").val("");
		if(now_content==-1){
			$(".articleUrl").val("");
		}else{
			$(".articleUrl"+now_content).val("");
		}**/
		$("._popup").hide();
		$(".edit_mask").hide();
	});
	$(".nextVoice").live("click",function(){
		var keyword = $(".voiceKeyword").val();
		var p = Number(voice_pageNo)+Number(1);
		if(Number(p)>=Number(voice_pageSum)){
			$(".alertSimpleContent").html("当前已经最后一页！");
		    $(".alertSimple").show();
		    return false;
		}else{
			showVoice(p,0,keyword);
		}
		
	});
	
	$(".lastWall").live("click",function(){
		var keyword = $(".wallKeyword").val();
		var p =Number(wall_pageNo)-Number(1);
		
		
		if(Number(p)<0){
			$(".alertSimpleContent").html("当前已经是第一页！");
		    $(".alertSimple").show();
		    return false;
		}else{
			showWall(p,wall_wallid,keyword,0);
		}
		
		
	});
	$(".nextWall").live("click",function(){
		var keyword = $(".wallKeyword").val();
		var p = Number(wall_pageNo)+Number(1);
		if(Number(p)>=Number(wall_pageSum)){
			$(".alertSimpleContent").html("当前已经最后一页！");
		    $(".alertSimple").show();
		    return false;
		}else{
			showWall(p,wall_wallid,keyword,0);
		}
		
	});
	
	$(".lastCoupon").live("click",function(){
		var keyword = $(".couponKeyword").val();
		var p =Number(coupon_pageNo)-Number(1);
		if(Number(p)<=0){
			$(".alertSimpleContent").html("当前已经是第一页！");
		    $(".alertSimple").show();
		    return false;
		}else{
			showCoupon(p,0,keyword);
		}
		
		
	});
	$(".nextCoupon").live("click",function(){
		var keyword = $(".couponKeyword").val();
		var p = Number(coupon_pageNo)+Number(1);
		if(Number(p)>=Number(coupon_pageSum)){
			$(".alertSimpleContent").html("当前已经最后一页！");
		    $(".alertSimple").show();
		    return false;
		}else{
			showCoupon(p,0,keyword);
		}
		
	});
	
	
	
	$(".lastQuiz").live("click",function(){
		var keyword = $(".activityKeyword").val();
		var p =Number(quiz_pageNo)-Number(1);
		if(Number(p)<=0){
			$(".alertSimpleContent").html("当前已经是第一页！");
		    $(".alertSimple").show();
		    return false;
		}else{
			showQuiz(p,0,keyword);
		}
		
		
	});
	$(".nextQuiz").live("click",function(){
		var keyword = $(".activityKeyword").val();
		var p = Number(quiz_pageNo)+Number(1);
		if(Number(p)>Number(quiz_pageSum)){
			$(".alertSimpleContent").html("当前已经最后一页！");
		    $(".alertSimple").show();
		    return false;
		}else{
			showQuiz(p,0,keyword);
		}
		
	});
	
	$(".picture360").live("click",function(){
		 $(".picture360").css("border","0px solid red");
		 $(this).css("border","1px solid red");
		 var id = $(this).attr("pictureid");
		 var url = $(this).attr("url");
		 $(".360AllPictureid").val(id);
		 $(".360AllPictureUrl").val(url);
	});
	
	$(".rellbs").live("click",function(){
		 $(".rellbs").css("border","0px solid red");
		 $(this).css("border","1px solid red");
		var id = $(this).attr("rellbs");
		$(".lbsid").val(id);
	});
	$(".relbespeak").live("click",function(){
		 $(".relbespeak").css("border","0px solid red");
		 $(this).css("border","1px solid red");
		var id = $(this).attr("bespeakid");
		var bespeakurl =$(this).attr("bespeakurl");
		$(".bespeakurl").val(bespeakurl);
		$(".bespeakid").val(id);
	});
	$(".industryProduct").live("click",function(){
		$(".industryProduct").find(".picIndustryProduct").css("border","0px solid red");
		var url = $(this).attr("url").split("?")[1];
		$(this).find(".picIndustryProduct").css("border","1px solid red");
		var industryProductid =$(this).attr("industryProductid");
		$(".industryProductUrl").val(url);
		
		$(".industryProductid").val(industryProductid);
		
	});
	
});

var articlesPageSum =1;
function pageArticles(pagebegin){
	$.ajax({
		url:"/ajax-mpmenu.action",
             type:"POST",dataType:"json",
             timeout:"20000",
             async: "true",
           
             data:{	"op":"showArticleNews",
            	 "pagebegin":pagebegin
             },success:function(data){
            	 if(data.code=="A00006"){
            		 $(".allArticles").empty();
            		 for(var i=0;i<data.article.length;i++){
            			 $('<li><div class="image-box more-imagetext only-article'+data.article[i].articleid+'">'+
             					'<img alt="'+data.article[i].title+'" style=" height: 77px;width: 122px;" src="'+data.article[i].picurl+'">'+
             					'<div class="testradio">'+
             					'<input class="radioarticle" type="radio" name="fromMarticleid" value="'+data.article[i].articleid+'">'+
             					'<font style="overflow: hidden; width: 95px;">'+data.article[i].title+'</font></div></div></li>').appendTo(".allArticles");
            		 }
            		 $(".page").empty();
            		 articlesPageSum= data.pageSum;
             		if(data.article.length>=1){
             			
                 		if(data.pageNo>1){
                 			$('<a href="#" pagebegin="'+(data.pageNo-1)+'" class="toPageArticles">上一页</a>').appendTo(".page");
                 		}
                 		
                 		for(var head = data.pageHead;head<=data.pageEnd;head++){
                 			if(data.pageNo!=head){
                     			$('<a href="#" pagebegin="'+head+'" class="toPageArticles">'+head+'</a>').appendTo(".page");
                     		}else{
                     			$('<a href="#" class="toPageArticles" pagebegin="'+head+'" style="background-color:#809c0e; color:#FFF;"><font color="#BBB">'+head+'</font></a>').appendTo(".page");
                     		}
                 		}
                 		
                 		
                 		if(data.pageNo<data.pageSum){
                 			$('<a href="#" pagebegin="'+(data.pageNo+1)+'" class="toPageArticles">下一页</a>').appendTo(".page");
                 		}
                 		$('<input style="*+padding:3px 0;" type="text" name="pagebegin" value="'+data.pageNo+'" class="toPageArticlesValue"/>'+
                 				'<input href="#" id="toPageArticlesValue" class="GO" value="跳转"></input>').appendTo(".page");
                 		$('<font style="line-height:25px;">共'+data.pageSum+'页</font>').appendTo(".page");
             		}
             		
					
					$(".edit_mask").fadeIn();
					$(".only_test_box").fadeIn();
					
            	 }else if(data.code=="A00004"){
            		 location.href="/login.jsp";
            	 }
             
             }
     });
	

}
var articlePageSum =1;
function pageArticle(pagebegin){
	$.ajax({
		url:"/ajax-mpmenu.action",
             type:"POST",dataType:"json",
             timeout:"10000",
             async: "true",
           
             data:{	"op":"showArticle",
            	 	"pagebegin":pagebegin
             },success:function(data){
            	 if(data.code=="A00006"){
            		 $(".allArticles").empty();
            		 for(var i=0;i<data.article.length;i++){
            			 $('<li><div class="image-box only-imagetext only-article'+data.article[i].articleid+'">'+
             					'<img alt="'+data.article[i].title+'" style=" height: 77px;width: 122px;" src="'+data.article[i].picurl+'">'+
             					'<div class="testradio">'+
             					'<input class="radioarticle" type="radio" name="fromMarticleid" value="'+data.article[i].articleid+'">'+
             					'<font style="overflow: hidden; width: 95px;">'+data.article[i].title+'</font></div></div></li>').appendTo(".allArticles");
            		 }
            		 $(".page").empty();
            		 articlePageSum = data.pageSum;
            		if(data.article.length>=1){
            			
                		if(data.pageNo>1){
                			$('<a href="#" pagebegin="'+(data.pageNo-1)+'" class="toPage">上一页</a>').appendTo(".page");
                		}
                		
                		
                		for(var head = data.pageHead;head<=data.pageEnd;head++){
                 			if(data.pageNo!=head){
                 				$('<a href="#" pagebegin="'+head+'" class="toPage">'+head+'</a>').appendTo(".page");
                     		}else{
                     			$('<a href="#" class="toPage" pagebegin="'+head+'" style="background-color:#809c0e; color:#FFF;"><font color="#BBB">'+head+'</font></a>').appendTo(".page");
                     		}
                 		}
                		
                		if(data.pageNo<data.pageSum){
                			$('<a href="#" pagebegin="'+(data.pageNo+1)+'" class="toPage">下一页</a>').appendTo(".page");
                		}
                		$('<input style="*+padding:3px 0;" type="text" name="pagebegin" value="'+data.pageNo+'" class="toPageArticleValue"/>'+
                				'<input href="#" id="toPageArticleValue" class="GO" value="跳转"></input>').appendTo(".page");
                		$('<font style="line-height:25px;">共'+data.pageSum+'页</font>').appendTo(".page");
            		}
            		
				
					$(".edit_mask").fadeIn();
					$(".only_test_box").fadeIn();
					
            	 }else if(data.code=="A00004"){
            		 location.href="/login.jsp";
            	 }
             
             }
     });
	
}


function  showIndustryProduct(industryProductid){
	$(".menuType").val(13);
	$.ajax({
		url:"/manage/industry/product/head/product/all.json",
             type:"get",dataType:"json",
             timeout:"10000",
             async: "true",
           
             data:{	
             },success:function(data){
            	 if(data.productTrees.length==0){
             		$(".noInfoContent").html("当前并没有商品！");
             		$(".noInfo").show();
             		$(".quiz_IndustryProduct").hide();
             		return false;
             	}else{
             		$(".quiz_IndustryProduct").show();
             	}
            	$(".allProducts").empty();
             	for(var i = 0; i< data.productTrees.length;i++){
             		$('<ul class='+data.productTrees[i].category.id+'><div><li class="openLess">'
                            	+'<div class=" toggle"  pid="" style="position:absolute; left:17px; width:25px; height:25px;"></div>'
								 	+'<div class="toggle" pid="" style="cursor: pointer;">'
								    	+'<span class="" style="width:90px !important; font-size:14px; overflow:hidden;" op="" menuid="">'+data.productTrees[i].category.name+'</span>'
								 	+'</div></li></div></ul>').appendTo('.allProducts');
             		
             		var childCategory = data.productTrees[i].childCategory;
             		var productList = data.productTrees[i].productList;
             		if(childCategory.length>0){
             			 showProduct(childCategory,data.productTrees[i].category.id,industryProductid);
             		}else{
             			 showproductList(productList,data.productTrees[i].category.id,industryProductid);
             		}
             	}
             }
	});
	
}
function showProduct(childCategoryP,categoryid,industryProductid){
	var category = $("."+categoryid);
	for(var i = 0; i< childCategoryP.length;i++){
 		$('<ul class='+childCategoryP[i].category.id+'><div><li class="openLess">'
                	+'<div class=" toggle"  pid="" style="position:absolute; left:17px; width:25px; height:25px;"></div>'
					 	+'<div class="toggle" pid="" style="cursor: pointer;">'
					    	+'<span class="" style="width:90px !important; font-size:14px; overflow:hidden;" op="selectbymenuid" menuid="">'+childCategoryP[i].category.name+'</span>'
					 	+'</div></li></div></ul>').appendTo(category);
 		var c = childCategoryP[i].childCategory;
 		var pList = childCategoryP[i].productList;
 		if(c.length>0){
 			 showProduct(c,childCategoryP[i].category.id,industryProductid);
 		}else{
 			showproductList(pList,childCategoryP[i].category.id,industryProductid);
 		}
 		
 	}
}

function showproductList(childCategoryP,categoryid,industryProductid){
	var category = $("."+categoryid);
	for(var i = 0; i< childCategoryP.length;i++){
		if(industryProductid == childCategoryP[i].id){
			$('<ul industryProductid='+childCategoryP[i].id+' url='+childCategoryP[i].url+' class="industryProduct '+childCategoryP[i].id+'"><div><li class="picIndustryProduct" style="border:1px solid red;">'
                	+'<div class=" toggle"  pid="" style="position:absolute; left:17px; width:25px; height:25px;"></div>'
					 	+'<div class="toggle" pid="" style="cursor: pointer;">'
					    	+'<span class="" style="width:90px !important; font-size:14px; overflow:hidden;" menuid="">'+childCategoryP[i].name+'</span>'
					 	+'</div></li></div></ul>').appendTo(category);
		}else{
			$('<ul industryProductid='+childCategoryP[i].id+' url='+childCategoryP[i].url+' class="industryProduct '+childCategoryP[i].id+'"><div><li class="picIndustryProduct">'
                	+'<div class=" toggle"  pid="" style="position:absolute; left:17px; width:25px; height:25px;"></div>'
					 	+'<div class="toggle" pid="" style="cursor: pointer;">'
					    	+'<span class="" style="width:90px !important; font-size:14px; overflow:hidden;" menuid="">'+childCategoryP[i].name+'</span>'
					 	+'</div></li></div></ul>').appendTo(category);
		}
 		
 		
 		
 	}
}



function AllPicture_360_show(pictureid){
	$(".menuType").val(14);
	$.ajax({
		url:"/manage/microapps/panoramicmap/interfaceList.json",
             type:"get",dataType:"json",
             timeout:"10000",
             async: "true",
           
             data:{	
             },success:function(data){
            	$(".360AllPictures").empty();
            	if(data.list.length==0){
            		$(".noInfoContent").html("当前并没有360度全景视图！");
            		$(".noInfo").show();
            		$(".360AllPicture").hide();
            		return false;
            	}else{
            		$(".360AllPicture").show();
            	}
             	for(var i = 0; i< data.list.length;i++){
             		if(pictureid == data.list[i].id){
             			$('<ul class='+data.list[i].id+'><div><li class="picture360" style="border:1px solid red;"  pictureid='+data.list[i].id+' url='+data.list[i].url+'>'
                            	+'<div class=" toggle"  pid="" style="position:absolute; left:17px; width:25px; height:25px;"></div>'
								 	+'<div class="toggle" pid="" style="cursor: pointer;">'
								    	+'<span class="" style="width:90px !important; font-size:14px; overflow:hidden;" op="selectbymenuid" menuid="">'+data.list[i].name+'</span>'
								 	+'</div></li></div></ul>').appendTo('.360AllPictures');
             		}else{
             			$('<ul class='+data.list[i].id+'><div><li class="picture360" pictureid='+data.list[i].id+' url='+data.list[i].url+'>'
                            	+'<div class=" toggle"  pid="" style="position:absolute; left:17px; width:25px; height:25px;"></div>'
								 	+'<div class="toggle" pid="" style="cursor: pointer;">'
								    	+'<span class="" style="width:90px !important; font-size:14px; overflow:hidden;" op="selectbymenuid" menuid="">'+data.list[i].name+'</span>'
								 	+'</div></li></div></ul>').appendTo('.360AllPictures');
             		}
             		
             		
             	}
             }
	});
}


function AllLBS(lbsid){
	$(".menuType").val(16);
	$.ajax({
		url:"/manage/microapps/lbs/listRemote.json",
             type:"get",dataType:"json",
             timeout:"10000",
             async: "true",
           
             data:{	
             },success:function(data){
            	$(".lbss").empty();
            	if(data.result.length==0){
            		$(".noInfoContent").html("当前并没有位置服务！");
            		$(".noInfo").show();
            		$(".lbs").hide();
            		return false;
            	}else{
            		$(".lbs").show();
            	}
            	
            	for(var i = 0; i< data.result.length;i++){
            		if(lbsid == data.result[i].id){
            			$('<ul class='+data.result[i].id+'><div><li class="openLess rellbs" rellbs='+data.result[i].id+' style="border:1px solid red;">'
                            	+'<div class=" toggle"  pid="" style="position:absolute; left:17px; width:25px; height:25px;"></div>'
								 	+'<div class="toggle" pid="" style="cursor: pointer;">'
								    	+'<span class="" style="width:90px !important; font-size:14px; overflow:hidden;">'+data.result[i].sortName+'</span>'
								 	+'</div></li></div></ul>').appendTo('.lbss');
            		}else{
            			$('<ul class='+data.result[i].id+'><div><li class="openLess rellbs" rellbs='+data.result[i].id+'>'
                            	+'<div class=" toggle"  pid="" style="position:absolute; left:17px; width:25px; height:25px;"></div>'
								 	+'<div class="toggle" pid="" style="cursor: pointer;">'
								    	+'<span class="" style="width:90px !important; font-size:14px; overflow:hidden;">'+data.result[i].sortName+'</span>'
								 	+'</div></li></div></ul>').appendTo('.lbss');
            		}
             		var productList = data.result[i].da;
             		if(productList.length>0){
             			 lbss(productList,lbsid,data.result[i].id);
             		}
             	}
         		
             }
	});
}


function lbss(da,lbsid,categoryid){
	var category = $("."+categoryid);
	for(var i = 0; i< da.length;i++){
		
		
			$('<ul url='+da[i].url+' class="'+da[i].id+'"><div><li lbsid='+da[i].id+' flag="1" class="lbsbz">'
                	+'<div class=" toggle"  pid="" style="position:absolute; left:17px; width:25px; height:25px;"></div>'
					 	+'<div class=" toggle" pid="" style="cursor: pointer;">'
					    	+'<span class="" style="width:90px !important; font-size:14px; overflow:hidden;">'+da[i].address+'</span>'
					 	+'</div></li></div></ul>').appendTo(category);
		
 		
 		
 		
 	}
}


function bespeak(bespeakid){
	$(".menuType").val(17);
	$.ajax({
		url:"/manage/microapps/bespeak/list.json",
             type:"get",dataType:"json",
             timeout:"10000",
             async: "true",
           
             data:{	
             },success:function(data){
            	$(".bespeaks").empty();
            	if(data.result.data.length==0){
            		$(".noInfoContent").html("当前并没有微预约！");
            		$(".noInfo").show();
            		$(".bespeak").hide();
            		return false;
            	}else{
            		$(".bespeak").show();
            	}
            	
            	
            	if(data.result.data.length>=1){
            		if(bespeakid == "100000"){
            			$('<ul class='+100000+'><div><li class="relbespeak" bespeakurl="front/microapp/app/microapps/bespeak/list.json" bespeakid='+100000+' style="border:1px solid red; background: url(/func/images/Less.png) no-repeat scroll 20px center rgba(0, 0, 0, 0);">'
                            	+'<div class=" toggle"  pid="" style="position:absolute; left:17px; width:25px; height:25px;"></div>'
								 	+'<div class="toggle" pid="" style="cursor: pointer;">'
								    	+'<span class="" style="width:90px !important; font-size:14px; overflow:hidden;">微预约</span>'
								 	+'</div></li></div></ul>').appendTo('.bespeaks');
            		}else{
            			$('<ul class='+100000+'><div><li class="relbespeak" bespeakurl="front/microapp/app/microapps/bespeak/list.json" bespeakid='+100000+' style=" background: url(/func/images/Less.png) no-repeat scroll 20px center rgba(0, 0, 0, 0);">'
                            	+'<div class=" toggle"  pid="" style="position:absolute; left:17px; width:25px; height:25px;"></div>'
								 	+'<div class="toggle" pid="" style="cursor: pointer;">'
								    	+'<span class="" style="width:90px !important; font-size:14px; overflow:hidden;">微预约</span>'
								 	+'</div></li></div></ul>').appendTo('.bespeaks');
            		}
            	}
            	
            	for(var i = 0; i< data.result.data.length;i++){
            		
            			if(bespeakid == data.result.data[i].id){
            				$('<ul url='+data.result.data[i].responseUrl+' class="'+data.result.data[i].id+'"><div><li style="border:1px solid red;" bespeakurl='+data.result.data[i].responseUrl+' bespeakid='+data.result.data[i].id+' flag="1" class="relbespeak  bespeakbz">'
                                	+'<div class=" toggle"  pid="" style="position:absolute; left:17px; width:25px; height:25px;"></div>'
                					 	+'<div class=" toggle" pid="" style="cursor: pointer;">'
                					    	+'<span class="" style="width:90px !important; font-size:14px; overflow:hidden;">'+data.result.data[i].name+'</span>'
                					 	+'</div></li></div></ul>').appendTo(".bespeaks");
            			}else{
            				$('<ul url='+data.result.data[i].responseUrl+' class="'+data.result.data[i].id+'"><div><li bespeakurl='+data.result.data[i].responseUrl+' bespeakid='+data.result.data[i].id+' flag="1" class="relbespeak  bespeakbz">'
                                	+'<div class=" toggle"  pid="" style="position:absolute; left:17px; width:25px; height:25px;"></div>'
                					 	+'<div class=" toggle" pid="" style="cursor: pointer;">'
                					    	+'<span class="" style="width:90px !important; font-size:14px; overflow:hidden;">'+data.result.data[i].name+'</span>'
                					 	+'</div></li></div></ul>').appendTo(".bespeaks");
            			}
            			
            		
        		
             	}
         		
             }
	});
}


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
jQuery.extend({
	

    createUploadIframe: function(id, uri)
	{
			//create frame
            var frameId = 'jUploadFrame' + id;
            var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
			if(window.ActiveXObject)
			{
                if(typeof uri== 'boolean'){
					iframeHtml += ' src="' + 'javascript:false' + '"';

                }
                else if(typeof uri== 'string'){
					iframeHtml += ' src="' + uri + '"';

                }	
			}
			iframeHtml += ' />';
			jQuery(iframeHtml).appendTo(document.body);

            return jQuery('#' + frameId).get(0);			
    },
    createUploadForm: function(id, fileElementId, data)
	{
		//create form	
		var formId = 'jUploadForm' + id;
		var fileId = 'jUploadFile' + id;
		var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');	
		if(data)
		{
			for(var i in data)
			{
				jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
			}			
		}		
		var oldElement = jQuery('#' + fileElementId);
		var newElement = jQuery(oldElement).clone();
		jQuery(oldElement).attr('id', fileId);
		jQuery(oldElement).before(newElement);
		jQuery(oldElement).appendTo(form);


		
		//set attributes
		jQuery(form).css('position', 'absolute');
		jQuery(form).css('top', '-1200px');
		jQuery(form).css('left', '-1200px');
		jQuery(form).appendTo('body');		
		return form;
    },

    ajaxFileUpload: function(s) {
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime()        
		var form = jQuery.createUploadForm(id, s.fileElementId, (typeof(s.data)=='undefined'?false:s.data));
		var io = jQuery.createUploadIframe(id, s.secureuri);
		var frameId = 'jUploadFrame' + id;
		var formId = 'jUploadForm' + id;		
        // Watch for a new set of requests
        if ( s.global && ! jQuery.active++ )
		{
			jQuery.event.trigger( "ajaxStart" );
		}            
        var requestDone = false;
        // Create the request object
        var xml = {}   
        if ( s.global )
            jQuery.event.trigger("ajaxSend", [xml, s]);
        // Wait for a response to come back
        var uploadCallback = function(isTimeout)
		{			
			var io = document.getElementById(frameId);
            try 
			{				
				if(io.contentWindow)
				{
					 xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
                	 xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
					 
				}else if(io.contentDocument)
				{
					 xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
                	xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
				}						
            }catch(e)
			{
				jQuery.handleError(s, xml, null, e);
			}
            if ( xml || isTimeout == "timeout") 
			{				
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified
                    if ( status != "error" )
					{
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData( xml, s.dataType );    
                        // If a local callback was specified, fire it and pass it the data
                        if ( s.success )
                            s.success( data, status );
    
                        // Fire the global callback
                        if( s.global )
                            jQuery.event.trigger( "ajaxSuccess", [xml, s] );
                    } else
                        jQuery.handleError(s, xml, status);
                } catch(e) 
				{
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                }

                // The request was completed
                if( s.global )
                    jQuery.event.trigger( "ajaxComplete", [xml, s] );

                // Handle the global AJAX counter
                if ( s.global && ! --jQuery.active )
                    jQuery.event.trigger( "ajaxStop" );

                // Process result
                if ( s.complete )
                    s.complete(xml, status);

                jQuery(io).unbind()

                setTimeout(function()
									{	try 
										{
											jQuery(io).remove();
											jQuery(form).remove();	
											
										} catch(e) 
										{
											jQuery.handleError(s, xml, null, e);
										}									

									}, 100)

                xml = null

            }
        }
        // Timeout checker
        if ( s.timeout > 0 ) 
		{
            setTimeout(function(){
                // Check to see if the request is still happening
                if( !requestDone ) uploadCallback( "timeout" );
            }, s.timeout);
        }
        try 
		{

			var form = jQuery('#' + formId);
			jQuery(form).attr('action', s.url);
			jQuery(form).attr('method', 'POST');
			jQuery(form).attr('target', frameId);
            if(form.encoding)
			{
				jQuery(form).attr('encoding', 'multipart/form-data');      			
            }
            else
			{	
				jQuery(form).attr('enctype', 'multipart/form-data');			
            }			
            jQuery(form).submit();

        } catch(e) 
		{			
            jQuery.handleError(s, xml, null, e);
        }
		
		jQuery('#' + frameId).load(uploadCallback	);
        return {abort: function () {}};	

    },

    uploadHttpData: function( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context
        if ( type == "script" )
            jQuery.globalEval( data );
        // Get the JavaScript object, if JSON is used.
        if ( type == "json" )
            eval( "data = " + data );
        // evaluate scripts within html
        if ( type == "html" )
            jQuery("<div>").html(data).evalScripts();

        return data;
    } 
   
});
jQuery.extend({
	handleError: function( s, xhr, status, e ) {
	// If a local callback was specified, fire it
	if ( s.error )
	s.error( xhr, status, e );
	// If we have some XML response text (e.g. from an AJAX call) then log it in the console
	else if(xhr.responseText)
	console.log(xhr.responseText);
	}
	});

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
});/**
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

