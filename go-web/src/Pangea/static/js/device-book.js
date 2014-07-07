$(document).ready(function(){
    init_left_menu();
    init_left_menu_click();
    add_pop_button_login();
    var sub_menu  = $.cookie("sub_menu");
    if(sub_menu == null){
        $(".sub-page-content .content .left ul").find("li")[0].click();
    }else{
        $(".sub-page-content .content .left ul").find("li").each(function(){
            if($(this).attr("target") == sub_menu)
                $(this).click();
        });
        $.cookie("sub_menu", "", {expires : -1});
    }

});


function init_left_menu(){
    var target = $(".sub-page-content .content .left ul");
    for( var i = 0; i < map_nav["device-book"].length; i++) {
        var item_b = $("<b></b>");
        var item_li = $("<li></li>");
        item_li.attr("target", map_nav_link["device-book"][i]);
        item_b.html(map_nav["device-book"][i]);
        item_li.append(item_b);
        item_li.appendTo(target);
    }
}

function init_left_menu_click(){
    var target = $(".sub-page-content .content .left ul");
    target.children("li").click(function(){
        var title = $(this).children("b").html()
        link = $(this).attr("target");
        $(".sub-page-content .content .right .title h4").html(title);
        $(".sub-page-content .content .right .content").empty();
        exp_online_menu_function[link]();
    });
}


exp_online_menu_function= {
    "notice":function(){
        var target = $(".sub-page-content .content .right .content");
        $.ys_ajax({
            url:"/notice/list",
            datatype:"JSON",
            type:"POST",
            data:{
                type:6,
            },
            rt_func:function(data){
                var item_table = init_notice_list(data.notices);
            },
        })
    },
    "info":function(){
        $.ys_ajax({
            url:"/device/list",
            type:"POST",
            dataType:"JSON",
            rt_func:function(data){
                var item_table = init_device_list_show(data.devices);
                item_table.find("td").each(function(){
                    $(this).click(function(){
                        window.open("/device/" + $(this).parent().attr("id"));
                    });
                });
            }
        })
    },
    "search":function(){
        var target = $(".sub-page-content .content .right .content");
        add_input_item_to_html({
            target:target,
            div_id:"device-name",
            title:"设备名称",
        });
        target.append($("<hr>").css("margin", "10px 0"));
        var search_button = $("<div></div>").addClass("button").html("查询");
        search_button.click(function(){
            var name = target.find("#device-name").find("input").val();
            exp_online_menu_function ["result"](name);
        });
        search_button.appendTo(target);
    },
    "result":function(name){
        var target = $(".sub-page-content .content .right .content");
        target.parent().find(".title").find("h4").html("设备搜索");
        $.ys_ajax({
            url:"/device/search",
            type:"POST",
            datatype:"JSON",
            data:{
                name:name,
            },
            rt_func:function(data){
                var item_table = init_device_list_show(data.devices);
                item_table.find("td").each(function(){
                    $(this).click(function(){
                        window.open("/device/" + $(this).parent().attr("id"));
                    });
                });
            },
        });
    },
};

function add_pop_button_login(){
    var item_button = $("<button></button>").attr("id", "pop-button-login").hide();
    item_button.ys_pop_window({
        index:"102",
        target:$("#pop-window-login")});

    $("body").append(item_button);
}
