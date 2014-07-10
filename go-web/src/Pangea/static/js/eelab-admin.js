$(document).ready(function(){
    init_left_menu();
    init_left_menu_click();
    add_pop_button_login();
    $(".sub-page-content .content .left ul ").children("li")[0].click();
    $(".cmd").click(function(){
        var target = $(this).attr("target");
        cmd_function_map[target]();
    });

});

var map_admin_menu = [
    "公告管理",
    "关于中心管理",
    "创新科技管理",
    "设备管理" ,
    "实验管理",
    ];

var map_admin_menu_link = [
    "notice-manage",
    "about-center",
    "invol-tect",
    "device",
    "exp"
];

var map_admin_menu_link_sub = {
    "notice-manage":[
        "重要公告",
    "中心新闻",
    "科研动态"
        ],
    "about-center":[
        "师资队伍",
    "教学成果",
    "科研成果",
    ],
    "invol-tect":[
        "创新信息管理",
    "资料管理",
    "电子大赛",
    "获奖信息"],
    "device":[
        "设备信息",
    "设备录入",
    "设备借出",
    "设备归还",
    "设备公告",
        ],
    "exp":[
        "实验公告",
        "实验室介绍",
        "规章制度",
        ],
};

var map_admin_menu_link_sub_target = {
    "notice-manage":[
        "import",
    "center",
    "scin-dy",
    ],

    "about-center":[
        "teachers-troops",
    "teach-harvest",
    "sr-harvest",
    ],
    "invol-tect":[
        "info",
    "material",
    "competition",
    "profit-info",
    ],
    "device":[
        "info",
    "add",
    "loan",
    "return",
    "notice",
    ],
    "exp":[
        "notice",
        "introduction",
        "system",
        ],
};

