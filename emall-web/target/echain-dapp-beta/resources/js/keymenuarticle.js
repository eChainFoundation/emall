
var isUpdateQuizArticle=0;
//删除所有的图标
function removeBZ(menuid){
	
	$(".menu"+menuid).removeClass("voices");
	 $(".menu"+menuid).removeClass("video");
	 $(".menu"+menuid).removeClass("quiz");
	 $(".menu"+menuid).removeClass("dantuwen");
	 $(".menu"+menuid).removeClass("duotuwen");
	 $(".menu"+menuid).removeClass("yhq");
	 $(".menu"+menuid).removeClass("Less");
	 $(".menu"+menuid).removeClass("appurl");
	 $(".menu"+menuid).removeClass("chunwenben");
	 $(".menu"+menuid).removeClass("wallbz");
	 $(".menu"+menuid).removeClass("picture360Sort");
	 $(".menu"+menuid).removeClass("lbsbz");
	 $(".menu"+menuid).removeClass("bespeakbz");
	 $(".mnonum"+menuid).removeClass("picIndustryProduct");
	 $(".mnonum"+menuid).removeClass("wesite");
}


function saveMenu(title,menuid,menutype){
		if(menutype==1){
			
			//出文本
			$.ajax({
				url:"/ajax-mpmenukeyword.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"updateMenuText",
	                 		"menuid":menuid,
	                 		"menukeyword":$(".menukeyword").val(),
	                 		"menutitle":title,
	                 		"menucontent":content_3.html()
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 removeBZ(menuid);
	                		 $(".menu"+menuid).addClass("chunwenben");
	                		 
	                		 $(".menu"+menuid).find(".kwd").val(data.keyword);
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
			//单图文
			$.ajax({
				url:"/ajax-mpmenukeyword.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":op,
	                 		"menuid":menuid,
	                 		"menukeyword":$(".menukeyword").val(),
	                 		"menutitle":title,
	                 		"articleTitle":$(".title_article").val(),
	                 		"articleDesc":$(".description_article").val(),
	                 		"articleUrl":$(".articleUrl").val(),
	                 		"articlePic":$(".fileField").attr("src"),
	                 		"articleContent":articleContent,
	                 		"article":$(".article").val()
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 removeBZ(menuid);
	                		 if(menutype==9){
	                			 $(".menu"+menuid).addClass("memCard");
	                		 }else if(menutype==18){
	                			 $(".menu"+menuid).addClass("wesite");
	                		 }else{
	                			 $(".menu"+menuid).addClass("dantuwen");
	                		 }
	                		 
	                		 $(".menu"+menuid).find(".kwd").val(data.keyword);
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
             		"articleSum":articleSum
             		
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
				url:"/ajax-mpmenukeyword.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:data,
	                 success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 removeBZ(menuid);
	                		 $(".menu"+menuid).addClass("duotuwen");
	                		 $(".menu"+menuid).find(".kwd").val(data.keyword);
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
				url:"/ajax-mpmenukeyword.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"saveQuiz",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"articleTitle":$(".title_article").val(),
	                 		"articleDesc":$(".description_article").val(),
	                 		"articleUrl":$(".articleUrl").val(),
	                 		"articlePic":$(".fileField").attr("src"),
	                 		"articleContent":articleContent,
	                 		"article":$(".article").val(),
	                	 	"qid":qid
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 removeBZ(menuid);
	                		 $(".menu"+menuid).addClass("quiz");
	                		 $(".menu"+menuid).find(".kwd").val(data.keyword);
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
				url:"/ajax-mpmenukeyword.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"saveVoices",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"voiceid":voiceid
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 removeBZ(menuid);
	                		 $(".menu"+menuid).addClass("voices");
	                		
	                		 $(".menu"+menuid).find(".kwd").val(data.keyword);
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
				url:"/ajax-mpmenukeyword.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"saveVoices",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"voiceid":videoid
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 
	                		 removeBZ(menuid);
	                		 $(".menu"+menuid).addClass("video");
	                		 $(".menu"+menuid).find(".kwd").val(data.keyword);
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
		     			    	$(".alertSimple").show();
		                	 }
	                 
	                 }
	         });
		}else if(menutype==8 || menutype ==14 || menutype ==16 || menutype ==17 || menutype==13){
			var appurl = $(".appUrl").val();
			var keepalive =1;
			if(menutype==14){
				var id_360 = $(".360AllPictureid").val();
				if(id_360==0){
				    $("body").tip({ynclose : 'y',status : "error",content :"请选择一个360度全景视图！"});
				    return false;
				}
				keepalive =0;
				appurl = $(".bappAddress").val()+"bapp/prospectPicture.action?id="+id_360+"&url="+$(".360AllPictureUrl").val();
			}else if(menutype ==16){
				var id_360 = $(".lbsid").val();
				if(id_360==0){
				    $("body").tip({ynclose : 'y',status : "error",content :"请选择一个LBS！"});
				    return false;
				}
				keepalive =1;
				appurl = $(".bappAddress").val()+"wall-lbs/lbs.action?sortid="+id_360;
			}else if(menutype==17){
				var bespeakid = $(".bespeakid").val();
				if(bespeakid==0){
					$("body").tip({ynclose : 'y',status : "error",content :"请选择一个微预约！"});
				    return false;
				}
				keepalive =0;
				if($(".bespeakurl").val().indexOf("http:")>=0){
					appurl = $(".bespeakurl").val()+"?bespeakid="+bespeakid;
				}else{
					appurl = $(".wedutyAddress").val()+$(".bespeakurl").val()+"?bespeakid="+bespeakid;
				}
				
			}else if(menutype==13){
				if($(".industryProductUrl").val()==""){
					isUpdate=1;
					$("body").tip({ynclose : 'y',status : "error",content :"请选择一个商品！"});
			    	return false;
				}
				keepalive =0;
				appurl =$(".bappAddress").val()+"bapp/industryProduct.action?"+$(".industryProductUrl").val();
			}
			
			$.ajax({
				url:"/ajax-mpmenukeyword.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"updateAppurl",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"appurl":appurl,
	                	 	"keepalive":keepalive
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 
	                		 removeBZ(menuid);
	                		 if(menutype == 14){
	                			 $(".menu"+menuid).addClass("picture360Sort");
	                		 }else if(menutype == 16){
	                			 $(".menu"+menuid).addClass("lbsbz");
	                		 }else if(menutype == 17){
	                			 $(".menu"+menuid).addClass("bespeakbz");
	                		 }else if(menutype == 13){
	                			 $(".menu"+menuid).addClass("picIndustryProduct");
	                		 }else{
	                			 $(".menu"+menuid).addClass("appurl");
	                		 }
	                		 
	                		 $(".menu"+menuid).find(".kwd").val(data.keyword);
	                		 
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code);
		     			    	$(".alertSimple").show();
		                	 }
	                 
	                 }
	         });
			
		}else if(menutype==10  || menutype==15){
			var appurl="";
			var keepalive =0;
			if(menutype==10){
				if($(".couponid").length==0){
					$("body").tip({ynclose : 'y',status : "error",content :"当前并没有优惠券！"});
			    	return false;
				}
				var list= $('input:radio[name="couponid"]:checked').val(); 
		         if(list==null){ 
		        	 $("body").tip({ynclose : 'y',status : "error",content :"请选择优惠券！"});
				    	return false;
		         } 
		        
				var couponid =$("input[name='couponid']:checked").val(); 
				appurl = $(".wedutyAddress").val()+"/couponGetCode.action?couponid="+couponid;
			}else if(menutype==15){
				if($(".wallid").length==0){
					 $("body").tip({ynclose : 'y',status : "error",content :"当前并没有微信墙！"});
			    	return false;
				}
				var list= $('input:radio[name="wallid"]:checked').val(); 
		         if(list==null){ 
		        	 $("body").tip({ynclose : 'y',status : "error",content :"请选择微信墙！"});
				    	return false;
		         } 
		         keepalive =1;
				var couponid =$("input[name='wallid']:checked").val(); 
				appurl = $(".bappAddress").val()+"/wall-lbs/wall.action?wall_id="+couponid;
			}
			
			
			$.ajax({
				url:"/ajax-mpmenukeyword.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"updateAppurl",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"appurl":appurl,
	                	 	"keepalive":keepalive
	                	 	
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 
	                		 removeBZ(menuid);
	                		 if(menutype == 10){
	                			 $(".menu"+menuid).addClass("yhq");
	                			
	                		 }else if(menutype==15){
	                			 $(".menu"+menuid).addClass("wallbz");
	                		 }
	                		 
	                		
	                		 $(".menu"+menuid).removeClass("quiz");
	                		 $(".menu"+menuid).find(".kwd").val(data.keyword);
	                		 
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
 


function showMenu(menuid){

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
 	content_end.html("");
 	content_3.html("");
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
	isUpdateQuizArticle=0;
	$(".start_modefiy").show();
	$(".changeOtherActivity").hide();
	$.ajax({
		url:"/ajax-mpmenukeyword.action",
             type:"POST",dataType:"json",
             timeout:"10000",
             async: "true",
           
             data:{	"op":"selectbymenuid",
             		"menuid":menuid
             },success:function(data){
             	if(data.code=="A00006"){
             		$(".user_talk").hide();
             		
             		$(".allContent").show();
             		$(".edit_tip").hide();
             		type =data.type;
             		$(".menukeyword").val(data.keyword);
             		$(".menutitle").val(data.title);
             		$(".menuUpdateTop").show();
             		$(".start_modefiy").show();
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
             			getArticles(data);
             			
             		}else if(data.type==2){
             			getArticle(data,2);
             			
             		}else if(data.type==1){
             			
             			$(".user_talk4").show();
             			content_3.html(data.content);
             			$(".menuType").val(1);
             			$(".menuTypeText").hide();
             			$(".menuType").parents(".hsborder:first").show();
             		}else if(data.type==5){
             			$(".menuTypeText").hide();
             			$(".menuType").val(5);
             			showQuiz(data.pageNo,data.qid,"",0);
             			
             			getArticle(data,5,0);
             			$(".only_test").hide();
             			$(".start_modefiy").hide();
             			$(".changeOtherActivity").show();
             			isUpdateQuizArticle=1;
             			
             			
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
             			$(".start_modefiy").hide();
             			getArticle(data,data.type,0,1);
             		}else if(data.type==10){
             			showCoupon(data.pageNo,data.couponid,"");
            			$(".coupon").show();
            			$(".menuType").val(10);
             		}else if(data.type==14){
             			$(".360AllPictureid").val(data.pictureid);
             			$(".360AllPictureUrl").val(data.pictureurl);
             			AllPicture_360_show(data.pictureid);
             		}else if(data.type==13){
             			$(".industryProductUrl").val(data.industryProductUrl);
             			$(".industryProductid").val(data.industryProductid);
             			showIndustryProduct(data.industryProductid);
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






	