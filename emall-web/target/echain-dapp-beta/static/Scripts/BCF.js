
//显示问候时间
var hello = "";
now = new Date(), hour = now.getHours()
if (hour < 5) { hello = "午夜好，"; }
else if (hour < 8)  { hello = "早上好,"; }
else if (hour < 12) { hello = "上午好,"; }
else if (hour < 14) { hello = "中午好,"; }
else if (hour < 18) { hello = "下午好,"; }
else if (hour < 24) { hello = "晚上好,"; }


$(document).ready(function () {
    try {
    	/**
        //qq客服开始
        kfguin = "911196092";
//        ws = "www.51qian.com";
        companyname = "畅贷网";
        //welcomeword="您好,欢迎访问畅贷网<brT>请问,有什么可以帮到您的吗?";type = "0";
        var script = document.createElement('script');
        script.src = '/static/Scripts/qqkefu.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
        //qq客服结束
        **/
    }
    catch (e) { }

    try {
//        $.post("/Letter/GetUnreadLetterNumber?" + Math.random(), function (d) {
//            //$("#spanLetter").html("<a href='/Letter'>新站内信(" + d + ")</a>");
//            $("#spanLetter").html(d);
//
//            //站内信旁的NEW字图样，只要把新的图片名字换成new.jpg即可
//            //            if (d > 0) {
//            //                $("#letterImage").css("display", "inline");
//            //            }
//        });
    }
    catch (e) { }





    //为menu添加事件
    var openedMenu; //记录打开的menu
    $("#divAccountLeft h3").each(function () {
        $(this).click(function () {
            if ($(openedMenu).html() != $(this).html()) {
                $(openedMenu).next().toggle();
                $(this).next().toggle();
                openedMenu = $(this);
            }
            else {
                $(this).next().toggle();
                openedMenu = null;
            }
        });
    });

    //设置选中menu的颜色 .menuSelected { background: #aafc5b;}
    var searchUrl = location.search;
    if (searchUrl.indexOf("?page=") == 0) {
        searchUrl = searchUrl.substring(0, searchUrl.indexOf("?page="));
    }
    else if (searchUrl.indexOf("&page=") > 0) {
        searchUrl = searchUrl.substring(0, searchUrl.indexOf("&page="));
    }
    var currentSelectedUrl = location.pathname + searchUrl;

    var a = $("#divAccountLeft a[href=" + currentSelectedUrl + "]");
    if (a.length == 1) {
        var ulIndex = $(a).parent().parent().toggle();
        openedMenu = $(a).parent().parent().prev();
        //$(a).parent().attr("class", "menuCurrent").attr("style","color:#e80000");
        $(a).attr("class", "menuCurrent").attr("style", "color:#e80000");
        openedMenu.attr("class", "h3Current").attr("style", "color:#e80000");
        //        $(a).parent().attr("class", "menuCurrent").attr("style","color:#e80000");
    }
});


