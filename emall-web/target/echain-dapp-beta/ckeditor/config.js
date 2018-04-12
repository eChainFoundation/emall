/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	 //Define changes to default configuration here. For example:
	  config.language = 'zh-cn';
      config.uiColor = '#AADC6E';
      config.skin = 'office2003'; //v2,office2003,kama

      config.font_names='宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;'+ config.font_names;
      config.enterMode = CKEDITOR.ENTER_BR;//去<p></p>标签
      config.shiftEnterMode = CKEDITOR.ENTER_P;
      config.extraPlugins += (config.extraPlugins ? ',lineheight' : 'lineheight');
       //config.extraPlugins += (config.extraPlugins ? ',apage' : 'apage');
      config.toolbar_Full =[

['Source','-','Save','NewPage','Preview','-','Templates'],

['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],

['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],

['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],

'/',

['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],

['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],

['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],

['Link','Unlink','Anchor'],

['Image','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],

'/',

['Styles','Format','Font','FontSize','lineheight'],

['TextColor','BGColor'],['Maximize','-','About']

];


};


CKEDITOR.on( 'instanceReady', function( ev ){
     with (ev.editor.dataProcessor.writer) {
       setRules("p",  {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
       setRules("h1", {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
       setRules("h2", {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
       setRules("h3", {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
       setRules("h4", {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
       setRules("h5", {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
       setRules("div", {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
       setRules("table", {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
       setRules("tr", {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
       setRules("td", {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
       setRules("iframe", {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
       setRules("li", {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
       setRules("ul", {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
       setRules("ol", {indent : false, breakBeforeOpen : false, breakAfterOpen : false, breakBeforeClose : false, breakAfterClose : false} );
     }
})

