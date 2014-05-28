// Avoid `console` errors in browsers that lack a console.
(function ($) {
	$.fn.ys_pop_window = function(option){
        $(this).click(function(){
			$(".shadow_cover").remove();
            shadow = $("<div> </div>");
            shadow.addClass("shadow_cover")
           	shadow.css("display", "none"); 
           	shadow.css("position", "fixed"); 
           	shadow.css("width", "100%"); 
           	shadow.css("height", "100%"); 
           	shadow.css("background", "#000"); 
           	shadow.css("z-index", option.index); 
           	shadow.css("top", "0"); 
           	shadow.css("left", "0"); 
           	shadow.css("opacity", "0.7"); 
           	$("."+option.target).css("z-index", option.index + 1);
            $('body').append(shadow);
            $('.shadow_cover').click(function(){
                $(".shadow_cover").fadeOut(200);
                $("."+option.target).fadeOut(400);
            });
            $(".shadow_cover").fadeIn(200);
            $("."+option.target).fadeIn(400);
        });
    };
    
    $.fn.ys_drag_file_init = function (option) {
        arg = {
            upload_url: '',
            callback: function (data) {},
            check_type: function (type) {
                return true
            },
            check_fail: function () {},
            drag_enter_hover: function () {}
        };
        for (key in option) {
            arg[key] = option[key];
        }

        function handleFileSelect(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            var files;
            files = evt.dataTransfer.files;
            for (var i = 0, f; f = files[i]; i++) {

                var t = f.type ? f.type : 'n/a',
                    reader = new FileReader(),
                    isCom = arg.check_type(t);

                if (isCom) {
                    reader.readAsDataURL(f);
                    reader.onload = (function (theFile) {
                        return function (e) {
                            $.post(arg.upload_url, {
                                type: theFile.type,
                                size: theFile.fileSize,
                                name: theFile.fileName,
                                file: this.result

                            }, function (result) {
                                arg.callback(result);
                            });
                        };
                    })(f)
                } else {
                    arg.check_fail();
                }
            }
        };
        // 处理插入拖出效果
        function handleDragEnter(evt) {
            arg.drag_enter_hover();
        }

        function handleDragLeave(evt) {}

        // 处理文件拖入事件，防止浏览器默认事件带来的重定向
        function handleDragOver(evt) {
            evt.stopPropagation();
            evt.preventDefault();
        }
        $(this).each(function (index) {
            alert(index);
            $(this).get(index).addEventListener('dragenter', handleDragEnter, false);
            $(this).get(index).addEventListener('dragover', handleDragOver, false);
            $(this).get(index).addEventListener('drop', handleFileSelect, false);
            $(this).get(index).addEventListener('dragleave', handleDragLeave, false);
        })
    };

    $.fn.ys_click_upload_file_init = function (option) {
        arg = {
            upload_url: '',
            callback: function (data) {},
            div_hover: function () {}
        };
        for (key in option) {
            arg[key] = option[key];
        }
        var form_text = '<form style="display:none" action="/upload/" enctype="multipart/form-data" method="post" id="fileForm" name="ys_upload_fileForm"><input type="file" name="filename" id = "ys_upload_button" ></form>'
        this.append(form_text);

        upload_button = $(this).find("#ys_upload_button");
        arg.div_hover();
        $(this).children("a").click( function () {
            active_block = $(this).parent().parent().parent().parent().parent().parent();
            $(this).parent().find("#ys_upload_button").click();
        });
        upload_button.change(function () {
            var form = $(this).parent();
            var options = {
                url: arg.upload_url,
                type: 'post',
                success: function (data) {
                    arg.callback(data);
                }
            };
            form.ajaxSubmit(options);
        });
    };

    $.ys_ajax = function (option) {
        op = {
            url: '',
            type: 'GET',
            data: {},
            async: false,
            datatype: 'json',
            err_occur: function (errno) {
                return true;
            },
            rt_func: function (data) {}
        };
        for (key in option) {
            op[key] = option[key];
        };
        get_dict = {};
        if (op.type == 'GET') {
            get_dict = op.data;
            op.data = {};
        }
        op.success = function (data) {
            if (op.err_occur(data.status)) {
                op.rt_func(data);
            }
        }
        $.ajax({
            url: op.url + $.pack_get(get_dict),
            type: op.type,
            data: op.data,
            datatype: op.datatype,
            async: op.async,
            success: op.success
        });
    };

	$.unpack_get = function(url){
		dst_dict = {};
		e = url.split('/');
		last_part = e[e.length - 1];
		sp_index = last_part.indexOf('?');
		dst_dict.path = last_part.substr(0, sp_index);
		params = last_part.substr(sp_index+1);
		param_set = params.split('&');
		for (i in param_set){
			param = param_set[i];
			sp_index = param.indexOf('=');
			key = param.substr(0, sp_index);
			value = param.substr(sp_index+1);
			dst_dict[key] = value;
		}
		gvar_get = dst_dict;
	};

   $.pack_get = function(dict){
		exist='';
		rtstring='';
		dict['timenow'] = Math.round(new Date().getTime()/1000);
		for (key in dict){
			if(exist==''){
				exist='?';
				connector = '';
			}else{
				connector = '&';
			}
			rtstring=rtstring+connector+key+'='+dict[key];
		}
		rtstring = exist + rtstring;
		return rtstring;
	};

})(jQuery);



// Place any jQuery/helper plugins in here.
