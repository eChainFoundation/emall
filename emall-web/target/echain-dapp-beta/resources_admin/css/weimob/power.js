$(function(){
    //一级菜单
   $(".menu_id").click(function(){ 
      var id = $(this).attr("id");
       var status = $(this).attr("checked");
       if(status=="checked"){
           $("."+id).prop("checked",true);
       }else{
           $("."+id).prop("checked",false);
       }
   });
    //二级菜单
   $(".menu_info").click(function(){
      var fid = $(this).attr("fid");  //父节点
      var self_id = $(this).attr("id");
      var status = $(this).attr("checked");//当前节点的状态
      if(status=="checked"){
          $("#"+fid).prop("checked",true);
          $("."+self_id).prop("checked",true);
      }else{
        $("."+self_id).prop("checked",false);    
        //判断上级菜单
        selectInfo(fid);
      }
      
   });
   //三级菜单
    $(".permission").click(function(){
        var fid = $(this).attr('fid');
        var menu_id = $("#"+fid).attr('fid');
        if($(this).prop('checked')){
            $("#"+fid).attr('checked',true);  //如果是选中，则将所属第二级节点选中，再将所属根节点选中
            $("#"+menu_id).attr('checked',true);
        }else{
            //判断同级
            selectInfo(fid);
            //判断上级菜单
            selectInfo(menu_id);       
        }
   });
    //三级菜单隐藏
   $(".node-expand").live("click",function(){
        var $this=$(this);
        var $input=$(this).parent().prev("label").find("input[type='checkbox']");
        var inputid = $input.attr("id");
        $("div[cid='"+inputid+"']").toggle(400,function(){
                if($(this).css("display")=="block"){
                    $this.removeClass('icon-chevron-down').addClass('icon-chevron-up');
                }else{
                    $this.removeClass('icon-chevron-up').addClass('icon-chevron-down');
                }
                
            });
   });
      $("#aid").change(function(){
        var aid = $(this).val();
        $.post('/power/role/getStore',{
            aid:aid
        },function(d){
            if(d.error == 0){
                var html ='';
               for(var i =0 ; i< d.data.length ; i++){
                    html += '<li><label class="checkbox inline"><input type="checkbox" class="store_name" name="store_name[]" value="'+d.data[i].id+'">'+ d.data[i].store_name +'</label></li>';
               }
               $("#store_name").empty();
               $("#store_name").html(html);
               $("#store_flag").val(1);
               $("#store_id").show();
            } else {
               $("#store_flag").val(2);
               $("#store_name").html(d.msg);
               $("#store_id").hide();
              return false;  
            }
        },'json');
        
   });
   
     $(".permission").each(function(){
       var check = $(this).attr("checked");
       if(check=="checked"){
            var fid = $(this).attr("fid");
            $("#"+fid).attr('checked',true);//第二级菜单的勾选
            var f = $("#"+fid).attr("fid");//第一级菜单
           $("#"+f).attr('checked',true);
       }
    });
    
   permissioninit();
});

function selectInfo(id){
    $("#"+id).prop("checked",false);
    $("input[fid='"+id+"']").each(function(){
        if($(this).attr('checked')){
            $("#"+id).prop("checked",true);
        }
    });
}

function permissioninit(){
    var store_flag = $("#store_flag").val();    
    var service_flag = $("#service_flag").val();
    
    if(store_flag == 2){
        $("#store_id").hide();
    }
    
    if(service_flag == 2){
        $("#service_id").hide();
    }
    

}
