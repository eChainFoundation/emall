/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
 function getBasePath() {
        var curWwwPath = window.document.location.href;
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
         var localhostPaht = curWwwPath.substring(0, pos);
 //       var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
 //     return (localhostPaht + projectName);
 		return localhostPaht
 }
CKEDITOR.editorConfig = function( config )
{
	config.language = 'zh-cn';//语言设置  
    config.uiColor='#ADE82E';//颜色  
    //config.width='500px';//宽度  
    //config.height='200px';//高度  
    config.skin='office2003';//界面：kama/office2003/v2  
    config.toolbar='Full';//工具栏：Full/Basic  
	config.font_names='宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;'+ config.font_names;
    
    //配置CKFinder
    config.filebrowserBrowseUrl =getBasePath()+'/static/js/ckfinder/ckfinder.html';
    config.filebrowserImageBrowseUrl =getBasePath()+'/static/js/ckfinder/ckfinder.html?Type=Images';
    config.filebrowserFlashBrowseUrl = getBasePath()+'/static/js/ckfinder/ckfinder.html?Type=Flash';
    config.filebrowserUploadUrl = getBasePath()+'/static/js/ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Files';
    config.filebrowserImageUploadUrl = getBasePath()+'/static/js/ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Images';
    config.filebrowserFlashUploadUrl = getBasePath()+'/static/js/ckfinder/core/connector/java/connector.java?command=QuickUpload&type=Flash';
    config.filebrowserWindowHeight='50%';//CKFinder浏览窗口高度,默认值70%，也可以赋像素值如：1000
    config.filebrowserWindowWidth='70%';//CKFinder浏览窗口宽度,默认值80%，也可以赋像素值
};

