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
    item_div_edit.append($("<textarea/>").addClass("con"));
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
    if(option.options != undefined){
        for(var i = 0; i< option.options.length; i++){
            var item_option = $("<option></option>");
            item_option.html(option.options[i].content);
            if(option.options[i].value != undefined){
                item_option.val(option.options[i].value)
            }
            item_option.appendTo(item_select);
        }
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


function add_content_nav(option){
    option.target.empty();
    var item_a = $("<a></a>");
    item_a.html(option.title);
    item_a.appendTo(option.target);

    for (var i = 0; i < option.spans.length; i++){
        var item_span = $("<span></span>");
        item_span.html(option.spans[i].title);
        if(option.spans[i].div_id != undefined){
            item_span.attr("id", option.spans[i].div_id);
        }
        if(option.spans[i].div_class != undefined){
            item_span.addClass(option.spans[i].div_class);
        }
        item_span.appendTo(option.target);
    }
    option.target.find("span").each(function(index){
        $(this).click(function(){
            option.spans[index].click_func();
        });
    });
}

function unix_to_datetime(unix) {
    var time = new Date(parseInt(unix) * 1000);
    return time.toLocaleString()
}

function init_product_list(data_s){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var data = data_s.list;
    page = data_s.pageNumber;
    count = data_s.totalRow;

    var item_table = $("<table> </table>");
    if(data == null){
        data = [];
    }
    var item_tr_th = $("<tr></tr>");
    item_tr_th.append($("<th></th>").html("编号ID"));
    item_tr_th.append($("<th></th>").html("商品名称"));
    item_tr_th.append($("<th></th>").html("SKU"));
    item_tr_th.appendTo(item_table);
    for(var i = 0; i< data.length; i++){
        var item_tr  = $("<tr></tr>");
        item_tr.attr("id",data[i].id);
        item_tr.append($("<td></td>").css("width", "289px").addClass("title_block").html("<a class='title_link' >" + data[i].id + "</a>"));
        item_tr.append($("<td></td>").css("width", "289px").addClass("title_block").html("<a class='title_link' >" + data[i].name + "</a>"));
        item_tr.append($("<td></td>").css("width", "289px").addClass("title_block").html("<a class='title_link' >" + data[i].sku + "</a>"));
        item_tr.append($("<td></td>").addClass("show").html("<a class='icon title_link'> &#59146</a>"));
        item_tr.append($("<td></td>").addClass("delete").html("<a class='icon title_link'> &#10060</a>"));
        item_tr.append($("<td></td>").addClass("update").html("<a class='icon title_link'> &#10002</a>"));
        item_tr.append($("<td></td>").addClass("barcode").html("<a class='icon title_link' href = '/static/img/" + data[i].id + ".png' target='_blank'> &#127915</a>"));

        item_tr.appendTo(item_table);
    }
    item_table.find("a.title_link").css("color", "#515151");
    item_table.find("a.title_link").css("text-decoration", "none");

    item_table.find("td").css("text-align", "center");
    item_table.find("td").css("padding-top", "10px");


    item_table.find("td a.title_link").hover(function(){
        $(this).css("color", "#428bd1");
    }, function(){
        $(this).css("color", "#515151");
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
            url:"/product/page",
            datatype:"JSON",
            type:"POST",
            data:{
                page:$(this).attr("target"),
                type:notice_type,
                status:status_n,
                recevie:recevie,
            },
            rt_func:function(data){
                init_product_list(data.notices);
            },
        });
    });

    item_table.find(".delete").each(function(){
        $(this).click(function(){
            $.ys_ajax({
                url:"/product/delete",
                datatype:"JSON",
                type:"POST",
                data:{
                    id:$(this).parent().attr("id"),
                },
                rt_func:function(data){
                    menu_function["goods-goods"]();
                },
            });
        });
    });
    item_table.find(".show").each(function(){
        $(this).ys_pop_window({
            target:$("#pop-window-show-product"),
            index:100,
            "pop-function":function(self_target){
                product_id = self_target.parent().attr("id");
                $.ys_ajax({
                    url:"/product/get" ,
                    datatype:"JSON",
                    type:"POST",
                    data:{
                        id :product_id
                    } ,
                    rt_func:function(data){
                        var product = data.product;
                        var b = $("#pop-window-show-product");
                        b.find("#name").find(".show").html(product.name);
                        b.find("#sku").find(".show").html(product.SKU);
                        b.find("#length").find(".show").html(product.length);
                        b.find("#width").find(".show").html(product.width);
                        b.find("#height").find(".show").html(product.height);
                        b.find("#weight").find(".show").html(product.weight);
                        b.find("#price").find(".show").html(product.price);
                        b.find("#desc").find(".show").html(product.desc);
                        b.find("#entry_price").find(".show").html(product.entry_price);
                        b.find("#entry_desc").find(".show").html(product.entry_desc);
                    },
                });
            },
        });
    });
    item_table.find(".update").each(function(){
        $(this).click(function(){
            menu_function["goods-goods-update"]($(this).parent().attr("id"));
        });
    });
