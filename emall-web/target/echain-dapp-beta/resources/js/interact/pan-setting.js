$(function () {
    var validator = $("#panform").validate({
        onfocusout: false,
        rules: {
            title1: { required: true, maxlength: 64 }, title2: { required: true, maxlength: 64 },
            cover1: { required: true }, cover2: { required: true }, cover3: { required: true },
            keyword: { required: true, maxlength: 64 },
            preDate: { required: true, preDate: true }, startDate: { required: true, startDate: true }, endDate: { required: true, endDate: true },
            //repeatTips: { required: true, maxlength: 50 },
            cover1: { required: true }, cover2: { required: true },
            person_total_count: { required: true, number: true, min: -1 },
            person_day_count: { required: true, number: true, min: -1 },
            person_win_total: { required: true, number: true, min: -1 },
            person_win_day: { required: true, number: true, min: -1 }
        },
        messages: {
            title1: { required: "����Ϊ��", maxlength: "���ܳ���64����" }, title2: { required: "����Ϊ��", maxlength: "���ܳ���64����" },
            cover1: { required: "�������һ�ŻԤ��ͼ??" }, cover2: { required: "�������һ�Ż��ʼͼ??" }, cover3: { required: "�������һ�Ż��ʼͼ??" },
            keyword: { required: "����Ϊ��", maxlength: "���ܳ���64����" },
            preDate: { required: "����Ϊ��" }, startDate: { required: "����Ϊ��" }, endDate: { required: "����Ϊ��" },
            //repeatTips: { required: "����Ϊ��", maxlength: "���ܳ���50����" },
            cover1: { required: "�������һ�Żͼ??" }, cover2: { required: "�������һ���н�����ͼ??" },
            person_total_count: { required: "����Ϊ��", number: "��������??", min: "���ֱ�����ڵ���-1" },
            person_day_count: { required: "����Ϊ��", number: "��������??", min: "���ֱ�����ڵ���-1" },
            person_win_total: { required: "����Ϊ��", number: "��������??", min: "���ֱ�����ڵ���-1" },
            person_win_day: { required: "����Ϊ��", number: "��������??", min: "���ֱ�����ڵ���-1" }
        },
        showErrors: function (errorMap, errorList) {
            if (errorList && errorList.length > 0) {
                $.each(errorList,
					function (index, obj) {
					    var item = $(obj.element);
					    if (item.is(".cover")) {
					        alert(obj.message);
					    }
					    // ���������ӳ����ʽ
					    item.closest(".control-group").addClass('error');
					    item.attr("title", obj.message);
					});
            } else {
                var item = $(this.currentElements);
                item.closest(".control-group").removeClass('error');
                item.removeAttr("title");
            }
        },
        submitHandler: function () {
            if (!prize.valiData()) return;
            var $form = $("#panform");
            var $btn = $("#save-btn");
            if ($btn.hasClass("disabled")) return;
            var submitData = {
                app_type_id: $("input[name='app_type_id']", $form).val(),
                mp_w_id: $("input[name='mp_w_id']", $form).val(),
                activityname: $("input[name='title1']", $form).val(),
                cover1: $("input[name='cover1']", $form).val(),
                summary1: $("textarea[name='summary1']", $form).val(),
                preDate: $("input[name='preDate']", $form).val(),
                startDate: $("input[name='startDate']", $form).val(),
                endDate: $("input[name='endDate']", $form).val(),
                keyword: $("input[name='keyword']", $form).val(),
                //repeatTips: $("input[name='repeatTips']", $form).val(),
                title2: $("input[name='title2']", $form).val(),
                cover2: $("input[name='cover2']", $form).val(),
                cover3: $("input[name='cover3']", $form).val(),
                summary2: $("textarea[name='summary2']", $form).val(),
                person_total_count: $("input[name='person_total_count']", $form).val(),
                person_day_count: $("input[name='person_day_count']", $form).val(),
                person_win_total: $("input[name='person_win_total']", $form).val(),
                person_win_day: $("input[name='person_win_day']", $form).val(),
                action: $("input[name='action']", $form).val(),
                app_case_id: $("input[name='app_case_id']", $form).val(),
                prize_name: prize.getPrizeInfoVal($form, "prize_name"),
                prize_msg: prize.getPrizeInfoVal($form, "prize_msg"),
                prize_count: prize.getPrizeInfoVal($form, "prize_count"),
                win_odds: prize.getPrizeInfoVal($form, "win_odds"),
                active_time: prize.getPrizeInfoVal($form, "active_time"),
                count1: prize.getPrizeInfoVal($form, "count1"),
                count2: prize.getPrizeInfoVal($form, "count2"),
                count3: prize.getPrizeInfoVal($form, "count3"),
                count4: prize.getPrizeInfoVal($form, "count4"),
                min_prize: $("input[name='min_prize']", $form).val(),
                max_prize: $("input[name='max_prize']", $form).val()
            };
            $btn.addClass("disabled");
            $.post('/wxb/market/activity_ajax.aspx', submitData, function (data) {
                $btn.removeClass("disabled");
                if (data[0].status == "error") {
                    alert(data[1].message);
                } else if (data[0].status == "success") {
                    alert(data[1].message);
                    window.location.href = '/wxb/market/activitylist.aspx?app_type_id=' + $("input[name='app_type_id']", $form).val();
                } else {
                    alert("����ʧ��??");
                }

                //					if(data.error == "invalid"){
                //						alert("�Ƿ�����");
                //						window.location.href = "/admin/shoper/activitylist.jsp";
                //						return;
                //					}
                //					if(data.error == "keyword"){
                //						alert("�ؼ���ѱ�ʹ�û�����������ùؼ�ʣ����������û�ؼ�??");
                //						$("input[name='keyword']").focus();
                //						return;
                //					}
                //					if(data.error == "statu"){
                //						alert("��ѿ�ʼ�������޸�");
                //						window.location.href = "/admin/shoper/activitylist.jsp";
                //						return;
                //					}
                //					if (data.success == true) {
                //						alert("����ɹ�");
                //						window.location.href = "/admin/shoper/activitylist.jsp";
                //					}  else{
                //						alert("����ʧ��");
                //					}
            }, "json");
            return false;
        }
    });
});


