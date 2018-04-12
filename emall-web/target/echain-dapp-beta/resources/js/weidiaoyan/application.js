if (typeof jQuery !== 'undefined') {
	(function($) {
		$('#spinner').ajaxStart(function() {
			$(this).fadeIn();
		}).ajaxStop(function() {
			$(this).fadeOut();
		});
	})(jQuery);
}

(function($){  
    $.fn.serializeJson=function(){  
        var serializeObj={};  
        $(this).find('input,select,textarea,.groupcontainer').each(function(){
        	var $self = $(this);
        	if($self.hasClass('groupcontainer')) {
        		var group = {};
        		$self.find('input').each(function(){
        			group[$(this).attr('name')] = $(this).val();
        		});
        		if($.isArray(serializeObj[$self.attr('groupname')])){  
    				serializeObj[$self.attr('groupname')].push(group);  
    			}else{  
    				serializeObj[$self.attr('groupname')]=[group];  
    			}
        	}
        	if(!$self.hasClass('group')) {
            	var val = $.trim($self.val());
            	if($self.attr('isoptions')) {
            		if(val) {
            			var option = {name:val,isanswer:$self.attr('isanswer')};
            			if($.isArray(serializeObj[$self.attr('isoptions')])){  
            				serializeObj[$self.attr('isoptions')].push(option);  
            			}else{  
            				serializeObj[$self.attr('isoptions')]=[option];  
            			}
            		}
            	} else {  
                    serializeObj[$self.attr('name')]=$self.val();
                } 
        	}
        });
        return serializeObj;  
    };  
})(jQuery);

$(document).ready(function(){
	$('#sidebar .list-group-item').each(function(){
		$(this).click(function(){
			var $self = $(this);
			if(!$self.hasClass('panel-title')) {
				$.ajax({
				   	type: "POST",
				   	url: app.contextPath + $self.attr('url'),
				   	success: function(res) {
				   		if(res != 'error') {
				   			$('#containerDiv').html(res);
							$('#sidebar .list-group-item').removeClass('active');
							$self.addClass('active');
							initUploadBtn();
					   	}
				   	}
				});
			}
		});
	});
	
	setInterval(function(){
		if(window.location.href.indexOf('login/auth') == -1 
				&& window.location.href.indexOf('logout') == -1
				&& window.location.href.indexOf('release') == -1) {
			$.ajax({
				type: "POST",
				url: app.contextPath + "/login/checkSessionTimeout",
				success: function(res) {
					if(res == 'doLogout') {
						document.location = app.contextPath + "/logout";
					}
				}
			});
		}
	}, app.sessionInterval * 1000);
});

function initUploadBtn() {
	$('.uploadBtn').each(function(){
		var button = this;
		var $el = $(this);
		var $img = $el.find('img');
		var $input = $el.find('input[type=hidden]');
		var $preview = $input.attr('preview');
		new qq.FineUploaderBasic({
			button: button,
			uploaderType: 'basic',
			multiple: false,
			request: {
				params: {},
				endpoint: app.contextPath + "/image/upload",
				inputName: 'myfile',
				forceMultipart: true
			},
			text: {
				uploadButton: $el.html()
			},
			validation: {
				allowedExtensions: ['jpg','png','gif','jpeg','bmp','tiff'],
				sizeLimit: 2097152 // 2 mB = 2 * 1024 * 1024 bytes
			},
			callbacks: {
				onError: function(id, fileName, errorReason) {
					if(errorReason.indexOf('too large') >= 0) {
						alert("鍥剧墖杩囧ぇ锛屾渶澶�" + errorReason.substring(errorReason.lastIndexOf('is ') + 3, errorReason.length - 1));
					}
				},
				onUpload: function(id, fileName) {
				},
				onProgress: function(id, fileName, loaded, total) {
				},
				onComplete: function(id, fileName, responseJSON) {
					var imgFile = responseJSON.file;
					$img.attr('src', app.contextPath + '/' + imgFile.substring(imgFile.indexOf('temp'), imgFile.length));
					$input.val(imgFile);
					if($preview != "")$("#"+$preview).attr("src",app.contextPath + '/' + imgFile.substring(imgFile.indexOf('temp'), imgFile.length));
					$input.addClass('completed');
					$('.icon-remove').removeClass('hide');
					$('.uploadCompleteBtn').removeClass('btn-default');
					$('.uploadCompleteBtn').addClass('btn-success');
					$el.find('input[type=file]').css('height', $el.height());
				}
			}
		});
		$el.find('input[type=file]').css('height', $el.height());
	});
}

function checkForm($form) {
	var result = true;
	$form.find('input[required=true]').each(function(){
		if(!$.trim($(this).val())) {
			result = false;
		}
	});
	return result;
}

var initDatepicker = function() {  
    $('input[type=date]').each(function() {  
        var $input = $(this);  
        $input.attr('readonly', true);
        $input.datepicker({  
            minDate: $input.attr('min'),  
            maxDate: $input.attr('max'),  
            dateFormat: 'yy-mm-dd'  
        });  
    });  
    $('input[type=number]').each(function() {  
        $(this).val($(this).attr('title'));
    });
};