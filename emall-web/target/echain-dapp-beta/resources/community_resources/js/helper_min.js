
var iTemplate = (function () {
	var a = function () {
	};
	a.prototype = {makeList:function (e, j, i) {
		var g = [], h = [], c = /{(.+?)}/g, d = {}, f = 0;
		for (var b in j) {
			if (typeof i === "function") {
				d = i.call(this, b, j[b], f++) || {};
			}
			g.push(e.replace(c, function (k, l) {
				return (l in d) ? d[l] : (undefined === j[b][l] ? j[b] : j[b][l]);
			}));
		}
		return g.join("");
	}};
	return new a();
})();
window.ajax2 = (function () {
	var a = function (b, c) {
		return new a.fn.init(b, c);
	};
	a.fn = a.prototype = {init:function (b, d) {
		var c = this;
		this.xhr = new XMLHttpRequest();
		this.url = b;
		this.type = {get:"GET", post:"POST"}[d.type && d.type.toLowerCase()] || "GET";
		this.async = d.async || false;
		this.responseType = d.responseType || "text";
		this.data = d.data;
		this.formData = a.serializeFormData(this.data);
		this.callback = d.callback;
		this.timeout = d.timeout || 10000;
		this.setRequestHeader = d.headers || {};
		this.work();
		return this;
	}, work:function () {
		var b = this;
		b.xhr.open(this.type, this.url, this.async);
		b.xhr.setRequestHeader("common", JSON.stringify({platform:"HTML5", author:"Eric_wu", time:+new Date()}));
		b.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		b.xhr.upload.onprogress = function (d) {
			if (d.lengthComputable) {
				var c = (d.loaded / d.total) * 100;
				if (b.onprogress) {
					b.onprogress.call(d, c);
				}
			}
		};
		b.xhr.onload = function (c) {
			if (200 == this.status) {
				b.callback.call(this, JSON.parse(this.responseText));
				b.timeout && clearTimeout(b.xhr.timer);
			}
		};
		if (b.timeout) {
			b.xhr.timer = setTimeout(function () {
				b.xhr.abort();
				b.callback.call(b, {result:0, message:"\xe8\xaf\xb7\xe6\xb1\x82\xe8\xb6\x85\xe6\x97\xb6"});
				clearTimeout(b.xhr.timer);
			}, b.timeout);
		}
		b.xhr.send(this.formData);
		return b;
	}};
	a.fn.init.prototype = a.fn;
	a.serializeFormData = function (c) {
		var d = new FormData();
		for (var b in c) {
			d.append(b, c[b]);
		}
		return d;
	};
	return a;
})(this);

