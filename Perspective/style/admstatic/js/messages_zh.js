(function(factory) {
	if (typeof define === "function" && define.amd) {
		define([ "jquery", "../jquery.validate" ], factory);
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory(require("jquery"));
	} else {
		factory(jQuery);
	}
}(function($) {

	/*
	 * Translated default messages for the jQuery validation plugin. Locale: ZH
	 * (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
	 */
	$.extend($.validator.messages, {
		required : "这是必填字段",
		remote : "请修正此字段",
		email : "格式不正确!",
		url : "请输入有效的网址",
		date : "请输入有效的日期",
		dateISO : "请输入有效的日期 (YYYY-MM-DD)",
		number : "无效的数字",
		digits : "只能输入数字",
		creditcard : "请输入有效的信用卡号码",
		equalTo : "输入不相同",
		extension : "请输入有效的后缀",
		maxlength : $.validator.format("最多{0}字符"),
		minlength : $.validator.format("最少{0}字符"),
		rangelength : $.validator.format("长度{0}到{1}"),
		range : $.validator.format("范围{0}到{1}"),
		max : $.validator.format("请输入不大于{0}的数值"),
		min : $.validator.format("请输入不小于{0}的数值")
	});
	return $;
}));