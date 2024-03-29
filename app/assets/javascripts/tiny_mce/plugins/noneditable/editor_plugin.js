(function () {
    var c = tinymce.dom.TreeWalker;
    var a = "contenteditable", d = "data-mce-" + a;
    var e = tinymce.VK;

    function b(n) {
        var j = n.dom, p = n.selection, r, o = "mce_noneditablecaret";
        r = tinymce.isGecko ? "\u200B" : "\uFEFF";
        function m(t) {
            var s;
            if (t.nodeType === 1) {
                s = t.getAttribute(d);
                if (s && s !== "inherit") {
                    return s
                }
                s = t.contentEditable;
                if (s !== "inherit") {
                    return s
                }
            }
            return null
        }

        function g(s) {
            var t;
            while (s) {
                t = m(s);
                if (t) {
                    return t === "false" ? s : null
                }
                s = s.parentNode
            }
        }

        function l(s) {
            while (s) {
                if (s.id === o) {
                    return s
                }
                s = s.parentNode
            }
        }

        function k(s) {
            var t;
            if (s) {
                t = new c(s, s);
                for (s = t.current(); s; s = t.next()) {
                    if (s.nodeType === 3) {
                        return s
                    }
                }
            }
        }

        function f(v, u) {
            var s, t;
            if (m(v) === "false") {
                if (j.isBlock(v)) {
                    p.select(v);
                    return
                }
            }
            t = j.createRng();
            if (m(v) === "true") {
                if (!v.firstChild) {
                    v.appendChild(n.getDoc().createTextNode("\u00a0"))
                }
                v = v.firstChild;
                u = true
            }
            s = j.create("span", {id:o, "data-mce-bogus":true}, r);
            if (u) {
                v.parentNode.insertBefore(s, v)
            } else {
                j.insertAfter(s, v)
            }
            t.setStart(s.firstChild, 1);
            t.collapse(true);
            p.setRng(t);
            return s
        }

        function i(s) {
            var v, t, u;
            if (s) {
                rng = p.getRng(true);
                rng.setStartBefore(s);
                rng.setEndBefore(s);
                v = k(s);
                if (v && v.nodeValue.charAt(0) == r) {
                    v = v.deleteData(0, 1)
                }
                j.remove(s, true);
                p.setRng(rng)
            } else {
                t = l(p.getStart());
                while ((s = j.get(o)) && s !== u) {
                    if (t !== s) {
                        v = k(s);
                        if (v && v.nodeValue.charAt(0) == r) {
                            v = v.deleteData(0, 1)
                        }
                        j.remove(s, true)
                    }
                    u = s
                }
            }
        }

        function q() {
            var s, w, u, t, v;

            function x(B, D) {
                var A, F, E, C, z;
                A = t.startContainer;
                F = t.startOffset;
                if (A.nodeType == 3) {
                    z = A.nodeValue.length;
                    if ((F > 0 && F < z) || (D ? F == z : F == 0)) {
                        return
                    }
                } else {
                    if (F < A.childNodes.length) {
                        var G = !D && F > 0 ? F - 1 : F;
                        A = A.childNodes[G];
                        if (A.hasChildNodes()) {
                            A = A.firstChild
                        }
                    } else {
                        return !D ? B : null
                    }
                }
                E = new c(A, B);
                while (C = E[D ? "prev" : "next"]()) {
                    if (C.nodeType === 3 && C.nodeValue.length > 0) {
                        return
                    } else {
                        if (m(C) === "true") {
                            return C
                        }
                    }
                }
                return B
            }

            i();
            u = p.isCollapsed();
            s = g(p.getStart());
            w = g(p.getEnd());
            if (s || w) {
                t = p.getRng(true);
                if (u) {
                    s = s || w;
                    var y = p.getStart();
                    if (v = x(s, true)) {
                        f(v, true)
                    } else {
                        if (v = x(s, false)) {
                            f(v, false)
                        } else {
                            p.select(s)
                        }
                    }
                } else {
                    t = p.getRng(true);
                    if (s) {
                        t.setStartBefore(s)
                    }
                    if (w) {
                        t.setEndAfter(w)
                    }
                    p.setRng(t)
                }
            }
        }

        function h(y, A) {
            var E = A.keyCode, w, B, C, u;

            function t(G, F) {
                while (G = G[F ? "previousSibling" : "nextSibling"]) {
                    if (G.nodeType !== 3 || G.nodeValue.length > 0) {
                        return G
                    }
                }
            }

            function x(F, G) {
                p.select(F);
                p.collapse(G)
            }

            C = p.getStart();
            u = p.getEnd();
            w = g(C) || g(u);
            if (w && (E < 112 || E > 124) && E != e.DELETE && E != e.BACKSPACE) {
                A.preventDefault();
                if (E == e.LEFT || E == e.RIGHT) {
                    var v = E == e.LEFT;
                    if (y.dom.isBlock(w)) {
                        var z = v ? w.previousSibling : w.nextSibling;
                        var s = new c(z, z);
                        var D = v ? s.prev() : s.next();
                        x(D, !v)
                    } else {
                        x(w, v)
                    }
                }
            } else {
                if (E == e.LEFT || E == e.RIGHT || E == e.BACKSPACE || E == e.DELETE) {
                    B = l(C);
                    if (B) {
                        if (E == e.LEFT || E == e.BACKSPACE) {
                            w = t(B, true);
                            if (w && m(w) === "false") {
                                A.preventDefault();
                                if (E == e.LEFT) {
                                    x(w, true)
                                } else {
                                    j.remove(w)
                                }
                            } else {
                                i(B)
                            }
                        }
                        if (E == e.RIGHT || E == e.DELETE) {
                            w = t(B);
                            if (w && m(w) === "false") {
                                A.preventDefault();
                                if (E == e.RIGHT) {
                                    x(w, false)
                                } else {
                                    j.remove(w)
                                }
                            } else {
                                i(B)
                            }
                        }
                    }
                }
            }
        }

        n.onMouseDown.addToTop(function (s, u) {
            var t = s.selection.getNode();
            if (m(t) === "false" && t == u.target) {
                u.preventDefault()
            }
        });
        n.onMouseUp.addToTop(q);
        n.onKeyDown.addToTop(h);
        n.onKeyUp.addToTop(q)
    }

    tinymce.create("tinymce.plugins.NonEditablePlugin", {init:function (h, j) {
        var g, f, i;
        g = " " + tinymce.trim(h.getParam("noneditable_editable_class", "mceEditable")) + " ";
        f = " " + tinymce.trim(h.getParam("noneditable_noneditable_class", "mceNonEditable")) + " ";
        i = h.getParam("noneditable_regexp");
        if (i && !i.length) {
            i = [i]
        }
        h.onPreInit.add(function () {
            b(h);
            if (i) {
                h.onBeforeSetContent.add(function (l, m) {
                    var n = i.length, o = m.content, k = tinymce.trim(f);
                    while (n--) {
                        o = o.replace(i[n], function () {
                            var p = arguments;
                            return'<span class="' + k + '" data-mce-content="' + l.dom.encode(p[0]) + '">' + l.dom.encode(typeof(p[1]) === "string" ? p[1] : p[0]) + "</span>"
                        })
                    }
                    m.content = o
                })
            }
            h.parser.addAttributeFilter("class", function (k) {
                var l = k.length, m, n;
                while (l--) {
                    n = k[l];
                    m = " " + n.attr("class") + " ";
                    if (m.indexOf(g) !== -1) {
                        n.attr(d, "true")
                    } else {
                        if (m.indexOf(f) !== -1) {
                            n.attr(d, "false")
                        }
                    }
                }
            });
            h.serializer.addAttributeFilter(d, function (k, l) {
                var m = k.length, n;
                while (m--) {
                    n = k[m];
                    if (i && n.attr("data-mce-content")) {
                        n.name = "#text";
                        n.type = 3;
                        n.raw = true;
                        n.value = n.attr("data-mce-content")
                    } else {
                        n.attr(a, null);
                        n.attr(d, null)
                    }
                }
            });
            h.parser.addAttributeFilter(a, function (k, l) {
                var m = k.length, n;
                while (m--) {
                    n = k[m];
                    n.attr(d, n.attr(a));
                    n.attr(a, null)
                }
            })
        })
    }, getInfo:function () {
        return{longname:"Non editable elements", author:"Moxiecode Systems AB", authorurl:"http://tinymce.moxiecode.com", infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/noneditable", version:tinymce.majorVersion + "." + tinymce.minorVersion}
    }});
    tinymce.PluginManager.add("noneditable", tinymce.plugins.NonEditablePlugin)
})();