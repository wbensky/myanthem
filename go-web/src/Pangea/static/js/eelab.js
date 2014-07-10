function init_nav_image() {
            var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
            var len = $("#focus ul li").length; //获取焦点图个数
            var index = 0;
            var picTimer;
            //以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
            var btn = "<div class='btnBg'></div><div class='btn'>";
            for (var i = 0; i < len; i++) {
                btn += "<span id= '" + i +"'></span>";
            }
            btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
            //$("#focus").append(btn);
            $(".nav-image .shadow .center").append(btn);
            $(".center .btnBg").css("opacity", 0.5);

            //为小按钮添加鼠标滑入事件，以显示相应的内容
            $(".center .btn span").css("opacity", 0.4).mouseover(function() {
                index = $(this).attr("id");
                showPics(index);
            }).eq(0).trigger("mouseover");

            //上一页、下一页按钮透明度处理
            $(".center .preNext").css("opacity", 0.2).hover(function() {
                $(this).stop(true, false).animate({
                    "opacity": "0.5"
                }, 300);
            }, function() {
                $(this).stop(true, false).animate({
                    "opacity": "0.2"
                }, 300);
            });

            //上一页按钮
            $(".center .pre").click(function() {
                index -= 1;
                if (index <= -1) {
                    index = len - 1;
                }
                showPics(index);
            });

            //下一页按钮
            $(".center .next").click(function() {
                index += 1;
                if (index == len) {
                    index = 0;
                }
                showPics(index);
            });

            //本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
            $("#focus ul").css("width", sWidth * (len));

            //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
            $("#focus").hover(function() {
                clearInterval(picTimer);
            }, function() {
                picTimer = setInterval(function() {
                    showPics(index);
                    index++;
                    if (index == len) {
                        index = 0;
                    }
                }, 4000); //此4000代表自动播放的间隔，单位：毫秒
            }).trigger("mouseleave");

            //显示图片函数，根据接收的index值显示相应的内容
            function showPics(index) { //普通切换
                var nowLeft = -index * sWidth; //根据index值计算ul元素的left值
                $("#focus ul").stop(true, false).animate({
                    "left": nowLeft
                }, 300); //通过animate()调整ul元素滚动到计算出的position
                //$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
                $(".center .btn span").stop(true, false).animate({
                    "opacity": "0.4"
                }, 300, function(){
                 $(".center .btn").children("#" + index).animate({
                            "opacity":"1"
                        }, 300);
                });
            }
        }

map_nav = {
    "about-center":[
        "中心概况",
    "组织结构",
    "建设目标",
    "发展规划",
    "师资队伍",
    "课程体系",
    "教学成果",
    "科研成果",
    "特色与辐射",
    "视频"
        ],
    "exp-online":[
        "实验公告",
    "实验室介绍",
    "资源配置",
    "规章制度",
    "实验课程",
    "实验预约",
    "虚拟实验",
    "在线实验",
    "实验成绩管理"
        ],
    "device-book":[
        "公告",
    "设备介绍",
    "设备查询",
        ],
    "invol-tect":[
        "创新信息",
    "资料中心",
    "电子大赛",
    "获奖信息"
        ],
    "online-lesson":[
    "电路原理",
    "专题讲座",
    "模拟电子",
    "电⼯电子",
    "数字电⼦",
    "电路分析",
        ],
    "exchange":[
    "学生留言",
    "教师答疑",
    "问题讨论",
        ],
    "teache-manage":[
    "教师信息",
    "教学研究",
    "科学研究",
    "论文管理",
        ],
    "engineer":[
    "训练介绍",
    "电气工程",
    "电子工程",
    "训练辅导"
        ],
};

map_nav_link = {
    "about-center":[
        "general",
        "instruction",
        "target",
        "plan",
        "teacher",
        "lesson",
        "harvest",
        "scientific",
        "around",
        "video",
        ],
    "exp-online":[
         "notice",
        "lab",
        "source",
        "system",
        "lesson",
        "booking",
        "virtual",
        "online",
        "score",
        ],
    "device-book":[
        "notice",
        "info",
        "search",
        ],
    "invol-tect":[
        "info",
        "material",
        "competition",
        "profit"
        ],
    "online-lesson":[
        "circuit-theory",
        "subject-chair",
        "imitate-circuit",
        "electrician-circuit",
        "number-circuit",
        "circuit-analyse",
        ],
    "exchange":[
        "student-message",
        "teacher-answer",
        "discuss-question",
        ],
    "teache-manage":[
        "teacher-info",
        "teache-study",
        "scin-study",
        "paper-manage",
        ],
        "engineer":[
            "introduce",
        "electric-engneer",
        "circuit-engneer",
        "train-coach",
            ]

};
function init_nav_menu(){
    var target = $(".header-content .nav .nav-list");
    for(key in map_nav){
        for(var i = 0; i< map_nav[key].length; i ++){
            var item_li = $("<li></li>");
            item_li.attr("target", map_nav_link[key][i]);
            item_li.html(map_nav[key][i]);
            item_li.appendTo(target.find("#" + key));
        }
    }
    target.children("li").children("a").click(function(){
            var link = $(this).parent().children("ul").attr("id");
            window.location.href="/" + link + ".html";
    });
    target.children("li").children("ul").children("li").click(function(){
            var link = $(this).parent().attr("id");
            $.cookie("sub_menu", $(this).attr("target"));
            window.location.href="/" + link + ".html";
    })
    var target_menu = $(".header-content .nav .nav-menu");

    var target_menu_link = ["online-lesson", "engineer", "teache-manage", "exchange", "question-system"];
    target_menu.children("li").each(function(index){
        $(this).attr("target", target_menu_link[index]);
    });
    target_menu.children("li").click(function(index){
        var link = $(this).attr("target");
        window.location.href="/" + link + ".html";
    });
    $("#qdu-logo").click(function(){
        window.location.href="/eelab.html";
    });
}

$(document).ready(function(){
    init_nav_menu();
    init_theme();
});

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


