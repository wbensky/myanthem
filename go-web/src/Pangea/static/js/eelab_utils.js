function init_right_list(data){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var item_ul = $("<table> </table>");

    for (var i = 0 ; i < data.length; i++)
    {
        var item_li = $("<tr></tr>");
        var item_title_div = $("<td></td>").addClass("link-title");
        item_title_div.html("<a class=icon>&#9204</a> &nbsp &nbsp" + data[i]["time"] + "&nbsp  &nbsp &nbsp &nbsp &nbsp"+ data[i]["title"]);
        item_title_div.appendTo(item_li);
        item_li.appendTo(item_ul);
    }
    item_ul.addClass("link_list");
    target.append(item_ul);
}

function init_right_list_without_time(data, data_id){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var item_ul = $("<table> </table>");

    for (var i = 0 ; i < data.length; i++)
    {
        var item_li = $("<tr></tr>");
        var item_title_div = $("<td></td>").addClass("link-title");
        if(data_id != undefined){
            item_title_div.attr("id", data_id[i]) ;
        }
        item_title_div.html("<a class=icon>&#9204</a> &nbsp &nbsp" + data[i]);
        item_title_div.appendTo(item_li);
        item_li.appendTo(item_ul);
    }
    item_ul.addClass("link_list");
    target.append(item_ul);
    return item_ul;
}

function init_device_list_show(data){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var item_table = $("<table> </table>");

    for (var i = 0 ; i < data.length; i++)
    {
        var item_tr = $("<tr></tr>");
        var item_title_td = $("<td></td>").addClass("link-title");
        if(data[i].id != undefined){
            item_tr.attr("id", data[i].id);
        }else{
            item_tr.attr("id", data[i].Id);
        }
        if(data[i].name != undefined){
            item_title_td.html(data[i].name);
        }else{
            item_title_td.html(data[i].Name);
        }
        item_title_td.css("width", "678px");
        item_title_td.appendTo(item_tr);


        item_tr.find("td").hover(function(){
            $(this).css("color", "#a61d31");
            $(this).css("text-decoration", "underline");
        }, function(){
            $(this).css("color","#000");
            $(this).css("text-decoration", "");
        });
        item_tr.appendTo(item_table);
    }
    item_table.addClass("");
    target.append(item_table);
    return item_table;
}





function init_device_list(data){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var item_table = $("<table> </table>");

    for (var i = 0 ; i < data.length; i++)
    {
        var item_tr = $("<tr></tr>");
        var item_title_td = $("<td></td>").addClass("link-title");
        item_tr.attr("id", data[i].id);
        item_title_td.html(data[i].name);

        var item_td_check = $("<td></td>").addClass("check").html("查看");
        var item_td_delete = $("<td></td>").addClass("delete").html("删除");
        var item_td_update = $("<td></td>").addClass("update").html("修改");

        item_title_td.css("width", "554px");
        item_title_td.appendTo(item_tr);

        item_td_delete.appendTo(item_tr);
        item_td_update.appendTo(item_tr);
        item_td_check.appendTo(item_tr);

        item_tr.find("td").hover(function(){
            $(this).css("color", "#a61d31");
            $(this).css("text-decoration", "underline");
        }, function(){
            $(this).css("color","#000");
            $(this).css("text-decoration", "");
        });
        item_tr.appendTo(item_table);
    }
    item_table.addClass("");
    target.append(item_table);
    return item_table;
}



function init_file_list_show(data){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var item_table = $("<table> </table>");

    for (var i = 0 ; i < data.length; i++)
    {
        var item_tr = $("<tr></tr>");
        var item_title_td = $("<td></td>").addClass("link-title");
        item_tr.attr("id", data[i].id);
        item_title_td.html("<a id='download'>" + data[i].name + "</a>");
        item_title_td.find("#download").attr("href","/static/file/" + data[i].filename);


        item_title_td.css("width", "554px");
        item_title_td.appendTo(item_tr);
        item_title_td.find("a").css("text-decoration", "none");
        item_title_td.find("a").css("color", "#000");

        item_tr.find("td a").hover(function(){
            $(this).css("color", "#a61d31");
            $(this).css("text-decoration", "underline");
        }, function(){
            $(this).css("color","#000");
            $(this).css("text-decoration", "none");
        });
        item_tr.appendTo(item_table);
    }
    item_table.addClass("");
    target.append(item_table);
    return item_table;
}

