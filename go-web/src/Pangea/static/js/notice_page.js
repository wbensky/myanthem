$(document).ready(function(){
    var title_page = $("#notice-title").html();
    init_notice_page(title_page);
});

function init_notice_page(type){
    var notice = get_notice_by_link(type);
    var target = $(".main-content .sub-page-content .content .only");
    target.css("border-top", "5px solid " + notice_color[1]);
    target.find(".title h4").html(notice.title);
    $.ys_ajax({
        url:"/notice/list",
        datatype:"JSON",
        type:"POST",
        data:{
            type:notice.type,
        },
        rt_func:function(data){
            var item_table = init_notice_list(data.notices);
        },
    });
}

