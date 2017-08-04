$(function(){
		//显示服务器返回提示信息
		var alt = $(".navbar-fixed-bottom").get(0);
		if(alt){
			var msg = $("#message").text();
			if(msg){
				$(".navbar-fixed-bottom .content").append("<h4>" + msg + "</h4>");
				$(".navbar-fixed-bottom").show();
				setTimeout(function(){$(".navbar-fixed-bottom").hide();}, 3000);
			}
		}
	});