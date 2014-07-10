map_nav = {
    "account":[
    { title:"系统通知",
        link:"notices",
    },{
        title:"账户概况",
        link:"account",
    },{
        title:"账单详情",
        link:"bill"
    },{
        title:"用户信息",
        link:"user",
    },{
        title:"员工列表",
        link :"employee",
    },{
        title:"在线充值",
        link:"prepaid",
    },{
        title:"套餐管理",
        link:"favor",
    },{
        title:"客服中心",
        link:"serve",
    },
    ],
    "goods":[
    {
        title:"商品管理",
        link:"goods",
    },{
        title:"商品入库",
        link:"entry",
    },{
        title:"商品批量入库",
        link:"entry_list",
    },{
        title:"库存管理",
        link:"stock",
    },{
        title:"库存分析",
        link:"analyse",
    },],
    "orders":[
    {
        title:"订单管理" ,
        link:"order",
    },{
        title:"退货管理",
        link:"return",
    },{
        title:"亚马逊卖家",
        link:"amazon",
    },
    {
        title:"eBay订单自动抓取",
        link:"ebay",
    },{
        title:"未能同步的订单",
        link:"unsync",
    },{
        title:"虚拟SKU映射",
        link:"SKUmap"
    },],
    "postage":[{
        title:"邮费计算器",
        link:"calculator",
    }],
};

function init_page(){
    $("#login-button").ys_pop_window({
        target:$("#pop-window-login"),
        index:100,
    });
    menu_function["account-notices"]();
}
function logout(){
    $.ys_ajax({
        url:"/account/logout",
        datatype:"JSON",
        type:"POST",
        data:{
        },
        rt_func:function(data){
            if(data.status == "success"){
                alert("退出成功");
            }
        }
    });
}

function login(){
    var login_block = $("#pop-window-login");
    var username = login_block.find("#username").find("input").val();
    var password = login_block.find("#password").find("input").val();
    $.ys_ajax({
        url:"/account/login",
        datatype:"JSON",
        type:"POST",
        data:{
            username:username,
            password:password,
        },
        rt_func:function(data){
            if(data.status == "success"){
                login_block.find("#error-show").hide();
                close_pop();
            }else{
                login_block.find("#error-show").show();
            }
        }
    });
}


