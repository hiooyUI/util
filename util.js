/**
 * 获取url传值
 *
 * @param {String} name
 * @return {String} 
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/**
 * 添加cookie
 *
 * @param {String} name
 * @param {String} value
 * @param {Number} expireHours
 */
function addcookie(name, value, expireHours) {
    var cookieString = name + "=" + escape(value) + "; path=/";
    // 判断是否设置过期时间
    if (expireHours > 0) {
        var date = new Date();
        date.setTime(date.getTime + expireHours * 3600 * 1000);
        cookieString = cookieString + "; expire=" + date.toGMTString();
    }
    document.cookie = cookieString;
}

/**
 * 获取cookie
 *
 * @param {String} name
 * @return {String} 
 */
function getcookie(name) {
    var strcookie = document.cookie;
    var arrcookie = strcookie.split("; ");
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name) return arr[1];
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
    var cval = getcookie(name);
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
 * input输入框特殊字符过滤
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
 * 回到頂部缓动效果
 * @author rid.k 
 * 
 * @param {Float|undefine} acceleration
 * @param {Number|undefine} time
 */
function goTop(acceleration, time) {
    acceleration = acceleration || 0.1;
    time = time || 16;
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;
    if (document.documentElement) {
        x1 = document.documentElement.scrollLeft || 0;
        y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
        x2 = document.body.scrollLeft || 0;
        y2 = document.body.scrollTop || 0;
    }
    x3 = window.scrollX || 0;
    y3 = window.scrollY || 0;
    // 滚动条到页面顶部的水平距离
    var x = Math.max(x1, Math.max(x2, x3));
    // 滚动条到页面顶部的垂直距离
    var y = Math.max(y1, Math.max(y2, y3));
    // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
    var speed = 1 + acceleration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
    // 如果距离不为零, 继续调用迭代本函数
    if (x > 0 || y > 0) {
        var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
        window.setTimeout(invokeFunction, time);
    }
};
