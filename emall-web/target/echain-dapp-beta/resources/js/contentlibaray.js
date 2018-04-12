

var changemid=0;
var delarticleid =0;
var bro=$.browser;
function ajaxFileUpload(){
	var reg	= new RegExp(/[\.mp3 || \.wma || \.wav || \.amr || \.MP3 || \.WMA || \.WAV || \.AMR]$/);
	if (! reg.test($("#mp3fileupload").val()))
	{
		 $(".alertSimpleContent").html("语音格式必须为mp3，wma，wav，amr! ");
		 $("#upload_01").val("");
	     $(".alertSimple").show();
		return false;
	}
	$('html').tip({status:'statusing',width:330,content:'正在上传，请稍后...'});
    $.ajaxFileUpload({
      url:'/materials.action?op=upload&stats=uploadImage',             //需要链接到服务器地址
      secureuri:false,
      fileElementId:'mp3fileupload',                         //文件选择框的id属性
      dataType: 'json',                                     //服务器返回的格式，可以是json
      success: function (data){                //相当于java中try语句块的用法
    	if(data.code=="A00006"){
    		$('html').tip({status:'right',width:330,content:'恭喜您，上传成功！',dis_time:3000});
    		var vc = $(".voicesCounts").html();
    		$("#upload_02").val("");
    		$(".voicesCounts").html(Number(vc)+Number(1));
    		location.href="/materials.action?op=getAll&pagebegin=1&materialstype=voices";
    	}else if(data.code=="A00004"){
    		location.href="/login.jsp";
    	}else if(data.code=="A00005"){
    		$(".alertSimpleContent").html("上传的语音必须小于5M且长度在60秒以内！");
        	$(".alertSimple").show();
	     }
      }
    });
}
var nowtuwen=0;
	function ajaxFileUpload3(){
		var reg	= new RegExp(/[\.GIF || \.gif || \.jpg || \.jpeg || \.bmp || \.png|| \.JPG|| \.JPEG|| \.BMP]$/);
		if (! reg.test($("#mp3fileupload3").val()))
		{
			$(".alertSimpleContent").html("图片格式必须为jpg、jpeg、png、bmp、gif! ");
	    	$(".alertSimple").show();
	    	$("#upload_01").val("");
			return false;
		}
	    $.ajaxFileUpload({
	      url:'/materials.action?op=upload&stats=uploadImage',             //需要链接到服务器地址
	      secureuri:false,
	      fileElementId:'mp3fileupload3',                         //文件选择框的id属性
	      dataType: 'json',                                     //服务器返回的格式，可以是json
	      success: function (data){   
	    	 if(data.code="A00006"){
	    		if(Number(nowtuwen)==0){
	    			$(".articlePic"+1).val(data.url);
	    			$(".fileid"+1).val(data.fileid);
	    			$("#nowUpload").attr("src",data.url);
	    		}else{
	    			$(".duotuwenEvery"+nowtuwen).find("img").attr("src",data.url);
	    			$(".articlePic"+nowtuwen).val(data.url);
	    			$(".fileid"+nowtuwen).val(data.fileid);
	    		}
	    		$("#upload_01").val("");
	    		
	    		$(".samePic").attr("src",data.url);
	    	 }else if(data.code=="A00004"){
		    	location.href="/login.jsp";
		    }else if(data.code=="A00005"){
		    	$(".alertSimpleContent").html("文件必须小于2M！");
	        	$(".alertSimple").show();
		     }
	      }
	    });
}
function ajaxFileUpload2(){
	var reg	= new RegExp(/[\.GIF || \.gif || \.jpg || \.jpeg || \.bmp || \.png|| \.JPG|| \.JPEG|| \.BMP]$/);
	if (! reg.test($("#mp3fileupload2").val()))
	{
		$(".alertSimpleContent").html("图片格式必须为jpg、jpeg、png、bmp、gif! ");
    	$(".alertSimple").show();
		return false;
	}

    $.ajaxFileUpload({
      url:'/materials.action?op=upload&stats=uploadImage',             //需要链接到服务器地址
      secureuri:false,
      fileElementId:'mp3fileupload2',                         //文件选择框的id属性
      dataType: 'json',                                     //服务器返回的格式，可以是json
      success: function (data){   
    	 if(data.code=="A00006"){
    		 $('<ul class="newpic_h"><li class="pic_view">'
					+'<input type="text" value="'+data.filename+'" mid ='+data.id+'  class="editefilename editefilename'+data.id+'"/><div class="_Operating _edit"></div>'
					+'<div style="clear:both; height:10px;width:auto;"></div>'
					+'<img onfocus="this.blur()" alt="" src="'+data.url+'" style="width:122px;height:77px;">'
				+'</li><li class="data_con">'+data.filesize+'KB</li>'
				+'<li class="operate"><div class="_Operating _Opdel deleteImg" imgid="'+data.id+'"></div></li></ul>').prependTo('.imgcontent');
    		 $("#upload_03").val("");
    		 var vc = $(".imgCounts").html();
	    	 $(".imgCounts").html(Number(vc)+Number(1));
    	 }else if(data.code=="A00004"){
	    		location.href="/login.jsp";
	     }else if(data.code=="A00005"){
	    		$(".alertSimpleContent").html("文件必须小于2M！");
	        	$(".alertSimple").show();
	     }
      }
    });
}