//初始化省市地三级联动的dropdownlist，第二第三项如果不需要显示，参数为null即可
function AreaDropdown(provinceControlId, cityControlId, countyControlId, value) {
    if (provinceControlId.indexOf("#") != 0) {
        provinceControlId = "#" + provinceControlId;
    }
    if (cityControlId.indexOf("#") != 0) {
        cityControlId = "#" + cityControlId;
    }
    if (countyControlId.indexOf("#") != 0) {
        countyControlId = "#" + countyControlId;
    }

    $(provinceControlId).append("<option value='noSelectProvince'>请选择</option>");
    $(cityControlId).append("<option value='noSelectCity'>请选择</option>");
    $(countyControlId).append("<option value='noSelectCounty'>县(市、区)</option>");
    $.get("/static/Scripts/Area2010.xml", function (data) {
        $(data).find("province").each(function () {
            var province = $(this).attr("name");
            var provinceId = $(this).attr("id");
            $(provinceControlId).append("<option name=" + provinceId + " value=" + provinceId + ">" + province + "</option>");
        });

        $(provinceControlId).change(function () {
            $(cityControlId).empty();
            $(countyControlId).empty();
            if ($(this).val() != "noSelectProvince") {
                var provinceId = ($("option[value='" + $(this).val() + "']").attr("name"));
                var citySelectLength = 2;
                $(data).find("province[id=" + provinceId + "] city").each(function () {
                    var city = $(this).attr("name");
                    citySelectLength = city.length > citySelectLength ? city.length : citySelectLength;
                    var cityId = $(this).attr("id");
                    $(cityControlId).append("<option name='" + cityId + "," + provinceId + "' value=" + cityId + ">" + city + "</option>");
                });
                $(cityControlId).css("width", 17 * (citySelectLength + 1));
            }
            else {
                $(cityControlId).append("<option value='noSelectCity'>地级市</option>");
                $(countyControlId).append("<option value='noSelectCounty'>县(市、区)</option>");
            }
            $(data).find("province[id=" + $(this).val() + "] city:first area").each(function () {
                $(countyControlId).append("<option name=" + $(this).attr("id") + " value=" + $(this).attr("id") + ">" + $(this).attr("name") + "</option>");
            });
        });
        $(cityControlId).change(function () {
            $(countyControlId).empty();
            if ($(this).val() != "noSelectCity") {
                var cityIds = ($(cityControlId + " option[value='" + $(this).val() + "']").attr("name"));
                var cityId = cityIds.split(',')[0];
                var provinceId = cityIds.split(',')[1];
                var countySelectLength = 2;
                $(data).find("province[id=" + provinceId + "]").find("city[id=" + cityId + "] area").each(function () {
                    var countyId = $(this).attr("id");
                    var county = $(this).attr("name");
                    countySelectLength = county.length > countySelectLength ? county.length : countySelectLength;
                    $(countyControlId).append("<option name='" + countyId + "," + cityId + "' value=" + countyId + ">" + county + "</option>");
                });
                $(countyControlId).css("width", 17 * (countySelectLength + 1));
            }
        });

        //select default value
        if (value.length == 6) {
            var pId = value.substring(0, 2) + "0000";
            var cId = value.substring(0, 4) + "00";
            $(provinceControlId).attr("value", pId);

            $(data).find("province[id=" + pId + "] city").each(function () {
                var city = $(this).attr("name");
                var cityId = $(this).attr("id");
                $(cityControlId).append("<option name='" + cityId + "," + pId + "' value=" + cityId + ">" + city + "</option>");
            });
            $(cityControlId).attr("value", cId);
            $(data).find("province[id=" + pId + "]").find("city[id=" + cId + "] area").each(function () {
                var countyId = $(this).attr("id");
                var county = $(this).attr("name");
                $(countyControlId).append("<option name='" + countyId + "," + cId + "' value=" + countyId + ">" + county + "</option>");
            });
            $(countyControlId).attr("value", value);
        }
    });
}


//调用二级菜单
function LinkedSelect(parentSelectId, sonSelectId, nodeName, value) {
    if (parentSelectId.indexOf('#') != 0) {
        parentSelectId = "#" + parentSelectId;
    }
    if (sonSelectId.indexOf('#') != 0) {
        sonSelectId = "#" + sonSelectId;
    }
    $.get("/Scripts/SelectData.xml", function (data) {
        // alert(data);
        $(parentSelectId).empty();
        $(sonSelectId).empty();
        $(data).find(nodeName + ">p").each(function () {
            var text = $(this).attr("text");
            var id = $(this).attr("id");
            $(parentSelectId).append("<option name=" + id + " value=" + id + ">" + text + "</option>");
        });


        $(parentSelectId).change(function () {
            $(sonSelectId).empty();
            var id = $(parentSelectId).val();
            $(data).find(nodeName + ">p[id=" + id + "] s").each(function () {
                var sId = $(this).attr("id");
                var sText = $(this).attr("text");
                $(sonSelectId).append("<option name=" + sId + " value=" + sId + ">" + sText + "</option>");
            });
        });
        if (value != undefined && value.length == 6) {
            var pValue = value.substring(0, 4) + "00";
            $(parentSelectId).attr("value", pValue);
        }
        var id = $(parentSelectId).val();
        var parentSelectLength = 2;
        $(data).find(nodeName + ">p[id=" + id + "] s").each(function () {
            var sId = $(this).attr("id");
            var sText = $(this).attr("text");
            parentSelectLength = sText.length > parentSelectLength ? sText.length : parentSelectLength;
            $(sonSelectId).append("<option name=" + sId + " value=" + sId + ">" + sText + "</option>");
        });
        if (value != undefined && value.length == 6) {
            $(sonSelectId).attr("value", value);
        }
        var width = 17 * (parentSelectLength + 2);
        if (width > 200) {
            width = 200;
        }
        $(parentSelectId).attr("width", width);
    });
}


