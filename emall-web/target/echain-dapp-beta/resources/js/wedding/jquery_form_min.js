
/*!
 * jQuery Form Plugin
 * version: 3.27.0-2013.02.06
 * @requires jQuery v1.5 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses:
 *    http://malsup.github.com/mit-license.txt
 *    http://malsup.github.com/gpl-license-v2.txt
 */
/*global ActiveXObject alert */
(function (e) {
	"use strict";
	function n(t) {
		var n = t.data;
		if (!t.isDefaultPrevented()) {
			t.preventDefault();
			e(this).ajaxSubmit(n);
		}
	}
	function r(t) {
		var n = t.target, r = e(n);
		if (!r.is("[type=submit],[type=image]")) {
			var i = r.closest("[type=submit]");
			if (i.length === 0) {
				return;
			}
			n = i[0];
		}
		var s = this;
		s.clk = n;
		if (n.type == "image") {
			if (t.offsetX !== undefined) {
				s.clk_x = t.offsetX;
				s.clk_y = t.offsetY;
			} else {
				if (typeof e.fn.offset == "function") {
					var o = r.offset();
					s.clk_x = t.pageX - o.left;
					s.clk_y = t.pageY - o.top;
				} else {
					s.clk_x = t.pageX - n.offsetLeft;
					s.clk_y = t.pageY - n.offsetTop;
				}
			}
		}
		setTimeout(function () {
			s.clk = s.clk_x = s.clk_y = null;
		}, 100);
	}
	function i() {
		if (!e.fn.ajaxSubmit.debug) {
			return;
		}
		var t = "[jquery.form] " + Array.prototype.join.call(arguments, "");
		window.console && window.console.log ? window.console.log(t) : window.opera && window.opera.postError && window.opera.postError(t);
	}
	var t = {};
	t.fileapi = e("<input type='file'/>").get(0).files !== undefined;
	t.formdata = window.FormData !== undefined;
	e.fn.ajaxSubmit = function (n) {
		function T(t) {
			var n = e.param(t).split("&"), r = n.length, i = [], s, o;
			for (s = 0; s < r; s++) {
				n[s] = n[s].replace(/\+/g, " ");
				o = n[s].split("=");
				i.push([decodeURIComponent(o[0]), decodeURIComponent(o[1])]);
			}
			return i;
		}
		function N(t) {
			var i = new FormData;
			for (var s = 0; s < t.length; s++) {
				i.append(t[s].name, t[s].value);
			}
			if (n.extraData) {
				var o = T(n.extraData);
				for (s = 0; s < o.length; s++) {
					o[s] && i.append(o[s][0], o[s][1]);
				}
			}
			n.data = null;
			var u = e.extend(!0, {}, e.ajaxSettings, n, {contentType:!1, processData:!1, cache:!1, type:r || "POST"});
			n.uploadProgress && (u.xhr = function () {
				var e = jQuery.ajaxSettings.xhr();
				e.upload && e.upload.addEventListener("progress", function (e) {
					var t = 0, r = e.loaded || e.position, i = e.total;
					e.lengthComputable && (t = Math.ceil(r / i * 100));
					n.uploadProgress(e, r, i, t);
				}, !1);
				return e;
			});
			u.data = null;
			var a = u.beforeSend;
			u.beforeSend = function (e, t) {
				t.data = i;
				a && a.call(this, e, t);
			};
			return e.ajax(u);
		}
		function C(t) {
			function T(e) {
				var t = e.contentWindow ? e.contentWindow.document : e.contentDocument ? e.contentDocument : e.document;
				return t;
			}
			function k() {
				function o() {
					try {
						var e = T(d).readyState;
						i("state = " + e);
						e && e.toLowerCase() == "uninitialized" && setTimeout(o, 50);
					}
					catch (t) {
						i("Server abort: ", t, " (", t.name, ")");
						_(x);
						b && clearTimeout(b);
						b = undefined;
					}
				}
				var t = u.attr("target"), n = u.attr("action");
				s.setAttribute("target", h);
				r || s.setAttribute("method", "POST");
				n != f.url && s.setAttribute("action", f.url);
				!f.skipEncodingOverride && (!r || /post/i.test(r)) && u.attr({encoding:"multipart/form-data", enctype:"multipart/form-data"});
				f.timeout && (b = setTimeout(function () {
					y = !0;
					_(S);
				}, f.timeout));
				var a = [];
				try {
					if (f.extraData) {
						for (var l in f.extraData) {
							f.extraData.hasOwnProperty(l) && (e.isPlainObject(f.extraData[l]) && f.extraData[l].hasOwnProperty("name") && f.extraData[l].hasOwnProperty("value") ? a.push(e("<input type=\"hidden\" name=\"" + f.extraData[l].name + "\">").val(f.extraData[l].value).appendTo(s)[0]) : a.push(e("<input type=\"hidden\" name=\"" + l + "\">").val(f.extraData[l]).appendTo(s)[0]));
						}
					}
					if (!f.iframeTarget) {
						p.appendTo("body");
						d.attachEvent ? d.attachEvent("onload", _) : d.addEventListener("load", _, !1);
					}
					setTimeout(o, 15);
					var c = document.createElement("form").submit;
					c.apply(s);
				}
				finally {
					s.setAttribute("action", n);
					t ? s.setAttribute("target", t) : u.removeAttr("target");
					e(a).remove();
				}
			}
			function _(t) {
				if (v.aborted || M) {
					return;
				}
				try {
					A = T(d);
				}
				catch (n) {
					i("cannot access response document: ", n);
					t = x;
				}
				if (t === S && v) {
					v.abort("timeout");
					E.reject(v, "timeout");
					return;
				}
				if (t == x && v) {
					v.abort("server abort");
					E.reject(v, "error", "server abort");
					return;
				}
				if (!A || A.location.href == f.iframeSrc) {
					if (!y) {
						return;
					}
				}
				d.detachEvent ? d.detachEvent("onload", _) : d.removeEventListener("load", _, !1);
				var r = "success", s;
				try {
					if (y) {
						throw "timeout";
					}
					var o = f.dataType == "xml" || A.XMLDocument || e.isXMLDoc(A);
					i("isXml=" + o);
					if (!o && window.opera && (A.body === null || !A.body.innerHTML) && --O) {
						i("requeing onLoad callback, DOM not available");
						setTimeout(_, 250);
						return;
					}
					var u = A.body ? A.body : A.documentElement;
					v.responseText = u ? u.innerHTML : null;
					v.responseXML = A.XMLDocument ? A.XMLDocument : A;
					o && (f.dataType = "xml");
					v.getResponseHeader = function (e) {
						var t = {"content-type":f.dataType};
						return t[e];
					};
					if (u) {
						v.status = Number(u.getAttribute("status")) || v.status;
						v.statusText = u.getAttribute("statusText") || v.statusText;
					}
					var a = (f.dataType || "").toLowerCase(), l = /(json|script|text)/.test(a);
					if (l || f.textarea) {
						var h = A.getElementsByTagName("textarea")[0];
						if (h) {
							v.responseText = h.value;
							v.status = Number(h.getAttribute("status")) || v.status;
							v.statusText = h.getAttribute("statusText") || v.statusText;
						} else {
							if (l) {
								var m = A.getElementsByTagName("pre")[0], g = A.getElementsByTagName("body")[0];
								m ? v.responseText = m.textContent ? m.textContent : m.innerText : g && (v.responseText = g.textContent ? g.textContent : g.innerText);
							}
						}
					} else {
						a == "xml" && !v.responseXML && v.responseText && (v.responseXML = D(v.responseText));
					}
					try {
						L = H(v, a, f);
					}
					catch (t) {
						r = "parsererror";
						v.error = s = t || r;
					}
				}
				catch (t) {
					i("error caught: ", t);
					r = "error";
					v.error = s = t || r;
				}
				if (v.aborted) {
					i("upload aborted");
					r = null;
				}
				v.status && (r = v.status >= 200 && v.status < 300 || v.status === 304 ? "success" : "error");
				if (r === "success") {
					f.success && f.success.call(f.context, L, "success", v);
					E.resolve(v.responseText, "success", v);
					c && e.event.trigger("ajaxSuccess", [v, f]);
				} else {
					if (r) {
						s === undefined && (s = v.statusText);
						f.error && f.error.call(f.context, v, r, s);
						E.reject(v, "error", s);
						c && e.event.trigger("ajaxError", [v, f, s]);
					}
				}
				c && e.event.trigger("ajaxComplete", [v, f]);
				c && !--e.active && e.event.trigger("ajaxStop");
				f.complete && f.complete.call(f.context, v, r);
				M = !0;
				f.timeout && clearTimeout(b);
				setTimeout(function () {
					f.iframeTarget || p.remove();
					v.responseXML = null;
				}, 100);
			}
			var s = u[0], o, a, f, c, h, p, d, v, m, g, y, b, w = !!e.fn.prop, E = e.Deferred();
			if (t) {
				for (a = 0; a < l.length; a++) {
					o = e(l[a]);
					w ? o.prop("disabled", !1) : o.removeAttr("disabled");
				}
			}
			f = e.extend(!0, {}, e.ajaxSettings, n);
			f.context = f.context || f;
			h = "jqFormIO" + (new Date).getTime();
			if (f.iframeTarget) {
				p = e(f.iframeTarget);
				g = p.attr("name");
				g ? h = g : p.attr("name", h);
			} else {
				p = e("<iframe name=\"" + h + "\" src=\"" + f.iframeSrc + "\" />");
				p.css({position:"absolute", top:"-1000px", left:"-1000px"});
			}
			d = p[0];
			v = {aborted:0, responseText:null, responseXML:null, status:0, statusText:"n/a", getAllResponseHeaders:function () {
			}, getResponseHeader:function () {
			}, setRequestHeader:function () {
			}, abort:function (t) {
				var n = t === "timeout" ? "timeout" : "aborted";
				i("aborting upload... " + n);
				this.aborted = 1;
				try {
					d.contentWindow.document.execCommand && d.contentWindow.document.execCommand("Stop");
				}
				catch (r) {
				}
				p.attr("src", f.iframeSrc);
				v.error = n;
				f.error && f.error.call(f.context, v, n, t);
				c && e.event.trigger("ajaxError", [v, f, n]);
				f.complete && f.complete.call(f.context, v, n);
			}};
			c = f.global;
			c && 0 === e.active++ && e.event.trigger("ajaxStart");
			c && e.event.trigger("ajaxSend", [v, f]);
			if (f.beforeSend && f.beforeSend.call(f.context, v, f) === !1) {
				f.global && e.active--;
				E.reject();
				return E;
			}
			if (v.aborted) {
				E.reject();
				return E;
			}
			m = s.clk;
			if (m) {
				g = m.name;
				if (g && !m.disabled) {
					f.extraData = f.extraData || {};
					f.extraData[g] = m.value;
					if (m.type == "image") {
						f.extraData[g + ".x"] = s.clk_x;
						f.extraData[g + ".y"] = s.clk_y;
					}
				}
			}
			var S = 1, x = 2, N = e("meta[name=csrf-token]").attr("content"), C = e("meta[name=csrf-param]").attr("content");
			if (C && N) {
				f.extraData = f.extraData || {};
				f.extraData[C] = N;
			}
			f.forceSync ? k() : setTimeout(k, 10);
			var L, A, O = 50, M, D = e.parseXML || function (e, t) {
				if (window.ActiveXObject) {
					t = new ActiveXObject("Microsoft.XMLDOM");
					t.async = "false";
					t.loadXML(e);
				} else {
					t = (new DOMParser).parseFromString(e, "text/xml");
				}
				return t && t.documentElement && t.documentElement.nodeName != "parsererror" ? t : null;
			}, P = e.parseJSON || function (e) {
				return window.eval("(" + e + ")");
			}, H = function (t, n, r) {
				var i = t.getResponseHeader("content-type") || "", s = n === "xml" || !n && i.indexOf("xml") >= 0, o = s ? t.responseXML : t.responseText;
				s && o.documentElement.nodeName === "parsererror" && e.error && e.error("parsererror");
				r && r.dataFilter && (o = r.dataFilter(o, n));
				typeof o == "string" && (n === "json" || !n && i.indexOf("json") >= 0 ? o = P(o) : (n === "script" || !n && i.indexOf("javascript") >= 0) && e.globalEval(o));
				return o;
			};
			return E;
		}
		if (!this.length) {
			i("ajaxSubmit: skipping submit process - no element selected");
			return this;
		}
		var r, s, o, u = this;
		typeof n == "function" && (n = {success:n});
		r = this.attr("method");
		s = this.attr("action");
		o = typeof s == "string" ? e.trim(s) : "";
		o = o || window.location.href || "";
		o && (o = (o.match(/^([^#]+)/) || [])[1]);
		n = e.extend(!0, {url:o, success:e.ajaxSettings.success, type:r || "GET", iframeSrc:/^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"}, n);
		var a = {};
		this.trigger("form-pre-serialize", [this, n, a]);
		if (a.veto) {
			i("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
			return this;
		}
		if (n.beforeSerialize && n.beforeSerialize(this, n) === !1) {
			i("ajaxSubmit: submit aborted via beforeSerialize callback");
			return this;
		}
		var f = n.traditional;
		f === undefined && (f = e.ajaxSettings.traditional);
		var l = [], c, h = this.formToArray(n.semantic, l);
		if (n.data) {
			n.extraData = n.data;
			c = e.param(n.data, f);
		}
		if (n.beforeSubmit && n.beforeSubmit(h, this, n) === !1) {
			i("ajaxSubmit: submit aborted via beforeSubmit callback");
			return this;
		}
		this.trigger("form-submit-validate", [h, this, n, a]);
		if (a.veto) {
			i("ajaxSubmit: submit vetoed via form-submit-validate trigger");
			return this;
		}
		var p = e.param(h, f);
		c && (p = p ? p + "&" + c : c);
		if (n.type.toUpperCase() == "GET") {
			n.url += (n.url.indexOf("?") >= 0 ? "&" : "?") + p;
			n.data = null;
		} else {
			n.data = p;
		}
		var d = [];
		n.resetForm && d.push(function () {
			u.resetForm();
		});
		n.clearForm && d.push(function () {
			u.clearForm(n.includeHidden);
		});
		if (!n.dataType && n.target) {
			var v = n.success || function () {
			};
			d.push(function (t) {
				var r = n.replaceTarget ? "replaceWith" : "html";
				e(n.target)[r](t).each(v, arguments);
			});
		} else {
			n.success && d.push(n.success);
		}
		n.success = function (e, t, r) {
			var i = n.context || this;
			for (var s = 0, o = d.length; s < o; s++) {
				d[s].apply(i, [e, t, r || u, u]);
			}
		};
		var m = e("input[type=file]:enabled[value!=\"\"]", this), g = m.length > 0, y = "multipart/form-data", b = u.attr("enctype") == y || u.attr("encoding") == y, w = t.fileapi && t.formdata;
		i("fileAPI :" + w);
		var E = (g || b) && !w, S;
		n.iframe !== !1 && (n.iframe || E) ? n.closeKeepAlive ? e.get(n.closeKeepAlive, function () {
			S = C(h);
		}) : S = C(h) : (g || b) && w ? S = N(h) : S = e.ajax(n);
		u.removeData("jqxhr").data("jqxhr", S);
		for (var x = 0; x < l.length; x++) {
			l[x] = null;
		}
		this.trigger("form-submit-notify", [this, n]);
		return this;
	};
	e.fn.ajaxForm = function (t) {
		t = t || {};
		t.delegation = t.delegation && e.isFunction(e.fn.on);
		if (!t.delegation && this.length === 0) {
			var s = {s:this.selector, c:this.context};
			if (!e.isReady && s.s) {
				i("DOM not ready, queuing ajaxForm");
				e(function () {
					e(s.s, s.c).ajaxForm(t);
				});
				return this;
			}
			i("terminating; zero elements found by selector" + (e.isReady ? "" : " (DOM not ready)"));
			return this;
		}
		if (t.delegation) {
			e(document).off("submit.form-plugin", this.selector, n).off("click.form-plugin", this.selector, r).on("submit.form-plugin", this.selector, t, n).on("click.form-plugin", this.selector, t, r);
			return this;
		}
		return this.ajaxFormUnbind().bind("submit.form-plugin", t, n).bind("click.form-plugin", t, r);
	};
	e.fn.ajaxFormUnbind = function () {
		return this.unbind("submit.form-plugin click.form-plugin");
	};
	e.fn.formToArray = function (n, r) {
		var i = [];
		if (this.length === 0) {
			return i;
		}
		var s = this[0], o = n ? s.getElementsByTagName("*") : s.elements;
		if (!o) {
			return i;
		}
		var u, a, f, l, c, h, p;
		for (u = 0, h = o.length; u < h; u++) {
			c = o[u];
			f = c.name;
			if (!f) {
				continue;
			}
			if (n && s.clk && c.type == "image") {
				if (!c.disabled && s.clk == c) {
					i.push({name:f, value:e(c).val(), type:c.type});
					i.push({name:f + ".x", value:s.clk_x}, {name:f + ".y", value:s.clk_y});
				}
				continue;
			}
			l = e.fieldValue(c, !0);
			if (l && l.constructor == Array) {
				r && r.push(c);
				for (a = 0, p = l.length; a < p; a++) {
					i.push({name:f, value:l[a]});
				}
			} else {
				if (t.fileapi && c.type == "file" && !c.disabled) {
					r && r.push(c);
					var d = c.files;
					if (d.length) {
						for (a = 0; a < d.length; a++) {
							i.push({name:f, value:d[a], type:c.type});
						}
					} else {
						i.push({name:f, value:"", type:c.type});
					}
				} else {
					if (l !== null && typeof l != "undefined") {
						r && r.push(c);
						i.push({name:f, value:l, type:c.type, required:c.required});
					}
				}
			}
		}
		if (!n && s.clk) {
			var v = e(s.clk), m = v[0];
			f = m.name;
			if (f && !m.disabled && m.type == "image") {
				i.push({name:f, value:v.val()});
				i.push({name:f + ".x", value:s.clk_x}, {name:f + ".y", value:s.clk_y});
			}
		}
		return i;
	};
	e.fn.formSerialize = function (t) {
		return e.param(this.formToArray(t));
	};
	e.fn.fieldSerialize = function (t) {
		var n = [];
		this.each(function () {
			var r = this.name;
			if (!r) {
				return;
			}
			var i = e.fieldValue(this, t);
			if (i && i.constructor == Array) {
				for (var s = 0, o = i.length; s < o; s++) {
					n.push({name:r, value:i[s]});
				}
			} else {
				i !== null && typeof i != "undefined" && n.push({name:this.name, value:i});
			}
		});
		return e.param(n);
	};
	e.fn.fieldValue = function (t) {
		for (var n = [], r = 0, i = this.length; r < i; r++) {
			var s = this[r], o = e.fieldValue(s, t);
			if (o === null || typeof o == "undefined" || o.constructor == Array && !o.length) {
				continue;
			}
			o.constructor == Array ? e.merge(n, o) : n.push(o);
		}
		return n;
	};
	e.fieldValue = function (t, n) {
		var r = t.name, i = t.type, s = t.tagName.toLowerCase();
		n === undefined && (n = !0);
		if (n && (!r || t.disabled || i == "reset" || i == "button" || (i == "checkbox" || i == "radio") && !t.checked || (i == "submit" || i == "image") && t.form && t.form.clk != t || s == "select" && t.selectedIndex == -1)) {
			return null;
		}
		if (s == "select") {
			var o = t.selectedIndex;
			if (o < 0) {
				return null;
			}
			var u = [], a = t.options, f = i == "select-one", l = f ? o + 1 : a.length;
			for (var c = f ? o : 0; c < l; c++) {
				var h = a[c];
				if (h.selected) {
					var p = h.value;
					p || (p = h.attributes && h.attributes.value && !h.attributes.value.specified ? h.text : h.value);
					if (f) {
						return p;
					}
					u.push(p);
				}
			}
			return u;
		}
		return e(t).val();
	};
	e.fn.clearForm = function (t) {
		return this.each(function () {
			e("input,select,textarea", this).clearFields(t);
		});
	};
	e.fn.clearFields = e.fn.clearInputs = function (t) {
		var n = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
		return this.each(function () {
			var r = this.type, i = this.tagName.toLowerCase();
			n.test(r) || i == "textarea" ? this.value = "" : r == "checkbox" || r == "radio" ? this.checked = !1 : i == "select" ? this.selectedIndex = -1 : r == "file" ? /MSIE/.test(navigator.userAgent) ? e(this).replaceWith(e(this).clone()) : e(this).val("") : t && (t === !0 && /hidden/.test(r) || typeof t == "string" && e(this).is(t)) && (this.value = "");
		});
	};
	e.fn.resetForm = function () {
		return this.each(function () {
			(typeof this.reset == "function" || typeof this.reset == "object" && !this.reset.nodeType) && this.reset();
		});
	};
	e.fn.enable = function (e) {
		e === undefined && (e = !0);
		return this.each(function () {
			this.disabled = !e;
		});
	};
	e.fn.selected = function (t) {
		t === undefined && (t = !0);
		return this.each(function () {
			var n = this.type;
			if (n == "checkbox" || n == "radio") {
				this.checked = t;
			} else {
				if (this.tagName.toLowerCase() == "option") {
					var r = e(this).parent("select");
					t && r[0] && r[0].type == "select-one" && r.find("option").selected(!1);
					this.selected = t;
				}
			}
		});
	};
	e.fn.ajaxSubmit.debug = !1;
})(jQuery);

