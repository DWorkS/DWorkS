(function() {
    var COMPILED = !0,
        goog = goog || {};
    goog.global = this;
    goog.isDef = function(a) {
        return void 0 !== a
    };
    goog.exportPath_ = function(a, b, c) {
        a = a.split(".");
        c = c || goog.global;
        a[0] in c || !c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) !a.length && goog.isDef(b) ? c[d] = b : c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {}
    };
    goog.define = function(a, b) {
        var c = b;
        COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, a) ? c = goog.global.CLOSURE_UNCOMPILED_DEFINES[a] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (c = goog.global.CLOSURE_DEFINES[a]));
        goog.exportPath_(a, c)
    };
    goog.DEBUG = !0;
    goog.LOCALE = "en";
    goog.TRUSTED_SITE = !0;
    goog.STRICT_MODE_COMPATIBLE = !1;
    goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
    goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
    goog.provide = function(a) {
        if (goog.isInModuleLoader_()) throw Error("goog.provide can not be used within a goog.module.");
        if (!COMPILED && goog.isProvided_(a)) throw Error('Namespace "' + a + '" already declared.');
        goog.constructNamespace_(a)
    };
    goog.constructNamespace_ = function(a, b) {
        if (!COMPILED) {
            delete goog.implicitNamespaces_[a];
            for (var c = a;
                (c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) goog.implicitNamespaces_[c] = !0
        }
        goog.exportPath_(a, b)
    };
    goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
    goog.module = function(a) {
        if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_)) throw Error("Invalid module identifier");
        if (!goog.isInModuleLoader_()) throw Error("Module " + a + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
        if (goog.moduleLoaderState_.moduleName) throw Error("goog.module may only be called once per module.");
        goog.moduleLoaderState_.moduleName = a;
        if (!COMPILED) {
            if (goog.isProvided_(a)) throw Error('Namespace "' + a + '" already declared.');
            delete goog.implicitNamespaces_[a]
        }
    };
    goog.module.get = function(a) {
        return goog.module.getInternal_(a)
    };
    goog.module.getInternal_ = function(a) {
        if (!COMPILED) {
            if (a in goog.loadedModules_) return goog.loadedModules_[a];
            if (!goog.implicitNamespaces_[a]) return a = goog.getObjectByName(a), null != a ? a : null
        }
        return null
    };
    goog.moduleLoaderState_ = null;
    goog.isInModuleLoader_ = function() {
        return null != goog.moduleLoaderState_
    };
    goog.module.declareLegacyNamespace = function() {
        if (!COMPILED && !goog.isInModuleLoader_()) throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
        if (!COMPILED && !goog.moduleLoaderState_.moduleName) throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
        goog.moduleLoaderState_.declareLegacyNamespace = !0
    };
    goog.setTestOnly = function(a) {
        if (goog.DISALLOW_TEST_ONLY_CODE) throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
    };
    goog.forwardDeclare = function(a) {};
    COMPILED || (goog.isProvided_ = function(a) {
        return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a))
    }, goog.implicitNamespaces_ = {
        "goog.module": !0
    });
    goog.getObjectByName = function(a, b) {
        for (var c = a.split("."), d = b || goog.global, e; e = c.shift();)
            if (goog.isDefAndNotNull(d[e])) d = d[e];
            else return null;
        return d
    };
    goog.globalize = function(a, b) {
        var c = b || goog.global,
            d;
        for (d in a) c[d] = a[d]
    };
    goog.addDependency = function(a, b, c, d) {
        if (goog.DEPENDENCIES_ENABLED) {
            var e;
            a = a.replace(/\\/g, "/");
            var f = goog.dependencies_;
            d && "boolean" !== typeof d || (d = d ? {
                module: "goog"
            } : {});
            for (var g = 0; e = b[g]; g++) f.nameToPath[e] = a, f.loadFlags[a] = d;
            for (d = 0; b = c[d]; d++) a in f.requires || (f.requires[a] = {}), f.requires[a][b] = !0
        }
    };
    goog.ENABLE_DEBUG_LOADER = !0;
    goog.logToConsole_ = function(a) {
        goog.global.console && goog.global.console.error(a)
    };
    goog.require = function(a) {
        if (!COMPILED) {
            goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(a);
            if (goog.isProvided_(a)) {
                if (goog.isInModuleLoader_()) return goog.module.getInternal_(a)
            } else if (goog.ENABLE_DEBUG_LOADER) {
                var b = goog.getPathFromDeps_(a);
                if (b) goog.writeScripts_(b);
                else throw a = "goog.require could not find: " + a, goog.logToConsole_(a), Error(a);
            }
            return null
        }
    };
    goog.basePath = "";
    goog.nullFunction = function() {};
    goog.abstractMethod = function() {
        throw Error("unimplemented abstract method");
    };
    goog.addSingletonGetter = function(a) {
        a.instance_ = void 0;
        a.getInstance = function() {
            if (a.instance_) return a.instance_;
            goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
            return a.instance_ = new a
        }
    };
    goog.instantiatedSingletons_ = [];
    goog.LOAD_MODULE_USING_EVAL = !0;
    goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
    goog.loadedModules_ = {};
    goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
    goog.TRANSPILE = "detect";
    goog.TRANSPILER = "transpile.js";
    goog.DEPENDENCIES_ENABLED && (goog.dependencies_ = {
            loadFlags: {},
            nameToPath: {},
            requires: {},
            visited: {},
            written: {},
            deferred: {}
        }, goog.inHtmlDocument_ = function() {
            var a = goog.global.document;
            return null != a && "write" in a
        }, goog.findBasePath_ = function() {
            if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) goog.basePath = goog.global.CLOSURE_BASE_PATH;
            else if (goog.inHtmlDocument_())
                for (var a = goog.global.document.getElementsByTagName("SCRIPT"), b = a.length - 1; 0 <= b; --b) {
                    var c = a[b].src,
                        d = c.lastIndexOf("?"),
                        d = -1 == d ? c.length : d;
                    if ("base.js" ==
                        c.substr(d - 7, 7)) {
                        goog.basePath = c.substr(0, d - 7);
                        break
                    }
                }
        }, goog.importScript_ = function(a, b) {
            (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(a, b) && (goog.dependencies_.written[a] = !0)
        }, goog.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.importProcessedScript_ = function(a, b, c) {
            goog.importScript_("", 'goog.retrieveAndExec_("' + a + '", ' + b + ", " + c + ");")
        }, goog.queuedModules_ = [], goog.wrapModule_ = function(a, b) {
            return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ?
                "goog.loadModule(" + goog.global.JSON.stringify(b + "\n//# sourceURL=" + a + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + b + "\n;return exports});\n//# sourceURL=" + a + "\n"
        }, goog.loadQueuedModules_ = function() {
            var a = goog.queuedModules_.length;
            if (0 < a) {
                var b = goog.queuedModules_;
                goog.queuedModules_ = [];
                for (var c = 0; c < a; c++) goog.maybeProcessDeferredPath_(b[c])
            }
        }, goog.maybeProcessDeferredDep_ = function(a) {
            goog.isDeferredModule_(a) && goog.allDepsAreAvailable_(a) && (a = goog.getPathFromDeps_(a), goog.maybeProcessDeferredPath_(goog.basePath +
                a))
        }, goog.isDeferredModule_ = function(a) {
            var b = (a = goog.getPathFromDeps_(a)) && goog.dependencies_.loadFlags[a] || {},
                c = b.lang || "es3";
            return a && ("goog" == b.module || goog.needsTranspile_(c)) ? goog.basePath + a in goog.dependencies_.deferred : !1
        }, goog.allDepsAreAvailable_ = function(a) {
            if ((a = goog.getPathFromDeps_(a)) && a in goog.dependencies_.requires)
                for (var b in goog.dependencies_.requires[a])
                    if (!goog.isProvided_(b) && !goog.isDeferredModule_(b)) return !1;
            return !0
        }, goog.maybeProcessDeferredPath_ = function(a) {
            if (a in
                goog.dependencies_.deferred) {
                var b = goog.dependencies_.deferred[a];
                delete goog.dependencies_.deferred[a];
                goog.globalEval(b)
            }
        }, goog.loadModuleFromUrl = function(a) {
            goog.retrieveAndExec_(a, !0, !1)
        }, goog.writeScriptSrcNode_ = function(a) {
            goog.global.document.write('<script type="text/javascript" src="' + a + '">\x3c/script>')
        }, goog.appendScriptSrcNode_ = function(a) {
            var b = goog.global.document,
                c = b.createElement("script");
            c.type = "text/javascript";
            c.src = a;
            c.defer = !1;
            c.async = !1;
            b.head.appendChild(c)
        }, goog.writeScriptTag_ =
        function(a, b) {
            if (goog.inHtmlDocument_()) {
                var c = goog.global.document;
                if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == c.readyState) {
                    if (/\bdeps.js$/.test(a)) return !1;
                    throw Error('Cannot write "' + a + '" after document load');
                }
                if (void 0 === b)
                    if (goog.IS_OLD_IE_) {
                        var d = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
                        c.write('<script type="text/javascript" src="' + a + '"' + d + ">\x3c/script>")
                    } else goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(a) :
                        goog.writeScriptSrcNode_(a);
                else c.write('<script type="text/javascript">' + goog.protectScriptTag_(b) + "\x3c/script>");
                return !0
            }
            return !1
        }, goog.protectScriptTag_ = function(a) {
            return a.replace(/<\/(SCRIPT)/ig, "\\x3c/$1")
        }, goog.needsTranspile_ = function(a) {
            if ("always" == goog.TRANSPILE) return !0;
            if ("never" == goog.TRANSPILE) return !1;
            goog.requiresTranspilation_ || (goog.requiresTranspilation_ = goog.createRequiresTranspilation_());
            if (a in goog.requiresTranspilation_) return goog.requiresTranspilation_[a];
            throw Error("Unknown language mode: " +
                a);
        }, goog.requiresTranspilation_ = null, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(a, b) {
            "complete" == a.readyState && goog.lastNonModuleScriptIndex_ == b && goog.loadQueuedModules_();
            return !0
        }, goog.writeScripts_ = function(a) {
            function b(a) {
                if (!(a in e.written || a in e.visited)) {
                    e.visited[a] = !0;
                    if (a in e.requires)
                        for (var f in e.requires[a])
                            if (!goog.isProvided_(f))
                                if (f in e.nameToPath) b(e.nameToPath[f]);
                                else throw Error("Undefined nameToPath for " + f);
                    a in d || (d[a] = !0, c.push(a))
                }
            }
            var c = [],
                d = {},
                e = goog.dependencies_;
            b(a);
            for (a = 0; a < c.length; a++) {
                var f = c[a];
                goog.dependencies_.written[f] = !0
            }
            var g = goog.moduleLoaderState_;
            goog.moduleLoaderState_ = null;
            for (a = 0; a < c.length; a++)
                if (f = c[a]) {
                    var h = e.loadFlags[f] || {},
                        k = goog.needsTranspile_(h.lang || "es3");
                    "goog" == h.module || k ? goog.importProcessedScript_(goog.basePath + f, "goog" == h.module, k) : goog.importScript_(goog.basePath + f)
                } else throw goog.moduleLoaderState_ = g, Error("Undefined script input");
            goog.moduleLoaderState_ = g
        }, goog.getPathFromDeps_ = function(a) {
            return a in
                goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
        }, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
    goog.hasBadLetScoping = null;
    goog.useSafari10Workaround = function() {
        if (null == goog.hasBadLetScoping) {
            var a;
            try {
                a = !eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";')
            } catch (b) {
                a = !1
            }
            goog.hasBadLetScoping = a
        }
        return goog.hasBadLetScoping
    };
    goog.workaroundSafari10EvalBug = function(a) {
        return "(function(){" + a + "\n;})();\n"
    };
    goog.loadModule = function(a) {
        var b = goog.moduleLoaderState_;
        try {
            goog.moduleLoaderState_ = {
                moduleName: void 0,
                declareLegacyNamespace: !1
            };
            var c;
            if (goog.isFunction(a)) c = a.call(void 0, {});
            else if (goog.isString(a)) goog.useSafari10Workaround() && (a = goog.workaroundSafari10EvalBug(a)), c = goog.loadModuleFromSource_.call(void 0, a);
            else throw Error("Invalid module definition");
            var d = goog.moduleLoaderState_.moduleName;
            if (!goog.isString(d) || !d) throw Error('Invalid module name "' + d + '"');
            goog.moduleLoaderState_.declareLegacyNamespace ?
                goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof c && null != c && Object.seal(c);
            goog.loadedModules_[d] = c
        } finally {
            goog.moduleLoaderState_ = b
        }
    };
    goog.loadModuleFromSource_ = function(a) {
        eval(a);
        return {}
    };
    goog.normalizePath_ = function(a) {
        a = a.split("/");
        for (var b = 0; b < a.length;) "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
        return a.join("/")
    };
    goog.loadFileSync_ = function(a) {
        if (goog.global.CLOSURE_LOAD_FILE_SYNC) return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
        try {
            var b = new goog.global.XMLHttpRequest;
            b.open("get", a, !1);
            b.send();
            return 0 == b.status || 200 == b.status ? b.responseText : null
        } catch (c) {
            return null
        }
    };
    goog.retrieveAndExec_ = function(a, b, c) {
        if (!COMPILED) {
            var d = a;
            a = goog.normalizePath_(a);
            var e = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_,
                f = goog.loadFileSync_(a);
            if (null == f) throw Error('Load of "' + a + '" failed');
            c && (f = goog.transpile_.call(goog.global, f, a));
            f = b ? goog.wrapModule_(a, f) : f + ("\n//# sourceURL=" + a);
            goog.IS_OLD_IE_ ? (goog.dependencies_.deferred[d] = f, goog.queuedModules_.push(d)) : e(a, f)
        }
    };
    goog.transpile_ = function(a, b) {
        var c = goog.global.$jscomp;
        c || (goog.global.$jscomp = c = {});
        var d = c.transpile;
        if (!d) {
            var e = goog.basePath + goog.TRANSPILER,
                f = goog.loadFileSync_(e);
            if (f) {
                eval(f + "\n//# sourceURL=" + e);
                if (goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile) throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
                goog.global.$jscomp.transpile = goog.global.$gwtExport.$jscomp.transpile;
                c = goog.global.$jscomp;
                d = c.transpile
            }
        }
        d || (d = c.transpile = function(a, b) {
            goog.logToConsole_(b + " requires transpilation but no transpiler was found.");
            return a
        });
        return d(a, b)
    };
    goog.typeOf = function(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
        else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    };
    goog.isNull = function(a) {
        return null === a
    };
    goog.isDefAndNotNull = function(a) {
        return null != a
    };
    goog.isArray = function(a) {
        return "array" == goog.typeOf(a)
    };
    goog.isArrayLike = function(a) {
        var b = goog.typeOf(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    };
    goog.isDateLike = function(a) {
        return goog.isObject(a) && "function" == typeof a.getFullYear
    };
    goog.isString = function(a) {
        return "string" == typeof a
    };
    goog.isBoolean = function(a) {
        return "boolean" == typeof a
    };
    goog.isNumber = function(a) {
        return "number" == typeof a
    };
    goog.isFunction = function(a) {
        return "function" == goog.typeOf(a)
    };
    goog.isObject = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    };
    goog.getUid = function(a) {
        return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
    };
    goog.hasUid = function(a) {
        return !!a[goog.UID_PROPERTY_]
    };
    goog.removeUid = function(a) {
        null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
        try {
            delete a[goog.UID_PROPERTY_]
        } catch (b) {}
    };
    goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
    goog.uidCounter_ = 0;
    goog.getHashCode = goog.getUid;
    goog.removeHashCode = goog.removeUid;
    goog.cloneObject = function(a) {
        var b = goog.typeOf(a);
        if ("object" == b || "array" == b) {
            if (a.clone) return a.clone();
            var b = "array" == b ? [] : {},
                c;
            for (c in a) b[c] = goog.cloneObject(a[c]);
            return b
        }
        return a
    };
    goog.bindNative_ = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    };
    goog.bindJs_ = function(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    };
    goog.bind = function(a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
        return goog.bind.apply(null, arguments)
    };
    goog.partial = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    };
    goog.mixin = function(a, b) {
        for (var c in b) a[c] = b[c]
    };
    goog.now = goog.TRUSTED_SITE && Date.now || function() {
        return +new Date
    };
    goog.globalEval = function(a) {
        if (goog.global.execScript) goog.global.execScript(a, "JavaScript");
        else if (goog.global.eval) {
            if (null == goog.evalWorksForGlobals_)
                if (goog.global.eval("var _evalTest_ = 1;"), "undefined" != typeof goog.global._evalTest_) {
                    try {
                        delete goog.global._evalTest_
                    } catch (b) {}
                    goog.evalWorksForGlobals_ = !0
                } else goog.evalWorksForGlobals_ = !1;
            if (goog.evalWorksForGlobals_) goog.global.eval(a);
            else {
                var c = goog.global.document,
                    d = c.createElement("SCRIPT");
                d.type = "text/javascript";
                d.defer = !1;
                d.appendChild(c.createTextNode(a));
                c.body.appendChild(d);
                c.body.removeChild(d)
            }
        } else throw Error("goog.globalEval not available");
    };
    goog.evalWorksForGlobals_ = null;
    goog.getCssName = function(a, b) {
        if ("." == String(a).charAt(0)) throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a);
        var c = function(a) {
                return goog.cssNameMapping_[a] || a
            },
            d = function(a) {
                a = a.split("-");
                for (var b = [], d = 0; d < a.length; d++) b.push(c(a[d]));
                return b.join("-")
            },
            d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
                return a
            },
            d = b ? a + "-" + d(b) : d(a);
        return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(d) : d
    };
    goog.setCssNameMapping = function(a, b) {
        goog.cssNameMapping_ = a;
        goog.cssNameMappingStyle_ = b
    };
    !COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
    goog.getMsg = function(a, b) {
        b && (a = a.replace(/\{\$([^}]+)}/g, function(a, d) {
            return null != b && d in b ? b[d] : a
        }));
        return a
    };
    goog.getMsgWithFallback = function(a, b) {
        return a
    };
    goog.exportSymbol = function(a, b, c) {
        goog.exportPath_(a, b, c)
    };
    goog.exportProperty = function(a, b, c) {
        a[b] = c
    };
    goog.inherits = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.superClass_ = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.base = function(a, c, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
            return b.prototype[c].apply(a, g)
        }
    };
    goog.base = function(a, b, c) {
        var d = arguments.callee.caller;
        if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
        if (d.superClass_) {
            for (var e = Array(arguments.length - 1), f = 1; f < arguments.length; f++) e[f - 1] = arguments[f];
            return d.superClass_.constructor.apply(a, e)
        }
        e = Array(arguments.length - 2);
        for (f = 2; f < arguments.length; f++) e[f - 2] = arguments[f];
        for (var f = !1, g = a.constructor; g; g =
            g.superClass_ && g.superClass_.constructor)
            if (g.prototype[b] === d) f = !0;
            else if (f) return g.prototype[b].apply(a, e);
        if (a[b] === d) return a.constructor.prototype[b].apply(a, e);
        throw Error("goog.base called from a method of one name to a method of a different name");
    };
    goog.scope = function(a) {
        if (goog.isInModuleLoader_()) throw Error("goog.scope is not supported within a goog.module.");
        a.call(goog.global)
    };
    COMPILED || (goog.global.COMPILED = COMPILED);
    goog.defineClass = function(a, b) {
        var c = b.constructor,
            d = b.statics;
        c && c != Object.prototype.constructor || (c = function() {
            throw Error("cannot instantiate an interface (no constructor defined).");
        });
        c = goog.defineClass.createSealingConstructor_(c, a);
        a && goog.inherits(c, a);
        delete b.constructor;
        delete b.statics;
        goog.defineClass.applyProperties_(c.prototype, b);
        null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
        return c
    };
    goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
    goog.defineClass.createSealingConstructor_ = function(a, b) {
        if (!goog.defineClass.SEAL_CLASS_INSTANCES) return a;
        var c = !goog.defineClass.isUnsealable_(b),
            d = function() {
                var b = a.apply(this, arguments) || this;
                b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
                this.constructor === d && c && Object.seal instanceof Function && Object.seal(b);
                return b
            };
        return d
    };
    goog.defineClass.isUnsealable_ = function(a) {
        return a && a.prototype && a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]
    };
    goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    goog.defineClass.applyProperties_ = function(a, b) {
        for (var c in b) Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
        for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++) c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
    };
    goog.tagUnsealableClass = function(a) {
        !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0)
    };
    goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
    goog.createRequiresTranspilation_ = function() {
        function a(a, b) {
            d ? c[a] = !0 : b() ? c[a] = !1 : d = c[a] = !0
        }

        function b(a) {
            try {
                return !!eval(a)
            } catch (b) {
                return !1
            }
        }
        var c = {
                es3: !1
            },
            d = !1,
            e = goog.global.navigator && goog.global.navigator.userAgent ? goog.global.navigator.userAgent : "";
        a("es5", function() {
            return b("[1,].length==1")
        });
        a("es6", function() {
            var a = e.match(/Edge\/(\d+)(\.\d)*/i);
            return a && 15 > Number(a[1]) ? !1 : b('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()')
        });
        a("es6-impl", function() {
            return !0
        });
        a("es7", function() {
            return b("2 ** 2 == 4")
        });
        a("es8", function() {
            return b("async () => 1, true")
        });
        return c
    };
    goog.fx = {};
    goog.fx.Transition = function() {};
    goog.fx.Transition.EventType = {
        PLAY: "play",
        BEGIN: "begin",
        RESUME: "resume",
        END: "end",
        STOP: "stop",
        FINISH: "finish",
        PAUSE: "pause"
    };
    goog.events = {};
    goog.events.EventId = function(a) {
        this.id = a
    };
    goog.events.EventId.prototype.toString = function() {
        return this.id
    };
    goog.events.Listenable = function() {};
    goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (1E6 * Math.random() | 0);
    goog.events.Listenable.addImplementation = function(a) {
        a.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0
    };
    goog.events.Listenable.isImplementedBy = function(a) {
        return !(!a || !a[goog.events.Listenable.IMPLEMENTED_BY_PROP])
    };
    goog.events.ListenableKey = function() {};
    goog.events.ListenableKey.counter_ = 0;
    goog.events.ListenableKey.reserveKey = function() {
        return ++goog.events.ListenableKey.counter_
    };
    goog.events.Listener = function(a, b, c, d, e, f) {
        goog.events.Listener.ENABLE_MONITORING && (this.creationStack = Error().stack);
        this.listener = a;
        this.proxy = b;
        this.src = c;
        this.type = d;
        this.capture = !!e;
        this.handler = f;
        this.key = goog.events.ListenableKey.reserveKey();
        this.removed = this.callOnce = !1
    };
    goog.events.Listener.ENABLE_MONITORING = !1;
    goog.events.Listener.prototype.markAsRemoved = function() {
        this.removed = !0;
        this.handler = this.src = this.proxy = this.listener = null
    };
    goog.Thenable = function() {};
    goog.Thenable.prototype.then = function(a, b, c) {};
    goog.Thenable.IMPLEMENTED_BY_PROP = "$goog_Thenable";
    goog.Thenable.addImplementation = function(a) {
        a.prototype.then = a.prototype.then;
        COMPILED ? a.prototype[goog.Thenable.IMPLEMENTED_BY_PROP] = !0 : a.prototype.$goog_Thenable = !0
    };
    goog.Thenable.isImplementedBy = function(a) {
        if (!a) return !1;
        try {
            return COMPILED ? !!a[goog.Thenable.IMPLEMENTED_BY_PROP] : !!a.$goog_Thenable
        } catch (b) {
            return !1
        }
    };
    goog.promise = {};
    goog.promise.Resolver = function() {};
    goog.history = {};
    goog.history.EventType = {
        NAVIGATE: "navigate"
    };
    goog.memoize = function(a, b) {
        var c = b || goog.memoize.simpleSerializer;
        return function() {
            if (goog.memoize.ENABLE_MEMOIZE) {
                var b = this || goog.global,
                    b = b[goog.memoize.CACHE_PROPERTY_] || (b[goog.memoize.CACHE_PROPERTY_] = {}),
                    e = c(goog.getUid(a), arguments);
                return b.hasOwnProperty(e) ? b[e] : b[e] = a.apply(this, arguments)
            }
            return a.apply(this, arguments)
        }
    };
    goog.memoize.ENABLE_MEMOIZE = !0;
    goog.memoize.clearCache = function(a) {
        a[goog.memoize.CACHE_PROPERTY_] = {}
    };
    goog.memoize.CACHE_PROPERTY_ = "closure_memoize_cache_";
    goog.memoize.simpleSerializer = function(a, b) {
        for (var c = [a], d = b.length - 1; 0 <= d; --d) c.push(typeof b[d], b[d]);
        return c.join("\x0B")
    };
    goog.string = {};
    goog.string.TypedString = function() {};
    goog.string.DETECT_DOUBLE_ESCAPING = !1;
    goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
    goog.string.Unicode = {
        NBSP: "\u00a0"
    };
    goog.string.startsWith = function(a, b) {
        return 0 == a.lastIndexOf(b, 0)
    };
    goog.string.endsWith = function(a, b) {
        var c = a.length - b.length;
        return 0 <= c && a.indexOf(b, c) == c
    };
    goog.string.caseInsensitiveStartsWith = function(a, b) {
        return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
    };
    goog.string.caseInsensitiveEndsWith = function(a, b) {
        return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
    };
    goog.string.caseInsensitiveEquals = function(a, b) {
        return a.toLowerCase() == b.toLowerCase()
    };
    goog.string.subs = function(a, b) {
        for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();
        return d + c.join("%s")
    };
    goog.string.collapseWhitespace = function(a) {
        return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
    };
    goog.string.isEmptyOrWhitespace = function(a) {
        return /^[\s\xa0]*$/.test(a)
    };
    goog.string.isEmptyString = function(a) {
        return 0 == a.length
    };
    goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
    goog.string.isEmptyOrWhitespaceSafe = function(a) {
        return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a))
    };
    goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
    goog.string.isBreakingWhitespace = function(a) {
        return !/[^\t\n\r ]/.test(a)
    };
    goog.string.isAlpha = function(a) {
        return !/[^a-zA-Z]/.test(a)
    };
    goog.string.isNumeric = function(a) {
        return !/[^0-9]/.test(a)
    };
    goog.string.isAlphaNumeric = function(a) {
        return !/[^a-zA-Z0-9]/.test(a)
    };
    goog.string.isSpace = function(a) {
        return " " == a
    };
    goog.string.isUnicodeChar = function(a) {
        return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
    };
    goog.string.stripNewlines = function(a) {
        return a.replace(/(\r\n|\r|\n)+/g, " ")
    };
    goog.string.canonicalizeNewlines = function(a) {
        return a.replace(/(\r\n|\r|\n)/g, "\n")
    };
    goog.string.normalizeWhitespace = function(a) {
        return a.replace(/\xa0|\s/g, " ")
    };
    goog.string.normalizeSpaces = function(a) {
        return a.replace(/\xa0|[ \t]+/g, " ")
    };
    goog.string.collapseBreakingSpaces = function(a) {
        return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
    };
    goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(a) {
        return a.trim()
    } : function(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    };
    goog.string.trimLeft = function(a) {
        return a.replace(/^[\s\xa0]+/, "")
    };
    goog.string.trimRight = function(a) {
        return a.replace(/[\s\xa0]+$/, "")
    };
    goog.string.caseInsensitiveCompare = function(a, b) {
        var c = String(a).toLowerCase(),
            d = String(b).toLowerCase();
        return c < d ? -1 : c == d ? 0 : 1
    };
    goog.string.numberAwareCompare_ = function(a, b, c) {
        if (a == b) return 0;
        if (!a) return -1;
        if (!b) return 1;
        for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0; g < f; g++) {
            c = d[g];
            var h = e[g];
            if (c != h) return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1
        }
        return d.length != e.length ? d.length - e.length : a < b ? -1 : 1
    };
    goog.string.intAwareCompare = function(a, b) {
        return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g)
    };
    goog.string.floatAwareCompare = function(a, b) {
        return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g)
    };
    goog.string.numerateCompare = goog.string.floatAwareCompare;
    goog.string.urlEncode = function(a) {
        return encodeURIComponent(String(a))
    };
    goog.string.urlDecode = function(a) {
        return decodeURIComponent(a.replace(/\+/g, " "))
    };
    goog.string.newLineToBr = function(a, b) {
        return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
    };
    goog.string.htmlEscape = function(a, b) {
        if (b) a = a.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
        else {
            if (!goog.string.ALL_RE_.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(goog.string.AMP_RE_, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(goog.string.LT_RE_,
                "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(goog.string.GT_RE_, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(goog.string.QUOT_RE_, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(goog.string.NULL_RE_, "&#0;"));
            goog.string.DETECT_DOUBLE_ESCAPING && -1 != a.indexOf("e") && (a = a.replace(goog.string.E_RE_, "&#101;"))
        }
        return a
    };
    goog.string.AMP_RE_ = /&/g;
    goog.string.LT_RE_ = /</g;
    goog.string.GT_RE_ = />/g;
    goog.string.QUOT_RE_ = /"/g;
    goog.string.SINGLE_QUOTE_RE_ = /'/g;
    goog.string.NULL_RE_ = /\x00/g;
    goog.string.E_RE_ = /e/g;
    goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
    goog.string.unescapeEntities = function(a) {
        return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
    };
    goog.string.unescapeEntitiesWithDocument = function(a, b) {
        return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a
    };
    goog.string.unescapeEntitiesUsingDom_ = function(a, b) {
        var c = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                "&quot;": '"'
            },
            d;
        d = b ? b.createElement("div") : goog.global.document.createElement("div");
        return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, b) {
            var g = c[a];
            if (g) return g;
            if ("#" == b.charAt(0)) {
                var h = Number("0" + b.substr(1));
                isNaN(h) || (g = String.fromCharCode(h))
            }
            g || (d.innerHTML = a + " ", g = d.firstChild.nodeValue.slice(0, -1));
            return c[a] = g
        })
    };
    goog.string.unescapePureXmlEntities_ = function(a) {
        return a.replace(/&([^;]+);/g, function(a, c) {
            switch (c) {
                case "amp":
                    return "&";
                case "lt":
                    return "<";
                case "gt":
                    return ">";
                case "quot":
                    return '"';
                default:
                    if ("#" == c.charAt(0)) {
                        var d = Number("0" + c.substr(1));
                        if (!isNaN(d)) return String.fromCharCode(d)
                    }
                    return a
            }
        })
    };
    goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
    goog.string.whitespaceEscape = function(a, b) {
        return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
    };
    goog.string.preserveSpaces = function(a) {
        return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP)
    };
    goog.string.stripQuotes = function(a, b) {
        for (var c = b.length, d = 0; d < c; d++) {
            var e = 1 == c ? b : b.charAt(d);
            if (a.charAt(0) == e && a.charAt(a.length - 1) == e) return a.substring(1, a.length - 1)
        }
        return a
    };
    goog.string.truncate = function(a, b, c) {
        c && (a = goog.string.unescapeEntities(a));
        a.length > b && (a = a.substring(0, b - 3) + "...");
        c && (a = goog.string.htmlEscape(a));
        return a
    };
    goog.string.truncateMiddle = function(a, b, c, d) {
        c && (a = goog.string.unescapeEntities(a));
        if (d && a.length > b) {
            d > b && (d = b);
            var e = a.length - d;
            a = a.substring(0, b - d) + "..." + a.substring(e)
        } else a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
        c && (a = goog.string.htmlEscape(a));
        return a
    };
    goog.string.specialEscapeChars_ = {
        "\x00": "\\0",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\x0B",
        '"': '\\"',
        "\\": "\\\\",
        "<": "<"
    };
    goog.string.jsEscapeCache_ = {
        "'": "\\'"
    };
    goog.string.quote = function(a) {
        a = String(a);
        for (var b = ['"'], c = 0; c < a.length; c++) {
            var d = a.charAt(c),
                e = d.charCodeAt(0);
            b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
        }
        b.push('"');
        return b.join("")
    };
    goog.string.escapeString = function(a) {
        for (var b = [], c = 0; c < a.length; c++) b[c] = goog.string.escapeChar(a.charAt(c));
        return b.join("")
    };
    goog.string.escapeChar = function(a) {
        if (a in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[a];
        if (a in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
        var b = a,
            c = a.charCodeAt(0);
        if (31 < c && 127 > c) b = a;
        else {
            if (256 > c) {
                if (b = "\\x", 16 > c || 256 < c) b += "0"
            } else b = "\\u", 4096 > c && (b += "0");
            b += c.toString(16).toUpperCase()
        }
        return goog.string.jsEscapeCache_[a] = b
    };
    goog.string.contains = function(a, b) {
        return -1 != a.indexOf(b)
    };
    goog.string.caseInsensitiveContains = function(a, b) {
        return goog.string.contains(a.toLowerCase(), b.toLowerCase())
    };
    goog.string.countOf = function(a, b) {
        return a && b ? a.split(b).length - 1 : 0
    };
    goog.string.removeAt = function(a, b, c) {
        var d = a;
        0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
        return d
    };
    goog.string.remove = function(a, b) {
        return a.replace(b, "")
    };
    goog.string.removeAll = function(a, b) {
        var c = new RegExp(goog.string.regExpEscape(b), "g");
        return a.replace(c, "")
    };
    goog.string.replaceAll = function(a, b, c) {
        b = new RegExp(goog.string.regExpEscape(b), "g");
        return a.replace(b, c.replace(/\$/g, "$$$$"))
    };
    goog.string.regExpEscape = function(a) {
        return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
    };
    goog.string.repeat = String.prototype.repeat ? function(a, b) {
        return a.repeat(b)
    } : function(a, b) {
        return Array(b + 1).join(a)
    };
    goog.string.padNumber = function(a, b, c) {
        a = goog.isDef(c) ? a.toFixed(c) : String(a);
        c = a.indexOf("."); - 1 == c && (c = a.length);
        return goog.string.repeat("0", Math.max(0, b - c)) + a
    };
    goog.string.makeSafe = function(a) {
        return null == a ? "" : String(a)
    };
    goog.string.buildString = function(a) {
        return Array.prototype.join.call(arguments, "")
    };
    goog.string.getRandomString = function() {
        return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
    };
    goog.string.compareVersions = function(a, b) {
        for (var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && g < f; g++) {
            var h = d[g] || "",
                k = e[g] || "";
            do {
                h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
                if (0 == h[0].length && 0 == k[0].length) break;
                var c = 0 == h[1].length ? 0 : parseInt(h[1], 10),
                    l = 0 == k[1].length ? 0 : parseInt(k[1], 10),
                    c = goog.string.compareElements_(c, l) || goog.string.compareElements_(0 == h[2].length, 0 == k[2].length) ||
                    goog.string.compareElements_(h[2], k[2]),
                    h = h[3],
                    k = k[3]
            } while (0 == c)
        }
        return c
    };
    goog.string.compareElements_ = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    goog.string.hashCode = function(a) {
        for (var b = 0, c = 0; c < a.length; ++c) b = 31 * b + a.charCodeAt(c) >>> 0;
        return b
    };
    goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
    goog.string.createUniqueString = function() {
        return "goog_" + goog.string.uniqueStringCounter_++
    };
    goog.string.toNumber = function(a) {
        var b = Number(a);
        return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b
    };
    goog.string.isLowerCamelCase = function(a) {
        return /^[a-z]+([A-Z][a-z]*)*$/.test(a)
    };
    goog.string.isUpperCamelCase = function(a) {
        return /^([A-Z][a-z]*)+$/.test(a)
    };
    goog.string.toCamelCase = function(a) {
        return String(a).replace(/\-([a-z])/g, function(a, c) {
            return c.toUpperCase()
        })
    };
    goog.string.toSelectorCase = function(a) {
        return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
    };
    goog.string.toTitleCase = function(a, b) {
        var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
        return a.replace(new RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
            return b + c.toUpperCase()
        })
    };
    goog.string.capitalize = function(a) {
        return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase()
    };
    goog.string.parseInt = function(a) {
        isFinite(a) && (a = String(a));
        return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
    };
    goog.string.splitLimit = function(a, b, c) {
        a = a.split(b);
        for (var d = []; 0 < c && a.length;) d.push(a.shift()), c--;
        a.length && d.push(a.join(b));
        return d
    };
    goog.string.lastComponent = function(a, b) {
        if (b) "string" == typeof b && (b = [b]);
        else return a;
        for (var c = -1, d = 0; d < b.length; d++)
            if ("" != b[d]) {
                var e = a.lastIndexOf(b[d]);
                e > c && (c = e)
            }
        return -1 == c ? a : a.slice(c + 1)
    };
    goog.string.editDistance = function(a, b) {
        var c = [],
            d = [];
        if (a == b) return 0;
        if (!a.length || !b.length) return Math.max(a.length, b.length);
        for (var e = 0; e < b.length + 1; e++) c[e] = e;
        for (e = 0; e < a.length; e++) {
            d[0] = e + 1;
            for (var f = 0; f < b.length; f++) d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + Number(a[e] != b[f]));
            for (f = 0; f < c.length; f++) c[f] = d[f]
        }
        return d[b.length]
    };
    goog.dom = {};
    goog.dom.TagName = function(a) {
        this.tagName_ = a
    };
    goog.dom.TagName.prototype.toString = function() {
        return this.tagName_
    };
    goog.dom.TagName.A = new goog.dom.TagName("A");
    goog.dom.TagName.ABBR = new goog.dom.TagName("ABBR");
    goog.dom.TagName.ACRONYM = new goog.dom.TagName("ACRONYM");
    goog.dom.TagName.ADDRESS = new goog.dom.TagName("ADDRESS");
    goog.dom.TagName.APPLET = new goog.dom.TagName("APPLET");
    goog.dom.TagName.AREA = new goog.dom.TagName("AREA");
    goog.dom.TagName.ARTICLE = new goog.dom.TagName("ARTICLE");
    goog.dom.TagName.ASIDE = new goog.dom.TagName("ASIDE");
    goog.dom.TagName.AUDIO = new goog.dom.TagName("AUDIO");
    goog.dom.TagName.B = new goog.dom.TagName("B");
    goog.dom.TagName.BASE = new goog.dom.TagName("BASE");
    goog.dom.TagName.BASEFONT = new goog.dom.TagName("BASEFONT");
    goog.dom.TagName.BDI = new goog.dom.TagName("BDI");
    goog.dom.TagName.BDO = new goog.dom.TagName("BDO");
    goog.dom.TagName.BIG = new goog.dom.TagName("BIG");
    goog.dom.TagName.BLOCKQUOTE = new goog.dom.TagName("BLOCKQUOTE");
    goog.dom.TagName.BODY = new goog.dom.TagName("BODY");
    goog.dom.TagName.BR = new goog.dom.TagName("BR");
    goog.dom.TagName.BUTTON = new goog.dom.TagName("BUTTON");
    goog.dom.TagName.CANVAS = new goog.dom.TagName("CANVAS");
    goog.dom.TagName.CAPTION = new goog.dom.TagName("CAPTION");
    goog.dom.TagName.CENTER = new goog.dom.TagName("CENTER");
    goog.dom.TagName.CITE = new goog.dom.TagName("CITE");
    goog.dom.TagName.CODE = new goog.dom.TagName("CODE");
    goog.dom.TagName.COL = new goog.dom.TagName("COL");
    goog.dom.TagName.COLGROUP = new goog.dom.TagName("COLGROUP");
    goog.dom.TagName.COMMAND = new goog.dom.TagName("COMMAND");
    goog.dom.TagName.DATA = new goog.dom.TagName("DATA");
    goog.dom.TagName.DATALIST = new goog.dom.TagName("DATALIST");
    goog.dom.TagName.DD = new goog.dom.TagName("DD");
    goog.dom.TagName.DEL = new goog.dom.TagName("DEL");
    goog.dom.TagName.DETAILS = new goog.dom.TagName("DETAILS");
    goog.dom.TagName.DFN = new goog.dom.TagName("DFN");
    goog.dom.TagName.DIALOG = new goog.dom.TagName("DIALOG");
    goog.dom.TagName.DIR = new goog.dom.TagName("DIR");
    goog.dom.TagName.DIV = new goog.dom.TagName("DIV");
    goog.dom.TagName.DL = new goog.dom.TagName("DL");
    goog.dom.TagName.DT = new goog.dom.TagName("DT");
    goog.dom.TagName.EM = new goog.dom.TagName("EM");
    goog.dom.TagName.EMBED = new goog.dom.TagName("EMBED");
    goog.dom.TagName.FIELDSET = new goog.dom.TagName("FIELDSET");
    goog.dom.TagName.FIGCAPTION = new goog.dom.TagName("FIGCAPTION");
    goog.dom.TagName.FIGURE = new goog.dom.TagName("FIGURE");
    goog.dom.TagName.FONT = new goog.dom.TagName("FONT");
    goog.dom.TagName.FOOTER = new goog.dom.TagName("FOOTER");
    goog.dom.TagName.FORM = new goog.dom.TagName("FORM");
    goog.dom.TagName.FRAME = new goog.dom.TagName("FRAME");
    goog.dom.TagName.FRAMESET = new goog.dom.TagName("FRAMESET");
    goog.dom.TagName.H1 = new goog.dom.TagName("H1");
    goog.dom.TagName.H2 = new goog.dom.TagName("H2");
    goog.dom.TagName.H3 = new goog.dom.TagName("H3");
    goog.dom.TagName.H4 = new goog.dom.TagName("H4");
    goog.dom.TagName.H5 = new goog.dom.TagName("H5");
    goog.dom.TagName.H6 = new goog.dom.TagName("H6");
    goog.dom.TagName.HEAD = new goog.dom.TagName("HEAD");
    goog.dom.TagName.HEADER = new goog.dom.TagName("HEADER");
    goog.dom.TagName.HGROUP = new goog.dom.TagName("HGROUP");
    goog.dom.TagName.HR = new goog.dom.TagName("HR");
    goog.dom.TagName.HTML = new goog.dom.TagName("HTML");
    goog.dom.TagName.I = new goog.dom.TagName("I");
    goog.dom.TagName.IFRAME = new goog.dom.TagName("IFRAME");
    goog.dom.TagName.IMG = new goog.dom.TagName("IMG");
    goog.dom.TagName.INPUT = new goog.dom.TagName("INPUT");
    goog.dom.TagName.INS = new goog.dom.TagName("INS");
    goog.dom.TagName.ISINDEX = new goog.dom.TagName("ISINDEX");
    goog.dom.TagName.KBD = new goog.dom.TagName("KBD");
    goog.dom.TagName.KEYGEN = new goog.dom.TagName("KEYGEN");
    goog.dom.TagName.LABEL = new goog.dom.TagName("LABEL");
    goog.dom.TagName.LEGEND = new goog.dom.TagName("LEGEND");
    goog.dom.TagName.LI = new goog.dom.TagName("LI");
    goog.dom.TagName.LINK = new goog.dom.TagName("LINK");
    goog.dom.TagName.MAP = new goog.dom.TagName("MAP");
    goog.dom.TagName.MARK = new goog.dom.TagName("MARK");
    goog.dom.TagName.MATH = new goog.dom.TagName("MATH");
    goog.dom.TagName.MENU = new goog.dom.TagName("MENU");
    goog.dom.TagName.META = new goog.dom.TagName("META");
    goog.dom.TagName.METER = new goog.dom.TagName("METER");
    goog.dom.TagName.NAV = new goog.dom.TagName("NAV");
    goog.dom.TagName.NOFRAMES = new goog.dom.TagName("NOFRAMES");
    goog.dom.TagName.NOSCRIPT = new goog.dom.TagName("NOSCRIPT");
    goog.dom.TagName.OBJECT = new goog.dom.TagName("OBJECT");
    goog.dom.TagName.OL = new goog.dom.TagName("OL");
    goog.dom.TagName.OPTGROUP = new goog.dom.TagName("OPTGROUP");
    goog.dom.TagName.OPTION = new goog.dom.TagName("OPTION");
    goog.dom.TagName.OUTPUT = new goog.dom.TagName("OUTPUT");
    goog.dom.TagName.P = new goog.dom.TagName("P");
    goog.dom.TagName.PARAM = new goog.dom.TagName("PARAM");
    goog.dom.TagName.PRE = new goog.dom.TagName("PRE");
    goog.dom.TagName.PROGRESS = new goog.dom.TagName("PROGRESS");
    goog.dom.TagName.Q = new goog.dom.TagName("Q");
    goog.dom.TagName.RP = new goog.dom.TagName("RP");
    goog.dom.TagName.RT = new goog.dom.TagName("RT");
    goog.dom.TagName.RUBY = new goog.dom.TagName("RUBY");
    goog.dom.TagName.S = new goog.dom.TagName("S");
    goog.dom.TagName.SAMP = new goog.dom.TagName("SAMP");
    goog.dom.TagName.SCRIPT = new goog.dom.TagName("SCRIPT");
    goog.dom.TagName.SECTION = new goog.dom.TagName("SECTION");
    goog.dom.TagName.SELECT = new goog.dom.TagName("SELECT");
    goog.dom.TagName.SMALL = new goog.dom.TagName("SMALL");
    goog.dom.TagName.SOURCE = new goog.dom.TagName("SOURCE");
    goog.dom.TagName.SPAN = new goog.dom.TagName("SPAN");
    goog.dom.TagName.STRIKE = new goog.dom.TagName("STRIKE");
    goog.dom.TagName.STRONG = new goog.dom.TagName("STRONG");
    goog.dom.TagName.STYLE = new goog.dom.TagName("STYLE");
    goog.dom.TagName.SUB = new goog.dom.TagName("SUB");
    goog.dom.TagName.SUMMARY = new goog.dom.TagName("SUMMARY");
    goog.dom.TagName.SUP = new goog.dom.TagName("SUP");
    goog.dom.TagName.SVG = new goog.dom.TagName("SVG");
    goog.dom.TagName.TABLE = new goog.dom.TagName("TABLE");
    goog.dom.TagName.TBODY = new goog.dom.TagName("TBODY");
    goog.dom.TagName.TD = new goog.dom.TagName("TD");
    goog.dom.TagName.TEMPLATE = new goog.dom.TagName("TEMPLATE");
    goog.dom.TagName.TEXTAREA = new goog.dom.TagName("TEXTAREA");
    goog.dom.TagName.TFOOT = new goog.dom.TagName("TFOOT");
    goog.dom.TagName.TH = new goog.dom.TagName("TH");
    goog.dom.TagName.THEAD = new goog.dom.TagName("THEAD");
    goog.dom.TagName.TIME = new goog.dom.TagName("TIME");
    goog.dom.TagName.TITLE = new goog.dom.TagName("TITLE");
    goog.dom.TagName.TR = new goog.dom.TagName("TR");
    goog.dom.TagName.TRACK = new goog.dom.TagName("TRACK");
    goog.dom.TagName.TT = new goog.dom.TagName("TT");
    goog.dom.TagName.U = new goog.dom.TagName("U");
    goog.dom.TagName.UL = new goog.dom.TagName("UL");
    goog.dom.TagName.VAR = new goog.dom.TagName("VAR");
    goog.dom.TagName.VIDEO = new goog.dom.TagName("VIDEO");
    goog.dom.TagName.WBR = new goog.dom.TagName("WBR");
    goog.dom.NodeType = {
        ELEMENT: 1,
        ATTRIBUTE: 2,
        TEXT: 3,
        CDATA_SECTION: 4,
        ENTITY_REFERENCE: 5,
        ENTITY: 6,
        PROCESSING_INSTRUCTION: 7,
        COMMENT: 8,
        DOCUMENT: 9,
        DOCUMENT_TYPE: 10,
        DOCUMENT_FRAGMENT: 11,
        NOTATION: 12
    };
    goog.dom.InputType = {
        BUTTON: "button",
        CHECKBOX: "checkbox",
        COLOR: "color",
        DATE: "date",
        DATETIME: "datetime",
        DATETIME_LOCAL: "datetime-local",
        EMAIL: "email",
        FILE: "file",
        HIDDEN: "hidden",
        IMAGE: "image",
        MENU: "menu",
        MONTH: "month",
        NUMBER: "number",
        PASSWORD: "password",
        RADIO: "radio",
        RANGE: "range",
        RESET: "reset",
        SEARCH: "search",
        SELECT_MULTIPLE: "select-multiple",
        SELECT_ONE: "select-one",
        SUBMIT: "submit",
        TEL: "tel",
        TEXT: "text",
        TEXTAREA: "textarea",
        TIME: "time",
        URL: "url",
        WEEK: "week"
    };
    goog.math = {};
    goog.math.Size = function(a, b) {
        this.width = a;
        this.height = b
    };
    goog.math.Size.equals = function(a, b) {
        return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1
    };
    goog.math.Size.prototype.clone = function() {
        return new goog.math.Size(this.width, this.height)
    };
    goog.DEBUG && (goog.math.Size.prototype.toString = function() {
        return "(" + this.width + " x " + this.height + ")"
    });
    goog.math.Size.prototype.getLongest = function() {
        return Math.max(this.width, this.height)
    };
    goog.math.Size.prototype.getShortest = function() {
        return Math.min(this.width, this.height)
    };
    goog.math.Size.prototype.area = function() {
        return this.width * this.height
    };
    goog.math.Size.prototype.perimeter = function() {
        return 2 * (this.width + this.height)
    };
    goog.math.Size.prototype.aspectRatio = function() {
        return this.width / this.height
    };
    goog.math.Size.prototype.isEmpty = function() {
        return !this.area()
    };
    goog.math.Size.prototype.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    goog.math.Size.prototype.fitsInside = function(a) {
        return this.width <= a.width && this.height <= a.height
    };
    goog.math.Size.prototype.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    goog.math.Size.prototype.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    goog.math.Size.prototype.scale = function(a, b) {
        var c = goog.isNumber(b) ? b : a;
        this.width *= a;
        this.height *= c;
        return this
    };
    goog.math.Size.prototype.scaleToCover = function(a) {
        a = this.aspectRatio() <= a.aspectRatio() ? a.width / this.width : a.height / this.height;
        return this.scale(a)
    };
    goog.math.Size.prototype.scaleToFit = function(a) {
        a = this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height;
        return this.scale(a)
    };
    goog.math.IRect = function() {};
    goog.object = {};
    goog.object.is = function(a, b) {
        return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b
    };
    goog.object.forEach = function(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a)
    };
    goog.object.filter = function(a, b, c) {
        var d = {},
            e;
        for (e in a) b.call(c, a[e], e, a) && (d[e] = a[e]);
        return d
    };
    goog.object.map = function(a, b, c) {
        var d = {},
            e;
        for (e in a) d[e] = b.call(c, a[e], e, a);
        return d
    };
    goog.object.some = function(a, b, c) {
        for (var d in a)
            if (b.call(c, a[d], d, a)) return !0;
        return !1
    };
    goog.object.every = function(a, b, c) {
        for (var d in a)
            if (!b.call(c, a[d], d, a)) return !1;
        return !0
    };
    goog.object.getCount = function(a) {
        var b = 0,
            c;
        for (c in a) b++;
        return b
    };
    goog.object.getAnyKey = function(a) {
        for (var b in a) return b
    };
    goog.object.getAnyValue = function(a) {
        for (var b in a) return a[b]
    };
    goog.object.contains = function(a, b) {
        return goog.object.containsValue(a, b)
    };
    goog.object.getValues = function(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = a[d];
        return b
    };
    goog.object.getKeys = function(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b
    };
    goog.object.getValueByKeys = function(a, b) {
        for (var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1; c < d.length && (a = a[d[c]], goog.isDef(a)); c++);
        return a
    };
    goog.object.containsKey = function(a, b) {
        return null !== a && b in a
    };
    goog.object.containsValue = function(a, b) {
        for (var c in a)
            if (a[c] == b) return !0;
        return !1
    };
    goog.object.findKey = function(a, b, c) {
        for (var d in a)
            if (b.call(c, a[d], d, a)) return d
    };
    goog.object.findValue = function(a, b, c) {
        return (b = goog.object.findKey(a, b, c)) && a[b]
    };
    goog.object.isEmpty = function(a) {
        for (var b in a) return !1;
        return !0
    };
    goog.object.clear = function(a) {
        for (var b in a) delete a[b]
    };
    goog.object.remove = function(a, b) {
        var c;
        (c = b in a) && delete a[b];
        return c
    };
    goog.object.add = function(a, b, c) {
        if (null !== a && b in a) throw Error('The object already contains the key "' + b + '"');
        goog.object.set(a, b, c)
    };
    goog.object.get = function(a, b, c) {
        return null !== a && b in a ? a[b] : c
    };
    goog.object.set = function(a, b, c) {
        a[b] = c
    };
    goog.object.setIfUndefined = function(a, b, c) {
        return b in a ? a[b] : a[b] = c
    };
    goog.object.setWithReturnValueIfNotSet = function(a, b, c) {
        if (b in a) return a[b];
        c = c();
        return a[b] = c
    };
    goog.object.equals = function(a, b) {
        for (var c in a)
            if (!(c in b) || a[c] !== b[c]) return !1;
        for (c in b)
            if (!(c in a)) return !1;
        return !0
    };
    goog.object.clone = function(a) {
        var b = {},
            c;
        for (c in a) b[c] = a[c];
        return b
    };
    goog.object.unsafeClone = function(a) {
        var b = goog.typeOf(a);
        if ("object" == b || "array" == b) {
            if (goog.isFunction(a.clone)) return a.clone();
            var b = "array" == b ? [] : {},
                c;
            for (c in a) b[c] = goog.object.unsafeClone(a[c]);
            return b
        }
        return a
    };
    goog.object.transpose = function(a) {
        var b = {},
            c;
        for (c in a) b[a[c]] = c;
        return b
    };
    goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    goog.object.extend = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < goog.object.PROTOTYPE_FIELDS_.length; f++) c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    goog.object.create = function(a) {
        var b = arguments.length;
        if (1 == b && goog.isArray(arguments[0])) return goog.object.create.apply(null, arguments[0]);
        if (b % 2) throw Error("Uneven number of arguments");
        for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
        return c
    };
    goog.object.createSet = function(a) {
        var b = arguments.length;
        if (1 == b && goog.isArray(arguments[0])) return goog.object.createSet.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++) c[arguments[d]] = !0;
        return c
    };
    goog.object.createImmutableView = function(a) {
        var b = a;
        Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
        return b
    };
    goog.object.isImmutableView = function(a) {
        return !!Object.isFrozen && Object.isFrozen(a)
    };
    goog.object.getAllPropertyNames = function(a, b) {
        if (!a) return [];
        if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) return goog.object.getKeys(a);
        for (var c = {}, d = a; d && (d !== Object.prototype || b);) {
            for (var e = Object.getOwnPropertyNames(d), f = 0; f < e.length; f++) c[e[f]] = !0;
            d = Object.getPrototypeOf(d)
        }
        return goog.object.getKeys(c)
    };
    goog.dom.tags = {};
    goog.dom.tags.VOID_TAGS_ = goog.object.createSet("area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr");
    goog.dom.tags.isVoidTag = function(a) {
        return !0 === goog.dom.tags.VOID_TAGS_[a]
    };
    goog.labs = {};
    goog.labs.userAgent = {};
    goog.labs.userAgent.util = {};
    goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
        var a = goog.labs.userAgent.util.getNavigator_();
        return a && (a = a.userAgent) ? a : ""
    };
    goog.labs.userAgent.util.getNavigator_ = function() {
        return goog.global.navigator
    };
    goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
    goog.labs.userAgent.util.setUserAgent = function(a) {
        goog.labs.userAgent.util.userAgent_ = a || goog.labs.userAgent.util.getNativeUserAgentString_()
    };
    goog.labs.userAgent.util.getUserAgent = function() {
        return goog.labs.userAgent.util.userAgent_
    };
    goog.labs.userAgent.util.matchUserAgent = function(a) {
        var b = goog.labs.userAgent.util.getUserAgent();
        return goog.string.contains(b, a)
    };
    goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(a) {
        var b = goog.labs.userAgent.util.getUserAgent();
        return goog.string.caseInsensitiveContains(b, a)
    };
    goog.labs.userAgent.util.extractVersionTuples = function(a) {
        for (var b = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, c = [], d; d = b.exec(a);) c.push([d[1], d[2], d[3] || void 0]);
        return c
    };
    goog.labs.userAgent.device = {};
    goog.labs.userAgent.device.isMobile = function() {
        return !goog.labs.userAgent.device.isTablet() && (goog.labs.userAgent.util.matchUserAgent("iPod") || goog.labs.userAgent.util.matchUserAgent("iPhone") || goog.labs.userAgent.util.matchUserAgent("Android") || goog.labs.userAgent.util.matchUserAgent("IEMobile"))
    };
    goog.labs.userAgent.device.isTablet = function() {
        return goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("Android") && !goog.labs.userAgent.util.matchUserAgent("Mobile") || goog.labs.userAgent.util.matchUserAgent("Silk")
    };
    goog.labs.userAgent.device.isDesktop = function() {
        return !goog.labs.userAgent.device.isMobile() && !goog.labs.userAgent.device.isTablet()
    };
    goog.labs.userAgent.platform = {};
    goog.labs.userAgent.platform.isAndroid = function() {
        return goog.labs.userAgent.util.matchUserAgent("Android")
    };
    goog.labs.userAgent.platform.isIpod = function() {
        return goog.labs.userAgent.util.matchUserAgent("iPod")
    };
    goog.labs.userAgent.platform.isIphone = function() {
        return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad")
    };
    goog.labs.userAgent.platform.isIpad = function() {
        return goog.labs.userAgent.util.matchUserAgent("iPad")
    };
    goog.labs.userAgent.platform.isIos = function() {
        return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod()
    };
    goog.labs.userAgent.platform.isMacintosh = function() {
        return goog.labs.userAgent.util.matchUserAgent("Macintosh")
    };
    goog.labs.userAgent.platform.isLinux = function() {
        return goog.labs.userAgent.util.matchUserAgent("Linux")
    };
    goog.labs.userAgent.platform.isWindows = function() {
        return goog.labs.userAgent.util.matchUserAgent("Windows")
    };
    goog.labs.userAgent.platform.isChromeOS = function() {
        return goog.labs.userAgent.util.matchUserAgent("CrOS")
    };
    goog.labs.userAgent.platform.getVersion = function() {
        var a = goog.labs.userAgent.util.getUserAgent(),
            b = "";
        goog.labs.userAgent.platform.isWindows() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (b = /Android\s+([^\);]+)(\)|;)/,
            b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isChromeOS() && (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b = (a = b.exec(a)) && a[1]);
        return b || ""
    };
    goog.labs.userAgent.platform.isVersionOrHigher = function(a) {
        return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a)
    };
    goog.net = {};
    goog.net.EventType = {
        COMPLETE: "complete",
        SUCCESS: "success",
        ERROR: "error",
        ABORT: "abort",
        READY: "ready",
        READY_STATE_CHANGE: "readystatechange",
        TIMEOUT: "timeout",
        INCREMENTAL_DATA: "incrementaldata",
        PROGRESS: "progress",
        DOWNLOAD_PROGRESS: "downloadprogress",
        UPLOAD_PROGRESS: "uploadprogress"
    };
    goog.functions = {};
    goog.functions.constant = function(a) {
        return function() {
            return a
        }
    };
    goog.functions.FALSE = goog.functions.constant(!1);
    goog.functions.TRUE = goog.functions.constant(!0);
    goog.functions.NULL = goog.functions.constant(null);
    goog.functions.identity = function(a, b) {
        return a
    };
    goog.functions.error = function(a) {
        return function() {
            throw Error(a);
        }
    };
    goog.functions.fail = function(a) {
        return function() {
            throw a;
        }
    };
    goog.functions.lock = function(a, b) {
        b = b || 0;
        return function() {
            return a.apply(this, Array.prototype.slice.call(arguments, 0, b))
        }
    };
    goog.functions.nth = function(a) {
        return function() {
            return arguments[a]
        }
    };
    goog.functions.partialRight = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = Array.prototype.slice.call(arguments);
            b.push.apply(b, c);
            return a.apply(this, b)
        }
    };
    goog.functions.withReturnValue = function(a, b) {
        return goog.functions.sequence(a, goog.functions.constant(b))
    };
    goog.functions.equalTo = function(a, b) {
        return function(c) {
            return b ? a == c : a === c
        }
    };
    goog.functions.compose = function(a, b) {
        var c = arguments,
            d = c.length;
        return function() {
            var a;
            d && (a = c[d - 1].apply(this, arguments));
            for (var b = d - 2; 0 <= b; b--) a = c[b].call(this, a);
            return a
        }
    };
    goog.functions.sequence = function(a) {
        var b = arguments,
            c = b.length;
        return function() {
            for (var a, e = 0; e < c; e++) a = b[e].apply(this, arguments);
            return a
        }
    };
    goog.functions.and = function(a) {
        var b = arguments,
            c = b.length;
        return function() {
            for (var a = 0; a < c; a++)
                if (!b[a].apply(this, arguments)) return !1;
            return !0
        }
    };
    goog.functions.or = function(a) {
        var b = arguments,
            c = b.length;
        return function() {
            for (var a = 0; a < c; a++)
                if (b[a].apply(this, arguments)) return !0;
            return !1
        }
    };
    goog.functions.not = function(a) {
        return function() {
            return !a.apply(this, arguments)
        }
    };
    goog.functions.create = function(a, b) {
        var c = function() {};
        c.prototype = a.prototype;
        c = new c;
        a.apply(c, Array.prototype.slice.call(arguments, 1));
        return c
    };
    goog.functions.CACHE_RETURN_VALUE = !0;
    goog.functions.cacheReturnValue = function(a) {
        var b = !1,
            c;
        return function() {
            if (!goog.functions.CACHE_RETURN_VALUE) return a();
            b || (c = a(), b = !0);
            return c
        }
    };
    goog.functions.once = function(a) {
        var b = a;
        return function() {
            if (b) {
                var a = b;
                b = null;
                a()
            }
        }
    };
    goog.functions.debounce = function(a, b, c) {
        var d = 0;
        return function(e) {
            goog.global.clearTimeout(d);
            var f = arguments;
            d = goog.global.setTimeout(function() {
                a.apply(c, f)
            }, b)
        }
    };
    goog.functions.throttle = function(a, b, c) {
        var d = 0,
            e = !1,
            f = [],
            g = function() {
                d = 0;
                e && (e = !1, h())
            },
            h = function() {
                d = goog.global.setTimeout(g, b);
                a.apply(c, f)
            };
        return function(a) {
            f = arguments;
            d ? e = !0 : h()
        }
    };
    goog.functions.rateLimit = function(a, b, c) {
        var d = 0,
            e = function() {
                d = 0
            };
        return function(f) {
            d || (d = goog.global.setTimeout(e, b), a.apply(c, arguments))
        }
    };
    goog.debug = {};
    goog.debug.Error = function(a) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error);
        else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a));
        this.reportErrorToServer = !0
    };
    goog.inherits(goog.debug.Error, Error);
    goog.debug.Error.prototype.name = "CustomError";
    goog.reflect = {};
    goog.reflect.object = function(a, b) {
        return b
    };
    goog.reflect.objectProperty = function(a, b) {
        return a
    };
    goog.reflect.sinkValue = function(a) {
        goog.reflect.sinkValue[" "](a);
        return a
    };
    goog.reflect.sinkValue[" "] = goog.nullFunction;
    goog.reflect.canAccessProperty = function(a, b) {
        try {
            return goog.reflect.sinkValue(a[b]), !0
        } catch (c) {}
        return !1
    };
    goog.reflect.cache = function(a, b, c, d) {
        d = d ? d(b) : b;
        return Object.prototype.hasOwnProperty.call(a, d) ? a[d] : a[d] = c(b)
    };
    goog.i18n = {};
    goog.i18n.bidi = {};
    goog.i18n.bidi.FORCE_RTL = !1;
    goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 2).toLowerCase()) && (2 == goog.LOCALE.length ||
        "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4));
    goog.i18n.bidi.Format = {
        LRE: "\u202a",
        RLE: "\u202b",
        PDF: "\u202c",
        LRM: "\u200e",
        RLM: "\u200f"
    };
    goog.i18n.bidi.Dir = {
        LTR: 1,
        RTL: -1,
        NEUTRAL: 0
    };
    goog.i18n.bidi.RIGHT = "right";
    goog.i18n.bidi.LEFT = "left";
    goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
    goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
    goog.i18n.bidi.toDir = function(a, b) {
        return "number" == typeof a ? 0 < a ? goog.i18n.bidi.Dir.LTR : 0 > a ? goog.i18n.bidi.Dir.RTL : b ? null : goog.i18n.bidi.Dir.NEUTRAL : null == a ? null : a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
    };
    goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
    goog.i18n.bidi.rtlChars_ = "\u0591-\u06ef\u06fa-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc";
    goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
    goog.i18n.bidi.stripHtmlIfNeeded_ = function(a, b) {
        return b ? a.replace(goog.i18n.bidi.htmlSkipReg_, "") : a
    };
    goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
    goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
    goog.i18n.bidi.hasAnyRtl = function(a, b) {
        return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
    };
    goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
    goog.i18n.bidi.hasAnyLtr = function(a, b) {
        return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
    };
    goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
    goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
    goog.i18n.bidi.isRtlChar = function(a) {
        return goog.i18n.bidi.rtlRe_.test(a)
    };
    goog.i18n.bidi.isLtrChar = function(a) {
        return goog.i18n.bidi.ltrRe_.test(a)
    };
    goog.i18n.bidi.isNeutralChar = function(a) {
        return !goog.i18n.bidi.isLtrChar(a) && !goog.i18n.bidi.isRtlChar(a)
    };
    goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
    goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
    goog.i18n.bidi.startsWithRtl = function(a, b) {
        return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
    };
    goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
    goog.i18n.bidi.startsWithLtr = function(a, b) {
        return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
    };
    goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
    goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
    goog.i18n.bidi.isNeutralText = function(a, b) {
        a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b);
        return goog.i18n.bidi.isRequiredLtrRe_.test(a) || !goog.i18n.bidi.hasAnyLtr(a) && !goog.i18n.bidi.hasAnyRtl(a)
    };
    goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
    goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
    goog.i18n.bidi.endsWithLtr = function(a, b) {
        return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
    };
    goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
    goog.i18n.bidi.endsWithRtl = function(a, b) {
        return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b))
    };
    goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
    goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
    goog.i18n.bidi.isRtlLanguage = function(a) {
        return goog.i18n.bidi.rtlLocalesRe_.test(a)
    };
    goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
    goog.i18n.bidi.guardBracketInText = function(a, b) {
        var c = (void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
        return a.replace(goog.i18n.bidi.bracketGuardTextRe_, c + "$&" + c)
    };
    goog.i18n.bidi.enforceRtlInHtml = function(a) {
        return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a + "</span>"
    };
    goog.i18n.bidi.enforceRtlInText = function(a) {
        return goog.i18n.bidi.Format.RLE + a + goog.i18n.bidi.Format.PDF
    };
    goog.i18n.bidi.enforceLtrInHtml = function(a) {
        return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a + "</span>"
    };
    goog.i18n.bidi.enforceLtrInText = function(a) {
        return goog.i18n.bidi.Format.LRE + a + goog.i18n.bidi.Format.PDF
    };
    goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
    goog.i18n.bidi.leftRe_ = /left/gi;
    goog.i18n.bidi.rightRe_ = /right/gi;
    goog.i18n.bidi.tempRe_ = /%%%%/g;
    goog.i18n.bidi.mirrorCSS = function(a) {
        return a.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT)
    };
    goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
    goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
    goog.i18n.bidi.normalizeHebrewQuote = function(a) {
        return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3")
    };
    goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
    goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;
    goog.i18n.bidi.rtlDetectionThreshold_ = .4;
    goog.i18n.bidi.estimateDirection = function(a, b) {
        for (var c = 0, d = 0, e = !1, f = goog.i18n.bidi.stripHtmlIfNeeded_(a, b).split(goog.i18n.bidi.wordSeparatorRe_), g = 0; g < f.length; g++) {
            var h = f[g];
            goog.i18n.bidi.startsWithRtl(h) ? (c++, d++) : goog.i18n.bidi.isRequiredLtrRe_.test(h) ? e = !0 : goog.i18n.bidi.hasAnyLtr(h) ? d++ : goog.i18n.bidi.hasNumeralsRe_.test(h) && (e = !0)
        }
        return 0 == d ? e ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : c / d > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR
    };
    goog.i18n.bidi.detectRtlDirectionality = function(a, b) {
        return goog.i18n.bidi.estimateDirection(a, b) == goog.i18n.bidi.Dir.RTL
    };
    goog.i18n.bidi.setElementDirAndAlign = function(a, b) {
        a && (b = goog.i18n.bidi.toDir(b)) && (a.style.textAlign = b == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, a.dir = b == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr")
    };
    goog.i18n.bidi.setElementDirByTextDirectionality = function(a, b) {
        switch (goog.i18n.bidi.estimateDirection(b)) {
            case goog.i18n.bidi.Dir.LTR:
                a.dir = "ltr";
                break;
            case goog.i18n.bidi.Dir.RTL:
                a.dir = "rtl";
                break;
            default:
                a.removeAttribute("dir")
        }
    };
    goog.i18n.bidi.DirectionalString = function() {};
    goog.asserts = {};
    goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
    goog.asserts.AssertionError = function(a, b) {
        b.unshift(a);
        goog.debug.Error.call(this, goog.string.subs.apply(null, b));
        b.shift();
        this.messagePattern = a
    };
    goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
    goog.asserts.AssertionError.prototype.name = "AssertionError";
    goog.asserts.DEFAULT_ERROR_HANDLER = function(a) {
        throw a;
    };
    goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
    goog.asserts.doAssertFailure_ = function(a, b, c, d) {
        var e = "Assertion failed";
        if (c) var e = e + (": " + c),
            f = d;
        else a && (e += ": " + a, f = b);
        a = new goog.asserts.AssertionError("" + e, f || []);
        goog.asserts.errorHandler_(a)
    };
    goog.asserts.setErrorHandler = function(a) {
        goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a)
    };
    goog.asserts.assert = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.fail = function(a, b) {
        goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
    };
    goog.asserts.assertNumber = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.assertString = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.assertFunction = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.assertObject = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.assertArray = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.assertBoolean = function(a, b, c) {
        goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.assertElement = function(a, b, c) {
        !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    };
    goog.asserts.assertInstanceof = function(a, b, c, d) {
        !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
        return a
    };
    goog.asserts.assertObjectPrototypeIsIntact = function() {
        for (var a in Object.prototype) goog.asserts.fail(a + " should not be enumerable in Object.prototype.")
    };
    goog.asserts.getType_ = function(a) {
        return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
    };
    goog.string.Const = function() {
        this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "";
        this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_
    };
    goog.string.Const.prototype.implementsGoogStringTypedString = !0;
    goog.string.Const.prototype.getTypedStringValue = function() {
        return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_
    };
    goog.string.Const.prototype.toString = function() {
        return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}"
    };
    goog.string.Const.unwrap = function(a) {
        if (a instanceof goog.string.Const && a.constructor === goog.string.Const && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
        goog.asserts.fail("expected object of type Const, got '" + a + "'");
        return "type_error:Const"
    };
    goog.string.Const.from = function(a) {
        return goog.string.Const.create__googStringSecurityPrivate_(a)
    };
    goog.string.Const.TYPE_MARKER_ = {};
    goog.string.Const.create__googStringSecurityPrivate_ = function(a) {
        var b = new goog.string.Const;
        b.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a;
        return b
    };
    goog.string.Const.EMPTY = goog.string.Const.from("");
    goog.html = {};
    goog.html.TrustedResourceUrl = function() {
        this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "";
        this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
    };
    goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
    goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_
    };
    goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
    goog.html.TrustedResourceUrl.prototype.getDirection = function() {
        return goog.i18n.bidi.Dir.LTR
    };
    goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function() {
        return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}"
    });
    goog.html.TrustedResourceUrl.unwrap = function(a) {
        if (a instanceof goog.html.TrustedResourceUrl && a.constructor === goog.html.TrustedResourceUrl && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
        goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + a + "' of type " + goog.typeOf(a));
        return "type_error:TrustedResourceUrl"
    };
    goog.html.TrustedResourceUrl.format = function(a, b) {
        var c = goog.string.Const.unwrap(a);
        if (!goog.html.TrustedResourceUrl.BASE_URL_.test(c)) throw Error("Invalid TrustedResourceUrl format: " + c);
        var d = c.replace(goog.html.TrustedResourceUrl.FORMAT_MARKER_, function(a, d) {
            if (!Object.prototype.hasOwnProperty.call(b, d)) throw Error('Found marker, "' + d + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
            var g = b[d];
            return g instanceof goog.string.Const ? goog.string.Const.unwrap(g) :
                encodeURIComponent(String(g))
        });
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(d)
    };
    goog.html.TrustedResourceUrl.FORMAT_MARKER_ = /%{(\w+)}/g;
    goog.html.TrustedResourceUrl.BASE_URL_ = /^(?:https:)?\/\/[0-9a-z.:[\]-]+\/|^\/[^\/\\]/i;
    goog.html.TrustedResourceUrl.fromConstant = function(a) {
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
    };
    goog.html.TrustedResourceUrl.fromConstants = function(a) {
        for (var b = "", c = 0; c < a.length; c++) b += goog.string.Const.unwrap(a[c]);
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)
    };
    goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(a) {
        var b = new goog.html.TrustedResourceUrl;
        b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a;
        return b
    };
    goog.html.SafeScript = function() {
        this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
        this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
    };
    goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0;
    goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    goog.html.SafeScript.fromConstant = function(a) {
        a = goog.string.Const.unwrap(a);
        return 0 === a.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a)
    };
    goog.html.SafeScript.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeScriptWrappedValue_
    };
    goog.DEBUG && (goog.html.SafeScript.prototype.toString = function() {
        return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}"
    });
    goog.html.SafeScript.unwrap = function(a) {
        if (a instanceof goog.html.SafeScript && a.constructor === goog.html.SafeScript && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;
        goog.asserts.fail("expected object of type SafeScript, got '" + a + "' of type " + goog.typeOf(a));
        return "type_error:SafeScript"
    };
    goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function(a) {
        return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(a)
    };
    goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
        this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = a;
        return this
    };
    goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
    goog.debug.entryPointRegistry = {};
    goog.debug.EntryPointMonitor = function() {};
    goog.debug.entryPointRegistry.refList_ = [];
    goog.debug.entryPointRegistry.monitors_ = [];
    goog.debug.entryPointRegistry.monitorsMayExist_ = !1;
    goog.debug.entryPointRegistry.register = function(a) {
        goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = a;
        if (goog.debug.entryPointRegistry.monitorsMayExist_)
            for (var b = goog.debug.entryPointRegistry.monitors_, c = 0; c < b.length; c++) a(goog.bind(b[c].wrap, b[c]))
    };
    goog.debug.entryPointRegistry.monitorAll = function(a) {
        goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
        for (var b = goog.bind(a.wrap, a), c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) goog.debug.entryPointRegistry.refList_[c](b);
        goog.debug.entryPointRegistry.monitors_.push(a)
    };
    goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(a) {
        var b = goog.debug.entryPointRegistry.monitors_;
        goog.asserts.assert(a == b[b.length - 1], "Only the most recent monitor can be unwrapped.");
        a = goog.bind(a.unwrap, a);
        for (var c = 0; c < goog.debug.entryPointRegistry.refList_.length; c++) goog.debug.entryPointRegistry.refList_[c](a);
        b.length--
    };
    goog.fs = {};
    goog.fs.url = {};
    goog.fs.url.createObjectUrl = function(a) {
        return goog.fs.url.getUrlObject_().createObjectURL(a)
    };
    goog.fs.url.revokeObjectUrl = function(a) {
        goog.fs.url.getUrlObject_().revokeObjectURL(a)
    };
    goog.fs.url.getUrlObject_ = function() {
        var a = goog.fs.url.findUrlObject_();
        if (null != a) return a;
        throw Error("This browser doesn't seem to support blob URLs");
    };
    goog.fs.url.findUrlObject_ = function() {
        return goog.isDef(goog.global.URL) && goog.isDef(goog.global.URL.createObjectURL) ? goog.global.URL : goog.isDef(goog.global.webkitURL) && goog.isDef(goog.global.webkitURL.createObjectURL) ? goog.global.webkitURL : goog.isDef(goog.global.createObjectURL) ? goog.global : null
    };
    goog.fs.url.browserSupportsObjectUrls = function() {
        return null != goog.fs.url.findUrlObject_()
    };
    goog.html.SafeUrl = function() {
        this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
        this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
    };
    goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
    goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0;
    goog.html.SafeUrl.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
    };
    goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
    goog.html.SafeUrl.prototype.getDirection = function() {
        return goog.i18n.bidi.Dir.LTR
    };
    goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function() {
        return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
    });
    goog.html.SafeUrl.unwrap = function(a) {
        if (a instanceof goog.html.SafeUrl && a.constructor === goog.html.SafeUrl && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
        goog.asserts.fail("expected object of type SafeUrl, got '" + a + "' of type " + goog.typeOf(a));
        return "type_error:SafeUrl"
    };
    goog.html.SafeUrl.fromConstant = function(a) {
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))
    };
    goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm))$/i;
    goog.html.SafeUrl.fromBlob = function(a) {
        a = goog.html.SAFE_MIME_TYPE_PATTERN_.test(a.type) ? goog.fs.url.createObjectUrl(a) : goog.html.SafeUrl.INNOCUOUS_STRING;
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    };
    goog.html.DATA_URL_PATTERN_ = /^data:([^;,]*);base64,[a-z0-9+\/]+=*$/i;
    goog.html.SafeUrl.fromDataUrl = function(a) {
        var b = a.match(goog.html.DATA_URL_PATTERN_),
            b = b && goog.html.SAFE_MIME_TYPE_PATTERN_.test(b[1]);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b ? a : goog.html.SafeUrl.INNOCUOUS_STRING)
    };
    goog.html.SafeUrl.fromTelUrl = function(a) {
        goog.string.caseInsensitiveStartsWith(a, "tel:") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    };
    goog.html.SafeUrl.fromTrustedResourceUrl = function(a) {
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.TrustedResourceUrl.unwrap(a))
    };
    goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i;
    goog.html.SafeUrl.sanitize = function(a) {
        if (a instanceof goog.html.SafeUrl) return a;
        a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
        goog.html.SAFE_URL_PATTERN_.test(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    };
    goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(a) {
        var b = new goog.html.SafeUrl;
        b.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
        return b
    };
    goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");
    goog.array = {};
    goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
    goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
    goog.array.peek = function(a) {
        return a[a.length - 1]
    };
    goog.array.last = goog.array.peek;
    goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.indexOf.call(a, b, c)
    } : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (goog.isString(a)) return goog.isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)
            if (c in a && a[c] === b) return c;
        return -1
    };
    goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
    } : function(a, b, c) {
        c = null == c ? a.length - 1 : c;
        0 > c && (c = Math.max(0, a.length + c));
        if (goog.isString(a)) return goog.isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
        for (; 0 <= c; c--)
            if (c in a && a[c] === b) return c;
        return -1
    };
    goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        Array.prototype.forEach.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
    };
    goog.array.forEachRight = function(a, b, c) {
        for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; --d) d in e && b.call(c, e[d], d, a)
    };
    goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.filter.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0; h < d; h++)
            if (h in g) {
                var k = g[h];
                b.call(c, k, h, a) && (e[f++] = k)
            }
        return e
    };
    goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.map.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
        return e
    };
    goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(a, b, c, d) {
        goog.asserts.assert(null != a.length);
        d && (b = goog.bind(b, d));
        return Array.prototype.reduce.call(a, b, c)
    } : function(a, b, c, d) {
        var e = c;
        goog.array.forEach(a, function(c, g) {
            e = b.call(d, e, c, g, a)
        });
        return e
    };
    goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(a, b, c, d) {
        goog.asserts.assert(null != a.length);
        goog.asserts.assert(null != b);
        d && (b = goog.bind(b, d));
        return Array.prototype.reduceRight.call(a, b, c)
    } : function(a, b, c, d) {
        var e = c;
        goog.array.forEachRight(a, function(c, g) {
            e = b.call(d, e, c, g, a)
        });
        return e
    };
    goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.some.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a)) return !0;
        return !1
    };
    goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.every.call(a, b, c)
    } : function(a, b, c) {
        for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && !b.call(c, e[f], f, a)) return !1;
        return !0
    };
    goog.array.count = function(a, b, c) {
        var d = 0;
        goog.array.forEach(a, function(a, f, g) {
            b.call(c, a, f, g) && ++d
        }, c);
        return d
    };
    goog.array.find = function(a, b, c) {
        b = goog.array.findIndex(a, b, c);
        return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
    };
    goog.array.findIndex = function(a, b, c) {
        for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a)) return f;
        return -1
    };
    goog.array.findRight = function(a, b, c) {
        b = goog.array.findIndexRight(a, b, c);
        return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
    };
    goog.array.findIndexRight = function(a, b, c) {
        for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; d--)
            if (d in e && b.call(c, e[d], d, a)) return d;
        return -1
    };
    goog.array.contains = function(a, b) {
        return 0 <= goog.array.indexOf(a, b)
    };
    goog.array.isEmpty = function(a) {
        return 0 == a.length
    };
    goog.array.clear = function(a) {
        if (!goog.isArray(a))
            for (var b = a.length - 1; 0 <= b; b--) delete a[b];
        a.length = 0
    };
    goog.array.insert = function(a, b) {
        goog.array.contains(a, b) || a.push(b)
    };
    goog.array.insertAt = function(a, b, c) {
        goog.array.splice(a, c, 0, b)
    };
    goog.array.insertArrayAt = function(a, b, c) {
        goog.partial(goog.array.splice, a, c, 0).apply(null, b)
    };
    goog.array.insertBefore = function(a, b, c) {
        var d;
        2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
    };
    goog.array.remove = function(a, b) {
        var c = goog.array.indexOf(a, b),
            d;
        (d = 0 <= c) && goog.array.removeAt(a, c);
        return d
    };
    goog.array.removeLast = function(a, b) {
        var c = goog.array.lastIndexOf(a, b);
        return 0 <= c ? (goog.array.removeAt(a, c), !0) : !1
    };
    goog.array.removeAt = function(a, b) {
        goog.asserts.assert(null != a.length);
        return 1 == Array.prototype.splice.call(a, b, 1).length
    };
    goog.array.removeIf = function(a, b, c) {
        b = goog.array.findIndex(a, b, c);
        return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
    };
    goog.array.removeAllIf = function(a, b, c) {
        var d = 0;
        goog.array.forEachRight(a, function(e, f) {
            b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++
        });
        return d
    };
    goog.array.concat = function(a) {
        return Array.prototype.concat.apply([], arguments)
    };
    goog.array.join = function(a) {
        return Array.prototype.concat.apply([], arguments)
    };
    goog.array.toArray = function(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    };
    goog.array.clone = goog.array.toArray;
    goog.array.extend = function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (goog.isArrayLike(d)) {
                var e = a.length || 0,
                    f = d.length || 0;
                a.length = e + f;
                for (var g = 0; g < f; g++) a[e + g] = d[g]
            } else a.push(d)
        }
    };
    goog.array.splice = function(a, b, c, d) {
        goog.asserts.assert(null != a.length);
        return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1))
    };
    goog.array.slice = function(a, b, c) {
        goog.asserts.assert(null != a.length);
        return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
    };
    goog.array.removeDuplicates = function(a, b, c) {
        b = b || a;
        var d = function(a) {
            return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a
        };
        c = c || d;
        for (var d = {}, e = 0, f = 0; f < a.length;) {
            var g = a[f++],
                h = c(g);
            Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g)
        }
        b.length = e
    };
    goog.array.binarySearch = function(a, b, c) {
        return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
    };
    goog.array.binarySelect = function(a, b, c) {
        return goog.array.binarySearch_(a, b, !0, void 0, c)
    };
    goog.array.binarySearch_ = function(a, b, c, d, e) {
        for (var f = 0, g = a.length, h; f < g;) {
            var k = f + g >> 1,
                l;
            l = c ? b.call(e, a[k], k, a) : b(d, a[k]);
            0 < l ? f = k + 1 : (g = k, h = !l)
        }
        return h ? f : ~f
    };
    goog.array.sort = function(a, b) {
        a.sort(b || goog.array.defaultCompare)
    };
    goog.array.stableSort = function(a, b) {
        for (var c = Array(a.length), d = 0; d < a.length; d++) c[d] = {
            index: d,
            value: a[d]
        };
        var e = b || goog.array.defaultCompare;
        goog.array.sort(c, function(a, b) {
            return e(a.value, b.value) || a.index - b.index
        });
        for (d = 0; d < a.length; d++) a[d] = c[d].value
    };
    goog.array.sortByKey = function(a, b, c) {
        var d = c || goog.array.defaultCompare;
        goog.array.sort(a, function(a, c) {
            return d(b(a), b(c))
        })
    };
    goog.array.sortObjectsByKey = function(a, b, c) {
        goog.array.sortByKey(a, function(a) {
            return a[b]
        }, c)
    };
    goog.array.isSorted = function(a, b, c) {
        b = b || goog.array.defaultCompare;
        for (var d = 1; d < a.length; d++) {
            var e = b(a[d - 1], a[d]);
            if (0 < e || 0 == e && c) return !1
        }
        return !0
    };
    goog.array.equals = function(a, b, c) {
        if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) return !1;
        var d = a.length;
        c = c || goog.array.defaultCompareEquality;
        for (var e = 0; e < d; e++)
            if (!c(a[e], b[e])) return !1;
        return !0
    };
    goog.array.compare3 = function(a, b, c) {
        c = c || goog.array.defaultCompare;
        for (var d = Math.min(a.length, b.length), e = 0; e < d; e++) {
            var f = c(a[e], b[e]);
            if (0 != f) return f
        }
        return goog.array.defaultCompare(a.length, b.length)
    };
    goog.array.defaultCompare = function(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    };
    goog.array.inverseDefaultCompare = function(a, b) {
        return -goog.array.defaultCompare(a, b)
    };
    goog.array.defaultCompareEquality = function(a, b) {
        return a === b
    };
    goog.array.binaryInsert = function(a, b, c) {
        c = goog.array.binarySearch(a, b, c);
        return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
    };
    goog.array.binaryRemove = function(a, b, c) {
        b = goog.array.binarySearch(a, b, c);
        return 0 <= b ? goog.array.removeAt(a, b) : !1
    };
    goog.array.bucket = function(a, b, c) {
        for (var d = {}, e = 0; e < a.length; e++) {
            var f = a[e],
                g = b.call(c, f, e, a);
            goog.isDef(g) && (d[g] || (d[g] = [])).push(f)
        }
        return d
    };
    goog.array.toObject = function(a, b, c) {
        var d = {};
        goog.array.forEach(a, function(e, f) {
            d[b.call(c, e, f, a)] = e
        });
        return d
    };
    goog.array.range = function(a, b, c) {
        var d = [],
            e = 0,
            f = a;
        c = c || 1;
        void 0 !== b && (e = a, f = b);
        if (0 > c * (f - e)) return [];
        if (0 < c)
            for (a = e; a < f; a += c) d.push(a);
        else
            for (a = e; a > f; a += c) d.push(a);
        return d
    };
    goog.array.repeat = function(a, b) {
        for (var c = [], d = 0; d < b; d++) c[d] = a;
        return c
    };
    goog.array.flatten = function(a) {
        for (var b = [], c = 0; c < arguments.length; c++) {
            var d = arguments[c];
            if (goog.isArray(d))
                for (var e = 0; e < d.length; e += 8192)
                    for (var f = goog.array.slice(d, e, e + 8192), f = goog.array.flatten.apply(null, f), g = 0; g < f.length; g++) b.push(f[g]);
            else b.push(d)
        }
        return b
    };
    goog.array.rotate = function(a, b) {
        goog.asserts.assert(null != a.length);
        a.length && (b %= a.length, 0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
        return a
    };
    goog.array.moveItem = function(a, b, c) {
        goog.asserts.assert(0 <= b && b < a.length);
        goog.asserts.assert(0 <= c && c < a.length);
        b = Array.prototype.splice.call(a, b, 1);
        Array.prototype.splice.call(a, c, 0, b[0])
    };
    goog.array.zip = function(a) {
        if (!arguments.length) return [];
        for (var b = [], c = arguments[0].length, d = 1; d < arguments.length; d++) arguments[d].length < c && (c = arguments[d].length);
        for (d = 0; d < c; d++) {
            for (var e = [], f = 0; f < arguments.length; f++) e.push(arguments[f][d]);
            b.push(e)
        }
        return b
    };
    goog.array.shuffle = function(a, b) {
        for (var c = b || Math.random, d = a.length - 1; 0 < d; d--) {
            var e = Math.floor(c() * (d + 1)),
                f = a[d];
            a[d] = a[e];
            a[e] = f
        }
    };
    goog.array.copyByIndex = function(a, b) {
        var c = [];
        goog.array.forEach(b, function(b) {
            c.push(a[b])
        });
        return c
    };
    goog.array.concatMap = function(a, b, c) {
        return goog.array.concat.apply([], goog.array.map(a, b, c))
    };
    goog.structs = {};
    goog.structs.getCount = function(a) {
        return a.getCount && "function" == typeof a.getCount ? a.getCount() : goog.isArrayLike(a) || goog.isString(a) ? a.length : goog.object.getCount(a)
    };
    goog.structs.getValues = function(a) {
        if (a.getValues && "function" == typeof a.getValues) return a.getValues();
        if (goog.isString(a)) return a.split("");
        if (goog.isArrayLike(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        return goog.object.getValues(a)
    };
    goog.structs.getKeys = function(a) {
        if (a.getKeys && "function" == typeof a.getKeys) return a.getKeys();
        if (!a.getValues || "function" != typeof a.getValues) {
            if (goog.isArrayLike(a) || goog.isString(a)) {
                var b = [];
                a = a.length;
                for (var c = 0; c < a; c++) b.push(c);
                return b
            }
            return goog.object.getKeys(a)
        }
    };
    goog.structs.contains = function(a, b) {
        return a.contains && "function" == typeof a.contains ? a.contains(b) : a.containsValue && "function" == typeof a.containsValue ? a.containsValue(b) : goog.isArrayLike(a) || goog.isString(a) ? goog.array.contains(a, b) : goog.object.containsValue(a, b)
    };
    goog.structs.isEmpty = function(a) {
        return a.isEmpty && "function" == typeof a.isEmpty ? a.isEmpty() : goog.isArrayLike(a) || goog.isString(a) ? goog.array.isEmpty(a) : goog.object.isEmpty(a)
    };
    goog.structs.clear = function(a) {
        a.clear && "function" == typeof a.clear ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a)
    };
    goog.structs.forEach = function(a, b, c) {
        if (a.forEach && "function" == typeof a.forEach) a.forEach(b, c);
        else if (goog.isArrayLike(a) || goog.isString(a)) goog.array.forEach(a, b, c);
        else
            for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++) b.call(c, e[g], d && d[g], a)
    };
    goog.structs.filter = function(a, b, c) {
        if ("function" == typeof a.filter) return a.filter(b, c);
        if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.filter(a, b, c);
        var d, e = goog.structs.getKeys(a),
            f = goog.structs.getValues(a),
            g = f.length;
        if (e) {
            d = {};
            for (var h = 0; h < g; h++) b.call(c, f[h], e[h], a) && (d[e[h]] = f[h])
        } else
            for (d = [], h = 0; h < g; h++) b.call(c, f[h], void 0, a) && d.push(f[h]);
        return d
    };
    goog.structs.map = function(a, b, c) {
        if ("function" == typeof a.map) return a.map(b, c);
        if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.map(a, b, c);
        var d, e = goog.structs.getKeys(a),
            f = goog.structs.getValues(a),
            g = f.length;
        if (e) {
            d = {};
            for (var h = 0; h < g; h++) d[e[h]] = b.call(c, f[h], e[h], a)
        } else
            for (d = [], h = 0; h < g; h++) d[h] = b.call(c, f[h], void 0, a);
        return d
    };
    goog.structs.some = function(a, b, c) {
        if ("function" == typeof a.some) return a.some(b, c);
        if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.some(a, b, c);
        for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++)
            if (b.call(c, e[g], d && d[g], a)) return !0;
        return !1
    };
    goog.structs.every = function(a, b, c) {
        if ("function" == typeof a.every) return a.every(b, c);
        if (goog.isArrayLike(a) || goog.isString(a)) return goog.array.every(a, b, c);
        for (var d = goog.structs.getKeys(a), e = goog.structs.getValues(a), f = e.length, g = 0; g < f; g++)
            if (!b.call(c, e[g], d && d[g], a)) return !1;
        return !0
    };
    goog.events.ListenerMap = function(a) {
        this.src = a;
        this.listeners = {};
        this.typeCount_ = 0
    };
    goog.events.ListenerMap.prototype.getTypeCount = function() {
        return this.typeCount_
    };
    goog.events.ListenerMap.prototype.getListenerCount = function() {
        var a = 0,
            b;
        for (b in this.listeners) a += this.listeners[b].length;
        return a
    };
    goog.events.ListenerMap.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.listeners[f];
        a || (a = this.listeners[f] = [], this.typeCount_++);
        var g = goog.events.ListenerMap.findListenerIndex_(a, b, d, e); - 1 < g ? (b = a[g], c || (b.callOnce = !1)) : (b = new goog.events.Listener(b, null, this.src, f, !!d, e), b.callOnce = c, a.push(b));
        return b
    };
    goog.events.ListenerMap.prototype.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.listeners)) return !1;
        var e = this.listeners[a];
        b = goog.events.ListenerMap.findListenerIndex_(e, b, c, d);
        return -1 < b ? (e[b].markAsRemoved(), goog.array.removeAt(e, b), 0 == e.length && (delete this.listeners[a], this.typeCount_--), !0) : !1
    };
    goog.events.ListenerMap.prototype.removeByKey = function(a) {
        var b = a.type;
        if (!(b in this.listeners)) return !1;
        var c = goog.array.remove(this.listeners[b], a);
        c && (a.markAsRemoved(), 0 == this.listeners[b].length && (delete this.listeners[b], this.typeCount_--));
        return c
    };
    goog.events.ListenerMap.prototype.removeAll = function(a) {
        a = a && a.toString();
        var b = 0,
            c;
        for (c in this.listeners)
            if (!a || c == a) {
                for (var d = this.listeners[c], e = 0; e < d.length; e++) ++b, d[e].markAsRemoved();
                delete this.listeners[c];
                this.typeCount_--
            }
        return b
    };
    goog.events.ListenerMap.prototype.getListeners = function(a, b) {
        var c = this.listeners[a.toString()],
            d = [];
        if (c)
            for (var e = 0; e < c.length; ++e) {
                var f = c[e];
                f.capture == b && d.push(f)
            }
        return d
    };
    goog.events.ListenerMap.prototype.getListener = function(a, b, c, d) {
        a = this.listeners[a.toString()];
        var e = -1;
        a && (e = goog.events.ListenerMap.findListenerIndex_(a, b, c, d));
        return -1 < e ? a[e] : null
    };
    goog.events.ListenerMap.prototype.hasListener = function(a, b) {
        var c = goog.isDef(a),
            d = c ? a.toString() : "",
            e = goog.isDef(b);
        return goog.object.some(this.listeners, function(a, g) {
            for (var h = 0; h < a.length; ++h)
                if (!(c && a[h].type != d || e && a[h].capture != b)) return !0;
            return !1
        })
    };
    goog.events.ListenerMap.findListenerIndex_ = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.removed && f.listener == b && f.capture == !!c && f.handler == d) return e
        }
        return -1
    };
    goog.html.SafeStyle = function() {
        this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
        this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
    };
    goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0;
    goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    goog.html.SafeStyle.fromConstant = function(a) {
        a = goog.string.Const.unwrap(a);
        if (0 === a.length) return goog.html.SafeStyle.EMPTY;
        goog.html.SafeStyle.checkStyle_(a);
        goog.asserts.assert(goog.string.endsWith(a, ";"), "Last character of style string is not ';': " + a);
        goog.asserts.assert(goog.string.contains(a, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + a);
        return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a)
    };
    goog.html.SafeStyle.checkStyle_ = function(a) {
        goog.asserts.assert(!/[<>]/.test(a), "Forbidden characters in style string: " + a)
    };
    goog.html.SafeStyle.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeStyleWrappedValue_
    };
    goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function() {
        return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}"
    });
    goog.html.SafeStyle.unwrap = function(a) {
        if (a instanceof goog.html.SafeStyle && a.constructor === goog.html.SafeStyle && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
        goog.asserts.fail("expected object of type SafeStyle, got '" + a + "' of type " + goog.typeOf(a));
        return "type_error:SafeStyle"
    };
    goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function(a) {
        return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(a)
    };
    goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
        this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
        return this
    };
    goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
    goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez";
    goog.html.SafeStyle.create = function(a) {
        var b = "",
            c;
        for (c in a) {
            if (!/^[-_a-zA-Z0-9]+$/.test(c)) throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
            var d = a[c];
            null != d && (d instanceof goog.string.Const ? (d = goog.string.Const.unwrap(d), goog.asserts.assert(!/[{;}]/.test(d), "Value does not allow [{;}].")) : goog.html.SafeStyle.VALUE_RE_.test(d) ? goog.html.SafeStyle.hasBalancedQuotes_(d) || (goog.asserts.fail("String value requires balanced quotes, got: " + d), d = goog.html.SafeStyle.INNOCUOUS_STRING) : (goog.asserts.fail("String value allows only [-,.\"'%_!# a-zA-Z0-9], rgb() and rgba(), got: " +
                d), d = goog.html.SafeStyle.INNOCUOUS_STRING), b += c + ":" + d + ";")
        }
        if (!b) return goog.html.SafeStyle.EMPTY;
        goog.html.SafeStyle.checkStyle_(b);
        return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)
    };
    goog.html.SafeStyle.hasBalancedQuotes_ = function(a) {
        for (var b = !0, c = !0, d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            "'" == e && c ? b = !b : '"' == e && b && (c = !c)
        }
        return b && c
    };
    goog.html.SafeStyle.VALUE_RE_ = /^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/;
    goog.html.SafeStyle.concat = function(a) {
        var b = "",
            c = function(a) {
                goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyle.unwrap(a)
            };
        goog.array.forEach(arguments, c);
        return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY
    };
    goog.html.SafeStyleSheet = function() {
        this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "";
        this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_
    };
    goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0;
    goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    goog.html.SafeStyleSheet.concat = function(a) {
        var b = "",
            c = function(a) {
                goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyleSheet.unwrap(a)
            };
        goog.array.forEach(arguments, c);
        return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
    };
    goog.html.SafeStyleSheet.fromConstant = function(a) {
        a = goog.string.Const.unwrap(a);
        if (0 === a.length) return goog.html.SafeStyleSheet.EMPTY;
        goog.asserts.assert(!goog.string.contains(a, "<"), "Forbidden '<' character in style sheet string: " + a);
        return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)
    };
    goog.html.SafeStyleSheet.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_
    };
    goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function() {
        return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}"
    });
    goog.html.SafeStyleSheet.unwrap = function(a) {
        if (a instanceof goog.html.SafeStyleSheet && a.constructor === goog.html.SafeStyleSheet && a.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
        goog.asserts.fail("expected object of type SafeStyleSheet, got '" + a + "' of type " + goog.typeOf(a));
        return "type_error:SafeStyleSheet"
    };
    goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function(a) {
        return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(a)
    };
    goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
        this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a;
        return this
    };
    goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
    goog.dom.classlist = {};
    goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST = !1;
    goog.dom.classlist.get = function(a) {
        if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList) return a.classList;
        a = a.className;
        return goog.isString(a) && a.match(/\S+/g) || []
    };
    goog.dom.classlist.set = function(a, b) {
        a.className = b
    };
    goog.dom.classlist.contains = function(a, b) {
        return goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.contains(b) : goog.array.contains(goog.dom.classlist.get(a), b)
    };
    goog.dom.classlist.add = function(a, b) {
        goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.add(b) : goog.dom.classlist.contains(a, b) || (a.className += 0 < a.className.length ? " " + b : b)
    };
    goog.dom.classlist.addAll = function(a, b) {
        if (goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList) goog.array.forEach(b, function(b) {
            goog.dom.classlist.add(a, b)
        });
        else {
            var c = {};
            goog.array.forEach(goog.dom.classlist.get(a), function(a) {
                c[a] = !0
            });
            goog.array.forEach(b, function(a) {
                c[a] = !0
            });
            a.className = "";
            for (var d in c) a.className += 0 < a.className.length ? " " + d : d
        }
    };
    goog.dom.classlist.remove = function(a, b) {
        goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? a.classList.remove(b) : goog.dom.classlist.contains(a, b) && (a.className = goog.array.filter(goog.dom.classlist.get(a), function(a) {
            return a != b
        }).join(" "))
    };
    goog.dom.classlist.removeAll = function(a, b) {
        goog.dom.classlist.ALWAYS_USE_DOM_TOKEN_LIST || a.classList ? goog.array.forEach(b, function(b) {
            goog.dom.classlist.remove(a, b)
        }) : a.className = goog.array.filter(goog.dom.classlist.get(a), function(a) {
            return !goog.array.contains(b, a)
        }).join(" ")
    };
    goog.dom.classlist.enable = function(a, b, c) {
        c ? goog.dom.classlist.add(a, b) : goog.dom.classlist.remove(a, b)
    };
    goog.dom.classlist.enableAll = function(a, b, c) {
        (c ? goog.dom.classlist.addAll : goog.dom.classlist.removeAll)(a, b)
    };
    goog.dom.classlist.swap = function(a, b, c) {
        return goog.dom.classlist.contains(a, b) ? (goog.dom.classlist.remove(a, b), goog.dom.classlist.add(a, c), !0) : !1
    };
    goog.dom.classlist.toggle = function(a, b) {
        var c = !goog.dom.classlist.contains(a, b);
        goog.dom.classlist.enable(a, b, c);
        return c
    };
    goog.dom.classlist.addRemove = function(a, b, c) {
        goog.dom.classlist.remove(a, b);
        goog.dom.classlist.add(a, c)
    };
    goog.math.randomInt = function(a) {
        return Math.floor(Math.random() * a)
    };
    goog.math.uniformRandom = function(a, b) {
        return a + Math.random() * (b - a)
    };
    goog.math.clamp = function(a, b, c) {
        return Math.min(Math.max(a, b), c)
    };
    goog.math.modulo = function(a, b) {
        var c = a % b;
        return 0 > c * b ? c + b : c
    };
    goog.math.lerp = function(a, b, c) {
        return a + c * (b - a)
    };
    goog.math.nearlyEquals = function(a, b, c) {
        return Math.abs(a - b) <= (c || 1E-6)
    };
    goog.math.standardAngle = function(a) {
        return goog.math.modulo(a, 360)
    };
    goog.math.standardAngleInRadians = function(a) {
        return goog.math.modulo(a, 2 * Math.PI)
    };
    goog.math.toRadians = function(a) {
        return a * Math.PI / 180
    };
    goog.math.toDegrees = function(a) {
        return 180 * a / Math.PI
    };
    goog.math.angleDx = function(a, b) {
        return b * Math.cos(goog.math.toRadians(a))
    };
    goog.math.angleDy = function(a, b) {
        return b * Math.sin(goog.math.toRadians(a))
    };
    goog.math.angle = function(a, b, c, d) {
        return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)))
    };
    goog.math.angleDifference = function(a, b) {
        var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
        180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
        return c
    };
    goog.math.sign = function(a) {
        return 0 < a ? 1 : 0 > a ? -1 : a
    };
    goog.math.longestCommonSubsequence = function(a, b, c, d) {
        c = c || function(a, b) {
            return a == b
        };
        d = d || function(b, c) {
            return a[b]
        };
        for (var e = a.length, f = b.length, g = [], h = 0; h < e + 1; h++) g[h] = [], g[h][0] = 0;
        for (var k = 0; k < f + 1; k++) g[0][k] = 0;
        for (h = 1; h <= e; h++)
            for (k = 1; k <= f; k++) c(a[h - 1], b[k - 1]) ? g[h][k] = g[h - 1][k - 1] + 1 : g[h][k] = Math.max(g[h - 1][k], g[h][k - 1]);
        for (var l = [], h = e, k = f; 0 < h && 0 < k;) c(a[h - 1], b[k - 1]) ? (l.unshift(d(h - 1, k - 1)), h--, k--) : g[h - 1][k] > g[h][k - 1] ? h-- : k--;
        return l
    };
    goog.math.sum = function(a) {
        return goog.array.reduce(arguments, function(a, c) {
            return a + c
        }, 0)
    };
    goog.math.average = function(a) {
        return goog.math.sum.apply(null, arguments) / arguments.length
    };
    goog.math.sampleVariance = function(a) {
        var b = arguments.length;
        if (2 > b) return 0;
        var c = goog.math.average.apply(null, arguments);
        return goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
            return Math.pow(a - c, 2)
        })) / (b - 1)
    };
    goog.math.standardDeviation = function(a) {
        return Math.sqrt(goog.math.sampleVariance.apply(null, arguments))
    };
    goog.math.isInt = function(a) {
        return isFinite(a) && 0 == a % 1
    };
    goog.math.isFiniteNumber = function(a) {
        return isFinite(a) && !isNaN(a)
    };
    goog.math.isNegativeZero = function(a) {
        return 0 == a && 0 > 1 / a
    };
    goog.math.log10Floor = function(a) {
        if (0 < a) {
            var b = Math.round(Math.log(a) * Math.LOG10E);
            return b - (parseFloat("1e" + b) > a ? 1 : 0)
        }
        return 0 == a ? -Infinity : NaN
    };
    goog.math.safeFloor = function(a, b) {
        goog.asserts.assert(!goog.isDef(b) || 0 < b);
        return Math.floor(a + (b || 2E-15))
    };
    goog.math.safeCeil = function(a, b) {
        goog.asserts.assert(!goog.isDef(b) || 0 < b);
        return Math.ceil(a - (b || 2E-15))
    };
    goog.iter = {};
    goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : {
        message: "StopIteration",
        stack: ""
    };
    goog.iter.Iterator = function() {};
    goog.iter.Iterator.prototype.next = function() {
        throw goog.iter.StopIteration;
    };
    goog.iter.Iterator.prototype.__iterator__ = function(a) {
        return this
    };
    goog.iter.toIterator = function(a) {
        if (a instanceof goog.iter.Iterator) return a;
        if ("function" == typeof a.__iterator__) return a.__iterator__(!1);
        if (goog.isArrayLike(a)) {
            var b = 0,
                c = new goog.iter.Iterator;
            c.next = function() {
                for (;;) {
                    if (b >= a.length) throw goog.iter.StopIteration;
                    if (b in a) return a[b++];
                    b++
                }
            };
            return c
        }
        throw Error("Not implemented");
    };
    goog.iter.forEach = function(a, b, c) {
        if (goog.isArrayLike(a)) try {
            goog.array.forEach(a, b, c)
        } catch (d) {
            if (d !== goog.iter.StopIteration) throw d;
        } else {
            a = goog.iter.toIterator(a);
            try {
                for (;;) b.call(c, a.next(), void 0, a)
            } catch (e) {
                if (e !== goog.iter.StopIteration) throw e;
            }
        }
    };
    goog.iter.filter = function(a, b, c) {
        var d = goog.iter.toIterator(a);
        a = new goog.iter.Iterator;
        a.next = function() {
            for (;;) {
                var a = d.next();
                if (b.call(c, a, void 0, d)) return a
            }
        };
        return a
    };
    goog.iter.filterFalse = function(a, b, c) {
        return goog.iter.filter(a, goog.functions.not(b), c)
    };
    goog.iter.range = function(a, b, c) {
        var d = 0,
            e = a,
            f = c || 1;
        1 < arguments.length && (d = a, e = b);
        if (0 == f) throw Error("Range step argument must not be zero");
        var g = new goog.iter.Iterator;
        g.next = function() {
            if (0 < f && d >= e || 0 > f && d <= e) throw goog.iter.StopIteration;
            var a = d;
            d += f;
            return a
        };
        return g
    };
    goog.iter.join = function(a, b) {
        return goog.iter.toArray(a).join(b)
    };
    goog.iter.map = function(a, b, c) {
        var d = goog.iter.toIterator(a);
        a = new goog.iter.Iterator;
        a.next = function() {
            var a = d.next();
            return b.call(c, a, void 0, d)
        };
        return a
    };
    goog.iter.reduce = function(a, b, c, d) {
        var e = c;
        goog.iter.forEach(a, function(a) {
            e = b.call(d, e, a)
        });
        return e
    };
    goog.iter.some = function(a, b, c) {
        a = goog.iter.toIterator(a);
        try {
            for (;;)
                if (b.call(c, a.next(), void 0, a)) return !0
        } catch (d) {
            if (d !== goog.iter.StopIteration) throw d;
        }
        return !1
    };
    goog.iter.every = function(a, b, c) {
        a = goog.iter.toIterator(a);
        try {
            for (;;)
                if (!b.call(c, a.next(), void 0, a)) return !1
        } catch (d) {
            if (d !== goog.iter.StopIteration) throw d;
        }
        return !0
    };
    goog.iter.chain = function(a) {
        return goog.iter.chainFromIterable(arguments)
    };
    goog.iter.chainFromIterable = function(a) {
        var b = goog.iter.toIterator(a);
        a = new goog.iter.Iterator;
        var c = null;
        a.next = function() {
            for (;;) {
                if (null == c) {
                    var a = b.next();
                    c = goog.iter.toIterator(a)
                }
                try {
                    return c.next()
                } catch (e) {
                    if (e !== goog.iter.StopIteration) throw e;
                    c = null
                }
            }
        };
        return a
    };
    goog.iter.dropWhile = function(a, b, c) {
        var d = goog.iter.toIterator(a);
        a = new goog.iter.Iterator;
        var e = !0;
        a.next = function() {
            for (;;) {
                var a = d.next();
                if (!e || !b.call(c, a, void 0, d)) return e = !1, a
            }
        };
        return a
    };
    goog.iter.takeWhile = function(a, b, c) {
        var d = goog.iter.toIterator(a);
        a = new goog.iter.Iterator;
        a.next = function() {
            var a = d.next();
            if (b.call(c, a, void 0, d)) return a;
            throw goog.iter.StopIteration;
        };
        return a
    };
    goog.iter.toArray = function(a) {
        if (goog.isArrayLike(a)) return goog.array.toArray(a);
        a = goog.iter.toIterator(a);
        var b = [];
        goog.iter.forEach(a, function(a) {
            b.push(a)
        });
        return b
    };
    goog.iter.equals = function(a, b, c) {
        a = goog.iter.zipLongest({}, a, b);
        var d = c || goog.array.defaultCompareEquality;
        return goog.iter.every(a, function(a) {
            return d(a[0], a[1])
        })
    };
    goog.iter.nextOrValue = function(a, b) {
        try {
            return goog.iter.toIterator(a).next()
        } catch (c) {
            if (c != goog.iter.StopIteration) throw c;
            return b
        }
    };
    goog.iter.product = function(a) {
        if (goog.array.some(arguments, function(a) {
                return !a.length
            }) || !arguments.length) return new goog.iter.Iterator;
        var b = new goog.iter.Iterator,
            c = arguments,
            d = goog.array.repeat(0, c.length);
        b.next = function() {
            if (d) {
                for (var a = goog.array.map(d, function(a, b) {
                        return c[b][a]
                    }), b = d.length - 1; 0 <= b; b--) {
                    goog.asserts.assert(d);
                    if (d[b] < c[b].length - 1) {
                        d[b]++;
                        break
                    }
                    if (0 == b) {
                        d = null;
                        break
                    }
                    d[b] = 0
                }
                return a
            }
            throw goog.iter.StopIteration;
        };
        return b
    };
    goog.iter.cycle = function(a) {
        var b = goog.iter.toIterator(a),
            c = [],
            d = 0;
        a = new goog.iter.Iterator;
        var e = !1;
        a.next = function() {
            var a = null;
            if (!e) try {
                return a = b.next(), c.push(a), a
            } catch (g) {
                if (g != goog.iter.StopIteration || goog.array.isEmpty(c)) throw g;
                e = !0
            }
            a = c[d];
            d = (d + 1) % c.length;
            return a
        };
        return a
    };
    goog.iter.count = function(a, b) {
        var c = a || 0,
            d = goog.isDef(b) ? b : 1,
            e = new goog.iter.Iterator;
        e.next = function() {
            var a = c;
            c += d;
            return a
        };
        return e
    };
    goog.iter.repeat = function(a) {
        var b = new goog.iter.Iterator;
        b.next = goog.functions.constant(a);
        return b
    };
    goog.iter.accumulate = function(a) {
        var b = goog.iter.toIterator(a),
            c = 0;
        a = new goog.iter.Iterator;
        a.next = function() {
            return c += b.next()
        };
        return a
    };
    goog.iter.zip = function(a) {
        var b = arguments,
            c = new goog.iter.Iterator;
        if (0 < b.length) {
            var d = goog.array.map(b, goog.iter.toIterator);
            c.next = function() {
                return goog.array.map(d, function(a) {
                    return a.next()
                })
            }
        }
        return c
    };
    goog.iter.zipLongest = function(a, b) {
        var c = goog.array.slice(arguments, 1),
            d = new goog.iter.Iterator;
        if (0 < c.length) {
            var e = goog.array.map(c, goog.iter.toIterator);
            d.next = function() {
                var b = !1,
                    c = goog.array.map(e, function(c) {
                        var d;
                        try {
                            d = c.next(), b = !0
                        } catch (e) {
                            if (e !== goog.iter.StopIteration) throw e;
                            d = a
                        }
                        return d
                    });
                if (!b) throw goog.iter.StopIteration;
                return c
            }
        }
        return d
    };
    goog.iter.compress = function(a, b) {
        var c = goog.iter.toIterator(b);
        return goog.iter.filter(a, function() {
            return !!c.next()
        })
    };
    goog.iter.GroupByIterator_ = function(a, b) {
        this.iterator = goog.iter.toIterator(a);
        this.keyFunc = b || goog.functions.identity
    };
    goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator);
    goog.iter.GroupByIterator_.prototype.next = function() {
        for (; this.currentKey == this.targetKey;) this.currentValue = this.iterator.next(), this.currentKey = this.keyFunc(this.currentValue);
        this.targetKey = this.currentKey;
        return [this.currentKey, this.groupItems_(this.targetKey)]
    };
    goog.iter.GroupByIterator_.prototype.groupItems_ = function(a) {
        for (var b = []; this.currentKey == a;) {
            b.push(this.currentValue);
            try {
                this.currentValue = this.iterator.next()
            } catch (c) {
                if (c !== goog.iter.StopIteration) throw c;
                break
            }
            this.currentKey = this.keyFunc(this.currentValue)
        }
        return b
    };
    goog.iter.groupBy = function(a, b) {
        return new goog.iter.GroupByIterator_(a, b)
    };
    goog.iter.starMap = function(a, b, c) {
        var d = goog.iter.toIterator(a);
        a = new goog.iter.Iterator;
        a.next = function() {
            var a = goog.iter.toArray(d.next());
            return b.apply(c, goog.array.concat(a, void 0, d))
        };
        return a
    };
    goog.iter.tee = function(a, b) {
        var c = goog.iter.toIterator(a),
            d = goog.isNumber(b) ? b : 2,
            e = goog.array.map(goog.array.range(d), function() {
                return []
            }),
            f = function() {
                var a = c.next();
                goog.array.forEach(e, function(b) {
                    b.push(a)
                })
            };
        return goog.array.map(e, function(a) {
            var b = new goog.iter.Iterator;
            b.next = function() {
                goog.array.isEmpty(a) && f();
                goog.asserts.assert(!goog.array.isEmpty(a));
                return a.shift()
            };
            return b
        })
    };
    goog.iter.enumerate = function(a, b) {
        return goog.iter.zip(goog.iter.count(b), a)
    };
    goog.iter.limit = function(a, b) {
        goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
        var c = goog.iter.toIterator(a),
            d = new goog.iter.Iterator,
            e = b;
        d.next = function() {
            if (0 < e--) return c.next();
            throw goog.iter.StopIteration;
        };
        return d
    };
    goog.iter.consume = function(a, b) {
        goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
        for (var c = goog.iter.toIterator(a); 0 < b--;) goog.iter.nextOrValue(c, null);
        return c
    };
    goog.iter.slice = function(a, b, c) {
        goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
        a = goog.iter.consume(a, b);
        goog.isNumber(c) && (goog.asserts.assert(goog.math.isInt(c) && c >= b), a = goog.iter.limit(a, c - b));
        return a
    };
    goog.iter.hasDuplicates_ = function(a) {
        var b = [];
        goog.array.removeDuplicates(a, b);
        return a.length != b.length
    };
    goog.iter.permutations = function(a, b) {
        var c = goog.iter.toArray(a),
            d = goog.isNumber(b) ? b : c.length,
            c = goog.array.repeat(c, d),
            c = goog.iter.product.apply(void 0, c);
        return goog.iter.filter(c, function(a) {
            return !goog.iter.hasDuplicates_(a)
        })
    };
    goog.iter.combinations = function(a, b) {
        function c(a) {
            return d[a]
        }
        var d = goog.iter.toArray(a),
            e = goog.iter.range(d.length),
            e = goog.iter.permutations(e, b),
            f = goog.iter.filter(e, function(a) {
                return goog.array.isSorted(a)
            }),
            e = new goog.iter.Iterator;
        e.next = function() {
            return goog.array.map(f.next(), c)
        };
        return e
    };
    goog.iter.combinationsWithReplacement = function(a, b) {
        function c(a) {
            return d[a]
        }
        var d = goog.iter.toArray(a),
            e = goog.array.range(d.length),
            e = goog.array.repeat(e, b),
            e = goog.iter.product.apply(void 0, e),
            f = goog.iter.filter(e, function(a) {
                return goog.array.isSorted(a)
            }),
            e = new goog.iter.Iterator;
        e.next = function() {
            return goog.array.map(f.next(), c)
        };
        return e
    };
    goog.structs.Map = function(a, b) {
        this.map_ = {};
        this.keys_ = [];
        this.version_ = this.count_ = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        } else a && this.addAll(a)
    };
    goog.structs.Map.prototype.getCount = function() {
        return this.count_
    };
    goog.structs.Map.prototype.getValues = function() {
        this.cleanupKeysArray_();
        for (var a = [], b = 0; b < this.keys_.length; b++) a.push(this.map_[this.keys_[b]]);
        return a
    };
    goog.structs.Map.prototype.getKeys = function() {
        this.cleanupKeysArray_();
        return this.keys_.concat()
    };
    goog.structs.Map.prototype.containsKey = function(a) {
        return goog.structs.Map.hasKey_(this.map_, a)
    };
    goog.structs.Map.prototype.containsValue = function(a) {
        for (var b = 0; b < this.keys_.length; b++) {
            var c = this.keys_[b];
            if (goog.structs.Map.hasKey_(this.map_, c) && this.map_[c] == a) return !0
        }
        return !1
    };
    goog.structs.Map.prototype.equals = function(a, b) {
        if (this === a) return !0;
        if (this.count_ != a.getCount()) return !1;
        var c = b || goog.structs.Map.defaultEquals;
        this.cleanupKeysArray_();
        for (var d, e = 0; d = this.keys_[e]; e++)
            if (!c(this.get(d), a.get(d))) return !1;
        return !0
    };
    goog.structs.Map.defaultEquals = function(a, b) {
        return a === b
    };
    goog.structs.Map.prototype.isEmpty = function() {
        return 0 == this.count_
    };
    goog.structs.Map.prototype.clear = function() {
        this.map_ = {};
        this.version_ = this.count_ = this.keys_.length = 0
    };
    goog.structs.Map.prototype.remove = function(a) {
        return goog.structs.Map.hasKey_(this.map_, a) ? (delete this.map_[a], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1
    };
    goog.structs.Map.prototype.cleanupKeysArray_ = function() {
        if (this.count_ != this.keys_.length) {
            for (var a = 0, b = 0; a < this.keys_.length;) {
                var c = this.keys_[a];
                goog.structs.Map.hasKey_(this.map_, c) && (this.keys_[b++] = c);
                a++
            }
            this.keys_.length = b
        }
        if (this.count_ != this.keys_.length) {
            for (var d = {}, b = a = 0; a < this.keys_.length;) c = this.keys_[a], goog.structs.Map.hasKey_(d, c) || (this.keys_[b++] = c, d[c] = 1), a++;
            this.keys_.length = b
        }
    };
    goog.structs.Map.prototype.get = function(a, b) {
        return goog.structs.Map.hasKey_(this.map_, a) ? this.map_[a] : b
    };
    goog.structs.Map.prototype.set = function(a, b) {
        goog.structs.Map.hasKey_(this.map_, a) || (this.count_++, this.keys_.push(a), this.version_++);
        this.map_[a] = b
    };
    goog.structs.Map.prototype.addAll = function(a) {
        var b;
        a instanceof goog.structs.Map ? (b = a.getKeys(), a = a.getValues()) : (b = goog.object.getKeys(a), a = goog.object.getValues(a));
        for (var c = 0; c < b.length; c++) this.set(b[c], a[c])
    };
    goog.structs.Map.prototype.forEach = function(a, b) {
        for (var c = this.getKeys(), d = 0; d < c.length; d++) {
            var e = c[d],
                f = this.get(e);
            a.call(b, f, e, this)
        }
    };
    goog.structs.Map.prototype.clone = function() {
        return new goog.structs.Map(this)
    };
    goog.structs.Map.prototype.transpose = function() {
        for (var a = new goog.structs.Map, b = 0; b < this.keys_.length; b++) {
            var c = this.keys_[b];
            a.set(this.map_[c], c)
        }
        return a
    };
    goog.structs.Map.prototype.toObject = function() {
        this.cleanupKeysArray_();
        for (var a = {}, b = 0; b < this.keys_.length; b++) {
            var c = this.keys_[b];
            a[c] = this.map_[c]
        }
        return a
    };
    goog.structs.Map.prototype.getKeyIterator = function() {
        return this.__iterator__(!0)
    };
    goog.structs.Map.prototype.getValueIterator = function() {
        return this.__iterator__(!1)
    };
    goog.structs.Map.prototype.__iterator__ = function(a) {
        this.cleanupKeysArray_();
        var b = 0,
            c = this.version_,
            d = this,
            e = new goog.iter.Iterator;
        e.next = function() {
            if (c != d.version_) throw Error("The map has changed since the iterator was created");
            if (b >= d.keys_.length) throw goog.iter.StopIteration;
            var e = d.keys_[b++];
            return a ? e : d.map_[e]
        };
        return e
    };
    goog.structs.Map.hasKey_ = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    goog.math.Coordinate = function(a, b) {
        this.x = goog.isDef(a) ? a : 0;
        this.y = goog.isDef(b) ? b : 0
    };
    goog.math.Coordinate.prototype.clone = function() {
        return new goog.math.Coordinate(this.x, this.y)
    };
    goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
        return "(" + this.x + ", " + this.y + ")"
    });
    goog.math.Coordinate.prototype.equals = function(a) {
        return a instanceof goog.math.Coordinate && goog.math.Coordinate.equals(this, a)
    };
    goog.math.Coordinate.equals = function(a, b) {
        return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1
    };
    goog.math.Coordinate.distance = function(a, b) {
        var c = a.x - b.x,
            d = a.y - b.y;
        return Math.sqrt(c * c + d * d)
    };
    goog.math.Coordinate.magnitude = function(a) {
        return Math.sqrt(a.x * a.x + a.y * a.y)
    };
    goog.math.Coordinate.azimuth = function(a) {
        return goog.math.angle(0, 0, a.x, a.y)
    };
    goog.math.Coordinate.squaredDistance = function(a, b) {
        var c = a.x - b.x,
            d = a.y - b.y;
        return c * c + d * d
    };
    goog.math.Coordinate.difference = function(a, b) {
        return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
    };
    goog.math.Coordinate.sum = function(a, b) {
        return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
    };
    goog.math.Coordinate.prototype.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    goog.math.Coordinate.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    goog.math.Coordinate.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    goog.math.Coordinate.prototype.translate = function(a, b) {
        a instanceof goog.math.Coordinate ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), goog.isNumber(b) && (this.y += b));
        return this
    };
    goog.math.Coordinate.prototype.scale = function(a, b) {
        var c = goog.isNumber(b) ? b : a;
        this.x *= a;
        this.y *= c;
        return this
    };
    goog.math.Coordinate.prototype.rotateRadians = function(a, b) {
        var c = b || new goog.math.Coordinate(0, 0),
            d = this.x,
            e = this.y,
            f = Math.cos(a),
            g = Math.sin(a);
        this.x = (d - c.x) * f - (e - c.y) * g + c.x;
        this.y = (d - c.x) * g + (e - c.y) * f + c.y
    };
    goog.math.Coordinate.prototype.rotateDegrees = function(a, b) {
        this.rotateRadians(goog.math.toRadians(a), b)
    };
    goog.math.Box = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    goog.math.Box.boundingBox = function(a) {
        for (var b = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), c = 1; c < arguments.length; c++) b.expandToIncludeCoordinate(arguments[c]);
        return b
    };
    goog.math.Box.prototype.getWidth = function() {
        return this.right - this.left
    };
    goog.math.Box.prototype.getHeight = function() {
        return this.bottom - this.top
    };
    goog.math.Box.prototype.clone = function() {
        return new goog.math.Box(this.top, this.right, this.bottom, this.left)
    };
    goog.DEBUG && (goog.math.Box.prototype.toString = function() {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
    });
    goog.math.Box.prototype.contains = function(a) {
        return goog.math.Box.contains(this, a)
    };
    goog.math.Box.prototype.expand = function(a, b, c, d) {
        goog.isObject(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += Number(b), this.bottom += Number(c), this.left -= Number(d));
        return this
    };
    goog.math.Box.prototype.expandToInclude = function(a) {
        this.left = Math.min(this.left, a.left);
        this.top = Math.min(this.top, a.top);
        this.right = Math.max(this.right, a.right);
        this.bottom = Math.max(this.bottom, a.bottom)
    };
    goog.math.Box.prototype.expandToIncludeCoordinate = function(a) {
        this.top = Math.min(this.top, a.y);
        this.right = Math.max(this.right, a.x);
        this.bottom = Math.max(this.bottom, a.y);
        this.left = Math.min(this.left, a.x)
    };
    goog.math.Box.equals = function(a, b) {
        return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1
    };
    goog.math.Box.contains = function(a, b) {
        return a && b ? b instanceof goog.math.Box ? b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom : b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom : !1
    };
    goog.math.Box.relativePositionX = function(a, b) {
        return b.x < a.left ? b.x - a.left : b.x > a.right ? b.x - a.right : 0
    };
    goog.math.Box.relativePositionY = function(a, b) {
        return b.y < a.top ? b.y - a.top : b.y > a.bottom ? b.y - a.bottom : 0
    };
    goog.math.Box.distance = function(a, b) {
        var c = goog.math.Box.relativePositionX(a, b),
            d = goog.math.Box.relativePositionY(a, b);
        return Math.sqrt(c * c + d * d)
    };
    goog.math.Box.intersects = function(a, b) {
        return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom
    };
    goog.math.Box.intersectsWithPadding = function(a, b, c) {
        return a.left <= b.right + c && b.left <= a.right + c && a.top <= b.bottom + c && b.top <= a.bottom + c
    };
    goog.math.Box.prototype.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    goog.math.Box.prototype.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    goog.math.Box.prototype.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    goog.math.Box.prototype.translate = function(a, b) {
        a instanceof goog.math.Coordinate ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (goog.asserts.assertNumber(a), this.left += a, this.right += a, goog.isNumber(b) && (this.top += b, this.bottom += b));
        return this
    };
    goog.math.Box.prototype.scale = function(a, b) {
        var c = goog.isNumber(b) ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= c;
        this.bottom *= c;
        return this
    };
    goog.math.Rect = function(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    goog.math.Rect.prototype.clone = function() {
        return new goog.math.Rect(this.left, this.top, this.width, this.height)
    };
    goog.math.Rect.prototype.toBox = function() {
        return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
    };
    goog.math.Rect.createFromPositionAndSize = function(a, b) {
        return new goog.math.Rect(a.x, a.y, b.width, b.height)
    };
    goog.math.Rect.createFromBox = function(a) {
        return new goog.math.Rect(a.left, a.top, a.right - a.left, a.bottom - a.top)
    };
    goog.DEBUG && (goog.math.Rect.prototype.toString = function() {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
    });
    goog.math.Rect.equals = function(a, b) {
        return a == b ? !0 : a && b ? a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height : !1
    };
    goog.math.Rect.prototype.intersection = function(a) {
        var b = Math.max(this.left, a.left),
            c = Math.min(this.left + this.width, a.left + a.width);
        if (b <= c) {
            var d = Math.max(this.top, a.top);
            a = Math.min(this.top + this.height, a.top + a.height);
            if (d <= a) return this.left = b, this.top = d, this.width = c - b, this.height = a - d, !0
        }
        return !1
    };
    goog.math.Rect.intersection = function(a, b) {
        var c = Math.max(a.left, b.left),
            d = Math.min(a.left + a.width, b.left + b.width);
        if (c <= d) {
            var e = Math.max(a.top, b.top),
                f = Math.min(a.top + a.height, b.top + b.height);
            if (e <= f) return new goog.math.Rect(c, e, d - c, f - e)
        }
        return null
    };
    goog.math.Rect.intersects = function(a, b) {
        return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height
    };
    goog.math.Rect.prototype.intersects = function(a) {
        return goog.math.Rect.intersects(this, a)
    };
    goog.math.Rect.difference = function(a, b) {
        var c = goog.math.Rect.intersection(a, b);
        if (!c || !c.height || !c.width) return [a.clone()];
        var c = [],
            d = a.top,
            e = a.height,
            f = a.left + a.width,
            g = a.top + a.height,
            h = b.left + b.width,
            k = b.top + b.height;
        b.top > a.top && (c.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)), d = b.top, e -= b.top - a.top);
        k < g && (c.push(new goog.math.Rect(a.left, k, a.width, g - k)), e = k - d);
        b.left > a.left && c.push(new goog.math.Rect(a.left, d, b.left - a.left, e));
        h < f && c.push(new goog.math.Rect(h, d, f - h, e));
        return c
    };
    goog.math.Rect.prototype.difference = function(a) {
        return goog.math.Rect.difference(this, a)
    };
    goog.math.Rect.prototype.boundingRect = function(a) {
        var b = Math.max(this.left + this.width, a.left + a.width),
            c = Math.max(this.top + this.height, a.top + a.height);
        this.left = Math.min(this.left, a.left);
        this.top = Math.min(this.top, a.top);
        this.width = b - this.left;
        this.height = c - this.top
    };
    goog.math.Rect.boundingRect = function(a, b) {
        if (!a || !b) return null;
        var c = new goog.math.Rect(a.left, a.top, a.width, a.height);
        c.boundingRect(b);
        return c
    };
    goog.math.Rect.prototype.contains = function(a) {
        return a instanceof goog.math.Coordinate ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    };
    goog.math.Rect.prototype.squaredDistance = function(a) {
        var b = a.x < this.left ? this.left - a.x : Math.max(a.x - (this.left + this.width), 0);
        a = a.y < this.top ? this.top - a.y : Math.max(a.y - (this.top + this.height), 0);
        return b * b + a * a
    };
    goog.math.Rect.prototype.distance = function(a) {
        return Math.sqrt(this.squaredDistance(a))
    };
    goog.math.Rect.prototype.getSize = function() {
        return new goog.math.Size(this.width, this.height)
    };
    goog.math.Rect.prototype.getTopLeft = function() {
        return new goog.math.Coordinate(this.left, this.top)
    };
    goog.math.Rect.prototype.getCenter = function() {
        return new goog.math.Coordinate(this.left + this.width / 2, this.top + this.height / 2)
    };
    goog.math.Rect.prototype.getBottomRight = function() {
        return new goog.math.Coordinate(this.left + this.width, this.top + this.height)
    };
    goog.math.Rect.prototype.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    goog.math.Rect.prototype.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    goog.math.Rect.prototype.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    goog.math.Rect.prototype.translate = function(a, b) {
        a instanceof goog.math.Coordinate ? (this.left += a.x, this.top += a.y) : (this.left += goog.asserts.assertNumber(a), goog.isNumber(b) && (this.top += b));
        return this
    };
    goog.math.Rect.prototype.scale = function(a, b) {
        var c = goog.isNumber(b) ? b : a;
        this.left *= a;
        this.width *= a;
        this.top *= c;
        this.height *= c;
        return this
    };
    goog.labs.userAgent.engine = {};
    goog.labs.userAgent.engine.isPresto = function() {
        return goog.labs.userAgent.util.matchUserAgent("Presto")
    };
    goog.labs.userAgent.engine.isTrident = function() {
        return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
    };
    goog.labs.userAgent.engine.isEdge = function() {
        return goog.labs.userAgent.util.matchUserAgent("Edge")
    };
    goog.labs.userAgent.engine.isWebKit = function() {
        return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge()
    };
    goog.labs.userAgent.engine.isGecko = function() {
        return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge()
    };
    goog.labs.userAgent.engine.getVersion = function() {
        var a = goog.labs.userAgent.util.getUserAgent();
        if (a) {
            var a = goog.labs.userAgent.util.extractVersionTuples(a),
                b = goog.labs.userAgent.engine.getEngineTuple_(a);
            if (b) return "Gecko" == b[0] ? goog.labs.userAgent.engine.getVersionForKey_(a, "Firefox") : b[1];
            var a = a[0],
                c;
            if (a && (c = a[2]) && (c = /Trident\/([^\s;]+)/.exec(c))) return c[1]
        }
        return ""
    };
    goog.labs.userAgent.engine.getEngineTuple_ = function(a) {
        if (!goog.labs.userAgent.engine.isEdge()) return a[1];
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if ("Edge" == c[0]) return c
        }
    };
    goog.labs.userAgent.engine.isVersionOrHigher = function(a) {
        return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a)
    };
    goog.labs.userAgent.engine.getVersionForKey_ = function(a, b) {
        var c = goog.array.find(a, function(a) {
            return b == a[0]
        });
        return c && c[1] || ""
    };
    goog.labs.userAgent.browser = {};
    goog.labs.userAgent.browser.matchOpera_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Opera")
    };
    goog.labs.userAgent.browser.matchIE_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
    };
    goog.labs.userAgent.browser.matchEdge_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Edge")
    };
    goog.labs.userAgent.browser.matchFirefox_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Firefox")
    };
    goog.labs.userAgent.browser.matchSafari_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"))
    };
    goog.labs.userAgent.browser.matchCoast_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Coast")
    };
    goog.labs.userAgent.browser.matchIosWebview_ = function() {
        return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit")
    };
    goog.labs.userAgent.browser.matchChrome_ = function() {
        return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdge_()
    };
    goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
        return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk())
    };
    goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
    goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
    goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_;
    goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
    goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
    goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
    goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
    goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
    goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
    goog.labs.userAgent.browser.isSilk = function() {
        return goog.labs.userAgent.util.matchUserAgent("Silk")
    };
    goog.labs.userAgent.browser.getVersion = function() {
        function a(a) {
            a = goog.array.find(a, d);
            return c[a] || ""
        }
        var b = goog.labs.userAgent.util.getUserAgent();
        if (goog.labs.userAgent.browser.isIE()) return goog.labs.userAgent.browser.getIEVersion_(b);
        var b = goog.labs.userAgent.util.extractVersionTuples(b),
            c = {};
        goog.array.forEach(b, function(a) {
            c[a[0]] = a[1]
        });
        var d = goog.partial(goog.object.containsKey, c);
        return goog.labs.userAgent.browser.isOpera() ? a(["Version", "Opera"]) : goog.labs.userAgent.browser.isEdge() ? a(["Edge"]) :
            goog.labs.userAgent.browser.isChrome() ? a(["Chrome", "CriOS"]) : (b = b[2]) && b[1] || ""
    };
    goog.labs.userAgent.browser.isVersionOrHigher = function(a) {
        return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), a)
    };
    goog.labs.userAgent.browser.getIEVersion_ = function(a) {
        var b = /rv: *([\d\.]*)/.exec(a);
        if (b && b[1]) return b[1];
        var b = "",
            c = /MSIE +([\d\.]+)/.exec(a);
        if (c && c[1])
            if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1])
                if (a && a[1]) switch (a[1]) {
                    case "4.0":
                        b = "8.0";
                        break;
                    case "5.0":
                        b = "9.0";
                        break;
                    case "6.0":
                        b = "10.0";
                        break;
                    case "7.0":
                        b = "11.0"
                } else b = "7.0";
                else b = c[1];
        return b
    };
    goog.userAgent = {};
    goog.userAgent.ASSUME_IE = !1;
    goog.userAgent.ASSUME_EDGE = !1;
    goog.userAgent.ASSUME_GECKO = !1;
    goog.userAgent.ASSUME_WEBKIT = !1;
    goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
    goog.userAgent.ASSUME_OPERA = !1;
    goog.userAgent.ASSUME_ANY_VERSION = !1;
    goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
    goog.userAgent.getUserAgentString = function() {
        return goog.labs.userAgent.util.getUserAgent()
    };
    goog.userAgent.getNavigator = function() {
        return goog.global.navigator || null
    };
    goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
    goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
    goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
    goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
    goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
    goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
    goog.userAgent.isMobile_ = function() {
        return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile")
    };
    goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
    goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
    goog.userAgent.determinePlatform_ = function() {
        var a = goog.userAgent.getNavigator();
        return a && a.platform || ""
    };
    goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
    goog.userAgent.ASSUME_MAC = !1;
    goog.userAgent.ASSUME_WINDOWS = !1;
    goog.userAgent.ASSUME_LINUX = !1;
    goog.userAgent.ASSUME_X11 = !1;
    goog.userAgent.ASSUME_ANDROID = !1;
    goog.userAgent.ASSUME_IPHONE = !1;
    goog.userAgent.ASSUME_IPAD = !1;
    goog.userAgent.ASSUME_IPOD = !1;
    goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD;
    goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
    goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
    goog.userAgent.isLegacyLinux_ = function() {
        return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS()
    };
    goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
    goog.userAgent.isX11_ = function() {
        var a = goog.userAgent.getNavigator();
        return !!a && goog.string.contains(a.appVersion || "", "X11")
    };
    goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
    goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
    goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
    goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
    goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod();
    goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIos();
    goog.userAgent.determineVersion_ = function() {
        var a = "",
            b = goog.userAgent.getVersionRegexResult_();
        b && (a = b ? b[1] : "");
        return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), null != b && b > parseFloat(a)) ? String(b) : a
    };
    goog.userAgent.getVersionRegexResult_ = function() {
        var a = goog.userAgent.getUserAgentString();
        if (goog.userAgent.GECKO) return /rv\:([^\);]+)(\)|;)/.exec(a);
        if (goog.userAgent.EDGE) return /Edge\/([\d\.]+)/.exec(a);
        if (goog.userAgent.IE) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (goog.userAgent.WEBKIT) return /WebKit\/(\S+)/.exec(a);
        if (goog.userAgent.OPERA) return /(?:Version)[ \/]?(\S+)/.exec(a)
    };
    goog.userAgent.getDocumentMode_ = function() {
        var a = goog.global.document;
        return a ? a.documentMode : void 0
    };
    goog.userAgent.VERSION = goog.userAgent.determineVersion_();
    goog.userAgent.compare = function(a, b) {
        return goog.string.compareVersions(a, b)
    };
    goog.userAgent.isVersionOrHigherCache_ = {};
    goog.userAgent.isVersionOrHigher = function(a) {
        return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, a, function() {
            return 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a)
        })
    };
    goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
    goog.userAgent.isDocumentModeOrHigher = function(a) {
        return Number(goog.userAgent.DOCUMENT_MODE) >= a
    };
    goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
    goog.userAgent.DOCUMENT_MODE = function() {
        var a = goog.global.document,
            b = goog.userAgent.getDocumentMode_();
        return a && goog.userAgent.IE ? b || ("CSS1Compat" == a.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5) : void 0
    }();
    goog.userAgent.product = {};
    goog.userAgent.product.ASSUME_FIREFOX = !1;
    goog.userAgent.product.ASSUME_IPHONE = !1;
    goog.userAgent.product.ASSUME_IPAD = !1;
    goog.userAgent.product.ASSUME_ANDROID = !1;
    goog.userAgent.product.ASSUME_CHROME = !1;
    goog.userAgent.product.ASSUME_SAFARI = !1;
    goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
    goog.userAgent.product.OPERA = goog.userAgent.OPERA;
    goog.userAgent.product.IE = goog.userAgent.IE;
    goog.userAgent.product.EDGE = goog.userAgent.EDGE;
    goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.labs.userAgent.browser.isFirefox();
    goog.userAgent.product.isIphoneOrIpod_ = function() {
        return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpod()
    };
    goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.isIphoneOrIpod_();
    goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
    goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.labs.userAgent.browser.isAndroidBrowser();
    goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.labs.userAgent.browser.isChrome();
    goog.userAgent.product.isSafariDesktop_ = function() {
        return goog.labs.userAgent.browser.isSafari() && !goog.labs.userAgent.platform.isIos()
    };
    goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.isSafariDesktop_();
    goog.events.KeyCodes = {
        WIN_KEY_FF_LINUX: 0,
        MAC_ENTER: 3,
        BACKSPACE: 8,
        TAB: 9,
        NUM_CENTER: 12,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        PLUS_SIGN: 43,
        PRINT_SCREEN: 44,
        INSERT: 45,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        FF_SEMICOLON: 59,
        FF_EQUALS: 61,
        FF_DASH: 173,
        QUESTION_MARK: 63,
        AT_SIGN: 64,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        META: 91,
        WIN_KEY_RIGHT: 92,
        CONTEXT_MENU: 93,
        NUM_ZERO: 96,
        NUM_ONE: 97,
        NUM_TWO: 98,
        NUM_THREE: 99,
        NUM_FOUR: 100,
        NUM_FIVE: 101,
        NUM_SIX: 102,
        NUM_SEVEN: 103,
        NUM_EIGHT: 104,
        NUM_NINE: 105,
        NUM_MULTIPLY: 106,
        NUM_PLUS: 107,
        NUM_MINUS: 109,
        NUM_PERIOD: 110,
        NUM_DIVISION: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        NUMLOCK: 144,
        SCROLL_LOCK: 145,
        FIRST_MEDIA_KEY: 166,
        LAST_MEDIA_KEY: 183,
        SEMICOLON: 186,
        DASH: 189,
        EQUALS: 187,
        COMMA: 188,
        PERIOD: 190,
        SLASH: 191,
        APOSTROPHE: 192,
        TILDE: 192,
        SINGLE_QUOTE: 222,
        OPEN_SQUARE_BRACKET: 219,
        BACKSLASH: 220,
        CLOSE_SQUARE_BRACKET: 221,
        WIN_KEY: 224,
        MAC_FF_META: 224,
        MAC_WK_CMD_LEFT: 91,
        MAC_WK_CMD_RIGHT: 93,
        WIN_IME: 229,
        VK_NONAME: 252,
        PHANTOM: 255
    };
    goog.events.KeyCodes.isTextModifyingKeyEvent = function(a) {
        if (a.altKey && !a.ctrlKey || a.metaKey || a.keyCode >= goog.events.KeyCodes.F1 && a.keyCode <= goog.events.KeyCodes.F12) return !1;
        switch (a.keyCode) {
            case goog.events.KeyCodes.ALT:
            case goog.events.KeyCodes.CAPS_LOCK:
            case goog.events.KeyCodes.CONTEXT_MENU:
            case goog.events.KeyCodes.CTRL:
            case goog.events.KeyCodes.DOWN:
            case goog.events.KeyCodes.END:
            case goog.events.KeyCodes.ESC:
            case goog.events.KeyCodes.HOME:
            case goog.events.KeyCodes.INSERT:
            case goog.events.KeyCodes.LEFT:
            case goog.events.KeyCodes.MAC_FF_META:
            case goog.events.KeyCodes.META:
            case goog.events.KeyCodes.NUMLOCK:
            case goog.events.KeyCodes.NUM_CENTER:
            case goog.events.KeyCodes.PAGE_DOWN:
            case goog.events.KeyCodes.PAGE_UP:
            case goog.events.KeyCodes.PAUSE:
            case goog.events.KeyCodes.PHANTOM:
            case goog.events.KeyCodes.PRINT_SCREEN:
            case goog.events.KeyCodes.RIGHT:
            case goog.events.KeyCodes.SCROLL_LOCK:
            case goog.events.KeyCodes.SHIFT:
            case goog.events.KeyCodes.UP:
            case goog.events.KeyCodes.VK_NONAME:
            case goog.events.KeyCodes.WIN_KEY:
            case goog.events.KeyCodes.WIN_KEY_RIGHT:
                return !1;
            case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
                return !goog.userAgent.GECKO;
            default:
                return a.keyCode < goog.events.KeyCodes.FIRST_MEDIA_KEY || a.keyCode > goog.events.KeyCodes.LAST_MEDIA_KEY
        }
    };
    goog.events.KeyCodes.firesKeyPressEvent = function(a, b, c, d, e, f) {
        if (!(goog.userAgent.IE || goog.userAgent.EDGE || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("525"))) return !0;
        if (goog.userAgent.MAC && e) return goog.events.KeyCodes.isCharacterKey(a);
        if (e && !d) return !1;
        goog.isNumber(b) && (b = goog.events.KeyCodes.normalizeKeyCode(b));
        e = b == goog.events.KeyCodes.CTRL || b == goog.events.KeyCodes.ALT || goog.userAgent.MAC && b == goog.events.KeyCodes.META;
        f = b == goog.events.KeyCodes.SHIFT && (d || f);
        if ((!c || goog.userAgent.MAC) &&
            e || goog.userAgent.MAC && f) return !1;
        if ((goog.userAgent.WEBKIT || goog.userAgent.EDGE) && d && c) switch (a) {
            case goog.events.KeyCodes.BACKSLASH:
            case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
            case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
            case goog.events.KeyCodes.TILDE:
            case goog.events.KeyCodes.SEMICOLON:
            case goog.events.KeyCodes.DASH:
            case goog.events.KeyCodes.EQUALS:
            case goog.events.KeyCodes.COMMA:
            case goog.events.KeyCodes.PERIOD:
            case goog.events.KeyCodes.SLASH:
            case goog.events.KeyCodes.APOSTROPHE:
            case goog.events.KeyCodes.SINGLE_QUOTE:
                return !1
        }
        if (goog.userAgent.IE &&
            d && b == a) return !1;
        switch (a) {
            case goog.events.KeyCodes.ENTER:
                return !0;
            case goog.events.KeyCodes.ESC:
                return !(goog.userAgent.WEBKIT || goog.userAgent.EDGE)
        }
        return goog.events.KeyCodes.isCharacterKey(a)
    };
    goog.events.KeyCodes.isCharacterKey = function(a) {
        if (a >= goog.events.KeyCodes.ZERO && a <= goog.events.KeyCodes.NINE || a >= goog.events.KeyCodes.NUM_ZERO && a <= goog.events.KeyCodes.NUM_MULTIPLY || a >= goog.events.KeyCodes.A && a <= goog.events.KeyCodes.Z || (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && 0 == a) return !0;
        switch (a) {
            case goog.events.KeyCodes.SPACE:
            case goog.events.KeyCodes.PLUS_SIGN:
            case goog.events.KeyCodes.QUESTION_MARK:
            case goog.events.KeyCodes.AT_SIGN:
            case goog.events.KeyCodes.NUM_PLUS:
            case goog.events.KeyCodes.NUM_MINUS:
            case goog.events.KeyCodes.NUM_PERIOD:
            case goog.events.KeyCodes.NUM_DIVISION:
            case goog.events.KeyCodes.SEMICOLON:
            case goog.events.KeyCodes.FF_SEMICOLON:
            case goog.events.KeyCodes.DASH:
            case goog.events.KeyCodes.EQUALS:
            case goog.events.KeyCodes.FF_EQUALS:
            case goog.events.KeyCodes.COMMA:
            case goog.events.KeyCodes.PERIOD:
            case goog.events.KeyCodes.SLASH:
            case goog.events.KeyCodes.APOSTROPHE:
            case goog.events.KeyCodes.SINGLE_QUOTE:
            case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
            case goog.events.KeyCodes.BACKSLASH:
            case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
                return !0;
            default:
                return !1
        }
    };
    goog.events.KeyCodes.normalizeKeyCode = function(a) {
        return goog.userAgent.GECKO ? goog.events.KeyCodes.normalizeGeckoKeyCode(a) : goog.userAgent.MAC && goog.userAgent.WEBKIT ? goog.events.KeyCodes.normalizeMacWebKitKeyCode(a) : a
    };
    goog.events.KeyCodes.normalizeGeckoKeyCode = function(a) {
        switch (a) {
            case goog.events.KeyCodes.FF_EQUALS:
                return goog.events.KeyCodes.EQUALS;
            case goog.events.KeyCodes.FF_SEMICOLON:
                return goog.events.KeyCodes.SEMICOLON;
            case goog.events.KeyCodes.FF_DASH:
                return goog.events.KeyCodes.DASH;
            case goog.events.KeyCodes.MAC_FF_META:
                return goog.events.KeyCodes.META;
            case goog.events.KeyCodes.WIN_KEY_FF_LINUX:
                return goog.events.KeyCodes.WIN_KEY;
            default:
                return a
        }
    };
    goog.events.KeyCodes.normalizeMacWebKitKeyCode = function(a) {
        switch (a) {
            case goog.events.KeyCodes.MAC_WK_CMD_RIGHT:
                return goog.events.KeyCodes.META;
            default:
                return a
        }
    };
    goog.events.getVendorPrefixedName_ = function(a) {
        return goog.userAgent.WEBKIT ? "webkit" + a : goog.userAgent.OPERA ? "o" + a.toLowerCase() : a.toLowerCase()
    };
    goog.events.EventType = {
        CLICK: "click",
        RIGHTCLICK: "rightclick",
        DBLCLICK: "dblclick",
        MOUSEDOWN: "mousedown",
        MOUSEUP: "mouseup",
        MOUSEOVER: "mouseover",
        MOUSEOUT: "mouseout",
        MOUSEMOVE: "mousemove",
        MOUSEENTER: "mouseenter",
        MOUSELEAVE: "mouseleave",
        SELECTIONCHANGE: "selectionchange",
        SELECTSTART: "selectstart",
        WHEEL: "wheel",
        KEYPRESS: "keypress",
        KEYDOWN: "keydown",
        KEYUP: "keyup",
        BLUR: "blur",
        FOCUS: "focus",
        DEACTIVATE: "deactivate",
        FOCUSIN: goog.userAgent.IE ? "focusin" : "DOMFocusIn",
        FOCUSOUT: goog.userAgent.IE ? "focusout" : "DOMFocusOut",
        CHANGE: "change",
        RESET: "reset",
        SELECT: "select",
        SUBMIT: "submit",
        INPUT: "input",
        PROPERTYCHANGE: "propertychange",
        DRAGSTART: "dragstart",
        DRAG: "drag",
        DRAGENTER: "dragenter",
        DRAGOVER: "dragover",
        DRAGLEAVE: "dragleave",
        DROP: "drop",
        DRAGEND: "dragend",
        TOUCHSTART: "touchstart",
        TOUCHMOVE: "touchmove",
        TOUCHEND: "touchend",
        TOUCHCANCEL: "touchcancel",
        BEFOREUNLOAD: "beforeunload",
        CONSOLEMESSAGE: "consolemessage",
        CONTEXTMENU: "contextmenu",
        DEVICEMOTION: "devicemotion",
        DEVICEORIENTATION: "deviceorientation",
        DOMCONTENTLOADED: "DOMContentLoaded",
        ERROR: "error",
        HELP: "help",
        LOAD: "load",
        LOSECAPTURE: "losecapture",
        ORIENTATIONCHANGE: "orientationchange",
        READYSTATECHANGE: "readystatechange",
        RESIZE: "resize",
        SCROLL: "scroll",
        UNLOAD: "unload",
        CANPLAY: "canplay",
        CANPLAYTHROUGH: "canplaythrough",
        DURATIONCHANGE: "durationchange",
        EMPTIED: "emptied",
        ENDED: "ended",
        LOADEDDATA: "loadeddata",
        LOADEDMETADATA: "loadedmetadata",
        PAUSE: "pause",
        PLAY: "play",
        PLAYING: "playing",
        RATECHANGE: "ratechange",
        SEEKED: "seeked",
        SEEKING: "seeking",
        STALLED: "stalled",
        SUSPEND: "suspend",
        TIMEUPDATE: "timeupdate",
        VOLUMECHANGE: "volumechange",
        WAITING: "waiting",
        HASHCHANGE: "hashchange",
        PAGEHIDE: "pagehide",
        PAGESHOW: "pageshow",
        POPSTATE: "popstate",
        COPY: "copy",
        PASTE: "paste",
        CUT: "cut",
        BEFORECOPY: "beforecopy",
        BEFORECUT: "beforecut",
        BEFOREPASTE: "beforepaste",
        ONLINE: "online",
        OFFLINE: "offline",
        MESSAGE: "message",
        CONNECT: "connect",
        ANIMATIONSTART: goog.events.getVendorPrefixedName_("AnimationStart"),
        ANIMATIONEND: goog.events.getVendorPrefixedName_("AnimationEnd"),
        ANIMATIONITERATION: goog.events.getVendorPrefixedName_("AnimationIteration"),
        TRANSITIONEND: goog.events.getVendorPrefixedName_("TransitionEnd"),
        POINTERDOWN: "pointerdown",
        POINTERUP: "pointerup",
        POINTERCANCEL: "pointercancel",
        POINTERMOVE: "pointermove",
        POINTEROVER: "pointerover",
        POINTEROUT: "pointerout",
        POINTERENTER: "pointerenter",
        POINTERLEAVE: "pointerleave",
        GOTPOINTERCAPTURE: "gotpointercapture",
        LOSTPOINTERCAPTURE: "lostpointercapture",
        MSGESTURECHANGE: "MSGestureChange",
        MSGESTUREEND: "MSGestureEnd",
        MSGESTUREHOLD: "MSGestureHold",
        MSGESTURESTART: "MSGestureStart",
        MSGESTURETAP: "MSGestureTap",
        MSGOTPOINTERCAPTURE: "MSGotPointerCapture",
        MSINERTIASTART: "MSInertiaStart",
        MSLOSTPOINTERCAPTURE: "MSLostPointerCapture",
        MSPOINTERCANCEL: "MSPointerCancel",
        MSPOINTERDOWN: "MSPointerDown",
        MSPOINTERENTER: "MSPointerEnter",
        MSPOINTERHOVER: "MSPointerHover",
        MSPOINTERLEAVE: "MSPointerLeave",
        MSPOINTERMOVE: "MSPointerMove",
        MSPOINTEROUT: "MSPointerOut",
        MSPOINTEROVER: "MSPointerOver",
        MSPOINTERUP: "MSPointerUp",
        TEXT: "text",
        TEXTINPUT: goog.userAgent.IE ? "textinput" : "textInput",
        COMPOSITIONSTART: "compositionstart",
        COMPOSITIONUPDATE: "compositionupdate",
        COMPOSITIONEND: "compositionend",
        BEFOREINPUT: "beforeinput",
        EXIT: "exit",
        LOADABORT: "loadabort",
        LOADCOMMIT: "loadcommit",
        LOADREDIRECT: "loadredirect",
        LOADSTART: "loadstart",
        LOADSTOP: "loadstop",
        RESPONSIVE: "responsive",
        SIZECHANGED: "sizechanged",
        UNRESPONSIVE: "unresponsive",
        VISIBILITYCHANGE: "visibilitychange",
        STORAGE: "storage",
        DOMSUBTREEMODIFIED: "DOMSubtreeModified",
        DOMNODEINSERTED: "DOMNodeInserted",
        DOMNODEREMOVED: "DOMNodeRemoved",
        DOMNODEREMOVEDFROMDOCUMENT: "DOMNodeRemovedFromDocument",
        DOMNODEINSERTEDINTODOCUMENT: "DOMNodeInsertedIntoDocument",
        DOMATTRMODIFIED: "DOMAttrModified",
        DOMCHARACTERDATAMODIFIED: "DOMCharacterDataModified",
        BEFOREPRINT: "beforeprint",
        AFTERPRINT: "afterprint"
    };
    goog.events.BrowserFeature = {
        HAS_W3C_BUTTON: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
        HAS_W3C_EVENT_SUPPORT: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
        SET_KEY_CODE_TO_PREVENT_DEFAULT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
        HAS_NAVIGATOR_ONLINE_PROPERTY: !goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"),
        HAS_HTML5_NETWORK_EVENT_SUPPORT: goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && goog.userAgent.isVersionOrHigher("8") ||
            goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"),
        HTML5_NETWORK_EVENTS_FIRE_ON_BODY: goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
        TOUCH_ENABLED: "ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || !goog.global.navigator.msMaxTouchPoints)
    };
    goog.html.SafeHtml = function() {
        this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
        this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
        this.dir_ = null
    };
    goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0;
    goog.html.SafeHtml.prototype.getDirection = function() {
        return this.dir_
    };
    goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0;
    goog.html.SafeHtml.prototype.getTypedStringValue = function() {
        return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_
    };
    goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function() {
        return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}"
    });
    goog.html.SafeHtml.unwrap = function(a) {
        if (a instanceof goog.html.SafeHtml && a.constructor === goog.html.SafeHtml && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
        goog.asserts.fail("expected object of type SafeHtml, got '" + a + "' of type " + goog.typeOf(a));
        return "type_error:SafeHtml"
    };
    goog.html.SafeHtml.htmlEscape = function(a) {
        if (a instanceof goog.html.SafeHtml) return a;
        var b = null;
        a.implementsGoogI18nBidiDirectionalString && (b = a.getDirection());
        a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.htmlEscape(a), b)
    };
    goog.html.SafeHtml.htmlEscapePreservingNewlines = function(a) {
        if (a instanceof goog.html.SafeHtml) return a;
        a = goog.html.SafeHtml.htmlEscape(a);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.newLineToBr(goog.html.SafeHtml.unwrap(a)), a.getDirection())
    };
    goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function(a) {
        if (a instanceof goog.html.SafeHtml) return a;
        a = goog.html.SafeHtml.htmlEscape(a);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.whitespaceEscape(goog.html.SafeHtml.unwrap(a)), a.getDirection())
    };
    goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape;
    goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/;
    goog.html.SafeHtml.URL_ATTRIBUTES_ = goog.object.createSet("action", "cite", "data", "formaction", "href", "manifest", "poster", "src");
    goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = goog.object.createSet(goog.dom.TagName.APPLET, goog.dom.TagName.BASE, goog.dom.TagName.EMBED, goog.dom.TagName.IFRAME, goog.dom.TagName.LINK, goog.dom.TagName.MATH, goog.dom.TagName.META, goog.dom.TagName.OBJECT, goog.dom.TagName.SCRIPT, goog.dom.TagName.STYLE, goog.dom.TagName.SVG, goog.dom.TagName.TEMPLATE);
    goog.html.SafeHtml.create = function(a, b, c) {
        goog.html.SafeHtml.verifyTagName(String(a));
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String(a), b, c)
    };
    goog.html.SafeHtml.verifyTagName = function(a) {
        if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a)) throw Error("Invalid tag name <" + a + ">.");
        if (a.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_) throw Error("Tag name <" + a + "> is not allowed for SafeHtml.");
    };
    goog.html.SafeHtml.createIframe = function(a, b, c, d) {
        a && goog.html.TrustedResourceUrl.unwrap(a);
        var e = {};
        e.src = a || null;
        e.srcdoc = b && goog.html.SafeHtml.unwrap(b);
        a = goog.html.SafeHtml.combineAttributes(e, {
            sandbox: ""
        }, c);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d)
    };
    goog.html.SafeHtml.createSandboxIframe = function(a, b, c, d) {
        if (!goog.html.SafeHtml.canUseSandboxIframe()) throw Error("The browser does not support sandboxed iframes.");
        var e = {};
        e.src = a ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a)) : null;
        e.srcdoc = b || null;
        e.sandbox = "";
        a = goog.html.SafeHtml.combineAttributes(e, {}, c);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d)
    };
    goog.html.SafeHtml.canUseSandboxIframe = function() {
        return goog.global.HTMLIFrameElement && "sandbox" in goog.global.HTMLIFrameElement.prototype
    };
    goog.html.SafeHtml.createScriptSrc = function(a, b) {
        goog.html.TrustedResourceUrl.unwrap(a);
        var c = goog.html.SafeHtml.combineAttributes({
            src: a
        }, {}, b);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", c)
    };
    goog.html.SafeHtml.createScript = function(a, b) {
        for (var c in b) {
            var d = c.toLowerCase();
            if ("language" == d || "src" == d || "text" == d || "type" == d) throw Error('Cannot set "' + d + '" attribute');
        }
        c = "";
        a = goog.array.concat(a);
        for (d = 0; d < a.length; d++) c += goog.html.SafeScript.unwrap(a[d]);
        c = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, goog.i18n.bidi.Dir.NEUTRAL);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", b, c)
    };
    goog.html.SafeHtml.createStyle = function(a, b) {
        var c = goog.html.SafeHtml.combineAttributes({
                type: "text/css"
            }, {}, b),
            d = "";
        a = goog.array.concat(a);
        for (var e = 0; e < a.length; e++) d += goog.html.SafeStyleSheet.unwrap(a[e]);
        d = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(d, goog.i18n.bidi.Dir.NEUTRAL);
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", c, d)
    };
    goog.html.SafeHtml.createMetaRefresh = function(a, b) {
        var c = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a));
        (goog.labs.userAgent.browser.isIE() || goog.labs.userAgent.browser.isEdge()) && goog.string.contains(c, ";") && (c = "'" + c.replace(/'/g, "%27") + "'");
        return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", {
            "http-equiv": "refresh",
            content: (b || 0) + "; url=" + c
        })
    };
    goog.html.SafeHtml.getAttrNameAndValue_ = function(a, b, c) {
        if (c instanceof goog.string.Const) c = goog.string.Const.unwrap(c);
        else if ("style" == b.toLowerCase()) c = goog.html.SafeHtml.getStyleValue_(c);
        else {
            if (/^on/i.test(b)) throw Error('Attribute "' + b + '" requires goog.string.Const value, "' + c + '" given.');
            if (b.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_)
                if (c instanceof goog.html.TrustedResourceUrl) c = goog.html.TrustedResourceUrl.unwrap(c);
                else if (c instanceof goog.html.SafeUrl) c = goog.html.SafeUrl.unwrap(c);
            else if (goog.isString(c)) c = goog.html.SafeUrl.sanitize(c).getTypedStringValue();
            else throw Error('Attribute "' + b + '" on tag "' + a + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + c + '" given.');
        }
        c.implementsGoogStringTypedString && (c = c.getTypedStringValue());
        goog.asserts.assert(goog.isString(c) || goog.isNumber(c), "String or number value expected, got " + typeof c + " with value: " + c);
        return b + '="' + goog.string.htmlEscape(String(c)) + '"'
    };
    goog.html.SafeHtml.getStyleValue_ = function(a) {
        if (!goog.isObject(a)) throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a + " given: " + a);
        a instanceof goog.html.SafeStyle || (a = goog.html.SafeStyle.create(a));
        return goog.html.SafeStyle.unwrap(a)
    };
    goog.html.SafeHtml.createWithDir = function(a, b, c, d) {
        b = goog.html.SafeHtml.create(b, c, d);
        b.dir_ = a;
        return b
    };
    goog.html.SafeHtml.concat = function(a) {
        var b = goog.i18n.bidi.Dir.NEUTRAL,
            c = "",
            d = function(a) {
                goog.isArray(a) ? goog.array.forEach(a, d) : (a = goog.html.SafeHtml.htmlEscape(a), c += goog.html.SafeHtml.unwrap(a), a = a.getDirection(), b == goog.i18n.bidi.Dir.NEUTRAL ? b = a : a != goog.i18n.bidi.Dir.NEUTRAL && b != a && (b = null))
            };
        goog.array.forEach(arguments, d);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, b)
    };
    goog.html.SafeHtml.concatWithDir = function(a, b) {
        var c = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
        c.dir_ = a;
        return c
    };
    goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
    goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function(a, b) {
        return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a, b)
    };
    goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a, b) {
        this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
        this.dir_ = b;
        return this
    };
    goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function(a, b, c) {
        var d = null,
            e;
        e = "<" + a + goog.html.SafeHtml.stringifyAttributes(a, b);
        goog.isDefAndNotNull(c) ? goog.isArray(c) || (c = [c]) : c = [];
        goog.dom.tags.isVoidTag(a.toLowerCase()) ? (goog.asserts.assert(!c.length, "Void tag <" + a + "> does not allow content."), e += ">") : (d = goog.html.SafeHtml.concat(c), e += ">" + goog.html.SafeHtml.unwrap(d) + "</" + a + ">", d = d.getDirection());
        (a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? goog.i18n.bidi.Dir.NEUTRAL : null);
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e, d)
    };
    goog.html.SafeHtml.stringifyAttributes = function(a, b) {
        var c = "";
        if (b)
            for (var d in b) {
                if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(d)) throw Error('Invalid attribute name "' + d + '".');
                var e = b[d];
                goog.isDefAndNotNull(e) && (c += " " + goog.html.SafeHtml.getAttrNameAndValue_(a, d, e))
            }
        return c
    };
    goog.html.SafeHtml.combineAttributes = function(a, b, c) {
        var d = {},
            e;
        for (e in a) goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = a[e];
        for (e in b) goog.asserts.assert(e.toLowerCase() == e, "Must be lower case"), d[e] = b[e];
        for (e in c) {
            var f = e.toLowerCase();
            if (f in a) throw Error('Cannot override "' + f + '" attribute, got "' + e + '" with value "' + c[e] + '"');
            f in b && delete d[f];
            d[e] = c[e]
        }
        return d
    };
    goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL);
    goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL);
    goog.html.SafeHtml.BR = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>", goog.i18n.bidi.Dir.NEUTRAL);
    goog.html.legacyconversions = {};
    goog.html.legacyconversions.safeHtmlFromString = function(a) {
        goog.html.legacyconversions.reportCallback_();
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(a, null)
    };
    goog.html.legacyconversions.safeStyleFromString = function(a) {
        goog.html.legacyconversions.reportCallback_();
        return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a)
    };
    goog.html.legacyconversions.safeStyleSheetFromString = function(a) {
        goog.html.legacyconversions.reportCallback_();
        return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)
    };
    goog.html.legacyconversions.safeUrlFromString = function(a) {
        goog.html.legacyconversions.reportCallback_();
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)
    };
    goog.html.legacyconversions.trustedResourceUrlFromString = function(a) {
        goog.html.legacyconversions.reportCallback_();
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a)
    };
    goog.html.legacyconversions.reportCallback_ = goog.nullFunction;
    goog.html.legacyconversions.setReportCallback = function(a) {
        goog.html.legacyconversions.reportCallback_ = a
    };
    goog.html.uncheckedconversions = {};
    goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function(a, b, c) {
        goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
        goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
        return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b, c || null)
    };
    goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function(a, b) {
        goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
        goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
        return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b)
    };
    goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function(a, b) {
        goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
        goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
        return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)
    };
    goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function(a, b) {
        goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
        goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
        return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)
    };
    goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
        goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
        goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
        return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b)
    };
    goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
        goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
        goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
        return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)
    };
    goog.dom.safe = {};
    goog.dom.safe.InsertAdjacentHtmlPosition = {
        AFTERBEGIN: "afterbegin",
        AFTEREND: "afterend",
        BEFOREBEGIN: "beforebegin",
        BEFOREEND: "beforeend"
    };
    goog.dom.safe.insertAdjacentHtml = function(a, b, c) {
        a.insertAdjacentHTML(b, goog.html.SafeHtml.unwrap(c))
    };
    goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_ = {
        MATH: !0,
        SCRIPT: !0,
        STYLE: !0,
        SVG: !0,
        TEMPLATE: !0
    };
    goog.dom.safe.setInnerHtml = function(a, b) {
        if (goog.asserts.ENABLE_ASSERTS) {
            var c = a.tagName.toUpperCase();
            if (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[c]) throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + a.tagName + ".");
        }
        a.innerHTML = goog.html.SafeHtml.unwrap(b)
    };
    goog.dom.safe.setOuterHtml = function(a, b) {
        a.outerHTML = goog.html.SafeHtml.unwrap(b)
    };
    goog.dom.safe.setStyle = function(a, b) {
        a.style.cssText = goog.html.SafeStyle.unwrap(b)
    };
    goog.dom.safe.documentWrite = function(a, b) {
        a.write(goog.html.SafeHtml.unwrap(b))
    };
    goog.dom.safe.setAnchorHref = function(a, b) {
        goog.dom.safe.assertIsHTMLAnchorElement_(a);
        var c;
        c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
        a.href = goog.html.SafeUrl.unwrap(c)
    };
    goog.dom.safe.setImageSrc = function(a, b) {
        goog.dom.safe.assertIsHTMLImageElement_(a);
        var c;
        c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
        a.src = goog.html.SafeUrl.unwrap(c)
    };
    goog.dom.safe.setEmbedSrc = function(a, b) {
        goog.dom.safe.assertIsHTMLEmbedElement_(a);
        a.src = goog.html.TrustedResourceUrl.unwrap(b)
    };
    goog.dom.safe.setFrameSrc = function(a, b) {
        goog.dom.safe.assertIsHTMLFrameElement_(a);
        a.src = goog.html.TrustedResourceUrl.unwrap(b)
    };
    goog.dom.safe.setIframeSrc = function(a, b) {
        goog.dom.safe.assertIsHTMLIFrameElement_(a);
        a.src = goog.html.TrustedResourceUrl.unwrap(b)
    };
    goog.dom.safe.setIframeSrcdoc = function(a, b) {
        goog.dom.safe.assertIsHTMLIFrameElement_(a);
        a.srcdoc = goog.html.SafeHtml.unwrap(b)
    };
    goog.dom.safe.setLinkHrefAndRel = function(a, b, c) {
        goog.dom.safe.assertIsHTMLLinkElement_(a);
        a.rel = c;
        goog.string.caseInsensitiveContains(c, "stylesheet") ? (goog.asserts.assert(b instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'), a.href = goog.html.TrustedResourceUrl.unwrap(b)) : a.href = b instanceof goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap(b) : b instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap(b) : goog.html.SafeUrl.sanitize(b).getTypedStringValue()
    };
    goog.dom.safe.setObjectData = function(a, b) {
        goog.dom.safe.assertIsHTMLObjectElement_(a);
        a.data = goog.html.TrustedResourceUrl.unwrap(b)
    };
    goog.dom.safe.setScriptSrc = function(a, b) {
        goog.dom.safe.assertIsHTMLScriptElement_(a);
        a.src = goog.html.TrustedResourceUrl.unwrap(b)
    };
    goog.dom.safe.setLocationHref = function(a, b) {
        goog.dom.safe.assertIsLocation_(a);
        var c;
        c = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
        a.href = goog.html.SafeUrl.unwrap(c)
    };
    goog.dom.safe.openInWindow = function(a, b, c, d, e) {
        a = a instanceof goog.html.SafeUrl ? a : goog.html.SafeUrl.sanitize(a);
        return (b || window).open(goog.html.SafeUrl.unwrap(a), c ? goog.string.Const.unwrap(c) : "", d, e)
    };
    goog.dom.safe.assertIsLocation_ = function(a) {
        goog.asserts.ENABLE_ASSERTS && "undefined" != typeof Location && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof Location || !(a instanceof Element)), "Argument is not a Location (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
        return a
    };
    goog.dom.safe.assertIsHTMLAnchorElement_ = function(a) {
        goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLAnchorElement && "undefined" != typeof Location && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLAnchorElement || !(a instanceof Location || a instanceof Element)), "Argument is not a HTMLAnchorElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
        return a
    };
    goog.dom.safe.assertIsHTMLLinkElement_ = function(a) {
        goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLLinkElement && "undefined" != typeof Location && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLLinkElement || !(a instanceof Location || a instanceof Element)), "Argument is not a HTMLLinkElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
        return a
    };
    goog.dom.safe.assertIsHTMLImageElement_ = function(a) {
        goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLImageElement && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLImageElement || !(a instanceof Element)), "Argument is not a HTMLImageElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
        return a
    };
    goog.dom.safe.assertIsHTMLEmbedElement_ = function(a) {
        goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLEmbedElement && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLEmbedElement || !(a instanceof Element)), "Argument is not a HTMLEmbedElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
        return a
    };
    goog.dom.safe.assertIsHTMLFrameElement_ = function(a) {
        goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLFrameElement && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLFrameElement || !(a instanceof Element)), "Argument is not a HTMLFrameElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
        return a
    };
    goog.dom.safe.assertIsHTMLIFrameElement_ = function(a) {
        goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLIFrameElement && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLIFrameElement || !(a instanceof Element)), "Argument is not a HTMLIFrameElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
        return a
    };
    goog.dom.safe.assertIsHTMLObjectElement_ = function(a) {
        goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLObjectElement && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLObjectElement || !(a instanceof Element)), "Argument is not a HTMLObjectElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
        return a
    };
    goog.dom.safe.assertIsHTMLScriptElement_ = function(a) {
        goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLScriptElement && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLScriptElement || !(a instanceof Element)), "Argument is not a HTMLScriptElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
        return a
    };
    goog.dom.safe.debugStringForType_ = function(a) {
        return goog.isObject(a) ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : void 0 === a ? "undefined" : null === a ? "null" : typeof a
    };
    goog.dom.BrowserFeature = {
        CAN_ADD_NAME_OR_TYPE_ATTRIBUTES: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
        CAN_USE_CHILDREN_ATTRIBUTE: !goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"),
        CAN_USE_INNER_TEXT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
        CAN_USE_PARENT_ELEMENT_PROPERTY: goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT,
        INNER_HTML_NEEDS_SCOPED_ELEMENT: goog.userAgent.IE,
        LEGACY_IE_RANGES: goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)
    };
    goog.dom.ASSUME_QUIRKS_MODE = !1;
    goog.dom.ASSUME_STANDARDS_MODE = !1;
    goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
    goog.dom.getDomHelper = function(a) {
        return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
    };
    goog.dom.getDocument = function() {
        return document
    };
    goog.dom.getElement = function(a) {
        return goog.dom.getElementHelper_(document, a)
    };
    goog.dom.getElementHelper_ = function(a, b) {
        return goog.isString(b) ? a.getElementById(b) : b
    };
    goog.dom.getRequiredElement = function(a) {
        return goog.dom.getRequiredElementHelper_(document, a)
    };
    goog.dom.getRequiredElementHelper_ = function(a, b) {
        goog.asserts.assertString(b);
        var c = goog.dom.getElementHelper_(a, b);
        return c = goog.asserts.assertElement(c, "No element found with id: " + b)
    };
    goog.dom.$ = goog.dom.getElement;
    goog.dom.getElementsByTagName = function(a, b) {
        return (b || document).getElementsByTagName(String(a))
    };
    goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
        return goog.dom.getElementsByTagNameAndClass_(document, a, b, c)
    };
    goog.dom.getElementsByClass = function(a, b) {
        var c = b || document;
        return goog.dom.canUseQuerySelector_(c) ? c.querySelectorAll("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)
    };
    goog.dom.getElementByClass = function(a, b) {
        var c = b || document,
            d = null;
        return (d = c.getElementsByClassName ? c.getElementsByClassName(a)[0] : goog.dom.canUseQuerySelector_(c) ? c.querySelector("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)[0]) || null
    };
    goog.dom.getRequiredElementByClass = function(a, b) {
        var c = goog.dom.getElementByClass(a, b);
        return goog.asserts.assert(c, "No element found with className: " + a)
    };
    goog.dom.canUseQuerySelector_ = function(a) {
        return !(!a.querySelectorAll || !a.querySelector)
    };
    goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
        a = d || a;
        b = b && "*" != b ? String(b).toUpperCase() : "";
        if (goog.dom.canUseQuerySelector_(a) && (b || c)) return a.querySelectorAll(b + (c ? "." + c : ""));
        if (c && a.getElementsByClassName) {
            a = a.getElementsByClassName(c);
            if (b) {
                d = {};
                for (var e = 0, f = 0, g; g = a[f]; f++) b == g.nodeName && (d[e++] = g);
                d.length = e;
                return d
            }
            return a
        }
        a = a.getElementsByTagName(b || "*");
        if (c) {
            d = {};
            for (f = e = 0; g = a[f]; f++) b = g.className, "function" == typeof b.split && goog.array.contains(b.split(/\s+/), c) && (d[e++] = g);
            d.length = e;
            return d
        }
        return a
    };
    goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
    goog.dom.setProperties = function(a, b) {
        goog.object.forEach(b, function(b, d) {
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(d) ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : goog.string.startsWith(d, "aria-") || goog.string.startsWith(d, "data-") ? a.setAttribute(d, b) : a[d] = b
        })
    };
    goog.dom.DIRECT_ATTRIBUTE_MAP_ = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };
    goog.dom.getViewportSize = function(a) {
        return goog.dom.getViewportSize_(a || window)
    };
    goog.dom.getViewportSize_ = function(a) {
        a = a.document;
        a = goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body;
        return new goog.math.Size(a.clientWidth, a.clientHeight)
    };
    goog.dom.getDocumentHeight = function() {
        return goog.dom.getDocumentHeight_(window)
    };
    goog.dom.getDocumentHeightForWindow = function(a) {
        return goog.dom.getDocumentHeight_(a)
    };
    goog.dom.getDocumentHeight_ = function(a) {
        var b = a.document,
            c = 0;
        if (b) {
            var c = b.body,
                d = b.documentElement;
            if (!d || !c) return 0;
            a = goog.dom.getViewportSize_(a).height;
            if (goog.dom.isCss1CompatMode_(b) && d.scrollHeight) c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
            else {
                var b = d.scrollHeight,
                    e = d.offsetHeight;
                d.clientHeight != e && (b = c.scrollHeight, e = c.offsetHeight);
                c = b > a ? b > e ? b : e : b < e ? b : e
            }
        }
        return c
    };
    goog.dom.getPageScroll = function(a) {
        return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll()
    };
    goog.dom.getDocumentScroll = function() {
        return goog.dom.getDocumentScroll_(document)
    };
    goog.dom.getDocumentScroll_ = function(a) {
        var b = goog.dom.getDocumentScrollElement_(a);
        a = goog.dom.getWindow_(a);
        return goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && a.pageYOffset != b.scrollTop ? new goog.math.Coordinate(b.scrollLeft, b.scrollTop) : new goog.math.Coordinate(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
    };
    goog.dom.getDocumentScrollElement = function() {
        return goog.dom.getDocumentScrollElement_(document)
    };
    goog.dom.getDocumentScrollElement_ = function(a) {
        return a.scrollingElement ? a.scrollingElement : !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body || a.documentElement
    };
    goog.dom.getWindow = function(a) {
        return a ? goog.dom.getWindow_(a) : window
    };
    goog.dom.getWindow_ = function(a) {
        return a.parentWindow || a.defaultView
    };
    goog.dom.createDom = function(a, b, c) {
        return goog.dom.createDom_(document, arguments)
    };
    goog.dom.createDom_ = function(a, b) {
        var c = String(b[0]),
            d = b[1];
        if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
            c = ["<", c];
            d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
            if (d.type) {
                c.push(' type="', goog.string.htmlEscape(d.type), '"');
                var e = {};
                goog.object.extend(e, d);
                delete e.type;
                d = e
            }
            c.push(">");
            c = c.join("")
        }
        c = a.createElement(c);
        d && (goog.isString(d) ? c.className = d : goog.isArray(d) ? c.className = d.join(" ") : goog.dom.setProperties(c, d));
        2 < b.length && goog.dom.append_(a,
            c, b, 2);
        return c
    };
    goog.dom.append_ = function(a, b, c, d) {
        function e(c) {
            c && b.appendChild(goog.isString(c) ? a.createTextNode(c) : c)
        }
        for (; d < c.length; d++) {
            var f = c[d];
            goog.isArrayLike(f) && !goog.dom.isNodeLike(f) ? goog.array.forEach(goog.dom.isNodeList(f) ? goog.array.toArray(f) : f, e) : e(f)
        }
    };
    goog.dom.$dom = goog.dom.createDom;
    goog.dom.createElement = function(a) {
        return goog.dom.createElement_(document, a)
    };
    goog.dom.createElement_ = function(a, b) {
        return a.createElement(String(b))
    };
    goog.dom.createTextNode = function(a) {
        return document.createTextNode(String(a))
    };
    goog.dom.createTable = function(a, b, c) {
        return goog.dom.createTable_(document, a, b, !!c)
    };
    goog.dom.createTable_ = function(a, b, c, d) {
        for (var e = goog.dom.createElement_(a, goog.dom.TagName.TABLE), f = e.appendChild(goog.dom.createElement_(a, goog.dom.TagName.TBODY)), g = 0; g < b; g++) {
            for (var h = goog.dom.createElement_(a, goog.dom.TagName.TR), k = 0; k < c; k++) {
                var l = goog.dom.createElement_(a, goog.dom.TagName.TD);
                d && goog.dom.setTextContent(l, goog.string.Unicode.NBSP);
                h.appendChild(l)
            }
            f.appendChild(h)
        }
        return e
    };
    goog.dom.constHtmlToNode = function(a) {
        var b = goog.array.map(arguments, goog.string.Const.unwrap),
            b = goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Constant HTML string, that gets turned into a Node later, so it will be automatically balanced."), b.join(""));
        return goog.dom.safeHtmlToNode(b)
    };
    goog.dom.safeHtmlToNode = function(a) {
        return goog.dom.safeHtmlToNode_(document, a)
    };
    goog.dom.safeHtmlToNode_ = function(a, b) {
        var c = goog.dom.createElement_(a, goog.dom.TagName.DIV);
        goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (goog.dom.safe.setInnerHtml(c, goog.html.SafeHtml.concat(goog.html.SafeHtml.BR, b)), c.removeChild(c.firstChild)) : goog.dom.safe.setInnerHtml(c, b);
        return goog.dom.childrenToNode_(a, c)
    };
    goog.dom.childrenToNode_ = function(a, b) {
        if (1 == b.childNodes.length) return b.removeChild(b.firstChild);
        for (var c = a.createDocumentFragment(); b.firstChild;) c.appendChild(b.firstChild);
        return c
    };
    goog.dom.isCss1CompatMode = function() {
        return goog.dom.isCss1CompatMode_(document)
    };
    goog.dom.isCss1CompatMode_ = function(a) {
        return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == a.compatMode
    };
    goog.dom.canHaveChildren = function(a) {
        if (a.nodeType != goog.dom.NodeType.ELEMENT) return !1;
        switch (a.tagName) {
            case String(goog.dom.TagName.APPLET):
            case String(goog.dom.TagName.AREA):
            case String(goog.dom.TagName.BASE):
            case String(goog.dom.TagName.BR):
            case String(goog.dom.TagName.COL):
            case String(goog.dom.TagName.COMMAND):
            case String(goog.dom.TagName.EMBED):
            case String(goog.dom.TagName.FRAME):
            case String(goog.dom.TagName.HR):
            case String(goog.dom.TagName.IMG):
            case String(goog.dom.TagName.INPUT):
            case String(goog.dom.TagName.IFRAME):
            case String(goog.dom.TagName.ISINDEX):
            case String(goog.dom.TagName.KEYGEN):
            case String(goog.dom.TagName.LINK):
            case String(goog.dom.TagName.NOFRAMES):
            case String(goog.dom.TagName.NOSCRIPT):
            case String(goog.dom.TagName.META):
            case String(goog.dom.TagName.OBJECT):
            case String(goog.dom.TagName.PARAM):
            case String(goog.dom.TagName.SCRIPT):
            case String(goog.dom.TagName.SOURCE):
            case String(goog.dom.TagName.STYLE):
            case String(goog.dom.TagName.TRACK):
            case String(goog.dom.TagName.WBR):
                return !1
        }
        return !0
    };
    goog.dom.appendChild = function(a, b) {
        a.appendChild(b)
    };
    goog.dom.append = function(a, b) {
        goog.dom.append_(goog.dom.getOwnerDocument(a), a, arguments, 1)
    };
    goog.dom.removeChildren = function(a) {
        for (var b; b = a.firstChild;) a.removeChild(b)
    };
    goog.dom.insertSiblingBefore = function(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b)
    };
    goog.dom.insertSiblingAfter = function(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
    };
    goog.dom.insertChildAt = function(a, b, c) {
        a.insertBefore(b, a.childNodes[c] || null)
    };
    goog.dom.removeNode = function(a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    };
    goog.dom.replaceNode = function(a, b) {
        var c = b.parentNode;
        c && c.replaceChild(a, b)
    };
    goog.dom.flattenElement = function(a) {
        var b, c = a.parentNode;
        if (c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
            if (a.removeNode) return a.removeNode(!1);
            for (; b = a.firstChild;) c.insertBefore(b, a);
            return goog.dom.removeNode(a)
        }
    };
    goog.dom.getChildren = function(a) {
        return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != a.children ? a.children : goog.array.filter(a.childNodes, function(a) {
            return a.nodeType == goog.dom.NodeType.ELEMENT
        })
    };
    goog.dom.getFirstElementChild = function(a) {
        return goog.isDef(a.firstElementChild) ? a.firstElementChild : goog.dom.getNextElementNode_(a.firstChild, !0)
    };
    goog.dom.getLastElementChild = function(a) {
        return goog.isDef(a.lastElementChild) ? a.lastElementChild : goog.dom.getNextElementNode_(a.lastChild, !1)
    };
    goog.dom.getNextElementSibling = function(a) {
        return goog.isDef(a.nextElementSibling) ? a.nextElementSibling : goog.dom.getNextElementNode_(a.nextSibling, !0)
    };
    goog.dom.getPreviousElementSibling = function(a) {
        return goog.isDef(a.previousElementSibling) ? a.previousElementSibling : goog.dom.getNextElementNode_(a.previousSibling, !1)
    };
    goog.dom.getNextElementNode_ = function(a, b) {
        for (; a && a.nodeType != goog.dom.NodeType.ELEMENT;) a = b ? a.nextSibling : a.previousSibling;
        return a
    };
    goog.dom.getNextNode = function(a) {
        if (!a) return null;
        if (a.firstChild) return a.firstChild;
        for (; a && !a.nextSibling;) a = a.parentNode;
        return a ? a.nextSibling : null
    };
    goog.dom.getPreviousNode = function(a) {
        if (!a) return null;
        if (!a.previousSibling) return a.parentNode;
        for (a = a.previousSibling; a && a.lastChild;) a = a.lastChild;
        return a
    };
    goog.dom.isNodeLike = function(a) {
        return goog.isObject(a) && 0 < a.nodeType
    };
    goog.dom.isElement = function(a) {
        return goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT
    };
    goog.dom.isWindow = function(a) {
        return goog.isObject(a) && a.window == a
    };
    goog.dom.getParentElement = function(a) {
        var b;
        if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY && !(goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10") && goog.global.SVGElement && a instanceof goog.global.SVGElement) && (b = a.parentElement)) return b;
        b = a.parentNode;
        return goog.dom.isElement(b) ? b : null
    };
    goog.dom.contains = function(a, b) {
        if (!a || !b) return !1;
        if (a.contains && b.nodeType == goog.dom.NodeType.ELEMENT) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };
    goog.dom.compareNodeOrder = function(a, b) {
        if (a == b) return 0;
        if (a.compareDocumentPosition) return a.compareDocumentPosition(b) & 2 ? 1 : -1;
        if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
            if (a.nodeType == goog.dom.NodeType.DOCUMENT) return -1;
            if (b.nodeType == goog.dom.NodeType.DOCUMENT) return 1
        }
        if ("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
            var c = a.nodeType == goog.dom.NodeType.ELEMENT,
                d = b.nodeType == goog.dom.NodeType.ELEMENT;
            if (c && d) return a.sourceIndex - b.sourceIndex;
            var e = a.parentNode,
                f = b.parentNode;
            return e == f ? goog.dom.compareSiblingOrder_(a, b) : !c && goog.dom.contains(e, b) ? -1 * goog.dom.compareParentsDescendantNodeIe_(a, b) : !d && goog.dom.contains(f, a) ? goog.dom.compareParentsDescendantNodeIe_(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex)
        }
        d = goog.dom.getOwnerDocument(a);
        c = d.createRange();
        c.selectNode(a);
        c.collapse(!0);
        d = d.createRange();
        d.selectNode(b);
        d.collapse(!0);
        return c.compareBoundaryPoints(goog.global.Range.START_TO_END, d)
    };
    goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
        var c = a.parentNode;
        if (c == b) return -1;
        for (var d = b; d.parentNode != c;) d = d.parentNode;
        return goog.dom.compareSiblingOrder_(d, a)
    };
    goog.dom.compareSiblingOrder_ = function(a, b) {
        for (var c = b; c = c.previousSibling;)
            if (c == a) return -1;
        return 1
    };
    goog.dom.findCommonAncestor = function(a) {
        var b, c = arguments.length;
        if (!c) return null;
        if (1 == c) return arguments[0];
        var d = [],
            e = Infinity;
        for (b = 0; b < c; b++) {
            for (var f = [], g = arguments[b]; g;) f.unshift(g), g = g.parentNode;
            d.push(f);
            e = Math.min(e, f.length)
        }
        f = null;
        for (b = 0; b < e; b++) {
            for (var g = d[0][b], h = 1; h < c; h++)
                if (g != d[h][b]) return f;
            f = g
        }
        return f
    };
    goog.dom.getOwnerDocument = function(a) {
        goog.asserts.assert(a, "Node cannot be null or undefined.");
        return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document
    };
    goog.dom.getFrameContentDocument = function(a) {
        return a.contentDocument || a.contentWindow.document
    };
    goog.dom.getFrameContentWindow = function(a) {
        try {
            return a.contentWindow || (a.contentDocument ? goog.dom.getWindow(a.contentDocument) : null)
        } catch (b) {}
        return null
    };
    goog.dom.setTextContent = function(a, b) {
        goog.asserts.assert(null != a, "goog.dom.setTextContent expects a non-null value for node");
        if ("textContent" in a) a.textContent = b;
        else if (a.nodeType == goog.dom.NodeType.TEXT) a.data = b;
        else if (a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
            for (; a.lastChild != a.firstChild;) a.removeChild(a.lastChild);
            a.firstChild.data = b
        } else {
            goog.dom.removeChildren(a);
            var c = goog.dom.getOwnerDocument(a);
            a.appendChild(c.createTextNode(String(b)))
        }
    };
    goog.dom.getOuterHtml = function(a) {
        goog.asserts.assert(null !== a, "goog.dom.getOuterHtml expects a non-null value for element");
        if ("outerHTML" in a) return a.outerHTML;
        var b = goog.dom.getOwnerDocument(a),
            b = goog.dom.createElement_(b, goog.dom.TagName.DIV);
        b.appendChild(a.cloneNode(!0));
        return b.innerHTML
    };
    goog.dom.findNode = function(a, b) {
        var c = [];
        return goog.dom.findNodes_(a, b, c, !0) ? c[0] : void 0
    };
    goog.dom.findNodes = function(a, b) {
        var c = [];
        goog.dom.findNodes_(a, b, c, !1);
        return c
    };
    goog.dom.findNodes_ = function(a, b, c, d) {
        if (null != a)
            for (a = a.firstChild; a;) {
                if (b(a) && (c.push(a), d) || goog.dom.findNodes_(a, b, c, d)) return !0;
                a = a.nextSibling
            }
        return !1
    };
    goog.dom.TAGS_TO_IGNORE_ = {
        SCRIPT: 1,
        STYLE: 1,
        HEAD: 1,
        IFRAME: 1,
        OBJECT: 1
    };
    goog.dom.PREDEFINED_TAG_VALUES_ = {
        IMG: " ",
        BR: "\n"
    };
    goog.dom.isFocusableTabIndex = function(a) {
        return goog.dom.hasSpecifiedTabIndex_(a) && goog.dom.isTabIndexFocusable_(a)
    };
    goog.dom.setFocusableTabIndex = function(a, b) {
        b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
    };
    goog.dom.isFocusable = function(a) {
        var b;
        return (b = goog.dom.nativelySupportsFocus_(a) ? !a.disabled && (!goog.dom.hasSpecifiedTabIndex_(a) || goog.dom.isTabIndexFocusable_(a)) : goog.dom.isFocusableTabIndex(a)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(a) : b
    };
    goog.dom.hasSpecifiedTabIndex_ = function(a) {
        return goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9") ? (a = a.getAttributeNode("tabindex"), goog.isDefAndNotNull(a) && a.specified) : a.hasAttribute("tabindex")
    };
    goog.dom.isTabIndexFocusable_ = function(a) {
        a = a.tabIndex;
        return goog.isNumber(a) && 0 <= a && 32768 > a
    };
    goog.dom.nativelySupportsFocus_ = function(a) {
        return a.tagName == goog.dom.TagName.A || a.tagName == goog.dom.TagName.INPUT || a.tagName == goog.dom.TagName.TEXTAREA || a.tagName == goog.dom.TagName.SELECT || a.tagName == goog.dom.TagName.BUTTON
    };
    goog.dom.hasNonZeroBoundingRect_ = function(a) {
        a = !goog.isFunction(a.getBoundingClientRect) || goog.userAgent.IE && null == a.parentElement ? {
            height: a.offsetHeight,
            width: a.offsetWidth
        } : a.getBoundingClientRect();
        return goog.isDefAndNotNull(a) && 0 < a.height && 0 < a.width
    };
    goog.dom.getTextContent = function(a) {
        if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && null !== a && "innerText" in a) a = goog.string.canonicalizeNewlines(a.innerText);
        else {
            var b = [];
            goog.dom.getTextContent_(a, b, !0);
            a = b.join("")
        }
        a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
        a = a.replace(/\u200B/g, "");
        goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (a = a.replace(/ +/g, " "));
        " " != a && (a = a.replace(/^\s*/, ""));
        return a
    };
    goog.dom.getRawTextContent = function(a) {
        var b = [];
        goog.dom.getTextContent_(a, b, !1);
        return b.join("")
    };
    goog.dom.getTextContent_ = function(a, b, c) {
        if (!(a.nodeName in goog.dom.TAGS_TO_IGNORE_))
            if (a.nodeType == goog.dom.NodeType.TEXT) c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
            else if (a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName]);
        else
            for (a = a.firstChild; a;) goog.dom.getTextContent_(a, b, c), a = a.nextSibling
    };
    goog.dom.getNodeTextLength = function(a) {
        return goog.dom.getTextContent(a).length
    };
    goog.dom.getNodeTextOffset = function(a, b) {
        for (var c = b || goog.dom.getOwnerDocument(a).body, d = []; a && a != c;) {
            for (var e = a; e = e.previousSibling;) d.unshift(goog.dom.getTextContent(e));
            a = a.parentNode
        }
        return goog.string.trimLeft(d.join("")).replace(/ +/g, " ").length
    };
    goog.dom.getNodeAtOffset = function(a, b, c) {
        a = [a];
        for (var d = 0, e = null; 0 < a.length && d < b;)
            if (e = a.pop(), !(e.nodeName in goog.dom.TAGS_TO_IGNORE_))
                if (e.nodeType == goog.dom.NodeType.TEXT) var f = e.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "),
                    d = d + f.length;
                else if (e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) d += goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length;
        else
            for (f = e.childNodes.length - 1; 0 <= f; f--) a.push(e.childNodes[f]);
        goog.isObject(c) && (c.remainder = e ? e.nodeValue.length + b - d - 1 : 0, c.node = e);
        return e
    };
    goog.dom.isNodeList = function(a) {
        if (a && "number" == typeof a.length) {
            if (goog.isObject(a)) return "function" == typeof a.item || "string" == typeof a.item;
            if (goog.isFunction(a)) return "function" == typeof a.item
        }
        return !1
    };
    goog.dom.getAncestorByTagNameAndClass = function(a, b, c, d) {
        if (!b && !c) return null;
        var e = b ? String(b).toUpperCase() : null;
        return goog.dom.getAncestor(a, function(a) {
            return (!e || a.nodeName == e) && (!c || goog.isString(a.className) && goog.array.contains(a.className.split(/\s+/), c))
        }, !0, d)
    };
    goog.dom.getAncestorByClass = function(a, b, c) {
        return goog.dom.getAncestorByTagNameAndClass(a, null, b, c)
    };
    goog.dom.getAncestor = function(a, b, c, d) {
        a && !c && (a = a.parentNode);
        for (c = 0; a && (null == d || c <= d);) {
            goog.asserts.assert("parentNode" != a.name);
            if (b(a)) return a;
            a = a.parentNode;
            c++
        }
        return null
    };
    goog.dom.getActiveElement = function(a) {
        try {
            return a && a.activeElement
        } catch (b) {}
        return null
    };
    goog.dom.getPixelRatio = function() {
        var a = goog.dom.getWindow();
        return goog.isDef(a.devicePixelRatio) ? a.devicePixelRatio : a.matchMedia ? goog.dom.matchesPixelRatio_(3) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(1) || .75 : 1
    };
    goog.dom.matchesPixelRatio_ = function(a) {
        return goog.dom.getWindow().matchMedia("(min-resolution: " + a + "dppx),(min--moz-device-pixel-ratio: " + a + "),(min-resolution: " + 96 * a + "dpi)").matches ? a : 0
    };
    goog.dom.getCanvasContext2D = function(a) {
        return a.getContext("2d")
    };
    goog.dom.DomHelper = function(a) {
        this.document_ = a || goog.global.document || document
    };
    goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
    goog.dom.DomHelper.prototype.setDocument = function(a) {
        this.document_ = a
    };
    goog.dom.DomHelper.prototype.getDocument = function() {
        return this.document_
    };
    goog.dom.DomHelper.prototype.getElement = function(a) {
        return goog.dom.getElementHelper_(this.document_, a)
    };
    goog.dom.DomHelper.prototype.getRequiredElement = function(a) {
        return goog.dom.getRequiredElementHelper_(this.document_, a)
    };
    goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
    goog.dom.DomHelper.prototype.getElementsByTagName = function(a, b) {
        return (b || this.document_).getElementsByTagName(String(a))
    };
    goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
        return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c)
    };
    goog.dom.DomHelper.prototype.getElementsByClass = function(a, b) {
        return goog.dom.getElementsByClass(a, b || this.document_)
    };
    goog.dom.DomHelper.prototype.getElementByClass = function(a, b) {
        return goog.dom.getElementByClass(a, b || this.document_)
    };
    goog.dom.DomHelper.prototype.getRequiredElementByClass = function(a, b) {
        return goog.dom.getRequiredElementByClass(a, b || this.document_)
    };
    goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
    goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
    goog.dom.DomHelper.prototype.getViewportSize = function(a) {
        return goog.dom.getViewportSize(a || this.getWindow())
    };
    goog.dom.DomHelper.prototype.getDocumentHeight = function() {
        return goog.dom.getDocumentHeight_(this.getWindow())
    };
    goog.dom.DomHelper.prototype.createDom = function(a, b, c) {
        return goog.dom.createDom_(this.document_, arguments)
    };
    goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
    goog.dom.DomHelper.prototype.createElement = function(a) {
        return goog.dom.createElement_(this.document_, a)
    };
    goog.dom.DomHelper.prototype.createTextNode = function(a) {
        return this.document_.createTextNode(String(a))
    };
    goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
        return goog.dom.createTable_(this.document_, a, b, !!c)
    };
    goog.dom.DomHelper.prototype.safeHtmlToNode = function(a) {
        return goog.dom.safeHtmlToNode_(this.document_, a)
    };
    goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
        return goog.dom.isCss1CompatMode_(this.document_)
    };
    goog.dom.DomHelper.prototype.getWindow = function() {
        return goog.dom.getWindow_(this.document_)
    };
    goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
        return goog.dom.getDocumentScrollElement_(this.document_)
    };
    goog.dom.DomHelper.prototype.getDocumentScroll = function() {
        return goog.dom.getDocumentScroll_(this.document_)
    };
    goog.dom.DomHelper.prototype.getActiveElement = function(a) {
        return goog.dom.getActiveElement(a || this.document_)
    };
    goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
    goog.dom.DomHelper.prototype.append = goog.dom.append;
    goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
    goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
    goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
    goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
    goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
    goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
    goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
    goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
    goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
    goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
    goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
    goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
    goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
    goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
    goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
    goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
    goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
    goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
    goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
    goog.dom.DomHelper.prototype.contains = goog.dom.contains;
    goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
    goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
    goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
    goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
    goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
    goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
    goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
    goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
    goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
    goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
    goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
    goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable;
    goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
    goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
    goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
    goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
    goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
    goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
    goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
    goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
    goog.dom.DomHelper.prototype.getCanvasContext2D = goog.dom.getCanvasContext2D;
    goog.dom.iframe = {};
    goog.dom.iframe.BLANK_SOURCE = goog.userAgent.IE ? 'javascript:""' : "about:blank";
    goog.dom.iframe.BLANK_SOURCE_NEW_FRAME = goog.userAgent.IE ? 'javascript:""' : "javascript:undefined";
    goog.dom.iframe.STYLES_ = "border:0;vertical-align:bottom;";
    goog.dom.iframe.createBlank = function(a, b) {
        var c;
        c = b ? goog.html.SafeStyle.unwrap(b) : "";
        return a.createDom(goog.dom.TagName.IFRAME, {
            frameborder: 0,
            style: goog.dom.iframe.STYLES_ + c,
            src: goog.dom.iframe.BLANK_SOURCE
        })
    };
    goog.dom.iframe.writeSafeContent = function(a, b) {
        var c = goog.dom.getFrameContentDocument(a);
        c.open();
        goog.dom.safe.documentWrite(c, b);
        c.close()
    };
    goog.dom.iframe.createWithContent = function(a, b, c, d, e) {
        var f = goog.dom.getDomHelper(a);
        b = goog.html.SafeHtml.create("html", {}, goog.html.SafeHtml.concat(goog.html.SafeHtml.create("head", {}, b), goog.html.SafeHtml.create("body", {}, c)));
        e || (b = goog.html.SafeHtml.concat(goog.html.SafeHtml.DOCTYPE_HTML, b));
        d = goog.dom.iframe.createBlank(f, d);
        a.appendChild(d);
        goog.dom.iframe.writeSafeContent(d, b);
        return d
    };
    goog.dom.dataset = {};
    goog.dom.dataset.ALLOWED_ = !goog.userAgent.product.IE && !goog.labs.userAgent.browser.isSafari();
    goog.dom.dataset.PREFIX_ = "data-";
    goog.dom.dataset.set = function(a, b, c) {
        goog.dom.dataset.ALLOWED_ && a.dataset ? a.dataset[b] = c : a.setAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b), c)
    };
    goog.dom.dataset.get = function(a, b) {
        return goog.dom.dataset.ALLOWED_ && a.dataset ? b in a.dataset ? a.dataset[b] : null : a.getAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b))
    };
    goog.dom.dataset.remove = function(a, b) {
        goog.dom.dataset.ALLOWED_ && a.dataset ? goog.dom.dataset.has(a, b) && delete a.dataset[b] : a.removeAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b))
    };
    goog.dom.dataset.has = function(a, b) {
        return goog.dom.dataset.ALLOWED_ && a.dataset ? b in a.dataset : a.hasAttribute ? a.hasAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b)) : !!a.getAttribute(goog.dom.dataset.PREFIX_ + goog.string.toSelectorCase(b))
    };
    goog.dom.dataset.getAll = function(a) {
        if (goog.dom.dataset.ALLOWED_ && a.dataset) return a.dataset;
        var b = {};
        a = a.attributes;
        for (var c = 0; c < a.length; ++c) {
            var d = a[c];
            if (goog.string.startsWith(d.name, goog.dom.dataset.PREFIX_)) {
                var e = goog.string.toCamelCase(d.name.substr(5));
                b[e] = d.value
            }
        }
        return b
    };
    goog.dom.vendor = {};
    goog.dom.vendor.getVendorJsPrefix = function() {
        return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null
    };
    goog.dom.vendor.getVendorPrefix = function() {
        return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null
    };
    goog.dom.vendor.getPrefixedPropertyName = function(a, b) {
        if (b && a in b) return a;
        var c = goog.dom.vendor.getVendorJsPrefix();
        return c ? (c = c.toLowerCase(), c += goog.string.toTitleCase(a), !goog.isDef(b) || c in b ? c : null) : null
    };
    goog.dom.vendor.getPrefixedEventType = function(a) {
        return ((goog.dom.vendor.getVendorJsPrefix() || "") + a).toLowerCase()
    };
    goog.disposable = {};
    goog.disposable.IDisposable = function() {};
    goog.Disposable = function() {
        goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.INCLUDE_STACK_ON_CREATION && (this.creationStack = Error().stack), goog.Disposable.instances_[goog.getUid(this)] = this);
        this.disposed_ = this.disposed_;
        this.onDisposeCallbacks_ = this.onDisposeCallbacks_
    };
    goog.Disposable.MonitoringMode = {
        OFF: 0,
        PERMANENT: 1,
        INTERACTIVE: 2
    };
    goog.Disposable.MONITORING_MODE = 0;
    goog.Disposable.INCLUDE_STACK_ON_CREATION = !0;
    goog.Disposable.instances_ = {};
    goog.Disposable.getUndisposedObjects = function() {
        var a = [],
            b;
        for (b in goog.Disposable.instances_) goog.Disposable.instances_.hasOwnProperty(b) && a.push(goog.Disposable.instances_[Number(b)]);
        return a
    };
    goog.Disposable.clearUndisposedObjects = function() {
        goog.Disposable.instances_ = {}
    };
    goog.Disposable.prototype.disposed_ = !1;
    goog.Disposable.prototype.isDisposed = function() {
        return this.disposed_
    };
    goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
    goog.Disposable.prototype.dispose = function() {
        if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
            var a = goog.getUid(this);
            if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(a)) throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
            delete goog.Disposable.instances_[a]
        }
    };
    goog.Disposable.prototype.registerDisposable = function(a) {
        this.addOnDisposeCallback(goog.partial(goog.dispose, a))
    };
    goog.Disposable.prototype.addOnDisposeCallback = function(a, b) {
        this.disposed_ ? goog.isDef(b) ? a.call(b) : a() : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []), this.onDisposeCallbacks_.push(goog.isDef(b) ? goog.bind(a, b) : a))
    };
    goog.Disposable.prototype.disposeInternal = function() {
        if (this.onDisposeCallbacks_)
            for (; this.onDisposeCallbacks_.length;) this.onDisposeCallbacks_.shift()()
    };
    goog.Disposable.isDisposed = function(a) {
        return a && "function" == typeof a.isDisposed ? a.isDisposed() : !1
    };
    goog.dispose = function(a) {
        a && "function" == typeof a.dispose && a.dispose()
    };
    goog.disposeAll = function(a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            var d = arguments[b];
            goog.isArrayLike(d) ? goog.disposeAll.apply(null, d) : goog.dispose(d)
        }
    };
    goog.events.Event = function(a, b) {
        this.type = a instanceof goog.events.EventId ? String(a) : a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.propagationStopped_ = !1;
        this.returnValue_ = !0
    };
    goog.events.Event.prototype.stopPropagation = function() {
        this.propagationStopped_ = !0
    };
    goog.events.Event.prototype.preventDefault = function() {
        this.defaultPrevented = !0;
        this.returnValue_ = !1
    };
    goog.events.Event.stopPropagation = function(a) {
        a.stopPropagation()
    };
    goog.events.Event.preventDefault = function(a) {
        a.preventDefault()
    };
    goog.events.BrowserEvent = function(a, b) {
        goog.events.Event.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.key = "";
        this.charCode = this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.platformModifierKey = !1;
        this.event_ = null;
        a && this.init(a, b)
    };
    goog.inherits(goog.events.BrowserEvent, goog.events.Event);
    goog.events.BrowserEvent.MouseButton = {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2
    };
    goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
    goog.events.BrowserEvent.prototype.init = function(a, b) {
        var c = this.type = a.type,
            d = a.changedTouches ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var e = a.relatedTarget;
        e ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(e, "nodeName") || (e = null)) : c == goog.events.EventType.MOUSEOVER ? e = a.fromElement : c == goog.events.EventType.MOUSEOUT && (e = a.toElement);
        this.relatedTarget = e;
        goog.isNull(d) ? (this.offsetX = goog.userAgent.WEBKIT || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY =
            goog.userAgent.WEBKIT || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0);
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.key = a.key || "";
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey =
            a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.platformModifierKey = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
        this.state = a.state;
        this.event_ = a;
        a.defaultPrevented && this.preventDefault()
    };
    goog.events.BrowserEvent.prototype.isButton = function(a) {
        return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == a : "click" == this.type ? a == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[a])
    };
    goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
        return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
    };
    goog.events.BrowserEvent.prototype.stopPropagation = function() {
        goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
        this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
    };
    goog.events.BrowserEvent.prototype.preventDefault = function() {
        goog.events.BrowserEvent.superClass_.preventDefault.call(this);
        var a = this.event_;
        if (a.preventDefault) a.preventDefault();
        else if (a.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        } catch (b) {}
    };
    goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
        return this.event_
    };
    goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (1E6 * Math.random() | 0);
    goog.events.onString_ = "on";
    goog.events.onStringMap_ = {};
    goog.events.CaptureSimulationMode = {
        OFF_AND_FAIL: 0,
        OFF_AND_SILENT: 1,
        ON: 2
    };
    goog.events.CAPTURE_SIMULATION_MODE = 2;
    goog.events.listenerCountEstimate_ = 0;
    goog.events.listen = function(a, b, c, d, e) {
        if (goog.isArray(b)) {
            for (var f = 0; f < b.length; f++) goog.events.listen(a, b[f], c, d, e);
            return null
        }
        c = goog.events.wrapListener(c);
        return goog.events.Listenable.isImplementedBy(a) ? a.listen(b, c, d, e) : goog.events.listen_(a, b, c, !1, d, e)
    };
    goog.events.listen_ = function(a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var g = !!e;
        if (g && !goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
            if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_FAIL) return goog.asserts.fail("Can not register capture listener in IE8-."), null;
            if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_SILENT) return null
        }
        var h = goog.events.getListenerMap_(a);
        h || (a[goog.events.LISTENER_MAP_PROP_] = h = new goog.events.ListenerMap(a));
        c = h.add(b, c, d, e, f);
        if (c.proxy) return c;
        d = goog.events.getProxy();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) a.addEventListener(b.toString(), d, g);
        else if (a.attachEvent) a.attachEvent(goog.events.getOnString_(b.toString()), d);
        else throw Error("addEventListener and attachEvent are unavailable.");
        goog.events.listenerCountEstimate_++;
        return c
    };
    goog.events.getProxy = function() {
        var a = goog.events.handleBrowserEvent_,
            b = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ? function(c) {
                return a.call(b.src, b.listener, c)
            } : function(c) {
                c = a.call(b.src, b.listener, c);
                if (!c) return c
            };
        return b
    };
    goog.events.listenOnce = function(a, b, c, d, e) {
        if (goog.isArray(b)) {
            for (var f = 0; f < b.length; f++) goog.events.listenOnce(a, b[f], c, d, e);
            return null
        }
        c = goog.events.wrapListener(c);
        return goog.events.Listenable.isImplementedBy(a) ? a.listenOnce(b, c, d, e) : goog.events.listen_(a, b, c, !0, d, e)
    };
    goog.events.listenWithWrapper = function(a, b, c, d, e) {
        b.listen(a, c, d, e)
    };
    goog.events.unlisten = function(a, b, c, d, e) {
        if (goog.isArray(b)) {
            for (var f = 0; f < b.length; f++) goog.events.unlisten(a, b[f], c, d, e);
            return null
        }
        c = goog.events.wrapListener(c);
        if (goog.events.Listenable.isImplementedBy(a)) return a.unlisten(b, c, d, e);
        if (!a) return !1;
        d = !!d;
        if (a = goog.events.getListenerMap_(a))
            if (b = a.getListener(b, c, d, e)) return goog.events.unlistenByKey(b);
        return !1
    };
    goog.events.unlistenByKey = function(a) {
        if (goog.isNumber(a) || !a || a.removed) return !1;
        var b = a.src;
        if (goog.events.Listenable.isImplementedBy(b)) return b.unlistenByKey(a);
        var c = a.type,
            d = a.proxy;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(goog.events.getOnString_(c), d);
        goog.events.listenerCountEstimate_--;
        (c = goog.events.getListenerMap_(b)) ? (c.removeByKey(a), 0 == c.getTypeCount() && (c.src = null, b[goog.events.LISTENER_MAP_PROP_] = null)) : a.markAsRemoved();
        return !0
    };
    goog.events.unlistenWithWrapper = function(a, b, c, d, e) {
        b.unlisten(a, c, d, e)
    };
    goog.events.removeAll = function(a, b) {
        if (!a) return 0;
        if (goog.events.Listenable.isImplementedBy(a)) return a.removeAllListeners(b);
        var c = goog.events.getListenerMap_(a);
        if (!c) return 0;
        var d = 0,
            e = b && b.toString(),
            f;
        for (f in c.listeners)
            if (!e || f == e)
                for (var g = c.listeners[f].concat(), h = 0; h < g.length; ++h) goog.events.unlistenByKey(g[h]) && ++d;
        return d
    };
    goog.events.getListeners = function(a, b, c) {
        return goog.events.Listenable.isImplementedBy(a) ? a.getListeners(b, c) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListeners(b, c) : [] : []
    };
    goog.events.getListener = function(a, b, c, d, e) {
        c = goog.events.wrapListener(c);
        d = !!d;
        return goog.events.Listenable.isImplementedBy(a) ? a.getListener(b, c, d, e) : a ? (a = goog.events.getListenerMap_(a)) ? a.getListener(b, c, d, e) : null : null
    };
    goog.events.hasListener = function(a, b, c) {
        if (goog.events.Listenable.isImplementedBy(a)) return a.hasListener(b, c);
        a = goog.events.getListenerMap_(a);
        return !!a && a.hasListener(b, c)
    };
    goog.events.expose = function(a) {
        var b = [],
            c;
        for (c in a) a[c] && a[c].id ? b.push(c + " = " + a[c] + " (" + a[c].id + ")") : b.push(c + " = " + a[c]);
        return b.join("\n")
    };
    goog.events.getOnString_ = function(a) {
        return a in goog.events.onStringMap_ ? goog.events.onStringMap_[a] : goog.events.onStringMap_[a] = goog.events.onString_ + a
    };
    goog.events.fireListeners = function(a, b, c, d) {
        return goog.events.Listenable.isImplementedBy(a) ? a.fireListeners(b, c, d) : goog.events.fireListeners_(a, b, c, d)
    };
    goog.events.fireListeners_ = function(a, b, c, d) {
        var e = !0;
        if (a = goog.events.getListenerMap_(a))
            if (b = a.listeners[b.toString()])
                for (b = b.concat(), a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.capture == c && !f.removed && (f = goog.events.fireListener(f, d), e = e && !1 !== f)
                }
            return e
    };
    goog.events.fireListener = function(a, b) {
        var c = a.listener,
            d = a.handler || a.src;
        a.callOnce && goog.events.unlistenByKey(a);
        return c.call(d, b)
    };
    goog.events.getTotalListenerCount = function() {
        return goog.events.listenerCountEstimate_
    };
    goog.events.dispatchEvent = function(a, b) {
        goog.asserts.assert(goog.events.Listenable.isImplementedBy(a), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance.");
        return a.dispatchEvent(b)
    };
    goog.events.protectBrowserEventEntryPoint = function(a) {
        goog.events.handleBrowserEvent_ = a.protectEntryPoint(goog.events.handleBrowserEvent_)
    };
    goog.events.handleBrowserEvent_ = function(a, b) {
        if (a.removed) return !0;
        if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
            var c = b || goog.getObjectByName("window.event"),
                d = new goog.events.BrowserEvent(c, this),
                e = !0;
            if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.ON) {
                if (!goog.events.isMarkedIeEvent_(c)) {
                    goog.events.markIeEvent_(c);
                    for (var c = [], f = d.currentTarget; f; f = f.parentNode) c.push(f);
                    for (var f = a.type, g = c.length - 1; !d.propagationStopped_ && 0 <= g; g--) {
                        d.currentTarget = c[g];
                        var h =
                            goog.events.fireListeners_(c[g], f, !0, d),
                            e = e && h
                    }
                    for (g = 0; !d.propagationStopped_ && g < c.length; g++) d.currentTarget = c[g], h = goog.events.fireListeners_(c[g], f, !1, d), e = e && h
                }
            } else e = goog.events.fireListener(a, d);
            return e
        }
        return goog.events.fireListener(a, new goog.events.BrowserEvent(b, this))
    };
    goog.events.markIeEvent_ = function(a) {
        var b = !1;
        if (0 == a.keyCode) try {
            a.keyCode = -1;
            return
        } catch (c) {
            b = !0
        }
        if (b || void 0 == a.returnValue) a.returnValue = !0
    };
    goog.events.isMarkedIeEvent_ = function(a) {
        return 0 > a.keyCode || void 0 != a.returnValue
    };
    goog.events.uniqueIdCounter_ = 0;
    goog.events.getUniqueId = function(a) {
        return a + "_" + goog.events.uniqueIdCounter_++
    };
    goog.events.getListenerMap_ = function(a) {
        a = a[goog.events.LISTENER_MAP_PROP_];
        return a instanceof goog.events.ListenerMap ? a : null
    };
    goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
    goog.events.wrapListener = function(a) {
        goog.asserts.assert(a, "Listener can not be null.");
        if (goog.isFunction(a)) return a;
        goog.asserts.assert(a.handleEvent, "An object listener must have handleEvent method.");
        a[goog.events.LISTENER_WRAPPER_PROP_] || (a[goog.events.LISTENER_WRAPPER_PROP_] = function(b) {
            return a.handleEvent(b)
        });
        return a[goog.events.LISTENER_WRAPPER_PROP_]
    };
    goog.debug.entryPointRegistry.register(function(a) {
        goog.events.handleBrowserEvent_ = a(goog.events.handleBrowserEvent_)
    });
    goog.events.EventTarget = function() {
        goog.Disposable.call(this);
        this.eventTargetListeners_ = new goog.events.ListenerMap(this);
        this.actualEventTarget_ = this;
        this.parentEventTarget_ = null
    };
    goog.inherits(goog.events.EventTarget, goog.Disposable);
    goog.events.Listenable.addImplementation(goog.events.EventTarget);
    goog.events.EventTarget.MAX_ANCESTORS_ = 1E3;
    goog.events.EventTarget.prototype.getParentEventTarget = function() {
        return this.parentEventTarget_
    };
    goog.events.EventTarget.prototype.setParentEventTarget = function(a) {
        this.parentEventTarget_ = a
    };
    goog.events.EventTarget.prototype.addEventListener = function(a, b, c, d) {
        goog.events.listen(this, a, b, c, d)
    };
    goog.events.EventTarget.prototype.removeEventListener = function(a, b, c, d) {
        goog.events.unlisten(this, a, b, c, d)
    };
    goog.events.EventTarget.prototype.dispatchEvent = function(a) {
        this.assertInitialized_();
        var b, c = this.getParentEventTarget();
        if (c) {
            b = [];
            for (var d = 1; c; c = c.getParentEventTarget()) b.push(c), goog.asserts.assert(++d < goog.events.EventTarget.MAX_ANCESTORS_, "infinite loop")
        }
        return goog.events.EventTarget.dispatchEventInternal_(this.actualEventTarget_, a, b)
    };
    goog.events.EventTarget.prototype.disposeInternal = function() {
        goog.events.EventTarget.superClass_.disposeInternal.call(this);
        this.removeAllListeners();
        this.parentEventTarget_ = null
    };
    goog.events.EventTarget.prototype.listen = function(a, b, c, d) {
        this.assertInitialized_();
        return this.eventTargetListeners_.add(String(a), b, !1, c, d)
    };
    goog.events.EventTarget.prototype.listenOnce = function(a, b, c, d) {
        return this.eventTargetListeners_.add(String(a), b, !0, c, d)
    };
    goog.events.EventTarget.prototype.unlisten = function(a, b, c, d) {
        return this.eventTargetListeners_.remove(String(a), b, c, d)
    };
    goog.events.EventTarget.prototype.unlistenByKey = function(a) {
        return this.eventTargetListeners_.removeByKey(a)
    };
    goog.events.EventTarget.prototype.removeAllListeners = function(a) {
        return this.eventTargetListeners_ ? this.eventTargetListeners_.removeAll(a) : 0
    };
    goog.events.EventTarget.prototype.fireListeners = function(a, b, c) {
        a = this.eventTargetListeners_.listeners[String(a)];
        if (!a) return !0;
        a = a.concat();
        for (var d = !0, e = 0; e < a.length; ++e) {
            var f = a[e];
            if (f && !f.removed && f.capture == b) {
                var g = f.listener,
                    h = f.handler || f.src;
                f.callOnce && this.unlistenByKey(f);
                d = !1 !== g.call(h, c) && d
            }
        }
        return d && 0 != c.returnValue_
    };
    goog.events.EventTarget.prototype.getListeners = function(a, b) {
        return this.eventTargetListeners_.getListeners(String(a), b)
    };
    goog.events.EventTarget.prototype.getListener = function(a, b, c, d) {
        return this.eventTargetListeners_.getListener(String(a), b, c, d)
    };
    goog.events.EventTarget.prototype.hasListener = function(a, b) {
        var c = goog.isDef(a) ? String(a) : void 0;
        return this.eventTargetListeners_.hasListener(c, b)
    };
    goog.events.EventTarget.prototype.setTargetForTesting = function(a) {
        this.actualEventTarget_ = a
    };
    goog.events.EventTarget.prototype.assertInitialized_ = function() {
        goog.asserts.assert(this.eventTargetListeners_, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
    };
    goog.events.EventTarget.dispatchEventInternal_ = function(a, b, c) {
        var d = b.type || b;
        if (goog.isString(b)) b = new goog.events.Event(b, a);
        else if (b instanceof goog.events.Event) b.target = b.target || a;
        else {
            var e = b;
            b = new goog.events.Event(d, a);
            goog.object.extend(b, e)
        }
        var e = !0,
            f;
        if (c)
            for (var g = c.length - 1; !b.propagationStopped_ && 0 <= g; g--) f = b.currentTarget = c[g], e = f.fireListeners(d, !0, b) && e;
        b.propagationStopped_ || (f = b.currentTarget = a, e = f.fireListeners(d, !0, b) && e, b.propagationStopped_ || (e = f.fireListeners(d, !1, b) && e));
        if (c)
            for (g = 0; !b.propagationStopped_ && g < c.length; g++) f = b.currentTarget = c[g], e = f.fireListeners(d, !1, b) && e;
        return e
    };
    goog.fx.TransitionBase = function() {
        goog.events.EventTarget.call(this);
        this.state_ = goog.fx.TransitionBase.State.STOPPED;
        this.endTime = this.startTime = null
    };
    goog.inherits(goog.fx.TransitionBase, goog.events.EventTarget);
    goog.fx.TransitionBase.State = {
        STOPPED: 0,
        PAUSED: -1,
        PLAYING: 1
    };
    goog.fx.TransitionBase.prototype.getStateInternal = function() {
        return this.state_
    };
    goog.fx.TransitionBase.prototype.setStatePlaying = function() {
        this.state_ = goog.fx.TransitionBase.State.PLAYING
    };
    goog.fx.TransitionBase.prototype.setStatePaused = function() {
        this.state_ = goog.fx.TransitionBase.State.PAUSED
    };
    goog.fx.TransitionBase.prototype.setStateStopped = function() {
        this.state_ = goog.fx.TransitionBase.State.STOPPED
    };
    goog.fx.TransitionBase.prototype.isPlaying = function() {
        return this.state_ == goog.fx.TransitionBase.State.PLAYING
    };
    goog.fx.TransitionBase.prototype.isPaused = function() {
        return this.state_ == goog.fx.TransitionBase.State.PAUSED
    };
    goog.fx.TransitionBase.prototype.isStopped = function() {
        return this.state_ == goog.fx.TransitionBase.State.STOPPED
    };
    goog.fx.TransitionBase.prototype.onBegin = function() {
        this.dispatchAnimationEvent(goog.fx.Transition.EventType.BEGIN)
    };
    goog.fx.TransitionBase.prototype.onEnd = function() {
        this.dispatchAnimationEvent(goog.fx.Transition.EventType.END)
    };
    goog.fx.TransitionBase.prototype.onFinish = function() {
        this.dispatchAnimationEvent(goog.fx.Transition.EventType.FINISH)
    };
    goog.fx.TransitionBase.prototype.onPause = function() {
        this.dispatchAnimationEvent(goog.fx.Transition.EventType.PAUSE)
    };
    goog.fx.TransitionBase.prototype.onPlay = function() {
        this.dispatchAnimationEvent(goog.fx.Transition.EventType.PLAY)
    };
    goog.fx.TransitionBase.prototype.onResume = function() {
        this.dispatchAnimationEvent(goog.fx.Transition.EventType.RESUME)
    };
    goog.fx.TransitionBase.prototype.onStop = function() {
        this.dispatchAnimationEvent(goog.fx.Transition.EventType.STOP)
    };
    goog.fx.TransitionBase.prototype.dispatchAnimationEvent = function(a) {
        this.dispatchEvent(a)
    };
    goog.events.KeyHandler = function(a, b) {
        goog.events.EventTarget.call(this);
        a && this.attach(a, b)
    };
    goog.inherits(goog.events.KeyHandler, goog.events.EventTarget);
    goog.events.KeyHandler.prototype.element_ = null;
    goog.events.KeyHandler.prototype.keyPressKey_ = null;
    goog.events.KeyHandler.prototype.keyDownKey_ = null;
    goog.events.KeyHandler.prototype.keyUpKey_ = null;
    goog.events.KeyHandler.prototype.lastKey_ = -1;
    goog.events.KeyHandler.prototype.keyCode_ = -1;
    goog.events.KeyHandler.prototype.altKey_ = !1;
    goog.events.KeyHandler.EventType = {
        KEY: "key"
    };
    goog.events.KeyHandler.safariKey_ = {
        3: goog.events.KeyCodes.ENTER,
        12: goog.events.KeyCodes.NUMLOCK,
        63232: goog.events.KeyCodes.UP,
        63233: goog.events.KeyCodes.DOWN,
        63234: goog.events.KeyCodes.LEFT,
        63235: goog.events.KeyCodes.RIGHT,
        63236: goog.events.KeyCodes.F1,
        63237: goog.events.KeyCodes.F2,
        63238: goog.events.KeyCodes.F3,
        63239: goog.events.KeyCodes.F4,
        63240: goog.events.KeyCodes.F5,
        63241: goog.events.KeyCodes.F6,
        63242: goog.events.KeyCodes.F7,
        63243: goog.events.KeyCodes.F8,
        63244: goog.events.KeyCodes.F9,
        63245: goog.events.KeyCodes.F10,
        63246: goog.events.KeyCodes.F11,
        63247: goog.events.KeyCodes.F12,
        63248: goog.events.KeyCodes.PRINT_SCREEN,
        63272: goog.events.KeyCodes.DELETE,
        63273: goog.events.KeyCodes.HOME,
        63275: goog.events.KeyCodes.END,
        63276: goog.events.KeyCodes.PAGE_UP,
        63277: goog.events.KeyCodes.PAGE_DOWN,
        63289: goog.events.KeyCodes.NUMLOCK,
        63302: goog.events.KeyCodes.INSERT
    };
    goog.events.KeyHandler.keyIdentifier_ = {
        Up: goog.events.KeyCodes.UP,
        Down: goog.events.KeyCodes.DOWN,
        Left: goog.events.KeyCodes.LEFT,
        Right: goog.events.KeyCodes.RIGHT,
        Enter: goog.events.KeyCodes.ENTER,
        F1: goog.events.KeyCodes.F1,
        F2: goog.events.KeyCodes.F2,
        F3: goog.events.KeyCodes.F3,
        F4: goog.events.KeyCodes.F4,
        F5: goog.events.KeyCodes.F5,
        F6: goog.events.KeyCodes.F6,
        F7: goog.events.KeyCodes.F7,
        F8: goog.events.KeyCodes.F8,
        F9: goog.events.KeyCodes.F9,
        F10: goog.events.KeyCodes.F10,
        F11: goog.events.KeyCodes.F11,
        F12: goog.events.KeyCodes.F12,
        "U+007F": goog.events.KeyCodes.DELETE,
        Home: goog.events.KeyCodes.HOME,
        End: goog.events.KeyCodes.END,
        PageUp: goog.events.KeyCodes.PAGE_UP,
        PageDown: goog.events.KeyCodes.PAGE_DOWN,
        Insert: goog.events.KeyCodes.INSERT
    };
    goog.events.KeyHandler.USES_KEYDOWN_ = goog.userAgent.IE || goog.userAgent.EDGE || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("525");
    goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ = goog.userAgent.MAC && goog.userAgent.GECKO;
    goog.events.KeyHandler.prototype.handleKeyDown_ = function(a) {
        (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && (this.lastKey_ == goog.events.KeyCodes.CTRL && !a.ctrlKey || this.lastKey_ == goog.events.KeyCodes.ALT && !a.altKey || goog.userAgent.MAC && this.lastKey_ == goog.events.KeyCodes.META && !a.metaKey) && this.resetState(); - 1 == this.lastKey_ && (a.ctrlKey && a.keyCode != goog.events.KeyCodes.CTRL ? this.lastKey_ = goog.events.KeyCodes.CTRL : a.altKey && a.keyCode != goog.events.KeyCodes.ALT ? this.lastKey_ = goog.events.KeyCodes.ALT : a.metaKey &&
            a.keyCode != goog.events.KeyCodes.META && (this.lastKey_ = goog.events.KeyCodes.META));
        goog.events.KeyHandler.USES_KEYDOWN_ && !goog.events.KeyCodes.firesKeyPressEvent(a.keyCode, this.lastKey_, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? this.handleEvent(a) : (this.keyCode_ = goog.events.KeyCodes.normalizeKeyCode(a.keyCode), goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (this.altKey_ = a.altKey))
    };
    goog.events.KeyHandler.prototype.resetState = function() {
        this.keyCode_ = this.lastKey_ = -1
    };
    goog.events.KeyHandler.prototype.handleKeyup_ = function(a) {
        this.resetState();
        this.altKey_ = a.altKey
    };
    goog.events.KeyHandler.prototype.handleEvent = function(a) {
        var b = a.getBrowserEvent(),
            c, d, e = b.altKey;
        goog.userAgent.IE && a.type == goog.events.EventType.KEYPRESS ? (c = this.keyCode_, d = c != goog.events.KeyCodes.ENTER && c != goog.events.KeyCodes.ESC ? b.keyCode : 0) : (goog.userAgent.WEBKIT || goog.userAgent.EDGE) && a.type == goog.events.EventType.KEYPRESS ? (c = this.keyCode_, d = 0 <= b.charCode && 63232 > b.charCode && goog.events.KeyCodes.isCharacterKey(c) ? b.charCode : 0) : goog.userAgent.OPERA && !goog.userAgent.WEBKIT ? (c = this.keyCode_, d =
            goog.events.KeyCodes.isCharacterKey(c) ? b.keyCode : 0) : (c = b.keyCode || this.keyCode_, d = b.charCode || 0, goog.events.KeyHandler.SAVE_ALT_FOR_KEYPRESS_ && (e = this.altKey_), goog.userAgent.MAC && d == goog.events.KeyCodes.QUESTION_MARK && c == goog.events.KeyCodes.WIN_KEY && (c = goog.events.KeyCodes.SLASH));
        var f = c = goog.events.KeyCodes.normalizeKeyCode(c);
        c ? 63232 <= c && c in goog.events.KeyHandler.safariKey_ ? f = goog.events.KeyHandler.safariKey_[c] : 25 == c && a.shiftKey && (f = 9) : b.keyIdentifier && b.keyIdentifier in goog.events.KeyHandler.keyIdentifier_ &&
            (f = goog.events.KeyHandler.keyIdentifier_[b.keyIdentifier]);
        a = f == this.lastKey_;
        this.lastKey_ = f;
        b = new goog.events.KeyEvent(f, d, a, b);
        b.altKey = e;
        this.dispatchEvent(b)
    };
    goog.events.KeyHandler.prototype.getElement = function() {
        return this.element_
    };
    goog.events.KeyHandler.prototype.attach = function(a, b) {
        this.keyUpKey_ && this.detach();
        this.element_ = a;
        this.keyPressKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYPRESS, this, b);
        this.keyDownKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYDOWN, this.handleKeyDown_, b, this);
        this.keyUpKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYUP, this.handleKeyup_, b, this)
    };
    goog.events.KeyHandler.prototype.detach = function() {
        this.keyPressKey_ && (goog.events.unlistenByKey(this.keyPressKey_), goog.events.unlistenByKey(this.keyDownKey_), goog.events.unlistenByKey(this.keyUpKey_), this.keyUpKey_ = this.keyDownKey_ = this.keyPressKey_ = null);
        this.element_ = null;
        this.keyCode_ = this.lastKey_ = -1
    };
    goog.events.KeyHandler.prototype.disposeInternal = function() {
        goog.events.KeyHandler.superClass_.disposeInternal.call(this);
        this.detach()
    };
    goog.events.KeyEvent = function(a, b, c, d) {
        goog.events.BrowserEvent.call(this, d);
        this.type = goog.events.KeyHandler.EventType.KEY;
        this.keyCode = a;
        this.charCode = b;
        this.repeat = c
    };
    goog.inherits(goog.events.KeyEvent, goog.events.BrowserEvent);
    goog.events.EventHandler = function(a) {
        goog.Disposable.call(this);
        this.handler_ = a;
        this.keys_ = {}
    };
    goog.inherits(goog.events.EventHandler, goog.Disposable);
    goog.events.EventHandler.typeArray_ = [];
    goog.events.EventHandler.prototype.listen = function(a, b, c, d) {
        return this.listen_(a, b, c, d)
    };
    goog.events.EventHandler.prototype.listenWithScope = function(a, b, c, d, e) {
        return this.listen_(a, b, c, d, e)
    };
    goog.events.EventHandler.prototype.listen_ = function(a, b, c, d, e) {
        goog.isArray(b) || (b && (goog.events.EventHandler.typeArray_[0] = b.toString()), b = goog.events.EventHandler.typeArray_);
        for (var f = 0; f < b.length; f++) {
            var g = goog.events.listen(a, b[f], c || this.handleEvent, d || !1, e || this.handler_ || this);
            if (!g) break;
            this.keys_[g.key] = g
        }
        return this
    };
    goog.events.EventHandler.prototype.listenOnce = function(a, b, c, d) {
        return this.listenOnce_(a, b, c, d)
    };
    goog.events.EventHandler.prototype.listenOnceWithScope = function(a, b, c, d, e) {
        return this.listenOnce_(a, b, c, d, e)
    };
    goog.events.EventHandler.prototype.listenOnce_ = function(a, b, c, d, e) {
        if (goog.isArray(b))
            for (var f = 0; f < b.length; f++) this.listenOnce_(a, b[f], c, d, e);
        else {
            a = goog.events.listenOnce(a, b, c || this.handleEvent, d, e || this.handler_ || this);
            if (!a) return this;
            this.keys_[a.key] = a
        }
        return this
    };
    goog.events.EventHandler.prototype.listenWithWrapper = function(a, b, c, d) {
        return this.listenWithWrapper_(a, b, c, d)
    };
    goog.events.EventHandler.prototype.listenWithWrapperAndScope = function(a, b, c, d, e) {
        return this.listenWithWrapper_(a, b, c, d, e)
    };
    goog.events.EventHandler.prototype.listenWithWrapper_ = function(a, b, c, d, e) {
        b.listen(a, c, d, e || this.handler_ || this, this);
        return this
    };
    goog.events.EventHandler.prototype.getListenerCount = function() {
        var a = 0,
            b;
        for (b in this.keys_) Object.prototype.hasOwnProperty.call(this.keys_, b) && a++;
        return a
    };
    goog.events.EventHandler.prototype.unlisten = function(a, b, c, d, e) {
        if (goog.isArray(b))
            for (var f = 0; f < b.length; f++) this.unlisten(a, b[f], c, d, e);
        else if (a = goog.events.getListener(a, b, c || this.handleEvent, d, e || this.handler_ || this)) goog.events.unlistenByKey(a), delete this.keys_[a.key];
        return this
    };
    goog.events.EventHandler.prototype.unlistenWithWrapper = function(a, b, c, d, e) {
        b.unlisten(a, c, d, e || this.handler_ || this, this);
        return this
    };
    goog.events.EventHandler.prototype.removeAll = function() {
        goog.object.forEach(this.keys_, function(a, b) {
            this.keys_.hasOwnProperty(b) && goog.events.unlistenByKey(a)
        }, this);
        this.keys_ = {}
    };
    goog.events.EventHandler.prototype.disposeInternal = function() {
        goog.events.EventHandler.superClass_.disposeInternal.call(this);
        this.removeAll()
    };
    goog.events.EventHandler.prototype.handleEvent = function(a) {
        throw Error("EventHandler.handleEvent not implemented");
    };
    goog.history.Event = function(a, b) {
        goog.events.Event.call(this, goog.history.EventType.NAVIGATE);
        this.token = a;
        this.isNavigation = b
    };
    goog.inherits(goog.history.Event, goog.events.Event);
    goog.net.ImageLoader = function(a) {
        goog.events.EventTarget.call(this);
        this.imageIdToRequestMap_ = {};
        this.imageIdToImageMap_ = {};
        this.handler_ = new goog.events.EventHandler(this);
        this.parent_ = a
    };
    goog.inherits(goog.net.ImageLoader, goog.events.EventTarget);
    goog.net.ImageLoader.CorsRequestType = {
        ANONYMOUS: "anonymous",
        USE_CREDENTIALS: "use-credentials"
    };
    goog.net.ImageLoader.IMAGE_LOAD_EVENTS_ = [goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("11") ? goog.net.EventType.READY_STATE_CHANGE : goog.events.EventType.LOAD, goog.net.EventType.ABORT, goog.net.EventType.ERROR];
    goog.net.ImageLoader.prototype.addImage = function(a, b, c) {
        (b = goog.isString(b) ? b : b.src) && (this.imageIdToRequestMap_[a] = {
            src: b,
            corsRequestType: goog.isDef(c) ? c : null
        })
    };
    goog.net.ImageLoader.prototype.removeImage = function(a) {
        delete this.imageIdToRequestMap_[a];
        var b = this.imageIdToImageMap_[a];
        b && (delete this.imageIdToImageMap_[a], this.handler_.unlisten(b, goog.net.ImageLoader.IMAGE_LOAD_EVENTS_, this.onNetworkEvent_), goog.object.isEmpty(this.imageIdToImageMap_) && goog.object.isEmpty(this.imageIdToRequestMap_) && this.dispatchEvent(goog.net.EventType.COMPLETE))
    };
    goog.net.ImageLoader.prototype.start = function() {
        var a = this.imageIdToRequestMap_;
        goog.array.forEach(goog.object.getKeys(a), function(b) {
            var c = a[b];
            c && (delete a[b], this.loadImage_(c, b))
        }, this)
    };
    goog.net.ImageLoader.prototype.loadImage_ = function(a, b) {
        if (!this.isDisposed()) {
            var c;
            c = this.parent_ ? goog.dom.getDomHelper(this.parent_).createDom(goog.dom.TagName.IMG) : new Image;
            a.corsRequestType && (c.crossOrigin = a.corsRequestType);
            this.handler_.listen(c, goog.net.ImageLoader.IMAGE_LOAD_EVENTS_, this.onNetworkEvent_);
            this.imageIdToImageMap_[b] = c;
            c.id = b;
            c.src = a.src
        }
    };
    goog.net.ImageLoader.prototype.onNetworkEvent_ = function(a) {
        var b = a.currentTarget;
        if (b) {
            if (a.type == goog.net.EventType.READY_STATE_CHANGE)
                if (b.readyState == goog.net.EventType.COMPLETE) a.type = goog.events.EventType.LOAD;
                else return;
                "undefined" == typeof b.naturalWidth && (a.type == goog.events.EventType.LOAD ? (b.naturalWidth = b.width, b.naturalHeight = b.height) : (b.naturalWidth = 0, b.naturalHeight = 0));
            this.dispatchEvent({
                type: a.type,
                target: b
            });
            this.isDisposed() || this.removeImage(b.id)
        }
    };
    goog.net.ImageLoader.prototype.disposeInternal = function() {
        delete this.imageIdToRequestMap_;
        delete this.imageIdToImageMap_;
        goog.dispose(this.handler_);
        goog.net.ImageLoader.superClass_.disposeInternal.call(this)
    };
    goog.async = {};
    goog.async.FreeList = function(a, b, c) {
        this.limit_ = c;
        this.create_ = a;
        this.reset_ = b;
        this.occupants_ = 0;
        this.head_ = null
    };
    goog.async.FreeList.prototype.get = function() {
        var a;
        0 < this.occupants_ ? (this.occupants_--, a = this.head_, this.head_ = a.next, a.next = null) : a = this.create_();
        return a
    };
    goog.async.FreeList.prototype.put = function(a) {
        this.reset_(a);
        this.occupants_ < this.limit_ && (this.occupants_++, a.next = this.head_, this.head_ = a)
    };
    goog.async.FreeList.prototype.occupants = function() {
        return this.occupants_
    };
    goog.async.WorkQueue = function() {
        this.workTail_ = this.workHead_ = null
    };
    goog.async.WorkQueue.DEFAULT_MAX_UNUSED = 100;
    goog.async.WorkQueue.freelist_ = new goog.async.FreeList(function() {
        return new goog.async.WorkItem
    }, function(a) {
        a.reset()
    }, goog.async.WorkQueue.DEFAULT_MAX_UNUSED);
    goog.async.WorkQueue.prototype.add = function(a, b) {
        var c = this.getUnusedItem_();
        c.set(a, b);
        this.workTail_ ? this.workTail_.next = c : (goog.asserts.assert(!this.workHead_), this.workHead_ = c);
        this.workTail_ = c
    };
    goog.async.WorkQueue.prototype.remove = function() {
        var a = null;
        this.workHead_ && (a = this.workHead_, this.workHead_ = this.workHead_.next, this.workHead_ || (this.workTail_ = null), a.next = null);
        return a
    };
    goog.async.WorkQueue.prototype.returnUnused = function(a) {
        goog.async.WorkQueue.freelist_.put(a)
    };
    goog.async.WorkQueue.prototype.getUnusedItem_ = function() {
        return goog.async.WorkQueue.freelist_.get()
    };
    goog.async.WorkItem = function() {
        this.next = this.scope = this.fn = null
    };
    goog.async.WorkItem.prototype.set = function(a, b) {
        this.fn = a;
        this.scope = b;
        this.next = null
    };
    goog.async.WorkItem.prototype.reset = function() {
        this.next = this.scope = this.fn = null
    };
    goog.async.throwException = function(a) {
        goog.global.setTimeout(function() {
            throw a;
        }, 0)
    };
    goog.async.nextTick = function(a, b, c) {
        var d = a;
        b && (d = goog.bind(a, b));
        d = goog.async.nextTick.wrapCallback_(d);
        goog.isFunction(goog.global.setImmediate) && (c || goog.async.nextTick.useSetImmediate_()) ? goog.global.setImmediate(d) : (goog.async.nextTick.setImmediate_ || (goog.async.nextTick.setImmediate_ = goog.async.nextTick.getSetImmediateEmulator_()), goog.async.nextTick.setImmediate_(d))
    };
    goog.async.nextTick.useSetImmediate_ = function() {
        return goog.global.Window && goog.global.Window.prototype && !goog.labs.userAgent.browser.isEdge() && goog.global.Window.prototype.setImmediate == goog.global.setImmediate ? !1 : !0
    };
    goog.async.nextTick.getSetImmediateEmulator_ = function() {
        var a = goog.global.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !goog.labs.userAgent.engine.isPresto() && (a = function() {
            var a = document.createElement(String(goog.dom.TagName.IFRAME));
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var b = a.contentWindow,
                a = b.document;
            a.open();
            a.write("");
            a.close();
            var c = "callImmediate" + Math.random(),
                d = "file:" == b.location.protocol ?
                "*" : b.location.protocol + "//" + b.location.host,
                a = goog.bind(function(a) {
                    if (("*" == d || a.origin == d) && a.data == c) this.port1.onmessage()
                }, this);
            b.addEventListener("message", a, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    b.postMessage(c, d)
                }
            }
        });
        if ("undefined" !== typeof a && !goog.labs.userAgent.browser.isIE()) {
            var b = new a,
                c = {},
                d = c;
            b.port1.onmessage = function() {
                if (goog.isDef(c.next)) {
                    c = c.next;
                    var a = c.cb;
                    c.cb = null;
                    a()
                }
            };
            return function(a) {
                d.next = {
                    cb: a
                };
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return "undefined" !==
            typeof document && "onreadystatechange" in document.createElement(String(goog.dom.TagName.SCRIPT)) ? function(a) {
                var b = document.createElement(String(goog.dom.TagName.SCRIPT));
                b.onreadystatechange = function() {
                    b.onreadystatechange = null;
                    b.parentNode.removeChild(b);
                    b = null;
                    a();
                    a = null
                };
                document.documentElement.appendChild(b)
            } : function(a) {
                goog.global.setTimeout(a, 0)
            }
    };
    goog.async.nextTick.wrapCallback_ = goog.functions.identity;
    goog.debug.entryPointRegistry.register(function(a) {
        goog.async.nextTick.wrapCallback_ = a
    });
    goog.async.AnimationDelay = function(a, b, c) {
        goog.Disposable.call(this);
        this.id_ = null;
        this.usingListeners_ = !1;
        this.listener_ = a;
        this.handler_ = c;
        this.win_ = b || window;
        this.callback_ = goog.bind(this.doAction_, this)
    };
    goog.inherits(goog.async.AnimationDelay, goog.Disposable);
    goog.async.AnimationDelay.TIMEOUT = 20;
    goog.async.AnimationDelay.MOZ_BEFORE_PAINT_EVENT_ = "MozBeforePaint";
    goog.async.AnimationDelay.prototype.start = function() {
        this.stop();
        this.usingListeners_ = !1;
        var a = this.getRaf_(),
            b = this.getCancelRaf_();
        a && !b && this.win_.mozRequestAnimationFrame ? (this.id_ = goog.events.listen(this.win_, goog.async.AnimationDelay.MOZ_BEFORE_PAINT_EVENT_, this.callback_), this.win_.mozRequestAnimationFrame(null), this.usingListeners_ = !0) : this.id_ = a && b ? a.call(this.win_, this.callback_) : this.win_.setTimeout(goog.functions.lock(this.callback_), goog.async.AnimationDelay.TIMEOUT)
    };
    goog.async.AnimationDelay.prototype.stop = function() {
        if (this.isActive()) {
            var a = this.getRaf_(),
                b = this.getCancelRaf_();
            a && !b && this.win_.mozRequestAnimationFrame ? goog.events.unlistenByKey(this.id_) : a && b ? b.call(this.win_, this.id_) : this.win_.clearTimeout(this.id_)
        }
        this.id_ = null
    };
    goog.async.AnimationDelay.prototype.fire = function() {
        this.stop();
        this.doAction_()
    };
    goog.async.AnimationDelay.prototype.fireIfActive = function() {
        this.isActive() && this.fire()
    };
    goog.async.AnimationDelay.prototype.isActive = function() {
        return null != this.id_
    };
    goog.async.AnimationDelay.prototype.doAction_ = function() {
        this.usingListeners_ && this.id_ && goog.events.unlistenByKey(this.id_);
        this.id_ = null;
        this.listener_.call(this.handler_, goog.now())
    };
    goog.async.AnimationDelay.prototype.disposeInternal = function() {
        this.stop();
        goog.async.AnimationDelay.superClass_.disposeInternal.call(this)
    };
    goog.async.AnimationDelay.prototype.getRaf_ = function() {
        var a = this.win_;
        return a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || null
    };
    goog.async.AnimationDelay.prototype.getCancelRaf_ = function() {
        var a = this.win_;
        return a.cancelAnimationFrame || a.cancelRequestAnimationFrame || a.webkitCancelRequestAnimationFrame || a.mozCancelRequestAnimationFrame || a.oCancelRequestAnimationFrame || a.msCancelRequestAnimationFrame || null
    };
    goog.async.run = function(a, b) {
        goog.async.run.schedule_ || goog.async.run.initializeRunner_();
        goog.async.run.workQueueScheduled_ || (goog.async.run.schedule_(), goog.async.run.workQueueScheduled_ = !0);
        goog.async.run.workQueue_.add(a, b)
    };
    goog.async.run.initializeRunner_ = function() {
        if (-1 != String(goog.global.Promise).indexOf("[native code]")) {
            var a = goog.global.Promise.resolve(void 0);
            goog.async.run.schedule_ = function() {
                a.then(goog.async.run.processWorkQueue)
            }
        } else goog.async.run.schedule_ = function() {
            goog.async.nextTick(goog.async.run.processWorkQueue)
        }
    };
    goog.async.run.forceNextTick = function(a) {
        goog.async.run.schedule_ = function() {
            goog.async.nextTick(goog.async.run.processWorkQueue);
            a && a(goog.async.run.processWorkQueue)
        }
    };
    goog.async.run.workQueueScheduled_ = !1;
    goog.async.run.workQueue_ = new goog.async.WorkQueue;
    goog.DEBUG && (goog.async.run.resetQueue = function() {
        goog.async.run.workQueueScheduled_ = !1;
        goog.async.run.workQueue_ = new goog.async.WorkQueue
    });
    goog.async.run.processWorkQueue = function() {
        for (var a = null; a = goog.async.run.workQueue_.remove();) {
            try {
                a.fn.call(a.scope)
            } catch (b) {
                goog.async.throwException(b)
            }
            goog.async.run.workQueue_.returnUnused(a)
        }
        goog.async.run.workQueueScheduled_ = !1
    };
    goog.Promise = function(a, b) {
        this.state_ = goog.Promise.State_.PENDING;
        this.result_ = void 0;
        this.callbackEntriesTail_ = this.callbackEntries_ = this.parent_ = null;
        this.executing_ = !1;
        0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? this.unhandledRejectionId_ = 0 : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (this.hadUnhandledRejection_ = !1);
        goog.Promise.LONG_STACK_TRACES && (this.stack_ = [], this.addStackTrace_(Error("created")), this.currentStep_ = 0);
        if (a != goog.nullFunction) try {
            var c = this;
            a.call(b, function(a) {
                c.resolve_(goog.Promise.State_.FULFILLED,
                    a)
            }, function(a) {
                if (goog.DEBUG && !(a instanceof goog.Promise.CancellationError)) try {
                    if (a instanceof Error) throw a;
                    throw Error("Promise rejected.");
                } catch (b) {}
                c.resolve_(goog.Promise.State_.REJECTED, a)
            })
        } catch (d) {
            this.resolve_(goog.Promise.State_.REJECTED, d)
        }
    };
    goog.Promise.LONG_STACK_TRACES = !1;
    goog.Promise.UNHANDLED_REJECTION_DELAY = 0;
    goog.Promise.State_ = {
        PENDING: 0,
        BLOCKED: 1,
        FULFILLED: 2,
        REJECTED: 3
    };
    goog.Promise.CallbackEntry_ = function() {
        this.next = this.context = this.onRejected = this.onFulfilled = this.child = null;
        this.always = !1
    };
    goog.Promise.CallbackEntry_.prototype.reset = function() {
        this.context = this.onRejected = this.onFulfilled = this.child = null;
        this.always = !1
    };
    goog.Promise.DEFAULT_MAX_UNUSED = 100;
    goog.Promise.freelist_ = new goog.async.FreeList(function() {
        return new goog.Promise.CallbackEntry_
    }, function(a) {
        a.reset()
    }, goog.Promise.DEFAULT_MAX_UNUSED);
    goog.Promise.getCallbackEntry_ = function(a, b, c) {
        var d = goog.Promise.freelist_.get();
        d.onFulfilled = a;
        d.onRejected = b;
        d.context = c;
        return d
    };
    goog.Promise.returnEntry_ = function(a) {
        goog.Promise.freelist_.put(a)
    };
    goog.Promise.resolve = function(a) {
        if (a instanceof goog.Promise) return a;
        var b = new goog.Promise(goog.nullFunction);
        b.resolve_(goog.Promise.State_.FULFILLED, a);
        return b
    };
    goog.Promise.reject = function(a) {
        return new goog.Promise(function(b, c) {
            c(a)
        })
    };
    goog.Promise.resolveThen_ = function(a, b, c) {
        goog.Promise.maybeThen_(a, b, c, null) || goog.async.run(goog.partial(b, a))
    };
    goog.Promise.race = function(a) {
        return new goog.Promise(function(b, c) {
            a.length || b(void 0);
            for (var d = 0, e; d < a.length; d++) e = a[d], goog.Promise.resolveThen_(e, b, c)
        })
    };
    goog.Promise.all = function(a) {
        return new goog.Promise(function(b, c) {
            var d = a.length,
                e = [];
            if (d)
                for (var f = function(a, c) {
                        d--;
                        e[a] = c;
                        0 == d && b(e)
                    }, g = function(a) {
                        c(a)
                    }, h = 0, k; h < a.length; h++) k = a[h], goog.Promise.resolveThen_(k, goog.partial(f, h), g);
            else b(e)
        })
    };
    goog.Promise.allSettled = function(a) {
        return new goog.Promise(function(b, c) {
            var d = a.length,
                e = [];
            if (d)
                for (var f = function(a, c, f) {
                        d--;
                        e[a] = c ? {
                            fulfilled: !0,
                            value: f
                        } : {
                            fulfilled: !1,
                            reason: f
                        };
                        0 == d && b(e)
                    }, g = 0, h; g < a.length; g++) h = a[g], goog.Promise.resolveThen_(h, goog.partial(f, g, !0), goog.partial(f, g, !1));
            else b(e)
        })
    };
    goog.Promise.firstFulfilled = function(a) {
        return new goog.Promise(function(b, c) {
            var d = a.length,
                e = [];
            if (d)
                for (var f = function(a) {
                        b(a)
                    }, g = function(a, b) {
                        d--;
                        e[a] = b;
                        0 == d && c(e)
                    }, h = 0, k; h < a.length; h++) k = a[h], goog.Promise.resolveThen_(k, f, goog.partial(g, h));
            else b(void 0)
        })
    };
    goog.Promise.withResolver = function() {
        var a, b, c = new goog.Promise(function(c, e) {
            a = c;
            b = e
        });
        return new goog.Promise.Resolver_(c, a, b)
    };
    goog.Promise.prototype.then = function(a, b, c) {
        null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
        null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
        goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
        return this.addChildPromise_(goog.isFunction(a) ? a : null, goog.isFunction(b) ? b : null, c)
    };
    goog.Thenable.addImplementation(goog.Promise);
    goog.Promise.prototype.thenVoid = function(a, b, c) {
        null != a && goog.asserts.assertFunction(a, "opt_onFulfilled should be a function.");
        null != b && goog.asserts.assertFunction(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
        goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("then"));
        this.addCallbackEntry_(goog.Promise.getCallbackEntry_(a || goog.nullFunction, b || null, c))
    };
    goog.Promise.prototype.thenAlways = function(a, b) {
        goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenAlways"));
        var c = goog.Promise.getCallbackEntry_(a, a, b);
        c.always = !0;
        this.addCallbackEntry_(c);
        return this
    };
    goog.Promise.prototype.thenCatch = function(a, b) {
        goog.Promise.LONG_STACK_TRACES && this.addStackTrace_(Error("thenCatch"));
        return this.addChildPromise_(null, a, b)
    };
    goog.Promise.prototype.cancel = function(a) {
        this.state_ == goog.Promise.State_.PENDING && goog.async.run(function() {
            var b = new goog.Promise.CancellationError(a);
            this.cancelInternal_(b)
        }, this)
    };
    goog.Promise.prototype.cancelInternal_ = function(a) {
        this.state_ == goog.Promise.State_.PENDING && (this.parent_ ? (this.parent_.cancelChild_(this, a), this.parent_ = null) : this.resolve_(goog.Promise.State_.REJECTED, a))
    };
    goog.Promise.prototype.cancelChild_ = function(a, b) {
        if (this.callbackEntries_) {
            for (var c = 0, d = null, e = null, f = this.callbackEntries_; f && (f.always || (c++, f.child == a && (d = f), !(d && 1 < c))); f = f.next) d || (e = f);
            d && (this.state_ == goog.Promise.State_.PENDING && 1 == c ? this.cancelInternal_(b) : (e ? this.removeEntryAfter_(e) : this.popEntry_(), this.executeCallback_(d, goog.Promise.State_.REJECTED, b)))
        }
    };
    goog.Promise.prototype.addCallbackEntry_ = function(a) {
        this.hasEntry_() || this.state_ != goog.Promise.State_.FULFILLED && this.state_ != goog.Promise.State_.REJECTED || this.scheduleCallbacks_();
        this.queueEntry_(a)
    };
    goog.Promise.prototype.addChildPromise_ = function(a, b, c) {
        var d = goog.Promise.getCallbackEntry_(null, null, null);
        d.child = new goog.Promise(function(e, f) {
            d.onFulfilled = a ? function(b) {
                try {
                    var d = a.call(c, b);
                    e(d)
                } catch (k) {
                    f(k)
                }
            } : e;
            d.onRejected = b ? function(a) {
                try {
                    var d = b.call(c, a);
                    !goog.isDef(d) && a instanceof goog.Promise.CancellationError ? f(a) : e(d)
                } catch (k) {
                    f(k)
                }
            } : f
        });
        d.child.parent_ = this;
        this.addCallbackEntry_(d);
        return d.child
    };
    goog.Promise.prototype.unblockAndFulfill_ = function(a) {
        goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
        this.state_ = goog.Promise.State_.PENDING;
        this.resolve_(goog.Promise.State_.FULFILLED, a)
    };
    goog.Promise.prototype.unblockAndReject_ = function(a) {
        goog.asserts.assert(this.state_ == goog.Promise.State_.BLOCKED);
        this.state_ = goog.Promise.State_.PENDING;
        this.resolve_(goog.Promise.State_.REJECTED, a)
    };
    goog.Promise.prototype.resolve_ = function(a, b) {
        this.state_ == goog.Promise.State_.PENDING && (this === b && (a = goog.Promise.State_.REJECTED, b = new TypeError("Promise cannot resolve to itself")), this.state_ = goog.Promise.State_.BLOCKED, goog.Promise.maybeThen_(b, this.unblockAndFulfill_, this.unblockAndReject_, this) || (this.result_ = b, this.state_ = a, this.parent_ = null, this.scheduleCallbacks_(), a != goog.Promise.State_.REJECTED || b instanceof goog.Promise.CancellationError || goog.Promise.addUnhandledRejection_(this, b)))
    };
    goog.Promise.maybeThen_ = function(a, b, c, d) {
        if (a instanceof goog.Promise) return a.thenVoid(b, c, d), !0;
        if (goog.Thenable.isImplementedBy(a)) return a.then(b, c, d), !0;
        if (goog.isObject(a)) try {
            var e = a.then;
            if (goog.isFunction(e)) return goog.Promise.tryThen_(a, e, b, c, d), !0
        } catch (f) {
            return c.call(d, f), !0
        }
        return !1
    };
    goog.Promise.tryThen_ = function(a, b, c, d, e) {
        var f = !1,
            g = function(a) {
                f || (f = !0, c.call(e, a))
            },
            h = function(a) {
                f || (f = !0, d.call(e, a))
            };
        try {
            b.call(a, g, h)
        } catch (k) {
            h(k)
        }
    };
    goog.Promise.prototype.scheduleCallbacks_ = function() {
        this.executing_ || (this.executing_ = !0, goog.async.run(this.executeCallbacks_, this))
    };
    goog.Promise.prototype.hasEntry_ = function() {
        return !!this.callbackEntries_
    };
    goog.Promise.prototype.queueEntry_ = function(a) {
        goog.asserts.assert(null != a.onFulfilled);
        this.callbackEntriesTail_ ? this.callbackEntriesTail_.next = a : this.callbackEntries_ = a;
        this.callbackEntriesTail_ = a
    };
    goog.Promise.prototype.popEntry_ = function() {
        var a = null;
        this.callbackEntries_ && (a = this.callbackEntries_, this.callbackEntries_ = a.next, a.next = null);
        this.callbackEntries_ || (this.callbackEntriesTail_ = null);
        null != a && goog.asserts.assert(null != a.onFulfilled);
        return a
    };
    goog.Promise.prototype.removeEntryAfter_ = function(a) {
        goog.asserts.assert(this.callbackEntries_);
        goog.asserts.assert(null != a);
        a.next == this.callbackEntriesTail_ && (this.callbackEntriesTail_ = a);
        a.next = a.next.next
    };
    goog.Promise.prototype.executeCallbacks_ = function() {
        for (var a = null; a = this.popEntry_();) goog.Promise.LONG_STACK_TRACES && this.currentStep_++, this.executeCallback_(a, this.state_, this.result_);
        this.executing_ = !1
    };
    goog.Promise.prototype.executeCallback_ = function(a, b, c) {
        b == goog.Promise.State_.REJECTED && a.onRejected && !a.always && this.removeUnhandledRejection_();
        if (a.child) a.child.parent_ = null, goog.Promise.invokeCallback_(a, b, c);
        else try {
            a.always ? a.onFulfilled.call(a.context) : goog.Promise.invokeCallback_(a, b, c)
        } catch (d) {
            goog.Promise.handleRejection_.call(null, d)
        }
        goog.Promise.returnEntry_(a)
    };
    goog.Promise.invokeCallback_ = function(a, b, c) {
        b == goog.Promise.State_.FULFILLED ? a.onFulfilled.call(a.context, c) : a.onRejected && a.onRejected.call(a.context, c)
    };
    goog.Promise.prototype.addStackTrace_ = function(a) {
        if (goog.Promise.LONG_STACK_TRACES && goog.isString(a.stack)) {
            var b = a.stack.split("\n", 4)[3];
            a = a.message;
            a += Array(11 - a.length).join(" ");
            this.stack_.push(a + b)
        }
    };
    goog.Promise.prototype.appendLongStack_ = function(a) {
        if (goog.Promise.LONG_STACK_TRACES && a && goog.isString(a.stack) && this.stack_.length) {
            for (var b = ["Promise trace:"], c = this; c; c = c.parent_) {
                for (var d = this.currentStep_; 0 <= d; d--) b.push(c.stack_[d]);
                b.push("Value: [" + (c.state_ == goog.Promise.State_.REJECTED ? "REJECTED" : "FULFILLED") + "] <" + String(c.result_) + ">")
            }
            a.stack += "\n\n" + b.join("\n")
        }
    };
    goog.Promise.prototype.removeUnhandledRejection_ = function() {
        if (0 < goog.Promise.UNHANDLED_REJECTION_DELAY)
            for (var a = this; a && a.unhandledRejectionId_; a = a.parent_) goog.global.clearTimeout(a.unhandledRejectionId_), a.unhandledRejectionId_ = 0;
        else if (0 == goog.Promise.UNHANDLED_REJECTION_DELAY)
            for (a = this; a && a.hadUnhandledRejection_; a = a.parent_) a.hadUnhandledRejection_ = !1
    };
    goog.Promise.addUnhandledRejection_ = function(a, b) {
        0 < goog.Promise.UNHANDLED_REJECTION_DELAY ? a.unhandledRejectionId_ = goog.global.setTimeout(function() {
            a.appendLongStack_(b);
            goog.Promise.handleRejection_.call(null, b)
        }, goog.Promise.UNHANDLED_REJECTION_DELAY) : 0 == goog.Promise.UNHANDLED_REJECTION_DELAY && (a.hadUnhandledRejection_ = !0, goog.async.run(function() {
            a.hadUnhandledRejection_ && (a.appendLongStack_(b), goog.Promise.handleRejection_.call(null, b))
        }))
    };
    goog.Promise.handleRejection_ = goog.async.throwException;
    goog.Promise.setUnhandledRejectionHandler = function(a) {
        goog.Promise.handleRejection_ = a
    };
    goog.Promise.CancellationError = function(a) {
        goog.debug.Error.call(this, a)
    };
    goog.inherits(goog.Promise.CancellationError, goog.debug.Error);
    goog.Promise.CancellationError.prototype.name = "cancel";
    goog.Promise.Resolver_ = function(a, b, c) {
        this.promise = a;
        this.resolve = b;
        this.reject = c
    };
    goog.Timer = function(a, b) {
        goog.events.EventTarget.call(this);
        this.interval_ = a || 1;
        this.timerObject_ = b || goog.Timer.defaultTimerObject;
        this.boundTick_ = goog.bind(this.tick_, this);
        this.last_ = goog.now()
    };
    goog.inherits(goog.Timer, goog.events.EventTarget);
    goog.Timer.MAX_TIMEOUT_ = 2147483647;
    goog.Timer.INVALID_TIMEOUT_ID_ = -1;
    goog.Timer.prototype.enabled = !1;
    goog.Timer.defaultTimerObject = goog.global;
    goog.Timer.intervalScale = .8;
    goog.Timer.prototype.timer_ = null;
    goog.Timer.prototype.getInterval = function() {
        return this.interval_
    };
    goog.Timer.prototype.setInterval = function(a) {
        this.interval_ = a;
        this.timer_ && this.enabled ? (this.stop(), this.start()) : this.timer_ && this.stop()
    };
    goog.Timer.prototype.tick_ = function() {
        if (this.enabled) {
            var a = goog.now() - this.last_;
            0 < a && a < this.interval_ * goog.Timer.intervalScale ? this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_ - a) : (this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null), this.dispatchTick(), this.enabled && (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now()))
        }
    };
    goog.Timer.prototype.dispatchTick = function() {
        this.dispatchEvent(goog.Timer.TICK)
    };
    goog.Timer.prototype.start = function() {
        this.enabled = !0;
        this.timer_ || (this.timer_ = this.timerObject_.setTimeout(this.boundTick_, this.interval_), this.last_ = goog.now())
    };
    goog.Timer.prototype.stop = function() {
        this.enabled = !1;
        this.timer_ && (this.timerObject_.clearTimeout(this.timer_), this.timer_ = null)
    };
    goog.Timer.prototype.disposeInternal = function() {
        goog.Timer.superClass_.disposeInternal.call(this);
        this.stop();
        delete this.timerObject_
    };
    goog.Timer.TICK = "tick";
    goog.Timer.callOnce = function(a, b, c) {
        if (goog.isFunction(a)) c && (a = goog.bind(a, c));
        else if (a && "function" == typeof a.handleEvent) a = goog.bind(a.handleEvent, a);
        else throw Error("Invalid listener argument");
        return Number(b) > goog.Timer.MAX_TIMEOUT_ ? goog.Timer.INVALID_TIMEOUT_ID_ : goog.Timer.defaultTimerObject.setTimeout(a, b || 0)
    };
    goog.Timer.clear = function(a) {
        goog.Timer.defaultTimerObject.clearTimeout(a)
    };
    goog.Timer.promise = function(a, b) {
        var c = null;
        return (new goog.Promise(function(d, e) {
            c = goog.Timer.callOnce(function() {
                d(b)
            }, a);
            c == goog.Timer.INVALID_TIMEOUT_ID_ && e(Error("Failed to schedule timer."))
        })).thenCatch(function(a) {
            goog.Timer.clear(c);
            throw a;
        })
    };
    goog.History = function(a, b, c, d) {
        goog.events.EventTarget.call(this);
        if (a && !b) throw Error("Can't use invisible history without providing a blank page.");
        var e;
        if (c) e = c;
        else {
            e = "history_state" + goog.History.historyCount_;
            var f = goog.html.SafeHtml.create("input", {
                type: goog.dom.InputType.TEXT,
                name: e,
                id: e,
                style: goog.string.Const.from("display:none")
            });
            goog.dom.safe.documentWrite(document, f);
            e = goog.dom.getElement(e)
        }
        this.hiddenInput_ = e;
        this.window_ = c ? goog.dom.getWindow(goog.dom.getOwnerDocument(c)) : window;
        this.iframeSrc_ =
            b;
        goog.userAgent.IE && !b && (this.iframeSrc_ = "https" == window.location.protocol ? goog.html.TrustedResourceUrl.fromConstant(goog.string.Const.from("https:///")) : goog.html.TrustedResourceUrl.fromConstant(goog.string.Const.from('javascript:""')));
        this.timer_ = new goog.Timer(goog.History.PollingType.NORMAL);
        this.registerDisposable(this.timer_);
        this.userVisible_ = !a;
        this.eventHandler_ = new goog.events.EventHandler(this);
        if (a || goog.History.LEGACY_IE) d ? a = d : (a = "history_iframe" + goog.History.historyCount_, b = goog.html.SafeHtml.createIframe(this.iframeSrc_,
            null, {
                id: a,
                style: goog.string.Const.from("display:none"),
                sandbox: void 0
            }), goog.dom.safe.documentWrite(document, b), a = goog.dom.getElement(a)), this.iframe_ = a, this.unsetIframe_ = !0;
        goog.History.LEGACY_IE && (this.eventHandler_.listen(this.window_, goog.events.EventType.LOAD, this.onDocumentLoaded), this.shouldEnable_ = this.documentLoaded = !1);
        this.userVisible_ ? this.setHash_(this.getToken(), !0) : this.setIframeToken_(this.hiddenInput_.value);
        goog.History.historyCount_++
    };
    goog.inherits(goog.History, goog.events.EventTarget);
    goog.History.prototype.enabled_ = !1;
    goog.History.prototype.longerPolling_ = !1;
    goog.History.prototype.lastToken_ = null;
    goog.History.isOnHashChangeSupported = goog.memoize(function() {
        return goog.userAgent.IE ? goog.userAgent.isDocumentModeOrHigher(8) : "onhashchange" in goog.global
    });
    goog.History.LEGACY_IE = goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8);
    goog.History.HASH_ALWAYS_REQUIRED = goog.History.LEGACY_IE;
    goog.History.prototype.lockedToken_ = null;
    goog.History.prototype.disposeInternal = function() {
        goog.History.superClass_.disposeInternal.call(this);
        this.eventHandler_.dispose();
        this.setEnabled(!1)
    };
    goog.History.prototype.setEnabled = function(a) {
        if (a != this.enabled_)
            if (goog.History.LEGACY_IE && !this.documentLoaded) this.shouldEnable_ = a;
            else if (a)
            if (goog.userAgent.OPERA ? this.eventHandler_.listen(this.window_.document, goog.History.INPUT_EVENTS_, this.operaDefibrillator_) : goog.userAgent.GECKO && this.eventHandler_.listen(this.window_, "pageshow", this.onShow_), goog.History.isOnHashChangeSupported() && this.userVisible_) this.eventHandler_.listen(this.window_, goog.events.EventType.HASHCHANGE, this.onHashChange_),
                this.enabled_ = !0, this.dispatchEvent(new goog.history.Event(this.getToken(), !1));
            else {
                if (!goog.userAgent.IE || goog.labs.userAgent.device.isMobile() || this.documentLoaded) this.eventHandler_.listen(this.timer_, goog.Timer.TICK, goog.bind(this.check_, this, !0)), this.enabled_ = !0, goog.History.LEGACY_IE || (this.lastToken_ = this.getToken(), this.dispatchEvent(new goog.history.Event(this.getToken(), !1))), this.timer_.start()
            } else this.enabled_ = !1, this.eventHandler_.removeAll(), this.timer_.stop()
    };
    goog.History.prototype.onDocumentLoaded = function() {
        this.documentLoaded = !0;
        this.hiddenInput_.value && this.setIframeToken_(this.hiddenInput_.value, !0);
        this.setEnabled(this.shouldEnable_)
    };
    goog.History.prototype.onShow_ = function(a) {
        a.getBrowserEvent().persisted && (this.setEnabled(!1), this.setEnabled(!0))
    };
    goog.History.prototype.onHashChange_ = function(a) {
        a = this.getLocationFragment_(this.window_);
        a != this.lastToken_ && this.update_(a, !0)
    };
    goog.History.prototype.getToken = function() {
        return null != this.lockedToken_ ? this.lockedToken_ : this.userVisible_ ? this.getLocationFragment_(this.window_) : this.getIframeToken_() || ""
    };
    goog.History.prototype.setToken = function(a, b) {
        this.setHistoryState_(a, !1, b)
    };
    goog.History.prototype.replaceToken = function(a, b) {
        this.setHistoryState_(a, !0, b)
    };
    goog.History.prototype.getLocationFragment_ = function(a) {
        a = a.location.href;
        var b = a.indexOf("#");
        return 0 > b ? "" : a.substring(b + 1)
    };
    goog.History.prototype.setHistoryState_ = function(a, b, c) {
        this.getToken() != a && (this.userVisible_ ? (this.setHash_(a, b), goog.History.isOnHashChangeSupported() || goog.userAgent.IE && !goog.labs.userAgent.device.isMobile() && this.setIframeToken_(a, b, c), this.enabled_ && this.check_(!1)) : (this.setIframeToken_(a, b), this.lockedToken_ = this.lastToken_ = this.hiddenInput_.value = a, this.dispatchEvent(new goog.history.Event(a, !1))))
    };
    goog.History.prototype.setHash_ = function(a, b) {
        var c = this.window_.location,
            d = c.href.split("#")[0],
            e = goog.string.contains(c.href, "#");
        if (goog.History.HASH_ALWAYS_REQUIRED || e || a) d += "#" + a;
        d != c.href && (b ? c.replace(d) : c.href = d)
    };
    goog.History.prototype.setIframeToken_ = function(a, b, c) {
        if (this.unsetIframe_ || a != this.getIframeToken_())
            if (this.unsetIframe_ = !1, a = goog.string.urlEncode(a), goog.userAgent.IE) {
                var d = goog.dom.getFrameContentDocument(this.iframe_);
                d.open("text/html", b ? "replace" : void 0);
                b = goog.html.SafeHtml.concat(goog.html.SafeHtml.create("title", {}, c || this.window_.document.title), goog.html.SafeHtml.create("body", {}, a));
                goog.dom.safe.documentWrite(d, b);
                d.close()
            } else if (goog.asserts.assertInstanceof(this.iframeSrc_, goog.html.TrustedResourceUrl,
                "this.iframeSrc_ must be set on calls to setIframeToken_"), d = goog.html.TrustedResourceUrl.unwrap(this.iframeSrc_) + "#" + a, a = this.iframe_.contentWindow) b ? a.location.replace(d) : a.location.href = d
    };
    goog.History.prototype.getIframeToken_ = function() {
        if (goog.userAgent.IE) {
            var a = goog.dom.getFrameContentDocument(this.iframe_);
            return a.body ? goog.string.urlDecode(a.body.innerHTML) : null
        }
        if (a = this.iframe_.contentWindow) {
            var b;
            try {
                b = goog.string.urlDecode(this.getLocationFragment_(a))
            } catch (c) {
                return this.longerPolling_ || this.setLongerPolling_(!0), null
            }
            this.longerPolling_ && this.setLongerPolling_(!1);
            return b || null
        }
        return null
    };
    goog.History.prototype.check_ = function(a) {
        if (this.userVisible_) {
            var b = this.getLocationFragment_(this.window_);
            b != this.lastToken_ && this.update_(b, a)
        }
        if (!this.userVisible_ || goog.History.LEGACY_IE)
            if (b = this.getIframeToken_() || "", null == this.lockedToken_ || b == this.lockedToken_) this.lockedToken_ = null, b != this.lastToken_ && this.update_(b, a)
    };
    goog.History.prototype.update_ = function(a, b) {
        this.lastToken_ = this.hiddenInput_.value = a;
        this.userVisible_ ? (goog.History.LEGACY_IE && this.setIframeToken_(a), this.setHash_(a)) : this.setIframeToken_(a);
        this.dispatchEvent(new goog.history.Event(this.getToken(), b))
    };
    goog.History.prototype.setLongerPolling_ = function(a) {
        this.longerPolling_ != a && this.timer_.setInterval(a ? goog.History.PollingType.LONG : goog.History.PollingType.NORMAL);
        this.longerPolling_ = a
    };
    goog.History.prototype.operaDefibrillator_ = function() {
        this.timer_.stop();
        this.timer_.start()
    };
    goog.History.INPUT_EVENTS_ = [goog.events.EventType.MOUSEDOWN, goog.events.EventType.KEYDOWN, goog.events.EventType.MOUSEMOVE];
    goog.History.historyCount_ = 0;
    goog.History.PollingType = {
        NORMAL: 150,
        LONG: 1E4
    };
    goog.History.EventType = goog.history.EventType;
    goog.History.Event = goog.history.Event;
    goog.async.Delay = function(a, b, c) {
        goog.Disposable.call(this);
        this.listener_ = a;
        this.interval_ = b || 0;
        this.handler_ = c;
        this.callback_ = goog.bind(this.doAction_, this)
    };
    goog.inherits(goog.async.Delay, goog.Disposable);
    goog.Delay = goog.async.Delay;
    goog.async.Delay.prototype.id_ = 0;
    goog.async.Delay.prototype.disposeInternal = function() {
        goog.async.Delay.superClass_.disposeInternal.call(this);
        this.stop();
        delete this.listener_;
        delete this.handler_
    };
    goog.async.Delay.prototype.start = function(a) {
        this.stop();
        this.id_ = goog.Timer.callOnce(this.callback_, goog.isDef(a) ? a : this.interval_)
    };
    goog.async.Delay.prototype.startIfNotActive = function(a) {
        this.isActive() || this.start(a)
    };
    goog.async.Delay.prototype.stop = function() {
        this.isActive() && goog.Timer.clear(this.id_);
        this.id_ = 0
    };
    goog.async.Delay.prototype.fire = function() {
        this.stop();
        this.doAction_()
    };
    goog.async.Delay.prototype.fireIfActive = function() {
        this.isActive() && this.fire()
    };
    goog.async.Delay.prototype.isActive = function() {
        return 0 != this.id_
    };
    goog.async.Delay.prototype.doAction_ = function() {
        this.id_ = 0;
        this.listener_ && this.listener_.call(this.handler_)
    };
    goog.fx.anim = {};
    goog.fx.anim.Animated = function() {};
    goog.fx.anim.TIMEOUT = goog.async.AnimationDelay.TIMEOUT;
    goog.fx.anim.activeAnimations_ = {};
    goog.fx.anim.animationWindow_ = null;
    goog.fx.anim.animationDelay_ = null;
    goog.fx.anim.registerAnimation = function(a) {
        var b = goog.getUid(a);
        b in goog.fx.anim.activeAnimations_ || (goog.fx.anim.activeAnimations_[b] = a);
        goog.fx.anim.requestAnimationFrame_()
    };
    goog.fx.anim.unregisterAnimation = function(a) {
        a = goog.getUid(a);
        delete goog.fx.anim.activeAnimations_[a];
        goog.object.isEmpty(goog.fx.anim.activeAnimations_) && goog.fx.anim.cancelAnimationFrame_()
    };
    goog.fx.anim.tearDown = function() {
        goog.fx.anim.animationWindow_ = null;
        goog.dispose(goog.fx.anim.animationDelay_);
        goog.fx.anim.animationDelay_ = null;
        goog.fx.anim.activeAnimations_ = {}
    };
    goog.fx.anim.setAnimationWindow = function(a) {
        var b = goog.fx.anim.animationDelay_ && goog.fx.anim.animationDelay_.isActive();
        goog.dispose(goog.fx.anim.animationDelay_);
        goog.fx.anim.animationDelay_ = null;
        goog.fx.anim.animationWindow_ = a;
        b && goog.fx.anim.requestAnimationFrame_()
    };
    goog.fx.anim.requestAnimationFrame_ = function() {
        goog.fx.anim.animationDelay_ || (goog.fx.anim.animationDelay_ = goog.fx.anim.animationWindow_ ? new goog.async.AnimationDelay(function(a) {
            goog.fx.anim.cycleAnimations_(a)
        }, goog.fx.anim.animationWindow_) : new goog.async.Delay(function() {
            goog.fx.anim.cycleAnimations_(goog.now())
        }, goog.fx.anim.TIMEOUT));
        var a = goog.fx.anim.animationDelay_;
        a.isActive() || a.start()
    };
    goog.fx.anim.cancelAnimationFrame_ = function() {
        goog.fx.anim.animationDelay_ && goog.fx.anim.animationDelay_.stop()
    };
    goog.fx.anim.cycleAnimations_ = function(a) {
        goog.object.forEach(goog.fx.anim.activeAnimations_, function(b) {
            b.onAnimationFrame(a)
        });
        goog.object.isEmpty(goog.fx.anim.activeAnimations_) || goog.fx.anim.requestAnimationFrame_()
    };
    goog.fx.Animation = function(a, b, c, d) {
        goog.fx.TransitionBase.call(this);
        if (!goog.isArray(a) || !goog.isArray(b)) throw Error("Start and end parameters must be arrays");
        if (a.length != b.length) throw Error("Start and end points must be the same length");
        this.startPoint = a;
        this.endPoint = b;
        this.duration = c;
        this.accel_ = d;
        this.coords = [];
        this.useRightPositioningForRtl_ = !1;
        this.progress = this.fps_ = 0;
        this.lastFrame = null
    };
    goog.inherits(goog.fx.Animation, goog.fx.TransitionBase);
    goog.fx.Animation.prototype.enableRightPositioningForRtl = function(a) {
        this.useRightPositioningForRtl_ = a
    };
    goog.fx.Animation.prototype.isRightPositioningForRtlEnabled = function() {
        return this.useRightPositioningForRtl_
    };
    goog.fx.Animation.EventType = {
        PLAY: goog.fx.Transition.EventType.PLAY,
        BEGIN: goog.fx.Transition.EventType.BEGIN,
        RESUME: goog.fx.Transition.EventType.RESUME,
        END: goog.fx.Transition.EventType.END,
        STOP: goog.fx.Transition.EventType.STOP,
        FINISH: goog.fx.Transition.EventType.FINISH,
        PAUSE: goog.fx.Transition.EventType.PAUSE,
        ANIMATE: "animate",
        DESTROY: "destroy"
    };
    goog.fx.Animation.TIMEOUT = goog.fx.anim.TIMEOUT;
    goog.fx.Animation.State = goog.fx.TransitionBase.State;
    goog.fx.Animation.setAnimationWindow = function(a) {
        goog.fx.anim.setAnimationWindow(a)
    };
    goog.fx.Animation.prototype.play = function(a) {
        if (a || this.isStopped()) this.progress = 0, this.coords = this.startPoint;
        else if (this.isPlaying()) return !1;
        goog.fx.anim.unregisterAnimation(this);
        this.startTime = a = goog.now();
        this.isPaused() && (this.startTime -= this.duration * this.progress);
        this.endTime = this.startTime + this.duration;
        this.lastFrame = this.startTime;
        if (!this.progress) this.onBegin();
        this.onPlay();
        if (this.isPaused()) this.onResume();
        this.setStatePlaying();
        goog.fx.anim.registerAnimation(this);
        this.cycle(a);
        return !0
    };
    goog.fx.Animation.prototype.stop = function(a) {
        goog.fx.anim.unregisterAnimation(this);
        this.setStateStopped();
        a && (this.progress = 1);
        this.updateCoords_(this.progress);
        this.onStop();
        this.onEnd()
    };
    goog.fx.Animation.prototype.pause = function() {
        this.isPlaying() && (goog.fx.anim.unregisterAnimation(this), this.setStatePaused(), this.onPause())
    };
    goog.fx.Animation.prototype.getProgress = function() {
        return this.progress
    };
    goog.fx.Animation.prototype.setProgress = function(a) {
        this.progress = a;
        this.isPlaying() && (this.startTime = goog.now() - this.duration * this.progress, this.endTime = this.startTime + this.duration)
    };
    goog.fx.Animation.prototype.disposeInternal = function() {
        this.isStopped() || this.stop(!1);
        this.onDestroy();
        goog.fx.Animation.superClass_.disposeInternal.call(this)
    };
    goog.fx.Animation.prototype.destroy = function() {
        this.dispose()
    };
    goog.fx.Animation.prototype.onAnimationFrame = function(a) {
        this.cycle(a)
    };
    goog.fx.Animation.prototype.cycle = function(a) {
        goog.asserts.assertNumber(this.startTime);
        goog.asserts.assertNumber(this.endTime);
        goog.asserts.assertNumber(this.lastFrame);
        a < this.startTime && (this.endTime = a + this.endTime - this.startTime, this.startTime = a);
        this.progress = (a - this.startTime) / (this.endTime - this.startTime);
        1 < this.progress && (this.progress = 1);
        this.fps_ = 1E3 / (a - this.lastFrame);
        this.lastFrame = a;
        this.updateCoords_(this.progress);
        if (1 == this.progress) this.setStateStopped(), goog.fx.anim.unregisterAnimation(this),
            this.onFinish(), this.onEnd();
        else if (this.isPlaying()) this.onAnimate()
    };
    goog.fx.Animation.prototype.updateCoords_ = function(a) {
        goog.isFunction(this.accel_) && (a = this.accel_(a));
        this.coords = Array(this.startPoint.length);
        for (var b = 0; b < this.startPoint.length; b++) this.coords[b] = (this.endPoint[b] - this.startPoint[b]) * a + this.startPoint[b]
    };
    goog.fx.Animation.prototype.onAnimate = function() {
        this.dispatchAnimationEvent(goog.fx.Animation.EventType.ANIMATE)
    };
    goog.fx.Animation.prototype.onDestroy = function() {
        this.dispatchAnimationEvent(goog.fx.Animation.EventType.DESTROY)
    };
    goog.fx.Animation.prototype.dispatchAnimationEvent = function(a) {
        this.dispatchEvent(new goog.fx.AnimationEvent(a, this))
    };
    goog.fx.AnimationEvent = function(a, b) {
        goog.events.Event.call(this, a);
        this.coords = b.coords;
        this.x = b.coords[0];
        this.y = b.coords[1];
        this.z = b.coords[2];
        this.duration = b.duration;
        this.progress = b.getProgress();
        this.fps = b.fps_;
        this.state = b.getStateInternal();
        this.anim = b
    };
    goog.inherits(goog.fx.AnimationEvent, goog.events.Event);
    goog.fx.AnimationEvent.prototype.coordsAsInts = function() {
        return goog.array.map(this.coords, Math.round)
    };
    goog.style = {};
    goog.style.setStyle = function(a, b, c) {
        if (goog.isString(b)) goog.style.setStyle_(a, c, b);
        else
            for (var d in b) goog.style.setStyle_(a, b[d], d)
    };
    goog.style.setStyle_ = function(a, b, c) {
        (c = goog.style.getVendorJsStyleName_(a, c)) && (a.style[c] = b)
    };
    goog.style.styleNameCache_ = {};
    goog.style.getVendorJsStyleName_ = function(a, b) {
        var c = goog.style.styleNameCache_[b];
        if (!c) {
            var d = goog.string.toCamelCase(b),
                c = d;
            void 0 === a.style[d] && (d = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(d), void 0 !== a.style[d] && (c = d));
            goog.style.styleNameCache_[b] = c
        }
        return c
    };
    goog.style.getVendorStyleName_ = function(a, b) {
        var c = goog.string.toCamelCase(b);
        return void 0 === a.style[c] && (c = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(c), void 0 !== a.style[c]) ? goog.dom.vendor.getVendorPrefix() + "-" + b : b
    };
    goog.style.getStyle = function(a, b) {
        var c = a.style[goog.string.toCamelCase(b)];
        return "undefined" !== typeof c ? c : a.style[goog.style.getVendorJsStyleName_(a, b)] || ""
    };
    goog.style.getComputedStyle = function(a, b) {
        var c = goog.dom.getOwnerDocument(a);
        return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : ""
    };
    goog.style.getCascadedStyle = function(a, b) {
        return a.currentStyle ? a.currentStyle[b] : null
    };
    goog.style.getStyle_ = function(a, b) {
        return goog.style.getComputedStyle(a, b) || goog.style.getCascadedStyle(a, b) || a.style && a.style[b]
    };
    goog.style.getComputedBoxSizing = function(a) {
        return goog.style.getStyle_(a, "boxSizing") || goog.style.getStyle_(a, "MozBoxSizing") || goog.style.getStyle_(a, "WebkitBoxSizing") || null
    };
    goog.style.getComputedPosition = function(a) {
        return goog.style.getStyle_(a, "position")
    };
    goog.style.getBackgroundColor = function(a) {
        return goog.style.getStyle_(a, "backgroundColor")
    };
    goog.style.getComputedOverflowX = function(a) {
        return goog.style.getStyle_(a, "overflowX")
    };
    goog.style.getComputedOverflowY = function(a) {
        return goog.style.getStyle_(a, "overflowY")
    };
    goog.style.getComputedZIndex = function(a) {
        return goog.style.getStyle_(a, "zIndex")
    };
    goog.style.getComputedTextAlign = function(a) {
        return goog.style.getStyle_(a, "textAlign")
    };
    goog.style.getComputedCursor = function(a) {
        return goog.style.getStyle_(a, "cursor")
    };
    goog.style.getComputedTransform = function(a) {
        var b = goog.style.getVendorStyleName_(a, "transform");
        return goog.style.getStyle_(a, b) || goog.style.getStyle_(a, "transform")
    };
    goog.style.setPosition = function(a, b, c) {
        var d;
        b instanceof goog.math.Coordinate ? (d = b.x, b = b.y) : (d = b, b = c);
        a.style.left = goog.style.getPixelStyleValue_(d, !1);
        a.style.top = goog.style.getPixelStyleValue_(b, !1)
    };
    goog.style.getPosition = function(a) {
        return new goog.math.Coordinate(a.offsetLeft, a.offsetTop)
    };
    goog.style.getClientViewportElement = function(a) {
        a = a ? goog.dom.getOwnerDocument(a) : goog.dom.getDocument();
        return !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || goog.dom.getDomHelper(a).isCss1CompatMode() ? a.documentElement : a.body
    };
    goog.style.getViewportPageOffset = function(a) {
        var b = a.body;
        a = a.documentElement;
        return new goog.math.Coordinate(b.scrollLeft || a.scrollLeft, b.scrollTop || a.scrollTop)
    };
    goog.style.getBoundingClientRect_ = function(a) {
        var b;
        try {
            b = a.getBoundingClientRect()
        } catch (c) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
        goog.userAgent.IE && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    };
    goog.style.getOffsetParent = function(a) {
        if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8)) return goog.asserts.assert(a && "offsetParent" in a), a.offsetParent;
        var b = goog.dom.getOwnerDocument(a),
            c = goog.style.getStyle_(a, "position"),
            d = "fixed" == c || "absolute" == c;
        for (a = a.parentNode; a && a != b; a = a.parentNode)
            if (a.nodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT && a.host && (a = a.host), c = goog.style.getStyle_(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth ||
                    a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
        return null
    };
    goog.style.getVisibleRectForElement = function(a) {
        for (var b = new goog.math.Box(0, Infinity, Infinity, 0), c = goog.dom.getDomHelper(a), d = c.getDocument().body, e = c.getDocument().documentElement, f = c.getDocumentScrollElement(); a = goog.style.getOffsetParent(a);)
            if (!(goog.userAgent.IE && 0 == a.clientWidth || goog.userAgent.WEBKIT && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != goog.style.getStyle_(a, "overflow")) {
                var g = goog.style.getPageOffset(a),
                    h = goog.style.getClientLeftTop(a);
                g.x += h.x;
                g.y += h.y;
                b.top = Math.max(b.top,
                    g.y);
                b.right = Math.min(b.right, g.x + a.clientWidth);
                b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
                b.left = Math.max(b.left, g.x)
            }
        d = f.scrollLeft;
        f = f.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, f);
        c = c.getViewportSize();
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, f + c.height);
        return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
    };
    goog.style.getContainerOffsetToScrollInto = function(a, b, c) {
        var d = b || goog.dom.getDocumentScrollElement(),
            e = goog.style.getPageOffset(a),
            f = goog.style.getPageOffset(d),
            g = goog.style.getBorderBox(d);
        d == goog.dom.getDocumentScrollElement() ? (b = e.x - d.scrollLeft, e = e.y - d.scrollTop, goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(10) && (b += g.left, e += g.top)) : (b = e.x - f.x - g.left, e = e.y - f.y - g.top);
        g = goog.style.getSizeWithDisplay_(a);
        a = d.clientWidth - g.width;
        g = d.clientHeight - g.height;
        f = d.scrollLeft;
        d = d.scrollTop;
        c ? (f += b - a / 2, d += e - g / 2) : (f += Math.min(b, Math.max(b - a, 0)), d += Math.min(e, Math.max(e - g, 0)));
        return new goog.math.Coordinate(f, d)
    };
    goog.style.scrollIntoContainerView = function(a, b, c) {
        b = b || goog.dom.getDocumentScrollElement();
        a = goog.style.getContainerOffsetToScrollInto(a, b, c);
        b.scrollLeft = a.x;
        b.scrollTop = a.y
    };
    goog.style.getClientLeftTop = function(a) {
        return new goog.math.Coordinate(a.clientLeft, a.clientTop)
    };
    goog.style.getPageOffset = function(a) {
        var b = goog.dom.getOwnerDocument(a);
        goog.asserts.assertObject(a, "Parameter is required");
        var c = new goog.math.Coordinate(0, 0),
            d = goog.style.getClientViewportElement(b);
        if (a == d) return c;
        a = goog.style.getBoundingClientRect_(a);
        b = goog.dom.getDomHelper(b).getDocumentScroll();
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    };
    goog.style.getPageOffsetLeft = function(a) {
        return goog.style.getPageOffset(a).x
    };
    goog.style.getPageOffsetTop = function(a) {
        return goog.style.getPageOffset(a).y
    };
    goog.style.getFramedPageOffset = function(a, b) {
        var c = new goog.math.Coordinate(0, 0),
            d = goog.dom.getWindow(goog.dom.getOwnerDocument(a));
        if (!goog.reflect.canAccessProperty(d, "parent")) return c;
        var e = a;
        do {
            var f = d == b ? goog.style.getPageOffset(e) : goog.style.getClientPositionForElement_(goog.asserts.assert(e));
            c.x += f.x;
            c.y += f.y
        } while (d && d != b && d != d.parent && (e = d.frameElement) && (d = d.parent));
        return c
    };
    goog.style.translateRectForAnotherFrame = function(a, b, c) {
        if (b.getDocument() != c.getDocument()) {
            var d = b.getDocument().body;
            c = goog.style.getFramedPageOffset(d, c.getWindow());
            c = goog.math.Coordinate.difference(c, goog.style.getPageOffset(d));
            !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || b.isCss1CompatMode() || (c = goog.math.Coordinate.difference(c, b.getDocumentScroll()));
            a.left += c.x;
            a.top += c.y
        }
    };
    goog.style.getRelativePosition = function(a, b) {
        var c = goog.style.getClientPosition(a),
            d = goog.style.getClientPosition(b);
        return new goog.math.Coordinate(c.x - d.x, c.y - d.y)
    };
    goog.style.getClientPositionForElement_ = function(a) {
        a = goog.style.getBoundingClientRect_(a);
        return new goog.math.Coordinate(a.left, a.top)
    };
    goog.style.getClientPosition = function(a) {
        goog.asserts.assert(a);
        if (a.nodeType == goog.dom.NodeType.ELEMENT) return goog.style.getClientPositionForElement_(a);
        a = a.changedTouches ? a.changedTouches[0] : a;
        return new goog.math.Coordinate(a.clientX, a.clientY)
    };
    goog.style.setPageOffset = function(a, b, c) {
        var d = goog.style.getPageOffset(a);
        b instanceof goog.math.Coordinate && (c = b.y, b = b.x);
        b = goog.asserts.assertNumber(b) - d.x;
        goog.style.setPosition(a, a.offsetLeft + b, a.offsetTop + (Number(c) - d.y))
    };
    goog.style.setSize = function(a, b, c) {
        if (b instanceof goog.math.Size) c = b.height, b = b.width;
        else if (void 0 == c) throw Error("missing height argument");
        goog.style.setWidth(a, b);
        goog.style.setHeight(a, c)
    };
    goog.style.getPixelStyleValue_ = function(a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a
    };
    goog.style.setHeight = function(a, b) {
        a.style.height = goog.style.getPixelStyleValue_(b, !0)
    };
    goog.style.setWidth = function(a, b) {
        a.style.width = goog.style.getPixelStyleValue_(b, !0)
    };
    goog.style.getSize = function(a) {
        return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_, a)
    };
    goog.style.evaluateWithTemporaryDisplay_ = function(a, b) {
        if ("none" != goog.style.getStyle_(b, "display")) return a(b);
        var c = b.style,
            d = c.display,
            e = c.visibility,
            f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        var g = a(b);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return g
    };
    goog.style.getSizeWithDisplay_ = function(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight,
            d = goog.userAgent.WEBKIT && !b && !c;
        return goog.isDef(b) && !d || !a.getBoundingClientRect ? new goog.math.Size(b, c) : (a = goog.style.getBoundingClientRect_(a), new goog.math.Size(a.right - a.left, a.bottom - a.top))
    };
    goog.style.getTransformedSize = function(a) {
        if (!a.getBoundingClientRect) return null;
        a = goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_, a);
        return new goog.math.Size(a.right - a.left, a.bottom - a.top)
    };
    goog.style.getBounds = function(a) {
        var b = goog.style.getPageOffset(a);
        a = goog.style.getSize(a);
        return new goog.math.Rect(b.x, b.y, a.width, a.height)
    };
    goog.style.toCamelCase = function(a) {
        return goog.string.toCamelCase(String(a))
    };
    goog.style.toSelectorCase = function(a) {
        return goog.string.toSelectorCase(a)
    };
    goog.style.getOpacity = function(a) {
        goog.asserts.assert(a);
        var b = a.style;
        a = "";
        "opacity" in b ? a = b.opacity : "MozOpacity" in b ? a = b.MozOpacity : "filter" in b && (b = b.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (a = String(b[1] / 100));
        return "" == a ? a : Number(a)
    };
    goog.style.setOpacity = function(a, b) {
        goog.asserts.assert(a);
        var c = a.style;
        "opacity" in c ? c.opacity = b : "MozOpacity" in c ? c.MozOpacity = b : "filter" in c && (c.filter = "" === b ? "" : "alpha(opacity=" + 100 * Number(b) + ")")
    };
    goog.style.setTransparentBackgroundImage = function(a, b) {
        var c = a.style;
        goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? c.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="crop")' : (c.backgroundImage = "url(" + b + ")", c.backgroundPosition = "top left", c.backgroundRepeat = "no-repeat")
    };
    goog.style.clearTransparentBackgroundImage = function(a) {
        a = a.style;
        "filter" in a ? a.filter = "" : a.backgroundImage = "none"
    };
    goog.style.showElement = function(a, b) {
        goog.style.setElementShown(a, b)
    };
    goog.style.setElementShown = function(a, b) {
        a.style.display = b ? "" : "none"
    };
    goog.style.isElementShown = function(a) {
        return "none" != a.style.display
    };
    goog.style.installStyles = function(a, b) {
        return goog.style.installSafeStyleSheet(goog.html.legacyconversions.safeStyleSheetFromString(a), b)
    };
    goog.style.installSafeStyleSheet = function(a, b) {
        var c = goog.dom.getDomHelper(b),
            d = null,
            e = c.getDocument();
        goog.userAgent.IE && e.createStyleSheet ? (d = e.createStyleSheet(), goog.style.setSafeStyleSheet(d, a)) : (e = c.getElementsByTagNameAndClass(goog.dom.TagName.HEAD)[0], e || (d = c.getElementsByTagNameAndClass(goog.dom.TagName.BODY)[0], e = c.createDom(goog.dom.TagName.HEAD), d.parentNode.insertBefore(e, d)), d = c.createDom(goog.dom.TagName.STYLE), goog.style.setSafeStyleSheet(d, a), c.appendChild(e, d));
        return d
    };
    goog.style.uninstallStyles = function(a) {
        goog.dom.removeNode(a.ownerNode || a.owningElement || a)
    };
    goog.style.setStyles = function(a, b) {
        goog.style.setSafeStyleSheet(a, goog.html.legacyconversions.safeStyleSheetFromString(b))
    };
    goog.style.setSafeStyleSheet = function(a, b) {
        var c = goog.html.SafeStyleSheet.unwrap(b);
        goog.userAgent.IE && goog.isDef(a.cssText) ? a.cssText = c : a.innerHTML = c
    };
    goog.style.setPreWrap = function(a) {
        a = a.style;
        goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.whiteSpace = "pre", a.wordWrap = "break-word") : a.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap"
    };
    goog.style.setInlineBlock = function(a) {
        a = a.style;
        a.position = "relative";
        goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.zoom = "1", a.display = "inline") : a.display = "inline-block"
    };
    goog.style.isRightToLeft = function(a) {
        return "rtl" == goog.style.getStyle_(a, "direction")
    };
    goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT || goog.userAgent.EDGE ? "WebkitUserSelect" : null;
    goog.style.isUnselectable = function(a) {
        return goog.style.unselectableStyle_ ? "none" == a.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == a.getAttribute("unselectable") : !1
    };
    goog.style.setUnselectable = function(a, b, c) {
        c = c ? null : a.getElementsByTagName("*");
        var d = goog.style.unselectableStyle_;
        if (d) {
            if (b = b ? "none" : "", a.style && (a.style[d] = b), c) {
                a = 0;
                for (var e; e = c[a]; a++) e.style && (e.style[d] = b)
            }
        } else if (goog.userAgent.IE || goog.userAgent.OPERA)
            if (b = b ? "on" : "", a.setAttribute("unselectable", b), c)
                for (a = 0; e = c[a]; a++) e.setAttribute("unselectable", b)
    };
    goog.style.getBorderBoxSize = function(a) {
        return new goog.math.Size(a.offsetWidth, a.offsetHeight)
    };
    goog.style.setBorderBoxSize = function(a, b) {
        var c = goog.dom.getOwnerDocument(a),
            d = goog.dom.getDomHelper(c).isCss1CompatMode();
        if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8")) goog.style.setBoxSizingSize_(a, b, "border-box");
        else if (c = a.style, d) {
            var d = goog.style.getPaddingBox(a),
                e = goog.style.getBorderBox(a);
            c.pixelWidth = b.width - e.left - d.left - d.right - e.right;
            c.pixelHeight = b.height - e.top - d.top - d.bottom - e.bottom
        } else c.pixelWidth = b.width, c.pixelHeight =
            b.height
    };
    goog.style.getContentBoxSize = function(a) {
        var b = goog.dom.getOwnerDocument(a),
            c = goog.userAgent.IE && a.currentStyle;
        if (c && goog.dom.getDomHelper(b).isCss1CompatMode() && "auto" != c.width && "auto" != c.height && !c.boxSizing) return b = goog.style.getIePixelValue_(a, c.width, "width", "pixelWidth"), a = goog.style.getIePixelValue_(a, c.height, "height", "pixelHeight"), new goog.math.Size(b, a);
        c = goog.style.getBorderBoxSize(a);
        b = goog.style.getPaddingBox(a);
        a = goog.style.getBorderBox(a);
        return new goog.math.Size(c.width - a.left -
            b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom)
    };
    goog.style.setContentBoxSize = function(a, b) {
        var c = goog.dom.getOwnerDocument(a),
            d = goog.dom.getDomHelper(c).isCss1CompatMode();
        if (!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8")) goog.style.setBoxSizingSize_(a, b, "content-box");
        else if (c = a.style, d) c.pixelWidth = b.width, c.pixelHeight = b.height;
        else {
            var d = goog.style.getPaddingBox(a),
                e = goog.style.getBorderBox(a);
            c.pixelWidth = b.width + e.left + d.left + d.right + e.right;
            c.pixelHeight = b.height + e.top + d.top + d.bottom +
                e.bottom
        }
    };
    goog.style.setBoxSizingSize_ = function(a, b, c) {
        a = a.style;
        goog.userAgent.GECKO ? a.MozBoxSizing = c : goog.userAgent.WEBKIT ? a.WebkitBoxSizing = c : a.boxSizing = c;
        a.width = Math.max(b.width, 0) + "px";
        a.height = Math.max(b.height, 0) + "px"
    };
    goog.style.getIePixelValue_ = function(a, b, c, d) {
        if (/^\d+px?$/.test(b)) return parseInt(b, 10);
        var e = a.style[c],
            f = a.runtimeStyle[c];
        a.runtimeStyle[c] = a.currentStyle[c];
        a.style[c] = b;
        b = a.style[d];
        a.style[c] = e;
        a.runtimeStyle[c] = f;
        return +b
    };
    goog.style.getIePixelDistance_ = function(a, b) {
        var c = goog.style.getCascadedStyle(a, b);
        return c ? goog.style.getIePixelValue_(a, c, "left", "pixelLeft") : 0
    };
    goog.style.getBox_ = function(a, b) {
        if (goog.userAgent.IE) {
            var c = goog.style.getIePixelDistance_(a, b + "Left"),
                d = goog.style.getIePixelDistance_(a, b + "Right"),
                e = goog.style.getIePixelDistance_(a, b + "Top"),
                f = goog.style.getIePixelDistance_(a, b + "Bottom");
            return new goog.math.Box(e, d, f, c)
        }
        c = goog.style.getComputedStyle(a, b + "Left");
        d = goog.style.getComputedStyle(a, b + "Right");
        e = goog.style.getComputedStyle(a, b + "Top");
        f = goog.style.getComputedStyle(a, b + "Bottom");
        return new goog.math.Box(parseFloat(e), parseFloat(d), parseFloat(f),
            parseFloat(c))
    };
    goog.style.getPaddingBox = function(a) {
        return goog.style.getBox_(a, "padding")
    };
    goog.style.getMarginBox = function(a) {
        return goog.style.getBox_(a, "margin")
    };
    goog.style.ieBorderWidthKeywords_ = {
        thin: 2,
        medium: 4,
        thick: 6
    };
    goog.style.getIePixelBorder_ = function(a, b) {
        if ("none" == goog.style.getCascadedStyle(a, b + "Style")) return 0;
        var c = goog.style.getCascadedStyle(a, b + "Width");
        return c in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[c] : goog.style.getIePixelValue_(a, c, "left", "pixelLeft")
    };
    goog.style.getBorderBox = function(a) {
        if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
            var b = goog.style.getIePixelBorder_(a, "borderLeft"),
                c = goog.style.getIePixelBorder_(a, "borderRight"),
                d = goog.style.getIePixelBorder_(a, "borderTop");
            a = goog.style.getIePixelBorder_(a, "borderBottom");
            return new goog.math.Box(d, c, a, b)
        }
        b = goog.style.getComputedStyle(a, "borderLeftWidth");
        c = goog.style.getComputedStyle(a, "borderRightWidth");
        d = goog.style.getComputedStyle(a, "borderTopWidth");
        a = goog.style.getComputedStyle(a,
            "borderBottomWidth");
        return new goog.math.Box(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
    };
    goog.style.getFontFamily = function(a) {
        var b = goog.dom.getOwnerDocument(a),
            c = "";
        if (b.body.createTextRange && goog.dom.contains(b, a)) {
            b = b.body.createTextRange();
            b.moveToElementText(a);
            try {
                c = b.queryCommandValue("FontName")
            } catch (d) {
                c = ""
            }
        }
        c || (c = goog.style.getStyle_(a, "fontFamily"));
        a = c.split(",");
        1 < a.length && (c = a[0]);
        return goog.string.stripQuotes(c, "\"'")
    };
    goog.style.lengthUnitRegex_ = /[^\d]+$/;
    goog.style.getLengthUnits = function(a) {
        return (a = a.match(goog.style.lengthUnitRegex_)) && a[0] || null
    };
    goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {
        cm: 1,
        "in": 1,
        mm: 1,
        pc: 1,
        pt: 1
    };
    goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {
        em: 1,
        ex: 1
    };
    goog.style.getFontSize = function(a) {
        var b = goog.style.getStyle_(a, "fontSize"),
            c = goog.style.getLengthUnits(b);
        if (b && "px" == c) return parseInt(b, 10);
        if (goog.userAgent.IE) {
            if (String(c) in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) return goog.style.getIePixelValue_(a, b, "left", "pixelLeft");
            if (a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && String(c) in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) return a = a.parentNode, c = goog.style.getStyle_(a, "fontSize"), goog.style.getIePixelValue_(a, b == c ? "1em" : b,
                "left", "pixelLeft")
        }
        c = goog.dom.createDom(goog.dom.TagName.SPAN, {
            style: "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
        });
        goog.dom.appendChild(a, c);
        b = c.offsetHeight;
        goog.dom.removeNode(c);
        return b
    };
    goog.style.parseStyleAttribute = function(a) {
        var b = {};
        goog.array.forEach(a.split(/\s*;\s*/), function(a) {
            var d = a.match(/\s*([\w-]+)\s*\:(.+)/);
            d && (a = d[1], d = goog.string.trim(d[2]), b[goog.string.toCamelCase(a.toLowerCase())] = d)
        });
        return b
    };
    goog.style.toStyleAttribute = function(a) {
        var b = [];
        goog.object.forEach(a, function(a, d) {
            b.push(goog.string.toSelectorCase(d), ":", a, ";")
        });
        return b.join("")
    };
    goog.style.setFloat = function(a, b) {
        a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = b
    };
    goog.style.getFloat = function(a) {
        return a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
    };
    goog.style.getScrollbarWidth = function(a) {
        var b = goog.dom.createElement(goog.dom.TagName.DIV);
        a && (b.className = a);
        b.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
        a = goog.dom.createElement(goog.dom.TagName.DIV);
        goog.style.setSize(a, "200px", "200px");
        b.appendChild(a);
        goog.dom.appendChild(goog.dom.getDocument().body, b);
        a = b.offsetWidth - b.clientWidth;
        goog.dom.removeNode(b);
        return a
    };
    goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
    goog.style.getCssTranslation = function(a) {
        a = goog.style.getComputedTransform(a);
        return a ? (a = a.match(goog.style.MATRIX_TRANSLATION_REGEX_)) ? new goog.math.Coordinate(parseFloat(a[1]), parseFloat(a[2])) : new goog.math.Coordinate(0, 0) : new goog.math.Coordinate(0, 0)
    };
    goog.events.MouseWheelHandler = function(a, b) {
        goog.events.EventTarget.call(this);
        this.element_ = a;
        var c = goog.dom.isElement(this.element_) ? this.element_ : this.element_ ? this.element_.body : null;
        this.isRtl_ = !!c && goog.style.isRightToLeft(c);
        this.listenKey_ = goog.events.listen(this.element_, goog.userAgent.GECKO ? "DOMMouseScroll" : "mousewheel", this, b)
    };
    goog.inherits(goog.events.MouseWheelHandler, goog.events.EventTarget);
    goog.events.MouseWheelHandler.EventType = {
        MOUSEWHEEL: "mousewheel"
    };
    goog.events.MouseWheelHandler.prototype.setMaxDeltaX = function(a) {
        this.maxDeltaX_ = a
    };
    goog.events.MouseWheelHandler.prototype.setMaxDeltaY = function(a) {
        this.maxDeltaY_ = a
    };
    goog.events.MouseWheelHandler.prototype.handleEvent = function(a) {
        var b = 0,
            c = 0,
            d = 0;
        a = a.getBrowserEvent();
        "mousewheel" == a.type ? (d = goog.events.MouseWheelHandler.smartScale_(-a.wheelDelta, 40), goog.isDef(a.wheelDeltaX) ? (b = goog.events.MouseWheelHandler.smartScale_(-a.wheelDeltaX, 40), c = goog.events.MouseWheelHandler.smartScale_(-a.wheelDeltaY, 40)) : c = d) : (d = a.detail, 100 < d ? d = 3 : -100 > d && (d = -3), goog.isDef(a.axis) && a.axis === a.HORIZONTAL_AXIS ? b = d : c = d);
        goog.isNumber(this.maxDeltaX_) && (b = goog.math.clamp(b, -this.maxDeltaX_,
            this.maxDeltaX_));
        goog.isNumber(this.maxDeltaY_) && (c = goog.math.clamp(c, -this.maxDeltaY_, this.maxDeltaY_));
        this.isRtl_ && (b = -b);
        b = new goog.events.MouseWheelEvent(d, a, b, c);
        this.dispatchEvent(b)
    };
    goog.events.MouseWheelHandler.smartScale_ = function(a, b) {
        return goog.userAgent.WEBKIT && (goog.userAgent.MAC || goog.userAgent.LINUX) && 0 != a % b ? a : a / b
    };
    goog.events.MouseWheelHandler.prototype.disposeInternal = function() {
        goog.events.MouseWheelHandler.superClass_.disposeInternal.call(this);
        goog.events.unlistenByKey(this.listenKey_);
        this.listenKey_ = null
    };
    goog.events.MouseWheelEvent = function(a, b, c, d) {
        goog.events.BrowserEvent.call(this, b);
        this.type = goog.events.MouseWheelHandler.EventType.MOUSEWHEEL;
        this.detail = a;
        this.deltaX = c;
        this.deltaY = d
    };
    goog.inherits(goog.events.MouseWheelEvent, goog.events.BrowserEvent);
    goog.style.bidi = {};
    goog.style.bidi.getScrollLeft = function(a) {
        var b = goog.style.isRightToLeft(a);
        return b && goog.userAgent.GECKO ? -a.scrollLeft : !b || goog.userAgent.EDGE_OR_IE && goog.userAgent.isVersionOrHigher("8") || "visible" == goog.style.getComputedOverflowX(a) ? a.scrollLeft : a.scrollWidth - a.clientWidth - a.scrollLeft
    };
    goog.style.bidi.getOffsetStart = function(a) {
        var b = a.offsetLeft,
            c = a.offsetParent;
        c || "fixed" != goog.style.getComputedPosition(a) || (c = goog.dom.getOwnerDocument(a).documentElement);
        if (!c) return b;
        if (goog.userAgent.GECKO) var d = goog.style.getBorderBox(c),
            b = b + d.left;
        else goog.userAgent.isDocumentModeOrHigher(8) && !goog.userAgent.isDocumentModeOrHigher(9) && (d = goog.style.getBorderBox(c), b -= d.left);
        return goog.style.isRightToLeft(c) ? c.clientWidth - (b + a.offsetWidth) : b
    };
    goog.style.bidi.setScrollOffset = function(a, b) {
        b = Math.max(b, 0);
        goog.style.isRightToLeft(a) ? goog.userAgent.GECKO ? a.scrollLeft = -b : goog.userAgent.EDGE_OR_IE && goog.userAgent.isVersionOrHigher("8") ? a.scrollLeft = b : a.scrollLeft = a.scrollWidth - b - a.clientWidth : a.scrollLeft = b
    };
    goog.style.bidi.setPosition = function(a, b, c, d) {
        goog.isNull(c) || (a.style.top = c + "px");
        d ? (a.style.right = b + "px", a.style.left = "") : (a.style.left = b + "px", a.style.right = "")
    };
    goog.fx.Dragger = function(a, b, c) {
        goog.events.EventTarget.call(this);
        this.target = a;
        this.handle = b || a;
        this.limits = c || new goog.math.Rect(NaN, NaN, NaN, NaN);
        this.document_ = goog.dom.getOwnerDocument(a);
        this.eventHandler_ = new goog.events.EventHandler(this);
        this.registerDisposable(this.eventHandler_);
        this.deltaY = this.deltaX = this.startY = this.startX = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.enabled_ = !0;
        this.dragging_ = !1;
        this.preventMouseDown_ = !0;
        this.hysteresisDistanceSquared_ = 0;
        this.useRightPositioningForRtl_ =
            this.ieDragStartCancellingOn_ = !1;
        goog.events.listen(this.handle, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.startDrag, !1, this)
    };
    goog.inherits(goog.fx.Dragger, goog.events.EventTarget);
    goog.tagUnsealableClass(goog.fx.Dragger);
    goog.fx.Dragger.HAS_SET_CAPTURE_ = goog.global.document && goog.global.document.documentElement && !!goog.global.document.documentElement.setCapture && !!goog.global.document.releaseCapture;
    goog.fx.Dragger.cloneNode = function(a) {
        for (var b = a.cloneNode(!0), c = goog.dom.getElementsByTagName(goog.dom.TagName.TEXTAREA, a), d = goog.dom.getElementsByTagName(goog.dom.TagName.TEXTAREA, b), e = 0; e < c.length; e++) d[e].value = c[e].value;
        switch (a.tagName) {
            case String(goog.dom.TagName.TR):
                return goog.dom.createDom(goog.dom.TagName.TABLE, null, goog.dom.createDom(goog.dom.TagName.TBODY, null, b));
            case String(goog.dom.TagName.TD):
            case String(goog.dom.TagName.TH):
                return goog.dom.createDom(goog.dom.TagName.TABLE, null,
                    goog.dom.createDom(goog.dom.TagName.TBODY, null, goog.dom.createDom(goog.dom.TagName.TR, null, b)));
            case String(goog.dom.TagName.TEXTAREA):
                b.value = a.value;
            default:
                return b
        }
    };
    goog.fx.Dragger.EventType = {
        EARLY_CANCEL: "earlycancel",
        START: "start",
        BEFOREDRAG: "beforedrag",
        DRAG: "drag",
        END: "end"
    };
    goog.fx.Dragger.prototype.enableRightPositioningForRtl = function(a) {
        this.useRightPositioningForRtl_ = a
    };
    goog.fx.Dragger.prototype.getHandler = function() {
        return this.eventHandler_
    };
    goog.fx.Dragger.prototype.setLimits = function(a) {
        this.limits = a || new goog.math.Rect(NaN, NaN, NaN, NaN)
    };
    goog.fx.Dragger.prototype.setHysteresis = function(a) {
        this.hysteresisDistanceSquared_ = Math.pow(a, 2)
    };
    goog.fx.Dragger.prototype.getHysteresis = function() {
        return Math.sqrt(this.hysteresisDistanceSquared_)
    };
    goog.fx.Dragger.prototype.setScrollTarget = function(a) {
        this.scrollTarget_ = a
    };
    goog.fx.Dragger.prototype.setCancelIeDragStart = function(a) {
        this.ieDragStartCancellingOn_ = a
    };
    goog.fx.Dragger.prototype.getEnabled = function() {
        return this.enabled_
    };
    goog.fx.Dragger.prototype.setEnabled = function(a) {
        this.enabled_ = a
    };
    goog.fx.Dragger.prototype.setPreventMouseDown = function(a) {
        this.preventMouseDown_ = a
    };
    goog.fx.Dragger.prototype.disposeInternal = function() {
        goog.fx.Dragger.superClass_.disposeInternal.call(this);
        goog.events.unlisten(this.handle, [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], this.startDrag, !1, this);
        this.cleanUpAfterDragging_();
        this.handle = this.target = null
    };
    goog.fx.Dragger.prototype.isRightToLeft_ = function() {
        goog.isDef(this.rightToLeft_) || (this.rightToLeft_ = goog.style.isRightToLeft(this.target));
        return this.rightToLeft_
    };
    goog.fx.Dragger.prototype.startDrag = function(a) {
        var b = a.type == goog.events.EventType.MOUSEDOWN;
        if (!this.enabled_ || this.dragging_ || b && !a.isMouseActionButton()) this.dispatchEvent(goog.fx.Dragger.EventType.EARLY_CANCEL);
        else {
            if (0 == this.hysteresisDistanceSquared_)
                if (this.fireDragStart_(a)) this.dragging_ = !0, this.preventMouseDown_ && b && a.preventDefault();
                else return;
            else this.preventMouseDown_ && b && a.preventDefault();
            this.setupDragHandlers();
            this.clientX = this.startX = a.clientX;
            this.clientY = this.startY = a.clientY;
            this.screenX = a.screenX;
            this.screenY = a.screenY;
            this.computeInitialPosition();
            this.pageScroll = goog.dom.getDomHelper(this.document_).getDocumentScroll()
        }
    };
    goog.fx.Dragger.prototype.setupDragHandlers = function() {
        var a = this.document_,
            b = a.documentElement,
            c = !goog.fx.Dragger.HAS_SET_CAPTURE_;
        this.eventHandler_.listen(a, [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE], this.handleMove_, c);
        this.eventHandler_.listen(a, [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP], this.endDrag, c);
        goog.fx.Dragger.HAS_SET_CAPTURE_ ? (b.setCapture(!1), this.eventHandler_.listen(b, goog.events.EventType.LOSECAPTURE, this.endDrag)) : this.eventHandler_.listen(goog.dom.getWindow(a),
            goog.events.EventType.BLUR, this.endDrag);
        goog.userAgent.IE && this.ieDragStartCancellingOn_ && this.eventHandler_.listen(a, goog.events.EventType.DRAGSTART, goog.events.Event.preventDefault);
        this.scrollTarget_ && this.eventHandler_.listen(this.scrollTarget_, goog.events.EventType.SCROLL, this.onScroll_, c)
    };
    goog.fx.Dragger.prototype.fireDragStart_ = function(a) {
        return this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.START, this, a.clientX, a.clientY, a))
    };
    goog.fx.Dragger.prototype.cleanUpAfterDragging_ = function() {
        this.eventHandler_.removeAll();
        goog.fx.Dragger.HAS_SET_CAPTURE_ && this.document_.releaseCapture()
    };
    goog.fx.Dragger.prototype.endDrag = function(a, b) {
        this.cleanUpAfterDragging_();
        if (this.dragging_) {
            this.dragging_ = !1;
            var c = this.limitX(this.deltaX),
                d = this.limitY(this.deltaY);
            this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.END, this, a.clientX, a.clientY, a, c, d, b || a.type == goog.events.EventType.TOUCHCANCEL))
        } else this.dispatchEvent(goog.fx.Dragger.EventType.EARLY_CANCEL)
    };
    goog.fx.Dragger.prototype.endDragCancel = function(a) {
        this.endDrag(a, !0)
    };
    goog.fx.Dragger.prototype.handleMove_ = function(a) {
        if (this.enabled_) {
            var b = (this.useRightPositioningForRtl_ && this.isRightToLeft_() ? -1 : 1) * (a.clientX - this.clientX),
                c = a.clientY - this.clientY;
            this.clientX = a.clientX;
            this.clientY = a.clientY;
            this.screenX = a.screenX;
            this.screenY = a.screenY;
            if (!this.dragging_) {
                var d = this.startX - this.clientX,
                    e = this.startY - this.clientY;
                if (d * d + e * e > this.hysteresisDistanceSquared_)
                    if (this.fireDragStart_(a)) this.dragging_ = !0;
                    else {
                        this.isDisposed() || this.endDrag(a);
                        return
                    }
            }
            c = this.calculatePosition_(b,
                c);
            b = c.x;
            c = c.y;
            this.dragging_ && this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.BEFOREDRAG, this, a.clientX, a.clientY, a, b, c)) && (this.doDrag(a, b, c, !1), a.preventDefault())
        }
    };
    goog.fx.Dragger.prototype.calculatePosition_ = function(a, b) {
        var c = goog.dom.getDomHelper(this.document_).getDocumentScroll();
        a += c.x - this.pageScroll.x;
        b += c.y - this.pageScroll.y;
        this.pageScroll = c;
        this.deltaX += a;
        this.deltaY += b;
        var c = this.limitX(this.deltaX),
            d = this.limitY(this.deltaY);
        return new goog.math.Coordinate(c, d)
    };
    goog.fx.Dragger.prototype.onScroll_ = function(a) {
        var b = this.calculatePosition_(0, 0);
        a.clientX = this.clientX;
        a.clientY = this.clientY;
        this.doDrag(a, b.x, b.y, !0)
    };
    goog.fx.Dragger.prototype.doDrag = function(a, b, c, d) {
        this.defaultAction(b, c);
        this.dispatchEvent(new goog.fx.DragEvent(goog.fx.Dragger.EventType.DRAG, this, a.clientX, a.clientY, a, b, c))
    };
    goog.fx.Dragger.prototype.limitX = function(a) {
        var b = this.limits,
            c = isNaN(b.left) ? null : b.left,
            b = isNaN(b.width) ? 0 : b.width;
        return Math.min(null != c ? c + b : Infinity, Math.max(null != c ? c : -Infinity, a))
    };
    goog.fx.Dragger.prototype.limitY = function(a) {
        var b = this.limits,
            c = isNaN(b.top) ? null : b.top,
            b = isNaN(b.height) ? 0 : b.height;
        return Math.min(null != c ? c + b : Infinity, Math.max(null != c ? c : -Infinity, a))
    };
    goog.fx.Dragger.prototype.computeInitialPosition = function() {
        this.deltaX = this.useRightPositioningForRtl_ ? goog.style.bidi.getOffsetStart(this.target) : this.target.offsetLeft;
        this.deltaY = this.target.offsetTop
    };
    goog.fx.Dragger.prototype.defaultAction = function(a, b) {
        this.useRightPositioningForRtl_ && this.isRightToLeft_() ? this.target.style.right = a + "px" : this.target.style.left = a + "px";
        this.target.style.top = b + "px"
    };
    goog.fx.Dragger.prototype.isDragging = function() {
        return this.dragging_
    };
    goog.fx.DragEvent = function(a, b, c, d, e, f, g, h) {
        goog.events.Event.call(this, a);
        this.clientX = c;
        this.clientY = d;
        this.browserEvent = e;
        this.left = goog.isDef(f) ? f : b.deltaX;
        this.top = goog.isDef(g) ? g : b.deltaY;
        this.dragger = b;
        this.dragCanceled = !!h
    };
    goog.inherits(goog.fx.DragEvent, goog.events.Event);
    goog.uri = {};
    goog.uri.utils = {};
    goog.uri.utils.CharCode_ = {
        AMPERSAND: 38,
        EQUAL: 61,
        HASH: 35,
        QUESTION: 63
    };
    goog.uri.utils.buildFromEncodedParts = function(a, b, c, d, e, f, g) {
        var h = "";
        a && (h += a + ":");
        c && (h += "//", b && (h += b + "@"), h += c, d && (h += ":" + d));
        e && (h += e);
        f && (h += "?" + f);
        g && (h += "#" + g);
        return h
    };
    goog.uri.utils.splitRe_ = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
    goog.uri.utils.ComponentIndex = {
        SCHEME: 1,
        USER_INFO: 2,
        DOMAIN: 3,
        PORT: 4,
        PATH: 5,
        QUERY_DATA: 6,
        FRAGMENT: 7
    };
    goog.uri.utils.split = function(a) {
        return a.match(goog.uri.utils.splitRe_)
    };
    goog.uri.utils.decodeIfPossible_ = function(a, b) {
        return a ? b ? decodeURI(a) : decodeURIComponent(a) : a
    };
    goog.uri.utils.getComponentByIndex_ = function(a, b) {
        return goog.uri.utils.split(b)[a] || null
    };
    goog.uri.utils.getScheme = function(a) {
        return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, a)
    };
    goog.uri.utils.getEffectiveScheme = function(a) {
        a = goog.uri.utils.getScheme(a);
        !a && goog.global.self && goog.global.self.location && (a = goog.global.self.location.protocol, a = a.substr(0, a.length - 1));
        return a ? a.toLowerCase() : ""
    };
    goog.uri.utils.getUserInfoEncoded = function(a) {
        return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, a)
    };
    goog.uri.utils.getUserInfo = function(a) {
        return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded(a))
    };
    goog.uri.utils.getDomainEncoded = function(a) {
        return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, a)
    };
    goog.uri.utils.getDomain = function(a) {
        return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded(a), !0)
    };
    goog.uri.utils.getPort = function(a) {
        return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, a)) || null
    };
    goog.uri.utils.getPathEncoded = function(a) {
        return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, a)
    };
    goog.uri.utils.getPath = function(a) {
        return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded(a), !0)
    };
    goog.uri.utils.getQueryData = function(a) {
        return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, a)
    };
    goog.uri.utils.getFragmentEncoded = function(a) {
        var b = a.indexOf("#");
        return 0 > b ? null : a.substr(b + 1)
    };
    goog.uri.utils.setFragmentEncoded = function(a, b) {
        return goog.uri.utils.removeFragment(a) + (b ? "#" + b : "")
    };
    goog.uri.utils.getFragment = function(a) {
        return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded(a))
    };
    goog.uri.utils.getHost = function(a) {
        a = goog.uri.utils.split(a);
        return goog.uri.utils.buildFromEncodedParts(a[goog.uri.utils.ComponentIndex.SCHEME], a[goog.uri.utils.ComponentIndex.USER_INFO], a[goog.uri.utils.ComponentIndex.DOMAIN], a[goog.uri.utils.ComponentIndex.PORT])
    };
    goog.uri.utils.getOrigin = function(a) {
        a = goog.uri.utils.split(a);
        return goog.uri.utils.buildFromEncodedParts(a[goog.uri.utils.ComponentIndex.SCHEME], null, a[goog.uri.utils.ComponentIndex.DOMAIN], a[goog.uri.utils.ComponentIndex.PORT])
    };
    goog.uri.utils.getPathAndAfter = function(a) {
        a = goog.uri.utils.split(a);
        return goog.uri.utils.buildFromEncodedParts(null, null, null, null, a[goog.uri.utils.ComponentIndex.PATH], a[goog.uri.utils.ComponentIndex.QUERY_DATA], a[goog.uri.utils.ComponentIndex.FRAGMENT])
    };
    goog.uri.utils.removeFragment = function(a) {
        var b = a.indexOf("#");
        return 0 > b ? a : a.substr(0, b)
    };
    goog.uri.utils.haveSameDomain = function(a, b) {
        var c = goog.uri.utils.split(a),
            d = goog.uri.utils.split(b);
        return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.SCHEME] == d[goog.uri.utils.ComponentIndex.SCHEME] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT]
    };
    goog.uri.utils.assertNoFragmentsOrQueries_ = function(a) {
        goog.asserts.assert(0 > a.indexOf("#") && 0 > a.indexOf("?"), "goog.uri.utils: Fragment or query identifiers are not supported: [%s]", a)
    };
    goog.uri.utils.parseQueryData = function(a, b) {
        if (a)
            for (var c = a.split("&"), d = 0; d < c.length; d++) {
                var e = c[d].indexOf("="),
                    f = null,
                    g = null;
                0 <= e ? (f = c[d].substring(0, e), g = c[d].substring(e + 1)) : f = c[d];
                b(f, g ? goog.string.urlDecode(g) : "")
            }
    };
    goog.uri.utils.appendQueryData_ = function(a) {
        if (a[1]) {
            var b = a[0],
                c = b.indexOf("#");
            0 <= c && (a.push(b.substr(c)), a[0] = b = b.substr(0, c));
            c = b.indexOf("?");
            0 > c ? a[1] = "?" : c == b.length - 1 && (a[1] = void 0)
        }
        return a.join("")
    };
    goog.uri.utils.appendKeyValuePairs_ = function(a, b, c) {
        goog.asserts.assertString(a);
        if (goog.isArray(b)) {
            goog.asserts.assertArray(b);
            for (var d = 0; d < b.length; d++) goog.uri.utils.appendKeyValuePairs_(a, String(b[d]), c)
        } else null != b && c.push("&", a, "" === b ? "" : "=", goog.string.urlEncode(b))
    };
    goog.uri.utils.buildQueryDataBuffer_ = function(a, b, c) {
        goog.asserts.assert(0 == Math.max(b.length - (c || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
        for (c = c || 0; c < b.length; c += 2) goog.uri.utils.appendKeyValuePairs_(b[c], b[c + 1], a);
        return a
    };
    goog.uri.utils.buildQueryData = function(a, b) {
        var c = goog.uri.utils.buildQueryDataBuffer_([], a, b);
        c[0] = "";
        return c.join("")
    };
    goog.uri.utils.buildQueryDataBufferFromMap_ = function(a, b) {
        for (var c in b) goog.uri.utils.appendKeyValuePairs_(c, b[c], a);
        return a
    };
    goog.uri.utils.buildQueryDataFromMap = function(a) {
        a = goog.uri.utils.buildQueryDataBufferFromMap_([], a);
        a[0] = "";
        return a.join("")
    };
    goog.uri.utils.appendParams = function(a, b) {
        return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([a], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([a], arguments, 1))
    };
    goog.uri.utils.appendParamsFromMap = function(a, b) {
        return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([a], b))
    };
    goog.uri.utils.appendParam = function(a, b, c) {
        a = [a, "&", b];
        goog.isDefAndNotNull(c) && a.push("=", goog.string.urlEncode(c));
        return goog.uri.utils.appendQueryData_(a)
    };
    goog.uri.utils.findParam_ = function(a, b, c, d) {
        for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d;) {
            var f = a.charCodeAt(b - 1);
            if (f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.QUESTION)
                if (f = a.charCodeAt(b + e), !f || f == goog.uri.utils.CharCode_.EQUAL || f == goog.uri.utils.CharCode_.AMPERSAND || f == goog.uri.utils.CharCode_.HASH) return b;
            b += e + 1
        }
        return -1
    };
    goog.uri.utils.hashOrEndRe_ = /#|$/;
    goog.uri.utils.hasParam = function(a, b) {
        return 0 <= goog.uri.utils.findParam_(a, 0, b, a.search(goog.uri.utils.hashOrEndRe_))
    };
    goog.uri.utils.getParamValue = function(a, b) {
        var c = a.search(goog.uri.utils.hashOrEndRe_),
            d = goog.uri.utils.findParam_(a, 0, b, c);
        if (0 > d) return null;
        var e = a.indexOf("&", d);
        if (0 > e || e > c) e = c;
        d += b.length + 1;
        return goog.string.urlDecode(a.substr(d, e - d))
    };
    goog.uri.utils.getParamValues = function(a, b) {
        for (var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = []; 0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) {
            d = a.indexOf("&", e);
            if (0 > d || d > c) d = c;
            e += b.length + 1;
            f.push(goog.string.urlDecode(a.substr(e, d - e)))
        }
        return f
    };
    goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
    goog.uri.utils.removeParam = function(a, b) {
        for (var c = a.search(goog.uri.utils.hashOrEndRe_), d = 0, e, f = []; 0 <= (e = goog.uri.utils.findParam_(a, d, b, c));) f.push(a.substring(d, e)), d = Math.min(a.indexOf("&", e) + 1 || c, c);
        f.push(a.substr(d));
        return f.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
    };
    goog.uri.utils.setParam = function(a, b, c) {
        return goog.uri.utils.appendParam(goog.uri.utils.removeParam(a, b), b, c)
    };
    goog.uri.utils.appendPath = function(a, b) {
        goog.uri.utils.assertNoFragmentsOrQueries_(a);
        goog.string.endsWith(a, "/") && (a = a.substr(0, a.length - 1));
        goog.string.startsWith(b, "/") && (b = b.substr(1));
        return goog.string.buildString(a, "/", b)
    };
    goog.uri.utils.setPath = function(a, b) {
        goog.string.startsWith(b, "/") || (b = "/" + b);
        var c = goog.uri.utils.split(a);
        return goog.uri.utils.buildFromEncodedParts(c[goog.uri.utils.ComponentIndex.SCHEME], c[goog.uri.utils.ComponentIndex.USER_INFO], c[goog.uri.utils.ComponentIndex.DOMAIN], c[goog.uri.utils.ComponentIndex.PORT], b, c[goog.uri.utils.ComponentIndex.QUERY_DATA], c[goog.uri.utils.ComponentIndex.FRAGMENT])
    };
    goog.uri.utils.StandardQueryParam = {
        RANDOM: "zx"
    };
    goog.uri.utils.makeUnique = function(a) {
        return goog.uri.utils.setParam(a, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
    };
    goog.Uri = function(a, b) {
        this.domain_ = this.userInfo_ = this.scheme_ = "";
        this.port_ = null;
        this.fragment_ = this.path_ = "";
        this.ignoreCase_ = this.isReadOnly_ = !1;
        var c;
        a instanceof goog.Uri ? (this.ignoreCase_ = goog.isDef(b) ? b : a.getIgnoreCase(), this.setScheme(a.getScheme()), this.setUserInfo(a.getUserInfo()), this.setDomain(a.getDomain()), this.setPort(a.getPort()), this.setPath(a.getPath()), this.setQueryData(a.getQueryData().clone()), this.setFragment(a.getFragment())) : a && (c = goog.uri.utils.split(String(a))) ? (this.ignoreCase_ = !!b, this.setScheme(c[goog.uri.utils.ComponentIndex.SCHEME] || "", !0), this.setUserInfo(c[goog.uri.utils.ComponentIndex.USER_INFO] || "", !0), this.setDomain(c[goog.uri.utils.ComponentIndex.DOMAIN] || "", !0), this.setPort(c[goog.uri.utils.ComponentIndex.PORT]), this.setPath(c[goog.uri.utils.ComponentIndex.PATH] || "", !0), this.setQueryData(c[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0), this.setFragment(c[goog.uri.utils.ComponentIndex.FRAGMENT] || "", !0)) : (this.ignoreCase_ = !!b, this.queryData_ = new goog.Uri.QueryData(null,
            null, this.ignoreCase_))
    };
    goog.Uri.preserveParameterTypesCompatibilityFlag = !1;
    goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
    goog.Uri.prototype.toString = function() {
        var a = [],
            b = this.getScheme();
        b && a.push(goog.Uri.encodeSpecialChars_(b, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), ":");
        var c = this.getDomain();
        if (c || "file" == b) a.push("//"), (b = this.getUserInfo()) && a.push(goog.Uri.encodeSpecialChars_(b, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), "@"), a.push(goog.Uri.removeDoubleEncoding_(goog.string.urlEncode(c))), c = this.getPort(), null != c && a.push(":", String(c));
        if (c = this.getPath()) this.hasDomain() && "/" != c.charAt(0) && a.push("/"),
            a.push(goog.Uri.encodeSpecialChars_(c, "/" == c.charAt(0) ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_, !0));
        (c = this.getEncodedQuery()) && a.push("?", c);
        (c = this.getFragment()) && a.push("#", goog.Uri.encodeSpecialChars_(c, goog.Uri.reDisallowedInFragment_));
        return a.join("")
    };
    goog.Uri.prototype.resolve = function(a) {
        var b = this.clone(),
            c = a.hasScheme();
        c ? b.setScheme(a.getScheme()) : c = a.hasUserInfo();
        c ? b.setUserInfo(a.getUserInfo()) : c = a.hasDomain();
        c ? b.setDomain(a.getDomain()) : c = a.hasPort();
        var d = a.getPath();
        if (c) b.setPort(a.getPort());
        else if (c = a.hasPath()) {
            if ("/" != d.charAt(0))
                if (this.hasDomain() && !this.hasPath()) d = "/" + d;
                else {
                    var e = b.getPath().lastIndexOf("/"); - 1 != e && (d = b.getPath().substr(0, e + 1) + d)
                }
            d = goog.Uri.removeDotSegments(d)
        }
        c ? b.setPath(d) : c = a.hasQuery();
        c ? b.setQueryData(a.getQueryData().clone()) :
            c = a.hasFragment();
        c && b.setFragment(a.getFragment());
        return b
    };
    goog.Uri.prototype.clone = function() {
        return new goog.Uri(this)
    };
    goog.Uri.prototype.getScheme = function() {
        return this.scheme_
    };
    goog.Uri.prototype.setScheme = function(a, b) {
        this.enforceReadOnly();
        if (this.scheme_ = b ? goog.Uri.decodeOrEmpty_(a, !0) : a) this.scheme_ = this.scheme_.replace(/:$/, "");
        return this
    };
    goog.Uri.prototype.hasScheme = function() {
        return !!this.scheme_
    };
    goog.Uri.prototype.getUserInfo = function() {
        return this.userInfo_
    };
    goog.Uri.prototype.setUserInfo = function(a, b) {
        this.enforceReadOnly();
        this.userInfo_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
        return this
    };
    goog.Uri.prototype.hasUserInfo = function() {
        return !!this.userInfo_
    };
    goog.Uri.prototype.getDomain = function() {
        return this.domain_
    };
    goog.Uri.prototype.setDomain = function(a, b) {
        this.enforceReadOnly();
        this.domain_ = b ? goog.Uri.decodeOrEmpty_(a, !0) : a;
        return this
    };
    goog.Uri.prototype.hasDomain = function() {
        return !!this.domain_
    };
    goog.Uri.prototype.getPort = function() {
        return this.port_
    };
    goog.Uri.prototype.setPort = function(a) {
        this.enforceReadOnly();
        if (a) {
            a = Number(a);
            if (isNaN(a) || 0 > a) throw Error("Bad port number " + a);
            this.port_ = a
        } else this.port_ = null;
        return this
    };
    goog.Uri.prototype.hasPort = function() {
        return null != this.port_
    };
    goog.Uri.prototype.getPath = function() {
        return this.path_
    };
    goog.Uri.prototype.setPath = function(a, b) {
        this.enforceReadOnly();
        this.path_ = b ? goog.Uri.decodeOrEmpty_(a, !0) : a;
        return this
    };
    goog.Uri.prototype.hasPath = function() {
        return !!this.path_
    };
    goog.Uri.prototype.hasQuery = function() {
        return "" !== this.queryData_.toString()
    };
    goog.Uri.prototype.setQueryData = function(a, b) {
        this.enforceReadOnly();
        a instanceof goog.Uri.QueryData ? (this.queryData_ = a, this.queryData_.setIgnoreCase(this.ignoreCase_)) : (b || (a = goog.Uri.encodeSpecialChars_(a, goog.Uri.reDisallowedInQuery_)), this.queryData_ = new goog.Uri.QueryData(a, null, this.ignoreCase_));
        return this
    };
    goog.Uri.prototype.setQuery = function(a, b) {
        return this.setQueryData(a, b)
    };
    goog.Uri.prototype.getEncodedQuery = function() {
        return this.queryData_.toString()
    };
    goog.Uri.prototype.getDecodedQuery = function() {
        return this.queryData_.toDecodedString()
    };
    goog.Uri.prototype.getQueryData = function() {
        return this.queryData_
    };
    goog.Uri.prototype.getQuery = function() {
        return this.getEncodedQuery()
    };
    goog.Uri.prototype.setParameterValue = function(a, b) {
        this.enforceReadOnly();
        this.queryData_.set(a, b);
        return this
    };
    goog.Uri.prototype.setParameterValues = function(a, b) {
        this.enforceReadOnly();
        goog.isArray(b) || (b = [String(b)]);
        this.queryData_.setValues(a, b);
        return this
    };
    goog.Uri.prototype.getParameterValues = function(a) {
        return this.queryData_.getValues(a)
    };
    goog.Uri.prototype.getParameterValue = function(a) {
        return this.queryData_.get(a)
    };
    goog.Uri.prototype.getFragment = function() {
        return this.fragment_
    };
    goog.Uri.prototype.setFragment = function(a, b) {
        this.enforceReadOnly();
        this.fragment_ = b ? goog.Uri.decodeOrEmpty_(a) : a;
        return this
    };
    goog.Uri.prototype.hasFragment = function() {
        return !!this.fragment_
    };
    goog.Uri.prototype.hasSameDomainAs = function(a) {
        return (!this.hasDomain() && !a.hasDomain() || this.getDomain() == a.getDomain()) && (!this.hasPort() && !a.hasPort() || this.getPort() == a.getPort())
    };
    goog.Uri.prototype.makeUnique = function() {
        this.enforceReadOnly();
        this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
        return this
    };
    goog.Uri.prototype.removeParameter = function(a) {
        this.enforceReadOnly();
        this.queryData_.remove(a);
        return this
    };
    goog.Uri.prototype.setReadOnly = function(a) {
        this.isReadOnly_ = a;
        return this
    };
    goog.Uri.prototype.isReadOnly = function() {
        return this.isReadOnly_
    };
    goog.Uri.prototype.enforceReadOnly = function() {
        if (this.isReadOnly_) throw Error("Tried to modify a read-only Uri");
    };
    goog.Uri.prototype.setIgnoreCase = function(a) {
        this.ignoreCase_ = a;
        this.queryData_ && this.queryData_.setIgnoreCase(a);
        return this
    };
    goog.Uri.prototype.getIgnoreCase = function() {
        return this.ignoreCase_
    };
    goog.Uri.parse = function(a, b) {
        return a instanceof goog.Uri ? a.clone() : new goog.Uri(a, b)
    };
    goog.Uri.create = function(a, b, c, d, e, f, g, h) {
        h = new goog.Uri(null, h);
        a && h.setScheme(a);
        b && h.setUserInfo(b);
        c && h.setDomain(c);
        d && h.setPort(d);
        e && h.setPath(e);
        f && h.setQueryData(f);
        g && h.setFragment(g);
        return h
    };
    goog.Uri.resolve = function(a, b) {
        a instanceof goog.Uri || (a = goog.Uri.parse(a));
        b instanceof goog.Uri || (b = goog.Uri.parse(b));
        return a.resolve(b)
    };
    goog.Uri.removeDotSegments = function(a) {
        if (".." == a || "." == a) return "";
        if (goog.string.contains(a, "./") || goog.string.contains(a, "/.")) {
            var b = goog.string.startsWith(a, "/");
            a = a.split("/");
            for (var c = [], d = 0; d < a.length;) {
                var e = a[d++];
                "." == e ? b && d == a.length && c.push("") : ".." == e ? ((1 < c.length || 1 == c.length && "" != c[0]) && c.pop(), b && d == a.length && c.push("")) : (c.push(e), b = !0)
            }
            return c.join("/")
        }
        return a
    };
    goog.Uri.decodeOrEmpty_ = function(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    };
    goog.Uri.encodeSpecialChars_ = function(a, b, c) {
        return goog.isString(a) ? (a = encodeURI(a).replace(b, goog.Uri.encodeChar_), c && (a = goog.Uri.removeDoubleEncoding_(a)), a) : null
    };
    goog.Uri.encodeChar_ = function(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    };
    goog.Uri.removeDoubleEncoding_ = function(a) {
        return a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")
    };
    goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
    goog.Uri.reDisallowedInRelativePath_ = /[\#\?:]/g;
    goog.Uri.reDisallowedInAbsolutePath_ = /[\#\?]/g;
    goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g;
    goog.Uri.reDisallowedInFragment_ = /#/g;
    goog.Uri.haveSameDomain = function(a, b) {
        var c = goog.uri.utils.split(a),
            d = goog.uri.utils.split(b);
        return c[goog.uri.utils.ComponentIndex.DOMAIN] == d[goog.uri.utils.ComponentIndex.DOMAIN] && c[goog.uri.utils.ComponentIndex.PORT] == d[goog.uri.utils.ComponentIndex.PORT]
    };
    goog.Uri.QueryData = function(a, b, c) {
        this.count_ = this.keyMap_ = null;
        this.encodedQuery_ = a || null;
        this.ignoreCase_ = !!c
    };
    goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function() {
        if (!this.keyMap_ && (this.keyMap_ = new goog.structs.Map, this.count_ = 0, this.encodedQuery_)) {
            var a = this;
            goog.uri.utils.parseQueryData(this.encodedQuery_, function(b, c) {
                a.add(goog.string.urlDecode(b), c)
            })
        }
    };
    goog.Uri.QueryData.createFromMap = function(a, b, c) {
        b = goog.structs.getKeys(a);
        if ("undefined" == typeof b) throw Error("Keys are undefined");
        c = new goog.Uri.QueryData(null, null, c);
        a = goog.structs.getValues(a);
        for (var d = 0; d < b.length; d++) {
            var e = b[d],
                f = a[d];
            goog.isArray(f) ? c.setValues(e, f) : c.add(e, f)
        }
        return c
    };
    goog.Uri.QueryData.createFromKeysValues = function(a, b, c, d) {
        if (a.length != b.length) throw Error("Mismatched lengths for keys/values");
        c = new goog.Uri.QueryData(null, null, d);
        for (d = 0; d < a.length; d++) c.add(a[d], b[d]);
        return c
    };
    goog.Uri.QueryData.prototype.getCount = function() {
        this.ensureKeyMapInitialized_();
        return this.count_
    };
    goog.Uri.QueryData.prototype.add = function(a, b) {
        this.ensureKeyMapInitialized_();
        this.invalidateCache_();
        a = this.getKeyName_(a);
        var c = this.keyMap_.get(a);
        c || this.keyMap_.set(a, c = []);
        c.push(b);
        this.count_ = goog.asserts.assertNumber(this.count_) + 1;
        return this
    };
    goog.Uri.QueryData.prototype.remove = function(a) {
        this.ensureKeyMapInitialized_();
        a = this.getKeyName_(a);
        return this.keyMap_.containsKey(a) ? (this.invalidateCache_(), this.count_ = goog.asserts.assertNumber(this.count_) - this.keyMap_.get(a).length, this.keyMap_.remove(a)) : !1
    };
    goog.Uri.QueryData.prototype.clear = function() {
        this.invalidateCache_();
        this.keyMap_ = null;
        this.count_ = 0
    };
    goog.Uri.QueryData.prototype.isEmpty = function() {
        this.ensureKeyMapInitialized_();
        return 0 == this.count_
    };
    goog.Uri.QueryData.prototype.containsKey = function(a) {
        this.ensureKeyMapInitialized_();
        a = this.getKeyName_(a);
        return this.keyMap_.containsKey(a)
    };
    goog.Uri.QueryData.prototype.containsValue = function(a) {
        var b = this.getValues();
        return goog.array.contains(b, a)
    };
    goog.Uri.QueryData.prototype.getKeys = function() {
        this.ensureKeyMapInitialized_();
        for (var a = this.keyMap_.getValues(), b = this.keyMap_.getKeys(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c
    };
    goog.Uri.QueryData.prototype.getValues = function(a) {
        this.ensureKeyMapInitialized_();
        var b = [];
        if (goog.isString(a)) this.containsKey(a) && (b = goog.array.concat(b, this.keyMap_.get(this.getKeyName_(a))));
        else {
            a = this.keyMap_.getValues();
            for (var c = 0; c < a.length; c++) b = goog.array.concat(b, a[c])
        }
        return b
    };
    goog.Uri.QueryData.prototype.set = function(a, b) {
        this.ensureKeyMapInitialized_();
        this.invalidateCache_();
        a = this.getKeyName_(a);
        this.containsKey(a) && (this.count_ = goog.asserts.assertNumber(this.count_) - this.keyMap_.get(a).length);
        this.keyMap_.set(a, [b]);
        this.count_ = goog.asserts.assertNumber(this.count_) + 1;
        return this
    };
    goog.Uri.QueryData.prototype.get = function(a, b) {
        var c = a ? this.getValues(a) : [];
        return goog.Uri.preserveParameterTypesCompatibilityFlag ? 0 < c.length ? c[0] : b : 0 < c.length ? String(c[0]) : b
    };
    goog.Uri.QueryData.prototype.setValues = function(a, b) {
        this.remove(a);
        0 < b.length && (this.invalidateCache_(), this.keyMap_.set(this.getKeyName_(a), goog.array.clone(b)), this.count_ = goog.asserts.assertNumber(this.count_) + b.length)
    };
    goog.Uri.QueryData.prototype.toString = function() {
        if (this.encodedQuery_) return this.encodedQuery_;
        if (!this.keyMap_) return "";
        for (var a = [], b = this.keyMap_.getKeys(), c = 0; c < b.length; c++)
            for (var d = b[c], e = goog.string.urlEncode(d), d = this.getValues(d), f = 0; f < d.length; f++) {
                var g = e;
                "" !== d[f] && (g += "=" + goog.string.urlEncode(d[f]));
                a.push(g)
            }
        return this.encodedQuery_ = a.join("&")
    };
    goog.Uri.QueryData.prototype.toDecodedString = function() {
        return goog.Uri.decodeOrEmpty_(this.toString())
    };
    goog.Uri.QueryData.prototype.invalidateCache_ = function() {
        this.encodedQuery_ = null
    };
    goog.Uri.QueryData.prototype.filterKeys = function(a) {
        this.ensureKeyMapInitialized_();
        this.keyMap_.forEach(function(b, c) {
            goog.array.contains(a, c) || this.remove(c)
        }, this);
        return this
    };
    goog.Uri.QueryData.prototype.clone = function() {
        var a = new goog.Uri.QueryData;
        a.encodedQuery_ = this.encodedQuery_;
        this.keyMap_ && (a.keyMap_ = this.keyMap_.clone(), a.count_ = this.count_);
        return a
    };
    goog.Uri.QueryData.prototype.getKeyName_ = function(a) {
        a = String(a);
        this.ignoreCase_ && (a = a.toLowerCase());
        return a
    };
    goog.Uri.QueryData.prototype.setIgnoreCase = function(a) {
        a && !this.ignoreCase_ && (this.ensureKeyMapInitialized_(), this.invalidateCache_(), this.keyMap_.forEach(function(a, c) {
            var d = c.toLowerCase();
            c != d && (this.remove(c), this.setValues(d, a))
        }, this));
        this.ignoreCase_ = a
    };
    goog.Uri.QueryData.prototype.extend = function(a) {
        for (var b = 0; b < arguments.length; b++) goog.structs.forEach(arguments[b], function(a, b) {
            this.add(b, a)
        }, this)
    };
    /*
     Portions of this code are from the Dojo Toolkit, received by
     The Closure Library Authors under the BSD license. All other code is
     Copyright 2005-2009 The Closure Library Authors. All Rights Reserved.

    The "New" BSD License:

    Copyright (c) 2005-2009, The Dojo Foundation
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

     Redistributions of source code must retain the above copyright notice, this
        list of conditions and the following disclaimer.
     Redistributions in binary form must reproduce the above copyright notice,
        this list of conditions and the following disclaimer in the documentation
        and/or other materials provided with the distribution.
     Neither the name of the Dojo Foundation nor the names of its contributors
        may be used to endorse or promote products derived from this software
        without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */
    goog.dom.query = function() {
        function a(a, b) {
            var c = b || [];
            a && c.push(a);
            return c
        }
        var b = goog.userAgent.WEBKIT && "BackCompat" == goog.dom.getDocument().compatMode,
            c = goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
            d = goog.dom.getDocument().firstChild.children ? "children" : "childNodes",
            e = !1,
            f = function(a) {
                a = 0 <= ">~+".indexOf(a.slice(-1)) ? a + " * " : a + " ";
                for (var b = function(b, c) {
                        return goog.string.trim(a.slice(b, c))
                    }, c = [], d = -1, f = -1, g = -1, h = -1, k = -1, y = -1, v = -1, w = "", l = "", r, n = 0, t = a.length, m = null, p = null, q = function() {
                        0 <=
                            y && (m.id = b(y, n).replace(/\\/g, ""), y = -1);
                        if (0 <= v) {
                            var a = v == n ? null : b(v, n);
                            0 > ">~+".indexOf(a) ? m.tag = a : m.oper = a;
                            v = -1
                        }
                        0 <= k && (m.classes.push(b(k + 1, n).replace(/\\/g, "")), k = -1)
                    }; w = l, l = a.charAt(n), n < t; n++) "\\" != w && (m || (r = n, m = {
                    query: null,
                    pseudos: [],
                    attrs: [],
                    classes: [],
                    tag: null,
                    oper: null,
                    id: null,
                    getTag: function() {
                        return e ? this.otag : this.tag
                    }
                }, v = n), 0 <= d ? "]" == l ? (p.attr ? p.matchFor = b(g || d + 1, n) : p.attr = b(d + 1, n), !(d = p.matchFor) || '"' != d.charAt(0) && "'" != d.charAt(0) || (p.matchFor = d.slice(1, -1)), m.attrs.push(p), p = null,
                    d = g = -1) : "=" == l && (g = 0 <= "|~^$*".indexOf(w) ? w : "", p.type = g + l, p.attr = b(d + 1, n - g.length), g = n + 1) : 0 <= f ? ")" == l && (0 <= h && (p.value = b(f + 1, n)), h = f = -1) : "#" == l ? (q(), y = n + 1) : "." == l ? (q(), k = n) : ":" == l ? (q(), h = n) : "[" == l ? (q(), d = n, p = {}) : "(" == l ? (0 <= h && (p = {
                    name: b(h + 1, n),
                    value: null
                }, m.pseudos.push(p)), f = n) : " " == l && w != l && (q(), 0 <= h && m.pseudos.push({
                    name: b(h + 1, n)
                }), m.loops = m.pseudos.length || m.attrs.length || m.classes.length, m.oquery = m.query = b(r, n), m.otag = m.tag = m.oper ? null : m.tag || "*", m.tag && (m.tag = m.tag.toUpperCase()), c.length && c[c.length -
                    1].oper && (m.infixOper = c.pop(), m.query = m.infixOper.query + " " + m.query), c.push(m), m = null));
                return c
            },
            g = function(a, b) {
                return a ? b ? function() {
                    return a.apply(window, arguments) && b.apply(window, arguments)
                } : a : b
            },
            h = function(a) {
                return 1 == a.nodeType
            },
            k = function(a, b) {
                return a ? "class" == b ? a.className || "" : "for" == b ? a.htmlFor || "" : "style" == b ? a.style.cssText || "" : (e ? a.getAttribute(b) : a.getAttribute(b, 2)) || "" : ""
            },
            l = {
                "*=": function(a, b) {
                    return function(c) {
                        return 0 <= k(c, a).indexOf(b)
                    }
                },
                "^=": function(a, b) {
                    return function(c) {
                        return 0 ==
                            k(c, a).indexOf(b)
                    }
                },
                "$=": function(a, b) {
                    var c = " " + b;
                    return function(b) {
                        b = " " + k(b, a);
                        return b.lastIndexOf(c) == b.length - c.length
                    }
                },
                "~=": function(a, b) {
                    var c = " " + b + " ";
                    return function(b) {
                        return 0 <= (" " + k(b, a) + " ").indexOf(c)
                    }
                },
                "|=": function(a, b) {
                    b = " " + b;
                    return function(c) {
                        c = " " + k(c, a);
                        return c == b || 0 == c.indexOf(b + "-")
                    }
                },
                "=": function(a, b) {
                    return function(c) {
                        return k(c, a) == b
                    }
                }
            },
            t = "undefined" == typeof goog.dom.getDocument().firstChild.nextElementSibling,
            u = t ? "nextSibling" : "nextElementSibling",
            N = t ? "previousSibling" :
            "previousElementSibling",
            x = t ? h : goog.functions.TRUE,
            D = function(a) {
                for (; a = a[N];)
                    if (x(a)) return !1;
                return !0
            },
            E = function(a) {
                for (; a = a[u];)
                    if (x(a)) return !1;
                return !0
            },
            z = function(a) {
                var b = a.parentNode,
                    c = 0,
                    e = b[d],
                    f = a._i || -1,
                    g = b._l || -1;
                if (!e) return -1;
                e = e.length;
                if (g == e && 0 <= f && 0 <= g) return f;
                b._l = e;
                f = -1;
                for (b = b.firstElementChild || b.firstChild; b; b = b[u]) x(b) && (b._i = ++c, a === b && (f = c));
                return f
            },
            O = function(a) {
                return !(z(a) % 2)
            },
            P = function(a) {
                return z(a) % 2
            },
            A = {
                checked: function(a, b) {
                    return function(a) {
                        return a.checked ||
                            a.attributes.checked
                    }
                },
                "first-child": function() {
                    return D
                },
                "last-child": function() {
                    return E
                },
                "only-child": function(a, b) {
                    return function(a) {
                        return D(a) && E(a) ? !0 : !1
                    }
                },
                empty: function(a, b) {
                    return function(a) {
                        var b = a.childNodes;
                        for (a = a.childNodes.length - 1; 0 <= a; a--) {
                            var c = b[a].nodeType;
                            if (1 === c || 3 == c) return !1
                        }
                        return !0
                    }
                },
                contains: function(a, b) {
                    var c = b.charAt(0);
                    if ('"' == c || "'" == c) b = b.slice(1, -1);
                    return function(a) {
                        return 0 <= a.innerHTML.indexOf(b)
                    }
                },
                not: function(a, b) {
                    var c = f(b)[0],
                        d = {
                            el: 1
                        };
                    "*" != c.tag && (d.tag =
                        1);
                    c.classes.length || (d.classes = 1);
                    var e = q(c, d);
                    return function(a) {
                        return !e(a)
                    }
                },
                "nth-child": function(a, b) {
                    if ("odd" == b) return P;
                    if ("even" == b) return O;
                    if (-1 != b.indexOf("n")) {
                        var c = b.split("n", 2),
                            d = c[0] ? "-" == c[0] ? -1 : parseInt(c[0], 10) : 1,
                            e = c[1] ? parseInt(c[1], 10) : 0,
                            f = 0,
                            g = -1;
                        0 < d ? 0 > e ? e = e % d && d + e % d : 0 < e && (e >= d && (f = e - e % d), e %= d) : 0 > d && (d *= -1, 0 < e && (g = e, e %= d));
                        if (0 < d) return function(a) {
                            a = z(a);
                            return a >= f && (0 > g || a <= g) && a % d == e
                        };
                        b = e
                    }
                    var h = parseInt(b, 10);
                    return function(a) {
                        return z(a) == h
                    }
                }
            },
            Q = c ? function(a) {
                var b = a.toLowerCase();
                "class" == b && (a = "className");
                return function(c) {
                    return e ? c.getAttribute(a) : c[a] || c[b]
                }
            } : function(a) {
                return function(b) {
                    return b && b.getAttribute && b.hasAttribute(a)
                }
            },
            q = function(a, b) {
                if (!a) return goog.functions.TRUE;
                b = b || {};
                var c = null;
                b.el || (c = g(c, h));
                b.tag || "*" != a.tag && (c = g(c, function(b) {
                    return b && b.tagName == a.getTag()
                }));
                b.classes || goog.array.forEach(a.classes, function(a, b, d) {
                    var e = new RegExp("(?:^|\\s)" + a + "(?:\\s|$)");
                    c = g(c, function(a) {
                        return e.test(a.className)
                    });
                    c.count = b
                });
                b.pseudos || goog.array.forEach(a.pseudos,
                    function(a) {
                        var b = a.name;
                        A[b] && (c = g(c, A[b](b, a.value)))
                    });
                b.attrs || goog.array.forEach(a.attrs, function(a) {
                    var b, d = a.attr;
                    a.type && l[a.type] ? b = l[a.type](d, a.matchFor) : d.length && (b = Q(d));
                    b && (c = g(c, b))
                });
                b.id || a.id && (c = g(c, function(b) {
                    return !!b && b.id == a.id
                }));
                c || "default" in b || (c = goog.functions.TRUE);
                return c
            },
            R = function(a) {
                return function(b, c, d) {
                    for (; b = b[u];)
                        if (!t || h(b)) {
                            d && !B(b, d) || !a(b) || c.push(b);
                            break
                        }
                    return c
                }
            },
            S = function(a) {
                return function(b, c, d) {
                    for (b = b[u]; b;) {
                        if (x(b)) {
                            if (d && !B(b, d)) break;
                            a(b) &&
                                c.push(b)
                        }
                        b = b[u]
                    }
                    return c
                }
            },
            T = function(a) {
                a = a || goog.functions.TRUE;
                return function(b, c, e) {
                    for (var f = 0, g = b[d]; b = g[f++];) x(b) && (!e || B(b, e)) && a(b, f) && c.push(b);
                    return c
                }
            },
            F = {},
            G = function(c) {
                var d = F[c.query];
                if (d) return d;
                var e = c.infixOper,
                    e = e ? e.oper : "",
                    f = q(c, {
                        el: 1
                    }),
                    g = "*" == c.tag,
                    h = goog.dom.getDocument().getElementsByClassName;
                if (e) h = {
                    el: 1
                }, g && (h.tag = 1), f = q(c, h), "+" == e ? d = R(f) : "~" == e ? d = S(f) : ">" == e && (d = T(f));
                else if (c.id) f = !c.loops && g ? goog.functions.TRUE : q(c, {
                    el: 1,
                    id: 1
                }), d = function(b, d) {
                    var e = goog.dom.getDomHelper(b).getElement(c.id);
                    if (e && f(e)) {
                        if (9 == b.nodeType) return a(e, d);
                        for (var g = e.parentNode; g && g != b;) g = g.parentNode;
                        if (g) return a(e, d)
                    }
                };
                else if (h && /\{\s*\[native code\]\s*\}/.test(String(h)) && c.classes.length && !b) var f = q(c, {
                        el: 1,
                        classes: 1,
                        id: 1
                    }),
                    k = c.classes.join(" "),
                    d = function(b, c) {
                        for (var d = a(0, c), e, g = 0, h = b.getElementsByClassName(k); e = h[g++];) f(e, b) && d.push(e);
                        return d
                    };
                else g || c.loops ? (f = q(c, {
                        el: 1,
                        tag: 1,
                        id: 1
                    }), d = function(b, d) {
                        for (var e = a(0, d), g, h = 0, k = b.getElementsByTagName(c.getTag()); g = k[h++];) f(g, b) && e.push(g);
                        return e
                    }) :
                    d = function(b, d) {
                        for (var e = a(0, d), f, g = 0, h = b.getElementsByTagName(c.getTag()); f = h[g++];) e.push(f);
                        return e
                    };
                return F[c.query] = d
            },
            H = {},
            I = {},
            J = function(b) {
                var c = f(goog.string.trim(b));
                if (1 == c.length) {
                    var d = G(c[0]);
                    return function(a) {
                        if (a = d(a, [])) a.nozip = !0;
                        return a
                    }
                }
                return function(b) {
                    b = a(b);
                    for (var d, e, f = c.length, g, h, k = 0; k < f; k++) {
                        h = [];
                        d = c[k];
                        e = b.length - 1;
                        0 < e && (g = {}, h.nozip = !0);
                        e = G(d);
                        for (var C = 0; d = b[C]; C++) e(d, h, g);
                        if (!h.length) break;
                        b = h
                    }
                    return h
                }
            },
            K = !!goog.dom.getDocument().querySelectorAll && (!goog.userAgent.WEBKIT ||
                goog.userAgent.isVersionOrHigher("526")),
            L = function(a, d) {
                if (K) {
                    var e = I[a];
                    if (e && !d) return e
                }
                if (e = H[a]) return e;
                var e = a.charAt(0),
                    f = -1 == a.indexOf(" ");
                0 <= a.indexOf("#") && f && (d = !0);
                if (!K || d || -1 != ">~+".indexOf(e) || c && -1 != a.indexOf(":") || b && 0 <= a.indexOf(".") || -1 != a.indexOf(":contains") || -1 != a.indexOf("|=")) {
                    var g = a.split(/\s*,\s*/);
                    return H[a] = 2 > g.length ? J(a) : function(a) {
                        for (var b = 0, c = [], d; d = g[b++];) c = c.concat(J(d)(a));
                        return c
                    }
                }
                var h = 0 <= ">~+".indexOf(a.charAt(a.length - 1)) ? a + " *" : a;
                return I[a] = function(b) {
                    try {
                        if (9 !=
                            b.nodeType && !f) throw Error("");
                        var d = b.querySelectorAll(h);
                        c ? d.commentStrip = !0 : d.nozip = !0;
                        return d
                    } catch (e) {
                        return L(a, !0)(b)
                    }
                }
            },
            r = 0,
            U = c ? function(a) {
                return e ? a.getAttribute("_uid") || a.setAttribute("_uid", ++r) || r : a.uniqueID
            } : function(a) {
                return a._uid || (a._uid = ++r)
            },
            B = function(a, b) {
                if (!b) return 1;
                var c = U(a);
                return b[c] ? 0 : b[c] = 1
            },
            V = function(a) {
                if (a && a.nozip) return a;
                var b = [];
                if (!a || !a.length) return b;
                a[0] && b.push(a[0]);
                if (2 > a.length) return b;
                r++;
                if (c && e) {
                    var d = r + "";
                    a[0].setAttribute("_zipIdx", d);
                    for (var f =
                            1, g; g = a[f]; f++) a[f].getAttribute("_zipIdx") != d && b.push(g), g.setAttribute("_zipIdx", d)
                } else if (c && a.commentStrip) try {
                    for (f = 1; g = a[f]; f++) h(g) && b.push(g)
                } catch (k) {} else
                    for (a[0] && (a[0]._zipIdx = r), f = 1; g = a[f]; f++) a[f]._zipIdx != r && b.push(g), g._zipIdx = r;
                return b
            },
            M = function(a, b) {
                if (!a) return [];
                if (a.constructor == Array) return a;
                if (!goog.isString(a)) return [a];
                var d = b;
                if (goog.isString(d) && (d = goog.dom.getElement(d), !d)) return [];
                var d = d || goog.dom.getDocument(),
                    f = d.ownerDocument || d.documentElement;
                e = d.contentType &&
                    "application/xml" == d.contentType || goog.userAgent.OPERA && (d.doctype || "[object XMLDocument]" == f.toString()) || !!f && (c ? f.xml : d.xmlVersion || f.xmlVersion);
                return (d = L(a)(d)) && d.nozip ? d : V(d)
            };
        M.pseudos = A;
        return M
    }();
    goog.exportSymbol("goog.dom.query", goog.dom.query);
    goog.exportSymbol("goog.dom.query.pseudos", goog.dom.query.pseudos);
    if ("function" != goog.typeOf(gt)) var gt = function(a, b) {
        return a ? b ? b.querySelectorAll(a) : document.querySelectorAll(a) : this
    };
    gt.assetsPath = "assets/";
    gt.getAssetsPath = function(a) {
        !0 === COMPILED && (a = a.replace(".css", ".min.css"));
        return gt.assetsPath + a
    };
    gt.getSpritePath = function(a) {
        window.devicePixelRatio && 1 < window.devicePixelRatio && (a = a.replace(/\.(png)$/, "2x.$1"));
        return gt.getAssetsPath("images/generated/sprites/" + a)
    };
    gt.Platform = {
        DESKTOP: "desktop",
        TABLET: "tablet",
        MOBILE: "mobile",
        UNSUPPORTED: "unsupported"
    };
    goog.exportProperty(window, "gt", gt);
    gt.Animations = function(a) {
        this.el = a;
        this.phoneBarTopRed = gt("#phone-container .screen-top-bar-red")[0];
        this.prevUiScreen = this.curUiScreen = "intro";
        this.screenTransitionSpeed = .8;
        this.tweens = {};
        this.timelines = {};
        this.playButton = goog.dom.getElementByClass("play-btn", this.el);
        this.eventHandler = new goog.events.EventHandler(this)
    };
    goog.inherits(gt.Animations, goog.events.EventTarget);
    gt.Animations.prototype.init = function() {
        this.registerEvents()
    };
    gt.Animations.prototype.registerEvents = function() {
        this.playButton && this.eventHandler.listen(this.playButton, goog.events.EventType.CLICK, this.play)
    };
    gt.Animations.prototype.transition = function(a) {
        this.prevUiScreen = this.curUiScreen;
        this.curUiScreen = a;
        if (this.prevUiScreen !== this.curUiScreen) {
            a = gt("." + this.prevUiScreen, this.el)[0];
            var b = gt("." + this.curUiScreen, this.el)[0];
            // "schedule" !== this.curUiScreen ? TweenMax.to(this.phoneBarTopRed, .5, {
            //     opacity: 0,
            //     onComplete: function() {
            //         goog.style.setElementShown(this.phoneBarTopRed, !1)
            //     },
            //     onCompleteScope: this
            // }) : goog.style.setElementShown(this.phoneBarTopRed, !0);
            //goog.style.setElementShown(this.phoneBarTopRed, !0);
            TweenMax.set(a, {
                "z-index": 1
            });
            TweenMax.to(a, this.screenTransitionSpeed, {
                left: "100%",
                ease: Sine.easeInOut,
                onComplete: this.reset,
                onCompleteScope: this
            });
            TweenMax.set(b, {
                "z-index": 2
            });
            TweenMax.to(b, this.screenTransitionSpeed, {
                opacity: 1,
                left: "0%",
                ease: Sine.easeInOut
            })
        }
    };
    gt.Animations.prototype.createTimelines = function() {
        return this.masterTimeline = new TimelineMax({
            paused: !0
        })
    };
    gt.Animations.prototype.reset = function() {
        this.masterTimeline && this.masterTimeline.pause().progress(0);
        goog.dom.classlist.remove(this.el, "playing")
    };
    gt.Animations.prototype.replay = function() {
        this.masterTimeline.progress(0).play()
    };
    gt.Animations.prototype.play = function() {
        goog.dom.classlist.add(this.el, "playing");
        this.masterTimeline && this.masterTimeline.play()
    };
    gt.Animations.prototype.reverse = function() {
        this.masterTimeline && this.masterTimeline.reverse()
    };
    gt.Intro = function(a) {
        gt.Animations.call(this, a);
    };
    goog.inherits(gt.Intro, gt.Animations);
    gt.Timeline = function(a) {
        gt.Animations.call(this, a);
    };
    goog.inherits(gt.Timeline, gt.Animations);
    gt.QuickCreateMobile = function(a) {
        gt.Animations.call(this, a);
        this.animationTime_ = 19500;
        this.init()
    };
    goog.inherits(gt.QuickCreateMobile, gt.Animations);
    gt.QuickCreateMobile.prototype.play = function() {
        gt.QuickCreateMobile.superClass_.play.call(this);
        var a = goog.dom.getElementByClass("gif-animation", this.el),
            b = a.getAttribute("data-mobile-src");
        a.src = "";
        a.src = b;
        setTimeout(goog.bind(function() {
            this.reset()
        }, this), this.animationTime_)
    };
    gt.QuickCreate = function(a) {
        gt.Animations.call(this, a);
    };
    goog.inherits(gt.QuickCreate, gt.Animations);
    gt.Schedule = function(a) {
        gt.Animations.call(this, a);
    };
    goog.inherits(gt.Schedule, gt.Animations);
    gt.ScheduleMobile = function(a) {
        gt.Schedule.call(this, a)
    };
    goog.inherits(gt.ScheduleMobile, gt.Schedule);
    gt.ScheduleMobile.prototype.init = function() {
        gt.ScheduleMobile.superClass_.init.call(this);
        var a = this;
        this.masterTimeline.add(function() {
            a.reset()
        }, "+=.5")
    };
    gt.Phone = function() {
        goog.events.EventTarget.call(this);
        this.phoneContainerEl = goog.dom.getElement("phone-container");
        this.phoneInnerContainerEl = goog.dom.getElementByClass("phone-inner-container", this.phoneContainerEl);
        this.phoneEl = goog.dom.getElementByClass("phone", this.phoneContainerEl);
        this.screenEl = goog.dom.getElementByClass("screen", this.phoneContainerEl);
        this.screenContainerEl = goog.dom.getElementByClass("screen-container", this.screenEl);
        this.sectionEls_ = {};
        this.sectionDemos_ = {};
        this.activeSection_ =
            null;
        this.uiTransitionAnim = new gt.Animations(this.screenContainerEl);
        this.introAnim = new gt.Intro(gt(".intro", this.phoneContainerEl)[0]);
        this.timelineAnim = new gt.Timeline(gt(".timeline", this.phoneContainerEl)[0]);
        this.scheduleAnim = new gt.Schedule(gt(".schedule", this.phoneContainerEl)[0]);
        this.quickCreateAnim = new gt.QuickCreate(gt(".quick-create", this.phoneContainerEl)[0]);
        var a = goog.dom.getChildren(this.screenContainerEl);
        goog.array.forEach(a, function(a) {
            this.sectionEls_[a.className] = a;
            this.sectionDemos_[a.className] = null
        }, this);
        this.updateSize()
    };
    goog.inherits(gt.Phone, goog.events.EventTarget);
    goog.addSingletonGetter(gt.Phone);
    gt.Phone.prototype.animateIn = function(a, b) {
        this.activeSection_ = this.sectionEls_[a];
        // switch (a) {
        //     case "intro":
        //         b && this.playReverse("intro");
        //         break;
        //     case "timeline":
        //         b ? this.introAnim.setAnimationToEnd() : this.playDemoById("intro");
        //         break;
        //     default:
        //         this.resetDemoById(a)
        // }
        this.resetDemoById(a)
    };
    gt.Phone.prototype.animatedIn = function(a) {
        "timeline" !== a && "intro" !== a && this.playDemoById(a)
    };
    gt.Phone.prototype.playDemoById = function(a) {
        this.activeSection_ = this.sectionEls_[a];
        switch (a) {
            case "intro":
                this.introAnim.play();
                break;
            case "timeline":
                this.timelineAnim.play();
                break;
            case "schedule":
                this.scheduleAnim.play();
                break;
            case "quickcreate":
                this.quickCreateAnim.play()
        }
    };
    gt.Phone.prototype.playReverse = function(a) {
        switch (a) {
            case "intro":
            case "timeline":
                this.introAnim.reverse()
        }
    };
    gt.Phone.prototype.resetDemoById = function(a) {
        switch (a) {
            case "intro":
                this.introAnim.reset();
                break;
            case "timeline":
                this.timelineAnim.reset();
                break;
            case "schedule":
                this.scheduleAnim.reset();
                break;
            case "quickcreate":
                this.quickCreateAnim.reset()
        }
    };
    gt.Phone.prototype.setUIScroll = function(a) {
        this.uiTransitionAnim.transition(a)
    };
    gt.Phone.prototype.transformPhone = function(a, b) {
        goog.style.setStyle(this.phoneContainerEl, "transform", "translateY(" + gt.viewport.height * a + "px)")
    };
    gt.Phone.prototype.updateSize = function() {
        var a = 1,
            a = goog.math.clamp(gt.viewport.width / gt.viewport.height, .6, 1),
            a = goog.math.lerp(.4, 1, a),
            a = Math.floor(.6 * gt.viewport.height * a);
        goog.style.setSize(this.phoneEl, Math.floor(424 / 657 * a), a)
    };
    gt.Section = function(a, b) {
        goog.events.EventTarget.call(this);
        this.domElement = a;
        this.mediaWrapperEl_ = goog.dom.getElementByClass("media-wrapper", a);
        this.videoEl_ = gt("video", this.mediaWrapperEl_)[0];
        this.id = this.domElement.id;
        this.index = b;
        this.isTransitionEnabled_ = this.hasPlayedBackgroundVideo_ = this.isActive = !1;
        this.phone = gt.Phone.getInstance();
        this.eventHandler_ = new goog.events.EventHandler(this);
        this.videoEl_ && (goog.events.listen(window, "resize", this.resizeVideo, !1, this), this.resizeVideo())
    };
    goog.inherits(gt.Section, goog.events.EventTarget);
    gt.Section.prototype.activate = function() {
        this.isActive = !0;
        this.videoEl_ && (this.resizeVideo(), this.hasPlayedBackgroundVideo_ || this.eventHandler_.listen(this.videoEl_, "timeupdate", this.onVideoTimeUpdate, !1, this), this.eventHandler_.listen(this.videoEl_, "ended", this.onVideoEnd), this.videoEl_.play())
    };
    gt.Section.prototype.deactivate = function() {
        this.isActive = !1;
        this.videoEl_ && this.videoEl_.pause();
        this.eventHandler_.removeAll()
    };
    gt.Section.prototype.enableTransition = function() {
        this.isTransitionEnabled_ || (this.isTransitionEnabled_ = !0, goog.dom.classlist.enable(this.domElement, "transition", this.isTransitionEnabled_))
    };
    gt.Section.prototype.animateIn = function(a) {
        this.enableTransition();
        goog.dom.classlist.addRemove(this.domElement, "animate-out", "animate-in");
        this.phone.animateIn(this.id, a)
    };
    gt.Section.prototype.animatedIn = function() {
        this.phone.animatedIn(this.id);
        goog.dom.classlist.addRemove(this.domElement, "animate-out", "animated-in")
    };
    gt.Section.prototype.animateOut = function() {
        this.enableTransition();
        goog.dom.classlist.remove(this.domElement, "animate-in");
        goog.dom.classlist.remove(this.domElement, "animated-in");
        goog.dom.classlist.add(this.domElement, "animate-out")
    };
    gt.Section.prototype.resizeVideo = function() {
        var a = goog.style.getSize(this.videoEl_.parentNode),
            b = 1280 / 498,
            c, d;
        a.aspectRatio() > b ? (d = a.width, c = d / b) : (c = a.height, d = c * b);
        goog.style.setSize(this.videoEl_, d, c);
        goog.style.setPosition(this.videoEl_, (a.width - d) / 2, (a.height - c) / 2)
    };
    gt.Section.prototype.onVideoEnd = function(a) {
        "timeline" === this.id && (this.videoEl_.currentTime = .5);
        this.videoEl_.play()
    };
    gt.Section.prototype.onVideoTimeUpdate = function(a) {
        0 < this.videoEl_.currentTime && (this.hasPlayedBackgroundVideo_ = !0, goog.dom.classlist.add(this.videoEl_, "visible"), this.eventHandler_.unlisten(this.videoEl_, "timeupdate", this.onVideoTimeUpdate, !1, this))
    };
    gt.HomeSection = function(a, b) {
        gt.Section.call(this, a, b);
        this.scrollButton_ = goog.dom.getElementByClass("scroll-btn", this.domElement);
        this.scrollerDom_ = goog.dom.query(".main .container .scroller")[0];
        this.logoVideo_ = gt(".logo video", this.domElement)[0];
        this.headerEl_ = gt(".main-header")[0];
        this.numAssetsToLoad_ = 0;
        this.canEnableScrolling_ = !0;
        this.isLoadCompleted_ = this.isScrollingEnabled_ = !1;
        this.forceFiringVideoLoadDelay_ = new goog.async.Delay(this.forceFiringVideoLoad_, 1E4, this);
        this.enableScrolling(!1)
    };
    goog.inherits(gt.HomeSection, gt.Section);
    gt.HomeSection.prototype.activate = function() {
        if (!this.isLoadCompleted_) {
            this.isActive = !0;
            goog.dom.getElementsByClass("media", document.body);
            var a = new goog.net.ImageLoader;
            if (gt.platform === gt.Platform.DESKTOP) {
                var b = gt("video[data-preload]", document.body);
                goog.array.forEach(b, function(a) {
                    (goog.userAgent.GECKO || goog.userAgent.IE) && a.setAttribute("preload", "metadata");
                    goog.events.listenOnce(a, "canplay", this.handleLoaderEvent, !1, this);
                    this.numAssetsToLoad_++;
                    a.load()
                }, this);
                this.forceFiringVideoLoadDelay_.start()
            }
            var c =
                gt("*[data-all-src]"),
                b = [];
            goog.array.extend(b, c);
            switch (gt.platform) {
                case gt.Platform.DESKTOP:
                case gt.Platform.TABLET:
                    c = gt("*[data-desktop-src]");
                    goog.array.extend(b, c);
                    break;
                case gt.Platform.MOBILE:
                    c = gt("*[data-mobile-src]"), goog.array.extend(b, c)
            }
            goog.array.forEach(b, function(b) {
                var c = b.getAttribute("data-all-src"),
                    f = b.getAttribute("data-desktop-src"),
                    g = b.getAttribute("data-mobile-src");
                (c = c || f || g) && 0 < c.length && ("IMG" === b.tagName ? b.src = c : goog.style.setStyle(b, "background-image", "url(" + c + ")"), a.imageIdToRequestMap_[c]
                || (a.addImage(c, c), this.numAssetsToLoad_++))
            }, this);
            goog.events.listen(a, [goog.events.EventType.LOAD, goog.net.EventType.ERROR], this.handleLoaderEvent, !1, this);
            a.start();
            // gt.platform === gt.Platform.DESKTOP
            // && (this.canEnableScrolling_ = !1,
            //   goog.dom.classlist.add(this.domElement, "full"),
            //   goog.dom.classlist.add(this.domElement, "cannot-animate"),
            //   goog.events.listenOnce(this.logoVideo_,
            //     [gt.HomeSection.EventType.CANPLAY, gt.HomeSection.EventType.ENDED],
            //     this.handleVideoEvent_, !1, this),
            //   this.logoVideo_.play())
            this.canEnableScrolling_ = !0, !this.isScrollingEnabled_ && this.isLoadCompleted_ && this.enableScrolling(!0);
        }
    };
    gt.HomeSection.prototype.handleLoaderEvent = function(a) {
        switch (a.type) {
            case goog.events.EventType.LOAD:
            case gt.HomeSection.EventType.CANPLAY:
                this.numAssetsToLoad_--;
                break;
            case goog.net.EventType.ERROR:
                console.log("Got an error while loading images...")
        }
        0 === this.numAssetsToLoad_ && !1 === this.isLoadCompleted_ && (this.isLoadCompleted_ = !0, this.canEnableScrolling_ && this.enableScrolling(!0))
    };
    gt.HomeSection.prototype.enableScrolling = function(a) {
        goog.dom.classlist.enable(this.scrollerDom_, "enabled", a);
        this.isScrollingEnabled_ = a;
        gt.platform !== gt.Platform.MOBILE && (this.isScrollingEnabled_ && (this.forceFiringVideoLoadDelay_.stop(), goog.dom.classlist.add(this.headerEl_, "transition"), goog.dom.classlist.add(this.domElement, "transition-height"), setTimeout(goog.bind(function() {
                goog.dom.classlist.remove(this.domElement, "full");
                goog.dom.classlist.add(this.headerEl_, "show")
            }, this), 10), gt.navigation.start(),
            gt.navigation.enableInteractions(!0)), setTimeout(goog.bind(function() {
            goog.dom.classlist.enable(this.scrollButton_, "enabled", a)
        }, this), 1E3))
    };
    gt.HomeSection.prototype.forceFiringVideoLoad_ = function(a) {
        goog.dom.classlist.add(this.domElement, "fallback-logo");
        this.canEnableScrolling_ = this.isLoadCompleted_ = !0;
        this.enableScrolling(!0)
    };
    gt.HomeSection.prototype.handleVideoEvent_ = function(a) {
        switch (a.type) {
            case gt.HomeSection.EventType.CANPLAY:
                //this.logoVideo_.play();
                //goog.dom.classlist.addRemove(this.domElement, "cannot-animate", "can-animate");
                break;
            case gt.HomeSection.EventType.ENDED:
                this.canEnableScrolling_ = !0, !this.isScrollingEnabled_ && this.isLoadCompleted_ && this.enableScrolling(!0)
        }
    };
    gt.HomeSection.EventType = {
        CANPLAY: "canplay",
        ENDED: "ended"
    };
    gt.ab = {};
    gt.ab.init = function() {
        var a = document.querySelectorAll("[ab-show-on]");
        goog.iter.forEach(a, function(a) {
            var c = +a.getAttribute("ab-show-on");
            a.href += "&utm_campaign=variant-" + c;
            gt.ab.getVariant_() === c && goog.style.setStyle(a, "display", "inline")
        })
    };
    goog.exportSymbol("gt.ab.init", gt.ab.init);
    gt.ab.getVariant_ = function() {
        return window.chosenVariant
    };
    gt.Math = {};
    gt.Math.easeInOutCuad = function(a, b, c, d) {
        a /= d / 2;
        if (1 > a) return c / 2 * a * a + b;
        a--;
        return -c / 2 * (a * (a - 2) - 1) + b
    };
    gt.Math.easeInOutCubic = function(a, b, c, d) {
        a /= d / 2;
        if (1 > a) return c / 2 * a * a * a + b;
        a -= 2;
        return c / 2 * (a * a * a + 2) + b
    };
    gt.Math.easeOutCubic = function(a, b, c, d) {
        a /= d;
        a--;
        return c * (a * a * a + 1) + b
    };
    gt.Math.scaleAspect = function(a, b, c) {
        c = void 0 != c ? c : !0;
        var d = b.width / a.width,
            e = b.height / a.height,
            f = new goog.math.Rect,
            g = a.width * d,
            d = a.height * d;
        c ? Math.round(g) < b.width || Math.round(d) < b.height ? (f.width = a.width * e, f.height = a.height * e) : (f.width = g, f.height = d) : Math.round(g) > b.width || Math.round(d) > b.height ? (f.width = a.width * e, f.height = a.height * e) : (f.width = g, f.height = d);
        f.left = b.left + .5 * (b.width - f.width);
        f.top = b.top + .5 * (b.height - f.height);
        return f
    };
    gt.Math.map = function(a, b, c, d, e) {
        return gt.Math.lerp(gt.Math.norm(a, b, c), d, e)
    };
    gt.Math.norm = function(a, b, c) {
        return (a - b) / (c - b)
    };
    gt.Math.lerp = function(a, b, c) {
        return b + (c - b) * a
    };
    gt.NavigationInteractions = function() {
        goog.events.EventTarget.call(this);
        this.eventHandler_ = new goog.events.EventHandler(this);
        this.domElement_ = gt(".container .scroller")[0];
        this.domElementArrow_ = gt(".btn-arrow")[0];
        this.transitioning_ = this.ticking_ = !1;
        this.transitionSto_ = this.translateY_ = this.incY_ = this.difY_ = this.lastY_ = 0;
        this.eventType_ = null;
        this.launchTransition_ = this.loading_ = this.dragging_ = !1;
        this.transitionType_ = null;
        this.deltaTime_ = this.deltaTimeStart_ = 0;
        this.easingTimeTransition_ = 15
    };
    goog.inherits(gt.NavigationInteractions, goog.events.EventTarget);
    gt.NavigationInteractions.INTERACTION_THRESHOLD = 20;
    gt.NavigationInteractions.MIN_TRANSLATE = 50;
    gt.NavigationInteractions.TRANSITION_TIME = 3E3;
    gt.NavigationInteractions.EventType = {
        NEXT: "NavigationInteractionsNext",
        PREVIOUS: "NavigationInteractionsPrevious",
        REVERT: "NavigationInteractionsRevert"
    };
    gt.NavigationInteractions.prototype.init = function() {
        this.addListeners()
    };
    gt.NavigationInteractions.prototype.addListeners = function() {
        this.eventHandler_.listen(window, goog.events.EventType.RESIZE, this.onResize)
    };
    gt.NavigationInteractions.prototype.removeListeners = function() {
        this.eventHandler_.removeAll()
    };
    gt.NavigationInteractions.prototype.onResize = function(a) {
        this.translateY_ = gt.sections.currentTranslate;
        gt.utils.transformTranslate(this.domElement_, null, this.translateY_ + "px")
    };
    gt.NavigationInteractions.prototype.updateDeltaThreshold = function(a) {
        this.eventType_ = this.getEventType();
        !0 === a && this.launchTransition_ && this.transition_(this.eventType_)
    };
    gt.NavigationInteractions.prototype.getEventType = function() {
        var a = this.incY_;
        return Math.abs(a) > gt.NavigationInteractions.INTERACTION_THRESHOLD ? a < -gt.NavigationInteractions.INTERACTION_THRESHOLD ? gt.NavigationInteractions.EventType.NEXT : gt.NavigationInteractions.EventType.PREVIOUS : null
    };
    gt.NavigationInteractions.prototype.transition_ = function(a) {
        !1 === this.isTransitionOutOfRange_(a) && (this.loading_ = !0, this.transitionType_ = a, goog.events.dispatchEvent(this, {
            type: a,
            difY: this.difY_,
            incY: this.incY_,
            currentY: this.translateY_
        }))
    };
    gt.NavigationInteractions.prototype.isTransitionOutOfRange_ = function(a) {
        if (null === gt.sections.currentSection) return !0;
        if (gt.platform === gt.Platform.DESKTOP) {
            var b = gt.NavigationInteractions.EventType,
                c = a === b.NEXT && gt.scroller.hasReachedBottom();
            return a === b.PREVIOUS && gt.scroller.hasReachedTop() || c
        }
        return !1
    };
    gt.NavigationInteractions.prototype.transitionChange = function() {
        this.loading_ && (this.loading_ = !1);
        this.startTime();
        this.transitioning_ || (this.transitioning_ = !0, this.stepTimeStart_ = goog.now(), this.step())
    };
    gt.NavigationInteractions.prototype.step = function() {
        this.ticking_ = !1;
        if (this.transitioning_) {
            var a = gt.sections.currentTranslate;
            if (.005 > Math.abs(a - this.translateY_)) {
              this.translateY_ = a, this.transitioning_ = !1, gt.sections.updateActiveSections();
            }
            else {
                var a = gt.Math.easeInOutCubic(this.deltaTime_, this.translateY_, a - this.translateY_, gt.NavigationInteractions.TRANSITION_TIME),
                    b = goog.now(),
                    c = parseInt((b - this.deltaTimeStart_) / 16.66667, 10) + 1,
                    c = Math.min(Math.max(1, c), 2);
                this.deltaTime_ += 16.66667 * c;
                this.deltaTimeStart_ =
                    b;
                this.translateY_ = a;
                requestAnimationFrame(goog.bind(this.step, this))
            }
            gt.utils.transformTranslate(this.domElement_, null, this.translateY_ + "px")
        }
    };
    gt.NavigationInteractions.prototype.startTime = function() {
        this.deltaTime_ = 0;
        this.deltaTimeStart_ = goog.now()
    };
    gt.NavigationInteractions.prototype.updateTime = function() {
        this.deltaTime_ = goog.now() - this.deltaTimeStart_
    };
    gt.NavigationInteractions.prototype.endTime = function() {
        this.deltaTime_ = goog.now() - this.deltaTimeStart_;
        this.deltaTimeStart_ = goog.now()
    };
    gt.NavigationInteractionsSwipe = function() {
        gt.NavigationInteractions.call(this);
        this.maxPosY_ = 400;
        this.posLineY_ = 200;
        this.lastDeltaY_ = 0;
        this.isStable_ = !0;
        this.isSwiping_ = !1;
        this.showGraph_ = gt.showGraph || !1;
        this.ctx_ = this.canvas_ = null;
        this.posX_ = 0;
        this.maxPosX_ = gt.viewport.width;
        this.currentX_ = 0;
        this.currentY_ = 200;
        this.swipeFrames_ = this.swipeSto_ = this.swipeTime_ = 0;
        this.swipeTotalFrames_ = 40;
        this.showGraph_ && this.initGraph_()
    };
    goog.inherits(gt.NavigationInteractionsSwipe, gt.NavigationInteractions);
    gt.NavigationInteractionsSwipe.SWIPE_DELAY = 1E3;
    gt.NavigationInteractionsSwipe.prototype.init = function() {
        gt.NavigationInteractionsSwipe.superClass_.init.call(this);
        this.swipeTime_ = goog.now();
        requestAnimationFrame(goog.bind(this.stepSwipe_, this))
    };
    gt.NavigationInteractionsSwipe.prototype.addListeners = function() {
        gt.NavigationInteractionsSwipe.superClass_.addListeners.call(this);
        this.addWheelListeners_()
    };
    gt.NavigationInteractionsSwipe.prototype.removeListeners = function() {
        gt.NavigationInteractionsSwipe.superClass_.removeListeners.call(this);
        this.removeWheelListeners_()
    };
    gt.NavigationInteractionsSwipe.prototype.addWheelListeners_ = function() {
        this.eventHandler_.listen(this.domElement_, "wheel", this.onWheel_);
        this.eventHandler_.listen(this.domElement_, "mousewheel", this.onWheel_)
    };
    gt.NavigationInteractionsSwipe.prototype.removeWheelListeners_ = function() {
        this.eventHandler_.unlisten(this.domElement_, "wheel", this.onWheel_);
        this.eventHandler_.unlisten(this.domElement_, "mousewheel", this.onWheel_)
    };
    gt.NavigationInteractionsSwipe.prototype.onWheel_ = function(a) {
        a = a.getBrowserEvent();
        var b = 0;
        a.wheelDelta && (b = a.wheelDelta / 120);
        a.detail && (b = -a.detail / 3);
        a.deltaY && (b = -a.deltaY / 10);
        void 0 !== a.wheelDeltaY && (b = a.wheelDeltaY / 120);
        this.updateDelta_(b);
        a.stopPropagation && a.stopPropagation();
        a.cancelBubble = !0;
        a.preventDefault && a.preventDefault();
        return a.returnValue = !1
    };
    gt.NavigationInteractionsSwipe.prototype.updateDelta_ = function(a) {
        var b = .5 * this.maxPosY_ + 30 * a,
            c = !1;
        b > this.maxPosY_ && (c = !0, b = this.maxPosY_);
        0 > b && (c = !0, b = 0);
        c && this.isSwiping_ && (this.swipeFrames_ += 5);
        var c = this.isStable_ ? .01 : .25,
            d = Math.abs(a) > c,
            e = Math.abs(a) > Math.abs(this.lastDeltaY_),
            c = 0 > a && b < this.posLineY_ || 0 < a && b > this.posLineY_;
        1 === Math.abs(a) && (e = .5 >= Math.abs(this.lastDeltaY_));
        if (d = !this.isSwiping_ && !this.isDelaySwiping_ && d && c && e) this.lastDeltaY_ = a, this.isDelaySwiping_ = this.isSwiping_ = !0, this.swipeFrames_ =
            this.swipeTotalFrames_, clearTimeout(this.swipeSto_), this.swipeSto_ = setTimeout(goog.bind(function() {
                this.isDelaySwiping_ = !1
            }, this), gt.NavigationInteractionsSwipe.SWIPE_DELAY), 0 > a ? this.goNext_() : this.goPrevious_();
        c && (this.posLineY_ = b);
        this.isSwiping_ ? Math.abs(a) > Math.abs(this.lastDeltaY_) && (this.lastDeltaY_ = a) : this.lastDeltaY_ = a;
        this.showGraph_ && this.updateGraph_(b, d)
    };
    gt.NavigationInteractionsSwipe.prototype.stepSwipe_ = function() {
        var a = goog.now(),
            b = parseInt((a - this.swipeTime_) / 16.66667, 10) + 1;
        this.swipeTime_ = a;
        this.isSwiping_ && (this.swipeFrames_ -= b, !1 === this.isDelaySwiping_ && (this.swipeFrames_ = 0), 0 >= this.swipeFrames_ && (this.isSwiping_ = !1));
        a = .5 * this.maxPosY_;
        this.posLineY_ += (a - this.posLineY_) / 50 * b;
        b = this.posLineY_ > a && this.posLineY_ < a + 1;
        if (this.posLineY_ < a && this.posLineY_ > a - 1 || b) this.posLineY_ = a;
        this.isSwiping_ || (this.lastDeltaY_ = (this.posLineY_ - .5 * this.maxPosY_) /
            30);
        this.posLineY_ === a ? (this.isStable_ = !0, this.lastDeltaY_ = 0) : this.isStable_ = !1;
        this.showGraph_ && this.stepLineGraph_();
        requestAnimationFrame(goog.bind(this.stepSwipe_, this))
    };
    gt.NavigationInteractionsSwipe.prototype.goNext_ = function() {
        var a = this.transitioning_ && this.transitionType_ === gt.NavigationInteractions.EventType.PREVIOUS;
        gt.sections.lockNext && !a ? gt.sections.interactionNext() : this.transition_(gt.NavigationInteractions.EventType.NEXT)
    };
    gt.NavigationInteractionsSwipe.prototype.goPrevious_ = function() {
        gt.sections.lockPrevious ? gt.sections.interactionPrevious() : this.transition_(gt.NavigationInteractions.EventType.PREVIOUS)
    };
    gt.NavigationInteractionsSwipe.prototype.onResize = function(a) {
        gt.NavigationInteractionsSwipe.superClass_.onResize.call(this);
        this.showGraph_ && this.resizeGraph_()
    };
    gt.NavigationInteractionsSwipe.prototype.initGraph_ = function() {
        var a = document.createElement("div");
        goog.dom.classlist.add(a, "graph-swipe");
        document.body.appendChild(a);
        this.canvas_ = document.createElement("canvas");
        a.appendChild(this.canvas_);
        this.line_ = document.createElement("div");
        a.appendChild(this.line_);
        this.canvas_.width = this.maxPosX_;
        this.canvas_.height = this.maxPosY_;
        this.ctx_ = this.canvas_.getContext("2d");
        this.ctx_.lineWidth = 4
    };
    gt.NavigationInteractionsSwipe.prototype.resizeGraph_ = function() {
        this.maxPosX_ = gt.viewport.width;
        this.canvas_.width = this.maxPosX_;
        this.canvas_.height = this.maxPosY_;
        this.ctx_.lineWidth = 4;
        this.posX_ = 0
    };
    gt.NavigationInteractionsSwipe.prototype.updateGraph_ = function(a, b) {
        this.ctx_.strokeStyle = b ? "#ff0bdd" : this.isSwiping_ ? "#0000cc" : "#00cc00";
        0 === this.posX_ && (this.ctx_.clearRect(0, 0, this.maxPosX_, this.maxPosY_), this.currentX_ = 0, this.currentY_ = 200);
        this.ctx_.beginPath();
        this.ctx_.moveTo(this.currentX_, this.currentY_);
        this.ctx_.lineTo(this.posX_, a);
        this.ctx_.stroke();
        this.currentX_ = this.posX_;
        this.currentY_ = a;
        this.posX_ += 4;
        this.posX_ > this.maxPosX_ && (this.posX_ = 0)
    };
    gt.NavigationInteractionsSwipe.prototype.stepLineGraph_ = function() {
        goog.style.setStyle(this.line_, "transform", "translate3d(0," + this.posLineY_ + "px, 0)")
    };
    gt.NavigationInteractionsTouch = function() {
        gt.NavigationInteractions.call(this);
        this.difY_ = this.prevPos_ = this.incPos_ = this.startPos_ = 0;
        this.hasDrag_ = this.transitioning_ = this.dragging_ = this.swiping_ = !1
    };
    goog.inherits(gt.NavigationInteractionsTouch, gt.NavigationInteractions);
    gt.NavigationInteractionsTouch.prototype.addListeners = function() {
        gt.NavigationInteractionsTouch.superClass_.addListeners.call(this);
        this.eventHandler_.listen(this.domElement_, "touchstart", this.onTouchStart_)
    };
    gt.NavigationInteractionsTouch.prototype.addTouchEndListener_ = function() {
        this.eventHandler_.listen(this.domElement_, "touchmove", this.onTouchMove_);
        this.eventHandler_.listen(this.domElement_, "touchend", this.onTouchEnd_)
    };
    gt.NavigationInteractionsTouch.prototype.removeTouchEndListener_ = function() {
        this.eventHandler_.unlisten(this.domElement_, "touchmove", this.onTouchMove_);
        this.eventHandler_.unlisten(this.domElement_, "touchend", this.onTouchEnd_)
    };
    gt.NavigationInteractionsTouch.prototype.onTouchStart_ = function(a) {
        this.dragging_ = !0;
        this.eventType_ = null;
        this.startPos_ = a.event_.changedTouches[0].clientY;
        this.prevPos_ = this.incPos_ = 0;
        this.setupDeltaTouchValues_(this.startPos_);
        this.addTouchEndListener_()
    };
    gt.NavigationInteractionsTouch.prototype.onTouchMove_ = function(a) {
        a.preventDefault();
        this.dragging_ && !this.ticking_ ? (a = a.event_.changedTouches[0].clientY, this.prevPos_ = this.incPos_ = a - this.startPos_, this.updateDeltaTouchValues_(a), this.updateSwiping(), this.updateDeltaThreshold(!1), this.hasDrag_ && !this.transitioning_ && (this.ticking_ = !0, requestAnimationFrame(goog.bind(this.step, this)))) : this.setupDeltaTouchValues_(a.event_.changedTouches[0].clientY)
    };
    gt.NavigationInteractionsTouch.prototype.onTouchEnd_ = function(a) {
        this.launchTransition_ && (this.launchTransition_ = !1);
        if (gt.sections.lockNext && 0 > this.incPos_ && !this.transitioning_ || gt.sections.lockPrevious && 0 < this.incPos_) this.eventType_ = null;
        null === this.eventType_ ? this.transitioning_ || (this.transitioning_ = !0, this.startTime(), requestAnimationFrame(goog.bind(this.step, this))) : this.transition_(this.eventType_);
        this.dragging_ = !1;
        this.removeTouchEndListener_()
    };
    gt.NavigationInteractionsTouch.prototype.setupDeltaTouchValues_ = function(a) {
        this.eventType_ = null;
        this.incY_ = this.difY_ = 0;
        this.lastY_ = a
    };
    gt.NavigationInteractionsTouch.prototype.updateDeltaTouchValues_ = function(a) {
        this.difY_ = a - this.lastY_;
        this.incY_ += this.difY_;
        this.lastY_ = a
    };
    gt.NavigationInteractionsTouch.prototype.updateSwiping = function() {
        var a = !1,
            b = this.transitioning_ && this.transitionType_ === gt.NavigationInteractions.EventType.PREVIOUS;
        gt.sections.lockNext && -10 >= this.incPos_ && !b && (a = !0, gt.sections.interactionNext());
        gt.sections.lockPrevious && 10 <= this.incPos_ && (a = !0, gt.sections.interactionPrevious());
        a && (this.endTime(), this.swiping_ = !0, this.dragging_ = !1, this.removeTouchEndListener_(), this.updateDeltaTransition(), this.transitioning_ || (this.transitioning_ = !0, this.step()),
            setTimeout(goog.bind(function() {
                this.swiping_ = !1
            }, this), 1E3))
    };
    gt.NavigationController = function() {
        goog.events.EventTarget.call(this);
        this.eventHandler_ = new goog.events.EventHandler(this);
        this.interactionEventHandler_ = new goog.events.EventHandler(this);
        this.navigationInteractionsExtra_ = this.navigationInteractions_ = null;
        this.isDesktopTouch_ = gt.platform === gt.Platform.DESKTOP && Modernizr.touch;
        this.location = null;
        this.useHash_ = !1
    };
    goog.inherits(gt.NavigationController, goog.events.EventTarget);
    gt.NavigationController.LOCATION_CHANGE = "location_change";
    gt.NavigationController.prototype.init = function() {
        this.createInteractions_();
        this.addListeners_()
    };
    gt.NavigationController.prototype.start = function() {
        if ("" !== window.location.hash) this.changeLocation_(window.location.hash);
        else {
            var a = gt.sections.getSectionByIndex(0).id;
            this.changeLocation(a)
        }
    };
    gt.NavigationController.prototype.createInteractions_ = function() {
        this.navigationInteractions_ = null;
        switch (gt.platform) {
            case gt.Platform.DESKTOP:
                this.navigationInteractions_ = new gt.NavigationInteractionsSwipe;
                break;
            case gt.Platform.MOBILE:
                this.navigationInteractions_ = new gt.NavigationInteractionsSwipe;
                break;
            default:
                this.navigationInteractions_ = new gt.NavigationInteractionsTouch
        }
        this.navigationInteractions_.init();
        this.isDesktopTouch_ && (this.navigationInteractionsExtra_ = new gt.NavigationInteractionsTouch,
            this.navigationInteractionsExtra_.init())
    };
    gt.NavigationController.prototype.enableInteractions = function(a) {
        a ? (this.interactionEventHandler_.listen(this.navigationInteractions_, gt.NavigationInteractions.EventType.PREVIOUS, this.gotoPrevious_, !1, this), this.interactionEventHandler_.listen(this.navigationInteractions_, gt.NavigationInteractions.EventType.NEXT, this.gotoNext_, !1, this), this.isDesktopTouch_ && (this.interactionEventHandler_.listen(this.navigationInteractionsExtra_, gt.NavigationInteractions.EventType.PREVIOUS, this.gotoPrevious_, !1, this),
            this.interactionEventHandler_.listen(this.navigationInteractionsExtra_, gt.NavigationInteractions.EventType.NEXT, this.gotoNext_, !1, this))) : this.interactionEventHandler_.removeAll()
    };
    gt.NavigationController.prototype.gotoPrevious_ = function(a) {
        gt.scroller.hasReachedTop() || this.changeLocation(gt.sections.getPreviousToken())
    };
    gt.NavigationController.prototype.gotoNext_ = function(a) {
        gt.scroller.hasReachedBottom() || this.changeLocation(gt.sections.getNextToken())
    };
    gt.NavigationController.prototype.addListeners_ = function() {
        this.eventHandler_.listen(window, "hashchange", this.onHashChange_);
        this.eventHandler_.listen(document.body, "click", this.onDocumentClick_)
    };
    gt.NavigationController.prototype.onDocumentClick_ = function(a) {
        var b = goog.dom.getAncestorByTagNameAndClass(a.target, "a");
        if (b && b.href.match("#") && 0 <= b.href.indexOf(gt.utils.getLocationOrigin())) {
            var b = b.href.replace(gt.utils.getLocationOrigin(), ""),
                c = b.indexOf("#"),
                b = b.substring(c, b.length);
            this.useHash_ || (a.preventDefault(), this.changeLocation_(b))
        }
    };
    gt.NavigationController.prototype.onHashChange_ = function(a) {
        this.changeLocation_(window.location.hash)
    };
    gt.NavigationController.prototype.changeLocation_ = function(a) {
        a = gt.utils.getLocationToken(a);
        var b = this.location;
        !1 === goog.array.equals(this.location, a) && (this.location = a, gt.scroller.scrollByToken(this.getLocation()), this.dispatchEvent({
            type: gt.NavigationController.LOCATION_CHANGE,
            location: this.location,
            previousLocation: b
        }))
    };
    gt.NavigationController.prototype.changeLocation = function(a) {
        this.useHash_ ? window.location.hash = "/" + a : this.changeLocation_(a)
    };
    gt.NavigationController.prototype.getLocation = function() {
        return this.location.join("/")
    };
    gt.SnappyCarousel = function(a, b, c) {
        this.outerEl_ = a;
        this.innerEl_ = b;
        this.numSlides = this.getNumSlides();
        this.speed = .5;
        this.currentSlide = this.slideX = 0;
        this.eventHandler_ = new goog.events.EventHandler(this);
        this.onSlideChangeCallback_ = c || goog.nullFunction;
        this.scrollProps = {
            x1: 0,
            x2: 0,
            t1: 0,
            t2: 0,
            startX: 0,
            endX: 0,
            originalX: 0
        };
        this.isVerticalDragging_ = !0;
        this.dragger = new goog.fx.Dragger(this.outerEl_);
        this.dragger.setHysteresis(10);
        this.dragger.defaultAction = goog.bind(this.onDrag_, this);
        this.tweener_ = new TweenMax(this,
            this.speed, {
                slideX: 0,
                paused: !0,
                onUpdate: this.updateSlidePosition_,
                onUpdateScope: this
            });
        this.enable(!0)
    };
    gt.SnappyCarousel.prototype.enable = function(a) {
        this.dragger.setEnabled(a);
        a ? this.registerEvents_() : this.unregisterEvents_()
    };
    gt.SnappyCarousel.prototype.getNumSlides = function() {
        return goog.dom.getChildren(this.innerEl_).length
    };
    gt.SnappyCarousel.prototype.gotoSlide = function(a) {
        this.currentSlide = a;
        var b = this.getOuterWidth_() * this.currentSlide;
        this.animate_(b);
        this.onSlideChangeCallback_(a)
    };
    gt.SnappyCarousel.prototype.nextSlide = function() {
        var a = Math.min(this.currentSlide + 1, this.numSlides - 1);
        this.gotoSlide(a)
    };
    gt.SnappyCarousel.prototype.previousSlide = function() {
        var a = Math.max(this.currentSlide - 1, 0);
        this.gotoSlide(a)
    };
    gt.SnappyCarousel.prototype.registerEvents_ = function() {
        this.eventHandler_.listen(this.dragger, goog.fx.Dragger.EventType.START, this.onDragStart_);
        this.eventHandler_.listen(this.dragger, goog.fx.Dragger.EventType.END, this.onDragEnd_)
    };
    gt.SnappyCarousel.prototype.unregisterEvents_ = function() {
        this.eventHandler_.removeAll()
    };
    gt.SnappyCarousel.prototype.getOuterWidth_ = function() {
        return goog.style.getSize(this.outerEl_).width
    };
    gt.SnappyCarousel.prototype.animate_ = function(a) {
        this.tweener_.play();
        this.tweener_.updateTo({
            slideX: a
        }, !0)
    };
    gt.SnappyCarousel.prototype.updateSlidePosition_ = function() {
        Modernizr.csstransforms ? goog.style.setStyle(this.innerEl_, "transform", "translateX(" + -this.slideX + "px)") : goog.style.setStyle(this.innerEl_, "left", -this.slideX + "px")
    };
    gt.SnappyCarousel.prototype.onDrag_ = function(a, b) {
        if (!this.isVerticalDragging_) {
            this.tweener_.isActive() && this.tweener_.pause();
            var c = this.dragger.clientX;
            this.scrollProps.x2 = this.scrollProps.x1;
            this.scrollProps.t2 = this.scrollProps.t1;
            this.scrollProps.t1 = goog.now();
            this.scrollProps.x1 = c;
            this.scrollProps.endX = c;
            this.slideX = this.scrollProps.originalX + (this.scrollProps.startX - c);
            this.slideX = Math.max(Math.min(this.slideX, this.getOuterWidth_() * (this.numSlides - 1)), 0);
            this.tweener_.updateTo({
                slideX: this.slideX
            }, !1);
            this.updateSlidePosition_()
        }
    };
    gt.SnappyCarousel.prototype.onDragStart_ = function(a) {
        var b = this.dragger.clientX;
        a = this.dragger.clientY;
        this.scrollProps.x1 = b;
        this.scrollProps.x2 = b;
        this.scrollProps.startX = b;
        this.scrollProps.endX = b;
        this.scrollProps.originalX = this.slideX;
        b = Math.abs(this.dragger.startX - b);
        a = Math.abs(this.dragger.startY - a);
        this.isVerticalDragging_ = b < a;
        this.eventHandler_.listen(window, goog.events.EventType.TOUCHMOVE, this.onWindowTouchMove_)
    };
    gt.SnappyCarousel.prototype.onDragEnd_ = function(a) {
        this.eventHandler_.unlisten(window, goog.events.EventType.TOUCHMOVE, this.onWindowTouchMove_);
        if (!this.isVerticalDragging_) {
            var b = (goog.now() - this.scrollProps.t2) / 1E3;
            a = this.getOuterWidth_() / 2;
            var b = (this.scrollProps.endX - this.scrollProps.x2) / b,
                c = this.scrollProps.endX - this.scrollProps.startX;
            100 < b || c > a ? this.previousSlide() : -100 > b || c < -a ? this.nextSlide() : this.gotoSlide(this.currentSlide)
        }
    };
    gt.SnappyCarousel.prototype.onWindowTouchMove_ = function(a) {
        this.isVerticalDragging_ || a.preventDefault()
    };
    gt.Carousel = function(a) {
        goog.events.EventTarget.call(this);
        this.domElement = a;
        this.screenEl_ = goog.dom.getElementByClass("screen", this.domElement);
        this.slidesEl_ = goog.dom.getElementByClass("slides", this.domElement);
        this.captionEls_ = [];
        this.slideEls_ = goog.dom.getChildren(this.slidesEl_);
        this.carouselControlsEl_ = goog.dom.createDom("dom", "carousel-controls");
        this.dotEls_ = [];
        this.eventHandler_ = new goog.events.EventHandler(this);
        this.snappyCarousel_ = new gt.SnappyCarousel(this.screenEl_, this.slidesEl_, goog.bind(this.onSlideChange_,
            this))
    };
    goog.inherits(gt.Carousel, goog.events.EventTarget);
    gt.Carousel.prototype.init = function() {
        goog.dom.appendChild(this.domElement, this.carouselControlsEl_);
        this.createControls_();
        this.registerEvents_()
    };
    gt.Carousel.prototype.createControls_ = function() {
        var a = goog.dom.getElementByClass("caption", this.domElement);
        a && (goog.dom.appendChild(this.carouselControlsEl_, a), this.captionEls_ = goog.dom.getChildren(a), goog.dom.classlist.enable(this.captionEls_[0], "active", !0));
        for (var a = goog.dom.createDom("ul", "pagination"), b = this.snappyCarousel_.getNumSlides(), c = 0; c < b; c++) {
            var d = goog.dom.createDom("li", "dot");
            this.dotEls_.push(d);
            goog.dom.appendChild(a, d)
        }
        1 < b && goog.dom.appendChild(this.carouselControlsEl_, a);
        goog.dom.classlist.enable(this.dotEls_[0],
            "active", !0)
    };
    gt.Carousel.prototype.registerEvents_ = function() {
        goog.array.forEach(this.dotEls_, function(a) {
            this.eventHandler_.listen(a, goog.events.EventType.CLICK, this.onClickPagination_, !1, this)
        }, this)
    };
    gt.Carousel.prototype.onSlideChange_ = function(a) {
        goog.array.forEach(this.dotEls_, function(b, c) {
            goog.dom.classlist.enable(b, "active", a === c)
        });
        goog.array.forEach(this.captionEls_, function(b, c) {
            goog.dom.classlist.enable(b, "active", a === c)
        })
    };
    gt.Carousel.prototype.onClickPagination_ = function(a) {
        a = goog.array.indexOf(this.dotEls_, a.currentTarget);
        this.snappyCarousel_.gotoSlide(a)
    };
    gt.SummarySection = function(a, b) {
        gt.Section.call(this, a, b);
        this.snappyCarousel_ = null;
        this.dotEls_ = [];
        gt.platform === gt.Platform.MOBILE && this.initMobile_()
    };
    goog.inherits(gt.SummarySection, gt.Section);
    gt.SummarySection.prototype.initMobile_ = function() {
        var a = gt(".bullets-container", this.domElement)[0],
            b = gt(".bullets", a)[0];
        this.snappyCarousel_ = new gt.SnappyCarousel(a, b, goog.bind(this.onSlideChange_, this));
        this.paginationEl_ = goog.dom.createDom("ul", "pagination");
        for (var b = this.snappyCarousel_.getNumSlides(), c = 0; c < b; c++) {
            var d = goog.dom.createDom("li", "dot");
            this.dotEls_.push(d);
            goog.dom.appendChild(this.paginationEl_, d)
        }
        goog.dom.appendChild(a.parentNode, this.paginationEl_);
        goog.dom.classlist.enable(this.dotEls_[0],
            "active", !0);
        goog.array.forEach(this.dotEls_, function(a) {
            this.eventHandler_.listen(a, goog.events.EventType.CLICK, this.onClickPagination_)
        }, this)
    };
    gt.SummarySection.prototype.onSlideChange_ = function(a) {
        goog.array.forEach(this.dotEls_, function(b, c) {
            goog.dom.classlist.enable(b, "active", a === c)
        })
    };
    gt.SummarySection.prototype.onClickPagination_ = function(a) {
        a = goog.array.indexOf(this.dotEls_, a.currentTarget);
        this.snappyCarousel_.gotoSlide(a)
    };
    gt.Tracking = function() {
        this.tracker = window.gwebAutoTracker
    };
    goog.addSingletonGetter(gt.Tracking);
    gt.Tracking.prototype.pageEvent = function(a, b, c, d) {
        var e = ["_trackEvent"];
        a && e.push(String(a));
        b && e.push(String(b));
        goog.isString(c) && e.push(String(c));
        goog.isNumber(d) && e.push(d);
        this.tracker && 1 < e.length && this.tracker.pushCommand(e)
    };
    gt.userAgent = {};
    goog.object.extend(gt.userAgent, goog.userAgent);
    gt.userAgent.MOBILE = 0 <= navigator.userAgent.indexOf("Mobile");
    gt.userAgent.IOS = gt.userAgent.IPHONE || gt.userAgent.IPAD || 0 <= navigator.userAgent.indexOf("iPod");
    gt.Utils = function() {
        this.performance = this.getPerformancePolyfill_();
        this.polyfillAnimationFrame_()
    };
    goog.addSingletonGetter(gt.Utils);
    gt.Utils.prototype.polyfillAnimationFrame_ = function() {
        for (var a = 0, b = ["webkit", "moz"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(b, c) {
            var f = (new Date).getTime(),
                g = Math.max(0, 16 - (f - a)),
                h = window.setTimeout(function() {
                    b(f + g)
                }, g);
            a = f + g;
            return h
        });
        window.cancelAnimationFrame ||
            (window.cancelAnimationFrame = function(a) {
                clearTimeout(a)
            })
    };
    gt.Utils.prototype.loadCss = function(a, b) {
        function c() {
            e || (e = !0, b && b())
        }
        var d = document.getElementsByTagName("head")[0],
            e = !1,
            f = document.createElement("link");
        f.setAttribute("rel", "stylesheet");
        f.setAttribute("type", "text/css");
        f.setAttribute("media", "screen");
        f.onload = c;
        f.onreadystatechange = function() {
            if (!f.readyState || /loaded|complete/.test(f.readyState)) f.onreadystatechange = null, c()
        };
        var g = document.styleSheets.length,
            h = 0,
            k = setInterval(function() {
                h += 1;
                if (document.styleSheets.length > g || 100 <= h) clearInterval(k),
                    c()
            }, 1E3);
        f.setAttribute("href", a);
        d.appendChild(f)
    };
    gt.Utils.prototype.getLocationOrigin = function() {
        return window.location.protocol + "//" + window.location.host
    };
    gt.Utils.prototype.getLocationToken = function(a) {
        a = a.replace(/#/, "");
        "/" === a.substring(0, 1) && (a = a.substring(1, a.length));
        a = a.split("/");
        "" === a[0] && a.shift();
        1 < a.length && "" === a[a.length - 1] && a.pop();
        return a
    };
    gt.Utils.prototype.getPerformancePolyfill_ = function() {
        var a = window.performance || {};
        a.now = a.now || a.webkitNow || a.msNow || a.oNow || a.mozNow || function() {
            return (new Date).getTime()
        };
        return a
    };
    gt.Utils.prototype.getOrientation = function() {
        var a = gt.platform === gt.Platform.TABLET;
        if (gt.platform !== gt.Platform.MOBILE && !a) return null;
        var a = !1,
            b = window.orientation;
        goog.isNumber(b) ? 90 === Math.abs(b) && (a = !0) : a = window.innerWidth > window.innerHeight;
        return a ? "landscape" : "portrait"
    };
    gt.Utils.prototype.transformTranslate = function(a, b, c) {
        !0 === Modernizr.csstransforms ?
        (b = null === b ? "0" : b, c = null === c ? "0" : c, goog.style.setStyle(a, "transform", !0 === Modernizr.csstransforms3d ? "translate3d(" + b + "," + c + ", 0)"
        : "translate(" + b + "," + c + ")")) : (null !== b && goog.style.setStyle(a, "left", b), null !== c && goog.style.setStyle(a, "top", c))
    };
    gt.Utils.prototype.getUrlParameters = function(a, b) {
        return (new goog.Uri(b)).getQueryData().get(a, "")
    };
    gt.Video = function() {
        this.openVideoBtn = gt("#open-video")[0];
        this.videoId = gt.utils.getUrlParameters("v", this.openVideoBtn.getAttribute("href"));
        this.addEventsDelay = new goog.async.Delay(this.addListeners_, 500, this);
        this.init()
    };
    gt.Video.prototype.init = function() {
        goog.events.listen(this.openVideoBtn, "click", this.showModal_, !1, this)
    };
    gt.Video.prototype.addListeners_ = function() {
        goog.events.listen(this.closeBtn, "click", this.hideModal_, !1, this);
        goog.events.listen(document.body, "click", this.onClickBody_, !1, this)
    };
    gt.Video.prototype.removeListeners_ = function() {
        goog.events.unlisten(this.closeBtn, "click", this.hideModal_, !1, this);
        goog.events.unlisten(document.body, "click", this.onClickBody_, !1, this)
    };
    gt.Video.prototype.setSize_ = function() {
        if (this.el) {
            var a = goog.dom.getViewportSize(),
                b = 2 * goog.style.getSize(this.closeBtn).height;
            goog.style.setSize(this.videoWrapper, a.width - b, a.height - b)
        }
    };
    gt.Video.prototype.showModal_ = function(a) {
        a.preventDefault();
        this.buildModal_();
        TweenMax.fromTo(this.el, .5, {
            opacity: 0
        }, {
            opacity: 1
        });
        TweenMax.fromTo(this.videoWrapper, .25, {
            opacity: 0,
            y: "10%"
        }, {
            opacity: 1,
            y: "0%",
            delay: .25
        })
    };
    gt.Video.prototype.buildModal_ = function(a) {
        a = goog.dom.createDom("div", {
            id: "video-modal",
            "class": "modal"
        }, [goog.dom.createDom("div", {
            id: "modal-content"
        }, [goog.dom.createDom("div", {
            id: "video-wrapper"
        }, [goog.dom.createDom("div", {
            id: "video-view"
        }, [goog.dom.createDom("div", {
            id: "close-video"
        }), goog.dom.createDom("div", {
            id: "video-player-wrapper"
        }, [goog.dom.createDom("div", {
            id: "video-player"
        })])])])])]);
        goog.dom.append(goog.dom.query(".main")[0], a);
        this.el = goog.dom.getElement("video-modal");
        this.closeBtn =
            goog.dom.getElement("close-video");
        this.videoView_ = goog.dom.getElement("video-view");
        this.videoWrapper = goog.dom.getElement("video-wrapper");
        this.videoContainer = goog.dom.getElement("video-player");
        this.loadVideo_();
        this.addEventsDelay.start()
    };
    gt.Video.prototype.hideModal_ = function() {
        this.removeListeners_();
        TweenMax.to(this.videoWrapper, .25, {
            opacity: 0,
            y: "10%"
        });
        TweenMax.to(this.el, .25, {
            opacity: 0,
            delay: .25,
            onComplete: goog.bind(this.removeModal_, this)
        })
    };
    gt.Video.prototype.removeModal_ = function() {
        this.youtubePlayer.destroy();
        goog.dom.removeNode(this.el);
        this.addEventsDelay.stop()
    };
    gt.Video.prototype.loadVideo_ = function() {
        if ("undefined" == typeof YT || "undefined" == typeof YT.Player) {
            var a = this;
            window.onYouTubePlayerAPIReady = function() {
                a.loadPlayer_(a.videoContainer, a.videoId)
            };
            this.loadAPI_()
        } else this.loadPlayer_(this.videoContainer, this.videoId)
    };
    gt.Video.prototype.loadAPI_ = function() {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = "//www.youtube.com/iframe_api";
        document.body.appendChild(a)
    };
    gt.Video.prototype.loadPlayer_ = function(a, b) {
        return this.youtubePlayer = new YT.Player(a, {
            videoId: b,
            playerVars: {
                autoplay: 1,
                modestbranding: 1,
                rel: 0,
                showInfo: 0,
                cc_load_policy: 1,
                hl: document.documentElement.lang
            }
        })
    };
    gt.Video.prototype.onClickBody_ = function(a) {
        goog.dom.contains(this.videoView_, a.target) || this.hideModal_()
    };
    gt.ViewportMonitor = function(a) {
        goog.events.EventTarget.call(this);
        this.domElement_ = a;
        this.height = this.width = 0;
        this.addListeners_();
        this.onResize_()
    };
    goog.inherits(gt.ViewportMonitor, goog.events.EventTarget);
    gt.ViewportMonitor.prototype.addListeners_ = function() {
        goog.events.listen(window, goog.events.EventType.RESIZE, this.onResize_, !1, this)
    };
    gt.ViewportMonitor.prototype.onResize_ = function(a) {
        var b = goog.style.getSize(this.domElement_);
        this.width = b.width;
        this.height = b.height;
        a && this.dispatchEvent(a)
    };
    gt.MobileController = function() {
        this.carousels_ = [];
        this.scrollerDom_ = goog.dom.query(".main .container .scroller")[0]
    };
    gt.MobileController.prototype.init = function() {
        this.createCarousels_()
    };
    gt.MobileController.prototype.createCarousels_ = function() {
        var a = goog.dom.getElementsByClass("carousel-area", document.body);
        this.carousels_ = goog.array.map(a, function(a) {
            var c = new gt.Carousel(a);
            c.init();
            var d = goog.dom.query(".quick-create-animation", a)[0];
            d && (this.quickCreateAnimation_ = new gt.QuickCreateMobile(d));
            if (a = goog.dom.query(".schedule-animation", a)[0]) this.createAnimDom(a), this.scheduleAnimation_ = new gt.ScheduleMobile(a);
            return c
        }, this)
    };
    gt.MobileController.prototype.scrollByToken = function(a) {
        "summary" === a && (this.scrollerDom_.scrollTop = this.scrollerDom_.scrollHeight - gt.viewport.height)
    };
    gt.MobileController.prototype.createAnimDom = function(a) {
        var b = gt("#phone-container .schedule")[0];
        a = goog.dom.getElementByClass("schedule", a);
        goog.dom.append(a, b)
    };
    gt.SectionsController = function() {
        goog.events.EventTarget.call(this);
        this.sections = [];
        this.tokens = [];
        this.activeSection_ = null;
        this.eventHandler_ = new goog.events.EventHandler(this)
    };
    goog.inherits(gt.SectionsController, goog.events.EventTarget);
    gt.SectionsController.prototype.init = function() {
        this.createSections_();
        this.activeSection_ = this.sections[0];
        this.activeSection_.activate()
    };
    gt.SectionsController.prototype.createSections_ = function() {
        var a = gt(".main .container .scroller-inner > section");
        this.sections = goog.array.map(a, function(a, c) {
            var d;
            switch (a.id) {
                case "home":
                    d = gt.HomeSection;
                    break;
                case "summary":
                    d = gt.SummarySection;
                    break;
                default:
                    d = gt.Section
            }
            return new d(a, c)
        })
    };
    gt.SectionsController.prototype.getSectionById = function(a) {
        return goog.array.find(this.sections, function(b) {
            return b.id === a
        })
    };
    gt.SectionsController.prototype.getSectionByIndex = function(a) {
        return this.sections[a]
    };
    gt.SectionsController.prototype.getToken = function() {
        return this.activeSection_.id
    };
    gt.SectionsController.prototype.getPreviousToken = function() {
        var a = Math.max(0, this.activeSection_.index - 1);
        return this.sections[a].id
    };
    gt.SectionsController.prototype.getNextToken = function() {
        var a = Math.min(this.sections.length - 1, this.activeSection_.index + 1);
        return this.sections[a].id
    };
    gt.SectionsController.prototype.onStartScrollToSection = function(a) {
        if (a !== this.activeSection_.id) {
            this.activeSection_ && (this.activeSection_.deactivate(), this.activeSection_.animateOut());
            a = this.getSectionById(a);
            var b = (this.activeSection_ ? this.activeSection_.index : 0) > a.index;
            this.activeSection_ = a;
            this.activeSection_.animateIn(b)
        }
    };
    gt.SectionsController.prototype.onCompleteScrollToSection = function(a) {
        !1 === this.activeSection_.isActive && (this.activeSection_.activate(), this.activeSection_.animatedIn())
    };
    gt.DesktopController = function() {
        this.phone = gt.Phone.getInstance();
        this.video = new gt.Video;
        this.scrollButton_ = goog.dom.getElementByClass("scroll-btn");
        this.scrollerDom_ = goog.dom.query(".main .container .scroller")[0];
        this.debug = !1;
        this.pageScrollIndex_ = this.pageScrollY_ = 0;
        this.scrollTweener_ = null;
        this.viewportSize_ = goog.dom.getViewportSize();
        this.mappings_ = null;
        this.requestScroll_ = !0;
        this.completeScrollTimer_ = this.onScrollTimer_ = null;
        switch (gt.platform) {
            case gt.Platform.DESKTOP:
            case gt.Platform.TABLET:
                this.mappings_ = {
                    pageScroll: [0, .19187309865275967, .37400129561649753, .5806521269704168, .7873029583243359, 1],
                    uiScroll: "intro intro timeline schedule quick-create quick-create".split(" "),
                    phoneScroll: [.83, 0, 0, 0, 0, -1.36],
                    phoneScale: [.78, 1, 1, 1, 1, 1],
                    sectionId: "home intro timeline schedule quickcreate summary".split(" ")
                };
                break;
            default:
                this.mappings_ = null
        }
        this.debug = "true" === (new goog.Uri(window.location.href)).getQueryData().get("debug")
    };
    gt.DesktopController.prototype.init = function() {
        this.addListeners();
        this.onResize();
        this.debug && goog.dom.classlist.add(this.scrollerDom_, "scroll")
    };
    gt.DesktopController.prototype.addListeners = function() {
        if (gt.platform !== gt.Platform.TABLET) {
            goog.events.listen(this.scrollerDom_, "scroll", this.onScroll, !1, this);
            var a = new goog.events.KeyHandler(document);
            goog.events.listen(a, goog.events.KeyHandler.EventType.KEY, this.onKey, !1, this)
        }
        goog.events.listen(window, "resize", this.onResize, !1, this)
    };
    gt.DesktopController.prototype.onKey = function(a) {
        var b = 0;
        switch (a.keyCode) {
            case goog.events.KeyCodes.UP:
                b = -1;
                this.debug || this.prevPage();
                break;
            case goog.events.KeyCodes.DOWN:
                b = 1, this.debug || this.nextPage()
        }
        0 !== b && (a.preventDefault(), this.debug && (this.scrollerDom_.scrollTop += b * (a.shiftKey ? 100 : 1)))
    };
    gt.DesktopController.prototype.getScrollYByToken = function(a) {
        a = gt.sections.getSectionById(a);
        return this.calculatePageScrollYByRatio_(this.mappings_.pageScroll[a.index])
    };
    gt.DesktopController.prototype.getPageScrollRatio_ = function() {
        return this.scrollerDom_.scrollTop / (this.scrollerDom_.scrollHeight - gt.viewport.height)
    };
    gt.DesktopController.prototype.calculatePageScrollYByRatio_ = function(a) {
        return a * (this.scrollerDom_.scrollHeight - gt.viewport.height)
    };
    gt.DesktopController.prototype.scrollTo = function(a, b) {
        this.scrollTweener_ = TweenMax.to(this, !0 === b ? 0 : .8, {
            pageScrollY_: a,
            ease: Quad.easeInOut,
            onStart: this.onStartScroll,
            onStartScope: this,
            onUpdate: this.updateScroll,
            onUpdateScope: this,
            onComplete: this.onCompleteScroll,
            onCompleteScope: this
        })
    };
    gt.DesktopController.prototype.scrollByToken = function(a) {
        var b = this.getScrollYByToken(a);
        this.pageScrollIndex_ = gt.sections.getSectionById(a).index;
        this.scrollTo(b)
    };
    gt.DesktopController.prototype.hasReachedTop = function() {
        return 0 === this.pageScrollIndex_
    };
    gt.DesktopController.prototype.hasReachedBottom = function() {
        return this.pageScrollIndex_ === this.mappings_.pageScroll.length - 1
    };
    gt.DesktopController.prototype.nextPage = function() {
        if (!this.scrollTweener_ || !this.scrollTweener_.isActive()) {
            var a = this.pageScrollIndex_;
            this.pageScrollIndex_ = Math.min(this.pageScrollIndex_ + 1, this.mappings_.pageScroll.length - 1);
            this.pageScrollIndex_ !== a && (a = gt.sections.getSectionByIndex(this.pageScrollIndex_).id, gt.navigation.changeLocation(a))
        }
    };
    gt.DesktopController.prototype.prevPage = function() {
        if (!this.scrollTweener_ || !this.scrollTweener_.isActive()) {
            var a = this.pageScrollIndex_;
            this.pageScrollIndex_ = Math.max(this.pageScrollIndex_ - 1, 0);
            this.pageScrollIndex_ !== a && (a = gt.sections.getSectionByIndex(this.pageScrollIndex_).id, gt.navigation.changeLocation(a))
        }
    };
    gt.DesktopController.prototype.updateScroll = function() {
        this.scrollerDom_.scrollTop = this.pageScrollY_;
        if (gt.platform === gt.Platform.TABLET) this.onScroll()
    };
    gt.DesktopController.prototype.onStartScroll = function() {
        this.requestScroll_ = !0;
        clearTimeout(this.completeScrollTimer_);
        var a = this.mappings_.uiScroll;
        gt.sections.onStartScrollToSection(this.mappings_.sectionId[this.pageScrollIndex_]);
        this.phone.setUIScroll(a[this.pageScrollIndex_]);
        this.updateScrollButton_()
    };
    gt.DesktopController.prototype.onCompleteScroll = function() {
        gt.sections.onCompleteScrollToSection(this.mappings_.sectionId[this.pageScrollIndex_]);
        this.completeScrollTimer_ = setTimeout(goog.bind(this.onCompleteScroll_, this), 100)
    };
    gt.DesktopController.prototype.onCompleteScroll_ = function() {
        this.requestScroll_ = !1
    };
    gt.DesktopController.prototype.onScroll = function(a) {
        var b = this.getPageScrollRatio_(),
            c = this.mappings_.pageScroll;
        a = this.mappings_.uiScroll;
        var d = this.mappings_.phoneScroll,
            e = this.mappings_.phoneScale,
            f, g, h, k = c.length;
        for (h = 0; h < k; h++) {
            var l = h,
                t = l + 1 < k ? l + 1 : l;
            if (b >= c[l] && b <= c[t]) {
                f = l;
                g = t;
                break
            }
        }
        k = c[f];
        h = d[f];
        l = d[g];
        d = e[f];
        e = e[g];
        b = (b - k) / (c[g] - k);
        goog.math.lerp(a[f], a[g], b);
        f = goog.math.lerp(h, l, b);
        g = goog.math.lerp(d, e, b);
        this.phone.transformPhone(f, g);
        clearTimeout(this.onScrollTimer_);
        !1 === this.requestScroll_ &&
            (this.onScrollTimer_ = setTimeout(goog.bind(this.onScrollTimeout_, this), 1E3))
    };
    gt.DesktopController.prototype.onScrollTimeout_ = function() {
        this.pageScrollY_ = this.scrollerDom_.scrollTop;
        var a = Math.round((this.mappings_.sectionId.length - 1) * this.getPageScrollRatio_()),
            a = this.mappings_.sectionId[a]; - 1 === gt.navigation.getLocation().indexOf(a) ? gt.navigation.changeLocation(a) : this.scrollByToken(a)
    };
    gt.DesktopController.prototype.onResize = function(a) {
        this.viewportSize_ = goog.dom.getViewportSize();
        this.phone.updateSize();
        this.pageScrollY_ = this.calculatePageScrollYByRatio_(this.mappings_.pageScroll[this.pageScrollIndex_]);
        this.updateScroll();
        this.onScroll();
        a = this.viewportSize_.aspectRatio();
        a = 1024 > this.viewportSize_.width || 1.3 > a;
        goog.dom.classlist.enable(gt("html")[0], "portrait", a)
    };
    gt.DesktopController.prototype.updateScrollButton_ = function() {
        var a = gt.sections.getNextToken();
        switch (a) {
            case "intro":
                goog.dom.classlist.enable(this.scrollButton_, "at-start", !0);
                goog.dom.classlist.enable(this.scrollButton_, "timeline", !1);
                break;
            case "timeline":
                goog.dom.classlist.enable(this.scrollButton_, "at-start", !1);
                goog.dom.classlist.enable(this.scrollButton_, "timeline", !0);
                break;
            case "download":
                goog.dom.classlist.enable(this.scrollButton_, "enabled", !1);
                break;
            default:
                goog.dom.classlist.enable(this.scrollButton_,"enabled", !0),
                goog.dom.classlist.enable(this.scrollButton_, "at-start", !1),
                goog.dom.classlist.enable(this.scrollButton_, "timeline", !1)
        }
        goog.dom.setProperties(this.scrollButton_, {
            href: "#/" + a
        })
    };
    gt.Main = function() {
        gt.utils = gt.Utils.getInstance();
        gt.tracking = gt.Tracking.getInstance();
        var a = gt.utils.getUrlParameters("platform");
        gt.platform = gt.Main.determinePlatform(a);
        goog.dom.classlist.add(gt("html")[0], gt.platform);
        gt.viewport = new gt.ViewportMonitor(gt(".container")[0]);
        gt.navigation = new gt.NavigationController;
        gt.sections = new gt.SectionsController;
        gt.sections.init();
        gt.ab.init();
        gt.navigation.init();
        switch (gt.platform) {
            case gt.Platform.MOBILE:
                gt.scroller = new gt.MobileController;
                gt.scroller.init();
                break;
            case gt.Platform.DESKTOP:
            case gt.Platform.TABLET:
                gt.scroller = new gt.DesktopController, gt.scroller.init()
        }
    };
    gt.Main.determinePlatform = function(a) {
        var b = gt.userAgent.MOBILE || gt.userAgent.ANDROID,
            c = gt.Platform.DESKTOP;
        if (a && goog.object.contains(gt.Platform, a)) return a;
        b && (c = gt.Platform.MOBILE, 768 <= window.innerWidth || 768 <= window.innerHeight) && (c = gt.Platform.TABLET);
        return c
    };
    goog.exportProperty(gt, "Main", gt.Main);
})();