//调用三级菜单
function MutiplyLinkedSelect(grandFatherSelectId, fatherSelectId, sonSelectId, nodeName, value) {
    if (grandFatherSelectId.indexOf('#') != 0) {
        grandFatherSelectId = "#" + grandFatherSelectId;
    }
    if (fatherSelectId.indexOf('#') != 0) {
        fatherSelectId = "#" + fatherSelectId;
    }
    if (sonSelectId.indexOf('#') != 0) {
        sonSelectId = "#" + sonSelectId;
    }

    $(grandFatherSelectId).append("<option value='noSelectGrandfather'>请选择</option>");
    $.get("/Areas/Site/Content/SelectData.xml", function (data) {
        // alert(data);
        $(grandFatherSelectId).empty();
        $(fatherSelectId).empty();
        $(sonSelectId).empty();
        $(data).find(nodeName + ">a").each(function () {
            var text = $(this).attr("text");
            var id = $(this).attr("id");
            $(grandFatherSelectId).append("<option name=" + id + " value=" + id + ">" + text + "</option>");
        });


        $(grandFatherSelectId).change(function () {
            $(fatherSelectId).empty();
            $(sonSelectId).empty();
            $(fatherSelectId).append("<option value='noSelectGrandFather'>请选择</option>");
            $(sonSelectId).append("<option value='noSelectFather'>请选择</option>");
            var id = $(grandFatherSelectId).val();
            $(data).find(nodeName + ">a[id=" + id + "] b").each(function () {
                var sId = $(this).attr("id");
                var sText = $(this).attr("text");
                $(fatherSelectId).append("<option name=" + sId + " value=" + sId + ">" + sText + "</option>");
            });
        });

        $(fatherSelectId).change(function () {
            $(sonSelectId).empty();
            $(sonSelectId).append("<option value='noSelectFather'>请选择</option>");
            var id = $(fatherSelectId).val();
            var grandFatherId = $(grandFatherSelectId).val();
            $(data).find(nodeName + ">a[id=" + grandFatherId + "] >b[id=" + id + "] c").each(function () {
                var sId = $(this).attr("id");
                var sText = $(this).attr("text");
                $(sonSelectId).append("<option name=" + sId + " value=" + sId + ">" + sText + "</option>");
            });
        });



        var id = $(grandFatherSelectId).val();
        var parentSelectLength = 2;
        $(data).find(nodeName + ">a[id=" + id + "] b").each(function () {
            var sId = $(this).attr("id");
            var sText = $(this).attr("text");
            parentSelectLength = sText.length > parentSelectLength ? sText.length : parentSelectLength;
            $(fatherSelectId).append("<option name=" + sId + " value=" + sId + ">" + sText + "</option>");
        });
        var grandfatherValue;
        var fatherValue;
        if (value != undefined && value.length == 8) {
            grandfatherValue = value.substring(0, 4) + "0000";
            fatherValue = value.substring(0, 6) + "00";
            //设置grandfather选中
            $(grandFatherSelectId).attr("value", grandfatherValue);

            //设置father选中
            $(data).find(nodeName + ">a[id=" + $(grandFatherSelectId).val() + "] b").each(function () {
                var sId = $(this).attr("id");
                var sText = $(this).attr("text");
                $(fatherSelectId).append("<option name=" + sId + " value=" + sId + ">" + sText + "</option>");
            });
            $(fatherSelectId).attr("value", fatherValue);

            //设置son选中
            $(data).find(nodeName + ">a[id=" + $(grandFatherSelectId).val() + "] b[id=" + $(fatherSelectId).val() + "] c").each(function () {
                var sId = $(this).attr("id");
                var sText = $(this).attr("text");
                $(sonSelectId).append("<option name=" + sId + " value=" + sId + ">" + sText + "</option>");
            });
            $(sonSelectId).attr("value", value);
        }
        else {
            $(fatherSelectId).append("<option value='noSelectFather'>请选择</option>");
            $(sonSelectId).append("<option value='noSelectSon'>请选择</option>");
        }
    });
}

//弹窗
function ShowDialog(url, width, height) {
    var l = (screen.width - width) / 2;
    var t = (screen.height - height) / 2;
    var s = 'width=' + width + ', height=' + height + ', top=' + t + ', left=' + l;
    s += ', toolbar=no, scrollbars=no, menubar=no, location=no, resizable=no';
    open(url, 'oWin', s);
}

//设置两位小数
function formatFloat(src, pos) {
    if (pos == undefined) {
        pos = 2;
    }
    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}

//replace all
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}


//判断页面的formValidator是否全部通过检测
function CheckValidator() {
    var result=true;
    $("span[id$=Tip]").each(function () {
        var tmpClass=$(this).attr("class");
        if (tmpClass != "onCorrect" && tmpClass == "onShow" || tmpClass=="onError") {
            result = false;
            return false;
        }
    });
    return result;
}