/*    item_table.find(".barcode").each(function(){
        $(this).click(function(){
            var target_file=  $(this).parent().attr("id") + ".png";
            var a_block = $(this);
            $.ys_ajax({
                url:"/product/getbar",
                type:"POST",
                datatype:"JSON",
                data:{
                    "id":$(this).parent().attr("id"),
                },
                rt_func:function(data){
                    //saveFile("data:image/octet-stream;base64," + data.file, target_file);
                }
            });
        });
    });
*/
    return item_table;
}

function init_notice_list(data_s, status_n, recevie, notice_type){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var data = data_s.list;
    page = data_s.pageNumber;
    count = data_s.totalRow;

    var item_table = $("<table> </table>");
    if(data == null){
        data = [];
    }
    for(var i = 0; i< data.length; i++){
        var item_tr  = $("<tr></tr>");
        item_tr.attr("id",data[i].id);
        item_tr.append($("<td></td>").css("width", "868px").addClass("title_block").html("<a class=icon>&#9204</a> &nbsp &nbsp <a class='title_link' >" + data[i].title + "</a>"));
        item_tr.append($("<td></td>").addClass("show").html("<a class='icon title_link'> &#59146</a>"));
        item_tr.append($("<td></td>").addClass("delete").html("<a class='icon title_link'> &#10060</a>"));
        item_tr.append($("<td></td>").addClass("update").html("<a class='icon title_link'> &#10002</a>"));

        item_tr.appendTo(item_table);
    }
    item_table.find("a.title_link").css("color", "#515151");
    item_table.find("a.title_link").css("text-decoration", "none");

    item_table.find("td").css("text-align", "left");
    item_table.find("td").css("padding-top", "10px");
    item_table.find("td a.title_link").hover(function(){
        $(this).css("color", "#428bd1");
    }, function(){
        $(this).css("color", "#515151");
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
            url:"/notice/page",
            datatype:"JSON",
            type:"POST",
            data:{
                page:$(this).attr("target"),
                type:notice_type,
                status:status_n,
                recevie:recevie,
            },
            rt_func:function(data){
                init_notice_list(data.notices, status_n, recevie, notice_type);
            },
        });
    });

    item_table.find(".delete").each(function(){
        $(this).click(function(){
            $.ys_ajax({
                url:"/notice/delete",
                datatype:"JSON",
                type:"POST",
                data:{
                    id:$(this).parent().attr("id"),
                },
                rt_func:function(data){
                    menu_function["information-notice"]();
                },
            });
        });
    });
    item_table.find(".show").each(function(){
        $(this).click(function(){
            $.cookie("notice_id", $(this).parent().attr("id"));
            window.open("/notice.html");
        });
    });
    item_table.find(".update").each(function(){
        $(this).click(function(){
            menu_function["information-notice-update"]($(this).parent().attr("id"));
        });
    });
    return item_table;
}

function init_notice_person_list(data_s){
    var target = $(".sub-page-content .content .right .content");
    target.empty();
    var data = data_s.list;
    page = data_s.pageNumber;
    count = data_s.totalRow;

    var item_table = $("<table> </table>");
    if(data == null){
        data = [];
    }
    for(var i = 0; i< data.length; i++){
        var item_tr  = $("<tr></tr>");
        item_tr.attr("id",data[i].id);
        item_tr.append($("<td></td>").css("width", "289px").addClass("title_block").html("<a class='title_link' >" + data[i].title + "</a>"));

        item_tr.appendTo(item_table);
    }
    item_table.find("a.title_link").css("color", "#515151");
    item_table.find("a.title_link").css("text-decoration", "none");

    item_table.find("td").css("text-align", "left");
    item_table.find("td").css("padding-top", "10px");


    item_table.find("td a.title_link").hover(function(){
        $(this).css("color", "#428bd1");
        $(this).css("text-decoration", "underline");
    }, function(){
        $(this).css("text-decoration", "none");
        $(this).css("color", "#515151");
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
            url:"/notice/list",
            datatype:"JSON",
            type:"POST",
            data:{
                page:$(this).attr("target"),
                type:notice_type,
                status:status_n,
                recevie:recevie,
            },
            rt_func:function(data){
                init_notice_person_list(data.notices);
            },
        });
    });

    return item_table;
}


var _fixType = function(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
};

var saveFile = function(data, filename){
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;

    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
};

function close_pop(){
    $(".shadow_cover").click()
}
