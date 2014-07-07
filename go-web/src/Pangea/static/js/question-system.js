$(document).ready(function(){
    init_left_menu();
    init_left_menu_click();
    add_pop_button_login();
    $(".sub-page-content .content .left ul ").children("li")[0].click();
});


function init_left_menu(){
    var target = $(".sub-page-content .content .left ul");
    for( var i = 0; i < map_nav["question-system"].length; i++) {
        var item_b = $("<b></b>");
        var item_li = $("<li></li>");
        item_li.attr("target", map_nav_link["question-system"][i]);
        item_b.html(map_nav["question-system"][i]);
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
    "introduce":function(){},
    "electric-engneer":function(){},
    "circuit-engneer":function(){},
    "train-coach":function(){},
};

function add_pop_button_login(){
    var item_button = $("<button></button>").attr("id", "pop-button-login").hide();
    item_button.ys_pop_window({
        index:"102",
        target:$("#pop-window-login")});

    $("body").append(item_button);
}