$(function(){
	$(".delImg").click(function(){
		if(Number(nowtuwen)==0){
			$(".addmid").val(0);
			$(".articlePic"+1).val("/images/nophoto_50x50.PNG");
			$(".fileid"+1).val("");
			$("#nowUpload").attr("src","/images/nophoto_50x50.PNG");
		}else{
			$(".duotuwenEvery"+nowtuwen).find("img").attr("src","/images/nophoto_50x50.PNG");
			$(".addmid"+nowtuwen).val(0);
			$(".articlePic"+nowtuwen).val("/images/nophoto_50x50.PNG");
			$(".fileid"+nowtuwen).val("");
		}
		
		$(".samePic").attr("src","/images/nophoto_50x50.PNG");
	});
	$(".bar_bg").removeClass("bar_click");
	$(".weixinkefu").addClass("bar_click");
	
	$(".sort_hover").removeClass("sort_hoverYSmr");
	$(".sort_hover4").addClass("sort_hoverYSmr");
	$(".navlist li").live('click', function(event) {
		    $(".navlist li").removeClass("tagH");
			$(".navlist li").find("div").removeClass("tagbtmh");
			$(this).addClass("tagH");
			$(this).find("div").addClass("tagbtmh");
			$(".consaveButton").hide();
	   });
	   
	   
	
	$(".only-item").live('mouseover mouseout', function(event) {
	  if (event.type == 'mouseover') {
	    $(this).css("background-position","0 -2px");	
	  } else {
	   $(this).css("background-position","0 196px");
	  }
	});
			
	$(".more-item").live('mouseover mouseout', function(event) {
	  if (event.type == 'mouseover') {
	   $(this).css("background-position","0 -2px");
	  } else {
	   $(this).css("background-position","0 196px");
	  }
	});
	
	$(".newshow").find("li").live('mouseover mouseout', function(event) {
	  if (event.type == 'mouseover') {
	   		$(this).find(".mouseedit").find(".modefy").addClass("mdf-alpha");
			$(this).find(".mouseedit").find(".m_edit").addClass("m_editH");
			$(this).find(".mouseedit").find(".m_empty").addClass("m_emptyH");
	  } else {
	  	    $(this).find(".mouseedit").find(".modefy").removeClass("mdf-alpha");
			$(this).find(".mouseedit").find(".m_edit").removeClass("m_editH");
			$(this).find(".mouseedit").find(".m_empty").removeClass("m_emptyH");
	  }
	});
	
	 
	 $(".btmnav").find("li").live('click', function(event) {
	  		 $(".btmnav").find("li").removeClass("viewnav");
		   	  $(".btmnav").find("li").find("div").removeClass("viewtag");
		   	  $(this).addClass("viewnav");
		   	  $(this).find("div").addClass("viewtag");
		});
	 
	 
	  $(".onlyone").hide();
	  
	  $(".navlist li").click(function(){
	  	var index = $(this).index();
	  	switch(index)
	  	{
	  	case 0:
	  		$(".switchshow,.creatimg_text").hide();
	  		$(".tuwen_matter").show();	
	  		$(".page").hide();
	  		$(".page0").show();
	  		break;
  		case 1:
  			$(".switchshow,.creatimg_text").hide();
	  		$(".huodong_matter").show();	
	  		$(".page").hide();
	  		$(".page1").show();
	  		break;
  		case 2:
  			$(".switchshow,.creatimg_text").hide();
	  		$(".youhuiquan_matter").show();	
	  		$(".page").hide();
	  		$(".page2").show();
	  		break;
	  	case 3:
  			$(".switchshow,.creatimg_text").hide();
	  		$(".tupian_matter").show();	
	  		$(".page").hide();
	  		$(".page3").show();
	  		break;
	  	case 4:
  			$(".switchshow,.creatimg_text").hide();
	  		$(".yuyin_matter").show();	
	  		$(".page").hide();
	  		$(".page4").show();
	  		break;
	  	default:
 			$(".switchshow,.creatimg_text").hide();
	  		$(".tuwen_matter").show();	
	  	}
	  });
	  
	  $(".playlist-matter li").die().live('mouseover mouseout', function(event) {
		  	if (event.type == 'mouseover') {
		  		$(this).addClass("pic_ul_h");
		  		$(this).find(".jp-playlist-item-title").css("background-color","#f7ffd7")
			  } else {
				  $(this).removeClass("pic_ul_h");
				 $(this).find(".jp-playlist-item-title").css("background-color","#f9f9f9")
			  }
	});
	  
	  $("._Opdel").live('mouseover mouseout', function(event) {
		  	if (event.type == 'mouseover') {
		  		$(this).css("background","url('/func/images/Modify.png') 18px 0px");
			  } else {
				  $(this).css("background","url('/func/images/HomeAdd.png') 18px 0px");
			  }
		});
	 
	  
	  $("._edit").live('mouseover mouseout', function(event) {
	  	if (event.type == 'mouseover') {
		  	$(this).css("background","url('/func/images/Modify.png') 55px 0px");
		  } else {
			  $(this).css("background","url('/func/images/HomeAdd.png') 55px 0px");
		  }
		});

	  
	  $("._Operating").click(function(){
	  	$(this).addClass("_Operatingclick");
	  });
	  $("._edit").live("click",function(){
	  	 $(this).parent().find("input").addClass("pic_viewInput");
	  	 $(this).parent().find("input").attr("readonly",false);
	  	 $(this).parent().find("input").focus();
	  	 $(this).parent().find("input").select();
	  	 $(this).hide();
	  	 changemid = $(this).parent().find(".editefilename").attr("mid");
	  });
		
	  $(".pic_view").find("input").live('blur', function(event) {
		  $(this).removeClass("pic_viewInput");
		  $(this).parent().find("._edit").show();
		  var mid = $(this).attr("mid");
		  var filename = $(this).val();
		  if(mid==changemid){
			  $.ajax({
		            url: "/materials.action",
		            type:"POST",dataType:"json",
		            timeout: "10000",
		            data:{ "op":"updateMaterials",
		            	"filename":filename,
		            	"id":changemid
		            	},
		            success:function(data){
		                if(data.code == "A00006"){
		                	var emid=".editefilename"+data.id;
		                	$(emid).val(data.filename);
		                	changemid=0;
		                }else if(data.code=="A00004"){
		    	    		location.href="/login.jsp";
		    	    	}
		            }
		        });
		  }
		  
		  
	});
	  
	$("#only_tuwen").click(function(){
		$(".container").hide();
		$("#description1").show();
		$(".creatimg_text,.onlyone").show();
		$(".moretuwen").remove();
    	$(".duotuwenEvery").remove();
    	$(".selectnub").hide();
    	$(".btmnav").hide();
    	$(".page").hide();
    	$(".articleTitle").val("");
		$("._textedit").val("");
		$(".articleTitleShow").html("新标题");
		$("#nowUpload").attr("src","/images/nophoto_50x50.PNG");
		$(".samePic").attr("src","/images/nophoto_50x50.PNG");
		$(".articlePic").val("/images/nophoto_50x50.PNG");
		
		$(".fileid").val("");
		$(".op").val("addArticle");
		$(".uploadarticleId").val(0);
		
		$(".texteditcontent").hide();
		$(".texteditcontent1").show();
		
		k1.html("");
		k2.html("");
		k3.html("");
		k4.html("");
		k5.html("");
		k6.html("");
		k7.html("");
		k8.html("");
		$(".addArticlesItem").hide();
		$(".consaveButton").show();
		$(".model").val("");
		$(".articleAuthor").val("");
		$(".articleSourceurl").val("http://");
	});
	
	$("#more_tuwen").click(function(){
		$(".container,.onlyone").hide();
		$(".creatimg_text").show();
		$(".page").hide();
		$(".newscount").val(3);
		$(".selectnub").show();
		$(".articleTitle").val("");
		$(".btmnav").show();
		$("._textedit").val("");
		$(".op").val("addArticles");
		$(".moretuwen").remove();
    	$(".duotuwenEvery").remove();
		$(".articleTitleShow").html("新标题");
		$("#nowUpload").attr("src","/images/nophoto_50x50.PNG");
		$(".samePic").attr("src","/images/nophoto_50x50.PNG");
		$(".articlePic").val("/images/nophoto_50x50.PNG");
		$(".fileid").val("");
		$(".texteditcontent").hide();
		$(".texteditcontent1").show();
		$(".consaveButton").show();
		$(".uploadarticleId").val(0);
		
		
		$(".articleAuthor").val("");
		$(".articleSourceurl").val("http://");
		
		$(".model").val("");
		
		k1.html("");
		k2.html("");
		k3.html("");
		k4.html("");
		k5.html("");
		k6.html("");
		k7.html("");
		k8.html("");
		$(".addArticlesItem").show();
		$('<div class="Graphic_title_left_3 onlymore duotuwenEvery duotuwenEvery'+2+'" flag="'+2+'">'
				+'<p class="articleTitleShow2">新标题</p>'
				
				
				+'<img class="logo"  src="/images/nophoto_50x50.PNG" />'
				+'<div class="GraphicOver"><div class="GraphicBg"></div><div class="GraphicShow"><label class="GraphicModify moretuwen" title="修改"  flag="2"></label>'
                +'<label class="GraphicDelete removeArticle"  flag="'+2+'" title="删除"></label></div></div></div>').appendTo(".duotuwenImgs");
			
		
		
		$('<li class="moretuwen" flag="'+2+'"><font>第'+2+'篇</font><div></div></li>').appendTo(".duotuwen");
		
		$('<div class="Graphic_title_left_3 onlymore duotuwenEvery duotuwenEvery'+3+'" flag="'+3+'">'
				+'<p  class="articleTitleShow3">新标题</p>'
				+'<img class="logo"  src="/images/nophoto_50x50.PNG" />'
				+'<div class="GraphicOver"><div class="GraphicBg"></div><div class="GraphicShow"><label class="GraphicModify moretuwen" title="修改"  flag="3"></label>'
                +'<label class="GraphicDelete removeArticle" flag="'+3+'" title="删除"></label></div></div></div>').appendTo(".duotuwenImgs");
		
		$('<li class="moretuwen" flag="'+3+'"><font>第'+3+'篇</font><div></div></li>').appendTo(".duotuwen");
			
	});	
	$(".activitydel").live("click",function(){
		var aid = $(this).attr("aid");
		if(confirm("确定删除？")){
			$.ajax({
	            url: "/activitymanage.action",
	            type:"POST",dataType:"json",
	            timeout: "10000",
	            data:{ "op":"remove",
	            	"id":aid
	            	},
	            success:function(data){
	                if(data.code == "A00006"){
	                	$(".activity"+aid).remove();
	                	var sum = $(".allActivitySum").html();
	                	$(".allActivitySum").html(Number(sum)-Number(1));
	                }else if(data.code=="A00004"){
	    	    		location.href="/login.jsp";
	    	    	}
	            }
	          });
		}
		
	});
	$("#pagecoupons").click(function(){
		var maxpage = $(this).attr("maxpage");
		var newpage = $.trim($(".pagecoupons").val());
		if(Number(newpage)>Number(maxpage)){
			newpage=1;
		}
		location.href="/materials.action?op=getAll&materialstype=coupons&pagebegin="+newpage;
	});
	$("#pagevoices").click(function(){
		var maxpage = $(this).attr("maxpage");
		var newpage = $.trim($(".pagevoices").val());
		if(Number(newpage)>Number(maxpage)){
			newpage=1;
		}
		
		location.href="/materials.action?op=getAll&materialstype=voices&pagebegin="+newpage;
	});
	$("#pageimgs").click(function(){
		var maxpage = $(this).attr("maxpage");
		var newpage = $.trim($(".pageimgs").val());
		if(Number(newpage)>Number(maxpage)){
			newpage=1;
		}
		
		location.href="/materials.action?op=getAll&materialstype=imgs&pagebegin="+newpage;
	});
	$("#pagearticles").click(function(){
		var maxpage = $(this).attr("maxpage");
		var newpage = $.trim($(".pagearticles").val());
		if(Number(newpage)>Number(maxpage)){
			newpage=1;
		}
		
		location.href="/materials.action?op=getAll&materialstype=articles&pagebegin="+newpage;
	});
	$("#pagegames").click(function(){
		var maxpage = $(this).attr("maxpage");
		var newpage = $.trim($(".pagegames").val());
		if(Number(newpage)>Number(maxpage)){
			newpage=1;
		}
		location.href="/materials.action?op=getAll&materialstype=games&pagebegin="+newpage;
	});
	//图文消息
	$(".only-item").find(".tuwenedit").live('click',function(){
		$(".container,.onlymore").hide();
		$(".creatimg_text,.onlyone").show();
		$(".page").hide();
		$(".btmnav").hide();
		$(".addArticlesItem").hide();
		$(".consaveButton").show();
		var id = $(this).attr("articleid");
		$(".uploadarticleid").val(id);
		$.ajax({
            url: "/materials.action",
            type:"POST",dataType:"json",
            timeout: "10000",
            data:{ "op":"getArticle",
            	"id":id
            	},
            success:function(data){
                if(data.code == "A00006"){
    	    		$("#nowUpload").attr("src",data.url);
    	    		$(".samePic").attr("src",data.url);
    	    		
    	    		$(".articlePic1").val(data.url);
    	    		$(".fileid1").val(data.fileid);
                	$(".op").val(data.op);
                	$(".title1").val(data.title);
                	$(".articleTitleShow").html(data.title);
                	$(".description1").val(data.description);
                	$(".content1").val(data.content);
                	$(".articleTime").html(data.time);
                	
                	$(".author1").val(data.author);
                	$(".sourceurl1").val(data.sourceurl);
                	
                	k1.html(data.content);
                	//KE.html("texteditcontent1", data.content);
                	$(".texteditcontent").hide();
            		//$(".texteditcontent").css("position","fixed");
                	$(".texteditcontent1").show();
                	//$(".texteditcontent1").css("position","static");
            		//$(".texteditcontent1").css("left","0px");
                }else if(data.code=="A00004"){
    	    		location.href="/login.jsp";
    	    	}
            }
          });
		
	});
	
	$(".more-item").find(".tuwenedit").live('click',function(){
		$(".container,.onlyone").hide();
		$(".creatimg_text").show();
		$(".page").hide();
		$(".btmnav").show();
		var id = $(this).attr("articleid");
		$(".consaveButton").show();
		$(".uploadarticleid").val(id);
		$.ajax({
            url: "/materials.action",
            type:"POST",dataType:"json",
            timeout: "10000",
            data:{ "op":"getArticle",
            	"id":id
            	},
            success:function(data){
                if(data.code == "A00006"){
                	
                	$(".newscount").val(data.articles.length);
                	$(".moretuwen").remove();
                	$(".duotuwenEvery").remove();
                	for(var i = 0;i<data.articles.length;i++){
                		var flag = i+1;
                		if(i>0){
                			$(".articleTime").html(data.articles[i].time);
                			$(".uploadarticleid"+flag).val(data.articles[i].mid);
                			$('<div class="Graphic_title_left_3 onlymore duotuwenEvery duotuwenEvery'+flag+'" flag="'+flag+'">'
                					+'<p  class="articleTitleShow'+flag+'" >'+data.articles[i].title+'</p>'
                					+'<img class="logo" src="'+data.articles[i].url+'" />'
                					+'<div class="GraphicOver"><div class="GraphicBg"></div><div class="GraphicShow"><label class="GraphicModify moretuwen" title="修改" flag='+flag+'></label>'
                                    +'<label class="GraphicDelete removeArticle" title="删除" flag='+flag+'></label></div></div>'
                				+'</div>').appendTo(".duotuwenImgs");
                			$(".duotuwenEvery"+(i+1)).find("img").attr("src",data.articles[i].url);
                			$('<li class="moretuwen" flag="'+flag+'"><font>第'+(i+1)+'篇</font><div></div></li>').appendTo(".duotuwen");
                		}
                		if(i==0){
		    	    		$("#nowUpload").attr("src",data.articles[i].url);
		    	    		$(".samePic").attr("src",data.articles[i].url);
		                	$(".op").val(data.op);
		                	$(".title1").val(data.articles[i].title);
		                	$(".author1").val(data.articles[i].author);
		                	$(".sourceurl1").val(data.articles[i].sourceurl);
		                	$(".articleTitleShow").html(data.articles[i].title);
		                	$(".description1").val(data.articles[i].description);
		                	$(".content1").val(data.articles[i].content);
		                	$(".articlePic1").val(data.articles[i].url);
		                	$(".fileid1").val(data.articles[i].fileid);
		                	
		                	k1.html(data.articles[i].content);
		                	//KE.html("texteditcontent1", data.articles[i].content);

	                	}else{
	                		
	                		if(flag==1){
	                			k1.html(data.articles[i].content);
	                		}else if(flag ==2){
	                			k2.html(data.articles[i].content);
	                		}else if(flag ==3){
	                			k3.html(data.articles[i].content);
	                		}else if(flag ==4){
	                			k4.html(data.articles[i].content);
	                		}else if(flag ==5){
	                			k5.html(data.articles[i].content);
	                		}else if(flag ==6){
	                			k6.html(data.articles[i].content);
	                		}else if(flag ==7){
	                			k7.html(data.articles[i].content);
	                		}else if(flag ==8){
	                			k8.html(data.articles[i].content);
	                		}
	                		
	                		
	                		
	                		
	                		//KE.html("texteditcontent"+flag, data.articles[i].content);
	                		$(".uploadarticleid"+flag).val(data.articles[i].id);
	                		$(".description"+flag).val(data.articles[i].description);
		                	$(".content"+flag).val(data.articles[i].content);
		                	$(".title"+flag).val(data.articles[i].title);
		                	
		                	$(".author"+flag).val(data.articles[i].author);
		                	
		                	$(".articlePic"+flag).val(data.articles[i].url);
		                	$(".fileid"+flag).val(data.articles[i].fileid);
		                	$(".sourceurl"+flag).val(data.articles[i].sourceurl);
	                	}
                	}
                	if($(".moretuwen").last().attr("flag")>=8){
            			$(".moretuwen").last().css("borderRight","none");
            			$(".addArticlesItem").hide();
            		}else{
            			$(".addArticlesItem").show();
            		}
                }else if(data.code=="A00004"){
    	    		location.href="/login.jsp";
    	    	}
            }
          });
	});
	
	$(".activityedit").click(function(){
		var activityid = $(this).attr("activityid");
		location.href="/activitymanage.action?op=newactivity&activityid="+activityid
	});
	$("#point_del_open").popupui({click_obj:".deletearticle",width:558,yn_open:false});
	
	$(".bottom1CancelArticle").live('click',function(){
		$('#Mask_pop_ui').fadeOut("slow");
		$("#point_del_open").dialog("close");
	});
	$(".bottom1DelArticle").live('click',function(){
		$('#Mask_pop_ui').fadeOut("slow");
		$("#point_del_open").dialog("close");
		var pagebegin = $(".pagebeignArticle").val();
		if($("input[type='checkbox'][name='hasMenuUserMsg']:checked").attr("checked")){
			 $.ajax({
		            url: "/ajax-materials.action",
		            type:"POST",dataType:"json",
		            timeout: "10000",
		            data:{ "op":"delArticles",
		                "articleid":delarticleid
		            	},
		            success:function(data){
		            	location.href="/materials.action?op=delArticles&materialstype=articles&pagebegin="+pagebegin+"&id="+delarticleid;
		            }
		        });
		}else{
			location.href="/materials.action?op=delArticles&materialstype=articles&pagebegin="+pagebegin+"&id="+delarticleid;
		}
		
		
	});
	$(".deletearticle").live('click',function(){
		
		delarticleid =$(this).attr("articleid");
		
		 $.ajax({
	            url: "/ajax-materials.action",
	            type:"POST",dataType:"json",
	            timeout: "10000",
	            data:{ "op":"isUseMenu",
	                "articleid":delarticleid
	            	},
	            success:function(data){
		    		if(data.code=="A00005" || data.code=="A00006" ){
		    			
		    			
		    			if(data.hasmsgid==1){
		    				$(".hasMenuUserMsg").show();
		    			}else{
		    				$(".hasMenuUserMsg").hide();
		    			}
		    			if(data.hasUser!="无"){
		    				$(".hasMenuUser").show();
		    				
		    				$(".hasMenuUserContent").html(data.hasUser);
		    			}else{
		    				$(".hasMenuUser").hide();
		    			}
		    			$('#Mask_pop_ui').fadeIn("slow");
		    			$("#point_del_open").dialog("open");
		    		}else{
		    			location.href="/login.jsp";
		    		}
	            }
	        });
		 
	});
	$(".deleteImg").live('click',function(){
		if(confirm("是否确定删除？")){
			var id =$(this).attr("imgid");
			var pagebegin = $(".pagebeignImg").val();
			location.href="/materials.action?op=delMaterials&materialstype=imgs&pagebegin="+pagebegin+"&id="+id;
		}else{
			return false;
		}
		
	});
	/*
	$(".deletevoice").live('click',function(){
		if(confirm("是否确定删除？")){
			var id =$(this).attr("voiceid");
			var pagebegin = $(".pagebeignVoice").val();
			location.href="/materials.action?op=delMaterials&materialstype=voices&pagebegin="+pagebegin+"&id="+id;
		}else{
			return false;
		}
		
	});
*/
	$(".articleTitle").live("blur",function(){
		var f = $(this).attr("flag");
		if(f==1){
			$(".articleTitleShow").html($(this).val());
		}else{
			$(".articleTitleShow"+f).html($(this).val());
		}
		
	});
	$(".consave").live("click",function(){
		$("#submitAdd").submit();
	});
	$(".newscount").change(function(){
		newContentForNewscount();
	});
	
	$(".moretuwenfirst").live("click",function(){
		$(".articleTitle").hide();
		$("._textedit").hide();
		$(".articleSourceurl").hide();
		$(".articleAuthor").hide();
		$(".title"+1).show();
		$(".content"+1).show();
		$(".author"+1).show();
		$(".sourceurl"+1).show();
		
		$(".texteditcontent").hide();
		$(".model").hide();
		$(".description1").show();
		
		$(".texteditcontent1").show();
		nowtuwen=0;
		$("#texteditcontent1").hide();
		$(".imgadvice").html("大图片建议720*400像素 ");
		$(".samePic").attr("src",$(this).parents(".Graphic_title_left_0:first").find(".tu").attr("src"));
	});
	
	$(".moretuwen ").live("click",function(){
		$('.Graphic_title_left_3').css({boxShadow:'none'});
		$(this).parents('.Graphic_title_left_3').css({boxShadow:'0 0 12px #969696 inset'});
		var flag = $(this).attr("flag");
		nowtuwen=flag;
		$(".articleTitle").hide();
		$(".articleSourceurl").hide();
		$(".articleAuthor").hide();
		$("._textedit").hide();
		$(".model").hide();
		$(".title"+flag).show();
		$(".author"+flag).show();
		if($(".sourceurl"+flag).val()==""){
			$(".sourceurl"+flag).val("http://");
		}
		$(".sourceurl"+flag).show();
		$(".description"+flag).show();
		
		$(".content"+flag).hide();
		$(".texteditcontent").hide();
		$(".texteditcontent"+flag).show();
		$(".imgadvice").html("图片建议400*400像素");
		$(".samePic").attr("src",$(this).parents(".duotuwenEvery:first").find(".logo").attr("src"));
		
		
	});
	var nowtype =".materialstype"+$("#materialstype").val();
	$(nowtype).click();
	
	var addArticlesDirect = $(".addArticlesDirect").val();
	if(addArticlesDirect==1){
		$("#only_tuwen").click();
	}else if(addArticlesDirect==2){
		$("#more_tuwen").click();
	}
	
	

	$(".cont_getdata").click(function(){
		//$(".Platform01").show();
		$(".Platform01").hide();
		$(".Progress_show").show();
		_progress();
	});
	$(".PlatSubmit").click(function(){
		us_busiid = $.trim($(".get_datauserid").val());
		us_businame = $.trim($(".get_datauserpwd").val());
		if(us_busiid == ""){
			$(".get_datauserid").focus();
			return false;
		}
		if(us_businame == ""){
			$(".get_datauserpwd").focus();
			return false;
		}
		
	});
	$(".addArticlesItem").live("click",function(){
		var newscount = $(".newscount").val();
		if(newscount>=7){
			$(".newscount").val(8);
			$(".addArticlesItem").hide();
		}else{
			$(".addArticlesItem").show();
			$(".newscount").val(Number(newscount)+1);
		}
		newContentForNewscount();
		
	});
	
	$(".removeArticle").live("click",function(){
		$(this).parents(".duotuwenEvery").remove();
		var articleSum = $(".newscount").val();
		$(".newscount").val(--articleSum);
		
		var nowarticle =$(this).attr("flag");
		var articles = new Array();
		for(var i=2;i<=8;i++){
			var article = $(".uploadarticleid"+i).val();
			var author =$(".author"+i).val();
			var sourceurl =$(".sourceurl"+i).val();
			var articleTitle =$(".title"+i).val();
			var articlePic = $(".duotuwenEvery"+i).find("img").attr("src");
			var articleFileid = $(".fileid"+i).val();
			var articleContent = $(".content"+i).val();
			var articleDesc =$(".description"+i).val();
			
			var pic = $(".articlePic"+i).val();
			
			var obj = new ObjArticles(article,articleTitle,articlePic,articleContent,pic,articleDesc,author,sourceurl,articleFileid);
			articles.push(obj);
		}
		articles.splice(nowarticle,1);
		
		for(var i=0;i<articles.length;i++){
			var flag = i+2;
			if(bro.msie) {
				$(".content"+flag).val(articles[i].articleContent);
			}else  if(bro.mozilla) {
				$(".content"+flag).html(articles[i].articleContent);
			}else if(bro.safari) {
				$(".content"+flag).html(articles[i].articleContent);
			}else  if(bro.opera) {
				$(".content"+flag).html(articles[i].articleContent);
		    }else{
		    	$(".content"+flag).html(articles[i].articleContent);
		    }
			$(".duotuwenEvery"+flag).find("img").attr("src",articles[i].articlePic);
			$(".uploadarticleid"+flag).val(articles[i].article);
    		$(".description"+flag).val(articles[i].articleDesc);
    		
        	$(".title"+flag).val(articles[i].articleTitle);
        	$(".articlePic"+flag).val(articles[i].articlePic);
        	$(".fileid"+flag).val(articles[i].articleFileid);
        	$(".articleTitleShow"+flag).val(articles[i].articleTitle);
        	
        	$(".author"+flag).val(articles[i].author);
        	$(".sourceurl"+flag).html(articles[i].sourceurl);
		}
			
		var newscount = $(".newscount").val();
		if(newscount>=8){
			$(".addArticlesItem").hide();
		}else{
			$(".addArticlesItem").show();
		}
	});

});
document.onkeydown = function (e) {
	var theEvent = window.event || e;
	var code = theEvent.keyCode || theEvent.which;
	if (code == 13) {
		var emid=".editefilename"+changemid;
		$(emid).blur();
	}
};
var ObjArticles = function(article,articleTitle,articlePic,articleContent,articleUrl,articleDesc,author,sourceurl,articleFileid){
	this.article=article;
	this.articleTitle =articleTitle;
	this.articlePic =articlePic;
	this.articleContent =articleContent;
	this.articleUrl =articleUrl;
	this.articleDesc = articleDesc;
	this.author =author;
	this.sourceurl= sourceurl;
	this.articleFileid= articleFileid;
	ObjArticles.prototype.run = function(){
		return this.title + this.desc;
	};
};

