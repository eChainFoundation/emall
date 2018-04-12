/** 
* 浮动DIV定时显示提示信息,如操作成功, 失败等 
* @param string tips (提示的内容) 
* @param int height 显示的信息距离浏览器顶部的高度 
* @param int time 显示的时间(按秒算), time > 0 
* @sample <a href="javascript:void(0);" onclick="ShowTips( '操作成功', 100, 3 );">点击</a> 
* @sample 上面代码表示点击后显示操作成功3秒钟, 距离顶部100px 
*/
function ShowTips(tips, height, time) {
    var windowWidth = document.documentElement.clientWidth;
    var tipsDiv = '<div class="tipsClass">' + tips + '</div>';
    if (height == undefined) {
        height = 100;
    }
    if (time == undefined) {
        time = 3;
    }
    var top = document.documentElement.scrollTop + "px"; 
    $('body').append(tipsDiv);
    $('div.tipsClass').css({
        'top': top,
        'left': (windowWidth / 2) - (tips.length * 13 / 2) + 'px',
        'position': 'absolute',
        'padding': '2px 6px 2px 6px',
        'background':'green',
        'font-size': 12 + 'px',
        'margin': '0 auto',
        'text-align': 'center',
        'width': 'auto',
        'color': 'white',
        'opacity': '0.8',
        'border': '0px solid #e9d315'
    }).show();
    setTimeout(function () { $('div.tipsClass').fadeOut(); }, (time * 1000));
}


function OpenModalDialog(url, width, height) {
    if (width == undefined) {
        width = 800;
    }
    if (height == undefined) {
        height = 600;
    }
    //var returndata = false;
    try {
        returndata = showModalDialog(url, "newwindow", "dialogHeight:" + height + "px;dialogWidth:" + width + "px; dialogTop:screen.height/4;dialogLeft:screen.width/4; edge:sunken ; center: Yes; help: No; resizable: Yes; status: No; scroll:yes;");
        return returndata;
//        if (recdata == true) {
//            // 刷新当前窗口 
//            window.location.href = window.location.href;
//            window.location.href.reload();
//        }
    } 
    catch (err)
    { }
}