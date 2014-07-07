// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

//jquery depend
//计算字符串所占像素长度
String.prototype.visualLength = function(fontsize)
{
        var ruler = $('#ruler');
        if(0 == ruler.length){
        	$('<span id="ruler" style="visibility: hidden; white-space: nowrap;"></span>').appendTo('body');
        	ruler = $('#ruler');
        }
        ruler.css({"font-size": fontsize+"px"});
        ruler.text(this);
        return ruler[0].offsetWidth;
};

//匹配结尾
String.prototype.endWith=function(str){
  if(str==null||str==""||this.length==0||str.length>this.length)
     return false;
  if(this.substring(this.length-str.length)==str)
     return true;
  else
     return false;
  return true;
}

//匹配开始
String.prototype.startWith=function(str){
  if(str==null||str==""||this.length==0||str.length>this.length)
   return false;
  if(this.substr(0,str.length)==str)
     return true;
  else
     return false;
  return true;
}

function f_frame_fit_size(iframe, new_size){
	$('#'+iframe).height(new_size);
	f_page_resize();
}

//defione ys_lib

var ys = {};

//unpack param, get cookie
ys.unpack_cookie = function(dst_dict){
    if (dst_dict == undefined){
		dst_dict = {};
	}
	cookie = document.cookie;
	cookie_set = cookie.split(';');
	for(index in cookie_set){
		elem = cookie_set[index];
		for(var i=0;;i++){
	       if(elem[i]!=' '){
		      break;
	       }
        }
		elem = elem.substr(i);
		sp_index = elem.indexOf('=');
		key = elem.substr(0, sp_index);
		value = elem.substr(sp_index+1);
		dst_dict[key] = value;
    }
    return dst_dict;
};
	
ys.unpack_get = function(url, dst_dict){
    if(url == undefined){
        url = window.location.href;
    }
    if(dst_dict == undefined){
        dst_dict = {};
    }
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
    return dst_dict;
};

ys.pack_get = function(dict){
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

//pack get, solve ie same url read from buffer problem

//jquer轻量基础插件包
(function($){
    
    $.gvar = {};
    
    //
    $.var_init = function(){
        $.gvar.get = ys.unpack_get();
        $.gvar.cookie = ys.unpack_cookie();
        for(key in ys){
            $[key] = ys[key];
        }
        try{
            active_theme.init();
        }catch(e){
            active_theme = undefined;
        }
    }
    
    //disable scroll, auto size 
    //包含计算完成后的回调函数
    $.fn.autosize = function(ext_height, done_func){
        if(ext_height == undefined){
            ext_height = 10;
        }
        $(this).bind('keyup keydown', function(){
            $(this).height('0px');
            var setheight = $(this).get(0).scrollHeight;
            if($(this).attr("_height")-ext_height != setheight){
                
               $(this).height(setheight+ext_height+"px").attr("_height",setheight);
               $('#wmd-preview').height(setheight+ext_height+"px");
            }else{
                $(this).height($(this).attr("_height")+"px");
            }
            if(done_func != undefined){
                done_func(this);
            }
        });
	}
    
    //get iframe windown by id providing
    //通过iframe的id获取window对象
    $.fn.get_ifw = function(){
		return $(this).get(0).contentWindow;
	}
    
    //table diff_color by odd and even
    //自动给表哥划分奇偶行
    $.fn.tableOEfill = function(skip_tr){
        if(skip_tr == undefined){
            skip_tr = 1;
        }
        $(this).find('tr').each(function(tr_index){
            if(tr_index < skip_tr){
                return;
            }
            this_tr = $(this);
            if(tr_index%2 == 0){
                this_tr.removeClass('tr_even');
                this_tr.addClass('tr_odd');
            }else{
                this_tr.removeClass('tr_odd');
                this_tr.addClass('tr_even');
            }
        });	
    }
    
    $.fn.loadList = function(menu_dict, click_callback){
        $(this).find('li').remove();
        this_ul = $(this).find('ul');
        this_ul.parent().find('.header-tip').text('');
        for(var key in menu_dict){
            menu_item = menu_dict[key];
            if(menu_item == null){
                this_ul.parent().find('.header-tip').text(key);
            }else{
                li_elem = $('<li></li>');
                li_elem.text(key);
                if(typeof(menu_item) == 'function'){
                    li_elem.click(menu_item);
                }else{
                    li_elem.attr('cmd', menu_item);
                    if(click_callback == undefined){
                        li_elem.click(f_cmd_link);
                    }else{
                        li_elem.click(click_callback);
                    }
                }
                li_elem.appendTo(this_ul);
            }
        }
        active_theme.fit();
    }
    
})(jQuery);

//页面大小重置事件管理
function f_page_resize(){
    try{
        if(page_resize_func_set == undefined){
            page_resize_func_set = [];
        }
    }catch(e){
        page_resize_func_set = [];
    }
    w_h = $(window).height();
    w_w = $(window).width();
    if(w_w < 1024){
        w_w = 1024;
    }
    for(var key in page_resize_func_set){
        page_resize_func_set[key]();
    }
}

function f_page_resize_reg(resize_func){
    if(resize_func == undefined){
        return;
    }
    page_resize_func_set.push(resize_func);
}

f_page_resize();
$(window).resize(f_page_resize);

//jquery横向页面切换支持

$.f_switch_main_page_x_scroll = function(page_id, done_func){
    //获取active page 变量，标记当前页面
    try{
        if(active_main_page == undefined){
            active_main_page = -1;
        }
    }catch(e){
        active_main_page = -1;
    }
	if(active_main_page != page_id){
		$('.main-page').each(function(index){
			id = $(this).attr('id');
			if(	id == 'main-page-' + active_main_page ||
				id == 'main-page-' + page_id){
				$(this).show();
				if(id == 'main-page-' + page_id){
					active_index = index;
				}
			}else{
				$(this).hide();
			}
		});
	}
	active_main_page = page_id;
	n_left = active_index * $('#main-body').attr('step-width');
	main_page_resizing = true;
	$('#main-body .x-scroll-wrap').stop().animate({left:-n_left + 'px'}, 300, function(){
		main_page_resizing = false;
		if(done_func != undefined)
			done_func();
	});
}