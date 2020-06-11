/**
 * 获取url传值
 *
 * @param {String} name
 * @return {String} 
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$|#)"); // 增加对后带hash值路由的取值支持
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/**
 * 设置cookie
 *
 * @param {String} name
 * @param {String} value
 * @param {Number} expireHours
 */
function setCookie(name, value, expireHours) {
    var cookieString = name + "=" + escape(value) + "; path=/";
    // 判断是否设置过期时间
    if (expireHours > 0) {
        var date = new Date();
        date.setTime(date.getTime() + expireHours * 3600 * 1000);
        cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
}

/**
 * 获取cookie
 *
 * @param {String} name
 * @return {String} 
 */
function getCookie(name) {
    var strcookie = document.cookie;
    var arrcookie = strcookie.split("; ");
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name) return unescape(arr[1]);
    }
    return "";
}

/**
 * 删除cookie
 *
 * @param {String} name
 */
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}

/**
 * 手机号码判断
 *
 * @param {String} val
 * @return {Boolean} 
 */
function isMobileNumber(val) {
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(val))) {
        return false;
    } else {
        return true;
    }
}

/**
 * 返回上一层
 */
function goback() {
    window.history.go(-1);
    setTimeout(function () {
        window.location.href = "/";
    }, 500);
}

/**
 * 判断是否为身份证
 * 来源于网络
 * 
 * @param {String} num
 * @return {Boolean} 
 */
function isIdCardNo(num) {
    var num = num.toUpperCase(),
    len = num.length,
    re;
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        return false;
    }
    else {
        if (len == 15) {
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            splitArr = num.match(re);
            // 检查生日日期是否正确 如19850843 或者 20000843
            var dtmBirth = new Date('19' + splitArr[2] + '/' + splitArr[3] + '/' + splitArr[4]);
            if (!((dtmBirth.getYear() == Number(splitArr[2])) && ((dtmBirth.getMonth() + 1) == Number(splitArr[3])) && (dtmBirth.getDate() == Number(splitArr[4])))) {
                // alert('输入的身份证号里出生日期不对！');
                return false;
            }
            else {
                return true;
            }
        }
        else if (len == 18) {
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
            var splitArr = num.match(re);
            var dtmBirth = new Date(splitArr[2] + "/" + splitArr[3] + "/" + splitArr[4]);
            if (!((dtmBirth.getFullYear() == Number(splitArr[2])) && ((dtmBirth.getMonth() + 1) == Number(splitArr[3])) && (dtmBirth.getDate() == Number(splitArr[4])))) {
                // alert('输入的身份证号里出生日期不对！');
                return false;
            }
            // 检验18位身份证的校验码是否正确。
            // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var checkNum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            checkNum = arrCh[nTemp % 11];
            if (checkNum != num.substr(17, 1)) {
                // alert('18位身份证的校验码不正确！应该为：' + checkNum);
                return false;
            }
            else {
                return true;
            }
        }

    }
}

/**
 * 判断是否为2~15字姓名
 *
 * @param {String} name
 * @return {Boolean} 
 */
function isChineseName(name) {
    reg = /^[\u4E00-\u9FA5]{2,15}$/;
    if (!reg.test(name)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 预加载图片
 *
 * @param {String|Array} urls
 */
function preLoadImages(urls) {// 可以是String Array或者String
    var argsLen = arguments.length,
        loadImage = function (url) {
            var img = new Image();
            img.src = url;
        };
    if (argsLen == 1) {
        if (typeof (urls) == "string" && (sLen = urls.length) > 1) {// 预加载一个图片
            loadImage(urls);
        }
        else if (Object.prototype.toString.call(arguments[0]) == "[object Array]" && urls.length > 0) {// 预加载多个图片
            for (var i = 0; i < urls.length; i++) {
                loadImage(urls[i]);
            }
        }
    }
}

/**
 * 预加载图片，带回调，返回进度回调只对多图片有效
 * By Nelson Kuang, 2017/11/02
 * 
 * @param {String|Array} urls
 * @param {Function} onFinishCallback
 * @param {Function} onProgressCallback，带进度返回onProgressCallback(progress)
 */
function preLoadImagesWithCB(urls, onFinishCallback, onProgressCallback) {// urls可以是String Array或者String，后面两个是回调函数
    var loadImage = function (url, cb) {
            var img = new Image();
            img.src = url;
            if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数     
                cb(img);
                return; // 直接返回，不用再处理onload事件     
            }
            img.onload = function () { //图片下载完毕时异步调用callback函数。         
                img.onload = null;
                cb(img);
                return
            };
            img.onerror = function () {
                img.onerror = null;
                cb(img);
            };
        };
    if (typeof urls == "string" && urls.length > 1) {// 预加载一个图片
        loadImage(urls, function () {
            onFinishCallback && onFinishCallback();
        });
    }
    else if (Object.prototype.toString.call(arguments[0]) == "[object Array]" && urls.length > 0) {// 预加载多个图片
        var length = urls.length,
            completedImgCount = 0;
        for (var i = 0; i < length; i++) {
            loadImage(urls[i], function () {
                completedImgCount++;
                onProgressCallback && onProgressCallback(completedImgCount / length);
                completedImgCount == length && onFinishCallback && onFinishCallback();
            });
        }
    }
}

/**
 * input输入框特殊字符过滤
 * @param {HTMLInputElement} input
 */
function filtInputValue(input) {
    var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——| {}【】‘’\"；：”“'。，、？]");        // 格式 RegExp("[在中间定义特殊过滤字符]")  
    var s = input.value;
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    input.value = rs;
}

