	function loadProvinces(provinceId,defaultValue){  
	 	 
			 $.ajax({  
			url : "/area/getProvinces.action",  
			data : {},  
			type : "get",  
			async:false, 
			cache : false,  
			dataType : "json",  
			success:  function(data){
                            var select_root=document.getElementById(provinceId);  
						   
						    select_root.options.length=0; 
						    //select_root.add(new Option("请选择",""));  
						    for(var i=0;i<data.length;i++){  
						            var xValue=data[i].id;  
						             var xText=data[i].value;   
						             var option=new Option(xText,xValue);  
						             select_root.add(option);  
						    } 
						    if(defaultValue){
						    	  for(var i=0;i<select_root.options.length;i++)  {
								        if(select_root.options[i].value == defaultValue)
								        {
								        	select_root.options[i].selected=true;
								            break;
								        }
								    }
						    }
						  
                      }  
			});  
		 }  ;
	
	
	function getSubSections(parentAreaId,subEleId,defaultValue){
		//var provinceId =document.getElementById(provinceEleId).value; 
		 $.ajax({  
			url : "/area/getSubSections.action",  
			data : {"areaId":parentAreaId},    
			type : "get",  
			cache : false,  
			async:false, 
			dataType : "json",  
			success:  function(data){
                            var select_root=document.getElementById(subEleId);   
						    select_root.options.length=0; 
						    //select_root.add(new Option("请选择",""));
						    for(var i=0;i<data.length;i++){  
							    	 var xValue=data[i].id;  
						             var xText=data[i].value;   
						             var option=new Option(xText,xValue);  
						             select_root.add(option);  
						    }  
						    //alert(subEleId+" default value:"+defaultValue)
						    if(defaultValue){
						    	  for(var i=0;i<select_root.options.length;i++)  {
						    		 // alert(subEleId+" select value:"+select_root.options[i].value)
								        if(select_root.options[i].value == defaultValue)
								        {
								        	select_root.options[i].selected=true;
								        	
								            break;
								        }
								    }
						    }
                      }  
			});  
		}
		