function init_file_list(data){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var item_table = $("<table> </table>");

    for (var i = 0 ; i < data.length; i++)
    {
        var item_tr = $("<tr></tr>");
        var item_title_td = $("<td></td>").addClass("link-title");
        item_tr.attr("id", data[i].id);
        item_title_td.html("<a id='download'>" + data[i].name + "</a>");
        item_title_td.find("#download").attr("href","/static/file/" + data[i].filename);

        var item_td_delete = $("<td></td>").addClass("delete").html("删除");

        item_title_td.css("width", "554px");
        item_title_td.appendTo(item_tr);

        item_td_delete.appendTo(item_tr);

        item_tr.find("td").hover(function(){
            $(this).css("color", "#a61d31");
            $(this).css("text-decoration", "underline");
        }, function(){
            $(this).css("color","#000");
            $(this).css("text-decoration", "");
        });
        item_tr.appendTo(item_table);
    }
    item_table.addClass("");
    target.append(item_table);
    return item_table;
}
function init_notice_list(data, count, page){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var item_table = $("<table> </table>");
    if(data == null){
        data = [];
    }
    for(var i = 0; i< data.length; i++){
        var item_tr  = $("<tr></tr>");
        item_tr.attr("id",data[i].Id);
        item_tr.append($("<td></td>").addClass("title_block").html("<a class=icon>&#9204</a> &nbsp &nbsp <a class='title_link' target='_blank'href=" + "/notice/" + data[i].Id +">" + data[i].Title + "</a>"));
        item_tr.appendTo(item_table);
    }
    item_table.find("a.title_link").css("color", "#000");
    item_table.find("a.title_link").css("text-decoration", "none");

    item_table.find("td").css("text-align", "left");
    item_table.find("td").css("padding-top", "10px");
    item_table.find("td a.title_link").hover(function(){
        $(this).css("color", notice_color[1]);
    }, function(){
        $(this).css("color", "#000");
    });
    item_table.appendTo(target);

    if(page * 20 < count || page > 1){
        target.append($("<hr>").css("margin", "10px 0"));
    }

    if(page > 1){
        var item_pre = $("<div></div>").addClass("button");
        item_pre.html("上一页");
        item_pre.addClass("next-page").attr("target", page - 1);
        target.append(item_pre);
    }

    if( 20 < count){
        var i = 1;
        var end = parseInt((count / 20) + 1) ;
        if(end > 10){
            if(page > 5 && end - page > 5){
                i = page - 5;
                end = page + 5;
            }else if(page <= 5){
                i = 1;
                end = 11;
            }else if(end - page <= 5){
                i = end - 10;
            }
        }

        for(; i <= end; i++){
            var item_page = $("<div></div>").addClass("button");
            item_page.html(i);
            if(i == page){
                item_page.addClass("clicked");
            }else{
                item_page.addClass("next-page").attr("target", i);
            }
            target.append(item_page);
        }
    }

    if(page * 20 < count){
        var item_next = $("<div></div>").addClass("button");
        item_next.html("下一页");
        target.append(item_next);
        item_next.addClass("next-page").attr("target", page + 1);
    }
    target.find(".next-page").click(function(){
        $.ys_ajax({
            url:"/notice/next",
            datatype:"JSON",
            type:"POST",
            data:{
                page:$(this).attr("target"),
                type:data[0].Type,
            },
            rt_func:function(data){
                init_notice_list(data.notices, data.count, data.page);
            },
        });
    });

    return item_table;
}

