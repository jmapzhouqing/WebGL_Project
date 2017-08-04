


$(function(){
	$("#ctChange").click(function(){
		$("#validCode").val("");
		$(this).children().attr("src", "/captchas/" + new Date().getTime() + ".jpg");
	});
	$("#ctChange").prev().click(function(){
		$(this).prev().val("");
		$(this).attr("src", "/captchas/" + new Date().getTime() + ".jpg");
	});

});


var USER_LOGIN = "5";
var USER_REGISTER = "6";
var USER_PASSWORD_MODIFY = "7";
var seconds = 60;

        function sendSms(mobile, type, validCode){
        	if(seconds > 0 && seconds < 60){
        		return;
        	}
         	if(mobile && mobile.length === 11){
         		//if(validCode && validCode.length === 4){
         			//发送短信
            		$.ajax({
            			url:"/sms/send",
            			data:{
            				mobilePhone:mobile,
            				validCode:validCode,
            				type:type
            			},
    	        		type:"post",
    	        		cache:false,
    	        		dataType:"json",
    	        		success:function(data){

    	        		},
    	        		error:function(){

    	        		}
            		});
            		//倒计时
            		$("#smsCode").val("");
            		var btnText = "获取验证码";
            		var obj = $("#smsCodeBtn");
            		obj.removeClass("hover");
            		
            		if(obj.text() === btnText){
            			var t = setInterval(function(){
            				if(seconds <= 0){
            					obj.text(btnText);
            					obj.attr("class", "hqyzm");
            					window.clearInterval(t);
            				}
            				else {
            					obj.removeClass("hover");
            					obj.text(seconds + "秒后重发");
            				}
            				-- seconds;
            			}, 1000);
            		}
         		//} else {
         			//$("form").validate().element($("#validCode"));
         		//}
        		
        	} else {
        		$("form").validate().element($("#loginName"));
        	}
        }