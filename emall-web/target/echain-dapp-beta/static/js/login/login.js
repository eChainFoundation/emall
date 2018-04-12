$(function() {
alert(1111111111);
	$('#button').click(function() {
        //RSA加密
        RSAEncrypt();
        if(check()){//如果用户名和密码均不为空
        //当检验userName和password文本框内容均非空时设置errorMessage的可见性为true
       // $(errorMessage).css('visibility','visible');
        //$(errorMessage).text('');
        	//发送ajax请求
    	 $.post("/login",$("#form").serialize(),function(data){
           //-1 有角色，角色没有对应的功能(func_url) ；-2 没有角色 ;   -3 系统错误 ; -4 用户或密码错误 0 success ，func_url put redis
    		if(data=="0"){  
    		 	var url="";
        		if(locationUrl.indexOf("url=")!=-1){		//链接到原先访问地址        			
            			url = locationUrl.substring(locationUrl.indexOf("url=")+4,locationUrl.length);
	            	}
        		if(url==null  || url ==""){
        			window.location.href="/Home/home";
        		}else{
        			window.location.href=url;
        		}
		}else if(data=="-1"){
			$("#errorMessage").text("有角色，角色没有对应的功能(func_url)");
		}else if(data=="-2"){
			$("#errorMessage").text("没有角色");
		}else if(data=="-3"){
			$("#errorMessage").text("系统错误");
		}else if(data=="-4"){
			$("#errorMessage").text("用户名或密码错误，请重新输入");
		}
          },"text");//ajax operate end
        
        }//if end 
	});//click end
	
	 	//RSA加密function
        function RSAEncrypt(){
			//var thisPwd = document.getElementById("password").value; 
			var thisPwd = $("#password").val();
			//bodyRSA();  
			var key ;  
			setMaxDigits(130);
			key = new RSAKeyPair ($("#exponent").val(),"",$("#modulus").val());
			var result = encryptedString(key, encodeURIComponent(thisPwd));  
			$("#encryptPassword").val(result);
			//alert(result);
	 	}
	//当userName和password文本框获得或者失去焦点时设置errorMessage的可见性为false
	//$("#userName").blur(function(){		
	//	$(this).notNullRequired('#user_name_span','用户名不能为空');
	//});
	//$("#password").blur(function(){		
	//	$(this).notNullRequired('#password_span','密码不能为空');
	//});
	//当userName和password文本框获得焦点时设置errorMessage的可见性为false
	$("#userName").focus(function(){		
	    $(errorMessage).css('visibility','hidden');
	});
	$("#password").focus(function(){		
	    $(errorMessage).css('visibility','hidden');
	});
		
	//检验用户名和密码是否为空function
	function check(){	
		var ok =
		$("#userName").notNullRequired('#user_name_span','用户名不能为空')
		&$("#password").notNullRequired('#password_span','密码不能为空');
		return ok;
	}
	
	
	
	 //监视回车建按下并出发button的click事件
	 document.onkeydown=function(e){
        var isie = (document.all) ? true:false;
        var key;
        var ev;
        if(isie){//IE浏览器
        	key = window.event.keyCode;
        	ev = window.event;
        }else{//火狐浏览器
        	key = e.which;
       	    ev = e;
        }
        //key为13表示按下的为回车建
        if(key==13){//IE浏览器
        if(isie){
            document.getElementById("button").click();
        }else{//火狐浏览器
            document.getElementById("button").click();
       		 }
       	  }
        };



});	