/**
 * 对象拷贝
 * 
 * @param {Object} target
 * @param {Object} source
 * @return {Object} 
 */
function extend(target, source) {
    var length = arguments.length;
    if (length == 1) {
        source = arguments[0];
        target = this;
    }
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }
    return target;
}

/**
 * 回到顶部缓动效果
 * @author rid.k, optimised by Nelson 20160822
 * 
 * @param {Float|undefine} acceleration
 * @param {Number|undefine} time
 */
function goTop(acceleration, time) {
    acceleration = acceleration || -0.02;
    time = time || 16; // 1秒内播放60帧以上(1000 / 60 = 16.6667)肉眼就不会觉得眩晕，感觉是平滑过度
    var y1 = 0;
    var y2 = 0;
    var y3 = 0;
    if (document.documentElement) {
        y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
        y2 = document.body.scrollTop || 0;
    }
    y3 = window.scrollY || 0;
    // 滚动条到页面顶部的垂直距离
    var y = Math.max(y1, Math.max(y2, y3));
    // 在相同的时间，因为要距离原来越小,直到0为止，
    // Δs = vt - at^2/2  下面将采用近似法
    // v = at
    // => s = at^2/2
    // => t = Math.sqrt(-2*y/acceleration)
    // => v = acceleration * Math.sqrt(-2*y/acceleration)
    // => Δs = vΔt = acceleration * Math.sqrt(-2*y/acceleration) * time 采用近似法
    var s = acceleration * Math.sqrt(-2 * y / acceleration) * time;
    window.scrollTo(0, Math.floor(y + s));
    // 如果距离不为零, 继续调用迭代本函数
    if (y > 0) {
        var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
        window.setTimeout(invokeFunction, time);
    }
};

/**
 * 简易的事件添加方法
 * http://www.zhangxinxu.com/wordpress/2013/04/js-mousewheel-dommousescroll-event/
 * 
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 */
window.addEvent = (function (window, undefined) {
    var _eventCompat = function (event) {
        var type = event.type;
        if (type == 'DOMMouseScroll' || type == 'mousewheel') {
            event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
        }
        if (event.srcElement && !event.target) {
            event.target = event.srcElement;
        }
        if (!event.preventDefault && event.returnValue !== undefined) {
            event.preventDefault = function () {
                event.returnValue = false;
            };
        }
        /* 
           ......其他一些兼容性处理 */
        return event;
    };
    if (window.addEventListener) {
        return function (el, type, fn, capture) {
            if (type === "mousewheel" && document.mozHidden !== undefined) {
                type = "DOMMouseScroll";
            }
            el.addEventListener(type, function (event) {
                fn.call(this, _eventCompat(event));
            }, capture || false);
        }
    } else if (window.attachEvent) {
        return function (el, type, fn, capture) {
            el.attachEvent("on" + type, function (event) {
                event = event || window.event;
                fn.call(el, _eventCompat(event));
            });
        }
    }
    return function () { };
})(window);

/**
 * 判断字符串实际长度，每个中文字符长度为2
 *
 * @param {String} str
 * @return {Number} 
 */
function strLength(str) {
    return str.replace(/[^\x00-\xff]/g,"aa").length;
}

/**
 * 添加javascript文件
 *
 * @param {String} src
 * @return {[object HTMLScriptElement]}
 */
function appendScript(src) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.async = false;
  document.body.appendChild(script);
  return script;
}

/**
 * 异步加载单个javascript文件
 *
 * @param {String} src
 * @param {Function} callback
 * 
 */
function loadScript(src, callback) {
    if (!src || typeof src !== 'string' || !src.length) return;
    var script = appendScript(src);
    script.onload = function () {
      script.onload = null;
      callback && callback();
    };
    script.onreadystatechange = function () {
      var state = script.readyState;
      if (state === 'loaded' || state === 'complete') {
        script.onreadystatechange = null;
        callback && callback();
      }
    }
}

/**
 * 异步加载多个javascript文件
 *
 * @param {Array} srcs
 * 
 */
function loadScripts(srcs) {
    if (srcs.length === 0) return;
    for (var i = 0; i < srcs.length; i++) {
      this.loadScript(srcs[i]);
    }
}

