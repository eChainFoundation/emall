
/**
 * madeby somesayss
 * 2013.08.25
 */
"use strict";
(function (e, d) {
	if (e.som) {
		return;
	}
	var f, c;
	f = d.head || d.getElementsByTagName("head")[0];
	c = d.body;
	function b(h, j, g, i) {
		return this instanceof b ? this.init.apply(this, arguments) : new b(h, j, g, i);
	}
	b.prototype = {init:function (h, j, g, i) {
		this.moduleName = h;
		this.moduleList = j;
		this.successBack = g;
		this.errorBack = i;
		return this;
	}, touse:function (l, j, k) {
		var h = this, g = h.DoGetArg, i = h.require;
		l = h.DoStringToArray(g.call(h, l, "moduleName"));
		j = g.call(h, j, "moduleList");
		k = g.call(h, k, "successBack");
		h.provide(undefined, l, function () {
			var m = [], n = 0;
			for (; n < l.length; n++) {
				m.push(i.call(h, l[n]));
			}
			return j && j.apply(null, m);
		}, k);
		return h;
	}, define:function (j, m, i, k) {
		var h = this, g = h.DoGetArg, l;
		j = g.call(h, j, "moduleName");
		m = h.DoStringToArray(g.call(h, m, "moduleList"));
		i = g.call(h, i, "successBack");
		k = g.call(h, k, "errorBack");
		l = h.DoGetModuleName();
		if (h.DOisFunction(j)) {
			k = m;
			i = j;
			m = h.DoGetModuleList("" + i);
			j = l;
		} else {
			if (h.DoisArray(j)) {
				k = i;
				i = m;
				m = j;
				j = l;
			} else {
				l === undefined && (l = j);
			}
		}
		b.cache.requireMapLoaded[l] = j;
		h.provide(j, m, function () {
			var n = {}, o, p;
			o = {name:j, path:l};
			p = i && i.call(n, function (q) {
				return h.require(q);
			}, n, o);
			return p === undefined ? n : p;
		}, k, l);
		return h;
	}, require:function (j) {
		var h = this, g, i, k;
		g = b.cache;
		i = g.loadedLost;
		k = i[j];
		return k !== undefined ? k : i[g.requireMapLoaded[h.DoFormatUrl(j)]];
	}, provide:function (r, n, w, y, t) {
		var q = this, v = 0, p, j, u, h, x, g, l, s, o, m, k;
		m = q.DoCacheLoadedBack;
		o = q.nodeAppend;
		p = b.cache;
		g = p.requireList;
		l = p.loadedLost;
		k = p.requireMapLoaded;
		j = p.callback;
		h = q.resolveCallbacks;
		x = q.resolveErrorbacks;
		y && (p.errorback = y);
		u = p.errorback;
		if (!n.length) {
			m.call(q, r, w, l, g, t);
		} else {
			n = q.DoFormatList(n);
			j.push({list:n, fn:function () {
				m.call(q, r, w, l, g, t);
			}, length:n.length});
			for (; v < n.length; v++) {
				s = n[v];
				if (g[s] === undefined) {
					g[s] = 1;
					o.call(q, s, function (i, z) {
						g[i] === 3 || (g[i] = 2);
						if (q.DoisCss(i)) {
							l[i] = i;
							g[i] = 3;
							k[i] = i;
						} else {
							q.DoForQuery(i, g, k, l);
						}
						h.call(q, j, g);
						x.call(q, g, u, z);
					});
				} else {
					if (g[s] === 3) {
						h.call(q, j, g);
					}
				}
			}
		}
		return q;
	}, nodeAppend:function (i, g) {
		var h = this, k, j = h.rex.value01, l = h.DoisCss(i);
		if (l) {
			k = document.createElement("link");
			k.href = i;
			k.type = "text/css";
			k.rel = "stylesheet";
			f.appendChild(k);
		} else {
			k = document.createElement("script");
			k.src = i;
			k.type = "text/javascript";
			k.defer = true;
			f.insertBefore(k, f.firstChild);
		}
		k.charset = "utf-8";
		k.onload = k.onreadystatechange = k.onerror = function (n) {
			var m = n && n.type;
			if (j.test(k.readyState)) {
				k.onerror = k.onload = k.onreadystatechange = null;
				if (!l) {
					k.clearAttributes && k.clearAttributes();
					k.remove ? k.remove() : f.removeChild(k);
				}
				g && g(i, m || "error");
			}
		};
		return h;
	}, resolveCallbacks:function (r, q) {
		var n = r.length, m, o, p, l = this.rex.value10;
		while (m = r[--n]) {
			var o = m.list;
			m.length = o.length;
			for (var g = 0, h = o.length; g < h; g++) {
				if (q[o[g]] === 3 || l.test(o[g])) {
					m.length--;
				}
			}
			if (!m.length) {
				r.splice(n, 1);
				m.fn();
				n = r.length;
			}
		}
	}, resolveErrorbacks:function (h, j, i) {
		var k = [], g;
		for (g in h) {
			if (h[g] === 2) {
				k.push(g);
			}
		}
		i === "error" && k.length && j(k);
	}, DoForQuery:function (l, k, m, j) {
		var i = this, g, n, h;
		g = m[l];
		if (b.config && b.config.query && (n = b.config.query[g])) {
			k[l] = 3;
			(h = n.exports) && h.replace(i.rex.value09, function (p, o) {
				if (j[g] === undefined) {
					j[g] = e[p];
				}
				try {
					e[p] = undefined;
					delete e[p];
				}
				catch (q) {
				}
			});
		}
		return i;
	}, DoGetModuleList:function (m) {
		var h = this, g, k = 0, n = h.rex, j = n.value06, l = [];
		m = m.replace(n.value07, "").replace(n.value08, "");
		g = m.match(n.value05);
		if (g !== null) {
			for (; k < g.length; k++) {
				l.push(g[k].match(j)[1]);
			}
		}
		return l;
	}, DoCacheLoadedBack:function (j, i, h, g, k) {
		var l = i();
		k && (g[k] = 3);
		j && (h[j] = l);
		return this;
	}, DoStringToArray:function (g) {
		return this.DoisString(g) ? g.split(",") : g;
	}, DoGetArg:function (g, h) {
		return g === undefined ? this[h] : g;
	}, DOisFunction:function (g) {
		return Object.prototype.toString.call(g) === "[object Function]";
	}, DoisArray:function (g) {
		return Object.prototype.toString.call(g) === "[object Array]";
	}, DoisString:function (g) {
		return Object.prototype.toString.call(g) === "[object String]";
	}, DoisCss:function (g) {
		return this.rex.value02.test(g);
	}, DoGetModuleName:function () {
		var g, k, l = 0, j, h = this;
		if (d.currentScript) {
			return d.currentScript.src;
		}
		try {
			a();
		}
		catch (m) {
			g = m.stack;
			if (!g && e.opera) {
				g = (String(m).match(/of linked script \S+/g) || []).join(" ");
			}
		}
		if (g) {
			if (d.documentMode) {
				g = g.match(/at Global code \((.+)?\)/)[1];
			} else {
				g = h.DoTrim(g.split(/[@ ]/g).pop());
			}
			return g.replace(/(:\d+)?:\d+$/i, "");
		}
		k = f.getElementsByTagName("script");
		while (j = k[l++]) {
			if (j.readyState === "interactive") {
				return j.src;
			}
		}
	}, DoFormatUrl:function (h) {
		var u = this, p = u.rex, q = 0, v, r, m, s, k, n, j;
		m = b.config;
		h = u.DoTrim(h);
		if (h.charAt(0) === "/" || h.slice(0, 4) === "http") {
			return h;
		}
		if (m.query && (k = m.query[h]) && (n = k.url)) {
			s = h;
			h = n;
		}
		m.map && (j = m.map[h]) && (h = j);
		if (p.value03.test(h)) {
			r = h.match(p.value04);
			q = r === null ? 0 : r.length;
			h = h.replace(p.value03, "");
		}
		v = u.DoIndentPath(m.basePath, q + 1);
		if (s !== undefined) {
			var t = b.cache, o = k.exports.split(" ")[0], g = k.reload, l = e[o];
			t.requireMapLoaded[v + h] = s;
			if (l && !g) {
				t.loadedLost[s] = l;
				return false;
			}
		}
		return v + h;
	}, DoFormatList:function (m) {
		var h = this, g = [], k = 0, j = h.DoFormatUrl, l;
		for (; k < m.length; k++) {
			l = j.call(h, m[k]);
			l !== false && g.push(l);
		}
		return g;
	}, DoIndentPath:function (h, g) {
		while (g--) {
			h = h.slice(0, h.lastIndexOf("/"));
		}
		return h + "/";
	}, DoTrim:function (g) {
		return g.trim ? g.trim() : g.replace(/^\s+/, "").replace(/\s+$/, "");
	}, rex:{value01:/^loaded|complete|undefined$/, value02:/\.css$/, value03:/^(\.\/|\.\.\/)+/, value04:/\.\.\//g, value05:/require\([\s\S]*?\)/g, value06:/['"]([\s\S]*)['"]/, value07:/\/\*[\s\S]*?\*\//g, value08:/\/\/.*/g, value09:/[^\s]+/g, value10:/config\.js/}};
	b.mix = function (j, h) {
		for (var g in h) {
			j[g] = h[g];
		}
		return j;
	};
	b.mix(b, b.prototype);
	b.mix(b, {log:function (g, h) {
		if (!e.console || h) {
			var i = d.createElement("div");
			i.style.cssText = "background:#CCC;color:#F00;border-top:1px solid #FFF;";
			i.innerHTML = "MES: " + g;
			c.appendChild(i);
		} else {
			e.console.log(g);
		}
	}, cache:{requireList:{}, loadedLost:{}, requireMapLoaded:{}, callback:[], errorback:function () {
	}}, config:function (g) {
		return b.mix(b.config, g);
	}, domReadyList:[], domReady:function (l) {
		var o = b.domReadyList, k = 0, h, g = false;
		if (o.push(l) > 1) {
			return;
		}
		function n() {
			d.removeEventListener("DOMContentLoaded", n, false);
			for (; k < o.length; k++) {
				o[k]();
			}
			o.length = 0;
		}
		function j() {
			d.detachEvent("onreadystatechange", m);
			if (g) {
				return;
			}
			for (; k < o.length; k++) {
				o[k]();
			}
			o.length = 0;
			g = true;
		}
		function m() {
			if (d.readyState === "complete") {
				j();
			}
		}
		if (!!+"\v1") {
			d.addEventListener("DOMContentLoaded", n, false);
		} else {
			d.attachEvent("onreadystatechange", m);
			if (e.frameElement === null) {
				h = new Image;
				(function () {
					try {
						h.doScroll();
						j();
					}
					catch (i) {
						setTimeout(arguments.callee, 0);
					}
				})();
			}
		}
	}, getAttr:function (h, g) {
		return h.dataset ? h.dataset[g] : h.getAttribute("data-" + g);
	}});
	(function (j, m) {
		var l, i, o, n, g, h;
		l = j.getElementById("somJsSeed");
		if (l === null) {
			i = j.getElementsByTagName("script");
			l = i[i.length - 1];
		}
		g = m.config.basePath = m.DoIndentPath(l.src, 1);
		o = m.getAttr(l, "config");
		o = o ? o : "config.js";
		n = m.getAttr(l, "main");
		function k(r, q) {
			var p = r.config, s = p.basePath;
			if (p.isLodeed === true) {
				return;
			}
			p.isLodeed = true;
			if (s !== g) {
				p.basePath = g;
				p.basePath = r.DoFormatUrl(s);
			}
			e.som.config.basePath = p.basePath;
			r.cache.requireList[q] = 3;
		}
		h = g + o;
		if (n) {
			m.domReady(function () {
				m.touse(h, function () {
					k(m, h);
					m.touse(n);
				});
			});
		}
		m.use = function (p, q) {
			m.touse(h, function () {
				k(m, h);
				m.touse(p, q);
			});
		};
	})(d, b);
	e.som = b;
	e.onload = function () {
		b.winLoaded = 1;
	};
	e.define = function () {
		b.define.apply(b, arguments);
	};
})(window, document);

