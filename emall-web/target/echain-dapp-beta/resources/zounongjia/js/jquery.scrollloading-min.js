(function(b) {
    b.fn.scrollLoading = function(a) {
        var h = {
            attr: "data-url"
        };
        var g = b.extend({},
        h, a || {});
        g.cache = [];
        b(this).each(function() {
            var d = this.nodeName.toLowerCase(),
            e = b(this).attr(g.attr);
            if (!e) {
                return
            }
            var c = {
                obj: b(this),
                tag: d,
                url: e
            };
            g.cache.push(c)
        });
        var f = function() {
            var d = b(window).scrollTop(),
            c = d + b(window).height();
            b.each(g.cache,
            function(n, i) {
                var e = i.obj,
                p = i.tag,
                o = i.url;
                if (e) {
                    post = e.offset().top;
                    posb = post + e.height();
                    if ((post > d && post < c) || (posb > d && posb < c)) {
                        if (p === "img") {
                            e.attr("src", o)
                        } else {
                            e.load(o)
                        }
                        i.obj = null
                    }
                }
            });
            return false
        };
        f();
        b(window).bind("scroll", f)
    }
})(jQuery);