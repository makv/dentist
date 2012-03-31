(function (d) {
    var a = /^\s*|\s*$/g, e, c = "B".replace(/A(.)|B/, "$1") === "$1";
    var b = {majorVersion:"3", minorVersion:"5b1", releaseDate:"2012-03-08", _init:function () {
        var s = this, q = document, o = navigator, g = o.userAgent, m, f, l, k, j, r;
        s.isOpera = d.opera && opera.buildNumber;
        s.isWebKit = /WebKit/.test(g);
        s.isIE = !s.isWebKit && !s.isOpera && (/MSIE/gi).test(g) && (/Explorer/gi).test(o.appName);
        s.isIE6 = s.isIE && /MSIE [56]/.test(g);
        s.isIE7 = s.isIE && /MSIE [7]/.test(g);
        s.isIE8 = s.isIE && /MSIE [8]/.test(g);
        s.isIE9 = s.isIE && /MSIE [9]/.test(g);
        s.isGecko = !s.isWebKit && /Gecko/.test(g);
        s.isMac = g.indexOf("Mac") != -1;
        s.isAir = /adobeair/i.test(g);
        s.isIDevice = /(iPad|iPhone)/.test(g);
        s.isIOS5 = s.isIDevice && g.match(/AppleWebKit\/(\d*)/)[1] >= 534;
        if (d.tinyMCEPreInit) {
            s.suffix = tinyMCEPreInit.suffix;
            s.baseURL = tinyMCEPreInit.base;
            s.query = tinyMCEPreInit.query;
            return
        }
        s.suffix = "";
        f = q.getElementsByTagName("base");
        for (m = 0; m < f.length; m++) {
            if (r = f[m].href) {
                if (/^https?:\/\/[^\/]+$/.test(r)) {
                    r += "/"
                }
                k = r ? r.match(/.*\//)[0] : ""
            }
        }
        function h(i) {
            if (i.src && /tiny_mce(|_gzip|_jquery|_prototype|_full)(_dev|_src)?.js/.test(i.src)) {
                if (/_(src|dev)\.js/g.test(i.src)) {
                    s.suffix = "_src"
                }
                if ((j = i.src.indexOf("?")) != -1) {
                    s.query = i.src.substring(j + 1)
                }
                s.baseURL = i.src.substring(0, i.src.lastIndexOf("/"));
                if (k && s.baseURL.indexOf("://") == -1 && s.baseURL.indexOf("/") !== 0) {
                    s.baseURL = k + s.baseURL
                }
                return s.baseURL
            }
            return null
        }

        f = q.getElementsByTagName("script");
        for (m = 0; m < f.length; m++) {
            if (h(f[m])) {
                return
            }
        }
        l = q.getElementsByTagName("head")[0];
        if (l) {
            f = l.getElementsByTagName("script");
            for (m = 0; m < f.length; m++) {
                if (h(f[m])) {
                    return
                }
            }
        }
        return
    }, is:function (g, f) {
        if (!f) {
            return g !== e
        }
        if (f == "array" && (g.hasOwnProperty && g instanceof Array)) {
            return true
        }
        return typeof(g) == f
    }, makeMap:function (f, j, h) {
        var g;
        f = f || [];
        j = j || ",";
        if (typeof(f) == "string") {
            f = f.split(j)
        }
        h = h || {};
        g = f.length;
        while (g--) {
            h[f[g]] = {}
        }
        return h
    }, each:function (i, f, h) {
        var j, g;
        if (!i) {
            return 0
        }
        h = h || i;
        if (i.length !== e) {
            for (j = 0, g = i.length; j < g; j++) {
                if (f.call(h, i[j], j, i) === false) {
                    return 0
                }
            }
        } else {
            for (j in i) {
                if (i.hasOwnProperty(j)) {
                    if (f.call(h, i[j], j, i) === false) {
                        return 0
                    }
                }
            }
        }
        return 1
    }, trim:function (f) {
        return(f ? "" + f : "").replace(a, "")
    }, create:function (o, f, j) {
        var n = this, g, i, k, l, h, m = 0;
        o = /^((static) )?([\w.]+)(:([\w.]+))?/.exec(o);
        k = o[3].match(/(^|\.)(\w+)$/i)[2];
        i = n.createNS(o[3].replace(/\.\w+$/, ""), j);
        if (i[k]) {
            return
        }
        if (o[2] == "static") {
            i[k] = f;
            if (this.onCreate) {
                this.onCreate(o[2], o[3], i[k])
            }
            return
        }
        if (!f[k]) {
            f[k] = function () {
            };
            m = 1
        }
        i[k] = f[k];
        n.extend(i[k].prototype, f);
        if (o[5]) {
            g = n.resolve(o[5]).prototype;
            l = o[5].match(/\.(\w+)$/i)[1];
            h = i[k];
            if (m) {
                i[k] = function () {
                    return g[l].apply(this, arguments)
                }
            } else {
                i[k] = function () {
                    this.parent = g[l];
                    return h.apply(this, arguments)
                }
            }
            i[k].prototype[k] = i[k];
            n.each(g, function (p, q) {
                i[k].prototype[q] = g[q]
            });
            n.each(f, function (p, q) {
                if (g[q]) {
                    i[k].prototype[q] = function () {
                        this.parent = g[q];
                        return p.apply(this, arguments)
                    }
                } else {
                    if (q != k) {
                        i[k].prototype[q] = p
                    }
                }
            })
        }
        n.each(f["static"], function (p, q) {
            i[k][q] = p
        });
        if (this.onCreate) {
            this.onCreate(o[2], o[3], i[k].prototype)
        }
    }, walk:function (i, h, j, g) {
        g = g || this;
        if (i) {
            if (j) {
                i = i[j]
            }
            b.each(i, function (k, f) {
                if (h.call(g, k, f, j) === false) {
                    return false
                }
                b.walk(k, h, j, g)
            })
        }
    }, createNS:function (j, h) {
        var g, f;
        h = h || d;
        j = j.split(".");
        for (g = 0; g < j.length; g++) {
            f = j[g];
            if (!h[f]) {
                h[f] = {}
            }
            h = h[f]
        }
        return h
    }, resolve:function (j, h) {
        var g, f;
        h = h || d;
        j = j.split(".");
        for (g = 0, f = j.length; g < f; g++) {
            h = h[j[g]];
            if (!h) {
                break
            }
        }
        return h
    }, addUnload:function (j, i) {
        var h = this;
        j = {func:j, scope:i || this};
        if (!h.unloads) {
            function g() {
                var f = h.unloads, l, m;
                if (f) {
                    for (m in f) {
                        l = f[m];
                        if (l && l.func) {
                            l.func.call(l.scope, 1)
                        }
                    }
                    if (d.detachEvent) {
                        d.detachEvent("onbeforeunload", k);
                        d.detachEvent("onunload", g)
                    } else {
                        if (d.removeEventListener) {
                            d.removeEventListener("unload", g, false)
                        }
                    }
                    h.unloads = l = f = w = g = 0;
                    if (d.CollectGarbage) {
                        CollectGarbage()
                    }
                }
            }

            function k() {
                var l = document;
                if (l.readyState == "interactive") {
                    function f() {
                        l.detachEvent("onstop", f);
                        if (g) {
                            g()
                        }
                        l = 0
                    }

                    if (l) {
                        l.attachEvent("onstop", f)
                    }
                    d.setTimeout(function () {
                        if (l) {
                            l.detachEvent("onstop", f)
                        }
                    }, 0)
                }
            }

            if (d.attachEvent) {
                d.attachEvent("onunload", g);
                d.attachEvent("onbeforeunload", k)
            } else {
                if (d.addEventListener) {
                    d.addEventListener("unload", g, false)
                }
            }
            h.unloads = [j]
        } else {
            h.unloads.push(j)
        }
        return j
    }, removeUnload:function (i) {
        var g = this.unloads, h = null;
        b.each(g, function (j, f) {
            if (j && j.func == i) {
                g.splice(f, 1);
                h = i;
                return false
            }
        });
        return h
    }, explode:function (f, g) {
        return f ? b.map(f.split(g || ","), b.trim) : f
    }, _addVer:function (g) {
        var f;
        if (!this.query) {
            return g
        }
        f = (g.indexOf("?") == -1 ? "?" : "&") + this.query;
        if (g.indexOf("#") == -1) {
            return g + f
        }
        return g.replace("#", f + "#")
    }, _replace:function (h, f, g) {
        if (c) {
            return g.replace(h, function () {
                var l = f, j = arguments, k;
                for (k = 0; k < j.length - 2; k++) {
                    if (j[k] === e) {
                        l = l.replace(new RegExp("\\$" + k, "g"), "")
                    } else {
                        l = l.replace(new RegExp("\\$" + k, "g"), j[k])
                    }
                }
                return l
            })
        }
        return g.replace(h, f)
    }};
    b._init();
    d.tinymce = d.tinyMCE = b
})(window);
(function (e, d) {
    var c = d.is, b = /^(href|src|style)$/i, f;
    if (!e && window.console) {
        return console.log("Load jQuery first!")
    }
    d.$ = e;
    d.adapter = {patchEditor:function (j) {
        var i = e.fn;

        function h(n, o) {
            var m = this;
            if (o) {
                m.removeAttr("data-mce-style")
            }
            return i.css.apply(m, arguments)
        }

        function g(n, o) {
            var m = this;
            if (b.test(n)) {
                if (o !== f) {
                    m.each(function (p, q) {
                        j.dom.setAttrib(q, n, o)
                    });
                    return m
                } else {
                    return m.attr("data-mce-" + n)
                }
            }
            return i.attr.apply(m, arguments)
        }

        function k(m) {
            return function (n) {
                if (n) {
                    n = j.dom.processHTML(n)
                }
                return m.call(this, n)
            }
        }

        function l(m) {
            if (m.css !== h) {
                m.css = h;
                m.attr = g;
                m.html = k(i.html);
                m.append = k(i.append);
                m.prepend = k(i.prepend);
                m.after = k(i.after);
                m.before = k(i.before);
                m.replaceWith = k(i.replaceWith);
                m.tinymce = j;
                m.pushStack = function () {
                    return l(i.pushStack.apply(this, arguments))
                }
            }
            return m
        }

        j.$ = function (m, n) {
            var o = j.getDoc();
            return l(e(m || o, o || n))
        }
    }};
    d.extend = e.extend;
    d.extend(d, {map:e.map, grep:function (g, h) {
        return e.grep(g, h || function () {
            return 1
        })
    }, inArray:function (g, h) {
        return e.inArray(h, g || [])
    }});
    var a = {"tinymce.dom.DOMUtils":{select:function (i, h) {
        var g = this;
        return e.find(i, g.get(h) || g.get(g.settings.root_element) || g.doc, [])
    }, is:function (h, g) {
        return e(this.get(h)).is(g)
    }}};
    d.onCreate = function (g, i, h) {
        d.extend(h, a[i])
    }
})(window.jQuery, tinymce);
tinymce.create("tinymce.util.Dispatcher", {scope:null, listeners:null, Dispatcher:function (a) {
    this.scope = a || this;
    this.listeners = []
}, add:function (a, b) {
    this.listeners.push({cb:a, scope:b || this.scope});
    return a
}, addToTop:function (a, b) {
    this.listeners.unshift({cb:a, scope:b || this.scope});
    return a
}, remove:function (a) {
    var b = this.listeners, c = null;
    tinymce.each(b, function (e, d) {
        if (a == e.cb) {
            c = a;
            b.splice(d, 1);
            return false
        }
    });
    return c
}, dispatch:function () {
    var f, d = arguments, e, b = this.listeners, g;
    for (e = 0; e < b.length; e++) {
        g = b[e];
        f = g.cb.apply(g.scope, d.length > 0 ? d : [g.scope]);
        if (f === false) {
            break
        }
    }
    return f
}});
(function () {
    var a = tinymce.each;
    tinymce.create("tinymce.util.URI", {URI:function (e, g) {
        var f = this, i, d, c, h;
        e = tinymce.trim(e);
        g = f.settings = g || {};
        if (/^([\w\-]+):([^\/]{2})/i.test(e) || /^\s*#/.test(e)) {
            f.source = e;
            return
        }
        if (e.indexOf("/") === 0 && e.indexOf("//") !== 0) {
            e = (g.base_uri ? g.base_uri.protocol || "http" : "http") + "://mce_host" + e
        }
        if (!/^[\w-]*:?\/\//.test(e)) {
            h = g.base_uri ? g.base_uri.path : new tinymce.util.URI(location.href).directory;
            e = ((g.base_uri && g.base_uri.protocol) || "http") + "://mce_host" + f.toAbsPath(h, e)
        }
        e = e.replace(/@@/g, "(mce_at)");
        e = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(e);
        a(["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"], function (b, j) {
            var k = e[j];
            if (k) {
                k = k.replace(/\(mce_at\)/g, "@@")
            }
            f[b] = k
        });
        if (c = g.base_uri) {
            if (!f.protocol) {
                f.protocol = c.protocol
            }
            if (!f.userInfo) {
                f.userInfo = c.userInfo
            }
            if (!f.port && f.host == "mce_host") {
                f.port = c.port
            }
            if (!f.host || f.host == "mce_host") {
                f.host = c.host
            }
            f.source = ""
        }
    }, setPath:function (c) {
        var b = this;
        c = /^(.*?)\/?(\w+)?$/.exec(c);
        b.path = c[0];
        b.directory = c[1];
        b.file = c[2];
        b.source = "";
        b.getURI()
    }, toRelative:function (b) {
        var c = this, d;
        if (b === "./") {
            return b
        }
        b = new tinymce.util.URI(b, {base_uri:c});
        if ((b.host != "mce_host" && c.host != b.host && b.host) || c.port != b.port || c.protocol != b.protocol) {
            return b.getURI()
        }
        d = c.toRelPath(c.path, b.path);
        if (b.query) {
            d += "?" + b.query
        }
        if (b.anchor) {
            d += "#" + b.anchor
        }
        return d
    }, toAbsolute:function (b, c) {
        var b = new tinymce.util.URI(b, {base_uri:this});
        return b.getURI(this.host == b.host && this.protocol == b.protocol ? c : 0)
    }, toRelPath:function (g, h) {
        var c, f = 0, d = "", e, b;
        g = g.substring(0, g.lastIndexOf("/"));
        g = g.split("/");
        c = h.split("/");
        if (g.length >= c.length) {
            for (e = 0, b = g.length; e < b; e++) {
                if (e >= c.length || g[e] != c[e]) {
                    f = e + 1;
                    break
                }
            }
        }
        if (g.length < c.length) {
            for (e = 0, b = c.length; e < b; e++) {
                if (e >= g.length || g[e] != c[e]) {
                    f = e + 1;
                    break
                }
            }
        }
        if (f == 1) {
            return h
        }
        for (e = 0, b = g.length - (f - 1); e < b; e++) {
            d += "../"
        }
        for (e = f - 1, b = c.length; e < b; e++) {
            if (e != f - 1) {
                d += "/" + c[e]
            } else {
                d += c[e]
            }
        }
        return d
    }, toAbsPath:function (e, f) {
        var c, b = 0, h = [], d, g;
        d = /\/$/.test(f) ? "/" : "";
        e = e.split("/");
        f = f.split("/");
        a(e, function (i) {
            if (i) {
                h.push(i)
            }
        });
        e = h;
        for (c = f.length - 1, h = []; c >= 0; c--) {
            if (f[c].length == 0 || f[c] == ".") {
                continue
            }
            if (f[c] == "..") {
                b++;
                continue
            }
            if (b > 0) {
                b--;
                continue
            }
            h.push(f[c])
        }
        c = e.length - b;
        if (c <= 0) {
            g = h.reverse().join("/")
        } else {
            g = e.slice(0, c).join("/") + "/" + h.reverse().join("/")
        }
        if (g.indexOf("/") !== 0) {
            g = "/" + g
        }
        if (d && g.lastIndexOf("/") !== g.length - 1) {
            g += d
        }
        return g
    }, getURI:function (d) {
        var c, b = this;
        if (!b.source || d) {
            c = "";
            if (!d) {
                if (b.protocol) {
                    c += b.protocol + "://"
                }
                if (b.userInfo) {
                    c += b.userInfo + "@"
                }
                if (b.host) {
                    c += b.host
                }
                if (b.port) {
                    c += ":" + b.port
                }
            }
            if (b.path) {
                c += b.path
            }
            if (b.query) {
                c += "?" + b.query
            }
            if (b.anchor) {
                c += "#" + b.anchor
            }
            b.source = c
        }
        return b.source
    }})
})();
(function () {
    var a = tinymce.each;
    tinymce.create("static tinymce.util.Cookie", {getHash:function (d) {
        var b = this.get(d), c;
        if (b) {
            a(b.split("&"), function (e) {
                e = e.split("=");
                c = c || {};
                c[unescape(e[0])] = unescape(e[1])
            })
        }
        return c
    }, setHash:function (j, b, g, f, i, c) {
        var h = "";
        a(b, function (e, d) {
            h += (!h ? "" : "&") + escape(d) + "=" + escape(e)
        });
        this.set(j, h, g, f, i, c)
    }, get:function (i) {
        var h = document.cookie, g, f = i + "=", d;
        if (!h) {
            return
        }
        d = h.indexOf("; " + f);
        if (d == -1) {
            d = h.indexOf(f);
            if (d != 0) {
                return null
            }
        } else {
            d += 2
        }
        g = h.indexOf(";", d);
        if (g == -1) {
            g = h.length
        }
        return unescape(h.substring(d + f.length, g))
    }, set:function (i, b, g, f, h, c) {
        document.cookie = i + "=" + escape(b) + ((g) ? "; expires=" + g.toGMTString() : "") + ((f) ? "; path=" + escape(f) : "") + ((h) ? "; domain=" + h : "") + ((c) ? "; secure" : "")
    }, remove:function (e, b) {
        var c = new Date();
        c.setTime(c.getTime() - 1000);
        this.set(e, "", c, b, c)
    }})
})();
(function () {
    function serialize(o, quote) {
        var i, v, t;
        quote = quote || '"';
        if (o == null) {
            return"null"
        }
        t = typeof o;
        if (t == "string") {
            v = "\bb\tt\nn\ff\rr\"\"''\\\\";
            return quote + o.replace(/([\u0080-\uFFFF\x00-\x1f\"\'\\])/g, function (a, b) {
                if (quote === '"' && a === "'") {
                    return a
                }
                i = v.indexOf(b);
                if (i + 1) {
                    return"\\" + v.charAt(i + 1)
                }
                a = b.charCodeAt().toString(16);
                return"\\u" + "0000".substring(a.length) + a
            }) + quote
        }
        if (t == "object") {
            if (o.hasOwnProperty && o instanceof Array) {
                for (i = 0, v = "["; i < o.length; i++) {
                    v += (i > 0 ? "," : "") + serialize(o[i], quote)
                }
                return v + "]"
            }
            v = "{";
            for (i in o) {
                if (o.hasOwnProperty(i)) {
                    v += typeof o[i] != "function" ? (v.length > 1 ? "," + quote : quote) + i + quote + ":" + serialize(o[i], quote) : ""
                }
            }
            return v + "}"
        }
        return"" + o
    }

    tinymce.util.JSON = {serialize:serialize, parse:function (s) {
        try {
            return eval("(" + s + ")")
        } catch (ex) {
        }
    }}
})();
tinymce.create("static tinymce.util.XHR", {send:function (g) {
    var a, e, b = window, h = 0;
    g.scope = g.scope || this;
    g.success_scope = g.success_scope || g.scope;
    g.error_scope = g.error_scope || g.scope;
    g.async = g.async === false ? false : true;
    g.data = g.data || "";
    function d(i) {
        a = 0;
        try {
            a = new ActiveXObject(i)
        } catch (c) {
        }
        return a
    }

    a = b.XMLHttpRequest ? new XMLHttpRequest() : d("Microsoft.XMLHTTP") || d("Msxml2.XMLHTTP");
    if (a) {
        if (a.overrideMimeType) {
            a.overrideMimeType(g.content_type)
        }
        a.open(g.type || (g.data ? "POST" : "GET"), g.url, g.async);
        if (g.content_type) {
            a.setRequestHeader("Content-Type", g.content_type)
        }
        a.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        a.send(g.data);
        function f() {
            if (!g.async || a.readyState == 4 || h++ > 10000) {
                if (g.success && h < 10000 && a.status == 200) {
                    g.success.call(g.success_scope, "" + a.responseText, a, g)
                } else {
                    if (g.error) {
                        g.error.call(g.error_scope, h > 10000 ? "TIMED_OUT" : "GENERAL", a, g)
                    }
                }
                a = null
            } else {
                b.setTimeout(f, 10)
            }
        }

        if (!g.async) {
            return f()
        }
        e = b.setTimeout(f, 10)
    }
}});
(function () {
    var c = tinymce.extend, b = tinymce.util.JSON, a = tinymce.util.XHR;
    tinymce.create("tinymce.util.JSONRequest", {JSONRequest:function (d) {
        this.settings = c({}, d);
        this.count = 0
    }, send:function (f) {
        var e = f.error, d = f.success;
        f = c(this.settings, f);
        f.success = function (h, g) {
            h = b.parse(h);
            if (typeof(h) == "undefined") {
                h = {error:"JSON Parse error."}
            }
            if (h.error) {
                e.call(f.error_scope || f.scope, h.error, g)
            } else {
                d.call(f.success_scope || f.scope, h.result)
            }
        };
        f.error = function (h, g) {
            if (e) {
                e.call(f.error_scope || f.scope, h, g)
            }
        };
        f.data = b.serialize({id:f.id || "c" + (this.count++), method:f.method, params:f.params});
        f.content_type = "application/json";
        a.send(f)
    }, "static":{sendRPC:function (d) {
        return new tinymce.util.JSONRequest().send(d)
    }}})
}());
(function (a) {
    a.VK = {BACKSPACE:8, DELETE:46, DOWN:40, ENTER:13, LEFT:37, RIGHT:39, SPACEBAR:32, TAB:9, UP:38, modifierPressed:function (b) {
        return b.shiftKey || b.ctrlKey || b.altKey
    }}
})(tinymce);
(function (m) {
    var k = m.VK, l = k.BACKSPACE, j = k.DELETE;

    function d(o) {
        var q = o.dom, p = o.selection;
        o.onKeyDown.add(function (s, x) {
            var r, y, u, v, t;
            if (x.isDefaultPrevented()) {
                return
            }
            t = x.keyCode == j;
            if ((t || x.keyCode == l) && !k.modifierPressed(x)) {
                x.preventDefault();
                r = p.getRng();
                y = q.getParent(r.startContainer, q.isBlock);
                if (t) {
                    y = q.getNext(y, q.isBlock)
                }
                if (y) {
                    u = y.firstChild;
                    while (u && u.nodeType == 3 && u.nodeValue.length == 0) {
                        u = u.nextSibling
                    }
                    if (u && u.nodeName === "SPAN") {
                        v = u.cloneNode(false)
                    }
                }
                s.getDoc().execCommand(t ? "ForwardDelete" : "Delete", false, null);
                y = q.getParent(r.startContainer, q.isBlock);
                m.each(q.select("span.Apple-style-span,font.Apple-style-span", y), function (z) {
                    var A = p.getBookmark();
                    if (v) {
                        q.replace(v.cloneNode(false), z, true)
                    } else {
                        q.remove(z, true)
                    }
                    p.moveToBookmark(A)
                })
            }
        })
    }

    function e(o) {
        function p(s) {
            var r = o.dom.create("body");
            var t = s.cloneContents();
            r.appendChild(t);
            return o.selection.serializer.serialize(r, {format:"html"})
        }

        function q(r) {
            var t = p(r);
            var u = o.dom.createRng();
            u.selectNode(o.getBody());
            var s = p(u);
            return t === s
        }

        o.onKeyDown.addToTop(function (s, u) {
            var t = u.keyCode;
            if (t == j || t == l) {
                var r = s.selection.getRng(true);
                if (!r.collapsed && q(r)) {
                    s.setContent("", {format:"raw"});
                    s.nodeChanged();
                    u.preventDefault()
                }
            }
        })
    }

    function c(o) {
        o.dom.bind(o.getDoc(), "focusin", function () {
            o.selection.setRng(o.selection.getRng())
        })
    }

    function g(o) {
        o.onKeyDown.add(function (p, s) {
            if (s.keyCode === l) {
                if (p.selection.isCollapsed() && p.selection.getRng(true).startOffset === 0) {
                    var r = p.selection.getNode();
                    var q = r.previousSibling;
                    if (q && q.nodeName && q.nodeName.toLowerCase() === "hr") {
                        p.dom.remove(q);
                        m.dom.Event.cancel(s)
                    }
                }
            }
        })
    }

    function i(o) {
        if (!Range.prototype.getClientRects) {
            o.onMouseDown.add(function (q, r) {
                if (r.target.nodeName === "HTML") {
                    var p = q.getBody();
                    p.blur();
                    setTimeout(function () {
                        p.focus()
                    }, 0)
                }
            })
        }
    }

    function h(o) {
        o.onClick.add(function (p, q) {
            q = q.target;
            if (/^(IMG|HR)$/.test(q.nodeName)) {
                p.selection.getSel().setBaseAndExtent(q, 0, q, 1)
            }
            if (q.nodeName == "A" && p.dom.hasClass(q, "mceItemAnchor")) {
                p.selection.select(q)
            }
            p.nodeChanged()
        })
    }

    function b(o) {
        var q = o.selection, t = o.dom;

        function r() {
            var u = t.getAttribs(q.getStart().cloneNode(false));
            return function () {
                var v = q.getStart();
                if (v !== o.getBody()) {
                    t.setAttrib(v, "style", null);
                    m.each(u, function (x) {
                        v.setAttributeNode(x.cloneNode(true))
                    })
                }
            }
        }

        function p() {
            return !q.isCollapsed() && q.getStart() != q.getEnd()
        }

        function s(u, v) {
            v.preventDefault();
            return false
        }

        o.onKeyPress.add(function (u, x) {
            var v;
            if ((x.keyCode == 8 || x.keyCode == 46) && p()) {
                v = r();
                u.getDoc().execCommand("delete", false, null);
                v();
                x.preventDefault();
                return false
            }
        });
        t.bind(o.getDoc(), "cut", function (v) {
            var u;
            if (p()) {
                u = r();
                o.onKeyUp.addToTop(s);
                setTimeout(function () {
                    u();
                    o.onKeyUp.remove(s)
                }, 0)
            }
        })
    }

    function n(o) {
        var q, p;
        o.dom.bind(o.getDoc(), "selectionchange", function () {
            if (p) {
                clearTimeout(p);
                p = 0
            }
            p = window.setTimeout(function () {
                var r = o.selection.getRng();
                if (!q || !m.dom.RangeUtils.compareRanges(r, q)) {
                    o.nodeChanged();
                    q = r
                }
            }, 50)
        })
    }

    function a(o) {
        document.body.setAttribute("role", "application")
    }

    function f(o) {
        o.onKeyDown.add(function (p, r) {
            if (r.keyCode === l) {
                if (p.selection.isCollapsed() && p.selection.getRng(true).startOffset === 0) {
                    var q = p.selection.getNode().previousSibling;
                    if (q && q.nodeName && q.nodeName.toLowerCase() === "table") {
                        return m.dom.Event.cancel(r)
                    }
                }
            }
        })
    }

    m.create("tinymce.util.Quirks", {Quirks:function (o) {
        f(o);
        if (m.isWebKit) {
            d(o);
            e(o);
            c(o);
            h(o);
            if (m.isIDevice) {
                n(o)
            }
        }
        if (m.isIE) {
            g(o);
            e(o);
            a(o)
        }
        if (m.isGecko) {
            g(o);
            i(o);
            b(o)
        }
    }})
})(tinymce);
(function (j) {
    var a, g, d, k = /[&<>\"\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, b = /[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, f = /[<>&\"\']/g, c = /&(#x|#)?([\w]+);/g, i = {128:"\u20AC", 130:"\u201A", 131:"\u0192", 132:"\u201E", 133:"\u2026", 134:"\u2020", 135:"\u2021", 136:"\u02C6", 137:"\u2030", 138:"\u0160", 139:"\u2039", 140:"\u0152", 142:"\u017D", 145:"\u2018", 146:"\u2019", 147:"\u201C", 148:"\u201D", 149:"\u2022", 150:"\u2013", 151:"\u2014", 152:"\u02DC", 153:"\u2122", 154:"\u0161", 155:"\u203A", 156:"\u0153", 158:"\u017E", 159:"\u0178"};
    g = {'"':"&quot;", "'":"&#39;", "<":"&lt;", ">":"&gt;", "&":"&amp;"};
    d = {"&lt;":"<", "&gt;":">", "&amp;":"&", "&quot;":'"', "&apos;":"'"};
    function h(l) {
        var m;
        m = document.createElement("div");
        m.innerHTML = l;
        return m.textContent || m.innerText || l
    }

    function e(m, p) {
        var n, o, l, q = {};
        if (m) {
            m = m.split(",");
            p = p || 10;
            for (n = 0; n < m.length; n += 2) {
                o = String.fromCharCode(parseInt(m[n], p));
                if (!g[o]) {
                    l = "&" + m[n + 1] + ";";
                    q[o] = l;
                    q[l] = o
                }
            }
            return q
        }
    }

    a = e("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro", 32);
    j.html = j.html || {};
    j.html.Entities = {encodeRaw:function (m, l) {
        return m.replace(l ? k : b, function (n) {
            return g[n] || n
        })
    }, encodeAllRaw:function (l) {
        return("" + l).replace(f, function (m) {
            return g[m] || m
        })
    }, encodeNumeric:function (m, l) {
        return m.replace(l ? k : b, function (n) {
            if (n.length > 1) {
                return"&#" + (((n.charCodeAt(0) - 55296) * 1024) + (n.charCodeAt(1) - 56320) + 65536) + ";"
            }
            return g[n] || "&#" + n.charCodeAt(0) + ";"
        })
    }, encodeNamed:function (n, l, m) {
        m = m || a;
        return n.replace(l ? k : b, function (o) {
            return g[o] || m[o] || o
        })
    }, getEncodeFunc:function (l, o) {
        var p = j.html.Entities;
        o = e(o) || a;
        function m(r, q) {
            return r.replace(q ? k : b, function (s) {
                return g[s] || o[s] || "&#" + s.charCodeAt(0) + ";" || s
            })
        }

        function n(r, q) {
            return p.encodeNamed(r, q, o)
        }

        l = j.makeMap(l.replace(/\+/g, ","));
        if (l.named && l.numeric) {
            return m
        }
        if (l.named) {
            if (o) {
                return n
            }
            return p.encodeNamed
        }
        if (l.numeric) {
            return p.encodeNumeric
        }
        return p.encodeRaw
    }, decode:function (l) {
        return l.replace(c, function (n, m, o) {
            if (m) {
                o = parseInt(o, m.length === 2 ? 16 : 10);
                if (o > 65535) {
                    o -= 65536;
                    return String.fromCharCode(55296 + (o >> 10), 56320 + (o & 1023))
                } else {
                    return i[o] || String.fromCharCode(o)
                }
            }
            return d[n] || a[n] || h(n)
        })
    }}
})(tinymce);
tinymce.html.Styles = function (d, f) {
    var k = /rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi, h = /(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi, b = /\s*([^:]+):\s*([^;]+);?/g, l = /\s+$/, m = /rgb/, e, g, a = {}, j;
    d = d || {};
    j = "\\\" \\' \\; \\: ; : \uFEFF".split(" ");
    for (g = 0; g < j.length; g++) {
        a[j[g]] = "\uFEFF" + g;
        a["\uFEFF" + g] = j[g]
    }
    function c(n, q, p, i) {
        function o(r) {
            r = parseInt(r).toString(16);
            return r.length > 1 ? r : "0" + r
        }

        return"#" + o(q) + o(p) + o(i)
    }

    return{toHex:function (i) {
        return i.replace(k, c)
    }, parse:function (r) {
        var y = {}, p, n, v, q, u = d.url_converter, x = d.url_converter_scope || this;

        function o(C, F) {
            var E, B, A, D;
            E = y[C + "-top" + F];
            if (!E) {
                return
            }
            B = y[C + "-right" + F];
            if (E != B) {
                return
            }
            A = y[C + "-bottom" + F];
            if (B != A) {
                return
            }
            D = y[C + "-left" + F];
            if (A != D) {
                return
            }
            y[C + F] = D;
            delete y[C + "-top" + F];
            delete y[C + "-right" + F];
            delete y[C + "-bottom" + F];
            delete y[C + "-left" + F]
        }

        function t(B) {
            var C = y[B], A;
            if (!C || C.indexOf(" ") < 0) {
                return
            }
            C = C.split(" ");
            A = C.length;
            while (A--) {
                if (C[A] !== C[0]) {
                    return false
                }
            }
            y[B] = C[0];
            return true
        }

        function z(C, B, A, D) {
            if (!t(B)) {
                return
            }
            if (!t(A)) {
                return
            }
            if (!t(D)) {
                return
            }
            y[C] = y[B] + " " + y[A] + " " + y[D];
            delete y[B];
            delete y[A];
            delete y[D]
        }

        function s(A) {
            q = true;
            return a[A]
        }

        function i(B, A) {
            if (q) {
                B = B.replace(/\uFEFF[0-9]/g, function (C) {
                    return a[C]
                })
            }
            if (!A) {
                B = B.replace(/\\([\'\";:])/g, "$1")
            }
            return B
        }

        if (r) {
            r = r.replace(/\\[\"\';:\uFEFF]/g, s).replace(/\"[^\"]+\"|\'[^\']+\'/g, function (A) {
                return A.replace(/[;:]/g, s)
            });
            while (p = b.exec(r)) {
                n = p[1].replace(l, "").toLowerCase();
                v = p[2].replace(l, "");
                if (n && v.length > 0) {
                    if (n === "font-weight" && v === "700") {
                        v = "bold"
                    } else {
                        if (n === "color" || n === "background-color") {
                            v = v.toLowerCase()
                        }
                    }
                    v = v.replace(k, c);
                    v = v.replace(h, function (B, A, E, D, F, C) {
                        F = F || C;
                        if (F) {
                            F = i(F);
                            return"'" + F.replace(/\'/g, "\\'") + "'"
                        }
                        A = i(A || E || D);
                        if (u) {
                            A = u.call(x, A, "style")
                        }
                        return"url('" + A.replace(/\'/g, "\\'") + "')"
                    });
                    y[n] = q ? i(v, true) : v
                }
                b.lastIndex = p.index + p[0].length
            }
            o("border", "");
            o("border", "-width");
            o("border", "-color");
            o("border", "-style");
            o("padding", "");
            o("margin", "");
            z("border", "border-width", "border-style", "border-color");
            if (y.border === "medium none") {
                delete y.border
            }
        }
        return y
    }, serialize:function (p, r) {
        var o = "", n, q;

        function i(t) {
            var x, u, s, v;
            x = f.styles[t];
            if (x) {
                for (u = 0, s = x.length; u < s; u++) {
                    t = x[u];
                    v = p[t];
                    if (v !== e && v.length > 0) {
                        o += (o.length > 0 ? " " : "") + t + ": " + v + ";"
                    }
                }
            }
        }

        if (r && f && f.styles) {
            i("*");
            i(r)
        } else {
            for (n in p) {
                q = p[n];
                if (q !== e && q.length > 0) {
                    o += (o.length > 0 ? " " : "") + n + ": " + q + ";"
                }
            }
        }
        return o
    }}
};
(function (f) {
    var a = {}, e = f.makeMap, g = f.each;

    function d(j, i) {
        return j.split(i || ",")
    }

    function h(m, l) {
        var j, k = {};

        function i(n) {
            return n.replace(/[A-Z]+/g, function (o) {
                return i(m[o])
            })
        }

        for (j in m) {
            if (m.hasOwnProperty(j)) {
                m[j] = i(m[j])
            }
        }
        i(l).replace(/#/g, "#text").replace(/(\w+)\[([^\]]+)\]\[([^\]]*)\]/g, function (q, o, n, p) {
            n = d(n, "|");
            k[o] = {attributes:e(n), attributesOrder:n, children:e(p, "|", {"#comment":{}})}
        });
        return k
    }

    function b() {
        var i = a.html5;
        if (!i) {
            i = a.html5 = h({A:"id|accesskey|class|dir|draggable|item|hidden|itemprop|role|spellcheck|style|subject|title", B:"#|a|abbr|area|audio|b|bdo|br|button|canvas|cite|code|command|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|keygen|label|link|map|mark|meta|meter|noscript|object|output|progress|q|ruby|samp|script|select|small|span|strong|sub|sup|svg|textarea|time|var|video", C:"#|a|abbr|area|address|article|aside|audio|b|bdo|blockquote|br|button|canvas|cite|code|command|datalist|del|details|dfn|dialog|div|dl|em|embed|fieldset|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|i|iframe|img|input|ins|kbd|keygen|label|link|map|mark|menu|meta|meter|nav|noscript|ol|object|output|p|pre|progress|q|ruby|samp|script|section|select|small|span|strong|style|sub|sup|svg|table|textarea|time|ul|var|video"}, "html[A|manifest][body|head]head[A][base|command|link|meta|noscript|script|style|title]title[A][#]base[A|href|target][]link[A|href|rel|media|type|sizes][]meta[A|http-equiv|name|content|charset][]style[A|type|media|scoped][#]script[A|charset|type|src|defer|async][#]noscript[A][C]body[A][C]section[A][C]nav[A][C]article[A][C]aside[A][C]h1[A][B]h2[A][B]h3[A][B]h4[A][B]h5[A][B]h6[A][B]hgroup[A][h1|h2|h3|h4|h5|h6]header[A][C]footer[A][C]address[A][C]p[A][B]br[A][]pre[A][B]dialog[A][dd|dt]blockquote[A|cite][C]ol[A|start|reversed][li]ul[A][li]li[A|value][C]dl[A][dd|dt]dt[A][B]dd[A][C]a[A|href|target|ping|rel|media|type][C]em[A][B]strong[A][B]small[A][B]cite[A][B]q[A|cite][B]dfn[A][B]abbr[A][B]code[A][B]var[A][B]samp[A][B]kbd[A][B]sub[A][B]sup[A][B]i[A][B]b[A][B]mark[A][B]progress[A|value|max][B]meter[A|value|min|max|low|high|optimum][B]time[A|datetime][B]ruby[A][B|rt|rp]rt[A][B]rp[A][B]bdo[A][B]span[A][B]ins[A|cite|datetime][B]del[A|cite|datetime][B]figure[A][C|legend]img[A|alt|src|height|width|usemap|ismap][]iframe[A|name|src|height|width|sandbox|seamless][]embed[A|src|height|width|type][]object[A|data|type|height|width|usemap|name|form|classid][param]param[A|name|value][]details[A|open][C|legend]command[A|type|label|icon|disabled|checked|radiogroup][]menu[A|type|label][C|li]legend[A][C|B]div[A][C]source[A|src|type|media][]audio[A|src|autobuffer|autoplay|loop|controls][source]video[A|src|autobuffer|autoplay|loop|controls|width|height|poster][source]hr[A][]form[A|accept-charset|action|autocomplete|enctype|method|name|novalidate|target][C]fieldset[A|disabled|form|name][C|legend]label[A|form|for][B]input[A|type|accept|alt|autocomplete|checked|disabled|form|formaction|formenctype|formmethod|formnovalidate|formtarget|height|list|max|maxlength|min|multiple|pattern|placeholder|readonly|required|size|src|step|width|files|value][]button[A|autofocus|disabled|form|formaction|formenctype|formmethod|formnovalidate|formtarget|name|value|type][B]select[A|autofocus|disabled|form|multiple|name|size][option|optgroup]datalist[A][B|option]optgroup[A|disabled|label][option]option[A|disabled|selected|label|value][]textarea[A|autofocus|disabled|form|maxlength|name|placeholder|readonly|required|rows|cols|wrap][]keygen[A|autofocus|challenge|disabled|form|keytype|name][]output[A|for|form|name][B]canvas[A|width|height][]map[A|name][B|C]area[A|shape|coords|href|alt|target|media|rel|ping|type][]mathml[A][]svg[A][]table[A|summary][caption|colgroup|thead|tfoot|tbody|tr]caption[A][C]colgroup[A|span][col]col[A|span][]thead[A][tr]tfoot[A][tr]tbody[A][tr]tr[A][th|td]th[A|headers|rowspan|colspan|scope][B]td[A|headers|rowspan|colspan][C]")
        }
        return i
    }

    function c() {
        var i = a.html4;
        if (!i) {
            i = a.html4 = h({Z:"H|K|N|O|P", Y:"X|form|R|Q", ZG:"E|span|width|align|char|charoff|valign", X:"p|T|div|U|W|isindex|fieldset|table", ZF:"E|align|char|charoff|valign", W:"pre|hr|blockquote|address|center|noframes", ZE:"abbr|axis|headers|scope|rowspan|colspan|align|char|charoff|valign|nowrap|bgcolor|width|height", ZD:"[E][S]", U:"ul|ol|dl|menu|dir", ZC:"p|Y|div|U|W|table|br|span|bdo|object|applet|img|map|K|N|Q", T:"h1|h2|h3|h4|h5|h6", ZB:"X|S|Q", S:"R|P", ZA:"a|G|J|M|O|P", R:"a|H|K|N|O", Q:"noscript|P", P:"ins|del|script", O:"input|select|textarea|label|button", N:"M|L", M:"em|strong|dfn|code|q|samp|kbd|var|cite|abbr|acronym", L:"sub|sup", K:"J|I", J:"tt|i|b|u|s|strike", I:"big|small|font|basefont", H:"G|F", G:"br|span|bdo", F:"object|applet|img|map|iframe", E:"A|B|C", D:"accesskey|tabindex|onfocus|onblur", C:"onclick|ondblclick|onmousedown|onmouseup|onmouseover|onmousemove|onmouseout|onkeypress|onkeydown|onkeyup", B:"lang|xml:lang|dir", A:"id|class|style|title"}, "script[id|charset|type|language|src|defer|xml:space][]style[B|id|type|media|title|xml:space][]object[E|declare|classid|codebase|data|type|codetype|archive|standby|width|height|usemap|name|tabindex|align|border|hspace|vspace][#|param|Y]param[id|name|value|valuetype|type][]p[E|align][#|S]a[E|D|charset|type|name|href|hreflang|rel|rev|shape|coords|target][#|Z]br[A|clear][]span[E][#|S]bdo[A|C|B][#|S]applet[A|codebase|archive|code|object|alt|name|width|height|align|hspace|vspace][#|param|Y]h1[E|align][#|S]img[E|src|alt|name|longdesc|width|height|usemap|ismap|align|border|hspace|vspace][]map[B|C|A|name][X|form|Q|area]h2[E|align][#|S]iframe[A|longdesc|name|src|frameborder|marginwidth|marginheight|scrolling|align|width|height][#|Y]h3[E|align][#|S]tt[E][#|S]i[E][#|S]b[E][#|S]u[E][#|S]s[E][#|S]strike[E][#|S]big[E][#|S]small[E][#|S]font[A|B|size|color|face][#|S]basefont[id|size|color|face][]em[E][#|S]strong[E][#|S]dfn[E][#|S]code[E][#|S]q[E|cite][#|S]samp[E][#|S]kbd[E][#|S]var[E][#|S]cite[E][#|S]abbr[E][#|S]acronym[E][#|S]sub[E][#|S]sup[E][#|S]input[E|D|type|name|value|checked|disabled|readonly|size|maxlength|src|alt|usemap|onselect|onchange|accept|align][]select[E|name|size|multiple|disabled|tabindex|onfocus|onblur|onchange][optgroup|option]optgroup[E|disabled|label][option]option[E|selected|disabled|label|value][]textarea[E|D|name|rows|cols|disabled|readonly|onselect|onchange][]label[E|for|accesskey|onfocus|onblur][#|S]button[E|D|name|value|type|disabled][#|p|T|div|U|W|table|G|object|applet|img|map|K|N|Q]h4[E|align][#|S]ins[E|cite|datetime][#|Y]h5[E|align][#|S]del[E|cite|datetime][#|Y]h6[E|align][#|S]div[E|align][#|Y]ul[E|type|compact][li]li[E|type|value][#|Y]ol[E|type|compact|start][li]dl[E|compact][dt|dd]dt[E][#|S]dd[E][#|Y]menu[E|compact][li]dir[E|compact][li]pre[E|width|xml:space][#|ZA]hr[E|align|noshade|size|width][]blockquote[E|cite][#|Y]address[E][#|S|p]center[E][#|Y]noframes[E][#|Y]isindex[A|B|prompt][]fieldset[E][#|legend|Y]legend[E|accesskey|align][#|S]table[E|summary|width|border|frame|rules|cellspacing|cellpadding|align|bgcolor][caption|col|colgroup|thead|tfoot|tbody|tr]caption[E|align][#|S]col[ZG][]colgroup[ZG][col]thead[ZF][tr]tr[ZF|bgcolor][th|td]th[E|ZE][#|Y]form[E|action|method|name|enctype|onsubmit|onreset|accept|accept-charset|target][#|X|R|Q]noscript[E][#|Y]td[E|ZE][#|Y]tfoot[ZF][tr]tbody[ZF][tr]area[E|D|shape|coords|href|nohref|alt|target][]base[id|href|target][]body[E|onload|onunload|background|bgcolor|text|link|vlink|alink][#|Y]")
        }
        return i
    }

    f.html.Schema = function (A) {
        var u = this, s = {}, k = {}, j = [], D, y;
        var o, q, z, r, v, n, p = {};

        function m(F, E, H) {
            var G = A[F];
            if (!G) {
                G = a[F];
                if (!G) {
                    G = e(E, " ", e(E.toUpperCase(), " "));
                    G = f.extend(G, H);
                    a[F] = G
                }
            } else {
                G = e(G, ",", e(G.toUpperCase(), " "))
            }
            return G
        }

        A = A || {};
        y = A.schema == "html5" ? b() : c();
        if (A.verify_html === false) {
            A.valid_elements = "*[*]"
        }
        if (A.valid_styles) {
            D = {};
            g(A.valid_styles, function (F, E) {
                D[E] = f.explode(F)
            })
        }
        o = m("whitespace_elements", "pre script style textarea");
        q = m("self_closing_elements", "colgroup dd dt li options p td tfoot th thead tr");
        z = m("short_ended_elements", "area base basefont br col frame hr img input isindex link meta param embed source");
        r = m("boolean_attributes", "checked compact declare defer disabled ismap multiple nohref noresize noshade nowrap readonly selected autoplay loop controls");
        n = m("non_empty_elements", "td th iframe video audio object", z);
        v = m("block_elements", "h1 h2 h3 h4 h5 h6 hr p div address pre form table tbody thead tfoot th tr td li ol ul caption blockquote center dl dt dd dir fieldset noscript menu isindex samp header footer article section hgroup aside nav");
        function i(E) {
            return new RegExp("^" + E.replace(/([?+*])/g, ".$1") + "$")
        }

        function C(L) {
            var K, G, Z, V, aa, F, I, U, X, Q, Y, ac, O, J, W, E, S, H, ab, ad, P, T, N = /^([#+-])?([^\[\/]+)(?:\/([^\[]+))?(?:\[([^\]]+)\])?$/, R = /^([!\-])?(\w+::\w+|[^=:<]+)?(?:([=:<])(.*))?$/, M = /[*?+]/;
            if (L) {
                L = d(L);
                if (s["@"]) {
                    S = s["@"].attributes;
                    H = s["@"].attributesOrder
                }
                for (K = 0, G = L.length; K < G; K++) {
                    F = N.exec(L[K]);
                    if (F) {
                        W = F[1];
                        Q = F[2];
                        E = F[3];
                        X = F[4];
                        O = {};
                        J = [];
                        I = {attributes:O, attributesOrder:J};
                        if (W === "#") {
                            I.paddEmpty = true
                        }
                        if (W === "-") {
                            I.removeEmpty = true
                        }
                        if (S) {
                            for (ad in S) {
                                O[ad] = S[ad]
                            }
                            J.push.apply(J, H)
                        }
                        if (X) {
                            X = d(X, "|");
                            for (Z = 0, V = X.length; Z < V; Z++) {
                                F = R.exec(X[Z]);
                                if (F) {
                                    U = {};
                                    ac = F[1];
                                    Y = F[2].replace(/::/g, ":");
                                    W = F[3];
                                    T = F[4];
                                    if (ac === "!") {
                                        I.attributesRequired = I.attributesRequired || [];
                                        I.attributesRequired.push(Y);
                                        U.required = true
                                    }
                                    if (ac === "-") {
                                        delete O[Y];
                                        J.splice(f.inArray(J, Y), 1);
                                        continue
                                    }
                                    if (W) {
                                        if (W === "=") {
                                            I.attributesDefault = I.attributesDefault || [];
                                            I.attributesDefault.push({name:Y, value:T});
                                            U.defaultValue = T
                                        }
                                        if (W === ":") {
                                            I.attributesForced = I.attributesForced || [];
                                            I.attributesForced.push({name:Y, value:T});
                                            U.forcedValue = T
                                        }
                                        if (W === "<") {
                                            U.validValues = e(T, "?")
                                        }
                                    }
                                    if (M.test(Y)) {
                                        I.attributePatterns = I.attributePatterns || [];
                                        U.pattern = i(Y);
                                        I.attributePatterns.push(U)
                                    } else {
                                        if (!O[Y]) {
                                            J.push(Y)
                                        }
                                        O[Y] = U
                                    }
                                }
                            }
                        }
                        if (!S && Q == "@") {
                            S = O;
                            H = J
                        }
                        if (E) {
                            I.outputName = Q;
                            s[E] = I
                        }
                        if (M.test(Q)) {
                            I.pattern = i(Q);
                            j.push(I)
                        } else {
                            s[Q] = I
                        }
                    }
                }
            }
        }

        function t(E) {
            s = {};
            j = [];
            C(E);
            g(y, function (G, F) {
                k[F] = G.children
            })
        }

        function l(F) {
            var E = /^(~)?(.+)$/;
            if (F) {
                g(d(F), function (J) {
                    var H = E.exec(J), I = H[1] === "~", K = I ? "span" : "div", G = H[2];
                    k[G] = k[K];
                    p[G] = K;
                    if (!I) {
                        v[G] = {}
                    }
                    g(k, function (L, M) {
                        if (L[K]) {
                            L[G] = L[K]
                        }
                    })
                })
            }
        }

        function x(F) {
            var E = /^([+\-]?)(\w+)\[([^\]]+)\]$/;
            if (F) {
                g(d(F), function (J) {
                    var I = E.exec(J), G, H;
                    if (I) {
                        H = I[1];
                        if (H) {
                            G = k[I[2]]
                        } else {
                            G = k[I[2]] = {"#comment":{}}
                        }
                        G = k[I[2]];
                        g(d(I[3], "|"), function (K) {
                            if (H === "-") {
                                delete G[K]
                            } else {
                                G[K] = {}
                            }
                        })
                    }
                })
            }
        }

        function B(E) {
            var G = s[E], F;
            if (G) {
                return G
            }
            F = j.length;
            while (F--) {
                G = j[F];
                if (G.pattern.test(E)) {
                    return G
                }
            }
        }

        if (!A.valid_elements) {
            g(y, function (F, E) {
                s[E] = {attributes:F.attributes, attributesOrder:F.attributesOrder};
                k[E] = F.children
            });
            if (A.schema != "html5") {
                g(d("strong/b,em/i"), function (E) {
                    E = d(E, "/");
                    s[E[1]].outputName = E[0]
                })
            }
            s.img.attributesDefault = [
                {name:"alt", value:""}
            ];
            g(d("ol,ul,sub,sup,blockquote,span,font,a,table,tbody,tr,strong,em,b,i"), function (E) {
                if (s[E]) {
                    s[E].removeEmpty = true
                }
            });
            g(d("p,h1,h2,h3,h4,h5,h6,th,td,pre,div,address,caption"), function (E) {
                s[E].paddEmpty = true
            })
        } else {
            t(A.valid_elements)
        }
        l(A.custom_elements);
        x(A.valid_children);
        C(A.extended_valid_elements);
        x("+ol[ul|ol],+ul[ul|ol]");
        if (A.invalid_elements) {
            f.each(f.explode(A.invalid_elements), function (E) {
                if (s[E]) {
                    delete s[E]
                }
            })
        }
        if (!B("span")) {
            C("span[!data-mce-type|*]")
        }
        u.children = k;
        u.styles = D;
        u.getBoolAttrs = function () {
            return r
        };
        u.getBlockElements = function () {
            return v
        };
        u.getShortEndedElements = function () {
            return z
        };
        u.getSelfClosingElements = function () {
            return q
        };
        u.getNonEmptyElements = function () {
            return n
        };
        u.getWhiteSpaceElements = function () {
            return o
        };
        u.isValidChild = function (E, G) {
            var F = k[E];
            return !!(F && F[G])
        };
        u.getElementRule = B;
        u.getCustomElements = function () {
            return p
        };
        u.addValidElements = C;
        u.setValidElements = t;
        u.addCustomElements = l;
        u.addValidChildren = x
    }
})(tinymce);
(function (a) {
    a.html.SaxParser = function (c, e) {
        var b = this, d = function () {
        };
        c = c || {};
        b.schema = e = e || new a.html.Schema();
        if (c.fix_self_closing !== false) {
            c.fix_self_closing = true
        }
        a.each("comment cdata text start end pi doctype".split(" "), function (f) {
            if (f) {
                b[f] = c[f] || d
            }
        });
        b.parse = function (D) {
            var n = this, g, F = 0, H, A, z = [], M, P, B, q, y, r, L, G, N, u, m, k, s, Q, o, O, E, R, K, f, I, l, C, J, h, v = 0, j = a.html.Entities.decode, x, p;

            function t(S) {
                var U, T;
                U = z.length;
                while (U--) {
                    if (z[U].name === S) {
                        break
                    }
                }
                if (U >= 0) {
                    for (T = z.length - 1; T >= U; T--) {
                        S = z[T];
                        if (S.valid) {
                            n.end(S.name)
                        }
                    }
                    z.length = U
                }
            }

            l = new RegExp("<(?:(?:!--([\\w\\W]*?)-->)|(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|(?:!DOCTYPE([\\w\\W]*?)>)|(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|(?:\\/([^>]+)>)|(?:([^\\s\\/<>]+)((?:\\s+[^\"'>]+(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>]*))*|\\/|\\s+)>))", "g");
            C = /([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:\\.|[^\"])*)\")|(?:\'((?:\\.|[^\'])*)\')|([^>\s]+)))?/g;
            J = {script:/<\/script[^>]*>/gi, style:/<\/style[^>]*>/gi, noscript:/<\/noscript[^>]*>/gi};
            L = e.getShortEndedElements();
            I = e.getSelfClosingElements();
            G = e.getBoolAttrs();
            u = c.validate;
            r = c.remove_internals;
            x = c.fix_self_closing;
            p = a.isIE;
            o = /^:/;
            while (g = l.exec(D)) {
                if (F < g.index) {
                    n.text(j(D.substr(F, g.index - F)))
                }
                if (H = g[6]) {
                    H = H.toLowerCase();
                    if (p && o.test(H)) {
                        H = H.substr(1)
                    }
                    t(H)
                } else {
                    if (H = g[7]) {
                        H = H.toLowerCase();
                        if (p && o.test(H)) {
                            H = H.substr(1)
                        }
                        N = H in L;
                        if (x && I[H] && z.length > 0 && z[z.length - 1].name === H) {
                            t(H)
                        }
                        if (!u || (m = e.getElementRule(H))) {
                            k = true;
                            if (u) {
                                O = m.attributes;
                                E = m.attributePatterns
                            }
                            if (Q = g[8]) {
                                y = Q.indexOf("data-mce-type") !== -1;
                                if (y && r) {
                                    k = false
                                }
                                M = [];
                                M.map = {};
                                Q.replace(C, function (T, S, X, W, V) {
                                    var Y, U;
                                    S = S.toLowerCase();
                                    X = S in G ? S : j(X || W || V || "");
                                    if (u && !y && S.indexOf("data-") !== 0) {
                                        Y = O[S];
                                        if (!Y && E) {
                                            U = E.length;
                                            while (U--) {
                                                Y = E[U];
                                                if (Y.pattern.test(S)) {
                                                    break
                                                }
                                            }
                                            if (U === -1) {
                                                Y = null
                                            }
                                        }
                                        if (!Y) {
                                            return
                                        }
                                        if (Y.validValues && !(X in Y.validValues)) {
                                            return
                                        }
                                    }
                                    M.map[S] = X;
                                    M.push({name:S, value:X})
                                })
                            } else {
                                M = [];
                                M.map = {}
                            }
                            if (u && !y) {
                                R = m.attributesRequired;
                                K = m.attributesDefault;
                                f = m.attributesForced;
                                if (f) {
                                    P = f.length;
                                    while (P--) {
                                        s = f[P];
                                        q = s.name;
                                        h = s.value;
                                        if (h === "{$uid}") {
                                            h = "mce_" + v++
                                        }
                                        M.map[q] = h;
                                        M.push({name:q, value:h})
                                    }
                                }
                                if (K) {
                                    P = K.length;
                                    while (P--) {
                                        s = K[P];
                                        q = s.name;
                                        if (!(q in M.map)) {
                                            h = s.value;
                                            if (h === "{$uid}") {
                                                h = "mce_" + v++
                                            }
                                            M.map[q] = h;
                                            M.push({name:q, value:h})
                                        }
                                    }
                                }
                                if (R) {
                                    P = R.length;
                                    while (P--) {
                                        if (R[P] in M.map) {
                                            break
                                        }
                                    }
                                    if (P === -1) {
                                        k = false
                                    }
                                }
                                if (M.map["data-mce-bogus"]) {
                                    k = false
                                }
                            }
                            if (k) {
                                n.start(H, M, N)
                            }
                        } else {
                            k = false
                        }
                        if (A = J[H]) {
                            A.lastIndex = F = g.index + g[0].length;
                            if (g = A.exec(D)) {
                                if (k) {
                                    B = D.substr(F, g.index - F)
                                }
                                F = g.index + g[0].length
                            } else {
                                B = D.substr(F);
                                F = D.length
                            }
                            if (k && B.length > 0) {
                                n.text(B, true)
                            }
                            if (k) {
                                n.end(H)
                            }
                            l.lastIndex = F;
                            continue
                        }
                        if (!N) {
                            if (!Q || Q.indexOf("/") != Q.length - 1) {
                                z.push({name:H, valid:k})
                            } else {
                                if (k) {
                                    n.end(H)
                                }
                            }
                        }
                    } else {
                        if (H = g[1]) {
                            n.comment(H)
                        } else {
                            if (H = g[2]) {
                                n.cdata(H)
                            } else {
                                if (H = g[3]) {
                                    n.doctype(H)
                                } else {
                                    if (H = g[4]) {
                                        n.pi(H, g[5])
                                    }
                                }
                            }
                        }
                    }
                }
                F = g.index + g[0].length
            }
            if (F < D.length) {
                n.text(j(D.substr(F)))
            }
            for (P = z.length - 1; P >= 0; P--) {
                H = z[P];
                if (H.valid) {
                    n.end(H.name)
                }
            }
        }
    }
})(tinymce);
(function (d) {
    var c = /^[ \t\r\n]*$/, e = {"#text":3, "#comment":8, "#cdata":4, "#pi":7, "#doctype":10, "#document-fragment":11};

    function a(k, l, j) {
        var i, h, f = j ? "lastChild" : "firstChild", g = j ? "prev" : "next";
        if (k[f]) {
            return k[f]
        }
        if (k !== l) {
            i = k[g];
            if (i) {
                return i
            }
            for (h = k.parent; h && h !== l; h = h.parent) {
                i = h[g];
                if (i) {
                    return i
                }
            }
        }
    }

    function b(f, g) {
        this.name = f;
        this.type = g;
        if (g === 1) {
            this.attributes = [];
            this.attributes.map = {}
        }
    }

    d.extend(b.prototype, {replace:function (g) {
        var f = this;
        if (g.parent) {
            g.remove()
        }
        f.insert(g, f);
        f.remove();
        return f
    }, attr:function (h, l) {
        var f = this, g, j, k;
        if (typeof h !== "string") {
            for (j in h) {
                f.attr(j, h[j])
            }
            return f
        }
        if (g = f.attributes) {
            if (l !== k) {
                if (l === null) {
                    if (h in g.map) {
                        delete g.map[h];
                        j = g.length;
                        while (j--) {
                            if (g[j].name === h) {
                                g = g.splice(j, 1);
                                return f
                            }
                        }
                    }
                    return f
                }
                if (h in g.map) {
                    j = g.length;
                    while (j--) {
                        if (g[j].name === h) {
                            g[j].value = l;
                            break
                        }
                    }
                } else {
                    g.push({name:h, value:l})
                }
                g.map[h] = l;
                return f
            } else {
                return g.map[h]
            }
        }
    }, clone:function () {
        var g = this, n = new b(g.name, g.type), h, f, m, j, k;
        if (m = g.attributes) {
            k = [];
            k.map = {};
            for (h = 0, f = m.length; h < f; h++) {
                j = m[h];
                if (j.name !== "id") {
                    k[k.length] = {name:j.name, value:j.value};
                    k.map[j.name] = j.value
                }
            }
            n.attributes = k
        }
        n.value = g.value;
        n.shortEnded = g.shortEnded;
        return n
    }, wrap:function (g) {
        var f = this;
        f.parent.insert(g, f);
        g.append(f);
        return f
    }, unwrap:function () {
        var f = this, h, g;
        for (h = f.firstChild; h;) {
            g = h.next;
            f.insert(h, f, true);
            h = g
        }
        f.remove()
    }, remove:function () {
        var f = this, h = f.parent, g = f.next, i = f.prev;
        if (h) {
            if (h.firstChild === f) {
                h.firstChild = g;
                if (g) {
                    g.prev = null
                }
            } else {
                i.next = g
            }
            if (h.lastChild === f) {
                h.lastChild = i;
                if (i) {
                    i.next = null
                }
            } else {
                g.prev = i
            }
            f.parent = f.next = f.prev = null
        }
        return f
    }, append:function (h) {
        var f = this, g;
        if (h.parent) {
            h.remove()
        }
        g = f.lastChild;
        if (g) {
            g.next = h;
            h.prev = g;
            f.lastChild = h
        } else {
            f.lastChild = f.firstChild = h
        }
        h.parent = f;
        return h
    }, insert:function (h, f, i) {
        var g;
        if (h.parent) {
            h.remove()
        }
        g = f.parent || this;
        if (i) {
            if (f === g.firstChild) {
                g.firstChild = h
            } else {
                f.prev.next = h
            }
            h.prev = f.prev;
            h.next = f;
            f.prev = h
        } else {
            if (f === g.lastChild) {
                g.lastChild = h
            } else {
                f.next.prev = h
            }
            h.next = f.next;
            h.prev = f;
            f.next = h
        }
        h.parent = g;
        return h
    }, getAll:function (g) {
        var f = this, h, i = [];
        for (h = f.firstChild; h; h = a(h, f)) {
            if (h.name === g) {
                i.push(h)
            }
        }
        return i
    }, empty:function () {
        var g = this, f, h, j;
        if (g.firstChild) {
            f = [];
            for (j = g.firstChild; j; j = a(j, g)) {
                f.push(j)
            }
            h = f.length;
            while (h--) {
                j = f[h];
                j.parent = j.firstChild = j.lastChild = j.next = j.prev = null
            }
        }
        g.firstChild = g.lastChild = null;
        return g
    }, isEmpty:function (k) {
        var f = this, j = f.firstChild, h, g;
        if (j) {
            do {
                if (j.type === 1) {
                    if (j.attributes.map["data-mce-bogus"]) {
                        continue
                    }
                    if (k[j.name]) {
                        return false
                    }
                    h = j.attributes.length;
                    while (h--) {
                        g = j.attributes[h].name;
                        if (g === "name" || g.indexOf("data-") === 0) {
                            return false
                        }
                    }
                }
                if (j.type === 8) {
                    return false
                }
                if ((j.type === 3 && !c.test(j.value))) {
                    return false
                }
            } while (j = a(j, f))
        }
        return true
    }, walk:function (f) {
        return a(this, null, f)
    }});
    d.extend(b, {create:function (g, f) {
        var i, h;
        i = new b(g, e[g] || 1);
        if (f) {
            for (h in f) {
                i.attr(h, f[h])
            }
        }
        return i
    }});
    d.html.Node = b
})(tinymce);
(function (b) {
    var a = b.html.Node;
    b.html.DomParser = function (g, h) {
        var f = this, e = {}, d = [], i = {}, c = {};
        g = g || {};
        g.validate = "validate" in g ? g.validate : true;
        g.root_name = g.root_name || "body";
        f.schema = h = h || new b.html.Schema();
        function j(m) {
            var o, p, x, v, z, n, q, l, t, u, k, s, y, r;
            s = b.makeMap("tr,td,th,tbody,thead,tfoot,table");
            k = h.getNonEmptyElements();
            for (o = 0; o < m.length; o++) {
                p = m[o];
                if (!p.parent) {
                    continue
                }
                v = [p];
                for (x = p.parent; x && !h.isValidChild(x.name, p.name) && !s[x.name]; x = x.parent) {
                    v.push(x)
                }
                if (x && v.length > 1) {
                    v.reverse();
                    z = n = f.filterNode(v[0].clone());
                    for (t = 0; t < v.length - 1; t++) {
                        if (h.isValidChild(n.name, v[t].name)) {
                            q = f.filterNode(v[t].clone());
                            n.append(q)
                        } else {
                            q = n
                        }
                        for (l = v[t].firstChild; l && l != v[t + 1];) {
                            r = l.next;
                            q.append(l);
                            l = r
                        }
                        n = q
                    }
                    if (!z.isEmpty(k)) {
                        x.insert(z, v[0], true);
                        x.insert(p, z)
                    } else {
                        x.insert(p, v[0], true)
                    }
                    x = v[0];
                    if (x.isEmpty(k) || x.firstChild === x.lastChild && x.firstChild.name === "br") {
                        x.empty().remove()
                    }
                } else {
                    if (p.parent) {
                        if (p.name === "li") {
                            y = p.prev;
                            if (y && (y.name === "ul" || y.name === "ul")) {
                                y.append(p);
                                continue
                            }
                            y = p.next;
                            if (y && (y.name === "ul" || y.name === "ul")) {
                                y.insert(p, y.firstChild, true);
                                continue
                            }
                            p.wrap(f.filterNode(new a("ul", 1)));
                            continue
                        }
                        if (h.isValidChild(p.parent.name, "div") && h.isValidChild("div", p.name)) {
                            p.wrap(f.filterNode(new a("div", 1)))
                        } else {
                            if (p.name === "style" || p.name === "script") {
                                p.empty().remove()
                            } else {
                                p.unwrap()
                            }
                        }
                    }
                }
            }
        }

        f.filterNode = function (m) {
            var l, k, n;
            if (k in e) {
                n = i[k];
                if (n) {
                    n.push(m)
                } else {
                    i[k] = [m]
                }
            }
            l = d.length;
            while (l--) {
                k = d[l].name;
                if (k in m.attributes.map) {
                    n = c[k];
                    if (n) {
                        n.push(m)
                    } else {
                        c[k] = [m]
                    }
                }
            }
            return m
        };
        f.addNodeFilter = function (k, l) {
            b.each(b.explode(k), function (m) {
                var n = e[m];
                if (!n) {
                    e[m] = n = []
                }
                n.push(l)
            })
        };
        f.addAttributeFilter = function (k, l) {
            b.each(b.explode(k), function (m) {
                var n;
                for (n = 0; n < d.length; n++) {
                    if (d[n].name === m) {
                        d[n].callbacks.push(l);
                        return
                    }
                }
                d.push({name:m, callbacks:[l]})
            })
        };
        f.parse = function (v, m) {
            var n, H, A, z, C, B, x, r, E, L, y, o, D, K = [], J, t, k, s, p, u, q;
            m = m || {};
            i = {};
            c = {};
            o = b.extend(b.makeMap("script,style,head,html,body,title,meta,param"), h.getBlockElements());
            u = h.getNonEmptyElements();
            p = h.children;
            y = g.validate;
            q = "forced_root_block" in m ? m.forced_root_block : g.forced_root_block;
            s = h.getWhiteSpaceElements();
            D = /^[ \t\r\n]+/;
            t = /[ \t\r\n]+$/;
            k = /[ \t\r\n]+/g;
            function F() {
                var M = H.firstChild, l, N;
                while (M) {
                    l = M.next;
                    if (M.type == 3 || (M.type == 1 && M.name !== "p" && !o[M.name] && !M.attr("data-mce-type"))) {
                        if (!N) {
                            N = I(q, 1);
                            H.insert(N, M);
                            N.append(M)
                        } else {
                            N.append(M)
                        }
                    } else {
                        N = null
                    }
                    M = l
                }
            }

            function I(l, M) {
                var N = new a(l, M), O;
                if (l in e) {
                    O = i[l];
                    if (O) {
                        O.push(N)
                    } else {
                        i[l] = [N]
                    }
                }
                return N
            }

            function G(N) {
                var O, l, M;
                for (O = N.prev; O && O.type === 3;) {
                    l = O.value.replace(t, "");
                    if (l.length > 0) {
                        O.value = l;
                        O = O.prev
                    } else {
                        M = O.prev;
                        O.remove();
                        O = M
                    }
                }
            }

            n = new b.html.SaxParser({validate:y, fix_self_closing:!y, cdata:function (l) {
                A.append(I("#cdata", 4)).value = l
            }, text:function (N, l) {
                var M;
                if (!J) {
                    N = N.replace(k, " ");
                    if (A.lastChild && o[A.lastChild.name]) {
                        N = N.replace(D, "")
                    }
                }
                if (N.length !== 0) {
                    M = I("#text", 3);
                    M.raw = !!l;
                    A.append(M).value = N
                }
            }, comment:function (l) {
                A.append(I("#comment", 8)).value = l
            }, pi:function (l, M) {
                A.append(I(l, 7)).value = M;
                G(A)
            }, doctype:function (M) {
                var l;
                l = A.append(I("#doctype", 10));
                l.value = M;
                G(A)
            }, start:function (l, U, N) {
                var S, P, O, M, Q, V, T, R;
                O = y ? h.getElementRule(l) : {};
                if (O) {
                    S = I(O.outputName || l, 1);
                    S.attributes = U;
                    S.shortEnded = N;
                    A.append(S);
                    R = p[A.name];
                    if (R && p[S.name] && !R[S.name]) {
                        K.push(S)
                    }
                    P = d.length;
                    while (P--) {
                        Q = d[P].name;
                        if (Q in U.map) {
                            E = c[Q];
                            if (E) {
                                E.push(S)
                            } else {
                                c[Q] = [S]
                            }
                        }
                    }
                    if (o[l]) {
                        G(S)
                    }
                    if (!N) {
                        A = S
                    }
                    if (!J && s[l]) {
                        J = true
                    }
                }
            }, end:function (l) {
                var Q, N, P, M, O;
                N = y ? h.getElementRule(l) : {};
                if (N) {
                    if (o[l]) {
                        if (!J) {
                            for (Q = A.firstChild; Q && Q.type === 3;) {
                                P = Q.value.replace(D, "");
                                if (P.length > 0) {
                                    Q.value = P;
                                    Q = Q.next
                                } else {
                                    M = Q.next;
                                    Q.remove();
                                    Q = M
                                }
                            }
                            for (Q = A.lastChild; Q && Q.type === 3;) {
                                P = Q.value.replace(t, "");
                                if (P.length > 0) {
                                    Q.value = P;
                                    Q = Q.prev
                                } else {
                                    M = Q.prev;
                                    Q.remove();
                                    Q = M
                                }
                            }
                        }
                        Q = A.prev;
                        if (Q && Q.type === 3) {
                            P = Q.value.replace(D, "");
                            if (P.length > 0) {
                                Q.value = P
                            } else {
                                Q.remove()
                            }
                        }
                    }
                    if (J && s[l]) {
                        J = false
                    }
                    if (N.removeEmpty || N.paddEmpty) {
                        if (A.isEmpty(u)) {
                            if (N.paddEmpty) {
                                A.empty().append(new a("#text", "3")).value = "\u00a0"
                            } else {
                                if (!A.attributes.map.name) {
                                    O = A.parent;
                                    A.empty().remove();
                                    A = O;
                                    return
                                }
                            }
                        }
                    }
                    A = A.parent
                }
            }}, h);
            H = A = new a(m.context || g.root_name, 11);
            n.parse(v);
            if (y && K.length) {
                if (!m.context) {
                    j(K)
                } else {
                    m.invalid = true
                }
            }
            if (q && H.name == "body") {
                F()
            }
            if (!m.invalid) {
                for (L in i) {
                    E = e[L];
                    z = i[L];
                    x = z.length;
                    while (x--) {
                        if (!z[x].parent) {
                            z.splice(x, 1)
                        }
                    }
                    for (C = 0, B = E.length; C < B; C++) {
                        E[C](z, L, m)
                    }
                }
                for (C = 0, B = d.length; C < B; C++) {
                    E = d[C];
                    if (E.name in c) {
                        z = c[E.name];
                        x = z.length;
                        while (x--) {
                            if (!z[x].parent) {
                                z.splice(x, 1)
                            }
                        }
                        for (x = 0, r = E.callbacks.length; x < r; x++) {
                            E.callbacks[x](z, E.name, m)
                        }
                    }
                }
            }
            return H
        };
        if (g.remove_trailing_brs) {
            f.addNodeFilter("br", function (n, m) {
                var r, q = n.length, o, u = h.getBlockElements(), k = h.getNonEmptyElements(), s, p, t;
                u.body = 1;
                for (r = 0; r < q; r++) {
                    o = n[r];
                    s = o.parent;
                    if (u[o.parent.name] && o === s.lastChild) {
                        p = o.prev;
                        while (p) {
                            t = p.name;
                            if (t !== "span" || p.attr("data-mce-type") !== "bookmark") {
                                if (t !== "br") {
                                    break
                                }
                                if (t === "br") {
                                    o = null;
                                    break
                                }
                            }
                            p = p.prev
                        }
                        if (o) {
                            o.remove();
                            if (s.isEmpty(k)) {
                                elementRule = h.getElementRule(s.name);
                                if (elementRule) {
                                    if (elementRule.removeEmpty) {
                                        s.remove()
                                    } else {
                                        if (elementRule.paddEmpty) {
                                            s.empty().append(new b.html.Node("#text", 3)).value = "\u00a0"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }
    }
})(tinymce);
tinymce.html.Writer = function (e) {
    var c = [], a, b, d, f, g;
    e = e || {};
    a = e.indent;
    b = tinymce.makeMap(e.indent_before || "");
    d = tinymce.makeMap(e.indent_after || "");
    f = tinymce.html.Entities.getEncodeFunc(e.entity_encoding || "raw", e.entities);
    g = e.element_format == "html";
    return{start:function (m, k, p) {
        var n, j, h, o;
        if (a && b[m] && c.length > 0) {
            o = c[c.length - 1];
            if (o.length > 0 && o !== "\n") {
                c.push("\n")
            }
        }
        c.push("<", m);
        if (k) {
            for (n = 0, j = k.length; n < j; n++) {
                h = k[n];
                c.push(" ", h.name, '="', f(h.value, true), '"')
            }
        }
        if (!p || g) {
            c[c.length] = ">"
        } else {
            c[c.length] = " />"
        }
        if (p && a && d[m] && c.length > 0) {
            o = c[c.length - 1];
            if (o.length > 0 && o !== "\n") {
                c.push("\n")
            }
        }
    }, end:function (h) {
        var i;
        c.push("</", h, ">");
        if (a && d[h] && c.length > 0) {
            i = c[c.length - 1];
            if (i.length > 0 && i !== "\n") {
                c.push("\n")
            }
        }
    }, text:function (i, h) {
        if (i.length > 0) {
            c[c.length] = h ? i : f(i)
        }
    }, cdata:function (h) {
        c.push("<![CDATA[", h, "]]>")
    }, comment:function (h) {
        c.push("<!--", h, "-->")
    }, pi:function (h, i) {
        if (i) {
            c.push("<?", h, " ", i, "?>")
        } else {
            c.push("<?", h, "?>")
        }
        if (a) {
            c.push("\n")
        }
    }, doctype:function (h) {
        c.push("<!DOCTYPE", h, ">", a ? "\n" : "")
    }, reset:function () {
        c.length = 0
    }, getContent:function () {
        return c.join("").replace(/\n$/, "")
    }}
};
(function (a) {
    a.html.Serializer = function (c, d) {
        var b = this, e = new a.html.Writer(c);
        c = c || {};
        c.validate = "validate" in c ? c.validate : true;
        b.schema = d = d || new a.html.Schema();
        b.writer = e;
        b.serialize = function (h) {
            var g, i;
            i = c.validate;
            g = {3:function (k, j) {
                e.text(k.value, k.raw)
            }, 8:function (j) {
                e.comment(j.value)
            }, 7:function (j) {
                e.pi(j.name, j.value)
            }, 10:function (j) {
                e.doctype(j.value)
            }, 4:function (j) {
                e.cdata(j.value)
            }, 11:function (j) {
                if ((j = j.firstChild)) {
                    do {
                        f(j)
                    } while (j = j.next)
                }
            }};
            e.reset();
            function f(k) {
                var t = g[k.type], j, o, s, r, p, u, n, m, q;
                if (!t) {
                    j = k.name;
                    o = k.shortEnded;
                    s = k.attributes;
                    if (i && s && s.length > 1) {
                        u = [];
                        u.map = {};
                        q = d.getElementRule(k.name);
                        for (n = 0, m = q.attributesOrder.length; n < m; n++) {
                            r = q.attributesOrder[n];
                            if (r in s.map) {
                                p = s.map[r];
                                u.map[r] = p;
                                u.push({name:r, value:p})
                            }
                        }
                        for (n = 0, m = s.length; n < m; n++) {
                            r = s[n].name;
                            if (!(r in u.map)) {
                                p = s.map[r];
                                u.map[r] = p;
                                u.push({name:r, value:p})
                            }
                        }
                        s = u
                    }
                    e.start(k.name, s, o);
                    if (!o) {
                        if ((k = k.firstChild)) {
                            do {
                                f(k)
                            } while (k = k.next)
                        }
                        e.end(j)
                    }
                } else {
                    t(k)
                }
            }

            if (h.type == 1 && !c.inner) {
                f(h)
            } else {
                g[11](h)
            }
            return e.getContent()
        }
    }
})(tinymce);
tinymce.dom = {};
(function (b, h) {
    var g = !!document.addEventListener;

    function c(k, j, l, i) {
        if (k.addEventListener) {
            k.addEventListener(j, l, i || false)
        } else {
            if (k.attachEvent) {
                k.attachEvent("on" + j, l)
            }
        }
    }

    function e(k, j, l, i) {
        if (k.removeEventListener) {
            k.removeEventListener(j, l, i || false)
        } else {
            if (k.detachEvent) {
                k.detachEvent("on" + j, l)
            }
        }
    }

    function a(n, l) {
        var i, k = l || {};

        function j() {
            return false
        }

        function m() {
            return true
        }

        for (i in n) {
            if (i !== "layerX" && i !== "layerY") {
                k[i] = n[i]
            }
        }
        if (!k.target) {
            k.target = k.srcElement || document
        }
        k.preventDefault = function () {
            k.isDefaultPrevented = m;
            if (n) {
                if (n.preventDefault) {
                    n.preventDefault()
                } else {
                    n.returnValue = false
                }
            }
        };
        k.stopPropagation = function () {
            k.isPropagationStopped = m;
            if (n) {
                if (n.stopPropagation) {
                    n.stopPropagation()
                } else {
                    n.cancelBubble = true
                }
            }
        };
        k.stopImmediatePropagation = function () {
            k.isImmediatePropagationStopped = m;
            k.stopPropagation()
        };
        if (!k.isDefaultPrevented) {
            k.isDefaultPrevented = j;
            k.isPropagationStopped = j;
            k.isImmediatePropagationStopped = j
        }
        return k
    }

    function d(m, n, l) {
        var k = m.document, j = {type:"ready"};

        function i() {
            if (!l.domLoaded) {
                l.domLoaded = true;
                n(j)
            }
        }

        if (g) {
            c(m, "DOMContentLoaded", i)
        } else {
            c(k, "readystatechange", function () {
                if (k.readyState === "complete") {
                    e(k, "readystatechange", arguments.callee);
                    i()
                }
            });
            if (k.documentElement.doScroll && m === m.top) {
                (function () {
                    try {
                        k.documentElement.doScroll("left")
                    } catch (o) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    i()
                })()
            }
        }
        c(m, "load", i)
    }

    function f(k) {
        var q = this, p = {}, i, o, n, m, l;
        m = "onmouseenter" in document.documentElement;
        n = "onfocusin" in document.documentElement;
        l = {mouseenter:"mouseover", mouseleave:"mouseout"};
        i = 1;
        q.domLoaded = false;
        q.events = p;
        function j(t, x) {
            var s, u, r, v;
            s = p[x][t.type];
            if (s) {
                for (u = 0, r = s.length; u < r; u++) {
                    v = s[u];
                    if (v && v.func.call(v.scope, t) === false) {
                        t.preventDefault()
                    }
                    if (t.isImmediatePropagationStopped()) {
                        return
                    }
                }
            }
        }

        q.bind = function (x, A, D, E) {
            var s, t, u, r, B, z, C, v = window;

            function y(F) {
                j(a(F || v.event), s)
            }

            if (!x || x.nodeType === 3 || x.nodeType === 8) {
                return
            }
            if (!x[h]) {
                s = i++;
                x[h] = s;
                p[s] = {}
            } else {
                s = x[h];
                if (!p[s]) {
                    p[s] = {}
                }
            }
            E = E || x;
            A = A.split(" ");
            u = A.length;
            while (u--) {
                r = A[u];
                z = y;
                B = C = false;
                if (r === "DOMContentLoaded") {
                    r = "ready"
                }
                if ((q.domLoaded || x.readyState == "complete") && r === "ready") {
                    q.domLoaded = true;
                    D.call(E, a({type:r}));
                    continue
                }
                if (!m) {
                    B = l[r];
                    if (B) {
                        z = function (F) {
                            var H, G;
                            H = F.currentTarget;
                            G = F.relatedTarget;
                            if (G && H.contains) {
                                G = H.contains(G)
                            } else {
                                while (G && G !== H) {
                                    G = G.parentNode
                                }
                            }
                            if (!G) {
                                F = a(F || v.event);
                                F.type = F.type === "mouseout" ? "mouseleave" : "mouseenter";
                                F.target = H;
                                j(F, s)
                            }
                        }
                    }
                }
                if (!n && (r === "focusin" || r === "focusout")) {
                    C = true;
                    B = r === "focusin" ? "focus" : "blur";
                    z = function (F) {
                        F = a(F || v.event);
                        F.type = F.type === "focus" ? "focusin" : "focusout";
                        j(F, s)
                    }
                }
                t = p[s][r];
                if (!t) {
                    p[s][r] = t = [
                        {func:D, scope:E}
                    ];
                    t.fakeName = B;
                    t.capture = C;
                    t.nativeHandler = z;
                    if (!g) {
                        t.proxyHandler = k(s)
                    }
                    if (r === "ready") {
                        d(x, z, q)
                    } else {
                        c(x, B || r, g ? z : t.proxyHandler, C)
                    }
                } else {
                    t.push({func:D, scope:E})
                }
            }
            x = t = 0;
            return D
        };
        q.unbind = function (x, z, A) {
            var s, u, v, B, r, t;
            if (!x || x.nodeType === 3 || x.nodeType === 8) {
                return q
            }
            s = x[h];
            if (s) {
                t = p[s];
                if (z) {
                    z = z.split(" ");
                    v = z.length;
                    while (v--) {
                        r = z[v];
                        u = t[r];
                        if (u) {
                            if (A) {
                                B = u.length;
                                while (B--) {
                                    if (u[B].func === A) {
                                        u.splice(B, 1)
                                    }
                                }
                            }
                            if (!A || u.length === 0) {
                                delete t[r];
                                e(x, u.fakeName || r, g ? u.nativeHandler : u.proxyHandler, u.capture)
                            }
                        }
                    }
                } else {
                    for (r in t) {
                        u = t[r];
                        e(x, u.fakeName || r, g ? u.nativeHandler : u.proxyHandler, u.capture)
                    }
                    t = {}
                }
                for (r in t) {
                    return q
                }
                delete p[s];
                try {
                    delete x[h]
                } catch (y) {
                    x[h] = null
                }
            }
            return q
        };
        q.fire = function (u, s, r) {
            var v, t;
            if (!u || u.nodeType === 3 || u.nodeType === 8) {
                return q
            }
            t = a(null, r);
            t.type = s;
            do {
                v = u[h];
                if (v) {
                    j(t, v)
                }
                u = u.parentNode || u.ownerDocument || u.defaultView || u.parentWindow
            } while (u && !t.isPropagationStopped());
            return q
        };
        q.clean = function (u) {
            var s, r, t = q.unbind;
            if (!u || u.nodeType === 3 || u.nodeType === 8) {
                return q
            }
            if (u[h]) {
                t(u)
            }
            if (!u.getElementsByTagName) {
                u = u.document
            }
            if (u && u.getElementsByTagName) {
                t(u);
                r = u.getElementsByTagName("*");
                s = r.length;
                while (s--) {
                    u = r[s];
                    if (u[h]) {
                        t(u)
                    }
                }
            }
            return q
        };
        q.callNativeHandler = function (s, r) {
            if (p) {
                p[s][r.type].nativeHandler(r)
            }
        };
        q.destory = function () {
            p = {}
        };
        q.add = function (v, s, u, t) {
            if (typeof(v) === "string") {
                v = document.getElementById(v)
            }
            if (v && v instanceof Array) {
                var r = v;
                while (r--) {
                    q.add(v[r], s, u, t)
                }
                return
            }
            if (s === "init") {
                s = "ready"
            }
            return q.bind(v, s instanceof Array ? s.join(" ") : s, u, t)
        };
        q.remove = function (u, s, t) {
            if (typeof(u) === "string") {
                u = document.getElementById(u)
            }
            if (u instanceof Array) {
                var r = u;
                while (r--) {
                    q.remove(u[r], s, t, scope)
                }
                return q
            }
            return q.unbind(u, s instanceof Array ? s.join(" ") : s, t)
        };
        q.clear = function (r) {
            if (typeof(r) === "string") {
                r = document.getElementById(r)
            }
            return q.clean(r)
        };
        q.cancel = function (r) {
            if (r) {
                q.prevent(r);
                q.stop(r)
            }
            return false
        };
        q.prevent = function (r) {
            r.preventDefault();
            return false
        };
        q.stop = function (r) {
            r.stopPropagation();
            return false
        }
    }

    b.EventUtils = f;
    b.Event = new f(function (i) {
        return function (j) {
            tinymce.dom.Event.callNativeHandler(i, j)
        }
    });
    b.Event.bind(window, "ready", function () {
    });
    b = 0
})(tinymce.dom, "data-mce-expando");
(function (e) {
    var g = e.each, d = e.is, f = e.isWebKit, b = e.isIE, h = e.html.Entities, c = /^([a-z0-9],?)+$/i, a = /^[ \t\r\n]*$/;
    e.create("tinymce.dom.DOMUtils", {doc:null, root:null, files:null, pixelStyles:/^(top|left|bottom|right|width|height|borderWidth)$/, props:{"for":"htmlFor", "class":"className", className:"className", checked:"checked", disabled:"disabled", maxlength:"maxLength", readonly:"readOnly", selected:"selected", value:"value", id:"id", name:"name", type:"type"}, DOMUtils:function (o, l) {
        var k = this, i, j, n;
        k.doc = o;
        k.win = window;
        k.files = {};
        k.cssFlicker = false;
        k.counter = 0;
        k.stdMode = !e.isIE || o.documentMode >= 8;
        k.boxModel = !e.isIE || o.compatMode == "CSS1Compat" || k.stdMode;
        k.hasOuterHTML = "outerHTML" in o.createElement("a");
        k.settings = l = e.extend({keep_values:false, hex_colors:1}, l);
        k.schema = l.schema;
        k.styles = new e.html.Styles({url_converter:l.url_converter, url_converter_scope:l.url_converter_scope}, l.schema);
        if (e.isIE6) {
            try {
                o.execCommand("BackgroundImageCache", false, true)
            } catch (m) {
                k.cssFlicker = true
            }
        }
        k.fixDoc(o);
        k.events = l.ownEvents ? new e.dom.EventUtils(l.proxy) : e.dom.Event;
        e.addUnload(k.destroy, k);
        n = l.schema ? l.schema.getBlockElements() : {};
        k.isBlock = function (q) {
            var p = q.nodeType;
            if (p) {
                return !!(p === 1 && n[q.nodeName])
            }
            return !!n[q]
        }
    }, fixDoc:function (k) {
        var j = this.settings, i;
        if (b && j.schema) {
            ("abbr article aside audio canvas details figcaption figure footer header hgroup mark menu meter nav output progress section summary time video").replace(/\w+/g, function (l) {
                k.createElement(l)
            });
            for (i in j.schema.getCustomElements()) {
                k.createElement(i)
            }
        }
    }, clone:function (k, i) {
        var j = this, m, l;
        if (!b || k.nodeType !== 1 || i) {
            return k.cloneNode(i)
        }
        l = j.doc;
        if (!i) {
            m = l.createElement(k.nodeName);
            g(j.getAttribs(k), function (n) {
                j.setAttrib(m, n.nodeName, j.getAttrib(k, n.nodeName))
            });
            return m
        }
        return m.firstChild
    }, getRoot:function () {
        var i = this, j = i.settings;
        return(j && i.get(j.root_element)) || i.doc.body
    }, getViewPort:function (j) {
        var k, i;
        j = !j ? this.win : j;
        k = j.document;
        i = this.boxModel ? k.documentElement : k.body;
        return{x:j.pageXOffset || i.scrollLeft, y:j.pageYOffset || i.scrollTop, w:j.innerWidth || i.clientWidth, h:j.innerHeight || i.clientHeight}
    }, getRect:function (l) {
        var k, i = this, j;
        l = i.get(l);
        k = i.getPos(l);
        j = i.getSize(l);
        return{x:k.x, y:k.y, w:j.w, h:j.h}
    }, getSize:function (l) {
        var j = this, i, k;
        l = j.get(l);
        i = j.getStyle(l, "width");
        k = j.getStyle(l, "height");
        if (i.indexOf("px") === -1) {
            i = 0
        }
        if (k.indexOf("px") === -1) {
            k = 0
        }
        return{w:parseInt(i) || l.offsetWidth || l.clientWidth, h:parseInt(k) || l.offsetHeight || l.clientHeight}
    }, getParent:function (k, j, i) {
        return this.getParents(k, j, i, false)
    }, getParents:function (s, m, k, q) {
        var j = this, i, l = j.settings, p = [];
        s = j.get(s);
        q = q === undefined;
        if (l.strict_root) {
            k = k || j.getRoot()
        }
        if (d(m, "string")) {
            i = m;
            if (m === "*") {
                m = function (o) {
                    return o.nodeType == 1
                }
            } else {
                m = function (o) {
                    return j.is(o, i)
                }
            }
        }
        while (s) {
            if (s == k || !s.nodeType || s.nodeType === 9) {
                break
            }
            if (!m || m(s)) {
                if (q) {
                    p.push(s)
                } else {
                    return s
                }
            }
            s = s.parentNode
        }
        return q ? p : null
    }, get:function (i) {
        var j;
        if (i && this.doc && typeof(i) == "string") {
            j = i;
            i = this.doc.getElementById(i);
            if (i && i.id !== j) {
                return this.doc.getElementsByName(j)[1]
            }
        }
        return i
    }, getNext:function (j, i) {
        return this._findSib(j, i, "nextSibling")
    }, getPrev:function (j, i) {
        return this._findSib(j, i, "previousSibling")
    }, add:function (l, o, i, k, m) {
        var j = this;
        return this.run(l, function (r) {
            var q, n;
            q = d(o, "string") ? j.doc.createElement(o) : o;
            j.setAttribs(q, i);
            if (k) {
                if (k.nodeType) {
                    q.appendChild(k)
                } else {
                    j.setHTML(q, k)
                }
            }
            return !m ? r.appendChild(q) : q
        })
    }, create:function (k, i, j) {
        return this.add(this.doc.createElement(k), k, i, j, 1)
    }, createHTML:function (q, i, m) {
        var p = "", l = this, j;
        p += "<" + q;
        for (j in i) {
            if (i.hasOwnProperty(j)) {
                p += " " + j + '="' + l.encode(i[j]) + '"'
            }
        }
        if (typeof(m) != "undefined") {
            return p + ">" + m + "</" + q + ">"
        }
        return p + " />"
    }, remove:function (i, j) {
        return this.run(i, function (l) {
            var m, k = l.parentNode;
            if (!k) {
                return null
            }
            if (j) {
                while (m = l.firstChild) {
                    if (!e.isIE || m.nodeType !== 3 || m.nodeValue) {
                        k.insertBefore(m, l)
                    } else {
                        l.removeChild(m)
                    }
                }
            }
            return k.removeChild(l)
        })
    }, setStyle:function (l, i, j) {
        var k = this;
        return k.run(l, function (o) {
            var n, m;
            n = o.style;
            i = i.replace(/-(\D)/g, function (q, p) {
                return p.toUpperCase()
            });
            if (k.pixelStyles.test(i) && (e.is(j, "number") || /^[\-0-9\.]+$/.test(j))) {
                j += "px"
            }
            switch (i) {
                case"opacity":
                    if (b) {
                        n.filter = j === "" ? "" : "alpha(opacity=" + (j * 100) + ")";
                        if (!l.currentStyle || !l.currentStyle.hasLayout) {
                            n.display = "inline-block"
                        }
                    }
                    n[i] = n["-moz-opacity"] = n["-khtml-opacity"] = j || "";
                    break;
                case"float":
                    b ? n.styleFloat = j : n.cssFloat = j;
                    break;
                default:
                    n[i] = j || ""
            }
            if (k.settings.update_styles) {
                k.setAttrib(o, "data-mce-style")
            }
        })
    }, getStyle:function (l, i, k) {
        l = this.get(l);
        if (!l) {
            return
        }
        if (this.doc.defaultView && k) {
            i = i.replace(/[A-Z]/g, function (m) {
                return"-" + m
            });
            try {
                return this.doc.defaultView.getComputedStyle(l, null).getPropertyValue(i)
            } catch (j) {
                return null
            }
        }
        i = i.replace(/-(\D)/g, function (n, m) {
            return m.toUpperCase()
        });
        if (i == "float") {
            i = b ? "styleFloat" : "cssFloat"
        }
        if (l.currentStyle && k) {
            return l.currentStyle[i]
        }
        return l.style ? l.style[i] : undefined
    }, setStyles:function (l, m) {
        var j = this, k = j.settings, i;
        i = k.update_styles;
        k.update_styles = 0;
        g(m, function (o, p) {
            j.setStyle(l, p, o)
        });
        k.update_styles = i;
        if (k.update_styles) {
            j.setAttrib(l, k.cssText)
        }
    }, removeAllAttribs:function (i) {
        return this.run(i, function (l) {
            var k, j = l.attributes;
            for (k = j.length - 1; k >= 0; k--) {
                l.removeAttributeNode(j.item(k))
            }
        })
    }, setAttrib:function (k, l, i) {
        var j = this;
        if (!k || !l) {
            return
        }
        if (j.settings.strict) {
            l = l.toLowerCase()
        }
        return this.run(k, function (p) {
            var o = j.settings;
            var m = p.getAttribute(l);
            if (i !== null) {
                switch (l) {
                    case"style":
                        if (!d(i, "string")) {
                            g(i, function (q, r) {
                                j.setStyle(p, r, q)
                            });
                            return
                        }
                        if (o.keep_values) {
                            if (i && !j._isRes(i)) {
                                p.setAttribute("data-mce-style", i, 2)
                            } else {
                                p.removeAttribute("data-mce-style", 2)
                            }
                        }
                        p.style.cssText = i;
                        break;
                    case"class":
                        p.className = i || "";
                        break;
                    case"src":
                    case"href":
                        if (o.keep_values) {
                            if (o.url_converter) {
                                i = o.url_converter.call(o.url_converter_scope || j, i, l, p)
                            }
                            j.setAttrib(p, "data-mce-" + l, i, 2)
                        }
                        break;
                    case"shape":
                        p.setAttribute("data-mce-style", i);
                        break
                }
            }
            if (d(i) && i !== null && i.length !== 0) {
                p.setAttribute(l, "" + i, 2)
            } else {
                p.removeAttribute(l, 2)
            }
            if (tinyMCE.activeEditor && m != i) {
                var n = tinyMCE.activeEditor;
                n.onSetAttrib.dispatch(n, p, l, i)
            }
        })
    }, setAttribs:function (j, k) {
        var i = this;
        return this.run(j, function (l) {
            g(k, function (m, o) {
                i.setAttrib(l, o, m)
            })
        })
    }, getAttrib:function (m, o, k) {
        var i, j = this, l;
        m = j.get(m);
        if (!m || m.nodeType !== 1) {
            return k === l ? false : k
        }
        if (!d(k)) {
            k = ""
        }
        if (/^(src|href|style|coords|shape)$/.test(o)) {
            i = m.getAttribute("data-mce-" + o);
            if (i) {
                return i
            }
        }
        if (b && j.props[o]) {
            i = m[j.props[o]];
            i = i && i.nodeValue ? i.nodeValue : i
        }
        if (!i) {
            i = m.getAttribute(o, 2)
        }
        if (/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noshade|nowrap|readonly|selected)$/.test(o)) {
            if (m[j.props[o]] === true && i === "") {
                return o
            }
            return i ? o : ""
        }
        if (m.nodeName === "FORM" && m.getAttributeNode(o)) {
            return m.getAttributeNode(o).nodeValue
        }
        if (o === "style") {
            i = i || m.style.cssText;
            if (i) {
                i = j.serializeStyle(j.parseStyle(i), m.nodeName);
                if (j.settings.keep_values && !j._isRes(i)) {
                    m.setAttribute("data-mce-style", i)
                }
            }
        }
        if (f && o === "class" && i) {
            i = i.replace(/(apple|webkit)\-[a-z\-]+/gi, "")
        }
        if (b) {
            switch (o) {
                case"rowspan":
                case"colspan":
                    if (i === 1) {
                        i = ""
                    }
                    break;
                case"size":
                    if (i === "+0" || i === 20 || i === 0) {
                        i = ""
                    }
                    break;
                case"width":
                case"height":
                case"vspace":
                case"checked":
                case"disabled":
                case"readonly":
                    if (i === 0) {
                        i = ""
                    }
                    break;
                case"hspace":
                    if (i === -1) {
                        i = ""
                    }
                    break;
                case"maxlength":
                case"tabindex":
                    if (i === 32768 || i === 2147483647 || i === "32768") {
                        i = ""
                    }
                    break;
                case"multiple":
                case"compact":
                case"noshade":
                case"nowrap":
                    if (i === 65535) {
                        return o
                    }
                    return k;
                case"shape":
                    i = i.toLowerCase();
                    break;
                default:
                    if (o.indexOf("on") === 0 && i) {
                        i = e._replace(/^function\s+\w+\(\)\s+\{\s+(.*)\s+\}$/, "$1", "" + i)
                    }
            }
        }
        return(i !== l && i !== null && i !== "") ? "" + i : k
    }, getPos:function (q, l) {
        var j = this, i = 0, p = 0, m, o = j.doc, k;
        q = j.get(q);
        l = l || o.body;
        if (q) {
            if (q.getBoundingClientRect) {
                q = q.getBoundingClientRect();
                m = j.boxModel ? o.documentElement : o.body;
                i = q.left + (o.documentElement.scrollLeft || o.body.scrollLeft) - m.clientTop;
                p = q.top + (o.documentElement.scrollTop || o.body.scrollTop) - m.clientLeft;
                return{x:i, y:p}
            }
            k = q;
            while (k && k != l && k.nodeType) {
                i += k.offsetLeft || 0;
                p += k.offsetTop || 0;
                k = k.offsetParent
            }
            k = q.parentNode;
            while (k && k != l && k.nodeType) {
                i -= k.scrollLeft || 0;
                p -= k.scrollTop || 0;
                k = k.parentNode
            }
        }
        return{x:i, y:p}
    }, parseStyle:function (i) {
        return this.styles.parse(i)
    }, serializeStyle:function (j, i) {
        return this.styles.serialize(j, i)
    }, loadCSS:function (i) {
        var k = this, l = k.doc, j;
        if (!i) {
            i = ""
        }
        j = k.select("head")[0];
        g(i.split(","), function (m) {
            var n;
            if (k.files[m]) {
                return
            }
            k.files[m] = true;
            n = k.create("link", {rel:"stylesheet", href:e._addVer(m)});
            if (b && l.documentMode && l.recalc) {
                n.onload = function () {
                    if (l.recalc) {
                        l.recalc()
                    }
                    n.onload = null
                }
            }
            j.appendChild(n)
        })
    }, addClass:function (i, j) {
        return this.run(i, function (k) {
            var l;
            if (!j) {
                return 0
            }
            if (this.hasClass(k, j)) {
                return k.className
            }
            l = this.removeClass(k, j);
            return k.className = (l != "" ? (l + " ") : "") + j
        })
    }, removeClass:function (k, l) {
        var i = this, j;
        return i.run(k, function (n) {
            var m;
            if (i.hasClass(n, l)) {
                if (!j) {
                    j = new RegExp("(^|\\s+)" + l + "(\\s+|$)", "g")
                }
                m = n.className.replace(j, " ");
                m = e.trim(m != " " ? m : "");
                n.className = m;
                if (!m) {
                    n.removeAttribute("class");
                    n.removeAttribute("className")
                }
                return m
            }
            return n.className
        })
    }, hasClass:function (j, i) {
        j = this.get(j);
        if (!j || !i) {
            return false
        }
        return(" " + j.className + " ").indexOf(" " + i + " ") !== -1
    }, show:function (i) {
        return this.setStyle(i, "display", "block")
    }, hide:function (i) {
        return this.setStyle(i, "display", "none")
    }, isHidden:function (i) {
        i = this.get(i);
        return !i || i.style.display == "none" || this.getStyle(i, "display") == "none"
    }, uniqueId:function (i) {
        return(!i ? "mce_" : i) + (this.counter++)
    }, setHTML:function (k, j) {
        var i = this;
        return i.run(k, function (m) {
            if (b) {
                while (m.firstChild) {
                    m.removeChild(m.firstChild)
                }
                try {
                    m.innerHTML = "<br />" + j;
                    m.removeChild(m.firstChild)
                } catch (l) {
                    m = i.create("div");
                    m.innerHTML = "<br />" + j;
                    g(m.childNodes, function (o, n) {
                        if (n) {
                            m.appendChild(o)
                        }
                    })
                }
            } else {
                m.innerHTML = j
            }
            return j
        })
    }, getOuterHTML:function (k) {
        var j, i = this;
        k = i.get(k);
        if (!k) {
            return null
        }
        if (k.nodeType === 1 && i.hasOuterHTML) {
            return k.outerHTML
        }
        j = (k.ownerDocument || i.doc).createElement("body");
        j.appendChild(k.cloneNode(true));
        return j.innerHTML
    }, setOuterHTML:function (l, j, m) {
        var i = this;

        function k(p, o, r) {
            var s, q;
            q = r.createElement("body");
            q.innerHTML = o;
            s = q.lastChild;
            while (s) {
                i.insertAfter(s.cloneNode(true), p);
                s = s.previousSibling
            }
            i.remove(p)
        }

        return this.run(l, function (o) {
            o = i.get(o);
            if (o.nodeType == 1) {
                m = m || o.ownerDocument || i.doc;
                if (b) {
                    try {
                        if (b && o.nodeType == 1) {
                            o.outerHTML = j
                        } else {
                            k(o, j, m)
                        }
                    } catch (n) {
                        k(o, j, m)
                    }
                } else {
                    k(o, j, m)
                }
            }
        })
    }, decode:h.decode, encode:h.encodeAllRaw, insertAfter:function (i, j) {
        j = this.get(j);
        return this.run(i, function (l) {
            var k, m;
            k = j.parentNode;
            m = j.nextSibling;
            if (m) {
                k.insertBefore(l, m)
            } else {
                k.appendChild(l)
            }
            return l
        })
    }, replace:function (m, l, i) {
        var j = this;
        if (d(l, "array")) {
            m = m.cloneNode(true)
        }
        return j.run(l, function (k) {
            if (i) {
                g(e.grep(k.childNodes), function (n) {
                    m.appendChild(n)
                })
            }
            return k.parentNode.replaceChild(m, k)
        })
    }, rename:function (l, i) {
        var k = this, j;
        if (l.nodeName != i.toUpperCase()) {
            j = k.create(i);
            g(k.getAttribs(l), function (m) {
                k.setAttrib(j, m.nodeName, k.getAttrib(l, m.nodeName))
            });
            k.replace(j, l, 1)
        }
        return j || l
    }, findCommonAncestor:function (k, i) {
        var l = k, j;
        while (l) {
            j = i;
            while (j && l != j) {
                j = j.parentNode
            }
            if (l == j) {
                break
            }
            l = l.parentNode
        }
        if (!l && k.ownerDocument) {
            return k.ownerDocument.documentElement
        }
        return l
    }, toHex:function (i) {
        var k = /^\s*rgb\s*?\(\s*?([0-9]+)\s*?,\s*?([0-9]+)\s*?,\s*?([0-9]+)\s*?\)\s*$/i.exec(i);

        function j(l) {
            l = parseInt(l).toString(16);
            return l.length > 1 ? l : "0" + l
        }

        if (k) {
            i = "#" + j(k[1]) + j(k[2]) + j(k[3]);
            return i
        }
        return i
    }, getClasses:function () {
        var n = this, j = [], m, o = {}, p = n.settings.class_filter, l;
        if (n.classes) {
            return n.classes
        }
        function q(i) {
            g(i.imports, function (s) {
                q(s)
            });
            g(i.cssRules || i.rules, function (s) {
                switch (s.type || 1) {
                    case 1:
                        if (s.selectorText) {
                            g(s.selectorText.split(","), function (r) {
                                r = r.replace(/^\s*|\s*$|^\s\./g, "");
                                if (/\.mce/.test(r) || !/\.[\w\-]+$/.test(r)) {
                                    return
                                }
                                l = r;
                                r = e._replace(/.*\.([a-z0-9_\-]+).*/i, "$1", r);
                                if (p && !(r = p(r, l))) {
                                    return
                                }
                                if (!o[r]) {
                                    j.push({"class":r});
                                    o[r] = 1
                                }
                            })
                        }
                        break;
                    case 3:
                        q(s.styleSheet);
                        break
                }
            })
        }

        try {
            g(n.doc.styleSheets, q)
        } catch (k) {
        }
        if (j.length > 0) {
            n.classes = j
        }
        return j
    }, run:function (l, k, j) {
        var i = this, m;
        if (i.doc && typeof(l) === "string") {
            l = i.get(l)
        }
        if (!l) {
            return false
        }
        j = j || this;
        if (!l.nodeType && (l.length || l.length === 0)) {
            m = [];
            g(l, function (o, n) {
                if (o) {
                    if (typeof(o) == "string") {
                        o = i.doc.getElementById(o)
                    }
                    m.push(k.call(j, o, n))
                }
            });
            return m
        }
        return k.call(j, l)
    }, getAttribs:function (j) {
        var i;
        j = this.get(j);
        if (!j) {
            return[]
        }
        if (b) {
            i = [];
            if (j.nodeName == "OBJECT") {
                return j.attributes
            }
            if (j.nodeName === "OPTION" && this.getAttrib(j, "selected")) {
                i.push({specified:1, nodeName:"selected"})
            }
            j.cloneNode(false).outerHTML.replace(/<\/?[\w:\-]+ ?|=[\"][^\"]+\"|=\'[^\']+\'|=[\w\-]+|>/gi, "").replace(/[\w:\-]+/gi, function (k) {
                i.push({specified:1, nodeName:k})
            });
            return i
        }
        return j.attributes
    }, isEmpty:function (m, k) {
        var r = this, o, n, q, j, l, p;
        m = m.firstChild;
        if (m) {
            j = new e.dom.TreeWalker(m, m.parentNode);
            k = k || r.schema ? r.schema.getNonEmptyElements() : null;
            do {
                q = m.nodeType;
                if (q === 1) {
                    if (m.getAttribute("data-mce-bogus")) {
                        continue
                    }
                    l = m.nodeName.toLowerCase();
                    if (k && k[l]) {
                        p = m.parentNode;
                        if (l === "br" && r.isBlock(p) && p.firstChild === m && p.lastChild === m) {
                            continue
                        }
                        return false
                    }
                    n = r.getAttribs(m);
                    o = m.attributes.length;
                    while (o--) {
                        l = m.attributes[o].nodeName;
                        if (l === "name" || l === "data-mce-bookmark") {
                            return false
                        }
                    }
                }
                if (q == 8) {
                    return false
                }
                if ((q === 3 && !a.test(m.nodeValue))) {
                    return false
                }
            } while (m = j.next())
        }
        return true
    }, destroy:function (j) {
        var i = this;
        i.win = i.doc = i.root = i.events = i.frag = null;
        if (!j) {
            e.removeUnload(i.destroy)
        }
    }, createRng:function () {
        var i = this.doc;
        return i.createRange ? i.createRange() : new e.dom.Range(this)
    }, nodeIndex:function (m, n) {
        var i = 0, k, l, j;
        if (m) {
            for (k = m.nodeType, m = m.previousSibling, l = m; m; m = m.previousSibling) {
                j = m.nodeType;
                if (n && j == 3) {
                    if (j == k || !m.nodeValue.length) {
                        continue
                    }
                }
                i++;
                k = j
            }
        }
        return i
    }, split:function (m, l, p) {
        var q = this, i = q.createRng(), n, k, o;

        function j(v) {
            var t, s = v.childNodes, u = v.nodeType;

            function x(A) {
                var z = A.previousSibling && A.previousSibling.nodeName == "SPAN";
                var y = A.nextSibling && A.nextSibling.nodeName == "SPAN";
                return z && y
            }

            if (u == 1 && v.getAttribute("data-mce-type") == "bookmark") {
                return
            }
            for (t = s.length - 1; t >= 0; t--) {
                j(s[t])
            }
            if (u != 9) {
                if (u == 3 && v.nodeValue.length > 0) {
                    var r = e.trim(v.nodeValue).length;
                    if (!q.isBlock(v.parentNode) || r > 0 || r == 0 && x(v)) {
                        return
                    }
                } else {
                    if (u == 1) {
                        s = v.childNodes;
                        if (s.length == 1 && s[0] && s[0].nodeType == 1 && s[0].getAttribute("data-mce-type") == "bookmark") {
                            v.parentNode.insertBefore(s[0], v)
                        }
                        if (s.length || /^(br|hr|input|img)$/i.test(v.nodeName)) {
                            return
                        }
                    }
                }
                q.remove(v)
            }
            return v
        }

        if (m && l) {
            i.setStart(m.parentNode, q.nodeIndex(m));
            i.setEnd(l.parentNode, q.nodeIndex(l));
            n = i.extractContents();
            i = q.createRng();
            i.setStart(l.parentNode, q.nodeIndex(l) + 1);
            i.setEnd(m.parentNode, q.nodeIndex(m) + 1);
            k = i.extractContents();
            o = m.parentNode;
            o.insertBefore(j(n), m);
            if (p) {
                o.replaceChild(p, l)
            } else {
                o.insertBefore(l, m)
            }
            o.insertBefore(j(k), m);
            q.remove(m);
            return p || l
        }
    }, bind:function (l, i, k, j) {
        return this.events.add(l, i, k, j || this)
    }, unbind:function (k, i, j) {
        return this.events.remove(k, i, j)
    }, fire:function (k, j, i) {
        return this.events.fire(k, j, i)
    }, _findSib:function (l, i, j) {
        var k = this, m = i;
        if (l) {
            if (d(m, "string")) {
                m = function (n) {
                    return k.is(n, i)
                }
            }
            for (l = l[j]; l; l = l[j]) {
                if (m(l)) {
                    return l
                }
            }
        }
        return null
    }, _isRes:function (i) {
        return/^(top|left|bottom|right|width|height)/i.test(i) || /;\s*(top|left|bottom|right|width|height)/i.test(i)
    }});
    e.DOM = new e.dom.DOMUtils(document, {process_html:0})
})(tinymce);
(function (a) {
    function b(c) {
        var O = this, e = c.doc, T = 0, F = 1, j = 2, E = true, S = false, V = "startOffset", h = "startContainer", Q = "endContainer", A = "endOffset", k = tinymce.extend, n = c.nodeIndex;
        k(O, {startContainer:e, startOffset:0, endContainer:e, endOffset:0, collapsed:E, commonAncestorContainer:e, START_TO_START:0, START_TO_END:1, END_TO_END:2, END_TO_START:3, setStart:q, setEnd:s, setStartBefore:g, setStartAfter:J, setEndBefore:K, setEndAfter:u, collapse:B, selectNode:y, selectNodeContents:G, compareBoundaryPoints:v, deleteContents:p, extractContents:I, cloneContents:d, insertNode:D, surroundContents:N, cloneRange:L});
        function x() {
            return e.createDocumentFragment()
        }

        function q(W, t) {
            C(E, W, t)
        }

        function s(W, t) {
            C(S, W, t)
        }

        function g(t) {
            q(t.parentNode, n(t))
        }

        function J(t) {
            q(t.parentNode, n(t) + 1)
        }

        function K(t) {
            s(t.parentNode, n(t))
        }

        function u(t) {
            s(t.parentNode, n(t) + 1)
        }

        function B(t) {
            if (t) {
                O[Q] = O[h];
                O[A] = O[V]
            } else {
                O[h] = O[Q];
                O[V] = O[A]
            }
            O.collapsed = E
        }

        function y(t) {
            g(t);
            u(t)
        }

        function G(t) {
            q(t, 0);
            s(t, t.nodeType === 1 ? t.childNodes.length : t.nodeValue.length)
        }

        function v(Z, t) {
            var ac = O[h], X = O[V], ab = O[Q], W = O[A], aa = t.startContainer, ae = t.startOffset, Y = t.endContainer, ad = t.endOffset;
            if (Z === 0) {
                return H(ac, X, aa, ae)
            }
            if (Z === 1) {
                return H(ab, W, aa, ae)
            }
            if (Z === 2) {
                return H(ab, W, Y, ad)
            }
            if (Z === 3) {
                return H(ac, X, Y, ad)
            }
        }

        function p() {
            l(j)
        }

        function I() {
            return l(T)
        }

        function d() {
            return l(F)
        }

        function D(Z) {
            var W = this[h], t = this[V], Y, X;
            if ((W.nodeType === 3 || W.nodeType === 4) && W.nodeValue) {
                if (!t) {
                    W.parentNode.insertBefore(Z, W)
                } else {
                    if (t >= W.nodeValue.length) {
                        c.insertAfter(Z, W)
                    } else {
                        Y = W.splitText(t);
                        W.parentNode.insertBefore(Z, Y)
                    }
                }
            } else {
                if (W.childNodes.length > 0) {
                    X = W.childNodes[t]
                }
                if (X) {
                    W.insertBefore(Z, X)
                } else {
                    W.appendChild(Z)
                }
            }
        }

        function N(W) {
            var t = O.extractContents();
            O.insertNode(W);
            W.appendChild(t);
            O.selectNode(W)
        }

        function L() {
            return k(new b(c), {startContainer:O[h], startOffset:O[V], endContainer:O[Q], endOffset:O[A], collapsed:O.collapsed, commonAncestorContainer:O.commonAncestorContainer})
        }

        function P(t, W) {
            var X;
            if (t.nodeType == 3) {
                return t
            }
            if (W < 0) {
                return t
            }
            X = t.firstChild;
            while (X && W > 0) {
                --W;
                X = X.nextSibling
            }
            if (X) {
                return X
            }
            return t
        }

        function m() {
            return(O[h] == O[Q] && O[V] == O[A])
        }

        function H(Y, aa, W, Z) {
            var ab, X, t, ac, ae, ad;
            if (Y == W) {
                if (aa == Z) {
                    return 0
                }
                if (aa < Z) {
                    return -1
                }
                return 1
            }
            ab = W;
            while (ab && ab.parentNode != Y) {
                ab = ab.parentNode
            }
            if (ab) {
                X = 0;
                t = Y.firstChild;
                while (t != ab && X < aa) {
                    X++;
                    t = t.nextSibling
                }
                if (aa <= X) {
                    return -1
                }
                return 1
            }
            ab = Y;
            while (ab && ab.parentNode != W) {
                ab = ab.parentNode
            }
            if (ab) {
                X = 0;
                t = W.firstChild;
                while (t != ab && X < Z) {
                    X++;
                    t = t.nextSibling
                }
                if (X < Z) {
                    return -1
                }
                return 1
            }
            ac = c.findCommonAncestor(Y, W);
            ae = Y;
            while (ae && ae.parentNode != ac) {
                ae = ae.parentNode
            }
            if (!ae) {
                ae = ac
            }
            ad = W;
            while (ad && ad.parentNode != ac) {
                ad = ad.parentNode
            }
            if (!ad) {
                ad = ac
            }
            if (ae == ad) {
                return 0
            }
            t = ac.firstChild;
            while (t) {
                if (t == ae) {
                    return -1
                }
                if (t == ad) {
                    return 1
                }
                t = t.nextSibling
            }
        }

        function C(W, Z, Y) {
            var t, X;
            if (W) {
                O[h] = Z;
                O[V] = Y
            } else {
                O[Q] = Z;
                O[A] = Y
            }
            t = O[Q];
            while (t.parentNode) {
                t = t.parentNode
            }
            X = O[h];
            while (X.parentNode) {
                X = X.parentNode
            }
            if (X == t) {
                if (H(O[h], O[V], O[Q], O[A]) > 0) {
                    O.collapse(W)
                }
            } else {
                O.collapse(W)
            }
            O.collapsed = m();
            O.commonAncestorContainer = c.findCommonAncestor(O[h], O[Q])
        }

        function l(ac) {
            var ab, Y = 0, ae = 0, W, aa, X, Z, t, ad;
            if (O[h] == O[Q]) {
                return f(ac)
            }
            for (ab = O[Q], W = ab.parentNode; W; ab = W, W = W.parentNode) {
                if (W == O[h]) {
                    return r(ab, ac)
                }
                ++Y
            }
            for (ab = O[h], W = ab.parentNode; W; ab = W, W = W.parentNode) {
                if (W == O[Q]) {
                    return U(ab, ac)
                }
                ++ae
            }
            aa = ae - Y;
            X = O[h];
            while (aa > 0) {
                X = X.parentNode;
                aa--
            }
            Z = O[Q];
            while (aa < 0) {
                Z = Z.parentNode;
                aa++
            }
            for (t = X.parentNode, ad = Z.parentNode; t != ad; t = t.parentNode, ad = ad.parentNode) {
                X = t;
                Z = ad
            }
            return o(X, Z, ac)
        }

        function f(ab) {
            var ad, ae, t, X, Y, ac, Z, W, aa;
            if (ab != j) {
                ad = x()
            }
            if (O[V] == O[A]) {
                return ad
            }
            if (O[h].nodeType == 3) {
                ae = O[h].nodeValue;
                t = ae.substring(O[V], O[A]);
                if (ab != F) {
                    X = O[h];
                    W = O[V];
                    aa = O[A] - O[V];
                    if (W === 0 && aa >= X.nodeValue.length - 1) {
                        X.parentNode.removeChild(X)
                    } else {
                        X.deleteData(W, aa)
                    }
                    O.collapse(E)
                }
                if (ab == j) {
                    return
                }
                if (t.length > 0) {
                    ad.appendChild(e.createTextNode(t))
                }
                return ad
            }
            X = P(O[h], O[V]);
            Y = O[A] - O[V];
            while (X && Y > 0) {
                ac = X.nextSibling;
                Z = z(X, ab);
                if (ad) {
                    ad.appendChild(Z)
                }
                --Y;
                X = ac
            }
            if (ab != F) {
                O.collapse(E)
            }
            return ad
        }

        function r(ac, Z) {
            var ab, aa, W, t, Y, X;
            if (Z != j) {
                ab = x()
            }
            aa = i(ac, Z);
            if (ab) {
                ab.appendChild(aa)
            }
            W = n(ac);
            t = W - O[V];
            if (t <= 0) {
                if (Z != F) {
                    O.setEndBefore(ac);
                    O.collapse(S)
                }
                return ab
            }
            aa = ac.previousSibling;
            while (t > 0) {
                Y = aa.previousSibling;
                X = z(aa, Z);
                if (ab) {
                    ab.insertBefore(X, ab.firstChild)
                }
                --t;
                aa = Y
            }
            if (Z != F) {
                O.setEndBefore(ac);
                O.collapse(S)
            }
            return ab
        }

        function U(aa, Z) {
            var ac, W, ab, t, Y, X;
            if (Z != j) {
                ac = x()
            }
            ab = R(aa, Z);
            if (ac) {
                ac.appendChild(ab)
            }
            W = n(aa);
            ++W;
            t = O[A] - W;
            ab = aa.nextSibling;
            while (ab && t > 0) {
                Y = ab.nextSibling;
                X = z(ab, Z);
                if (ac) {
                    ac.appendChild(X)
                }
                --t;
                ab = Y
            }
            if (Z != F) {
                O.setStartAfter(aa);
                O.collapse(E)
            }
            return ac
        }

        function o(aa, t, ad) {
            var X, af, Z, ab, ac, W, ae, Y;
            if (ad != j) {
                af = x()
            }
            X = R(aa, ad);
            if (af) {
                af.appendChild(X)
            }
            Z = aa.parentNode;
            ab = n(aa);
            ac = n(t);
            ++ab;
            W = ac - ab;
            ae = aa.nextSibling;
            while (W > 0) {
                Y = ae.nextSibling;
                X = z(ae, ad);
                if (af) {
                    af.appendChild(X)
                }
                ae = Y;
                --W
            }
            X = i(t, ad);
            if (af) {
                af.appendChild(X)
            }
            if (ad != F) {
                O.setStartAfter(aa);
                O.collapse(E)
            }
            return af
        }

        function i(ab, ac) {
            var X = P(O[Q], O[A] - 1), ad, aa, Z, t, W, Y = X != O[Q];
            if (X == ab) {
                return M(X, Y, S, ac)
            }
            ad = X.parentNode;
            aa = M(ad, S, S, ac);
            while (ad) {
                while (X) {
                    Z = X.previousSibling;
                    t = M(X, Y, S, ac);
                    if (ac != j) {
                        aa.insertBefore(t, aa.firstChild)
                    }
                    Y = E;
                    X = Z
                }
                if (ad == ab) {
                    return aa
                }
                X = ad.previousSibling;
                ad = ad.parentNode;
                W = M(ad, S, S, ac);
                if (ac != j) {
                    W.appendChild(aa)
                }
                aa = W
            }
        }

        function R(ab, ac) {
            var Y = P(O[h], O[V]), Z = Y != O[h], ad, aa, X, t, W;
            if (Y == ab) {
                return M(Y, Z, E, ac)
            }
            ad = Y.parentNode;
            aa = M(ad, S, E, ac);
            while (ad) {
                while (Y) {
                    X = Y.nextSibling;
                    t = M(Y, Z, E, ac);
                    if (ac != j) {
                        aa.appendChild(t)
                    }
                    Z = E;
                    Y = X
                }
                if (ad == ab) {
                    return aa
                }
                Y = ad.nextSibling;
                ad = ad.parentNode;
                W = M(ad, S, E, ac);
                if (ac != j) {
                    W.appendChild(aa)
                }
                aa = W
            }
        }

        function M(t, Z, ac, ad) {
            var Y, X, aa, W, ab;
            if (Z) {
                return z(t, ad)
            }
            if (t.nodeType == 3) {
                Y = t.nodeValue;
                if (ac) {
                    W = O[V];
                    X = Y.substring(W);
                    aa = Y.substring(0, W)
                } else {
                    W = O[A];
                    X = Y.substring(0, W);
                    aa = Y.substring(W)
                }
                if (ad != F) {
                    t.nodeValue = aa
                }
                if (ad == j) {
                    return
                }
                ab = c.clone(t, S);
                ab.nodeValue = X;
                return ab
            }
            if (ad == j) {
                return
            }
            return c.clone(t, S)
        }

        function z(W, t) {
            if (t != j) {
                return t == F ? c.clone(W, E) : W
            }
            W.parentNode.removeChild(W)
        }
    }

    a.Range = b
})(tinymce.dom);
(function () {
    function a(d) {
        var b = this, h = d.dom, c = true, f = false;

        function e(i, j) {
            var k, t = 0, q, n, m, l, o, r, p = -1, s;
            k = i.duplicate();
            k.collapse(j);
            s = k.parentElement();
            if (s.ownerDocument !== d.dom.doc) {
                return
            }
            while (s.contentEditable === "false") {
                s = s.parentNode
            }
            if (!s.hasChildNodes()) {
                return{node:s, inside:1}
            }
            m = s.children;
            q = m.length - 1;
            while (t <= q) {
                r = Math.floor((t + q) / 2);
                l = m[r];
                k.moveToElementText(l);
                p = k.compareEndPoints(j ? "StartToStart" : "EndToEnd", i);
                if (p > 0) {
                    q = r - 1
                } else {
                    if (p < 0) {
                        t = r + 1
                    } else {
                        return{node:l}
                    }
                }
            }
            if (p < 0) {
                if (!l) {
                    k.moveToElementText(s);
                    k.collapse(true);
                    l = s;
                    n = true
                } else {
                    k.collapse(false)
                }
                k.setEndPoint(j ? "EndToStart" : "EndToEnd", i);
                if (k.compareEndPoints(j ? "StartToStart" : "StartToEnd", i) > 0) {
                    k = i.duplicate();
                    k.collapse(j);
                    o = -1;
                    while (s == k.parentElement()) {
                        if (k.move("character", -1) == 0) {
                            break
                        }
                        o++
                    }
                }
                o = o || k.text.replace("\r\n", " ").length
            } else {
                k.collapse(true);
                k.setEndPoint(j ? "StartToStart" : "StartToEnd", i);
                o = k.text.replace("\r\n", " ").length
            }
            return{node:l, position:p, offset:o, inside:n}
        }

        function g() {
            var i = d.getRng(), r = h.createRng(), l, k, p, q, m, j;
            l = i.item ? i.item(0) : i.parentElement();
            if (l.ownerDocument != h.doc) {
                return r
            }
            k = d.isCollapsed();
            if (i.item) {
                r.setStart(l.parentNode, h.nodeIndex(l));
                r.setEnd(r.startContainer, r.startOffset + 1);
                return r
            }
            function o(A) {
                var u = e(i, A), s, y, z = 0, x, v, t;
                s = u.node;
                y = u.offset;
                if (u.inside && !s.hasChildNodes()) {
                    r[A ? "setStart" : "setEnd"](s, 0);
                    return
                }
                if (y === v) {
                    r[A ? "setStartBefore" : "setEndAfter"](s);
                    return
                }
                if (u.position < 0) {
                    x = u.inside ? s.firstChild : s.nextSibling;
                    if (!x) {
                        r[A ? "setStartAfter" : "setEndAfter"](s);
                        return
                    }
                    if (!y) {
                        if (x.nodeType == 3) {
                            r[A ? "setStart" : "setEnd"](x, 0)
                        } else {
                            r[A ? "setStartBefore" : "setEndBefore"](x)
                        }
                        return
                    }
                    while (x) {
                        t = x.nodeValue;
                        z += t.length;
                        if (z >= y) {
                            s = x;
                            z -= y;
                            z = t.length - z;
                            break
                        }
                        x = x.nextSibling
                    }
                } else {
                    x = s.previousSibling;
                    if (!x) {
                        return r[A ? "setStartBefore" : "setEndBefore"](s)
                    }
                    if (!y) {
                        if (s.nodeType == 3) {
                            r[A ? "setStart" : "setEnd"](x, s.nodeValue.length)
                        } else {
                            r[A ? "setStartAfter" : "setEndAfter"](x)
                        }
                        return
                    }
                    while (x) {
                        z += x.nodeValue.length;
                        if (z >= y) {
                            s = x;
                            z -= y;
                            break
                        }
                        x = x.previousSibling
                    }
                }
                r[A ? "setStart" : "setEnd"](s, z)
            }

            try {
                o(true);
                if (!k) {
                    o()
                }
            } catch (n) {
                if (n.number == -2147024809) {
                    m = b.getBookmark(2);
                    p = i.duplicate();
                    p.collapse(true);
                    l = p.parentElement();
                    if (!k) {
                        p = i.duplicate();
                        p.collapse(false);
                        q = p.parentElement();
                        q.innerHTML = q.innerHTML
                    }
                    l.innerHTML = l.innerHTML;
                    b.moveToBookmark(m);
                    i = d.getRng();
                    o(true);
                    if (!k) {
                        o()
                    }
                } else {
                    throw n
                }
            }
            return r
        }

        this.getBookmark = function (m) {
            var j = d.getRng(), o, i, l = {};

            function n(u) {
                var u, t, p, s, r, q = [];
                t = u.parentNode;
                p = h.getRoot().parentNode;
                while (t != p && t.nodeType !== 9) {
                    s = t.children;
                    r = s.length;
                    while (r--) {
                        if (u === s[r]) {
                            q.push(r);
                            break
                        }
                    }
                    u = t;
                    t = t.parentNode
                }
                return q
            }

            function k(q) {
                var p;
                p = e(j, q);
                if (p) {
                    return{position:p.position, offset:p.offset, indexes:n(p.node), inside:p.inside}
                }
            }

            if (m === 2) {
                if (!j.item) {
                    l.start = k(true);
                    if (!d.isCollapsed()) {
                        l.end = k()
                    }
                } else {
                    l.start = {ctrl:true, indexes:n(j.item(0))}
                }
            }
            return l
        };
        this.moveToBookmark = function (k) {
            var j, i = h.doc.body;

            function m(o) {
                var r, q, n, p;
                r = h.getRoot();
                for (q = o.length - 1; q >= 0; q--) {
                    p = r.children;
                    n = o[q];
                    if (n <= p.length - 1) {
                        r = p[n]
                    }
                }
                return r
            }

            function l(r) {
                var n = k[r ? "start" : "end"], q, p, o;
                if (n) {
                    q = n.position > 0;
                    p = i.createTextRange();
                    p.moveToElementText(m(n.indexes));
                    offset = n.offset;
                    if (offset !== o) {
                        p.collapse(n.inside || q);
                        p.moveStart("character", q ? -offset : offset)
                    } else {
                        p.collapse(r)
                    }
                    j.setEndPoint(r ? "StartToStart" : "EndToStart", p);
                    if (r) {
                        j.collapse(true)
                    }
                }
            }

            if (k.start) {
                if (k.start.ctrl) {
                    j = i.createControlRange();
                    j.addElement(m(k.start.indexes));
                    j.select()
                } else {
                    j = i.createTextRange();
                    l(true);
                    l();
                    j.select()
                }
            }
        };
        this.addRange = function (i) {
            var n, l, k, p, s, q, r = d.dom.doc, m = r.body;

            function j(z) {
                var u, y, t, x, v;
                t = h.create("a");
                u = z ? k : s;
                y = z ? p : q;
                x = n.duplicate();
                if (u == r || u == r.documentElement) {
                    u = m;
                    y = 0
                }
                if (u.nodeType == 3) {
                    u.parentNode.insertBefore(t, u);
                    x.moveToElementText(t);
                    x.moveStart("character", y);
                    h.remove(t);
                    n.setEndPoint(z ? "StartToStart" : "EndToEnd", x)
                } else {
                    v = u.childNodes;
                    if (v.length) {
                        if (y >= v.length) {
                            h.insertAfter(t, v[v.length - 1])
                        } else {
                            u.insertBefore(t, v[y])
                        }
                        x.moveToElementText(t)
                    } else {
                        if (u.canHaveHTML) {
                            u.innerHTML = "<span>\uFEFF</span>";
                            t = u.firstChild;
                            x.moveToElementText(t);
                            x.collapse(f)
                        }
                    }
                    n.setEndPoint(z ? "StartToStart" : "EndToEnd", x);
                    h.remove(t)
                }
            }

            k = i.startContainer;
            p = i.startOffset;
            s = i.endContainer;
            q = i.endOffset;
            n = m.createTextRange();
            if (k == s && k.nodeType == 1) {
                if (!k.hasChildNodes()) {
                    k.innerHTML = "<span>\uFEFF</span><span>\uFEFF</span>";
                    n.moveToElementText(k.lastChild);
                    n.select();
                    h.doc.selection.clear();
                    k.innerHTML = "";
                    return
                }
                if (p == q - 1) {
                    try {
                        l = m.createControlRange();
                        l.addElement(k.childNodes[p]);
                        l.select();
                        return
                    } catch (o) {
                    }
                }
            }
            j(true);
            j();
            n.select()
        };
        this.getRangeAt = g
    }

    tinymce.dom.TridentSelection = a
})();
(function (a) {
    a.dom.Element = function (f, d) {
        var b = this, e, c;
        b.settings = d = d || {};
        b.id = f;
        b.dom = e = d.dom || a.DOM;
        if (!a.isIE) {
            c = e.get(b.id)
        }
        a.each(("getPos,getRect,getParent,add,setStyle,getStyle,setStyles,setAttrib,setAttribs,getAttrib,addClass,removeClass,hasClass,getOuterHTML,setOuterHTML,remove,show,hide,isHidden,setHTML,get").split(/,/), function (g) {
            b[g] = function () {
                var h = [f], j;
                for (j = 0; j < arguments.length; j++) {
                    h.push(arguments[j])
                }
                h = e[g].apply(e, h);
                b.update(g);
                return h
            }
        });
        a.extend(b, {on:function (i, h, g) {
            return a.dom.Event.add(b.id, i, h, g)
        }, getXY:function () {
            return{x:parseInt(b.getStyle("left")), y:parseInt(b.getStyle("top"))}
        }, getSize:function () {
            var g = e.get(b.id);
            return{w:parseInt(b.getStyle("width") || g.clientWidth), h:parseInt(b.getStyle("height") || g.clientHeight)}
        }, moveTo:function (g, h) {
            b.setStyles({left:g, top:h})
        }, moveBy:function (g, i) {
            var h = b.getXY();
            b.moveTo(h.x + g, h.y + i)
        }, resizeTo:function (g, i) {
            b.setStyles({width:g, height:i})
        }, resizeBy:function (g, j) {
            var i = b.getSize();
            b.resizeTo(i.w + g, i.h + j)
        }, update:function (h) {
            var g;
            if (a.isIE6 && d.blocker) {
                h = h || "";
                if (h.indexOf("get") === 0 || h.indexOf("has") === 0 || h.indexOf("is") === 0) {
                    return
                }
                if (h == "remove") {
                    e.remove(b.blocker);
                    return
                }
                if (!b.blocker) {
                    b.blocker = e.uniqueId();
                    g = e.add(d.container || e.getRoot(), "iframe", {id:b.blocker, style:"position:absolute;", frameBorder:0, src:'javascript:""'});
                    e.setStyle(g, "opacity", 0)
                } else {
                    g = e.get(b.blocker)
                }
                e.setStyles(g, {left:b.getStyle("left", 1), top:b.getStyle("top", 1), width:b.getStyle("width", 1), height:b.getStyle("height", 1), display:b.getStyle("display", 1), zIndex:parseInt(b.getStyle("zIndex", 1) || 0) - 1})
            }
        }})
    }
})(tinymce);
(function (c) {
    function e(f) {
        return f.replace(/[\n\r]+/g, "")
    }

    var b = c.is, a = c.isIE, d = c.each;
    c.create("tinymce.dom.Selection", {Selection:function (i, h, g) {
        var f = this;
        f.dom = i;
        f.win = h;
        f.serializer = g;
        d(["onBeforeSetContent", "onBeforeGetContent", "onSetContent", "onGetContent"], function (j) {
            f[j] = new c.util.Dispatcher(f)
        });
        if (!f.win.getSelection) {
            f.tridentSel = new c.dom.TridentSelection(f)
        }
        if (c.isIE && i.boxModel) {
            this._fixIESelection()
        }
        c.addUnload(f.destroy, f)
    }, setCursorLocation:function (h, i) {
        var f = this;
        var g = f.dom.createRng();
        g.setStart(h, i);
        g.setEnd(h, i);
        f.setRng(g);
        f.collapse(false)
    }, getContent:function (g) {
        var f = this, h = f.getRng(), l = f.dom.create("body"), j = f.getSel(), i, k, m;
        g = g || {};
        i = k = "";
        g.get = true;
        g.format = g.format || "html";
        g.forced_root_block = "";
        f.onBeforeGetContent.dispatch(f, g);
        if (g.format == "text") {
            return f.isCollapsed() ? "" : (h.text || (j.toString ? j.toString() : ""))
        }
        if (h.cloneContents) {
            m = h.cloneContents();
            if (m) {
                l.appendChild(m)
            }
        } else {
            if (b(h.item) || b(h.htmlText)) {
                l.innerHTML = "<br>" + (h.item ? h.item(0).outerHTML : h.htmlText);
                l.removeChild(l.firstChild)
            } else {
                l.innerHTML = h.toString()
            }
        }
        if (/^\s/.test(l.innerHTML)) {
            i = " "
        }
        if (/\s+$/.test(l.innerHTML)) {
            k = " "
        }
        g.getInner = true;
        g.content = f.isCollapsed() ? "" : i + f.serializer.serialize(l, g) + k;
        f.onGetContent.dispatch(f, g);
        return g.content
    }, setContent:function (g, i) {
        var n = this, f = n.getRng(), j, k = n.win.document, m, l;
        i = i || {format:"html"};
        i.set = true;
        g = i.content = g;
        if (!i.no_events) {
            n.onBeforeSetContent.dispatch(n, i)
        }
        g = i.content;
        if (f.insertNode) {
            g += '<span id="__caret">_</span>';
            if (f.startContainer == k && f.endContainer == k) {
                k.body.innerHTML = g
            } else {
                f.deleteContents();
                if (k.body.childNodes.length == 0) {
                    k.body.innerHTML = g
                } else {
                    if (f.createContextualFragment) {
                        f.insertNode(f.createContextualFragment(g))
                    } else {
                        m = k.createDocumentFragment();
                        l = k.createElement("div");
                        m.appendChild(l);
                        l.outerHTML = g;
                        f.insertNode(m)
                    }
                }
            }
            j = n.dom.get("__caret");
            f = k.createRange();
            f.setStartBefore(j);
            f.setEndBefore(j);
            n.setRng(f);
            n.dom.remove("__caret");
            try {
                n.setRng(f)
            } catch (h) {
            }
        } else {
            if (f.item) {
                k.execCommand("Delete", false, null);
                f = n.getRng()
            }
            if (/^\s+/.test(g)) {
                f.pasteHTML('<span id="__mce_tmp">_</span>' + g);
                n.dom.remove("__mce_tmp")
            } else {
                f.pasteHTML(g)
            }
        }
        if (!i.no_events) {
            n.onSetContent.dispatch(n, i)
        }
    }, getStart:function () {
        var g = this.getRng(), h, f, j, i;
        if (g.duplicate || g.item) {
            if (g.item) {
                return g.item(0)
            }
            j = g.duplicate();
            j.collapse(1);
            h = j.parentElement();
            f = i = g.parentElement();
            while (i = i.parentNode) {
                if (i == h) {
                    h = f;
                    break
                }
            }
            return h
        } else {
            h = g.startContainer;
            if (h.nodeType == 1 && h.hasChildNodes()) {
                h = h.childNodes[Math.min(h.childNodes.length - 1, g.startOffset)]
            }
            if (h && h.nodeType == 3) {
                return h.parentNode
            }
            return h
        }
    }, getEnd:function () {
        var g = this, h = g.getRng(), i, f;
        if (h.duplicate || h.item) {
            if (h.item) {
                return h.item(0)
            }
            h = h.duplicate();
            h.collapse(0);
            i = h.parentElement();
            if (i && i.nodeName == "BODY") {
                return i.lastChild || i
            }
            return i
        } else {
            i = h.endContainer;
            f = h.endOffset;
            if (i.nodeType == 1 && i.hasChildNodes()) {
                i = i.childNodes[f > 0 ? f - 1 : f]
            }
            if (i && i.nodeType == 3) {
                return i.parentNode
            }
            return i
        }
    }, getBookmark:function (r, s) {
        var v = this, m = v.dom, g, j, i, n, h, o, p, l = "\uFEFF", u;

        function f(x, y) {
            var t = 0;
            d(m.select(x), function (A, z) {
                if (A == y) {
                    t = z
                }
            });
            return t
        }

        if (r == 2) {
            function k() {
                var x = v.getRng(true), t = m.getRoot(), y = {};

                function z(C, H) {
                    var B = C[H ? "startContainer" : "endContainer"], G = C[H ? "startOffset" : "endOffset"], A = [], D, F, E = 0;
                    if (B.nodeType == 3) {
                        if (s) {
                            for (D = B.previousSibling; D && D.nodeType == 3; D = D.previousSibling) {
                                G += D.nodeValue.length
                            }
                        }
                        A.push(G)
                    } else {
                        F = B.childNodes;
                        if (G >= F.length && F.length) {
                            E = 1;
                            G = Math.max(0, F.length - 1)
                        }
                        A.push(v.dom.nodeIndex(F[G], s) + E)
                    }
                    for (; B && B != t; B = B.parentNode) {
                        A.push(v.dom.nodeIndex(B, s))
                    }
                    return A
                }

                y.start = z(x, true);
                if (!v.isCollapsed()) {
                    y.end = z(x)
                }
                return y
            }

            if (v.tridentSel) {
                return v.tridentSel.getBookmark(r)
            }
            return k()
        }
        if (r) {
            return{rng:v.getRng()}
        }
        g = v.getRng();
        i = m.uniqueId();
        n = tinyMCE.activeEditor.selection.isCollapsed();
        u = "overflow:hidden;line-height:0px";
        if (g.duplicate || g.item) {
            if (!g.item) {
                j = g.duplicate();
                try {
                    g.collapse();
                    g.pasteHTML('<span data-mce-type="bookmark" id="' + i + '_start" style="' + u + '">' + l + "</span>");
                    if (!n) {
                        j.collapse(false);
                        g.moveToElementText(j.parentElement());
                        if (g.compareEndPoints("StartToEnd", j) == 0) {
                            j.move("character", -1)
                        }
                        j.pasteHTML('<span data-mce-type="bookmark" id="' + i + '_end" style="' + u + '">' + l + "</span>")
                    }
                } catch (q) {
                    return null
                }
            } else {
                o = g.item(0);
                h = o.nodeName;
                return{name:h, index:f(h, o)}
            }
        } else {
            o = v.getNode();
            h = o.nodeName;
            if (h == "IMG") {
                return{name:h, index:f(h, o)}
            }
            j = g.cloneRange();
            if (!n) {
                j.collapse(false);
                j.insertNode(m.create("span", {"data-mce-type":"bookmark", id:i + "_end", style:u}, l))
            }
            g.collapse(true);
            g.insertNode(m.create("span", {"data-mce-type":"bookmark", id:i + "_start", style:u}, l))
        }
        v.moveToBookmark({id:i, keep:1});
        return{id:i}
    }, moveToBookmark:function (n) {
        var r = this, l = r.dom, i, h, f, q, j, s, o, p;
        if (n) {
            if (n.start) {
                f = l.createRng();
                q = l.getRoot();
                function g(z) {
                    var t = n[z ? "start" : "end"], v, x, y, u;
                    if (t) {
                        y = t[0];
                        for (x = q, v = t.length - 1; v >= 1; v--) {
                            u = x.childNodes;
                            if (t[v] > u.length - 1) {
                                return
                            }
                            x = u[t[v]]
                        }
                        if (x.nodeType === 3) {
                            y = Math.min(t[0], x.nodeValue.length)
                        }
                        if (x.nodeType === 1) {
                            y = Math.min(t[0], x.childNodes.length)
                        }
                        if (z) {
                            f.setStart(x, y)
                        } else {
                            f.setEnd(x, y)
                        }
                    }
                    return true
                }

                if (r.tridentSel) {
                    return r.tridentSel.moveToBookmark(n)
                }
                if (g(true) && g()) {
                    r.setRng(f)
                }
            } else {
                if (n.id) {
                    function k(A) {
                        var u = l.get(n.id + "_" + A), z, t, x, y, v = n.keep;
                        if (u) {
                            z = u.parentNode;
                            if (A == "start") {
                                if (!v) {
                                    t = l.nodeIndex(u)
                                } else {
                                    z = u.firstChild;
                                    t = 1
                                }
                                j = s = z;
                                o = p = t
                            } else {
                                if (!v) {
                                    t = l.nodeIndex(u)
                                } else {
                                    z = u.firstChild;
                                    t = 1
                                }
                                s = z;
                                p = t
                            }
                            if (!v) {
                                y = u.previousSibling;
                                x = u.nextSibling;
                                d(c.grep(u.childNodes), function (B) {
                                    if (B.nodeType == 3) {
                                        B.nodeValue = B.nodeValue.replace(/\uFEFF/g, "")
                                    }
                                });
                                while (u = l.get(n.id + "_" + A)) {
                                    l.remove(u, 1)
                                }
                                if (y && x && y.nodeType == x.nodeType && y.nodeType == 3 && !c.isOpera) {
                                    t = y.nodeValue.length;
                                    y.appendData(x.nodeValue);
                                    l.remove(x);
                                    if (A == "start") {
                                        j = s = y;
                                        o = p = t
                                    } else {
                                        s = y;
                                        p = t
                                    }
                                }
                            }
                        }
                    }

                    function m(t) {
                        if (l.isBlock(t) && !t.innerHTML) {
                            t.innerHTML = !a ? '<br data-mce-bogus="1" />' : " "
                        }
                        return t
                    }

                    k("start");
                    k("end");
                    if (j) {
                        f = l.createRng();
                        f.setStart(m(j), o);
                        f.setEnd(m(s), p);
                        r.setRng(f)
                    }
                } else {
                    if (n.name) {
                        r.select(l.select(n.name)[n.index])
                    } else {
                        if (n.rng) {
                            r.setRng(n.rng)
                        }
                    }
                }
            }
        }
    }, select:function (k, j) {
        var i = this, l = i.dom, g = l.createRng(), f;
        if (k) {
            f = l.nodeIndex(k);
            g.setStart(k.parentNode, f);
            g.setEnd(k.parentNode, f + 1);
            if (j) {
                function h(m, o) {
                    var n = new c.dom.TreeWalker(m, m);
                    do {
                        if (m.nodeType == 3 && c.trim(m.nodeValue).length != 0) {
                            if (o) {
                                g.setStart(m, 0)
                            } else {
                                g.setEnd(m, m.nodeValue.length)
                            }
                            return
                        }
                        if (m.nodeName == "BR") {
                            if (o) {
                                g.setStartBefore(m)
                            } else {
                                g.setEndBefore(m)
                            }
                            return
                        }
                    } while (m = (o ? n.next() : n.prev()))
                }

                h(k, 1);
                h(k)
            }
            i.setRng(g)
        }
        return k
    }, isCollapsed:function () {
        var f = this, h = f.getRng(), g = f.getSel();
        if (!h || h.item) {
            return false
        }
        if (h.compareEndPoints) {
            return h.compareEndPoints("StartToEnd", h) === 0
        }
        return !g || h.collapsed
    }, collapse:function (f) {
        var h = this, g = h.getRng(), i;
        if (g.item) {
            i = g.item(0);
            g = h.win.document.body.createTextRange();
            g.moveToElementText(i)
        }
        g.collapse(!!f);
        h.setRng(g)
    }, getSel:function () {
        var g = this, f = this.win;
        return f.getSelection ? f.getSelection() : f.document.selection
    }, getRng:function (l) {
        var g = this, h, i, k, j = g.win.document;
        if (l && g.tridentSel) {
            return g.tridentSel.getRangeAt(0)
        }
        try {
            if (h = g.getSel()) {
                i = h.rangeCount > 0 ? h.getRangeAt(0) : (h.createRange ? h.createRange() : j.createRange())
            }
        } catch (f) {
        }
        if (c.isIE && i && i.setStart && j.selection.createRange().item) {
            k = j.selection.createRange().item(0);
            i = j.createRange();
            i.setStartBefore(k);
            i.setEndAfter(k)
        }
        if (!i) {
            i = j.createRange ? j.createRange() : j.body.createTextRange()
        }
        if (g.selectedRange && g.explicitRange) {
            if (i.compareBoundaryPoints(i.START_TO_START, g.selectedRange) === 0 && i.compareBoundaryPoints(i.END_TO_END, g.selectedRange) === 0) {
                i = g.explicitRange
            } else {
                g.selectedRange = null;
                g.explicitRange = null
            }
        }
        return i
    }, setRng:function (i) {
        var h, g = this;
        if (!g.tridentSel) {
            h = g.getSel();
            if (h) {
                g.explicitRange = i;
                try {
                    h.removeAllRanges()
                } catch (f) {
                }
                h.addRange(i);
                g.selectedRange = h.rangeCount > 0 ? h.getRangeAt(0) : null
            }
        } else {
            if (i.cloneRange) {
                try {
                    g.tridentSel.addRange(i);
                    return
                } catch (f) {
                }
            }
            try {
                i.select()
            } catch (f) {
            }
        }
    }, setNode:function (g) {
        var f = this;
        f.setContent(f.dom.getOuterHTML(g));
        return g
    }, getNode:function () {
        var h = this, g = h.getRng(), i = h.getSel(), l, k = g.startContainer, f = g.endContainer;
        if (!g) {
            return h.dom.getRoot()
        }
        if (g.setStart) {
            l = g.commonAncestorContainer;
            if (!g.collapsed) {
                if (g.startContainer == g.endContainer) {
                    if (g.endOffset - g.startOffset < 2) {
                        if (g.startContainer.hasChildNodes()) {
                            l = g.startContainer.childNodes[g.startOffset]
                        }
                    }
                }
                if (k.nodeType === 3 && f.nodeType === 3) {
                    function j(p, m) {
                        var o = p;
                        while (p && p.nodeType === 3 && p.length === 0) {
                            p = m ? p.nextSibling : p.previousSibling
                        }
                        return p || o
                    }

                    if (k.length === g.startOffset) {
                        k = j(k.nextSibling, true)
                    } else {
                        k = k.parentNode
                    }
                    if (g.endOffset === 0) {
                        f = j(f.previousSibling, false)
                    } else {
                        f = f.parentNode
                    }
                    if (k && k === f) {
                        return k
                    }
                }
            }
            if (l && l.nodeType == 3) {
                return l.parentNode
            }
            return l
        }
        return g.item ? g.item(0) : g.parentElement()
    }, getSelectedBlocks:function (o, g) {
        var m = this, j = m.dom, l, k, h, i = [];
        l = j.getParent(o || m.getStart(), j.isBlock);
        k = j.getParent(g || m.getEnd(), j.isBlock);
        if (l) {
            i.push(l)
        }
        if (l && k && l != k) {
            h = l;
            var f = new c.dom.TreeWalker(l, j.getRoot());
            while ((h = f.next()) && h != k) {
                if (j.isBlock(h)) {
                    i.push(h)
                }
            }
        }
        if (k && l != k) {
            i.push(k)
        }
        return i
    }, normalize:function () {
        var g = this, f, i;
        if (c.isIE) {
            return
        }
        function h(p) {
            var k, o, n, m = g.dom, j = m.getRoot(), l;
            k = f[(p ? "start" : "end") + "Container"];
            o = f[(p ? "start" : "end") + "Offset"];
            if (k.nodeType === 9) {
                k = k.body;
                o = 0
            }
            if (k === j) {
                if (k.hasChildNodes()) {
                    k = k.childNodes[Math.min(!p && o > 0 ? o - 1 : o, k.childNodes.length - 1)];
                    o = 0;
                    if (k.hasChildNodes()) {
                        l = k;
                        n = new c.dom.TreeWalker(k, j);
                        do {
                            if (l.nodeType === 3) {
                                o = p ? 0 : l.nodeValue.length - 1;
                                k = l;
                                i = true;
                                break
                            }
                            if (/^(BR|IMG)$/.test(l.nodeName)) {
                                o = m.nodeIndex(l);
                                k = l.parentNode;
                                if (l.nodeName == "IMG" && !p) {
                                    o++
                                }
                                i = true;
                                break
                            }
                        } while (l = (p ? n.next() : n.prev()))
                    }
                }
            }
            if (i) {
                f["set" + (p ? "Start" : "End")](k, o)
            }
        }

        f = g.getRng();
        h(true);
        if (!f.collapsed) {
            h()
        }
        if (i) {
            g.setRng(f)
        }
    }, destroy:function (g) {
        var f = this;
        f.win = null;
        if (!g) {
            c.removeUnload(f.destroy)
        }
    }, _fixIESelection:function () {
        var g = this.dom, m = g.doc, h = m.body, j, n, f;
        m.documentElement.unselectable = true;
        function i(o, r) {
            var p = h.createTextRange();
            try {
                p.moveToPoint(o, r)
            } catch (q) {
                p = null
            }
            return p
        }

        function l(p) {
            var o;
            if (p.button) {
                o = i(p.x, p.y);
                if (o) {
                    if (o.compareEndPoints("StartToStart", n) > 0) {
                        o.setEndPoint("StartToStart", n)
                    } else {
                        o.setEndPoint("EndToEnd", n)
                    }
                    o.select()
                }
            } else {
                k()
            }
        }

        function k() {
            var o = m.selection.createRange();
            if (n && !o.item && o.compareEndPoints("StartToEnd", o) === 0) {
                n.select()
            }
            g.unbind(m, "mouseup", k);
            g.unbind(m, "mousemove", l);
            n = j = 0
        }

        g.bind(m, ["mousedown", "contextmenu"], function (o) {
            if (o.target.nodeName === "HTML") {
                if (j) {
                    k()
                }
                f = m.documentElement;
                if (f.scrollHeight > f.clientHeight) {
                    return
                }
                j = 1;
                n = i(o.x, o.y);
                if (n) {
                    g.bind(m, "mouseup", k);
                    g.bind(m, "mousemove", l);
                    g.win.focus();
                    n.select()
                }
            }
        })
    }})
})(tinymce);
(function (a) {
    a.dom.Serializer = function (e, i, f) {
        var h, b, d = a.isIE, g = a.each, c;
        if (!e.apply_source_formatting) {
            e.indent = false
        }
        i = i || a.DOM;
        f = f || new a.html.Schema(e);
        e.entity_encoding = e.entity_encoding || "named";
        e.remove_trailing_brs = "remove_trailing_brs" in e ? e.remove_trailing_brs : true;
        h = new a.util.Dispatcher(self);
        b = new a.util.Dispatcher(self);
        c = new a.html.DomParser(e, f);
        c.addAttributeFilter("src,href,style", function (k, j) {
            var o = k.length, l, q, n = "data-mce-" + j, p = e.url_converter, r = e.url_converter_scope, m;
            while (o--) {
                l = k[o];
                q = l.attributes.map[n];
                if (q !== m) {
                    l.attr(j, q.length > 0 ? q : null);
                    l.attr(n, null)
                } else {
                    q = l.attributes.map[j];
                    if (j === "style") {
                        q = i.serializeStyle(i.parseStyle(q), l.name)
                    } else {
                        if (p) {
                            q = p.call(r, q, j, l.name)
                        }
                    }
                    l.attr(j, q.length > 0 ? q : null)
                }
            }
        });
        c.addAttributeFilter("class", function (j, k) {
            var l = j.length, m, n;
            while (l--) {
                m = j[l];
                n = m.attr("class").replace(/\s*mce(Item\w+|Selected)\s*/g, "");
                m.attr("class", n.length > 0 ? n : null)
            }
        });
        c.addAttributeFilter("data-mce-type", function (j, l, k) {
            var m = j.length, n;
            while (m--) {
                n = j[m];
                if (n.attributes.map["data-mce-type"] === "bookmark" && !k.cleanup) {
                    n.remove()
                }
            }
        });
        c.addAttributeFilter("data-mce-expando", function (j, l, k) {
            var m = j.length;
            while (m--) {
                j[m].attr(l, null)
            }
        });
        c.addNodeFilter("script,style", function (k, l) {
            var m = k.length, n, o;

            function j(p) {
                return p.replace(/(<!--\[CDATA\[|\]\]-->)/g, "\n").replace(/^[\r\n]*|[\r\n]*$/g, "").replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi, "").replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g, "")
            }

            while (m--) {
                n = k[m];
                o = n.firstChild ? n.firstChild.value : "";
                if (l === "script") {
                    n.attr("type", (n.attr("type") || "text/javascript").replace(/^mce\-/, ""));
                    if (o.length > 0) {
                        n.firstChild.value = "// <![CDATA[\n" + j(o) + "\n// ]]>"
                    }
                } else {
                    if (o.length > 0) {
                        n.firstChild.value = "<!--\n" + j(o) + "\n-->"
                    }
                }
            }
        });
        c.addNodeFilter("#comment", function (j, k) {
            var l = j.length, m;
            while (l--) {
                m = j[l];
                if (m.value.indexOf("[CDATA[") === 0) {
                    m.name = "#cdata";
                    m.type = 4;
                    m.value = m.value.replace(/^\[CDATA\[|\]\]$/g, "")
                } else {
                    if (m.value.indexOf("mce:protected ") === 0) {
                        m.name = "#text";
                        m.type = 3;
                        m.raw = true;
                        m.value = unescape(m.value).substr(14)
                    }
                }
            }
        });
        c.addNodeFilter("xml:namespace,input", function (j, k) {
            var l = j.length, m;
            while (l--) {
                m = j[l];
                if (m.type === 7) {
                    m.remove()
                } else {
                    if (m.type === 1) {
                        if (k === "input" && !("type" in m.attributes.map)) {
                            m.attr("type", "text")
                        }
                    }
                }
            }
        });
        if (e.fix_list_elements) {
            c.addNodeFilter("ul,ol", function (k, l) {
                var m = k.length, n, j;
                while (m--) {
                    n = k[m];
                    j = n.parent;
                    if (j.name === "ul" || j.name === "ol") {
                        if (n.prev && n.prev.name === "li") {
                            n.prev.append(n)
                        }
                    }
                }
            })
        }
        c.addAttributeFilter("data-mce-src,data-mce-href,data-mce-style", function (j, k) {
            var l = j.length;
            while (l--) {
                j[l].attr(k, null)
            }
        });
        return{schema:f, addNodeFilter:c.addNodeFilter, addAttributeFilter:c.addAttributeFilter, onPreProcess:h, onPostProcess:b, serialize:function (o, m) {
            var l, p, k, j, n;
            if (d && i.select("script,style,select,map").length > 0) {
                n = o.innerHTML;
                o = o.cloneNode(false);
                i.setHTML(o, n)
            } else {
                o = o.cloneNode(true)
            }
            l = o.ownerDocument.implementation;
            if (l.createHTMLDocument) {
                p = l.createHTMLDocument("");
                g(o.nodeName == "BODY" ? o.childNodes : [o], function (q) {
                    p.body.appendChild(p.importNode(q, true))
                });
                if (o.nodeName != "BODY") {
                    o = p.body.firstChild
                } else {
                    o = p.body
                }
                k = i.doc;
                i.doc = p
            }
            m = m || {};
            m.format = m.format || "html";
            if (!m.no_events) {
                m.node = o;
                h.dispatch(self, m)
            }
            j = new a.html.Serializer(e, f);
            m.content = j.serialize(c.parse(m.getInner ? o.innerHTML : a.trim(i.getOuterHTML(o), m), m));
            if (!m.cleanup) {
                m.content = m.content.replace(/\uFEFF|\u200B/g, "")
            }
            if (!m.no_events) {
                b.dispatch(self, m)
            }
            if (k) {
                i.doc = k
            }
            m.node = null;
            return m.content
        }, addRules:function (j) {
            f.addValidElements(j)
        }, setRules:function (j) {
            f.setValidElements(j)
        }}
    }
})(tinymce);
(function (a) {
    a.dom.ScriptLoader = function (h) {
        var c = 0, k = 1, i = 2, l = {}, j = [], f = {}, d = [], g = 0, e;

        function b(m, v) {
            var x = this, q = a.DOM, s, o, r, n;

            function p() {
                q.remove(n);
                if (s) {
                    s.onreadystatechange = s.onload = s = null
                }
                v()
            }

            function u() {
                if (typeof(console) !== "undefined" && console.log) {
                    console.log("Failed to load: " + m)
                }
            }

            n = q.uniqueId();
            if (a.isIE6) {
                o = new a.util.URI(m);
                r = location;
                if (o.host == r.hostname && o.port == r.port && (o.protocol + ":") == r.protocol && o.protocol.toLowerCase() != "file") {
                    a.util.XHR.send({url:a._addVer(o.getURI()), success:function (y) {
                        var t = q.create("script", {type:"text/javascript"});
                        t.text = y;
                        document.getElementsByTagName("head")[0].appendChild(t);
                        q.remove(t);
                        p()
                    }, error:u});
                    return
                }
            }
            s = q.create("script", {id:n, type:"text/javascript", src:a._addVer(m)});
            if (!a.isIE) {
                s.onload = p
            }
            s.onerror = u;
            if (!a.isOpera) {
                s.onreadystatechange = function () {
                    var t = s.readyState;
                    if (t == "complete" || t == "loaded") {
                        p()
                    }
                }
            }
            (document.getElementsByTagName("head")[0] || document.body).appendChild(s)
        }

        this.isDone = function (m) {
            return l[m] == i
        };
        this.markDone = function (m) {
            l[m] = i
        };
        this.add = this.load = function (m, q, n) {
            var o, p = l[m];
            if (p == e) {
                j.push(m);
                l[m] = c
            }
            if (q) {
                if (!f[m]) {
                    f[m] = []
                }
                f[m].push({func:q, scope:n || this})
            }
        };
        this.loadQueue = function (n, m) {
            this.loadScripts(j, n, m)
        };
        this.loadScripts = function (m, q, p) {
            var o;

            function n(r) {
                a.each(f[r], function (s) {
                    s.func.call(s.scope)
                });
                f[r] = e
            }

            d.push({func:q, scope:p || this});
            o = function () {
                var r = a.grep(m);
                m.length = 0;
                a.each(r, function (s) {
                    if (l[s] == i) {
                        n(s);
                        return
                    }
                    if (l[s] != k) {
                        l[s] = k;
                        g++;
                        b(s, function () {
                            l[s] = i;
                            g--;
                            n(s);
                            o()
                        })
                    }
                });
                if (!g) {
                    a.each(d, function (s) {
                        s.func.call(s.scope)
                    });
                    d.length = 0
                }
            };
            o()
        }
    };
    a.ScriptLoader = new a.dom.ScriptLoader()
})(tinymce);
tinymce.dom.TreeWalker = function (a, c) {
    var b = a;

    function d(i, f, e, j) {
        var h, g;
        if (i) {
            if (!j && i[f]) {
                return i[f]
            }
            if (i != c) {
                h = i[e];
                if (h) {
                    return h
                }
                for (g = i.parentNode; g && g != c; g = g.parentNode) {
                    h = g[e];
                    if (h) {
                        return h
                    }
                }
            }
        }
    }

    this.current = function () {
        return b
    };
    this.next = function (e) {
        return(b = d(b, "firstChild", "nextSibling", e))
    };
    this.prev = function (e) {
        return(b = d(b, "lastChild", "previousSibling", e))
    }
};
(function (a) {
    a.dom.RangeUtils = function (c) {
        var b = "\uFEFF";
        this.walk = function (d, s) {
            var i = d.startContainer, l = d.startOffset, t = d.endContainer, m = d.endOffset, j, g, o, h, r, q, e;
            e = c.select("td.mceSelected,th.mceSelected");
            if (e.length > 0) {
                a.each(e, function (u) {
                    s([u])
                });
                return
            }
            function f(u) {
                var v;
                v = u[0];
                if (v.nodeType === 3 && v === i && l >= v.nodeValue.length) {
                    u.splice(0, 1)
                }
                v = u[u.length - 1];
                if (m === 0 && u.length > 0 && v === t && v.nodeType === 3) {
                    u.splice(u.length - 1, 1)
                }
                return u
            }

            function p(x, v, u) {
                var y = [];
                for (; x && x != u; x = x[v]) {
                    y.push(x)
                }
                return y
            }

            function n(v, u) {
                do {
                    if (v.parentNode == u) {
                        return v
                    }
                    v = v.parentNode
                } while (v)
            }

            function k(x, v, y) {
                var u = y ? "nextSibling" : "previousSibling";
                for (h = x, r = h.parentNode; h && h != v; h = r) {
                    r = h.parentNode;
                    q = p(h == x ? h : h[u], u);
                    if (q.length) {
                        if (!y) {
                            q.reverse()
                        }
                        s(f(q))
                    }
                }
            }

            if (i.nodeType == 1 && i.hasChildNodes()) {
                i = i.childNodes[l]
            }
            if (t.nodeType == 1 && t.hasChildNodes()) {
                t = t.childNodes[Math.min(m - 1, t.childNodes.length - 1)]
            }
            if (i == t) {
                return s(f([i]))
            }
            j = c.findCommonAncestor(i, t);
            for (h = i; h; h = h.parentNode) {
                if (h === t) {
                    return k(i, j, true)
                }
                if (h === j) {
                    break
                }
            }
            for (h = t; h; h = h.parentNode) {
                if (h === i) {
                    return k(t, j)
                }
                if (h === j) {
                    break
                }
            }
            g = n(i, j) || i;
            o = n(t, j) || t;
            k(i, g, true);
            q = p(g == i ? g : g.nextSibling, "nextSibling", o == t ? o.nextSibling : o);
            if (q.length) {
                s(f(q))
            }
            k(t, o)
        };
        this.split = function (e) {
            var h = e.startContainer, d = e.startOffset, i = e.endContainer, g = e.endOffset;

            function f(j, k) {
                return j.splitText(k)
            }

            if (h == i && h.nodeType == 3) {
                if (d > 0 && d < h.nodeValue.length) {
                    i = f(h, d);
                    h = i.previousSibling;
                    if (g > d) {
                        g = g - d;
                        h = i = f(i, g).previousSibling;
                        g = i.nodeValue.length;
                        d = 0
                    } else {
                        g = 0
                    }
                }
            } else {
                if (h.nodeType == 3 && d > 0 && d < h.nodeValue.length) {
                    h = f(h, d);
                    d = 0
                }
                if (i.nodeType == 3 && g > 0 && g < i.nodeValue.length) {
                    i = f(i, g).previousSibling;
                    g = i.nodeValue.length
                }
            }
            return{startContainer:h, startOffset:d, endContainer:i, endOffset:g}
        }
    };
    a.dom.RangeUtils.compareRanges = function (c, b) {
        if (c && b) {
            if (c.item || c.duplicate) {
                if (c.item && b.item && c.item(0) === b.item(0)) {
                    return true
                }
                if (c.isEqual && b.isEqual && b.isEqual(c)) {
                    return true
                }
            } else {
                return c.startContainer == b.startContainer && c.startOffset == b.startOffset
            }
        }
        return false
    }
})(tinymce);
(function (b) {
    var a = b.dom.Event, c = b.each;
    b.create("tinymce.ui.KeyboardNavigation", {KeyboardNavigation:function (e, f) {
        var p = this, m = e.root, l = e.items, n = e.enableUpDown, i = e.enableLeftRight || !e.enableUpDown, k = e.excludeFromTabOrder, j, h, o, d, g;
        f = f || b.DOM;
        j = function (q) {
            g = q.target.id
        };
        h = function (q) {
            f.setAttrib(q.target.id, "tabindex", "-1")
        };
        d = function (q) {
            var r = f.get(g);
            f.setAttrib(r, "tabindex", "0");
            r.focus()
        };
        p.focus = function () {
            f.get(g).focus()
        };
        p.destroy = function () {
            c(l, function (q) {
                f.unbind(f.get(q.id), "focus", j);
                f.unbind(f.get(q.id), "blur", h)
            });
            f.unbind(f.get(m), "focus", d);
            f.unbind(f.get(m), "keydown", o);
            l = f = m = p.focus = j = h = o = d = null;
            p.destroy = function () {
            }
        };
        p.moveFocus = function (u, r) {
            var q = -1, t = p.controls, s;
            if (!g) {
                return
            }
            c(l, function (x, v) {
                if (x.id === g) {
                    q = v;
                    return false
                }
            });
            q += u;
            if (q < 0) {
                q = l.length - 1
            } else {
                if (q >= l.length) {
                    q = 0
                }
            }
            s = l[q];
            f.setAttrib(g, "tabindex", "-1");
            f.setAttrib(s.id, "tabindex", "0");
            f.get(s.id).focus();
            if (e.actOnFocus) {
                e.onAction(s.id)
            }
            if (r) {
                a.cancel(r)
            }
        };
        o = function (y) {
            var u = 37, t = 39, x = 38, z = 40, q = 27, s = 14, r = 13, v = 32;
            switch (y.keyCode) {
                case u:
                    if (i) {
                        p.moveFocus(-1)
                    }
                    break;
                case t:
                    if (i) {
                        p.moveFocus(1)
                    }
                    break;
                case x:
                    if (n) {
                        p.moveFocus(-1)
                    }
                    break;
                case z:
                    if (n) {
                        p.moveFocus(1)
                    }
                    break;
                case q:
                    if (e.onCancel) {
                        e.onCancel();
                        a.cancel(y)
                    }
                    break;
                case s:
                case r:
                case v:
                    if (e.onAction) {
                        e.onAction(g);
                        a.cancel(y)
                    }
                    break
            }
        };
        c(l, function (s, q) {
            var r;
            if (!s.id) {
                s.id = f.uniqueId("_mce_item_")
            }
            if (k) {
                f.bind(s.id, "blur", h);
                r = "-1"
            } else {
                r = (q === 0 ? "0" : "-1")
            }
            f.setAttrib(s.id, "tabindex", r);
            f.bind(f.get(s.id), "focus", j)
        });
        if (l[0]) {
            g = l[0].id
        }
        f.setAttrib(m, "tabindex", "-1");
        f.bind(f.get(m), "focus", d);
        f.bind(f.get(m), "keydown", o)
    }})
})(tinymce);
(function (c) {
    var b = c.DOM, a = c.is;
    c.create("tinymce.ui.Control", {Control:function (f, e, d) {
        this.id = f;
        this.settings = e = e || {};
        this.rendered = false;
        this.onRender = new c.util.Dispatcher(this);
        this.classPrefix = "";
        this.scope = e.scope || this;
        this.disabled = 0;
        this.active = 0;
        this.editor = d
    }, setAriaProperty:function (f, e) {
        var d = b.get(this.id + "_aria") || b.get(this.id);
        if (d) {
            b.setAttrib(d, "aria-" + f, !!e)
        }
    }, focus:function () {
        b.get(this.id).focus()
    }, setDisabled:function (d) {
        if (d != this.disabled) {
            this.setAriaProperty("disabled", d);
            this.setState("Disabled", d);
            this.setState("Enabled", !d);
            this.disabled = d
        }
    }, isDisabled:function () {
        return this.disabled
    }, setActive:function (d) {
        if (d != this.active) {
            this.setState("Active", d);
            this.active = d;
            this.setAriaProperty("pressed", d)
        }
    }, isActive:function () {
        return this.active
    }, setState:function (f, d) {
        var e = b.get(this.id);
        f = this.classPrefix + f;
        if (d) {
            b.addClass(e, f)
        } else {
            b.removeClass(e, f)
        }
    }, isRendered:function () {
        return this.rendered
    }, renderHTML:function () {
    }, renderTo:function (d) {
        b.setHTML(d, this.renderHTML())
    }, postRender:function () {
        var e = this, d;
        if (a(e.disabled)) {
            d = e.disabled;
            e.disabled = -1;
            e.setDisabled(d)
        }
        if (a(e.active)) {
            d = e.active;
            e.active = -1;
            e.setActive(d)
        }
    }, remove:function () {
        b.remove(this.id);
        this.destroy()
    }, destroy:function () {
        c.dom.Event.clear(this.id)
    }})
})(tinymce);
tinymce.create("tinymce.ui.Container:tinymce.ui.Control", {Container:function (c, b, a) {
    this.parent(c, b, a);
    this.controls = [];
    this.lookup = {}
}, add:function (a) {
    this.lookup[a.id] = a;
    this.controls.push(a);
    return a
}, get:function (a) {
    return this.lookup[a]
}});
tinymce.create("tinymce.ui.Separator:tinymce.ui.Control", {Separator:function (b, a) {
    this.parent(b, a);
    this.classPrefix = "mceSeparator";
    this.setDisabled(true)
}, renderHTML:function () {
    return tinymce.DOM.createHTML("span", {"class":this.classPrefix, role:"separator", "aria-orientation":"vertical", tabindex:"-1"})
}});
(function (d) {
    var c = d.is, b = d.DOM, e = d.each, a = d.walk;
    d.create("tinymce.ui.MenuItem:tinymce.ui.Control", {MenuItem:function (g, f) {
        this.parent(g, f);
        this.classPrefix = "mceMenuItem"
    }, setSelected:function (f) {
        this.setState("Selected", f);
        this.setAriaProperty("checked", !!f);
        this.selected = f
    }, isSelected:function () {
        return this.selected
    }, postRender:function () {
        var f = this;
        f.parent();
        if (c(f.selected)) {
            f.setSelected(f.selected)
        }
    }})
})(tinymce);
(function (d) {
    var c = d.is, b = d.DOM, e = d.each, a = d.walk;
    d.create("tinymce.ui.Menu:tinymce.ui.MenuItem", {Menu:function (h, g) {
        var f = this;
        f.parent(h, g);
        f.items = {};
        f.collapsed = false;
        f.menuCount = 0;
        f.onAddItem = new d.util.Dispatcher(this)
    }, expand:function (g) {
        var f = this;
        if (g) {
            a(f, function (h) {
                if (h.expand) {
                    h.expand()
                }
            }, "items", f)
        }
        f.collapsed = false
    }, collapse:function (g) {
        var f = this;
        if (g) {
            a(f, function (h) {
                if (h.collapse) {
                    h.collapse()
                }
            }, "items", f)
        }
        f.collapsed = true
    }, isCollapsed:function () {
        return this.collapsed
    }, add:function (f) {
        if (!f.settings) {
            f = new d.ui.MenuItem(f.id || b.uniqueId(), f)
        }
        this.onAddItem.dispatch(this, f);
        return this.items[f.id] = f
    }, addSeparator:function () {
        return this.add({separator:true})
    }, addMenu:function (f) {
        if (!f.collapse) {
            f = this.createMenu(f)
        }
        this.menuCount++;
        return this.add(f)
    }, hasMenus:function () {
        return this.menuCount !== 0
    }, remove:function (f) {
        delete this.items[f.id]
    }, removeAll:function () {
        var f = this;
        a(f, function (g) {
            if (g.removeAll) {
                g.removeAll()
            } else {
                g.remove()
            }
            g.destroy()
        }, "items", f);
        f.items = {}
    }, createMenu:function (g) {
        var f = new d.ui.Menu(g.id || b.uniqueId(), g);
        f.onAddItem.add(this.onAddItem.dispatch, this.onAddItem);
        return f
    }})
})(tinymce);
(function (e) {
    var d = e.is, c = e.DOM, f = e.each, a = e.dom.Event, b = e.dom.Element;
    e.create("tinymce.ui.DropMenu:tinymce.ui.Menu", {DropMenu:function (h, g) {
        g = g || {};
        g.container = g.container || c.doc.body;
        g.offset_x = g.offset_x || 0;
        g.offset_y = g.offset_y || 0;
        g.vp_offset_x = g.vp_offset_x || 0;
        g.vp_offset_y = g.vp_offset_y || 0;
        if (d(g.icons) && !g.icons) {
            g["class"] += " mceNoIcons"
        }
        this.parent(h, g);
        this.onShowMenu = new e.util.Dispatcher(this);
        this.onHideMenu = new e.util.Dispatcher(this);
        this.classPrefix = "mceMenu"
    }, createMenu:function (j) {
        var h = this, i = h.settings, g;
        j.container = j.container || i.container;
        j.parent = h;
        j.constrain = j.constrain || i.constrain;
        j["class"] = j["class"] || i["class"];
        j.vp_offset_x = j.vp_offset_x || i.vp_offset_x;
        j.vp_offset_y = j.vp_offset_y || i.vp_offset_y;
        j.keyboard_focus = i.keyboard_focus;
        g = new e.ui.DropMenu(j.id || c.uniqueId(), j);
        g.onAddItem.add(h.onAddItem.dispatch, h.onAddItem);
        return g
    }, focus:function () {
        var g = this;
        if (g.keyboardNav) {
            g.keyboardNav.focus()
        }
    }, update:function () {
        var i = this, j = i.settings, g = c.get("menu_" + i.id + "_tbl"), l = c.get("menu_" + i.id + "_co"), h, k;
        h = j.max_width ? Math.min(g.clientWidth, j.max_width) : g.clientWidth;
        k = j.max_height ? Math.min(g.clientHeight, j.max_height) : g.clientHeight;
        if (!c.boxModel) {
            i.element.setStyles({width:h + 2, height:k + 2})
        } else {
            i.element.setStyles({width:h, height:k})
        }
        if (j.max_width) {
            c.setStyle(l, "width", h)
        }
        if (j.max_height) {
            c.setStyle(l, "height", k);
            if (g.clientHeight < j.max_height) {
                c.setStyle(l, "overflow", "hidden")
            }
        }
    }, showMenu:function (p, n, r) {
        var z = this, A = z.settings, o, g = c.getViewPort(), u, l, v, q, i = 2, k, j, m = z.classPrefix;
        z.collapse(1);
        if (z.isMenuVisible) {
            return
        }
        if (!z.rendered) {
            o = c.add(z.settings.container, z.renderNode());
            f(z.items, function (h) {
                h.postRender()
            });
            z.element = new b("menu_" + z.id, {blocker:1, container:A.container})
        } else {
            o = c.get("menu_" + z.id)
        }
        if (!e.isOpera) {
            c.setStyles(o, {left:-65535, top:-65535})
        }
        c.show(o);
        z.update();
        p += A.offset_x || 0;
        n += A.offset_y || 0;
        g.w -= 4;
        g.h -= 4;
        if (A.constrain) {
            u = o.clientWidth - i;
            l = o.clientHeight - i;
            v = g.x + g.w;
            q = g.y + g.h;
            if ((p + A.vp_offset_x + u) > v) {
                p = r ? r - u : Math.max(0, (v - A.vp_offset_x) - u)
            }
            if ((n + A.vp_offset_y + l) > q) {
                n = Math.max(0, (q - A.vp_offset_y) - l)
            }
        }
        c.setStyles(o, {left:p, top:n});
        z.element.update();
        z.isMenuVisible = 1;
        z.mouseClickFunc = a.add(o, "click", function (s) {
            var h;
            s = s.target;
            if (s && (s = c.getParent(s, "tr")) && !c.hasClass(s, m + "ItemSub")) {
                h = z.items[s.id];
                if (h.isDisabled()) {
                    return
                }
                k = z;
                while (k) {
                    if (k.hideMenu) {
                        k.hideMenu()
                    }
                    k = k.settings.parent
                }
                if (h.settings.onclick) {
                    h.settings.onclick(s)
                }
                return false
            }
        });
        if (z.hasMenus()) {
            z.mouseOverFunc = a.add(o, "mouseover", function (x) {
                var h, t, s;
                x = x.target;
                if (x && (x = c.getParent(x, "tr"))) {
                    h = z.items[x.id];
                    if (z.lastMenu) {
                        z.lastMenu.collapse(1)
                    }
                    if (h.isDisabled()) {
                        return
                    }
                    if (x && c.hasClass(x, m + "ItemSub")) {
                        t = c.getRect(x);
                        h.showMenu((t.x + t.w - i), t.y - i, t.x);
                        z.lastMenu = h;
                        c.addClass(c.get(h.id).firstChild, m + "ItemActive")
                    }
                }
            })
        }
        a.add(o, "keydown", z._keyHandler, z);
        z.onShowMenu.dispatch(z);
        if (A.keyboard_focus) {
            z._setupKeyboardNav()
        }
    }, hideMenu:function (j) {
        var g = this, i = c.get("menu_" + g.id), h;
        if (!g.isMenuVisible) {
            return
        }
        if (g.keyboardNav) {
            g.keyboardNav.destroy()
        }
        a.remove(i, "mouseover", g.mouseOverFunc);
        a.remove(i, "click", g.mouseClickFunc);
        a.remove(i, "keydown", g._keyHandler);
        c.hide(i);
        g.isMenuVisible = 0;
        if (!j) {
            g.collapse(1)
        }
        if (g.element) {
            g.element.hide()
        }
        if (h = c.get(g.id)) {
            c.removeClass(h.firstChild, g.classPrefix + "ItemActive")
        }
        g.onHideMenu.dispatch(g)
    }, add:function (i) {
        var g = this, h;
        i = g.parent(i);
        if (g.isRendered && (h = c.get("menu_" + g.id))) {
            g._add(c.select("tbody", h)[0], i)
        }
        return i
    }, collapse:function (g) {
        this.parent(g);
        this.hideMenu(1)
    }, remove:function (g) {
        c.remove(g.id);
        this.destroy();
        return this.parent(g)
    }, destroy:function () {
        var g = this, h = c.get("menu_" + g.id);
        if (g.keyboardNav) {
            g.keyboardNav.destroy()
        }
        a.remove(h, "mouseover", g.mouseOverFunc);
        a.remove(c.select("a", h), "focus", g.mouseOverFunc);
        a.remove(h, "click", g.mouseClickFunc);
        a.remove(h, "keydown", g._keyHandler);
        if (g.element) {
            g.element.remove()
        }
        c.remove(h)
    }, renderNode:function () {
        var i = this, j = i.settings, l, h, k, g;
        g = c.create("div", {role:"listbox", id:"menu_" + i.id, "class":j["class"], style:"position:absolute;left:0;top:0;z-index:200000;outline:0"});
        if (i.settings.parent) {
            c.setAttrib(g, "aria-parent", "menu_" + i.settings.parent.id)
        }
        k = c.add(g, "div", {role:"presentation", id:"menu_" + i.id + "_co", "class":i.classPrefix + (j["class"] ? " " + j["class"] : "")});
        i.element = new b("menu_" + i.id, {blocker:1, container:j.container});
        if (j.menu_line) {
            c.add(k, "span", {"class":i.classPrefix + "Line"})
        }
        l = c.add(k, "table", {role:"presentation", id:"menu_" + i.id + "_tbl", border:0, cellPadding:0, cellSpacing:0});
        h = c.add(l, "tbody");
        f(i.items, function (m) {
            i._add(h, m)
        });
        i.rendered = true;
        return g
    }, _setupKeyboardNav:function () {
        var i, h, g = this;
        i = c.get("menu_" + g.id);
        h = c.select("a[role=option]", "menu_" + g.id);
        h.splice(0, 0, i);
        g.keyboardNav = new e.ui.KeyboardNavigation({root:"menu_" + g.id, items:h, onCancel:function () {
            g.hideMenu()
        }, enableUpDown:true});
        i.focus()
    }, _keyHandler:function (g) {
        var h = this, i;
        switch (g.keyCode) {
            case 37:
                if (h.settings.parent) {
                    h.hideMenu();
                    h.settings.parent.focus();
                    a.cancel(g)
                }
                break;
            case 39:
                if (h.mouseOverFunc) {
                    h.mouseOverFunc(g)
                }
                break
        }
    }, _add:function (j, h) {
        var i, q = h.settings, p, l, k, m = this.classPrefix, g;
        if (q.separator) {
            l = c.add(j, "tr", {id:h.id, "class":m + "ItemSeparator"});
            c.add(l, "td", {"class":m + "ItemSeparator"});
            if (i = l.previousSibling) {
                c.addClass(i, "mceLast")
            }
            return
        }
        i = l = c.add(j, "tr", {id:h.id, "class":m + "Item " + m + "ItemEnabled"});
        i = k = c.add(i, q.titleItem ? "th" : "td");
        i = p = c.add(i, "a", {id:h.id + "_aria", role:q.titleItem ? "presentation" : "option", href:"javascript:;", onclick:"return false;", onmousedown:"return false;"});
        if (q.parent) {
            c.setAttrib(p, "aria-haspopup", "true");
            c.setAttrib(p, "aria-owns", "menu_" + h.id)
        }
        c.addClass(k, q["class"]);
        g = c.add(i, "span", {"class":"mceIcon" + (q.icon ? " mce_" + q.icon : "")});
        if (q.icon_src) {
            c.add(g, "img", {src:q.icon_src})
        }
        i = c.add(i, q.element || "span", {"class":"mceText", title:h.settings.title}, h.settings.title);
        if (h.settings.style) {
            if (typeof h.settings.style == "function") {
                h.settings.style = h.settings.style()
            }
            c.setAttrib(i, "style", h.settings.style)
        }
        if (j.childNodes.length == 1) {
            c.addClass(l, "mceFirst")
        }
        if ((i = l.previousSibling) && c.hasClass(i, m + "ItemSeparator")) {
            c.addClass(l, "mceFirst")
        }
        if (h.collapse) {
            c.addClass(l, m + "ItemSub")
        }
        if (i = l.previousSibling) {
            c.removeClass(i, "mceLast")
        }
        c.addClass(l, "mceLast")
    }})
})(tinymce);
(function (b) {
    var a = b.DOM;
    b.create("tinymce.ui.Button:tinymce.ui.Control", {Button:function (e, d, c) {
        this.parent(e, d, c);
        this.classPrefix = "mceButton"
    }, renderHTML:function () {
        var f = this.classPrefix, e = this.settings, d, c;
        c = a.encode(e.label || "");
        d = '<a role="button" id="' + this.id + '" href="javascript:;" class="' + f + " " + f + "Enabled " + e["class"] + (c ? " " + f + "Labeled" : "") + '" onmousedown="return false;" onclick="return false;" aria-labelledby="' + this.id + '_voice" title="' + a.encode(e.title) + '">';
        if (e.image && !(this.editor && this.editor.forcedHighContrastMode)) {
            d += '<img class="mceIcon" src="' + e.image + '" alt="' + a.encode(e.title) + '" />' + c
        } else {
            d += '<span class="mceIcon ' + e["class"] + '"></span>' + (c ? '<span class="' + f + 'Label">' + c + "</span>" : "")
        }
        d += '<span class="mceVoiceLabel mceIconOnly" style="display: none;" id="' + this.id + '_voice">' + e.title + "</span>";
        d += "</a>";
        return d
    }, postRender:function () {
        var d = this, e = d.settings, c;
        if (b.isIE && d.editor) {
            b.dom.Event.add(d.id, "mousedown", function (f) {
                var g = d.editor.selection.getNode().nodeName;
                c = g === "IMG" ? d.editor.selection.getBookmark() : null
            })
        }
        b.dom.Event.add(d.id, "click", function (f) {
            if (!d.isDisabled()) {
                if (b.isIE && d.editor && c !== null) {
                    d.editor.selection.moveToBookmark(c)
                }
                return e.onclick.call(e.scope, f)
            }
        });
        b.dom.Event.add(d.id, "keyup", function (f) {
            if (!d.isDisabled() && f.keyCode == b.VK.SPACEBAR) {
                return e.onclick.call(e.scope, f)
            }
        })
    }})
})(tinymce);
(function (d) {
    var c = d.DOM, b = d.dom.Event, e = d.each, a = d.util.Dispatcher;
    d.create("tinymce.ui.ListBox:tinymce.ui.Control", {ListBox:function (i, h, f) {
        var g = this;
        g.parent(i, h, f);
        g.items = [];
        g.onChange = new a(g);
        g.onPostRender = new a(g);
        g.onAdd = new a(g);
        g.onRenderMenu = new d.util.Dispatcher(this);
        g.classPrefix = "mceListBox";
        g.marked = {}
    }, select:function (h) {
        var g = this, j, i;
        g.marked = {};
        if (h == undefined) {
            return g.selectByIndex(-1)
        }
        if (h && typeof(h) == "function") {
            i = h
        } else {
            i = function (f) {
                return f == h
            }
        }
        if (h != g.selectedValue) {
            e(g.items, function (k, f) {
                if (i(k.value)) {
                    j = 1;
                    g.selectByIndex(f);
                    return false
                }
            });
            if (!j) {
                g.selectByIndex(-1)
            }
        }
    }, selectByIndex:function (f) {
        var h = this, i, j, g;
        h.marked = {};
        if (f != h.selectedIndex) {
            i = c.get(h.id + "_text");
            g = c.get(h.id + "_voiceDesc");
            j = h.items[f];
            if (j) {
                h.selectedValue = j.value;
                h.selectedIndex = f;
                c.setHTML(i, c.encode(j.title));
                c.setHTML(g, h.settings.title + " - " + j.title);
                c.removeClass(i, "mceTitle");
                c.setAttrib(h.id, "aria-valuenow", j.title)
            } else {
                c.setHTML(i, c.encode(h.settings.title));
                c.setHTML(g, c.encode(h.settings.title));
                c.addClass(i, "mceTitle");
                h.selectedValue = h.selectedIndex = null;
                c.setAttrib(h.id, "aria-valuenow", h.settings.title)
            }
            i = 0
        }
    }, mark:function (f) {
        this.marked[f] = true
    }, add:function (i, f, h) {
        var g = this;
        h = h || {};
        h = d.extend(h, {title:i, value:f});
        g.items.push(h);
        g.onAdd.dispatch(g, h)
    }, getLength:function () {
        return this.items.length
    }, renderHTML:function () {
        var i = "", f = this, g = f.settings, j = f.classPrefix;
        i = '<span role="listbox" aria-haspopup="true" aria-labelledby="' + f.id + '_voiceDesc" aria-describedby="' + f.id + '_voiceDesc"><table role="presentation" tabindex="0" id="' + f.id + '" cellpadding="0" cellspacing="0" class="' + j + " " + j + "Enabled" + (g["class"] ? (" " + g["class"]) : "") + '"><tbody><tr>';
        i += "<td>" + c.createHTML("span", {id:f.id + "_voiceDesc", "class":"voiceLabel", style:"display:none;"}, f.settings.title);
        i += c.createHTML("a", {id:f.id + "_text", tabindex:-1, href:"javascript:;", "class":"mceText", onclick:"return false;", onmousedown:"return false;"}, c.encode(f.settings.title)) + "</td>";
        i += "<td>" + c.createHTML("a", {id:f.id + "_open", tabindex:-1, href:"javascript:;", "class":"mceOpen", onclick:"return false;", onmousedown:"return false;"}, '<span><span style="display:none;" class="mceIconOnly" aria-hidden="true">\u25BC</span></span>') + "</td>";
        i += "</tr></tbody></table></span>";
        return i
    }, showMenu:function () {
        var g = this, i, h = c.get(this.id), f;
        if (g.isDisabled() || g.items.length == 0) {
            return
        }
        if (g.menu && g.menu.isMenuVisible) {
            return g.hideMenu()
        }
        if (!g.isMenuRendered) {
            g.renderMenu();
            g.isMenuRendered = true
        }
        i = c.getPos(h);
        f = g.menu;
        f.settings.offset_x = i.x;
        f.settings.offset_y = i.y;
        f.settings.keyboard_focus = !d.isOpera;
        e(g.items, function (j) {
            if (f.items[j.id]) {
                f.items[j.id].setSelected(0)
            }
        });
        e(g.items, function (j) {
            if (f.items[j.id] && g.marked[j.value]) {
                f.items[j.id].setSelected(1)
            }
            if (j.value === g.selectedValue) {
                f.items[j.id].setSelected(1)
            }
        });
        f.showMenu(0, h.clientHeight);
        b.add(c.doc, "mousedown", g.hideMenu, g);
        c.addClass(g.id, g.classPrefix + "Selected")
    }, hideMenu:function (g) {
        var f = this;
        if (f.menu && f.menu.isMenuVisible) {
            c.removeClass(f.id, f.classPrefix + "Selected");
            if (g && g.type == "mousedown" && (g.target.id == f.id + "_text" || g.target.id == f.id + "_open")) {
                return
            }
            if (!g || !c.getParent(g.target, ".mceMenu")) {
                c.removeClass(f.id, f.classPrefix + "Selected");
                b.remove(c.doc, "mousedown", f.hideMenu, f);
                f.menu.hideMenu()
            }
        }
    }, renderMenu:function () {
        var g = this, f;
        f = g.settings.control_manager.createDropMenu(g.id + "_menu", {menu_line:1, "class":g.classPrefix + "Menu mceNoIcons", max_width:150, max_height:150});
        f.onHideMenu.add(function () {
            g.hideMenu();
            g.focus()
        });
        f.add({title:g.settings.title, "class":"mceMenuItemTitle", onclick:function () {
            if (g.settings.onselect("") !== false) {
                g.select("")
            }
        }});
        e(g.items, function (h) {
            if (h.value === undefined) {
                f.add({title:h.title, role:"option", "class":"mceMenuItemTitle", onclick:function () {
                    if (g.settings.onselect("") !== false) {
                        g.select("")
                    }
                }})
            } else {
                h.id = c.uniqueId();
                h.role = "option";
                h.onclick = function () {
                    if (g.settings.onselect(h.value) !== false) {
                        g.select(h.value)
                    }
                };
                f.add(h)
            }
        });
        g.onRenderMenu.dispatch(g, f);
        g.menu = f
    }, postRender:function () {
        var f = this, g = f.classPrefix;
        b.add(f.id, "click", f.showMenu, f);
        b.add(f.id, "keydown", function (h) {
            if (h.keyCode == 32) {
                f.showMenu(h);
                b.cancel(h)
            }
        });
        b.add(f.id, "focus", function () {
            if (!f._focused) {
                f.keyDownHandler = b.add(f.id, "keydown", function (h) {
                    if (h.keyCode == 40) {
                        f.showMenu();
                        b.cancel(h)
                    }
                });
                f.keyPressHandler = b.add(f.id, "keypress", function (i) {
                    var h;
                    if (i.keyCode == 13) {
                        h = f.selectedValue;
                        f.selectedValue = null;
                        b.cancel(i);
                        f.settings.onselect(h)
                    }
                })
            }
            f._focused = 1
        });
        b.add(f.id, "blur", function () {
            b.remove(f.id, "keydown", f.keyDownHandler);
            b.remove(f.id, "keypress", f.keyPressHandler);
            f._focused = 0
        });
        if (d.isIE6 || !c.boxModel) {
            b.add(f.id, "mouseover", function () {
                if (!c.hasClass(f.id, g + "Disabled")) {
                    c.addClass(f.id, g + "Hover")
                }
            });
            b.add(f.id, "mouseout", function () {
                if (!c.hasClass(f.id, g + "Disabled")) {
                    c.removeClass(f.id, g + "Hover")
                }
            })
        }
        f.onPostRender.dispatch(f, c.get(f.id))
    }, destroy:function () {
        this.parent();
        b.clear(this.id + "_text");
        b.clear(this.id + "_open")
    }})
})(tinymce);
(function (d) {
    var c = d.DOM, b = d.dom.Event, e = d.each, a = d.util.Dispatcher;
    d.create("tinymce.ui.NativeListBox:tinymce.ui.ListBox", {NativeListBox:function (g, f) {
        this.parent(g, f);
        this.classPrefix = "mceNativeListBox"
    }, setDisabled:function (f) {
        c.get(this.id).disabled = f;
        this.setAriaProperty("disabled", f)
    }, isDisabled:function () {
        return c.get(this.id).disabled
    }, select:function (h) {
        var g = this, j, i;
        if (h == undefined) {
            return g.selectByIndex(-1)
        }
        if (h && typeof(h) == "function") {
            i = h
        } else {
            i = function (f) {
                return f == h
            }
        }
        if (h != g.selectedValue) {
            e(g.items, function (k, f) {
                if (i(k.value)) {
                    j = 1;
                    g.selectByIndex(f);
                    return false
                }
            });
            if (!j) {
                g.selectByIndex(-1)
            }
        }
    }, selectByIndex:function (f) {
        c.get(this.id).selectedIndex = f + 1;
        this.selectedValue = this.items[f] ? this.items[f].value : null
    }, add:function (j, g, f) {
        var i, h = this;
        f = f || {};
        f.value = g;
        if (h.isRendered()) {
            c.add(c.get(this.id), "option", f, j)
        }
        i = {title:j, value:g, attribs:f};
        h.items.push(i);
        h.onAdd.dispatch(h, i)
    }, getLength:function () {
        return this.items.length
    }, renderHTML:function () {
        var g, f = this;
        g = c.createHTML("option", {value:""}, "-- " + f.settings.title + " --");
        e(f.items, function (h) {
            g += c.createHTML("option", {value:h.value}, h.title)
        });
        g = c.createHTML("select", {id:f.id, "class":"mceNativeListBox", "aria-labelledby":f.id + "_aria"}, g);
        g += c.createHTML("span", {id:f.id + "_aria", style:"display: none"}, f.settings.title);
        return g
    }, postRender:function () {
        var g = this, h, i = true;
        g.rendered = true;
        function f(k) {
            var j = g.items[k.target.selectedIndex - 1];
            if (j && (j = j.value)) {
                g.onChange.dispatch(g, j);
                if (g.settings.onselect) {
                    g.settings.onselect(j)
                }
            }
        }

        b.add(g.id, "change", f);
        b.add(g.id, "keydown", function (k) {
            var j;
            b.remove(g.id, "change", h);
            i = false;
            j = b.add(g.id, "blur", function () {
                if (i) {
                    return
                }
                i = true;
                b.add(g.id, "change", f);
                b.remove(g.id, "blur", j)
            });
            if (d.isWebKit && (k.keyCode == 37 || k.keyCode == 39)) {
                return b.prevent(k)
            }
            if (k.keyCode == 13 || k.keyCode == 32) {
                f(k);
                return b.cancel(k)
            }
        });
        g.onPostRender.dispatch(g, c.get(g.id))
    }})
})(tinymce);
(function (c) {
    var b = c.DOM, a = c.dom.Event, d = c.each;
    c.create("tinymce.ui.MenuButton:tinymce.ui.Button", {MenuButton:function (g, f, e) {
        this.parent(g, f, e);
        this.onRenderMenu = new c.util.Dispatcher(this);
        f.menu_container = f.menu_container || b.doc.body
    }, showMenu:function () {
        var g = this, j, i, h = b.get(g.id), f;
        if (g.isDisabled()) {
            return
        }
        if (!g.isMenuRendered) {
            g.renderMenu();
            g.isMenuRendered = true
        }
        if (g.isMenuVisible) {
            return g.hideMenu()
        }
        j = b.getPos(g.settings.menu_container);
        i = b.getPos(h);
        f = g.menu;
        f.settings.offset_x = i.x;
        f.settings.offset_y = i.y;
        f.settings.vp_offset_x = i.x;
        f.settings.vp_offset_y = i.y;
        f.settings.keyboard_focus = g._focused;
        f.showMenu(0, h.clientHeight);
        a.add(b.doc, "mousedown", g.hideMenu, g);
        g.setState("Selected", 1);
        g.isMenuVisible = 1
    }, renderMenu:function () {
        var f = this, e;
        e = f.settings.control_manager.createDropMenu(f.id + "_menu", {menu_line:1, "class":this.classPrefix + "Menu", icons:f.settings.icons});
        e.onHideMenu.add(function () {
            f.hideMenu();
            f.focus()
        });
        f.onRenderMenu.dispatch(f, e);
        f.menu = e
    }, hideMenu:function (g) {
        var f = this;
        if (g && g.type == "mousedown" && b.getParent(g.target, function (h) {
            return h.id === f.id || h.id === f.id + "_open"
        })) {
            return
        }
        if (!g || !b.getParent(g.target, ".mceMenu")) {
            f.setState("Selected", 0);
            a.remove(b.doc, "mousedown", f.hideMenu, f);
            if (f.menu) {
                f.menu.hideMenu()
            }
        }
        f.isMenuVisible = 0
    }, postRender:function () {
        var e = this, f = e.settings;
        a.add(e.id, "click", function () {
            if (!e.isDisabled()) {
                if (f.onclick) {
                    f.onclick(e.value)
                }
                e.showMenu()
            }
        })
    }})
})(tinymce);
(function (c) {
    var b = c.DOM, a = c.dom.Event, d = c.each;
    c.create("tinymce.ui.SplitButton:tinymce.ui.MenuButton", {SplitButton:function (g, f, e) {
        this.parent(g, f, e);
        this.classPrefix = "mceSplitButton"
    }, renderHTML:function () {
        var i, f = this, g = f.settings, e;
        i = "<tbody><tr>";
        if (g.image) {
            e = b.createHTML("img ", {src:g.image, role:"presentation", "class":"mceAction " + g["class"]})
        } else {
            e = b.createHTML("span", {"class":"mceAction " + g["class"]}, "")
        }
        e += b.createHTML("span", {"class":"mceVoiceLabel mceIconOnly", id:f.id + "_voice", style:"display:none;"}, g.title);
        i += "<td >" + b.createHTML("a", {role:"button", id:f.id + "_action", tabindex:"-1", href:"javascript:;", "class":"mceAction " + g["class"], onclick:"return false;", onmousedown:"return false;", title:g.title}, e) + "</td>";
        e = b.createHTML("span", {"class":"mceOpen " + g["class"]}, '<span style="display:none;" class="mceIconOnly" aria-hidden="true">\u25BC</span>');
        i += "<td >" + b.createHTML("a", {role:"button", id:f.id + "_open", tabindex:"-1", href:"javascript:;", "class":"mceOpen " + g["class"], onclick:"return false;", onmousedown:"return false;", title:g.title}, e) + "</td>";
        i += "</tr></tbody>";
        i = b.createHTML("table", {role:"presentation", "class":"mceSplitButton mceSplitButtonEnabled " + g["class"], cellpadding:"0", cellspacing:"0", title:g.title}, i);
        return b.createHTML("div", {id:f.id, role:"button", tabindex:"0", "aria-labelledby":f.id + "_voice", "aria-haspopup":"true"}, i)
    }, postRender:function () {
        var e = this, g = e.settings, f;
        if (g.onclick) {
            f = function (h) {
                if (!e.isDisabled()) {
                    g.onclick(e.value);
                    a.cancel(h)
                }
            };
            a.add(e.id + "_action", "click", f);
            a.add(e.id, ["click", "keydown"], function (h) {
                var k = 32, m = 14, i = 13, j = 38, l = 40;
                if ((h.keyCode === 32 || h.keyCode === 13 || h.keyCode === 14) && !h.altKey && !h.ctrlKey && !h.metaKey) {
                    f();
                    a.cancel(h)
                } else {
                    if (h.type === "click" || h.keyCode === l) {
                        e.showMenu();
                        a.cancel(h)
                    }
                }
            })
        }
        a.add(e.id + "_open", "click", function (h) {
            e.showMenu();
            a.cancel(h)
        });
        a.add([e.id, e.id + "_open"], "focus", function () {
            e._focused = 1
        });
        a.add([e.id, e.id + "_open"], "blur", function () {
            e._focused = 0
        });
        if (c.isIE6 || !b.boxModel) {
            a.add(e.id, "mouseover", function () {
                if (!b.hasClass(e.id, "mceSplitButtonDisabled")) {
                    b.addClass(e.id, "mceSplitButtonHover")
                }
            });
            a.add(e.id, "mouseout", function () {
                if (!b.hasClass(e.id, "mceSplitButtonDisabled")) {
                    b.removeClass(e.id, "mceSplitButtonHover")
                }
            })
        }
    }, destroy:function () {
        this.parent();
        a.clear(this.id + "_action");
        a.clear(this.id + "_open");
        a.clear(this.id)
    }})
})(tinymce);
(function (d) {
    var c = d.DOM, a = d.dom.Event, b = d.is, e = d.each;
    d.create("tinymce.ui.ColorSplitButton:tinymce.ui.SplitButton", {ColorSplitButton:function (i, h, f) {
        var g = this;
        g.parent(i, h, f);
        g.settings = h = d.extend({colors:"000000,993300,333300,003300,003366,000080,333399,333333,800000,FF6600,808000,008000,008080,0000FF,666699,808080,FF0000,FF9900,99CC00,339966,33CCCC,3366FF,800080,999999,FF00FF,FFCC00,FFFF00,00FF00,00FFFF,00CCFF,993366,C0C0C0,FF99CC,FFCC99,FFFF99,CCFFCC,CCFFFF,99CCFF,CC99FF,FFFFFF", grid_width:8, default_color:"#888888"}, g.settings);
        g.onShowMenu = new d.util.Dispatcher(g);
        g.onHideMenu = new d.util.Dispatcher(g);
        g.value = h.default_color
    }, showMenu:function () {
        var f = this, g, j, i, h;
        if (f.isDisabled()) {
            return
        }
        if (!f.isMenuRendered) {
            f.renderMenu();
            f.isMenuRendered = true
        }
        if (f.isMenuVisible) {
            return f.hideMenu()
        }
        i = c.get(f.id);
        c.show(f.id + "_menu");
        c.addClass(i, "mceSplitButtonSelected");
        h = c.getPos(i);
        c.setStyles(f.id + "_menu", {left:h.x, top:h.y + i.clientHeight, zIndex:200000});
        i = 0;
        a.add(c.doc, "mousedown", f.hideMenu, f);
        f.onShowMenu.dispatch(f);
        if (f._focused) {
            f._keyHandler = a.add(f.id + "_menu", "keydown", function (k) {
                if (k.keyCode == 27) {
                    f.hideMenu()
                }
            });
            c.select("a", f.id + "_menu")[0].focus()
        }
        f.isMenuVisible = 1
    }, hideMenu:function (g) {
        var f = this;
        if (f.isMenuVisible) {
            if (g && g.type == "mousedown" && c.getParent(g.target, function (h) {
                return h.id === f.id + "_open"
            })) {
                return
            }
            if (!g || !c.getParent(g.target, ".mceSplitButtonMenu")) {
                c.removeClass(f.id, "mceSplitButtonSelected");
                a.remove(c.doc, "mousedown", f.hideMenu, f);
                a.remove(f.id + "_menu", "keydown", f._keyHandler);
                c.hide(f.id + "_menu")
            }
            f.isMenuVisible = 0;
            f.onHideMenu.dispatch()
        }
    }, renderMenu:function () {
        var p = this, h, k = 0, q = p.settings, g, j, l, o, f;
        o = c.add(q.menu_container, "div", {role:"listbox", id:p.id + "_menu", "class":q.menu_class + " " + q["class"], style:"position:absolute;left:0;top:-1000px;"});
        h = c.add(o, "div", {"class":q["class"] + " mceSplitButtonMenu"});
        c.add(h, "span", {"class":"mceMenuLine"});
        g = c.add(h, "table", {role:"presentation", "class":"mceColorSplitMenu"});
        j = c.add(g, "tbody");
        k = 0;
        e(b(q.colors, "array") ? q.colors : q.colors.split(","), function (m) {
            m = m.replace(/^#/, "");
            if (!k--) {
                l = c.add(j, "tr");
                k = q.grid_width - 1
            }
            g = c.add(l, "td");
            var i = {href:"javascript:;", style:{backgroundColor:"#" + m}, title:p.editor.getLang("colors." + m, m), "data-mce-color":"#" + m};
            if (!d.isIE) {
                i.role = "option"
            }
            g = c.add(g, "a", i);
            if (p.editor.forcedHighContrastMode) {
                g = c.add(g, "canvas", {width:16, height:16, "aria-hidden":"true"});
                if (g.getContext && (f = g.getContext("2d"))) {
                    f.fillStyle = "#" + m;
                    f.fillRect(0, 0, 16, 16)
                } else {
                    c.remove(g)
                }
            }
        });
        if (q.more_colors_func) {
            g = c.add(j, "tr");
            g = c.add(g, "td", {colspan:q.grid_width, "class":"mceMoreColors"});
            g = c.add(g, "a", {role:"option", id:p.id + "_more", href:"javascript:;", onclick:"return false;", "class":"mceMoreColors"}, q.more_colors_title);
            a.add(g, "click", function (i) {
                q.more_colors_func.call(q.more_colors_scope || this);
                return a.cancel(i)
            })
        }
        c.addClass(h, "mceColorSplitMenu");
        new d.ui.KeyboardNavigation({root:p.id + "_menu", items:c.select("a", p.id + "_menu"), onCancel:function () {
            p.hideMenu();
            p.focus()
        }});
        a.add(p.id + "_menu", "mousedown", function (i) {
            return a.cancel(i)
        });
        a.add(p.id + "_menu", "click", function (i) {
            var m;
            i = c.getParent(i.target, "a", j);
            if (i && i.nodeName.toLowerCase() == "a" && (m = i.getAttribute("data-mce-color"))) {
                p.setColor(m)
            }
            return false
        });
        return o
    }, setColor:function (f) {
        this.displayColor(f);
        this.hideMenu();
        this.settings.onselect(f)
    }, displayColor:function (g) {
        var f = this;
        c.setStyle(f.id + "_preview", "backgroundColor", g);
        f.value = g
    }, postRender:function () {
        var f = this, g = f.id;
        f.parent();
        c.add(g + "_action", "div", {id:g + "_preview", "class":"mceColorPreview"});
        c.setStyle(f.id + "_preview", "backgroundColor", f.value)
    }, destroy:function () {
        this.parent();
        a.clear(this.id + "_menu");
        a.clear(this.id + "_more");
        c.remove(this.id + "_menu")
    }})
})(tinymce);
(function (b) {
    var d = b.DOM, c = b.each, a = b.dom.Event;
    b.create("tinymce.ui.ToolbarGroup:tinymce.ui.Container", {renderHTML:function () {
        var f = this, i = [], e = f.controls, j = b.each, g = f.settings;
        i.push('<div id="' + f.id + '" role="group" aria-labelledby="' + f.id + '_voice">');
        i.push("<span role='application'>");
        i.push('<span id="' + f.id + '_voice" class="mceVoiceLabel" style="display:none;">' + d.encode(g.name) + "</span>");
        j(e, function (h) {
            i.push(h.renderHTML())
        });
        i.push("</span>");
        i.push("</div>");
        return i.join("")
    }, focus:function () {
        var e = this;
        d.get(e.id).focus()
    }, postRender:function () {
        var f = this, e = [];
        c(f.controls, function (g) {
            c(g.controls, function (h) {
                if (h.id) {
                    e.push(h)
                }
            })
        });
        f.keyNav = new b.ui.KeyboardNavigation({root:f.id, items:e, onCancel:function () {
            if (b.isWebKit) {
                d.get(f.editor.id + "_ifr").focus()
            }
            f.editor.focus()
        }, excludeFromTabOrder:!f.settings.tab_focus_toolbar})
    }, destroy:function () {
        var e = this;
        e.parent();
        e.keyNav.destroy();
        a.clear(e.id)
    }})
})(tinymce);
(function (a) {
    var c = a.DOM, b = a.each;
    a.create("tinymce.ui.Toolbar:tinymce.ui.Container", {renderHTML:function () {
        var m = this, f = "", j, k, n = m.settings, e, d, g, l;
        l = m.controls;
        for (e = 0; e < l.length; e++) {
            k = l[e];
            d = l[e - 1];
            g = l[e + 1];
            if (e === 0) {
                j = "mceToolbarStart";
                if (k.Button) {
                    j += " mceToolbarStartButton"
                } else {
                    if (k.SplitButton) {
                        j += " mceToolbarStartSplitButton"
                    } else {
                        if (k.ListBox) {
                            j += " mceToolbarStartListBox"
                        }
                    }
                }
                f += c.createHTML("td", {"class":j}, c.createHTML("span", null, "<!-- IE -->"))
            }
            if (d && k.ListBox) {
                if (d.Button || d.SplitButton) {
                    f += c.createHTML("td", {"class":"mceToolbarEnd"}, c.createHTML("span", null, "<!-- IE -->"))
                }
            }
            if (c.stdMode) {
                f += '<td style="position: relative">' + k.renderHTML() + "</td>"
            } else {
                f += "<td>" + k.renderHTML() + "</td>"
            }
            if (g && k.ListBox) {
                if (g.Button || g.SplitButton) {
                    f += c.createHTML("td", {"class":"mceToolbarStart"}, c.createHTML("span", null, "<!-- IE -->"))
                }
            }
        }
        j = "mceToolbarEnd";
        if (k.Button) {
            j += " mceToolbarEndButton"
        } else {
            if (k.SplitButton) {
                j += " mceToolbarEndSplitButton"
            } else {
                if (k.ListBox) {
                    j += " mceToolbarEndListBox"
                }
            }
        }
        f += c.createHTML("td", {"class":j}, c.createHTML("span", null, "<!-- IE -->"));
        return c.createHTML("table", {id:m.id, "class":"mceToolbar" + (n["class"] ? " " + n["class"] : ""), cellpadding:"0", cellspacing:"0", align:m.settings.align || "", role:"presentation", tabindex:"-1"}, "<tbody><tr>" + f + "</tr></tbody>")
    }})
})(tinymce);
(function (b) {
    var a = b.util.Dispatcher, c = b.each;
    b.create("tinymce.AddOnManager", {AddOnManager:function () {
        var d = this;
        d.items = [];
        d.urls = {};
        d.lookup = {};
        d.onAdd = new a(d)
    }, get:function (d) {
        if (this.lookup[d]) {
            return this.lookup[d].instance
        } else {
            return undefined
        }
    }, dependencies:function (e) {
        var d;
        if (this.lookup[e]) {
            d = this.lookup[e].dependencies
        }
        return d || []
    }, requireLangPack:function (e) {
        var d = b.settings;
        if (d && d.language && d.language_load !== false) {
            b.ScriptLoader.add(this.urls[e] + "/langs/" + d.language + ".js")
        }
    }, add:function (f, e, d) {
        this.items.push(e);
        this.lookup[f] = {instance:e, dependencies:d};
        this.onAdd.dispatch(this, f, e);
        return e
    }, createUrl:function (d, e) {
        if (typeof e === "object") {
            return e
        } else {
            return{prefix:d.prefix, resource:e, suffix:d.suffix}
        }
    }, addComponents:function (f, d) {
        var e = this.urls[f];
        b.each(d, function (g) {
            b.ScriptLoader.add(e + "/" + g)
        })
    }, load:function (j, f, d, h) {
        var g = this, e = f;

        function i() {
            var k = g.dependencies(j);
            b.each(k, function (m) {
                var l = g.createUrl(f, m);
                g.load(l.resource, l, undefined, undefined)
            });
            if (d) {
                if (h) {
                    d.call(h)
                } else {
                    d.call(b.ScriptLoader)
                }
            }
        }

        if (g.urls[j]) {
            return
        }
        if (typeof f === "object") {
            e = f.prefix + f.resource + f.suffix
        }
        if (e.indexOf("/") != 0 && e.indexOf("://") == -1) {
            e = b.baseURL + "/" + e
        }
        g.urls[j] = e.substring(0, e.lastIndexOf("/"));
        if (g.lookup[j]) {
            i()
        } else {
            b.ScriptLoader.add(e, i, h)
        }
    }});
    b.PluginManager = new b.AddOnManager();
    b.ThemeManager = new b.AddOnManager()
}(tinymce));
(function (j) {
    var g = j.each, d = j.extend, k = j.DOM, i = j.dom.Event, f = j.ThemeManager, b = j.PluginManager, e = j.explode, h = j.util.Dispatcher, a, c = 0;
    j.documentBaseURL = window.location.href.replace(/[\?#].*$/, "").replace(/[\/\\][^\/]+$/, "");
    if (!/[\/\\]$/.test(j.documentBaseURL)) {
        j.documentBaseURL += "/"
    }
    j.baseURL = new j.util.URI(j.documentBaseURL).toAbsolute(j.baseURL);
    j.baseURI = new j.util.URI(j.baseURL);
    j.onBeforeUnload = new h(j);
    i.add(window, "beforeunload", function (l) {
        j.onBeforeUnload.dispatch(j, l)
    });
    j.onAddEditor = new h(j);
    j.onRemoveEditor = new h(j);
    j.EditorManager = d(j, {editors:[], i18n:{}, activeEditor:null, init:function (v) {
        var u = this, o, n = j.ScriptLoader, r, l = [], q;

        function p(t) {
            var s = t.id;
            if (!s) {
                s = t.name;
                if (s && !k.get(s)) {
                    s = t.name
                } else {
                    s = k.uniqueId()
                }
                t.setAttribute("id", s)
            }
            return s
        }

        function m(y, z, t) {
            var x = y[z];
            if (!x) {
                return
            }
            if (j.is(x, "string")) {
                t = x.replace(/\.\w+$/, "");
                t = t ? j.resolve(t) : 0;
                x = j.resolve(x)
            }
            return x.apply(t || this, Array.prototype.slice.call(arguments, 2))
        }

        v = d({theme:"simple", language:"en"}, v);
        u.settings = v;
        i.bind(window, "ready", function () {
            var s, x;
            m(v, "onpageload");
            switch (v.mode) {
                case"exact":
                    s = v.elements || "";
                    if (s.length > 0) {
                        g(e(s), function (y) {
                            if (k.get(y)) {
                                q = new j.Editor(y, v);
                                l.push(q);
                                q.render(1)
                            } else {
                                g(document.forms, function (z) {
                                    g(z.elements, function (A) {
                                        if (A.name === y) {
                                            y = "mce_editor_" + c++;
                                            k.setAttrib(A, "id", y);
                                            q = new j.Editor(y, v);
                                            l.push(q);
                                            q.render(1)
                                        }
                                    })
                                })
                            }
                        })
                    }
                    break;
                case"textareas":
                case"specific_textareas":
                function t(z, y) {
                    return y.constructor === RegExp ? y.test(z.className) : k.hasClass(z, y)
                }

                    g(k.select("textarea"), function (y) {
                        if (v.editor_deselector && t(y, v.editor_deselector)) {
                            return
                        }
                        if (!v.editor_selector || t(y, v.editor_selector)) {
                            q = new j.Editor(p(y), v);
                            l.push(q);
                            q.render(1)
                        }
                    });
                    break;
                default:
                    if (v.types) {
                        g(v.types, function (y) {
                            g(k.select(y.selector), function (A) {
                                var z = new j.Editor(p(A), j.extend({}, v, y));
                                l.push(z);
                                z.render(1)
                            })
                        })
                    } else {
                        if (v.selector) {
                            g(k.select(v.selector), function (z) {
                                var y = new j.Editor(p(z), v);
                                l.push(y);
                                y.render(1)
                            })
                        }
                    }
            }
            if (v.oninit) {
                s = x = 0;
                g(l, function (y) {
                    x++;
                    if (!y.initialized) {
                        y.onInit.add(function () {
                            s++;
                            if (s == x) {
                                m(v, "oninit")
                            }
                        })
                    } else {
                        s++
                    }
                    if (s == x) {
                        m(v, "oninit")
                    }
                })
            }
        })
    }, get:function (l) {
        if (l === a) {
            return this.editors
        }
        return this.editors[l]
    }, getInstanceById:function (l) {
        return this.get(l)
    }, add:function (m) {
        var l = this, n = l.editors;
        n[m.id] = m;
        n.push(m);
        l._setActive(m);
        l.onAddEditor.dispatch(l, m);
        if (j.adapter) {
            j.adapter.patchEditor(m)
        }
        return m
    }, remove:function (n) {
        var m = this, l, o = m.editors;
        if (!o[n.id]) {
            return null
        }
        delete o[n.id];
        for (l = 0; l < o.length; l++) {
            if (o[l] == n) {
                o.splice(l, 1);
                break
            }
        }
        if (m.activeEditor == n) {
            m._setActive(o[0])
        }
        n.destroy();
        m.onRemoveEditor.dispatch(m, n);
        return n
    }, execCommand:function (r, p, o) {
        var q = this, n = q.get(o), l;
        switch (r) {
            case"mceFocus":
                n.focus();
                return true;
            case"mceAddEditor":
            case"mceAddControl":
                if (!q.get(o)) {
                    new j.Editor(o, q.settings).render()
                }
                return true;
            case"mceAddFrameControl":
                l = o.window;
                l.tinyMCE = tinyMCE;
                l.tinymce = j;
                j.DOM.doc = l.document;
                j.DOM.win = l;
                n = new j.Editor(o.element_id, o);
                n.render();
                if (j.isIE) {
                    function m() {
                        n.destroy();
                        l.detachEvent("onunload", m);
                        l = l.tinyMCE = l.tinymce = null
                    }

                    l.attachEvent("onunload", m)
                }
                o.page_window = null;
                return true;
            case"mceRemoveEditor":
            case"mceRemoveControl":
                if (n) {
                    n.remove()
                }
                return true;
            case"mceToggleEditor":
                if (!n) {
                    q.execCommand("mceAddControl", 0, o);
                    return true
                }
                if (n.isHidden()) {
                    n.show()
                } else {
                    n.hide()
                }
                return true
        }
        if (q.activeEditor) {
            return q.activeEditor.execCommand(r, p, o)
        }
        return false
    }, execInstanceCommand:function (p, o, n, m) {
        var l = this.get(p);
        if (l) {
            return l.execCommand(o, n, m)
        }
        return false
    }, triggerSave:function () {
        g(this.editors, function (l) {
            l.save()
        })
    }, addI18n:function (n, q) {
        var l, m = this.i18n;
        if (!j.is(n, "string")) {
            g(n, function (r, p) {
                g(r, function (t, s) {
                    g(t, function (v, u) {
                        if (s === "common") {
                            m[p + "." + u] = v
                        } else {
                            m[p + "." + s + "." + u] = v
                        }
                    })
                })
            })
        } else {
            g(q, function (r, p) {
                m[n + "." + p] = r
            })
        }
    }, _setActive:function (l) {
        this.selectedInstance = this.activeEditor = l
    }})
})(tinymce);
(function (n) {
    var o = n.DOM, k = n.dom.Event, f = n.extend, l = n.util.Dispatcher, i = n.each, a = n.isGecko, b = n.isIE, e = n.isWebKit, d = n.is, h = n.ThemeManager, c = n.PluginManager, p = n.inArray, m = n.grep, g = n.explode, j = n.VK;
    n.create("tinymce.Editor", {Editor:function (u, r) {
        var q = this;
        q.id = q.editorId = u;
        q.execCommands = {};
        q.queryStateCommands = {};
        q.queryValueCommands = {};
        q.isNotDirty = false;
        q.plugins = {};
        i(["onPreInit", "onBeforeRenderUI", "onPostRender", "onLoad", "onInit", "onRemove", "onActivate", "onDeactivate", "onClick", "onEvent", "onMouseUp", "onMouseDown", "onDblClick", "onKeyDown", "onKeyUp", "onKeyPress", "onContextMenu", "onSubmit", "onReset", "onPaste", "onPreProcess", "onPostProcess", "onBeforeSetContent", "onBeforeGetContent", "onSetContent", "onGetContent", "onLoadContent", "onSaveContent", "onNodeChange", "onChange", "onBeforeExecCommand", "onExecCommand", "onUndo", "onRedo", "onVisualAid", "onSetProgressState", "onSetAttrib"], function (s) {
            q[s] = new l(q)
        });
        q.settings = r = f({id:u, language:"en", docs_language:"en", theme:"simple", skin:"default", delta_width:0, delta_height:0, popup_css:"", plugins:"", document_base_url:n.documentBaseURL, add_form_submit_trigger:1, submit_patch:1, add_unload_trigger:1, convert_urls:1, relative_urls:1, remove_script_host:1, table_inline_editing:0, object_resizing:1, cleanup:1, accessibility_focus:1, custom_shortcuts:1, custom_undo_redo_keyboard_shortcuts:1, custom_undo_redo_restore_selection:1, custom_undo_redo:1, doctype:n.isIE6 ? '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">' : "<!DOCTYPE>", visual_table_class:"mceItemTable", visual:1, font_size_style_values:"xx-small,x-small,small,medium,large,x-large,xx-large", font_size_legacy_values:"xx-small,small,medium,large,x-large,xx-large,300%", apply_source_formatting:1, directionality:"ltr", forced_root_block:"p", hidden_input:1, padd_empty_editor:1, render_ui:1, init_theme:1, force_p_newlines:1, indentation:"30px", keep_styles:1, fix_table_elements:1, inline_styles:1, convert_fonts_to_spans:true, indent:"simple", indent_before:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,li,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside", indent_after:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,li,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside", validate:true, entity_encoding:"named", url_converter:q.convertURL, url_converter_scope:q, ie7_compat:true}, r);
        q.documentBaseURI = new n.util.URI(r.document_base_url || n.documentBaseURL, {base_uri:tinyMCE.baseURI});
        q.baseURI = n.baseURI;
        q.contentCSS = [];
        q.execCallback("setup", q)
    }, render:function (u) {
        var v = this, x = v.settings, y = v.id, q = n.ScriptLoader;
        if (!k.domLoaded) {
            k.add(window, "ready", function () {
                v.render()
            });
            return
        }
        tinyMCE.settings = x;
        if (!v.getElement()) {
            return
        }
        if (n.isIDevice && !n.isIOS5) {
            return
        }
        if (!/TEXTAREA|INPUT/i.test(v.getElement().nodeName) && x.hidden_input && o.getParent(y, "form")) {
            o.insertAfter(o.create("input", {type:"hidden", name:y}), y)
        }
        if (n.WindowManager) {
            v.windowManager = new n.WindowManager(v)
        }
        if (x.encoding == "xml") {
            v.onGetContent.add(function (s, t) {
                if (t.save) {
                    t.content = o.encode(t.content)
                }
            })
        }
        if (x.add_form_submit_trigger) {
            v.onSubmit.addToTop(function () {
                if (v.initialized) {
                    v.save();
                    v.isNotDirty = 1
                }
            })
        }
        if (x.add_unload_trigger) {
            v._beforeUnload = tinyMCE.onBeforeUnload.add(function () {
                if (v.initialized && !v.destroyed && !v.isHidden()) {
                    v.save({format:"raw", no_events:true})
                }
            })
        }
        n.addUnload(v.destroy, v);
        if (x.submit_patch) {
            v.onBeforeRenderUI.add(function () {
                var s = v.getElement().form;
                if (!s) {
                    return
                }
                if (s._mceOldSubmit) {
                    return
                }
                if (!s.submit.nodeType && !s.submit.length) {
                    v.formElement = s;
                    s._mceOldSubmit = s.submit;
                    s.submit = function () {
                        n.triggerSave();
                        v.isNotDirty = 1;
                        return v.formElement._mceOldSubmit(v.formElement)
                    }
                }
                s = null
            })
        }
        function r() {
            if (x.language && x.language_load !== false) {
                q.add(n.baseURL + "/langs/" + x.language + ".js")
            }
            if (x.theme && x.theme.charAt(0) != "-" && !h.urls[x.theme]) {
                h.load(x.theme, "themes/" + x.theme + "/editor_template" + n.suffix + ".js")
            }
            i(g(x.plugins), function (t) {
                if (t && !c.urls[t]) {
                    if (t.charAt(0) == "-") {
                        t = t.substr(1, t.length);
                        var s = c.dependencies(t);
                        i(s, function (A) {
                            var z = {prefix:"plugins/", resource:A, suffix:"/editor_plugin" + n.suffix + ".js"};
                            var A = c.createUrl(z, A);
                            c.load(A.resource, A)
                        })
                    } else {
                        if (t == "safari") {
                            return
                        }
                        c.load(t, {prefix:"plugins/", resource:t, suffix:"/editor_plugin" + n.suffix + ".js"})
                    }
                }
            });
            q.loadQueue(function () {
                if (!v.removed) {
                    v.init()
                }
            })
        }

        r()
    }, init:function () {
        var v, I = this, J = I.settings, F, B, E = I.getElement(), r, q, G, z, D, H, A, x = [];
        n.add(I);
        J.aria_label = J.aria_label || o.getAttrib(E, "aria-label", I.getLang("aria.rich_text_area"));
        if (J.theme) {
            J.theme = J.theme.replace(/-/, "");
            r = h.get(J.theme);
            I.theme = new r();
            if (I.theme.init && J.init_theme) {
                I.theme.init(I, h.urls[J.theme] || n.documentBaseURL.replace(/\/$/, ""))
            }
        }
        function C(K) {
            var L = c.get(K), t = c.urls[K] || n.documentBaseURL.replace(/\/$/, ""), s;
            if (L && n.inArray(x, K) === -1) {
                i(c.dependencies(K), function (u) {
                    C(u)
                });
                s = new L(I, t);
                I.plugins[K] = s;
                if (s.init) {
                    s.init(I, t);
                    x.push(K)
                }
            }
        }

        i(g(J.plugins.replace(/\-/g, "")), C);
        if (J.popup_css !== false) {
            if (J.popup_css) {
                J.popup_css = I.documentBaseURI.toAbsolute(J.popup_css)
            } else {
                J.popup_css = I.baseURI.toAbsolute("themes/" + J.theme + "/skins/" + J.skin + "/dialog.css")
            }
        }
        if (J.popup_css_add) {
            J.popup_css += "," + I.documentBaseURI.toAbsolute(J.popup_css_add)
        }
        I.controlManager = new n.ControlManager(I);
        if (J.custom_undo_redo) {
            I.onBeforeExecCommand.add(function (t, K, u, L, s) {
                if (K != "Undo" && K != "Redo" && K != "mceRepaint" && (!s || !s.skip_undo)) {
                    I.undoManager.beforeChange()
                }
            });
            I.onExecCommand.add(function (t, K, u, L, s) {
                if (K != "Undo" && K != "Redo" && K != "mceRepaint" && (!s || !s.skip_undo)) {
                    I.undoManager.add()
                }
            })
        }
        I.onExecCommand.add(function (s, t) {
            if (!/^(FontName|FontSize)$/.test(t)) {
                I.nodeChanged()
            }
        });
        if (a) {
            function y(s, t) {
                if (!t || !t.initial) {
                    I.execCommand("mceRepaint")
                }
            }

            I.onUndo.add(y);
            I.onRedo.add(y);
            I.onSetContent.add(y)
        }
        I.onBeforeRenderUI.dispatch(I, I.controlManager);
        if (J.render_ui) {
            F = J.width || E.style.width || E.offsetWidth;
            B = J.height || E.style.height || E.offsetHeight;
            I.orgDisplay = E.style.display;
            H = /^[0-9\.]+(|px)$/i;
            if (H.test("" + F)) {
                F = Math.max(parseInt(F) + (r.deltaWidth || 0), 100)
            }
            if (H.test("" + B)) {
                B = Math.max(parseInt(B) + (r.deltaHeight || 0), 100)
            }
            r = I.theme.renderUI({targetNode:E, width:F, height:B, deltaWidth:J.delta_width, deltaHeight:J.delta_height});
            I.editorContainer = r.editorContainer
        }
        if (document.domain && location.hostname != document.domain) {
            n.relaxedDomain = document.domain
        }
        o.setStyles(r.sizeContainer || r.editorContainer, {width:F, height:B});
        if (J.content_css) {
            n.each(g(J.content_css), function (s) {
                I.contentCSS.push(I.documentBaseURI.toAbsolute(s))
            })
        }
        B = (r.iframeHeight || B) + (typeof(B) == "number" ? (r.deltaHeight || 0) : "");
        if (B < 100) {
            B = 100
        }
        I.iframeHTML = J.doctype + '<html><head xmlns="http://www.w3.org/1999/xhtml">';
        if (J.document_base_url != n.documentBaseURL) {
            I.iframeHTML += '<base href="' + I.documentBaseURI.getURI() + '" />'
        }
        if (J.ie7_compat) {
            I.iframeHTML += '<meta http-equiv="X-UA-Compatible" content="IE=7" />'
        } else {
            I.iframeHTML += '<meta http-equiv="X-UA-Compatible" content="IE=edge" />'
        }
        I.iframeHTML += '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';
        for (A = 0; A < I.contentCSS.length; A++) {
            I.iframeHTML += '<link type="text/css" rel="stylesheet" href="' + I.contentCSS[A] + '" />'
        }
        I.contentCSS = [];
        z = J.body_id || "tinymce";
        if (z.indexOf("=") != -1) {
            z = I.getParam("body_id", "", "hash");
            z = z[I.id] || z
        }
        D = J.body_class || "";
        if (D.indexOf("=") != -1) {
            D = I.getParam("body_class", "", "hash");
            D = D[I.id] || ""
        }
        I.iframeHTML += '</head><body id="' + z + '" class="mceContentBody ' + D + '" onload="window.parent.tinyMCE.get(\'' + I.id + "').onLoad.dispatch();\"><br></body></html>";
        if (n.relaxedDomain && (b || (n.isOpera && parseFloat(opera.version()) < 11))) {
            G = 'javascript:(function(){document.open();document.domain="' + document.domain + '";var ed = window.parent.tinyMCE.get("' + I.id + '");document.write(ed.iframeHTML);document.close();ed.setupIframe();})()'
        }
        v = o.add(r.iframeContainer, "iframe", {id:I.id + "_ifr", src:G || 'javascript:""', frameBorder:"0", allowTransparency:"true", title:J.aria_label, style:{width:"100%", height:B, display:"block"}});
        I.contentAreaContainer = r.iframeContainer;
        o.get(r.editorContainer).style.display = I.orgDisplay;
        o.get(I.id).style.display = "none";
        o.setAttrib(I.id, "aria-hidden", true);
        if (!n.relaxedDomain || !G) {
            I.setupIframe()
        }
        E = v = r = null
    }, setupIframe:function () {
        var r = this, x = r.settings, y = o.get(r.id), z = r.getDoc(), v, q;
        if (!b || !n.relaxedDomain) {
            z.open();
            z.write(r.iframeHTML);
            z.close();
            if (n.relaxedDomain) {
                z.domain = n.relaxedDomain
            }
        }
        q = r.getBody();
        q.disabled = true;
        if (!x.readonly) {
            q.contentEditable = true
        }
        q.disabled = false;
        r.schema = new n.html.Schema(x);
        r.dom = new n.dom.DOMUtils(r.getDoc(), {keep_values:true, url_converter:r.convertURL, url_converter_scope:r, hex_colors:x.force_hex_style_colors, class_filter:x.class_filter, update_styles:1, fix_ie_paragraphs:1, schema:r.schema});
        r.parser = new n.html.DomParser(x, r.schema);
        if (!r.settings.allow_html_in_named_anchor) {
            r.parser.addAttributeFilter("name", function (s, t) {
                var B = s.length, D, A, C, E;
                while (B--) {
                    E = s[B];
                    if (E.name === "a" && E.firstChild) {
                        C = E.parent;
                        D = E.lastChild;
                        do {
                            A = D.prev;
                            C.insert(D, E);
                            D = A
                        } while (D)
                    }
                }
            })
        }
        r.parser.addAttributeFilter("src,href,style", function (s, t) {
            var A = s.length, C, E = r.dom, D, B;
            while (A--) {
                C = s[A];
                D = C.attr(t);
                B = "data-mce-" + t;
                if (!C.attributes.map[B]) {
                    if (t === "style") {
                        C.attr(B, E.serializeStyle(E.parseStyle(D), C.name))
                    } else {
                        C.attr(B, r.convertURL(D, t, C.name))
                    }
                }
            }
        });
        r.parser.addNodeFilter("script", function (s, t) {
            var A = s.length, B;
            while (A--) {
                B = s[A];
                B.attr("type", "mce-" + (B.attr("type") || "text/javascript"))
            }
        });
        r.parser.addNodeFilter("#cdata", function (s, t) {
            var A = s.length, B;
            while (A--) {
                B = s[A];
                B.type = 8;
                B.name = "#comment";
                B.value = "[CDATA[" + B.value + "]]"
            }
        });
        r.parser.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div", function (t, A) {
            var B = t.length, C, s = r.schema.getNonEmptyElements();
            while (B--) {
                C = t[B];
                if (C.isEmpty(s)) {
                    C.empty().append(new n.html.Node("br", 1)).shortEnded = true
                }
            }
        });
        r.serializer = new n.dom.Serializer(x, r.dom, r.schema);
        r.selection = new n.dom.Selection(r.dom, r.getWin(), r.serializer);
        r.formatter = new n.Formatter(this);
        r.formatter.register({alignleft:[
            {selector:"p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li", styles:{textAlign:"left"}},
            {selector:"img,table", collapsed:false, styles:{"float":"left"}}
        ], aligncenter:[
            {selector:"p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li", styles:{textAlign:"center"}},
            {selector:"img", collapsed:false, styles:{display:"block", marginLeft:"auto", marginRight:"auto"}},
            {selector:"table", collapsed:false, styles:{marginLeft:"auto", marginRight:"auto"}}
        ], alignright:[
            {selector:"p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li", styles:{textAlign:"right"}},
            {selector:"img,table", collapsed:false, styles:{"float":"right"}}
        ], alignfull:[
            {selector:"p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li", styles:{textAlign:"justify"}}
        ], bold:[
            {inline:"strong", remove:"all"},
            {inline:"span", styles:{fontWeight:"bold"}},
            {inline:"b", remove:"all"}
        ], italic:[
            {inline:"em", remove:"all"},
            {inline:"span", styles:{fontStyle:"italic"}},
            {inline:"i", remove:"all"}
        ], underline:[
            {inline:"span", styles:{textDecoration:"underline"}, exact:true},
            {inline:"u", remove:"all"}
        ], strikethrough:[
            {inline:"span", styles:{textDecoration:"line-through"}, exact:true},
            {inline:"strike", remove:"all"}
        ], forecolor:{inline:"span", styles:{color:"%value"}, wrap_links:false}, hilitecolor:{inline:"span", styles:{backgroundColor:"%value"}, wrap_links:false}, fontname:{inline:"span", styles:{fontFamily:"%value"}}, fontsize:{inline:"span", styles:{fontSize:"%value"}}, fontsize_class:{inline:"span", attributes:{"class":"%value"}}, blockquote:{block:"blockquote", wrapper:1, remove:"all"}, subscript:{inline:"sub"}, superscript:{inline:"sup"}, link:{inline:"a", selector:"a", remove:"all", split:true, deep:true, onmatch:function (s) {
            return true
        }, onformat:function (A, s, t) {
            i(t, function (C, B) {
                r.dom.setAttrib(A, B, C)
            })
        }}, removeformat:[
            {selector:"b,strong,em,i,font,u,strike", remove:"all", split:true, expand:false, block_expand:true, deep:true},
            {selector:"span", attributes:["style", "class"], remove:"empty", split:true, expand:false, deep:true},
            {selector:"*", attributes:["style", "class"], split:false, expand:false, deep:true}
        ]});
        i("p h1 h2 h3 h4 h5 h6 div address pre div code dt dd samp".split(/\s/), function (s) {
            r.formatter.register(s, {block:s, remove:"all"})
        });
        r.formatter.register(r.settings.formats);
        r.undoManager = new n.UndoManager(r);
        r.undoManager.onAdd.add(function (t, s) {
            if (t.hasUndo()) {
                return r.onChange.dispatch(r, s, t)
            }
        });
        r.undoManager.onUndo.add(function (t, s) {
            return r.onUndo.dispatch(r, s, t)
        });
        r.undoManager.onRedo.add(function (t, s) {
            return r.onRedo.dispatch(r, s, t)
        });
        r.forceBlocks = new n.ForceBlocks(r, {forced_root_block:x.forced_root_block});
        r.editorCommands = new n.EditorCommands(r);
        r.serializer.onPreProcess.add(function (s, t) {
            return r.onPreProcess.dispatch(r, t, s)
        });
        r.serializer.onPostProcess.add(function (s, t) {
            return r.onPostProcess.dispatch(r, t, s)
        });
        r.onPreInit.dispatch(r);
        if (!x.gecko_spellcheck) {
            r.getBody().spellcheck = 0
        }
        if (!x.readonly) {
            r._addEvents()
        }
        r.controlManager.onPostRender.dispatch(r, r.controlManager);
        r.onPostRender.dispatch(r);
        r.quirks = new n.util.Quirks(this);
        if (x.directionality) {
            r.getBody().dir = x.directionality
        }
        if (x.nowrap) {
            r.getBody().style.whiteSpace = "nowrap"
        }
        if (x.handle_node_change_callback) {
            r.onNodeChange.add(function (t, s, A) {
                r.execCallback("handle_node_change_callback", r.id, A, -1, -1, true, r.selection.isCollapsed())
            })
        }
        if (x.save_callback) {
            r.onSaveContent.add(function (s, A) {
                var t = r.execCallback("save_callback", r.id, A.content, r.getBody());
                if (t) {
                    A.content = t
                }
            })
        }
        if (x.onchange_callback) {
            r.onChange.add(function (t, s) {
                r.execCallback("onchange_callback", r, s)
            })
        }
        if (x.protect) {
            r.onBeforeSetContent.add(function (s, t) {
                if (x.protect) {
                    i(x.protect, function (A) {
                        t.content = t.content.replace(A, function (B) {
                            return"<!--mce:protected " + escape(B) + "-->"
                        })
                    })
                }
            })
        }
        if (x.convert_newlines_to_brs) {
            r.onBeforeSetContent.add(function (s, t) {
                if (t.initial) {
                    t.content = t.content.replace(/\r?\n/g, "<br />")
                }
            })
        }
        if (x.preformatted) {
            r.onPostProcess.add(function (s, t) {
                t.content = t.content.replace(/^\s*<pre.*?>/, "");
                t.content = t.content.replace(/<\/pre>\s*$/, "");
                if (t.set) {
                    t.content = '<pre class="mceItemHidden">' + t.content + "</pre>"
                }
            })
        }
        if (x.verify_css_classes) {
            r.serializer.attribValueFilter = function (C, A) {
                var B, t;
                if (C == "class") {
                    if (!r.classesRE) {
                        t = r.dom.getClasses();
                        if (t.length > 0) {
                            B = "";
                            i(t, function (s) {
                                B += (B ? "|" : "") + s["class"]
                            });
                            r.classesRE = new RegExp("(" + B + ")", "gi")
                        }
                    }
                    return !r.classesRE || /(\bmceItem\w+\b|\bmceTemp\w+\b)/g.test(A) || r.classesRE.test(A) ? A : ""
                }
                return A
            }
        }
        if (x.cleanup_callback) {
            r.onBeforeSetContent.add(function (s, t) {
                t.content = r.execCallback("cleanup_callback", "insert_to_editor", t.content, t)
            });
            r.onPreProcess.add(function (s, t) {
                if (t.set) {
                    r.execCallback("cleanup_callback", "insert_to_editor_dom", t.node, t)
                }
                if (t.get) {
                    r.execCallback("cleanup_callback", "get_from_editor_dom", t.node, t)
                }
            });
            r.onPostProcess.add(function (s, t) {
                if (t.set) {
                    t.content = r.execCallback("cleanup_callback", "insert_to_editor", t.content, t)
                }
                if (t.get) {
                    t.content = r.execCallback("cleanup_callback", "get_from_editor", t.content, t)
                }
            })
        }
        if (x.save_callback) {
            r.onGetContent.add(function (s, t) {
                if (t.save) {
                    t.content = r.execCallback("save_callback", r.id, t.content, r.getBody())
                }
            })
        }
        if (x.handle_event_callback) {
            r.onEvent.add(function (s, t, A) {
                if (r.execCallback("handle_event_callback", t, s, A) === false) {
                    k.cancel(t)
                }
            })
        }
        r.onSetContent.add(function () {
            r.addVisual(r.getBody())
        });
        if (x.padd_empty_editor) {
            r.onPostProcess.add(function (s, t) {
                t.content = t.content.replace(/^(<p[^>]*>(&nbsp;|&#160;|\s|\u00a0|)<\/p>[\r\n]*|<br \/>[\r\n]*)$/, "")
            })
        }
        if (a) {
            function u(s, t) {
                i(s.dom.select("a"), function (B) {
                    var A = B.parentNode;
                    if (s.dom.isBlock(A) && A.lastChild === B) {
                        s.dom.add(A, "br", {"data-mce-bogus":1})
                    }
                })
            }

            r.onExecCommand.add(function (s, t) {
                if (t === "CreateLink") {
                    u(s)
                }
            });
            r.onSetContent.add(r.selection.onSetContent.add(u))
        }
        r.load({initial:true, format:"html"});
        r.startContent = r.getContent({format:"raw"});
        r.undoManager.add();
        r.initialized = true;
        r.onInit.dispatch(r);
        r.execCallback("setupcontent_callback", r.id, r.getBody(), r.getDoc());
        r.execCallback("init_instance_callback", r);
        r.focus(true);
        r.nodeChanged({initial:1});
        i(r.contentCSS, function (s) {
            r.dom.loadCSS(s)
        });
        if (x.auto_focus) {
            setTimeout(function () {
                var s = n.get(x.auto_focus);
                s.selection.select(s.getBody(), 1);
                s.selection.collapse(1);
                s.getBody().focus();
                s.getWin().focus()
            }, 100)
        }
        y = null
    }, focus:function (v) {
        var z, r = this, u = r.selection, y = r.settings.content_editable, s, q, x = r.getDoc();
        if (!v) {
            s = u.getRng();
            if (s.item) {
                q = s.item(0)
            }
            r._refreshContentEditable();
            if (!y) {
                r.getWin().focus()
            }
            if (n.isGecko) {
                r.getBody().focus()
            }
            if (q && q.ownerDocument == x) {
                s = x.body.createControlRange();
                s.addElement(q);
                s.select()
            }
        }
        if (n.activeEditor != r) {
            if ((z = n.activeEditor) != null) {
                z.onDeactivate.dispatch(z, r)
            }
            r.onActivate.dispatch(r, z)
        }
        n._setActive(r)
    }, execCallback:function (v) {
        var q = this, u = q.settings[v], r;
        if (!u) {
            return
        }
        if (q.callbackLookup && (r = q.callbackLookup[v])) {
            u = r.func;
            r = r.scope
        }
        if (d(u, "string")) {
            r = u.replace(/\.\w+$/, "");
            r = r ? n.resolve(r) : 0;
            u = n.resolve(u);
            q.callbackLookup = q.callbackLookup || {};
            q.callbackLookup[v] = {func:u, scope:r}
        }
        return u.apply(r || q, Array.prototype.slice.call(arguments, 1))
    }, translate:function (q) {
        var t = this.settings.language || "en", r = n.i18n;
        if (!q) {
            return""
        }
        return r[t + "." + q] || q.replace(/{\#([^}]+)\}/g, function (u, s) {
            return r[t + "." + s] || "{#" + s + "}"
        })
    }, getLang:function (r, q) {
        return n.i18n[(this.settings.language || "en") + "." + r] || (d(q) ? q : "{#" + r + "}")
    }, getParam:function (x, s, q) {
        var t = n.trim, r = d(this.settings[x]) ? this.settings[x] : s, u;
        if (q === "hash") {
            u = {};
            if (d(r, "string")) {
                i(r.indexOf("=") > 0 ? r.split(/[;,](?![^=;,]*(?:[;,]|$))/) : r.split(","), function (y) {
                    y = y.split("=");
                    if (y.length > 1) {
                        u[t(y[0])] = t(y[1])
                    } else {
                        u[t(y[0])] = t(y)
                    }
                })
            } else {
                u = r
            }
            return u
        }
        return r
    }, nodeChanged:function (u) {
        var q = this, r = q.selection, v = r.getStart() || q.getBody();
        if (q.initialized) {
            u = u || {};
            v = b && v.ownerDocument != q.getDoc() ? q.getBody() : v;
            u.parents = [];
            q.dom.getParent(v, function (s) {
                if (s.nodeName == "BODY") {
                    return true
                }
                u.parents.push(s)
            });
            q.onNodeChange.dispatch(q, u ? u.controlManager || q.controlManager : q.controlManager, v, r.isCollapsed(), u)
        }
    }, addButton:function (u, r) {
        var q = this;
        q.buttons = q.buttons || {};
        q.buttons[u] = r
    }, addCommand:function (q, s, r) {
        this.execCommands[q] = {func:s, scope:r || this}
    }, addQueryStateHandler:function (q, s, r) {
        this.queryStateCommands[q] = {func:s, scope:r || this}
    }, addQueryValueHandler:function (q, s, r) {
        this.queryValueCommands[q] = {func:s, scope:r || this}
    }, addShortcut:function (s, v, q, u) {
        var r = this, x;
        if (!r.settings.custom_shortcuts) {
            return false
        }
        r.shortcuts = r.shortcuts || {};
        if (d(q, "string")) {
            x = q;
            q = function () {
                r.execCommand(x, false, null)
            }
        }
        if (d(q, "object")) {
            x = q;
            q = function () {
                r.execCommand(x[0], x[1], x[2])
            }
        }
        i(g(s), function (t) {
            var y = {func:q, scope:u || this, desc:v, alt:false, ctrl:false, shift:false};
            i(g(t, "+"), function (z) {
                switch (z) {
                    case"alt":
                    case"ctrl":
                    case"shift":
                        y[z] = true;
                        break;
                    default:
                        y.charCode = z.charCodeAt(0);
                        y.keyCode = z.toUpperCase().charCodeAt(0)
                }
            });
            r.shortcuts[(y.ctrl ? "ctrl" : "") + "," + (y.alt ? "alt" : "") + "," + (y.shift ? "shift" : "") + "," + y.keyCode] = y
        });
        return true
    }, execCommand:function (y, x, A, q) {
        var u = this, v = 0, z, r;
        if (!/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint|SelectAll)$/.test(y) && (!q || !q.skip_focus)) {
            u.focus()
        }
        q = f({}, q);
        u.onBeforeExecCommand.dispatch(u, y, x, A, q);
        if (q.terminate) {
            return false
        }
        if (u.execCallback("execcommand_callback", u.id, u.selection.getNode(), y, x, A)) {
            u.onExecCommand.dispatch(u, y, x, A, q);
            return true
        }
        if (z = u.execCommands[y]) {
            r = z.func.call(z.scope, x, A);
            if (r !== true) {
                u.onExecCommand.dispatch(u, y, x, A, q);
                return r
            }
        }
        i(u.plugins, function (s) {
            if (s.execCommand && s.execCommand(y, x, A)) {
                u.onExecCommand.dispatch(u, y, x, A, q);
                v = 1;
                return false
            }
        });
        if (v) {
            return true
        }
        if (u.theme && u.theme.execCommand && u.theme.execCommand(y, x, A)) {
            u.onExecCommand.dispatch(u, y, x, A, q);
            return true
        }
        if (u.editorCommands.execCommand(y, x, A)) {
            u.onExecCommand.dispatch(u, y, x, A, q);
            return true
        }
        u.getDoc().execCommand(y, x, A);
        u.onExecCommand.dispatch(u, y, x, A, q)
    }, queryCommandState:function (v) {
        var r = this, x, u;
        if (r._isHidden()) {
            return
        }
        if (x = r.queryStateCommands[v]) {
            u = x.func.call(x.scope);
            if (u !== true) {
                return u
            }
        }
        x = r.editorCommands.queryCommandState(v);
        if (x !== -1) {
            return x
        }
        try {
            return this.getDoc().queryCommandState(v)
        } catch (q) {
        }
    }, queryCommandValue:function (x) {
        var r = this, v, u;
        if (r._isHidden()) {
            return
        }
        if (v = r.queryValueCommands[x]) {
            u = v.func.call(v.scope);
            if (u !== true) {
                return u
            }
        }
        v = r.editorCommands.queryCommandValue(x);
        if (d(v)) {
            return v
        }
        try {
            return this.getDoc().queryCommandValue(x)
        } catch (q) {
        }
    }, show:function () {
        var q = this;
        o.show(q.getContainer());
        o.hide(q.id);
        q.load()
    }, hide:function () {
        var q = this, r = q.getDoc();
        if (b && r) {
            r.execCommand("SelectAll")
        }
        q.save();
        o.hide(q.getContainer());
        o.setStyle(q.id, "display", q.orgDisplay)
    }, isHidden:function () {
        return !o.isHidden(this.id)
    }, setProgressState:function (q, r, s) {
        this.onSetProgressState.dispatch(this, q, r, s);
        return q
    }, load:function (u) {
        var q = this, s = q.getElement(), r;
        if (s) {
            u = u || {};
            u.load = true;
            r = q.setContent(d(s.value) ? s.value : s.innerHTML, u);
            u.element = s;
            if (!u.no_events) {
                q.onLoadContent.dispatch(q, u)
            }
            u.element = s = null;
            return r
        }
    }, save:function (v) {
        var q = this, u = q.getElement(), r, s;
        if (!u || !q.initialized) {
            return
        }
        v = v || {};
        v.save = true;
        if (!v.no_events) {
            q.undoManager.typing = false;
            q.undoManager.add()
        }
        v.element = u;
        r = v.content = q.getContent(v);
        if (!v.no_events) {
            q.onSaveContent.dispatch(q, v)
        }
        r = v.content;
        if (!/TEXTAREA|INPUT/i.test(u.nodeName)) {
            u.innerHTML = r;
            if (s = o.getParent(q.id, "form")) {
                i(s.elements, function (t) {
                    if (t.name == q.id) {
                        t.value = r;
                        return false
                    }
                })
            }
        } else {
            u.value = r
        }
        v.element = u = null;
        return r
    }, setContent:function (v, t) {
        var s = this, r, q = s.getBody(), u;
        t = t || {};
        t.format = t.format || "html";
        t.set = true;
        t.content = v;
        if (!t.no_events) {
            s.onBeforeSetContent.dispatch(s, t)
        }
        v = t.content;
        if (!n.isIE && (v.length === 0 || /^\s+$/.test(v))) {
            u = s.settings.forced_root_block;
            if (u) {
                v = "<" + u + '><br data-mce-bogus="1"></' + u + ">"
            } else {
                v = '<br data-mce-bogus="1">'
            }
            q.innerHTML = v;
            s.selection.select(q, true);
            s.selection.collapse(true);
            return
        }
        if (t.format !== "raw") {
            v = new n.html.Serializer({}, s.schema).serialize(s.parser.parse(v))
        }
        t.content = n.trim(v);
        s.dom.setHTML(q, t.content);
        if (!t.no_events) {
            s.onSetContent.dispatch(s, t)
        }
        s.selection.normalize();
        return t.content
    }, getContent:function (r) {
        var q = this, s;
        r = r || {};
        r.format = r.format || "html";
        r.get = true;
        if (!r.no_events) {
            q.onBeforeGetContent.dispatch(q, r)
        }
        if (r.format == "raw") {
            s = q.getBody().innerHTML
        } else {
            s = q.serializer.serialize(q.getBody(), r)
        }
        r.content = n.trim(s);
        if (!r.no_events) {
            q.onGetContent.dispatch(q, r)
        }
        return r.content
    }, isDirty:function () {
        var q = this;
        return n.trim(q.startContent) != n.trim(q.getContent({format:"raw", no_events:1})) && !q.isNotDirty
    }, getContainer:function () {
        var q = this;
        if (!q.container) {
            q.container = o.get(q.editorContainer || q.id + "_parent")
        }
        return q.container
    }, getContentAreaContainer:function () {
        return this.contentAreaContainer
    }, getElement:function () {
        return o.get(this.settings.content_element || this.id)
    }, getWin:function () {
        var q = this, r;
        if (!q.contentWindow) {
            r = o.get(q.id + "_ifr");
            if (r) {
                q.contentWindow = r.contentWindow
            }
        }
        return q.contentWindow
    }, getDoc:function () {
        var r = this, q;
        if (!r.contentDocument) {
            q = r.getWin();
            if (q) {
                r.contentDocument = q.document
            }
        }
        return r.contentDocument
    }, getBody:function () {
        return this.bodyElement || this.getDoc().body
    }, convertURL:function (q, y, x) {
        var r = this, v = r.settings;
        if (v.urlconverter_callback) {
            return r.execCallback("urlconverter_callback", q, x, true, y)
        }
        if (!v.convert_urls || (x && x.nodeName == "LINK") || q.indexOf("file:") === 0) {
            return q
        }
        if (v.relative_urls) {
            return r.documentBaseURI.toRelative(q)
        }
        q = r.documentBaseURI.toAbsolute(q, v.remove_script_host);
        return q
    }, addVisual:function (u) {
        var q = this, r = q.settings;
        u = u || q.getBody();
        if (!d(q.hasVisual)) {
            q.hasVisual = r.visual
        }
        i(q.dom.select("table,a", u), function (t) {
            var s;
            switch (t.nodeName) {
                case"TABLE":
                    s = q.dom.getAttrib(t, "border");
                    if (!s || s == "0") {
                        if (q.hasVisual) {
                            q.dom.addClass(t, r.visual_table_class)
                        } else {
                            q.dom.removeClass(t, r.visual_table_class)
                        }
                    }
                    return;
                case"A":
                    s = q.dom.getAttrib(t, "name");
                    if (s) {
                        if (q.hasVisual) {
                            q.dom.addClass(t, "mceItemAnchor")
                        } else {
                            q.dom.removeClass(t, "mceItemAnchor")
                        }
                    }
                    return
            }
        });
        q.onVisualAid.dispatch(q, u, q.hasVisual)
    }, remove:function () {
        var q = this, r = q.getContainer();
        if (!q.removed) {
            q.removed = 1;
            q.hide();
            if (!q.settings.content_editable) {
                k.clear(q.getWin());
                k.clear(q.getDoc())
            }
            k.clear(q.getBody());
            k.clear(q.formElement);
            k.unbind(r);
            q.execCallback("remove_instance_callback", q);
            q.onRemove.dispatch(q);
            q.onExecCommand.listeners = [];
            n.remove(q);
            o.remove(r)
        }
    }, destroy:function (r) {
        var q = this;
        if (q.destroyed) {
            return
        }
        if (a) {
            k.unbind(q.getDoc());
            k.unbind(q.getWin());
            k.unbind(q.getBody())
        }
        if (!r) {
            n.removeUnload(q.destroy);
            tinyMCE.onBeforeUnload.remove(q._beforeUnload);
            if (q.theme && q.theme.destroy) {
                q.theme.destroy()
            }
            q.controlManager.destroy();
            q.selection.destroy();
            q.dom.destroy()
        }
        if (q.formElement) {
            q.formElement.submit = q.formElement._mceOldSubmit;
            q.formElement._mceOldSubmit = null
        }
        q.contentAreaContainer = q.formElement = q.container = q.settings.content_element = q.bodyElement = q.contentDocument = q.contentWindow = null;
        if (q.selection) {
            q.selection = q.selection.win = q.selection.dom = q.selection.dom.doc = null
        }
        q.destroyed = 1
    }, _addEvents:function () {
        var B = this, u, C = B.settings, r = B.dom, y = {mouseup:"onMouseUp", mousedown:"onMouseDown", click:"onClick", keyup:"onKeyUp", keydown:"onKeyDown", keypress:"onKeyPress", submit:"onSubmit", reset:"onReset", contextmenu:"onContextMenu", dblclick:"onDblClick", paste:"onPaste"};

        function q(t, D) {
            var s = t.type;
            if (B.removed) {
                return
            }
            if (B.onEvent.dispatch(B, t, D) !== false) {
                B[y[t.fakeType || t.type]].dispatch(B, t, D)
            }
        }

        i(y, function (t, s) {
            switch (s) {
                case"contextmenu":
                    r.bind(B.getDoc(), s, q);
                    break;
                case"paste":
                    r.bind(B.getBody(), s, function (D) {
                        q(D)
                    });
                    break;
                case"submit":
                case"reset":
                    r.bind(B.getElement().form || o.getParent(B.id, "form"), s, q);
                    break;
                default:
                    r.bind(C.content_editable ? B.getBody() : B.getDoc(), s, q)
            }
        });
        r.bind(C.content_editable ? B.getBody() : (a ? B.getDoc() : B.getWin()), "focus", function (s) {
            B.focus(true)
        });
        if (n.isGecko) {
            r.bind(B.getDoc(), "DOMNodeInserted", function (t) {
                var s;
                t = t.target;
                if (t.nodeType === 1 && t.nodeName === "IMG" && (s = t.getAttribute("data-mce-src"))) {
                    t.src = B.documentBaseURI.toAbsolute(s)
                }
            })
        }
        if (a) {
            function v() {
                var E = this, G = E.getDoc(), F = E.settings;
                if (a && !F.readonly) {
                    E._refreshContentEditable();
                    try {
                        G.execCommand("styleWithCSS", 0, false)
                    } catch (D) {
                        if (!E._isHidden()) {
                            try {
                                G.execCommand("useCSS", 0, true)
                            } catch (D) {
                            }
                        }
                    }
                    if (!F.table_inline_editing) {
                        try {
                            G.execCommand("enableInlineTableEditing", false, false)
                        } catch (D) {
                        }
                    }
                    if (!F.object_resizing) {
                        try {
                            G.execCommand("enableObjectResizing", false, false)
                        } catch (D) {
                        }
                    }
                }
            }

            B.onBeforeExecCommand.add(v);
            B.onMouseDown.add(v)
        }
        B.onMouseUp.add(B.nodeChanged);
        B.onKeyUp.add(function (s, t) {
            var D = t.keyCode;
            if ((D >= 33 && D <= 36) || (D >= 37 && D <= 40) || D == 13 || D == 45 || D == 46 || D == 8 || (n.isMac && (D == 91 || D == 93)) || t.ctrlKey) {
                B.nodeChanged()
            }
        });
        B.onKeyDown.add(function (t, D) {
            if (D.keyCode != j.BACKSPACE) {
                return
            }
            var s = t.selection.getRng();
            if (!s.collapsed) {
                return
            }
            var F = s.startContainer;
            var E = s.startOffset;
            while (F && F.nodeType && F.nodeType != 1 && F.parentNode) {
                F = F.parentNode
            }
            if (F && F.parentNode && F.parentNode.tagName === "BLOCKQUOTE" && F.parentNode.firstChild == F && E == 0) {
                t.formatter.toggle("blockquote", null, F.parentNode);
                s.setStart(F, 0);
                s.setEnd(F, 0);
                t.selection.setRng(s);
                t.selection.collapse(false)
            }
        });
        B.onReset.add(function () {
            B.setContent(B.startContent, {format:"raw"})
        });
        if (C.custom_shortcuts) {
            if (C.custom_undo_redo_keyboard_shortcuts) {
                B.addShortcut("ctrl+z", B.getLang("undo_desc"), "Undo");
                B.addShortcut("ctrl+y", B.getLang("redo_desc"), "Redo")
            }
            B.addShortcut("ctrl+b", B.getLang("bold_desc"), "Bold");
            B.addShortcut("ctrl+i", B.getLang("italic_desc"), "Italic");
            B.addShortcut("ctrl+u", B.getLang("underline_desc"), "Underline");
            for (u = 1; u <= 6; u++) {
                B.addShortcut("ctrl+" + u, "", ["FormatBlock", false, "h" + u])
            }
            B.addShortcut("ctrl+7", "", ["FormatBlock", false, "p"]);
            B.addShortcut("ctrl+8", "", ["FormatBlock", false, "div"]);
            B.addShortcut("ctrl+9", "", ["FormatBlock", false, "address"]);
            function x(t) {
                var s = null;
                if (!t.altKey && !t.ctrlKey && !t.metaKey) {
                    return s
                }
                i(B.shortcuts, function (D) {
                    if (n.isMac && D.ctrl != t.metaKey) {
                        return
                    } else {
                        if (!n.isMac && D.ctrl != t.ctrlKey) {
                            return
                        }
                    }
                    if (D.alt != t.altKey) {
                        return
                    }
                    if (D.shift != t.shiftKey) {
                        return
                    }
                    if (t.keyCode == D.keyCode || (t.charCode && t.charCode == D.charCode)) {
                        s = D;
                        return false
                    }
                });
                return s
            }

            B.onKeyUp.add(function (s, t) {
                var D = x(t);
                if (D) {
                    return k.cancel(t)
                }
            });
            B.onKeyPress.add(function (s, t) {
                var D = x(t);
                if (D) {
                    return k.cancel(t)
                }
            });
            B.onKeyDown.add(function (s, t) {
                var D = x(t);
                if (D) {
                    D.func.call(D.scope);
                    return k.cancel(t)
                }
            })
        }
        if (n.isIE) {
            r.bind(B.getDoc(), "controlselect", function (D) {
                var t = B.resizeInfo, s;
                D = D.target;
                if (D.nodeName !== "IMG") {
                    return
                }
                if (t) {
                    r.unbind(t.node, t.ev, t.cb)
                }
                if (!r.hasClass(D, "mceItemNoResize")) {
                    ev = "resizeend";
                    s = r.bind(D, ev, function (F) {
                        var E;
                        F = F.target;
                        if (E = r.getStyle(F, "width")) {
                            r.setAttrib(F, "width", E.replace(/[^0-9%]+/g, ""));
                            r.setStyle(F, "width", "")
                        }
                        if (E = r.getStyle(F, "height")) {
                            r.setAttrib(F, "height", E.replace(/[^0-9%]+/g, ""));
                            r.setStyle(F, "height", "")
                        }
                    })
                } else {
                    ev = "resizestart";
                    s = r.bind(D, "resizestart", k.cancel, k)
                }
                t = B.resizeInfo = {node:D, ev:ev, cb:s}
            })
        }
        if (n.isOpera) {
            B.onClick.add(function (s, t) {
                k.prevent(t)
            })
        }
        if (C.custom_undo_redo) {
            function A() {
                B.undoManager.typing = false;
                B.undoManager.add()
            }

            var z = n.isGecko ? "blur" : "focusout";
            r.bind(B.getDoc(), z, function (s) {
                if (!B.removed && B.undoManager.typing) {
                    A()
                }
            });
            B.dom.bind(B.dom.getRoot(), "dragend", function (s) {
                A()
            });
            B.onKeyUp.add(function (s, D) {
                var t = D.keyCode;
                if ((t >= 33 && t <= 36) || (t >= 37 && t <= 40) || t == 13 || t == 45 || D.ctrlKey) {
                    A()
                }
            });
            B.onKeyDown.add(function (s, E) {
                var D = E.keyCode, t;
                if (D == 8) {
                    t = B.getDoc().selection;
                    if (t && t.createRange && t.createRange().item) {
                        B.undoManager.beforeChange();
                        s.dom.remove(t.createRange().item(0));
                        A();
                        return k.cancel(E)
                    }
                }
                if ((D >= 33 && D <= 36) || (D >= 37 && D <= 40) || D == 13 || D == 45) {
                    if (n.isIE && D == 13) {
                        B.undoManager.beforeChange()
                    }
                    if (B.undoManager.typing) {
                        A()
                    }
                    return
                }
                if ((D < 16 || D > 20) && D != 224 && D != 91 && !B.undoManager.typing) {
                    B.undoManager.beforeChange();
                    B.undoManager.typing = true;
                    B.undoManager.add()
                }
            });
            B.onMouseDown.add(function () {
                if (B.undoManager.typing) {
                    A()
                }
            })
        }
    }, _refreshContentEditable:function () {
        var r = this, q, s;
        if (r._isHidden()) {
            q = r.getBody();
            s = q.parentNode;
            s.removeChild(q);
            s.appendChild(q);
            q.focus()
        }
    }, _isHidden:function () {
        var q;
        if (!a) {
            return 0
        }
        q = this.selection.getSel();
        return(!q || !q.rangeCount || q.rangeCount == 0)
    }})
})(tinymce);
(function (c) {
    var d = c.each, e, a = true, b = false;
    c.EditorCommands = function (n) {
        var m = n.dom, p = n.selection, j = {state:{}, exec:{}, value:{}}, k = n.settings, q = n.formatter, o;

        function r(z, y, x) {
            var v;
            z = z.toLowerCase();
            if (v = j.exec[z]) {
                v(z, y, x);
                return a
            }
            return b
        }

        function l(x) {
            var v;
            x = x.toLowerCase();
            if (v = j.state[x]) {
                return v(x)
            }
            return -1
        }

        function h(x) {
            var v;
            x = x.toLowerCase();
            if (v = j.value[x]) {
                return v(x)
            }
            return b
        }

        function u(v, x) {
            x = x || "exec";
            d(v, function (z, y) {
                d(y.toLowerCase().split(","), function (A) {
                    j[x][A] = z
                })
            })
        }

        c.extend(this, {execCommand:r, queryCommandState:l, queryCommandValue:h, addCommands:u});
        function f(y, x, v) {
            if (x === e) {
                x = b
            }
            if (v === e) {
                v = null
            }
            return n.getDoc().execCommand(y, x, v)
        }

        function t(v) {
            return q.match(v)
        }

        function s(v, x) {
            q.toggle(v, x ? {value:x} : e)
        }

        function i(v) {
            o = p.getBookmark(v)
        }

        function g() {
            p.moveToBookmark(o)
        }

        u({"mceResetDesignMode,mceBeginUndoLevel":function () {
        }, "mceEndUndoLevel,mceAddUndoLevel":function () {
            n.undoManager.add()
        }, "Cut,Copy,Paste":function (z) {
            var y = n.getDoc(), v;
            try {
                f(z)
            } catch (x) {
                v = a
            }
            if (v || !y.queryCommandSupported(z)) {
                if (c.isGecko) {
                    n.windowManager.confirm(n.getLang("clipboard_msg"), function (A) {
                        if (A) {
                            open("http://www.mozilla.org/editor/midasdemo/securityprefs.html", "_blank")
                        }
                    })
                } else {
                    n.windowManager.alert(n.getLang("clipboard_no_support"))
                }
            }
        }, unlink:function (v) {
            if (p.isCollapsed()) {
                p.select(p.getNode())
            }
            f(v);
            p.collapse(b)
        }, "JustifyLeft,JustifyCenter,JustifyRight,JustifyFull":function (v) {
            var x = v.substring(7);
            d("left,center,right,full".split(","), function (y) {
                if (x != y) {
                    q.remove("align" + y)
                }
            });
            s("align" + x);
            r("mceRepaint")
        }, "InsertUnorderedList,InsertOrderedList":function (y) {
            var v, x;
            f(y);
            v = m.getParent(p.getNode(), "ol,ul");
            if (v) {
                x = v.parentNode;
                if (/^(H[1-6]|P|ADDRESS|PRE)$/.test(x.nodeName)) {
                    i();
                    m.split(x, v);
                    g()
                }
            }
        }, "Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function (v) {
            s(v)
        }, "ForeColor,HiliteColor,FontName":function (y, x, v) {
            s(y, v)
        }, FontSize:function (z, y, x) {
            var v, A;
            if (x >= 1 && x <= 7) {
                A = c.explode(k.font_size_style_values);
                v = c.explode(k.font_size_classes);
                if (v) {
                    x = v[x - 1] || x
                } else {
                    x = A[x - 1] || x
                }
            }
            s(z, x)
        }, RemoveFormat:function (v) {
            q.remove(v)
        }, mceBlockQuote:function (v) {
            s("blockquote")
        }, FormatBlock:function (y, x, v) {
            return s(v || "p")
        }, mceCleanup:function () {
            var v = p.getBookmark();
            n.setContent(n.getContent({cleanup:a}), {cleanup:a});
            p.moveToBookmark(v)
        }, mceRemoveNode:function (z, y, x) {
            var v = x || p.getNode();
            if (v != n.getBody()) {
                i();
                n.dom.remove(v, a);
                g()
            }
        }, mceSelectNodeDepth:function (z, y, x) {
            var v = 0;
            m.getParent(p.getNode(), function (A) {
                if (A.nodeType == 1 && v++ == x) {
                    p.select(A);
                    return b
                }
            }, n.getBody())
        }, mceSelectNode:function (y, x, v) {
            p.select(v)
        }, mceInsertContent:function (B, I, K) {
            var y, J, E, z, F, G, D, C, L, x, A, M, v, H;
            y = n.parser;
            J = new c.html.Serializer({}, n.schema);
            v = '<span id="mce_marker" data-mce-type="bookmark">\uFEFF</span>';
            G = {content:K, format:"html"};
            p.onBeforeSetContent.dispatch(p, G);
            K = G.content;
            if (K.indexOf("{$caret}") == -1) {
                K += "{$caret}"
            }
            K = K.replace(/\{\$caret\}/, v);
            if (!p.isCollapsed()) {
                n.getDoc().execCommand("Delete", false, null)
            }
            E = p.getNode();
            G = {context:E.nodeName.toLowerCase()};
            F = y.parse(K, G);
            A = F.lastChild;
            if (A.attr("id") == "mce_marker") {
                D = A;
                for (A = A.prev; A; A = A.walk(true)) {
                    if (A.type == 3 || !m.isBlock(A.name)) {
                        A.parent.insert(D, A, A.name === "br");
                        break
                    }
                }
            }
            if (!G.invalid) {
                K = J.serialize(F);
                A = E.firstChild;
                M = E.lastChild;
                if (!A || (A === M && A.nodeName === "BR")) {
                    m.setHTML(E, K)
                } else {
                    p.setContent(K)
                }
            } else {
                p.setContent(v);
                E = n.selection.getNode();
                z = n.getBody();
                if (E.nodeType == 9) {
                    E = A = z
                } else {
                    A = E
                }
                while (A !== z) {
                    E = A;
                    A = A.parentNode
                }
                K = E == z ? z.innerHTML : m.getOuterHTML(E);
                K = J.serialize(y.parse(K.replace(/<span (id="mce_marker"|id=mce_marker).+?<\/span>/i, function () {
                    return J.serialize(F)
                })));
                if (E == z) {
                    m.setHTML(z, K)
                } else {
                    m.setOuterHTML(E, K)
                }
            }
            D = m.get("mce_marker");
            C = m.getRect(D);
            L = m.getViewPort(n.getWin());
            if ((C.y + C.h > L.y + L.h || C.y < L.y) || (C.x > L.x + L.w || C.x < L.x)) {
                H = c.isIE ? n.getDoc().documentElement : n.getBody();
                H.scrollLeft = C.x;
                H.scrollTop = C.y - L.h + 25
            }
            x = m.createRng();
            A = D.previousSibling;
            if (A && A.nodeType == 3) {
                x.setStart(A, A.nodeValue.length)
            } else {
                x.setStartBefore(D);
                x.setEndBefore(D)
            }
            m.remove(D);
            p.setRng(x);
            p.onSetContent.dispatch(p, G);
            n.addVisual()
        }, mceInsertRawHTML:function (y, x, v) {
            p.setContent("tiny_mce_marker");
            n.setContent(n.getContent().replace(/tiny_mce_marker/g, function () {
                return v
            }))
        }, mceSetContent:function (y, x, v) {
            n.setContent(v)
        }, "Indent,Outdent":function (z) {
            var x, v, y;
            x = k.indentation;
            v = /[a-z%]+$/i.exec(x);
            x = parseInt(x);
            if (!l("InsertUnorderedList") && !l("InsertOrderedList")) {
                d(p.getSelectedBlocks(), function (A) {
                    if (z == "outdent") {
                        y = Math.max(0, parseInt(A.style.paddingLeft || 0) - x);
                        m.setStyle(A, "paddingLeft", y ? y + v : "")
                    } else {
                        m.setStyle(A, "paddingLeft", (parseInt(A.style.paddingLeft || 0) + x) + v)
                    }
                })
            } else {
                f(z)
            }
        }, mceRepaint:function () {
            var x;
            if (c.isGecko) {
                try {
                    i(a);
                    if (p.getSel()) {
                        p.getSel().selectAllChildren(n.getBody())
                    }
                    p.collapse(a);
                    g()
                } catch (v) {
                }
            }
        }, mceToggleFormat:function (y, x, v) {
            q.toggle(v)
        }, InsertHorizontalRule:function () {
            n.execCommand("mceInsertContent", false, "<hr />")
        }, mceToggleVisualAid:function () {
            n.hasVisual = !n.hasVisual;
            n.addVisual()
        }, mceReplaceContent:function (y, x, v) {
            n.execCommand("mceInsertContent", false, v.replace(/\{\$selection\}/g, p.getContent({format:"text"})))
        }, mceInsertLink:function (z, y, x) {
            var v;
            if (typeof(x) == "string") {
                x = {href:x}
            }
            v = m.getParent(p.getNode(), "a");
            x.href = x.href.replace(" ", "%20");
            if (!v || !x.href) {
                q.remove("link")
            }
            if (x.href) {
                q.apply("link", x, v)
            }
        }, selectAll:function () {
            var x = m.getRoot(), v = m.createRng();
            v.setStart(x, 0);
            v.setEnd(x, x.childNodes.length);
            n.selection.setRng(v)
        }});
        u({"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull":function (z) {
            var x = "align" + z.substring(7);
            var v = p.isCollapsed() ? [p.getNode()] : p.getSelectedBlocks();
            var y = c.map(v, function (A) {
                return !!q.matchNode(A, x)
            });
            return c.inArray(y, a) !== -1
        }, "Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function (v) {
            return t(v)
        }, mceBlockQuote:function () {
            return t("blockquote")
        }, Outdent:function () {
            var v;
            if (k.inline_styles) {
                if ((v = m.getParent(p.getStart(), m.isBlock)) && parseInt(v.style.paddingLeft) > 0) {
                    return a
                }
                if ((v = m.getParent(p.getEnd(), m.isBlock)) && parseInt(v.style.paddingLeft) > 0) {
                    return a
                }
            }
            return l("InsertUnorderedList") || l("InsertOrderedList") || (!k.inline_styles && !!m.getParent(p.getNode(), "BLOCKQUOTE"))
        }, "InsertUnorderedList,InsertOrderedList":function (v) {
            return m.getParent(p.getNode(), v == "insertunorderedlist" ? "UL" : "OL")
        }}, "state");
        u({"FontSize,FontName":function (y) {
            var x = 0, v;
            if (v = m.getParent(p.getNode(), "span")) {
                if (y == "fontsize") {
                    x = v.style.fontSize
                } else {
                    x = v.style.fontFamily.replace(/, /g, ",").replace(/[\'\"]/g, "").toLowerCase()
                }
            }
            return x
        }}, "value");
        if (k.custom_undo_redo) {
            u({Undo:function () {
                n.undoManager.undo()
            }, Redo:function () {
                n.undoManager.redo()
            }})
        }
    }
})(tinymce);
(function (b) {
    var a = b.util.Dispatcher;
    b.UndoManager = function (f) {
        var d, e = 0, h = [], c;

        function g() {
            return b.trim(f.getContent({format:"raw", no_events:1}).replace(/<span[^>]+data-mce-bogus[^>]+>[\u200B\uFEFF]+<\/span>/g, ""))
        }

        return d = {typing:false, onAdd:new a(d), onUndo:new a(d), onRedo:new a(d), beforeChange:function () {
            c = f.selection.getBookmark(2, true)
        }, add:function (m) {
            var j, k = f.settings, l;
            m = m || {};
            m.content = g();
            l = h[e];
            if (l && l.content == m.content) {
                return null
            }
            if (h[e]) {
                h[e].beforeBookmark = c
            }
            if (k.custom_undo_redo_levels) {
                if (h.length > k.custom_undo_redo_levels) {
                    for (j = 0; j < h.length - 1; j++) {
                        h[j] = h[j + 1]
                    }
                    h.length--;
                    e = h.length
                }
            }
            m.bookmark = f.selection.getBookmark(2, true);
            if (e < h.length - 1) {
                h.length = e + 1
            }
            h.push(m);
            e = h.length - 1;
            d.onAdd.dispatch(d, m);
            f.isNotDirty = 0;
            return m
        }, undo:function () {
            var k, j;
            if (d.typing) {
                d.add();
                d.typing = false
            }
            if (e > 0) {
                k = h[--e];
                f.setContent(k.content, {format:"raw"});
                f.selection.moveToBookmark(k.beforeBookmark);
                d.onUndo.dispatch(d, k)
            }
            return k
        }, redo:function () {
            var i;
            if (e < h.length - 1) {
                i = h[++e];
                f.setContent(i.content, {format:"raw"});
                f.selection.moveToBookmark(i.bookmark);
                d.onRedo.dispatch(d, i)
            }
            return i
        }, clear:function () {
            h = [];
            e = 0;
            d.typing = false
        }, hasUndo:function () {
            return e > 0 || this.typing
        }, hasRedo:function () {
            return e < h.length - 1 && !this.typing
        }}
    }
})(tinymce);
(function (j) {
    var i = j.dom.Event, c = j.isIE, a = j.isGecko, b = j.isOpera, h = j.each, g = j.extend, d = true, f = false;

    function e(m, o, k) {
        var l, n;
        if (o.isEmpty(k) && !c) {
            l = o.getParent(k, "ul,ol");
            if (!o.getParent(l.parentNode, "ul,ol")) {
                o.split(l, k);
                n = o.create("p", 0, '<br data-mce-bogus="1" />');
                o.replace(n, k);
                m.select(n, 1)
            }
            return f
        }
        return d
    }

    j.create("tinymce.ForceBlocks", {ForceBlocks:function (k) {
        var l = this, m = k.settings, n;
        l.editor = k;
        l.dom = k.dom;
        n = (m.forced_root_block || "p").toLowerCase();
        m.element = n.toUpperCase();
        k.onPreInit.add(l.setup, l)
    }, setup:function () {
        var l = this, k = l.editor, n = k.settings, q = k.dom, m = k.selection, o = k.schema.getBlockElements();
        if (n.forced_root_block) {
            function r() {
                var v = m.getStart(), t = k.getBody(), s, x, B, D, C, u, y, z = -16777215;
                if (!v || v.nodeType !== 1) {
                    return
                }
                while (v != t) {
                    if (o[v.nodeName]) {
                        return
                    }
                    v = v.parentNode
                }
                s = m.getRng();
                if (s.setStart) {
                    x = s.startContainer;
                    B = s.startOffset;
                    D = s.endContainer;
                    C = s.endOffset
                } else {
                    if (s.item) {
                        s = k.getDoc().body.createTextRange();
                        s.moveToElementText(s.item(0))
                    }
                    tmpRng = s.duplicate();
                    tmpRng.collapse(true);
                    B = tmpRng.move("character", z) * -1;
                    if (!tmpRng.collapsed) {
                        tmpRng = s.duplicate();
                        tmpRng.collapse(false);
                        C = (tmpRng.move("character", z) * -1) - B
                    }
                }
                for (v = t.firstChild; v; v) {
                    if (v.nodeType === 3 || (v.nodeType == 1 && !o[v.nodeName])) {
                        if (!u) {
                            u = q.create(n.forced_root_block);
                            v.parentNode.insertBefore(u, v)
                        }
                        y = v;
                        v = v.nextSibling;
                        u.appendChild(y)
                    } else {
                        u = null;
                        v = v.nextSibling
                    }
                }
                if (s.setStart) {
                    s.setStart(x, B);
                    s.setEnd(D, C);
                    m.setRng(s)
                } else {
                    try {
                        s = k.getDoc().body.createTextRange();
                        s.moveToElementText(t);
                        s.collapse(true);
                        s.moveStart("character", B);
                        if (C > 0) {
                            s.moveEnd("character", C)
                        }
                        s.select()
                    } catch (A) {
                    }
                }
                k.nodeChanged()
            }

            k.onKeyUp.add(r);
            k.onClick.add(r)
        }
        if (n.force_br_newlines) {
            if (c) {
                k.onKeyPress.add(function (s, t) {
                    var u;
                    if (t.keyCode == 13 && m.getNode().nodeName != "LI") {
                        m.setContent('<br id="__" /> ', {format:"raw"});
                        u = q.get("__");
                        u.removeAttribute("id");
                        m.select(u);
                        m.collapse();
                        return i.cancel(t)
                    }
                })
            }
        }
        if (n.force_p_newlines) {
            k.onKeyPress.add(function (s, t) {
                if (t.keyCode == 13 && !t.shiftKey && !l.insertPara(t)) {
                    i.cancel(t)
                }
            });
            if (a) {
                k.onKeyDown.add(function (s, t) {
                    if ((t.keyCode == 8 || t.keyCode == 46) && !t.shiftKey) {
                        l.backspaceDelete(t, t.keyCode == 8)
                    }
                })
            }
        }
        if (j.isWebKit) {
            function p(t) {
                var s = m.getRng(), u, y = q.create("div", null, " "), x, v = q.getViewPort(t.getWin()).h;
                s.insertNode(u = q.create("br"));
                s.setStartAfter(u);
                s.setEndAfter(u);
                m.setRng(s);
                if (m.getSel().focusNode == u.previousSibling) {
                    m.select(q.insertAfter(q.doc.createTextNode("\u00a0"), u));
                    m.collapse(d)
                }
                q.insertAfter(y, u);
                x = q.getPos(y).y;
                q.remove(y);
                if (x > v) {
                    t.getWin().scrollTo(0, x)
                }
            }

            k.onKeyPress.add(function (s, t) {
                if (t.keyCode == 13 && (t.shiftKey || (n.force_br_newlines && !q.getParent(m.getNode(), "h1,h2,h3,h4,h5,h6,ol,ul")))) {
                    p(s);
                    i.cancel(t)
                }
            })
        }
        if (c) {
            if (n.element != "P") {
                k.onKeyPress.add(function (s, t) {
                    l.lastElm = m.getNode().nodeName
                });
                k.onKeyUp.add(function (t, u) {
                    var x, v = m.getNode(), s = t.getBody();
                    if (s.childNodes.length === 1 && v.nodeName == "P") {
                        v = q.rename(v, n.element);
                        m.select(v);
                        m.collapse();
                        t.nodeChanged()
                    } else {
                        if (u.keyCode == 13 && !u.shiftKey && l.lastElm != "P") {
                            x = q.getParent(v, "p");
                            if (x) {
                                q.rename(x, n.element);
                                t.nodeChanged()
                            }
                        }
                    }
                })
            }
        }
    }, getParentBlock:function (l) {
        var k = this.dom;
        return k.getParent(l, k.isBlock)
    }, insertPara:function (Q) {
        var D = this, v = D.editor, M = v.dom, V = v.selection, R = v.getDoc(), W = v.settings, E = V.getSel(), F = V.getRng(true), U = R.body;
        var J, L, G, O, N, o, l, p, y, k, B, T, m, x, H, C, u, A, z;

        function K(r, s) {
            var n = r.cloneRange();
            n.setStart(r.endContainer, r.endOffset);
            n.setEndAfter(s);
            return M.isEmpty(n.cloneContents())
        }

        function q(s, n) {
            var Y, X, r, Z, t;
            r = M.createRng();
            if (s.hasChildNodes()) {
                Y = new j.dom.TreeWalker(s, s);
                while (X = Y.current()) {
                    if (X.nodeType == 3) {
                        r.setStart(X, 0);
                        r.setEnd(X, 0);
                        break
                    }
                    if (/^(BR|IMG)$/.test(X.nodeName)) {
                        r.setStartBefore(X);
                        r.setEndBefore(X);
                        break
                    }
                    X = Y.next()
                }
            } else {
                r.setStart(s, 0);
                r.setEnd(s, 0)
            }
            V.setRng(r);
            if (n !== false) {
                t = M.getViewPort(v.getWin());
                Z = M.getPos(s).y;
                if (Z < t.y || Z + 25 > t.y + t.h) {
                    v.getWin().scrollTo(0, Z < t.y ? Z : Z - t.h + 25)
                }
            }
        }

        function I(r) {
            if (r.nodeType == 3 && r.nodeValue.length == 0) {
                M.remove(r)
            }
            if (r.hasChildNodes()) {
                for (var n = 0; n < r.childNodes.length; n++) {
                    I(r.childNodes[n])
                }
            }
        }

        v.undoManager.beforeChange();
        if (typeof E.anchorNode != "undefined") {
            J = M.createRng();
            J.setStart(E.anchorNode, E.anchorOffset);
            J.collapse(d);
            L = M.createRng();
            L.setStart(E.focusNode, E.focusOffset);
            L.collapse(d);
            G = J.compareBoundaryPoints(J.START_TO_END, L) < 0;
            O = G ? E.anchorNode : E.focusNode;
            N = G ? E.anchorOffset : E.focusOffset;
            o = G ? E.focusNode : E.anchorNode;
            l = G ? E.focusOffset : E.anchorOffset
        } else {
            J = F.cloneRange();
            J.collapse(d);
            L = F.cloneRange();
            L.collapse(f);
            O = F.startContainer;
            N = F.startOffset;
            o = F.endContainer;
            l = F.endOffset
        }
        if (O === o && /^(TD|TH)$/.test(O.nodeName)) {
            O.innerHTML = "";
            M.add(O, W.element, null, c ? "" : "<br />");
            T = M.add(O, W.element, null, c ? "" : "<br />");
            q(T);
            return f
        }
        if (O == U && o == U && U.firstChild && M.isBlock(U.firstChild)) {
            O = o = O.firstChild;
            N = l = 0;
            J = M.createRng();
            J.setStart(O, 0);
            L = M.createRng();
            L.setStart(o, 0)
        }
        if (!U.hasChildNodes()) {
            U.appendChild(M.create("br"))
        }
        O = O.nodeName == "HTML" ? R.body : O;
        O = O.nodeName == "BODY" ? O.firstChild : O;
        o = o.nodeName == "HTML" ? R.body : o;
        o = o.nodeName == "BODY" ? o.firstChild : o;
        p = D.getParentBlock(O);
        y = D.getParentBlock(o);
        k = p ? p.nodeName : W.element;
        if (v.settings.end_container_on_empty_block) {
            u = M.getParent(p, "hgroup,blockquote,section,article");
            if (u && (M.isEmpty(p) || (p.firstChild === p.lastChild && (!p.firstChild || p.firstChild.nodeName == "BR")))) {
                M.split(u, p);
                V.select(p, true);
                V.collapse(true);
                return
            }
        }
        if (H = D.dom.getParent(p, "li")) {
            if (H.nodeName == "LI") {
                return e(V, D.dom, H)
            }
            return d
        }
        if (p && (p.nodeName == "CAPTION" || /absolute|relative|fixed/gi.test(M.getStyle(p, "position", 1)))) {
            k = W.element;
            p = null
        }
        if (y && (y.nodeName == "CAPTION" || /absolute|relative|fixed/gi.test(M.getStyle(p, "position", 1)))) {
            k = W.element;
            y = null
        }
        if (/(TD|TABLE|TH|CAPTION)/.test(k) || (p && k == "DIV" && /left|right/gi.test(M.getStyle(p, "float", 1)))) {
            k = W.element;
            p = y = null
        }
        B = (p && p.nodeName == k) ? M.clone(p, false) : M.create(k);
        T = (y && y.nodeName == k) ? M.clone(y, false) : M.create(k);
        T.removeAttribute("id");
        if (/^(H[1-6])$/.test(k) && K(F, p, M)) {
            T = M.create(W.element);
            if (D.dom.getParent(p, "hgroup")) {
                T = M.create(k)
            }
        }
        H = m = O;
        do {
            if (H == U || H.nodeType == 9 || D.dom.isBlock(H) || /(TD|TABLE|TH|CAPTION)/.test(H.nodeName)) {
                break
            }
            m = H
        } while ((H = H.previousSibling ? H.previousSibling : H.parentNode));
        H = x = o;
        do {
            if (H == U || H.nodeType == 9 || D.dom.isBlock(H) || /(TD|TABLE|TH|CAPTION)/.test(H.nodeName)) {
                break
            }
            x = H
        } while ((H = H.nextSibling ? H.nextSibling : H.parentNode));
        if (m.nodeName == k) {
            J.setStart(m, 0)
        } else {
            J.setStartBefore(m)
        }
        J.setEnd(O, N);
        B.appendChild(J.cloneContents() || R.createTextNode(""));
        try {
            L.setEndAfter(x)
        } catch (P) {
        }
        L.setStart(o, l);
        T.appendChild(L.cloneContents() || R.createTextNode(""));
        F = M.createRng();
        if (!m.previousSibling && m.parentNode.nodeName == k) {
            F.setStartBefore(m.parentNode)
        } else {
            if (J.startContainer.nodeName == k && J.startOffset == 0) {
                F.setStartBefore(J.startContainer)
            } else {
                F.setStart(J.startContainer, J.startOffset)
            }
        }
        if (!x.nextSibling && x.parentNode.nodeName == k) {
            F.setEndAfter(x.parentNode)
        } else {
            F.setEnd(L.endContainer, L.endOffset)
        }
        if (!c || p != y || (p && !M.isEmpty(p))) {
            F.deleteContents()
        }
        H = F.startContainer.childNodes[F.startOffset];
        if (H && !H.hasChildNodes()) {
            M.remove(H)
        }
        if (B.firstChild && B.firstChild.nodeName == k) {
            B.innerHTML = B.firstChild.innerHTML
        }
        if (T.firstChild && T.firstChild.nodeName == k) {
            T.innerHTML = T.firstChild.innerHTML
        }
        function S(Y, t) {
            var r = [], aa, Z, X, s;
            s = c ? "" : "<br />";
            while (Y.firstChild) {
                Y.removeChild(Y.firstChild)
            }
            if (W.keep_styles) {
                Z = t;
                do {
                    if (/^(SPAN|STRONG|B|EM|I|FONT|STRIKE|U)$/.test(Z.nodeName)) {
                        aa = Z.cloneNode(f);
                        M.setAttrib(aa, "id", "");
                        r.push(aa)
                    }
                } while (Z = Z.parentNode)
            }
            if (r.length > 0) {
                for (X = r.length - 1, aa = Y; X >= 0; X--) {
                    aa = aa.appendChild(r[X])
                }
                r[0].innerHTML = s;
                return r[0]
            } else {
                Y.innerHTML = s
            }
            return Y
        }

        if (c) {
            I(B);
            I(T)
        }
        if (M.isEmpty(B)) {
            A = S(B, O)
        }
        if (M.isEmpty(T)) {
            z = S(T, o)
        }
        if (b && parseFloat(opera.version()) < 9.5) {
            F.insertNode(B);
            F.insertNode(T)
        } else {
            F.insertNode(T);
            F.insertNode(B)
        }
        if (V.tridentSel && A) {
            q(A, false)
        }
        q(z || T);
        v.undoManager.add();
        return f
    }, backspaceDelete:function (q, z) {
        var A = this, p = A.editor, v = p.getBody(), o = p.dom, m, s = p.selection, l = s.getRng(), u = l.startContainer, m, x, y, k;
        if (!z && l.collapsed && u.nodeType == 1 && l.startOffset == u.childNodes.length) {
            k = new j.dom.TreeWalker(u.lastChild, u);
            for (m = u.lastChild; m; m = k.prev()) {
                if (m.nodeType == 3) {
                    l.setStart(m, m.nodeValue.length);
                    l.collapse(true);
                    s.setRng(l);
                    return
                }
            }
        }
        if (u && p.dom.isBlock(u) && !/^(TD|TH)$/.test(u.nodeName) && z) {
            if (u.childNodes.length == 0 || (u.childNodes.length == 1 && u.firstChild.nodeName == "BR")) {
                m = u;
                while ((m = m.previousSibling) && !p.dom.isBlock(m)) {
                }
                if (m) {
                    if (u != v.firstChild) {
                        x = p.dom.doc.createTreeWalker(m, NodeFilter.SHOW_TEXT, null, f);
                        while (y = x.nextNode()) {
                            m = y
                        }
                        l = p.getDoc().createRange();
                        l.setStart(m, m.nodeValue ? m.nodeValue.length : 0);
                        l.setEnd(m, m.nodeValue ? m.nodeValue.length : 0);
                        s.setRng(l);
                        p.dom.remove(u)
                    }
                    return i.cancel(q)
                }
            }
        }
    }})
})(tinymce);
(function (c) {
    var b = c.DOM, a = c.dom.Event, d = c.each, e = c.extend;
    c.create("tinymce.ControlManager", {ControlManager:function (f, j) {
        var h = this, g;
        j = j || {};
        h.editor = f;
        h.controls = {};
        h.onAdd = new c.util.Dispatcher(h);
        h.onPostRender = new c.util.Dispatcher(h);
        h.prefix = j.prefix || f.id + "_";
        h._cls = {};
        h.onPostRender.add(function () {
            d(h.controls, function (i) {
                i.postRender()
            })
        })
    }, get:function (f) {
        return this.controls[this.prefix + f] || this.controls[f]
    }, setActive:function (h, f) {
        var g = null;
        if (g = this.get(h)) {
            g.setActive(f)
        }
        return g
    }, setDisabled:function (h, f) {
        var g = null;
        if (g = this.get(h)) {
            g.setDisabled(f)
        }
        return g
    }, add:function (g) {
        var f = this;
        if (g) {
            f.controls[g.id] = g;
            f.onAdd.dispatch(g, f)
        }
        return g
    }, createControl:function (i) {
        var h, g = this, f = g.editor;
        d(f.plugins, function (j) {
            if (j.createControl) {
                h = j.createControl(i, g);
                if (h) {
                    return false
                }
            }
        });
        switch (i) {
            case"|":
            case"separator":
                return g.createSeparator()
        }
        if (!h && f.buttons && (h = f.buttons[i])) {
            return g.createButton(i, h)
        }
        return g.add(h)
    }, createDropMenu:function (f, n, h) {
        var m = this, i = m.editor, j, g, k, l;
        n = e({"class":"mceDropDown", constrain:i.settings.constrain_menus}, n);
        n["class"] = n["class"] + " " + i.getParam("skin") + "Skin";
        if (k = i.getParam("skin_variant")) {
            n["class"] += " " + i.getParam("skin") + "Skin" + k.substring(0, 1).toUpperCase() + k.substring(1)
        }
        f = m.prefix + f;
        l = h || m._cls.dropmenu || c.ui.DropMenu;
        j = m.controls[f] = new l(f, n);
        j.onAddItem.add(function (r, q) {
            var p = q.settings;
            p.title = i.getLang(p.title, p.title);
            if (!p.onclick) {
                p.onclick = function (o) {
                    if (p.cmd) {
                        i.execCommand(p.cmd, p.ui || false, p.value)
                    }
                }
            }
        });
        i.onRemove.add(function () {
            j.destroy()
        });
        if (c.isIE) {
            j.onShowMenu.add(function () {
                i.focus();
                g = i.selection.getBookmark(1)
            });
            j.onHideMenu.add(function () {
                if (g) {
                    i.selection.moveToBookmark(g);
                    g = 0
                }
            })
        }
        return m.add(j)
    }, createListBox:function (f, n, h) {
        var l = this, j = l.editor, i, k, m;
        if (l.get(f)) {
            return null
        }
        n.title = j.translate(n.title);
        n.scope = n.scope || j;
        if (!n.onselect) {
            n.onselect = function (o) {
                j.execCommand(n.cmd, n.ui || false, o || n.value)
            }
        }
        n = e({title:n.title, "class":"mce_" + f, scope:n.scope, control_manager:l}, n);
        f = l.prefix + f;
        function g(o) {
            return o.settings.use_accessible_selects && !c.isGecko
        }

        if (j.settings.use_native_selects || g(j)) {
            k = new c.ui.NativeListBox(f, n)
        } else {
            m = h || l._cls.listbox || c.ui.ListBox;
            k = new m(f, n, j)
        }
        l.controls[f] = k;
        if (c.isWebKit) {
            k.onPostRender.add(function (p, o) {
                a.add(o, "mousedown", function () {
                    j.bookmark = j.selection.getBookmark(1)
                });
                a.add(o, "focus", function () {
                    j.selection.moveToBookmark(j.bookmark);
                    j.bookmark = null
                })
            })
        }
        if (k.hideMenu) {
            j.onMouseDown.add(k.hideMenu, k)
        }
        return l.add(k)
    }, createButton:function (m, i, l) {
        var h = this, g = h.editor, j, k, f;
        if (h.get(m)) {
            return null
        }
        i.title = g.translate(i.title);
        i.label = g.translate(i.label);
        i.scope = i.scope || g;
        if (!i.onclick && !i.menu_button) {
            i.onclick = function () {
                g.execCommand(i.cmd, i.ui || false, i.value)
            }
        }
        i = e({title:i.title, "class":"mce_" + m, unavailable_prefix:g.getLang("unavailable", ""), scope:i.scope, control_manager:h}, i);
        m = h.prefix + m;
        if (i.menu_button) {
            f = l || h._cls.menubutton || c.ui.MenuButton;
            k = new f(m, i, g);
            g.onMouseDown.add(k.hideMenu, k)
        } else {
            f = h._cls.button || c.ui.Button;
            k = new f(m, i, g)
        }
        return h.add(k)
    }, createMenuButton:function (h, f, g) {
        f = f || {};
        f.menu_button = 1;
        return this.createButton(h, f, g)
    }, createSplitButton:function (m, i, l) {
        var h = this, g = h.editor, j, k, f;
        if (h.get(m)) {
            return null
        }
        i.title = g.translate(i.title);
        i.scope = i.scope || g;
        if (!i.onclick) {
            i.onclick = function (n) {
                g.execCommand(i.cmd, i.ui || false, n || i.value)
            }
        }
        if (!i.onselect) {
            i.onselect = function (n) {
                g.execCommand(i.cmd, i.ui || false, n || i.value)
            }
        }
        i = e({title:i.title, "class":"mce_" + m, scope:i.scope, control_manager:h}, i);
        m = h.prefix + m;
        f = l || h._cls.splitbutton || c.ui.SplitButton;
        k = h.add(new f(m, i, g));
        g.onMouseDown.add(k.hideMenu, k);
        return k
    }, createColorSplitButton:function (f, n, h) {
        var l = this, j = l.editor, i, k, m, g;
        if (l.get(f)) {
            return null
        }
        n.title = j.translate(n.title);
        n.scope = n.scope || j;
        if (!n.onclick) {
            n.onclick = function (o) {
                if (c.isIE) {
                    g = j.selection.getBookmark(1)
                }
                j.execCommand(n.cmd, n.ui || false, o || n.value)
            }
        }
        if (!n.onselect) {
            n.onselect = function (o) {
                j.execCommand(n.cmd, n.ui || false, o || n.value)
            }
        }
        n = e({title:n.title, "class":"mce_" + f, menu_class:j.getParam("skin") + "Skin", scope:n.scope, more_colors_title:j.getLang("more_colors")}, n);
        f = l.prefix + f;
        m = h || l._cls.colorsplitbutton || c.ui.ColorSplitButton;
        k = new m(f, n, j);
        j.onMouseDown.add(k.hideMenu, k);
        j.onRemove.add(function () {
            k.destroy()
        });
        if (c.isIE) {
            k.onShowMenu.add(function () {
                j.focus();
                g = j.selection.getBookmark(1)
            });
            k.onHideMenu.add(function () {
                if (g) {
                    j.selection.moveToBookmark(g);
                    g = 0
                }
            })
        }
        return l.add(k)
    }, createToolbar:function (k, h, j) {
        var i, g = this, f;
        k = g.prefix + k;
        f = j || g._cls.toolbar || c.ui.Toolbar;
        i = new f(k, h, g.editor);
        if (g.get(k)) {
            return null
        }
        return g.add(i)
    }, createToolbarGroup:function (k, h, j) {
        var i, g = this, f;
        k = g.prefix + k;
        f = j || this._cls.toolbarGroup || c.ui.ToolbarGroup;
        i = new f(k, h, g.editor);
        if (g.get(k)) {
            return null
        }
        return g.add(i)
    }, createSeparator:function (g) {
        var f = g || this._cls.separator || c.ui.Separator;
        return new f()
    }, setControlType:function (g, f) {
        return this._cls[g.toLowerCase()] = f
    }, destroy:function () {
        d(this.controls, function (f) {
            f.destroy()
        });
        this.controls = null
    }})
})(tinymce);
(function (d) {
    var a = d.util.Dispatcher, e = d.each, c = d.isIE, b = d.isOpera;
    d.create("tinymce.WindowManager", {WindowManager:function (f) {
        var g = this;
        g.editor = f;
        g.onOpen = new a(g);
        g.onClose = new a(g);
        g.params = {};
        g.features = {}
    }, open:function (z, h) {
        var v = this, k = "", n, m, i = v.editor.settings.dialog_type == "modal", q, o, j, g = d.DOM.getViewPort(), r;
        z = z || {};
        h = h || {};
        o = b ? g.w : screen.width;
        j = b ? g.h : screen.height;
        z.name = z.name || "mc_" + new Date().getTime();
        z.width = parseInt(z.width || 320);
        z.height = parseInt(z.height || 240);
        z.resizable = true;
        z.left = z.left || parseInt(o / 2) - (z.width / 2);
        z.top = z.top || parseInt(j / 2) - (z.height / 2);
        h.inline = false;
        h.mce_width = z.width;
        h.mce_height = z.height;
        h.mce_auto_focus = z.auto_focus;
        if (i) {
            if (c) {
                z.center = true;
                z.help = false;
                z.dialogWidth = z.width + "px";
                z.dialogHeight = z.height + "px";
                z.scroll = z.scrollbars || false
            }
        }
        e(z, function (p, f) {
            if (d.is(p, "boolean")) {
                p = p ? "yes" : "no"
            }
            if (!/^(name|url)$/.test(f)) {
                if (c && i) {
                    k += (k ? ";" : "") + f + ":" + p
                } else {
                    k += (k ? "," : "") + f + "=" + p
                }
            }
        });
        v.features = z;
        v.params = h;
        v.onOpen.dispatch(v, z, h);
        r = z.url || z.file;
        r = d._addVer(r);
        try {
            if (c && i) {
                q = 1;
                window.showModalDialog(r, window, k)
            } else {
                q = window.open(r, z.name, k)
            }
        } catch (l) {
        }
        if (!q) {
            alert(v.editor.getLang("popup_blocked"))
        }
    }, close:function (f) {
        f.close();
        this.onClose.dispatch(this)
    }, createInstance:function (i, h, g, m, l, k) {
        var j = d.resolve(i);
        return new j(h, g, m, l, k)
    }, confirm:function (h, f, i, g) {
        g = g || window;
        f.call(i || this, g.confirm(this._decode(this.editor.getLang(h, h))))
    }, alert:function (h, f, j, g) {
        var i = this;
        g = g || window;
        g.alert(i._decode(i.editor.getLang(h, h)));
        if (f) {
            f.call(j || i)
        }
    }, resizeBy:function (f, g, h) {
        h.resizeBy(f, g)
    }, _decode:function (f) {
        return d.DOM.decode(f).replace(/\\n/g, "\n")
    }})
}(tinymce));
(function (a) {
    a.Formatter = function (W) {
        var N = {}, Q = a.each, c = W.dom, q = W.selection, t = a.dom.TreeWalker, L = new a.dom.RangeUtils(c), d = W.schema.isValidChild, G = c.isBlock, l = W.settings.forced_root_block, s = c.nodeIndex, F = a.isGecko ? "\u200B" : "\uFEFF", e = /^(src|href|style)$/, T = false, C = true, p;

        function x(Y) {
            var X = Y.getAttribute("data-mce-contenteditable");
            if (X && X !== "inherit") {
                return X
            }
            return Y.contentEditable !== "inherit" ? Y.contentEditable : null
        }

        function A(X) {
            return X instanceof Array
        }

        function m(Y, X) {
            return c.getParents(Y, X, c.getRoot())
        }

        function b(X) {
            return X.nodeType === 1 && X.id === "_mce_caret"
        }

        function S(X) {
            return X ? N[X] : N
        }

        function k(X, Y) {
            if (X) {
                if (typeof(X) !== "string") {
                    Q(X, function (aa, Z) {
                        k(Z, aa)
                    })
                } else {
                    Y = Y.length ? Y : [Y];
                    Q(Y, function (Z) {
                        if (Z.deep === p) {
                            Z.deep = !Z.selector
                        }
                        if (Z.split === p) {
                            Z.split = !Z.selector || Z.inline
                        }
                        if (Z.remove === p && Z.selector && !Z.inline) {
                            Z.remove = "none"
                        }
                        if (Z.selector && Z.inline) {
                            Z.mixed = true;
                            Z.block_expand = true
                        }
                        if (typeof(Z.classes) === "string") {
                            Z.classes = Z.classes.split(/\s+/)
                        }
                    });
                    N[X] = Y
                }
            }
        }

        var i = function (Y) {
            var X;
            W.dom.getParent(Y, function (Z) {
                X = W.dom.getStyle(Z, "text-decoration");
                return X && X !== "none"
            });
            return X
        };
        var J = function (X) {
            var Y;
            if (X.nodeType === 1 && X.parentNode && X.parentNode.nodeType === 1) {
                Y = i(X.parentNode);
                if (W.dom.getStyle(X, "color") && Y) {
                    W.dom.setStyle(X, "text-decoration", Y)
                } else {
                    if (W.dom.getStyle(X, "textdecoration") === Y) {
                        W.dom.setStyle(X, "text-decoration", null)
                    }
                }
            }
        };

        function U(aa, ah, ac) {
            var ad = S(aa), ai = ad[0], ag, Y, af, ae = q.isCollapsed();

            function X(am, al) {
                al = al || ai;
                if (am) {
                    if (al.onformat) {
                        al.onformat(am, al, ah, ac)
                    }
                    Q(al.styles, function (ao, an) {
                        c.setStyle(am, an, r(ao, ah))
                    });
                    Q(al.attributes, function (ao, an) {
                        c.setAttrib(am, an, r(ao, ah))
                    });
                    Q(al.classes, function (an) {
                        an = r(an, ah);
                        if (!c.hasClass(am, an)) {
                            c.addClass(am, an)
                        }
                    })
                }
            }

            function ab() {
                function an(au, ar) {
                    var at = new t(ar);
                    for (ac = at.current(); ac; ac = at.prev()) {
                        if (ac.childNodes.length > 1 || ac == au) {
                            return ac
                        }
                    }
                }

                var am = W.selection.getRng();
                var aq = am.startContainer;
                var al = am.endContainer;
                if (aq != al && am.endOffset == 0) {
                    var ap = an(aq, al);
                    var ao = ap.nodeType == 3 ? ap.length : ap.childNodes.length;
                    am.setEnd(ap, ao)
                }
                return am
            }

            function Z(ao, au, ar, aq, am) {
                var al = [], an = -1, at, aw = -1, ap = -1, av;
                Q(ao.childNodes, function (ay, ax) {
                    if (ay.nodeName === "UL" || ay.nodeName === "OL") {
                        an = ax;
                        at = ay;
                        return false
                    }
                });
                Q(ao.childNodes, function (ay, ax) {
                    if (ay.nodeName === "SPAN" && c.getAttrib(ay, "data-mce-type") == "bookmark") {
                        if (ay.id == au.id + "_start") {
                            aw = ax
                        } else {
                            if (ay.id == au.id + "_end") {
                                ap = ax
                            }
                        }
                    }
                });
                if (an <= 0 || (aw < an && ap > an)) {
                    Q(a.grep(ao.childNodes), am);
                    return 0
                } else {
                    av = c.clone(ar, T);
                    Q(a.grep(ao.childNodes), function (ay, ax) {
                        if ((aw < an && ax < an) || (aw > an && ax > an)) {
                            al.push(ay);
                            ay.parentNode.removeChild(ay)
                        }
                    });
                    if (aw < an) {
                        ao.insertBefore(av, at)
                    } else {
                        if (aw > an) {
                            ao.insertBefore(av, at.nextSibling)
                        }
                    }
                    aq.push(av);
                    Q(al, function (ax) {
                        av.appendChild(ax)
                    });
                    return av
                }
            }

            function aj(am, ao, ar) {
                var al = [], aq, an, ap = true;
                aq = ai.inline || ai.block;
                an = c.create(aq);
                X(an);
                L.walk(am, function (at) {
                    var au;

                    function av(aw) {
                        var aB, az, ax, ay, aA;
                        aA = ap;
                        aB = aw.nodeName.toLowerCase();
                        az = aw.parentNode.nodeName.toLowerCase();
                        if (aw.nodeType === 1 && x(aw)) {
                            aA = ap;
                            ap = x(aw) === "true";
                            ay = true
                        }
                        if (g(aB, "br")) {
                            au = 0;
                            if (ai.block) {
                                c.remove(aw)
                            }
                            return
                        }
                        if (ai.wrapper && y(aw, aa, ah)) {
                            au = 0;
                            return
                        }
                        if (ap && !ay && ai.block && !ai.wrapper && H(aB)) {
                            aw = c.rename(aw, aq);
                            X(aw);
                            al.push(aw);
                            au = 0;
                            return
                        }
                        if (ai.selector) {
                            Q(ad, function (aC) {
                                if ("collapsed" in aC && aC.collapsed !== ae) {
                                    return
                                }
                                if (c.is(aw, aC.selector) && !b(aw)) {
                                    X(aw, aC);
                                    ax = true
                                }
                            });
                            if (!ai.inline || ax) {
                                au = 0;
                                return
                            }
                        }
                        if (ap && !ay && d(aq, aB) && d(az, aq) && !(!ar && aw.nodeType === 3 && aw.nodeValue.length === 1 && aw.nodeValue.charCodeAt(0) === 65279) && !b(aw)) {
                            if (!au) {
                                au = c.clone(an, T);
                                aw.parentNode.insertBefore(au, aw);
                                al.push(au)
                            }
                            au.appendChild(aw)
                        } else {
                            if (aB == "li" && ao) {
                                au = Z(aw, ao, an, al, av)
                            } else {
                                au = 0;
                                Q(a.grep(aw.childNodes), av);
                                if (ay) {
                                    ap = aA
                                }
                                au = 0
                            }
                        }
                    }

                    Q(at, av)
                });
                if (ai.wrap_links === false) {
                    Q(al, function (at) {
                        function au(ay) {
                            var ax, aw, av;
                            if (ay.nodeName === "A") {
                                aw = c.clone(an, T);
                                al.push(aw);
                                av = a.grep(ay.childNodes);
                                for (ax = 0; ax < av.length; ax++) {
                                    aw.appendChild(av[ax])
                                }
                                ay.appendChild(aw)
                            }
                            Q(a.grep(ay.childNodes), au)
                        }

                        au(at)
                    })
                }
                Q(al, function (av) {
                    var at;

                    function aw(ay) {
                        var ax = 0;
                        Q(ay.childNodes, function (az) {
                            if (!f(az) && !I(az)) {
                                ax++
                            }
                        });
                        return ax
                    }

                    function au(ax) {
                        var az, ay;
                        Q(ax.childNodes, function (aA) {
                            if (aA.nodeType == 1 && !I(aA) && !b(aA)) {
                                az = aA;
                                return T
                            }
                        });
                        if (az && h(az, ai)) {
                            ay = c.clone(az, T);
                            X(ay);
                            c.replace(ay, ax, C);
                            c.remove(az, 1)
                        }
                        return ay || ax
                    }

                    at = aw(av);
                    if ((al.length > 1 || !G(av)) && at === 0) {
                        c.remove(av, 1);
                        return
                    }
                    if (ai.inline || ai.wrapper) {
                        if (!ai.exact && at === 1) {
                            av = au(av)
                        }
                        Q(ad, function (ax) {
                            Q(c.select(ax.inline, av), function (az) {
                                var ay;
                                if (ax.wrap_links === false) {
                                    ay = az.parentNode;
                                    do {
                                        if (ay.nodeName === "A") {
                                            return
                                        }
                                    } while (ay = ay.parentNode)
                                }
                                V(ax, ah, az, ax.exact ? az : null)
                            })
                        });
                        if (y(av.parentNode, aa, ah)) {
                            c.remove(av, 1);
                            av = 0;
                            return C
                        }
                        if (ai.merge_with_parents) {
                            c.getParent(av.parentNode, function (ax) {
                                if (y(ax, aa, ah)) {
                                    c.remove(av, 1);
                                    av = 0;
                                    return C
                                }
                            })
                        }
                        if (av && ai.merge_siblings !== false) {
                            av = u(D(av), av);
                            av = u(av, D(av, C))
                        }
                    }
                })
            }

            if (ai) {
                if (ac) {
                    if (ac.nodeType) {
                        Y = c.createRng();
                        Y.setStartBefore(ac);
                        Y.setEndAfter(ac);
                        aj(o(Y, ad), null, true)
                    } else {
                        aj(ac, null, true)
                    }
                } else {
                    if (!ae || !ai.inline || c.select("td.mceSelected,th.mceSelected").length) {
                        var ak = W.selection.getNode();
                        W.selection.setRng(ab());
                        ag = q.getBookmark();
                        aj(o(q.getRng(C), ad), ag);
                        if (ai.styles && (ai.styles.color || ai.styles.textDecoration)) {
                            a.walk(ak, J, "childNodes");
                            J(ak)
                        }
                        q.moveToBookmark(ag);
                        O(q.getRng(C));
                        W.nodeChanged()
                    } else {
                        R("apply", aa, ah)
                    }
                }
            }
        }

        function B(Z, ai, ab) {
            var ac = S(Z), ak = ac[0], ag, af, Y, ah = true;

            function aa(aq) {
                var ap, ao, an, am, at, ar;
                if (aq.nodeType === 1 && x(aq)) {
                    at = ah;
                    ah = x(aq) === "true";
                    ar = true
                }
                ap = a.grep(aq.childNodes);
                if (ah && !ar) {
                    for (ao = 0, an = ac.length; ao < an; ao++) {
                        if (V(ac[ao], ai, aq, aq)) {
                            break
                        }
                    }
                }
                if (ak.deep) {
                    if (ap.length) {
                        for (ao = 0, an = ap.length; ao < an; ao++) {
                            aa(ap[ao])
                        }
                        if (ar) {
                            ah = at
                        }
                    }
                }
            }

            function ad(am) {
                var an;
                Q(m(am.parentNode).reverse(), function (ao) {
                    var ap;
                    if (!an && ao.id != "_start" && ao.id != "_end") {
                        ap = y(ao, Z, ai);
                        if (ap && ap.split !== false) {
                            an = ao
                        }
                    }
                });
                return an
            }

            function X(ap, am, ar, av) {
                var aw, au, at, ao, aq, an;
                if (ap) {
                    an = ap.parentNode;
                    for (aw = am.parentNode; aw && aw != an; aw = aw.parentNode) {
                        au = c.clone(aw, T);
                        for (aq = 0; aq < ac.length; aq++) {
                            if (V(ac[aq], ai, au, au)) {
                                au = 0;
                                break
                            }
                        }
                        if (au) {
                            if (at) {
                                au.appendChild(at)
                            }
                            if (!ao) {
                                ao = au
                            }
                            at = au
                        }
                    }
                    if (av && (!ak.mixed || !G(ap))) {
                        am = c.split(ap, am)
                    }
                    if (at) {
                        ar.parentNode.insertBefore(at, ar);
                        ao.appendChild(ar)
                    }
                }
                return am
            }

            function aj(am) {
                return X(ad(am), am, am, true)
            }

            function ae(ao) {
                var an = c.get(ao ? "_start" : "_end"), am = an[ao ? "firstChild" : "lastChild"];
                if (I(am)) {
                    am = am[ao ? "firstChild" : "lastChild"]
                }
                c.remove(an, true);
                return am
            }

            function al(am) {
                var an, ao;
                am = o(am, ac, C);
                if (ak.split) {
                    an = K(am, C);
                    ao = K(am);
                    if (an != ao) {
                        an = P(an, "span", {id:"_start", "data-mce-type":"bookmark"});
                        ao = P(ao, "span", {id:"_end", "data-mce-type":"bookmark"});
                        aj(an);
                        aj(ao);
                        an = ae(C);
                        ao = ae()
                    } else {
                        an = ao = aj(an)
                    }
                    am.startContainer = an.parentNode;
                    am.startOffset = s(an);
                    am.endContainer = ao.parentNode;
                    am.endOffset = s(ao) + 1
                }
                L.walk(am, function (ap) {
                    Q(ap, function (aq) {
                        aa(aq);
                        if (aq.nodeType === 1 && W.dom.getStyle(aq, "text-decoration") === "underline" && aq.parentNode && i(aq.parentNode) === "underline") {
                            V({deep:false, exact:true, inline:"span", styles:{textDecoration:"underline"}}, null, aq)
                        }
                    })
                })
            }

            if (ab) {
                if (ab.nodeType) {
                    Y = c.createRng();
                    Y.setStartBefore(ab);
                    Y.setEndAfter(ab);
                    al(Y)
                } else {
                    al(ab)
                }
                return
            }
            if (!q.isCollapsed() || !ak.inline || c.select("td.mceSelected,th.mceSelected").length) {
                ag = q.getBookmark();
                al(q.getRng(C));
                q.moveToBookmark(ag);
                if (ak.inline && j(Z, ai, q.getStart())) {
                    O(q.getRng(true))
                }
                W.nodeChanged()
            } else {
                R("remove", Z, ai)
            }
            if (a.isWebKit) {
                W.execCommand("mceCleanup")
            }
        }

        function E(Y, aa, Z) {
            var X = S(Y);
            if (j(Y, aa, Z) && (!("toggle" in X[0]) || X[0]["toggle"])) {
                B(Y, aa, Z)
            } else {
                U(Y, aa, Z)
            }
        }

        function y(Y, X, ad, ab) {
            var Z = S(X), ae, ac, aa;

            function af(aj, al, am) {
                var ai, ak, ag = al[am], ah;
                if (al.onmatch) {
                    return al.onmatch(aj, al, am)
                }
                if (ag) {
                    if (ag.length === p) {
                        for (ai in ag) {
                            if (ag.hasOwnProperty(ai)) {
                                if (am === "attributes") {
                                    ak = c.getAttrib(aj, ai)
                                } else {
                                    ak = M(aj, ai)
                                }
                                if (ab && !ak && !al.exact) {
                                    return
                                }
                                if ((!ab || al.exact) && !g(ak, r(ag[ai], ad))) {
                                    return
                                }
                            }
                        }
                    } else {
                        for (ah = 0; ah < ag.length; ah++) {
                            if (am === "attributes" ? c.getAttrib(aj, ag[ah]) : M(aj, ag[ah])) {
                                return al
                            }
                        }
                    }
                }
                return al
            }

            if (Z && Y) {
                for (ac = 0; ac < Z.length; ac++) {
                    ae = Z[ac];
                    if (h(Y, ae) && af(Y, ae, "attributes") && af(Y, ae, "styles")) {
                        if (aa = ae.classes) {
                            for (ac = 0; ac < aa.length; ac++) {
                                if (!c.hasClass(Y, aa[ac])) {
                                    return
                                }
                            }
                        }
                        return ae
                    }
                }
            }
        }

        function j(Z, ab, aa) {
            var Y;

            function X(ac) {
                ac = c.getParent(ac, function (ad) {
                    return !!y(ad, Z, ab, true)
                });
                return y(ac, Z, ab)
            }

            if (aa) {
                return X(aa)
            }
            aa = q.getNode();
            if (X(aa)) {
                return C
            }
            Y = q.getStart();
            if (Y != aa) {
                if (X(Y)) {
                    return C
                }
            }
            return T
        }

        function v(ae, ad) {
            var ab, ac = [], aa = {}, Z, Y, X;
            ab = q.getStart();
            c.getParent(ab, function (ah) {
                var ag, af;
                for (ag = 0; ag < ae.length; ag++) {
                    af = ae[ag];
                    if (!aa[af] && y(ah, af, ad)) {
                        aa[af] = true;
                        ac.push(af)
                    }
                }
            });
            return ac
        }

        function z(ab) {
            var ad = S(ab), aa, Z, ac, Y, X;
            if (ad) {
                aa = q.getStart();
                Z = m(aa);
                for (Y = ad.length - 1; Y >= 0; Y--) {
                    X = ad[Y].selector;
                    if (!X) {
                        return C
                    }
                    for (ac = Z.length - 1; ac >= 0; ac--) {
                        if (c.is(Z[ac], X)) {
                            return C
                        }
                    }
                }
            }
            return T
        }

        a.extend(this, {get:S, register:k, apply:U, remove:B, toggle:E, match:j, matchAll:v, matchNode:y, canApply:z});
        function h(X, Y) {
            if (g(X, Y.inline)) {
                return C
            }
            if (g(X, Y.block)) {
                return C
            }
            if (Y.selector) {
                return c.is(X, Y.selector)
            }
        }

        function g(Y, X) {
            Y = Y || "";
            X = X || "";
            Y = "" + (Y.nodeName || Y);
            X = "" + (X.nodeName || X);
            return Y.toLowerCase() == X.toLowerCase()
        }

        function M(Y, X) {
            var Z = c.getStyle(Y, X);
            if (X == "color" || X == "backgroundColor") {
                Z = c.toHex(Z)
            }
            if (X == "fontWeight" && Z == 700) {
                Z = "bold"
            }
            return"" + Z
        }

        function r(X, Y) {
            if (typeof(X) != "string") {
                X = X(Y)
            } else {
                if (Y) {
                    X = X.replace(/%(\w+)/g, function (aa, Z) {
                        return Y[Z] || aa
                    })
                }
            }
            return X
        }

        function f(X) {
            return X && X.nodeType === 3 && /^([\t \r\n]+|)$/.test(X.nodeValue)
        }

        function P(Z, Y, X) {
            var aa = c.create(Y, X);
            Z.parentNode.insertBefore(aa, Z);
            aa.appendChild(Z);
            return aa
        }

        function o(X, ai, aa) {
            var al, aj, ad, Z = X.startContainer, ae = X.startOffset, an = X.endContainer, ag = X.endOffset, al, aj, ad, ah;

            function ak(au) {
                var ao, ar, at, aq, ap;
                ao = ar = au ? Z : an;
                ap = au ? "previousSibling" : "nextSibling";
                root = c.getRoot();
                if (ao.nodeType == 3 && !f(ao)) {
                    if (au ? ae > 0 : ag < ao.nodeValue.length) {
                        return ao
                    }
                }
                for (; ;) {
                    if (!ai[0].block_expand && G(ar)) {
                        return ar
                    }
                    for (aq = ar[ap]; aq; aq = aq[ap]) {
                        if (!I(aq) && !f(aq)) {
                            return ar
                        }
                    }
                    if (ar.parentNode == root) {
                        ao = ar;
                        break
                    }
                    ar = ar.parentNode
                }
                return ao
            }

            function ac(ao, ap) {
                if (ap === p) {
                    ap = ao.nodeType === 3 ? ao.length : ao.childNodes.length
                }
                while (ao && ao.hasChildNodes()) {
                    ao = ao.childNodes[ap];
                    if (ao) {
                        ap = ao.nodeType === 3 ? ao.length : ao.childNodes.length
                    }
                }
                return{node:ao, offset:ap}
            }

            if (Z.nodeType == 1 && Z.hasChildNodes()) {
                aj = Z.childNodes.length - 1;
                Z = Z.childNodes[ae > aj ? aj : ae];
                if (Z.nodeType == 3) {
                    ae = 0
                }
            }
            if (an.nodeType == 1 && an.hasChildNodes()) {
                aj = an.childNodes.length - 1;
                an = an.childNodes[ag > aj ? aj : ag - 1];
                if (an.nodeType == 3) {
                    ag = an.nodeValue.length
                }
            }
            function am(ap) {
                var ao = ap;
                while (ao) {
                    if (ao.nodeType === 1 && x(ao)) {
                        return x(ao) === "false" ? ao : ap
                    }
                    ao = ao.parentNode
                }
                return ap
            }

            Z = am(Z);
            an = am(an);
            if (I(Z.parentNode) || I(Z)) {
                Z = I(Z) ? Z : Z.parentNode;
                Z = Z.nextSibling || Z;
                if (Z.nodeType == 3) {
                    ae = 0
                }
            }
            if (I(an.parentNode) || I(an)) {
                an = I(an) ? an : an.parentNode;
                an = an.previousSibling || an;
                if (an.nodeType == 3) {
                    ag = an.length
                }
            }
            if (ai[0].inline) {
                if (X.collapsed) {
                    function af(ap, au, aw) {
                        var at, aq, av, ao;

                        function ar(ay, aA) {
                            var aB, ax, az = ay.nodeValue;
                            if (typeof(aA) == "undefined") {
                                aA = aw ? az.length : 0
                            }
                            if (aw) {
                                aB = az.lastIndexOf(" ", aA);
                                ax = az.lastIndexOf("\u00a0", aA);
                                aB = aB > ax ? aB : ax;
                                if (aB !== -1 && !aa) {
                                    aB++
                                }
                            } else {
                                aB = az.indexOf(" ", aA);
                                ax = az.indexOf("\u00a0", aA);
                                aB = aB !== -1 && (ax === -1 || aB < ax) ? aB : ax
                            }
                            return aB
                        }

                        if (ap.nodeType === 3) {
                            av = ar(ap, au);
                            if (av !== -1) {
                                return{container:ap, offset:av}
                            }
                            ao = ap
                        }
                        at = new t(ap, c.getParent(ap, G) || W.getBody());
                        while (aq = at[aw ? "prev" : "next"]()) {
                            if (aq.nodeType === 3) {
                                ao = aq;
                                av = ar(aq);
                                if (av !== -1) {
                                    return{container:aq, offset:av}
                                }
                            } else {
                                if (G(aq)) {
                                    break
                                }
                            }
                        }
                        if (ao) {
                            if (aw) {
                                au = 0
                            } else {
                                au = ao.length
                            }
                            return{container:ao, offset:au}
                        }
                    }

                    ah = af(Z, ae, true);
                    if (ah) {
                        Z = ah.container;
                        ae = ah.offset
                    }
                    ah = af(an, ag);
                    if (ah) {
                        an = ah.container;
                        ag = ah.offset
                    }
                }
                ad = ac(an, ag);
                if (ad.node) {
                    while (ad.node && ad.offset === 0 && ad.node.previousSibling) {
                        ad = ac(ad.node.previousSibling)
                    }
                    if (ad.node && ad.offset > 0 && ad.node.nodeType === 3 && ad.node.nodeValue.charAt(ad.offset - 1) === " ") {
                        if (ad.offset > 1) {
                            an = ad.node;
                            an.splitText(ad.offset - 1)
                        } else {
                            if (ad.node.previousSibling) {
                            }
                        }
                    }
                }
            }
            if (ai[0].inline || ai[0].block_expand) {
                if (!ai[0].inline || (Z.nodeType != 3 || ae === 0)) {
                    Z = ak(true)
                }
                if (!ai[0].inline || (an.nodeType != 3 || ag === an.nodeValue.length)) {
                    an = ak()
                }
            }
            if (ai[0].selector && ai[0].expand !== T && !ai[0].inline) {
                function ab(ap, ao) {
                    var aq, ar, au, at;
                    if (ap.nodeType == 3 && ap.nodeValue.length == 0 && ap[ao]) {
                        ap = ap[ao]
                    }
                    aq = m(ap);
                    for (ar = 0; ar < aq.length; ar++) {
                        for (au = 0; au < ai.length; au++) {
                            at = ai[au];
                            if ("collapsed" in at && at.collapsed !== X.collapsed) {
                                continue
                            }
                            if (c.is(aq[ar], at.selector)) {
                                return aq[ar]
                            }
                        }
                    }
                    return ap
                }

                Z = ab(Z, "previousSibling");
                an = ab(an, "nextSibling")
            }
            if (ai[0].block || ai[0].selector) {
                function Y(ap, ao, ar) {
                    var aq;
                    if (!ai[0].wrapper) {
                        aq = c.getParent(ap, ai[0].block)
                    }
                    if (!aq) {
                        aq = c.getParent(ap.nodeType == 3 ? ap.parentNode : ap, G)
                    }
                    if (aq && ai[0].wrapper) {
                        aq = m(aq, "ul,ol").reverse()[0] || aq
                    }
                    if (!aq) {
                        aq = ap;
                        while (aq[ao] && !G(aq[ao])) {
                            aq = aq[ao];
                            if (g(aq, "br")) {
                                break
                            }
                        }
                    }
                    return aq || ap
                }

                Z = Y(Z, "previousSibling");
                an = Y(an, "nextSibling");
                if (ai[0].block) {
                    if (!G(Z)) {
                        Z = ak(true)
                    }
                    if (!G(an)) {
                        an = ak()
                    }
                }
            }
            if (Z.nodeType == 1) {
                ae = s(Z);
                Z = Z.parentNode
            }
            if (an.nodeType == 1) {
                ag = s(an) + 1;
                an = an.parentNode
            }
            return{startContainer:Z, startOffset:ae, endContainer:an, endOffset:ag}
        }

        function V(ad, ac, aa, X) {
            var Z, Y, ab;
            if (!h(aa, ad)) {
                return T
            }
            if (ad.remove != "all") {
                Q(ad.styles, function (af, ae) {
                    af = r(af, ac);
                    if (typeof(ae) === "number") {
                        ae = af;
                        X = 0
                    }
                    if (!X || g(M(X, ae), af)) {
                        c.setStyle(aa, ae, "")
                    }
                    ab = 1
                });
                if (ab && c.getAttrib(aa, "style") == "") {
                    aa.removeAttribute("style");
                    aa.removeAttribute("data-mce-style")
                }
                Q(ad.attributes, function (ag, ae) {
                    var af;
                    ag = r(ag, ac);
                    if (typeof(ae) === "number") {
                        ae = ag;
                        X = 0
                    }
                    if (!X || g(c.getAttrib(X, ae), ag)) {
                        if (ae == "class") {
                            ag = c.getAttrib(aa, ae);
                            if (ag) {
                                af = "";
                                Q(ag.split(/\s+/), function (ah) {
                                    if (/mce\w+/.test(ah)) {
                                        af += (af ? " " : "") + ah
                                    }
                                });
                                if (af) {
                                    c.setAttrib(aa, ae, af);
                                    return
                                }
                            }
                        }
                        if (ae == "class") {
                            aa.removeAttribute("className")
                        }
                        if (e.test(ae)) {
                            aa.removeAttribute("data-mce-" + ae)
                        }
                        aa.removeAttribute(ae)
                    }
                });
                Q(ad.classes, function (ae) {
                    ae = r(ae, ac);
                    if (!X || c.hasClass(X, ae)) {
                        c.removeClass(aa, ae)
                    }
                });
                Y = c.getAttribs(aa);
                for (Z = 0; Z < Y.length; Z++) {
                    if (Y[Z].nodeName.indexOf("_") !== 0) {
                        return T
                    }
                }
            }
            if (ad.remove != "none") {
                n(aa, ad);
                return C
            }
        }

        function n(Z, aa) {
            var X = Z.parentNode, Y;
            if (aa.block) {
                if (!l) {
                    function ab(ad, ac, ae) {
                        ad = D(ad, ac, ae);
                        return !ad || (ad.nodeName == "BR" || G(ad))
                    }

                    if (G(Z) && !G(X)) {
                        if (!ab(Z, T) && !ab(Z.firstChild, C, 1)) {
                            Z.insertBefore(c.create("br"), Z.firstChild)
                        }
                        if (!ab(Z, C) && !ab(Z.lastChild, T, 1)) {
                            Z.appendChild(c.create("br"))
                        }
                    }
                } else {
                    if (X == c.getRoot()) {
                        if (!aa.list_block || !g(Z, aa.list_block)) {
                            Q(a.grep(Z.childNodes), function (ac) {
                                if (d(l, ac.nodeName.toLowerCase())) {
                                    if (!Y) {
                                        Y = P(ac, l)
                                    } else {
                                        Y.appendChild(ac)
                                    }
                                } else {
                                    Y = 0
                                }
                            })
                        }
                    }
                }
            }
            if (aa.selector && aa.inline && !g(aa.inline, Z)) {
                return
            }
            c.remove(Z, 1)
        }

        function D(Y, X, Z) {
            if (Y) {
                X = X ? "nextSibling" : "previousSibling";
                for (Y = Z ? Y : Y[X]; Y; Y = Y[X]) {
                    if (Y.nodeType == 1 || !f(Y)) {
                        return Y
                    }
                }
            }
        }

        function I(X) {
            return X && X.nodeType == 1 && X.getAttribute("data-mce-type") == "bookmark"
        }

        function u(ab, aa) {
            var X, Z, Y;

            function ad(ag, af) {
                if (ag.nodeName != af.nodeName) {
                    return T
                }
                function ae(ai) {
                    var aj = {};
                    Q(c.getAttribs(ai), function (ak) {
                        var al = ak.nodeName.toLowerCase();
                        if (al.indexOf("_") !== 0 && al !== "style") {
                            aj[al] = c.getAttrib(ai, al)
                        }
                    });
                    return aj
                }

                function ah(al, ak) {
                    var aj, ai;
                    for (ai in al) {
                        if (al.hasOwnProperty(ai)) {
                            aj = ak[ai];
                            if (aj === p) {
                                return T
                            }
                            if (al[ai] != aj) {
                                return T
                            }
                            delete ak[ai]
                        }
                    }
                    for (ai in ak) {
                        if (ak.hasOwnProperty(ai)) {
                            return T
                        }
                    }
                    return C
                }

                if (!ah(ae(ag), ae(af))) {
                    return T
                }
                if (!ah(c.parseStyle(c.getAttrib(ag, "style")), c.parseStyle(c.getAttrib(af, "style")))) {
                    return T
                }
                return C
            }

            if (ab && aa) {
                function ac(af, ae) {
                    for (Z = af; Z; Z = Z[ae]) {
                        if (Z.nodeType == 3 && Z.nodeValue.length !== 0) {
                            return af
                        }
                        if (Z.nodeType == 1 && !I(Z)) {
                            return Z
                        }
                    }
                    return af
                }

                ab = ac(ab, "previousSibling");
                aa = ac(aa, "nextSibling");
                if (ad(ab, aa)) {
                    for (Z = ab.nextSibling; Z && Z != aa;) {
                        Y = Z;
                        Z = Z.nextSibling;
                        ab.appendChild(Y)
                    }
                    c.remove(aa);
                    Q(a.grep(aa.childNodes), function (ae) {
                        ab.appendChild(ae)
                    });
                    return ab
                }
            }
            return aa
        }

        function H(X) {
            return/^(h[1-6]|p|div|pre|address|dl|dt|dd)$/.test(X)
        }

        function K(Y, ac) {
            var X, ab, Z, aa;
            X = Y[ac ? "startContainer" : "endContainer"];
            ab = Y[ac ? "startOffset" : "endOffset"];
            if (X.nodeType == 1) {
                Z = X.childNodes.length - 1;
                if (!ac && ab) {
                    ab--
                }
                X = X.childNodes[ab > Z ? Z : ab]
            }
            if (X.nodeType === 3 && ac && ab >= X.nodeValue.length) {
                X = new t(X, W.getBody()).next() || X
            }
            if (X.nodeType === 3 && !ac && ab == 0) {
                X = new t(X, W.getBody()).prev() || X
            }
            return X
        }

        function R(ag, X, ae) {
            var ah = "_mce_caret", Y = W.settings.caret_debug;

            function Z(ak) {
                var aj = c.create("span", {id:ah, "data-mce-bogus":true, style:Y ? "color:red" : ""});
                if (ak) {
                    aj.appendChild(W.getDoc().createTextNode(F))
                }
                return aj
            }

            function af(ak, aj) {
                while (ak) {
                    if ((ak.nodeType === 3 && ak.nodeValue !== F) || ak.childNodes.length > 1) {
                        return false
                    }
                    if (aj && ak.nodeType === 1) {
                        aj.push(ak)
                    }
                    ak = ak.firstChild
                }
                return true
            }

            function ac(aj) {
                while (aj) {
                    if (aj.id === ah) {
                        return aj
                    }
                    aj = aj.parentNode
                }
            }

            function ab(aj) {
                var ak;
                if (aj) {
                    ak = new t(aj, aj);
                    for (aj = ak.current(); aj; aj = ak.next()) {
                        if (aj.nodeType === 3) {
                            return aj
                        }
                    }
                }
            }

            function aa(al, ak) {
                var am, aj;
                if (!al) {
                    al = ac(q.getStart());
                    if (!al) {
                        while (al = c.get(ah)) {
                            aa(al, false)
                        }
                    }
                } else {
                    aj = q.getRng(true);
                    if (af(al)) {
                        if (ak !== false) {
                            aj.setStartBefore(al);
                            aj.setEndBefore(al)
                        }
                        c.remove(al)
                    } else {
                        am = ab(al);
                        if (am.nodeValue.charAt(0) === F) {
                            am = am.deleteData(0, 1)
                        }
                        c.remove(al, 1)
                    }
                    q.setRng(aj)
                }
            }

            function ad() {
                var al, aj, ap, ao, am, ak, an;
                al = q.getRng(true);
                ao = al.startOffset;
                ak = al.startContainer;
                an = ak.nodeValue;
                aj = ac(q.getStart());
                if (aj) {
                    ap = ab(aj)
                }
                if (an && ao > 0 && ao < an.length && /\w/.test(an.charAt(ao)) && /\w/.test(an.charAt(ao - 1))) {
                    am = q.getBookmark();
                    al.collapse(true);
                    al = o(al, S(X));
                    al = L.split(al);
                    U(X, ae, al);
                    q.moveToBookmark(am)
                } else {
                    if (!aj || ap.nodeValue !== F) {
                        aj = Z(true);
                        ap = aj.firstChild;
                        al.insertNode(aj);
                        ao = 1;
                        U(X, ae, aj)
                    } else {
                        U(X, ae, aj)
                    }
                    q.setCursorLocation(ap, ao)
                }
            }

            function ai() {
                var aj = q.getRng(true), ak, am, ap, ao, al, at, ar = [], an, aq;
                ak = aj.startContainer;
                am = aj.startOffset;
                al = ak;
                if (ak.nodeType == 3) {
                    if (am != ak.nodeValue.length || ak.nodeValue === F) {
                        ao = true
                    }
                    al = al.parentNode
                }
                while (al) {
                    if (y(al, X, ae)) {
                        at = al;
                        break
                    }
                    if (al.nextSibling) {
                        ao = true
                    }
                    ar.push(al);
                    al = al.parentNode
                }
                if (!at) {
                    return
                }
                if (ao) {
                    ap = q.getBookmark();
                    aj.collapse(true);
                    aj = o(aj, S(X), true);
                    aj = L.split(aj);
                    B(X, ae, aj);
                    q.moveToBookmark(ap)
                } else {
                    aq = Z();
                    al = aq;
                    for (an = ar.length - 1; an >= 0; an--) {
                        al.appendChild(c.clone(ar[an], false));
                        al = al.firstChild
                    }
                    al.appendChild(c.doc.createTextNode(F));
                    al = al.firstChild;
                    c.insertAfter(aq, at);
                    q.setCursorLocation(al, 1)
                }
            }

            if (!self._hasCaretEvents) {
                W.onBeforeGetContent.addToTop(function () {
                    var aj = [], ak;
                    if (af(ac(q.getStart()), aj)) {
                        ak = aj.length;
                        while (ak--) {
                            c.setAttrib(aj[ak], "data-mce-bogus", "1")
                        }
                    }
                });
                a.each("onMouseUp onKeyUp".split(" "), function (aj) {
                    W[aj].addToTop(function () {
                        aa()
                    })
                });
                W.onKeyDown.addToTop(function (aj, al) {
                    var ak = al.keyCode;
                    if (ak == 8 || ak == 37 || ak == 39) {
                        aa(ac(q.getStart()))
                    }
                });
                self._hasCaretEvents = true
            }
            if (ag == "apply") {
                ad()
            } else {
                ai()
            }
        }

        function O(Y) {
            var X = Y.startContainer, ad = Y.startOffset, ac, ab, Z, aa;
            if (X.nodeType == 3 && ad >= X.nodeValue.length - 1) {
                X = X.parentNode;
                ad = s(X) + 1
            }
            if (X.nodeType == 1) {
                Z = X.childNodes;
                X = Z[Math.min(ad, Z.length - 1)];
                ac = new t(X);
                if (ad > Z.length - 1) {
                    ac.next()
                }
                for (ab = ac.current(); ab; ab = ac.next()) {
                    if (ab.nodeType == 3 && !f(ab)) {
                        aa = c.create("a", null, F);
                        ab.parentNode.insertBefore(aa, ab);
                        Y.setStart(ab, 0);
                        q.setRng(Y);
                        c.remove(aa);
                        return
                    }
                }
            }
        }
    }
})(tinymce);
tinymce.onAddEditor.add(function (e, a) {
    var d, h, g, c = a.settings;
    if (c.inline_styles) {
        h = e.explode(c.font_size_legacy_values);
        function b(j, i) {
            e.each(i, function (l, k) {
                if (l) {
                    g.setStyle(j, k, l)
                }
            });
            g.rename(j, "span")
        }

        d = {font:function (j, i) {
            b(i, {backgroundColor:i.style.backgroundColor, color:i.color, fontFamily:i.face, fontSize:h[parseInt(i.size) - 1]})
        }, u:function (j, i) {
            b(i, {textDecoration:"underline"})
        }, strike:function (j, i) {
            b(i, {textDecoration:"line-through"})
        }};
        function f(i, j) {
            g = i.dom;
            if (c.convert_fonts_to_spans) {
                e.each(g.select("font,u,strike", j.node), function (k) {
                    d[k.nodeName.toLowerCase()](a.dom, k)
                })
            }
        }

        a.onPreProcess.add(f);
        a.onSetContent.add(f);
        a.onInit.add(function () {
            a.selection.onSetContent.add(f)
        })
    }
});