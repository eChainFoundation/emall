// jQuery Menu Tree Plugin
//
// Version 1.0
//
// Usage: $('.menuTree').menuTree( options, callback )
//
// Options:
// menuEvent - event to trigger expand/collapse; default = click
// expandSpeed - default = 500 (ms); use -1 for no animation
// collapseSpeed - default = 500 (ms); use -1 for no animation
// expandEasing - easing function to use on expand (optional)
// collapseEasing - easing function to use on collapse (optional)
// multiOpenedSubMenu - whether or not to limit to one opened menu at a time; default = false;
// parentMenuTriggerCallback - whether or not parent menu triggers callback; default = false;
// expandedNode - default node to expand (optional)
//
// Callback:
// a callback function triggered with <a> 'rel' parameter.
//
// History:
// download by http://www.mb5u.com
// 1.0 - first release (28 May 2009)
//
if (jQuery) (function($) {
$.extend($.fn, {
menuTree: function(o, callback) {
// Default parameters
if (!o) var o = {};
o.data = this.html();
if (o.menuEvent == undefined) o.menuEvent = 'click';
if (o.expandSpeed == undefined) o.expandSpeed = 500;
if (o.collapseSpeed == undefined) o.collapseSpeed = 500;
if (o.expandEasing == undefined) o.expandEasing = null;
if (o.collapseEasing == undefined) o.collapseEasing = null;
if (o.multiOpenedSubMenu == undefined) o.multiOpenedSubMenu = false;
if (o.parentMenuTriggerCallback == undefined) o.parentMenuTriggerCallback = false;
if (o.expandedNode == undefined) o.expandedNode = null;
$(this).each(function() {
function bindTree(t) {
var liClickedSelector = callback != undefined ? 'LI > A' : 'LI.parent > A';
$(t).find(liClickedSelector).bind(o.menuEvent, function() {
currentItem = $(this);
if ($(this).parent().hasClass('parent')) {
if ($(this).parent().hasClass('expanded')) {
// Collapse
$(this).parent().find('UL').slideUp({ duration: o.collapseSpeed, easing: o.collapseEasing });
$(this).parent().removeClass('expanded').addClass('collapsed');
} else {
// Expand
if (!o.multiOpenedSubMenu) {
$(this).parent().parent().find('UL').slideUp({ duration: o.collapseSpeed, easing: o.collapseEasing });
$($(this).parent().find("UL")[0]).attr("style","display:block");
$(this).parent().parent().find('LI.parent').removeClass('expanded').addClass('collapsed');
}
$($(this).parent().find("UL")[0]).slideDown({ duration: o.expandSpeed, easing: o.expandEasing });
$($(this).parent().find("UL")[0]).attr("style","display:block");
$(this).parent().removeClass('collapsed').addClass('expanded');
$(this).parent().find('LI.parent').removeClass('expanded').addClass('collapsed');
if (o.parentMenuTriggerCallback)
callback($(this).attr('rel'));
}
} else {
callback($(this).attr('rel'));
}
return false;
});
// Prevent A from triggering the # on non-click events
if (o.menuEvent.toLowerCase != 'click') $(t).find(liClickedSelector).bind('click', function() { return false; });
}
// initialization
$($(this)).find(":first").show();
bindTree($(this));
// Expend default node
if (o.expandedNode) {
var elementToExpend = $($(this)).find("a[rel=" + o.expandedNode + "]").parent().parent();
// Collect all UL items that need to be extended
var ulMenuElements = new Array();
var i = 0;
while (elementToExpend && elementToExpend.find('DIV').length == 0) {
if (elementToExpend[0].tagName == "UL") {
ulMenuElements[i] = elementToExpend;
i++;
}
elementToExpend = elementToExpend.parent();
}
ulMenuElements = ulMenuElements.reverse()
// Extend all collected item (recursive)
var i = 0;
var openMenu = function() {
i++; // skip first ul(root)
if (i >= ulMenuElements.length) return;
ulMenuElements[i].removeClass('collapsed').addClass('expanded');
ulMenuElements[i].slideDown({ duration: o.expandSpeed, easing: o.expandEasing, complete: openMenu });
}
openMenu(ulMenuElements);
}
});
}
});
})(jQuery);