var prize = {};
prize.addPrize = function (ele) {
    var html = "<div class=\"z\"  >";
    html += "      <img src=\"/wxb/images/tbtn_delete.gif\" class=\"a1\" title=\"ɾ��ý���\" onclick=\"prize.removePrize(this.parentNode);\" />";
    html += "      <img src=\"/wxb/images/tbtn_add.gif\"onclick=\"prize.addPrize(this.parentNode);\"   class=\"a2\" title=\"�ڸ�������һ���µĽ���\" />";
    html += "         <div class=\"control-group n\">";
    html += "            <label class=\"control-label\" for=\"prize1\">����˵��</label>";
    html += "                        <div class=\"controls\">";
    if ($("#isdefine").val() == "0") {
        html += "                            <input name=\"prize_name\" class=\"span1\"  type=\"text\" maxlength=\"5\" value=\"\" onkeyup=\"prize.setAwards(this);\" />";
    } else {
        html += "                            <input name=\"prize_name\"  type=\"hidden\"  value=\"" + prize.calculatePrize(ele) + "\"  /><span class=\"span_ds\" style=\"margin:0px;\" >" + prize.calculatePrize(ele) + "</span>";
    }
    html += "<span class=\"maroon\">*</span><span class=\"help-inline\">���� �����ܳ�??5����</span>";
    html += "                        </div>";
    html += "         </div>";
    html += "         <div class=\"control-group\">";
    html += "             <label class=\"control-label\" for=\"prize1\">" + prize.calculatePrize(ele) + "��Ʒ����</label>";
    html += "                        <div class=\"controls\">";
    html += "                            <input name=\"prize_msg\" class=\"span4\" type=\"text\" onkeyup=\"prize.valiDataKeyPress(this,false);\" />";
    html += "                            <span class=\"maroon\">*</span><span class=\"help-inline\">���� �����ܳ�??50����</span>";
    html += "                        </div>";
    html += "          </div>";
    html += "          <div class=\"control-group\">";
    html += "           <label class=\"control-label\" for=\"amount1\">" + prize.calculatePrize(ele) + "��Ʒ��</label>";
    html += "                       <div class=\"controls\">";
    html += "                            <input name=\"prize_count\" class=\"span1\"  type=\"text\" value=\"0\" onkeyup=\"prize.valiDataKeyPress(this,true);\" /><span class=\"maroon\">*</span><span class=\"help-inline\">����״����ú����޸� </span>";
    html += "                       </div>";
    html += "          </div>";
    html += "  <div class=\"control-group\">";
    html += "	<label class=\"control-label\" for=\"amount1\">";
    html += "	    " + prize.calculatePrize(ele) + "�н�����</label>";
    html += "	<div class=\"controls\">";
    html += "	    <input name=\"win_odds\" class=\"span1\" type=\"text\" value=\"0\" onkeyup=\"prize.valiDataKeyPress(this,true);\" /> % <span";
    html += "		class=\"maroon\">*</span><span class=\"help-inline\">����״����ú����޸ģ�����С�ڰ����֮һ�����ܴ��ڰٷ�֮??";
    html += "	    </span>";
    html += "	</div>";
    html += "    </div>";
    html += "    <div class=\"control-group\">";
    html += "	<label class=\"control-label\" for=\"amount1\">";
    html += "	    " + prize.calculatePrize(ele) + "�н�ʱ��</label>";
    html += "	<div class=\"controls\">";
    html += "	    <input name=\"active_time\" class=\"span1\" type=\"text\" value=\"0\" onkeyup=\"prize.valiDataKeyPress(this,true);\" /><span";
    html += "		class=\"maroon\">*</span><span class=\"help-inline\">������ʼ�೤ʱ���ڣ���������Ƚ��ý�Ʒ�н�??0 ��ʾ����??";
    html += "	    </span>";
    html += "	</div>";
    html += "    </div>";
    html += "    <div class=\"control-group\">";
    html += "	<label class=\"control-label\" for=\"amount1\">";
    html += "	    " + prize.calculatePrize(ele) + "�ܴ�??</label>";
    html += "	<div class=\"controls\">";
    html += "	    <input name=\"count1\" class=\"span1\" type=\"text\" value=\"-1\" onkeyup=\"prize.valiDataKeyPress(this,true);\" /><span";
    html += "		class=\"maroon\">*</span><span class=\"help-inline\">�����Ʒ�ܹ�����������-1 ��ʾ����??";
    html += "	    </span>";
    html += "	</div>";
    html += "    </div>";
    html += "    <div class=\"control-group\">";
    html += "	<label class=\"control-label\" for=\"amount1\">";
    html += "	    ����" + prize.calculatePrize(ele) + "����</label>";
    html += "	<div class=\"controls\">";
    html += "	    <input name=\"count2\" class=\"span1\" type=\"text\" value=\"-1\" onkeyup=\"prize.valiDataKeyPress(this,true);\" /><span";
    html += "		class=\"maroon\">*</span><span class=\"help-inline\">�����Ʒ��������ĳ����??-1 ��ʾ����??";
    html += "	    </span>";
    html += "	</div>";
    html += "    </div>";
    html += "    <div class=\"control-group\">";
    html += "	<label class=\"control-label\" for=\"amount1\">";
    html += "	    ÿ��" + prize.calculatePrize(ele) + "�ܴ�??</label>";
    html += "	<div class=\"controls\">";
    html 
    += "	    <input name=\"count3\" class=\"span1\" type=\"text\" value=\"-1\" onkeyup=\"prize.valiDataKeyPress(this,true);\" /><span";
    html += "		class=\"maroon\">*</span><span class=\"help-inline\">���ÿ���˻�ô˽�Ʒ���ܴ���-1 ��ʾ����??";
    html += "	    </span>";
    html += "	</div>";
    html += "    </div>";
    html += "    <div class=\"control-group n1\">";
    html += "	<label class=\"control-label\" for=\"amount1\">";
    html += "	    ÿ��ÿ��" + prize.calculatePrize(ele) + "����</label>";
    html += "	<div class=\"controls\">";
    html += "	    <input name=\"count4\" class=\"span1\" type=\"text\" value=\"-1\" onkeyup=\"prize.valiDataKeyPress(this,true);\" /><span";
    html += "		class=\"maroon\">*</span><span class=\"help-inline\">���ÿ����ÿ���ôν�Ʒ�Ĵ���??-1 ��ʾ����??";
    html += "	    </span>";
    html += "	</div>";
    html += "    </div>";
    html += "</div>";
    var divz = $(ele);
    var max = $("#max_prize").val();
    var divzs = divz.parent().find("div[class='z']").length;
    if (parseInt(max) != 0 && divzs >= parseInt(max)) {
        alert("�û���������" + max + "��Ʒ��");
        return;
    }
    var isdefine = $("#isdefine").val();
    if (isdefine == 0) { divz.after(html); } else { divz.parent().append(html); }
    divz.next().find("input[name='prize_name']").focus();
}
prize.calculatePrize = function (ele) {
    var divz = $(ele);
    var divzs = divz.parent().find("div[class='z']").length;
    var isdefine = $("#isdefine").val();
    if (isdefine == "1") {
        if (divzs == 3) { return "�ĵ�??" } else if (divzs == 4) { return "���??"; } else if (divzs == 5) { return "���??"; } else { return ""; }
    } else { return ""; }
}
prize.removePrize = function (ele) {
    var divz = $(ele);
    var divzs = divz.parent().find("div[class='z']").length;
    var min = $("#min_prize").val();
    if (divzs <= parseInt(min)) {
        alert("�����ٱ�??" + min + "��Ʒ��");
        return;
    }
    divz.remove();
}
prize.setAwards = function (ele) {
    var value = ele.value;
    var divcontrol = $(ele.parentNode.parentNode.parentNode);
    var label = divcontrol.find("label[class='control-label']");
    $(label[1]).html(value + '��Ʒ����');
    $(label[2]).html(value + '��Ʒ��');
    $(label[3]).html(value + '�н�����');
    $(label[4]).html(value + '�н�ʱ��');
    $(label[5]).html(value + '�ܴ�??');
    $(label[6]).html(value + '�������');
    $(label[7]).html(value + 'ÿ���ܴ�??');
    $(label[8]).html(value + 'ÿ��ÿ�����');
    prize.valiDataKeyPress(ele);
}
prize.valiData = function () {
    var z = 0;
    var divs = $("div[class='z']");
    for (var i = 0; i < divs.length; i++) {
        if ($(divs[i]).find("input[name='prize_name']").val() == '') {
            $(divs[i]).find("input[name='prize_name']").closest(".control-group").addClass('error');
            $(divs[i]).find("input[name='prize_name']").focus();
            z = 1;
        } else {
            $(divs[i]).find("input[name='prize_name']").closest(".control-group").removeClass('error');
        }
        if ($(divs[i]).find("input[name='prize_msg']").val() == '' || $(divs[i]).find("input[name='prize_msg']").val().length > 50) {
            $(divs[i]).find("input[name='prize_msg']").closest(".control-group").addClass('error');
            $(divs[i]).find("input[name='prize_msg']").focus();
            z = 1;
        } else {
            $(divs[i]).find("input[name='prize_msg']").closest(".control-group").removeClass('error');
        }

        if ($(divs[i]).find("input[name='prize_count']").val() == '' || isNaN($(divs[i]).find("input[name='prize_count']").val()) ||
           parseInt($(divs[i]).find("input[name='prize_count']").val()) <= 0
         ) {
            $(divs[i]).find("input[name='prize_count']").closest(".control-group").addClass('error');
            $(divs[i]).find("input[name='prize_count']").focus();
            z = 1;
        } else {
            $(divs[i]).find("input[name='prize_count']").closest(".control-group").removeClass('error');
        }

        if ($(divs[i]).find("input[name='win_odds']").val() == '' || isNaN($(divs[i]).find("input[name='win_odds']").val()) ||
            parseFloat($(divs[i]).find("input[name='win_odds']").val()) <= 0
        ) {
            $(divs[i]).find("input[name='win_odds']").closest(".control-group").addClass('error');
            $(divs[i]).find("input[name='win_odds']").focus();
            z = 1;
        } else {
            $(divs[i]).find("input[name='win_odds']").closest(".control-group").removeClass('error');
        }

        if ($(divs[i]).find("input[name='active_time']").val() == '' || isNaN($(divs[i]).find("input[name='active_time']").val()) ||
            parseInt($(divs[i]).find("input[name='active_time']").val()) < 0
        ) {
            $(divs[i]).find("input[name='active_time']").closest(".control-group").addClass('error');
            $(divs[i]).find("input[name='active_time']").focus();
            z = 1;
        } else {
            $(divs[i]).find("input[name='active_time']").closest(".control-group").removeClass('error');
        }

        if ($(divs[i]).find("input[name='count1']").val() == '' || isNaN($(divs[i]).find("input[name='count1']").val()) ||
            parseInt($(divs[i]).find("input[name='count1']").val()) < -1
        ) {
            $(divs[i]).find("input[name='count1']").closest(".control-group").addClass('error');
            $(divs[i]).find("input[name='count1']").focus();
            z = 1;
        } else {
            $(divs[i]).find("input[name='count1']").closest(".control-group").removeClass('error');
        }

        if ($(divs[i]).find("input[name='count2']").val() == '' || isNaN($(divs[i]).find("input[name='count2']").val()) ||
            parseInt($(divs[i]).find("input[name='count2']").val()) < -1
        ) {
            $(divs[i]).find("input[name='count2']").closest(".control-group").addClass('error');
            $(divs[i]).find("input[name='count2']").focus();
            z = 1;
        } else {
            $(divs[i]).find("input[name='count2']").closest(".control-group").removeClass('error');
        }

        if ($(divs[i]).find("input[name='count3']").val() == '' || isNaN($(divs[i]).find("input[name='count3']").val()) ||
            parseInt($(divs[i]).find("input[name='count3']").val()) < -1
        ) {
            $(divs[i]).find("input[name='count3']").closest(".control-group").addClass('error');
            $(divs[i]).find("input[name='count3']").focus();
            z = 1;
        } else {
            $(divs[i]).find("input[name='count3']").closest(".control-group").removeClass('error');
        }

        if ($(divs[i]).find("input[name='count4']").val() == '' || isNaN($(divs[i]).find("input[name='count4']").val()) ||
            parseInt($(divs[i]).find("input[name='count4']").val()) < -1
        ) {
            $(divs[i]).find("input[name='count4']").closest(".control-group").addClass('error');
            $(divs[i]).find("input[name='count4']").focus();
            z = 1;
        } else {
            $(divs[i]).find("input[name='count4']").closest(".control-group").removeClass('error');
        }

    }
    return z == 0;
}
prize.valiDataKeyPress = function (e, bo) {
    if (bo) {
        prize.isNumber(e);
    }
    var ele = e.parentNode.parentNode.parentNode;
    if ($(ele).find("input[name='prize_name']").val() == '') {
        $(ele).find("input[name='prize_name']").closest(".control-group").addClass('error');
        //$(ele).find("input[name='prize_name']").focus();
        return;
    } else {
        $(ele).find("input[name='prize_name']").closest(".control-group").removeClass('error');
    }
    if ($(ele).find("input[name='prize_msg']").val() == '' || $(ele).find("input[name='prize_msg']").val().length > 50) {
        $(ele).find("input[name='prize_msg']").closest(".control-group").addClass('error');
        //$(ele).find("input[name='prize_msg']").focus();
        return;
    } else {
        $(ele).find("input[name='prize_msg']").closest(".control-group").removeClass('error');
    }

    if ($(ele).find("input[name='prize_count']").val() == '' || isNaN($(ele).find("input[name='prize_count']").val()) ||
           parseInt($(ele).find("input[name='prize_count']").val()) <= 0
         ) {
        $(ele).find("input[name='prize_count']").closest(".control-group").addClass('error');
        //$(ele).find("input[name='prize_count']").focus();
        return;
    } else {
        $(ele).find("input[name='prize_count']").closest(".control-group").removeClass('error');
    }

    if ($(ele).find("input[name='win_odds']").val() == '' || isNaN($(ele).find("input[name='win_odds']").val()) ||
            parseFloat($(ele).find("input[name='win_odds']").val()) <= 0
        ) {
        $(ele).find("input[name='win_odds']").closest(".control-group").addClass('error');
        //$(ele).find("input[name='win_odds']").focus();
        return;
    } else {
        $(ele).find("input[name='win_odds']").closest(".control-group").removeClass('error');
    }

    if ($(ele).find("input[name='active_time']").val() == '' || isNaN($(ele).find("input[name='active_time']").val()) ||
            parseInt($(ele).find("input[name='active_time']").val()) < 0
        ) {
        $(ele).find("input[name='active_time']").closest(".control-group").addClass('error');
        // $(ele).find("input[name='active_time']").focus();
        return;
    } else {
        $(ele).find("input[name='active_time']").closest(".control-group").removeClass('error');
    }

    if ($(ele).find("input[name='count1']").val() == '' || isNaN($(ele).find("input[name='count1']").val()) ||
            parseInt($(ele).find("input[name='count1']").val()) < -1
        ) {
        $(ele).find("input[name='count1']").closest(".control-group").addClass('error');
        //$(ele).find("input[name='count1']").focus();
        return;
    } else {
        $(ele).find("input[name='count1']").closest(".control-group").removeClass('error');
    }

    if ($(ele).find("input[name='count2']").val() == '' || isNaN($(ele).find("input[name='count2']").val()) ||
            parseInt($(ele).find("input[name='count2']").val()) < -1
        ) {
        $(ele).find("input[name='count2']").closest(".control-group").addClass('error');
        //$(ele).find("input[name='count2']").focus();
        return;
    } else {
        $(ele).find("input[name='count2']").closest(".control-group").removeClass('error');
    }

    if ($(ele).find("input[name='count3']").val() == '' || isNaN($(ele).find("input[name='count3']").val()) ||
            parseInt($(ele).find("input[name='count3']").val()) < -1
        ) {
        $(ele).find("input[name='count3']").closest(".control-group").addClass('error');
        //$(ele).find("input[name='count3']").focus();
        return;
    } else {
        $(ele).find("input[name='count3']").closest(".control-group").removeClass('error');
    }

    if ($(ele).find("input[name='count4']").val() == '' || isNaN($(ele).find("input[name='count4']").val()) ||
            parseInt($(ele).find("input[name='count4']").val()) < -1
        ) {
        $(ele).find("input[name='count4']").closest(".control-group").addClass('error');
        //$(ele).find("input[name='count4']").focus();
        return;
    } else {
        $(ele).find("input[name='count4']").closest(".control-group").removeClass('error');
    }
}
prize.getPrizeInfoVal = function (ele, name) {
    var names = ele.find("input[name='" + name + "']");
    var result = '';
    for (var i = 0; i < names.length; i++) {
        result += $(names[i]).val().replace('`', '');
        if (i + 1 < names.length) {
            result += "`";
        }
    }
    return result;
}
prize.isNumber = function (ele) {
    if (isNaN($(ele).val())) {
        return false;
    }
    return true;
}