var isUpdateQuizArticle=0;
$(document).keydown(function(e){
	var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which;
    if(!$(".view_toggle_btn_2").is(":hidden")){
		if (code == 13) {
			$(".mysend_send_m").click();
	        return false;
	    }
    }
});

function savemainMenu(data,menuid){
	if(data.isNeedFlushCustomMenu=="1" && $(".isopenCustomMenu").val()==1){
		
		$(".needFreshCustomMenu").html('<font style="float: left; margin: 5px 0px 0px 10px;">提示：自定义菜单编辑后点击</font><font color="red" style="float: left;margin:5px 0px 0px 0px; cursor: pointer;" class="Syncbtns">同步公众平台</font><font style="float: left;margin:5px 0px 0px 0px;">按钮将在24小时后对所有用户生效或重新关注亦可生效。</font>');
		
		$(".Syncbtns").show();
	}
	 if(data.isnew==0){
		 $(".allMenus").children(".addMain").each(function(){
			var nn= $(this);
			 var menuorder = $(this).find("font").attr("menuorder");
			if(menuorder==data.menuorder){
				 nn.empty();
				 $('<font menuorder='+data.menuorder+' class="Modify Modify'+data.menuid+'" menuid='+data.menuid+' title='+data.title+'>'+data.title+'</font>').appendTo(nn);
	  			$('<dl class="subMenus"><dt class="addMenu">添加</dt><span><img width="9" height="6" src="/custommenu/images/CustomLt23.png"></span></dl><img src="/custommenu/images/CustomLt22.png" width="9" height="9" class="CustomDelete" />').appendTo(nn);
	         	
	  			nn.removeClass("addMain");
			}
		 });
		 
		
	 }
	 $(".menuid").val(data.menuid);
	 if(data.menuparentid==0 && (data.bappurl==null || data.bappurl=="" )){
		 $(".Modify"+data.menuid).parent().find(".subMenus").find(".addMenu").show();
		 $(".Modify"+data.menuid).parent().find(".subMenus").find("span").show();
		 
	 }
	 
	 if(data.menuparentid==0 && (data.bappurl!="" || data.content!="")){
		 $(".Modify"+data.menuid).parent().find(".subMenus").find(".addMenu").hide();
		 $(".Modify"+data.menuid).parent().find(".subMenus").find("span").hide();
	 }
	 
	 if(menuid==0){
			var sm = $('.Modify'+data.menuparentid).parent().find(".subMenus");
			$('<dd ><font class="Modify Modify'+data.menuid+'" menuorder='+data.menuorder+' menuid='+data.menuid+' title='+data.title+'>'+data.title+'</font><img src="/custommenu/images/CustomLt22.png" width="9" height="9" class="CustomDelete" /></dd>').appendTo(sm);
		
			var dt = sm.find("dt");
			dt.prependTo(sm);
			sm.children("dd").css("border-top","none");
			sm.children("dd:first").css("border-top","1px solid #bababa");
		 }
		 if(data.psize>=5){
			 $(".Modify"+data.menuid).parents(".subMenus:first").find(".addMenu").hide();
		 }else{
			 $(".Modify"+data.menuid).parents(".subMenus:first").find(".addMenu").show();
		 }
	
}
function saveMenu(title,menuid,menutype,menuparentid,menuorder){
		if(menutype==1){
			//isHasSubMenu==0 && 
			if(needTextContent==1 && $.trim(content_3.text())==""){
				isUpdate=1;
        		$(".alertSimpleContent").html("请填写文本内容！");
			    $(".alertSimple").show();
			    return false;
			}
			//出文本
			$.ajax({
				url:"/ajax-custommenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"updateMenuText",
	                 		"menuid":menuid,
	                 		"menukeyword":$(".menukeyword").val(),
	                 		"menutitle":title,
	                 		"menuparentid":menuparentid,
	                 		"menuorder":menuorder,
	                 		"menucontent":content_3.html()
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 $(".r_title").hide();
	                		 
	                		 $(".Modify"+menuid).html(title);
		                		 
	                		 savemainMenu(data,menuid);
	                		 
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
	                		 	isUpdate=1;
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code+"<br>"+data.errormsg);
		     			    	$(".alertSimple").show();
		                }
	                 
	                 }
	         });
			
		}else if(menutype==2 || menutype==9 || menutype==18){
			var titlesum = $.trim($(".title_article").val());
			
			if(titlesum=="" || titlesum.length>36){
				isUpdate = 1;
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
				url:"/ajax-custommenu.action",
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
	                 		"menuparentid":menuparentid,
	                 		"article":$(".article").val(),
	                 		"menuorder":menuorder
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 $(".r_title").hide();
	                		 $(".Modify"+menuid).html(title);
	                		 savemainMenu(data,menuid);
	                		
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
	                		isUpdate=1;
	                		$(".alertSimpleContent").html("发生错误！code:"+data.code+"<br>"+data.errormsg);
	     			    	$(".alertSimple").show();
	                	 }
	                 
	                 }
	         });
		}else if(menutype==3){
			var titlesum = $.trim($(".articleTitle0").val());
			if(titlesum=="" || titlesum.length>36){
				isUpdate=1;
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
			    	isUpdate=1;
			    	return false;
				}
			}
			
			var data ={
					"op":"updateMenuAndArticles",
             		"menuid":menuid,
             		"menukeyword":$(".menukeyword").val(),
             		"menutitle":title,
             		"articleSum":articleSum,
             		"menuparentid":menuparentid,
             		"menuorder":menuorder
             		
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
				url:"/ajax-custommenu.action",
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
	                		 $(".r_title").hide();
	                		 $(".Modify"+menuid).html(title);
	                		 savemainMenu(data,menuid);
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
	                		 isUpdate=1;
	                		$(".alertSimpleContent").html("发生错误！code:"+data.code+"<br>"+data.errormsg);
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
	        	 isUpdate=1;
	         		$(".alertSimpleContent").html("请选择一个互动活动！");
			    	$(".alertSimple").show();
			    	return false;
	         } 

			var qid =$("input[name='qid']:checked").val(); 
			$.ajax({
				url:"/ajax-custommenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"saveQuiz",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"qid":qid,
	                	 	"menuparentid":menuparentid,
	                	 	"articleTitle":$(".title_article").val(),
	                 		"articleDesc":$(".description_article").val(),
	                 		"articleUrl":$(".articleUrl").val(),
	                 		"articlePic":$(".fileField").attr("src"),
	                 		"articleContent":articleContent,
	                 		"menuparentid":menuparentid,
	                 		"article":$(".article").val(),
	                	 	"menuorder":menuorder
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 $(".r_title").hide();
	                		 $(".Modify"+menuid).html(title);
	                		 
	                		 savemainMenu(data,menuid);
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
	                		 isUpdate=1;
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code+"<br>"+data.errormsg);
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
	        	 isUpdate=1;
	         		$(".alertSimpleContent").html("请选择语音！");
			    	$(".alertSimple").show();
			    	return false;
	         } 
	        
			var voiceid =$("input[name='voiceid']:checked").val(); 
			$.ajax({
				url:"/ajax-custommenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"saveVoices",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"voiceid":voiceid,
	                	 	"menuparentid":menuparentid,
	                	 	"menuorder":menuorder
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 $(".r_title").hide();
	                		 $(".Modify"+menuid).html(title);
	                		 
	                		 savemainMenu(data,menuid);
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
	                		 isUpdate=1;
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code+"<br>"+data.errormsg);
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
        	 	isUpdate=1;
         		$(".alertSimpleContent").html("请选择视频！");
		    	$(".alertSimple").show();
		    	return false;
	         } 
	        
			var videoid =$("input[name='videoid']:checked").val(); 
			$.ajax({
				url:"/ajax-custommenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"saveVoices",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"voiceid":videoid,
	                	 	"menuparentid":menuparentid,
	                	 	"menuorder":menuorder
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 $(".r_title").hide();
	                		 $(".Modify"+menuid).html(title);
	                		 
	                		 savemainMenu(data,menuid);
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
	                		 isUpdate=1;
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code+"<br>"+data.errormsg);
		     			    	$(".alertSimple").show();
		                	 }
	                 
	                 }
	         });
		}else if(menutype==8 || menutype==12 || menutype==14 || menutype ==16 || menutype==17 || menutype==13){
			
			var keepalive =0;
			var appurl;
			if(menutype==8){
				appurl = $(".appUrl").val();
			}else if(menutype==12){
				if($(".commonMenuid").val()==0){
					isUpdate=1;
					$(".alertSimpleContent").html("没有选择相应的菜单！");
 			    	$(".alertSimple").show();
 			    	return false;
				}
				appurl = "mpmenu://"+$(".commonMenuid").val();
			}else if(menutype==14){
				var id_360 = $(".360AllPictureid").val();
				if(id_360==0){
					isUpdate=1;
	        		$(".alertSimpleContent").html("请选择一个360度全景视图！");
				    $(".alertSimple").show();
				    return false;
				}
				appurl = $(".bappAddress").val()+"bapp/prospectPicture.action?id="+id_360+"&url="+$(".360AllPictureUrl").val();
			}else if(menutype==16){
				var id_360 = $(".lbsid").val();
				if(id_360==0){
					isUpdate=1;
	        		$(".alertSimpleContent").html("请选择一个LBS！");
				    $(".alertSimple").show();
				    return false;
				}
				keepalive =1;
				appurl = $(".bappAddress").val()+"wall-lbs/lbs.action?sortid="+id_360;
			}else if(menutype==17){
				var bespeakid = $(".bespeakid").val();
				if(bespeakid==0){
					isUpdate=1;
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
				url:"/ajax-custommenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"updateAppurl",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"appurl":appurl,
	                	 	"menuparentid":menuparentid,
	                	 	"menuorder":menuorder,
	                	 	"keepalive":keepalive
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 $(".r_title").hide();
	                		 $(".Modify"+menuid).html(title);
	                		 
	                		 savemainMenu(data,menuid);
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
	                		 isUpdate=1;
		                	 $(".alertSimpleContent").html("发生错误！code:"+data.code+"<br>"+data.errormsg);
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
			    	isUpdate=1;
			    	return false;
				}
				var list= $('input:radio[name="couponid"]:checked').val(); 
		         if(list==null){ 
		        	 	isUpdate=1;
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
			    	isUpdate=1;
			    	return false;
				}
				keepalive = 1;
				var list= $('input:radio[name="wallid"]:checked').val(); 
		         if(list==null){ 
		        	 	isUpdate=1;
		         		$(".alertSimpleContent").html("请选择微信墙！");
				    	$(".alertSimple").show();
				    	return false;
		         } 
		        
				var couponid =$("input[name='wallid']:checked").val(); 
				appurl = $(".bappAddress").val()+"/wall-lbs/wall.action?wall_id="+couponid;
			}
			
			
			$.ajax({
				url:"/ajax-custommenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"updateAppurl",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"appurl":appurl,
	                	 	"keepalive":keepalive,
	                	 	"menuparentid":menuparentid,
	                	 	"menuorder":menuorder
	                	 	
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 $(".r_title").hide();
	                		 $(".Modify"+menuid).html(title);
	                		 savemainMenu(data,menuid);
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
	                		 	isUpdate=1;
		                		$(".alertSimpleContent").html("发生错误！code:"+data.code+"<br>"+data.errormsg);
		     			    	$(".alertSimple").show();
		                	 }
	                 
	                 }
	         });
			
		}else if( menutype==11){
			if($.trim($(".otherLink").val())==""){
				isUpdate=1;
        		$(".alertSimpleContent").html("链接地址不能为空！");
			    $(".alertSimple").show();
			    return false;
			}
			$.ajax({
				url:"/ajax-custommenu.action",
	                 type:"POST",dataType:"json",
	                 timeout:"10000",
	                 async: "true",
	               
	                 data:{	"op":"updateLink",
	                	 	"menuid":menuid,
	                	 	"menutitle":title,
	                	 	"menukeyword":$(".menukeyword").val(),
	                	 	"appurl":"",
	                	 	"menuparentid":menuparentid,
	                	 	"menuorder":menuorder,
	                	 	"keepalive":0,
	                	 	"menucontent":$(".otherLink").val()
	                 },success:function(data){
	                	 if(data.code=="A00006"){
	                		 $(".allContent").hide();
	                		 $(".user_talk").hide();
	                		 $(".edit_tip").show();
	                		 $(".modefy_tip").hide();
	                		 $(".save_cunc").show();
	                		 $(".r_title").hide();
	                		 $(".Modify"+menuid).html(title);
	                		 
	                		 savemainMenu(data,menuid);
	                	 }else if(data.code=="A00004"){
	                		 location.href="/login.jsp";
	                	 }else{
	                		 isUpdate=1;
		                	 $(".alertSimpleContent").html("发生错误！code:"+data.code+"<br>"+data.errormsg);
		     			     $(".alertSimple").show();
		                 }
	                 
	                 }
	         });
			
		}
		
		
 }
 function flushmenu(){
	 	$(".fileField").attr("src","/func/images/upimg.png");
		
		$(".articleTitle0").val("");
		$(".articlePic0").attr("src","/func/images/upimg.png");
		
		for(var i=1;i<=7;i++){
			$(".articleTitle"+i).val("");
			$(".articlePic"+i).attr("src","/func/images/upimg2.png");
		}
		for(var i=0;i<=7;i++){
			$(".article"+i).val(0);
			$(".articleUrl"+i).val("");
		}
		$(".articleUrl").val("");
		$(".article").val(0);
		
		content_start.html("");
	 	content_end.html("");
	 	content_3.html("");
	 	content_menu.html("");
	 	isUpdateQuizArticle=0;
	 	
	 	$(".articleUrlModelValue").val("http://");
	 	$(".articleContent").html("");
	 	$(".articleContent0").html("");
	 	$(".articleContent1").html("");
	 	$(".articleContent2").html("");$(".articleContent3").html("");$(".articleContent4").html("");$(".articleContent5").html("");
	 	$(".articleContent6").html("");$(".articleContent7").html("");
		$(".title_article").val("");
		$(".description_article").val("");
		
		$(".start_modefiy").show();
		$(".changeOtherActivity").hide();
		
		$(".360AllPictureid").val(0);
	 	$(".lbsid").val(0);
	 	$(".bespeakid").val(0);
	 	$(".bespeakurl").val("");
	 	$(".360AllPictureUrl").val("");
	 	
		
		$(".mdfy").parent().find(".checkCommonMenu").remove();
		$("ul").removeClass("checkCommonMenuColor");
 }

