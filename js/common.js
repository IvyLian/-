/*
	16-05-24 公用方法
*/

// 判断客户端 
function getDevice(){
    var device = navigator.userAgent.toLowerCase();
    var isIphone = (device.indexOf("iphone") > -1) || (device.indexOf("ipad") > -1);// iphone 设备

    var isAndroid = device.indexOf("android") > -1;

    if(isIphone){
        return "ios";
    }

    if(isAndroid){
        return "android";
    }

    return "other";
}


// 替换获取到的data 数据
function myreplace(myData){
	if (myData == undefined){
		return "";
	}
    var paramF = myData.replace(/\+/g, "$");
    return paramF.replace(/=/g, "^");
}


// 切换IP 地址方法
var debug='true';
function getUrl()
{
    if(debug=='true')
    {
        return "https://kas.xiaojinlicai.com:8486";
    }else
    {
        return "http://211.95.3.194:2223";
    }
}


// 获取URL 数组
$_GET = (function(){
    var url=decodeURIComponent(document.URL);
    //var url = window.document.location.href.toString();

    var u = url.split("?");
    if(u.length > 2){
        //console.log("Wierd string...");
        var index = url.indexOf("?");
        //console.log("index 0 : length = " + index + " : " + url.length);
        var u_tmp = new Array();
        var u0 = url.substr(0, index);
        var u1 = url.substring(index + 1);
        u_tmp[0] = u0;
        u_tmp[1] = u1;
        //console.log("0 - " + u_tmp[0]);
        //console.log("1 - " + u_tmp[1]);
        u = u_tmp;
    }

    if(typeof(u[1]) == "string"){
        u = u[1].split("&");
        var get = {};
        for(var i in u){
            var s=u[i].substring(u[i].indexOf("=")+1,u[i].length);
            var j = u[i].split("=");
            get[j[0]] = s;
        }
        return get;
    } else {
        return {};
    }
})();


// base64 的转化
var Base64KXE = {

        // private property
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        // public method for encoding
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = Base64KXE._utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }

            return output;
        },

        // public method for decoding
        decode : function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = Base64KXE._utf8_decode(output);

            return output;

        },

        // private method for UTF-8 encoding
        _utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },

        // private method for UTF-8 decoding
        _utf8_decode : function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while ( i < utftext.length ) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }

};


// 给页面添加css 
function addCssByStyle(cssString){  
    var doc=document;  
    var style=doc.createElement("style");  
    style.setAttribute("type", "text/css");  
  
    if(style.styleSheet){// IE  
        style.styleSheet.cssText = cssString;  
    } else {// w3c  
        var cssText = doc.createTextNode(cssString);  
        style.appendChild(cssText);  
    }  
  
    var heads = doc.getElementsByTagName("head");  
    if(heads.length)  
        heads[0].appendChild(style);  
    else  
        doc.documentElement.appendChild(style);  
} 




