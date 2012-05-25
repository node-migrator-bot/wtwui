(function(a){if(!a.require&&!a.define){var b={};function c(a,c,d){if(!b[a]){var e=[];if(typeof c=="object")for(var f=0;f<c.length;f++)e.push(b[c[f]]);else typeof c=="function"&&(d=c);b[a]=d.apply({},e)}}function d(a,c){var d=[];for(var e=0;e<a.length;e++)d.push(b[a[e]]);c.apply({},d)}d.config=function(){}}c("lib/classextends",[],function(){var a=Object.prototype.hasOwnProperty;return function(b,c){function e(){this.constructor=b}for(var d in c)a.call(c,d)&&(b[d]=c[d]);return e.prototype=c.prototype,b.prototype=new e,b.__super__=c.prototype,b}}),c("lib/Event",[],function(){var a;return a=function(){function a(a,b){this.key=b,this.context=a||this,this.handlers=[]}return a.prototype.addHandler=function(a){if(!a)return!1;this.handlers.push(a)},a.prototype.removeHandler=function(a){var b;for(b=this.handlers.length-1;b>=0;b--)this.handlers[b]===a&&this.handlers.splice(b,1)},a.prototype.fire=function(){var a,b,c;for(a=this.handlers.length-1;a>=0;a--)b=this.handlers[a],c=this.context||this,b.apply(this.context,arguments)},a}(),a}),c("lib/EventEmitter",["lib/Event"],function(a){var b;return b=function(){function b(){this.eventRegister={}}return b.prototype.event=function(b){var c,b;if(b instanceof Array||typeof b=="object"&&b.length)b=b.join(".");else if(b.length===0)throw new Error("EventEmitter.prototype.event received empty key argument");return b=b.toLowerCase(),this.eventRegister[b]?c=this.eventRegister[b]:(c=new a(this,b),this.eventRegister[b]=c),c},b.prototype.emit=function(a){var b,c,d,a;if(a instanceof Array||typeof a=="object"&&a.length)a=a.join("");return a=a.toLowerCase(),d=Array.prototype.slice,b=this.eventRegister[a],c=[],arguments.length>1&&(c=d.call(arguments,1)),b&&setTimeout(function(){b.fire.apply(b,c)},0),this},b.prototype.on=function(a,b){var c;return c=this.event(a),c.addHandler(b),this},b.prototype.off=function(a,b){return this.removeAllEventListeners.apply(this,arguments)},b.prototype.addEventListener=function(a,b){return this.on.apply(this,arguments)},b.prototype.removeEventListener=function(a,b){var c,a;return a=a.toLowerCase(),c=this.event(a),c.removeHandler(b),this},b.prototype.removeAllEventListeners=function(a){var a;return a=a.toLowerCase(),this.eventRegister[a]&&delete this.eventRegister[a],this},b.prototype.once=function(a,b){function d(){b(),setTimeout(function(){c.removeHandler(d)},0)}var c;return c=this.event(a),c.addHandler(d),this},b}(),b}),function(){var a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],b=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,e=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,f=typeof location!="undefined"&&location.href,g=f&&location.protocol&&location.protocol.replace(/\:/,""),h=f&&location.hostname,i=f&&(location.port||void 0),j=[];c("lib/text",[],function(){var c,l;return c={version:"1.0.8",strip:function(a){if(a){var a=a.replace(b,""),c=a.match(e);c&&(a=c[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")},createXhr:function(){var b,c,d;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;if(typeof ActiveXObject!="undefined")for(c=0;c<3;c++){d=a[c];try{b=new ActiveXObject(d)}catch(e){}if(b){a=[d];break}}return b},parseName:function(a){var b=!1,c=a.indexOf("."),d=a.substring(0,c),a=a.substring(c+1,a.length),c=a.indexOf("!");return c!==-1&&(b=a.substring(c+1,a.length),b=b==="strip",a=a.substring(0,c)),{moduleName:d,ext:a,strip:b}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,b,d,e){var f=c.xdRegExp.exec(a),g;return f?(a=f[2],f=f[3],f=f.split(":"),g=f[1],f=f[0],(!a||a===b)&&(!f||f===d)&&(!g&&!f||g===e)):!0},finishLoad:function(a,b,d,e,f){d=b?c.strip(d):d,f.isBuild&&(j[a]=d),e(d)},load:function(a,b,d,e){if(e.isBuild&&!e.inlineText)d();else{var j=c.parseName(a),k=j.moduleName+"."+j.ext,l=b.toUrl(k),m=e&&e.text&&e.text.useXhr||c.useXhr;!f||m(l,g,h,i)?c.get(l,function(b){c.finishLoad(a,j.strip,b,d,e)}):b([k],function(a){c.finishLoad(j.moduleName+"."+j.ext,j.strip,a,d,e)})}},write:function(a,b,d){if(j.hasOwnProperty(b)){var e=c.jsEscape(j[b]);d.asModule(a+"!"+b,"define(function () { return '"+e+"';});\n")}},writeFile:function(a,b,d,e,f){var b=c.parseName(b),g=b.moduleName+"."+b.ext,h=d.toUrl(b.moduleName+"."+b.ext)+".js";c.load(g,d,function(){var b=function(a){return e(h,a)};b.asModule=function(a,b){return e.asModule(a,h,b)},c.write(a,g,b,f)},f)}},c.createXhr()?c.get=function(a,b){var d=c.createXhr();d.open("GET",a,!0),d.onreadystatechange=function(){d.readyState===4&&b(d.responseText)},d.send(null)}:typeof process!="undefined"&&process.versions&&process.versions.node?(l=d.nodeRequire("fs"),c.get=function(a,b){var c=l.readFileSync(a,"utf8");c.indexOf("﻿")===0&&(c=c.substring(1)),b(c)}):typeof Packages!="undefined"&&(c.get=function(a,b){var c=new java.io.File(a),d=java.lang.System.getProperty("line.separator"),c=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(c),"utf-8")),e,f,g="";try{e=new java.lang.StringBuffer,(f=c.readLine())&&f.length()&&f.charAt(0)===65279&&(f=f.substring(1));for(e.append(f);(f=c.readLine())!==null;)e.append(d),e.append(f);g=String(e.toString())}finally{c.close()}b(g)}),c})}(),c("lib/text!lib/Dialog/template.html",[],function(){return'<div class="wtwui-dialog wtwui-element">\n  <h1 class="title"></h1>\n  <div class="close">×</div>\n  <div class="content"></div>\n  <div class="buttons">\n    \n  </div>\n</div>'}),c("lib/text!lib/Overlay/template.html",[],function(){return'<div class="wtwui-overlay"></div>'}),c("lib/Overlay",["lib/classextends","lib/EventEmitter","lib/text!lib/Overlay/template.html"],function(a,b,c){var d;return d=function(){function d(a){d.__super__.constructor.apply(this,arguments),this.options=d.defaults();if(typeof a=="object")for(var b in a)this.options[b]=a[b];return this.render()}a(d,b),d.template=c;var e={effect:"fade"};return d.defaults=function(a){var b={};if(a)for(var c in a)e[c]=a[c];for(var c in e)b[c]=e[c];return b},d.isContent=function(a){if(typeof a=="string"||a instanceof $)return a.$el&&a.$el instanceof $?a.$el:a},d.prototype.render=function(){return this.$el||(this.$el=$(d.template)),this.$el.appendTo("body"),this.$el.addClass("hidden"),this.options.content&&this.$el.html(this.options.content),this.options.effect&&this.$el.addClass(this.options.effect),this.options.css&&this.$el.css(this.options.css),this.options.className&&this.$el.addClass(this.options.className),this},d.prototype.show=function(a){var b;return b=this,this.options.content=d.isContent(a)||null,this.render(),this.emit("show"),setTimeout(function(){b.$el.removeClass("hidden")},1),this},d.prototype.hide=function(){var a;return a=this,this.$el.addClass("hidden"),this.options.effect?setTimeout(function(){a.$el.remove()},500):this.$el.remove(),this.emit("hide"),this},d}(),d}),c("lib/Dialog",["lib/classextends","lib/EventEmitter","lib/Overlay","lib/text!lib/Dialog/template.html"],function(a,b,c,d){var e;return e=function(){function e(a){e.__super__.constructor.apply(this,arguments),this.options=e.defaults();if(typeof a=="string")this.options.message=a;else if(typeof a=="object")for(var b in a)this.options[b]=a[b];return this.render()}a(e,b),e.nrofvisible=0,e.template=d;var f={title:null,message:"Dialog message",closable:!0,effect:"scale"};return e.defaults=function(a){if(a)for(var b in a)f[b]=a[b];return f},e.prototype.render=function(){var a;return a=this,this.$el=$(e.template),this.options.title?this.$el.find(".title").html(this.options.title):this.$el.find(".title").remove(),this.$el.find(".content").html(this.options.message),this.$el.find(".close").bind("click",function(){a.emit("close"),a.hide()}),this.options.effect&&this.$el.addClass(this.options.effect),this.options.overlay&&this.overlay(this.options.overlay),this.$el.addClass("hidden"),$("body").find(this.$el).length===0&&this.$el.appendTo("body"),this},e.prototype.overlay=function(a){return this._overlay&&this._overlay.$el.remove(),this._overlay=new c(a),this.on("hide",function(){this._overlay.hide()}),this.$el.addClass("overlay"),this},e.prototype.show=function(){var a;return a=this,e.nrofvisible++,this._overlay&&this._overlay.show(),this.$el.css({bottom:$(window).height()/2+e.nrofvisible*3,left:$(window).width()/2-this.$el.outerWidth()/2}),setTimeout(function(){a.$el.removeClass("hidden"),a.emit("show")},0),this},e.prototype.hide=function(){var a;return a=this,this.options.effect?(a.$el.addClass("hidden"),setTimeout(function(){a.$el.remove()},500)):a.$el.remove(),a.emit("hide"),e.nrofvisible--,this},e}(),e}),c("lib/Confirmation",["lib/classextends","lib/EventEmitter","lib/Dialog"],function(a,b,c){var d;return d=function(){function b(a){var c;return b.__super__.constructor.call(this,a),c=this,this.on("cancel",this.hide),this.on("ok",this.hide),this.options.ok&&this.ok(this.options.ok),this.options.cancel&&this.cancel(this.options.cancel),this}return a(b,c),b.prototype.render=function(){var a,c,d;return b.__super__.render.apply(this,arguments),a=this,c=$("<button class='button cancel'>Cancel</button>"),d=$("<button class='button ok'>Ok</button>"),c.bind("click",function(){a.emit("cancel")}),d.bind("click",function(){a.emit("ok")}),this.$el.find(".close").bind("click",function(){a.emit("cancel")}),this.$el.find("div.buttons").append(c).append(d),this},b.prototype.cancel=function(a){var b;return b=this,this.on("cancel",function(){a.call(b)}),this},b.prototype.ok=function(a){var b;return b=this,this.on("ok",function(){a.call(b)}),this},b}(),d}),c("lib/text!lib/Tip/template.html",[],function(){return'<div class="wtwui-tip">\n  <div class="tip"></div>\n  <div class="content"></div>\n</div>'}),c("lib/Tip",["lib/classextends","lib/EventEmitter","lib/text!lib/Tip/template.html"],function(a,b,c){var d;return d=function(){function d(a){d.__super__.constructor.apply(this,arguments),this.options=d.defaults();if(typeof a=="object")for(var b in a)this.options[b]=a[b];return a.target&&this.target(a.target),this.$target&&this.render(),this.options.show&&this.show(),this}a(d,b),d.template=c;var e={position:"north",effect:"fade"};return d.defaults=function(a){var b={};if(a)for(var c in a)e[c]=a[c];for(var c in e)b[c]=e[c];return b},d.prototype.render=function(){this.$el||(this.$el=$(d.template),this.$el.addClass("hidden")),this.options.content&&this.$el.find(".content").html(this.options.content),this.options.target&&(this.$target=$(this.options.target)),this.options.effect&&this.$el.addClass(this.options.effect),this.$el.addClass("hidden"),this.$el.appendTo("body");switch(this.options.position){case"north":this.positionNorth();break;case"north-east":this.positionNorthEast();break;case"north-west":this.positionNorthWest();break;case"south":this.positionSouth();break;case"south-east":this.positionSouthEast();break;case"south-west":this.positionSouthWest();break;case"east":this.positionEast();break;case"west":this.positionWest()}return this},d.prototype.positionNorth=function(){var a=this.$el.find(".tip");return this.$el.css({top:this.$target.offset().top-this.$el.outerHeight()-7,left:this.$target.offset().left+this.$target.outerWidth()/2-this.$el.outerWidth()/2}),a.attr("class","tip north").css({left:this.$el.outerWidth()/2-a.outerWidth()/2}),this},d.prototype.positionEast=function(){var a=this.$el.find(".tip");return this.$el.css({left:this.$target.offset().left+this.$target.outerWidth()+7,top:this.$target.offset().top+this.$target.outerHeight()/2-this.$el.outerHeight()/2}),a.attr("class","tip east").css({top:this.$el.outerHeight()/2-a.outerHeight()/2}),this},d.prototype.positionWest=function(){var a=this.$el.find(".tip");return this.$el.css({left:this.$target.offset().left-this.$el.outerWidth()-7,top:this.$target.offset().top+this.$target.outerHeight()/2-this.$el.outerHeight()/2}),a.attr("class","tip west").css({top:this.$el.outerHeight()/2-a.outerHeight()/2}),this},d.prototype.positionSouth=function(){var a=this.$el.find(".tip");return this.$el.css({top:this.$target.offset().top+this.$target.outerHeight()+7,left:this.$target.offset().left+this.$target.outerWidth()/2-this.$el.outerWidth()/2}),a.attr("class","tip south").css({left:this.$el.outerWidth()/2-a.outerWidth()/2}),this},d.prototype.positionNorthEast=function(){return this.$el.find(".tip").attr("class","tip north east"),this.$el.css({top:this.$target.offset().top-this.$el.outerHeight()-7,left:this.$target.offset().left+this.$target.outerWidth()-40}),this},d.prototype.positionNorthWest=function(){return this.$el.css({top:this.$target.offset().top-this.$el.outerHeight()-7,left:this.$target.offset().left-this.$el.outerWidth()+40}),this.$el.find(".tip").attr("class","tip north west"),this},d.prototype.positionSouthEast=function(){return this.$el.css({top:this.$target.offset().top+this.$target.outerHeight()+7,left:this.$target.offset().left+this.$target.outerWidth()-40}),this.$el.find(".tip").attr("class","tip south east"),this},d.prototype.positionSouthWest=function(){return this.$el.css({top:this.$target.offset().top+this.$target.outerHeight()+7,left:this.$target.offset().left-this.$el.outerWidth()+40}),this.$el.find(".tip").attr("class","tip south west"),this},d.prototype.target=function(a){return a&&(this.$target=$(a)),this},d.prototype.hover=function(a){function c(){b.show(a)}function d(){b.hide()}var b,a;b=this,this.hide(),a=a||this.$target,$(a).unbind("mouseover",c),$(a).unbind("mouseout",d),$(a).bind("mouseover",c),$(a).bind("mouseout",d)},d.prototype.hide=function(){var a;a=this,this.visible=!1,a.$el.addClass("hidden"),this.options.effect?setTimeout(function(){a.$el.remove()},200):a.$el.remove()},d.prototype.show=function(a){var b;return b=this,this.visible=!0,a&&(this.$target=$(a)),this.render(),setTimeout(function(){b.$el.removeClass("hidden"),b.emit("show")},0),this},d}(),d}),d.config({packages:["lib/UiElement","lib/Dialog","lib/Confirmation","lib/Overlay","lib/Tip"]}),c("lib/main",["lib/Dialog","lib/Confirmation","lib/Overlay","lib/Tip"],function(a,b,c,d){return{Dialog:a,dialog:function(){var b,c;typeof arguments[0]=="object"?c=arguments[0]:(c={},arguments.length===1&&(c.message=arguments[0]),arguments.length===2&&(c.title=arguments[0],c.message=arguments[1]));var b=new a(c);return b.show(),b},Confirmation:b,confirm:function(){var a,c,d,e;a=this,typeof arguments[arguments.length-1]=="function"&&(e=arguments[arguments.length-1]),arguments.length===2&&e?typeof arguments[0]=="string"&&(d=arguments[0]):arguments.length>2?(c=arguments[0],d=arguments[1]):arguments.length!==3;var f=new b({title:c||null,message:d||"Are you sure?"});return e&&(f.ok(function(){e.call(a,!0)}),f.cancel(function(){e.call(a,!1)})),f.show(),f},Overlay:c,overlay:function(){var a,b;return a={},arguments.length===1&&(typeof arguments[0]=="string"||arguments[0]instanceof $?a.content=arguments[0]:typeof arguments[0]=="object"?a=arguments[0]:arguments[0].$el&&arguments[0].$el instanceof $&&(a.content=arguments[0].$el)),b=new c(a),b.show(),b},Tip:d,tip:function(){var a;if(typeof arguments[0]=="object")a=arguments[0];else if(typeof arguments[0]=="string"||arguments[0]instanceof $)a={target:arguments[0]},typeof arguments[1]=="string"&&(a.content=arguments[1]),typeof arguments[2]=="string"&&(a.position=arguments[2]);var b=new d(a);return b.visible=!0,setTimeout(function(){b.$target&&b.visible&&b.show()},0),b}}}),d(["lib/main"],function(a){window.wtwui=a}),c("main",function(){})})(this)