function init_notice_number_list(data, count, page, flag){
    var target = $(".sub-page-content .content .right .content");
    var item_table = $("<table> </table>");
    if(flag != undefined){
        target.find("table").empty();
        item_table = target.find("table");
    }else{
        target.empty();
    }
    var item_tr_th = $("<tr></tr>");
    if(data == null){
        data = [];
    }
    item_tr_th.append($("<th></th>").html("标题").css("width", "350px"));
    item_tr_th.append($("<th></th>").html("是否首页显示").css("width", "100px"));
    item_tr_th.append($("<th></th>").html("删除").css("width", "100px"));
    item_tr_th.append($("<th></th>").html("修改").css("width", "100px"));
    item_tr_th.appendTo(item_table);
    for(var i = 0; i< data.length; i++){
        var item_tr  = $("<tr></tr>");
        item_tr.attr("id",data[i].Id);
        item_tr.append($("<td></td>").addClass("title_block").html(data[i].Title));
        if(data[i].Status == 1){
            item_tr.append($("<td></td>").addClass("status").html("是"));
        } else{
            item_tr.append($("<td></td>").addClass("status").html("否"));
        }
        item_tr.append($("<td></td>").addClass("delete").html("删除"));
        item_tr.append($("<td></td>").addClass("update").html("修改"));
        item_tr.appendTo(item_table);
    }
    item_table.find("td").css("text-align", "center");
    item_table.find("td").css("padding-top", "10px");
    item_table.find("td").find(".title_link").hover(function(){
        $(this).css("color", "#a61d31");
        $(this).css("text-decoration", "underline");
    }, function(){
        $(this).css("color", "#000");
        $(this).css("text-decoration", "none");
    });

    var item_div_page;
    if(flag == undefined){
        item_table.appendTo(target);
        item_div_page = $("<div><div>").addClass("page-block");
        item_div_page.appendTo(target);
    }else{
        item_div_page = target.find(".page-block");
        item_div_page.empty();
    }

    if(page * 20 < count || page > 1){
        item_div_page.append($("<hr>").css("margin", "10px 0"));
    }

    if(page > 1){
        var item_pre = $("<div></div>").addClass("button");
        item_pre.html("上一页");
        item_pre.addClass("next-page").attr("target", page - 1);
        item_div_page.append(item_pre);
    }

    if( 20 < count){
        var i = 1;
        var end = parseInt((count / 20) + 1) ;
        if(end > 10){
            if(page > 5 && end - page > 5){
                i = page - 5;
                end = page + 5;
            }else if(page <= 5){
                i = 1;
                end = 11;
            }else if(end - page <= 5){
                i = end - 10;
            }
        }

        for(; i <= end; i++){
            var item_page = $("<div></div>").addClass("button");
            item_page.html(i);
            if(i == page){
                item_page.addClass("clicked");
            }else{
                item_page.addClass("next-page").attr("target", i);
            }
            item_div_page.append(item_page);
        }
    }

    if(page * 20 < count){
        var item_next = $("<div></div>").addClass("button");
        item_next.html("下一页");
        item_div_page.append(item_next);
        item_next.addClass("next-page").attr("target", page + 1);
    }
    target.find(".next-page").click(function(){
        $.ys_ajax({
            url:"/notice/next",
            datatype:"JSON",
            type:"POST",
            data:{
                page:$(this).attr("target"),
                type:data[0].Type,
            },
            rt_func:function(data){
                init_notice_number_list(data.notices, data.count, data.page, 1);
            },
        });
    });




    return item_table;
}

