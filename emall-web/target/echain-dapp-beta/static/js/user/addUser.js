$(function() {

	//检查学号是否可用（是否重复，"1":重复，"0":可用（未重复））
	$("#studentNumber").blur(function(){		
		var $studentNumber = $(this).val();
		if($studentNumber == ""){
			return;
		}
	    $.get("/user/addUser/checkStudentNumber",{"studentNumber":$studentNumber},function(data){//ajax operate start
    		if(data=="0"){ 
    		 $('#studentNumber_span').checkOk('#studentNumber_span','学号可用');
			}else{
			$('#studentNumber_span').checkError('#studentNumber_span',"学号(" + $studentNumber + ")已经存在，请重新输入！ ");
			}
          },"text");//ajax operate end
	});

	$('#button').click(function() {
        //if(check()){//如果验证通过
        //当检验userName和password文本框内容均非空时设置errorMessage的可见性为true
        //$(errorMessage).css('visibility','visible');
        //$(errorMessage).text('');
        //发送ajax请求
    	 $.post("/user/add",$('#form01').serialize(),function(data){//ajax operate start
           //检查是否添加成功（是否重复，"1":成功，"0":失败）
    		if(data=="0"){  
    		 alert("sorry,添加失败！");  
			}else {
			 alert("添加成功！");
				$("#reset").click();//天
			}// if end
          },"text");//ajax operate end
       //} 
      });//click end

	//检验各字段是否为空
	function check(){	
		var ok =
		$("#studentNumber").notNullRequired('#studentNumber_span','用户名不能为空')
		&$("#realName").notNullRequired('#realName_span','密码不能为空');
		return ok;
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




