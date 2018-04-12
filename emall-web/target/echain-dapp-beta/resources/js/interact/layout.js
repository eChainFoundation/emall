/// <reference path="../js/jquery-1.7.2.min.js" />
$(function () {
    //弹出层方法
    var V_Dialog = new function () {
        var dialog_html = '<div id="popupLayBox" class="popupLayBox" style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 100; display: none; ">' +
                                    '<div id="tranBackGround" class="tranBackGround" style="filter: alpha(Opacity=80); -moz-opacity: 0.5; opacity: 0.5; background-color: gray; width: 100%; height: 100%; position: absolute; left: 0px; top: 0px;">' +
                                    '</div><div id="untranBox" class="untranBox" style="position: absolute; left: 194px; top: 0px; width: 980px; overflow: hidden; text-align: center; padding-top: 10px; display: inline-block; "></div></div>';
        var addbox_p = null;
        var exit = function () { $('#popupLayBox', window.parent.document).fadeOut(function () { addbox_p.hide().appendTo("body", window.parent.document); }); $('#popupLayBox', window.parent.document).remove(); };
        this.ShowDialog = function (addbox) {
            addbox_p = addbox;
            var dialog_box = $(dialog_html);
            $('body', window.parent.document).append(dialog_box.fadeIn(100));
            $('#untranBox', window.parent.document).append(addbox.show());
            $('#tranBackGround,.Close_HelpWindow', window.parent.document).die().live("click", function () { exit(); return false; });
            //addbox.children("a.Close_HelpWindow").html("");
            //addbox.width(810);
            //addbox.children("img").each(function () {
            //    var src = $(this).prop("src");
            //    $(this).prop("src", src.replace("about", "wxb/about"));
            //});
        };
        this.Close = exit;
    }();

    //弹出帮助窗口-文字
    $("#a_LookHelp_article").click(function () {
        V_Dialog.ShowDialog($("#HelpWindow_article"));
        return false;
    });
    //弹出帮助窗口-视频
    $("#a_LookHelp_video").click(function () {
        V_Dialog.ShowDialog($("#HelpWindow_video"));
        return false;
    });
});