var admin_menu_function = {
    "exp-system":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("规章制度");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        var type_id = 10;
        var back_page = "exp-system";
        $.ys_ajax({
            url:"notice/list",
            datatype:"JSON",
            type:"POST",
            data:{
                type:type_id,
            },
            rt_func:function(data){
                var item_table = init_notice_number_list(data.notices, data.count, data.page);
                target.append($("<hr>").css("margin", "10px 0"));
                var item_button_add = $("<dvi></div>").addClass("button").html("添加").appendTo(target);
                item_button_add.click(function(){
                    admin_menu_function["notice-add"]({
                        type:type_id,
                        back:back_page,
                    });
                });

                item_table.find(".update").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        admin_menu_function["notice-update"]({
                            type:type_id,
                            back:back_page,
                            notice_id:notice_id,
                        });
                    });
                });

                item_table.find(".delete").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        $.ys_ajax({
                            url:"/notice/delete",
                            datatype:"JSON",
                            type:"POST",
                            data:{notice_id:notice_id},
                            rt_func:function(data){
                                admin_menu_function[back_page]();
                            },
                            });
                    });
                });
            }
        });
    
    },
    "exp-introduction":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("实验室介绍");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        var type_id = 9;
        var back_page = "exp-introduction";
        $.ys_ajax({
            url:"notice/list",
            datatype:"JSON",
            type:"POST",
            data:{
                type:type_id,
            },
            rt_func:function(data){
                var item_table = init_notice_number_list(data.notices, data.count, data.page);
                target.append($("<hr>").css("margin", "10px 0"));
                var item_button_add = $("<dvi></div>").addClass("button").html("添加").appendTo(target);
                item_button_add.click(function(){
                    admin_menu_function["notice-add"]({
                        type:type_id,
                        back:back_page,
                    });
                });

                item_table.find(".update").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        admin_menu_function["notice-update"]({
                            type:type_id,
                            back:back_page,
                            notice_id:notice_id,
                        });
                    });
                });

                item_table.find(".delete").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        $.ys_ajax({
                            url:"/notice/delete",
                            datatype:"JSON",
                            type:"POST",
                            data:{notice_id:notice_id},
                            rt_func:function(data){
                                admin_menu_function[back_page]();
                            },
                            });
                    });
                });
            }
        });
    },
    /**/
    "invol-tect-competition":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("获奖信息管理");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        var type_id = 7;
        var back_page = "invol-tect-competition";
        $.ys_ajax({
            url:"notice/list",
            datatype:"JSON",
            type:"POST",
            data:{
                type:type_id,
            },
            rt_func:function(data){
                var item_table = init_notice_number_list(data.notices);
                target.append($("<hr>").css("margin", "10px 0"));
                var item_button_add = $("<dvi></div>").addClass("button").html("添加").appendTo(target);
                item_button_add.click(function(){
                    admin_menu_function["notice-add"]({
                        type:type_id,
                        back:back_page,
                    });
                });

                item_table.find(".update").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        admin_menu_function["notice-update"]({
                            type:type_id,
                            back:back_page,
                            notice_id:notice_id,
                        });
                    });
                });

                item_table.find(".delete").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        $.ys_ajax({
                            url:"/notice/delete",
                            datatype:"JSON",
                            type:"POST",
                            data:{notice_id:notice_id},
                            rt_func:function(data){
                                admin_menu_function[back_page]();
                            },
                            });
                    });
                });
            }
        });

    
    },
    "invol-tect-material":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("资料管理");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        $.ys_ajax({
            url:"/file/list",
            datatype:"JSON",
            type:"POST",
            data:{
                type:fileType["invol-tect-material"],
            },
            rt_func:function(data){
                var item_table = init_file_list(data.files);
                item_table.find(".delete").each(function(){
                    $(this).click(function(){
                        var fileId = $(this).parent().attr("id");
                        $.ys_ajax ({
                            url:"file/delete",
                            datatype:"JSON",
                            type:"POST",
                            data:{
                                fileid:fileId,
                            },
                            rt_func:function(data){
                                if(data.status == "SUCCESS"){
                                    admin_menu_function["invol-tect-material"]();
                                }
                            },
                        });
                    });
                });
                target.append($("<hr>").css("margin", "10px 0"));
                var item_button_add = $("<div></div>").addClass("button").html("添加");
                item_button_add.ys_pop_window({
                    target:$("#pop-window-add-file"),
                    index:100,
                    "pop-function":function(){
                        var pop = $("#pop-window-add-file");
                        pop.find("#upload-file").empty();
                        pop.find("#upload-file").append("<a>上传文件</a>");
                        pop.find("#upload-file").ys_click_upload_file_init({
                            upload_url:'/file/uploadfile',
                            callback:function(data){
                                if(data.status == "SUCCESS"){
                                    var pop_s = $("#pop-window-add-file");
                                    pop_s.find("#name").find("input").val(data.filename);
                                    pop_s.find("#name").attr("realname", data.filename);
                                }
                            },
                        });
                    },
                });
                target.append(item_button_add);
            }
        });
      },
    "exp-notice":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("实验公告");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        var type_id = 8;
        var back_page = "exp-notice";
        $.ys_ajax({
            url:"notice/list",
            datatype:"JSON",
            type:"POST",
            data:{
                type:type_id,
            },
            rt_func:function(data){
                var item_table = init_notice_number_list(data.notices);
                target.append($("<hr>").css("margin", "10px 0"));
                var item_button_add = $("<dvi></div>").addClass("button").html("添加").appendTo(target);
                item_button_add.click(function(){
                    admin_menu_function["notice-add"]({
                        type:type_id,
                        back:back_page,
                    });
                });

                item_table.find(".update").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        admin_menu_function["notice-update"]({
                            type:type_id,
                            back:back_page,
                            notice_id:notice_id,
                        });
                    });
                });

                item_table.find(".delete").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        $.ys_ajax({
                            url:"/notice/delete",
                            datatype:"JSON",
                            type:"POST",
                            data:{notice_id:notice_id},
                            rt_func:function(data){
                                admin_menu_function[back_page]();
                            },
                            });
                    });
                });
            }
        });
  
    }, 
    "invol-tect-profit-info":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("获奖信息管理");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        var type_id = 5;
        var back_page = "invol-tect-profit-info";
        $.ys_ajax({
            url:"notice/list",
            datatype:"JSON",
            type:"POST",
            data:{
                type:type_id,
            },
            rt_func:function(data){
                var item_table = init_notice_number_list(data.notices);
                target.append($("<hr>").css("margin", "10px 0"));
                var item_button_add = $("<dvi></div>").addClass("button").html("添加").appendTo(target);
                item_button_add.click(function(){
                    admin_menu_function["notice-add"]({
                        type:type_id,
                        back:back_page,
                    });
                });

                item_table.find(".update").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        admin_menu_function["notice-update"]({
                            type:type_id,
                            back:back_page,
                            notice_id:notice_id,
                        });
                    });
                });

                item_table.find(".delete").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        $.ys_ajax({
                            url:"/notice/delete",
                            datatype:"JSON",
                            type:"POST",
                            data:{notice_id:notice_id},
                            rt_func:function(data){
                                admin_menu_function[back_page]();
                            },
                            });
                    });
                });
            }
        });
    },
    /*创新科技管理*/
    "invol-tect-info":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("创新信息管理");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        var type_id = 4;
        var back_page = "invol-tect-info";
        $.ys_ajax({
            url:"notice/list",
            datatype:"JSON",
            type:"POST",
            data:{
                type:type_id,
            },
            rt_func:function(data){
                var item_table = init_notice_number_list(data.notices);
                target.append($("<hr>").css("margin", "10px 0"));
                var item_button_add = $("<dvi></div>").addClass("button").html("添加").appendTo(target);
                item_button_add.click(function(){
                    admin_menu_function["notice-add"]({
                        type:type_id,
                        back:back_page,
                    });
                });

                item_table.find(".update").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        admin_menu_function["notice-update"]({
                            type:type_id,
                            back:back_page,
                            notice_id:notice_id,
                        });
                    });
                });

                item_table.find(".delete").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        $.ys_ajax({
                            url:"/notice/delete",
                            datatype:"JSON",
                            type:"POST",
                            data:{notice_id:notice_id},
                            rt_func:function(data){
                                admin_menu_function[back_page]();
                            },
                            });
                    });
                });
            }
        });
    
    },
    
    /*公告相关*/
     "notice-update":function(option){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html(notice_menu[option.type]);
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        add_input_item_to_html({"target":target, "div_id":"title", "title":"标题:"});
        add_textarea_item_to_html({"target":target, "div_id":"desc", "title":"描述:"});
        add_select_item_to_html({"target":target,
            "div_id":"status",
            "title":"首页显示:",
            "options":[
                {value:0,
                    content:"否"},
                {
                    value:1,
                content:"是",
                }
            ],
        });
        add_title_item_to_html({"target":target, "div_id":"", "title":"内容:"});
        add_html_editor_to_html({"target":target, "div_id":"content"});
        target.append($("<hr>").css("margin", "10px 0"));

        var item_button_add = add_button_to_html({
            target:target, title:"修改",
        });
        item_button_add.click(function(){
            var title = target.find("#title").find("input").val();
            var state = target.find("#status").find("select").val();
            var desc = target.find("#desc").find("textarea").val();
            var content = target.find("#content").contents().find("#editor").html();
            $.ys_ajax({
                url:"/notice/update",
                type:"POST",
                datatype:"JSON",
                data:{
                    notice_id:option.notice_id,
                    type:option.type,
                    title:title,
                    desc:desc,
                    content:content,
                    status:state,
                },
                rt_func:function(data){
                    if(data.status == "SUCCESS")
                    admin_menu_function[option.back]();
                }
            });
        })

        var item_button_back = add_button_to_html({target:target, title:"返回"});
        item_button_back.click(function(){
            admin_menu_function[option.back]()
        });

        $.ys_ajax({
            url:"/notice/get",
            datatype:"JSON",
            type:"POST",
            data:{notice_id:option.notice_id},
            rt_func:function(data){
                target.find("#title").find("input").val(data.notice.title);
                target.find("#desc").find("textarea").val(data.notice.desc);
                target.find("#status").find("select").val(data.notice.status);
                var timeout = setInterval(function(){
                    if(target.find("#content").contents().find("#editor").length != 0){
                        target.find("#content").contents().find("#editor").html(data.notice.content);
                        clearInterval(timeout);
                    }
                }, 500);
            }
        });
    },

    "notice-add":function(option){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html(notice_menu[option.type]);
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        add_input_item_to_html({"target":target, "div_id":"title", "title":"标题:"});
        add_textarea_item_to_html({"target":target, "div_id":"desc", "title":"描述:"});
        add_select_item_to_html({"target":target,
            "div_id":"status",
            "title":"首页显示:",
            "options":[
                {value:0,
                    content:"否"},
                {
                    value:1,
                content:"是",
                }
            ],
        });
        add_title_item_to_html({"target":target, "div_id":"", "title":"内容:"});
        add_html_editor_to_html({"target":target, "div_id":"content"});
        target.append($("<hr>").css("margin", "10px 0"));

        var item_button_add = add_button_to_html({
            target:target, title:"添加",
        });
        item_button_add.click(function(){
            var title = target.find("#title").find("input").val();
            var state = target.find("#status").find("select").val();
            var desc = target.find("#desc").find("textarea").val();
            var content = target.find("#content").contents().find("#editor").html();
            $.ys_ajax({
                url:"/notice/create",
                type:"POST",
                datatype:"JSON",
                data:{
                    type:option.type,
                    title:title,
                    desc:desc,
                    content:content,
                    status:state,
                },
                rt_func:function(data){
                    if(data.status == "SUCCESS")
                    admin_menu_function[option.back]();
                }
            });
        })

        var item_button_back = add_button_to_html({target:target, title:"返回"});
        item_button_back.click(function(){
            admin_menu_function[option.back]()
        });
    },
    "notice-manage-import":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("重要公告");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();
        
        var type_id = 1;
        var back_page = "notice-manage-import";
        $.ys_ajax({
            url:"notice/list",
            datatype:"JSON",
            type:"POST",
            data:{
                type:type_id,
            },
            rt_func:function(data){
                var item_table = init_notice_number_list(data.notices);
                target.append($("<hr>").css("margin", "10px 0"));
                var item_button_add = $("<dvi></div>").addClass("button").html("添加").appendTo(target);
                item_button_add.click(function(){
                    admin_menu_function["notice-add"]({
                        type:type_id,
                        back:back_page,
                    });
                });

                item_table.find(".update").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        admin_menu_function["notice-update"]({
                            type:type_id,
                            back:back_page,
                            notice_id:notice_id,
                        });
                    });
                });

                item_table.find(".delete").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        $.ys_ajax({
                            url:"/notice/delete",
                            datatype:"JSON",
                            type:"POST",
                            data:{notice_id:notice_id},
                            rt_func:function(data){
                                admin_menu_function[back_page]();
                            },
                            });
                    });
                });
            }
        });
    },
    "notice-manage-center":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("中心新闻");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        var type_id = 2;
        var back_page = "notice-manage-center";
        $.ys_ajax({
            url:"notice/list",
            datatype:"JSON",
            type:"POST",
            data:{
                type:type_id,
            },
            rt_func:function(data){
                var item_table = init_notice_number_list(data.notices);
                target.append($("<hr>").css("margin", "10px 0"));
                var item_button_add = $("<dvi></div>").addClass("button").html("添加").appendTo(target);
                item_button_add.click(function(){
                    admin_menu_function["notice-add"]({
                        type:type_id,
                        back:back_page,
                    });
                });

                item_table.find(".update").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        admin_menu_function["notice-update"]({
                            type:type_id,
                            back:back_page,
                            notice_id:notice_id,
                        });
                    });
                });

                item_table.find(".delete").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        $.ys_ajax({
                            url:"/notice/delete",
                            datatype:"JSON",
                            type:"POST",
                            data:{notice_id:notice_id},
                            rt_func:function(data){
                                admin_menu_function[back_page]();
                            },
                            });
                    });
                });
            }
        });
    },
    "notice-manage-scin-dy":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("科研动态");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();
        $.ys_ajax({
            url:"notice/list",
            datatype:"JSON",
            type:"POST",
            data:{
                type:3,
            },
            rt_func:function(data){
                var item_table = init_notice_number_list(data.notices);
                target.append($("<hr>").css("margin", "10px 0"));
                var item_button_add = $("<dvi></div>").addClass("button").html("添加").appendTo(target);
                item_button_add.click(function(){
                    admin_menu_function["notice-add"]({
                        type:3,
                        back:"notice-manage-scin-dy",
                    });
                });

                item_table.find(".update").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        admin_menu_function["notice-update"]({
                            type:3,
                            back:"notice-manage-scin-dy",
                            notice_id:notice_id,
                        });
                    });
                });

                item_table.find(".delete").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        $.ys_ajax({
                            url:"/notice/delete",
                            datatype:"JSON",
                            type:"POST",
                            data:{notice_id:notice_id},
                            rt_func:function(data){
                                admin_menu_function["notice-manage-scin-dy"]();
                            },
                            });
                    });
                });
            }
        });
    },
    /*end 公告相关*/
    
    "about-center-teach-harvest-detail":function(type){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html(teach_harvest[type-1].title);
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        $("<hr>").css("margin", "10px 0").appendTo(target);
        var pop = $("#pop-window-add-table");
        pop.find(".content").attr("type_id", type);
        var sub_title_length = teach_harvest[type-1].sub_title.length;
        for(var i = 1; i < 7; i++){
            if(i < sub_title_length + 1){
                pop.find("#c" + (i)) .find(".title").html(teach_harvest[type-1].sub_title[i - 1]);
            }else{
                pop.find("#c" + i).hide();
            }
        }


        $.ys_ajax({
            url:"/table/list",
            type:"POST",
            datatype:"JSON",
            data:{
                type:type,
            },
            rt_func:function(data){
                var item_table = init_harvest_detail_list(data.tables, type);
                $("<hr>").css("margin", "10px 0").appendTo(target);
                var item_button_add = add_button_to_html({target:target, title:"添加"});
                var item_button_back = add_button_to_html({target:target, title:"返回"});
                item_button_back.click(function(){
                    admin_menu_function["about-center-teach-harvest"]();
                });
                item_button_add.ys_pop_window({
                    index:100,
                    target:$("#pop-window-add-table"),
                    "pop-function":function(){
                        var pop_self = $("#pop-window-add-table");
                        pop_self.find("#update").hide();
                        pop_self.find("#add").show();
                    }
                });

                item_table.find(".update").each(function(){
                    $(this).ys_pop_window({
                        index:100,
                        target:$("#pop-window-add-table"),
                        "pop-function":function(self_target){
                            var pop_self = $("#pop-window-add-table");
                            pop_self.find("#update").show();
                            pop_self.find("#add").hide();
                            pop.attr("table_id", self_target.parent().attr("id"));
                            for(var i = 1; i <= sub_title_length; i++){
                                pop.find("#c" + i).find("input").val(self_target.parent().find("#" + i).html());
                            }
                        }
                    });
                });
                item_table.find(".delete").click(function(){
                    var table_id = $(this).parent().attr("id");
                    $.ys_ajax({
                        url:"/table/delete",
                        type:"POST",
                        datatype:"JSON",
                        data:{
                            table_id:table_id,
                        },
                        rt_func:function(data){
                            admin_menu_function["about-center-teach-harvest-detail"](type);
                        }
                    })
                })

            }
        });
    },
    "about-center-teach-harvest":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("教学成果");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();
        var item_table = init_harvest_list(teach_harvest);
        item_table.find("td").click(function(){
            admin_menu_function["about-center-teach-harvest-detail"]($(this).attr("id"));
        });
    },

    "about-center-sr-harvest-detail":function(type){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html(sr_harvest[type-20].title);
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        $("<hr>").css("margin", "10px 0").appendTo(target);
        var pop = $("#pop-window-add-table");
        pop.find(".content").attr("type_id", type);
        var sub_title_length = sr_harvest[type-20].sub_title.length;
        for(var i = 1; i < 7; i++){
            if(i < sub_title_length + 1){
                pop.find("#c" + (i)) .find(".title").html(sr_harvest[type-20].sub_title[i - 1]);
            }else{
                pop.find("#c" + i).hide();
            }
        }


        $.ys_ajax({
            url:"/table/list",
            type:"POST",
            datatype:"JSON",
            data:{
                type:type,
            },
            rt_func:function(data){
                var item_table = init_harvest_detail_list(data.tables, type);
                $("<hr>").css("margin", "10px 0").appendTo(target);
                var item_button_add = add_button_to_html({target:target, title:"添加"});
                var item_button_back = add_button_to_html({target:target, title:"返回"});
                item_button_back.click(function(){
                    admin_menu_function["about-center-sr-harvest"]();
                });
                item_button_add.ys_pop_window({
                    index:100,
                    target:$("#pop-window-add-table"),
                    "pop-function":function(){
                        var pop_self = $("#pop-window-add-table");
                        pop_self.find("#update").hide();
                        pop_self.find("#add").show();
                    }
                });

                item_table.find(".update").each(function(){
                    $(this).ys_pop_window({
                        index:100,
                        target:$("#pop-window-add-table"),
                        "pop-function":function(self_target){
                            var pop_self = $("#pop-window-add-table");
                            pop_self.find("#update").show();
                            pop_self.find("#add").hide();
                            pop.attr("table_id", self_target.parent().attr("id"));
                            for(var i = 1; i <= sub_title_length; i++){
                                pop.find("#c" + i).find("input").val(self_target.parent().find("#" + i).html());
                            }
                        }
                    });
                });
                item_table.find(".delete").click(function(){
                    var table_id = $(this).parent().attr("id");
                    $.ys_ajax({
                        url:"/table/delete",
                        type:"POST",
                        datatype:"JSON",
                        data:{
                            table_id:table_id,
                        },
                        rt_func:function(data){
                            admin_menu_function["about-center-sr-harvest-detail"](type);
                        }
                    })
                })

            }
        });
    },
    "about-center-sr-harvest":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("科研成果");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();
        var item_table = init_harvest_list(sr_harvest);
        item_table.find("td").click(function(){
            admin_menu_function["about-center-sr-harvest-detail"]($(this).attr("id"));
        });

    },

    /*start about device*/
    "device-loan":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("设备借出");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        add_input_item_to_html({
            title:"学号",
            div_id:"user",
            options:[],
            target:target,
        });

        add_select_item_to_html({
            title:"设备名称",
            div_id:"device_name",
            options:[],
            target:target,
        });

        add_select_item_to_html({
            title:"设备编号",
            div_id:"device_number",
            options:[],
            target:target,
        });
        var item_button_add = $("<div></div>").addClass("button").html("添加");
        item_button_add.click(function(){
            var usernumber = target.find("#user").find("input").val();
            var device_number = target.find("#device_number").find("select").val();
            $.ys_ajax({
                url:"device/loan",
                type:"POST",
                dataType:"JSON",
                data:{
                    user:usernumber,
                    number:device_number,
                },
                rt_func:function(data){

                    if(data.status == "SUCCESS"){
                        admin_menu_function["device-record"]({
                            back:"device-loan",
                            number:device_number,
                        });
                    }else if(data.status == "loaned"){
                        alert("设备已经借出");
                    }
                }
            });
        });
        target.append(item_button_add);
        target.append($("<hr>").css("margin", "20px 0"));

        add_input_item_to_html({
            title:"学号",
            div_id:"user_number",
            options:[],
            target:target,
        });
        add_input_item_to_html({
            title:"编号",
            div_id:"device_number_second",
            target:target,
        });

        var item_button_add_second = $("<div></div>").addClass("button").html("添加");
        target.append(item_button_add_second);

        item_button_add_second.click(function(){
            var user = target.find("#user_number").find("input").val();
            var number = target.find("#device_number_second").find("input").val();
            $.ys_ajax({
                url:"device/loan",
                datatype:"JSON",
                type:"POST",
                data:{
                    user:user,
                number:number,
                },
                rt_func:function(data){
                    if(data.status == "NoDevice"){
                        target.find("#device_number_second").find("input").addClass("error");
                        target.find("#device_number_second").find("input").val("没有此设备");
                    }
                    if(data.status == "SUCCESS"){
                        admin_menu_function["device-record"]({
                            back:"device-loan",
                            number:device_number,
                        });
                    }else if(data.status == "loaned"){
                        alert("设备已经借出");
                    }
                },
            });
        });
        $.ys_ajax({
            url:"device/list",
            datatype:"JSON",
            type:"POST",
            rt_func:function(data){
                if(data.status == "SUCCESS"){
                    for(var i = 0; i < data.devices.length; i++){
                        var item_option = $("<option></option>");
                        item_option.html(data.devices[i].name);
                        item_option.attr("value", data.devices[i].id);
                        target.find("#device_name").find("select").append(item_option);
                    }
                }
                $.ys_ajax({
                    url:"device/numberlist",
                    datatype:"JSON",
                    type:"POST",
                    data:{
                        device_id:target.find("#device_name").find("select").val(),
                    },
                rt_func:function(data){
                    if(data.status == "SUCCESS"){
                        for(var i = 0; i< data.deviceLs.length; i++){
                            var item_option = $("<option></option>");
                            item_option.html(data.deviceLs[i].number);
                            item_option.attr("value", data.deviceLs[i].number);
                            target.find("#device_number").find("select").append(item_option);
                        }
                    }
                },
                });
            },
        });
        target.find("#device_name").find("select").change(function(){
            var device_id = $(this).val();
            $.ys_ajax({
                    url:"device/numberlist",
                    datatype:"JSON",
                    type:"POST",
                    data:{
                        device_id:device_id,
                    },
                rt_func:function(data){
                    if(data.status == "SUCCESS"){
                        target.find("#device_number").find("select").empty();
                        for(var i = 0; i< data.deviceLs.length; i++){
                            var item_option = $("<option></option>");
                            item_option.html(data.deviceLs[i].number);
                            item_option.attr("value", data.deviceLs[i].id);
                            target.find("#device_number").find("select").append(item_option);
                        }
                    }
                },
                });
        })
    },
    "device-return":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("设备归还");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        add_select_item_to_html({
            title:"设备名称",
            div_id:"device_name",
            options:[],
            target:target,
        });
        add_select_item_to_html({
            title:"设备编号",
            div_id:"device_number",
            options:[],
            target:target,
        });
        var item_button_add = $("<div></div>").addClass("button").html("归还");
        target.append(item_button_add);
        item_button_add.click(function(){
            var device_number = target.find("#device_number").find("select").val();
            $.ys_ajax({
                url:"device/return",
                datatype:"JSON",
                type:"POST",
                data:{
                    number:device_number, 
                },
                rt_func:function(data){
                    if(data.status == "SUCCESS"){
                        admin_menu_function["device-record"]({
                            back:"device-return",
                            number:device_number,
                        });
                    }else if(data.status =="ReadFailed"){
                        alert("未借出");
                    }
                },
            });

        });
        target.append($("<hr>").css("margin", "20px 0"));
        add_input_item_to_html({
            title:"编号",
            div_id:"device_number_second",
            target:target,
        });

        var item_button_add_second = $("<div></div>").addClass("button").html("归还");
        target.append(item_button_add_second);

        item_button_add_second.click(function(){
            var number = target.find("#device_number_second").find("input").val();
            $.ys_ajax({
                url:"/device/return",
                datatype:"JSON",
                type:"POST",
                data:{
                    number:number
                },
                rt_func:function(data){
                    if(data.status == "SUCCESS"){
                        admin_menu_function["device-record"]({
                            back:"device-return",
                            number:device_number,
                        });
                    }else if(data.status == "NoDevice"){
                        alert("没有这个设备");
                    }else if(data.status == "ReadFailed"){
                        alert("未借出");
                    }
                },
            });
        })
        $.ys_ajax({
            url:"device/list",
            datatype:"JSON",
            type:"POST",
            rt_func:function(data){
                if(data.status == "SUCCESS"){
                    for(var i = 0; i < data.devices.length; i++){
                        var item_option = $("<option></option>");
                        item_option.html(data.devices[i].name);
                        item_option.attr("value", data.devices[i].id);
                        target.find("#device_name").find("select").append(item_option);
                    }
                }

                $.ys_ajax({
                    url:"device/numberlist",
                    datatype:"JSON",
                    type:"POST",
                    data:{
                        device_id:target.find("#device_name").find("select").val(),
                    },
                rt_func:function(data){
                    if(data.status == "SUCCESS"){
                        for(var i = 0; i< data.deviceLs.length; i++){
                            var item_option = $("<option></option>");
                            item_option.html(data.deviceLs[i].number);
                            item_option.attr("value", data.deviceLs[i].number);
                            target.find("#device_number").find("select").append(item_option);
                        }
                    }
                },
                });
            },
        });
        target.find("#device_name").find("select").change(function(){
            var device_id = $(this).val();
            $.ys_ajax({
                    url:"device/numberlist",
                    datatype:"JSON",
                    type:"POST",
                    data:{
                        device_id:device_id,
                    },
                rt_func:function(data){
                    if(data.status == "SUCCESS"){
                        target.find("#device_number").find("select").empty();
                        for(var i = 0; i< data.deviceLs.length; i++){
                            var item_option = $("<option></option>");
                            item_option.html(data.deviceLs[i].number);
                            item_option.attr("value", data.deviceLs[i].id);
                            target.find("#device_number").find("select").append(item_option);
                        }
                    }
                },
                });
        })
    },
    "device-record":function(option){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("借阅记录");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();
        $.ys_ajax({
            url:"device/record",
            type:"POST",
            datatype:"JSON",
            data:{
                number:option.number,
            },
            rt_func:function(data){

                init_device_record_list(data.loans);

                target.append($("<hr>").css("margin", "10px 0"));
                var button_back = add_button_to_html({target:target, div_id:"back", title:"返回"});
                button_back.click(function(){
                    if(option.option_back == undefined){
                        admin_menu_function[option.back]();
                    }else{
                        admin_menu_function[option.back](option.option_back);
                    }
                });
            }
        });
    },

    "device-detail":function(option){
        var title = $(".main-content .sub-page-content .right .title");

        title.find("h4").html(option.title.split(";")[2]);
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();
        target.attr("id", option.device_id);
        $.ys_ajax({url:"/device/numberlist",
            type:"POST",
            datatype:"JSON",
            data:{
                device_id:option.device_id,
            },
            rt_func:function(data){
                var item_table = init_device_number_list(data.deviceLs);
                item_table.find(".delete").click(function(){
                    $.ys_ajax({
                        url:"/device/deletedevice",
                        datatype:"JSON",
                        type:"POST",
                        data:{
                            "deviceLId":$(this).parent().attr("id")
                        },
                        rt_func:function(data){
                            admin_menu_function["device-detail"](option);
                        },

                    });
                });
                item_table.find(".update").click(function(){
                    //还未添加
                });
                item_table.find(".link-title").click(function(){
                    admin_menu_function["device-record"]({
                        back:"device-detail",
                        option_back:option,
                        number:$(this).html(),
                    });
                });
            }
        });


        var item_hr = $("<hr>").css("margin", "10px 0");
        item_hr.appendTo(target);
        var item_button_add = add_button_to_html({
        "target":target,
        "title":"添加设备"
        });

        var item_button_back = add_button_to_html({
        "target":target,
        "title":"返回"
        });
        item_button_back.click(function(){
            admin_menu_function["device-info"]();
        });

        item_button_add.ys_pop_window({
            target:$("#pop-window-add-device"),
            index:100,
        });

    },
    "device-check":function(device_id){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("设备查看");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();
        $.ys_ajax({
            url:"/device/get",
            type:"POST",
            data:{
                device_id:device_id,
            },
            datatype:"JSON",
            rt_func:function(data){
                add_title_item_to_html({"target":target, "title":data.device.name, "div_id":""});
                var item_div = $("<div></div>").addClass("");
                item_div.html(data.device.desc);
                item_div.appendTo(target);
                var item_hr = $("<hr>");
                item_hr.css("margin","10px 0px");
                item_hr.appendTo(target);
                var item_button = $("<div></div>").addClass("button");
                item_button.html("返回");
                item_button.click(function(){
                    admin_menu_function["device-info"]();
                });
                item_button.appendTo(target);
            }
        });
    },
    "device-delete":function(device_id){
        $.ys_ajax({
            url:"/device/delete",
            type:"POST",
            datatype:"JSON",
            data:{
                device_id:device_id,
            },
            rt_func:function(){
                admin_menu_function["device-info"]();
            },
       });
    },
    "device-update":function(device_id){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("设备修改");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();
        add_input_item_to_html({"target":target, "div_id":"name", "title":"名字:"});
        add_title_item_to_html({"target":target, "div_id":"", "title":"描述:"});
        add_html_editor_to_html({"target":target, "div_id":"desc"});
        target.append($("<hr>").css("margin", "10px 0"));

        var item_button = add_button_to_html({"target":target, "title":"修改"});
        var item_button_back = add_button_to_html({"target":target, "title":"返回"});
        item_button_back.click(function(){
            admin_menu_function["device-info"]();
        });
        item_button.click(function(){
            var target = $(".main-content .sub-page-content .right .content");
            var name = target.find("#name").find("input").val();
            if(name == ""){
                target.find("#name").find("input").addClass("error");
            }
            var desc = target.find("#desc").contents().find("#editor").html();
            $.ys_ajax({
                url:"/device/update",
                type:"POST",
                data:{
                    "device_id":device_id,
                    "name":name,
                    "desc":desc
                },
                datatype:"JSON",
                rt_func:function(data){
                    admin_menu_function["device-info"]();
                }
            });
        });
        
        $.ys_ajax({
            url:"/device/get",
            type:"POST",
            datatype:"JSON",
            data:{
                device_id:device_id,
            },
            rt_func:function(data){
                target.find("input").val(data.device.name);
                target.attr("id", device_id);
                var timeout = setInterval(function(){
                    if(target.find("#desc").contents().find("#editor").length != 0){
                        target.find("#desc").contents().find("#editor").html(data.device.desc);
                        clearInterval(timeout);
                    }
                }, 500);
               },
        });
    },
    "device-add":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("设备录入");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();
       
        add_input_item_to_html({"target":target, "div_id":"name", "title":"名字:"});
        add_title_item_to_html({"target":target, "div_id":"", "title":"描述:"});
        add_html_editor_to_html({"target":target, "div_id":"desc"});
        target.append($("<hr>").css("margin", "10px 0"));

        var item_button = add_button_to_html({"target":target, "title":"添加" , });
        item_button.click(function(){
            var target = $(".main-content .sub-page-content .right .content");
            var name = target.find("#name").find("input").val();
            if(name == ""){
                target.find("#name").find("input").addClass("error");
            }
            var desc = target.find("#desc").contents().find("#editor").html();
            $.ys_ajax({
                url:"/device/create",
                type:"POST",
                data:{
                    "name":name,
                    "desc":desc
                },
                datatype:"JSON",
                rt_func:function(data){
                    admin_menu_function["device-info"]();
                }
            });
        });
    },
    "device-notice":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("中心新闻");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        var type_id = 6;
        var back_page = "device-notice";
        $.ys_ajax({
            url:"notice/list",
            datatype:"JSON",
            type:"POST",
            data:{
                type:type_id,
            },
            rt_func:function(data){
                var item_table = init_notice_number_list(data.notices);
                target.append($("<hr>").css("margin", "10px 0"));
                var item_button_add = $("<dvi></div>").addClass("button").html("添加").appendTo(target);
                item_button_add.click(function(){
                    admin_menu_function["notice-add"]({
                        type:type_id,
                        back:back_page,
                    });
                });

                item_table.find(".update").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        admin_menu_function["notice-update"]({
                            type:type_id,
                            back:back_page,
                            notice_id:notice_id,
                        });
                    });
                });

                item_table.find(".delete").each(function(){
                    $(this).click(function(){
                        var notice_id = $(this).parent().attr("id");
                        $.ys_ajax({
                            url:"/notice/delete",
                            datatype:"JSON",
                            type:"POST",
                            data:{notice_id:notice_id},
                            rt_func:function(data){
                                admin_menu_function[back_page]();
                            },
                            });
                    });
                });
            }
        });

    },
    "device-info":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("设备信息");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();
        $.ys_ajax({
            url:"/device/list",
            type:"POST",
            datatype:"JSON",
            rt_func:function(data){
                var target = init_device_list(data.devices)
                target.find(".check").click(function(){
                    admin_menu_function["device-check"]($(this).parent().attr("id"));
                });
                target.find(".delete").click(function(){
                    admin_menu_function["device-delete"]($(this).parent().attr("id"));
                });
                target.find(".update").click(function(){
                    admin_menu_function["device-update"]($(this).parent().attr("id"));
                });
                target.find(".link-title").click(function(){
                    admin_menu_function["device-detail"]({
                        "device_id":$(this).parent().attr("id"),
                        "title":$(this).html(),
                    });
                });
      
            }
        });
    },

    "about-center-lesson-system":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("课程体系管理");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();
    
    },
    "about-center-teachers-troops":function(){
        var title = $(".main-content .sub-page-content .right .title");
        title.find("h4").html("师资队伍");
        var target = $(".main-content .sub-page-content .right .content");
        target.empty();

        $.ys_ajax({url:"/employee/list",
            type:"POST",
            datatype:"json",
            rt_func:function(data){
                var employ_list = data["employees"];
                var data_list = [];
                var data_id_list = [];
                for (var i = 0; i < employ_list.length; i++){
                    data_list[i] = employ_list[i]["name"];
                    data_id_list[i] = employ_list[i]["id"];
                }
                init_right_list_without_time(data_list, data_id_list);
                target.find("td").ys_pop_window({
                    index:100,
                    target:$("#pop-window-add-employee"),
                    "pop-function":function(self_target){
                        var pop = $("#pop-window-add-employee .content");
                        pop.find(".show").show();
                        pop.find(".edit").hide();
                        pop.find("input").removeClass("error");
                        var button_block = $("#pop-window-add-employee .button-block");
                        button_block.find(".button").hide();
                        button_block.find("#update").show();
                        button_block.find("#delete").show();
                        $.ys_ajax({
                            url:"/employee/get",
                            type:"POST",
                            datatype:"JSON",
                            data:{
                                employee_id:self_target.attr("id"),
                            },
                            rt_func:function(data){
                                if(data.status=="SUCCESS"){
                                    var employ = data.employee;
                                    pop.attr("id", employ.id);
                                    pop.find("#number div.show").html(employ.number);
                                    pop.find("#name div.show").html(employ.name);
                                    if(employ.sex == "0"){ 
                                        pop.find("#sex div.show").html("男");
                                    }else{
                                        pop.find("#sex div.show").html("女");
                                    }
                                    pop.find("#birth div.show").html(employ.birth);
                                    pop.find("#degree div.show").html(employ.degree);
                                    pop.find("#majorpost div.show").html(employ.majorpost);
                                    pop.find("#post div.show").html(employ.post);
                                    pop.find("#course div.show").html(employ.course);
                                    if(employ.isfulltime == "0"){
                                        pop.find("#isfulltime div.show").html("兼职");
                                    }else{
                                        pop.find("#isfulltime div.show").html("专职");
                                    }

                                }
                            }
                        });
                    }
                });

                var item_hr = $("<hr>");
                item_hr.css("margin", "10px 0px");
                target.append(item_hr);
                target.append("")
                target.append(item_button);
                var item_button =  $("<div></div>").addClass("button").html("添加职工");
                item_button.ys_pop_window({
                    index:100,
                    target:$("#pop-window-add-employee"),
                    "pop-function":function(){
                        var num = $(".main-content .sub-page-content .right .content .link_list").find("tr").length;

                        $("#pop-window-add-employee .content").find("#number input").val(num + 1);
                        var pop = $("#pop-window-add-employee .content");
                        pop.find(".show").hide();
                        pop.find(".edit").show();
                        pop.find("input").removeClass("error");
                        var button_block = $("#pop-window-add-employee .button-block");
                        button_block.find(".button").hide();
                        button_block.find("#add").show();
                    }
                });
                target.append(item_button);
            }
        });
       },
};

