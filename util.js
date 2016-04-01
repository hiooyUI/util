//获取url传值
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//添加cookie
function addcookie(name, value, expireHours) {
    var cookieString = name + "=" + escape(value) + "; path=/";
    //判断是否设置过期时间
    if (expireHours > 0) {
        var date = new Date();
        date.setTime(date.getTime + expireHours * 3600 * 1000);
        cookieString = cookieString + "; expire=" + date.toGMTString();
    }
    document.cookie = cookieString;
}
//获取cookie
function getcookie(name) {
    var strcookie = document.cookie;
    var arrcookie = strcookie.split("; ");
    for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name) return arr[1];
    }
    return "";
}
//删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getcookie(name);
    if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}
//手机号码判断
function isMobileNumber(val) {
    if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(val))) {
        return false;
    } else {
        return true;
    }
}
//返回上一层
function goback() {
    window.history.go(-1);
    setTimeout(function () {
        window.location.href = "/";
    }, 200);
}

/*判断是否为身份证*/
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
            //检查生日日期是否正确 如19850843 或者 20000843
            var dtmBirth = new Date('19' + splitArr[2] + '/' + splitArr[3] + '/' + splitArr[4]);
            if (!((dtmBirth.getYear() == Number(splitArr[2])) && ((dtmBirth.getMonth() + 1) == Number(splitArr[3])) && (dtmBirth.getDate() == Number(splitArr[4])))) {
                //alert('输入的身份证号里出生日期不对！');
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
                //alert('输入的身份证号里出生日期不对！');
                return false;
            }
            //检验18位身份证的校验码是否正确。
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            var checkNum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0, i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            checkNum = arrCh[nTemp % 11];
            if (checkNum != num.substr(17, 1)) {
                //alert('18位身份证的校验码不正确！应该为：' + checkNum);
                return false;
            }
            else {
                return true;
            }
        }

    }
}

/*判断是否为2~15字姓名*/
function isChineseName(name) {
    reg = /^[\u4E00-\u9FA5]{2,15}$/;
    if (!reg.test(name)) {
        return false;
    } else {
        return true;
    }
}
/*预加载图片*/
function preLoadImages(urls) {//可以是String Array或者String
    var argsLen = arguments.length,
        loadImage = function (url) {
            var img = new Image();
            img.src = url;
        };
    if (argsLen == 1) {
        if (typeof (urls) == "string" && (sLen = urls.length) > 1) {//预加载一个图片
            loadImage(urls);
        }
        else if (Object.prototype.toString.call(arguments[0]) == "[object Array]" && urls.length > 0) {//预加载多个图片
            for (var i = 0; i < urls.length; i++) {
                loadImage(urls[i]);
            }
        }
    }
}
//input输入框特殊字符过滤
function filtInputValue(input) {
    var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——| {}【】‘’\"；：”“'。，、？]");        //格式 RegExp("[在中间定义特殊过滤字符]")  
    var s = input.value;
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    input.value = rs;
}
