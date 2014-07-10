map_nav = {
    "account":[
        ],
    "goods":[
        ],
    "information":[
        {
            title:"公告管理" ,
            link:"notice"
        }
        ],
    "postage":[
        "邮费计算器",
        ],
};

function init_page(){

};

var menu_function = {
    "information-notice-update":function(notice_id){
      var target = $(".sub-page-content .content .right");
        target.find(".content").empty();
        add_content_nav({
            target:target.find(".content-nav"),
            title:"公告修改",
            spans:[{
                title:"返回",
                div_id:"return ",
                click_func:function(){
                    menu_function["information-notice"]();
                },
            },
            ],
        });
        add_input_item_to_html({
            target:target.find(".content"),
            title:"标题:",
            div_id:"title",
        });

        add_input_item_to_html({
            target:target.find(".content"),
            title:"描述:",
            div_id:"desc",
        });

        add_select_item_to_html({
            target:target.find(".content"),
            title:"类型:",
            options:notice_menu,
            div_id:"type"
        });
        var select_revicer = add_select_item_to_html({
            target:target.find(".content"),
            title:"接收人",
            div_id:"status",
            options:[
                {
                    content:"所有人",
                    value:"0",
                },{
                    content:"分组",
                    value:"1",
                },{
                    content:"个人",
                    value:"2"
                }
            ],
        });

        select_revicer.change(function(){
            $(this).parent().find(".recevie_block").hide();
            var this_val = $(this).find("select").val();
            if(this_val == "1"){
                $(this).parent().find("#group").show();
            }else if(this_val == "2"){
                $(this).parent().find("#username").show();
            }
        });

        var select_group = add_select_item_to_html({
            target:target.find(".content"),
            title:"选择分组",
            div_id:"group",
        });
        select_group.addClass("recevie_block").hide();

        $.ys_ajax({
            url:"/group/all",
            datatype:"name",
            type:"post",
            rt_func:function(data){
                for(var i = 0; i < data.groups.length; i++){
                    var item_option = $("<option></option>");
                    item_option.attr("value", data.groups[i].id);
                    item_option.html(data.groups[i].name);
                    item_option.appendTo(select_group.find("select"));
                }
            $.ys_ajax({
                url:"/notice/get",
                datatype:"JSON",
                type:"POST",
                data:{
                id:notice_id
                },
                rt_func:function(data){
                    target.find(".content").find("#title").find("input").val(data.notice.title);
                    target.find(".content").find("#desc").find("input").val(data.notice.desc);
                    target.find(".content").find("#type").find("select").val(data.notice.type);
                    target.find(".content").find("#status").find("select").val(data.notice.status);
                    target.find(".content").find("#group").find("select").val(data.notice.recevie);
                    target.find(".content").find("#username").find("input").val(data.notice.recevie);
                    var timeout = setInterval(function(){
                        if(target.find("#content").contents().find("#editor").length != 0){
                            target.find("#content").contents().find("#editor").html(data.notice.content);
                            clearInterval(timeout);
                        }
                    }, 500);
                },
        });
            },
        });

        var select_username = add_input_item_to_html({
            target:target.find(".content"),
            title:"用户名",
            div_id:"username",
        });
        select_username.addClass("recevie_block").hide();
        select_username.find("input").attr("id", "input");
        add_title_item_to_html({
            target:target.find(".content"),
            title:"内容:",
        });
        add_html_editor_to_html({
            div_id:"content",
            target:target.find(".content"),
        });
        target.find(".content").append($("<hr>").css("margin", "10px 0"));
        var item_button_update = add_button_to_html({
            title:"保存",
            target:target.find(".content"),
        });
        item_button_update.click(function(){
            var t_content = target.find(".content");
            var title = t_content.find("#title").find("input").val();
            var desc = t_content.find("#desc").find("input").val();
            var type = t_content.find("#type").find("select").val();
            var content = t_content.find("iframe").contents().find("#editor").html();
            var recevie = 0;
            var status_n = t_content.find("#status").find("select").val();
            if(status_n == 1){
                recevie = t_content.find("#group").find("select").val();
            }else if(status_n == 2){
                recevie = t_content.find("#username").find("input").attr("id");
            }

            if(title == null){
                t_content.find(".title").find("input").addClass("error");
                return;
            }
            $.ys_ajax({
                url:"/notice/update",
                datatype:"JSON",
                type:"POST",
                data:{
                    id:notice_id,
                    title:title,
                    desc:desc,
                    type:type,
                    content:content,
                    status:status_n,
                    recevie:recevie,
                },
                rt_func:function(){
                    menu_function["information-notice"]();
                }
            });
        });
    },
    "information-notice":function(){
        var target = $(".sub-page-content .content .right");
        target.find(".content").empty();
        target.find(".content-nav").empty();
        add_content_nav({
            target:target.find(".content-nav"),
            title:"公告管理",
            spans:[{
                title:"添加",
                div_id:"add",
                click_func:function(){
                    menu_function["information-notice-add"]();
                },
            },
            ],
        });
        $.ys_ajax({
            url:"notice/page",
            datatype:"JSON",
            type:"POST",
            data:{
                page:1,
                type:-1,
                recevie:-1,
                status:-1,
            },
            rt_func:function(data){
               var item_table =  init_notice_list(data.notices, -1, -1, -1);
            },
        });
    },

    "information-notice-add":function(){
        var target = $(".sub-page-content .content .right");
        target.find(".content").empty();
        add_content_nav({
            target:target.find(".content-nav"),
            title:"公告添加",
            spans:[{
                title:"返回",
                div_id:"return ",
                click_func:function(){
                    menu_function["information-notice"]();
                },
            },
            ],
        });

        add_input_item_to_html({
            target:target.find(".content"),
            title:"标题:",
            div_id:"title",
        });

        add_input_item_to_html({
            target:target.find(".content"),
            title:"描述:",
            div_id:"desc",
        });

        add_select_item_to_html({
            target:target.find(".content"),
            title:"类型:",
            options:notice_menu,
            div_id:"type"
        });
        var select_revicer = add_select_item_to_html({
            target:target.find(".content"),
            title:"接收人",
            div_id:"status",
            options:[
                {
                    content:"所有人",
                    value:"0",
                },{
                    content:"分组",
                    value:"1",
                },{
                    content:"个人",
                    value:"2"
                }
            ],
        });

        select_revicer.change(function(){
            $(this).parent().find(".recevie_block").hide();
            var this_val = $(this).find("select").val();
            if(this_val == "1"){
                $(this).parent().find("#group").show();
            }else if(this_val == "2"){
                $(this).parent().find("#username").show();
            }
        });

        var select_group = add_select_item_to_html({
            target:target.find(".content"),
            title:"选择分组",
            div_id:"group",
        });
        select_group.addClass("recevie_block").hide();

        $.ys_ajax({
            url:"/group/all",
            datatype:"name",
            type:"post",
            rt_func:function(data){
                for(var i = 0; i < data.groups.length; i++){
                    var item_option = $("<option></option>");
                    item_option.attr("value", data.groups[i].id);
                    item_option.html(data.groups[i].name);
                    item_option.appendTo(select_group.find("select"));
                }
            },
        });

        var select_username = add_input_item_to_html({
            target:target.find(".content"),
            title:"用户名",
            div_id:"username",
        });
        select_username.addClass("recevie_block").hide();
        select_username.find("input").attr("id", "input");
        add_title_item_to_html({
            target:target.find(".content"),
            title:"内容:",
        });
        add_html_editor_to_html({
            div_id:"content",
            target:target.find(".content"),
        });
        target.find(".content").append($("<hr>").css("margin", "10px 0"));
        var item_button_add = add_button_to_html({
            title:"添加",
            target:target.find(".content"),
        });
        item_button_add.click(function(){
            var t_content = target.find(".content");
            var title = t_content.find("#title").find("input").val();
            var desc = t_content.find("#desc").find("input").val();
            var type = t_content.find("#type").find("select").val();
            var content = t_content.find("iframe").contents().find("#editor").html();
            var recevie = 0;
            var status_n = t_content.find("#status").find("select").val();
            if(status_n == 1){
                recevie = t_content.find("#group").find("select").val();
            }else if(status_n == 2){
                recevie = t_content.find("#username").find("input").attr("id");
            }

            if(title == null){
                t_content.find(".title").find("input").addClass("error");
                return;
            }
            $.ys_ajax({
                url:"/notice/add",
                datatype:"JSON",
                type:"POST",
                data:{
                    title:title,
                    desc:desc,
                    type:type,
                    content:content,
                    status:status_n,
                    recevie:recevie,
                },
                rt_func:function(){
                    menu_function["information-notice"]();
                }
            });
        });
    }
};
