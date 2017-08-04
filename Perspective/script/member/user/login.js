$(function(){
	
	setTimeout(function(){
		$(".error_loc font").text("");
	}, 3000);
	
	//获取手机验证码
    $("#smsCodeBtn").click(function(){
    	sendSms($("#loginName").val(), USER_LOGIN, $("#validCode").val());
    });

    $("#loginForm").validate({
    	groups: {  
    		login: "loginName password validCode"
    	},  
    	onfocusout:function(element){$(element).valid();},
    	errorPlacement: function(error, element){
    		 error.appendTo(".error_loc");  
    	},
    	rules: {
    		loginName:{
    			required: true,
    			maxlength: 40
    		},
    		password:{
	    		required: true,
	    		maxlength: 40

	    	},
	    	/*smsCode:{
	    		required: true,
	    		minlength: 6
	    	},*/
	    	validCode:{
	    		required: true,
	    		minlength: 4
	    	}
    	},
    	messages: {
    		loginName:{
				required: "请输入您的手机号码",
				maxlength: "请输入{0}个字以内"
			},
			password: {
	    		required: "请输入您的密码",
	    		maxlength: "请输入{0}个字以内"
	    	},
	    	/*smsCode: {
				required: "请输入短信验证码",
				minlength: "请输入{0}位短信验证码"
			},*/
			validCode: {
	    		required: "请输入图形验证码",
	    		minlength: "请输入{0}位验证码"
	    	}
    	},
    	submitHandler:function(form){
    		form.submit();
    	}
    });

});