var menu_function = {
    "account-notices":function(notice_id){
        var target = $(".sub-page-content .content .right");
        target.find(".content").empty();
        add_content_nav({
            target:target.find(".content-nav"),
            title:"系统通知",
            spans:[],
        });
        $.ys_ajax({
            url:"/notice/list",
            datatype:"JSON",
            type:"POST",
            data:{page:1},
            rt_func:function(data){
                init_notice_person_list(data.notices);
            }
        });
    },
    "goods-goods-update":function(notice_id){
        var target = $(".sub-page-content .content .right");
        target.find(".content").empty();
        add_content_nav({
            target:target.find(".content-nav"),
            title:"公告修改",
            spans:[{
                title:"返回",
                div_id:"return ",
                click_func:function(){
                    menu_function["goods-goods"]();
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
                if(data.status == "nologin"){
                    $("#login-button").click();
                    return;
                }
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
                    if(data.status == "nologin"){
                        $("#login-button").click();
                        return;
                    }
                    menu_function["goods-goods"]();
                }
            });
        });
    },
    "goods-goods-add-file":function(){
       var target = $(".sub-page-content .content .right");
        target.find(".content").empty();
        target.find(".content-nav").empty();
        add_content_nav({
            target:target.find(".content-nav"),
            title:"商品批量上传",
            spans:[{
                title:"返回",
                div_id:"add",
                click_func:function(){
                    menu_function["goods-goods"]();
                }
            },
            ],
        });
        var add_file_button = add_button_to_html({
            title:"<a>上传文件</a>",
            target:target.find(".content"),
        });
        add_file_button.ys_click_upload_file_init({
            upload_url:'/product/addfile',
            callback:function(data){
                if(data.status == "success"){
                    menu_function["goods-goods"]();
                }
            }
        })
    },


    "goods-goods":function(){
        var target = $(".sub-page-content .content .right");
        target.find(".content").empty();
        target.find(".content-nav").empty();
        add_content_nav({
            target:target.find(".content-nav"),
            title:"商品管理",
            spans:[{
                title:"添加",
                div_id:"add",
                click_func:function(){
                    menu_function["goods-goods-add"]();
                }
            },{
                title:"批量添加",
                div_id:"add-file",
                click_func:function(){
                    menu_function["goods-goods-add-file"]();
                }
                },
            ],
        });
        $.ys_ajax({
            url:"/product/page",
            datatype:"JSON",
            type:"POST",
            data:{
                page:1,
            },
            rt_func:function(data){
                if(data.status == "nologin"){
                    $("#login-button").click();
                    return;
                }
                var item_table =  init_product_list(data.products, -1, -1, -1);
            },
        });
    },
    "goods-goods-update":function(product_id){
        var target = $(".sub-page-content .content .right");
        target.find(".content").empty();
        add_content_nav({
            target:target.find(".content-nav"),
            title:"商品修改",
            spans:[{
                title:"返回",
                div_id:"return ",
                click_func:function(){
                    menu_function["goods-goods"]();
                },
            },],
        });

        add_input_item_to_html({
            target:target.find(".content"),
            title:"商品名称:",
            div_id:"name",
        });

        add_select_item_to_html({
            target:target.find(".content"),
            title:"商品类型:",
            options:product_type_menu,
            div_id:"type"
        });

        add_input_item_to_html({
            target:target.find(".content"),
            title:"SKU:",
            div_id:"sku",
        });
        add_input_item_to_html({
            target:target.find(".content"),
            title:"长度(cm):",
            div_id:"length",
        });
        add_input_item_to_html({
            target:target.find(".content"),
            title:"宽度(cm):",
            div_id:"width",
        });
        add_input_item_to_html({
            target:target.find(".content"),
            title:"高度(cm):",
            div_id:"height",
        });
        add_input_item_to_html({
            target:target.find(".content"),
            title:"重量(g):",
            div_id:"weight",
        });
        add_input_item_to_html({
            target:target.find(".content"),
            title:"代理批发价:",
            div_id:"price",
        });
        add_textarea_item_to_html({
            target:target.find(".content"),
            title:"商品描述:",
            div_id:"desc",
        });

        add_input_item_to_html({
            target:target.find(".content"),
            title:"报关申报价:",
            div_id:"entry_price",
        });

        add_textarea_item_to_html({
            target:target.find(".content"),
            title:"报关描述(英文):",
            div_id:"entry_desc"
        });
        $.ys_ajax({
            url:"/product/get",
            datatype:"JSON",
            type:"POST",
            data:{
                id : product_id,
            },
            rt_func:function(data){
                if(data.status == "nologin"){
                    $("#login-button").click();
                    return;
                }
                var product = data.product;
                var t_content = target.find(".content");
                t_content.find("#name").find("input").val(product.name);
                t_content.find("#type").find("select").val(product.type);
                t_content.find("#sku").find("input").val(product.SKU);
                t_content.find("#length").find("input").val(product.length);
                t_content.find("#width").find("input").val(product.width);
                t_content.find("#height").find("input").val(product.height);
                t_content.find("#weight").find("input").val(product.weight);
                t_content.find("#price").find("input").val(product.price);
                t_content.find("#desc").find("textarea").val(product.desc);
                t_content.find("#entry_price").find("input").val(product.entry_price);
                t_content.find("#entry_desc").find("textarea").val(product.entry_desc);
            }
        });
        target.find(".content").append($("<hr>").css("margin", "10px 0"));
        target.find(".content").find(".title").css("width", "144px");
        var item_button_add = add_button_to_html({
            title:"保存",
            target:target.find(".content"),
        });
        item_button_add.click(function(){
            var t_content = target.find(".content");
            var name = t_content.find("#name").find("input").val();
            var type = t_content.find("#type").find("select").val();
            var sku = t_content.find("#sku").find("input").val();
            var length = t_content.find("#length").find("input").val();
            var width = t_content.find("#width").find("input").val();
            var height = t_content.find("#height").find("input").val();
            var weight = t_content.find("#weight").find("input").val();
            var price = t_content.find("#price").find("input").val();
            var desc = t_content.find("#desc").find("textarea").val();
            var entry_price = t_content.find("#entry_price").find("input").val();
            var entry_desc = t_content.find("#entry_desc").find("textarea").val();
            target.find(".content").find("input").each(function(){
                if($(this).val() == ""){
                    $(this).addClass("error");
                    return;
                }else{
                    $(this).removeClass("error");
                }
            });
            target.find(".content").find("textarea").each(function(){
                if($(this).val() == ""){
                    $(this).addClass("error");
                    return;
                }else{
                    $(this).removeClass("error");
                }
            });
            $.ys_ajax({
                url:"/product/update",
                datatype:"JSON",
                type:"POST",
                data:{
                    id:product_id,
                    name:name,
                    type:type,
                    sku:sku,
                    length:length,
                    width:width,
                    height:height,
                    weight:weight,
                    price:price,
                    desc:desc,
                    entry_price:entry_price,
                    entry_desc:entry_desc,
                },
                rt_func:function(data){
                    if(data.status == "nologin"){
                        $("#login-button").click();
                        return;
                    }
                    menu_function["goods-goods"]();
                }
            });
        });
    },

    "goods-goods-add":function(){
        var target = $(".sub-page-content .content .right");
        target.find(".content").empty();
        add_content_nav({
            target:target.find(".content-nav"),
            title:"商品添加",
            spans:[{
                title:"返回",
                div_id:"return ",
                click_func:function(){
                    menu_function["goods-goods"]();
                },
            },
            ],
        });

        add_input_item_to_html({
            target:target.find(".content"),
            title:"商品名称:",
            div_id:"name",
        });

        add_select_item_to_html({
            target:target.find(".content"),
            title:"商品类型:",
            options:product_type_menu,
            div_id:"type"
        });

        add_input_item_to_html({
            target:target.find(".content"),
            title:"SKU:",
            div_id:"sku",
        });
        add_input_item_to_html({
            target:target.find(".content"),
            title:"长度(cm):",
            div_id:"length",
        });
        add_input_item_to_html({
            target:target.find(".content"),
            title:"宽度(cm):",
            div_id:"width",
        });
        add_input_item_to_html({
            target:target.find(".content"),
            title:"高度(cm):",
            div_id:"height",
        });
        add_input_item_to_html({
            target:target.find(".content"),
            title:"重量(g):",
            div_id:"weight",
        });
        add_input_item_to_html({
            target:target.find(".content"),
            title:"代理批发价:",
            div_id:"price",
        });
        add_textarea_item_to_html({
            target:target.find(".content"),
            title:"商品描述:",
            div_id:"desc",
        });

        add_input_item_to_html({
            target:target.find(".content"),
            title:"报关申报价:",
            div_id:"entry_price",
        });

        add_textarea_item_to_html({
            target:target.find(".content"),
            title:"报关描述(英文):",
            div_id:"entry_desc"
        });

        target.find(".content").append($("<hr>").css("margin", "10px 0"));
        target.find(".content").find(".title").css("width", "144px");
        var item_button_add = add_button_to_html({
            title:"添加",
            target:target.find(".content"),
        });
        item_button_add.click(function(){
            var t_content = target.find(".content");
            var name = t_content.find("#name").find("input").val();
            var type = t_content.find("#type").find("select").val();
            var sku = t_content.find("#sku").find("input").val();
            var length = t_content.find("#length").find("input").val();
            var width = t_content.find("#width").find("input").val();
            var height = t_content.find("#height").find("input").val();
            var weight = t_content.find("#weight").find("input").val();
            var price = t_content.find("#price").find("input").val();
            var desc = t_content.find("#desc").find("textarea").val();
            var entry_price = t_content.find("#entry_price").find("input").val();
            var entry_desc = t_content.find("#entry_desc").find("textarea").val();
            target.find(".content").find("input").each(function(){
                if($(this).val() == ""){
                    $(this).addClass("error");
                    return;
                }else{
                    $(this).removeClass("error");
                }
            });
            target.find(".content").find("textarea").each(function(){
                if($(this).val() == ""){
                    $(this).addClass("error");
                    return;
                }else{
                    $(this).removeClass("error");
                }
            });
            $.ys_ajax({
                url:"/product/add",
                datatype:"JSON",
                type:"POST",
                data:{
                    name:name,
                    type:type,
                    sku:sku,
                    length:length,
                    width:width,
                    height:height,
                    weight:weight,
                    price:price,
                    desc:desc,
                    entry_price:entry_price,
                    entry_desc:entry_desc,
                },
                rt_func:function(data){
                    if(data.status == "nologin"){
                        $("#login-button").click();
                        return;
                    }
                    menu_function["goods-goods"]();
                }
            });
        });
    },
};
