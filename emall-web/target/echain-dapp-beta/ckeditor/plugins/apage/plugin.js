CKEDITOR.plugins.add('apage',{
    init:function(editor){
        editor.addCommand( 'apage', new CKEDITOR.dialogCommand( 'apage' ));
        editor.ui.addButton( 'Page',{label:editor.lang.pagebreak,icon:this.path+'images/555.bmp',command:'apage'});        
        CKEDITOR.dialog.add('apage',function(){
            return {
                title : 'ʵ�ַ�ҳ����',
                minWidth : 350,
                minHeight : 100,
                contents : [{id : 'tab1',label : 'First Tab',title : 'First Tab',elements :[{id:'pagetitle',type:'text',label :'��������һҳ���±���'}]}],
                onOk : function(){
                    editor = this.getParentEditor();
                    
                    editor.insertText("<p><!-- pagebreak -->&nbsp;</p>");
                   // editor.insertHtml("[#page_"+this.getValueOf( 'tab1', 'pagetitle' )+"#]");
                }
            };
        });
    },
    requires : [ 'fakeobjects' ]
});
