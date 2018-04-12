var nowSort;
function sort(pid,businessid,classpid,issort){
	
	 $.ajax({
        url:"/mpmenu.action",
        type:"POST",dataType:"json",
        timeout:"1000",
        async: "true",
        cache:false,
        data:{"parentid":pid,
       	 	"businessid":businessid,
         		"op":"listSubRoot"},
        success:function(data){
            if(data.code=="A00006"){
				for(var i=0;i<data.result.length;i++){
					var  tuwen ;
					var addmenus='';
					if(data.result[i].type==1){//纯文本
						tuwen = 'chunwenben';
						addmenus = '<label class="HomeAdd add hovershow" parentid="'+data.result[i].menuid+'" title="添加子菜单"></label>';
					}else if(data.result[i].type==2){//单图文
						tuwen = 'dantuwen';
					}else if(data.result[i].type==3){
						tuwen = 'duotuwen';
					}else if(data.result[i].type==5){
						tuwen = 'quiz';
					}else if(data.result[i].type==6){
						tuwen = 'voices';
					}else if(data.result[i].type==9){
						tuwen = 'memCard';
					}else if(data.result[i].type==8){
						tuwen = 'appurl';
					}else if(data.result[i].type==7){  
						tuwen = 'video';
					}else if(data.result[i].type==14){  
						tuwen = 'picture360Sort';
					}else if(data.result[i].type==15){  
						tuwen = 'wallbz';
					}else if(data.result[i].type==16){  
						tuwen = 'lbsbz';
					}else if(data.result[i].type==13){  
						tuwen = 'picIndustryProduct';
					}else if(data.result[i].type==17){  
						tuwen = 'bespeakbz';
					}else if(data.result[i].type==18){  
						tuwen = 'wesite';
					}else if(data.result[i].type==10){
						tuwen = 'yhq';
					}else if(data.result[i].type==4){
						tuwen = 'Less'; //文件夹
						addmenus = '<label class="HomeAdd add hovershow" parentid="'+data.result[i].menuid+'" title="添加子菜单"></label>';
					}
					var relsort ='<ul class="drag">';
					if(issort==1){
						relsort = '<ul>';
					}
					$(relsort+
					'<div class="secondnode">'+
					'<li class="Homeml '+tuwen+'"><div class=" toggle Expansion Expansion'+data.result[i].menuid+'"  pid='+data.result[i].menuid+' style="position:absolute; left:17px; width:25px; height:25px;"></div>'+
					'<div  style="cursor: pointer;" class="home1_left toggle" pid='+data.result[i].menuid+'>'+
					'<span class="_number _Orange mnonum'+data.result[i].menuid+'">'+data.result[i].menutextno+'</span>'+
					'<span class="mdfy" op="selectbymenuid" title="'+data.result[i].menutitle+'" menuid="'+data.result[i].menuid+'">'+data.result[i].menutitle+'</span>'+
					'</div>'+
					'<div class="home1_right">'+
					'<label class="Delete delt hovershow" op="deletemenu" menuid="'+data.result[i].menuid+'" title="删除"></label>'+
					'<label class="Modify mdfy hovershow" op="selectbymenuid" menuid="'+data.result[i].menuid+'" title="修改菜单和添加图文"></label>'+
					addmenus
					+'</div>'+
					'</li>'+
				
                   '<li style="display:none;" class="Homeml addmenutitle addmenutitle'+data.result[i].menuid+'">'+
					    '<span>'+
					    	'<input class="_point" value="限制在24字符以内" parentid="'+data.result[i].menuid+'" style="width:220px; height:20px;border:1px #ccc solid;" type="text" name="menutitle" maxlength="24"/>'+
					    	'<input style="width:50px; margin-right:5px; height:22px;border:1px #ccc solid;cursor: pointer;display:none;"type="button" op="savemenu" parentid="'+data.result[i].menuid+'" value="保存" class="savemntitle"'+data.result[i].menuid+'""/>'+
					    '</span>'+
					'</li>'+
					'</div>'+
					'</ul>').appendTo($(classpid).parent().parent().parent());
					
					
						
						
					
					

					$(".drag").sortable({ 		//监听三级以后的状态，功能跟上面一样
					    connectWith: "ul",
						//revert:true, 
						dropOnEmpty:true,
						axis: 'y', 
						snapMode:"both",
						cursor:"crosshair", 
						opacity: 0.7,
						start: function(event, ui) {
							$(".drag").stop();
							ui.item.addClass('active');
							nowSort = ui.item.parents(".drag:first");
							ui.item.parents(".drag:first").find(".drag").remove();
						},
						
						stop: function(event, ui) {
							var flag= ui.item.find(".Expansion").parent().parent();
							if(flag.hasClass("secondnode")){
								var ll = flag.parent().find(".secondnode").length;
								if(ll>1){
									var first = flag.parent().find(".secondnode").eq(0).html();
									
									$('<ul class="drag ui-sortable"></ul>').insertAfter();
									$('<div class="secondnode">'+first+'</div>').appendTo(nowSort);
									$(nowSort).insertBefore(flag.parent());
									flag.parent().find(".secondnode").eq(0).remove();
								}
								
								
							}
							
							ui.item.removeClass('active').effect('highlight');
							//var	menuid = ui.item.find("label").eq(0).attr("menuid");
							var pid = ui.item.find(".Expansion").attr("pid");
							
							var newParentid = $(".Expansion"+pid).parents(".drag:first").parent().find(".Expansion").eq(0).attr("pid");
							//console.log(newParentid);
							//console.log($(".Expansion"+pid).parents(".drag:first").parent().children(".drag").length);
							var index =1;
							$(".Expansion"+pid).parents(".drag:first").parent().children(".drag").each(function(){
								$(this).attr("index",index);
								index++;
							});
							var newIndex =  $(".Expansion"+pid).parents(".drag:first").attr("index");
							//var newIndex = ui.item.parent().parent().find("ul:first").index("ul")+1;
							//var newIndex =ui.item.parents(".drag:second").index(ui.item.parent());
							//console.log(newIndex);
							$.ajax({
									url:"/ajax-mpmenu.action",
					                     type:"POST",dataType:"json",
					                     timeout:"10000",
					                     async: "true",
					                   
					                     data:{	"op":"move",
					                     		"menuid":pid,
					                    	 	"newParentid":newParentid,
					                      		"newIndex":newIndex
					                     },success:function(data){
					                     	if(data.code=="A00006"){//返回成功后初始化排序
					                     
						           				//parent.location.reload();	
					                     		for(var i=0;i<data.mnonums.length;i++){
					                     			$(".mnonum"+data.mnonums[i].menuno).html(data.mnonums[i].menutextno);
					                     		}
						                     }
					                     }
					                     
								});
								$( ".drag" ).disableSelection();
								
								
						} 
					});	

				}
				
				
            }
        }
    });
}