var cmd_function_map = {
    "add-deviceL-to-server":function(){
        var target = $("#pop-window-add-device .add-content .content");
        var number = target.find("#number").find("input").val();
        var state = target.find("#status").find("select").val();
        var device_id = $(".main-content .sub-page-content .right .content").attr("id");
        $.ys_ajax({
            url:"/device/enter",
            type:"POST",
            datatype:"JSON",
            data:{
                device_id:device_id,
                number:number,
                status:state, 
            },
            rt_func:function(data){
                if(data.status == "SUCCESS"){
                    $(".shadow_cover").click();
                    admin_menu_function["device-detail"]({
                        device_id:device_id,
                        title:$(".sub-page-content .right .title h4").html()
                    });
                }
            }

        })
           },
    "add-employee-to-server":function(){
        var flag = 0;
        var target = $("#pop-window-add-employee .add-content .content");
        target.find("input").each(function(){
            if($(this).val() == ""){
                $(this).addClass("error");
                flag = 1;
            }
        });
        if(flag == 1){
            return ;
        }
        var value = {
            number : target.find("#number input").val(),
            name : target.find("#name input").val(),
            sex : target.find("#sex select").val(),
            birth : target.find("#birth input").val(),
            degree : target.find("#degree select").val(),
            majorpost : target.find("#majorpost select").val(),
            post : target.find("#post select").val(),
            course : target.find("#course input").val(),
            isfulltime : target.find("#isfulltime select").val(),
        };
        $.ys_ajax({
            url:"/employee/create",
            type:"POST",
            datatype:"JSON",
            data:value,
            rt_func:function(data){
                if(data.status ="SUCCESS" ){
                    $(".shadow_cover").click();
                    admin_menu_function["about-center-teachers-troops"]();
                }
            }
        });
    },
    "update-employee-to-server":function(){
        var button_block = $("#pop-window-add-employee .button-block");
        button_block.find(".button").hide();
        button_block.find("#save").show();
        button_block.find("#cancel").show();
        var pop = $("#pop-window-add-employee .content");
        pop.find(".show").hide();
        pop.find(".edit").show();
        pop.find(".edit").find("input").each(function(){
            $(this).val($(this).parent().parent().find(".show").html());
        })
    },
    "save-employee-to-server":function(){
        var flag = 0;
        var target = $("#pop-window-add-employee .add-content .content");
        target.find("input").each(function(){
            if($(this).val() == ""){
                $(this).addClass("error");
                flag = 1;
            }
        });
        if(flag == 1){
            return ;
        }
        var value = {
            employee_id :target.attr("id"),
            number : target.find("#number input").val(),
            name : target.find("#name input").val(),
            sex : target.find("#sex select").val(),
            birth : target.find("#birth input").val(),
            degree : target.find("#degree select").val(),
            majorpost : target.find("#majorpost select").val(),
            post : target.find("#post select").val(),
            course : target.find("#course input").val(),
            isfulltime : target.find("#isfulltime select").val(),
        };
        $.ys_ajax({
            url:"/employee/update",
            type:"POST",
            datatype:"JSON",
            data:value,
            rt_func:function(data){
                if(data.status ="SUCCESS" ){
                    $(".shadow_cover").click();
                    admin_menu_function["about-center-teachers-troops"]();
                }
            }
        });
    },
    "add-file-to-server":function(){
        var pop = $("#pop-window-add-file");
        var name = pop.find("#name").find("input").val();
        var filename = pop.find("#name").attr("realname");
        var type = fileType["invol-tect-material"];
        $.ys_ajax({
            url:"file/save",
            type:"POST",
            datatype:"JSON",
            data:{
                name:name,
                filename:filename,
                type: type,
            },
            rt_func:function(data){
                if(data.status == "SUCCESS")
                $(".shadow_cover").click();
                admin_menu_function["invol-tect-material"]();
            },

        });

    },
    "cancel-employee-to-server":function(){
        var button_block = $("#pop-window-add-employee .button-block");
        button_block.find(".button").hide();
        button_block.find("#update").show();
        button_block.find("#delete").show();
        var pop = $("#pop-window-add-employee .content");
        pop.find(".show").show();
        pop.find(".edit").hide();
    },
    "delete-employee-to-server":function(){
        var pop = $("#pop-window-add-employee .content");
        $.ys_ajax({
            url:"/employee/delete",
            type:"POST",
            datatype:"JSON",
            data:{"employee_id": pop.attr("id")},
            rt_func:function(data){
                if(data.status == "SUCCESS"){
                    $(".shadow_cover").click();
                    admin_menu_function["about-center-teachers-troops"]();
                }
            },
        });
    },
    "update-table-to-server":function(){
        var pop = $("#pop-window-add-table .content");
         $.ys_ajax({
            url:"/table/update",
            datatype:"JSON",
            type:"POST",
            data:{
                table_id:$("#pop-window-add-table").attr("table_id"),
                type:pop.attr("type_id"),
                c1:pop.find("#c1").find("input").val(),
                c2:pop.find("#c2").find("input").val(),
                c3:pop.find("#c3").find("input").val(),
                c4:pop.find("#c4").find("input").val(),
                c5:pop.find("#c5").find("input").val(),
                c6:pop.find("#c6").find("input").val(),
            },
            rt_func:function(){
                $(".shadow_cover").click();
                admin_menu_function["about-center-teach-harvest-detail"](pop.attr("type_id"));
            },
        });
    },
    "add-table-to-server":function(){
        var pop = $("#pop-window-add-table .content");
        $.ys_ajax({
            url:"/table/create",
            datatype:"JSON",
            type:"POST",
            data:{
                type:pop.attr("type_id"),
                c1:pop.find("#c1").find("input").val(),
                c2:pop.find("#c2").find("input").val(),
                c3:pop.find("#c3").find("input").val(),
                c4:pop.find("#c4").find("input").val(),
                c5:pop.find("#c5").find("input").val(),
                c6:pop.find("#c6").find("input").val(),
            },
            rt_func:function(){
                if(pop.attr("type_id") < 20) {
                    admin_menu_function["about-center-teach-harvest-detail"](pop.attr("type_id"));}else{
                    admin_menu_function["about-center-sr-harvest-detail"](pop.attr("type_id"));
                    }
                $(".shadow_cover").click();
            },
        });
    }
};