//闪烁显示控件
function FadeInOut(el) {
    for (var i = 1; i < 4; i++) {
        $(el).css("background-color", "yellow");
        $(el).fadeOut(i*150);
        $(el).fadeIn(i*150);
    }
    setTimeout(_RemoveFadeInBackground(el),2000);
}
//构造一个可以返回无参数的函数，
function _RemoveFadeInBackground(el)
{
    return function(){
        RemoveFadeInBackground(el);
    }
}
//移除fadeInOut里面的高亮背景
function RemoveFadeInBackground(el)
{
    if($(el).css("background-color")=="yellow"){
        $(el).css("background-color", "");
    }
    $(el).focus();
}





   // <!--下拉菜单PNG 透明-->
    function correctPNG() // correctly handle PNG transparency in Win IE 5.5 & 6.   
    {
        var arVersion = navigator.appVersion.split("MSIE")
        var version = parseFloat(arVersion[1])
        if ((version >= 5.5) && (document.body.filters)) {
            for (var j = 0; j < document.images.length; j++) {
                var img = document.images[j]
                var imgName = img.src.toUpperCase()
                if (imgName.substring(imgName.length - 3, imgName.length) == "PNG") {
                    var imgID = (img.id) ? "id='" + img.id + "' " : ""
                    var imgClass = (img.className) ? "class='" + img.className + "' " : ""
                    var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
                    var imgStyle = "display:inline-block;" + img.style.cssText
                    if (img.align == "left") imgStyle = "float:left;" + imgStyle
                    if (img.align == "right") imgStyle = "float:right;" + imgStyle
                    if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle
                    var strNewHTML = "<span " + imgID + imgClass + imgTitle
             + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
             + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
             + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
                    img.outerHTML = strNewHTML
                    j = j - 1
                }
            }
        }
    }
//    window.attachEvent("onload", correctPNG);   



    function MM_swapImgRestore() { //v3.0
        var i, x, a = document.MM_sr; for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
    }

    function MM_preloadImages() { //v3.0
        var d = document; if (d.images) {
            if (!d.MM_p) d.MM_p = new Array();
            var i, j = d.MM_p.length, a = MM_preloadImages.arguments; for (i = 0; i < a.length; i++)
                if (a[i].indexOf("#") != 0) { d.MM_p[j] = new Image; d.MM_p[j++].src = a[i]; } 
        }
    }

    function MM_findObj(n, d) { //v4.01
        var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
            d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
        }
        if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
        for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
        if (!x && d.getElementById) x = d.getElementById(n); return x;
    }

    function MM_swapImage() { //v3.0
        var i, j = 0, x, a = MM_swapImage.arguments; document.MM_sr = new Array; for (i = 0; i < (a.length - 2); i += 3)
            if ((x = MM_findObj(a[i])) != null) { document.MM_sr[j++] = x; if (!x.oSrc) x.oSrc = x.src; x.src = a[i + 2]; }
    }

    function MM_preloadImages() { //v3.0
        var d = document; if (d.images) {
            if (!d.MM_p) d.MM_p = new Array();
            var i, j = d.MM_p.length, a = MM_preloadImages.arguments; for (i = 0; i < a.length; i++)
                if (a[i].indexOf("#") != 0) { d.MM_p[j] = new Image; d.MM_p[j++].src = a[i]; } 
        }
    }

    function MM_swapImgRestore() { //v3.0
        var i, x, a = document.MM_sr; for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
    }

    function MM_findObj(n, d) { //v4.01
        var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
            d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
        }
        if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
        for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
        if (!x && d.getElementById) x = d.getElementById(n); return x;
    }

    function MM_swapImage() { //v3.0
        var i, j = 0, x, a = MM_swapImage.arguments; document.MM_sr = new Array; for (i = 0; i < (a.length - 2); i += 3)
            if ((x = MM_findObj(a[i])) != null) { document.MM_sr[j++] = x; if (!x.oSrc) x.oSrc = x.src; x.src = a[i + 2]; }
    }
    function MM_showHideLayers() { //v9.0
        var i, p, v, obj, args = MM_showHideLayers.arguments;
        for (i = 0; i < (args.length - 2); i += 3)
            with (document) if (getElementById && ((obj = getElementById(args[i])) != null)) {
                v = args[i + 2];
                if (obj.style) { obj = obj.style; v = (v == 'show') ? 'visible' : (v == 'hide') ? 'hidden' : v; }
                obj.visibility = v;
            }
    }
    //下拉菜单  JS 结束
    //模式窗体 复制文字
    function CopyText(Text) {
        window.clipboardData.setData("Text", Text);
    }