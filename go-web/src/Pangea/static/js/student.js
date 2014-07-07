var v_main_menu = {
    'm-student': {
        '进行中的实验': 't-exp',
        '账户': 'account'
    }
};

var cache_info = {};
//退出时，切换到登陆页
function f_logout (){
    window.location.href ="/login.html"
}

function send_student_answer_to_server(target, callback){
    var question = active_question;
    if (question.type == "select_single"){
        send_select_single_to_server(target, callback);
    }else if(question.type == "select_muti"){
        send_select_muti_to_server(target, callback);
    }else if(question.type == "fill"){
        send_fill_to_server(target, callback);
    }else if(question.type == "ques-answer"){
        send_qs_to_server(target, callback);
    }else if(question.type == "muti"){
        send_muti_to_server(target, callback);
    }else if(question.type == "table"){
        send_table_to_server(target, callback);
    }
}

function send_muti_to_server(target, callback)
{
    target.find(".sub-question-answer").each(function(){
        var questionType = $(this).attr("id").split("&&")[1];
        var questionId = $(this).attr("id").split("&&")[0];
        var cb = function(data){};
        if(questionType == "select_single"){
            send_select_single_to_server($(this),cb, questionId);
        }else if(questionType == "select_muti"){
            send_select_muti_to_server($(this), cb, questionId);
        }else if(questionType == "fill"){
            send_fill_to_server($(this), cb, questionId);
        }else if(questionType == "ques-answer"){
            send_qs_to_server($(this), cb, questionId);
        }else if(questionType == "muti"){
            send_muti_to_server($(this), cb, questionId);
        }else if(questionType == "table"){
            send_table_to_server($(this), cb, questionId); 
        }
    });
    var data = {};
    data.status == "SUCCESS"
    callback(data);
}

function send_qs_to_server(target, callback, q_id)
{
    var value = {};
    value["answer"] = target.find("textarea").val();

    var questionId = active_question.id;
    if (q_id != undefined){
        questionId = q_id;
    }
    createStudentAnswer({
        questionId: questionId,
        body:JSON.stringify(value)
    },{
        rt_func:callback
         
    
    })
}

function send_fill_to_server(target, callback, q_id){
    var value = [];
    target.find(".fill-answer").each(function(index){
        value[index] = {
            answer: $(this).val(),
            number: $(this).attr("id").split("&&")[1]
        };
    });
    var questionId = active_question.id;
    if (q_id != undefined){
        questionId = q_id;
    }
    createStudentAnswer({
        questionId:questionId ,
        body:JSON.stringify(value)
    },{
        rt_func:callback
    });
}

function send_table_to_server(target, callback, q_id){
    var value = [];
    target.find(".fill").each(function(index){
        var item = $(this).parent().parent().attr("id").split("-");
        value[index] = {
            answer: $(this).val(),
            row:item[1],
            col:item[3]
        };
    });
    var questionId = active_question.id;
    if (q_id != undefined){
        questionId = q_id;
    }
    createStudentAnswer({
        questionId:questionId ,
        body:JSON.stringify(value)
    },{
        rt_func:callback
    });
}



function send_select_single_to_server(target, callback, q_id){
    var value = 0;
    target.find("div input").each(function(){
        if((this).checked){
            value = $(this).val();
        }
    });
    var questionId = active_question.id;
    if (q_id != undefined){
        questionId = q_id;
    }
    if(value == "")
        return ;
    createStudentAnswer({
        questionId : questionId,
        body : JSON.stringify({
            answer:get_select_letter(value)
        })
    },{
        rt_func:callback
    });
};

function send_select_muti_to_server(target, callback, q_id){
    var value = "";

    target.find(".muti-select").each(function(){
        if($(this).attr("select_status") == "yes")
        value = value + $(this).attr("id")[$(this).attr("id").length - 1];
    });

    var questionId = active_question.id;
    if (q_id != undefined){
        questionId = q_id;
    }
    if( value == ""){
        return ;
    }
    createStudentAnswer({
        questionId: questionId,
        body :JSON.stringify({
            answer:value
        })
    },{
        rt_func:callback
    });
}



function exp_snap_show_return(){
    f_load_main_menu("m-student");
}

function submit_answers(){
    send_student_answer_to_server($("#main-page-t-question-show #question-show"), function(data){
        if(data.status == "SUCCESS"){
            if(active_question_index < active_questions.length - 1){
                active_question_index++;
                page_init_func_set["t-question-show"]();
            }else{
                f_load_sub_menu("t-exp-snap-show");
            }
        }
    });
}

function question_show_return(){
    f_load_sub_menu("t-exp-snap-show");
}

var v_sub_menu = {
    't-exp': {
        '实验列表': 't-exp-list',
    },
    't-question-show':{
        '开始做题':'t-question-show',
        '提交':submit_answers,
        '返回':question_show_return
    },
    't-exp-show': {
        '实验报告': 't-exp-report',
        '创建实验报告': 't-report-create',
        "试验集列表": "t-exp-snap-list",
        "开始一次实验": 't-snap-create'
    },
    "t-exp-snap-show": {
        '实验报告': 't-exp-snap-show',
        '返回':exp_snap_show_return

    },
    'account': {
        '用户信息': 'user-info',
        '登出': f_logout
    },
};

