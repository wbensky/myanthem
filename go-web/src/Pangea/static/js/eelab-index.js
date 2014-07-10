$(document).ready(function(){

    init_event_list();

});

function init_event_list(){
    $.ys_ajax({
        url:"notice/firstpage",
        datatype:"JSON",
        type:"POST",
        data:{
        },
        rt_func:function(data){
            target = $(".main-content .center");
            var notices = data.notices;
            for(var i = 0; i < notices.length / 3; i++){
                var div_event_list = $("<div></div>").addClass("event-list");
                for(var j = i * 3; (j < i * 3 + 3) && (j < notices.length); j++){
                    var item_div = $("<div></div>").addClass("event-card");
                    item_div.css("border-top", "4px solid " + notice_color[j % notice_color.length]);
                    if(j % 3 == 0){
                        item_div.addClass("first");
                    }else{
                        item_div.addClass("right");
                    }
                    var item_type_div = $("<div></div>").addClass("type");
                    var item_a = $("<a></a>")
                    item_a.html(notice_menu[notices[j].Type-1].title)
                    item_a.attr("href", notice_menu[notices[j].Type-1].link);
                    item_a.css("color", "#b5b5b5");
                    item_a.css("text-decoration", "none");

                    item_a.hover(function(){
                        $(this).css("color", "#428bd1");
                    }, function(){
                        $(this).css("color", "#b5b5b5");
                    });
                    item_type_div.append(item_a);
                    var item_title_div = $("<div></div>").addClass("title").append($("<a></a>").html(notices[j].Title).attr("id", notices[j].Id).attr("href", "/notice/" + notices[j].Id));
                    item_title_div.children("a").css("color", "#333");
                    item_title_div.children("a").css("text-decoration", "none");
                    item_title_div.children("a").hover(function(){
                        $(this).css("color", "#428bd1");
                        $(this).css("text-decoration", "underline");
                    },function(){
                        $(this).css("color", "#333");
                        $(this).css("text-decoration", "none");
                    });

                    var item_desc_div = $("<div></div>").addClass("desc").html(notices[j].Desc);
                    var item_time_div = $("<div></div>").addClass("time").html("<b>" + unix_to_datetime(notices[j].CreatedTime)  + "</b>");
                    item_type_div.appendTo(item_div);
                    item_title_div.appendTo(item_div);
                    item_desc_div.appendTo(item_div);
                    item_time_div.appendTo(item_div);
                    item_div.appendTo(div_event_list);
                }
                div_event_list.appendTo(target);
            }
        }
    });
}
