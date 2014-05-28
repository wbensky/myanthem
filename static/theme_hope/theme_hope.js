theme_hope = {};

theme_hope.init = function(){
    f_page_resize_reg(function(){
        content_width = w_w - 255;
        $('#main-body').css({   'width': content_width-40+'px',
                                'height': w_h-40+'px'});
        $('.main-page').css({   'width': content_width-40+'px',
                                'height': w_h-40+'px'});
    });
}

theme_hope.fit = function(){
    $('header li').hover(function(){
        $(this).stop().animate({paddingRight:'25px'}, 300);
    },function(){
        $(this).stop().animate({paddingRight:'10px'}, 300);
    });
}

$(document).ready(function(){
    $(".add-question-type-button").click(function(){
        $(".add-question-type-button").removeClass("active");
        $(this).addClass("active");
    });
});
