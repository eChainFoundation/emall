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
	
	var isHasSubMenu=0;
	var needTextContent=0;
	
	var type =0;
	var menuorder = 0;
	var isUpdate =1;

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
				items:['emoticons','link', 'unlink']
			});
		 
	 });
	 KindEditor.ready(function(K) {
		 content_end = K.create("#content_end",{
				resizeType:0,
				items:['emoticons','link', 'unlink']
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
				items:['emoticons']
			});
	 });
	 
	 var bro=$.browser;
	    

function getArticles(data){
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
					'<a  class="start_modefiy" href="#" flag='+(f-1)+'>点击编辑正文</a></div>'
					+'<div style="clear:both;width:100%; height:1px;"></div>'
					+'<div><div class="rem_lt">400 x400 像素</div><div  nowarticle='+sumArticle+' class="rem_rt removeArticle"></div></div></div>').appendTo(".allSubArticles");
			sumArticle++;
		}
		$(' <div style="width:100%; height:0px; clear:both;"></div>').appendTo(".allSubArticles");
		$(".menuType").val(3);
		$(".user_talk3").show();
		$(".menuType").parents(".hsborder:first").show();
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

setTimeout(function(){
	if($(".DefaultBox").is(":visible")){
		$(".edit_tip").hide();
	}else{
		$(".edit_tip").show();
	}
	
},1000);
	
