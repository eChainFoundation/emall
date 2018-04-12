$(function () {
    $(".summary1").html($.htmlEncode($("#summary1").val()));
    $(".summary2").html($.htmlEncode($("#summary2").val()));

    //有些活动并没有summary3
//    if ($("#summary3").length == 1) {
//        $(".summary3").html($.htmlEncode($("#summary3").val()));
//    }
    $('#preDate').datetimepicker();
    $('#startDate').datetimepicker();
    $('#endDate').datetimepicker();

    $('input.file_upload').each(function () {
        var $fileInput = $(this);
        $fileInput.uploadify({
            //指定swf文件
            'swf': 'css/uploadify.swf',
            //后台处理的页�?
            'uploader': '/wxb/market/uploadimg.aspx?' + Math.random(),
            //按钮显示的文�?
            'buttonText': '选择文件',
            //显示的高度和宽度，默�? height 30；width 120
            'height': 25,
            'width': 120,
            //上传文件的类�?  默认为所有文�?    'All Files'  ;  '*.*'
            //在浏览窗口底部的文件类型下拉菜单中显示的文本
            'fileTypeDesc': 'Image Files',
            //允许上传的文件后缀
            'fileTypeExts': '*.gif; *.jpg; *.png;*.jpeg',
            //发送给后台的其他参数通过formData指定
            'formData': { 'action': 'uploadimg' },
            //上传文件页面中，你想要用来作为文件队列的元素的id, 默认为false  自动生成,  不带#
            //'queueID': 'fileQueue',
            //选择文件后自动上�?
            'auto': true,
            //设置为true将允许多文件上传
            'multi': false,
            'onUploadSuccess': function (file, data, response) {
                $('#' + file.id).find('.data').html(' 上传完毕');
                var jsonData = eval("(" + data + ")");
                if (jsonData[0].status == "success") {
                    var $cont = $(this)[0].button.closest(".cont");
                    $(".cover .i-img", $cont).attr("src", jsonData[0].fileUrl).show();
                    $(".img-area", $cont).show().find(" #img").attr("src", jsonData[0].fileUrl);
                    $(".cover-input", $cont).val(jsonData[0].fileUrl);
                    $(".default-tip", $cont).hide();
                } else {
                    alert(jsonData[0].message);
                }
            }
        });
    });
    $(".title").bind("keyup", function () {
        var $input = $(this);
        var $cont = $input.closest(".cont");
        $(".i-title", $cont).text($input.val());
    });
    $(".msg-txta").bind("keyup", function () {
        var $input = $(this);
        var $cont = $input.closest(".cont");
        $(".msg-text", $cont).html($.htmlEncode($input.val()));
    });
    $(".cover-del").click(function () {
        var $cont = $(this).closest(".cont");
        $(".default-tip", $cont).show();
        $(".img-area", $cont).hide();
        $(".cover", $cont).val("");
        $(".cover .i-img", $cont).hide();
    });
    $.validator.addMethod("preDate", function (value) {
        var $preDate = $("input[name='preDate']");
        $preDate.datetimepicker('setDate', $preDate.val());
        return $preDate.datetimepicker('getDate') > new Date();
    }, '预热时间必须大于当前时间');
    $.validator.addMethod("startDate", function (value) {
        var $preDate = $("input[name='preDate']");
        var $startDate = $("input[name='startDate']");
        $preDate.datetimepicker('setDate', $preDate.val());
        $startDate.datetimepicker('setDate', $startDate.val());
        return $startDate.datetimepicker('getDate') >= $preDate.datetimepicker('getDate');
    }, '开始时间必须大于等于预热时�?');
    $.validator.addMethod("endDate", function (value) {
        var $startDate = $("input[name='startDate']");
        var $endDate = $("input[name='endDate']");
        $startDate.datetimepicker('setDate', $startDate.val());
        $endDate.datetimepicker('setDate', $endDate.val());
        return $endDate.datetimepicker('getDate') > $startDate.datetimepicker('getDate');
    }, '结束时间必须大于开始时�?');

    $.validator.addMethod("checkTotalPeople", function (value) {
        var totalPeople = $("input[name='totalPeople']").val();
        var totalPrize = parseInt($("input[name='amount1']").val()) + parseInt($("input[name='amount2']").val()) + parseInt($("input[name='amount3']").val());
        return parseInt(totalPeople) > totalPrize;
    }, '参加抽奖的总人数必须大于所有奖品的总数');
});