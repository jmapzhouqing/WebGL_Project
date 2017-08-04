
$(function(){
	
	setTimeout(function(){
		$(".error_loc font").text("");
	}, 3000);
	
	$("#applyForm").validate({
		groups: {  
    		register: "nickName login.loginName login.password login.smsCode"
    	},  
    	onfocusout:function(element){$(element).valid();},
    	errorPlacement: function(error, element){
    		 error.appendTo(".error_loc");  
    	},
    	rules: {
    		nickName:{
    			required: true,
    			maxlength: 20
    		},
	    	"login.loginName":{
	    		required: true,
	    		maxlength: 11,
	    		isMobile:true
	    	},
	    	"login.password":{
	    		required: true,
	    		maxlength: 40

	    	},
	    	"login.smsCode":{
	    		required: true,
	    		minlength: 6
	    	},
	    	"login.validCode":{
	    		required: true,
	    		minlength: 4
	    	}
    	},
    	messages: {
    		nickName:{
    			required: "请输入您的昵称",
	    		maxlength: "请输入{0}个字以内",
    		},
    		"login.loginName":{
    			required: "请输入您的手机号",
	    		maxlength: "请输入{0}个字以内",
	    		isMobile:"请输入正确的手机号"
			},
			"login.password": {
	    		required: "请输入您的密码",
	    		maxlength: "请输入{0}个字以内"
	    	},
	    	"login.smsCode":{
				required: "请输入短信验证码",
				minlength: "请输入{0}位短信验证码"
			},
			"login.validCode":{
	    		required: "请输入图形验证码",
	    		minlength: "请输入{0}位图形验证码"
	    	}
    	},
    	submitHandler:function(form){
    		form.submit();
    	}
    });

	//获取手机验证码
    $("#smsCodeBtn").click(function(){
    	sendSms($("#loginName").val(), USER_REGISTER, $("#validCode").val());
    });
});