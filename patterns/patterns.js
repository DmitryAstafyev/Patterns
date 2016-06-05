// LICENSE 
// This file (core / module) is released under the MIT License. See [LICENSE] file for details.
(function(){
    "use strict";
    //Modules declarations
    var Patterns    = function () { },
        Core        = function () { },
        Events      = function () { },
        Binds       = function () { },
        Html        = function () { },
        Focus       = function () { },
        Move        = function () { },
        Resize      = function () { },
        Maximize    = function () { };
    //=== Patterns module ===
    Patterns.prototype      = function () {
        var config      = null,
            settings    = null,
            //Classes
            source      = null,
            pattern     = null,
            instance    = null,
            result      = null,
            caller      = null,
            //Methods
            layout      = null,
            privates    = null,
            controllers = null,
            storage     = null,
            logs        = null,
            measuring   = null,
            helpers     = null,
            conditions  = null,
            callers     = null;
        //Config
        config      = {
            values      : {
                USE_STORAGE_CSS : true,
                USE_STORAGE_JS  : true,
                USE_STORAGE_HTML: true,
                PATTERN_NODE    : 'pattern',
            },
            validator   : {
                USE_STORAGE_CSS : function (value) { return typeof value === 'boolean' ? true : false;},
                USE_STORAGE_JS  : function (value) { return typeof value === 'boolean' ? true : false;},
                USE_STORAGE_HTML: function (value) { return typeof value === 'boolean' ? true : false;},
                PATTERN_NODE    : function (value) { return typeof value === 'string' ? (value.length > 0 ? (value.replace(/\w/gi, '').length === 0 ? true : false) : false) : false; },
            },
            setup       : function (_config) {
                if (_config !== null && typeof _config === 'object') {
                    _object(_config).forEach(function (key, value) {
                        if (config.values[key] !== void 0 && config.validator[key] !== void 0) {
                            config.values[key] = config.validator[key](value) ? value : config.values[key];
                        }
                    });
                }
            },
            get         : function () {
                return config.values;
            },
            debug       : function (){
                config.values.USE_STORAGE_CSS   = false;
                config.values.USE_STORAGE_JS    = false;
                config.values.USE_STORAGE_HTML  = false;
            }
        };
        //Settings
        settings    = {
            measuring       : {
                MEASURE : true,
            },
            classes         : {
                SOURCE  : function(){},
                PATTERN : function(){},
                INSTANCE: function(){},
                RESULT  : function(){},
                CALLER  : function(){},
            },
            regs            : {
                BODY                : /<\s*body[^>]*>(\n|\r|\s|.)*?<\s*\/body\s*>/gi,
                BODY_TAG            : /<\s*body[^>]*>|<\s*\/\s*body\s*>/gi,
                BODY_CLEAR          : /^[\n\r\s]*|[\n\r\s]*$/gi,
                TABLE               : /<\s*table[^>]*>(\n|\r|\s|.)*?<\s*\/table\s*>/gi,
                TABLE_TAG           : /<\s*table[^>]*>|<\s*\/\s*table\s*>/gi,
                ANY_TAG             : /<\s*[\w]{1,}[^>]*>(\n|\r|\s|\t|.)*<\s*\/\s*\w{1,}\s*>/gi,
                FIRST_TAG           : /^\<.*?\>/gi,
                TAG_BORDERS         : /<|>/gi,
                CSS                 : /<link\s+.*?\/>|<link\s+.*?\>/gi,
                CSS_HREF            : /href\s*\=\s*"(.*?)"|href\s*\=\s*'(.*?)'/gi,
                CSS_REL             : /rel\s*=\s*"stylesheet"|rel\s*=\s*'stylesheet'/gi,
                CSS_TYPE            : /type\s*=\s*"text\/css"|type\s*=\s*'text\/css'/gi,
                JS                  : /<script\s+.*?>/gi,
                JS_SRC              : /src\s*\=\s*"(.*?)"|src\s*\=\s*'(.*?)'/gi,
                JS_TYPE             : /type\s*=\s*"text\/javascript"|type\s*=\s*'text\/javascript'/gi,
                STRING              : /"(.*?)"|'(.*?)'/gi,
                STRING_BORDERS      : /"|'/gi,
                DOM                 : /\{\{\$[\w\.\,]*?\}\}/gi,
                DOM_OPEN            : '\\{\\{\\$',
                DOM_CLOSE           : '\\}\\}',
                HOOK                : /\{\{[\w\.]*?\}\}/gi,
                MODEL               : /\{\{\:\:\w*?\}\}/gi,
                MODEL_BORDERS       : /\{\{\:\:|\}\}/gi,
                MODEL_OPEN          : '\\{\\{\\:\\:',
                MODEL_CLOSE         : '\\}\\}',
                HOOK_OPEN           : '\\{\\{',
                HOOK_CLOSE          : '\\}\\}',
                HOOK_OPEN_COM       : '<\\!--\\{\\{',
                HOOK_CLOSE_COM      : '\\}\\}-->',
                HOOK_BORDERS        : /\{\{|\}\}/gi,
                GROUP_PROPERTY      : /__\w*?__/gi,
                FIRST_WORD          : /^\w+/gi,
                NOT_WORDS_NUMBERS   : /[^\w\d]/gi,
                CONDITION_STRUCTURE : /^\w*=/gi
            },
            marks           : {
                DOM         : 'DOM',
            },
            storage         : {
                USE_LOCALSTORAGE        : true,
                VIRTUAL_STORAGE_GROUP   : 'FLEX_UI_PATTERNS_GROUP',
                VIRTUAL_STORAGE_ID      : 'FLEX_UI_PATTERNS_STORAGE',
                CSS_ATTACHED_JOURNAL    : 'FLEX_UI_PATTERNS_CSS_JOURNAL',
                JS_ATTACHED_JOURNAL     : 'JS_ATTACHED_JOURNAL',
                PRELOAD_TRACKER         : 'FLEX_UI_PATTERNS_PRELOAD_TRACKER',
                NODE_BINDING_DATA       : 'FLEX_PATTERNS_BINDINGS_DATA',
                CONTROLLERS_LINKS       : 'FLEX_PATTERNS_CONTROLLERS_LINKS',
                CONTROLLERS_STORAGE     : 'FLEX_PATTERNS_CONTROLLERS_STORAGE',
                CONDITIONS_STORAGE      : 'FLEX_PATTERNS_CONDITIONS_STORAGE',
                PATTERN_SOURCES         : 'FLEX_PATTERNS_PATTERN_SOURCES',
                PATTERNS                : 'FLEX_PATTERNS_PATTERNS',
            },
            compatibility   : {
                PARENT_TO_CHILD : {
                    table   : 'tbody',
                    tbody   : 'tr',
                    thead   : 'tr',
                    tfoot   : 'tr',
                    tr      : 'td',
                    colgroup: 'col',
                },
                CHILD_TO_PARENT : {
                    tr      : 'tbody',
                    th      : 'tbody',
                    td      : 'tr',
                    col     : 'colgroup',
                    tbody   : 'table',
                    thead   : 'table',
                    tfoot   : 'table',
                },
                BASE            : 'div'
            },
            css             : {
                classes     : {
                    HOOK_WRAPPER    : 'flex_patterns_hook_wrapper'
                },
                attrs       : {
                    MODEL_DATA      : 'data-flex-model-data',
                    DOM_MARK        : 'data-flex-dom-mark',
                },
                selectors   : {
                    HOOK_WRAPPERS: '.flex_patterns_hook_wrapper'
                },
            },
            serialize: [
                [/</gi, '&lt;'],
                [/>/gi, '&gt;'],
            ],
            other           : {
                INDEXES     : '__indexes'
            }
        };
        logs        = {
            SIGNATURE   : '[flex.ui.patterns]', 
            source      : {
                TEMPLATE_WAS_LOADED     : '0001:TEMPLATE_WAS_LOADED',
                FAIL_TO_LOAD_TEMPLATE   : '0002:FAIL_TO_LOAD_TEMPLATE',
                FAIL_TO_PARSE_TEMPLATE  : '0003:FAIL_TO_PARSE_TEMPLATE',
                FAIL_TO_LOAD_JS_RESOURCE: '0004:FAIL_TO_LOAD_JS_RESOURCE',
            },
            pattern     : {
                CANNOT_FIND_FIRST_TAG               : '1000:CANNOT_FIND_FIRST_TAG',
                CANNOT_CREATE_WRAPPER               : '1001:CANNOT_CREATE_WRAPPER',
                WRONG_PATTERN_WRAPPER               : '1002:WRONG_PATTERN_WRAPPER',
                WRONG_HOOK_VALUE                    : '1003:WRONG_HOOK_VALUE',
                WRONG_CONDITION_DEFINITION          : '1004:WRONG_CONDITION_DEFINITION',
                MODEL_HOOK_NEEDS_WRAPPER            : '1005:MODEL_HOOK_NEEDS_WRAPPER',
                CANNOT_FIND_CONDITION_BEGINING      : '1006:CANNOT_FIND_CONDITION_BEGINING',
                CANNOT_FIND_CONDITION_END           : '1007:CANNOT_FIND_CONDITION_END',
                CANNOT_FIND_CONDITION_NODES         : '1008:CANNOT_FIND_CONDITION_NODES',
                CANNOT_FIND_CONDITION_VALUE         : '1009:CANNOT_FIND_CONDITION_VALUE',
                UNEXCEPTED_ERROR_CONDITION_PARSER   : '1010:UNEXCEPTED_ERROR_CONDITION_PARSER',
            },
            instance    : {
                BAD_HOOK_FOR_CLONE      : '2000:BAD_HOOK_FOR_CLONE',
                NO_URL_FOR_CLONE_HOOK   : '2001:NO_URL_FOR_CLONE_HOOK',
            },
            caller      : {
                CANNOT_INIT_PATTERN     : '3000:CANNOT_INIT_PATTERN',
                CANNOT_GET_CHILD_PATTERN: '3001:CANNOT_GET_CHILD_PATTERN',
                CANNOT_GET_PATTERN      : '3002:CANNOT_GET_PATTERN',
            },
            layout      : {
                BAD_ARRAY_OF_HOOKS      : '4000:BAD_ARRAY_OF_HOOKS',
            }
        };
        //Classes implementations
        //BEGIN: source class ===============================================
        source      = {
            proto       : function (privates) {
                var self        = this,
                    load        = null,
                    parse       = null,
                    process     = null,
                    resources   = null,
                    get         = null,
                    callback    = null,
                    signature   = null,
                    returning   = null;
                load        = function (success, fail) {
                    var perf_id     = null,
                        ajax        = null,
                        storaged    = null;
                    if (privates.html === null) {
                        storaged = storage.get(self.url);
                        if (storaged !== null && config.get().USE_STORAGE_HTML === true) {
                            process(storaged, success, fail);
                        } else {
                            perf_id = measuring.measure();
                            ajax    = flex.ajax.send(
                                self.url,
                                flex.ajax.methods.GET,
                                null,
                                {
                                    success: function (response, request) {
                                        measuring.measure(perf_id, 'loading sources for (' + self.url + ')');
                                        storage.add(self.url, response);
                                        process(response, success, fail);
                                    },
                                    fail: function (response, request) {
                                        measuring.measure(perf_id, 'loading sources for (' + self.url + ')');
                                        flex.logs.log(signature() + logs.source.FAIL_TO_LOAD_TEMPLATE, flex.logs.types.CRITICAL);
                                        callback(fail);
                                        throw logs.source.FAIL_TO_LOAD_TEMPLATE;
                                    },
                                }
                            );
                            ajax.send();
                        }
                    } else {
                        flex.logs.log(signature() + logs.source.TEMPLATE_WAS_LOADED, flex.logs.types.NOTIFICATION);
                    }
                    return true;
                };
                parse       = {
                    URLs: function (hrefs) {
                        var baseURL = flex.system.url.restore(self.url);
                        if (baseURL !== null) {
                            hrefs = hrefs.map(function (href) {
                                var url = flex.system.url.parse(href, baseURL);
                                return (url !== null ? url.url : false);
                            });
                            hrefs = hrefs.filter(function (href) {
                                return (href !== false ? true : false);
                            });
                        }
                        return hrefs;
                    },
                    html: function (html) {
                        var regs = settings.regs,
                            body = html.match(regs.BODY);
                        if (body !== null) {
                            if (body.length === 1) {
                                privates.html       = body[0].replace(regs.BODY_TAG, '').replace(regs.BODY_CLEAR, '');
                                privates.original   = html;
                                privates.html       = helpers.tableFix(privates.html);
                                return true;
                            }
                        }
                        privates.html = null;
                        return false;
                    },
                    css : function () {
                        var regs    = settings.regs,
                            links   = privates.original !== null ? privates.original.match(regs.CSS) : null,
                            hrefs   = [];
                        if (links !== null) {
                            Array.prototype.forEach.call(
                                links,
                                function (link) {
                                    function validate(link) {
                                        var rel     = link.search(regs.CSS_REL),
                                            type    = link.search(regs.CSS_TYPE);
                                        if (rel > 0 && type > 0) {
                                            return true;
                                        }
                                        return false;
                                    };
                                    var href    = link.match(regs.CSS_HREF),
                                        str     = null;
                                    if (validate(link) !== false && href !== null) {
                                        if (href.length === 1) {
                                            str = href[0].match(regs.STRING);
                                            if (str !== null) {
                                                if (str.length === 1) {
                                                    hrefs.push(str[0].replace(regs.STRING_BORDERS, ''));
                                                }
                                            }
                                        }
                                    }
                                }
                            );
                        }
                        privates.css = parse.URLs(hrefs);
                    },
                    js  : function () {
                        var regs    = settings.regs,
                            links   = privates.original !== null ? privates.original.match(regs.JS) : null,
                            hrefs   = [];
                        if (links !== null) {
                            Array.prototype.forEach.call(
                                links,
                                function (link) {
                                    function validate(link) {
                                        var type = link.search(regs.JS_TYPE);
                                        if (type > 0) {
                                            return true;
                                        }
                                        return false;
                                    };
                                    var src = link.match(regs.JS_SRC),
                                        str = null;
                                    if (validate(link) !== false && src !== null) {
                                        if (src.length === 1) {
                                            str = src[0].match(regs.STRING);
                                            if (str !== null) {
                                                if (str.length === 1) {
                                                    hrefs.push(str[0].replace(regs.STRING_BORDERS, ''));
                                                }
                                            }
                                        }
                                    }
                                }
                            );
                        }
                        privates.js = parse.URLs(hrefs);
                    },
                };
                process     = function (response, success, fail) {
                    if (parse.html(response.original)) {
                        parse.js();
                        parse.css();
                        resources.css.load(function () {
                            resources.js.load(
                                function () {
                                    callback(success);
                                },
                                function () {
                                    callback(fail);
                                }
                            );
                        });
                    } else {
                        flex.logs.log(signature() + logs.source.FAIL_TO_PARSE_TEMPLATE, flex.logs.types.NOTIFICATION);
                        callback(fail);
                    }
                };
                resources   = {
                    css : {
                        load: function (success) {
                            var journal     = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.CSS_ATTACHED_JOURNAL, {}),
                                register_id = flex.unique();
                            if (privates.css !== null && privates.css.length > 0) {
                                flex.overhead.register.open(register_id, privates.css, success);
                                Array.prototype.forEach.call(
                                    privates.css,
                                    function (url) {
                                        var storaged    = null,
                                            perf_id     = null;
                                        if (!journal[url]) {
                                            journal[url]    = true;
                                            storaged        = storage.get(url);
                                            if (storaged === null || config.get().USE_STORAGE_CSS === false) {
                                                perf_id = measuring.measure();
                                                flex.resources.attach.css.connect(
                                                    url,
                                                    function (url) {
                                                        var cssText = flex.resources.parse.css.stringify(url);
                                                        if (cssText !== null) {
                                                            storage.add(url, cssText);
                                                        }
                                                        if (register_id !== null) {
                                                            flex.overhead.register.done(register_id, url);
                                                        }
                                                        measuring.measure(perf_id, 'loading resources for (' + self.url + '):: ' + url);
                                                    }
                                                );
                                            } else {
                                                flex.resources.attach.css.adoption(storaged, null, url);
                                                flex.overhead.register.done(register_id, url);
                                                storage.add(url, storaged);
                                            }
                                        } else {
                                            flex.overhead.register.done(register_id, url);
                                        }
                                    }
                                );
                            } else {
                                callback(success);
                            }
                        },
                    },
                    js  : {
                        load: function (success, fail) {
                            var journal     = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.JS_ATTACHED_JOURNAL, {}),
                                register_id = flex.unique();
                            if (privates.js !== null && privates.js.length > 0) {
                                flex.overhead.register.open(register_id, privates.js, success);
                                Array.prototype.forEach.call(
                                    privates.js,
                                    function (url) {
                                        var storaged    = null,
                                            perf_id     = null;
                                        if (journal[url] === void 0) {
                                            controllers.references.assign(url, self.url);
                                            journal[url]    = true;
                                            storaged        = storage.get(url);
                                            if (storaged === null || config.get().USE_STORAGE_JS === false) {
                                                perf_id = measuring.measure();
                                                flex.resources.attach.js.connect(
                                                    url,
                                                    function () {
                                                        flex.overhead.register.done(register_id, url);
                                                        var request = flex.ajax.send(
                                                            url,
                                                            flex.ajax.methods.GET,
                                                            null,
                                                            {
                                                                success: function (response, request) {
                                                                    storage.add(url, response.original);
                                                                },
                                                            }
                                                        );
                                                        request.send();
                                                        measuring.measure(perf_id, 'loading resources for (' + self.url + '):: ' + url);
                                                    },
                                                    function () {
                                                        flex.logs.log(signature() + logs.source.FAIL_TO_LOAD_JS_RESOURCE, flex.logs.types.CRITICAL);
                                                        measuring.measure(perf_id, 'loading resources for (' + self.url + '):: ' + url);
                                                        callback(fail);
                                                        throw logs.source.FAIL_TO_LOAD_JS_RESOURCE;
                                                    }
                                                );
                                            } else {
                                                controllers.current.set(url);
                                                flex.resources.attach.js.adoption(storaged, function () {
                                                    flex.overhead.register.done(register_id, url);
                                                    controllers.current.reset(url);
                                                });
                                                storage.add(url, storaged);
                                            }
                                        } else {
                                            flex.overhead.register.done(register_id, url);
                                        }
                                    }
                                );
                            } else {
                                callback(success);
                            }
                        },
                    }
                };
                callback    = function (callback) {
                    if (typeof callback === 'function') {
                        callback.call(privates.__instance, self.url, self.original_url, privates.__instance);
                    }
                };
                get         = {
                    html: function () { return privates.html; }
                };
                signature   = function () {
                    return logs.SIGNATURE + ':: pattern (' + self.url + ')';
                };
                returning   = {
                    load : load,
                    html : get.html,
                };
                return {
                    load: returning.load,
                    html: returning.html
                };
            },
            instance    : function (parameters) {
                if (flex.oop.objects.validate(parameters, [ { name: 'url',  type: 'string'              },
                                                            { name: 'html', type: 'string', value: null },
                                                            { name: 'css',  type: 'array',  value: null },
                                                            { name: 'js',   type: 'array',  value: null }]) !== false) {
                    return _object({
                        parent          : settings.classes.SOURCE,
                        constr          : function () {
                            this.url            = flex.system.url.restore(parameters.url);
                            this.original_url   = parameters.url;
                        },
                        privates        : {
                            original: null,
                            html    : parameters.html,
                            css     : parameters.css,
                            js      : parameters.js,
                        },
                        prototype       : source.proto
                    }).createInstanceClass();
                } else {
                    return null;
                }
            },
            storage     : {
                add: function (url, instance) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.PATTERN_SOURCES, {});
                    if (storage[url] === void 0) {
                        storage[url] = instance;
                    }
                },
                get: function (url) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.PATTERN_SOURCES, {});
                    return storage[url] !== void 0 ? storage[url] : null;
                },
            },
            init        : function (url, success, fail) {
                var urls        = url instanceof Array ? url : [url],
                    journal     = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.PRELOAD_TRACKER, {}),
                    register_id = flex.unique(),
                    sources     = [],
                    is_failed   = false;
                flex.overhead.register.open(register_id, urls, function () {
                    if (typeof success === 'function' && !is_failed) {
                        success(sources);
                    } else {
                        flex.system.handle(fail);
                    }
                });
                urls.forEach(function (url) {
                    var instance = source.storage.get(url);
                    if (instance !== null) {
                        sources.push(instance);
                        flex.overhead.register.done(register_id, url);
                    } else {
                        instance = source.instance({ url: url });
                        instance.load(
                            function (_url, _original_url, _instance) {
                                sources.push                (_instance);
                                source.storage.add          (_original_url, _instance);
                                pattern.init                (_url, _instance.html());
                                flex.overhead.register.done (register_id, _original_url);
                            },
                            function (_url, _original_url, _instance) {
                                is_failed = true;
                                flex.overhead.register.done(register_id, _original_url);
                            }
                        );
                    }
                });
            }
        };
        //END: source class ===============================================
        //BEGIN: pattern class ===============================================
        pattern     = {
            proto       : function (privates) {
                var self            = this,
                    hooks           = null,
                    convert         = null,
                    compatibility   = null,
                    clone           = null,
                    returning       = null,
                    signature       = null;
                convert         = {
                    hooks       : {
                        getFromHTML : function(){
                            var hooks = privates.html.match(settings.regs.HOOK);
                            if (hooks instanceof Array) {
                                hooks = (function (hooks) {
                                    var history = {};
                                    return hooks.filter(function (hook) {
                                        if (history[hook] === void 0) {
                                            history[hook] = true;
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                }(hooks));
                                hooks = hooks.map(function (hook) {
                                    return hook .replace(new RegExp(settings.regs.HOOK_OPEN,    'gi'), '')
                                                .replace(new RegExp(settings.regs.HOOK_CLOSE,   'gi'), '');
                                });
                                return hooks;
                            }
                        },
                        wrap        : function (target_node) {
                            function wrapHook(node) {
                                var innerHTML   = node.nodeValue,
                                    hooks       = innerHTML.match(settings.regs.HOOK),
                                    container   = null,
                                    tag         = settings.compatibility.PARENT_TO_CHILD[node.parentNode.nodeName.toLowerCase()] !== void 0 ? settings.compatibility.PARENT_TO_CHILD[node.parentNode.nodeName.toLowerCase()] : settings.compatibility.BASE;
                                if (hooks instanceof Array) {
                                    hooks.forEach(function (hook) {
                                        var _hook = hook.replace(settings.regs.HOOK_BORDERS, '');
                                        innerHTML = innerHTML.replace(  new RegExp(settings.regs.HOOK_OPEN + _hook + settings.regs.HOOK_CLOSE, 'gi'),
                                                                        '<' + tag + ' id="' + _hook + '" class="' + settings.css.classes.HOOK_WRAPPER + '"><!--' + hook + '--></' + tag + '>');
                                    });
                                    container           = document.createElement(node.parentNode.nodeName);
                                    container.innerHTML = innerHTML;
                                    for (var index = 0, max_index = container.childNodes.length; index < max_index; index += 1) {
                                        node.parentNode.insertBefore(container.childNodes[0], node);
                                    }
                                    node.parentNode.removeChild(node);
                                }
                            };
                            if (target_node.childNodes !== void 0) {
                                if (target_node.childNodes.length > 0) {
                                    Array.prototype.forEach.call(
                                        Array.prototype.filter.call(target_node.childNodes, function () { return true; }),
                                        function (childNode) {
                                            if (typeof childNode.innerHTML === 'string') {
                                                if (helpers.testReg(settings.regs.HOOK, childNode.innerHTML)) {
                                                    convert.hooks.wrap(childNode);
                                                }
                                            } else if (typeof childNode.nodeValue === 'string') {
                                                if (helpers.testReg(settings.regs.HOOK, childNode.nodeValue)) {
                                                    wrapHook(childNode);
                                                }
                                            }
                                        }
                                    );
                                }
                            }
                            return true;
                        },
                        setters     : {
                            inNodes     : function (node, hook, storage, hook_com) {
                                var hook_com    = hook_com  instanceof RegExp ? hook_com    : new RegExp(settings.regs.HOOK_OPEN_COM    + hook + settings.regs.HOOK_CLOSE_COM,  'gi'),
                                    hook        = hook      instanceof RegExp ? hook        : new RegExp(settings.regs.HOOK_OPEN        + hook + settings.regs.HOOK_CLOSE,      'gi');
                                if (node.childNodes !== void 0) {
                                    if (node.childNodes.length > 0) {
                                        Array.prototype.forEach.call(node.childNodes, function (childNode) {
                                            if (typeof childNode.innerHTML === 'string') {
                                                if (helpers.testReg(hook_com, childNode.innerHTML)) {
                                                    convert.hooks.setters.inNodes(childNode, hook, storage, hook_com);
                                                }
                                            } else if (typeof childNode.nodeValue === 'string') {
                                                if (helpers.testReg(hook, childNode.nodeValue)) {
                                                    storage.push(convert.hooks.setters.nodeSetter(childNode.parentNode));
                                                }
                                            }
                                        });
                                    }
                                }
                            },
                            inAttributes: function (node, hook, storage, reg_hook) {
                                var reg_hook = reg_hook instanceof RegExp ? reg_hook : new RegExp(settings.regs.HOOK_OPEN + hook + settings.regs.HOOK_CLOSE, 'gi');
                                if (node.attributes) {
                                    Array.prototype.forEach.call(node.attributes, function (attr) {
                                        if (typeof attr.value === 'string' && attr.value !== '') {
                                            if (helpers.testReg(reg_hook, attr.value)) {
                                                node.setAttribute(attr.nodeName, attr.value.replace(reg_hook, '{{' + hook + '_attr' + '}}'));
                                                storage.push(convert.hooks.setters.attrSetter(
                                                    new RegExp(settings.regs.HOOK_OPEN + hook + '_attr' + settings.regs.HOOK_CLOSE, 'gi'),
                                                    node,
                                                    attr.nodeName,
                                                    node.getAttribute(attr.nodeName))
                                                );
                                            }
                                        }
                                    });
                                }
                                if (node.childNodes) {
                                    Array.prototype.forEach.call(node.childNodes, function (childNode) {
                                        convert.hooks.setters.inAttributes(childNode, hook, storage, reg_hook);
                                    });
                                }
                            },
                            attrSetter  : function (hook, node, attr_name, attr_value) {
                                return function (value) {
                                    node.setAttribute(attr_name, attr_value.replace(hook, value));
                                };
                            },
                            nodeSetter  : function (node) {
                                function verifyCompatibility(node, value) {
                                    var _node   = null,
                                        tag     = null;
                                    if (node.innerHTML !== value) {
                                        tag = compatibility.getFirstTagFromHTML(value.replace(settings.regs.BODY_CLEAR, ''));
                                        if (settings.compatibility.CHILD_TO_PARENT[tag] !== void 0) {
                                            if (settings.compatibility.CHILD_TO_PARENT[tag] !== node.nodeName.toLowerCase()) {
                                                _node = document.createElement(settings.compatibility.CHILD_TO_PARENT[tag]);
                                                if (node.attributes !== void 0 && node.attributes !== null && node.attributes.length !== void 0) {
                                                    Array.prototype.forEach.call(node.attributes, function (attr) {
                                                        _node.setAttribute(attr.nodeName, attr.value);
                                                    });
                                                }
                                                _node.innerHTML = value;
                                                node.parentNode.insertBefore(_node, node)
                                                node.parentNode.removeChild(node);
                                                node = _node;
                                            }
                                        }
                                    }
                                    return node;
                                };
                                return function (value) {
                                    if (typeof value.innerHTML === 'string') {
                                        node.parentNode.insertBefore(value, node);
                                        node.parentNode.removeChild(node);
                                        return true;
                                    }
                                    if (value instanceof settings.classes.RESULT) {
                                        value.nodes().forEach(function (_node) {
                                            node.parentNode.insertBefore(_node, node);
                                        });
                                        node.parentNode.removeChild(node);
                                        return true;
                                    }
                                    if (value.toString !== void 0 || typeof value === 'string') {
                                        node.innerHTML  = typeof value === 'string' ? value : value.toString();
                                        node            = verifyCompatibility(node, value);
                                        for (var index = node.childNodes.length - 1; index >= 0; index -= 1) {
                                            node.parentNode.insertBefore(node.childNodes[0], node);
                                        }
                                        node.parentNode.removeChild(node);
                                        return true;
                                    }
                                };
                            },
                        },
                        process     : function () {
                            privates.hooks_html = convert.hooks.getFromHTML();
                            convert.hooks.wrap(privates.pattern);
                        },
                    },
                    model       : {
                        getFromHTML : function () {
                            var models = privates.html.match(settings.regs.MODEL);
                            if (models instanceof Array) {
                                models = (function (models) {
                                    var history = {};
                                    return models.filter(function (model) {
                                        if (history[model] === void 0) {
                                            history[model] = true;
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                }(models));
                                models = models.map(function (model) {
                                    return model.replace(settings.regs.MODEL_BORDERS, '');
                                });
                                return models;
                            }
                            return null;
                        },
                        setAttrData : function(node, model_item){
                            var model = node.getAttribute(settings.css.attrs.MODEL_DATA);
                            model       = typeof model === 'string' ? (model !== '' ? JSON.parse(model) : []) : [];
                            model.push(model_item);
                            node.setAttribute(settings.css.attrs.MODEL_DATA, JSON.stringify(model));
                        },
                        find        : {
                            inStyles: function (node, style){
                                var properties = style.split(';');
                                properties.forEach(function (property) {
                                    var pair    = property.split(':'),
                                        model   = property.match(settings.regs.MODEL);
                                    if (pair.length > 1) {
                                        if (node.style[pair[0]] !== void 0) {
                                            model = property.match(settings.regs.MODEL);
                                            if (model instanceof Array && model.length === 1) {
                                                model = model[0].replace(settings.regs.MODEL_BORDERS, '');
                                                convert.model.setAttrData(node, {
                                                    style: pair[0],
                                                    model: model
                                                });
                                            }
                                        }
                                    }
                                });
                            },
                            inAttrs : function (node, model, reg_model) {
                                var reg_model = reg_model instanceof RegExp ? reg_model : new RegExp(settings.regs.MODEL_OPEN + model + settings.regs.MODEL_CLOSE, 'gi');
                                if (node.attributes) {
                                    Array.prototype.forEach.call(node.attributes, function (attr) {
                                        var defaultIEFix = null;
                                        if (typeof attr.value === 'string' && attr.value !== '') {
                                            if (helpers.testReg(reg_model, attr.value)) {
                                                if (attr.nodeName === 'style') {
                                                    convert.model.find.inStyles(node, attr.value);
                                                } else {
                                                    convert.model.setAttrData(node, {
                                                        attr    : attr.nodeName,
                                                        model   : model
                                                    });
                                                }
                                                node.removeAttribute(attr.nodeName);
                                                if (node[attr.nodeName] !== void 0) {
                                                    try{
                                                        node[attr.nodeName] = null;
                                                    } catch (e) { }
                                                    //IE 11 fix
                                                    defaultIEFix = 'default' + attr.nodeName[0].toUpperCase() + attr.nodeName.substr(1, attr.nodeName.length - 1);
                                                    if (node[defaultIEFix] !== void 0) {
                                                        try {
                                                            node[defaultIEFix] = '';
                                                        } catch (e) { }
                                                    }
                                                }
                                            }
                                        }
                                    });
                                }
                                if (node.childNodes) {
                                    Array.prototype.forEach.call(node.childNodes, function (childNode) {
                                        convert.model.find.inAttrs(childNode, model, reg_model);
                                    });
                                }
                            },
                            inHTML  : function (node, model, reg_model) {
                                function validatePlaceHolder(node, model) {
                                    if (node.childNodes !== null && node.childNodes.length > 0) {
                                        Array.prototype.forEach.call(node.childNodes, function (child) {
                                            if (child.nodeType !== 3) {
                                                if (child.className !== void 0 && child.className.indexOf(settings.css.classes.HOOK_WRAPPER) === -1) {
                                                    flex.logs.log(signature() + logs.pattern.MODEL_HOOK_NEEDS_WRAPPER + '(model hook: ' + model + ')', flex.logs.types.CRITICAL);
                                                    throw logs.pattern.MODEL_HOOK_NEEDS_WRAPPER;
                                                } else if (child.className === void 0) {
                                                    flex.logs.log(signature() + logs.pattern.MODEL_HOOK_NEEDS_WRAPPER + '(model hook: ' + model + ')', flex.logs.types.CRITICAL);
                                                    throw logs.pattern.MODEL_HOOK_NEEDS_WRAPPER;
                                                }
                                            }
                                        });
                                    }
                                };
                                var reg_model = reg_model instanceof RegExp ? reg_model : new RegExp(settings.regs.MODEL_OPEN + model + settings.regs.MODEL_CLOSE, 'gi');
                                if (node.childNodes !== void 0) {
                                    if (node.childNodes.length > 0) {
                                        Array.prototype.forEach.call(node.childNodes, function (childNode) {
                                            if (typeof childNode.innerHTML === 'string') {
                                                if (helpers.testReg(reg_model, childNode.innerHTML)) {
                                                    convert.model.find.inHTML(childNode, model, reg_model);
                                                }
                                            } else if (typeof childNode.nodeValue === 'string') {
                                                if (helpers.testReg(reg_model, childNode.nodeValue)) {
                                                    validatePlaceHolder(node, model);
                                                    convert.model.setAttrData(node, {
                                                        prop    : 'innerHTML',
                                                        model   : model
                                                    });
                                                    childNode.parentNode.removeChild(childNode);
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        },
                        process     : function () {
                            var models_html = convert.model.getFromHTML();
                            if (models_html !== null) {
                                models_html.forEach(function (model) {
                                    convert.model.find.inAttrs(privates.pattern, model);
                                    convert.model.find.inHTML(privates.pattern, model, null);
                                });
                            }
                        }
                    },
                    conditions  : {
                        getName : function (str){
                            var condition = str.split('=');
                            if (condition.length === 2) {
                                return {
                                    name    : condition[0],
                                    value   : condition[1]
                                };
                            }
                            flex.logs.log(signature() + logs.pattern.WRONG_CONDITION_DEFINITION + ' (original comment: ' + str + ')', flex.logs.types.CRITICAL);
                            throw logs.pattern.WRONG_CONDITION_DEFINITION;
                        },
                        getNodes: function (condition_name, condition_node, parent) {
                            var inside_condition    = false,
                                nodes               = [],
                                included            = [],
                                inside_included     = false;
                            try {
                                Array.prototype.forEach.call(parent.childNodes, function (child) {
                                    var con_included = null;
                                    if (inside_condition) {
                                        if (child.nodeType === 8 && child.nodeValue === condition_name) {
                                            inside_condition = null;
                                            throw 'closed';
                                        } else {
                                            if (child.nodeType === 8 && helpers.testReg(settings.regs.CONDITION_STRUCTURE, child.nodeValue)) {
                                                con_included = convert.conditions.getName(child.nodeValue).name;
                                                if (included.indexOf(con_included) === -1) {
                                                    included.push(con_included);
                                                }
                                                inside_included = true;
                                            } else if (child.nodeType === 8 && included.indexOf(child.nodeValue) !== -1) {
                                                inside_included = false;
                                            } else /*if (inside_included === false) */{
                                                nodes.push(child);
                                            }
                                        }
                                    } else if (child === condition_node) {
                                        inside_condition = true;
                                    }
                                });
                            } catch (e) {
                                if (e !== 'closed') {
                                    flex.logs.log(signature() + logs.pattern.UNEXCEPTED_ERROR_CONDITION_PARSER + ' (condition name: ' + condition_name + ')', flex.logs.types.CRITICAL);
                                    throw logs.pattern.UNEXCEPTED_ERROR_CONDITION_PARSER;
                                }
                            }
                            if (inside_condition === false) {
                                flex.logs.log(signature() + logs.pattern.CANNOT_FIND_CONDITION_BEGINING + ' (condition name: ' + condition_name + ')', flex.logs.types.CRITICAL);
                                throw logs.pattern.CANNOT_FIND_CONDITION_BEGINING;
                            }
                            if (inside_condition === true) {
                                flex.logs.log(signature() + logs.pattern.CANNOT_FIND_CONDITION_END + ' (condition name: ' + condition_name + ')', flex.logs.types.CRITICAL);
                                throw logs.pattern.CANNOT_FIND_CONDITION_END;
                            }
                            return {
                                nodes       : nodes,
                                included    : included
                            };
                        },
                        find    : function (node){
                            function search(node, conditions) {
                                if (node.childNodes !== void 0) {
                                    Array.prototype.forEach.call(node.childNodes, function (node) {
                                        var condition   = null,
                                            found       = null;
                                        if (node.nodeType === 8) {
                                            if (helpers.testReg(settings.regs.CONDITION_STRUCTURE, node.nodeValue)) {
                                                condition = convert.conditions.getName(node.nodeValue);
                                                if (conditions[condition.name] === void 0) {
                                                    conditions[condition.name] = [];
                                                }
                                                found = convert.conditions.getNodes(condition.name, node, node.parentNode);
                                                conditions[condition.name].push({
                                                    value       : condition.value,
                                                    comment     : node,
                                                    nodes       : found.nodes,
                                                    included    : found.included
                                                });
                                            }
                                        } else if (node.childNodes !== void 0 && node.childNodes.length > 0) {
                                            search(node, conditions);
                                        }
                                    });
                                }
                            };
                            function setupAppendMethod(conditions) {
                                function add(comment) {
                                    if (_comments.indexOf(comment) === -1) {
                                        _comments.push(comment);
                                    }
                                };
                                function getAppend(node) {
                                    var _node   = node,
                                        result  = null,
                                        next    = null,
                                        in_con  = convert.conditions.getName(node.nodeValue).name;
                                    add(node);
                                    do {
                                        next = node.nextSibling !== void 0 ? node.nextSibling : null;
                                        if (next !== null) {
                                            if (next.nodeType === 8 && helpers.testReg(settings.regs.CONDITION_STRUCTURE, next.nodeValue)) {
                                                in_con  = convert.conditions.getName(next.nodeValue).name;
                                                node    = next;
                                                add(next);
                                            } else if (in_con !== false && next.nodeType === 8 && next.nodeValue === in_con) {
                                                in_con  = false;
                                                node    = next;
                                                add(next);
                                            } else if (!in_con && next.nodeType !== 8) {
                                                if (next.nodeType === 3 && next.nodeValue.replace(/\s|\r|\n|\t/gi, '') === ''){
                                                    node = next;
                                                } else {
                                                    _node   = node;
                                                    result  = function append(node) {
                                                        if (_node.parentNode !== null) {
                                                            if (_node.nextSibling !== null){
                                                                _node.parentNode.insertBefore(node, _node.nextSibling);
                                                            } else {
                                                                _node.parentNode.appendChild(node);
                                                            }
                                                            return true;
                                                        } else {
                                                            return false;
                                                        }
                                                    };
                                                }
                                            } else {
                                                node = next;
                                            }
                                        } else {
                                            _node   = _node.parentNode;
                                            result  = function append(node) {
                                                _node.appendChild(node);
                                                return true;
                                            };
                                        }
                                            
                                    } while (result === null);
                                    return result;
                                };
                                var _comments = [];
                                _object(conditions).forEach(function (con_name, con_value) {
                                    if (con_value instanceof Array) {
                                        con_value.forEach(function (value, index) {
                                            conditions[con_name][index].append = getAppend(value.comment);
                                        });
                                    }
                                });
                                return _comments;
                            };
                            function removeComments(conditions, comments) {
                                _object(conditions).forEach(function (con_name, con_value) {
                                    if (con_value instanceof Array) {
                                        con_value.forEach(function (value, index) {
                                            value.nodes.forEach(function (node) {
                                                value.append(node);
                                            });
                                            conditions[con_name][index].comment = null;
                                            delete conditions[con_name][index].comment;
                                        });
                                    }
                                });
                                comments.forEach(function (comment) {
                                    if (comment.parentNode !== null) {
                                        comment.parentNode.removeChild(comment);
                                    }
                                });
                            };
                            var conditions  = {},
                                _comments   = null;
                            search(node, conditions);
                            _comments = setupAppendMethod(conditions);
                            removeComments(conditions, _comments);
                            return conditions;
                        },
                        process : function (clone, _conditions) {
                            var conditions      = convert.conditions.find(clone),
                                conditions_dom  = {};
                            _object(_conditions).forEach(function (con_name, con_value) {
                                var found_flag  = false;
                                if (conditions[con_name] !== void 0) {
                                    conditions_dom[con_name] = {};
                                    conditions[con_name].forEach(function (condition) {
                                        conditions_dom[con_name][condition.value] = conditions_dom[con_name][condition.value] === void 0 ? [] : conditions_dom[con_name][condition.value];
                                        conditions_dom[con_name][condition.value] = (function (_append, _nodes, _included) {
                                            var methods = {
                                                append      : function append() {
                                                    var to_delete = [];
                                                    _nodes.forEach(function (node, index) {
                                                        if (node.__to_deleted === void 0) {
                                                            _append(node);
                                                        } else {
                                                            to_delete.push(index);
                                                        }
                                                    });
                                                    if (to_delete.length > 0) {
                                                        _nodes = _nodes.filter(function (val, index) {
                                                            return to_delete.indexOf(index) !== -1 ? false : true;
                                                        });
                                                    }
                                                },
                                                remove      : function remove() {
                                                    var to_delete = [];
                                                    _nodes.forEach(function (node, index) {
                                                        if (node.parentNode !== null) {
                                                            return node.parentNode.removeChild(node);
                                                        }
                                                        if (node.__to_deleted !== void 0) {
                                                            to_delete.push(index);
                                                        }
                                                    });
                                                    if (to_delete.length > 0) {
                                                        _nodes = _nodes.filter(function (val, index) {
                                                            return to_delete.indexOf(index) !== -1 ? false : true;
                                                        });
                                                    }
                                                },
                                                del         : function del() {
                                                    _nodes.forEach(function (node) {
                                                        node.__to_deleted = true;
                                                    });
                                                },
                                                included    : _included
                                            };
                                            methods.append.blocked = false;
                                            methods.remove.blocked = false;
                                            return methods;
                                        }(condition.append, condition.nodes, condition.included));
                                        condition.nodes.forEach(function (node) {
                                            if (condition.value !== con_value) {
                                                if (node.parentNode !== null) {
                                                    node.parentNode.removeChild(node);
                                                }
                                            } else {
                                                found_flag = true;
                                            }
                                        });
                                    });
                                    conditions_dom[con_name].__update   = (function (values) {
                                        return function update(res) {
                                            _object(values).forEach(function (name, methods) {
                                                if (methods.append !== void 0 && methods.remove !== void 0) {
                                                    if (!methods.append.blocked && !methods.remove.blocked) {
                                                        if (res === name) {
                                                            methods.append();
                                                        } else {
                                                            methods.remove();
                                                        }
                                                    }
                                                }
                                            });
                                        };
                                    }(conditions_dom[con_name]));
                                    conditions_dom[con_name].__block    = (function (values) {
                                        return function block(res) {
                                            _object(values).forEach(function (name, methods) {
                                                if (methods.append !== void 0 && methods.remove !== void 0) {
                                                    methods.append.blocked = true;
                                                    methods.remove.blocked = true;
                                                }
                                            });
                                        };
                                    }(conditions_dom[con_name]));
                                    conditions_dom[con_name].__unblock  = (function (values) {
                                        return function unblock(res) {
                                            _object(values).forEach(function (name, methods) {
                                                if (methods.append !== void 0 && methods.remove !== void 0) {
                                                    methods.append.blocked = false;
                                                    methods.remove.blocked = false;
                                                }
                                            });
                                        };
                                    }(conditions_dom[con_name]));
                                    conditions_dom[con_name].__included = (function (values) {
                                        var included = [];
                                        _object(values).forEach(function (name, methods) {
                                            if (methods.included !== void 0) {
                                                included = included.concat(methods.included);
                                            }
                                        });
                                        return included;
                                    }(conditions_dom[con_name]));
                                    if (!found_flag) {
                                        flex.logs.log(signature() + logs.pattern.CANNOT_FIND_CONDITION_VALUE + ' (condition name: ' + con_name + ' = "' + con_value + '")', flex.logs.types.WARNING);
                                    }
                                } else {
                                    flex.logs.log(signature() + logs.pattern.CANNOT_FIND_CONDITION_NODES + ' (condition name: ' + con_name + ')', flex.logs.types.WARNING);
                                }
                            });
                            return Object.keys(conditions_dom).length > 0 ? conditions_dom : null;
                        }
                    },
                    marks       : {
                        getFromHTML : function (type) {
                            var marks   = null,
                                _marks  = [];
                            if (settings.regs[type] !== void 0) {
                                marks = privates.html.match(settings.regs[type]);
                                if (marks instanceof Array) {
                                    marks = (function (marks) {
                                        var history = {};
                                        return marks.filter(function (mark) {
                                            if (history[mark] === void 0) {
                                                history[mark] = true;
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        });
                                    }(marks));
                                    marks.forEach(function (mark, index) {
                                        var _mark = mark.replace(new RegExp(settings.regs[type + '_OPEN'], 'gi'), '')
                                                                .replace(new RegExp(settings.regs[type + '_CLOSE'], 'gi'), '');
                                        privates.html = privates.html.replace(
                                            new RegExp(settings.regs[type + '_OPEN'] + _mark.replace(/\./gi, '\\.') + settings.regs[type + '_CLOSE'], 'gi'),
                                            ' ' + settings.css.attrs[type + '_MARK'] + '="' + _mark + '" ');
                                        _mark = _mark.split(',');
                                        _mark.forEach(function (mark) {
                                            mark = mark.replace(/\s/gi);
                                            if (_marks.indexOf(mark) === -1) {
                                                _marks.push(mark);
                                            }
                                        });
                                    });
                                }
                            }
                            return _marks;
                        },
                        getFromDOM  : function (clone, type) {
                            var marks = {};
                            if (privates[type.toLowerCase()] instanceof Array) {
                                privates[type.toLowerCase()].forEach(function (mark) {
                                    marks[mark] = _nodes('*[' + settings.css.attrs[type + '_MARK'] + '*="' + mark + '"]', false, clone);
                                    if (marks[mark].target !== null && marks[mark].target.length > 0) {
                                        marks[mark] = marks[mark].target;
                                    }
                                });
                                _object(marks).forEach(function (name, nodes) {
                                    if (marks[name] !== null) {
                                        switch (type) {
                                            case settings.marks.DOM:
                                                marks[name] = nodes;
                                                break;
                                        }
                                        Array.prototype.forEach.call(nodes, function (node, number) {
                                            node.removeAttribute(settings.css.attrs[type + '_MARK']);
                                        });
                                    }
                                });
                            }
                            return marks;
                        },
                        process     : function () {
                            [settings.marks.DOM].forEach(function (type) {
                                privates[type.toLowerCase()] = convert.marks.getFromHTML(type);
                            });
                        }
                    },
                    process     : function () {
                        privates.pattern = compatibility.getParent(compatibility.getFirstTagFromHTML(privates.html));
                        if (privates.pattern !== null) {
                            convert.marks.      process();
                            privates.pattern.innerHTML = privates.html;
                            convert.hooks.      process();
                            convert.model.      process();
                            return true;
                            /*
                            if (privates.pattern.innerHTML.replace(settings.regs.NOT_WORDS_NUMBERS, '') === privates.html.replace(settings.regs.NOT_WORDS_NUMBERS, '')) {
                                convert.hooks.process();
                                convert.model.process();
                                return true;
                            } else {
                                flex.logs.log(signature() + logs.pattern.WRONG_PATTERN_WRAPPER, flex.logs.types.CRITICAL);
                                throw logs.pattern.WRONG_PATTERN_WRAPPER;
                            }
                            */
                        } else {
                            flex.logs.log(signature() + logs.pattern.CANNOT_CREATE_WRAPPER, flex.logs.types.CRITICAL);
                            throw logs.pattern.CANNOT_CREATE_WRAPPER;
                        }
                        return false;
                    }
                };
                compatibility   = {
                    getParent           : function (child_tag) {
                        if (typeof child_tag === 'string') {
                            if (settings.compatibility.CHILD_TO_PARENT[child_tag] !== void 0) {
                                return document.createElement(settings.compatibility.CHILD_TO_PARENT[child_tag]);
                            } else {
                                return document.createElement(settings.compatibility.BASE);
                            }
                        } else {
                            return null;
                        }
                    },
                    getFirstTagFromHTML : function (html) {
                        var tag = html.match(settings.regs.FIRST_TAG);
                        if (tag !== null) {
                            if (tag.length === 1) {
                                return tag[0].replace(settings.regs.TAG_BORDERS, '').match(settings.regs.FIRST_WORD)[0].toLowerCase()
                            }
                        }
                        flex.logs.log(signature() + logs.pattern.CANNOT_FIND_FIRST_TAG + '(Probably hook has symbol of caret inside (\\n, \\r))', flex.logs.types.NOTIFICATION);
                        return null;
                    }
                };
                clone           = function (condition_values) {
                    var hook_setters    = {},
                        clone           = privates.pattern.cloneNode(true),
                        conditions      = null;
                    privates.hooks_html.forEach(function (hook) {
                        var _hooks = [];
                        convert.hooks.setters.inAttributes  (clone, hook, _hooks);
                        convert.hooks.setters.inNodes       (clone, hook, _hooks);
                        hook_setters[hook] = (function (_hooks) {
                            return function (value) {
                                _hooks.forEach(function (_hook) {
                                    _hook(value);
                                });
                            };
                        }(_hooks));
                    });
                    return {
                        clone           : clone,
                        setters         : hook_setters,
                        dom             : convert.marks.getFromDOM(clone, settings.marks.DOM),
                        applyConditions : function(){
                            var conditions_dom  = null;
                            if (condition_values !== void 0 && condition_values !== null) {
                                conditions_dom = convert.conditions.process(clone, condition_values);
                            }
                            return conditions_dom;
                        }
                    };
                };
                signature       = function () {
                    return logs.SIGNATURE + ':: pattern (' + self.url + ')';
                };
                returning       = {
                    build   : convert.process,
                    clone   : clone
                };
                return {
                    build   : returning.build,
                    pattern : returning.clone
                };
            },
            instance    : function (parameters) {
                if (flex.oop.objects.validate(parameters, [ { name: 'url',  type: 'string'  },
                                                            { name: 'html', type: 'string'  }]) !== false) {
                    return _object({
                        parent          : settings.classes.PATTERN,
                        constr          : function () {
                            this.url    = flex.system.url.restore(parameters.url);
                        },
                        privates        : {
                            html                : parameters.html,
                            pattern             : null,
                            hooks_html          : null,
                            dom                 : null
                        },
                        prototype       : pattern.proto
                    }).createInstanceClass();
                } else {
                    return null;
                }
            },
            storage     : {
                add: function (url, instance) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.PATTERNS, {});
                    if (storage[url] === void 0) {
                        storage[url] = instance;
                    }
                },
                get: function (url) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.PATTERNS, {});
                    return storage[url] !== void 0 ? storage[url] : null;
                },
            },
            init        : function (url, html) {
                var _instance = pattern.storage.get(url);
                if (_instance !== null) {
                    return _instance;
                } else {
                    _instance = pattern.instance({ url: url, html: html });
                    if (_instance.build() !== false) {
                        instance.init(url, _instance.pattern)
                        pattern.storage.add(url, _instance);
                        return _instance;
                    }
                }
                return null;
            }
        };
        //END: pattern class ===============================================
        //BEGIN: instance class ===============================================
        instance    = {
            proto   : function(privates){
                var self        = this,         
                    privates    = privates,
                    map         = null,
                    hooks       = null,
                    model       = null,
                    dom         = null,
                    methods     = null,
                    controller  = null,
                    cloning     = null,
                    condition   = null,
                    returning   = null;
                cloning     = {
                    update          : function (_hooks, conditions) {
                        var _hooks  = _hooks instanceof Array ? _hooks[0] : _hooks,
                            map     = {};
                        _object(_hooks).forEach(function (hook_name, hook_value) {
                            if (hook_value instanceof settings.classes.RESULT) {
                                map['__' + hook_name + '__'] = hook_value.url;
                            } else {
                                map[hook_name] = true;
                            }
                            map['__conditions__'] = conditions;
                        });
                        return map;
                    },
                    convertHooks    : function(hooks_map, hooks){
                        var _hooks  = [],
                            hooks   = hooks instanceof Array ? hooks : [hooks];
                        hooks.forEach(function (_item) {
                            var item = {};
                            _object(_item).forEach(function (hook_name, hook_value) {
                                if (hooks_map[hook_name] !== void 0) {
                                    if (typeof hooks_map[hook_name] === 'boolean' && hooks_map[hook_name] === true) {
                                        item[hook_name] = hook_value;
                                    } else if (typeof hooks_map[hook_name] === 'object' && hooks_map['__' + hook_name + '__'] !== void 0 && typeof hook_value === 'object' && hook_value !== null) {
                                        item[hook_name] = caller.instance({
                                            url         : hooks_map['__' + hook_name + '__'],
                                            conditions  : hooks_map[hook_name]['__conditions__'],
                                            hooks       : cloning.convertHooks(hooks_map[hook_name], hook_value)
                                        });
                                    } else {
                                        flex.logs.log(logs.instance.NO_URL_FOR_CLONE_HOOK + '(' + self.url + ')', flex.logs.types.WARNING);
                                    }
                                } else {
                                    flex.logs.log(logs.instance.BAD_HOOK_FOR_CLONE + '(' + self.url + ')', flex.logs.types.CRITICAL);
                                    throw logs.instance.BAD_HOOK_FOR_CLONE;
                                }
                            });
                            _hooks.push(item);
                        });
                        return _hooks;
                    },
                    clone           : function (hooks_map, hooks) {
                        var _hooks = cloning.convertHooks(hooks_map, hooks),
                            result = null;
                        if (_hooks.length > 0) {
                            result = caller.instance({
                                url     : self.url,
                                hooks   : _hooks
                            }).render(true);
                            return result instanceof settings.classes.RESULT ? result.nodes() : null;
                        }
                    }
                };
                hooks       = {
                    build       : function (_hooks) {
                        if (_hooks instanceof Array) {
                            _hooks.forEach(function (_, index) {
                                _hooks[index] = hooks.build(_hooks[index]);
                            });
                        } else {
                            if (_hooks !== null) {
                                _object(_hooks).forEach(function (hook_name, hook_value) {
                                    if (typeof hook_value === 'function') {
                                        _hooks[hook_name] = hook_value();
                                    } else if (typeof hook_value === 'object' && hook_value !== null) {
                                        hooks.convertObj(hook_value, _hooks, hook_name);
                                        delete _hooks[hook_name];
                                    }
                                });
                            }
                        }
                        return _hooks;
                    },
                    apply       : function (hooks, hook_setters, hooks_map) {
                        if (hooks !== null) {
                            _object(hook_setters).forEach(function (key, hook_setter) {
                                var value = null;
                                if (hooks[key] !== void 0) {
                                    if (hooks[key] instanceof settings.classes.RESULT) {
                                        map.        current[key]                        = hooks[key].map();
                                        model.      current.model   ['__' + key + '__'] = hooks[key].model();
                                        model.      current.binds   ['__' + key + '__'] = hooks[key].binds();
                                        dom.        current         ['__' + key + '__'] = hooks[key].dom();
                                        hooks_map[key]                                  = hooks[key].hooks_map()
                                    }
                                    hook_setter(hooks[key]);
                                } else {
                                    hook_setter('');
                                }
                            });
                        }
                    },
                    convertObj  : function (hook_obj, _hooks, parent) {
                        _object(hook_obj).forEach(function (key, value) {
                            var path = parent + '.' + key;
                            if (typeof value === 'object' && value !== null) {
                                hooks.convertObj(value, _hooks, path);
                            } else {
                                _hooks[path] = value;
                            }
                        });
                    }
                };
                map         = {
                    current     : {},
                    map         : {},
                    update      : function (clone) {
                        var iteration = {
                            __context: clone.childNodes.length > 0 ? clone.childNodes[0] : null
                        };
                        if (typeof map.current === 'object' && map.current !== null) {
                            _object(map.current).forEach(function (name, value) {
                                iteration[name] = value;
                            });
                        }
                        if (map.map === null) {
                            map.map = {};
                        } else if (typeof map.map === 'object' && !(map.map instanceof Array)) {
                            map.map = [map.map];
                        }
                        if (map.map instanceof Array) {
                            map.map.push(iteration);
                        } else {
                            map.map = iteration;
                        }
                    },
                    reset       : function(){
                        map.map = null;
                    },
                    iteration   : function () {
                        map.current = {};
                    },
                    collapse    : function () {
                        function convert(source) {
                            var storage = null;
                            if (source instanceof Array) {
                                storage = [];
                                source.forEach(function (value) {
                                    storage.push(convert(value));
                                });
                            } else {
                                storage = {};
                                if (source.__context !== void 0) {
                                    storage.__context = instance.map.create(source.__context.parentNode);
                                }
                                _object(source).forEach(function (name, value) {
                                    if (name !== '__context') {
                                        if (typeof value === 'object' || value instanceof Array) {
                                            storage[name] = convert(value);
                                        }
                                    }
                                });
                            }
                            return storage;
                        };
                        return convert(map.map);
                    }
                };
                model       = {
                    current     : null,
                    model       : null,
                    binds       : null,
                    map         : function (clone) {
                        var model_nodes = _nodes('*[' + settings.css.attrs.MODEL_DATA + ']', false, clone).target;
                        if (model_nodes.length > 0) {
                            Array.prototype.forEach.call(model_nodes, function (model_node) {
                                var models = JSON.parse(model_node.getAttribute(settings.css.attrs.MODEL_DATA));
                                if (models instanceof Array) {
                                    models.forEach(function (_model) {
                                        if (model.current.binds[_model.model] === void 0) {
                                            model.current.binds[_model.model] = [];
                                        }
                                        model.current.binds[_model.model].push({
                                            node    : model_node,
                                            attr    : _model.attr   === void 0 ? null : _model.attr,
                                            prop    : _model.prop   === void 0 ? null : _model.prop,
                                            style   : _model.style  === void 0 ? null : _model.style,
                                        });
                                    });
                                }
                            });
                        }
                        return model.current.binds;
                    },
                    update      : function (clone, _serialize) {
                        function bind(group, binds) {
                            function serialize(value) {
                                var result = value;
                                if (_serialize) {
                                    settings.serialize.forEach(function (pear) {
                                        result = result.replace(pear[0], pear[1]);
                                    });
                                }
                                return result;
                            };
                            function correctStyle(prop) {
                                var result = '';
                                prop.split('-').forEach(function (part, index) {
                                    if (index > 0) {
                                        part = String.prototype.toUpperCase.apply(part.charAt(0)) + part.substr(1, part.length - 1);
                                    }
                                    result += part;
                                });
                                return result;
                            };
                            function executeHandles(handles, _this, arg_1, arg_2) {
                                var state_code = arg_1 + arg_2;
                                if (handles instanceof Array) {
                                    handles.forEach(function (handle) {
                                        if (handle.state_code !== state_code) {
                                            handle.state_code = state_code;
                                            handle.call(_this, arg_1, arg_2);
                                        }
                                    });
                                }
                            };
                            function income(key, node, binds, group, prop) {
                                if (node.attr !== null) {
                                    (function (binds, key, node, attr_name, handles) {
                                        _node(node).bindingAttrs().bind(attr_name, function (attr_name, current, previous) {
                                            if (binds[key] !== current) {
                                                binds[key] = current;
                                                executeHandles(handles, this, attr_name, current);
                                            }
                                        });
                                    }(binds, key, node.node, node.attr, group[key].handles));
                                }
                                if (node.style !== null) {
                                    (function (binds, key, node, prop, handles) {
                                        _node(node).bindingProps().bind('style.' + prop, function (prop, current, previous) {
                                            if (binds[key] !== current) {
                                                binds[key] = current;
                                                executeHandles(handles, this, prop, current);
                                            }
                                        });
                                    }(binds, key, node.node, correctStyle(node.style), group[key].handles));
                                }
                                if (helpers.binds.isPossible(node.node, prop)) {
                                    (function (binds, key, node, attr_name, handles) {
                                        helpers.binds.assing(node, prop, function (event, getter, setter) {
                                            var current = getter();
                                            if (binds[key] !== current) {
                                                binds[key]  = current;
                                                executeHandles(handles, this, attr_name, current);
                                            }
                                        });
                                    }(binds, key, node.node, node.attr, group[key].handles));
                                } else {
                                    if (node.prop !== null) {
                                        (function (binds, key, node, prop, handles) {
                                            _node(node).bindingProps().bind(prop, function (prop, current, previous) {
                                                if (binds[key] !== current) {
                                                    binds[key] = current;
                                                    executeHandles(handles, this, prop, current);
                                                }
                                            });
                                        }(binds, key, node.node, node.prop, group[key].handles));
                                    }
                                }
                            };
                            function outcome(key, node, binds, group, prop) {
                                if (node.attr !== null) {
                                    (function (binds, key, node, attr_name, handles) {
                                        binds[key] = node.getAttribute(attr_name);
                                        _object(binds).binding().bind(key, function (current, previous) {
                                            var execute = false,
                                                current = serialize(current);
                                            if (node.getAttribute(attr_name) !== current) {
                                                node.setAttribute(attr_name, current);
                                                execute = true;
                                            }
                                            if (node[attr_name] !== void 0) {
                                                if (node[attr_name] !== current) {
                                                    node[attr_name] = current;
                                                    execute = true;
                                                }
                                            }
                                            if (execute) {
                                                executeHandles(handles, node, attr_name, current);
                                            }
                                        });
                                    }(binds, key, node.node, node.attr, group[key].handles));
                                } 
                                if (node.style !== null) {
                                    (function (binds, key, node, prop, handles) {
                                        binds[key] = node.style[prop];
                                        _object(binds).binding().bind(key, function (current, previous) {
                                            var current = serialize(current);
                                            if (node.style[prop] !== current) {
                                                node.style[prop] = current;
                                                executeHandles(handles, node.style, prop, current);
                                            }
                                        });
                                    }(binds, key, node.node, correctStyle(node.style), group[key].handles));
                                }
                                if (node.prop !== null) {
                                    if (node.node[prop] !== void 0) {
                                        (function (binds, key, node, prop, handles) {
                                            binds[key] = node[prop];
                                            _object(binds).binding().bind(key, function (current, previous) {
                                                var current = serialize(current);
                                                if (node[prop] !== current) {
                                                    node[prop] = current;
                                                    executeHandles(handles, node, prop, current);
                                                }
                                            });
                                        }(binds, key, node.node, prop, group[key].handles));
                                    }
                                }
                            };
                            if (group !== null) {
                                _object(group).forEach(function (key, nodes) {
                                    if (!helpers.testReg(settings.regs.GROUP_PROPERTY, key)) {
                                        group[key].handles  = [];
                                        binds[key]          = null;
                                        if (nodes instanceof Array) {
                                            nodes.forEach(function (node) {
                                                var prop = node.prop !== null ? node.prop : node.attr;
                                                node.node[settings.storage.NODE_BINDING_DATA] = {
                                                    outcome_call: false
                                                };
                                                income  (key, node, binds, group, prop);
                                                outcome (key, node, binds, group, prop);
                                            });
                                        }
                                        group[key] = {
                                            addHandle   : function (handle) {
                                                handle.state_code = null;
                                                handle.id = flex.unique();
                                                this.handles.push(handle);
                                                return handle.id;
                                            },
                                            removeHandle: function (id) {
                                                var index = -1;
                                                this.handles.forEach(function (handle, _index) {
                                                    if (handle.id === id) {
                                                        index = _index;
                                                    }
                                                });
                                                if (index !== -1) {
                                                    this.handles.splice(index, 1);
                                                }
                                            },
                                            handles     : group[key].handles
                                        };
                                        group[key].addHandle.   bind(group[key]);
                                        group[key].removeHandle.bind(group[key]);
                                    }
                                });
                            }
                        };
                        model.map(clone);
                        bind(model.current.binds, model.current.model);
                        if (model.model === null) {
                            model.model = {};
                        } else if (typeof model.model === 'object' && !(model.model instanceof Array)) {
                            model.model = [model.model];
                        }
                        if (model.model instanceof Array) {
                            model.model.push(model.current.model);
                        } else {
                            model.model = model.current.model;
                        }
                        if (model.binds === null) {
                            model.binds = {};
                        } else if (typeof model.binds === 'object' && !(model.binds instanceof Array)) {
                            model.binds = [model.binds];
                        }
                        if (model.binds instanceof Array) {
                            model.binds.push(model.current.binds);
                        } else {
                            model.binds = model.current.binds;
                        }
                    },
                    clear       : function (clone) {
                        var model_nodes = _nodes('*[' + settings.css.attrs.MODEL_DATA + ']', false, clone).target;
                        if (model_nodes.length > 0) {
                            Array.prototype.forEach.call(model_nodes, function (model_node) {
                                model_node.removeAttribute(settings.css.attrs.MODEL_DATA);
                            });
                        }
                    },
                    reset       : function (){
                        model.model = null;
                        model.binds = null;
                    },
                    iteration   : function () {
                        model.current = {
                            model: {},
                            binds: {}
                        };
                    },
                    getLast     : function () {
                        var last = {
                            model : model.model instanceof Array ? model.model[model.model.length - 1] : model.model,
                            binds : model.binds instanceof Array ? model.binds[model.binds.length - 1] : model.binds
                        };
                        return last;
                    }
                };
                dom         = {
                    current     : null,
                    dom         : null,
                    update      : function (_dom) {
                        if (Object.keys(dom.current).length > 0) {
                            _object(dom.current).forEach(function (key, value) {
                                _dom[key] = value;
                            });
                        }
                        if (dom.dom === null) {
                            dom.dom = {};
                        } else if (typeof dom.dom === 'object' && !(dom.dom instanceof Array)) {
                            dom.dom = [dom.dom];
                        }
                        if (dom.dom instanceof Array) {
                            dom.dom.push(_dom);
                        } else {
                            dom.dom = _dom;
                        }
                    },
                    reset       : function(){
                        dom.dom = null;
                    },
                    iteration   : function () {
                        dom.current = {};
                    },
                    collapse    : function () {
                        function process(source, storage, indexes) {
                            function addIndexes(nodes, indexes) {
                                function toNodeList(nodeList, indexes) {
                                    Array.prototype.forEach.call(nodeList, function (node, index) {
                                        var __indexes = nodeList.length > 1 ? indexes.concat([index]) : indexes;
                                        if (node[settings.other.INDEXES] === void 0 || node[settings.other.INDEXES].length < __indexes.length) {
                                            node[settings.other.INDEXES] = nodeList.length > 1 ? indexes.concat([index]) : indexes;
                                        }
                                    });
                                };
                                if (nodes instanceof NodeList) {
                                    toNodeList(nodes, indexes);
                                } else if (nodes instanceof instance.nodeList.NODE_LIST) {
                                    nodes.collections.forEach(function (collection) {
                                        toNodeList(collection, indexes);
                                    });
                                }
                            };
                            function getFromArray(source, storage, indexes) {
                                var names       = [],
                                    sub_objs    = [];
                                if (source.length > 0 && typeof source[0] === 'object' && source[0] !== null) {
                                    _object(source[0]).forEach(function (name) {
                                        names.push(name);
                                    });
                                    names.forEach(function (name) {
                                        storage[name] = [];
                                        source.forEach(function (value, index) {
                                            if (value[name] instanceof NodeList || value[name] instanceof instance.nodeList.NODE_LIST) {
                                                storage[name].push(value[name]);
                                                addIndexes(value[name], indexes.concat([index]));
                                            } else if (value[name] instanceof Array) {
                                                storage[name].push({});
                                                getFromArray(value[name], storage[name][storage[name].length - 1], indexes.concat([index]));
                                                if (sub_objs.indexOf(name) === -1) {
                                                    sub_objs.push(name);
                                                }
                                            } else if (typeof value[name] === 'object' && value[name] !== null && !(value[name] instanceof instance.nodeList.NODE_LIST)) {
                                                storage[name].push(value[name]);
                                                if (sub_objs.indexOf(name) === -1) {
                                                    sub_objs.push(name);
                                                }
                                            }
                                        });
                                    });
                                    sub_objs.forEach(function (name) {
                                        var source = storage[name];
                                        storage[name] = {};
                                        getFromArray(source, storage[name], indexes);
                                    });
                                    _object(storage).forEach(function (name, value) {
                                        var collection = instance.nodeList.create();
                                        if (value instanceof Array) {
                                            value.forEach(function (nodeList) {
                                                collection.add(nodeList);
                                            });
                                            storage[name] = collection;
                                        }
                                    });
                                    return storage[name];
                                }
                            };
                            _object(source).forEach(function (name, value) {
                                if (value instanceof Array) {
                                    storage[name] = {};
                                    getFromArray(value, storage[name], indexes);
                                } else if (value instanceof NodeList) {
                                    addIndexes(value, indexes);
                                    storage[name] = instance.nodeList.create(value);
                                } else if (typeof value === 'object') {
                                    storage[name] = {};
                                    process(value, storage[name], indexes);
                                }
                            });
                        };
                        function wrap(source) {
                            var result = null;
                            if (source instanceof Array) {
                                result = [];
                                source.forEach(function (item) {
                                    result.push(wrap(item));
                                });
                            } else if (source instanceof NodeList) {
                                result = instance.nodeList.create(source);
                            } else if (typeof source === 'object' && source !== null && !(source instanceof instance.nodeList.NODE_LIST)) {
                                result = {};
                                _object(source).forEach(function (name, value) {
                                    result[name] = wrap(value);
                                });
                            }
                            return result;
                        };
                        var _dom = {};
                        if (dom.dom !== null) {
                            process(dom.dom, _dom, []);
                        }
                        return {
                            listed  : wrap(dom.dom),
                            grouped: _dom
                        };
                    }
                };
                condition   = {
                    get         : function (_hooks, _conditions) {
                        var result = {};
                        if (_conditions !== null) {
                            _object(_conditions).forEach(function (name, handle) {
                                result[name] = handle(_hooks);
                            });
                        }
                        return Object.keys(result).length > 0 ? result : null;
                    },
                    setDefault  : function (_conditions) {
                        var defaults = conditions.storage.get(self.url);
                        if (typeof defaults === 'object' && defaults !== null) {
                            if (typeof _conditions !== 'object' || _conditions === null) {
                                _conditions = {};
                            }
                            _object(defaults).forEach(function (name, value) {
                                if (_conditions[name] === void 0) {
                                    _conditions[name] = value;
                                }
                            });
                            _conditions = Object.keys(_conditions).length > 0 ? _conditions : null;
                        }
                        return _conditions;
                    },
                    tracking    : function (_conditions, conditions_dom, _hooks) {
                        var handles = [];
                        if (typeof _conditions === 'object' && _conditions !== null) {
                            _object(_conditions).forEach(function (con_name, con_value) {
                                if (typeof con_value === 'function') {
                                    if (con_value.tracking !== void 0 && conditions_dom[con_name] !== void 0) {
                                        con_value.tracking = con_value.tracking instanceof Array ? con_value.tracking : [con_value.tracking];
                                        con_value.tracking.forEach(function (tracked) {
                                            var data    = {},
                                                _model  = model.getLast(),
                                                handle  = null;
                                            if (_model.binds[tracked] !== void 0) {
                                                if (typeof _model.binds[tracked].addHandle === 'function') {
                                                    _object(_hooks).forEach(function (hook_name, hook_value) {
                                                        if (_model.model[hook_name] !== void 0) {
                                                            data[hook_name] = function getModelValue() { return _model.model[hook_name]; };
                                                        } else {
                                                            data[hook_name] = hook_value;
                                                        }
                                                    });
                                                    handle = (function (_conditions, con_name, _data, conditions_dom) {
                                                        return function trackingHandle() {
                                                            var data    = {},
                                                                result  = null;
                                                            _object(_data).forEach(function (data_name, data_value) {
                                                                data[data_name] = typeof data_value === 'function' ? data_value() : data_value;
                                                            });
                                                            result = _conditions[con_name](data);
                                                            if (conditions_dom[con_name][result] !== void 0) {
                                                                if (conditions_dom[con_name].__included.length > 0) {
                                                                    conditions_dom[con_name].__included.forEach(function (con_name) {
                                                                        if (typeof _conditions[con_name] === 'function' && conditions_dom[con_name] !== void 0) {
                                                                            if (_conditions[con_name].tracking !== void 0) {
                                                                                conditions_dom[con_name].__unblock();
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                                conditions_dom[con_name].__update(result);
                                                                if (conditions_dom[con_name][result].included.length > 0) {
                                                                    conditions_dom[con_name][result].included.forEach(function (con_name) {
                                                                        var res = null;
                                                                        if (typeof _conditions[con_name] === 'function' && conditions_dom[con_name] !== void 0) {
                                                                            if (_conditions[con_name].tracking !== void 0) {
                                                                                res = _conditions[con_name](data);
                                                                                conditions_dom[con_name].__update(res);
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                                if (conditions_dom[con_name].__included.length > 0) {
                                                                    conditions_dom[con_name].__included.forEach(function (con_name) {
                                                                        if (typeof _conditions[con_name] === 'function' && conditions_dom[con_name] !== void 0) {
                                                                            if (_conditions[con_name].tracking !== void 0) {
                                                                                conditions_dom[con_name].__block();
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        };
                                                    }(_conditions, con_name, data, conditions_dom));
                                                    _model.binds[tracked].addHandle(handle);
                                                    handles.push(handle);
                                                }
                                            }
                                        });
                                    } else {
                                        var result = con_value(_hooks);
                                        if (conditions_dom[con_name] !== void 0) {
                                            _object(conditions_dom[con_name]).forEach(function (res, methods) {
                                                if (res !== result && methods.del !== void 0) {
                                                    methods.del();
                                                    conditions_dom[con_name][res] = null;
                                                    delete conditions_dom[con_name][res];
                                                }
                                            });
                                        }
                                    }
                                }
                            });
                            handles.forEach(function (handle) {
                                handle();
                            });
                        }
                    }
                };
                controller  = {
                    apply       : function (_instance, _resources) {
                        var _controllers = controllers.storage.get(self.url);
                        if (_controllers !== null) {
                            _controllers.forEach(function (controller) {
                                methods.handle(controller, _instance, _resources);
                            });
                        }
                    },
                };
                methods     = {
                    build       : function (_hooks, _resources, _conditions, _serialize) {
                        var nodes           = [],
                            _map            = [],
                            _binds          = [],
                            clone           = null,
                            hooks_map       = null,
                            _instance       = null,
                            _conditions     = condition.setDefault(_conditions);
                        if (_hooks !== null) {
                            map.        reset();
                            model.      reset();
                            dom.        reset();
                            _hooks      = hooks.build(_hooks);
                            hooks_map   = cloning.update(_hooks, _conditions);
                            _hooks      = _hooks instanceof Array ? _hooks : [_hooks];
                            _hooks.forEach(function (_hooks) {
                                var conditions_dom = null;
                                clone           = privates.pattern(condition.get(_hooks, _conditions), _conditions);
                                map.        iteration();
                                model.      iteration();
                                dom.        iteration();
                                hooks.      apply(_hooks, clone.setters, hooks_map);
                                map.        update(clone.clone);
                                model.      update(clone.clone, _serialize);
                                model.      clear(clone.clone);
                                dom.        update(clone.dom);
                                nodes           = nodes.concat(Array.prototype.filter.call(clone.clone.childNodes, function () { return true; }));
                                conditions_dom  = clone.applyConditions();
                                condition.tracking(_conditions, conditions_dom, _hooks);
                            });
                        }
                        _instance = result.instance({
                            url             : self.url,
                            nodes           : nodes,
                            map             : map.map,
                            model           : model.model,
                            binds           : model.binds,
                            dom             : dom.dom,
                            hooks_map       : hooks_map,
                            instance        : privates.__instance,
                            handle          : function (handle, _resources) { return methods.handle(handle, _instance, _resources); }
                        });
                        controller.apply(_instance, _resources);
                        return _instance;
                    },
                    handle      : function (handle, _instance, _resources) {
                        if (typeof handle === 'function') {
                            handle.call(_instance, {
                                model       : model.model,
                                binds       : model.binds,
                                map         : map.collapse(),
                                dom         : dom.collapse(),
                                resources   : _resources,
                            });
                        }
                    },
                    bind        : function (hooks, resources, conditions, serialize) {
                        return function () {
                            return methods.build(hooks, resources, conditions, serialize);
                        };
                    }
                };
                returning   = {
                    build       : methods.build,
                    handle      : methods.handle,
                    controllers : {
                        apply   : controller.apply
                    },
                    bind        : methods.bind,
                    clone       : cloning.clone
                };
                return {
                    build       : returning.build,
                    handle      : returning.handle,
                    controllers : {
                        apply   : returning.controllers.apply
                    },
                    bind        : returning.bind,
                    clone       : returning.clone
                };
            },
            instance: function (parameters) {
                if (flex.oop.objects.validate(parameters, [ { name: 'url',                  type: 'string'      },
                                                            { name: 'pattern',              type: 'function'    }]) !== false) {
                    return _object({
                        parent          : settings.classes.INSTANCE,
                        constr          : function () {
                            this.url    = flex.system.url.restore(parameters.url);
                        },
                        privates        : {
                            //From parameters
                            pattern         : parameters.pattern,
                        },
                        prototype       : instance.proto
                    }).createInstanceClass();
                } else {
                    return null;
                }
            },
            storage : {
                add: function (url, instance) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.PATTERNS, {});
                    if (storage[url] === void 0) {
                        storage[url] = instance;
                    }
                },
                get: function (url) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.PATTERNS, {});
                    return storage[url] !== void 0 ? storage[url] : null;
                },
            },
            init    : function (url, pattern) {
                var _instance = instance.storage.get(url);
                if (_instance === null && pattern !== void 0) {
                    _instance = instance.instance({ url: url, pattern: pattern });
                    instance.storage.add(url, _instance);
                }
                return _instance;
            },
            nodeList: {
                NODE_LIST   : function(nodeList){
                    if (nodeList instanceof NodeList) {
                        this.collections = [nodeList];
                    } else if (helpers.isNode(nodeList)) {
                        this.collections = [[nodeList]];
                    } else {
                        this.collections = [];
                    }
                },
                init        : function () {
                    instance.nodeList.NODE_LIST.prototype = {
                        add         : function (nodeList) {
                            if (nodeList instanceof NodeList) {
                                this.collections.push(nodeList);
                            } else if (nodeList instanceof instance.nodeList.NODE_LIST) {
                                this.collections = this.collections.concat(nodeList.collections);
                            } else if (helpers.isNode(nodeList)) {
                                this.collections.push([nodeList]);
                            }
                        },
                        css         : function (css) {
                            var self = this;
                            if (typeof css === 'object' && css !== null) {
                                _object(css).forEach(function (name, value) {
                                    self.collections.forEach(function (nodeList) {
                                        Array.prototype.forEach.call(nodeList, function (node) {
                                            if (node.style[name] !== void 0) {
                                                node.style[name] = value;
                                            }
                                        });
                                    });
                                });
                            }
                        },
                        addClass    : function (className){
                            this.collections.forEach(function (nodeList) {
                                Array.prototype.forEach.call(nodeList, function (node) {
                                    var classes = node.className.replace(/\s{2,}/gi, '').split(' ');
                                    if (classes.indexOf(className) === -1) {
                                        classes.push(className);
                                        node.className = classes.join(' ');
                                    }
                                });
                            });
                        },
                        removeClass : function (className){
                            this.collections.forEach(function (nodeList) {
                                Array.prototype.forEach.call(nodeList, function (node) {
                                    var classes = node.className.replace(/\s{2,}/gi, '').split(' '),
                                        index   = classes.indexOf(className);
                                    if (index !== -1) {
                                        classes.splice(index, 1);
                                        node.className = classes.join(' ');
                                    }
                                });
                            });
                        },
                        show        : function () {
                            this.collections.forEach(function (nodeList) {
                                Array.prototype.forEach.call(nodeList, function (node) {
                                    node.style.display = node.__display !== void 0 ? node.__display : 'block';
                                });
                            });
                        },
                        hide        : function () {
                            this.collections.forEach(function (nodeList) {
                                Array.prototype.forEach.call(nodeList, function (node) {
                                    node.__display      = node.style.display;
                                    node.style.display  = 'none';
                                });
                            });
                        },
                        remove      : function (){
                            this.collections.forEach(function (nodeList) {
                                Array.prototype.forEach.call(nodeList, function (node) {
                                    if (node.parentNode !== void 0 && node.parentNode !== null) {
                                        node.parentNode.removeChild(node);
                                    }
                                });
                            });
                            this.collections = [];
                        },
                        append      : function (parent){
                            if (typeof parent.appendChild === 'function') {
                                this.collections.forEach(function (nodeList) {
                                    Array.prototype.forEach.call(nodeList, function (node) {
                                        parent.appendChild(node);
                                    });
                                });
                            }
                        },
                        insertBefore: function (parent, before) {
                            if (typeof parent.insertBefore === 'function' && helpers.isNode(before)) {
                                this.collections.forEach(function (nodeList) {
                                    Array.prototype.forEach.call(nodeList, function (node) {
                                        parent.insertBefore(node, before);
                                    });
                                });
                            }
                        },
                        attr        : function (name, value){
                            var result = [];
                            this.collections.forEach(function (nodeList) {
                                Array.prototype.forEach.call(nodeList, function (node) {
                                    if (value !== void 0) {
                                        node.setAttribute(name, value);
                                        result.push(true);
                                    } else {
                                        result.push(node.getAttribute(name));
                                    }
                                });
                            });
                            return result.length === 1 ? result[0] : result;
                        },
                        removeAttr  : function (name) {
                            var result = [];
                            this.collections.forEach(function (nodeList) {
                                Array.prototype.forEach.call(nodeList, function (node) {
                                    result.push(node.removeAttribute(name));
                                });
                            });
                            return result.length === 1 ? result[0] : result;
                        },
                        on          : function (event, handle){
                            if (typeof handle === 'function') {
                                this.collections.forEach(function (nodeList) {
                                    Array.prototype.forEach.call(nodeList, function (node) {
                                        var target = instance.nodeList.create(node);
                                        target.indexes = node[settings.other.INDEXES];
                                        flex.events.DOM.add(node, event, handle.bind(target));
                                    });
                                });
                            } else {
                                throw Error('Defined [handle] is not a function');
                            }
                        },
                        getAsArray  : function () {
                            var result = [];
                            this.collections.forEach(function (nodeList) {
                                Array.prototype.forEach.call(nodeList, function (node) {
                                    result.push(node);
                                });
                            });
                        }
                    };
                },
                create      : function (nodeList) {
                    return new instance.nodeList.NODE_LIST(nodeList);
                },
                addMethod   : function (name, method) {
                    if (typeof name === 'string' && typeof method === 'function') {
                        if (instance.nodeList.NODE_LIST.prototype[name] !== void 0) {
                            flex.logs.log('Method [' + name + '] of NODE_LIST list class was overwritten.', flex.logs.types.NOTIFICATION);
                        }
                        instance.nodeList.NODE_LIST.prototype[name] = method;
                    }
                }
            },
            map     : {
                MAP: function (context) {
                    if (context !== void 0 && context.nodeType !== void 0) {
                        this.context = context;
                    } else {
                        throw Error('Context [context] should be a node.');
                    }
                },
                init: function () {
                    instance.map.MAP.prototype = {
                        select: function (selector) {
                            var results = _nodes(selector, false, this.context);
                            if (results.target !== null && results.target.length > 0) {
                                return results.target.length > 1 ? results.target : results.target[0];
                            } else {
                                return null;
                            }
                        }
                    };
                },
                create: function (context) {
                    return new instance.map.MAP(context);
                }
            }
        };
        //END: instance class ===============================================
        //BEGIN: result class ===============================================
        result      = {
            proto       : function (privates) {
                var mount       = null,
                    returning   = null,
                    clone       = null;
                clone       = function (hooks) {
                    return privates.instance.clone(privates.hooks_map, hooks);
                };
                mount       = function (destination, before, after, replace) {
                    if (destination !== null) {
                        Array.prototype.forEach.call(destination, function (parent) {
                            privates.nodes.forEach(function (node) {
                                if (!replace) {
                                    parent.appendChild(node);
                                } else {
                                    parent.parentNode.insertBefore(node, parent);
                                }
                            });
                            if (replace) {
                                parent.parentNode.removeChild(parent);
                            }
                        });
                    } else if (before !== null && before.parentNode !== void 0 && before.parentNode !== null) {
                        Array.prototype.forEach.call(before, function (parent) {
                            privates.nodes.forEach(function (node) {
                                before.parentNode.insertBefore(node, before);
                            });
                        });
                    } else if (after !== null && after.parentNode !== void 0 && after.parentNode !== null) {
                        Array.prototype.forEach.call(after, function (parent) {
                            var _before = after.nextSibling !== void 0 ? after.nextSibling : null;
                            if (_before !== null) {
                                privates.nodes.forEach(function (node) {
                                    _before.parentNode.insertBefore(node, _before);
                                });
                            } else {
                                privates.nodes.forEach(function (node) {
                                    after.parentNode.appendChild(node);
                                });
                            }
                        });
                    }
                    flex.events.core.fire(flex.registry.events.ui.patterns.GROUP, flex.registry.events.ui.patterns.MOUNTED, privates.nodes);
                };
                returning   = {
                    nodes           : function () { return privates.nodes;          },
                    map             : function () { return privates.map;            },
                    model           : function () { return privates.model;          },
                    dom             : function () { return privates.dom;            },
                    binds           : function () { return privates.binds;          },
                    handle          : function () { return privates.handle;         },
                    hooks_map       : function () { return privates.hooks_map;      },
                    instance        : function () { return privates.instance;       },
                    clone           : clone,
                    mount           : mount
                };
                return {
                    nodes       : returning.nodes,
                    mount       : returning.mount,
                    map         : returning.map,
                    dom         : returning.dom,
                    model       : returning.model,
                    binds       : returning.binds,
                    hooks_map   : returning.hooks_map,
                    instance    : returning.instance,
                    handle      : returning.handle,
                    clone       : returning.clone,
                };
            },
            instance    : function (parameters) {
                if (flex.oop.objects.validate(parameters, [ { name: 'url',              type: 'string'                              },
                                                            { name: 'nodes',            type: 'array'                               },
                                                            { name: 'handle',           type: 'function'                            },
                                                            { name: 'hooks_map',        type: 'object',             value: null     },
                                                            { name: 'instance',         type: 'object',             value: null     },
                                                            { name: 'map',              type: ['object', 'array'],  value: null     },
                                                            { name: 'model',            type: ['object', 'array'],  value: null     },
                                                            { name: 'dom',              type: ['object', 'array'],  value: null     },
                                                            { name: 'binds',            type: ['object', 'array'],  value: null     }]) !== false) {
                    return _object({
                        parent      : settings.classes.RESULT,
                        constr      : function () {
                            this.url = flex.system.url.restore(parameters.url);
                        },
                        privates    : {
                            nodes           : parameters.nodes,
                            map             : parameters.map,
                            model           : parameters.model,
                            binds           : parameters.binds,
                            dom             : parameters.dom,
                            handle          : parameters.handle,
                            hooks_map       : parameters.hooks_map,
                            instance        : parameters.instance,
                        },
                        prototype   : result.proto
                    }).createInstanceClass();
                } else {
                    return null;
                }
            },
        };
        //END: result class ===============================================
        //BEGIN: caller class ===============================================
        caller      = {
            proto   : function(privates){
                var self        = this,
                    mount       = null,
                    render      = null,
                    patterns    = null,
                    hooks       = null,
                    signature   = null,
                    returning   = null;
                patterns    = {
                    reset   : function(){
                        privates.patterns = {};
                    },
                    find: function (hooks) {
                        hooks = hooks instanceof Array ? hooks : [hooks];
                        if (hooks !== null) {
                            hooks.forEach(function (_hooks) {
                                _object(_hooks).forEach(function (hook_name, hook_value) {
                                    if (hook_value instanceof settings.classes.CALLER) {
                                        if (privates.patterns[hook_value.url] === void 0) {
                                            privates.patterns[hook_value.url] = hook_value.url;
                                            patterns.find(hook_value.hooks());
                                        }
                                    }
                                });
                            });
                        }
                        if (privates.patterns[self.url] === void 0) {
                            privates.patterns[self.url] = self.url;
                        }
                    },
                };
                hooks       = {
                    values  : {
                        caller  : function (value) {
                            var _instance   = instance.init(value.url),
                                _hooks      = value.hooks(),
                                result      = null;
                            if (_instance === null) {
                                flex.logs.log(signature() + logs.caller.CANNOT_GET_CHILD_PATTERN + '(' + value.url + ')', flex.logs.types.CRITICAL);
                                flex.system.handle(privates.callbacks.fail, self.url);
                                throw logs.caller.CANNOT_GET_CHILD_PATTERN;
                            } else {
                                hooks.apply(_hooks);
                                return _instance.bind(_hooks, value.resources(), value.conditions(), value.serialize());
                            }
                        }
                    },
                    value   : function (something) {
                        function getValue(something) {
                            if (something instanceof settings.classes.CALLER) {
                                return hooks.values.caller(something);
                            }
                            if (typeof something === 'function') {
                                return getValue(something());
                            }
                            return something;
                        };
                        if (something !== void 0) {
                            return getValue(something);
                        }
                        return '';
                    },
                    apply   : function (_hooks) {
                        var _hooks = _hooks !== void 0 ? _hooks : privates.hooks;
                        if (_hooks instanceof Array) {
                            _hooks.forEach(function (_, index) {
                                _hooks[index] = hooks.apply(_hooks[index]);
                            });
                        } else if (typeof _hooks === 'object' && _hooks !== null) {
                            _object(_hooks).forEach(function (hook_name, hook_value) {
                                _hooks[hook_name] = hooks.value(hook_value);
                            });
                        }
                        return _hooks;
                    }
                };
                render      = function (clone) {
                    var clone = typeof clone === 'boolean' ? clone : false;
                    if (!clone) {
                        patterns.reset();
                        patterns.find(privates.hooks);
                        source.init(
                            (function () {
                                var list = [];
                                _object(privates.patterns).forEach(function (url) {
                                    list.push(url);
                                });
                                return list;
                            }()),
                            function () {
                                hooks.apply();
                                privates.pattern        = instance.init(self.url);
                                if (privates.pattern !== null) {
                                    privates.pattern    = privates.pattern.build(privates.hooks, privates.resources, privates.conditions, privates.serialize);
                                    if (privates.pattern instanceof settings.classes.RESULT) {
                                        privates.pattern.mount(privates.node, privates.before, privates.after, privates.replace);
                                        if (privates.callbacks.success !== null) {
                                            privates.pattern.handle()(privates.callbacks.success, privates.resources);
                                        }
                                    }
                                } else {
                                    flex.logs.log(signature() + logs.caller.CANNOT_GET_PATTERN, flex.logs.types.CRITICAL);
                                    flex.system.handle(privates.callbacks.fail, self.url);
                                    throw logs.caller.CANNOT_GET_PATTERN;
                                }
                            },
                            function () {
                                flex.logs.log(signature() + logs.caller.CANNOT_INIT_PATTERN, flex.logs.types.CRITICAL);
                                flex.system.handle(privates.callbacks.fail, self.url);
                                throw logs.caller.CANNOT_INIT_PATTERN;
                            }
                        );
                    } else {
                        hooks.apply();
                        privates.pattern = instance.init(self.url);
                        if (privates.pattern !== null) {
                            privates.pattern = privates.pattern.build(privates.hooks, privates.resources, privates.conditions, privates.serialize);
                            if (privates.pattern instanceof settings.classes.RESULT) {
                                return privates.pattern;
                            }
                        }
                    }
                };
                signature   = function () {
                    return logs.SIGNATURE + ':: caller (' + self.url + ')';
                };
                returning   = {
                    render      : render,
                    hooks       : function () { return privates.hooks;      },
                    resources   : function () { return privates.resources;  },
                    conditions  : function () { return privates.conditions; },
                    serialize   : function () { return privates.serialize;  },
                };
                return {
                    render      : returning.render,
                    hooks       : returning.hooks,
                    conditions  : returning.conditions,
                    serialize   : returning.serialize,
                    resources   : returning.resources
                };
            },
            instance: function (parameters) {
                /// <summary>
                /// Load template; save it in virtual storage and local storage (if it's allowed)
                /// </summary>
                /// <param name="parameters" type="Object">Template parameters: &#13;&#10;
                /// {   [string]            url                     (source of template),                                               &#13;&#10;
                ///     [string || node]    node                    (target node for mount),                                            &#13;&#10;
                ///     [boolean]           replace                 (true - replace node by template; false - append template to node), &#13;&#10;
                ///     [object || array]   hooks                   (bind data),                                                        &#13;&#10;
                ///     [array]             data                    (bind data for collection),                                         &#13;&#10;
                ///     [object]            conditions              (conditions),                                                       &#13;&#10;
                ///     [object]            callbacks               (callbacks),                                                        &#13;&#10;
                ///     [object]            resources               (callbacks),                                                        &#13;&#10;
                ///     [boolean]           remove_missing_hooks    (remove missed bind data),                                          &#13;&#10;
                /// }</param>
                /// <returns type="boolean">true - success; false - fail</returns>
                if (flex.oop.objects.validate(parameters, [ { name: 'url',                  type: 'string'                                  },
                                                            { name: 'node',                 type: ['node', 'string'],   value: null         },
                                                            { name: 'before',               type: ['node', 'string'],   value: null         },
                                                            { name: 'after',                type: ['node', 'string'],   value: null         },
                                                            { name: 'id',                   type: 'string',             value: flex.unique()},
                                                            { name: 'replace',              type: 'boolean',            value: false        },
                                                            { name: 'hooks',                type: ['object', 'array'],  value: null         },
                                                            { name: 'data',                 type: 'array',              value: null         },
                                                            { name: 'conditions',           type: 'object',             value: null         },
                                                            { name: 'callbacks',            type: 'object',             value: {}           },
                                                            { name: 'resources',            type: 'object',             value: {}           },
                                                            { name: 'serialize',            type: 'boolean',            value: true         },
                                                            { name: 'remove_missing_hooks', type: 'boolean',            value: true         }]) !== false) {
                    flex.oop.objects.validate(parameters.callbacks, [   { name: 'before',   type: 'function', value: null },
                                                                        { name: 'success',  type: 'function', value: null },
                                                                        { name: 'fail',     type: 'function', value: null }]);
                    return _object({
                        parent          : settings.classes.CALLER,
                        constr          : function () {
                            this.url = flex.system.url.restore(parameters.url);
                        },
                        privates        : {
                            //From parameters
                            id                  : parameters.id,
                            node                : parameters.node   !== null ? (typeof parameters.node      === 'string' ? _nodes(parameters.node   ).target : [parameters.node]     ) : null,
                            before              : parameters.before !== null ? (typeof parameters.before    === 'string' ? _nodes(parameters.before ).target : [parameters.before]   ) : null,
                            after               : parameters.after  !== null ? (typeof parameters.after     === 'string' ? _nodes(parameters.after  ).target : [parameters.after]    ) : null,
                            replace             : parameters.replace,
                            hooks               : parameters.hooks,
                            data                : parameters.data,
                            conditions          : parameters.conditions,
                            callbacks           : parameters.callbacks,
                            serialize           : parameters.serialize,
                            remove_missing_hooks: parameters.remove_missing_hooks,
                            resources           : parameters.resources,
                            //Local
                            pattern             : null
                        },
                        prototype       : caller.proto
                    }).createInstanceClass();
                } else {
                    return null;
                }
            },
        };
        //END: caller class ===============================================
        layout      = {
            init    : function (is_auto){
                function isValid(pattern) {
                    var nodeName = pattern.parentNode.nodeName.toLowerCase();
                    if (nodeName !== config.values.PATTERN_NODE) {
                        if (nodeName !== 'body'){
                            return isValid(pattern.parentNode);
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                };
                var patterns    = _nodes(config.values.PATTERN_NODE).target,
                    is_auto     = typeof is_auto === 'boolean' ? is_auto : false;
                if (patterns !== null && patterns instanceof NodeList && patterns.length > 0) {
                    Array.prototype.forEach.call(patterns, function (pattern) {
                        if (isValid(pattern)) {
                            if ((!pattern.hasAttribute('success') && !pattern.hasAttribute('error')) || !is_auto) {
                                layout.caller(pattern);
                            }
                        }
                    });
                }
            },
            caller  : function (pattern, is_child) {
                function getIndex(source, hook) {
                    var index = -1;
                    try{
                        source.forEach(function(hooks, _index){
                            if (hooks[hook] === void 0){
                                index = _index;
                                throw 'found';
                            }
                        });
                    }catch(e){}
                    return index;
                };
                function getCallback(pattern, type) {
                    var callback = pattern.getAttribute(type),
                        parts       = null;
                    if (typeof callback === 'string' && callback !== '') {
                        parts       = callback.split('.');
                        callback    = window;
                        parts.forEach(function (part) {
                            if (callback !== null && callback[part] !== void 0) {
                                callback = callback[part];
                            } else {
                                callback = null;
                            }
                        });
                        return callback;
                    } else {
                        return null;
                    }
                };
                var _caller     = null,
                    is_child    = is_child !== void 0 ? is_child : false,
                    url         = null;
                if (pattern.hasAttribute('src')) {
                    _caller = {
                        url     : pattern.getAttribute('src'),
                        hooks   : {}
                    };
                    Array.prototype.forEach.call(pattern.children, function (child) {
                        var index   = 0,
                            hook    = child.nodeName.toLowerCase();
                        if (_caller.hooks[hook] !== void 0 && !(_caller.hooks instanceof Array)) {
                            _caller.hooks = [_caller.hooks];
                        }
                        if (_caller.hooks instanceof Array) {
                            index = getIndex(_caller.hooks, hook);
                            if (index === -1) {
                                _caller.hooks.push({});
                                index = _caller.hooks.length - 1;
                            }
                            if (!child.hasAttribute('src')) {
                                _caller.hooks[index][hook] = child.innerHTML;
                            } else {
                                _caller.hooks[index][hook] = layout.caller(child, true);
                            }
                        } else {
                            if (!child.hasAttribute('src')) {
                                _caller.hooks[hook] = child.innerHTML;
                            } else {
                                _caller.hooks[hook] = layout.caller(child, true);
                            }
                        }
                    });
                    if (typeof _caller.hooks === 'object' && Object.keys(_caller.hooks).length === 0) {
                        delete _caller.hooks;
                    }
                    if (!is_child) {
                        _caller.node        = pattern;
                        _caller.replace     = true;
                        _caller.callbacks   = {
                            success : getCallback(pattern, 'success'),
                            error   : getCallback(pattern, 'error'),
                        };
                        _caller = caller.instance(_caller).render();
                    } else {
                        _caller = caller.instance(_caller);
                    }
                }
                return _caller;
            },
            attach  : function () {
                if (document.readyState !== 'complete') {
                    flex.events.DOM.add(window, 'load', function () {
                        layout.init(true);
                    });
                } else {
                    layout.init(true);
                }
            }
        };
        controllers = {
            references  : {
                assign          : function (url, pattern_url) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.CONTROLLERS_LINKS, {});
                    if (storage[url] === void 0) {
                        storage[url] = pattern_url;
                    }
                },
                getPatternURL   : function (url) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.CONTROLLERS_LINKS, {});
                    return storage[url] !== void 0 ? storage[url] : null;
                }
            },
            storage     : {
                add : function (pattern_url, controller) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.CONTROLLERS_STORAGE, {});
                    if (storage[pattern_url] === void 0) {
                        storage[pattern_url] = [];
                    }
                    storage[pattern_url].push(controller);
                },
                get : function (pattern_url) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.CONTROLLERS_STORAGE, {});
                    return storage[pattern_url] !== void 0 ? storage[pattern_url] : null;
                },
            },
            current     : {
                data    : null,
                set     : function (url){
                    controllers.current.data = url;
                },
                get     : function () {
                    return controllers.current.data;
                },
                reset   : function () {
                    controllers.current.data = null;
                },
            },
            attach      : function (controller) {
                var url     = null,
                    _source = null;
                if (typeof controller === 'function') {
                    url = controllers.current.get() !== null ? controllers.current.get() : flex.resources.attach.js.getCurrentSRC();
                    if (url !== null) {
                        _source = controllers.references.getPatternURL(url);
                        controllers.storage.add(_source, controller);
                    }
                }
            },
        };
        storage     = {
            virtual: {
                add: function (url, content) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.VIRTUAL_STORAGE_ID, {});
                    if (storage !== null) {
                        if (storage[url] === void 0) {
                            storage[url] = content;
                            return true;
                        }
                    }
                },
                get: function (url) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.VIRTUAL_STORAGE_ID, {});
                    if (storage !== null) {
                        return (storage[url] !== void 0 ? storage[url] : null);
                    }
                    return null;
                }
            },
            local: {
                add: function (url, content) {
                    if (settings.storage.USE_LOCALSTORAGE === true) {
                        return flex.localStorage.addJSON(url, {
                            html: content,
                            hash: flex.hashes.get(url)
                        });
                    }
                    return false;
                },
                get: function (url) {
                    var target = null;
                    if (settings.storage.USE_LOCALSTORAGE === true) {
                        flex.hashes.update(url);
                        target = flex.localStorage.getJSON(url);
                        if (target !== null) {
                            if (target.hash === flex.hashes.get(url)) {
                                return target.html;
                            }
                        }
                    }
                    return null;
                }
            },
            add: function (url, content) {
                storage.local.  add(url, content);
                storage.virtual.add(url, content);
            },
            get: function (url) {
                var result = storage.virtual.get(url);
                if (result === null) {
                    result = storage.local.get(url);
                }
                return result;
            }
        };
        measuring   = {
            measure: (function () {
                var storage = {};
                return function (id, operation) {
                    if (settings.measuring.MEASURE) {
                        var id = id === void 0 ? flex.unique() : id;
                        if (storage[id] === void 0) {
                            storage[id] = performance.now();
                        } else {
                            flex.logs.log(logs.SIGNATURE + 'Operation [' + operation + '] was taken ' + (performance.now() - storage[id]).toFixed(4) + 'ms.', flex.logs.types.NOTIFICATION);
                            delete storage[id];
                        }
                        return id;
                    }
                };
            }())
        };
        conditions  = {
            storage     : {
                add: function (pattern_url, _conditions) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.CONDITIONS_STORAGE, {});
                    storage[pattern_url] = _conditions;
                },
                get : function (pattern_url) {
                    var storage = flex.overhead.globaly.get(settings.storage.VIRTUAL_STORAGE_GROUP, settings.storage.CONDITIONS_STORAGE, {});
                    return storage[pattern_url] !== void 0 ? storage[pattern_url] : null;
                },
            },
            attach: function (_conditions) {
                var url     = null,
                    _source = null;
                if (typeof _conditions === 'object' && _conditions !== null) {
                    url = controllers.current.get() !== null ? controllers.current.get() : flex.resources.attach.js.getCurrentSRC();
                    if (url !== null) {
                        _source = controllers.references.getPatternURL(url);
                        conditions.storage.add(_source, _conditions);
                    }
                }
            }
        };
        helpers     = {
            testReg : function(reg, str){
                reg.lastIndex = 0;
                return reg.test(str);
            },
            binds   : {
                data        : {
                    value: [
                        //Group #1
                        {
                            nodes   : ['input', 'textarea'],
                            event   : 'change',
                            getter  : function () { return this.value; },
                            setter  : function (value) { this.value = value; }
                        }
                    ],
                },
                assing      : function (node, prop_name, handle) {
                    var node_name   = node.nodeName.toLowerCase(),
                        group       = null;
                    if (helpers.binds.data[prop_name] !== void 0) {
                        helpers.binds.data[prop_name].forEach(function (_group) {
                            if (_group.nodes.indexOf(node_name) !== -1) {
                                group = _group;
                            }
                        });
                        if (group !== null) {
                            (function (event, node, getter, setter, handle) {
                                _node(node).events().add(event, function (event) {
                                    handle.call(node, event, getter, setter);
                                });
                            }(group.event, node, group.getter.bind(node), group.setter.bind(node), handle));
                        }
                    }
                    return false;
                },
                isPossible  : function (node, prop_name) {
                    var node_name = node.nodeName.toLowerCase();
                    if (helpers.binds.data[prop_name] !== void 0) {
                        try{
                            helpers.binds.data[prop_name].forEach(function (_group) {
                                if (_group.nodes.indexOf(node_name) !== -1) {
                                    throw 'found';
                                }
                            });
                        } catch (e) {
                            return e === 'found' ? true : false;
                        }
                    }
                    return false;
                }
            },
            isNode  : function (something) {
                if (something !== void 0 && something.nodeName !== void 0 && something.parentNode !== void 0 && something.nodeType !== void 0) {
                    return true;
                } else {
                    return false;
                }
            },
            tableFix: function (html) {
                var tables  = html.match(settings.regs.TABLE),
                    hooks   = [];
                if (tables instanceof Array) {
                    tables.forEach(function (table) {
                        var _hooks  = null;
                        table       = table.replace(settings.regs.TABLE_TAG, '').replace(settings.regs.ANY_TAG, '');
                        _hooks      = table.match(settings.regs.HOOK);
                        if (_hooks instanceof Array) {
                            hooks = hooks.concat(_hooks);
                        }
                    });
                    hooks.forEach(function (hook) {
                        var _hook = hook.replace(settings.regs.HOOK_BORDERS, '');
                        html = html.replace(new RegExp(settings.regs.HOOK_OPEN + _hook + settings.regs.HOOK_CLOSE, 'gi'), '<!--' + hook + '-->');
                    });
                }
                return html;
            }
        };
        callers     = {
            init    : function () {
                flex.callers.define.node('ui.patterns.append', function (parameters) {
                    if (typeof parameters === 'object' && this.target) {
                        parameters.node = this.target;
                    }
                    return caller.instance(parameters);
                });
                flex.callers.define.nodes('ui.patterns.append', function () {
                    var result = [];
                    Array.prototype.forEach.call(this.target, function (target) {
                        if (typeof parameters === 'object' && this.target) {
                            parameters.node = this.target;
                        }
                        result.push(caller.instance(parameters));
                    });
                    return result;
                });
            }
        };
        //Init addition classes
        instance.nodeList.init();
        instance.map.init();
        //Init modules
        if (flex.libraries !== void 0) {
            if (flex.libraries.events !== void 0 && flex.libraries.binds !== void 0) {
                flex.libraries.events.create();
                flex.libraries.binds.create();
            }
        }
        //Private part
        privates    = {
            preload     : source.init,
            get         : caller.instance,
            controller  : {
                attach  : controllers.attach
            },
            conditions  : {
                attach  : conditions.attach
            },
            classes     : {
                NODE_LIST: {
                    addMethod : instance.nodeList.addMethod
                }
            },
            setup       : config.setup,
            debug       : config.debug,
            layout      : layout.init
        };
        //Global callers
        callers.init();
        window['_controller'] = privates.controller.attach;
        window['_conditions'] = privates.conditions.attach;
        //Run layout parser
        layout.attach();
        //Public part
        return {
            preload : privates.preload,
            get     : privates.get,
            classes : {
                NODE_LIST: {
                    addMethod: privates.classes.NODE_LIST.addMethod
                }
            },
            setup   : privates.setup,
            debug   : privates.debug,
            layout  : privates.layout
        };
    };
    //=== Events module ===
    Events.prototype        = function () {
        var instance    = null,
            DOM         = null,
            callers     = null,
            privates    = null;
        DOM         = function () {
            if (instance === null) {
                instance            = function () { };
                instance.prototype  = (function () {
                    var tools       = null,
                        touches     = null,
                        storage     = null,
                        settings    = {
                            STORAGE_NAME                : 'FlexEventsStorage',
                            HANDLE_EVENT_ID_PROPERTY    : 'FlexEventIDProrerty'
                        },
                        Handle      = null,
                        privates    = null;
                    //Handle class
                    Handle              = function (id, handle, once, touch) {
                        this.id             = id;
                        this.handle         = handle;
                        this.once           = once;
                        this.touch          = touch;
                        this.remove         = false;
                        this.interaction    = null;
                        this.working        = false;
                        this.device         = null;
                    };
                    Handle.prototype    = {
                        id          : null,
                        once        : null,
                        touch       : null,
                        remove      : null,
                        handle      : null,
                        interaction : null,
                        working     : null,
                        device      : null,
                        launch      : function (context, event) {
                            if (this.remove === false && this.isDouble(event) === false) {
                                try {
                                    this.working    = true;
                                    this.remove     = this.once;
                                    return this.handle.call(context, event);
                                } catch (e) {
                                    this.error(event, e);
                                    return null;
                                } finally {
                                    this.working = false;
                                    if (this.once === true && this.remove === false) {
                                        flex.logs.log(
                                            'Unexpected behavior DOM.fire. Flag [once] is true, but [remove] is false; \n\r ' +
                                            '>event id' + this.id,
                                            flex.logs.types.WARNING
                                        );
                                    }
                                }
                            }
                            return null;
                        },
                        isWorking   : function(){
                            return this.working;
                        },
                        isRemoving  : function(){
                            return this.remove;
                        },
                        toRemove    : function(){
                            this.remove = true;
                        },
                        error       : function (event, e) {
                            flex.logs.log(
                                "event: " + event.type + "; ID: " + this.id + "; generated error: \r\n" + flex.logs.parseError(e),
                                flex.logs.types.WARNING
                            );
                        },
                        isDouble   : function (event) {
                            var device = '';
                            if (event.flex.singleTouch) {
                                device = 'touch';
                            } else {
                                device = 'mouse';
                            }
                            this.device = (this.device === null ? device : this.device);
                            return this.device === device ? false : true;
                        }
                    };
                    //Methods
                    function add(parameters) {
                        /// <summary>
                        /// Attach to element event handle
                        /// </summary>
                        /// <param name="parameters" type="Object">Events parameters:               &#13;&#10;
                        /// {   [node]      element,                                                &#13;&#10;
                        ///     [string]    name,                                                   &#13;&#10;
                        ///     [function]  handle,                                                 &#13;&#10;
                        ///     [string]    id     (optional),                                      &#13;&#10;
                        ///     [boolean]   once   (optional) -> true - remove after handle will be once used}</param>
                        ///     [boolean]   touch  (optional) -> true - try find analog of touch event and attach it}</param>
                        /// <returns type="boolean">true if success and false if fail</returns>
                        function validate(parameters) {
                            parameters.element  = parameters.element        !== void 0      ? parameters.element    : null;
                            parameters.name     = typeof parameters.name    === 'string'    ? parameters.name       : null;
                            parameters.handle   = typeof parameters.handle  === 'function'  ? parameters.handle     : null;
                            parameters.id       = typeof parameters.id      === 'string'    ? parameters.id         : flex.unique();
                            parameters.once     = typeof parameters.once    === 'boolean'   ? parameters.once       : false;
                            parameters.touch    = typeof parameters.touch   === 'boolean'   ? parameters.touch      : true;
                            //Prevent double attaching for touch events
                            if (touches.has(parameters.name) === false) {
                                parameters.touch = false;
                            }
                            return parameters;
                        };
                        var parameters  = validate(parameters),
                            handles     = null;
                        if (parameters.element !== null && parameters.handle !== null && parameters.name !== null) {
                            handles = storage.get(parameters.element, false);
                            if (handles !== null) {
                                handles = tools.buildCommonHandle(parameters.element, parameters.name, handles, parameters.touch);
                                if (handles instanceof Array) {
                                    handles.push(
                                        new Handle(parameters.id, parameters.handle, parameters.once, parameters.touch)
                                    );
                                    return parameters.id;
                                }
                            }
                        }
                        return null;
                    };
                    function fire(element, event, element_id, original_type) {
                        /// <summary>
                        /// Common handle of events
                        /// </summary>
                        /// <param name="element" type="node"       >Element        </param>
                        /// <param name="event" type="string"       >Event name     </param>
                        /// <param name="element_id" type="string"  >ID of event    </param>
                        /// <returns type="boolean">true if success and false if fail</returns>
                        var event               = event !== void 0 ? event : tools.fixEvent(),
                            handles_storage     = storage.get(this, true),
                            handles             = null,
                            interaction         = flex.unique(),
                            isPrevent           = null,
                            self                = this,
                            needRemoveChecking  = false,
                            event_type          = (event.type !== original_type ? original_type : event.type);
                        if (event && element && element_id && handles_storage !== null) {
                            event = tools.unificationEvent(event);
                            if (handles_storage[event_type]) {
                                handles_storage = handles_storage[event_type];
                                if (handles_storage.element_id === element_id) {
                                    handles = handles_storage.handles;
                                    try {
                                        Array.prototype.forEach.call(
                                            handles,
                                            function (handle) {
                                                if (handle.interaction !== interaction) {
                                                    handle.interaction  = interaction;
                                                    isPrevent           = handle.launch(self, event);
                                                    needRemoveChecking  = needRemoveChecking === true ? true : (handle.isRemoving() === false ? false : true);
                                                    if (isPrevent === false) {//It's correct. Here false means prevent other handles
                                                        event.flex.stop();
                                                        flex.logs.log(
                                                            'Break event in DOM.fire; \n\r ' +
                                                            '>event: '      + event.type    + '\n\r ' +
                                                            '>handle_id'    + handle.id     + '\n\r ' +
                                                            '>element_id'   + element_id,
                                                            flex.logs.types.WARNING
                                                        );
                                                        throw 'prevent';
                                                    }
                                                } else {
                                                    flex.logs.log(
                                                        'Unexpected behavior of handle event in DOM.fire. Attempt to call handle twice. \n\r ' +
                                                        '>event: '      + event.type    + '\n\r ' +
                                                        '>handle_id'    + handle.id     + '\n\r ' +
                                                        '>element_id'   + element_id,
                                                        flex.logs.types.LOGICAL
                                                    );
                                                }
                                            }
                                        );
                                    } catch (e) {
                                        if (e !== 'prevent') {
                                            flex.logs.log(
                                                'Unexpected error in DOM.fire; \n\r ' +
                                                '>event: '      + event.type + '\n\r ' +
                                                '>element_id'   + element_id,
                                                flex.logs.types.CRITICAL
                                            );
                                        }
                                    } finally {
                                        if (needRemoveChecking !== false) {
                                            //Remove all handles, which should be removed
                                            handles_storage.handles = handles.filter(
                                                function (handle) {
                                                    if (handle.isWorking() === false && handle.isRemoving() !== false) {
                                                        return false;
                                                    } else {
                                                        return true;
                                                    }
                                                }
                                            );
                                            if (handles_storage.handles.length === 0) {
                                                tools.destroyCommonHandle(element, event_type);
                                                storage.clear(element);
                                            }
                                        }
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    };
                    function remove(parameters) {
                        /// <summary>
                        /// Attach to element event handle
                        /// </summary>
                        /// <param name="parameters" type="Object">Events parameters:               &#13;&#10;
                        /// {   [node]      element,                                                &#13;&#10;
                        ///     [string]    name,                                                   &#13;&#10;
                        ///     [function]  handle,                                                 &#13;&#10;
                        ///     [string]    id     (optional) }</param>
                        /// <returns type="boolean">true if success and false if fail</returns>
                        function getIDByHandle(handle) {
                            return handle[settings.HANDLE_EVENT_ID_PROPERTY] !== void 0 ? handle[settings.HANDLE_EVENT_ID_PROPERTY] : null;
                        };
                        function validate(parameters) {
                            parameters.element  = parameters.element        !== void 0      ? parameters.element    : null;
                            parameters.name     = typeof parameters.name    === 'string'    ? parameters.name       : null;
                            parameters.handle   = typeof parameters.handle  === 'function'  ? parameters.handle     : null;
                            parameters.id       = typeof parameters.id      === 'string'    ? parameters.id         : getIDByHandle(parameters.handle);
                            return parameters;
                        };
                        var parameters      = validate(parameters),
                            handles_storage = null,
                            handles         = null;
                        if (parameters.element !== null && parameters.name !== null) {
                            if (parameters.id === null && parameters.handle !== null) {
                                if (parameters.handle[settings.HANDLE_EVENT_ID_PROPERTY] !== void 0) {
                                    parameters.id = parameters.handle[settings.HANDLE_EVENT_ID_PROPERTY];
                                }
                            }
                            if (parameters.id !== null) {
                                handles_storage = storage.get(parameters.element, true);
                                if (typeof handles_storage[parameters.name] === 'object') {
                                    handles_storage = handles_storage[parameters.name];
                                    handles         = handles_storage.handles;
                                    try {
                                        Array.prototype.forEach.call(
                                            handles,
                                            function (handle) {
                                                if (handle.id === parameters.id) {
                                                    handle.toRemove();
                                                    throw 'handle found';
                                                }
                                            }
                                        );
                                    } catch (e) {
                                        if (e !== 'handle found') {
                                            flex.logs.log(
                                                'Unexpected error in DOM.remove; \n\r ' +
                                                '>event: ' + parameters.name + '\n\r ' +
                                                '>event_id' + parameters.id,
                                                flex.logs.types.CRITICAL
                                            );
                                        }
                                    } finally {
                                        handles = handles.filter(
                                            function (handle) {
                                                if (handle.isWorking() === false && handle.isRemoving() !== false) {
                                                    return false;
                                                } else {
                                                    return true;
                                                }
                                            }
                                        );
                                        if (handles.length === 0) {
                                            tools.destroyCommonHandle(parameters.element, parameters.name);
                                            storage.clear(parameters.element);
                                        }
                                    }
                                }
                            }
                        }
                    };
                    function clear(element, event, fire) {
                        /// <summary>
                        /// Remove all handles of event's type
                        /// </summary>
                        /// <param name="element"   type="node"     >target element</param>
                        /// <param name="type"      type="string"   >event type</param>
                        /// <param name="fire"      type="boolean"  >fire all handles before remove</param>
                        /// <returns type="boolean">true if success and false if fail</returns>
                        var handles_storage = null,
                            handles         = null,
                            fire            = typeof fire === 'boolean' ? fire : false;
                        if (element && event) {
                            handles_storage = storage.get(element, true);
                            if (handles_storage !== null) {
                                if (typeof handles_storage[event] === 'object') {
                                    handles_storage = handles_storage[event];
                                    if (fire !== false) {
                                        try {
                                            Array.prototype.forEach.call(
                                                handles_storage.handles,
                                                function (handle) {
                                                    flex.logs.log(
                                                        'Event fired in DOM.clear.fire; \n\r' +
                                                        '>event: '      + event + '\n\r'+
                                                        '>handle_id: '  + handle.id,
                                                        flex.logs.types.NOTIFICATION
                                                    );
                                                    if (handle.launch(element, null) === false) {
                                                        throw 'prevent';
                                                    }
                                                }
                                            );
                                        } catch (e) {
                                            if (e === 'prevent') {
                                                flex.logs.log(
                                                    'Break event in DOM.clear.fire; \n\r ' +
                                                    '>event: ' + event,
                                                    flex.logs.types.WARNING
                                                );
                                            } else {
                                                flex.logs.log(
                                                    'Fatal error event in DOM.clear.fire; \n\r ' +
                                                    '>event: ' + event,
                                                    flex.logs.types.WARNING
                                                );
                                            }
                                        }
                                    }
                                    handles_storage.handles = [];
                                    tools.destroyCommonHandle(element, event);
                                    storage.clear(element);
                                    return true;
                                }
                            }
                            return false;
                        }
                        return null;
                    };
                    function call(element, name) {
                        /// <summary>
                        /// Emulate (call) event on some node
                        /// </summary>
                        /// <param name="element" type="Object" >Node           </param>
                        /// <param name="name" type="string"    >Type of event  </param>
                        /// <returns type="Object">returns node in success or throw new syntax error in fail</returns>
                        function extend(destination, source) {
                            for (var property in source)
                                destination[property] = source[property];
                            return destination;
                        }
                        var oEvent          = null,
                            eventType       = null,
                            evt             = null,
                            eventMatchers   = {
                                'HTMLEvents'    : /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
                                'MouseEvents'   : /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
                            },
                            defaultOptions  = {
                                type            : name,
                                canBubble       : true,
                                cancelable      : true,
                                view            : element.ownerDocument.defaultView,
                                detail          : 1,
                                screenX         : 0,
                                screenY         : 0,
                                clientX         : 0,
                                clientY         : 0,
                                pointerX        : 0,
                                pointerY        : 0,
                                ctrlKey         : false,
                                altKey          : false,
                                shiftKey        : false,
                                metaKey         : false,
                                button          : 0,
                                relatedTarget   : null
                            },
                            options = extend(defaultOptions, arguments[2] || {});
                        for (var name in eventMatchers) {
                            if (eventMatchers[name].test(name)) { eventType = name; break; }
                        }
                        if (!eventType) {
                            throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');
                        }
                        if (document.createEvent) {
                            oEvent = document.createEvent(eventType);
                            if (eventType == 'HTMLEvents') {
                                oEvent.initEvent(name, options.bubbles, options.cancelable);
                            } else {
                                oEvent.initMouseEvent(
                                    options.type,       options.canBubble,  options.cancelable, options.view,
                                    options.detail,     options.screenX,    options.screenY,    options.clientX,
                                    options.clientY,    options.ctrlKey,    options.altKey,     options.shiftKey,
                                    options.metaKey,    options.button,     options.relatedTarget
                                );
                            }
                            element.dispatchEvent(oEvent);
                        } else {
                            options.clientX = options.pointerX;
                            options.clientY = options.pointerY;
                            evt             = document.createEventObject();
                            oEvent          = extend(evt, options);
                            element.fireEvent('on' + name, oEvent);
                        }
                        return element;
                    };
                    storage = {
                        get     : function (element, only_get) {
                            /// <summary>
                            /// Get virtual storage from element
                            /// </summary>
                            /// <param name="element"   type="node"     >Element</param>
                            /// <param name="only_get"  type="boolean"  >false - create, if doesn't exist; true - only get</param>
                            /// <returns type="object">virtual storage</returns>
                            var only_get = (typeof only_get === "boolean" ? only_get : true),
                                storage     = null;
                            if (element) {
                                storage = flex.overhead.objecty.get(element, settings.STORAGE_NAME);
                                if (storage === null && only_get === false) {
                                    storage = flex.overhead.objecty.set(element, settings.STORAGE_NAME, {});
                                }
                                return storage;
                            }
                            return null;
                        },
                        clear   : function (element) {
                                /// <summary>
                                /// Try to clear virtual storage from element (only if storage is empty)
                                /// </summary>
                                /// <param name="element"   type="node"     >Element</param>
                                /// <returns type="object">true - if removed; false - if not.</returns>
                            var handles = storage.get(element, true);
                            if (handles !== null) {
                                if (Object.keys(handles).length === 0) {
                                    flex.overhead.objecty.del(element, settings.STORAGE_NAME);
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                            return false;
                        }
                    };
                    tools = {
                        buildCommonHandle   : function (element, type, storage, touch) {
                            /// <summary>
                            /// Build common handle for element for defined event
                            /// </summary>
                            /// <param name="element"   type="node"     >Element</param>
                            /// <param name="type"      type="string"   >Event name</param>
                            /// <param name="storage"   type="object"   >Virtual storage of element</param>
                            /// <returns type="object">collection of handles</returns>
                            var element_id = flex.unique();
                            if (typeof storage[type] !== "object") {
                                storage[type] = {
                                    globalHandle    : function (event) {
                                        return fire.call(element, element, event, element_id, type);
                                    },
                                    element_id      : element_id,
                                    handles         : []
                                };
                                if (flex.events.DOM.add(element, type, storage[type].globalHandle) === false) {
                                    return null;
                                }
                                if (touch !== false) {
                                    if (touches.has(type) !== false) {
                                        flex.events.DOM.add(element, touches.getType(type), storage[type].globalHandle);
                                    }
                                }
                            }
                            return storage[type].handles;
                        },
                        destroyCommonHandle : function (element, type) {
                            /// <summary>
                            /// Destroy common handle for element for defined event
                            /// </summary>
                            /// <param name="element"   type="node"     >Element</param>
                            /// <param name="type"      type="string"   >Event name</param>
                            /// <returns type="object">true - if removed; false - if not.</returns>
                            var handles_storage = null;
                            if (element && type) {
                                handles_storage = storage.get(element, true);
                                if (typeof handles_storage[type] === 'object') {
                                    flex.events.DOM.remove(element, type, handles_storage[type].globalHandle);
                                    if (touches.has(type) !== false) {
                                        flex.events.DOM.remove(element, touches.getType(type), handles_storage[type].globalHandle);
                                    }
                                    handles_storage[type] = null;
                                    delete handles_storage[type];
                                    return true;
                                }
                            }
                            return null;
                        },
                        fixEvent            : function() {
                            /// <summary>
                            /// Fix IE bug with event object
                            /// </summary>
                            /// <returns type="void">void</returns>
                            if (!event) {
                                if (window.event) {
                                    return window.event;
                                }
                            }
                            return null;
                        },
                        unificationEvent    : function (event) {
                            /// <summary>
                            /// Unification of event object
                            /// </summary>
                            /// <param name="event" type="event">Event object</param>
                            /// <returns type="event">Event object</returns>
                            function addContainer(event) {
                                event.flex = {};
                                return event;
                            };
                            function getCoordinates(event, source) {
                                if (source.clientX !== void 0) {
                                    if (source.pageX === void 0) {
                                        event.flex.pageX = null;
                                        event.flex.pageY = null;
                                    }
                                    if (source.pageX === null && source.clientX !== null) {
                                        var DocumentLink    = document.documentElement,
                                            BodyLink        = document.body;
                                        event.flex.pageX = source.clientX + (DocumentLink && DocumentLink.scrollLeft || BodyLink && BodyLink.scrollLeft || 0) - (DocumentLink.clientLeft || 0);
                                        event.flex.pageY = source.clientY + (DocumentLink && DocumentLink.scrollTop || BodyLink && BodyLink.scrollTop || 0) - (DocumentLink.clientTop || 0);
                                    } else {
                                        event.flex.pageX = source.pageX;
                                        event.flex.pageY = source.pageY;
                                    }
                                } else {
                                    event.flex.pageX = null;
                                    event.flex.pageY = null;
                                }
                                event.flex.clientX = (source.clientX !== void 0 ? source.clientX : null);
                                event.flex.clientY = (source.clientY !== void 0 ? source.clientY : null);
                                event.flex.offsetX = (source.offsetX !== void 0 ? source.offsetX : (source.layerX !== void 0 ? source.layerX : null));
                                event.flex.offsetY = (source.offsetY !== void 0 ? source.offsetY : (source.layerY !== void 0 ? source.layerY : null));
                                return event;
                            };
                            function unificationStop(event) {
                                if (event.preventDefault === void 0) {
                                    event.preventDefault = function () { try { this.returnValue = false; } catch (e) { } };
                                }
                                if (event.stopPropagation === void 0) {
                                    event.stopPropagation = function () { try { this.cancelBubble = true; } catch (e) { } };
                                }
                                event.flex.stop = function () {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    return false;
                                };
                                return event;
                            };
                            function unificationTarget(event) {
                                if (event.target === void 0) {
                                    if (event.srcElement !== void 0) {
                                        event.target = event.srcElement;
                                    } else {
                                        event.target = null;
                                    }
                                }
                                if (event.target !== null) {
                                    if (event.relatedTarget === void 0) {
                                        if (event.fromElement !== void 0) {
                                            if (event.fromElement === event.target) {
                                                event.relatedTarget = event.toElement;
                                            } else {
                                                event.relatedTarget = event.fromElement;
                                            }
                                        } else {
                                            event.relatedTarget = null;
                                            event.fromElement   = null;
                                        }
                                    }
                                }
                                event.flex.target = event.target;
                                return event;
                            };
                            function unificationCoordinate(event) {
                                return getCoordinates(event, event);
                            };
                            function unificationButtons(event) {
                                if (event.which === void 0 && event.button !== void 0) {
                                    event.flex.which    = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)));
                                    event.flex.button   = event.button;
                                }
                                return event;
                            };
                            function unificationTouches(event) {
                                if (typeof event.touches === "object") {
                                    if (event.touches.length === 1) {
                                        event                   = getCoordinates(event, event.touches[0]);
                                        event.flex.target       = event.touches[0].target;
                                        event.flex.singleTouch  = true;
                                    }
                                    event.flex.touches = event.touches;
                                }
                                return event;
                            };
                            if (event.flex === void 0) {
                                event = addContainer            (event);
                                event = unificationStop         (event);
                                event = unificationTarget       (event);
                                event = unificationCoordinate   (event);
                                event = unificationButtons      (event);
                                event = unificationTouches      (event);
                            }
                            return event;
                        }
                    };
                    touches = {
                        events          : {
                            click       : { touch: 'touchstart' },
                            dblclick    : { touch: 'touchstart' },
                            mousedown   : { touch: 'touchstart' },
                            mouseenter  : { touch: 'touchenter' },
                            mouseleave  : { touch: 'touchleave' },
                            mousemove   : { touch: 'touchmove' },
                            mouseover   : { touch: '' },
                            mouseout    : { touch: '' },
                            mouseup     : { touch: 'touchend' },
                        },
                        has             : function (type) {
                            for (var key in touches.events) {
                                if (key === type || 'on' + key === type) {
                                    return true;
                                }
                            }
                            return false;
                        },
                        getType         : function (type) {
                            for (var key in touches.events) {
                                if (key === type || 'on' + key === type) {
                                    return touches.events[key].touch;
                                }
                            }
                            return null;
                        },
                        getOriginalType : function (type) {
                            type = type.toLowerCase();
                            for (var key in touches.events) {
                                if (touches.events[key].touch === type) {
                                    return key;
                                }
                            }
                            return null;
                        }
                    };
                    privates = {
                        _add    : add,
                        _remove : remove,
                        add     : function (element, type, handle, id, touch) {
                            return add({
                                element : element,
                                name    : type,
                                handle  : handle,
                                id      : id,
                                touch   : touch
                            });
                        },
                        remove  : function (element, type, handle, id) {
                            return remove({
                                element : element,
                                name    : type,
                                handle  : handle,
                                id      : id,
                            });
                        },
                        call    : call,
                        clear   : clear,
                        unify   : tools.unificationEvent
                    };
                    return {
                        add             : privates.add,
                        remove          : privates.remove,
                        clear           : privates.clear,
                        call            : privates.call,
                        unify           : privates.unify,
                        extendedAdd     : privates._add,
                        extendedRemove  : privates._remove,
                    };
                }());
                instance            = new instance();
            }
            return instance;
        };
        callers     = {
            init: function () {
                //_node
                flex.callers.define.node('events.add',      function (type, handle, id, touch) {
                    return DOM().add(this.target, type, handle, id, touch);
                });
                flex.callers.define.node('events.remove',   function (type, handle, id) {
                    return DOM().remove(this.target, type, handle, id);
                });
                flex.callers.define.node('events.call',     function (type) {
                    return DOM().call(this.target, type);
                });
                //_nodes
                flex.callers.define.nodes('events.add',     function (type, handle, id, touch) {
                    Array.prototype.forEach.call(this.target, function (target) {
                        DOM().add(target, type, handle, id, touch);
                    });
                });
                flex.callers.define.nodes('events.remove',  function (type, handle, id) {
                    Array.prototype.forEach.call(this.target, function (target) {
                        DOM().remove(target, type, handle, id);
                    });
                });
                flex.callers.define.nodes('events.call',    function (type) {
                    Array.prototype.forEach.call(this.target, function (target) {
                        DOM().call(target, type);
                    });
                });
            }
        };
        //Initialization of callers
        callers.init();
        //Public part
        privates    = {
            DOMEvents: DOM,
        };
        return {
            DOMEvents: privates.DOMEvents
        };
    };
    //=== Binds module ===
    Binds.prototype         = function () {
        var objects         = null,
            attrs           = null,
            props           = null,
            mutationCross   = null,
            privates        = null,
            callers         = null,
            settings        = null,
            errors          = null,
            support         = null;
        settings        = {
            objects : {
                STORAGE_PROPERTY    : 'flex.object.bind.storage',
                HANDLE_ID_PROPERTY  : 'flex.object.bind.handle.id'
            },
            attrs   : {
                STORAGE_PROPERTY    : 'flex.attrs.bind.storage',
                HANDLE_ID_PROPERTY  : 'flex.attrs.bind.handle.id'
            },
            props: {
                STORAGE_PROPERTY    : 'flex.props.bind.storage',
                HANDLE_ID_PROPERTY  : 'flex.props.bind.handle.id'
            },
        };
        errors          = {
            objects: {
                INCORRECT_ARGUMENTS : 'defined incorrect arguments or not defined at all',
                PROPERTY_IS_CONST   : 'cannot kill bind with property, because property now is constant'
            },
            support: {
                DEFINE_PROPERTY     : 'flex.binds: Current browser does not support Object.defineProperty',
                MUTATION_SCANNING   : 'flex.attrs: Current browser does not support any avaliable way to scanning mutation of attributes',
            }
        };
        //Binding properies of objects
        objects         = {
            storage : {
                create : function (object) {
                    var Storage = function (object) {
                            this.parent     = object;
                            this.binds      = {};
                        };
                    Storage.prototype = {
                        make            : function (property, value) {
                            var self = this;
                            if (!this.binds[property]) {
                                this.binds[property] = {
                                    current     : value,
                                    previous    : value,
                                    setter      : function (value) { 
                                        self.binds[property].previous   = self.binds[property].current;
                                        self.binds[property].current    = value;
                                        for (var id in self.binds[property].handles) {
                                            self.binds[property].handles[id].call(self.parent, self.binds[property].current, self.binds[property].previous, id);
                                        }
                                    },
                                    getter      : function () {
                                        return self.binds[property].current;
                                    },
                                    handles     : {}
                                };
                                return true;
                            }
                            return false;
                        },
                        add             : function (property, handle) {
                            var handleID = flex.unique();
                            //Save handle ID in handle
                            handle[settings.objects.HANDLE_ID_PROPERTY] = handleID;
                            //Add handle in storage
                            this.binds[property].handles[handleID]      = handle;
                            //Return handle ID
                            return handleID;
                        },
                        remove          : function (property, id) {
                            if (this.binds[property]) {
                                if (this.binds[property].handles[id]) {
                                    delete this.binds[property].handles[id];
                                    if (Object.keys(this.binds[property].handles).length === 0) {
                                        return delete this.binds[property];
                                    }
                                }
                            }
                            return null;
                        },
                        kill            : function (property) {
                            if (this.binds[property]) {
                                return delete this.binds[property];
                            }
                            return null;
                        },
                        isPropertyReady : function (property){
                            return this.binds[property] !== void 0 ? true : false;
                        },
                        destroy         : function (){
                            if (Object.keys(this.binds).length === 0) {
                                return delete this.parent[settings.objects.STORAGE_PROPERTY];
                            }
                            return false;
                        },
                        setter          : function (property) {
                            return this.binds[property].setter;
                        },
                        getter          : function (property) {
                            return this.binds[property].getter;
                        }
                    };
                    return new Storage(object);
                }
            },
            bind    : function (object, property, handle) {
                /// <signature>
                ///     <summary>Bind handle to property of object</summary>
                ///     <param name="object"    type="OBJECT"   >Parent object</param>
                ///     <param name="property"  type="STRING"   >Property</param>
                ///     <param name="handle"    type="FUNCTION" >Handle of property changing</param>
                ///     <returns type="STRING"/>
                /// </signature>
                var storage = settings.objects.STORAGE_PROPERTY,
                    value   = null;
                if (Object.defineProperty) {
                    if (typeof object === 'object' && typeof property === 'string' && typeof handle === 'function') {
                        value = object[property];
                        if (!object[storage]) {
                            //Object isn't listening
                            object[storage] = objects.storage.create(object);
                        }
                        storage = object[storage];
                        //Prepare property if needed
                        if (!storage.isPropertyReady(property)) {
                            //First handle for property
                            if (delete object[property]) {
                                //Prepare property storage
                                storage.make(property, value);
                                //Bind
                                Object.defineProperty(object, property, {
                                    get         : storage.getter(property),
                                    set         : storage.setter(property),
                                    configurable: true
                                });
                            } else {
                                storage.destroy();
                                return false;
                            }
                        }
                        //Add handle
                        return storage.add(property, handle);
                    }
                    throw 'object.bind::' + errors.objects.INCORRECT_ARGUMENTS;
                }
            },
            unbind  : function (object, property, id) {
                /// <signature>
                ///     <summary>Unbind handle to property of object by handle's ID</summary>
                ///     <param name="object"    type="OBJECT">Parent object</param>
                ///     <param name="property"  type="STRING">Property</param>
                ///     <param name="id"        type="STRING">ID of handle</param>
                ///     <returns type="BOOLEAN"/>
                /// </signature>
                var storage = settings.objects.STORAGE_PROPERTY,
                    value   = null;
                if (typeof object === 'object' && typeof property === 'string' && typeof id === 'string') {
                    if (object[storage]) {
                        storage = object[storage];
                        if (storage.isPropertyReady(property)) {
                            value = object[property];
                            storage.remove(property, id);
                            if (!storage.isPropertyReady(property)) {
                                try {
                                    delete object[property];
                                    object[property] = value;
                                    return true;
                                } catch (e) {
                                    throw 'object.unbind::' + errors.objects.PROPERTY_IS_CONST;
                                    return false;
                                }
                            }
                        }
                    }
                    return null;
                }
                throw 'object.unbind::' + errors.objects.INCORRECT_ARGUMENTS;
            },
            kill    : function (object, property) {
                /// <signature>
                ///     <summary>Unbind all handles, which was attached to property of object</summary>
                ///     <param name="object"    type="OBJECT">Parent object</param>
                ///     <param name="property"  type="STRING">Property</param>
                ///     <returns type="BOOLEAN"/>
                /// </signature>
                var storage = settings.objects.STORAGE_PROPERTY,
                    value   = null;
                if (typeof object === 'object' && typeof property === 'string') {
                    if (object[storage]) {
                        value   = object[property];
                        storage = object[storage];
                        try {
                            if (storage.kill(property)) {
                                delete object[property];
                                object[property] = value;
                                return true;
                            } else {
                                return false;
                            }
                        } catch (e) {
                            throw 'object.kill::' + errors.objects.PROPERTY_IS_CONST;
                            return false;
                        }
                    }
                    return null;
                }
                throw 'object.kill::' + errors.objects.INCORRECT_ARGUMENTS;
            },
        };
        //Binding attributes of nodes
        attrs           = {
            storage : {
                create : function (node) {
                    var Storage = function (node) {
                            this.node       = node;
                            this.binds      = {};
                            this._destroy   = null;
                        };
                    Storage.prototype = {
                        init            : function (){
                            this._destroy = mutationCross.attach(node,
                                this.handle,
                                this,
                                {
                                    attributes              : true,
                                    childList               : false,
                                    subtree                 : false,
                                    characterData           : true,
                                    attributeOldValue       : false,
                                    characterDataOldValue   : false
                                }
                            );
                        },
                        handle          : function (attr, mutation) {
                            var self        = this,
                                attr_value  = null;
                            if (this.binds[attr]) {
                                attr_value = this.node.getAttribute(attr);
                                if (attr_value !== this.binds[attr].current) {
                                    this.binds[attr].previous   = this.binds[attr].current;
                                    this.binds[attr].current    = attr_value;
                                    _object(this.binds[attr].handles).forEach(function (id, handle) {
                                        handle.call(self.node, attr, self.binds[attr].current, self.binds[attr].previous, mutation, id);
                                    });
                                }
                            }
                        },
                        make            : function (attr) {
                            if (!this.binds[attr]) {
                                this.binds[attr] = {
                                    handles     : {},
                                    previous    : null,
                                    current     : this.node.getAttribute(attr)
                                };
                            }
                        },
                        add             : function (attr, handle) {
                            var id = flex.unique();
                            //Save handle ID in handle
                            handle[settings.attrs.HANDLE_ID_PROPERTY] = id;
                            //Add handle in storage
                            this.binds[attr].handles[id] = handle;
                            //Return handle ID
                            return id;
                        },
                        remove          : function (attr, id) {
                            var result = null;
                            if (this.binds[attr]) {
                                if (this.binds[attr].handles[id]) {
                                    delete this.binds[attr].handles[id];
                                    if (Object.keys(this.binds[attr].handles).length === 0) {
                                        result = delete this.binds[attr];
                                        this.destroy();
                                        return result;
                                    }
                                }
                            }
                            return result;
                        },
                        kill            : function (attr) {
                            var result = null;
                            if (this.binds[attr]) {
                                result = delete this.binds[attr];
                                this.destroy();
                                return result;
                            }
                            return result;
                        },
                        isAttrReady     : function (attr) {
                            return this.binds[attr] !== void 0 ? true : false;
                        },
                        destroy         : function (){
                            if (Object.keys(this.binds).length === 0) {
                                this._destroy();
                                return delete this.node[settings.attrs.STORAGE_PROPERTY];
                            }
                            return false;
                        },
                    };
                    return new Storage(node);
                }
            },
            bind    : function (node, attr, handle) {
                /// <signature>
                ///     <summary>Bind handle to attribute of node</summary>
                ///     <param name="node"      type="DOMNode"  >Target node</param>
                ///     <param name="attr"      type="STRING"   >Attribute name</param>
                ///     <param name="handle"    type="FUNCTION" >Handle of attribute changing</param>
                ///     <returns type="STRING"/>
                /// </signature>
                var storage = settings.attrs.STORAGE_PROPERTY,
                    value   = null;
                if (mutationCross.attach !== null) {
                    if (node !== void 0 && typeof attr === 'string' && typeof handle === 'function') {
                        if (node.nodeName) {
                            if (!node[storage]) {
                                //Node isn't listening
                                node[storage] = attrs.storage.create(node);
                                node[storage].init();
                            }
                            storage = node[storage];
                            //Prepare attr if needed
                            if (!storage.isAttrReady(attr)) {
                                //First handle for attr
                                storage.make(attr);
                            }
                            //Add handle
                            return storage.add(attr, handle);
                        }
                    }
                    throw 'attrs.bind::' + errors.objects.INCORRECT_ARGUMENTS;
                }
            },
            unbind  : function (node, attr, id) {
                /// <signature>
                ///     <summary>Unbind handle to attribute of node by handle's ID</summary>
                ///     <param name="node"      type="DOMNode"  >Target node</param>
                ///     <param name="attr"      type="STRING"   >Attribute name</param>
                ///     <param name="id"        type="STRING"   >ID of handle</param>
                ///     <returns type="BOOLEAN"/>
                /// </signature>
                var storage = settings.attrs.STORAGE_PROPERTY;
                if (typeof node === 'object' && typeof attr === 'string' && typeof id === 'string') {
                    if (node[storage]) {
                        storage = node[storage];
                        if (storage.isAttrReady(attr)) {
                            return storage.remove(attr, id);
                        }
                    }
                    return null;
                }
                throw 'attrs.unbind::' + errors.objects.INCORRECT_ARGUMENTS;
            },
            kill    : function (node, attr) {
                /// <signature>
                ///     <summary>Unbind all handles, which was attached to attribute of node</summary>
                ///     <param name="node"      type="DOMNode"  >Target node</param>
                ///     <param name="attr"      type="STRING"   >Attribute name</param>
                ///     <returns type="BOOLEAN"/>
                /// </signature>
                var storage = settings.attrs.STORAGE_PROPERTY;
                if (typeof node === 'object' && typeof attr === 'string') {
                    if (node[storage]) {
                        storage = node[storage];
                        if (storage.isAttrReady(attr)) {
                            return storage.kill(attr);
                        }
                    }
                    return null;
                }
                throw 'attrs.unbind::' + errors.objects.INCORRECT_ARGUMENTS;
            },
        };
        //Binding properties of nodes
        props           = {
            storage : {
                create : function (node) {
                    var Storage = function (node) {
                            this.node       = node;
                            this.binds      = {};
                            this._destroy   = null;
                        };
                    Storage.prototype = {
                        init            : function (){
                            this._destroy = mutationCross.attach(
                                node,
                                this.handle,
                                this,
                                {
                                    attributes              : true,
                                    childList               : true,
                                    subtree                 : true,
                                    characterData           : true,
                                    attributeOldValue       : false,
                                    characterDataOldValue   : false
                                }
                            );
                        },
                        prop            : function(prop){
                            var res     = null,
                                node    = this.node;
                            prop.split('.').forEach(function (step, index, steps) {
                                if (node[step] !== void 0 && index < steps.length - 1) {
                                    node = node[step];
                                } else if (node[step] !== void 0 && index === steps.length - 1) {
                                    res = {
                                        parent  : node,
                                        name    : step
                                    };
                                }
                            });
                            return res;
                        },
                        handle          : function (attr, mutation) {
                            var self = this;
                            _object(this.binds).forEach(function (prop, bind_data) {
                                var prop_value = self.binds[prop].parent[prop];
                                if (prop_value !== self.binds[prop].current) {
                                    self.binds[prop].previous   = self.binds[prop].current;
                                    self.binds[prop].current    = prop_value;
                                    _object(self.binds[prop].handles).forEach(function (id, handle) {
                                        handle.call(self.binds[prop].parent, prop, self.binds[prop].current, self.binds[prop].previous, mutation, id);
                                    });
                                }
                            });
                        },
                        make            : function (prop) {
                            var prop = this.prop(prop);
                            if (!this.binds[prop.name]) {
                                this.binds[prop.name] = {
                                    handles     : {},
                                    previous    : null,
                                    current     : prop.parent[prop.name],
                                    parent      : prop.parent
                                };
                            }
                        },
                        add             : function (prop, handle) {
                            var id      = flex.unique(),
                                prop    = this.prop(prop);
                            //Save handle ID in handle
                            handle[settings.props.HANDLE_ID_PROPERTY] = id;
                            //Add handle in storage
                            this.binds[prop.name].handles[id] = handle;
                            //Return handle ID
                            return id;
                        },
                        remove          : function (prop, id) {
                            var result  = null,
                                prop    = this.prop(prop);
                            if (this.binds[prop.name]) {
                                if (this.binds[prop.name].handles[id]) {
                                    delete this.binds[prop.name].handles[id];
                                    if (Object.keys(this.binds[prop.name].handles).length === 0) {
                                        result = delete this.binds[prop.name];
                                        this.destroy();
                                        return result;
                                    }
                                }
                            }
                            return result;
                        },
                        kill            : function (prop) {
                            var result  = null,
                                prop    = this.prop(prop);
                            if (this.binds[prop.name]) {
                                result = delete this.binds[prop.name];
                                this.destroy();
                                return result;
                            }
                            return result;
                        },
                        isPropReady: function (prop) {
                            var prop = this.prop(prop);
                            return this.binds[prop.name] !== void 0 ? true : false;
                        },
                        destroy         : function (){
                            if (Object.keys(this.binds).length === 0) {
                                this._destroy();
                                return delete this.node[settings.props.STORAGE_PROPERTY];
                            }
                            return false;
                        },
                    };
                    return new Storage(node);
                }
            },
            bind    : function (node, prop, handle) {
                /// <signature>
                ///     <summary>Bind handle to prop of node</summary>
                ///     <param name="node"      type="DOMNode"  >Target node</param>
                ///     <param name="prop"      type="STRING"   >Prop name</param>
                ///     <param name="handle"    type="FUNCTION" >Handle of prop changing</param>
                ///     <returns type="STRING"/>
                /// </signature>
                function isValidProp(node, prop) {
                    var res = false;
                    prop.split('.').forEach(function (step, index, steps) {
                        if (node[step] !== void 0 && index < steps.length - 1) {
                            node = node[step];
                        } else if (node[step] !== void 0 && index === steps.length - 1) {
                            res = true;
                        }
                    });
                    return res;
                };
                var storage = settings.props.STORAGE_PROPERTY,
                    value   = null;
                if (mutationCross.attach !== null) {
                    if (node !== void 0 && typeof prop === 'string' && typeof handle === 'function') {
                        if (node.nodeName !== void 0) {
                            if (isValidProp(node, prop)) {
                                if (!node[storage]) {
                                    //Node isn't listening
                                    node[storage] = props.storage.create(node);
                                    node[storage].init();
                                }
                                storage = node[storage];
                                //Prepare prop if needed
                                if (!storage.isPropReady(prop)) {
                                    //First handle for prop
                                    storage.make(prop);
                                }
                                //Add handle
                                return storage.add(prop, handle);
                            }
                        }
                    }
                    throw 'props.bind::' + errors.objects.INCORRECT_ARGUMENTS;
                }
            },
            unbind  : function (node, prop, id) {
                /// <signature>
                ///     <summary>Unbind handle to prop of node by handle's ID</summary>
                ///     <param name="node"      type="DOMNode"  >Target node</param>
                ///     <param name="prop"      type="STRING"   >Prop name</param>
                ///     <param name="id"        type="STRING"   >ID of handle</param>
                ///     <returns type="BOOLEAN"/>
                /// </signature>
                var storage = settings.props.STORAGE_PROPERTY;
                if (typeof node === 'object' && typeof prop === 'string' && typeof id === 'string') {
                    if (node[storage]) {
                        storage = node[storage];
                        if (storage.isPropReady(prop)) {
                            return storage.remove(prop, id);
                        }
                    }
                    return null;
                }
                throw 'props.unbind::' + errors.objects.INCORRECT_ARGUMENTS;
            },
            kill    : function (node, prop) {
                /// <signature>
                ///     <summary>Unbind all handles, which was attached to prop of node</summary>
                ///     <param name="node"      type="DOMNode"  >Target node</param>
                ///     <param name="prop"      type="STRING"   >Prop name</param>
                ///     <returns type="BOOLEAN"/>
                /// </signature>
                var storage = settings.props.STORAGE_PROPERTY;
                if (typeof node === 'object' && typeof prop === 'string') {
                    if (node[storage]) {
                        storage = node[storage];
                        if (storage.isPropReady(prop)) {
                            return storage.kill(prop);
                        }
                    }
                    return null;
                }
                throw 'props.unbind::' + errors.objects.INCORRECT_ARGUMENTS;
            },
        };
        mutationCross   = {
            init: function () {
                mutationCross.attach = mutationCross.attach();
            },
            //Modern
            mutationObserver    : function (node, handle, self, parameters) {
                var MutationObserver    = window.MutationObserver || window.WebKitMutationObserver,
                    observer            = null;
                observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        handle.call(self, mutation.attributeName, mutation);
                    });
                });
                observer.observe(node, parameters);
                //Return distroy / disconnect method
                return function () {
                    observer.disconnect();
                };
            },
            //Old
            DOMAttrModified     : function (node, handle, self) {
                flex.events.DOM.add(node, 'DOMAttrModified', function (mutation) {
                    handle.call(self, event.attrName, mutation);
                });
                //Return distroy / disconnect method
                return function () {
                    //Do nothing
                };
            },
            //IE < 11
            onPropertyChange    : function (node, handle, self) {
                flex.events.DOM.add(node, 'propertychange', function (mutation) {
                    handle.call(self, event.attributeName, mutation);
                });
                //Return distroy / disconnect method
                return function () {
                    //Do nothing
                };
            },
            //Common accessor to browser API
            attach              : function () {
                function isDOMAttrModified() {
                    var node = document.createElement('DIV'),
                        flag = false;
                    flex.events.DOM.add(node, 'DOMAttrModified', function () {
                        flag = true;
                    });
                    node.setAttribute('id', 'test');
                    return flag;
                };
                if (window.MutationObserver || window.WebKitMutationObserver) {
                    return mutationCross.mutationObserver;
                }
                if (isDOMAttrModified()) {
                    return mutationCross.DOMAttrModified;
                }
                if ('onpropertychange' in document.body) {
                    return mutationCross.onPropertyChange;
                }
                return null;
            }
        };
        callers         = {
            init: function () {
                flex.callers.define.object('binding.bind',          function (property, handle) {
                    return objects.bind(this.target, property, handle);
                });
                flex.callers.define.object('binding.unbind',        function (property, id) {
                    return objects.unbind(this.target, property, id);
                });
                flex.callers.define.object('binding.kill',          function (property) {
                    return objects.kill(this.target, property);
                });

                flex.callers.define.node('bindingAttrs.bind',       function (attr, handle) {
                    return attrs.bind(this.target, attr, handle);
                });
                flex.callers.define.node('bindingAttrs.unbind',     function (attr, id) {
                    return attrs.unbind(this.target, attr, id);
                });
                flex.callers.define.node('bindingAttrs.kill',       function (attr) {
                    return attrs.kill(this.target, attr);
                });

                flex.callers.define.nodes('bindingAttrs.bind',      function (attr, handle) {
                    var result = [];
                    SelectorClass();
                    Array.prototype.forEach.call(this.target,       function (target) {
                        result.push(attrs.bind(target, attr, handle));
                    });
                    return result;
                });
                flex.callers.define.nodes('bindingAttrs.unbind',    function (attr, id) {
                    var result = [];
                    SelectorClass();
                    Array.prototype.forEach.call(this.target,       function (target) {
                        result.push(attrs.unbind(target, attr, id));
                    });
                    return result;
                });
                flex.callers.define.nodes('bindingAttrs.kill',      function (attr) {
                    var result = [];
                    SelectorClass();
                    Array.prototype.forEach.call(this.target,       function (target) {
                        result.push(attrs.kill(target, attr));
                    });
                    return result;
                });

                flex.callers.define.node('bindingProps.bind',       function (prop, handle) {
                    return props.bind(this.target, prop, handle);
                });
                flex.callers.define.node('bindingProps.unbind',     function (prop, id) {
                    return props.unbind(this.target, prop, id);
                });
                flex.callers.define.node('bindingProps.kill',       function (prop) {
                    return props.kill(this.target, prop);
                });

                flex.callers.define.nodes('bindingProps.bind',      function (prop, handle) {
                    var result = [];
                    SelectorClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(props.bind(target, prop, handle));
                    });
                    return result;
                });
                flex.callers.define.nodes('bindingProps.unbind',    function (prop, id) {
                    var result = [];
                    SelectorClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(props.unbind(target, prop, id));
                    });
                    return result;
                });
                flex.callers.define.nodes('bindingProps.kill',      function (prop) {
                    var result = [];
                    SelectorClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(props.kill(target, prop));
                    });
                    return result;
                });
            }
        };
        support         = {
            check   : function () {
                if (!Object.defineProperty) {
                    throw errors.support.DEFINE_PROPERTY;
                }
                if (mutationCross.attach === null) {
                    throw errors.support.MUTATION_SCANNING;
                }
            }
        };
        //Init 
        mutationCross.init();
        //Initialization of callers
        callers.init();
        //Check support
        support.check();
        //Public part
        privates        = {
        };
        return {
        };
    };
    //=== Focus module ===
    Focus.prototype         = function () {
        /* Description
        * data-flex-ui-window-focus
        * data-flex-ui-window-move-hook
        * */
        var //Variables
            privates        = null,
            global          = null,
            processing      = null,
            settings        = null,
            patterns        = null;
        settings = {
            CONTAINER           : 'data-flex-ui-window-focus',
            INITED              : 'data-flex-window-focus-inited',
            GLOBAL_GROUP        : 'flex-window-focus-global-group',
            GLOBAL_EVENT_FLAG   : 'flex-window-focus-global-event',
            GLOBAL_CURRENT      : 'flex-window-focus-global-current',
            GLOBAL_EVENT_ID     : 'flex-window-focus-global-event-id',
            FOCUSED_ZINDEX      : 1000
        };
        function init(id) {
            var id          = id || null,
                containers  = _nodes('*[' + settings.CONTAINER + (id !== null ? '="' + id + '"' : '') + ']:not([' + settings.INITED + '])').target;
            if (containers !== null) {
                Array.prototype.forEach.call(
                    containers,
                    function (container) {
                        var id = container.getAttribute(settings.CONTAINER);
                        if (id === '' || id === null) {
                            container.setAttribute(settings.CONTAINER, flex.unique());
                        }
                        container.setAttribute(settings.INITED, true);
                    }
                );
            }
        };
        global      = {
            attach: function () {
                var isAttached  = flex.overhead.globaly.get(settings.GLOBAL_GROUP, settings.GLOBAL_EVENT_FLAG);
                if (isAttached !== true) {
                    flex.overhead.globaly.set(settings.GLOBAL_GROUP, settings.GLOBAL_EVENT_FLAG, true);
                    _node(window).events().add(
                        'click',
                        function (event) {
                            processing.onClick(event);
                            return true;
                        },
                        settings.GLOBAL_EVENT_ID
                    );
                }
            },
        };
        processing  = {
            getContainer    : function(node){
                var id          = null,
                    container   = null;
                if (typeof node.getAttribute === 'function') {
                    id = node.getAttribute(settings.CONTAINER);
                    if (id !== '' && id !== null) {
                        return {
                            container   : node,
                            id          : id
                        };
                    }
                }
                container = _node(node).html().find().parentByAttr({ name: settings.CONTAINER, value: null });
                if (container !== null) {
                    return {
                        container   : container,
                        id          : container.getAttribute(settings.CONTAINER)
                    };
                }
                return null;
            },
            history         : {
                is      : function (id) {
                    return (flex.overhead.globaly.get(settings.GLOBAL_GROUP, settings.GLOBAL_CURRENT) !== id ? false : true);
                },
                set     : function (id) {
                    flex.overhead.globaly.set(settings.GLOBAL_GROUP, settings.GLOBAL_CURRENT, id);
                },
                get     : function () {
                    return flex.overhead.globaly.get(settings.GLOBAL_GROUP, settings.GLOBAL_CURRENT);
                },
                del     : function () {
                    flex.overhead.globaly.del(settings.GLOBAL_GROUP, settings.GLOBAL_CURRENT);
                }
            },
            onClick         : function (event) {
                var container   = processing.getContainer(event.flex.target),
                    previous    = processing.history.get();
                if (previous !== null) {
                    processing.focus.unset(previous);
                }
                if (container !== null) {
                    if (processing.history.is(container.id) === false) {
                        processing.focus.set(container.id);
                    }
                }
            },
            focus           : {
                zIndex  : function(id, value){
                    var container   = _node('*[' + settings.CONTAINER + '="' + id + '"' + ']').target;
                    if (container !== null) {
                        container.style.zIndex = value;
                    }
                },
                set     : function(id){
                    processing.focus.zIndex(id, settings.FOCUSED_ZINDEX);
                    processing.history.set(id);
                },
                unset   : function(id){
                    processing.focus.zIndex(id, '');
                    processing.history.del(id);
                },
            },
        };
        patterns    = {
            attach: function () {
                flex.events.core.listen(flex.registry.events.ui.patterns.GROUP, flex.registry.events.ui.patterns.MOUNTED, function (nodes) {
                    var context = nodes.length !== void 0 ? (nodes.length > 0 ? nodes[0].parentNode : null) : null;
                    if (context !== null) {
                        if (_node('*[' + settings.CONTAINER + ']:not([' + settings.INITED + '])', false, context).target !== null) {
                            init();
                        }
                    }
                });
            }
        };
        privates    = {
            init : init
        };
        global.attach();
        patterns.attach();
        //Init modules
        if (flex.libraries !== void 0) {
            if (flex.libraries.events !== void 0 && flex.libraries.html !== void 0) {
                flex.libraries.events.create();
                flex.libraries.html.create();
            }
        }
        return {
            init : privates.init
        };
    };
    //=== Min / max window module ===
    Maximize.prototype      = function () {
        /* Description
        * data-flex-ui-window-maximize
        * data-flex-window-maximize-hook
        * */
        var //Variables
            privates        = null,
            global          = null,
            patterns        = null,
            processing      = null,
            settings        = null;
        settings = {
            CONTAINER           : 'data-flex-ui-window-maximize',
            HOOK                : 'data-flex-window-maximize-hook',
            INITED              : 'data-flex-window-maximize-inited',
            STATE               : 'data-flex-window-is-maximized',
            STORAGE             : 'flex-window-maximize-storage',
        };
        function init(id) {
            var id          = id || null,
                containers  = _nodes('*[' + settings.CONTAINER + (id !== null ? '="' + id + '"' : '') + ']:not([' + settings.INITED + '])').target;
            if (containers !== null) {
                Array.prototype.forEach.call(
                    containers,
                    function (container) {
                        var id      = container.getAttribute(settings.CONTAINER),
                            hooks   = null;
                        if (id !== '' && id !== null) {
                            hooks = _nodes('*[' + settings.HOOK + '="' + id + '"]').target;
                            if (hooks !== null) {
                                processing.attach(container, hooks, id);
                            }
                        }
                        container.setAttribute(settings.INITED, true    );
                        container.setAttribute(settings.STATE, 'false'  );
                        flex.overhead.objecty.set(container, settings.STORAGE, { maximazed: false }, true);
                    }
                );
            }
        };
        processing = {
            attach  : function (container, hooks, id) {
                Array.prototype.forEach.call(
                    hooks,
                    function (hook, index) {
                        _node(hook).events().add(
                            'click',
                            function (event) {
                                processing.onClick(event, container, id);
                                return true;
                            },
                            id + '_' + index
                        );
                    }
                );
            },
            onClick : function (event, container, id) {
                var storage = flex.overhead.objecty.get(container, settings.STORAGE, false);
                if (storage !== null) {
                    if (storage.maximazed === false) {
                        processing.actions.maximaze(container, storage, id);
                    } else {
                        processing.actions.restore(container, storage, id);
                    }
                    //Run external events in background
                    setTimeout(
                        function () {
                            flex.events.core.fire(
                                flex.registry.events.ui.window.maximize.GROUP,
                                flex.registry.events.ui.window.maximize.CHANGE,
                                { container: container, id: id }
                            );
                        },
                        10
                    );
                }
            },
            actions: {
                maximaze: function (container, storage, id) {
                    storage.maximazed   = true;
                    storage.size        = {
                        position: container.style.position  !== '' ? container.style.position   : false,
                        width   : container.style.width     !== '' ? container.style.width      : false,
                        height  : container.style.height    !== '' ? container.style.height     : false,
                        left    : container.style.left      !== '' ? container.style.left       : false,
                        top     : container.style.top       !== '' ? container.style.top        : false,
                    };
                    container.style.position    = 'fixed';
                    container.style.width       = '100%';
                    container.style.height      = '100%';
                    container.style.left        = '0px';
                    container.style.top         = '0px';
                    container.setAttribute(settings.STATE, 'true');
                    //Run external events in background
                    setTimeout(
                        function () {
                            flex.events.core.fire(
                                flex.registry.events.ui.window.maximize.GROUP,
                                flex.registry.events.ui.window.maximize.MAXIMIZED,
                                { container: container, id: id }
                            );
                        },
                        10
                    );
                },
                restore : function (container, storage, id) {
                    storage.maximazed           = false;
                    container.style.position    = storage.size.position !== false ? storage.size.position   : '';
                    container.style.width       = storage.size.width    !== false ? storage.size.width      : '';
                    container.style.height      = storage.size.height   !== false ? storage.size.height     : '';
                    container.style.left        = storage.size.left     !== false ? storage.size.left       : '';
                    container.style.top         = storage.size.top      !== false ? storage.size.top        : '';
                    container.setAttribute(settings.STATE, 'false');
                    //Run external events in background
                    setTimeout(
                        function () {
                            flex.events.core.fire(
                                flex.registry.events.ui.window.maximize.GROUP,
                                flex.registry.events.ui.window.maximize.RESTORED,
                                { container: container, id: id }
                            );
                        },
                        10
                    );
                },
                byID : {
                    findByID: function (id) {
                        var id          = id || null,
                            containers  = null,
                            result      = [];
                        if (id !== null) {
                            containers = _nodes('*[' + settings.CONTAINER + (id !== null ? '="' + id + '"' : '') + ']').target;
                            if (containers !== null) {
                                if (containers.length > 0) {
                                    Array.prototype.forEach.call(containers, function (container) {
                                        var storage = flex.overhead.objecty.get(container, settings.STORAGE, false);
                                        if (storage !== null) {
                                            result.push({
                                                container   : container,
                                                storage     : storage
                                            });
                                        }
                                    });
                                    return result.length > 0 ? result : null;
                                }
                            }
                        }
                        return null;
                    },
                    maximaze: function (id) {
                        var data = processing.actions.byID.findByID(id);
                        if (data !== null) {
                            data.forEach(function (data) {
                                processing.actions.maximaze(data.container, data.storage, id);
                            });
                        }
                    },
                    restore : function (id) {
                        var data = processing.actions.byID.findByID(id);
                        if (data !== null) {
                            data.forEach(function (data) {
                                processing.actions.restore(data.container, data.storage, id);
                            });
                        }
                    },
                }
            }
        };
        patterns = {
            attach: function () {
                flex.events.core.listen(flex.registry.events.ui.patterns.GROUP, flex.registry.events.ui.patterns.MOUNTED, function (nodes) {
                    var context = nodes.length !== void 0 ? (nodes.length > 0 ? nodes[0].parentNode : null) : null;
                    if (context !== null) {
                        if (_node('*[' + settings.CONTAINER + ']:not([' + settings.INITED + '])', false, context).target !== null) {
                            init();
                        }
                    }
                });
            }
        };
        //Init modules
        if (flex.libraries !== void 0) {
            if (flex.libraries.events !== void 0) {
                flex.libraries.events.create();
            }
        }
        patterns.attach();
        privates = {
            init    : init,
            maximaze: processing.actions.byID.maximaze,
            restore : processing.actions.byID.restore,
        };
        return {
            init        : privates.init,
            maximaze    : privates.maximaze,
            restore     : privates.restore,
        };
    };
    //=== Move window module ===
    Move.prototype          = function () {
        /* Description
        * data-flex-ui-window-move-container="id"
        * data-flex-ui-window-move-hook="id"
        * */
        var //Variables
            privates        = null,
            render          = null,
            coreEvents      = null,
            patterns        = null,
            settings        = null;
        settings = {
            CONTAINER           : 'data-flex-ui-window-move-container',
            HOOK                : 'data-flex-ui-window-move-hook',
            INITED              : 'data-flex-window-move-inited',
            GLOBAL_GROUP        : 'flex-window-move',
            GLOBAL_EVENT_FLAG   : 'flex-window-move-global-event',
            GLOBAL_CURRENT      : 'flex-window-move-global-current',
            GLOBAL_EVENT_ID     : 'flex-window-move-global-event-id',
            STATE_STORAGE       : 'flex-window-move-instance-state',
        };
        function init(id) {
            var id          = id || null,
                containers  = _nodes('*[' + settings.CONTAINER + (id !== null ? '="' + id + '"' : '') + ']:not([' + settings.INITED + '])').target;
            if (containers !== null) {
                Array.prototype.forEach.call(
                    containers,
                    function (container) {
                        var id      = container.getAttribute(settings.CONTAINER),
                            hooks   = null;
                        if (id !== '' && id !== null) {
                            hooks = _nodes('*[' + settings.HOOK + '="' + id + '"]').target;
                            if (hooks !== null) {
                                render.attach(container, hooks, id);
                                coreEvents.attach(container, id);
                            }
                        }
                        container.setAttribute(settings.INITED, true);
                    }
                );
            }
        };
        render      = {
            attach  : function (container, hooks, id) {
                Array.prototype.forEach.call(
                    hooks,
                    function (hook) {
                        _node(hook).events().add(
                            'mousedown',
                            function (event) {
                                render.start(event, container, hook, id);
                            },
                            id
                        );
                    }
                );
            },
            start   : function (event, container, hook, id) {
                function getPosition(node) {
                    if (node.currentStyle) {
                        if (node.currentStyle.position) {
                            return node.currentStyle.position;
                        }
                    }
                    if (window.getComputedStyle) {
                        return window.getComputedStyle(node).position;
                    }
                    return null;
                }
                var pos         = null,
                    scrl        = null,
                    isFixed     = null;
                if (flex.overhead.objecty.get(container, settings.STATE_STORAGE, false, false) === false) {
                    pos         = _node(container).html().position().byPage();
                    scrl        = _node(container.parentNode).html().scroll().position();
                    isFixed     = getPosition(container) !== 'fixed' ? false : true;
                    flex.overhead.globaly.set(
                        settings.GLOBAL_GROUP,
                        settings.GLOBAL_CURRENT,
                        {
                            clientX     : event.flex.clientX,
                            clientY     : event.flex.clientY,
                            offsetX     : event.flex.offsetX,
                            offsetY     : event.flex.offsetY,
                            pageX       : event.flex.pageX,
                            pageY       : event.flex.pageY,
                            hook        : hook,
                            container   : container,
                            id          : id,
                            oldX        : event.flex.pageX,
                            oldY        : event.flex.pageY,
                            posX        : pos.left + (isFixed === false ? scrl.left() : 0),
                            posY        : pos.top + (isFixed === false ? scrl.top() : 0),
                        }
                    );
                    return event.flex.stop();
                } else {
                    return true;
                }
            },
            move    : function(event){
                var instance    = flex.overhead.globaly.get(settings.GLOBAL_GROUP, settings.GLOBAL_CURRENT),
                    container   = null;
                if (instance !== null) {
                    container               = instance.container;
                    instance.posX           = (instance.posX - (instance.oldX - event.flex.pageX));
                    instance.posY           = (instance.posY - (instance.oldY - event.flex.pageY));
                    container.style.left    = instance.posX + 'px';
                    container.style.top     = instance.posY + 'px';
                    instance.oldX           = event.flex.pageX;
                    instance.oldY           = event.flex.pageY;
                }
                return event.flex.stop();
            },
            stop    : function(event) {
                flex.overhead.globaly.del(settings.GLOBAL_GROUP, settings.GLOBAL_CURRENT);
            },
            global: {
                attach: function () {
                    var isAttached  = flex.overhead.globaly.get(settings.GLOBAL_GROUP, settings.GLOBAL_EVENT_FLAG);
                    if (isAttached !== true) {
                        flex.overhead.globaly.set(settings.GLOBAL_GROUP, settings.GLOBAL_EVENT_FLAG, true);
                        _node(window).events().add(
                            'mousemove',
                            function (event) {
                                render.move(event);
                            },
                            settings.GLOBAL_EVENT_ID
                        );
                        _node(window).events().add(
                            'mouseup',
                            function (event) {
                                render.stop(event);
                            },
                            settings.GLOBAL_EVENT_ID
                        );
                    }
                }
            }
        };
        coreEvents  = {
            attach: function (container, id) {
                flex.events.core.listen(
                    flex.registry.events.ui.window.maximize.GROUP,
                    flex.registry.events.ui.window.maximize.MAXIMIZED,
                    function (params) {
                        return coreEvents.onRefreshByParent(params.container, container, flex.registry.events.ui.window.maximize.MAXIMIZED);
                    },
                    settings.STATE_STORAGE + id,
                    false
                );
                flex.events.core.listen(
                    flex.registry.events.ui.window.maximize.GROUP,
                    flex.registry.events.ui.window.maximize.RESTORED,
                    function (params) {
                        return coreEvents.onRefreshByParent(params.container, container, flex.registry.events.ui.window.maximize.RESTORED);
                    },
                    settings.STATE_STORAGE + id,
                    false
                );
            },
            onRefreshByParent: function (parent, container, state) {
                if (parent === container) {
                    switch (state) {
                        case flex.registry.events.ui.window.maximize.MAXIMIZED:
                            flex.overhead.objecty.set(container, settings.STATE_STORAGE, true, true);
                            break;
                        case flex.registry.events.ui.window.maximize.RESTORED:
                            flex.overhead.objecty.set(container, settings.STATE_STORAGE, false, true);
                            break;
                    }
                }
                return false;
            }
        };
        patterns    = {
            attach: function () {
                flex.events.core.listen(flex.registry.events.ui.patterns.GROUP, flex.registry.events.ui.patterns.MOUNTED, function (nodes) {
                    var context = nodes.length !== void 0 ? (nodes.length > 0 ? nodes[0].parentNode : null) : null;
                    if (context !== null) {
                        if (_node('*[' + settings.CONTAINER + ']:not([' + settings.INITED + '])', false, context).target !== null) {
                            init();
                        }
                    }
                });
            }
        };
        privates = {
            init : init
        };
        render.global.attach();
        patterns.attach();
        //Init modules
        if (flex.libraries !== void 0) {
            if (flex.libraries.events !== void 0 && flex.libraries.html !== void 0) {
                flex.libraries.events.create();
                flex.libraries.html.create();
            }
        }
        return {
            init : privates.init
        };
    };
    //=== Binds module ===
    Resize.prototype        = function () {
        /* Description
            * data-flex-ui-window-resize-container="id"
            *
            * Next field isn't necessary and can be skipped. You should define it for situation, when container get his position form parent.
            * For example container has top:50% from parent. In this case you should define such parent by next mark
            * data-flex-ui-window-resize-position-parent="id"
            * */
        var //Variables
            privates        = null,
            render          = null,
            patterns        = null,
            coreEvents      = null,
            settings        = null;
        settings = {
            CONTAINER           : 'data-flex-ui-window-resize-container',
            INITED              : 'data-flex-window-resize-inited',
            HOOK                : 'data-flex-window-resize-hook',
            HOOKS               : ['top', 'left', 'right', 'bottom', 'corner'],
            HOOKS_STYLE         : {
                top     : { node: 'div', style: { position: 'absolute', zIndex: 1, height: '6px', width: '100%', top: '0px', left: '0px', cursor: 'n-resize' } },
                bottom  : { node: 'div', style: { position: 'absolute', zIndex: 1, height: '6px', width: '100%', bottom: '0px', left: '0px', cursor: 'n-resize' } },
                left    : { node: 'div', style: { position: 'absolute', zIndex: 1, height: '100%', width: '6px', top: '0px', left: '0px', cursor: 'e-resize' } },
                right   : { node: 'div', style: { position: 'absolute', zIndex: 1, height: '100%', width: '6px', top: '0px', right: '0px', cursor: 'e-resize'} },
                corner  : { node: 'div', style: { position: 'absolute', zIndex: 1, height: '10px',    width: '10px',   bottom: '0px',  right: '0px', cursor: 'nw-resize' } }
            },
            POSITION_PARENT     : 'data-flex-ui-window-resize-position-parent',
            GLOBAL_GROUP        : 'flex-window-resize',
            GLOBAL_EVENT_FLAG   : 'flex-window-resize-global-event',
            GLOBAL_CURRENT      : 'flex-window-resize-global-current',
            GLOBAL_EVENT_ID     : 'flex-window-resize-global-event-id',
            STATE_STORAGE       : 'flex-window-resize-instance-state',
        };
        function init(id) {
            var id          = id || null,
                containers  = _nodes('*[' + settings.CONTAINER + (id !== null ? '="' + id + '"' : '') + ']:not([' + settings.INITED + '])').target;
            if (containers !== null) {
                Array.prototype.forEach.call(
                    containers,
                    function (container) {
                        var id = container.getAttribute(settings.CONTAINER);
                        if (id !== null && id !== '') {
                            Array.prototype.forEach.call(
                                settings.HOOKS,
                                function (hook) {
                                    var hooks = render.hooks.get(id, container, hook);
                                    render.attach(container, hooks, hook, id);
                                    coreEvents.attach(container, id);
                                }
                            );
                        }
                        container.setAttribute(settings.INITED, true);
                    }
                );
            }
        };
        render          = {
            position    : {
                getParent : function(id){
                    return _node('*[' + settings.POSITION_PARENT + '="' + id + '"' + ']').target;
                }
            },
            hooks       : {
                make    : function (container, hook) {
                    var node = document.createElement(settings.HOOKS_STYLE[hook].node);
                    for (var property in settings.HOOKS_STYLE[hook].style) {
                        node.style[property] = settings.HOOKS_STYLE[hook].style[property];
                    }
                    container.appendChild(node);
                    return node;
                },
                get     : function (id, container, hook) {
                    var hooks = _nodes('*[' + settings.CONTAINER + '="' + id + '"' + '][' + settings.HOOK + '="' + hook + '"' + ']:not([' + settings.INITED + '])').target;
                    if (hooks.length === 0) {
                        hooks = [];
                        hooks.push(render.hooks.make(container, hook));
                    }
                    return hooks;
                }
            },
            attach  : function (container, hooks, direction, id) {
                var position_parent = render.position.getParent(id);
                Array.prototype.forEach.call(
                    hooks,
                    function (hook) {
                        _node(hook).events().add(
                            'mousedown',
                            function (event) {
                                render.start(event, container, hook, direction, position_parent, id);
                            },
                            id
                        );
                    }
                );
            },
            start: function (event, container, hook, direction, position_parent, id) {
                function getPosition(node) {
                    if (node.currentStyle) {
                        if (node.currentStyle.position) {
                            return node.currentStyle.position;
                        }
                    }
                    if (window.getComputedStyle) {
                        return window.getComputedStyle(node).position;
                    }
                    return null;
                }
                var size        = null,
                    pos         = null,
                    scrl        = null,
                    isFixed     = null;
                if (flex.overhead.objecty.get(container, settings.STATE_STORAGE, false, false) === false) {
                    size        = _node(container).html().size().get();
                    pos         = _node(position_parent !== null ? position_parent : container).html().position().byPage();
                    scrl        = _node(container.parentNode).html().scroll().position();
                    isFixed     = getPosition(container) !== 'fixed' ? false : true;
                    flex.overhead.globaly.set(
                        settings.GLOBAL_GROUP,
                        settings.GLOBAL_CURRENT,
                        {
                            clientX         : event.flex.clientX,
                            clientY         : event.flex.clientY,
                            offsetX         : event.flex.offsetX,
                            offsetY         : event.flex.offsetY,
                            pageX           : event.flex.pageX,
                            pageY           : event.flex.pageY,
                            hook            : hook,
                            direction       : direction,
                            container       : container,
                            position_parent : position_parent,
                            id              : id,
                            oldX            : event.flex.pageX,
                            oldY            : event.flex.pageY,
                            posX            : pos.left + (isFixed === false ? scrl.left() : 0),
                            posY            : pos.top + (isFixed === false ? scrl.top() : 0),
                            width           : size.width,
                            height          : size.height
                        }
                    );
                    return event.flex.stop();
                } else {
                    return true;
                }
            },
            move    : function(event){
                var instance            = flex.overhead.globaly.get(settings.GLOBAL_GROUP, settings.GLOBAL_CURRENT),
                    container           = null,
                    position_container  = null;
                if (instance !== null) {
                    container           = instance.container;
                    position_container  = instance.position_parent !== null ? instance.position_parent : container;
                    switch (instance.direction) {
                        case 'top':
                            instance.posY                   = (instance.posY - (instance.oldY - event.flex.pageY));
                            instance.height                 = (instance.height + (instance.oldY - event.flex.pageY));
                            container.style.height          = instance.height + 'px';
                            position_container.style.top    = instance.posY + 'px';
                            break;
                        case 'left':
                            instance.posX                   = (instance.posX - (instance.oldX - event.flex.pageX));
                            instance.width                  = (instance.width + (instance.oldX - event.flex.pageX));
                            container.style.width           = instance.width + 'px';
                            position_container.style.left   = instance.posX + 'px';
                            break;
                        case 'bottom':
                            instance.height                 = (instance.height - (instance.oldY - event.flex.pageY));
                            container.style.height          = instance.height + 'px';
                            break;
                        case 'right':
                            instance.width                  = (instance.width - (instance.oldX - event.flex.pageX));
                            container.style.width           = instance.width + 'px';
                            break;
                        case 'corner':
                            instance.height                 = (instance.height - (instance.oldY - event.flex.pageY));
                            container.style.height          = instance.height + 'px';
                            instance.width                  = (instance.width - (instance.oldX - event.flex.pageX));
                            container.style.width           = instance.width + 'px';
                            break;
                    }
                    instance.oldX = event.flex.pageX;
                    instance.oldY = event.flex.pageY;
                    //Run external events in background
                    setTimeout(
                        function () {
                            flex.events.core.fire(
                                flex.registry.events.ui.window.resize.GROUP,
                                flex.registry.events.ui.window.resize.REFRESH,
                                { container: instance.container, id: instance.id }
                            );
                        },
                        10
                    );
                }
                return event.flex.stop();
            },
            stop    : function(event) {
                var instance = flex.overhead.globaly.get(settings.GLOBAL_GROUP, settings.GLOBAL_CURRENT);
                if (instance !== null) {
                    flex.events.core.fire(
                        flex.registry.events.ui.window.resize.GROUP,
                        flex.registry.events.ui.window.resize.FINISH,
                        { container: instance.container, id: instance.id }
                    );
                }
                flex.overhead.globaly.del(settings.GLOBAL_GROUP, settings.GLOBAL_CURRENT);
            },
            global: {
                attach: function () {
                    var isAttached  = flex.overhead.globaly.get(settings.GLOBAL_GROUP, settings.GLOBAL_EVENT_FLAG);
                    if (isAttached !== true) {
                        flex.overhead.globaly.set(settings.GLOBAL_GROUP, settings.GLOBAL_EVENT_FLAG, true);
                        _node(window).events().add(
                            'mousemove',
                            function (event) {
                                render.move(event);
                            },
                            settings.GLOBAL_EVENT_ID
                        );
                        _node(window).events().add(
                            'mouseup',
                            function (event) {
                                render.stop(event);
                            },
                            settings.GLOBAL_EVENT_ID
                        );
                    }
                }
            }
        };
        coreEvents      = {
            attach: function (container, id) {
                flex.events.core.listen(
                    flex.registry.events.ui.window.maximize.GROUP,
                    flex.registry.events.ui.window.maximize.MAXIMIZED,
                    function (params) {
                        return coreEvents.onRefreshByParent(params.container, container, flex.registry.events.ui.window.maximize.MAXIMIZED);
                    },
                    settings.STATE_STORAGE + id,
                    false
                );
                flex.events.core.listen(
                    flex.registry.events.ui.window.maximize.GROUP,
                    flex.registry.events.ui.window.maximize.RESTORED,
                    function (params) {
                        return coreEvents.onRefreshByParent(params.container, container, flex.registry.events.ui.window.maximize.RESTORED);
                    },
                    settings.STATE_STORAGE + id,
                    false
                );
            },
            onRefreshByParent: function (parent, container, state) {
                if (parent === container) {
                    switch (state) {
                        case flex.registry.events.ui.window.maximize.MAXIMIZED:
                            flex.overhead.objecty.set(container, settings.STATE_STORAGE, true, true);
                            break;
                        case flex.registry.events.ui.window.maximize.RESTORED:
                            flex.overhead.objecty.set(container, settings.STATE_STORAGE, false, true);
                            break;
                    }
                }
                return false;
            }
        };
        patterns        = {
            attach: function () {
                flex.events.core.listen(flex.registry.events.ui.patterns.GROUP, flex.registry.events.ui.patterns.MOUNTED, function (nodes) {
                    var context = nodes.length !== void 0 ? (nodes.length > 0 ? nodes[0].parentNode : null) : null;
                    if (context !== null) {
                        if (_node('*[' + settings.CONTAINER + ']:not([' + settings.INITED + '])', false, context).target !== null) {
                            init();
                        }
                    }
                });
            }
        };
        privates = {
            init : init
        };
        render.global.attach();
        patterns.attach();
        //Init modules
        if (flex.libraries !== void 0) {
            if (flex.libraries.events !== void 0 && flex.libraries.html !== void 0) {
                flex.libraries.events.create();
                flex.libraries.html.create();
            }
        }
        return {
            init : privates.init
        };
    };
    //=== HTML tools module ===
    Html.prototype          = function () {
        var select      = null,
            find        = null,
            privates    = null,
            sizes       = null,
            scroll      = null,
            builder     = null,
            styles      = null,
            position    = null,
            units       = null,
            helpers     = null,
            callers     = null,
            settings    = null;
        settings    = {
            storage : {
                GROUP           : 'flex.html',
                SCROLL          : 'scroll',
                CUSTOM_STYLES   : 'custom.styles'
            },
            classes : {
                scroll: {
                    MINIMAL_WIDTH   : 15,
                    MINIMAL_HEIGHT  : 15
                }
            }
        };
        select      = {
            bySelector  : function (){
                var protofunction       = function () { };
                protofunction.prototype = (function () {
                    var cache       = null,
                        privates    = null;
                    cache = {
                        data    : {},
                        get     : function (selector) {
                            var data = cache.data;
                            return (data[selector] !== void 0 ? data[selector] : null);
                        },
                        add     : function (selector, nodes) {
                            var data = cache.data;
                            data[selector] = nodes;
                            return nodes;
                        },
                        remove  : function (selector) {
                            var data = cache.data;
                            data[selector] = null;
                            delete data[selector];
                        },
                        reset   : function () {
                            cache.data = {};
                        }
                    };
                    function first(selector, document_link) {
                        if (typeof selector === 'string') {
                            return (document_link || document).querySelector(selector);
                        }
                        return null;
                    };
                    function all(selector, document_link) {
                        if (typeof selector === 'string') {
                            return (document_link || document).querySelectorAll(selector);
                        }
                        return null;
                    };
                    function cachedFirst(selector, document_link) {
                        var nodes = null;
                        if (typeof selector === 'string') {
                            nodes = cache.get(selector);
                            if (nodes === null) {
                                nodes = cache.add((document_link || document).querySelector(selector));
                            }
                            return nodes;
                        }
                        return null;
                    };
                    function cachedAll(selector, document_link) {
                        var nodes = null;
                        if (typeof selector === 'string') {
                            nodes = cache.get(selector);
                            if (nodes === null) {
                                nodes = cache.add((document_link || document).querySelectorAll(selector));
                            }
                            return nodes;
                        }
                        return null;
                    };
                    privates = {
                        first       : first,
                        all         : all,
                        cachedFirst : cachedFirst,
                        cachedAll   : cachedAll,
                        cacheReset  : cache.reset,
                        cacheRemove : cache.remove
                    };
                    return {
                        first       : privates.first,
                        all         : privates.all,
                        cachedFirst : privates.cachedFirst,
                        cachedAll   : privates.cachedAll,
                        cacheReset  : privates.cacheReset,
                        cacheRemove : privates.cacheRemove
                    };
                }());
                return new protofunction();
            },
            fromParent  : function () {
                var protofunction = function () {
                    this.selector = select.bySelector();
                };
                protofunction.prototype = {
                    selector    : null,
                    select      : function (parent, selector, only_first) {
                        var id      = flex.unique(),
                            nodes   = null,
                            id_attr = "data-" + id;
                        if (typeof parent.nodeName === "string") {
                            parent.setAttribute(id_attr, id);
                            nodes = this.selector[(only_first === false ? 'all' : 'first')](parent.nodeName + '[' + id_attr + '="' + id + '"] ' + selector);
                            parent.removeAttribute(id_attr);
                        }
                        return nodes;
                    },
                    first       : function (parent, selector) {
                        return this.select(parent, selector, true);
                    },
                    all         : function (parent, selector) {
                        return this.select(parent, selector, false);
                    }
                };
                return Object.freeze(new protofunction());
            },
        };
        find        = function () { 
            var protofunction = function () { };
            protofunction.prototype = {
                childByAttr : function (parent, nodeName, attribute) {
                    var result_node = null,
                        nodeName    = nodeName.toLowerCase(),
                        self        = this;
                    if (parent.childNodes !== void 0) {
                        if (typeof parent.childNodes.length === "number") {
                            Array.prototype.forEach.call(
                                parent.childNodes,
                                function (childNode) {
                                    if (typeof childNode.nodeName === "string") {
                                        if (childNode.nodeName.toLowerCase() === nodeName || nodeName === "*") {
                                            if (typeof childNode.getAttribute === "function") {
                                                if (attribute.value !== null) {
                                                    if (childNode.getAttribute(attribute.name) === attribute.value) {
                                                        return childNode;
                                                    }
                                                } else {
                                                    if (childNode.hasAttribute(attribute.name) === true) {
                                                        return childNode;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    result_node = self.childByAttr(childNode, nodeName, attribute);
                                    if (result_node !== null) {
                                        return result_node;
                                    }
                                }
                            );
                        }
                    }
                    return null;
                },
                childByType : function (parent, nodeName) {
                    var result_node = null,
                        nodeName    = nodeName.toLowerCase(),
                        self        = this;
                    if (parent.childNodes !== void 0) {
                        if (typeof parent.childNodes.length === "number") {
                            Array.prototype.forEach.call(
                                parent.childNodes,
                                function (childNode) {
                                    if (typeof childNode.nodeName === "string") {
                                        if (childNode.nodeName.toLowerCase() === nodeName) {
                                            return childNode;
                                        }
                                    }
                                }
                            );
                            Array.prototype.forEach.call(
                                parent.childNodes,
                                function (childNode) {
                                    result_node = self.childByType(childNode, nodeName);
                                    if (result_node !== null) {
                                        return result_node;
                                    }
                                }
                            );
                        }
                    }
                    return null;
                },
                parentByAttr: function (child, attribute) {
                    if (child !== void 0 && attribute !== void 0) {
                        if (child.parentNode !== void 0) {
                            if (child.parentNode !== null) {
                                if (typeof child.parentNode.getAttribute === 'function') {
                                    if (attribute.value !== null) {
                                        if (child.parentNode.getAttribute(attribute.name) === attribute.value) {
                                            return child.parentNode;
                                        } else {
                                            return this.parentByAttr(child.parentNode, attribute);
                                        }
                                    } else {
                                        if (child.parentNode.getAttribute(attribute.name) !== null) {
                                            return child.parentNode;
                                        } else {
                                            return this.parentByAttr(child.parentNode, attribute);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return null;
                }
            };
            return new protofunction();
        };
        sizes       = function () {
            var protofunction       = function () { };
            protofunction.prototype = {
                nodeByClientRectSize    : function (node){
                    var height                  = 0,
                        width                   = 0,
                        bounding_client_rect    = null;
                    if (node.getBoundingClientRect !== void 0) {
                        bounding_client_rect    = node.getBoundingClientRect();
                        height                  = bounding_client_rect.bottom - bounding_client_rect.top;
                        width                   = bounding_client_rect.right - bounding_client_rect.left;
                    }
                    return { height: height, width: width }
                },
                nodeByOffset            : function (node) {
                    var height  = 0,
                        width   = 0;
                    if (node.offsetHeight !== void 0) {
                        height  = node.offsetHeight;
                        width   = node.offsetWidth;
                    }
                    return { height: height, width: width }
                },
                nodeWithMargin          : function (node) {
                    var height      = 0,
                        width       = 0,
                        selector    = null,
                        size        = this.node(node),
                        top, bottom, right, left,
                        b_top, b_bottom, b_right, b_left;
                    if (typeof node === 'string') {
                        selector    = select.bySelector();
                        node        = selector.first(node);
                        selector    = null;
                    }
                    if (node !== null) {
                        top         = parseInt(document.defaultView.getComputedStyle(node).marginTop,           10);
                        bottom      = parseInt(document.defaultView.getComputedStyle(node).marginBottom,        10);
                        right       = parseInt(document.defaultView.getComputedStyle(node).marginRight,         10);
                        left        = parseInt(document.defaultView.getComputedStyle(node).marginLeft,          10);
                        b_top       = parseInt(document.defaultView.getComputedStyle(node).borderTopWidth,      10);
                        b_bottom    = parseInt(document.defaultView.getComputedStyle(node).borderBottomWidth,   10);
                        b_right     = parseInt(document.defaultView.getComputedStyle(node).borderRightWidth,    10);
                        b_left      = parseInt(document.defaultView.getComputedStyle(node).borderLeftWidth,     10);
                        if (top         === null || top         === NaN) { top          = 0; }
                        if (bottom      === null || bottom      === NaN) { bottom       = 0; } 
                        if (right       === null || right       === NaN) { right        = 0; }
                        if (left        === null || left        === NaN) { left         = 0; }
                        if (b_top       === null || b_top       === NaN) { b_top        = 0; }
                        if (b_bottom    === null || b_bottom    === NaN) { b_bottom     = 0; }
                        if (b_right     === null || b_right     === NaN) { b_right      = 0; }
                        if (b_left      === null || b_left      === NaN) { b_left       = 0; }
                    }
                    return {
                        height  : size.height + top + bottom + b_top + b_bottom,
                        width   : size.width + right + left + b_right + b_left
                    }
                },
                node                    : function (node) {
                    var height      = 0,
                        width       = 0,
                        selector    = null,
                        size        = { height : 0, width : 0 };
                    if (typeof node === 'string') {
                        selector    = select.bySelector();
                        node        = selector.first(node);
                        selector    = null;
                    }
                    if (node !== null) {
                        size = this.nodeByClientRectSize(node);
                        if (size.height === 0 && size.width === 0) {
                            size = this.nodeByOffset(node);
                        }
                    }
                    return size;
                },
                window                  : function () {
                    if (self.innerHeight) {
                        return {
                            height  : self.innerHeight,
                            width   : self.innerWidth
                        };
                    } else if (document.documentElement && document.documentElement.clientHeight) {
                        return {
                            height  : document.documentElement.clientHeight,
                            width   : document.documentElement.clientWidth
                        };
                    }
                    else if (document.body) {
                        return {
                            height  : document.body.clientHeight,
                            width   : document.body.clientWidth
                        };
                    }
                    return null;
                },
                image                   : function (image) {
                    function generateSize(image) {
                        var imageObj    = new Image(),
                            size        = null;
                        imageObj.src = image.src;
                        size = {
                            width   : imageObj.width,
                            height  : imageObj.height
                        };
                        imageObj = null;
                        return size;
                    };
                    if (image !== void 0) {
                        if (typeof image.naturalWidth === 'number') {
                            return {
                                width   : image.naturalWidth,
                                height  : image.naturalHeight
                            }
                        } else {
                            return generateSize(image);
                        }
                    }
                    return null;
                },
            };
            return new protofunction();
        };
        scroll      = function () {
            var protofunction       = function () { };
            protofunction.prototype = {
                window          : function () {
                    var body = document.body,
                        html = document.documentElement;
                    return {
                        top     : function () {
                            return Math.max(
                                body.scrollTop      || 0,
                                html.scrollTop      || 0,
                                body.pageYOffset    || 0,
                                html.pageYOffset    || 0,
                                window.pageYOffset  || 0
                            );
                        },
                        left    : function () {
                            return Math.max(
                                body.scrollLeft     || 0,
                                html.scrollLeft     || 0,
                                body.pageXOffset    || 0,
                                html.pageXOffset    || 0,
                                window.pageXOffset  || 0
                            );
                        },
                        height  : function () {
                            return Math.max(
                                body.scrollHeight || 0,
                                body.offsetHeight || 0,
                                html.clientHeight || 0,
                                html.scrollHeight || 0,
                                html.offsetHeight || 0
                            );
                        },
                        width   : function () {
                            return Math.max(
                                body.scrollWidth || 0,
                                body.offsetWidth || 0,
                                html.clientWidth || 0,
                                html.scrollWidth || 0,
                                html.offsetWidth || 0
                            );
                        },
                    };
                },
                get             : function (object) {
                    if (object !== document.body && object !== document.documentElement) {
                        return {
                            top     : function () {
                                return Math.max(
                                    object.scrollTop    || 0,
                                    object.pageYOffset  || 0
                                );
                            },
                            left    : function () {
                                return Math.max(
                                    object.scrollLeft   || 0,
                                    object.pageXOffset  || 0
                                );
                            },
                            height  : function () {
                                return Math.max(
                                    object.scrollHeight || 0,
                                    object.clientHeight || 0,
                                    object.offsetHeight || 0
                                );
                            },
                            width   : function () {
                                return Math.max(
                                    object.scrollWidth || 0,
                                    object.clientWidth || 0,
                                    object.offsetWidth || 0
                                );
                            }
                        };
                    } else {
                        return this.window();
                    }

                },
                scrollBarSize   : function () {
                    function getSize() {
                        var node    = document.createElement("DIV"),
                            css     = styles(),
                            result  = null;
                        css.apply(
                            node,
                            {
                                position    : 'absolute',
                                top         : '-1000px',
                                left        : '-1000px',
                                width       : '300px',
                                height      : '300px',
                                overflow    : 'scroll',
                                opacity     : '0.01',
                            }
                        );
                        document.body.appendChild(node);
                        result = {
                            width   : node.offsetWidth  - node.clientWidth,
                            height  : node.offsetHeight - node.clientHeight
                        };
                        result.probablyMobile   = (result.width     === 0 ? true : false);
                        result.width            = (result.width     === 0 ? settings.classes.scroll.MINIMAL_WIDTH   : result.width  );
                        result.height           = (result.height    === 0 ? settings.classes.scroll.MINIMAL_HEIGHT  : result.height );
                        document.body.removeChild(node);
                        return result;
                        /*
                        Здесь проблемное место. Дело в том, что на таблетках полоса проктутки накладывается на содержимое страницы.
                        Это приводит к тому, что метод определения ширины полосы путем вычетания из общего размера области размера 
                        содержимого не дает результатов, так как полоса прокрутки над содержимым и не "уменьшает" его. Но а найти
                        на момент написания этого комментрия сколь нибудь достойных решений по определению размера полосы прокрутки
                        на таблетках - не удалось. Поэтому и берется фиксированный размер в 15 пк. 
                        23.01.2014
                        */
                    };
                    var storaged = flex.overhead.globaly.get(settings.storage.GROUP, settings.storage.SCROLL, {});
                    if (!storaged.value) {
                        storaged.value = getSize();
                    }
                    return storaged.value;
                }
            };
            return new protofunction();
        };
        builder     = function () {
            var protofunction = function () { };
            protofunction.prototype = {
                build: function (attributes) {
                    function settingup(attributes, nodes) {
                        var parent = nodes[attributes.settingup.parent] || null;
                        if (typeof attributes.settingup === "object" && nodes !== null && parent !== null) {
                            Array.prototype.forEach.call(
                                attributes.settingup.childs,
                                function (child) {
                                    if (nodes[child]) {
                                        if (typeof attributes[child].settingup === "object") {
                                            parent.appendChild(nodes[child][attributes[child].settingup.parent]);
                                        } else {
                                            parent.appendChild(nodes[child]);
                                        }
                                    }
                                }
                            );
                        }
                    };
                    function make(attribute) {
                        var node = document.createElement(attribute.node);
                        if (attribute.html !== null) {
                            node.innerHTML = attribute.html;
                        }
                        Array.prototype.forEach.call(
                            attribute.attrs,
                            function (attr) {
                                if (flex.oop.objects.validate(attr, [   { name: "name",     type: "string" },
                                                                        { name: "value",    type: "string" }]) === true) {
                                    node.setAttribute(attr.name, attr.value);
                                }
                            }
                        );
                        return node;
                    };
                    function validate(property) {
                        return flex.oop.objects.validate(property, [{ name: "node",     type: "string"              },
                                                                    { name: "attrs",    type: "array",  value: []   },
                                                                    { name: "html",     type: "string", value: null }]);
                    };
                    var nodes = {};
                    try {
                        if (validate(attributes) === true) {
                            return make(attributes);
                        } else {
                            for (var property in attributes) {
                                if (validate(attributes[property]) === true) {
                                    nodes[property] = make(attributes[property]);
                                } else {
                                    if (typeof attributes[property] === "object" && property !== "settingup") {
                                        nodes[property] = this.build(attributes[property]);
                                        if (nodes[property] === null) {
                                            return null;
                                        }
                                    }
                                }
                            }
                            settingup(attributes, nodes);
                        }
                    } catch (e) {
                        return null;
                    }
                    return nodes;
                }
            };
            return new protofunction();
        };
        styles      = function () {
            var protofunction       = function () { };
            protofunction.prototype = {
                apply           : function (node, styles) {
                    if (node && typeof styles === 'object') {
                        if (node.style) {
                            for (var property in styles) {
                                node.style[property] = styles[property];
                            }
                            return true;
                        }
                    }
                    return false;
                },
                redraw          : function (node){
                    if (node){
                        if (node.style !== void 0) {
                            node.style.display = 'none';
                            node.style.display = '';
                            return true;
                        }
                    }
                    return false;
                },
                getRuleFromSheet: function (sheet, selector) {
                    /// <summary>
                    /// Get rule from CSS for defined selector
                    /// </summary>
                    /// <param name="sheet"     type="sheet"    >CSS sheet</param>
                    /// <param name="selector"  type="string"   >CSS selector</param>
                    /// <returns type="array">Rules for selector</returns>
                    var sheets  = document.styleSheets,
                        styles  = null,
                        rules   = [];
                    try {
                        selector = selector.replace(/['"]/gi, '|');
                        Array.prototype.forEach.call(
                            (sheet.cssRules || sheet.rules),
                            function (rule, index) {
                                if (rule.selectorText) {
                                    if (rule.selectorText.replace(/['"]/gi, '|') === selector) {
                                        rules.push({
                                            rule    : rule,
                                            style   : rule.style || null,
                                            index   : index,
                                            cssText : (rule.cssText || '')
                                        });
                                    }
                                } else if (typeof rule.cssText === 'string') {
                                    if (rule.cssText.indexOf(selector.toLowerCase()) === 0) {
                                        rules.push({
                                            rule    : rule,
                                            style   : rule.style || null,
                                            index   : index,
                                            cssText : (rule.cssText || '')
                                        });
                                    }
                                }
                            }
                        );
                    } catch (e) {
                    } finally {
                        return rules.length > 0 ? rules : null;
                    }
                },
                getRule         : function (selector) {
                    /// <summary>
                    /// Get rule from CSS for defined selector
                    /// </summary>
                    /// <param name="selector"  type="string"   >CSS selector</param>
                    /// <returns type="array">Rules for selector</returns>
                    var sheets  = document.styleSheets,
                        styles  = null,
                        rules   = [],
                        self    = this;
                    try {
                        selector = selector.replace(/['"]/gi, '|');
                        Array.prototype.forEach.call(
                            document.styleSheets,
                            function (sheet) {
                                var result = self.getRuleFromSheet(sheet, selector);
                                if (result !== null) {
                                    rules = rules.concat(result);
                                }
                            }
                        );
                    } catch (e) {
                    } finally {
                        return rules.length > 0 ? rules : null;
                    }
                },
                setRule         : function (selector, cssText) {
                    var sheet = flex.overhead.globaly.get(settings.storage.GROUP, settings.storage.CUSTOM_STYLES);
                    if (typeof cssText === 'string') {
                        if (sheet === null) {
                            sheet       = document.createElement("style");
                            sheet.type  = "text/css";
                            document.head.appendChild(sheet);
                            sheet       = sheet.styleSheet || sheet.sheet;
                            flex.overhead.globaly.set(settings.storage.GROUP, settings.storage.CUSTOM_STYLES, sheet);
                        }
                        if (sheet.insertRule) {
                            sheet.insertRule(selector + ' {' + cssText + '}', sheet.cssRules.length);
                            return {
                                rule    : sheet.cssRules[sheet.cssRules.length - 1],
                                index   : sheet.cssRules.length - 1,
                                sheet   : sheet
                            };
                        } else if (sheet.addRule) {
                            sheet.addRule(selector + ' {' + cssText + '}', -1);
                            return {
                                rule    : sheet.cssRules[sheet.cssRules.length - 1],
                                index   : sheet.cssRules.length - 1,
                                sheet   : sheet
                            };
                        }
                    }
                    return null;
                },
                updateRule      : function (sheet, rule, cssText) {
                    var selector = rule.selectorText;
                    this.deleteRule(sheet, rule);
                    return this.setRule(selector, cssText);
                },
                deleteRule      : function (sheet, target, deep) {
                    function getIndex(self, target, sheet, deep) {
                        var result = null;
                        if (target !== void 0) {
                            if (typeof target === 'string') {
                                //selector
                                if (deep === false && sheet !== null) {
                                    result = self.getRuleFromSheet(sheet, target);
                                } else {
                                    result = self.getRule(target);
                                }
                                if (result !== null) {
                                    if (result.length === 1) {
                                        return result[0].index;
                                    }
                                }
                            } else if (typeof target === 'number') {
                                //index
                                return target;
                            } else if (typeof target === 'object') {
                                //rule object
                                if (sheet !== null) {
                                    return self.getRuleIndex(sheet, target);
                                }
                            }
                        }
                        return -1;
                    };
                    var sheet   = sheet || flex.overhead.globaly.get(settings.storage.GROUP, settings.storage.CUSTOM_STYLES),
                        deep    = typeof deep === 'boolean' ? deep : true,
                        index   = getIndex(this, target, sheet, deep);
                    if (index !== -1 && sheet !== null) {
                        if (sheet.deleteRule) {
                            sheet.deleteRule(index);
                            return true;
                        } else if (sheet.removeRule) {
                            sheet.removeRule(index);
                            return true;
                        }
                    }
                    return null
                },
                getRuleIndex    : function (sheet, rule){
                    var index = -1;
                    try{
                        Array.prototype.forEach.call(
                            sheet.cssRules,
                            function(_rule, rule_index){
                                if (_rule === rule){
                                    index = rule_index;
                                    throw 'found';
                                }
                            }
                        );
                    }catch(e){
                        if (e === 'found'){
                            return index;
                        }
                    }
                    return -1;
                },
                addClass        : function (node, name) {
                    if (node.className !== void 0) {
                        if (node.className.search(name) === -1) {
                            node.className += name;
                        }
                    }
                },
                removeClass     : function (node, name) {
                    if (node.className !== void 0) {
                        if (node.className.search(name) !== -1) {
                            node.className = node.className.replace(name, '');
                        }
                    }
                },
            };
            return new protofunction();
        };
        position    = function () {
            var protofunction = function () { };
            protofunction.prototype = (function () {
                var tools       = null,
                    byPage      = null,
                    byWindow    = null,
                    privates    = null;
                position = {
                    old     : function (node) {
                        var top     = 0,
                            left    = 0;
                        while (node) {
                            if (node.offsetTop !== void 0 && node.offsetLeft !== void 0) {
                                top     += parseFloat(node.offsetTop    );
                                left    += parseFloat(node.offsetLeft   );
                            }
                            node = node.offsetParent;
                        }
                        return {
                            top : top,
                            left: left
                        };
                    },
                    modern  : function (node) {
                        var box                 = null,
                            objBody             = null,
                            objDocumentElement  = null,
                            scrollTop           = null,
                            scrollLeft          = null,
                            clientTop           = null,
                            clientLeft          = null;
                        box                 = node.getBoundingClientRect();
                        objBody             = document.body;
                        objDocumentElement  = document.documentElement;
                        scrollTop           = window.pageYOffset || objDocumentElement.scrollTop || objBody.scrollTop;
                        scrollLeft          = window.pageXOffset || objDocumentElement.scrollLeft || objBody.scrollLeft;
                        clientTop           = objDocumentElement.clientTop || objBody.clientTop || 0;
                        clientLeft          = objDocumentElement.clientLeft || objBody.clientLeft || 0;
                        return {
                            top : box.top + scrollTop - clientTop,
                            left: box.left + scrollLeft - clientLeft
                        };
                    }
                };
                byPage      = function (node) {
                    var top             = null,
                        left            = null,
                        box             = null,
                        offset          = null,
                        scrollTop       = null,
                        scrollLeft      = null;
                    try {
                        box     = node.getBoundingClientRect();
                        top     = box.top;
                        left    = box.left;
                    } catch (e) {
                        offset          = position.old(node);
                        scrollTop       = window.pageYOffset || objDocumentElement.scrollTop || objBody.scrollTop;
                        scrollLeft      = window.pageXOffset || objDocumentElement.scrollLeft || objBody.scrollLeft;
                        top             = offset.top - scrollTop;
                        left            = offset.left - scrollLeft;
                    } finally {
                        return {
                            top : top,
                            left: left
                        };
                    }
                };
                byWindow    = function (node) {
                    var result = null;
                    try {
                        result = position.modern(node);
                    } catch (e) {
                        result = position.old(node);
                    } finally {
                        return result;
                    }
                };
                privates    = {
                    byPage      : byPage,
                    byWindow    : byWindow
                };
                return {
                    byPage  : privates.byPage,
                    byWindow: privates.byWindow,
                }
            }());
            return new protofunction();
        };
        units       = function () { 
            var protofunction       = function () { };
            protofunction.prototype = {
                em  : function (context) {
                    context = context || document.documentElement;
                    context = context.parentNode ? context : document.documentElement;
                    return parseFloat(getComputedStyle(context).fontSize);
                },
                rem : function () {
                    this.em(document.documentElement);
                },
            };
            return new protofunction();
        };
        helpers     = {
            validateNode: function (node) {
                var selector = null;
                if (node) {
                    if (typeof node === 'string') {
                        selector    = select.bySelector();
                        node        = selector.first(node);
                    }
                    if (node !== null) {
                        if (node.parentNode !== void 0) {
                            return node;
                        }
                    }
                }
                return null;
            },
            appendChilds: function (parent, childs) {
                for (var index = childs.length - 1; index >= 0; index -= 1) {
                    parent.appendChild(childs[0]);
                }
            }
        };
        callers     = {
            init: function () {
                function SizeClass      () { if (_size      === null) { _size       = sizes             (); } };
                function PositionClass  () { if (_position  === null) { _position   = position          (); } };
                function StylesClass    () { if (_styles    === null) { _styles     = styles            (); } };
                function ScrollClass    () { if (_scroll    === null) { _scroll     = scroll            (); } };
                function FindClass      () { if (_find      === null) { _find       = find              (); } };
                function SelectorClass  () { if (_selector  === null) { _selector   = select.fromParent (); } };
                var _size       = null,
                    _position   = null,
                    _styles     = null,
                    _scroll     = null,
                    _find       = null,
                    _selector   = null;
                //_node
                flex.callers.define.node('html.size.get',                   function () {
                    SizeClass();
                    return _size.node(this.target);
                });
                flex.callers.define.node('html.size.getWithMargin',         function () {
                    SizeClass();
                    return _size.nodeWithMargin(this.target);
                });
                flex.callers.define.node('html.size.getByClientRectSize',   function () {
                    SizeClass();
                    return _size.nodeByClientRectSize(this.target);
                });
                flex.callers.define.node('html.size.getByOffset',           function () {
                    SizeClass();
                    return _size.nodeByOffset(this.target);
                });
                flex.callers.define.node('html.position.byPage',            function () {
                    PositionClass();
                    return _position.byPage(this.target);
                });
                flex.callers.define.node('html.position.byWindow',          function () {
                    PositionClass();
                    return _position.byWindow(this.target);
                });
                flex.callers.define.node('html.styles.apply',               function (styles) {
                    StylesClass();
                    return _styles.apply(this.target, styles);
                });
                flex.callers.define.node('html.styles.redraw',              function () {
                    StylesClass();
                    return _styles.redraw(this.target);
                });
                flex.callers.define.node('html.styles.addClass',            function (class_name) {
                    StylesClass();
                    return _styles.addClass(this.target, class_name);
                });
                flex.callers.define.node('html.styles.removeClass',         function (class_name) {
                    StylesClass();
                    return _styles.removeClass(this.target, class_name);
                });
                flex.callers.define.node('html.scroll.position',            function () {
                    ScrollClass();
                    return _scroll.get(this.target);
                });
                flex.callers.define.node('html.find.childByAttr',           function (node_name, attribute) {
                    FindClass();
                    return _find.childByAttr(this.target, node_name, attribute);
                });
                flex.callers.define.node('html.find.childByType',           function (node_name) {
                    FindClass();
                    return _find.childByType(this.target, node_name);
                });
                flex.callers.define.node('html.find.parentByAttr',          function (attribute) {
                    FindClass();
                    return _find.parentByAttr(this.target, attribute);
                });
                flex.callers.define.node('html.find.node',                  function (selector) {
                    SelectorClass();
                    return _selector.first(this.target, selector);
                });
                flex.callers.define.node('html.find.nodes',                 function (selector) {
                    SelectorClass();
                    return _selector.all(this.target, selector);
                });
                //_nodes
                flex.callers.define.nodes('html.size.get',                   function () {
                    var result = [];
                    SizeClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_size.node(target));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.size.getWithMargin',         function () {
                    var result = [];
                    SizeClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_size.nodeWithMargin(target));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.size.getByClientRectSize',   function () {
                    var result = [];
                    SizeClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_size.nodeByClientRectSize(target));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.size.getByOffset',           function () {
                    var result = [];
                    SizeClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_size.nodeByOffset(target));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.position.byPage',            function () {
                    var result = [];
                    PositionClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_position.byPage(target));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.position.byWindow',          function () {
                    var result = [];
                    PositionClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_position.byWindow(target));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.styles.apply',               function (styles) {
                    var result = [];
                    StylesClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_styles.apply(target, styles));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.styles.redraw',              function () {
                    var result = [];
                    StylesClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_styles.redraw(target));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.styles.addClass',            function (class_name) {
                    var result = [];
                    StylesClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_styles.addClass(target, class_name));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.styles.removeClass',         function (class_name) {
                    var result = [];
                    StylesClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_styles.removeClass(target, class_name));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.scroll.position',            function () {
                    var result = [];
                    ScrollClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_scroll.get(target));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.find.childByAttr',           function (node_name, attribute) {
                    var result = [];
                    FindClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_find.childByAttr(target, node_name, attribute));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.find.childByType',           function (node_name) {
                    var result = [];
                    FindClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_find.childByType(target, node_name));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.find.parentByAttr',          function (attribute) {
                    var result = [];
                    FindClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(_find.parentByAttr(target, attribute));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.find.node',                  function (selector) {
                    var result = [];
                    SelectorClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(selector.first(target, selector));
                    });
                    return result;
                });
                flex.callers.define.nodes('html.find.nodes',                 function (selector) {
                    var result = [];
                    SelectorClass();
                    Array.prototype.forEach.call(this.target, function (target) {
                        result.push(selector.all(target, selector));
                    });
                    return result;
                });
            }
        };
        //Initialization of callers
        callers.init();
        //Public part
        privates    = {
            select  : {
                bySelector  : select.bySelector,
                fromParent  : select.fromParent
            },
            find    : find,
            size    : sizes,
            scroll  : scroll,
            builder : builder,
            styles  : styles,
            position: position,
            units   : units,
            helpers : helpers
        };
        return {
            select      : {
                bySelector: privates.select.bySelector,
                fromParent: privates.select.fromParent
            },
            find        : privates.find,
            size        : privates.size,
            scroll      : privates.scroll,
            builder     : privates.builder,
            styles      : styles,
            position    : privates.position,
            units       : units,
            helpers     : privates.helpers
        };
    };
    //=== Core module ===
    //Define class
    Core.prototype          = function () {
        var config          = {},
            options         = {},
            ajax            = {},
            events          = {},
            oop             = {},
            privates        = {},
            hashes          = {},
            overhead        = {},
            parsing         = {},
            system          = {},
            IDs             = {},
            wrappers        = {},
            logs            = {};
        config          = {
            settings: {
                /// <field type = 'boolean'>True - in all parsed CSS files will be done correction of paths (path like this "../step/step/some.some" will be corrected to "fullpath/step/step/some.some"</field>
                CHECK_PATHS_IN_CSS  : true,
                //'CRITICAL', 'LOGICAL', 'WARNING', 'NOTIFICATION', 'LOGS', 'KERNEL_LOGS'
                SHOWN_LOGS          : ['CRITICAL', 'LOGICAL', 'WARNING']
            },
            get     : function () {
                var _config = config.settings;
                return _config;
            },
            set     : function (_config) {
                for (var key in _config) {
                    if (config.settings[key] !== void 0 && typeof config.settings[key] === typeof _config[key]) {
                        config.settings[key] = _config[key];
                    }
                }
            }
        };
        options         = {
            storage     : {
                GROUP   : 'flex.core',
            },
            resources   : {
                types   : {
                    CSS: '.css',
                    JS: '.js',
                }
            },
            regs        : {
                urls    : {
                    PARAMS          : /\?.*/gi,
                    EXTENSION       : /(\.[\w\n]*)$/gi,
                    JS_URL          : /[\w]*:\/\/[\w\n:\/\.]*\.js/gi,
                    NOT_URL_SYMBOLS : /[\s\t\n\r]/gi,
                    JS_EXP_IN_URL   : /\.js$/gi,
                    CSS_EXP_IN_URL  : /\.css$/gi
                }
            },
            hashes      : {
                LOCAL_STORAGE_NAME : 'flex.hash.storage'
            },
            files       : {
                CORE    : 'patterns.js', //This is default value, will be apply in case of fail auto-detection
                CORE_URL: '',
                detect  : function () {
                    function accept(url) {
                        url = system.url.parse(url.toLowerCase());
                        options.files.CORE = url.target;
                        options.files.CORE_URL = url.url;
                        url = url.path;
                        return url;
                    };
                    var url     = system.resources.js.getCurrentSRC(),
                        script  = null;
                    if (url !== null) {
                        return accept(url);
                    } else {
                        script = document.querySelector('script[src*="' + options.files.CORE + '"]');
                        if (script !== null) {
                            return accept(script.src);
                        }
                    }
                    throw new Error('Cannot detect URL and PATH to core script (default name: flex.core.js)');
                }
            },
            other       : {
                STORAGE_PREFIX  : '[FLEX_SYSTEM_RESURCES]'
            }
        };
        ajax            = {
            settings    : {
                DEFAULT_TIMEOUT : 15000, //ms ==> 1000 ms = 1 s
                DEFAULT_METHOD  : 'POST',
                methods         : {
                    POST    : 'POST',
                    GET     : 'GET',
                    PUT     : 'PUT',
                    DELETE  : 'DELETE',
                    OPTIONS : 'OPTIONS',
                },
                regs            : {
                    URLENCODED  : /-urlencoded/gi,
                    JSON        : /application\/json/gi
                },
                headers         :{
                    CONTENT_TYPE    : 'Content-Type',
                    ACCEPT          : 'Accept'
                }
            },
            requests    : {
                storage     : {},
                add         : function (request) {
                    var storage = ajax.requests.storage;
                    if (storage[request.settings.id] === void 0) {
                        storage[request.settings.id] = request;
                        return true;
                    }
                    return false;
                },
                remove      : function (request) {
                    var storage = ajax.requests.storage;
                    if (storage[request.settings.id] !== void 0) {
                        storage[request.settings.id] = null;
                        delete storage[request.settings.id];
                        return true;
                    }
                    return false;
                },
                isConflict  : function (id) {
                    return ajax.requests.storage[id] === void 0 ? false : true;
                }
            },
            create      : function (url, method, parameters, callbacks, settings) {
                /// <signature>
                ///     <summary>Create XMLHttpRequest request</summary>
                ///     <param name="url"           type="string"                   >URL</param>
                ///     <returns type="object" mayBeNull="true">Instance of request</returns>
                /// </signature>
                /// <signature>
                ///     <summary>Create XMLHttpRequest request</summary>
                ///     <param name="url"           type="string"                   >URL</param>
                ///     <param name="method"        type="string" default="post"    >[optional] POST or GET. Default POST</param>
                ///     <returns type="object" mayBeNull="true">Instance of request</returns>
                /// </signature>
                /// <signature>
                ///     <summary>Create XMLHttpRequest request</summary>
                ///     <param name="url"           type="string"                   >URL</param>
                ///     <param name="method"        type="string" default="post"    >[optional] POST or GET. Default POST</param>
                ///     <param name="parameters"    type="object, string"           >[optional] Object with parameters or string of parameters</param>
                ///     <returns type="object" mayBeNull="true">Instance of request</returns>
                /// </signature>
                /// <signature>
                ///     <summary>Create XMLHttpRequest request</summary>
                ///     <param name="url"           type="string"                   >URL</param>
                ///     <param name="method"        type="string" default="post"    >[optional] POST or GET. Default POST</param>
                ///     <param name="parameters"    type="object, string"           >[optional] Object with parameters or string of parameters</param>
                ///     <param name="callbacks"     type="object"                   >[optional] Collection of callbacks [before, success, fail, reaction, timeout, headers]. </param>
                ///     <returns type="object" mayBeNull="true">Instance of request</returns>
                /// </signature>
                /// <signature>
                ///     <summary>Create XMLHttpRequest request</summary>
                ///     <param name="url"           type="string"                   >URL</param>
                ///     <param name="method"        type="string" default="post"    >[optional] POST or GET. Default POST</param>
                ///     <param name="parameters"    type="object, string"           >[optional] Object with parameters or string of parameters</param>
                ///     <param name="callbacks"     type="object"                   >[optional] Collection of callbacks [before, success, fail, reaction, timeout, headers]. </param>
                ///     <param name="settings"      type="object"                   >[optional] Settings of request. </param>
                ///     <returns type="object" mayBeNull="true">Instance of request</returns>
                /// </signature>
                var request = null,
                    Request = null;
                //Parse parameters
                url         = (typeof url       === 'string' ? url      : null);
                method      = (typeof method    === 'string' ? ([
                    ajax.settings.methods.POST,
                    ajax.settings.methods.GET,
                    ajax.settings.methods.PUT,
                    ajax.settings.methods.DELETE,
                    ajax.settings.methods.OPTIONS].indexOf(method.toUpperCase()) !== -1 ? method.toUpperCase() : ajax.settings.DEFAULT_METHOD) : ajax.settings.DEFAULT_METHOD);
                settings    = ajax.parse.settings(settings);
                parameters  = ajax.parse.parameters(parameters, settings);
                callbacks   = ajax.parse.callbacks(callbacks);
                if (url !== null) {
                    //Define class for request
                    Request             = function (url, method, parameters, callbacks, settings) {
                        this.settings           = settings;
                        this.url                = url;
                        this.method             = method;
                        this.parameters         = parameters;
                        this.callbacks          = callbacks;
                        this.timerID            = null;
                        this.response           = null;
                        this.responseHeaders    = null;
                        this.httpRequest        = null;
                    };
                    Request.prototype   = {
                        send            : function(){
                            var self = this;
                            try {
                                //Add request to journal
                                ajax.requests.add(self);
                                self.httpRequest = new XMLHttpRequest();
                                for (var event_name in self.events) {
                                    (function (event_name, self) {
                                        events.DOM.add(
                                            self.httpRequest,
                                            event_name,
                                            function (event) {
                                                return self.events[event_name](event, self);
                                            }
                                        );
                                    }(event_name, self));
                                }
                                if (self.httpRequest !== null) {
                                    self.callback(self.callbacks.before);
                                    switch (self.method) {
                                        case ajax.settings.methods.POST:
                                            self.httpRequest.open(self.method, self.url, true);
                                            self.setHeaders(self);
                                            self.httpRequest.send(self.parameters._parameters);
                                            break;
                                        case ajax.settings.methods.GET:
                                            self.httpRequest.open(self.method, self.url + (self.parameters._parameters !== '' ? '?' : '') + self.parameters._parameters, true);
                                            self.setHeaders(self);
                                            self.httpRequest.send();
                                            break;
                                        default:
                                            self.httpRequest.open(self.method, self.url, true);
                                            self.setHeaders(self);
                                            self.httpRequest.send(self.parameters._parameters);
                                            break;
                                    }
                                    //Set manual timeout
                                    self.timerID = setTimeout(
                                        function () {
                                            self.events.timeout(null, self);
                                        },
                                        self.settings.timeout
                                    );
                                    return true;
                                } else {
                                    throw 'Fail create XMLHttpRequest';
                                }
                            } catch (e) {
                                self.callback(self.callbacks.fail, e);
                                self.destroy(self);
                            }
                        },
                        setHeaders      : function(self){
                            //Set headers
                            if (self.settings.headers !== null) {
                                for (var key in self.settings.headers) {
                                    self.httpRequest.setRequestHeader(key, self.settings.headers[key]);
                                }
                            }
                        },
                        events          : {
                            readystatechange: function (event, self) {
                                if (ajax.requests.isConflict(self.settings.id) !== false) {
                                    if (event.target) {
                                        if (event.target.readyState) {
                                            self.callback(self.callbacks.reaction, event);
                                            switch (event.target.readyState) {
                                                case 2:
                                                    //Get headers
                                                    self.responseHeaders = self.parseHeaders(event.target.getAllResponseHeaders());
                                                    self.callback(self.callbacks.headers, event);
                                                    break;
                                                case 4:
                                                    //Get response
                                                    if (event.target.status === 200) {
                                                        //Success
                                                        self.response = self.parse(event.target.responseText);
                                                        self.destroy(self);
                                                        self.callback(self.callbacks.success, event);
                                                        return true;
                                                    } else {
                                                        //Fail
                                                        self.destroy(self);
                                                        self.callback(self.callbacks.fail, event);
                                                        return false;
                                                    }
                                                    break;
                                            }
                                        }
                                    }
                                }
                            },
                            timeout         : function (event, self) {
                                if (ajax.requests.isConflict(self.settings.id) !== false) {
                                    self.callback(self.callbacks.timeout, event);
                                    self.destroy(self);
                                }
                            }
                        },
                        parse           : function (response){
                            var result = {
                                    original: response,
                                    parsed  : null
                                };
                            try {
                                //Try get JSON object
                                result.parsed = JSON.parse(response);
                            } catch (e) {
                                //Do nothing
                            } finally {
                                return result;
                            }
                        },
                        parseHeaders    : function (headers) {
                            var result  = {
                                    _headers: headers,
                                    headers : {}
                                },
                                temp    = null;
                            if (typeof headers === 'string') {
                                temp = headers.split('\r\n');
                                if (temp instanceof Array) {
                                    temp.forEach(function (header) {
                                        var data = header.split(':');
                                        if (data instanceof Array) {
                                            if (data[0] !== '') {
                                                result.headers[data[0]] = header.replace(data[0] + ':', '');
                                            }
                                        }
                                    });
                                }
                            }
                            return result;
                        },
                        callback        : function (callback, event) {
                            if (callback !== null) {
                                system.handle(
                                    callback,
                                    [
                                        this.response,
                                        {
                                            id          : this.id,
                                            event       : event !== void 0 ? event : null,
                                            headers     : this.responseHeaders,
                                            response    : this.response,
                                            parameters  : this.parameters,
                                            url         : this.url,
                                            abort       : this.abort.bind(this)
                                        }
                                    ],
                                    'ajax.callback:: request ID:: ' + this.id + ' URL:: ' + this.url,
                                    this
                                );
                            }
                        },
                        abort           : function () {
                            if (this.httpRequest !== null) {
                                if (typeof this.httpRequest.abort === 'function') {
                                    this.httpRequest.abort();
                                }
                            }
                        },
                        destroy         : function (self) {
                            clearTimeout(self.timerID);
                            ajax.requests.remove(self);
                        }
                    };
                    //Create and return request
                    return new Request(url, method, parameters, callbacks, settings);
                }
                return null;
            },
            parse       : {
                settings    : function (settings){
                    var settings                        = typeof settings === 'object' ? (settings !== null ? settings : {}) : {};
                    settings.id                         = (typeof settings.id === 'string' ? settings.id : (typeof settings.id === 'number' ? settings.id : IDs.id()));
                    settings.id                         = (ajax.requests.isConflict(settings.id) === false      ? settings.id                       : IDs.id());
                    settings.timeout                    = (typeof settings.timeout                      === 'number'    ? settings.timeout                      : ajax.settings.DEFAULT_TIMEOUT);
                    settings.doNotChangeHeaders         = typeof settings.doNotChangeHeaders            === 'boolean'   ? settings.doNotChangeHeaders           : false,
                    settings.doNotChangeParameters      = typeof settings.doNotChangeParameters         === 'boolean'   ? settings.doNotChangeParameters        : false,
                    settings.doNotEncodeParametersAsURL = typeof settings.doNotEncodeParametersAsURL    === 'boolean'   ? settings.doNotEncodeParametersAsURL   : false,
                    settings.headers                    = ajax.parse.headers(settings);
                    return settings;
                },
                parameters  : function (_parameters, settings) {
                    var parameters  = _parameters,
                        params      = {},
                        str_params  = '',
                        excluded    = [],
                        encodeURI   = null;
                    if (!settings.doNotChangeParameters) {
                        if (parameters instanceof Array) {
                            //If as parameters we have string (after it was convert to array)
                            Array.prototype.forEach.call(
                                parameters,
                                function (parameter, index) {
                                    var property = null;
                                    parameters[index]   = param.replace(/^\s*\?/gi, '');
                                    property            = parameters[index].split('=');
                                    if (property instanceof Array) {
                                        if (property.length === 2) {
                                            params[property[0]] = property[1];
                                        } else {
                                            excluded.push(parameters[index]);
                                        }
                                    } else {
                                        excluded.push(parameters[index]);
                                    }
                                }
                            );
                        } else if (typeof parameters === 'object' && parameters !== null) {
                            //If as parameters we have object
                            for (var key in parameters) {
                                switch(typeof parameters[key]){
                                    case 'string':
                                        params[key] = parameters[key];
                                        break;
                                    case 'boolean':
                                        params[key] = parameters[key].toString();
                                        break;
                                    case 'number':
                                        params[key] = parameters[key].toString();
                                        break;
                                    case 'object':
                                        params[key] = JSON.stringify(parameters[key]);
                                        break;
                                    default:
                                        try{
                                            params[key] = JSON.stringify(parameters[key]);
                                        } catch (e) { }
                                        break;
                                }
                                params[key] = params[key];
                            }
                        }
                        if (typeof _parameters !== 'string') {
                            //Make parameters string
                            ajax.settings.regs.JSON.lastIndex       = 0;
                            ajax.settings.regs.URLENCODED.lastIndex = 0;
                            if (ajax.settings.regs.JSON.test(settings.headers[ajax.settings.headers.CONTENT_TYPE])) {
                                str_params = JSON.stringify(params);
                            } else {
                                encodeURI = ajax.settings.regs.URLENCODED.test(settings.headers[ajax.settings.headers.CONTENT_TYPE]);
                                encodeURI = settings.doNotEncodeParametersAsURL ? false : encodeURI;
                                for (var key in params) {
                                    str_params += '&' + key + '=' + encodeURI ? encodeURIComponent(params[key]) : params[key];
                                }
                                str_params = str_params.replace(/^\s*\&/gi, '');
                            }
                        } else {
                            str_params = _parameters;
                        }
                    } else {
                        str_params  = _parameters;
                    }
                    //Return result
                    return {
                        original    : _parameters,
                        parameters  : params,
                        _parameters : str_params,
                        excluded    : excluded
                    }
                },
                callbacks   : function (_callbacks) {
                    var callbacks = {
                        before      : null,
                        success     : null,
                        fail        : null,
                        reaction    : null,
                        timeout     : null
                    };
                    if (typeof _callbacks === 'object') {
                        if (_callbacks !== null) {
                            callbacks.before    = typeof _callbacks.before      === 'function' ? _callbacks.before      : null;
                            callbacks.success   = typeof _callbacks.success     === 'function' ? _callbacks.success     : null;
                            callbacks.fail      = typeof _callbacks.fail        === 'function' ? _callbacks.fail        : null;
                            callbacks.reaction  = typeof _callbacks.reaction    === 'function' ? _callbacks.reaction    : null;
                            callbacks.timeout   = typeof _callbacks.timeout     === 'function' ? _callbacks.timeout     : null;
                            callbacks.headers   = typeof _callbacks.headers     === 'function' ? _callbacks.headers     : null;
                        }
                    }
                    return callbacks;
                },
                headers     : function (settings) {
                    var _headers = {};
                    if (!settings.doNotChangeHeaders) {
                        if (typeof settings.headers === 'object' && settings.headers !== null) {
                            oop.objects.forEach(settings.headers, function (key, value) {
                                var parts = key.split('-');
                                parts.forEach(function (part, index) {
                                    parts[index] = part.charAt(0).toUpperCase() + part.slice(1);
                                });
                                _headers[parts.join('-')] = value;
                            });
                        }
                        //Default headers
                        if (_headers[ajax.settings.headers.CONTENT_TYPE] === void 0) {
                            _headers[ajax.settings.headers.CONTENT_TYPE] = 'application/x-www-form-urlencoded';
                        }
                        if (_headers[ajax.settings.headers.ACCEPT] === void 0) {
                            _headers[ajax.settings.headers.ACCEPT] = '*/*';
                        }
                    } else {
                        _headers = typeof settings.headers === 'object' ? (settings.headers !== null ? settings.headers : {}) : {};
                    }
                    settings.headers = _headers;
                    return settings.headers;
                }
            },
        };
        oop             = {
            classes     : {
                of      : function (object) {
                    /// <summary>
                    /// Returns class's name of object. 
                    /// </summary>
                    /// <param name="object" type="Object">Object</param>
                    /// <returns type="String">Name of class</returns>
                    if (object === null) return null;
                    if (object === void 0) return null;
                    return Object.prototype.toString.call(object).slice(8, -1);
                },
                create  : function (parameters) {
                    ///     <summary>
                    ///         Create instance of class with closed variables
                    ///     </summary>
                    ///     <param name="parameters"    type="object">Parameters of class:  &#13;&#10;
                    ///     {   [function]              constr,                             &#13;&#10;
                    ///         [function]              parent                              &#13;&#10;
                    ///         [object]                privates,                           &#13;&#10;
                    ///         [function || object]    prototype                           &#13;&#10;
                    ///     }</param>
                    ///     <returns type="object">Instance of class</returns>
                    /*
                    =============EXAMPLE=============
                        pattern = flex.oop.classes.create({
                            constr      : function () {
                                this.one = 'one';
                            },
                            parent      : [function],
                            privates    : {
                                two         : 'two',
                                three       : 'three',
                                __instance  : instance //--> automaticaly attached: instance of class
                            },
                            prototype   : function (privates) {
                                var self        = this,         //->one
                                    privates    = privates;     //->two; ->three
                                var show = function () {
                                    alert(self.one);
                                    alert(privates.two);
                                    alert(privates.three);
                                };
                                return {
                                    show : show
                                };
                            }
                        });
                    =============EXAMPLE=============
                    Parameter [parent] also allows to identify instance within instance of.
                    */
                    var constr          = typeof parameters.constr          === 'function'  ? parameters.constr         : null,
                        parent          = typeof parameters.parent          === 'function'  ? parameters.parent         : null,
                        privates        = parameters.privates               !== void 0      ? parameters.privates       : {},
                        prototype       = parameters.prototype              !== void 0      ? parameters.prototype      : {},
                        instance        = null,
                        temp            = null,
                        proto           = null;
                    if (!(this instanceof oop.classes.create)) {
                        if (parent !== null) {
                            temp                = parent;
                            temp.prototype      = parent.prototype;
                            proto               = typeof prototype === 'function' ? prototype.call(new constr(), privates) : prototype;
                            constr.prototype    = new temp();
                            for (var prop in proto) {
                                constr.prototype[prop] = proto[prop];
                            }
                        } else {
                            constr.prototype    = typeof prototype === 'function' ? prototype.call(new constr(), privates) : prototype;
                        }
                        privates.__instance = new constr();
                        return privates.__instance;
                    } else {
                        throw Error('Method [flex.oop.classes.create] cannot be used with derective NEW');
                    }
                },
            },
            objects     : {
                forEach         : function (object, callback) {
                    /// <summary>
                    /// Apply callback function to each enumerable property of object. 
                    /// </summary>
                    /// <param name="object" type="Object">Object</param>
                    /// <param name="function" type="Object">Callback function(property_name, object)</param>
                    /// <returns type="String">Name of class</returns>
                    if (typeof object === 'object') {
                        for (var property in object) {
                            (function (property, object, callback) {
                                callback(property, object[property]);
                            }(property, object, callback));
                        }
                        if (!('toString' in { toString: null })) {
                            //Hello, IE8 :)
                            Array.prototype.forEach.call(
                                ['toString', 'valueOf', 'constructor', 'hasOwnPropery', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString'],
                                function (protoprop) {
                                    if (object.hasOwnProperty(prototype)) {
                                        callback(protoprop, object[property]);
                                    }
                                }
                            );
                        }
                    }
                },
                extend          : function (sources, target, exclusion) {
                    /// <signature>
                    ///     <summary>
                    ///     Copy all properties from source object to target object. And miss exclusion. 
                    ///     </summary>
                    ///     <param name="sources" type="Object">Object</param>
                    ///     <param name="target" type="Object">Object (can be null, in this case new object will be created)</param>
                    ///     <param name="exclusion" type="Array">String array with properties names</param>
                    ///     <returns type="Object">Updated target object</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>
                    ///     Copy all properties from source object to target object. 
                    ///     </summary>
                    ///     <param name="sources" type="Object">Object</param>
                    ///     <param name="target" type="Object">Object (can be null, in this case new object will be created)</param>
                    ///     <returns type="Object">New object</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>
                    ///     Create new object from all properties from source object. 
                    ///     </summary>
                    ///     <param name="sources" type="Object">Object</param>
                    ///     <returns type="Object">New object</returns>
                    /// </signature>
                    var exclusion   = (oop.classes.of(exclusion) === 'Array' ? exclusion : []),
                        target      = (target !== null ? (target !== void 0 ? (typeof target === 'object' ? target : {}) : {}) : {}),
                        sources     = (typeof sources === 'object' ? [sources] : (oop.classes.of(sources) === 'Array' ? sources : null));
                    if (sources !== null) {
                        Array.prototype.forEach.call(
                            sources,
                            function (source) {
                                if (typeof source === 'object') {
                                    for (var property in source) {
                                        if (exclusion.indexOf(property) === -1) {
                                            target[property] = source[property];
                                        }
                                    }
                                }
                            }
                        );
                    }
                    return target;
                },
                copy            : function (source, target) {
                    /// <signature>
                    ///     <summary>Copy object</summary>
                    ///     <param name="source" type="object">Object - source</param>
                    ///     <returns type="object">object</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Copy object</summary>
                    ///     <param name="source" type="object">Object - source</param>
                    ///     <param name="target" type="object">Object - target</param>
                    ///     <returns type="object">object</returns>
                    /// </signature>
                    function copyProperty(property) {
                        var result = null;
                        if (property instanceof Array) {
                            result = [];
                            Array.prototype.forEach.call(
                                property,
                                function (item) {
                                    if (!(item instanceof Array) && typeof item !== 'object' && typeof item !== 'function') {
                                        result.push(item);
                                    } else {
                                        result.push(copyProperty(item));
                                    }
                                }
                            );
                        } else if (typeof property === 'object' && property !== null && typeof property !== 'function') {
                            result = copy(property);
                        } else {
                            result = property;
                        }
                        return result;
                    };
                    var target  = target || {},
                        source  = (typeof source === "object" ? source : null),
                        copy    = oop.objects.copy;
                    if (source !== null) {
                        for (var key in source) {
                            if (source.hasOwnProperty(key)) {
                                target[key] = copyProperty(source[key]);
                            }
                        }
                        return target;
                    }
                    return null;
                },
                validate        : function (object, properties) {
                    /// <signature>
                    ///     <summary>
                    ///         Validate object
                    ///     </summary>
                    ///     <param name="object"        type="object">Object for validate</param>
                    ///     <param name="properties"    type="object">Parameters of validation:     &#13;&#10;
                    ///     {   [string]            name,                                           &#13;&#10;
                    ///         [string || array]   type,                                           &#13;&#10;
                    ///         [any]               value       (default value),                    &#13;&#10;
                    ///         [any || array]      values      (allowed values)                    &#13;&#10;
                    ///         [function]          handle      (value = handle(value))             &#13;&#10;
                    ///     }</param>
                    ///     <returns type="boolean">true - valid; false - isn't valid</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>
                    ///         Validate object
                    ///     </summary>
                    ///     <param name="object"        type="object"   >Object for validate</param>
                    ///     <param name="properties"    type="array"    >Array of parameters of validation</param>
                    ///     <returns type="boolean">true - valid; false - isn't valid</returns>
                    /// </signature>
                    var object          = (typeof object === "object" ? object : null),
                        properties      = properties || null,
                        types           = null,
                        status          = null,
                        values_check    = null;
                    if (object !== null && properties !== null) {
                        properties = (properties instanceof Array ? properties : [properties]);
                        try{
                            properties.forEach(function (property) {
                                if (property.name && property.type) {
                                    if (object[property.name] || typeof object[property.name] === 'boolean' || typeof object[property.name] === 'number') {
                                        property.type = (typeof property.type === "string" ? [property.type] : property.type);
                                        if (property.type instanceof Array) {
                                            status = false;
                                            try {
                                                property.type.forEach(function (type) {
                                                    if (type === "node") {
                                                        if (object[property.name]) {
                                                            status = (object[property.name].nodeName ? true : status);
                                                        }
                                                    } else if (type === "array") {
                                                        status = (object[property.name] instanceof Array === true ? true : status);
                                                    } else {
                                                        status = (typeof object[property.name] === type ? true : status);
                                                    }
                                                    if (status !== false){
                                                        throw 'found';
                                                    }
                                                });
                                            } catch (e) {
                                                if (e !== 'found') {
                                                    status = false;
                                                }
                                            } finally {
                                                if (status === false) {
                                                    if (property.value) {
                                                        object[property.name] = property.value;
                                                    } else {
                                                        throw 'deny';
                                                    }
                                                } else {
                                                    if (property.values) {
                                                        if (property.values instanceof Array) {
                                                            try {
                                                                values_check = false;
                                                                property.values.forEach(function (value) {
                                                                    if (object[property.name] === value) {
                                                                        values_check = true;
                                                                        throw 'found';
                                                                    }
                                                                });
                                                            } catch (e) {
                                                            }
                                                            if (values_check === false) {
                                                                throw 'deny';
                                                            }
                                                        }
                                                    }
                                                    if (typeof property.handle === 'function') {
                                                        try {
                                                            object[property.name] = property.handle(object[property.name]);
                                                        } catch (e) {
                                                            if (property.value) {
                                                                object[property.name] = property.value;
                                                            } else {
                                                                throw 'deny';
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        if (property.value !== void 0) {
                                            object[property.name] = property.value;
                                        } else {
                                            throw 'deny';
                                        }
                                    }
                                }
                            });
                        } catch (e) {
                            return false;
                        }
                        return true;
                    }
                    return null;
                },
                isValueIn       : function (target, value, deep) {
                    /// <signature>
                    ///     <summary>Search defined value in object</summary>
                    ///     <param name="source"    type="object"   >Object</param>
                    ///     <param name="value"     type="any"      >Searching value</param>
                    ///     <returns type="boolean">true - value is found; false - value isn't found</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Search defined value in object</summary>
                    ///     <param name="source"    type="object"   >Object</param>
                    ///     <param name="value"     type="any"      >Searching value</param>
                    ///     <param name="deep"      type="boolean"  >True - search in nested objects</param>
                    ///     <returns type="boolean">true - value is found; false - value isn't found</returns>
                    /// </signature>
                    var deep = typeof deep === 'boolean' ? deep : false;
                    if (target instanceof Array) {
                        try{
                            target.forEach(function (property) {
                                if (property === value) {
                                    throw 'found';
                                }
                            });
                            if (deep !== false) {
                                target.forEach(function (property) {
                                    if (typeof property === 'object' || property instanceof Array) {
                                        if (oop.objects.isValueIn(property, value, deep) === true) {
                                            throw 'found';
                                        }
                                    }
                                });
                            }
                        } catch (e) {
                            return true;
                        }
                        return false;
                    } else if (typeof target === 'object') {
                        try {
                            oop.objects.forEach(target, function (key, property) {
                                if (property === value) {
                                    throw 'found';
                                }
                            });
                            if (deep !== false) {
                                oop.objects.forEach(target, function (key, property) {
                                    if (typeof property === 'object' || property instanceof Array) {
                                        if (oop.objects.isValueIn(property, value, deep) === true) {
                                            throw 'found';
                                        }
                                    }
                                });
                            }
                        } catch (e) {
                            return true;
                        }
                        return false;
                    }
                    return null;
                },
                getByPath       : function (target, path) {
                    ///     <summary>Get property by path</summary>
                    ///     <param name="target"    type="object"   >Object</param>
                    ///     <param name="path"      type="any"      >Path to property</param>
                    ///     <returns type="any">Final value or UNDEFINED</returns>
                    var target      = typeof target     === 'object'    ? target    : null,
                        path        = typeof path       === 'string'    ? path      : (path instanceof Array ? path : null),
                        steps       = null,
                        errors      = {
                            NO_BY_PATH: 'NO_BY_PATH'
                        },
                        result      = target,
                        finished    = false;
                    if (target !== null && path !== null) {
                        steps = path instanceof Array ? path : path.split('.');
                        try {
                            steps.forEach(function (step) {
                                if (result[step] !== void 0) {
                                    result = result[step];
                                } else {
                                    throw errors.NO_BY_PATH;
                                }
                            });
                            finished = true;
                        } catch (e) {
                            if (e !== errors.NO_BY_PATH) {
                                throw e;
                            }
                        }
                    }
                    return finished ? result : void 0;
                },
                findBy          : function (target, path, value, multiple) {
                    /// <signature>
                    ///     <summary>Search defined value in properties of object</summary>
                    ///     <param name="target"    type="object"   >Object</param>
                    ///     <param name="path"      type="any"      >Path to property</param>
                    ///     <param name="value"     type="any"      >Compared value</param>
                    ///     <returns type="any">Match(s)</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Search defined value in properties of object</summary>
                    ///     <param name="target"    type="object"   >Object</param>
                    ///     <param name="path"      type="any"      >Path to property</param>
                    ///     <param name="value"     type="any"      >Compared value</param>
                    ///     <param name="multiple"  type="boolean"  >True - return all matches; False - return only first</param>
                    ///     <returns type="any">Match(s)</returns>
                    /// </signature>
                    var target      = typeof target     === 'object'    ? target    : null,
                        path        = typeof path       === 'string'    ? path      : null,
                        multiple    = typeof multiple   === 'boolean'   ? multiple  : false,
                        result      = multiple ? [] : null,
                        errors      = {
                            FOUND       : '1'
                        };
                    if (target !== null && path !== null) {
                        path = path.split('.');
                        try {
                            oop.objects.forEach(target, function (property, _value) {
                                var _result = oop.objects.getByPath(_value, path);
                                if (_result !== void 0) {
                                    if (_result === value) {
                                        if (multiple) {
                                            result.push(_value);
                                        } else {
                                            result = _value;
                                            throw errors.FOUND;
                                        }
                                    }
                                }
                            });
                        } catch (e) {
                            if (e !== errors.FOUND) {
                                throw e;
                            }
                        }
                    }
                    return result;
                }
            },
            wrappers    : {
                objects: function () {
                    wrappers.prototypes.add.object('forEach',               function (callback)             {
                        return oop.objects.forEach(this.target, callback);
                    });
                    wrappers.prototypes.add.object('extend',                function (target, exclusion)    {
                        return oop.objects.extend(this.target, target, exclusion);
                    });
                    wrappers.prototypes.add.object('copy',                  function (target)               {
                        return oop.objects.copy(this.target, target);
                    });
                    wrappers.prototypes.add.object('validate',              function (properties)           {
                        return oop.objects.validate(this.target, properties);
                    });
                    wrappers.prototypes.add.object('isValueIn',             function (value, deep)          {
                        return oop.objects.isValueIn(this.target, value, deep);
                    });
                    wrappers.prototypes.add.object('getByPath',             function (path) {
                        return oop.objects.getByPath(this.target, path);
                    });
                    wrappers.prototypes.add.object('findBy',                function (path, value, multiple) {
                        return oop.objects.findBy(this.target, path, value, multiple);
                    });
                    wrappers.prototypes.add.object('createInstanceClass',   function () {
                        return oop.classes.create(this.target);
                    });
                }
            }
        };
        hashes          = {
            storage     : {
                data    : {},
                get     : function (){
                    hashes.storage.data = system.localStorage.getJSON(options.hashes.LOCAL_STORAGE_NAME, options.other.STORAGE_PREFIX);
                    if (typeof hashes.storage.data !== 'object' || hashes.storage.data === null) {
                        hashes.storage.create();
                    }
                    return hashes.storage.data;
                },
                create  : function () {
                    hashes.storage.data = {};
                    hashes.storage.update();
                },
                update  : function () {
                    system.localStorage.setJSON(options.hashes.LOCAL_STORAGE_NAME, hashes.storage.data, options.other.STORAGE_PREFIX);
                }
            },
            get         : function (url) {
                /// <signature>
                ///     <summary>Get hash for defined resource</summary>
                ///     <param name="url" type="string">URL to resource</param>
                ///     <returns type="string">HASH</returns>
                /// </signature>
                var storage = hashes.storage.get();
                return typeof storage[url] === 'object' ? storage[url].hash : null;
            },
            set         : function (url, hash) {
                var storage = hashes.storage.get();
                if (typeof hash === 'string') {
                    storage[url] = {
                        url     : url,
                        hash    : hash
                    };
                    hashes.storage.update();
                    return true;
                }
                return false;
            },
            update      : {
                add         : function(url){
                    /// <signature>
                    ///     <summary>Update hash of defined resource</summary>
                    ///     <param name="url" type="string">URL to resource</param>
                    ///     <returns type="void">void</returns>
                    /// </signature>
                    hashes.update.queue.add(url);
                },
                queue       : {
                    queue       : {},
                    journal     : {},
                    isLock      : false,
                    unlock      : function () {
                        hashes.update.queue.isLock = false;
                        hashes.update.proceed();
                    },
                    add         : function (url) {
                        if (typeof url === 'string') {
                            if (hashes.update.queue.journal[url] === void 0) {
                                hashes.update.queue.journal [url] = true;
                                hashes.update.queue.queue   [url] = { url: url, working : false };
                            }
                        }
                        if (!hashes.update.queue.isLock) {
                            hashes.update.proceed();
                        }
                    },
                    del         : function (url) {
                        if (typeof url === 'string') {
                            hashes.update.queue.queue[url] = null;
                            delete hashes.update.queue.queue[url];
                        }
                    },
                    work        : function (url) {
                        if (typeof hashes.update.queue.queue[url] === 'object') {
                            hashes.update.queue.queue[url].working = true;
                        }
                    },
                    isWorking   : function (url) {
                        if (typeof hashes.update.queue.queue[url] === 'object') {
                            return hashes.update.queue.queue[url].working;
                        }
                    },
                },
                proceed     : function () {
                    oop.objects.forEach(hashes.update.queue.queue, function (key, value) {
                        var request = null;
                        if (hashes.update.queue.isWorking(key) === false) {
                            hashes.update.queue.work(key);
                            request = ajax.create(
                                value.url,
                                ajax.settings.methods.GET,
                                null,
                                {
                                    headers : function (response, request) { hashes.update.processing   (key, value.url, request); },
                                    fail    : function (response, request) { hashes.update.fail         (key, value.url, request); }
                                }
                            );
                            request.send();
                        }
                    });
                },
                processing  : function (key, url, request) {
                    var hash    = '',
                        _hash   = hashes.get(url);
                    if (request.headers !== null) {
                        if (request.headers._headers !== '') {
                            hashes.update.queue.del(key);
                            oop.objects.forEach(request.headers.headers, function (key, value) {
                                if (key.toLowerCase() !== 'date') {
                                    hash += value;
                                }
                            });
                            if (hashes.get(url) !== hash) {
                                if (_hash === null) {
                                    logs.log('[HASHES]:: hash for resource [' + url + '] was generated. Next updating of page, resource will be loaded again.', logs.types.KERNEL_LOGS);
                                } else {
                                    logs.log('[HASHES]:: resource [' + url + '] have to be updated.', logs.types.KERNEL_LOGS);
                                    hashes.resources.update(url);
                                }
                                //Update hash
                                hashes.set(url, hash);
                            }
                            request.abort();
                        }
                    }
                },
                fail        : function (key, url, request) {
                    if (request.headers === null) {
                        logs.log('[HASHES]:: fail to load hash for resource [' + url + '].', logs.types.KERNEL_LOGS);
                        hashes.update.queue.del(key);
                    }
                }
            },
            resources   : {
                update  : function(url){
                    if (hashes.resources.css.update(url) === true) {
                        return true;
                    }
                    logs.log('[HASHES]:: resource [' + url + '] cannot be updated in current session. It will be done after page be reloaded.', logs.types.KERNEL_LOGS);
                },
                css     : {
                    update: function (url) {
                        var style = document.querySelector('style[' + system.resources.css.settings.attr.SRC + '$="' + url + '"]');
                        if (style !== null) {
                            system.resources.css.connect(url, function () {
                                style.parentNode.removeChild(style);
                                logs.log('[HASHES]:: resource [' + url + '] have been updated in current session.', logs.types.KERNEL_LOGS);
                            });
                            return true;
                        }
                        return false;
                    }
                }
            }
        };
        parsing         = {
            js  : {
                stringify       : function (_function) {
                    /// <summary>
                    /// Get string from function
                    /// </summary>
                    /// <param name="name" type="string">Function body</param>
                    /// <returns type="object" value="{params:string,body:string}">Function as object</returns>
                    var tools           = parsing.js.tools,
                        str_function    = null,
                        result          = null;
                    if (typeof _function === 'function') {
                        str_function    = _function.toString();
                        result          = {
                            params  : tools.getParams(str_function),
                            body    : tools.getBody(str_function)
                        };
                        if (result.params !== null && result.body !== null) {
                            return result;
                        }
                        return null;
                    }
                },
                parse           : function (data) {
                    /// <summary>
                    /// Make prototype function and constructor from string data
                    /// </summary>
                    /// <param name="parameters" type="Object"> 
                    /// {   [object] constr:                    &#13;&#10;
                    ///     {   [string] params,                &#13;&#10;
                    ///         [string] body                   &#13;&#10;
                    ///     },                                  &#13;&#10;
                    /// {   [object] proto:                     &#13;&#10;
                    ///     {   [string] params,                &#13;&#10;
                    ///         [string] body                   &#13;&#10;
                    ///     },                                  &#13;&#10;
                    /// }</param>
                    /// <returns type="function">Prototype function</returns>
                    var protofunction = parsing.js.parseFunction(data.constr.params, data.constr.body);
                    if (typeof protofunction === 'function') {
                        protofunction.prototype = parsing.js.parseFunction(data.proto.params, data.proto.body);
                        if (typeof protofunction.prototype === 'function') {
                            return protofunction;
                        }
                    }
                    return null;
                },
                parseFunction   : function (params, body) {
                    /// <summary>
                    /// Make function from string data
                    /// </summary>
                    /// <param name="params" type="string">Parameters of function</param>
                    /// <param name="body" type="string">Body of function</param>
                    /// <returns type="function">Function</returns>
                    if (typeof params === 'string' && typeof body === 'string') {
                        if (params === ''){
                            return new Function(body);
                        } else {
                            return new Function(params, body);
                        }
                    }
                    return null;
                },
                tools           : {
                    regs    : {
                        FUNCTION            : /^\(?function\s.*?\(.*?\)\s*?\{/gi,
                        ARGUMENTS           : /\(.*?\)/gi,
                        ARGUMENTS_BORDERS   : /[\(\)]/gi,
                        BODY_END            : /\}$/gi,
                        STRICT              : /(use strict)/gi,
                    },
                    getBody     : function (function_str) {
                        /// <summary>
                        /// Get body of function from string representation
                        /// </summary>
                        /// <param name="function_str" type="string">String representation of function</param>
                        /// <returns type="string">String representation of function's body</returns>
                        function_str = function_str.replace(parsing.js.tools.regs.FUNCTION, '');
                        function_str = function_str.replace(parsing.js.tools.regs.BODY_END, '');
                        if (function_str.search(parsing.js.tools.regs.STRICT) === -1) {
                            function_str = '"use strict";' + function_str;
                        }
                        return function_str;
                    },
                    getParams   : function (function_str) {
                        /// <summary>
                        /// Get parameters of function from string representation
                        /// </summary>
                        /// <param name="function_str" type="string">String representation of function</param>
                        /// <returns type="string">String representation of function's parameters</returns>
                        var matches = function_str.match(parsing.js.tools.regs.FUNCTION);
                        if (matches !== null) {
                            if (matches.length === 1) {
                                matches = matches[0].match(parsing.js.tools.regs.ARGUMENTS);
                                if (matches.length === 1) {
                                    matches = matches[0].replace(parsing.js.tools.regs.ARGUMENTS_BORDERS, '');
                                    return matches;
                                }
                            }
                        }
                        return null;
                    }
                }
            },
            css : {
                stringify       : function (href) {
                    /// <summary>
                    /// Get string from CSS resource
                    /// </summary>
                    /// <param name="resource" type="string">URL of CSS resource</param>
                    /// <returns type="string">String representation of CSS resource</returns>
                    function getCSSText(sheet) {
                        function getKeyframesIE(rule) {
                            var keyframe = '';
                            if (rule.cssRules) {
                                keyframe = '@keyframes ' + rule.name + ' {\n\r';
                                Array.prototype.forEach.call(
                                    rule.cssRules,
                                    function (sub_rule) {
                                        keyframe += sub_rule.keyText + ' { ' + sub_rule.style.cssText + ' }\n\r';
                                    }
                                );
                                keyframe += '}';
                            }
                            return keyframe;
                        };
                        var CSSText = '',
                            doc     = document;
                        if (sheet.cssRules || sheet.rules) {
                            Array.prototype.forEach.call(
                                (sheet.cssRules || sheet.rules),
                                function (rule) {
                                    if (typeof rule.cssText === 'string') {
                                        CSSText += rule.cssText + '\n\r';
                                    } else {
                                        CSSText += getKeyframesIE(rule) + '\n\r';
                                    }
                                }
                            );
                        } else if (typeof sheet.cssText === 'string') {
                            CSSText = sheet.cssText;
                        }
                        return CSSText;
                    };
                    var sheets      = document.styleSheets,
                        styles      = null;
                    try{
                        Array.prototype.forEach.call(
                            document.styleSheets,
                            function (sheet) {
                                if (sheet.href) {
                                    if (sheet.href.indexOf(href) !== -1) {
                                        styles = getCSSText(sheet);
                                        throw 'found';
                                    }
                                }
                            }
                        );
                    } catch (e) {
                    } finally {
                        return styles;
                    }
                }
            }
        };
        overhead        = {
            globaly : {
                storage : {},
                get     : function (group, name, default_value) {
                    /// <signature>
                    ///     <summary>Return value from closed space</summary>
                    ///     <param name="group" type="string"   >Name of storage group</param>
                    ///     <param name="name"  type="string"   >Name of storage</param>
                    ///     <returns type="any">returns saved value</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Return value from closed space</summary>
                    ///     <param name="group"         type="string"   >Name of storage group</param>
                    ///     <param name="name"          type="string"   >Name of storage</param>
                    ///     <param name="default_value" type="any"      >Default value, if property will not be found</param>
                    ///     <returns type="any">returns saved value</returns>
                    /// </signature>
                    var storage = overhead.globaly.storage;
                    if (group in storage) {
                        if (name in storage[group]) {
                            return storage[group][name];
                        }
                    }
                    if (default_value) {
                        return overhead.globaly.set(group, name, default_value);
                    }
                    return null;
                },
                set     : function (group, name, value) {
                    /// <summary>Create value in closed space</summary>
                    /// <param name="group" type="string"   >Name of storage group</param>
                    /// <param name="name"  type="string"   >Name of storage</param>
                    /// <param name="value" type="any"      >Value</param>
                    /// <returns type="any">returns saved value</returns>
                    var storage = overhead.globaly.storage;
                    storage[group] = (group in storage ? storage[group] : {});
                    storage[group][name] = value;
                    return storage[group][name];
                },
                remove  : function (group, name) {
                    /// <summary>Return value from closed space</summary>
                    /// <param name="group" type="string"   >Name of storage group</param>
                    /// <param name="name"  type="string"   >Name of storage</param>
                    /// <returns type="boolean">true - if removed; false - if not found</returns>
                    var storage = overhead.globaly.storage;
                    if (group in storage) {
                        if (name in storage[group]) {
                            storage[group][name] = null;
                            delete storage[group][name];
                            if (Object.keys(storage[group]).length === 0) {
                                storage[group] = null;
                                delete storage[group];
                            }
                            return true;
                        }
                    }
                    return false;
                }
            },
            objecty : {
                settings: {
                    COMMON_STORAGE_NAME : 'FlexObjectStorage'
                },
                set     : function (element, property, value, rewrite) {
                    /// <signature>
                    ///     <summary>Add property to virtual storage based on element</summary>
                    ///     <param name="element"   type="object"   >Object for attach storage</param>
                    ///     <param name="property"  type="string"   >Name of property</param>
                    ///     <param name="value"     type="any"      >Value</param>
                    ///     <returns type="any">value</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Add property to virtual storage based on element</summary>
                    ///     <param name="element"   type="object"   >Object for attach storage</param>
                    ///     <param name="property"  type="string"   >Name of property</param>
                    ///     <param name="value"     type="any"      >Value</param>
                    ///     <param name="rewrite"   type="boolean"  >[optional] rewrite or not value</param>
                    ///     <returns type="any">value</returns>
                    /// </signature>
                    var rewrite     = (typeof rewrite === "boolean" ? rewrite : true),
                        settings    = overhead.objecty.settings;
                    if (typeof element === "object" && typeof property === "string" && value !== void 0) {
                        if (typeof element[settings.COMMON_STORAGE_NAME] !== "object") {
                            element[settings.COMMON_STORAGE_NAME] = {};
                        }
                        if (rewrite === false) {
                            if (element[settings.COMMON_STORAGE_NAME][property] === void 0) {
                                element[settings.COMMON_STORAGE_NAME][property] = value;
                            }
                        } else {
                            element[settings.COMMON_STORAGE_NAME][property] = value;
                        }
                        return value;
                    }
                    return null; 
                },
                get     : function (element, property, remove, default_value) {
                    /// <signature>
                    ///     <summary>Get property from virtual storage based on element</summary>
                    ///     <param name="element"       type="object"   >Object for attach storage</param>
                    ///     <param name="property"      type="string"   >Name of property</param>
                    ///     <returns type="any">value</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Get property from virtual storage based on element</summary>
                    ///     <param name="element"       type="object"   >Object for attach storage</param>
                    ///     <param name="property"      type="string"   >Name of property</param>
                    ///     <param name="remove"        type="boolean"  >[optional] remove or not property from storage after value will be read</param>
                    ///     <returns type="any">value</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Get property from virtual storage based on element</summary>
                    ///     <param name="element"       type="object"   >Object for attach storage</param>
                    ///     <param name="property"      type="string"   >Name of property</param>
                    ///     <param name="remove"        type="boolean"  >[optional] remove or not property from storage after value will be read</param>
                    ///     <param name="default_value" type="any"      >[optional] default value of property</param>
                    ///     <returns type="any">value</returns>
                    /// </signature>
                    var remove          = (typeof remove === "boolean" ? remove : false),
                        default_value   = (default_value !== void 0 ? default_value : null),
						value           = null,
                        settings        = overhead.objecty.settings,
						tools           = overhead.objecty.tools;
                    if (typeof element === "object" && typeof property === "string") {
                        if (typeof element[settings.COMMON_STORAGE_NAME] === "object") {
                            if (element[settings.COMMON_STORAGE_NAME][property] !== void 0) {
                                value = element[settings.COMMON_STORAGE_NAME][property];
                                if (remove === true) {
                                    element[settings.COMMON_STORAGE_NAME][property] = null;
                                    tools.deleteAttribute(element, property);
                                    tools.clear(element);
                                }
                                return value;
                            } else {
                                if (default_value !== null) {
                                    element[settings.COMMON_STORAGE_NAME][property] = default_value;
                                    return element[settings.COMMON_STORAGE_NAME][property];
                                }
                            }
                        } else {
                            if (default_value !== null) {
                                element[settings.COMMON_STORAGE_NAME]           = {};
                                element[settings.COMMON_STORAGE_NAME][property] = default_value;
                                return element[settings.COMMON_STORAGE_NAME][property];
                            }
                        }
                    }
                    return null;
                },
                remove  : function (element, property) {
                    /// <summary>Remove property from virtual storage based on element</summary>
                    /// <param name="element"   type="object"   >Object for attach storage</param>
                    /// <param name="property"  type="string"   >Name of property</param>
                    /// <returns type="boolean">true - removed; false - not found; null - bad parameters</returns>
                    var remove      = (typeof remove === "boolean" ? remove : false),
						value       = null,
                        settings    = overhead.objecty.settings,
						tools       = overhead.objecty.tools;
                    if (typeof element === "object" && typeof property === "string") {
                        if (typeof element[settings.COMMON_STORAGE_NAME] === "object") {
                            if (element[settings.COMMON_STORAGE_NAME][property] !== void 0) {
                                element[settings.COMMON_STORAGE_NAME][property] = null;
                                tools.deleteAttribute(element, property);
                                tools.clear(element);
                                return true;
                            }
                        }
                        return false;
                    }
                    return null;
                },
                tools   : {
                    deleteAttribute : function (element, property) {
                        try {
                            delete element[property];
                        } catch (e) {
                            element.removeAttribute(property);
                        }
                    },
                    clear           : function (element) {
                        var settings    = overhead.objecty.settings,
                            tools       = overhead.objecty.tools;
                        if (Object.keys(element[settings.COMMON_STORAGE_NAME]).length === 0) {
                            element[settings.COMMON_STORAGE_NAME] = null;
                            tools.deleteAttribute(element, settings.COMMON_STORAGE_NAME);
                        }
                    }
                }
            },
            register: {
                settings: {
                    COMMON_STORAGE_NAME: 'FlexRegisterStorage'
                },
                build   : function (name, onReadyHandle) {
                    //Define class of register
                    var Register        = function (name, onReadyHandle) {
                        this.name       = name;
                        this.onReady    = onReadyHandle;
                        this.items      = {};
                    };
                    Register.prototype  = {
                        add     : function (key) {
                            if (!this.items[key]) {
                                this.items[key] = {
                                    isDone  : false,
                                    key     : key
                                };
                                return true;
                            }
                            return false;
                        },
                        done    : function (key, do_not_check) {
                            var do_not_check = typeof do_not_check === 'boolean' ? do_not_check : false;
                            if (this.items[key]) {
                                this.items[key].isDone = true;
                            }
                            if (do_not_check === false) {
                                if (this.isReady() !== false) {
                                    if (this.onReady !== null) {
                                        system.handle(this.onReady, null, 'Register: ' + this.name, this);
                                    }
                                    return true;
                                }
                            }
                            return false;
                        },
                        isReady : function () {
                            for (var key in this.items) {
                                if (this.items[key].isDone === false) {
                                    return false;
                                }
                            }
                            return true;
                        },
                        isIn    : function (key) {
                            return (this.items[key] ? true : false);
                        },
                        isDone  : function (key) {
                            if (this.items[key]) {
                                return this.items[key].isDone;
                            }
                            return null;
                        }
                    };
                    //Create register
                    return new Register(name, onReadyHandle);
                },
                open    : function (name, keys, onReadyHandle) {
                    /// <summary>Create new register</summary>
                    /// <param name="name"          type="string"       >Name of register</param>
                    /// <param name="keys"          type="array || any" >Default keys for register</param>
                    /// <param name="onReadyHandle" type="function"     >onReady handle, handle, which will be fired on all items will be done</param>
                    /// <returns type="boolean">true / false</returns>
                    var name            = (typeof name === 'string' ? name : null),
                        keys            = (keys instanceof Array ? keys : (keys !== void 0 ? [keys] : null)),
                        onReadyHandle   = (typeof onReadyHandle === 'function' ? onReadyHandle : null),
                        register        = null,
                        storage         = overhead.globaly.get(options.storage.GROUP, overhead.register.settings.COMMON_STORAGE_NAME, {});
                    if (name !== null) {
                        if (!storage[name]) {
                            //Create register
                            register = overhead.register.build(name, onReadyHandle);
                            //Add keys
                            keys.forEach(function (key) {
                                register.add(key);
                            });
                            //Save register
                            storage[name] = register;
                            return true;
                        }
                    }
                    return false;
                },
                add     : function (name, key) {
                    /// <summary>Add new key into register</summary>
                    /// <param name="name"  type="string">Name of register</param>
                    /// <param name="key"   type="string">New key name</param>
                    /// <returns type="boolean">true / false</returns>
                    var storage = overhead.globaly.get(options.storage.GROUP, overhead.register.settings.COMMON_STORAGE_NAME, {});
                    if (storage[name]) {
                        return storage[name].add(key);
                    }
                    return false;
                },
                done    : function (name, key, do_not_check) {
                    /// <signature>
                    ///     <summary>Set item of register to DONE</summary>
                    ///     <param name="name"          type="string"   >Name of register</param>
                    ///     <param name="key"           type="string"   >New key name</param>
                    ///     <returns type="boolean">true / false</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Set item of register to DONE</summary>
                    ///     <param name="name"          type="string"   >Name of register</param>
                    ///     <param name="key"           type="string"   >New key name</param>
                    ///     <param name="do_not_check"  type="boolean"  >true - check is all items are ready; false - do not check</param>
                    ///     <returns type="boolean">true / false</returns>
                    /// </signature>
                    var storage         = overhead.globaly.get(options.storage.GROUP, overhead.register.settings.COMMON_STORAGE_NAME, {}),
                        do_not_check    = typeof do_not_check === 'boolean' ? do_not_check : false;
                    if (storage[name]) {
                        if (storage[name].done(key, do_not_check) !== false) {
                            storage[name] = null;
                            delete storage[name];
                        }
                    }
                    return false;
                },
                isIn    : function (name, key) {
                    /// <summary>
                    /// Is key in register
                    /// </summary>
                    /// <param name="name"  type="string">Name of register</param>
                    /// <param name="key"   type="string">New key name</param>
                    /// <returns type="boolean">true / false</returns>
                    var storage = overhead.globaly.get(options.storage.GROUP, overhead.register.settings.COMMON_STORAGE_NAME, {});
                    if (storage[name]) {
                        return storage[name].isIn(key);
                    }
                    return false;
                },
                isDone  : function (name, key) {
                    /// <summary>
                    /// Is key done
                    /// </summary>
                    /// <param name="name"  type="string">Name of register</param>
                    /// <param name="key"   type="string">New key name</param>
                    /// <returns type="boolean">true / false</returns>
                    var storage = overhead.globaly.get(options.storage.GROUP, overhead.register.settings.COMMON_STORAGE_NAME, {});
                    if (storage[name]) {
                        return storage[name].isDone(key);
                    }
                    return false;
                },
                isReady : function (name) {
                    /// <summary>
                    /// Is register done
                    /// </summary>
                    /// <param name="name"  type="string">Name of register</param>
                    /// <returns type="boolean">true / false</returns>
                    var storage = overhead.globaly.get(options.storage.GROUP, overhead.register.settings.COMMON_STORAGE_NAME, {});
                    if (storage[name]) {
                        return storage[name].isReady();
                    }
                    return true;
                },
            }
        };
        events          = {
            DOM     : {
                add     : (function () {
                    if (typeof window.addEventListener === "function") {
                        return function (element, eventName, handle) {
                            /// <summary>
                            /// Add DOM's events listener 
                            /// </summary>
                            /// <param name="element"   type="node"     >Node</param>
                            /// <param name="eventName" type="string"   >Name of event</param>
                            /// <param name="handle"    type="function" >Handle</param>
                            /// <returns type="void">void</returns>
                            var events = (eventName instanceof Array ? eventName : [eventName]);
                            Array.prototype.forEach.call(
                                events,
                                function (event) {
                                    element.addEventListener(event, handle, false);
                                }
                            );
                        };
                    } else if (typeof document.attachEvent === "function") {
                        return function (element, eventName, handle) {
                            /// <summary>
                            /// Add DOM's events listener 
                            /// </summary>
                            /// <param name="element"   type="node"     >Node</param>
                            /// <param name="eventName" type="string"   >Name of event</param>
                            /// <param name="handle"    type="function" >Handle</param>
                            /// <returns type="void">void</returns>
                            var events = (eventName instanceof Array ? eventName : [eventName]);
                            Array.prototype.forEach.call(
                                events,
                                function (event) {
                                    element.attachEvent(("on" + event), handle);
                                }
                            );
                        };
                    } else {
                        return function (element, eventName, handle) {
                            /// <summary>
                            /// Add DOM's events listener 
                            /// </summary>
                            /// <param name="element"   type="node"     >Node</param>
                            /// <param name="eventName" type="string"   >Name of event</param>
                            /// <param name="handle"    type="function" >Handle</param>
                            /// <returns type="void">void</returns>
                            var events = (eventName instanceof Array ? eventName : [eventName]);
                            Array.prototype.forEach.call(
                                events,
                                function (event) {
                                    element[("on" + event)] = handle;
                                }
                            );
                        };
                    };
                }()),
                remove  : (function () {
                    if (typeof window.removeEventListener === "function") {
                        return function (element, eventName, handle) {
                            /// <summary>
                            /// Remove DOM's events listener 
                            /// </summary>
                            /// <param name="element"   type="node"     >Node</param>
                            /// <param name="eventName" type="string"   >Name of event</param>
                            /// <param name="handle"    type="function" >Handle</param>
                            /// <returns type="void">void</returns>
                            element.removeEventListener(eventName, handle, false);
                        };
                    } else if (typeof document.detachEvent === "function") {
                        return function (element, eventName, handle) {
                            /// <summary>
                            /// Remove DOM's events listener 
                            /// </summary>
                            /// <param name="element"   type="node"     >Node</param>
                            /// <param name="eventName" type="string"   >Name of event</param>
                            /// <param name="handle"    type="function" >Handle</param>
                            /// <returns type="void">void</returns>
                            element.detachEvent(("on" + eventName), handle);
                        };
                    } else {
                        return function (element, eventName, handle) {
                            /// <summary>
                            /// Remove DOM's events listener 
                            /// </summary>
                            /// <param name="element"   type="node"     >Node</param>
                            /// <param name="eventName" type="string"   >Name of event</param>
                            /// <param name="handle"    type="function" >Handle</param>
                            /// <returns type="void">void</returns>
                            element[("on" + eventName)] = null;
                        };
                    };
                }())
            },
            core    : {
                storage : {},
                listen  : function (group, name, handle, id, registered_only) {
                    /// <signature>
                    ///     <summary>Add core's events listener </summary>
                    ///     <param name="group"             type="string"   >Name of event group</param>
                    ///     <param name="name"              type="string"   >Name of event</param>
                    ///     <param name="handle"            type="function" >Handle</param>
                    ///     <param name="id"                type="string"   >[optional][unique ID] ID of event</param>
                    ///     <returns type="boolean / string">return ID of listener - if attached; false - if not</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Add core's events listener </summary>
                    ///     <param name="group"             type="string"   >Name of event group</param>
                    ///     <param name="name"              type="string"   >Name of event</param>
                    ///     <param name="handle"            type="function" >Handle</param>
                    ///     <param name="id"                type="string"   >[optional][unique ID] ID of event</param>
                    ///     <param name="registered_only"   type="boolean"  >[optional][false] Add listener only if event was registered before</param>
                    ///     <returns type="boolean / string">return ID of listener - if attached; false - if not</returns>
                    /// </signature>
                    var group           = group || null,
                        name            = name      || null,
                        handle          = handle    || null,
                        id              = id        || IDs.id(),
                        registered_only = typeof registered_only !== 'boolean' ? false : registered_only,
                        storage         = null,
                        core            = events.core;
                    if (group !== null && name !== null && handle !== null) {
                        if (registered_only !== false) {
                            if (core.get(group, name) === null) {
                                return false;
                            }
                        }
                        storage = core.register(group, name);
                        if (id in storage) {
                            //Here should be message about rewrite existing handle
                            //LOGS!
                        }
                        storage[id] = handle;
                        return id;
                    }
                    return false;
                },
                remove  : function (group, name, id) {
                    /// <summary>
                    /// Remove core's events listener 
                    /// </summary>
                    /// <param name="group" type="string">Name of event group</param>
                    /// <param name="name"  type="string">Name of event</param>
                    /// <param name="id"    type="string">ID of event</param>
                    /// <returns type="boolean">true - removed; false - not found</returns>
                    var group = group || null,
                        name            = name      || null,
                        id              = id        || null,
                        storage         = null,
                        global_starage  = events.core.storage,
                        core            = events.core;
                    if (group !== null && name !== null && id !== null) {
                        storage = core.register(group, name);
                        if (id in storage) {
                            storage[id] = null;
                            delete storage[id];
                            if (Object.keys(storage).length === 0) {
                                global_starage[group][name] = null;
                                delete global_starage[group][name];
                                if (Object.keys(global_starage[group]).length === 0) {
                                    global_starage[group] = null;
                                    delete global_starage[group];
                                }
                            }
                            return true;
                        }
                    }
                    return false;
                },
                register: function (group, name) {
                    /// <summary>
                    /// Register core's event 
                    /// </summary>
                    /// <param name="group" type="string">Name of event group</param>
                    /// <param name="name"  type="string">Name of event</param>
                    /// <returns type="object">Storage of registered event</returns>
                    var storage = events.core.storage;
                    if (!(group in storage      )) { storage[group]         = {}; }
                    if (!(name in storage[group])) { storage[group][name]   = {}; }
                    return storage[group][name];
                },
                get     : function (group, name) {
                    /// <summary>
                    /// Get storage of registered core's event 
                    /// </summary>
                    /// <param name="group" type="string">Name of event group</param>
                    /// <param name="name"  type="string">Name of event</param>
                    /// <returns type="object" mayBeNull="true">Storage of registered event. NULL if event isn't registered</returns>
                    var storage = events.core.storage;
                    if (!(group in storage      )) { return null; }
                    if (!(name in storage[group])) { return null; }
                    return storage[group][name];
                },
                fire    : function (group, name, params) {
                    /// <signature>
                    ///     <summary>Call handles of registered core's event</summary>
                    ///     <param name="group"     type="string"   >Name of event group</param>
                    ///     <param name="name"      type="string"   >Name of event</param>
                    ///     <returns type="void">void</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Call handles of registered core's event</summary>
                    ///     <param name="group"     type="string"   >Name of event group</param>
                    ///     <param name="name"      type="string"   >Name of event</param>
                    ///     <param name="params"    type="any"      >Parameters for all called handles</param>
                    ///     <returns type="void">void</returns>
                    /// </signature>
                    var handles = events.core.get(group, name);
                    if (handles !== null) {
                        for (var id in handles) {
                            try{
                                handles[id](params);
                            } catch (e) {
                                //LOGS!
                            }
                        }
                    }
                }
            }
        };
        system          = {
            handle      : function (handle_body, handle_arguments, call_point, this_argument, safely) {
                /// <signature>
                ///     <summary>Run function in safely mode</summary>
                ///     <param name="body"          type="function" >Handle</param>
                ///     <returns type="any">Return of handle</returns>
                /// </signature>
                /// <signature>
                ///     <summary>Run function in safely mode</summary>
                ///     <param name="body"          type="function" >Handle</param>
                ///     <param name="arguments"     type="any"      >Arguments for handle</param>
                ///     <returns type="any">Return of handle</returns>
                /// </signature>
                /// <signature>
                ///     <summary>Run function in safely mode</summary>
                ///     <param name="body"          type="function" >Handle</param>
                ///     <param name="arguments"     type="any"      >Arguments for handle</param>
                ///     <param name="call_point"    type="string"   >Text for log message.</param>
                ///     <returns type="any">Return of handle</returns>
                /// </signature>
                /// <signature>
                ///     <summary>Run function in safely mode</summary>
                ///     <param name="body"          type="function" >Handle</param>
                ///     <param name="arguments"     type="any"      >Arguments for handle</param>
                ///     <param name="call_point"    type="string"   >Text for log message.</param>
                ///     <param name="this"          type="object"   >Context of handle</param>
                ///     <returns type="any">Return of handle</returns>
                /// </signature>
                /// <signature>
                ///     <summary>Run function in safely mode</summary>
                ///     <param name="body"          type="function" >Handle</param>
                ///     <param name="arguments"     type="any"      >Arguments for handle</param>
                ///     <param name="call_point"    type="string"   >Text for log message.</param>
                ///     <param name="this"          type="object"   >Context of handle</param>
                ///     <param name="safely"        type="boolean"  >Wrap into try / catch </param>
                ///     <returns type="any">Return of handle</returns>
                /// </signature>
                function proceed() {
                    if (handle_arguments === null) {
                        return handle_body.call(this_argument);
                    } else {
                        if (typeof handle_arguments.length === "number" && typeof handle_arguments === "object") {
                            return handle_body.apply(this_argument, handle_arguments);
                        } else {
                            return handle_body.call(this_argument, handle_arguments);
                        }
                    }
                };
                var handle_body         = handle_body       || null,
                    handle_arguments    = handle_arguments  || null,
                    call_point          = call_point        || null,
                    this_argument       = this_argument     || null,
                    safely              = safely            || false;
                if (handle_body !== null) {
                    if (safely) {
                        try {
                            return proceed();
                        } catch (e) {
                            logs.log(
                                "Initializer runFunction method catch error: \r\n" +
                                logs.parseError(e) + "\r\n Call point: " + call_point,
                                logs.types.WARNING
                            );
                            return null;
                        }
                    } else {
                        return proceed();
                    }
                }
                return null;
            },
            localStorage: {
                get         : function (key, decode, prefix) {
                    /// <signature>
                    ///     <summary>Get value from localStorage</summary>
                    ///     <param name="key"       type="string"   >Key of value in localStorage</param>
                    ///     <returns type="any">Value from localStorage</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Get value from localStorage</summary>
                    ///     <param name="key"       type="string"   >Key of value in localStorage</param>
                    ///     <param name="decode"    type="boolean"  >True - decode from BASE64String</param>
                    ///     <returns type="any">Value from localStorage</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Get value from localStorage</summary>
                    ///     <param name="key"       type="string"   >Key of value in localStorage</param>
                    ///     <param name="decode"    type="boolean"  >True - decode from BASE64String</param>
                    ///     <param name="prefix"    type="string"   >Prefix for key of value</param>
                    ///     <returns type="any">Value from localStorage</returns>
                    /// </signature>
                    var value = null,
                        decode  = typeof decode === 'boolean' ? decode : false,
                        prefix  = typeof prefix === 'string' ? prefix : '';
                    try {
                        value = window.localStorage.getItem(prefix + key);
                        if (typeof value !== "string") {
                            value = null;
                        }
                        if (decode !== false) {
                            value = system.convertor.BASE64.decode(value);
                            value = system.convertor.UTF8.  decode(value);
                        }
                        return value;
                    } catch (e) {
                        return null;
                    }
                },
                set         : function (key, value, encode, prefix) {
                    /// <signature>
                    ///     <summary>Save value in localStorage</summary>
                    ///     <param name="key"       type="string"   >Key of value</param>
                    ///     <param name="value"     type="any"      >Value</param>
                    ///     <returns type="any">Value from localStorage</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Save value in localStorage</summary>
                    ///     <param name="key"       type="string"   >Key of value</param>
                    ///     <param name="value"     type="any"      >Value</param>
                    ///     <param name="decode"    type="boolean"  >True - encode to BASE64String</param>
                    ///     <returns type="any">Value from localStorage</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Save value in localStorage</summary>
                    ///     <param name="key"       type="string"   >Key of value</param>
                    ///     <param name="value"     type="any"      >Value</param>
                    ///     <param name="decode"    type="boolean"  >True - encode to BASE64String</param>
                    ///     <param name="prefix"    type="string"   >Prefix for key of value</param>
                    ///     <returns type="any">Value from localStorage</returns>
                    /// </signature>
                    var result_value = value,
                        encode          = typeof encode === 'boolean' ? encode : false,
                        prefix          = typeof prefix === 'string' ? prefix : '';
                    try {
                        window.localStorage.removeItem(prefix + key);
                        if (encode !== false) {
                            result_value = typeof value !== 'string' ? JSON.stringify(value) : result_value;
                            result_value = system.convertor.UTF8.   encode(result_value);
                            result_value = system.convertor.BASE64. encode(result_value);
                        }
                        window.localStorage.setItem(prefix + key, result_value);
                        return true;
                    } catch (e) {
                        logs.log('Error during saving data into localStorage. [key]:[' + key + ']', logs.types.WARNING);
                        return false;
                    }
                },
                del         : function (key, prefix) {
                    /// <signature>
                    ///     <summary>Remove value from localStorage</summary>
                    ///     <param name="key" type="string">Key of value</param>
                    ///     <returns type="boolean">True - success, False - fail</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Remove value from localStorage</summary>
                    ///     <param name="key"       type="string">Key of value</param>
                    ///     <param name="prefix"    type="string">Prefix for key of value</param>
                    ///     <returns type="boolean">True - success, False - fail</returns>
                    /// </signature>
                    var prefix = typeof prefix === 'string' ? prefix : '';
                    try {
                        window.localStorage.removeItem(prefix + key);
                        return true;
                    } catch (e) {
                        logs.log('Error during deleting data from localStorage. [key]:[' + key + ']', logs.types.WARNING);
                        return null;
                    }
                },
                getJSON     : function (key, prefix) {
                    /// <signature>
                    ///     <summary>Get value from localStorage and convert it to JSON</summary>
                    ///     <param name="key" type="string">Key of value in localStorage</param>
                    ///     <returns type="any">Value from localStorage</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Get value from localStorage and convert it to JSON</summary>
                    ///     <param name="key"       type="string">Key of value in localStorage</param>
                    ///     <param name="prefix"    type="string">Prefix for key of value</param>
                    ///     <returns type="any">Value from localStorage</returns>
                    /// </signature>
                    var storaged = system.localStorage.get(key, true, prefix);
                    if (storaged !== null) {
                        try{
                            storaged = JSON.parse(storaged);
                            return storaged;
                        } catch (e) {
                            return null;
                        }
                    }
                    return null;
                },
                setJSON     : function (key, value, prefix) {
                    /// <signature>
                    ///     <summary>Stringify object from JSON and save it in localStorage</summary>
                    ///     <param name="key"       type="string"   >Key of value</param>
                    ///     <param name="value"     type="any"      >Value</param>
                    ///     <returns type="any">Value from localStorage</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Stringify object from JSON and save it in localStorage</summary>
                    ///     <param name="key"       type="string"   >Key of value</param>
                    ///     <param name="value"     type="any"      >Value</param>
                    ///     <param name="prefix"    type="string"   >Prefix for key of value</param>
                    ///     <returns type="any">Value from localStorage</returns>
                    /// </signature>
                    return system.localStorage.set(key, JSON.stringify(value), true, prefix);
                },
                reset       : function (prefix) {
                    /// <signature>
                    ///     <summary>Clear all data from localStorage</summary>
                    ///     <returns type="boolean">true - success; false - fail</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Clear all data from localStorage</summary>
                    ///     <param name="prefix" type="string">Remove value with key started with prefix</param>
                    ///     <returns type="boolean">true - success; false - fail</returns>
                    /// </signature>
                    var prefix  = typeof prefix === 'string' ? prefix : '',
                        keys    = [];
                    try {
                        if (prefix !== null) {
                            for (var key in window.localStorage) {
                                if (key.indexOf(prefix) === 0) {
                                    keys.push(key);
                                }
                            }
                            keys.forEach(function (key) {
                                window.localStorage.removeItem(key);
                            });
                        } else {
                            window.localStorage.clear();
                        }
                        return true;
                    } catch (e) {
                        return false;
                    }
                },
                isAvailable : function () {
                    var id      = IDs.id(),
                        result  = false;
                    system.localStorage.set(id, id);
                    result = system.localStorage.get(id) === id ? true : false;
                    system.localStorage.del(id);
                    return result;
                }
            },
            resources   : {
                settings    : {
                    RESOURCES_MARK_ATTR: { name: 'data-flex-connect-mark', value: 'dynamically' },
                    CSS_TIMER_PROPERTY : 'flex_css_load_event_timer',
                    CSS_TIMER_DURATION : 5000,
                },
                css         : {
                    settings    : {
                        URLS    : [
                            {
                                reg     : /url\('([^\)'].*?)'\)/gi,
                                left    : /url\('/gi,
                                right   : /'\)/gi,
                                _left   : 'url("',
                                _right  : '")',
                            },
                            {
                                reg     : /url\("([^\)"].*?)"\)/gi,
                                left    : /url\("/gi,
                                right   : /"\)/gi,
                                _left   : 'url("',
                                _right  : '")',
                            },
                        ],
                        attr    : {
                            SRC : 'data-flex-src'
                        }
                    },
                    connect     : function (url, onLoad, onError) {
                        /// <signature>
                        ///     <summary>Connect CSS resource via LINK in HEAD of page</summary>
                        ///     <param name="url"       type="string"   >URL to resource</param>
                        ///     <returns type="boolean">true / false</returns>
                        /// </signature>
                        /// <signature>
                        ///     <summary>Connect CSS resource via LINK in HEAD of page</summary>
                        ///     <param name="url"       type="string"   >URL to resource</param>
                        ///     <param name="onLoad"    type="function" >Callback on load will be finished</param>
                        ///     <returns type="boolean">true / false</returns>
                        /// </signature>
                        /// <signature>
                        ///     <summary>Connect CSS resource via LINK in HEAD of page</summary>
                        ///     <param name="url"       type="string"   >URL to resource</param>
                        ///     <param name="onLoad"    type="function" >Callback on load will be finished</param>
                        ///     <param name="onError"   type="function" >Callback on some error</param>
                        ///     <returns type="boolean">true / false</returns>
                        /// </signature>
                        function addLink(url) {
                            var settings    = system.resources.settings,
                                link        = document.createElement("LINK");
                            link.type   = "text/css";
                            link.href   = url;
                            link.rel    = "stylesheet";
                            link.setAttribute(settings.RESOURCES_MARK_ATTR.name, settings.RESOURCES_MARK_ATTR.value);
                            return {
                                link    : link,
                                append  : function () { document.head.appendChild(link); }
                            };
                        };
                        function addLoadListener(link, url, onLoad) {
                            function resetTimer(link, setting) {
                                clearTimeout(link[settings.CSS_TIMER_PROPERTY]);
                                link[settings.CSS_TIMER_PROPERTY] = null;
                                delete link[settings.CSS_TIMER_PROPERTY];
                            };
                            var settings = system.resources.settings;
                            //Not all browsers supports load event for CSS. That's why using <IMG> to emulate load event
                            link[settings.CSS_TIMER_PROPERTY] = setTimeout(
                                function () {
                                    if (link[settings.CSS_TIMER_PROPERTY] !== void 0) {
                                        var img = document.createElement("IMG");
                                        resetTimer(link, settings);
                                        events.DOM.add(
                                            img,
                                            ['load', 'error'],
                                            function (event) {
                                                system.handle(onLoad, url, 'system.resources.css.connect', this);
                                            }
                                        );
                                        img.src = url;
                                    }
                                },
                                settings.CSS_TIMER_DURATION
                            );
                            events.DOM.add(
                                link,
                                'load',
                                function (event) {
                                    if (link[settings.CSS_TIMER_PROPERTY] !== void 0) {
                                        resetTimer(link, settings);
                                        system.handle(onLoad, url, 'system.resources.css.connect', this);
                                    }
                                }
                            );
                        };
                        function isConnected(url) {
                            var sheets = document.styleSheets;
                            try{
                                Array.prototype.forEach.call(
                                    document.styleSheets,
                                    function (sheet) {
                                        if (sheet.href.indexOf(url) !== -1) {
                                            throw 'found';
                                        }
                                    }
                                );
                            } catch (e) {
                                if (e === 'found') {
                                    return true;
                                }
                            }
                            return false;
                        };
                        var link            = null,
                            onLoad          = onLoad || null,
                            onError         = onError || null,
                            url             = url || null,
                            onLoadContainer = null;
                        if (url !== null) {
                            if (isConnected(url) === false) {
                                link = addLink(url);
                                //Attach common handle for error
                                events.DOM.add(
                                    link.link,
                                    'error',
                                    function (event) {
                                        logs.log(
                                            "During loading CSS resource [" + url + "] was error",
                                            logs.types.WARNING
                                        );
                                    }
                                );
                                if (onError !== null) {
                                    //Attach user error handle
                                    events.DOM.add(link.link, 'error', onError);
                                }
                                if (onLoad !== null) {
                                    addLoadListener(link.link, url, onLoad);
                                } else {
                                    system.handle(onLoad, null, 'system.resources.css.connect', this);
                                }
                                link.append();
                                return true;
                            }
                        }
                        return false;
                    },
                    adoption    : function (cssText, documentLink, url) {
                        /// <signature>
                        ///     <summary>Inject CSS text as STYLE into HEAD</summary>
                        ///     <param name="cssText"       type="string"   >CSS text</param>
                        ///     <returns type="object">link to created node STYLE</returns>
                        /// </signature>
                        /// <signature>
                        ///     <summary>Inject CSS text as STYLE into HEAD</summary>
                        ///     <param name="cssText"       type="string"   >CSS text</param>
                        ///     <param name="documentLink"  type="object"   >Link to document</param>
                        ///     <returns type="object">link to created node STYLE</returns>
                        /// </signature>
                        /// <signature>
                        ///     <summary>Inject CSS text as STYLE into HEAD</summary>
                        ///     <param name="cssText"       type="string"   >CSS text</param>
                        ///     <param name="documentLink"  type="object"   >Link to document</param>
                        ///     <param name="url"           type="string"   >URL of parent to correct paths in CSS text</param>
                        ///     <returns type="object">link to created node STYLE</returns>
                        /// </signature>
                        var documentLink    = documentLink !== null ? (typeof documentLink === "object" ? (documentLink.body !== void 0 ? documentLink : document) : document) : document,
                            style           = documentLink.createElement("style"),
                            url             = typeof url === 'string' ? url : null;
                        if (typeof cssText === 'string') {
                            try {
                                if (url !== null) {
                                    cssText = system.resources.css.correctPaths(cssText, url);
                                    style.setAttribute(system.resources.css.settings.attr.SRC, url);
                                }
                                style.type  = "text/css";
                                if (style.styleSheet) {
                                    style.styleSheet.cssText = cssText;
                                } else {
                                    style.appendChild(documentLink.createTextNode(cssText));
                                }
                                documentLink.head.appendChild(style);
                                return style;
                            } catch (e) {
                                logs.log(
                                    'Error during adoption of CSS resource: url = [' + url + '], cssText starts from [' + cssText.substr(0, 50) + ' (...)]',
                                    logs.types.CRITICAL
                                );
                                return null;
                            }
                        }
                        return null;
                    },
                    correctPaths: function (cssText, parent_url) {
                        function correct(target_url, parent_url) {
                            var url = null;
                            if (target_url.trim().toLowerCase().indexOf('data:') !== 0) {
                                url = system.url.parse(target_url, parent_url);
                                if (url !== null) {
                                    return url.url;
                                } else {
                                    return target_url;
                                }
                            } else {
                                return target_url;
                            }
                        };
                        if (config.settings.CHECK_PATHS_IN_CSS !== false && typeof parent_url === 'string') {
                            if (parent_url !== '') {
                                system.resources.css.settings.URLS.forEach(function (sets) {
                                    var urls = cssText.match(sets.reg);
                                    if (urls instanceof Array) {
                                        urls.forEach(function (url) {
                                            var href = url;
                                            href = href.replace(sets.left, '');
                                            href = href.replace(sets.right, '');
                                            href = correct(href, parent_url);
                                            if (href !== null) {
                                                cssText = cssText.replace(url, sets._left + href + sets._right);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                        return cssText;
                    }
                },
                js          : {
                    connect         : function (url, onLoad, onError) {
                        /// <signature>
                        ///     <summary>Connect JS resource via LINK in HEAD of page</summary>
                        ///     <param name="url"       type="string"   >URL to resource</param>
                        ///     <returns type="boolean">link to created node SCRIPT</returns>
                        /// </signature>
                        /// <signature>
                        ///     <summary>Connect JS resource via LINK in HEAD of page</summary>
                        ///     <param name="url"       type="string"   >URL to resource</param>
                        ///     <param name="onLoad"    type="function" >Callback on load will be finished</param>
                        ///     <returns type="boolean">link to created node SCRIPT</returns>
                        /// </signature>
                        /// <signature>
                        ///     <summary>Connect JS resource via LINK in HEAD of page</summary>
                        ///     <param name="url"       type="string"   >URL to resource</param>
                        ///     <param name="onLoad"    type="function" >Callback on load will be finished</param>
                        ///     <param name="onError"   type="function" >Callback on some error</param>
                        ///     <returns type="boolean">link to created node SCRIPT</returns>
                        /// </signature>
                        function addScript(url) {
                            var settings    = system.resources.settings,
                                script      = document.createElement("SCRIPT");
                            script.type = "application/javascript";
                            script.src  = url;
                            script.setAttribute(settings.RESOURCES_MARK_ATTR.name, settings.RESOURCES_MARK_ATTR.value);
                            return {
                                script: script,
                                append: function () { document.head.appendChild(script); }
                            };
                        };
                        var script  = null,
                            onLoad  = onLoad || null,
                            onError = onError || null,
                            url     = url || null;
                        if (url !== null) {
                            script = addScript(url);
                            if (onLoad !== null) {
                                events.DOM.add(script.script, "load", onLoad);
                            }
                            if (onError !== null) {
                                events.DOM.add(script.script, "error", onError);
                            }
                            script.append();
                            return script.script;
                        }
                        return false;
                    },
                    adoption        : function (jsScript, onFinish) {
                        /// <signature>
                        ///     <summary>Generate script within JS text</summary>
                        ///     <param name="jsScript"  type="string"   >JS text</param>
                        ///     <returns type="void">void</returns>
                        /// </signature>
                        /// <signature>
                        ///     <summary>Generate script within JS text</summary>
                        ///     <param name="jsScript"  type="string"   >JS text</param>
                        ///     <param name="onFinish"  type="function" >Callback on finish</param>
                        ///     <returns type="void">void</returns>
                        /// </signature>
                        var resourceJS  = document.createElement("SCRIPT"),
                            onFinish    = onFinish || null,
                            jsScript    = jsScript || null;
                        if (jsScript !== null) {
                            resourceJS.type = "application/javascript";
                            resourceJS.appendChild(document.createTextNode(jsScript));
                            document.body.insertBefore(resourceJS, document.body.childNodes[0]);
                            if (onFinish !== null) {
                                system.handle(onFinish, null, 'system.resources.js.adoption', this);
                            }
                        }
                    },
                    getCurrentSRC   : function () {
                        ///     <summary>Try to get URL of current (running) script</summary>
                        ///     <returns type="STRING">URL</returns>
                        var urls = null;
                        try {
                            throw new Error('Script URL detection');
                        }
                        catch (e) {
                            if (typeof e.stack === 'string') {
                                urls = e.stack.match(options.regs.urls.JS_URL);
                                if (urls instanceof Array) {
                                    if (urls.length > 0) {
                                        //Exclude parent script (flex.core.js)
                                        return urls[urls.length - 1].indexOf(options.files.CORE_URL) === -1 ? urls[urls.length - 1] : null;
                                    }
                                }
                            }
                            return null;
                        }
                    }
                }
            },
            convertor   : {
                UTF8    : {
                    encode: function (s) {
                        return unescape(encodeURIComponent(s));
                    },
                    decode: function (s) {
                        return decodeURIComponent(escape(s));
                    }
                },
                BASE64  : {
                    decode: function (s) {
                        var e = {}, i, k, v = [], r = "", w = String.fromCharCode, z,
                            n = [[65, 91], [97, 123], [48, 58], [43, 44], [47, 48]],
                            b = 0, c, x, l = 0, o = 0, char, num;
                        for (z in n) { for (i = n[z][0]; i < n[z][1]; i++) { v.push(w(i)); } }
                        for (i = 0; i < 64; i++) { e[v[i]] = i; }
                        if (s.length < 100) {
                            var stop = true;
                        }
                        for (i = 0; i < s.length; i += 72) {
                            o = s.substring(i, i + 72);
                            for (x = 0; x < o.length; x++) {
                                c = e[o.charAt(x)]; b = (b << 6) + c; l += 6;
                                while (l >= 8) {
                                    char = w((b >>> (l -= 8)) % 256);
                                    num = char.charCodeAt(0);
                                    r = (num !== 0 ? r + char : r);
                                }
                            }
                        }
                        return r;
                    },
                    encode: function (s) {
                        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                            o1, o2, o3, h1, h2, h3, h4, r, bits, i = 0,
                            ac = 0,
                            enc = "",
                            tmp_arr = [];
                        if (!s) {
                            return s;
                        }
                        do { // pack three octets into four hexets
                            o1 = s.charCodeAt(i++);
                            o2 = s.charCodeAt(i++);
                            o3 = s.charCodeAt(i++);
                            bits = o1 << 16 | o2 << 8 | o3;
                            h1 = bits >> 18 & 0x3f;
                            h2 = bits >> 12 & 0x3f;
                            h3 = bits >> 6 & 0x3f;
                            h4 = bits & 0x3f;
                            // use hexets to index into b64, and append result to encoded string
                            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
                        } while (i < s.length);
                        enc = tmp_arr.join('');
                        r = s.length % 3;
                        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
                    }
                }
            },
            url         : {
                settings            : {
                    parser: {
                        LAST        : /([^\/]*)$/gi,
                        CORRECTION  : /[\/\\]$/gi,
                        BAD_SLASH   : /\\/gi,
                        PROTOCOL    : /:\/\//gi,
                        DOUBLE      : /\/{2,}/gi
                    }
                },
                getURLInfo          : function (url) {
                    var a       = document.createElement('a'),
                        result  = null;
                    if (typeof url === 'string') {
                        a.setAttribute('href', url);
                        result = {
                            hostname: a.hostname,
                            host    : a.host,
                            port    : a.port,
                            protocol: a.protocol,
                            isFull  : false
                        };
                        if (result.hostname !== '') {
                            result.isFull = url.indexOf(result.protocol + '//' + result.hostname) !== 0 ? false : true;
                        } else {
                            result.isFull = false;
                        }
                    }
                    return result;
                },
                getCurrentDomain    : function () {
                    var url = null;
                    if (window.location.origin) {
                        url = window.location.origin;
                    } else {
                        url = window.location.protocol + '//' + window.location.host;
                    }
                    return url;
                },
                getParams           : function (url) {
                    /// <signature>
                    ///     <summary>Parsing of parameters in URL</summary>
                    ///     <param name="url"       type="string">URL</param>
                    ///     <returns type="object">{url: string; params: object}</returns>
                    /// </signature>
                    var params = null,
                        _params = null;
                    url     = url.split('?');
                    params  = url.length === 2 ? url[1] : null;
                    url     = url[0];
                    if (params !== null) {
                        _params = params.split('&');
                        params  = {};
                        _params.forEach(function (param) {
                            var pear = param.split('=');
                            if (pear.length === 2) {
                                params[pear[0]] = pear[1];
                            }
                        });
                    }
                    return {
                        url     : url,
                        params  : params
                    };
                },
                restoreFullURL      : function (url){
                    /// <signature>
                    ///     <summary>Add current domain to URL (if there are no definition of domain)</summary>
                    ///     <param name="url"type="string">URL</param>
                    ///     <returns type="object">Restored URL</returns>
                    /// </signature>
                    var _url = url;
                    if (typeof url === 'string') {
                        _url = system.url.getURLInfo(_url);
                        if (_url.isFull === false) {
                            if (_url.hostname === '') {
                                return system.url.getCurrentDomain() + (url.indexOf('/') !== 0 ? '/' : '') + url;
                            } else {
                                return _url.protocol + '//' + _url.host + (url.indexOf('/') !== 0 ? '/' : '') + url;
                            }
                        } else {
                            return url;
                        }
                    }
                    return null;
                },
                parse               : function (url, origin) {
                    /// <signature>
                    ///     <summary>Parsing of URL</summary>
                    ///     <param name="url"       type="string">URL</param>
                    ///     <returns type="object">Parsed URL</returns>
                    /// </signature>
                    /// <signature>
                    ///     <summary>Parsing of URL</summary>
                    ///     <param name="url"       type="string">URL</param>
                    ///     <param name="origin"    type="string">Original URL (i can be needed if URL hasn't domain definition. Like this ../folder/resource.ext</param>
                    ///     <returns type="object">Parsed URL</returns>
                    /// </signature>
                    function steps(url) {
                        var count       = 0,
                            valid       = true,
                            previous    = -1,
                            clear_url   = '';
                        url.split('/').forEach(function (part, index) {
                            if (part === '..') {
                                count += 1;
                                if (previous !== -1) {
                                    if (previous !== index - 1) {
                                        valid = false;
                                    }
                                }
                                previous = index;
                            } else {
                                clear_url += '/' + part;
                            }
                        });
                        return (valid === true ? { count: count, url: clear_url } : false);
                    };
                    function correction(url) {
                        url = url.replace(system.url.settings.parser.CORRECTION, '');
                        url = url.replace(system.url.settings.parser.BAD_SLASH, '/');
                        return url;
                    };
                    var result      = null,
                        info        = null,
                        origin      = typeof origin === 'string' ? origin : null,
                        back_steps  = 0,
                        _origin     = null,
                        params      = null;
                    if (typeof url === 'string') {
                        url     = correction(url);
                        params  = system.url.getParams(url);
                        url     = params.url;
                        params  = params.params;
                        info    = system.url.getURLInfo(url);
                        if (info !== null) {
                            back_steps = steps(url);
                            if (back_steps !== false) {
                                if (back_steps.count > 0) {
                                    /*If URL has some "back" direction like [../../folder/resource.ext]
                                    * In this case we need origin URL to build valid path
                                    * */
                                    if (origin !== null) {
                                        _origin = system.url.parse(origin);
                                        if (_origin !== null) {
                                            if (back_steps.count < _origin.parts.length - 1) {
                                                _origin.parts.splice(_origin.parts.length - back_steps.count, back_steps.count);
                                                _origin.parts = _origin.parts.map(function (item) {
                                                    return (item === '//' ? '' : item);
                                                });
                                                url = _origin.parts.join('/') + back_steps.url;
                                                return system.url.parse(url);
                                            }
                                        }
                                    }
                                } else {
                                    if (info.isFull === false){
                                        /*If URL has not root path. URL looks like [folder/resource.ext] or [resource.ext]
                                        * In this case we need origin URL to build valid path
                                        */
                                        origin  = origin === null ? system.url.getCurrentDomain() : origin;
                                        _origin = system.url.parse(origin);
                                        if (_origin !== null) {
                                            if (url.indexOf('~/') === 0) {
                                                url = url.replace('~', _origin.home);
                                            } else {
                                                _origin.parts = _origin.parts.map(function (item) {
                                                    return (item === '//' ? '' : item);
                                                });
                                                url = _origin.parts.join('/') + (url.indexOf('/') !== 0 ? '/' : '') + url;
                                            }
                                            return system.url.parse(url);
                                        }
                                    } else {
                                        /*If we are in this section, it means that we have everything to parse URL*/
                                        result  = {
                                            target      : url.match(system.url.settings.parser.LAST),
                                            _path       : '',
                                            _url        : url,
                                            _hostname   : info.hostname,
                                            hostname    : info.hostname !== '' ? info.hostname  : window.location.hostname,
                                            _host       : info.host,
                                            host        : info.host     !== '' ? info.host      : window.location.host,
                                            _port       : info.port,
                                            port        : info.port     !== '' ? info.port      : window.location.port,
                                            _protocol   : info.protocol,
                                            protocol    : info.protocol !== ':'? info.protocol  : window.location.protocol,
                                            home        : info.hostname === '' ? window.location.protocol   + '//' + window.location.host   : info.protocol + '//' + info.host,
                                            _home       : info.hostname !== '' ? info.protocol + '//' + info.host : '',
                                            params      : params,
                                            parts       : null
                                        };
                                        if (result.target.length > 0) {
                                            if (result.target instanceof Array) {
                                                result.target = result.target[0];
                                                if (result.target.indexOf('.') === -1) {
                                                    result.target = '';
                                                }
                                            } else {
                                                result.target = '';
                                            }
                                            result._path    = url.replace(result.target, '');
                                            if (result._home === '') {
                                                result.path = result.home + (result._path.  indexOf('/') === 0 ? '' : '/') + result._path;
                                                result.url  = result.home + (result._url.   indexOf('/') === 0 ? '' : '/') + result._url;
                                            } else {
                                                result.path = result._path;
                                                result.url  = result._url;
                                            }
                                            result.parts = result.url.split('/').map(function (item) {
                                                return (item === '' ? '//' : item);
                                            });
                                            if (result.parts.indexOf(result.target) !== -1) {
                                                result.parts.splice(result.parts.indexOf(result.target), 1);
                                            }
                                            return result;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return null;
                },
                sterilize           : function (url) {
                    var protocol = IDs.id();
                    return url. replace(system.url.settings.parser.PROTOCOL, protocol).
                                replace(system.url.settings.parser.BAD_SLASH, '/').
                                replace(system.url.settings.parser.DOUBLE, '/').
                                replace(protocol, '://');
                },
                getTypeOfResource   : function (url) {
                    var _url = url.replace(options.regs.urls.PARAMS, '');
                    _url = _url.match(options.regs.urls.EXTENSION);
                    if (_url instanceof Array) {
                        if (_url.length === 1) {
                            return _url[0].toLowerCase();
                        }
                    }
                    return null;
                },
                is                  : {
                    clear   : function(url){
                        if (typeof url === 'string') {
                            url = url.split('?');
                            url = url[0];
                            url = url.replace(options.regs.urls.NOT_URL_SYMBOLS, '');
                            return url;
                        }
                        return null;
                    },
                    js      : function (url) {
                        url = system.url.is.clear(url);
                        if (url !== null) {
                            options.regs.urls.JS_EXP_IN_URL.lastIndex = 0;
                            return options.regs.urls.JS_EXP_IN_URL.test(url);
                        }
                        return false;
                    },
                    css     : function (url) {
                        url = system.url.is.clear(url);
                        if (url !== null) {
                            options.regs.urls.CSS_EXP_IN_URL.lastIndex = 0;
                            return options.regs.urls.CSS_EXP_IN_URL.test(url);
                        }
                        return false;
                    },
                }
            },
        };
        IDs             = {
            id: (function () {
                var index = 0;
                return function (prefix) {
                    index += 1;
                    return (prefix || '') + (new Date()).valueOf() + '_' + index;
                };
            }()),
        };
        logs            = {
            types       : {
                CRITICAL        : 'CRITICAL',
                LOGICAL         : 'LOGICAL',
                WARNING         : 'WARNING',
                NOTIFICATION    : 'NOTIFICATION',
                LOGS            : 'LOG',
                KERNEL_LOGS     : 'KERNEL_LOGS',
            },
            rendering   : {
                CRITICAL        : 'color: #FF0000;font-weight:bold;',
                LOGICAL         : 'color: #00FFF7;font-weight:bold;',
                WARNING         : 'color: #A69600;font-weight:bold;',
                NOTIFICATION    : 'color: #988DFF;font-weight:bold;',
                LOGS            : 'color: #6C6C6C;',
                KERNEL_LOGS     : 'color: #008B0E;font-weight:bold;',
            },
            parseError  : function (e) {
                /// <signature>
                ///     <summary>Create string from error object</summary>
                ///     <param name="error" type="object">Error object</param>
                ///     <returns type="string">String</returns>
                /// </signature>
                var message = e.name + ": " + e.message + "\r\n--------------------------------------------";
                for (var property in e) {
                    if (property !== "name" && property !== "message") {
                        message = message + "\r\n  " + property + "=" + e[property];
                    }
                }
                return message;
            },
            log         : function (message, type) {
                /// <signature>
                ///     <summary>Add log message to console</summary>
                ///     <param name="message"   type="string">Message</param>
                ///     <returns type="void">void</returns>
                /// </signature>
                /// <signature>
                ///     <summary>Add log message to console</summary>
                ///     <param name="message"   type="string">Message</param>
                ///     <param name="type"      type="string">Type of message</param>
                ///     <returns type="void">void</returns>
                /// </signature>
                var type = type || 'LOGS';
                if (console && logs.types[type]) {
                    if (console.log !== void 0) {
                        if (config.settings.SHOWN_LOGS.indexOf(type) !== -1) {
                            console.log('%c [' + type + ']' + '%c' + message, logs.rendering[type], logs.rendering.LOGS);
                        }
                    }
                }
            },
        };
        wrappers        = {
            callers     : {
                node    : (function () {
                    var cache = {};
                    return function (selector, use_cache, document_link) {
                        var node        = null,
                            use_cache   = typeof use_cache === 'boolean' ? use_cache : false;
                        if (typeof selector === 'string') {
                            if (use_cache) {
                                if (cache[selector]) {
                                    if (cache[selector] !== null) {
                                        node = cache[selector];
                                    }
                                }
                            }
                            node = node !== null ? node : (document_link || document).querySelector(selector);
                            if (use_cache && !cache[selector] && node !== null) {
                                cache[selector] = node;
                            }
                            if (node !== null) {
                                return new wrappers.constructors.node(node);
                            }
                        } else {
                            if (selector !== void 0) {
                                if (typeof selector.nodeName === 'string' || selector == window) {
                                    return new wrappers.constructors.node(selector);
                                }
                            }
                        }
                        return null;
                    };
                }()),
                nodes   : (function () {
                    var cache = {};
                    return function (selector, use_cache, document_link) {
                        var nodes       = null,
                            use_cache   = typeof use_cache === 'boolean' ? use_cache : false;
                        if (typeof selector === 'string') {
                            if (use_cache) {
                                if (cache[selector]) {
                                    if (cache[selector] !== null) {
                                        if (cache[selector].length > 0) {
                                            nodes = cache[selector];
                                        }
                                    }
                                }
                            }
                            nodes = nodes !== null ? nodes : (document_link || document).querySelectorAll(selector);
                            if (use_cache && !cache[selector] && nodes !== null) {
                                if (nodes.length > 0) {
                                    cache[selector] = nodes;
                                }
                            }
                            if (nodes !== null) {
                                return new wrappers.constructors.nodes(nodes);
                            }
                        } else {
                            if (selector !== void 0) {
                                if (typeof selector.length === 'number') {
                                    if (selector.length > 0) {
                                        if (typeof selector[0] === 'string') {
                                            nodes = [];
                                            Array.prototype.forEach.call(selector, function (selector, index) {
                                                var node = (document_link || document).querySelector(selector);
                                                if (node !== null) {
                                                    nodes.push(node);
                                                }
                                            });
                                            return new wrappers.constructors.nodes(nodes);
                                        } else if (typeof selector[0].nodeName === 'string') {
                                            return new wrappers.constructors.nodes(selector);
                                        }
                                    }
                                }
                            }
                        }
                        return null;
                    };
                }()),
                array   : function (_array) {
                    if (_array instanceof Array) {
                        return new wrappers.constructors.array(_array);
                    } else {
                        return null;
                    }
                },
                string  : function (_string) {
                    if (typeof _string === 'string') {
                        return new wrappers.constructors.string(_string);
                    } else {
                        return null;
                    }
                },
                boolean : function (_boolean) {
                    if (typeof _boolean === 'boolean') {
                        return new wrappers.constructors.boolean(_boolean);
                    } else {
                        return null;
                    }
                },
                object  : function (_object) {
                    if (typeof _object === 'object') {
                        return new wrappers.constructors.object(_object);
                    } else {
                        return null;
                    }
                },
            },
            prototypes  : {
                node    : {},
                nodes   : {},
                array   : {},
                string  : {},
                boolean : {},
                object  : {},
                update  : {
                    update  : function (target) {
                        function update(obj) {
                            var updated = null;
                            for (var pro in obj) {
                                if (obj.hasOwnProperty(pro)) {
                                    if (typeof obj[pro] === 'object') {
                                        updated = function () { updated.target = this.target; return updated; };
                                        for (var subpro in obj[pro]) {
                                            updated[subpro] = obj[pro][subpro];
                                        }
                                        obj[pro] = updated;
                                    }
                                    if (typeof obj[pro] === 'function') {
                                        update(obj[pro]);
                                    }
                                }
                            }
                        };
                        if (wrappers.prototypes[target]) {
                            update(wrappers.prototypes[target]);
                        }
                    },
                    node    : function () { wrappers.prototypes.update.update('node'    ); },
                    nodes   : function () { wrappers.prototypes.update.update('nodes'   ); },
                    array   : function () { wrappers.prototypes.update.update('array'   ); },
                    string  : function () { wrappers.prototypes.update.update('string'  ); },
                    boolean : function () { wrappers.prototypes.update.update('boolean' ); },
                    object  : function () { wrappers.prototypes.update.update('object'  ); }
                },
                add     : {
                    add     : function (target, path, value) {
                        var steps = null,
                            proto = null;
                        if (typeof target === 'string' && typeof path === 'string' && value !== void 0) {
                            if (wrappers.prototypes[target]) {
                                steps = path.split('.');
                                proto = wrappers.prototypes[target];
                                steps.forEach(function (property, index) {
                                    if (proto[property] === void 0) {
                                        if (index === steps.length - 1) {
                                            proto[property] = value;
                                        } else {
                                            proto[property] = {};
                                            proto           = proto[property];
                                        }
                                    } else if (typeof proto[property] === 'object' || typeof proto[property] === 'function') {
                                        proto           = proto[property];
                                    } else {
                                        proto[property] = {};
                                        proto           = proto[property];
                                    }
                                });
                                wrappers.prototypes.update[target]();
                            }
                        }
                    },
                    node    : function (path, value) { wrappers.prototypes.add.add('node',      path, value); },
                    nodes   : function (path, value) { wrappers.prototypes.add.add('nodes',     path, value); },
                    array   : function (path, value) { wrappers.prototypes.add.add('array',     path, value); },
                    string  : function (path, value) { wrappers.prototypes.add.add('string',    path, value); },
                    boolean : function (path, value) { wrappers.prototypes.add.add('boolean',   path, value); },
                    object  : function (path, value) { wrappers.prototypes.add.add('object',    path, value); }
                }
            },
            constructors: {
                node    : function (node    ) { this.target = node;     },
                nodes   : function (nodes   ) { this.target = nodes;    },
                array   : function (array   ) { this.target = array;    },
                string  : function (string  ) { this.target = string;   },
                boolean : function (boolean ) { this.target = boolean;  },
                object  : function (object  ) { this.target = object;   }
            },
            build       : function () {
                for (var constructor in wrappers.constructors) {
                    wrappers.constructors[constructor].prototype = wrappers.prototypes[constructor];
                }
                return true;
            }
        };
        //Private part
        privates        = {
            init            : config.init,
            oop             : {
                objects     : {
                    copy        : oop.objects.copy,
                    extend      : oop.objects.extend,
                    forEach     : oop.objects.forEach,
                    validate    : oop.objects.validate,
                    isValueIn   : oop.objects.isValueIn,
                },
                classes     : {
                    of      : oop.classes.of,
                    create  : oop.classes.create
                },
            },
            unique          : IDs.id,
            events          : {
                DOM : {
                    add     : events.DOM.add,
                    remove  : events.DOM.remove,
                },
                core: {
                    fire    : events.core.fire,
                    listen  : events.core.listen,
                    register: events.core.register,
                    remove  : events.core.remove,
                }
            },
            overhead        : {
                globaly: {
                    set: overhead.globaly.set,
                    get: overhead.globaly.get,
                    del: overhead.globaly.remove
                },
                objecty: {
                    set: overhead.objecty.set,
                    get: overhead.objecty.get,
                    del: overhead.objecty.remove
                },
                register: {
                    open: overhead.register.open,
                    add : overhead.register.add,
                    done: overhead.register.done,
                }
            },
            ajax            : {
                send    : ajax.create,
                methods : {
                    POST    : ajax.settings.methods.POST,
                    GET     : ajax.settings.methods.GET,
                    PUT     : ajax.settings.methods.PUT,
                    DELETE  : ajax.settings.methods.DELETE,
                    OPTIONS : ajax.settings.methods.OPTIONS,
                }
            },
            logs            : {
                parseError  : logs.parseError,
                log         : logs.log,
                types       : logs.types
            },
            callers         : {
                node    : wrappers.callers.node,
                nodes   : wrappers.callers.nodes,
                array   : wrappers.callers.array,
                object  : wrappers.callers.object,
                string  : wrappers.callers.string,
                boolean : wrappers.callers.boolean,
                define  : {
                    node    : wrappers.prototypes.add.node,
                    nodes   : wrappers.prototypes.add.nodes,
                    array   : wrappers.prototypes.add.array,
                    object  : wrappers.prototypes.add.object,
                    string  : wrappers.prototypes.add.string,
                    boolean : wrappers.prototypes.add.boolean,
                }
            },
            resources       : {
                parse   : {
                    css : {
                        stringify: parsing.css.stringify
                    }
                },
                attach  : {
                    css : {
                        connect : system.resources.css.connect,
                        adoption: system.resources.css.adoption,
                    },
                    js  : {
                        connect         : system.resources.js.connect,
                        adoption        : system.resources.js.adoption,
                        getCurrentSRC   : system.resources.js.getCurrentSRC
                    }
                }
            },
            system          : {
                handle      : system.handle,
                convertor   : {
                    UTF8    : {
                        encode  : system.convertor.UTF8.encode,
                        decode  : system.convertor.UTF8.decode,
                    },
                    BASE64  : {
                        encode  : system.convertor.BASE64.encode,
                        decode  : system.convertor.BASE64.decode,
                    },
                },
                url     : {
                    parse   : system.url.parse,
                    restore : system.url.restoreFullURL
                }
            },
            localStorage    : {
                add     : system.localStorage.set,
                get     : system.localStorage.get,
                del     : system.localStorage.del,
                addJSON : system.localStorage.setJSON,
                getJSON : system.localStorage.getJSON,
            },
            hashes          : {
                get     : hashes.get,
                update  : hashes.update.add
            },
            config          : {
                get : config.get,
                set : config.set
            }
        };
        ///Options of flex
        options.files.detect();
        //Build wrappers
        wrappers.build();
        //Add wrappers
        oop.wrappers.objects();
        //Public methods and properties
        return {
            init            : privates.init,
            oop             : {
                objects     : {
                    copy        : privates.oop.objects.copy,
                    extend      : privates.oop.objects.extend,
                    forEach     : privates.oop.objects.forEach,
                    validate    : privates.oop.objects.validate,
                    isValueIn   : privates.oop.objects.isValueIn,
                },
                classes     : {
                    of      : privates.oop.classes.of,
                    create  : privates.oop.classes.create
                },
            },
            unique          : privates.unique,
            events          : {
                DOM : {
                    add     : privates.events.DOM.add,
                    remove  : privates.events.DOM.remove,
                },
                core: {
                    fire    : privates.events.core.fire,
                    listen  : privates.events.core.listen,
                    register: privates.events.core.register,
                    remove  : privates.events.core.remove,
                }
            },
            overhead        : {
                globaly: {
                    set: privates.overhead.globaly.set,
                    get: privates.overhead.globaly.get,
                    del: privates.overhead.globaly.del
                },
                objecty: {
                    set: privates.overhead.objecty.set,
                    get: privates.overhead.objecty.get,
                    del: privates.overhead.objecty.del
                },
                register: {
                    open: privates.overhead.register.open,
                    add : privates.overhead.register.add,
                    done: privates.overhead.register.done,
                }
            },
            ajax            : {
                send    : privates.ajax.send,
                methods : privates.ajax.methods
            },
            resources       : {
                parse   : {
                    css : {
                        stringify: privates.resources.parse.css.stringify
                    }
                },
                attach  : {
                    css : {
                        connect : privates.resources.attach.css.connect,
                        adoption: privates.resources.attach.css.adoption,
                    },
                    js  : {
                        connect         : privates.resources.attach.js.connect,
                        adoption        : privates.resources.attach.js.adoption,
                        getCurrentSRC   : privates.resources.attach.js.getCurrentSRC
                    }
                }
            },
            localStorage    : {
                add     : privates.localStorage.add,
                get     : privates.localStorage.get,
                del     : privates.localStorage.del,
                addJSON : privates.localStorage.addJSON,
                getJSON : privates.localStorage.getJSON,
            },
            system          : {
                handle      : privates.system.handle,
                convertor   : {
                    UTF8    : {
                        encode  : privates.system.convertor.UTF8.encode,
                        decode  : privates.system.convertor.UTF8.decode,
                    },
                    BASE64  : {
                        encode  : privates.system.convertor.BASE64.encode,
                        decode  : privates.system.convertor.BASE64.decode,
                    },
                },
                url         : {
                    parse   : privates.system.url.parse,
                    restore : privates.system.url.restore
                }
            },
            logs            : {
                parseError  : privates.logs.parseError,
                log         : privates.logs.log,
                types       : privates.logs.types
            },
            hashes          : {
                get     : privates.hashes.get,
                update  : privates.hashes.update
            },
            callers         : {
                node    : privates.callers.node,
                nodes   : privates.callers.nodes,
                array   : privates.callers.array,
                object  : privates.callers.object,
                string  : privates.callers.string,
                boolean : privates.callers.boolean,
                define  : {
                    node    : privates.callers.define.node,
                    nodes   : privates.callers.define.nodes,
                    array   : privates.callers.define.array,
                    object  : privates.callers.define.object,
                    string  : privates.callers.define.string,
                    boolean : privates.callers.define.boolean,
                }
            },
            config          : {
                get: privates.config.get,
                set: privates.config.set
            }
        };
    };
    //Create core
    Core.prototype          = Core.prototype();
    window['flex'       ]   = new Core();
    //Define short callers
    window['_node'      ]   = flex.callers.node;
    window['_nodes'     ]   = flex.callers.nodes;
    window['_array'     ]   = flex.callers.array;
    window['_object'    ]   = flex.callers.object;
    window['_string'    ]   = flex.callers.string;
    window['_boolean'   ]   = flex.callers.boolean;
    //Create register
    flex.registry           = {};
    flex.registry.events    = {
        ui: {
            window: {
                resize  : {
                    GROUP   : 'flex.ui.window.resize',
                    REFRESH : 'refresh',
                    FINISH  : 'finish',
                },
                maximize: {
                    GROUP       : 'flex.ui.window.maximize',
                    MAXIMIZED   : 'maximized',
                    RESTORED    : 'restored',
                    CHANGE      : 'change',
                }
            },
            patterns: {
                GROUP   : 'flex.ui.patterns',
                MOUNTED : 'mounted',
            }
        }
    };
    //Create prototypes
    Events.prototype        = Events.prototype();
    Binds.prototype         = Binds.prototype();
    Patterns.prototype      = Patterns.prototype();
    Html.prototype          = Html.prototype();
    Focus.prototype         = Focus.prototype();
    Move.prototype          = Move.prototype();
    Resize.prototype        = Resize.prototype();
    Maximize.prototype      = Maximize.prototype();
    //Init libraries
    window['flex'].libraries = {
        events  : new Events(),
        binds   : new Binds(),
        html    : new Html(),
        ui      : {
            window  : {
                move    : new Move(),
                resize  : new Resize(),
                maximize: new Maximize(),
                focus   : new Focus()
            },
            patterns: new Patterns(),
        }
    };
    //Define other short callers
    window['_patterns']   = flex.libraries.ui.patterns;
}());