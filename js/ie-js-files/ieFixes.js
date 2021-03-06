(function (e, t) {
    function n() {
        var e = v.elements;
        return "string" == typeof e ? e.split(" ") : e
    }

    function r(e) {
        var t = p[e[c]];
        t || (t = {}, h++, e[c] = h, p[h] = t);
        return t
    }

    function i(e, n, i) {
        n || (n = t);
        if (d) return n.createElement(e);
        i || (i = r(n));
        n = i.cache[e] ? i.cache[e].cloneNode() : f.test(e) ? (i.cache[e] = i.createElem(e)).cloneNode() : i.createElem(e);
        return n.canHaveChildren && !a.test(e) ? i.frag.appendChild(n) : n
    }

    function s(e, t) {
        if (!t.cache) t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag();
        e.createElement = function (n) {
            return !v.shivMethods ? t.createElem(n) : i(n, e, t)
        };
        e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n().join().replace(/\w+/g, function (e) {
            t.createElem(e);
            t.frag.createElement(e);
            return 'c("' + e + '")'
        }) + ");return n}")(v, t.frag)
    }

    function o(e) {
        e || (e = t);
        var n = r(e);
        if (v.shivCSS && !l && !n.hasCSS) {
            var i, o = e;
            i = o.createElement("p");
            o = o.getElementsByTagName("head")[0] || o.documentElement;
            i.innerHTML = "x<style>article,aside,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}</style>";
            i = o.insertBefore(i.lastChild, o.firstChild);
            n.hasCSS = !!i
        }
        d || s(e, n);
        return e
    }
    var u = e.html5 || {},
        a = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
        f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
        l, c = "_html5shiv",
        h = 0,
        p = {},
        d;
    (function () {
        try {
            var e = t.createElement("a");
            e.innerHTML = "<xyz></xyz>";
            l = "hidden" in e;
            var n;
            if (!(n = 1 == e.childNodes.length)) {
                t.createElement("a");
                var r = t.createDocumentFragment();
                n = "undefined" == typeof r.cloneNode || "undefined" == typeof r.createDocumentFragment || "undefined" == typeof r.createElement
            }
            d = n
        } catch (i) {
            d = l = !0
        }
    })();
    var v = {
        elements: u.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video",
        version: "3.6.2",
        shivCSS: !1 !== u.shivCSS,
        supportsUnknownElements: d,
        shivMethods: !1 !== u.shivMethods,
        type: "default",
        shivDocument: o,
        createElement: i,
        createDocumentFragment: function (e, i) {
            e || (e = t);
            if (d) return e.createDocumentFragment();
            for (var i = i || r(e), s = i.frag.cloneNode(), o = 0, u = n(), a = u.length; o < a; o++) s.createElement(u[o]);
            return s
        }
    };
    e.html5 = v;
    o(t)
})(this, document);
(function (e) {
    var t = "nwmatcher-1.2.5",
        n = typeof exports == "object" ? exports : (e.NW || (e.NW = {})) && (e.NW.Dom || (e.NW.Dom = {})),
        r = e.document,
        i = r.documentElement,
        s = [].slice,
        o = {}.toString,
        u, a, f, l, c, h, p, d, v, m = "[#.:]?",
        g = "([~*^$|!]?={1})",
        y = "[\\x20\\t\\n\\r\\f]*",
        b = "[\\x20]|[>+~][^>+~]",
        w = "[-+]?\\d*n?[-+]?\\d*",
        E = '"[^"]*"' + "|'[^']*'",
        S = "\\([^()]+\\)|\\(.*\\)",
        x = "\\{[^{}]+\\}|\\{.*\\}",
        T = "\\[[^[\\]]*\\]|\\[.*\\]",
        N = "\\[.*\\]|\\(.*\\)|\\{.*\\}",
        C = "(?:[-\\w]|[^\\x00-\\xa0]|\\\\.)",
        k = "(?:-?[_a-zA-Z]{1}[-\\w]*|[^\\x00-\\xa0]+|\\\\.+)+",
        L = "(" + E + "|" + k + ")",
        A = y + "(" + C + "+:?" + C + "+)" + y + "(?:" + g + y + L + ")?" + y,
        O = A.replace(L, "([\\x22\\x27]*)((?:\\\\?.)*?)\\3"),
        M = "((?:" + w + "|" + E + "|" + m + "|" + C + "+|\\[" + A + "\\]|\\(.+\\)|" + y + "|,)+)",
        _ = ".+",
        D = "(?=[\\x20\\t\\n\\r\\f]*[^>+~(){}<>])(\\*|(?:" + m + k + ")|" + b + "|\\[" + A + "\\]|\\(" + M + "\\)|\\{" + _ + "\\}|,)+",
        P = D.replace(M, ".*"),
        H = new RegExp(D, "g"),
        B = new RegExp("^" + y + "|" + y + "$", "g"),
        j = new RegExp("^((?!:not)(" + m + "|" + k + "|\\([^()]*\\))+|\\[" + A + "\\])$"),
        F = new RegExp("([^,\\\\\\[\\]]+|" + T + "|" + S + "|" + x + "|\\\\.)+", "g"),
        I = new RegExp("(\\[" + A + "\\]|\\(" + M + "\\)|[^\\x20>+~]|\\\\.)+", "g"),
        q = /[\x20\t\n\r\f]+/g,
        R = new RegExp(k + "|^$"),
        U = function () {
            var e = (r.appendChild + "").replace(/appendChild/g, "");
            return function (t, n) {
                var r = t && t[n] || false;
                return r && typeof r != "string" && e == (r + "").replace(new RegExp(n, "g"), "")
            }
        }(),
        z = U(r, "hasFocus"),
        W = U(r, "querySelector"),
        X = U(r, "getElementById"),
        V = U(i, "getElementsByTagName"),
        $ = U(i, "getElementsByClassName"),
        J = U(i, "getAttribute"),
        K = U(i, "hasAttribute"),
        Q = function () {
            var e = false,
                t = i.id;
            i.id = "length";
            try {
                e = !!s.call(r.childNodes, 0)[0]
            } catch (n) {}
            i.id = t;
            return e
        }(),
        G = "nextElementSibling" in i && "previousElementSibling" in i,
        Y = X ? function () {
            var e = true,
                t = "x" + String(+(new Date)),
                n = r.createElementNS ? "a" : '<a name="' + t + '">';
            (n = r.createElement(n)).name = t;
            i.insertBefore(n, i.firstChild);
            e = !!r.getElementById(t);
            i.removeChild(n);
            return e
        }() : true,
        Z = V ? function () {
            var e = r.createElement("div");
            e.appendChild(r.createComment(""));
            return !!e.getElementsByTagName("*")[0]
        }() : true,
        et = $ ? function () {
            var e, t = r.createElement("div"),
                n = "台北";
            t.appendChild(r.createElement("span")).setAttribute("class", n + "abc " + n);
            t.appendChild(r.createElement("span")).setAttribute("class", "x");
            e = !t.getElementsByClassName(n)[0];
            t.lastChild.className = n;
            return e || t.getElementsByClassName(n).length != 2
        }() : true,
        tt = J ? function () {
            var e = r.createElement("input");
            e.setAttribute("value", 5);
            return e.defaultValue != 5
        }() : true,
        nt = K ? function () {
            var e = r.createElement("option");
            e.setAttribute("selected", "selected");
            return !e.hasAttribute("selected")
        }() : true,
        rt = function () {
            var e = r.createElement("select");
            e.appendChild(r.createElement("option"));
            return !e.firstChild.selected
        }(),
        it, st, ot, ut, at = /opera/i.test(o.call(e.opera)),
        ft = at && parseFloat(opera.version()) >= 11,
        lt = W ? function () {
            var e = [],
                t = r.createElement("div"),
                n, i = function (e, t, n, r) {
                    var i = false;
                    t.appendChild(n);
                    try {
                        i = t.querySelectorAll(e).length == r
                    } catch (s) {}
                    while (t.firstChild) {
                        t.removeChild(t.firstChild)
                    }
                    return i
                };
            n = r.createElement("p");
            n.setAttribute("class", "");
            i('[class^=""]', t, n, 1) && e.push('[*^$]=[\\x20\\t\\n\\r\\f]*(?:""|' + "'')");
            n = r.createElement("option");
            n.setAttribute("selected", "selected");
            i(":checked", t, n, 0) && e.push(":checked");
            n = r.createElement("input");
            n.setAttribute("type", "hidden");
            i(":enabled", t, n, 1) && e.push(":enabled", ":disabled");
            n = r.createElement("link");
            n.setAttribute("href", "x");
            i(":link", t, n, 1) || e.push(":link");
            if (nt) {
                e.push("\\[[\\x20\\t\\n\\r\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
            }
            return e.length ? new RegExp(e.join("|")) : {
                test: function () {
                    return false
                }
            }
        }() : true,
        ct = new RegExp("(?:\\[[\\x20\\t\\n\\r\\f]*class\\b|\\." + k + ")"),
        ht = new RegExp(!(Z && et) ? !at ? "^(?:\\*|[.#]?-?[_a-zA-Z]{1}" + C + "*)$" : "^(?:\\*|#-?[_a-zA-Z]{1}" + C + "*)$" : "^#?-?[_a-zA-Z]{1}" + C + "*$"),
        pt = {
            a: 1,
            A: 1,
            area: 1,
            AREA: 1,
            link: 1,
            LINK: 1
        },
        dt = {
            checked: 1,
            disabled: 1,
            ismap: 1,
            multiple: 1,
            readonly: 1,
            selected: 1
        },
        vt = {
            value: "defaultValue",
            checked: "defaultChecked",
            selected: "defaultSelected"
        },
        mt = {
            action: 2,
            cite: 2,
            codebase: 2,
            data: 2,
            href: 2,
            longdesc: 2,
            lowsrc: 2,
            src: 2,
            usemap: 2
        },
        gt = {
            "class": 0,
            accept: 1,
            "accept-charset": 1,
            align: 1,
            alink: 1,
            axis: 1,
            bgcolor: 1,
            charset: 1,
            checked: 1,
            clear: 1,
            codetype: 1,
            color: 1,
            compact: 1,
            declare: 1,
            defer: 1,
            dir: 1,
            direction: 1,
            disabled: 1,
            enctype: 1,
            face: 1,
            frame: 1,
            hreflang: 1,
            "http-equiv": 1,
            lang: 1,
            language: 1,
            link: 1,
            media: 1,
            method: 1,
            multiple: 1,
            nohref: 1,
            noresize: 1,
            noshade: 1,
            nowrap: 1,
            readonly: 1,
            rel: 1,
            rev: 1,
            rules: 1,
            scope: 1,
            scrolling: 1,
            selected: 1,
            shape: 1,
            target: 1,
            text: 1,
            type: 1,
            valign: 1,
            valuetype: 1,
            vlink: 1
        },
        yt = {
            accept: 1,
            "accept-charset": 1,
            alink: 1,
            axis: 1,
            bgcolor: 1,
            charset: 1,
            codetype: 1,
            color: 1,
            enctype: 1,
            face: 1,
            hreflang: 1,
            "http-equiv": 1,
            lang: 1,
            language: 1,
            link: 1,
            media: 1,
            rel: 1,
            rev: 1,
            target: 1,
            text: 1,
            type: 1,
            vlink: 1
        },
        bt = {},
        wt = {
            "=": "n=='%m'",
            "^=": "n.indexOf('%m')==0",
            "*=": "n.indexOf('%m')>-1",
            "|=": "(n+'-').indexOf('%m-')==0",
            "~=": "(' '+n+' ').indexOf(' %m ')>-1",
            "$=": "n.substr(n.length-'%m'.length)=='%m'"
        },
        Et = {
            ID: new RegExp("^\\*?#(" + C + "+)|" + N),
            TAG: new RegExp("^(" + C + "+)|" + N),
            CLASS: new RegExp("^\\*?\\.(" + C + "+$)|" + N)
        },
        St = {
            spseudos: /^\:((root|empty|nth-)?(?:(first|last|only)-)?(child)?-?(of-type)?)(?:\(([^\x29]*)\))?(.*)/,
            dpseudos: /^\:(link|visited|target|lang|not|active|focus|hover|checked|disabled|enabled|selected)(?:\((["']*)(.*?(\(.*\))?[^'"()]*?)\2\))?(.*)/,
            attribute: new RegExp("^\\[" + O + "\\](.*)"),
            children: /^[\x20\t\n\r\f]*\>[\x20\t\n\r\f]*(.*)/,
            adjacent: /^[\x20\t\n\r\f]*\+[\x20\t\n\r\f]*(.*)/,
            relative: /^[\x20\t\n\r\f]*\~[\x20\t\n\r\f]*(.*)/,
            ancestor: /^[\x20\t\n\r\f]+(.*)/,
            universal: /^\*(.*)/,
            id: new RegExp("^#(" + C + "+)(.*)"),
            tagName: new RegExp("^(" + C + "+)(.*)"),
            className: new RegExp("^\\.(" + C + "+)(.*)")
        },
        xt = function (e, t) {
            var n = -1,
                r;
            if (!e.length && Array.slice) return Array.slice(t);
            while (r = t[++n]) e[e.length] = r;
            return e
        },
        Tt = function (e, t, n) {
            var r = -1,
                i;
            while (i = t[++r]) {
                if (false === n(e[e.length] = i)) {
                    break
                }
            }
            return e
        },
        Nt = function (e, t) {
            var s, o = r;
            l = e;
            r = e.ownerDocument || e;
            if (t || o !== r) {
                i = r.documentElement;
                ut = r.createElement("DiV").nodeName == "DiV";
                ot = !ut && typeof r.compatMode == "string" ? r.compatMode.indexOf("CSS") < 0 : function () {
                    var e = r.createElement("div").style;
                    return e && (e.width = 1) && e.width == "1px"
                }();
                s = r.createElement("div");
                s.appendChild(r.createElement("p")).setAttribute("class", "xXx");
                s.appendChild(r.createElement("p")).setAttribute("class", "xxx");
                it = !ut && $ && ot && (s.getElementsByClassName("xxx").length != 2 || s.getElementsByClassName("xXx").length != 2);
                st = !ut && W && ot && (s.querySelectorAll("[class~=xxx]").length != 2 || s.querySelectorAll(".xXx").length != 2);
                Xt.CACHING && n.setCache(true, r)
            }
        },
        Ct = function (e, t) {
            var n = -1,
                r = null;
            while (r = t[++n]) {
                if (r.getAttribute("id") == e) {
                    break
                }
            }
            return r
        },
        kt = !Y ? function (e, t) {
            e = e.replace(/\\/g, "");
            return t.getElementById && t.getElementById(e) || Ct(e, t.getElementsByTagName("*"))
        } : function (e, t) {
            var n = null;
            e = e.replace(/\\/g, "");
            if (ut || t.nodeType != 9) {
                return Ct(e, t.getElementsByTagName("*"))
            }
            if ((n = t.getElementById(e)) && n.name == e && t.getElementsByName) {
                return Ct(e, t.getElementsByName(e))
            }
            return n
        },
        Lt = function (e, t) {
            Nt(t || (t = r));
            return kt(e, t)
        },
        At = function (e, t) {
            var n = e == "*",
                r = t,
                i = [],
                s = r.firstChild;
            n || (e = e.toUpperCase());
            while (r = s) {
                if (r.tagName > "@" && (n || r.tagName.toUpperCase() == e)) {
                    i[i.length] = r
                }
                if (s = r.firstChild || r.nextSibling) continue;
                while (!s && (r = r.parentNode) && r !== t) {
                    s = r.nextSibling
                }
            }
            return i
        },
        Ot = !Z && Q ? function (e, t) {
            return ut || t.nodeType == 11 ? At(e, t) : s.call(t.getElementsByTagName(e), 0)
        } : function (e, t) {
            var n = -1,
                r = n,
                i = [],
                s, o = t.getElementsByTagName(e);
            if (e == "*") {
                while (s = o[++n]) {
                    if (s.nodeName > "@") i[++r] = s
                }
            } else {
                while (s = o[++n]) {
                    i[n] = s
                }
            }
            return i
        },
        Mt = function (e, t) {
            Nt(t || (t = r));
            return Ot(e, t)
        },
        _t = function (e, t) {
            return Gt('[name="' + e.replace(/\\/g, "") + '"]', t)
        },
        Dt = function (e, t) {
            var n = -1,
                r = n,
                i = [],
                s, o = Ot("*", t),
                u;
            e = " " + (ot ? e.toLowerCase() : e).replace(/\\/g, "") + " ";
            while (s = o[++n]) {
                u = ut ? s.getAttribute("class") : s.className;
                if (u && u.length && (" " + (ot ? u.toLowerCase() : u).replace(q, " ") + " ").indexOf(e) > -1) {
                    i[++r] = s
                }
            }
            return i
        },
        Pt = function (e, t) {
            return et || it || ut || !t.getElementsByClassName ? Dt(e, t) : s.call(t.getElementsByClassName(e.replace(/\\/g, "")), 0)
        },
        Ht = function (e, t) {
            Nt(t || (t = r));
            return Pt(e, t)
        },
        Bt = "compareDocumentPosition" in i ? function (e, t) {
            return (e.compareDocumentPosition(t) & 16) == 16
        } : "contains" in i ? function (e, t) {
            return e !== t && e.contains(t)
        } : function (e, t) {
            while (t = t.parentNode) {
                if (t === e) return true
            }
            return false
        },
        jt = !tt ? function (e, t) {
            return e.getAttribute(t) || ""
        } : function (e, t) {
            t = t.toLowerCase();
            if (vt[t]) {
                return e[vt[t]] || ""
            }
            return mt[t] ? e.getAttribute(t, 2) || "" : dt[t] ? e.getAttribute(t) ? t : "" : (e = e.getAttributeNode(t)) && e.value || ""
        },
        Ft = !nt ? function (e, t) {
            return ut ? !!e.getAttribute(t) : e.hasAttribute(t)
        } : function (e, t) {
            t = t.toLowerCase();
            if (vt[t]) {
                return !!e[vt[t]]
            }
            e = e.getAttributeNode(t);
            return !!(e && (e.specified || e.nodeValue))
        },
        It = function (e) {
            e = e.firstChild;
            while (e) {
                if (e.nodeType == 3 || e.nodeName > "@") return false;
                e = e.nextSibling
            }
            return true
        },
        qt = function (e) {
            return Ft(e, "href") && pt[e.nodeName]
        },
        Rt = function (e, t) {
            var n = 1,
                r = t ? "nextSibling" : "previousSibling";
            while (e = e[r]) {
                if (e.nodeName > "@")++n
            }
            return n
        },
        Ut = function (e, t) {
            var n = 1,
                r = t ? "nextSibling" : "previousSibling",
                i = e.nodeName;
            while (e = e[r]) {
                if (e.nodeName == i)++n
            }
            return n
        },
        zt = function (e) {
            for (var t in e) {
                Xt[t] = !!e[t];
                if (t == "SIMPLENOT") {
                    Yt = {};
                    Zt = {};
                    en = {};
                    tn = {};
                    Xt["USE_QSAPI"] = false;
                    H = new RegExp(P, "g")
                } else if (t == "USE_QSAPI") {
                    Xt[t] = !!e[t] && W;
                    H = new RegExp(D, "g")
                }
            }
        },
        Wt = function (t) {
            t = "SYNTAX_ERR: " + t + " ";
            if (Xt.VERBOSITY) {
                if (typeof e.DOMException != "undefined") {
                    throw {
                        code: 12,
                        message: t
                    }
                } else {
                    throw new Error(12, t)
                }
            } else {
                if (e.console && e.console.log) {
                    e.console.log(t)
                } else {
                    e.status += t
                }
            }
        },
        Xt = {
            CACHING: false,
            SHORTCUTS: false,
            SIMPLENOT: true,
            USE_HTML5: false,
            USE_QSAPI: W,
            VERBOSITY: true
        },
        Vt = "r[r.length]=c[k];if(f&&false===f(c[k]))break;else continue main;",
        $t = function (e, t, n) {
            var r = typeof e == "string" ? e.match(F) : e;
            typeof t == "string" || (t = "");
            if (r.length == 1) {
                t += Jt(r[0], n ? Vt : "f&&f(k);return true;")
            } else {
                var i = -1,
                    s = {},
                    o;
                while (o = r[++i]) {
                    o = o.replace(B, "");
                    if (!s[o] && (s[o] = true)) {
                        t += Jt(o, n ? Vt : "f&&f(k);return true;")
                    }
                }
            } if (n) {
                return new Function("c,s,r,d,h,g,f", "var N,n,x=0,k=-1,e;main:while((e=c[++k])){" + t + "}return r;")
            } else {
                return new Function("e,s,r,d,h,g,f", "var N,n,x=0,k=e;" + t + "return false;")
            }
        },
        Jt = function (e, t) {
            var n, i, s, o = 0,
                u, a, f, l, c, h;
            while (e) {
                o++;
                if (a = e.match(St.universal)) {
                    u = ""
                } else if (a = e.match(St.id)) {
                    t = "if(" + (ut ? 's.getAttribute(e,"id")' : '(e.submit?s.getAttribute(e,"id"):e.id)') + '=="' + a[1] + '"){' + t + "}"
                } else if (a = e.match(St.tagName)) {
                    t = "if(e.nodeName" + (ut ? '=="' + a[1] + '"' : '.toUpperCase()=="' + a[1].toUpperCase() + '"') + "){" + t + "}"
                } else if (a = e.match(St.className)) {
                    t = "if((n=" + (ut ? 's.getAttribute(e,"class")' : "e.className") + ')&&n.length&&(" "+' + (ot ? "n.toLowerCase()" : "n") + ".replace(" + q + '," ")+" ").indexOf(" ' + (ot ? a[1].toLowerCase() : a[1]) + ' ")>-1){' + t + "}"
                } else if (a = e.match(St.attribute)) {
                    u = a[1].split(":");
                    u = u.length == 2 ? u[1] : u[0] + "";
                    if (a[2] && !wt[a[2]]) {
                        Wt('Unsupported operator in attribute selectors "' + e + '"');
                        return ""
                    }
                    c = false;
                    h = "false";
                    if (a[2] && a[4] && (h = wt[a[2]])) {
                        gt["class"] = ot ? 1 : 0;
                        a[4] = a[4].replace(/\\([0-9a-f]{2,2})/, "\\x$1");
                        c = (ut ? yt : gt)[u.toLowerCase()];
                        h = h.replace(/\%m/g, c ? a[4].toLowerCase() : a[4])
                    } else if (a[2] == "!=" || a[2] == "=") {
                        h = "n" + a[2] + '="' + a[4] + '"'
                    }
                    u = "n=s." + (a[2] ? "get" : "has") + 'Attribute(e,"' + a[1] + '")' + (c ? ".toLowerCase();" : ";");
                    t = u + "if(" + (a[2] ? h : "n") + "){" + t + "}"
                } else if (a = e.match(St.adjacent)) {
                    t = G ? "var N" + o + "=e;if(e&&(e=e.previousElementSibling)){" + t + "}e=N" + o + ";" : "var N" + o + '=e;while(e&&(e=e.previousSibling)){if(e.nodeName>"@"){' + t + "break;}}e=N" + o + ";"
                } else if (a = e.match(St.relative)) {
                    t = G ? "var N" + o + "=e;e=e.parentNode.firstElementChild;while(e&&e!==N" + o + "){" + t + "e=e.nextElementSibling}e=N" + o + ";" : "var N" + o + "=e;e=e.parentNode.firstChild;while(e&&e!==N" + o + '){if(e.nodeName>"@"){' + t + "}e=e.nextSibling}e=N" + o + ";"
                } else if (a = e.match(St.children)) {
                    t = "var N" + o + "=e;if(e&&e!==h&&e!==g&&(e=e.parentNode)){" + t + "}e=N" + o + ";"
                } else if (a = e.match(St.ancestor)) {
                    t = "var N" + o + "=e;while(e&&e!==h&&e!==g&&(e=e.parentNode)){" + t + "}e=N" + o + ";"
                } else if ((a = e.match(St.spseudos)) && a[1]) {
                    switch (a[2]) {
                    case "root":
                        if (a[7]) {
                            t = "if(e===h||s.contains(h,e)){" + t + "}"
                        } else {
                            t = "if(e===h){" + t + "}"
                        }
                        break;
                    case "empty":
                        t = "if(s.isEmpty(e)){" + t + "}";
                        break;
                    default:
                        if (a[2] && a[6]) {
                            if (a[6] == "n") {
                                t = "if(e!==h){" + t + "}";
                                break
                            } else if (a[6] == "even") {
                                n = 2;
                                i = 0
                            } else if (a[6] == "odd") {
                                n = 2;
                                i = 1
                            } else {
                                i = (s = a[6].match(/(-?\d+)$/)) ? parseInt(s[1], 10) : 0;
                                n = (s = a[6].match(/(-?\d*)n/)) ? parseInt(s[1], 10) : 0;
                                if (s && s[1] == "-") n = -1
                            }
                            c = i < 1 && n > 1 ? "(n-(" + i + "))%" + n + "==0" : n > +1 ? a[3] == "last" ? "(n-(" + i + "))%" + n + "==0" : "n>=" + i + "&&(n-(" + i + "))%" + n + "==0" : n < -1 ? a[3] == "last" ? "(n-(" + i + "))%" + n + "==0" : "n<=" + i + "&&(n-(" + i + "))%" + n + "==0" : n === 0 ? "n==" + i : a[3] == "last" ? n == -1 ? "n>=" + i : "n<=" + i : n == -1 ? "n<=" + i : "n>=" + i;
                            t = "if(e!==h){n=s[" + (a[5] ? '"nthOfType"' : '"nthElement"') + "](e," + (a[3] == "last" ? "true" : "false") + ");if(" + c + "){" + t + "}}"
                        } else {
                            n = a[3] == "first" ? "previous" : "next";
                            s = a[3] == "only" ? "previous" : "next";
                            i = a[3] == "first" || a[3] == "last";
                            h = a[5] ? "&&n.nodeName!=e.nodeName" : '&&n.nodeName<"@"';
                            t = "if(e!==h){" + ("n=e;while((n=n." + n + "Sibling)" + h + ");if(!n){" + (i ? t : "n=e;while((n=n." + s + "Sibling)" + h + ");if(!n){" + t + "}") + "}") + "}"
                        }
                        break
                    }
                } else if ((a = e.match(St.dpseudos)) && a[1]) {
                    switch (a[1]) {
                    case "not":
                        u = a[3].replace(B, "");
                        if (Xt.SIMPLENOT && !j.test(u)) {
                            Wt('Negation pseudo-class only accepts simple selectors "' + e + '"');
                            return ""
                        } else {
                            if ("compatMode" in r) {
                                t = "if(!" + $t([u], "", false) + "(e,s,r,d,h,g)){" + t + "}"
                            } else {
                                t = 'if(!s.match(e, "' + u.replace(/\x22/g, '\\"') + '",g)){' + t + "}"
                            }
                        }
                        break;
                    case "checked":
                        c = 'if((typeof e.form!="undefined"&&(/^(?:radio|checkbox)$/i).test(e.type)&&e.checked)';
                        t = (Xt.USE_HTML5 ? c + "||(/^option$/i.test(e.nodeName)&&e.selected)" : c) + "){" + t + "}";
                        break;
                    case "disabled":
                        t = 'if(((typeof e.form!="undefined"&&!(/^hidden$/i).test(e.type))||s.isLink(e))&&e.disabled){' + t + "}";
                        break;
                    case "enabled":
                        t = 'if(((typeof e.form!="undefined"&&!(/^hidden$/i).test(e.type))||s.isLink(e))&&!e.disabled){' + t + "}";
                        break;
                    case "lang":
                        c = "";
                        if (a[3]) c = a[3].substr(0, 2) + "-";
                        t = 'do{(n=e.lang||"").toLowerCase();if((n==""&&h.lang=="' + a[3].toLowerCase() + '")||(n&&(n=="' + a[3].toLowerCase() + '"||n.substr(0,3)=="' + c.toLowerCase() + '"))){' + t + "break;}}while((e=e.parentNode)&&e!==g);";
                        break;
                    case "target":
                        s = r.location ? r.location.hash : "";
                        if (s) {
                            t = 'if(e.id=="' + s.slice(1) + '"){' + t + "}"
                        }
                        break;
                    case "link":
                        t = "if(s.isLink(e)&&!e.visited){" + t + "}";
                        break;
                    case "visited":
                        t = "if(s.isLink(e)&&e.visited){" + t + "}";
                        break;
                    case "active":
                        if (ut) break;
                        t = "if(e===d.activeElement){" + t + "}";
                        break;
                    case "hover":
                        if (ut) break;
                        t = "if(e===d.hoverElement){" + t + "}";
                        break;
                    case "focus":
                        if (ut) break;
                        t = z ? "if(e===d.activeElement&&d.hasFocus()&&(e.type||e.href)){" + t + "}" : "if(e===d.activeElement&&(e.type||e.href)){" + t + "}";
                        break;
                    case "selected":
                        u = rt ? "||(n=e.parentNode)&&n.options[n.selectedIndex]===e" : "";
                        t = "if(/^option$/i.test(e.nodeName)&&(e.selected" + u + ")){" + t + "}";
                        break;
                    default:
                        break
                    }
                } else {
                    u = false;
                    l = true;
                    for (u in bt) {
                        if ((a = e.match(bt[u].Expression)) && a[1]) {
                            f = bt[u].Callback(a, t);
                            t = f.source;
                            l = f.status;
                            if (l) break
                        }
                    }
                    if (!l) {
                        Wt('Unknown pseudo-class selector "' + e + '"');
                        return ""
                    }
                    if (!u) {
                        Wt('Unknown token in selector "' + e + '"');
                        return ""
                    }
                } if (!a) {
                    Wt('Invalid syntax in selector "' + e + '"');
                    return ""
                }
                e = a && a[a.length - 1]
            }
            return t
        },
        Kt = function (e, t, n, s) {
            var o;
            if (!(e && e.nodeName > "@")) {
                Wt("Invalid element argument");
                return false
            } else if (!t || typeof t != "string") {
                Wt("Invalid selector argument");
                return false
            } else if (n && n.nodeType == 1 && !Bt(n, e)) {
                return false
            } else if (l !== n) {
                Nt(n || (n = e.ownerDocument))
            }
            t = t.replace(B, "");
            Xt.SHORTCUTS && (t = NW.Dom.shortcuts(t, e, n));
            if (h != t) {
                if ((o = t.match(H)) && o[0] == t) {
                    u = (o = t.match(F)).length < 2;
                    h = t;
                    d = o
                } else {
                    Wt('The string "' + t + '", is not a valid CSS selector');
                    return false
                }
            } else o = d; if (!Zt[t] || Yt[t] !== n) {
                Zt[t] = $t(u ? [t] : o, "", false);
                Yt[t] = n
            }
            return Zt[t](e, nn, [], r, i, n, s)
        },
        Qt = function (e, t) {
            return Gt(e, t, function () {
                return false
            })[0] || null
        },
        Gt = function (e, t, o) {
            var u, h, d, m, g, y, b = e;
            if (arguments.length === 0) {
                Wt("Missing required selector parameters");
                return []
            } else if (e === "") {
                Wt("Empty selector string");
                return []
            } else if (typeof e != "string") {
                return []
            } else if (t && !/1|9|11/.test(t.nodeType)) {
                Wt("Invalid context element");
                return []
            } else if (l !== t) {
                Nt(t || (t = r))
            }
            if (Xt.CACHING && (m = n.loadResults(b, t, r, i))) {
                return o ? Tt([], m, o) : m
            }
            if (!ft && ht.test(e)) {
                switch (e.charAt(0)) {
                case "#":
                    if (d = kt(e.slice(1), t)) {
                        m = [d]
                    } else m = [];
                    break;
                case ".":
                    m = Pt(e.slice(1), t);
                    break;
                default:
                    m = Ot(e, t);
                    break
                }
            } else if (!ut && Xt.USE_QSAPI && !(st && ct.test(e)) && !lt.test(e)) {
                try {
                    m = t.querySelectorAll(e)
                } catch (w) {}
            }
            if (m) {
                m = o ? Tt([], m, o) : Q ? s.call(m) : xt([], m);
                Xt.CACHING && n.saveResults(b, t, r, m);
                return m
            }
            e = e.replace(B, "");
            Xt.SHORTCUTS && (e = NW.Dom.shortcuts(e, t));
            if (h = p != e) {
                if ((g = e.match(H)) && g[0] == e) {
                    a = (g = e.match(F)).length < 2;
                    p = e;
                    v = g
                } else {
                    Wt('The string "' + e + '", is not a valid CSS selector');
                    return []
                }
            } else g = v; if (t.nodeType == 11) {
                m = t.childNodes
            } else if (!ut && a) {
                if (h) {
                    g = e.match(I);
                    y = g[g.length - 1];
                    f = y.split(":not")[0];
                    c = e.length - y.length
                }
                if ((g = f.match(Et.ID)) && (y = g[1])) {
                    if (d = kt(y, t)) {
                        if (Kt(d, e)) {
                            o && o(d);
                            m = [d]
                        } else m = []
                    }
                } else if ((g = e.match(Et.ID)) && (y = g[1])) {
                    if (d = kt(y, r)) {
                        if ("#" + y == e) {
                            o && o(d);
                            m = [d]
                        }
                        if (/[>+~]/.test(e)) {
                            t = d.parentNode
                        } else {
                            e = e.replace("#" + y, "*");
                            c -= y.length + 1;
                            t = d
                        }
                    } else m = []
                }
                if (m) {
                    Xt.CACHING && n.saveResults(b, t, r, m);
                    return m
                }
                if (!$ && (g = f.match(Et.TAG)) && (y = g[1])) {
                    if ((m = Ot(y, t)).length === 0) {
                        return []
                    }
                    e = e.slice(0, c) + e.slice(c).replace(y, "*")
                } else if ((g = f.match(Et.CLASS)) && (y = g[1])) {
                    if ((m = Pt(y, t)).length === 0) {
                        return []
                    }
                    if (R.test(e.charAt(e.indexOf(y) - 1))) {
                        e = e.slice(0, c) + e.slice(c).replace("." + y, "")
                    } else {
                        e = e.slice(0, c) + e.slice(c).replace("." + y, "*")
                    }
                } else if ((g = e.match(Et.CLASS)) && (y = g[1])) {
                    if ((m = Pt(y, t)).length === 0) {
                        return []
                    }
                    for (u = 0, els = []; m.length > u; ++u) {
                        els = xt(els, m[u].getElementsByTagName("*"))
                    }
                    m = els;
                    if (R.test(e.charAt(e.indexOf(y) - 1))) {
                        e = e.slice(0, c) + e.slice(c).replace("." + y, "")
                    } else {
                        e = e.slice(0, c) + e.slice(c).replace("." + y, "*")
                    }
                } else if ($ && (g = f.match(Et.TAG)) && (y = g[1])) {
                    if ((m = Ot(y, t)).length === 0) {
                        return []
                    }
                    e = e.slice(0, c) + e.slice(c).replace(y, "*")
                }
            }
            if (!m) {
                m = /^(?:applet|object)$/i.test(t.nodeName) ? t.childNodes : Ot("*", t)
            }
            if (!tn[e] || en[e] !== t) {
                tn[e] = $t(a ? [e] : g, "", true);
                en[e] = t
            }
            m = tn[e](m, nn, [], r, i, t, o);
            Xt.CACHING && n.saveResults(b, t, r, m);
            return m
        },
        Yt = {},
        Zt = {},
        en = {},
        tn = {},
        nn = {
            nthElement: Rt,
            nthOfType: Ut,
            getAttribute: jt,
            hasAttribute: Ft,
            byClass: Pt,
            byName: _t,
            byTag: Ot,
            byId: kt,
            contains: Bt,
            isEmpty: It,
            isLink: qt,
            select: Gt,
            match: Kt
        };
    Tokens = {
        prefixes: m,
        encoding: C,
        operators: g,
        whitespace: y,
        identifier: k,
        attributes: A,
        combinators: b,
        pseudoclass: M,
        pseudoparms: w,
        quotedvalue: E
    };
    n.ACCEPT_NODE = Vt;
    n.emit = Wt;
    n.byId = Lt;
    n.byTag = Mt;
    n.byName = _t;
    n.byClass = Ht;
    n.getAttribute = jt;
    n.hasAttribute = Ft;
    n.match = Kt;
    n.first = Qt;
    n.select = Gt;
    n.compile = $t;
    n.contains = Bt;
    n.configure = zt;
    n.setCache = function () {
        return
    };
    n.loadResults = function () {
        return
    };
    n.saveResults = function () {
        return
    };
    n.shortcuts = function (e) {
        return e
    };
    n.Config = Xt;
    n.Snapshot = nn;
    n.Operators = wt;
    n.Selectors = bt;
    n.Tokens = Tokens;
    n.registerOperator = function (e, t) {
        wt[e] || (wt[e] = t)
    };
    n.registerSelector = function (e, t, n) {
        bt[e] || (bt[e] = {
            Expression: t,
            Callback: n
        })
    };
    Nt(r, true)
})(this);
(function (e) {
    function M(e) {
        return e.replace(m, O).replace(g, function (e, t, n) {
            var r = n.split(",");
            for (var i = 0, s = r.length; i < s; i++) {
                var o = q(r[i]) + A;
                var u = [];
                r[i] = o.replace(y, function (e, t, n, r, i) {
                    if (t) {
                        if (u.length > 0) {
                            a.push({
                                selector: o.substring(0, i),
                                patches: u
                            });
                            u = []
                        }
                        return t
                    } else {
                        var s = n ? D(n) : _(r);
                        if (s) {
                            u.push(s);
                            return "." + s.className
                        }
                        return e
                    }
                })
            }
            return t + r.join(",")
        })
    }

    function _(e) {
        return !x || x.test(e) ? {
            className: B(e),
            applyClass: true
        } : null
    }

    function D(t) {
        var r = true;
        var s = B(t.slice(1));
        var o = t.substring(0, 5) == ":not(";
        var a;
        var f;
        if (o) {
            t = t.slice(5, -1)
        }
        var l = t.indexOf("(");
        if (l > -1) {
            t = t.substring(0, l)
        }
        if (t.charAt(0) == ":") {
            switch (t.slice(1)) {
            case "root":
                r = function (e) {
                    return o ? e != n : e == n
                };
                break;
            case "target":
                if (i == 8) {
                    r = function (t) {
                        var n = function () {
                            var e = location.hash;
                            var n = e.slice(1);
                            return o ? e == L || t.id != n : e != L && t.id == n
                        };
                        z(e, "hashchange", function () {
                            R(t, s, n())
                        });
                        return n()
                    };
                    break
                }
                return false;
            case "checked":
                r = function (e) {
                    if (S.test(e.type)) {
                        z(e, "propertychange", function () {
                            if (event.propertyName == "checked") {
                                R(e, s, e.checked !== o)
                            }
                        })
                    }
                    return e.checked !== o
                };
                break;
            case "disabled":
                o = !o;
            case "enabled":
                r = function (e) {
                    if (E.test(e.tagName)) {
                        z(e, "propertychange", function () {
                            if (event.propertyName == "$disabled") {
                                R(e, s, e.$disabled === o)
                            }
                        });
                        u.push(e);
                        e.$disabled = e.disabled;
                        return e.disabled === o
                    }
                    return t == ":enabled" ? o : !o
                };
                break;
            case "focus":
                a = "focus";
                f = "blur";
            case "hover":
                if (!a) {
                    a = "mouseenter";
                    f = "mouseleave"
                }
                r = function (e) {
                    z(e, o ? f : a, function () {
                        R(e, s, true)
                    });
                    z(e, o ? a : f, function () {
                        R(e, s, false)
                    });
                    return o
                };
                break;
            default:
                if (!v.test(t)) {
                    return false
                }
                break
            }
        }
        return {
            className: s,
            applyClass: r
        }
    }

    function P() {
        var e, t, n, r;
        for (var i = 0; i < a.length; i++) {
            t = a[i].selector;
            n = a[i].patches;
            r = t.replace(b, L);
            if (r == L || r.charAt(r.length - 1) == A) {
                r += "*"
            }
            try {
                e = o(r)
            } catch (s) {
                j("Selector '" + t + "' threw exception '" + s + "'")
            }
            if (e) {
                for (var u = 0, f = e.length; u < f; u++) {
                    var l = e[u];
                    var c = l.className;
                    for (var h = 0, p = n.length; h < p; h++) {
                        var d = n[h];
                        if (!H(l, d)) {
                            if (d.applyClass && (d.applyClass === true || d.applyClass(l) === true)) {
                                c = U(c, d.className, true)
                            }
                        }
                    }
                    l.className = c
                }
            }
        }
    }

    function H(e, t) {
        return (new RegExp("(^|\\s)" + t.className + "(\\s|$)")).test(e.className)
    }

    function B(e) {
        return c + "-" + (i == 6 && l ? f++ : e.replace(w, function (e) {
            return e.charCodeAt(0)
        }))
    }

    function j(t) {
        if (e.console) {
            e.console.log(t)
        }
    }

    function F(e) {
        return e.replace(k, O)
    }

    function I(e) {
        return F(e).replace(C, A)
    }

    function q(e) {
        return I(e.replace(T, O).replace(N, O))
    }

    function R(e, t, n) {
        var r = e.className;
        var i = U(r, t, n);
        if (i != r) {
            e.className = i;
            e.parentNode.className += L
        }
    }

    function U(e, t, n) {
        var r = RegExp("(^|\\s)" + t + "(\\s|$)");
        var i = r.test(e);
        if (n) {
            return i ? e : e + A + t
        } else {
            return i ? F(e.replace(r, O)) : e
        }
    }

    function z(e, t, n) {
        e.attachEvent("on" + t, n)
    }

    function W() {
        if (e.XMLHttpRequest) {
            return new XMLHttpRequest
        }
        try {
            return new ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {
            return null
        }
    }

    function X(e) {
        r.open("GET", e, false);
        r.send();
        return r.status == 200 ? r.responseText : L
    }

    function V(e, t, n) {
        function r(e) {
            return e.substring(0, e.indexOf("//"))
        }

        function i(e) {
            return e.substring(0, e.indexOf("/", 8))
        }
        if (!t) {
            t = G
        }
        if (e.substring(0, 2) == "//") {
            e = r(t) + e
        }
        if (/^https?:\/\//i.test(e)) {
            return !n && i(t) != i(e) ? null : e
        }
        if (e.charAt(0) == "/") {
            return i(t) + e
        }
        var s = t.split(/[?#]/)[0];
        if (e.charAt(0) != "?" && s.charAt(s.length - 1) != "/") {
            s = s.substring(0, s.lastIndexOf("/") + 1)
        }
        return s + e
    }

    function $(e) {
        if (e) {
            return X(e).replace(h, L).replace(p, function (t, n, r, i, s, o) {
                var u = $(V(r || s, e));
                return o ? "@media " + o + " {" + u + "}" : u
            }).replace(d, function (t, n, r, i) {
                r = r || L;
                return n ? t : " url(" + r + V(i, e, true) + r + ") "
            })
        }
        return L
    }

    function J() {
        var e, n;
        for (var r = 0; r < t.styleSheets.length; r++) {
            n = t.styleSheets[r];
            if (n.href != L) {
                e = V(n.href);
                if (e) {
                    n.cssText = n["rawCssText"] = M($(e))
                }
            }
        }
    }

    function K() {
        P();
        if (u.length > 0) {
            setInterval(function () {
                for (var e = 0, t = u.length; e < t; e++) {
                    var n = u[e];
                    if (n.disabled !== n.$disabled) {
                        if (n.disabled) {
                            n.disabled = false;
                            n.$disabled = true;
                            n.disabled = true
                        } else {
                            n.$disabled = n.disabled
                        }
                    }
                }
            }, 250)
        }
    }

    function Y(e, r) {
        var i = false,
            s = true,
            o = function (n) {
                if (n.type == "readystatechange" && t.readyState != "complete") return;
                (n.type == "load" ? e : t).detachEvent("on" + n.type, o, false);
                if (!i && (i = true)) r.call(e, n.type || n)
            },
            u = function () {
                try {
                    n.doScroll("left")
                } catch (e) {
                    setTimeout(u, 50);
                    return
                }
                o("poll")
            };
        if (t.readyState == "complete") r.call(e, L);
        else {
            if (t.createEventObject && n.doScroll) {
                try {
                    s = !e.frameElement
                } catch (a) {}
                if (s) u()
            }
            z(t, "readystatechange", o);
            z(e, "load", o)
        }
    }
    if (true) return;
    var t = document;
    var n = t.documentElement;
    var r = W();
    var i = /MSIE (\d+)/.exec(navigator.userAgent)[1];
    if (t.compatMode != "CSS1Compat" || i < 6 || i > 8 || !r) {
        return
    }
    var s = {
        NW: "*.Dom.select",
        MooTools: "$$",
        DOMAssistant: "*.$",
        Prototype: "$$",
        YAHOO: "*.util.Selector.query",
        Sizzle: "*",
        jQuery: "*",
        dojo: "*.query"
    };
    var o;
    var u = [];
    var a = [];
    var f = 0;
    var l = true;
    var c = "slvzr";
    var h = /(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*?/g;
    var p = /@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))\s*([^;]*);/g;
    var d = /(behavior\s*?:\s*)?\burl\(\s*(["']?)(?!data:)([^"')]+)\2\s*\)/g;
    var v = /^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/;
    var m = /:(:first-(?:line|letter))/g;
    var g = /((?:^|(?:\s*})+)(?:\s*@media[^{]+{)?)\s*([^\{]*?[\[:][^{]+)/g;
    var y = /([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g;
    var b = /(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g;
    var w = /[^\w-]/g;
    var E = /^(INPUT|SELECT|TEXTAREA|BUTTON)$/;
    var S = /^(checkbox|radio)$/;
    var x = i > 6 ? /[\$\^*]=(['"])\1/ : null;
    var T = /([(\[+~])\s+/g;
    var N = /\s+([)\]+~])/g;
    var C = /\s+/g;
    var k = /^\s*((?:[\S\s]*\S)?)\s*$/;
    var L = "";
    var A = " ";
    var O = "$1";
    var Q = t.getElementsByTagName("BASE");
    var G = Q.length > 0 ? Q[0].href : t.location.href;
    J();
    Y(e, function () {
        for (var t in s) {
            var n, r, i = e;
            if (e[t]) {
                n = s[t].replace("*", t).split(".");
                while ((r = n.shift()) && (i = i[r])) {}
                if (typeof i == "function") {
                    o = i;
                    K();
                    return
                }
            }
        }
    });
})(this);
window.matchMedia = window.matchMedia || function (e, t) {
    var n, r = e.documentElement,
        i = r.firstElementChild || r.firstChild,
        s = e.createElement("body"),
        o = e.createElement("div");
    o.id = "mq-test-1";
    o.style.cssText = "position:absolute;top:-100em";
    s.style.background = "none";
    s.appendChild(o);
    return function (e) {
        o.innerHTML = '&shy;<style media="' + e + '"> #mq-test-1 { width: 42px; }</style>';
        r.insertBefore(s, i);
        n = o.offsetWidth == 42;
        r.removeChild(s);
        return {
            matches: n,
            media: e
        }
    }
}(document);
(function (e) {
    function S() {
        b(true)
    }
    e.respond = {};
    respond.update = function () {};
    respond.mediaQueriesSupported = e.matchMedia && e.matchMedia("only all").matches;
    if (respond.mediaQueriesSupported) {
        return
    }
    var t = e.document,
        n = t.documentElement,
        r = [],
        i = [],
        s = [],
        o = {},
        u = 30,
        a = t.getElementsByTagName("head")[0] || n,
        f = t.getElementsByTagName("base")[0],
        l = a.getElementsByTagName("link"),
        c = [],
        h = function () {
            var t = l,
                n = t.length,
                r = 0,
                i, s, u, a;
            for (; r < n; r++) {
                i = t[r], s = i.href, u = i.media, a = i.rel && i.rel.toLowerCase() === "stylesheet";
                if (!!s && a && !o[s]) {
                    if (i.styleSheet && i.styleSheet.rawCssText) {
                        d(i.styleSheet.rawCssText, s, u);
                        o[s] = true
                    } else {
                        if (!/^([a-zA-Z:]*\/\/)/.test(s) && !f || s.replace(RegExp.$1, "").split("/")[0] === e.location.host) {
                            c.push({
                                href: s,
                                media: u
                            })
                        }
                    }
                }
            }
            p()
        },
        p = function () {
            if (c.length) {
                var e = c.shift();
                w(e.href, function (t) {
                    d(t, e.href, e.media);
                    o[e.href] = true;
                    p()
                })
            }
        },
        d = function (e, t, n) {
            var s = e.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),
                o = s && s.length || 0,
                t = t.substring(0, t.lastIndexOf("/")),
                u = function (e) {
                    return e.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + t + "$2$3")
                },
                a = !o && n,
                f = 0,
                l, c, h, p, d;
            if (t.length) {
                t += "/"
            }
            if (a) {
                o = 1
            }
            for (; f < o; f++) {
                l = 0;
                if (a) {
                    c = n;
                    i.push(u(e))
                } else {
                    c = s[f].match(/@media *([^\{]+)\{([\S\s]+?)$/) && RegExp.$1;
                    i.push(RegExp.$2 && u(RegExp.$2))
                }
                p = c.split(",");
                d = p.length;
                for (; l < d; l++) {
                    h = p[l];
                    r.push({
                        media: h.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/) && RegExp.$2 || "all",
                        rules: i.length - 1,
                        hasquery: h.indexOf("(") > -1,
                        minw: h.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        maxw: h.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                    })
                }
            }
            b()
        },
        v, m, g = function () {
            var e, r = t.createElement("div"),
                i = t.body,
                s = false;
            r.style.cssText = "position:absolute;font-size:1em;width:1em";
            if (!i) {
                i = s = t.createElement("body");
                i.style.background = "none"
            }
            i.appendChild(r);
            n.insertBefore(i, n.firstChild);
            e = r.offsetWidth;
            if (s) {
                n.removeChild(i)
            } else {
                i.removeChild(r)
            }
            e = y = parseFloat(e);
            return e
        },
        y, b = function (e) {
            var o = "clientWidth",
                f = n[o],
                c = t.compatMode === "CSS1Compat" && f || t.body[o] || f,
                h = {},
                p = l[l.length - 1],
                d = (new Date).getTime();
            if (e && v && d - v < u) {
                clearTimeout(m);
                m = setTimeout(b, u);
                return
            } else {
                v = d
            }
            for (var w in r) {
                var E = r[w],
                    S = E.minw,
                    x = E.maxw,
                    T = S === null,
                    N = x === null,
                    C = "em";
                if (!!S) {
                    S = parseFloat(S) * (S.indexOf(C) > -1 ? y || g() : 1)
                }
                if (!!x) {
                    x = parseFloat(x) * (x.indexOf(C) > -1 ? y || g() : 1)
                }
                if (!E.hasquery || (!T || !N) && (T || c >= S) && (N || c <= x)) {
                    if (!h[E.media]) {
                        h[E.media] = []
                    }
                    h[E.media].push(i[E.rules])
                }
            }
            for (var w in s) {
                if (s[w] && s[w].parentNode === a) {
                    a.removeChild(s[w])
                }
            }
            for (var w in h) {
                var L = t.createElement("style"),
                    A = h[w].join("\n");
                L.type = "text/css";
                L.media = w;
                a.insertBefore(L, p.nextSibling);
                if (L.styleSheet) {
                    L.styleSheet.cssText = A
                } else {
                    L.appendChild(t.createTextNode(A))
                }
                s.push(L)
            }
        },
        w = function (e, t) {
            var n = E();
            if (!n) {
                return
            }
            n.open("GET", e, true);
            n.onreadystatechange = function () {
                if (n.readyState != 4 || n.status != 200 && n.status != 304) {
                    return
                }
                t(n.responseText)
            };
            if (n.readyState == 4) {
                return
            }
            n.send(null)
        },
        E = function () {
            var e = false;
            try {
                e = new XMLHttpRequest
            } catch (t) {
                e = new ActiveXObject("Microsoft.XMLHTTP")
            }
            return function () {
                return e
            }
        }();
    h();
    respond.update = h;
    if (e.addEventListener) {
        e.addEventListener("resize", S, false)
    } else {
        if (e.attachEvent) {
            e.attachEvent("onresize", S)
        }
    }
})(this)