     $(function(){
    	 
    	 
	    //上传图片	
	    	 'use strict';
	        // Change this to the location of your server-side upload handler:
	        var url =  'http://139.196.103.164:8018/pano/fs/upload';
	        var uploadButton = $('<button/>')
	                .addClass('btn btn-primary')
	                .prop('disabled', true)
	                .text('Processing...')
	                .on('click', function () {
	                    var $this = $(this);
	                    var data = $this.data();
	                    $this.off('click')
	    					.text('Abort')
	                        .on('click', function () {
	                            $this.remove();
	                            data.abort();
	                        });
	                    data.submit().always(function () {
	                        $this.remove();
	                    });
	                });
	        $('#fileupload').fileupload({
	            url: url,
	            dataType: 'json',
	            autoUpload: false,
	            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
	            maxFileSize: 10485760,
	            // Enable image resizing, except for Android and Opera,
	            // which actually support image resizing, but fail to
	            // send Blob objects via XHR requests:
	            disableImageResize: /Android(?!.*Chrome)|Opera/
	                .test(window.navigator.userAgent),
	            previewMaxWidth: 100,
	            previewMaxHeight: 100,
	            previewCrop: true
	        }).on('fileuploadadd', function (e, data) {
	        	$("#files").children().remove();
	        	$('#progress .progress-bar').css(
	    	            'width',
	    	            0 + '%'
	    	        );
	        	
	            data.context = $('<div/>').appendTo('#files');
	            $.each(data.files, function (index, file) {
	                var node = $('<p/>')
	                        .append($('<span/>').text(file.name));
	                if (!index) {
	                   /* node.append('<br>')
	                        .append(uploadButton.clone(true).data(data));*/
	                }
	                node.appendTo(data.context);
	            });
	            data.submit();
	        }).on('fileuploadprocessalways', function (e, data) {
	            var index = data.index;
	            var file = data.files[index];
	            var node = $(data.context.children()[index]);
	            if (file.preview) {
	                node.prepend('<br>')
	                    .prepend(file.preview);
	            }
	            if (file.error) {
	                node.append('<br>')
	                    .append($('<span class="text-danger"/>').text(file.error));
	            }
	            /*if (index + 1 === data.files.length) {
	                data.context.find('button')
	                    .text('Upload')
	                    .prop('disabled', !!data.files.error);
	            }*/
	        }).on('fileuploadprogressall', function (e, data) {
	            var progress = parseInt(data.loaded / data.total * 100, 10);
	            $('#progress .progress-bar').css(
	                'width',
	                progress + '%'
	            );
	        }).on('fileuploaddone', function (e, data) {
	        	$("#resultInfo").text("");
	        	var returnJsonAry = data.result;
	            $.each(data.result, function (index, file) {
	            	//alert(index + "," + file);
	            	var txt = $("#resultInfo").text();
	            	//alert(txt);
	            	$("#fullimgsn").val(txt.substr(1));
	            	$("#resultInfo").text(txt + "," + file);
	            	
	            });
	            $("#resultInfo").text("");
	        }).on('fileuploadfail', function (e, data) {
	            $.each(data.files, function (index) {
	                var error = $('<span class="text-danger"/>').text('File upload failed.');
	                $(data.context.children()[index])
	                    .append('<br>')
	                    .append(error);
	            });
	        }).prop('disabled', !$.support.fileInput)
	            .parent().addClass($.support.fileInput ? undefined : 'disabled');
	    	
	            
	    	//第二张上传
	        var uploadButton1 = $('<button/>')
            .addClass('btn btn-primary')
            .prop('disabled', true)
            .text('Processing...')
            .on('click', function () {
                var $this = $(this);
                var data = $this.data();
                $this.off('click')
					.text('Abort')
                    .on('click', function () {
                        $this.remove();
                        data.abort();
                    });
                data.submit().always(function () {
                    $this.remove();
                });
            });
    $('#fileupload1').fileupload({
        url: url,
        dataType: 'json',
        autoUpload: false,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 10485760,
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
    	$("#files1").children().remove();
    	$('#progress1 .progress-bar').css(
	            'width',
	            0 + '%'
	        );
    	
        data.context = $('<div/>').appendTo('#files1');
        $.each(data.files, function (index, file) {
            var node = $('<p/>')
                    .append($('<span/>').text(file.name));
            if (!index) {
               /* node.append('<br>')
                    .append(uploadButton.clone(true).data(data));*/
            }
            node.appendTo(data.context);
        });
        data.submit();
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index;
        var file = data.files[index];
        var node = $(data.context.children()[index]);
        if (file.preview) {
            node.prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node.append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
        }
        /*if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }*/
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress1 .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
    	$("#resultInfo1").text("");
    	var returnJsonAry = data.result;
        $.each(data.result, function (index, file) {
        	//alert(index + "," + file);
        	var txt = $("#resultInfo1").text();
        	$("#leftimgsn").val(txt.substr(1));
        	$("#resultInfo1").text(txt + "," + file);
        });
        $("#resultInfo1").text("");
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index) {
            var error = $('<span class="text-danger"/>').text('File upload failed.');
            $(data.context.children()[index])
                .append('<br>')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
	            
	  
     //第3张上传
    var uploadButton2 = $('<button/>')
    .addClass('btn btn-primary')
    .prop('disabled', true)
    .text('Processing...')
    .on('click', function () {
        var $this = $(this);
        var data = $this.data();
        $this.off('click')
			.text('Abort')
            .on('click', function () {
                $this.remove();
                data.abort();
            });
        data.submit().always(function () {
            $this.remove();
        });
    });
$('#fileupload2').fileupload({
url: url,
dataType: 'json',
autoUpload: false,
acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
maxFileSize: 10485760,
// Enable image resizing, except for Android and Opera,
// which actually support image resizing, but fail to
// send Blob objects via XHR requests:
disableImageResize: /Android(?!.*Chrome)|Opera/
    .test(window.navigator.userAgent),
previewMaxWidth: 100,
previewMaxHeight: 100,
previewCrop: true
}).on('fileuploadadd', function (e, data) {
$("#files2").children().remove();
$('#progress2 .progress-bar').css(
        'width',
        0 + '%'
    );

data.context = $('<div/>').appendTo('#files2');
$.each(data.files, function (index, file) {
    var node = $('<p/>')
            .append($('<span/>').text(file.name));
    if (!index) {
       /* node.append('<br>')
            .append(uploadButton.clone(true).data(data));*/
    }
    node.appendTo(data.context);
});
data.submit();
}).on('fileuploadprocessalways', function (e, data) {
var index = data.index;
var file = data.files[index];
var node = $(data.context.children()[index]);
if (file.preview) {
    node.prepend('<br>')
        .prepend(file.preview);
}
if (file.error) {
    node.append('<br>')
        .append($('<span class="text-danger"/>').text(file.error));
}
/*if (index + 1 === data.files.length) {
    data.context.find('button')
        .text('Upload')
        .prop('disabled', !!data.files.error);
}*/
}).on('fileuploadprogressall', function (e, data) {
var progress = parseInt(data.loaded / data.total * 100, 10);
$('#progress2 .progress-bar').css(
    'width',
    progress + '%'
);
}).on('fileuploaddone', function (e, data) {
$("#resultInfo2").text("");
var returnJsonAry = data.result;
$.each(data.result, function (index, file) {
	//alert(index + "," + file);
	var txt = $("#resultInfo2").text();
	$("#downimgsn").val(txt.substr(1));
	$("#resultInfo2").text(txt + "," + file);
});
$("#resultInfo2").text("");
}).on('fileuploadfail', function (e, data) {
$.each(data.files, function (index) {
    var error = $('<span class="text-danger"/>').text('File upload failed.');
    $(data.context.children()[index])
        .append('<br>')
        .append(error);
});
}).prop('disabled', !$.support.fileInput)
.parent().addClass($.support.fileInput ? undefined : 'disabled');
    
    
           
            //第4张上传
var uploadButton3 = $('<button/>')
.addClass('btn btn-primary')
.prop('disabled', true)
.text('Processing...')
.on('click', function () {
    var $this = $(this);
    var data = $this.data();
    $this.off('click')
		.text('Abort')
        .on('click', function () {
            $this.remove();
            data.abort();
        });
    data.submit().always(function () {
        $this.remove();
    });
});
$('#fileupload3').fileupload({
url: url,
dataType: 'json',
autoUpload: false,
acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
maxFileSize: 10485760,
// Enable image resizing, except for Android and Opera,
// which actually support image resizing, but fail to
// send Blob objects via XHR requests:
disableImageResize: /Android(?!.*Chrome)|Opera/
.test(window.navigator.userAgent),
previewMaxWidth: 100,
previewMaxHeight: 100,
previewCrop: true
}).on('fileuploadadd', function (e, data) {
$("#files3").children().remove();
$('#progress3 .progress-bar').css(
    'width',
    0 + '%'
);

data.context = $('<div/>').appendTo('#files3');
$.each(data.files, function (index, file) {
var node = $('<p/>')
        .append($('<span/>').text(file.name));
if (!index) {
   /* node.append('<br>')
        .append(uploadButton.clone(true).data(data));*/
}
node.appendTo(data.context);
});
data.submit();
}).on('fileuploadprocessalways', function (e, data) {
var index = data.index;
var file = data.files[index];
var node = $(data.context.children()[index]);
if (file.preview) {
node.prepend('<br>')
    .prepend(file.preview);
}
if (file.error) {
node.append('<br>')
    .append($('<span class="text-danger"/>').text(file.error));
}
/*if (index + 1 === data.files.length) {
data.context.find('button')
    .text('Upload')
    .prop('disabled', !!data.files.error);
}*/
}).on('fileuploadprogressall', function (e, data) {
var progress = parseInt(data.loaded / data.total * 100, 10);
$('#progress3 .progress-bar').css(
'width',
progress + '%'
);
}).on('fileuploaddone', function (e, data) {
$("#resultInfo3").text("");
var returnJsonAry = data.result;
$.each(data.result, function (index, file) {
//alert(index + "," + file);
var txt = $("#resultInfo3").text();
  $("#mtimgsn").val(txt.substr(1));
$("#resultInfo3").text(txt + "," + file);
});
    $("#resultInfo3").text("");
}).on('fileuploadfail', function (e, data) {
$.each(data.files, function (index) {
var error = $('<span class="text-danger"/>').text('File upload failed.');
$(data.context.children()[index])
    .append('<br>')
    .append(error);
});
}).prop('disabled', !$.support.fileInput)
.parent().addClass($.support.fileInput ? undefined : 'disabled');            

           
          //第5张上传
var uploadButton4 = $('<button/>')
.addClass('btn btn-primary')
.prop('disabled', true)
.text('Processing...')
.on('click', function () {
    var $this = $(this);
    var data = $this.data();
    $this.off('click')
		.text('Abort')
        .on('click', function () {
            $this.remove();
            data.abort();
        });
    data.submit().always(function () {
        $this.remove();
    });
});
$('#fileupload4').fileupload({
url: url,
dataType: 'json',
autoUpload: false,
acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
maxFileSize: 10485760,
// Enable image resizing, except for Android and Opera,
// which actually support image resizing, but fail to
// send Blob objects via XHR requests:
disableImageResize: /Android(?!.*Chrome)|Opera/
.test(window.navigator.userAgent),
previewMaxWidth: 100,
previewMaxHeight: 100,
previewCrop: true
}).on('fileuploadadd', function (e, data) {
$("#files4").children().remove();
$('#progress4 .progress-bar').css(
    'width',
    0 + '%'
);

data.context = $('<div/>').appendTo('#files4');
$.each(data.files, function (index, file) {
var node = $('<p/>')
        .append($('<span/>').text(file.name));
if (!index) {
   /* node.append('<br>')
        .append(uploadButton.clone(true).data(data));*/
}
node.appendTo(data.context);
});
data.submit();
}).on('fileuploadprocessalways', function (e, data) {
var index = data.index;
var file = data.files[index];
var node = $(data.context.children()[index]);
if (file.preview) {
node.prepend('<br>')
    .prepend(file.preview);
}
if (file.error) {
node.append('<br>')
    .append($('<span class="text-danger"/>').text(file.error));
}
/*if (index + 1 === data.files.length) {
data.context.find('button')
    .text('Upload')
    .prop('disabled', !!data.files.error);
}*/
}).on('fileuploadprogressall', function (e, data) {
var progress = parseInt(data.loaded / data.total * 100, 10);
$('#progress4 .progress-bar').css(
'width',
progress + '%'
);
}).on('fileuploaddone', function (e, data) {
$("#resultInfo4").text("");
var returnJsonAry = data.result;
$.each(data.result, function (index, file) {
//alert(index + "," + file);
var txt = $("#resultInfo4").text();
   $("#fbcimgsn").val(txt.substr(1));
$("#resultInfo4").text(txt + "," + file);
});
  $("#resultInfo4").text("");
}).on('fileuploadfail', function (e, data) {
$.each(data.files, function (index) {
var error = $('<span class="text-danger"/>').text('File upload failed.');
$(data.context.children()[index])
    .append('<br>')
    .append(error);
});
}).prop('disabled', !$.support.fileInput)
.parent().addClass($.support.fileInput ? undefined : 'disabled');

    }); 