function init_device_number_list(data){
  var target = $(".sub-page-content .content .right .content");
    target.empty();
    var item_table = $("<table> </table>");
    var item_tr_th = $("<tr></tr>");
    item_tr_th.append($("<th></th>").html("编号").css("width", "150px"));
    item_tr_th.append($("<th></th>").html("状态").css("width", "150px"));
    item_tr_th.append($("<th></th>").html("是否在库").css("width", "150px"));
    item_tr_th.append($("<th></th>").html("删除").css("width", "150px"));
    item_tr_th.append($("<th></th>").html("修改").css("width", "150px"));
    item_tr_th.appendTo(item_table);
    for (var i = 0 ; i < data.length; i++)
    {
        var item_tr = $("<tr></tr>");
        var item_title_td = $("<td></td>").addClass("link-title");
        item_tr.attr("id", data[i].id);
        item_title_td.html(data[i].number);

        var item_td_status = $("<td></td>").addClass("status").html(data[i].status);
        var item_td_isin = $("<td></td>").addClass("isin").html(data[i].isin);
        var item_td_delete = $("<td></td>").addClass("delete").html("删除");
        var item_td_update = $("<td></td>").addClass("update").html("修改");


        item_title_td.appendTo(item_tr);
        item_td_status.appendTo(item_tr);
        item_td_isin.appendTo(item_tr);
        item_td_delete.appendTo(item_tr);
        item_td_update.appendTo(item_tr);

        item_tr.find("td").css("width", "150px");
        item_tr.find("td").css("text-align", "center");
        item_tr.find("td").hover(function(){
            $(this).css("color", "#a61d31");
            $(this).css("text-decoration", "underline");
        }, function(){
            $(this).css("color","#000");
            $(this).css("text-decoration", "");
        });
        item_tr.appendTo(item_table);
    }
    item_table.addClass("");
    target.append(item_table);
    return item_table;
}

function add_input_item_to_html(option){
    var item_div = $("<div></div>").addClass("input-block");
    var item_div_title = $("<div></div>").addClass("title");
    var item_div_edit = $("<div></div>").addClass("edit");
    item_div_edit.append("<input/>");
    item_div_title.html(option.title);
    item_div_title.appendTo(item_div);
    item_div_edit.appendTo(item_div);
    item_div.attr("id", option.div_id);
    item_div.appendTo(option.target);
    return item_div;
}
function add_textarea_item_to_html(option){
    var item_div = $("<div></div>").addClass("input-block");
    var item_div_title = $("<div></div>").addClass("title");
    var item_div_edit = $("<div></div>").addClass("edit");
    item_div_edit.append($("<textarea/>").addClass("content"));
    item_div_title.html(option.title);
    item_div_title.appendTo(item_div);
    item_div_edit.appendTo(item_div);
    item_div.attr("id", option.div_id);
    item_div.appendTo(option.target);
    return item_div;
}



function add_select_item_to_html(option){
    var item_div = $("<div></div>").addClass("input-block");
    var item_div_title = $("<div></div>").addClass("title");
    var item_div_edit = $("<div></div>").addClass("edit");
    var item_select = $("<select><select/>");
    for(var i = 0; i< option.options.length; i++){
        var item_option = $("<option></option>");
        item_option.html(option.options[i].content);
        if(option.options[i].value != undefined){
            item_option.val(option.options[i].value)
        }
        item_option.appendTo(item_select);
    }
    item_div_edit.append(item_select);
    item_div_title.html(option.title);
    item_div_title.appendTo(item_div);
    item_div_edit.appendTo(item_div);
    item_div.attr("id", option.div_id);
    item_div.appendTo(option.target);
    return item_div;
}


function add_title_item_to_html(option){
    var item_div = $("<div></div>").addClass("input-block");
    var item_div_title = $("<div></div>").addClass("title");
    var item_div_edit = $("<div></div>").addClass("edit");
    item_div_title.html(option.title);
    item_div_title.appendTo(item_div);
    item_div_edit.appendTo(item_div);
    item_div.attr("id", option.div_id);
    item_div.appendTo(option.target);
    return item_div;
}

function add_html_editor_to_html(option){
    var item_iframe = $("<iframe></iframe>");
    item_iframe.addClass("editor");
    item_iframe.attr("id",option.div_id);
    item_iframe.attr("src", "bootstrap-editor.html");
    item_iframe.appendTo(option.target);
    return item_iframe;
}

function add_button_to_html(option){
    var item_button = $("<div></div>");
    item_button.addClass("button");
    item_button.html(option.title);
    if(option.div_id != undefined);{
        item_button.attr("id", option.div_id);
    }
    if(option.link != undefined){
        item_button.addClass("cmd");
        item_button.attr("target", option.link);
    }
    item_button.appendTo(option.target);
    return item_button;
}


