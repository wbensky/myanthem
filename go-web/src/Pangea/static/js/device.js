$(document).ready(function(){
    var target = $(".main-content .sub-page-content .content .only");
    target.css("border-top", "5px solid " + notice_color[1] );
    var title = $(".main-content .sub-page-content .title a");
    $.ys_ajax({
        url:"/device/get",
        type:"POST",
        datatype:"JSON",
        data:{
            device_id:$("#device-id").html(),
        },
        rt_func:function(data){
            title.html(data.device.name);
            title.css("color", notice_color[1]);
            var item_div = $("<div></div>");
            item_div.css("margin", "25px 17px");
            item_div.html(data.device.desc);
            item_div.appendTo(target);
        },
    });
});