/**
 * 同步加载多个javascript文件
 *
 * @param {Array} srcs
 * 
 */
function syncLoadScripts(srcs) {
    if (srcs.length === 0) return;
    var next = function () {
      self.loadScript(srcs.shift(), next);
    };
    next();
}

/*
* 频率控制 返回函数连续调用时，fn 执行频率限定为每多少时间执行一次
* @param fn {function}  需要调用的函数
* @param delay  {number}    延迟时间，单位毫秒
* @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
* @return {function}实际调用函数
*/
var throttle = function (fn,delay, immediate, debounce) {
   var curr = +new Date(),//当前事件
       last_call = 0,
       last_exec = 0,
       timer = null,
       diff, //时间差
       context,//上下文
       args,
       exec = function () {
           last_exec = curr;
           fn.apply(context, args);
       };
   return function () {
       curr= +new Date();
       context = this,
       args = arguments,
       diff = curr - (debounce ? last_call : last_exec) - delay;
       clearTimeout(timer);
       if (debounce) {
           if (immediate) {
               timer = setTimeout(exec, delay);
           } else if (diff >= 0) {
               exec();
           }
       } else {
           if (diff >= 0) {
               exec();
           } else if (immediate) {
               timer = setTimeout(exec, -diff);
           }
       }
       last_call = curr;
   }
};
 
/*
* 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行
* @param fn {function}  要调用的函数
* @param delay   {number}    空闲时间
* @param immediate  {bool} 给 immediate参数传递false 绑定的函数先执行，而不是delay后后执行。
* @return {function}实际调用函数
*/
 
var debounce = function (fn, delay, immediate) {
   return throttle(fn, delay, immediate, true);
};

// Throttle简化版,dom下使用
var simpleThrottle = function (fn, delay) {
    if (window.throttleTimer) {
        window.clearTimeout(window.throttleTimer);
        window.throttleTimer = null;
    }
    return window.throttleTimer = window.setTimeout(function () {
        fn();
        window.throttleTimer = null;
        delete window.throttleTimer;
    }, delay);
}

// Throttle 简化版 II
function simpleThrottleII(func, wait, mustRun) {
        var timeout,
                startTime = new Date();

        return function() {
                var context = this,
                        args = arguments,
                        curTime = new Date();

                clearTimeout(timeout);
                // 如果达到了规定的触发时间间隔，触发 handler
                if(curTime - startTime >= mustRun){
                        func.apply(context,args);
                        startTime = curTime;
                        // 没达到触发间隔，重新设定定时器
                }else{
                        timeout = setTimeout(func, wait);
                }
        };
};

/**
  * Deep clones your object and returns a new object.
  */
function deepClone(obj) {
  switch (typeof obj) {
  case 'object':
    return JSON.parse(JSON.stringify(obj)) //Faster than ES5 clone - http://jsperf.com/deep-cloning-of-objects/5
  case 'undefined':
    return null //this is how JSON.stringify behaves for array items
  default:
    return obj //no need to clone primitives
  }
}

/*
* 格式化时间
* @param value {object Date | String}  日期
* @param format   {String}    格式
* @return {String} 结果
*/
function formatTime (value, format) {
  if (typeof value == 'string') {
    value = value.replace(/-/g, '/');
  }
  var t = new Date(value);
  var o = {
    'M+': t.getMonth() + 1, // month
    'd+': t.getDate(), // day
    'h+': t.getHours(), // hour
    'm+': t.getMinutes(), // minute
    's+': t.getSeconds(), // second
    'q+': Math.floor((t.getMonth() + 3) / 3), // quarter
    'S': t.getMilliseconds() // millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return format;
}

/*
* 转为 unicode 编码
* @param str {String} 日期
* @return {String} 结果
*/
function encodeUnicode(str) {  
    var res = [];  
    for ( var i=0; i<str.length; i++ ) {  
      res[i] = ( '00' + str.charCodeAt(i).toString(16) ).slice(-4);  
    }  
    return '\\u' + res.join('\\u');  
}  
  
/*
* unicode 解码
* @param str {String}  日期
* @return {String} 结果
*/ 
function decodeUnicode(str) {  
    str = str.replace(/\\/g, '%');  
    return unescape(str);  
}

/*
* 把字符串中的中文转为 unicode 编码
* @param str {String} 日期
* @return {String} 结果
*/
function cnInStrToUnicode(str) {
  return str.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g, function(newStr) {
     return '\\u' + newStr.charCodeAt(0).toString(16); 
  }); 
}

/*
* 把字符串中的 unicode 编码解码为中文
* @param str {String} 日期
* @return {String} 结果
*/
function cnInStrDecodeUnicode(str) {
  return unescape(str.replace(/\\/g, "%")).replace(/%/g, "\\");
}