//科研成果和教学成果
function init_harvest_list(data){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var item_table = $("<table> </table>");

    for (var i = 0 ; i < data.length; i++)
    {
        var item_tr = $("<tr></tr>");
        var item_title_div = $("<td></td>").addClass("link-title");
        item_title_div.attr("id", data[i].type) ;
        item_title_div.html("<a class=icon>&#9204</a> &nbsp &nbsp" + data[i].title);
        item_title_div.appendTo(item_tr);
        item_tr.appendTo(item_table);
    }
    item_table.addClass("link_list");
    target.append(item_table);
    return item_table;
}

function init_teacher_list(data){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var item_table = $("<table></table>");
    var item_tr_th = $("<tr></tr>");
    item_tr_th.append($("<th></th>").html("序号").css("width", "50px"));
    item_tr_th.append($("<th></th>").html("姓名").css("width", "100px"));
    item_tr_th.append($("<th></th>").html("性别").css("width", "50px"));
    item_tr_th.append($("<th></th>").html("出生年月").css("width", "90px"));
    item_tr_th.append($("<th></th>").html("学位").css("width", "100px"));
    item_tr_th.append($("<th></th>").html("职务").css("width", "70px"));
    item_tr_th.append($("<th></th>").html("职称").css("width", "70px"));
    item_tr_th.append($("<th></th>").html("学科").css("width", "240px"));
    item_tr_th.append($("<th></th>").html("是否专职").css("width", "100px"));
    item_tr_th.children("th").css("padding-bottom", "10px");
    item_tr_th.appendTo(item_table);

    for(var i = 0; i< data.length; i++){
        var item_tr = $("<tr></tr>").attr("id", data[i].id);
        item_tr.append($("<td></td>").html(data[i].number));
        item_tr.append($("<td></td>").html(data[i].name));
        if(data[i].sex == 1)
        {
            item_tr.append($("<td></td>").html("男"));
        }else{
            item_tr.append($("<td></td>").html("女"));
        }
        item_tr.append($("<td></td>").html(data[i].birth));
        item_tr.append($("<td></td>").html(data[i].degree));
        item_tr.append($("<td></td>").html(data[i].post));
        item_tr.append($("<td></td>").html(data[i].majorpost));
        item_tr.append($("<td></td>").html(data[i].course));
        if(data[i].isfulltime == 1){
            item_tr.append($("<td></td>").html("专职"));
        }else{
            item_tr.append($("<td></td>").html("兼职"));
        }
        item_tr.appendTo(item_table);
    }
    
    item_table.find("td").css("text-align", "center");
    item_table.find("td").css("padding", "5px 0");
    item_table.css("border-spacing", "0");
    item_table.find("tr").hover(function(){
        $(this).css("background", "#428bd1");
        $(this).css("color", "#fff");
    }, function(){
        $(this).css("background", "#fff");
        $(this).css("color", "#000");
    });

    item_table.appendTo(target);
    return item_table;
}

function init_device_record_list(data){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var item_table = $("<table></table>");
    var item_tr_th = $("<tr></tr>");
    item_tr_th.append($("<th></th>").html("编号").css("width", "70px"));
    item_tr_th.append($("<th></th>").html("学号").css("width", "100px"));
    item_tr_th.append($("<th></th>").html("借出时间").css("width", "250px"));
    item_tr_th.append($("<th></th>").html("归还时间").css("width", "250px"));
    item_tr_th.appendTo(item_table);

    for(var i = 0; i< data.length; i++){
        var item_tr = $("<tr></tr>").attr("id", data[i].id);
        item_tr.append($("<td></td>").html(data[i].number));
        item_tr.append($("<td></td>").html(data[i].user));
        item_tr.append($("<td></td>").html(unix_to_datetime(data[i].loantime)));
        if(data[i].returntime == 0){
            item_tr.append($("<td></td>").html("未归还"));
        }else{
            item_tr.append($("<td></td>").html(unix_to_datetime(data[i].returntime)));
        }
            item_tr.appendTo(item_table); 
    }

    item_table.find("td").css("text-align", "center");
    item_table.find("td").css("padding-top", "10px");
    item_table.find("td").hover(function(){
        $(this).css("color", "#a61d31");
    }, function(){
        $(this).css("color", "#000");
    });

    item_table.appendTo(target);
    return item_table;
}

