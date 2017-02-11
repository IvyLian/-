/**
 * JavaScript JSONP Library v0.1
 * Copyright (c) 2011 snandy
 * Blog: http://www.cnblogs.com/snandy
 * QQ缇�: 34580561
 * Date: 2011-04-26
 * 
 * 鎺ュ彛
 * Sjax.load(
 *    url, // 璺ㄨ秺璇锋眰鐨刄RL
 *    success,  // 鍥炶皟鍑芥暟锛屽繀椤诲畾涔変竴涓舰鍙傦紝鐢ㄤ簬鎺ユ敹鍚庡彴杩斿洖鐨勫叏灞€鍙橀噺jsonp 锛堢害瀹氬悗鍙拌繑鍥炲jsonp = {...}缁撴瀯锛�
 *    timestamp, // 浼爐rue浼氬姞涓€涓椂闂存埑锛岄槻姝㈢紦瀛橈紝涓嶄紶榛樿涓嶅姞
 * );
 * 
 * 绀轰緥
 * Sjax.load('servlet/json', function(jsonp){
 *    // todo with jsonp
 * }, true);
 * 
 */

Sjax =
function(win){
		
	var isIE = /*@cc_on!@*/!1,
		doc = win.document,
		head = doc.getElementsByTagName('head')[0];
		
	function request(url, success, timestamp){
		var script = doc.createElement('script');
		
		function callback(){
			if(typeof jsonp != 'undefined'){
				success(jsonp);
			}else{
				alert('warning: jsonp did not return.');
			}		
			// Handle memory leak in IE
			script.onload = script.onreadystatechange = null;
			if( head && script.parentNode ){
				head.removeChild(script);
			}
		}
		if(isIE){
			script.onreadystatechange = function(){
				var readyState = this.readyState;
				if(readyState == 'loaded' || readyState == 'complete'){
					callback();
				}
			}
		}else{
			script.onload = function(){
				callback();
			}
		}
		if(timestamp){
			url += '?ts=' + (new Date).getTime();
		}
		script.src = url;
		head.insertBefore(script, head.firstChild);
	}
	
	return {load:request};
}(this);