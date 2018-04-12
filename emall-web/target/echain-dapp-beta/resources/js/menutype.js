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