function init_harvest_detail_list_no_func(data, type){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var sub_title_number;
    if(type < 20){
        sub_title_number = teach_harvest[type - 1].sub_title.length;
    }else{
        sub_title_number = sr_harvest[type - 20].sub_title.length;
    }
    var item_table = $("<table> </table>");

    var item_tr_th = $("<tr></tr>");
    for(var i = 0; i< sub_title_number; i++){
        var item_th = $("<th></th>");
        item_th.css("width",670 / (sub_title_number));
        if(type < 20){
            item_th.html(teach_harvest[type-1].sub_title[i]);
        }else{
            item_th.html(sr_harvest[type-20].sub_title[i]);
        }

        item_th.appendTo(item_tr_th);
        }

    item_tr_th.appendTo(item_table);
    for (var i = 0 ; i < data.length; i++)
    {
        var item_tr = $("<tr></tr>");
        item_tr.attr("id", data[i].id );
        for(var j = 0; j < sub_title_number; j++){
            var item_td = $("<td></td>");
            item_td.html(data[i]["c" + (j + 1)]);
            item_td.attr("id", (j+1));
            item_td.appendTo(item_tr);
        }

        item_tr.appendTo(item_table);
    }
    item_table.find("td").css("width",670/(sub_title_number ));
    item_table.find("td").css("text-align", "center");
    item_table.find("td").css("padding-top", "10px");
    item_table.find("td").hover(function(){
        $(this).css("color", "#a61d31");
    }, function(){
        $(this).css("color", "#000");
    });

    target.append(item_table);
    return item_table;
}



function init_harvest_detail_list(data, type){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var sub_title_number;
    if(type < 20){
        sub_title_number = teach_harvest[type - 1].sub_title.length;
    }else{
        sub_title_number = sr_harvest[type - 20].sub_title.length;
    }
    var item_table = $("<table> </table>");

    var item_tr_th = $("<tr></tr>");
    for(var i = 0; i< sub_title_number; i++){
        var item_th = $("<th></th>");
        item_th.css("width",670 / (sub_title_number + 2));
        if(type < 20){
            item_th.html(teach_harvest[type-1].sub_title[i]);
        }else{
            item_th.html(sr_harvest[type-20].sub_title[i]);
        }

        item_th.appendTo(item_tr_th);
        }

    item_tr_th.append($("<th></th>").css("width", 670 / (sub_title_number + 2)).html("删除"));

    item_tr_th.append($("<th></th>").css("width", 670 / (sub_title_number + 2)).html("修改"));

    item_tr_th.appendTo(item_table);
    for (var i = 0 ; i < data.length; i++)
    {
        var item_tr = $("<tr></tr>");
        item_tr.attr("id", data[i].id );
        for(var j = 0; j < sub_title_number; j++){
            var item_td = $("<td></td>");
            item_td.html(data[i]["c" + (j + 1)]);
            item_td.attr("id", (j+1));
            item_td.appendTo(item_tr);
        }

        item_tr.append($("<td></td>").css("width", 670 / (sub_title_number + 2)).html("删除").addClass("delete"));

        item_tr.append($("<td></td>").css("width", 670 / (sub_title_number + 2)).html("修改").addClass("update"));
        item_tr.appendTo(item_table);
    }
    item_table.find("td").css("width",670/(sub_title_number + 2));
    item_table.find("td").css("text-align", "center");
    item_table.find("td").css("padding-top", "10px");
    item_table.find("td").hover(function(){
        $(this).css("color", "#a61d31");
    }, function(){
        $(this).css("color", "#000");
    });

    target.append(item_table);
    return item_table;
}



























function unix_to_datetime(unix) {
    var time = new Date(parseInt(unix) * 1000);
    
    return time.toLocaleString()
}