function flushDiv(){
		$(".user_talk").hide();
		$(".Initialize").hide();
		$(".allContent").show();
		$(".edit_tip").hide();
		
		$(".menuUpdateTop").show();
		$(".start_modefiy").show();
		$(".r_title").show();
		//$(".menuType").find(".menuTypeText").remove();
		$(".select_btn_s").hide();
}
function showMenu(menuid){
	$(".CustomPROOF_view").slideUp("slow");
	flushmenu();
	$.ajax({
		url:"/ajax-custommenu.action",
             type:"POST",dataType:"json",
             timeout:"10000",
             async: "true",
           
             data:{	"op":"selectbymenuid",
             		"menuid":menuid
             },success:function(data){
             	if(data.code=="A00006"){
             		flushDiv();
             		type =data.type;
             		$(".select_menu").hide();
             		$(".menuparentid").val(data.parentid);
             		$(".menutitle").val(data.title);
             		
             		if(data.parentid==0){
             			var sm = $('.Modify'+data.id).parent().find(".subMenus");
             			sm.empty();
             			
             			if(data.submenus.length==0){
                        	$(".select_menu").show();
                        }else{
                        	$(".select_menu").hide();
                        }
             			if(data.type==1 && data.content==""){
                    		$(".nohasSubMenu").click();
                    		if(data.submenus.length<5){
                 				$('<dt class="addMenu">添加</dt>').appendTo(sm);
                 			}else{
                 				$('<dt class="addMenu" style="display:none;">添加</dt>').appendTo(sm);
                 			}
                    	}else{
                    		$(".hasSubMenu").click();
                    	}
             			
             			for(var i=0;i<data.submenus.length;i++){
             				
             				if(data.submenus.length==5 && i==0){
             					$('<dd style="border-top:1px solid #bababa;"><font class="Modify Modify'+data.submenus[i].id+'" menuorder='+data.submenus[i].menuorder+' menuid='+data.submenus[i].id+' title='+data.submenus[i].title+'>'+data.submenus[i].title+'</font><img src="/custommenu/images/CustomLt22.png" width="9" height="9" class="CustomDelete" /></dd>').appendTo(sm);
             				}else{
             					$('<dd ><font class="Modify Modify'+data.submenus[i].id+'" menuorder='+data.submenus[i].menuorder+' menuid='+data.submenus[i].id+' title='+data.submenus[i].title+'>'+data.submenus[i].title+'</font><img src="/custommenu/images/CustomLt22.png" width="9" height="9" class="CustomDelete" /></dd>').appendTo(sm);
             				}
             				
             			}
             			
                    	if(data.bappurl!="" || data.content!=""){
                    		$('<span style="display:none;"><img src="/custommenu/images/CustomLt23.png" width="9" height="6" /></span>').appendTo(sm);
                    	}else{
                    		$('<span><img src="/custommenu/images/CustomLt23.png" width="9" height="6" /></span>').appendTo(sm);
                    	}
                        
             		}else{
             			$(".user_talk4").children("div").show();
             			
             		}
             		$(".user_talk").hide();
             		if(data.type==3){
             			getArticles(data);
             			
             		}else if(data.type==2){
             			getArticle(data,2,0,1);
             			
             		}else if(data.type==1){
             			
             			$(".user_talk4").show();
             			$(".menuType").val(1);
             			content_3.html(data.content);
             			$(".menuType").parents(".hsborder:first").show();
             			
             			if(data.type==1 && data.content==""){
                    		$(".nohasSubMenu").click();
                    	}else{
                    		
                    	}
             		}else if(data.type==5){
             			$(".menuType").val(5);
             			
             			showQuiz(data.pageNo,data.qid,"",0);
             			getArticle(data,5,0);
             			
             			$(".start_modefiy").hide();
             			$(".changeOtherActivity").show();
             			$(".only_test").hide();
             			isUpdateQuizArticle=1;
             			
             		}else if(data.type==6){
             			showVoice(data.pageNo,data.mid);
             			$(".menuType").val(6);
             		}else if(data.type==8){
             			$(".D_interface").show();
             			$(".appUrl").val(data.appurl);
             			$(".menuType").val(8);
             		}else if(data.type==7){
             			$(".quiz_Videos").show();
             			showVideo(data.pageNo,data.mid);
             			$(".menuType").val(7);
             		}else if(data.type==9 || data.type==18){
             			$(".start_modefiy").hide();
             			getArticle(data,data.type,0,1);
             		}else if(data.type==10){
             			showCoupon(1,data.couponid,"");
            			$(".coupon").show();
            			$(".menuType").val(10);
             		}else if(data.type==12){
             			$(".menuType").val(12);
             			$(".quiz_Main").show();
             			$(".commonMenuid").val(data.commonmenuid);
             			if($(".mnonum"+data.commonmenuid).length>0){
             				$(".mnonum"+data.commonmenuid).parent().find(".mdfy").css("color","red");
             				if($(".mnonum"+data.commonmenuid).parent().find(".checkCommonMenu").length==0)
             					$('<span class="checkCommonMenu"></span>').appendTo($(".mnonum"+data.commonmenuid).parent());
             				$(".mnonum"+data.commonmenuid).parents("ul:first").addClass("checkCommonMenuColor");
             			}else{
             				getCommonParentid(data);
             			}
             		}else if(data.type==11){
             			/*if(data.content==$(".wSiteAddress").val()){
             				document.getElementById("toWeSite").checked = true;
             				
             				$(".otherLink").attr("readonly","readonly");
             			}else{
             				document.getElementById("toOtherLink").checked = true;
             				$(".otherLink").attr("readonly",false);
             			}*/
             			$(".otherLink").val(data.content);
             			$(".quiz_Link").show();
             			$(".menuType").val(11);
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
             
             	}else if(data.code=="A00004"){
            		 location.href="/login.jsp";
            	}else{
            		$(".alertSimpleContent").html("发生错误！code:"+data.code+"<br>"+data.errormsg);
 			    	$(".alertSimple").show();
            	}
             }
	});

}

function jump(count,data) {  
	var time =1000; 
	setTimeout(function(){  
		
		if(count >= 0) {  
			if($(".Expansion"+data.ps[count].ps).parents("ul:first").find("ul").length==0){
				$(".Expansion"+data.ps[count].ps).click();
				
			}else{
				time=0;
			}
			
			count--;  
			jump(count,data);
		} else {  
			$(".mnonum"+data.commonmenuid).parent().find(".mdfy").css("color","red");
			if($(".mnonum"+data.commonmenuid).parent().find(".checkCommonMenu").length==0)
				$('<span class="checkCommonMenu"></span>').appendTo($(".mnonum"+data.commonmenuid).parent());
			$(".mnonum"+data.commonmenuid).parents("ul:first").addClass("checkCommonMenuColor");
		}  
	}, time);  
}  

function getCommonParentid(data){
	
		var count =data.ps.length-1;
		jump(count,data); 
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
	
	
	//预览
	$(".view_btn").click(function(){
		$(".Custom_view").empty();
		$(".CustomPROOF_view").slideToggle("fast",function(){
			if($(this).is(":hidden")){
				$("html").stop().animate({scrollTop:"0px"},"slow");
			}else{
				$.ajax({
						url:"/ajax-custommenu.action",
						type:"post",
						dataType:"json",
						timeout:10000,
						data:{
							"op":"allCustomMenu"
						},success:function(data){
							if(data.code == "A00006"){
								
								$(".view_Custom").empty();
								// menu1
								try{
									var item0 = '<li>\
				               						<font menukey='+data.menus0[0].menukey+' >'+data.menus0[0].menutitle+'</font>\
				               						<dl>\
				               							<span>\
													        <img width="9" height="6" src="/custommenu/images/CustomLt23.png">\
													    </span>\
				               						</dl>\
				               					</li>';
				               		$(".view_Custom").append(item0);
				               		$(data.menus0).each(function(index,item){
				               			var item0_children = '<dd menukey='+item.menukey+'>\
														        <font>'+item.menutitle+'</font>\
														    </dd>\
														    ';
							            $(".view_Custom li").eq(0).find("dl").append(item0_children);	
					               						
				               		});
								}catch(err){
									for(var i=0;i<=2;i++){
						   				$(".view_Custom").find("li").eq(i).find("dd").eq(0).remove();
						   				$(".view_Custom").find("li").eq(i).find("dd").eq(0).css("borderTop","1px #BABABA solid");
						   				if($(".view_Custom").find("li").eq(i).find("dd").length == 0){
						       				$(".view_Custom").find("li").eq(i).find("dl").remove();
						       			}
								   	}
									return true;
								}
										
			               		// menu2
			               		try{
			               			var item1 = '<li>\
				               						<font menukey='+data.menus1[0].menukey+' >'+data.menus1[0].menutitle+'</font>\
				               						<dl>\
				               							<span>\
													        <img width="9" height="6" src="/custommenu/images/CustomLt23.png">\
													    </span>\
				               						</dl>\
				               					</li>';
				               		$(".view_Custom").append(item1);
				               		$(data.menus1).each(function(index,item){
				               			var item1_children = '<dd menukey='+item.menukey+'>\
														        <font>'+item.menutitle+'</font>\
														    </dd>\
														    ';
							            $(".view_Custom li").eq(1).find("dl").append(item1_children);	
					               						
				               		});
			               		}catch(err){
			               			for(var i=0;i<=2;i++){
						   				$(".view_Custom").find("li").eq(i).find("dd").eq(0).remove();
						   				$(".view_Custom").find("li").eq(i).find("dd").eq(0).css("borderTop","1px #BABABA solid");
						   				if($(".view_Custom").find("li").eq(i).find("dd").length == 0){
						       				$(".view_Custom").find("li").eq(i).find("dl").remove();
						       			}
								   	}
			               			return true;
			               		}
				               	// menu3		
			               		try{
			               			var item2 = '<li>\
					               						<font menukey='+data.menus2[0].menukey+' >'+data.menus2[0].menutitle+'</font>\
					               						<dl>\
					               							<span>\
														        <img width="9" height="6" src="/custommenu/images/CustomLt23.png">\
														    </span>\
					               						</dl>\
					               					</li>';
					               		$(".view_Custom").append(item2);
					               		$(data.menus2).each(function(index,item){
					               			
					               			var item2_children = '<dd menukey='+item.menukey+'>\
															        <font>'+item.menutitle+'</font>\
															    </dd>\
															    ';
								            $(".view_Custom li").eq(2).find("dl").append(item2_children);	
						               						
					               		});	
					               			
			               		}catch(err){
			               			for(var i=0;i<=2;i++){
						   				$(".view_Custom").find("li").eq(i).find("dd").eq(0).remove();
						   				$(".view_Custom").find("li").eq(i).find("dd").eq(0).css("borderTop","1px #BABABA solid");
						   				if($(".view_Custom").find("li").eq(i).find("dd").length == 0){
						       				$(".view_Custom").find("li").eq(i).find("dl").remove();
						       			}
								   	}	
			               			return true;
			               		}
				                	for(var i=0;i<=2;i++){
						   				$(".view_Custom").find("li").eq(i).find("dd").eq(0).remove();
						   				$(".view_Custom").find("li").eq(i).find("dd").eq(0).css("borderTop","1px #BABABA solid");
						   				if($(".view_Custom").find("li").eq(i).find("dd").length == 0){
						       				$(".view_Custom").find("li").eq(i).find("dl").remove();
						       			}
								   	}
			               
		               		
							}
						}
					});
					
			}
			
			$("html").stop().animate({scrollTop:"175px"},"slow");
			
		});
		
	});
 var MENUKEYS = "";  
 var menukey = "menukey";
 function Mysend(){
 		var nodeid = $(".nodeid").val();
		var businessid =$(".BusinessID").val();
		$.ajax({
				url:"http://"+nodeid+".mpb.weduty.com/mpsimulator.action?"+menukey+"="+MENUKEYS+"&businessid="+businessid,
				type:"get",
				dataType:"jsonp",
				timeout:10000,
				success:function(data){
					if(data.code == "A00006"){
						var view_s = $(data.showhtml).attr("class");
						if(view_s == "mulitnews"){
							
							var date = $(data.showhtml).attr("date");
							var title = $(data.showhtml).find("li").eq(0).find("a").html();
							var IMG_BIG = $(data.showhtml).find("li").eq(0).find("img").attr("src");
							var Summary = $(data.showhtml).find("span").html();
							var URL = $(data.showhtml).find("li").eq(0).find("a").attr("href");
							var each_item = $(data.showhtml).find("li:gt(0)");
							var min_cont = "";
							
							each_item.each(function(i){
								
								
								var min_srcs = $(this).find("img").attr("src");
								var min_urls = $(this).find("a").attr("href");
								var min_titls = $(this).find("a").html();
								  min_cont += '<div class="min-pic">\
													<a target="_blank" href="'+min_urls+'">\
														<img class="pic-boxmin" alt="图片" src="'+min_srcs+'">\
														<h5>'+min_titls+'</h5>\
													</a>\
												</div>';
												
								
							});	
							var mulitnews = '<div class="pic_more">\
												<div class="top-pict" ></div>\
													<div class="con-pict">\
														<a target="_blank" href="'+URL+'"><img class="pic-box" alt="图片" src="'+IMG_BIG+'"></a>\
														<div class="more-title">'+title+'</div>'+min_cont+'</div>\
												<div class="btm-pict" ></div>\
											</div>';
							$(".Custom_view").append(mulitnews);
							$(".Custom_view").scrollTop($(".Custom_view")[0].scrollHeight);	
							
						}else if(view_s == "singlenews"){
							var date = $(data.showhtml).attr("date");
							var title = $(data.showhtml).find("a").html();
							var IMG = $(data.showhtml).find("img").attr("src");
							var Summary = $(data.showhtml).find("span").html();
							var URL =  $(data.showhtml).find("a").attr("href");
							var singlenews = '<div class="pic_only">\
                               					<div class="top-pict"></div>\
                               					<div class="con-pict">\
                               						<strong class="matter-01">'+title+'</strong>\
													<h6>'+date+'</h6>\
													<img class="pic-box" src="'+IMG+'" alt="图片">\
													<div style="padding:5px;"><strong class="matter-02">'+Summary+'</strong></div>\
													<p class="matter-03">\
													<a target="_blank" href="'+URL+'">阅读全文</a>\
													</p>\
                               					</div>\
                               					<div class="btm-pict"></div>\
                               				</div>';
                             $(".Custom_view").append(singlenews);
                             $(".Custom_view").scrollTop($(".Custom_view")[0].scrollHeight);		
						}else{
							var content = data.showhtml ;
							if(content == ""){
								content = "内容正在建设中，请您稍后再试";
							}
							var reply = '<div class="reply">\
											<img src="images/ddhh2.jpg">\
											  <div class="poptip" style="margin-left:50px;">\
											        <span class="poptip-arrow poptip-arrow-left"><em>◆</em><i>◆</i></span>'+content+'</div>\
											<div class="container_clear"></div>\
										</div><div class="container_clear"></div>';	
								$(".Custom_view").append(reply);
								$(".Custom_view").scrollTop($(".Custom_view")[0].scrollHeight);		
						}
						
						
						
					}
				}
			});
	};
	$(".view_Custom").find("dd").die().live("click",function(event){
		  event.stopPropagation();    
		  $(this).parents("dl").slideUp();
		menukey = "menukey"; //用来区分是输入还是点击；
		MENUKEYS = $(this).attr("menukey");
		var menutitle = $(this).find("font").html();
		var mesend = '<div class="mesend">\
       					<img src="images/ddhh2.jpg">\
       					 <div class="poptip" style="float:right;margin-right:8px;">\
					        <span class="poptip-arrow poptip-arrow-right"><em>◆</em><i>◆</i></span>'+menutitle+'</div>\
       					<div class="container_clear"></div>\
       				</div>';
       		$(".Custom_view").append(mesend);
       		$(".Custom_view").scrollTop($(".Custom_view")[0].scrollHeight);	
			Mysend();
	});
	
	$(".view_Custom li").die().live('click',function(event){
		 event.stopPropagation(); 
		$(".view_Custom li").find("dl").slideUp("fast");
		$(this).find("dl").slideDown("fast");
		if($(this).find("dl").length == 0){
			menukey = "menukey"; //用来区分是输入还是点击；
			MENUKEYS = $(this).children("font").attr("menukey");
			var menutitle = $(this).children("font").html();
			var mesend = '<div class="mesend">\
	       					<img src="images/ddhh2.jpg">\
	       					 <div class="poptip" style="float:right;margin-right:8px;">\
						        <span class="poptip-arrow poptip-arrow-right"><em>◆</em><i>◆</i></span>'+menutitle+'</div>\
	       					<div class="container_clear"></div>\
	       				</div>';
	       		$(".Custom_view").append(mesend);
	       		$(".Custom_view").scrollTop($(".Custom_view")[0].scrollHeight);	
				Mysend();
		}
	});
	

	
	$(".view_toggle_btn_1").click(function(){
			$(".Custom_view").empty();
			$(this).hide();
			$(".view_toggle_btn_2").show();
			$(this).parent().find(".view_Custom").hide();
			$(this).parent().find(".view_Custom_test").show();
			$(this).parent().css({background:'url(images/send_tag_bg.png) -270px -2px no-repeat'});
			$(".view_Custom_test").find("input").focus();
			
		
	});
	
	$(".view_toggle_btn_2").click(function(){
		$(".Custom_view").empty();
			$(this).hide();
			$(".view_toggle_btn_1").show();
			$(this).parent().find(".view_Custom_test").hide();
			$(this).parent().find(".view_Custom").show();
			$(this).parent().css({background:'url(images/send_tag_bg.png) 0 -2px no-repeat'});
	});

	$(".mysend_send_m").click(function(event){
		event.stopPropagation();    
		$(this).prev().focus();
		menukey = "inputtext"; //用来区分是输入还是点击；
		MENUKEYS = $(this).prev().val();
		var reg = new RegExp (/^[A-Za-z0-9]+$/) ;
		if(!reg.test(MENUKEYS)){MENUKEYS=0;}
		tester = MENUKEYS=="" ? MENUKEYS=0 : MENUKEYS;
		var mesend2 = '<div class="mesend">\
       					<img src="images/ddhh2.jpg">\
       					 <div class="poptip" style="float:right;margin-right:8px;">\
					        <span class="poptip-arrow poptip-arrow-right"><em>◆</em><i>◆</i></span>'+MENUKEYS+'</div>\
       					<div class="container_clear"></div>\
       				</div>';
       		$(".Custom_view").append(mesend2);
       		$(".Custom_view").scrollTop($(".Custom_view")[0].scrollHeight);	
		Mysend();
		$(this).prev().val("");
	});
	
	
		
});









	