function newContentForNewscount(){
	var newscount = $(".newscount").val();
	var count =2;
	
	$(".duotuwenEvery").each(function(){
		var obj = $(this);
		var flag = obj.attr("flag");
		if(Number(flag)>Number(newscount)){
			obj.hide();
		}else{
			obj.show();
		}
		count++;
	});
	
	$(".moretuwen").each(function(){
		var obj = $(this);
		var flag = obj.attr("flag");
		if(Number(flag)>Number(newscount)){
			obj.hide();
		}else{
			obj.show();
		}
		
	});
	while(count<=newscount){
		$('<div class="Graphic_title_left_3 onlymore duotuwenEvery duotuwenEvery'+count+'" flag="'+count+'">'
					+'<p  class="articleTitleShow'+count+'">新标题</p>'
					+'<img class="logo"  src="/images/nophoto_50x50.PNG" />'
				+'<div class="GraphicOver"><div class="GraphicBg"></div><div class="GraphicShow"><label class="GraphicModify moretuwen" title="修改"  flag='+count+'></label>'
                +'<label class="GraphicDelete removeArticle" title="删除" flag='+count+'></label></div></div></div>').appendTo(".duotuwenImgs");
			
			
			$('<li class="moretuwen" flag="'+count+'"><font>第'+count+'篇</font><div></div></li>').appendTo(".duotuwen");
		
			count++;
	}
	if($(".moretuwen").last().attr("flag")==8){
		$(".moretuwen").last().css("borderRight","none");
	}
}