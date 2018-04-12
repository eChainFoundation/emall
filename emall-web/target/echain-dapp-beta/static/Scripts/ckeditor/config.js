/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
    // config.uiColor = '#AADC6E';

    /*
    Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
    For licensing, see LICENSE.html or http://ckeditor.com/license
    */


        config.language = 'zh-cn';
        config.skin = 'v2';
        config.font_names = 'Arial/Arial;Courier New/Courier New;Tahoma/Tahoma;Times New Roman/Times New Roman;宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;';
        config.width = 900;
        config.height = 600;
        config.toolbar =
        [
        ['Save', 'Preview', 'Source'], //'NewPage', 
        ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord'],
        ['Undo', 'Redo', '-', 'Find', 'Replace', 'SelectAll'],
        ['Form', 'Button', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select'],
        ['Link', 'Unlink'],
        ['Image', 'Flash', 'Table', 'HorizontalRule', 'SpecialChar'],
        '/',
        ['Format', 'Font', 'FontSize'],
        ['TextColor', 'BGColor'],
        ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
        ['NumberedList', 'BulletedList'],
        ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
        ];
};
