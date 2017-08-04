$.extend($.validator.defaults,{ignore:""});
//验证密码
jQuery.validator.addMethod("isPwd", function(value, element){
		return this.optional(element) || /^[a-zA-Z]\w{5,20}$/.test(value);
	}, "密码格式有误");

//验证手机
jQuery.validator.addMethod("isMobile", function(value,element) {
		var length = value.length;
		var mobile = /^(((1[1-9][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
		return this.optional(element) || (mobile.test(value));
	}, "手机号码格式有误");


//验证电话号码
jQuery.validator.addMethod("isPhone", function(value,element) {
		var length = value.length;
		var tel = /^\d{3,4}-?\d{7,9}$/;
		return this.optional(element) || (tel.test(value));
	}, "电话号码格式有误");

//邮政编码
jQuery.validator.addMethod("isZipCode", function(value, element){
	return this.optional(element) || /^[0-9]{6}$/.test(value);
}, "邮政编码格式有误");
