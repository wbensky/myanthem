$(document).ready(function(){
    var target = $(".main-content .sub-page-content .content .only");
    target.css("border-top", "5px solid #ee8348");
    var title = $(".main-content .sub-page-content .title a");
    $.ys_ajax({
        url:"/notice/get",
        type:"POST",
        datatype:"JSON",
        data:{
            notice_id:$("#notice-id").html(),
        },
        rt_func:function(data){
            title.html(data.notice.title);
            title.css("color", "#ee8348");
            var item_div = $("<div></div>");
            item_div.css("margin", "25px 17px");
            item_div.html(data.notice.content);
            item_div.appendTo(target);
        },
    });
});