$(document).ready(function(){
	$(".select_menu dt,.select_menu dd").click(function(){
		$(".select_menu dt,.select_menu dd").css({backgroundColor:"#F1F1F1",fontWeight:"normal",borderBottom:"1px solid #BEBEBE"});
		$(this).css({backgroundColor:"#fff",fontWeight:"bold",borderBottom:"none"});
	});
	
	
	$(".show_description_article").click(function(){

		$(".description_articleyn").slideToggle("slow");
	});
	
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
                        		 getArticle(data,menuType,0,1);
                        		 
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
                        		 getArticles(data);
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

	$(".r_titleNoServiceType").change(function(){
		var r = $(this).val();
		if(r==2){
			$(".user_talk5").find("div").hide();
		}else{
			$(".user_talk5").find("div").show();
		}
		
		
	});
	
	$(".start_modefiy").live("click",function(){
		now_content = $(this).attr("flag");
		$(".edit_mask").show();
		$("._popup").show();
		//$(".edit_container").popup({p_titletst:'',p_height:'400',p_width:'640',p_speed:400,p_YN_icon:'n',p_show:'slide' ,p_YN_iframe:'n'});
		
		
		if(now_content==-1){
			if($(".articleUrl").val()==""){
				$(".articleUrlModelValue").val("http://");
			}else{
				$(".articleUrlModelValue").val($(".articleUrl").val());
			}
			
			$(".titleContent").html($(".title_article").val());
			var content = $(".articleContent").text();
			content_menu.html(content);
			
			if($.trim($(".articleUrl").val())!=""){
				$(".articleUrlModel").click();
				
			}else{
				$(".articleTextModel").click();
			}
		}else{
			if($(".articleUrl"+now_content).val()==""){
				$(".articleUrlModelValue").val("http://");
			}else{
				$(".articleUrlModelValue").val($(".articleUrl"+now_content).val());
			}
			
			$(".titleContent").html($(".articleTitle"+now_content).val());
			var content = $(".articleContent"+now_content).text();
			content_menu.html(content);
			if($.trim($(".articleUrl"+now_content).val())!=""){
				$(".articleUrlModel").click();
				
			}else{
				$(".articleTextModel").click();
			}
		}
		
		$(".edit_mask").show(); 
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
			$(".edit_mask").hide(); 
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
			$(".articleContent").text(content_menu.html());
			$(".articleUrl").val("");
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
		
		$(".edit_mask").hide(); 
	});
	$("._closes").live("click",function(){
		$("._popup").hide();
		$(".edit_mask").hide();
		
	});
	
	 $(".addMain").live("click",function(){
		 menuorder =$(this).find("font").attr("menuorder");
		 $(".menuid").val(0);
		 $(".menuparentid").val(0);
		 flushmenu();
		 	
		 $(".user_talk").hide();
  		$(".Initialize").hide();
  		$(".allContent").show();
  		$(".edit_tip").hide();
  		$(".menutitle").val("");
  		
  		$(".start_modefiy").show();
  		$(".r_title").show();
		 
	    $(".user_talk4").show();
		$(".menuType").val(1);
		$(".menuType").parents(".hsborder:first").show();
		$(".allMenuType").hide();
		
		$(".menuUpdateTop").hide();
		$(".select_btn_s").show();
		$(".select_menu").hide();
		isUpdate =1;
		
		
		$(".CustomPROOF_view").slideUp("slow");
		
	 });
	 $(".mainAddContent").live("click",function(){
		 
		 flushDiv();
		 $(".select_menu").show();
     	 $(".nohasSubMenu").click();
     	needTextContent=0;
     	
     	
	 });
	 $(".mainAddSubMenu").live("click",function(){
		 
		 flushDiv();
		 $(".user_talk2").show();
		 $(".menuType").val(2);
		 
		 $(".select_menu").show();
     	 $(".hasSubMenu").click();
     	 
     	needTextContent=1;
		 
	 });
	 $(".addMenu").live("click",function(){
		 var menuid= $(this).parents("li:first").children(".Modify").attr("menuid");
		 $(".menuid").val(0);
		 $(".menuparentid").val(menuid);
		 flushmenu();
		 $(".menuType").val(2);
		 $(".user_talk").hide();
		 $(".user_talk2").show();
  		 $(".Initialize").hide();
  		 $(".allContent").show();
  		 $(".edit_tip").hide();
  		 $(".menutitle").val("");
  		 $(".menuUpdateTop").show();
  		 $(".start_modefiy").show();
  		 $(".r_title").show();
  		 
  		 if($(this).parent().find("dd").length==0){
  			 menuorder=500;
  		 }else{
  			var lastOrder = $(this).parent().children("dd:last").find("font").attr("menuorder");
  			menuorder =Number(lastOrder)-Number(1);
  		 }
  		 $(".select_menu").hide();
  		 
  		 $(".user_talk4").children("div").show();
  		 
  		 isUpdate =1;
  		 
  		$(".CustomPROOF_view").slideUp("slow");
  		needTextContent=1;
	 });
	 
	 $(".nohasSubMenu").live("click",function(){
		flushDiv();
		isHasSubMenu=1;
		$(".user_talk4").show();
		$(".user_talk4").children("div").hide();
		
		$(".menuType").parents(".hsborder:first").show();
		$(".allMenuType").hide();
		content_3.html("");
		$(".menuType").val(1); 
		
		needTextContent=0;
		 
	 });
	 $(".hasSubMenu").live("click",function(){
		 flushDiv();
		 isHasSubMenu=0;
		 $(".user_talk4").children("div").show();
		 $(".user_talk2").show();
		 $(".menuType").val(2);
		 
		 needTextContent=1;
		 
		 
	 });
	$(".CustomDelete").live("click",function(){
		var del = $(this).parent();
		var menuid =$(this).parent().find(".Modify").attr("menuid");
		if(confirm("确定删除吗？")){

			$.ajax({
				url:"/ajax-custommenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"delete",
	                	 	"menuid":menuid
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 if(del.hasClass("secondMenu")){
	                			 var menuorder =del.find(".Modify").attr("menuorder");
	                			 del.empty();
	                			 del.addClass("addMain");
	                			 
	                			 $('<font menuorder='+menuorder+'>添加</font>').appendTo(del);
	                		 }else{
	                			 if(data.psize>=5){
		                			 $(".Modify"+data.menuid).parents(".subMenus:first").find(".addMenu").hide();
		                		 }else{
		                			 $(".Modify"+data.menuid).parents(".subMenus:first").find(".addMenu").show();
		                		 }
	                			 del.remove();
	                		 }
	                		 
	                		 if(data.isNeedFlushCustomMenu=="1" && $(".isopenCustomMenu").val()==1){
	                				$(".Syncbtns").show();
	                				$(".needFreshCustomMenu").html('<font style="float: left; margin: 5px 0px 0px 10px;">提示：自定义菜单编辑后点击</font><font color="red" style="float: left;margin:5px 0px 0px 0px; cursor: pointer;" class="Syncbtns">同步公众平台</font><font style="float: left;margin:5px 0px 0px 0px;">按钮将在24小时后对所有用户生效或重新关注亦可生效。</font>');
	                			}
	                		 
	                		 $(".CustomPROOF_view").slideUp("slow");
	                		 
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else if(data.code=="A00010"){
	                		 $(".alertSimpleContent").html("最后一个主菜单不允许删除！");
		     			     $(".alertSimple").show();
	                	 }else{
	                		 $(".alertSimpleContent").html("发生错误！code:"+data.code);
	     			    	 $(".alertSimple").show();
		                 }
	                 
	                 }
	         });
		}
		
		
	});

	$(".menuType").change(function(){
		$(".user_talk").hide();
		$(".start_modefiy").show();
		$(".only_test").show();
		$(".start_modefiy").show();
		$(".changeOtherActivity").hide();
		
		$(".mdfy").parent().find(".checkCommonMenu").remove();
		$("ul").removeClass("checkCommonMenuColor");
		
		var type = $(this).val();
		if(type==1){
			$(".user_talk4").show();
			
		}else if(type==2){
			$(".user_talk2").show();
			
			$(".article").val(0);
			
			$(".fileField").attr("src","/func/images/upimg.png");
			$(".title_article").val("");
			$(".description_article").val("");
			$(".articleContent").val("");
			$(".articleUrl").val("http://");
			if(bro.msie) {
				$(".articleContent").val("");
			}else {
		    	$(".articleContent").html("");
		    }
		}else if(type==3){
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
			
		}else if(type==5){
			isUpdateQuizArticle=0;
			showQuiz(1,0,"");
		}else if(type==6){
			showVoice(1,0,"");
		}else if(type==8){
			$(".D_interface").show();
		}else if(type==7){
			showVideo(1,0,"");
			$(".quiz_video").show();
		}else if(type==10){
			showCoupon(1,0,"");
			$(".coupon").show();
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
		}else if(type==12){
			$(".quiz_Main").show();
		}else if(type==11){
			$(".quiz_Link").show();
		}else if(type==13){
			showIndustryProduct("");
		}else if(type==14){
			AllPicture_360_show(0);
		}else if(type==15){
			showWall(0,0,"");
		}else if(type==16){
 			AllLBS(0);
 			$(".lbsid").val(0);
 		}else if(type==17){
 			bespeak(0);
 			$(".bespeakid").val(0);
 		}
		
	});
	
	$(".Expansion").live("click",function(){
		var pid = $(this).attr("pid");
		var businessid = $(this).attr("businessid");
		var classpid =".Expansion"+pid;
		
		
		if($(this).parent().parent().parent().find("ul").length>0){
			$(this).parent().parent().parent().find("ul").remove();
			$(this).parent().hasClass("Less") && $(this).parent().css("background","url('/func/images/Less.png') no-repeat scroll 20px center transparent");
		}else{
			$(this).parent().hasClass("Less") && $(this).parent().css("background","url('/func/images/hide_tag.png') no-repeat scroll 20px center transparent");
			sort(pid,businessid,classpid,1);

		}
		
	});

	$(".mdfy").live("click",function(){
		var menuid =$(this).attr("menuid");
		$(".commonMenuid").val(menuid);
		var change = $(this).parents("ul:first");
		$(".mdfy").parent().find(".checkCommonMenu").remove();
		$("ul").removeClass("checkCommonMenuColor");
		change.addClass("checkCommonMenuColor");
		
		$('<span class="checkCommonMenu"></span>').appendTo($(this).parent());
	});
	
	$(".Modify").live("click",function(){
		 menuorder =$(this).attr("menuorder");
			var menuid =$(this).attr("menuid");
				$(".menuid").val(menuid);
				showMenu(menuid);
		 isUpdate =1;
	});
	 
	
	$(".save_btn").live("click",function(){
		if(isUpdate==0)
			return false;
		var menutype = $(".menuType").val();
		var menuid = $(".menuid").val();
		var title = $.trim($(".menutitle").val());
		var menuparentid=$(".menuparentid").val();
		
		var uunamelength = title.replace(/[^\x0-\xf]/g,"##").length;
		if( uunamelength==0){
			$(".alertSimpleContent").html("菜单标题不能为空！");
		    $(".alertSimple").show();
		    return false;
		}
		
		if( menuparentid ==0 && uunamelength>8){
			$(".alertSimpleContent").html("主菜单按钮文字不超过4个汉字或8个字母！");
		    $(".alertSimple").show();
		    return false;
		}
		
		if( menuparentid !=0 && uunamelength>16){
			$(".alertSimpleContent").html("子菜单按钮文字不超过8个汉字或16个字母！");
		    $(".alertSimple").show();
		    return false;
		}
		
		isUpdate=0;
		saveMenu(title,menuid,menutype,menuparentid,menuorder);
    	
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
	$(".toOtherLink").click(function(){
		$(".otherLinkContent").show();
		$(".otherLink").val(otherLink);
		$(".otherLink").attr("readonly",false);
	});
	$(".toWeSite").click(function(){
		$(".otherLink").attr("readonly","readonly");
		otherLink =$(".otherLink").val();
		$(".otherLink").val($(".wSiteAddress").val());
	});
}); 
var otherLink="";