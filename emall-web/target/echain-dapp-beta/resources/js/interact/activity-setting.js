$(function () {
    $(".summary1").html($.htmlEncode($("#summary1").val()));
    $(".summary2").html($.htmlEncode($("#summary2").val()));

    //��Щ���û��summary3
//    if ($("#summary3").length == 1) {
//        $(".summary3").html($.htmlEncode($("#summary3").val()));
//    }
    $('#preDate').datetimepicker();
    $('#startDate').datetimepicker();
    $('#endDate').datetimepicker();

    $('input.file_upload').each(function () {
        var $fileInput = $(this);
        $fileInput.uploadify({
            //ָ��swf�ļ�
            'swf': 'css/uploadify.swf',
            //��̨�����ҳ??
            'uploader': '/wxb/market/uploadimg.aspx?' + Math.random(),
            //��ť��ʾ����??
            'buttonText': 'ѡ���ļ�',
            //��ʾ�ĸ߶ȺͿ�ȣ�Ĭ?? height 30��width 120
            'height': 25,
            'width': 120,
            //�ϴ��ļ�����??  Ĭ��Ϊ������??    'All Files'  ;  '*.*'
            //��������ڵײ����ļ����������˵�����ʾ���ı�
            'fileTypeDesc': 'Image Files',
            //�����ϴ����ļ���׺
            'fileTypeExts': '*.gif; *.jpg; *.png;*.jpeg',
            //���͸���̨����������ͨ��formDataָ��
            'formData': { 'action': 'uploadimg' },
            //�ϴ��ļ�ҳ���У�����Ҫ������Ϊ�ļ����е�Ԫ�ص�id, Ĭ��Ϊfalse  �Զ�����,  ����#
            //'queueID': 'fileQueue',
            //ѡ���ļ����Զ���??
            'auto': true,
            //����Ϊtrue��������ļ��ϴ�
            'multi': false,
            'onUploadSuccess': function (file, data, response) {
                $('#' + file.id).find('.data').html(' �ϴ����');
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
    }, 'Ԥ��ʱ�������ڵ�ǰʱ��');
    $.validator.addMethod("startDate", function (value) {
        var $preDate = $("input[name='preDate']");
        var $startDate = $("input[name='startDate']");
        $preDate.datetimepicker('setDate', $preDate.val());
        $startDate.datetimepicker('setDate', $startDate.val());
        return $startDate.datetimepicker('getDate') >= $preDate.datetimepicker('getDate');
    }, '��ʼʱ�������ڵ���Ԥ��ʱ??');
    $.validator.addMethod("endDate", function (value) {
        var $startDate = $("input[name='startDate']");
        var $endDate = $("input[name='endDate']");
        $startDate.datetimepicker('setDate', $startDate.val());
        $endDate.datetimepicker('setDate', $endDate.val());
        return $endDate.datetimepicker('getDate') > $startDate.datetimepicker('getDate');
    }, '����ʱ�������ڿ�ʼʱ??');

    $.validator.addMethod("checkTotalPeople", function (value) {
        var totalPeople = $("input[name='totalPeople']").val();
        var totalPrize = parseInt($("input[name='amount1']").val()) + parseInt($("input[name='amount2']").val()) + parseInt($("input[name='amount3']").val());
        return parseInt(totalPeople) > totalPrize;
    }, '�μӳ齱������������������н�Ʒ������');
});