function init_nav_menu(){
    var target = $(".header-content .nav .nav-list");
    for(key in map_nav){
        for(var i = 0; i< map_nav[key].length; i ++){
            var item_li = $("<li></li>");
            item_li.attr("target", map_nav[key][i].link);
            item_li.html(map_nav[key][i].title);
            item_li.appendTo(target.find("#" + key));
        }
    }
    target.children("li").children("ul").children("li").click(function(){
            var link = $(this).parent().attr("id");
            var target_link = $(this).attr("target");
            menu_function[link + "-" + target_link]();
            var target = $(".sub-page-content .content .right .title");
            target.find("a").html($(this).html());
    });
}

$(document).ready(function(){
    init_nav_menu();
    init_page();
    init_theme();
});
