var height;
$(function(){
    height = $(window).height();
    $(".navbar-default").find("a").css("color","#d02a25");
    $(".navbar-default").css("background","rgba(0,0,0,0.1)");
    $(".navbar-default").css("border-width","0");
    $(".navbar-default").hover(function(){
            $(".navbar-default").css("background","rgba(255, 247, 148, 0.7)");
    },function(){
            $(".navbar-default").css("background","rgba(0, 0, 0, 0.1)");
    });

   /*
    $(window).scroll(function(){
       if($(window).scrollTop() > height - 10){
            $(".navbar-default").stop().animate({"opacity":"0.8"}, 300);
        }else if($(window).scrollTop() < height){
            $(".navbar-default").stop().animate({"opacity":"0.7"}, 300);
        }
    });*/
});