jQuery.cookie = function(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires
				&& (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime()
						+ (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires
															// attribute,
															// max-age is not
															// supported by IE
		}
		var path = options.path ? '; path=' + options.path : '';
		var domain = options.domain ? '; domain=' + options.domain : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [ name, '=', encodeURIComponent(value), expires,
				path, domain, secure ].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for ( var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie
							.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

function getcookie(name) {
	var cookie_start = document.cookie.indexOf(name);
	var cookie_end = document.cookie.indexOf(";", cookie_start);
	return cookie_start == -1 ? '' : unescape(document.cookie.substring(
			cookie_start + name.length + 1,
			(cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}

function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
	var expires = new Date();
	expires.setTime(expires.getTime() + seconds);
	document.cookie = escape(cookieName) + '=' + escape(cookieValue)
			+ (expires ? '; expires=' + expires.toGMTString() : '')
			+ (path ? '; path=' + path : '/')
			+ (domain ? '; domain=' + domain : '') + (secure ? '; secure' : '');
}
function setcookie(cookieName, cookieValue) {
	var expires = new Date();
	expires.setTime(expires.getTime() + 90000000);
	document.cookie = escape(cookieName) + '=' + escape(cookieValue)+'; path=/';
}
var newIndustryName ="";

function bindIndustry(){
	$(".PackagesPop dl:first").find('dd').bind("click",function(){
		selectIndustry(this);
	});
	
}
function bindHeadIndustry(){
	$(".SectorsTopOver dl dd").bind("click",function(){
		selectIndustry(this);
	});
}

function bindNoIndustry(){
	$(".showseif-industry .Packages").find('li').bind("click",function(){
		selectIndustry(this);
	});
}
function selectIndustry(obj){
	newIndustryName = $(obj).find("span").html();
	var nowIndustryMsg = $(".nowIndustryMsg").val();
	
	if(packageid<2 || nowIndustryMsg=="" ){
		$(".noIndustryError").html("您没有权限使用此功能！  此功能仅支持行业套餐用户，请先开通"+newIndustryName+"套餐。");
	}else{
		
		$(".noIndustryError").html("您已经购买"+nowIndustryMsg+"套餐！  如想购买其他套餐，请直接与我们联系。");
	}
	var parameters = {
			industryId : $(obj).attr("iid"),
			businessId : businessId
		};
	getMeun(parameters);
}
function bindClick(obj){
	obj.find('a[t="nav"]').bind("click",function(){
	if($(this).attr("m_href")==null || $(this).attr("m_href")=="" || $(this).attr("m_href").lenght==0){
		$("#shownowpermission").show();
	}	else{
		setcookie('nowmenuid',$(this).parent().attr("menuid")==undefined ? 0 : $(this).parent().attr("menuid"));	
		window.location.href=$(this).attr("m_href");
	}
	});
}
function getMeun(parameters) {
	$.ajax({
		url : "/common/industry/menu/info.json",
		type : "get",
		dataType : "json",
		data : parameters,
		async : false,
		success : function(data) {
			initIndustryView(data);
		}
	});
}
function template_entry_industry(industryMenus){
	var $industryentry=$(".showseif-industry");
	$industryentry.find(".Industry").remove();
	var industryentry=$('<div class="Industry"></div>');
	var ul=$('<ul></ul>');
	 
	for(var entry in industryMenus){
		if(industryMenus[entry].url!=null && industryMenus[entry].url !="")
		ul.append($('<li><a t="nav" menuid="'+industryMenus[entry].id+'" m_href="'+industryMenus[entry].url+'"><img src="'+industryMenus[entry].imagepath+'"><span>'+industryMenus[entry].name+'</span></a></li>'));
	}
	industryentry.append(ul);
	$industryentry.find(".OverviewCer").after(industryentry);
}
function template_amenu_industry(industry, cssName,allIndustry) {
	var industry_html = $(' <ul style="display: block;"><li class="parent"></li></ul>');
	var title_html = $('<a href="#" class="Amenu '+cssName+'">'
			+ industry.industryMenu.name + '<div class="industrysetting"></div></a>');
	industry_html.find('.parent').append(title_html);
	var industryMenus=new Array();
	if (industry.childMenu.length > 0) {
		$("#shownowpermission").hide();
		unbindMenu();
		$(".leftbar h1:first").hide();
		var childMenu = industry.childMenu;
		var child_menu_html = $('<ul class="menubox" style="display:block"></ul>');
		for ( var menu in childMenu) {
			if (childMenu[menu].industryMenu != null) {
				var industryMenu_html = $('<li menuid="'+childMenu[menu].industryMenu.id+'" class="parent collapsed"><a class="Twomenu" href="#"><img src="'+childMenu[menu].industryMenu.imagepath+'">'
						+ childMenu[menu].industryMenu.name + '</a></li>');
				if (childMenu[menu].childMenu.length > 0) {
					var child_menu = childMenu[menu].childMenu;
					var child_html_list = $(' <ul class="menubox1"></ul>');
					for ( var child in child_menu) {
						var child_html = $('<li p="three" menuid="'+child_menu[child].industryMenu.id+'" class="child"><a t="nav" class="Threemenu" m_href="'+child_menu[child].industryMenu.url+'">'
								+ child_menu[child].industryMenu.name
								+ '</a></li>');
						child_html_list.append(child_html);
						if(child_menu[child].industryMenu.flag==1)
						industryMenus.push( child_menu[child].industryMenu);
					}
					industryMenu_html.append(child_html_list);
				} else {
					industryMenu_html = $('<li p="two" menuid="'+childMenu[menu].industryMenu.id+'" class="child "><a  class="Twomenu" t="nav" m_href="'+childMenu[menu].industryMenu.url+'"><img src="'+childMenu[menu].industryMenu.imagepath+'">'
							+ childMenu[menu].industryMenu.name
							+ '</a></li>');
					if(childMenu[menu].industryMenu.flag==1)
					industryMenus.push(childMenu[menu].industryMenu);
				}
				child_menu_html.append(industryMenu_html);
			}
		}
		template_entry_industry(industryMenus);
		industry_html.find('.parent').append(child_menu_html);
	}else{
		$(".leftbar h1:first").hide();
	}
	$('#menu1').html(industry_html);
	
	initMenuTreeDisplay();
	bingMenuTree();
	
}
function createAllIndustry(allIndustry){
	var all_html=$('<ul></ul>');
	for(var industry in  allIndustry){
		all_html.append('<li iid="'+allIndustry[industry].industryid+'" ><a href="#"><img src="'+allIndustry[industry].imagepath+'"><span>'+allIndustry[industry].name+'</span></a></li>');
	}
	return all_html;
}

function initAllIndustry(allIndustry){
	var all_html=$('<div class="PackagesPop"><dl><dt>全部行业套餐</dt></dl></div>');
	for(var industry in  allIndustry){
		var lock_logo='';
		if(allIndustry[industry].industryid==industryId)
			lock_logo='<p class="liberal"></p>';
		all_html.find("dt").after(' <dd iid="'+allIndustry[industry].industryid+'"><img src="'+allIndustry[industry].imagepath+'" /><span>'+allIndustry[industry].name+'</span>'+lock_logo+'</dd>');
	}
	return all_html;
}
function initTopAllIndustry(allIndustry){
	//SectorsTopOver
	var all_html=$('<dl></dl>');
	for(var industry in  allIndustry){
		all_html.append('<dd iid="'+allIndustry[industry].industryid+'" style=""><img width="34" height="34" src="'+allIndustry[industry].headPic+'"><span>'+allIndustry[industry].name+'</span></dd>');
	}
	return all_html;
}
function clearClick(menuBar){
	menuBar.find(".TwomenuOver").removeClass("TwomenuOver");
	menuBar.find(".ThreemenuOver").removeClass("ThreemenuOver");
}
function setClick(nowMenu){
	if(nowMenu.attr("p")=="two")
		nowMenu.find("a").addClass("TwomenuOver");
	if(nowMenu.attr("p")=="three")
		nowMenu.find("a").addClass("ThreemenuOver");
}
function initMenuTreeDisplay(){
	var nowMenuid=getcookie('nowmenuid');
	var menuBar=$("#menu1");
	var nowMenu=menuBar.find('li[menuid="'+nowMenuid+'"]');
	menuBar.find(".parent").removeClass("collapsed").addClass("expanded");
	clearClick(menuBar);
	if(nowMenu.length>0 &&nowMenu){
		setClick(nowMenu);
		menuBar.find(".menubox").show();
		menuBar.find(".menubox").show();
		nowMenu.parents(".menubox1").show();
		nowMenu.parents(".parent").removeClass("collapsed").addClass("expanded");
	}
	
}
function unbindMenu(){
	$('#menu1').unbind();
	$(".Amenu").unbind();
	$(".PackagesPop").unbind();
	$(".OrdersCheck").unbind();
	$(".OrdersQty,.OrdersCheck").unbind();
}
function bingMenuTree() {
	
	$('#menu1').menuTree();
	$(".Amenu").hover(function(e) {
		$(".PackagesPop").stop().animate({
			width : "609px"
		}, "fast");
	}, function() {
		$(".PackagesPop").stop().animate({
			width : "0"
		}, "fast");
	});
	$(".OrdersQty,.OrdersCheck").mouseenter(function() {
		$(".OrdersCheck").stop().fadeIn();
	});
	$(".OrdersQty,.OrdersCheck").mouseleave(function() {
		$(".OrdersCheck").stop().fadeOut();
	});
	bindClick($('#menu1'));
	bindClick($('.showseif-industry .Industry'));
}

function initIndustryView(data) {
	var nowIndustry = data.nowIndustry;
	for ( var industry in nowIndustry) {
		if (nowIndustry[industry].industryMenu != null) {
			$('#menu1').html();
			var nowShowIndustry=nowIndustry[industry];
			var styleName="provider";
			switch (nowIndustry[industry].industryMenu.id) {
			case "1":
				styleName='Retail';
				break;
			case "2":
				styleName='provider';
				break;
			case "6":
				styleName='Automobile';
				break;
			case "7":
				styleName='Medical';
				break;
			case "2002":
				styleName='Estate';
				break;	
			case "2005":
				styleName='Grooming';
				break;	
			case "2001":
				styleName='Recreation';
				break;	
			case "2003":
				styleName='Hotels';
				break;	
			case "2004":
				styleName='Photostudio';
				break;	
			}
			template_amenu_industry(nowShowIndustry, styleName,data.allIndustry);
		}
		
	}
	//$('#menu1 .Amenu').append(initAllIndustry(data.allIndustry));
	var amenu=$('#menu1 .Amenu');
	$('.SectorsTopOver').html('').append(initTopAllIndustry(data.allIndustry));
	if(amenu.length==0){
		$(".showseif-industry .Packages").html("").append(createAllIndustry(data.allIndustry));
		bindNoIndustry();
	}
	else{
		
		$('#menu1 .Amenu').append(initAllIndustry(data.allIndustry)).slideDown({ duration: 700, easing: null });
	}
	bindHeadIndustry();
	bindIndustry();
	
}
