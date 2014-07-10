 //button's hover
var hv_item = [
    ".button",
    ".drop-menu li",
    ".sub-page-content .content .right .content .link_list tr",//not change
    ".event-card .type a",
    ".event-card .title",
    ".nav-menu li",
    ".content-nav span",
    ];

function init_theme(){
    setInterval(function(){
        for(var i = 0; i < hv_item.length; i++){
            $(hv_item[i]).hover(function(){
                $(this).addClass("hv");
            }, function(){
                $(this).removeClass("hv");
            });
        }
    }, 1000);
    init_drop_down();
    init_tree_menu();
}
//初始化下拉菜单
function init_drop_down(){
    $(".dropdown").hover(function(){
        $(this).addClass("active")
        $(this).find(".drop-menu").show();
    },
    function(){
        $(this).removeClass("active");
        $(this).find(".drop-menu").hide();
    });
}

function init_tree_menu(){
    $(".tree-sub-menu li a").hover(function(){
        $(this).parent().addClass("hv");
    }, function(){
        $(this).parent().removeClass("hv");
    });
    for(var i = 1; i< 10;i++){
        var target = $(".tree-menu").find(".tree-sub-menu.sub-" + i);
        target.children("li").children("a").css("padding-left", (10 * i) + "px");
    }
    $(".tree-menu a").click(function(){
        $(this).parent().children("ul").children("li").removeClass("active");
        $(this).parent().parent().children("li").removeClass("active");
        $(this).parent().addClass("active");
    });
}


(function ($) {

    /*
     * 用于初始化可以拖拽的模块
     * 备注：模块必须设置id
     * */
    $.fn.ys_drag_sour = function(option){
        var target = $(this);
        target[0].ondragstart = function(ev){
            ev.dataTransfer.setData("Text", ev.target.id);
        }
        $(this).attr("draggable", "ture");
    };

    /**
     * 用于初始化拖拽目的地的函数
     * 备注:参数
     * {
     *  delete_source: //if true 删除可拖拽模块
     *  accept_source: //if true 接受可拖拽模块
     *  callback://回调函数，默认传入可拖拽模块的id
     * }
     * */
    $.fn.ys_drag_dest = function(option){
        var target = $(this);
        target[0].ondrop = function(ev){
            ev.preventDefault();
            var data = ev.dataTransfer.getData("Text");
            var newO = $("#" + data).clone();
            if(option.delete_source == true){
                newO = $("#" + data).remove();
            }else{
                newO = $("#" + data);
            }
            if(option.accept_source == true){
                ev.target.appendChild(newO[0]);
            }
            if(option.callback != undefined){
                option.callback(data);
            }
            //ev.target.appendChild(document.getElementById(data));
        }
        target[0].ondragover = function(ev){
            ev.preventDefault();
        };
}

    /**
     * 用于指定弹框的目标，option里面传入的参数为
     * {index: "", target:"", pop-function:function(){}}
     * target为目标id;
     * **/
    $.fn.ys_pop_window = function(option){
        var self_target = $(this);
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
           	option.target.css("z-index", option.index + 1);
            $('body').append(shadow);
            $('.shadow_cover').click(function(){
                $(".shadow_cover").fadeOut(200);
                option.target.fadeOut(400);
            });
            $(".shadow_cover").fadeIn(200);
            option.target.fadeIn(400);
            if(option["pop-function"] != undefined){
                option["pop-function"](self_target);
            }
        });
    };

    /* 需要jQuery.form.js;
     *实现点击上传文件的功能，需要的参数
     {
        upload_url:...//上传的地址
        callback:...//回调函数
     }
     * */
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

})(jQuery);

