
    $(".msg-editer #title").bind("keyup", function () {
        $(".i-title", window.appmsg).text($(this).val());
        $(".title", window.appmsg).val($(this).val()); 
    });
    $(".msg-editer #source_url").bind("keyup", function () {
        $(".sourceurl", window.appmsg).val($(this).val());
    });
    $(".msg-editer #app_link").bind("keyup", function () {
        $(".app_link", window.appmsg).val($(this).val());  
    });
    $("#url-block-link").click(function () {
        $("#url-block").show();
        $(this).hide();
    });
    $("#delImg").click(function () {
        $(".default-tip", window.appmsg).show();
        $("#imgArea").hide();
        //$(".cover,.coverurl", window.appmsg).val("");
        $(".cover", window.appmsg).val("");
        $(".i-img", window.appmsg).hide();
    });
    $("#cancel-btn").click(function (event) {
        event.stopPropagation();
        location.href = "/wxb/fodder/index.aspx";
        return;
    });
    $("#appmsgItem1,.sub-msg-item").live({
        mouseover: function () {
            $(this).addClass("sub-msg-opr-show");
        },
        mouseout: function () {
            $(this).removeClass("sub-msg-opr-show");
        }
    });
    $(".sub-add-btn").click(function () {
        var len = $(".sub-msg-item").size();
        if (len >= 7) {
            alert("多图文最多可设7个！！");
            return;
        }
        var $lastItem = $(".sub-msg-item:last");
        var $newItem = $lastItem.clone();
        $("input,textarea", $newItem).val("");
        $(".i-title", $newItem).text("");
        $(".default-tip", $newItem).css("display", "block");
        //$(".cover,.coverurl", $newItem).val("");
        $(".cover", $newItem).val("");
        $(".i-img", $newItem).hide();
        //$(".articleid", $newItem).remove();
        $(".articleid", $newItem).val('new');
        $lastItem.after($newItem);
    });
    $(".sub-msg-opr .edit-icon").live("click", function () {
        window.appmsg.find(".content").val(window.msg_editor.getContent());
        var $msgItem = $(this).closest(".appmsgItem");
        var index = $(".appmsgItem").index($msgItem);
        window.appmsgIndex = index; window.appmsg = $msgItem;
        $("#title").val($(".title", $msgItem).val());
        if ($("input.cover", $msgItem).val() == "") {
            $("#imgArea").hide();
        } else {
            $("#imgArea").show().find("#img").attr("src", $("input.cover", $msgItem).val());
        }
        if ($(".sourceurl", $msgItem).val() == "") {
            $("#url-block-link").show();
            $("#url-block").hide().find("#source_url").val("");
        } else {
            $("#url-block-link").hide();
            $("#url-block").show().find("#source_url").val($(".sourceurl", $msgItem).val());
        }
        $("#app_link").val($(".app_link", $msgItem).val());
        window.msg_editor.setContent($(".content", $msgItem).val());
        if (index == 0) {
            $(".msg-editer-wrapper").css("margin-top", "0px");
        } else {
            var top = 110 + $(".sub-msg-item").eq(0).outerHeight(true) * index;
            $(".msg-editer-wrapper").css("margin-top", top + "px");
        }
    });
    $(".sub-msg-opr .del-icon").live("click", function () {
        var len = $(".appmsgItem").size(); if (len <= 2) {
            alert("多图文最少2个！！");
            return;
        }
        if (confirm("确认要删除吗？")) {
            var $msgItem = $(this).closest(".sub-msg-item");
            if ($(".articleid", $msgItem).size() > 0 && $(".articleid", $msgItem).val() != "new") {
                window.delResId.push($(".articleid", $msgItem).val());
            }
            $msgItem.remove();
        }
    });
    window.appmsgIndex = 0;
    window.appmsg = $("#appmsgItem1");
    window.delResId = [];

    $("#save-btn").click(function () {
        var $btn = $(this);
        if ($btn.hasClass("disabled")) {
            return;
        }
        window.appmsg.find(".content").val(window.msg_editor.getContent());
        var valid = true;
        var $msgItem;
        var jsonData = [];
        $(".appmsgItem").each(function (index, msgItem) {
            $msgItem = $(msgItem);
            var articleid = $("input.articleid", $msgItem).val();
            var title = $("input.title", $msgItem).val();
            var cover = $("input.cover", $msgItem).val();
            var content = $("textarea.content", $msgItem).val();
            var sourceurl = $("input.sourceurl", $msgItem).val();
            var app_link = $("input.app_link", $msgItem).val();
            if (title == "") {
                alert("鏍囬涓嶈兘涓虹┖");
                valid = false;
                return false;
            } if (cover == "") {
                alert("蹇呴』涓婁紶涓€涓皝闈㈠浘鐗�");
                valid = false;
                return false;
            }
            if (content == "") {
                alert("姝ｆ枃涓嶈兘涓虹┖");
                valid = false;
                return false;
            }
            jsonData[index] = { articleid: articleid, title: title, cover: cover, content: content, sourceurl: sourceurl, app_link: app_link };

        });
        if (!valid) {
            $(".edit-icon", $msgItem).click();
            return false;
        }
        var sumbitData = { action: $("#action").val(), jsonData: encodeURIComponent($.toJSON(jsonData)) };
        if (window.delResId.length > 0) {
            sumbitData.delResId = $.toJSON(window.delResId);
        }
        $btn.addClass("disabled");
});