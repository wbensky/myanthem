$(document).ready(function(){
    init_left_menu();
    init_left_menu_click();
    add_pop_button_login();
    var sub_menu = $.cookie("sub_menu");
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
    for( var i = 0; i < map_nav["exp-online"].length; i++) {
        var item_b = $("<b></b>");
        var item_li = $("<li></li>");
        item_li.attr("target", map_nav_link["exp-online"][i]);
        item_b.html(map_nav["exp-online"][i]);
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
        $.ys_ajax({
            url :"/notice/list",
            datatype:"json",
            data:{type:8},
        rt_func:function(data){
            init_notice_list(data.notices);
        }
        });
    },
    "lab":function(){
        $.ys_ajax({
            url :"/notice/list",
            datatype:"json",
            data:{type:9},
        rt_func:function(data){
            init_notice_list(data.notices, data.count, data.page);
        }
        });
    },
    "source":function(){
    
    
    
    },
    "system":function(){
         $.ys_ajax({
            url :"/notice/list",
            datatype:"json",
            data:{type:10},
        rt_func:function(data){
            init_notice_list(data.notices, data.count, data.page);
        }
        });
    
    
    },
    "lesson":function(){
    },
    "booking":function(){
        $.ys_ajax({
            url:"/user/check",
            datatype:"json",
            rt_func:function(data){
                if(data.status == "Fail"){
                    $("#pop-button-login").click();
                }else{
                }
            }
        });
    },
    "virtual":function(){
    },
    "online":function(){
    },
    "score":function(){
    },
};

function add_pop_button_login(){
    var item_button = $("<button></button>").attr("id", "pop-button-login").hide();
    item_button.ys_pop_window({
        index:"102",
        target:$("#pop-window-login")});

    $("body").append(item_button);
}