function init_left_menu(){
    var target = $(".sub-page-content .content .left ul");
    for( var i = 0; i < map_admin_menu.length; i++) {
        var item_b = $("<b></b>");

        var item_li = $("<li></li>");
        item_li.attr("target", map_admin_menu_link[i]);
        item_b.html(map_admin_menu[i]);
        item_li.append(item_b);

        var item_ul = $("<ul></ul>");
        item_ul.hide();
        item_ul.addClass("sub-tree");
        for( var j = 0; j < map_admin_menu_link_sub[map_admin_menu_link[i]].length; j++){
            var sub_li = $("<li></li>");
            sub_li.attr("target", map_admin_menu_link_sub_target[map_admin_menu_link[i]][j]);
            sub_li.html(map_admin_menu_link_sub[map_admin_menu_link[i]][j]);
            sub_li.click(function(){
                target_link = $(this).parent().parent().attr("target") + "-"+$(this).attr("target");
                admin_menu_function[target_link]();
            });
            sub_li.appendTo(item_ul);
        }
        item_ul.appendTo(item_li);
        item_li.appendTo(target);
    }
}

function init_left_menu_click(){
    var target = $(".sub-page-content .content .left ul");
    target.children("li").click(function(){
        $(this).parent().find(".sub-tree").hide();
        $(this).children(".sub-tree").show();
        //$(".sub-page-content .content .right .title h4").html(title);
        //$(".sub-page-content .content .right .content").empty();
    });
}

function add_pop_button_login(){
    var item_button = $("<button></button>").attr("id", "pop-button-login").hide();
    item_button.ys_pop_window({
        index:"102",
        target:$("#pop-window-login")});

    $("body").append(item_button);

}


