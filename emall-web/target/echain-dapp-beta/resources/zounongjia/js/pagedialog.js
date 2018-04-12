(function(b) {
    b.PageDialog = function(E, a) {
        var A = {
            W: 710,
            H: 480,
            obj: null,
            oL: 0,
            oT: 0,
            close: true,
            autoClose: false,
            autoTime: 1500,
            title: "",
            BSize: 4,
            BColor: "#b4b4b4",
            BShow: true,
            ready: function() {},
            submit: function() {}
        };
        var C = {
            obj: null,
            oL: 0,
            oT: 0,
            close: true,
            autoClose: false,
            autoTime: 1500,
            title: "",
            BSize: 4,
            BColor: "#b4b4b4",
            BShow: true,
            ready: function() {},
            submit: function() {}
        };
        a = a || C;
        b.extend(A, a);
        var z = $("#pageDialog");
        var v = $("#pageDialogBG");
        var t = $("#pageDialogBorder");
        var y = $("#pageDialogMain");
        var s = $("#pageDialogClose");
        var F = b(window);
        if (A.obj != null) {
            if (A.obj.length < 1) {
                A.obj = null
            }
        }
        var B = function() {
            F.unbind("resize");
            y.empty();
            t.hide();
            v.hide();
            z.hide();
            A.submit()
        };
        s.unbind().bind("click", B);
        if (!A.close) {
            s.hide()
        } else {
            s.show()
        }
        E = '<div class="content">' + E + "</div>";
        if (A.title != "") {
            E = '<div class="title">' + A.title + "</div>" + E
        }
        y.html(E);
        z.css("border", "1px solid " + A.BColor);
        y.css({
            width: A.W + "px",
            height: A.H + "px"
        });
        t.css({
            opacity: 0.1,
            width: (z.width() + (A.BSize * 2 + 2)) + "px",
            height: (z.height() + (A.BSize * 2 + 2)) + "px"
        });
        if (A.obj != null) {
            var u = A.obj.offset();
            var D = u.left + A.oL;
            var r = u.top + A.obj.height() + A.oT;
            z.css({
                left: D,
                top: r
            });
            t.css({
                left: D - A.BSize,
                top: r - A.BSize
            })
        }
        var x = function() {
            var c = document.body.scrollWidth;
            if (F.width() > c) {
                c = F.width()
            } else {}
            v.css({
                opacity: 0.3,
                width: c + "px",
                height: b(document).height() > F.height() ? b(document).height() - 4 : F.height() + "px"
            })
        };
        var w = function() {
            x();
            if (A.obj != null) {
                return
            }
            var c = F.scrollTop();
            var e = F.scrollLeft();
            var d = (F.height() - A.H) / 2 + c;
            var f = (F.width() - A.W) / 2 + e;
            if (d < A.BSize) {
                d = A.BSize
            }
            if (f < A.BSize) {
                f = A.BSize
            }
            t.css("top", d - A.BSize);
            t.css("left", f - A.BSize);
            z.css("top", d);
            z.css("left", f)
        };
        w();
        F.resize(w);
        F.scroll(x);
        v.show();
        if (A.BShow) {
            t.show()
        }
        z.show();
        if (A.autoClose) {
            window.setTimeout(function() {
                b.PageDialog.close()
            },
            A.autoTime)
        }
        z.ready = A.ready()
    };
    b.PageDialog.close = function() {
        $("#pageDialogClose").click()
    };
    b.PageDialog.showConfirm = function(f, a) {
        var h = '<div class="PopMsgC"><s></s>' + f + '</div><div class="PopMsgbtn"><a href="javascript:;" id="btnMsgOK" class="orangebut">\u786e\u8ba4</a>&nbsp;&nbsp;<a href="javascript:;" id="btnMsgCancel" class="cancelBtn">\u53d6\u6d88</a></div>';
        var g = function() {
            b("#btnMsgCancel").click(function() {
                b.PageDialog.close()
            });
            b("#btnMsgOK").click(function() {
                b.PageDialog.close();
                a()
            })
        };
        b.PageDialog(h, {
            title: "\u63d0\u793a",
            W: 282,
            H: 146,
            ready: g
        })
    }
})(jQuery);