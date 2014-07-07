
function f_load_main_menu(p_page_set){
    $('header nav.menu-global').loadList(v_main_menu[p_page_set], function(){
        this_cmd = $(this).attr('cmd');
        f_load_sub_menu(this_cmd);
    });
    $('header nav.menu-global li:eq(0)').click();
}

function f_load_sub_menu(p_sub_page_set){
    main_elem = v_sub_menu[p_sub_page_set];
    $('.main-page').hide();
    for(var i in main_elem){
        if(typeof(main_elem[i]) == 'string'){
            $('#main-page-'+main_elem[i]).show();
        }
    }
    $('header nav.menu-func').loadList(v_sub_menu[p_sub_page_set], function(){
        $('textarea').autosize();
        this_cmd = $(this).attr('cmd');
        $('header nav.menu-func li').removeClass('active');
        $(this).addClass('active');
        left_main_page = $('#main-page-' + this_cmd).parent().offset().left -
                         $('#main-page-' + this_cmd).offset().left;
        active_main_page = this_cmd;
        $('#main-page-' + this_cmd).parent().stop().animate({
            left: left_main_page + 'px'}, function(){
                key_func = page_init_func_set[active_main_page];
                if(key_func == undefined){
                    
                }else{
                    key_func();
                }
            }
        );
    });
        $('header nav.menu-func li:eq(0)').click();
}

function f_click_menu(target){
    $('header nav.menu-func li').each(function(){
        if($(this).attr("cmd") == target){
            $(this).click(); 
        }
    });
}