var active_exp_id = 0;
var active_report_id = 0;
var active_questions = []
var active_question_index = 0;
var active_question = {};
var active_snap;
var page_init_func_set = {
    "t-exp-snap-show":function(){
        var target = $("#main-page-t-exp-snap-show");
        getSnap({
            snapId:active_snap_id
        },{
            rt_func:function(data){
                if(data.status == "SUCCESS"){
                    target.find("#start-time").html(unix_to_datetime(data.snap.startTime));
                    target.find("#end-time").html(unix_to_datetime(data.snap.endTime));
                    active_snap = data.snap;
                    getPaper({
                        paperId:data.snap.paperId
                    },{
                        rt_func:function(data){
                            if(data.status == "SUCCESS"){
                            target.find("#exp-require").html(data.paper.description["exp-require"]);
                            target.find("#exp-info").html("本实验共有" + data.paper.Questions.length + "道题");
                            active_questions = data.paper.Questions;
                            }
                        }
                    });

                }
            }
        });
    },
    "t-stu-info":function(){
    },
    "t-stu-create":function(){
    },
    't-snap-create':function(){
    },
    't-report-show': function () {
    },
    't-exp-list': function () {
        var myDate = Date.parse(new Date());
        getSnapList({
            createdId:-1,
            studentId: -1,
            datetime:myDate/1000
        },{
            rt_func:function(data){
                if (data.status== "NO_LOGIN"){
                    window.location.href = "/page/login.html"
                }
                var snapList = data.snapList;
                var target = $("#main-page-t-exp-list #exp-list");
                target.empty();
                if(data.status =="SUCCESS"){
                    for(var i = 0; i < snapList.length; i++){
                        var item = $("<li></li>");
                        item.attr("id", snapList[i].id);
                        item.html(snapList[i].title);
                        item.appendTo(target);
                    }
                    target.find("li").click(function(){
                        active_snap_id = $(this).attr("id")
                        f_load_sub_menu('t-exp-snap-show');
                    });
                }
            }
        });
    },
    't-exp-create': function () {
    },
    't-report-create': function () {
    },
    //实验报告页面
    't-exp-report': function () {
    },
    't-question-show':function(){
        var main_page = $("#main-page-t-question-show");
        var f_button = main_page.find("#forward-question");
        var n_button = main_page.find("#next-question");
        f_button.show();
        n_button.show();
        update_suspend();
        if(active_question_index == 0){
            f_button.hide();
        }
        if(active_question_index == active_questions.length - 1){
            n_button.hide();
        }
        main_page.find("#question-show").empty()
        getQuestion({
            questionId:active_questions[active_question_index].questionId
        },{
            rt_func:function(data){
                if(data.status == "SUCCESS"){
                    active_question = data.question;
                    add_question_to_html({
                        question:data.question,
                        position:$("#main-page-t-question-show #question-show"),
                        stu_answer:true
                    });
                }
            }
        });
    },
    'user-info':function(){
        var main_page = $("#main-page-user-info");
        $("#modify-password-button").ys_pop_window({
            target:"modify-password-block",
            index:100
        });
        getUserInfo({
            rt_func:function(data){
                if(data.status == "SUCCESS"){
                    var user = data.user;
                    main_page.find("#number").html(user.IdNumber);
                    main_page.find("#name").html(user.Profile.name);
                    main_page.find("#username").html(user.username);
                    main_page.find("#grade").html(user.Profile.grade);
                    main_page.find("#class").html(user.Profile.class);
                    getMajor({
                        major_id:user.Profile.major
                    },{
                        rt_func:function(data){
                            if(data.status == "SUCCESS"){
                                main_page.find("#major").html(data.major.name);
                            }
                        }
                    });
                }
            }
        });
    }
};

active_theme = theme_hope;

function f_cmd_link() {

}

var cmd_map = {
    "exp-snap-start-answer":function(){
        active_question_index= 0;
        f_load_sub_menu('t-question-show');
    },
    "forward-question":function(){
        send_student_answer_to_server($("#main-page-t-question-show #question-show"), function(data){
            active_question_index --;
            page_init_func_set["t-question-show"]();
        });
    },
    "next-question":function(){
        send_student_answer_to_server($("#main-page-t-question-show #question-show"), function(data){
            active_question_index++;
            page_init_func_set["t-question-show"]();
        })
    },

    "modify-password":function(){
        var main_page = $(".modify-password-block");
        var password = main_page.find("#input-password").val();
        var confirm_password = main_page.find("#input-confirm-password").val();

        if(password != confirm_password){
            main_page.find(".error").show();
        }else{
            userModifyPassword({
                password: password
            },{
                rt_func:function(data){
                    if(data.status == "SUCCESS")
                        $(".shadow_cover").click();
                }
            });
        }
    }
};

function update_suspend(){
    var main_page = $("#main-page-t-question-show #suspend-item");
    var startTime = unix_to_datetime(active_snap.startTime);
    var endTime = unix_to_datetime(active_snap.endTime);
    main_page.find("#start-time").html(startTime);
    main_page.find("#end-time").html(endTime);
    main_page.find("h2").html(active_question_index + 1);
}

$(document).ready(function () {
    $.var_init();
    active_theme.fit();
    f_page_resize();
    f_load_main_menu('m-student');

    $(".cmd_link").click(function () {
        click_elem = $(this);
        cmd_map[$(this).attr('cmd')]();
    });
});
