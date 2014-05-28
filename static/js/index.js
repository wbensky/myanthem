    var active_exp_id = 0;
    var active_report_id = 0;
    var active_exp_snap_id = 0;
    var active_snap;
    var active_report; //用于批改题目时方便获取分数
    var active_students;
    var active_questions;
    var active_students_index = 0;
    var active_qList;
    var cache_info = {};
    var active_block = null;
    var snap_student_list_html = null;
    var question_list_parent = null;

    //页面的主菜单
    var v_main_menu = {
        'm-teacher': {
            '实验管理': 't-exp',
            '学生管理': 't-stu',
            '账户': 'account'
        },
        'm-admin': {
            '教师管理': 't-tea',
            '学生管理': 'a-stu',
            '账户': 'account'
        },
    };

    //页面的子菜单
    var v_sub_menu = {
         't-stu': {
            "学生信息": "t-stu-info",
        },
        'a-stu': {
            "学生信息": "t-stu-info",
            "添加学生": "t-stu-create"
        },
        't-tea': {
            "教师信息": "t-tea-info",
            "添加教师": "t-tea-create"
        },
        't-exp': {
            '实验列表': 't-exp-list',
            '创建新实验': 't-exp-create'
        },
        't-exp-show': {
            '实验报告': 't-exp-report',
            '创建实验报告': 't-report-create',
            "试验集列表": "t-exp-snap-list",
            "开始一次实验": 't-snap-create'
        },
        "t-report-show": {
            '实验报告': 't-report-show',
            '修改' :'t-report-modify',
            '返回': t_report_show_return
        },
        "t-exp-snap-show": {
            '一次实验': "t-exp-snap-show",
            '批改': 't-exp-snap-correct-list',
            '返回': t_exp_snap_show_return
        },

        "t-exp-snap-correct": {
            '批改': "t-exp-snap-correct",
            '提交': submit_student_exp_correct,
            "返回": exp_snap_student_show
        },
        "t-report-correct-show": {
            '批改': "t-report-correct-show",
            '提交': submit_student_exp_correct,
            "返回": exp_snap_student_show
        },
        'account': {
            '用户信息': 'user-info',
            '登出': f_logout
        }
    };

    //退出时，切换到登陆页
    function f_logout() {
        window.location.href = "login.html";
    }

    //页面展示时的返回按键
    function t_report_show_return() {
        page_init_func_set['t-exp-report']();
        f_load_sub_menu('t-exp-show');
    }

    function t_exp_snap_show_return() {
        page_init_func_set['t-exp-snap-list']();
        f_load_sub_menu("t-exp-show");
        f_click_menu("t-exp-snap-list");
    }

    function exp_snap_student_show() {
        page_init_func_set['t-exp-snap-show']();
        f_load_sub_menu('t-exp-snap-show');
        f_click_menu("t-exp-snap-correct");
    }

    //提交批改得到的分数
    function submit_student_exp_correct() {
        var main_page = $("#main-page-t-exp-snap-correct");
        var questionList = main_page.find("#question-list");

        questionList.children(".item-question").each(function () {
            submit_score_to_server($(this));
        });
        var score = main_page.find("#all-score").val();
        createScore({
            questionId: 0,
            snapId: active_snap.id,
            studentId: active_students[active_students_index].id,
            score: score,
            status: "all"
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS")
                    alert("提交成功");
            }
        });
    }

    function init_pop_tea_info_window(){
        var main_page = $(".pop-tea-info");
        main_page.find(".edit").removeClass("edit");
        main_page.find("#new-password").hide();
        main_page.find("#modify-stu-password").unbind("click");
        main_page.find("#modify-stu-password").click(function(){
            var target = $(this);
            if(target.html().trim(" ") == "修改密码"){
                target.html("保存密码");
                main_page.find("#new-password").show();
            }else{
                var id= main_page.attr("id");
                var password = main_page.find("#input-new-password").val();
                target.html("修改密码");
                modifyPasswordByIdTeacher({
                    id:id,
                    password:password
                },{
                    rt_func:function(data){
                        if(data.status == "SUCCESS"){
                            $(".shadow_cover").click();
                        }
                    }
                })
            }
        });

        main_page.find(".onshow").click(function(){
            $(this).parent().addClass("edit");
        });

    }
    function init_pop_stu_info_window() {
        var main_page = $(".pop-student-info");
        main_page.find(".edit").removeClass("edit");
        main_page.find("#new-password").hide();
        main_page.find("#modify-stu-password").unbind("click");
        main_page.find("#modify-stu-password").html("修改密码");
        main_page.find("#modify-stu-password").click(function () {
            var target = $(this);
            if (target.html().trim(" ") == "修改密码") {
                target.html("保存密码");
                main_page.find("#new-password").show();
            } else {
                var id = main_page.attr("id");
                var password = main_page.find("#input-new-password").val();
                target.html("修改密码");
                modifyPasswordByIdStudent({
                    id: id,
                    password: password
                }, {
                    rt_func: function (data) {
                        if (data.status == "SUCCESS") {
                            $(".shadow_cover").click();
                        }
                    }
                });
            }
        });
        main_page.find("#input-major").empty();
        getMajorList({}, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    var majors = data.majors;
                    for (var i = 0; i < majors.length; i++) {
                        var item_option = $("<option></option>");
                        item_option.html(majors[i].name);
                        item_option.attr("value", majors[i].id);
                        item_option.appendTo(main_page.find("#input-major"));
                    }
                }
            }
        });
        main_page.find(".onshow").click(function () {
            if($(this).parent().find(".onedit").length != 0){
                $(this).parent().addClass("edit");
            }
        });
    }

    active_theme = theme_hope;

    function f_cmd_link() {

    }

    var flag_hide = 0;
    var cmd_map = {
        "send-new-table-question":function(){
            var main_page = $(".pop-add-sub-question-menu .add-table-question");
            var row_number = main_page.find("table").attr("rownumber");
            var col_number = main_page.find("table").attr("colnumber");
            var q_body = main_page.find("#question-table-input-title").val();
            var f_list = [];
            var a_list = [];
            var s_list = [];
            var f_index = 0;
            var a_index = 0;
            var s_index = 0;
            var image = main_page.find("#image-block img").attr("src");
            for(var i = 0; i< row_number ;  i++){
                for(var j= 0; j < col_number; j++){
                    var item_fill = main_page.find("table").find("#row-" +i + "-col-" + j);
                    f_list[f_index ++] = {
                        row:i,
                        col:j,
                        image:image,
                        type:item_fill.attr("answer_type"),
                        content:item_fill.children("div").children("input").val()
                    };
                    if(item_fill.attr("answer_type") != "content"){
                        a_list[a_index++] = {
                            row:i,
                            col:j,
                            answer:item_fill.attr("answer")
                        }
                        s_list[s_index++] = {
                            row:i,
                            col:j,
                            score:item_fill.attr("score")
                        }
                    }
                }
            }
            createQuestion({
                type:"table",
                title:q_body,
                body:JSON.stringify(f_list)
            },{
                rt_func:function(data){
                    if(data.status == "SUCCESS"){
                        var question = data.question;
                        createAnswer({
                            questionId:question.id,
                            body:JSON.stringify(a_list)
                        },{
                            rt_func:function(data){
                                if(data.status == "SUCCESS"){
                                    var target = $("#" + question_list_parent + "   #question-list");
                                    var item = $("<li></li>");
                                    item.attr("id", JSON.stringify(s_list) + "&&" + data.answer.questionId);
                                    item.html("题号" + (target.children("li").length + 1));
                                    item.append(button_delete_li());
                                    item.appendTo(target);
                                    $(".shadow_cover").click();
                                }
                            }
                        });
                    }
                }
            })
        },
        "create-table-to-table-question":function(){
        var main_page = $(".pop-add-sub-question-menu .add-table-question");
        main_page.find("#button-create-table").hide();
        main_page.find("#button-remove-table").show();
        main_page.find("#button-send-question").show();
        main_page.find("#article-row-number").hide();
        main_page.find("#article-col-number").hide();
        var row_number = main_page.find("#input-row-number").val();
        var col_number = main_page.find("#input-col-number").val();
        add_table_block_to_html(row_number, col_number, main_page.find("#table-block"));
    },
    "remove-table-from-table-question":function(){
        var main_page = $(".pop-add-sub-question-menu .add-table-question");
        main_page.find("#button-create-table").show();
        main_page.find("#button-remove-table").hide();
        main_page.find("#button-send-question").hide();
        main_page.find("#article-row-number").show();
        main_page.find("#article-col-number").show();
        main_page.find("#table-block").empty();

    },
    "send-new-teacher": function () {
        var main_page = $("#main-page-t-tea-create");
        var number = main_page.find("#input-number").val();
        var job_title = main_page.find("#input-job-title").val().trim(" ");
        var telphone = main_page.find("#telphone").val();
        var sex = main_page.find("#input-sex").val();
        var email = main_page.find("#input-email").val();
        var name = main_page.find("#input-name").val();
        var flag = 0;
        main_page.find("input").each(function(){
            if ($(this).val() == ""){
                flag = 1;
                $(this).addClass("error")
                $(this).focus(function(){
                    $(this).removeClass("error");
                });
            }
        });

        if (flag == 1)
            return ;

        createTeacher({
            number: number,
            jobTitle: job_title,
            telphone: telphone,
            sex: sex,
            name: name,
            email: email
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    alert("添加成功");
                } else {
                    alert("添加失败");
                }
            }
        });
    },
    "get-tea-info-list": function () {
        var main_page = $("#main-page-t-tea-info");
        var suspend_page = main_page.find("#suspend-item");
        var name = suspend_page.find("input#name").val();
        var number = suspend_page.find("input#number").val();
        var jobTitle = suspend_page.find("select#job-title-list").val().trim(" ");

        getTeacherList({
            name: name,
            number: number,
            jobTitle: jobTitle
        }, {
            rt_func: function (data) {
                if (data.status = "SUCCESS") {
                    main_page.find("#stu-list").empty();
                    if (data.results == null) {
                        var item_li = $("<li></li>");
                        item_li.html("未查找到教师");
                        item_li.appendTo(main_page.find("#stu-list"));
                    } else {
                        var result = data.results;
                        for (var i = 0; i < result.length; i++) {
                            var item_li = $("<li></li>");
                            item_li.attr("id", result[i].Id);
                            item_li.html(result[i].IdNumber);
                            item_li.appendTo(main_page.find("#stu-list"));
                        }
                        main_page.find("#stu-list").find("li").each(function () {
                            $(this).click(function () {
                                getStudent({
                                    studentId: $(this).attr("id")
                                }, {
                                    rt_func: function (data) {
                                        var user = data.student;
                                        var main_page = $(".pop-tea-info");
                                        main_page.find("#number").html(user.IdNumber);
                                        main_page.find("#name").html(user.Profile.name);
                                        main_page.find("#job-title").html(user.Profile.jobTitle);
                                        main_page.find("#email").html(user.Profile.email);
                                        main_page.find("#telphone").html(user.Profile.telPhone);
                                        main_page.find("#username").html(user.username);
                                        if(user.Profile.sex == "1"){
                                            main_page.find("#sex").html("男");
                                        }else{
                                            main_page.find("#sex").html("女");
                                        }
                                        main_page.attr("id", user.id);
                                        init_pop_tea_info_window();
                                    }
                                });
                            });
                            $(this).ys_pop_window({
                                target: "pop-tea-info",
                                index: 100
                            });
                        });
                    }
                }
            }
        });
    },
    "get-stu-info-list": function () {
        var main_page = $("#main-page-t-stu-info");
        var suspend_page = main_page.find("#suspend-item");
        var major = suspend_page.find("#major-list").val();
        var grade = suspend_page.find("#grade-list").val();
        var class_number = suspend_page.find("#class-list").val();
        getStudentList({
            major: major,
            grade: grade,
            class: class_number
        }, {
            rt_func: function (data) {
                if (data.status = "SUCCESS") {
                    main_page.find("#stu-list").empty();
                    if (data.results == null) {
                        var item_li = $("<li></li>");
                        item_li.html("未查找到学生");
                        item_li.appendTo(main_page.find("#stu-list"));
                    } else {
                        var result = data.results;
                        for (var i = 0; i < result.length; i++) {
                            var item_li = $("<li></li>");
                            item_li.attr("id", result[i].Id);
                            item_li.html(result[i].IdNumber);
                            item_li.appendTo(main_page.find("#stu-list"));
                        }
                        main_page.find("#stu-list").find("li").each(function () {
                            $(this).click(function () {
                                getStudent({
                                    studentId: $(this).attr("id")
                                }, {
                                    rt_func: function (data) {
                                        var user = data.student;
                                        var main_page = $(".pop-student-info");
                                        main_page.find("#number").html(user.IdNumber);
                                        main_page.find("#name").html(user.Profile.name);
                                        getMajor({
                                            major_id: user.Profile.major
                                        }, {
                                            rt_func: function (data) {
                                                if (data.status == "SUCCESS")
                                                    main_page.find("#major").html(data.major.name);
                                            }
                                        });
                                        main_page.find("#grade").html(user.Profile.grade);
                                        main_page.find("#class").html(user.Profile.class);
                                        main_page.find("#username").html(user.username);
                                        main_page.attr("id", user.id);
                                        init_pop_stu_info_window();
                                    }
                                });
                            });
                            $(this).ys_pop_window({
                                target: "pop-student-info",
                                index: 100
                            });
                        });
                    }
                }
            }
        });
    },

    "modify-password": function () {
        var main_page = $(".modify-password-block");
        var password = main_page.find("#input-password").val();
        var confirm_password = main_page.find("#input-confirm-password").val();

        if (password != confirm_password) {
            main_page.find(".error").show();
        } else {
            userModifyPassword({
                password: password
            }, {
                rt_func: function (data) {
                    if (data.status == "SUCCESS")
                        $(".shadow_cover").click();
                }
            });
        }
    },
    "send-modify-tea-info": function () {
        var main_page = $(".pop-tea-info");
        var number;
        var job_title;
        var email;
        var telphone;
        var sex;

        if (main_page.find("#input-number").parent().parent().attr("class").indexOf("edit") == -1) {
            number = main_page.find("#number").html();
        } else {
            number = main_page.find("#input-number").val();
        }

        if (main_page.find("#input-name").parent().parent().attr("class").indexOf("edit") == -1) {
            name = main_page.find("#name").html();
        } else {
            name = main_page.find("#input-name").val();
        }

        if (main_page.find("#input-job-title").parent().parent().attr("class").indexOf("edit") == -1) {
            job_title = main_page.find("#job-title").html().trim(" ");
        } else {
            job_title = main_page.find("#input-job-title").val().trim(" ");
        }

        if (main_page.find("#input-telphone").parent().parent().attr("class").indexOf("edit") == -1) {
             telphone = main_page.find("#telphone").html();
        } else {
             telphone = main_page.find("#input-telphone").val();
        }

        if (main_page.find("#input-email").parent().parent().attr("class").indexOf("edit") == -1) {
            email = main_page.find("#email").html();
        } else {
            email = main_page.find("#input-email").val().trim(" ");
        }

        if (main_page.find("#input-sex").parent().parent().attr("class").indexOf("edit") == -1) {
            if(main_page.find("#sex").html().trim(" ") == "男"){
                sex = 1;
            }else{
                sex = 0;
            }
        } else {
            sex = main_page.find("#input-sex").val();
        }
        modifyTeacherInfoById({
            number: number,
            name: name,
            job_title:job_title,
            email: email,
            telphone: telphone,
            sex: sex,
            id: main_page.attr("id")
        }, {
            rt_func: function (data) {
                if(data.status ==  "SUCCESS"){
                    $(".shadow_cover").click();
                }
            }
        })
},


    "send-modify-stu-info": function () {
        var main_page = $(".pop-student-info");
        var number;
        var name;
        var username;
        var grade;
        var class_number;
        var major;


        if (main_page.find("#input-number").parent().parent().attr("class").indexOf("edit") == -1) {
            number = main_page.find("#number").html();
        } else {
            number = main_page.find("#input-number").val();
        }

        if (main_page.find("#input-name").parent().parent().attr("class").indexOf("edit") == -1) {
            name = main_page.find("#name").html();
        } else {
            name = main_page.find("#input-name").val();
        }

        if (main_page.find("#input-username").parent().parent().attr("class").indexOf("edit") == -1) {
            username = main_page.find("#username").html();
        } else {
            username = main_page.find("#input-username").val();
        }

        if (main_page.find("#input-class").parent().parent().attr("class").indexOf("edit") == -1) {
            class_number = main_page.find("#class").html();
        } else {
            class_number = main_page.find("#input-class").val();
        }

        if (main_page.find("#input-major").parent().parent().attr("class").indexOf("edit") == -1) {
            major = main_page.find("#major").html();
        } else {
            major = main_page.find("#input-major").val().trim(" ");
        }

        if (main_page.find("#input-grade").parent().parent().attr("class").indexOf("edit") == -1) {
            grade = main_page.find("#grade").html();
        } else {
            grade = main_page.find("#input-grade").val();
        }

        modifyStuInfo({
            number: number,
            name: name,
            username: username,
            class: class_number,
            grade: grade,
            major: major,
            id: main_page.attr("id")
        }, {
            rt_func: function (data) {}
        })
    },

    "send-user-info": function () {
        var main_page = $("#main-page-user-info");
        var number;
        var name;
        var username;
        var email;
        var sex;
        var job_title;
        var telphone;


        if (main_page.find("#input-job-number").parent().parent().attr("class").indexOf("edit") == -1) {
            number = main_page.find("#job-number").html();
        } else {
            number = main_page.find("#input-job-number").val();
        }

        if (main_page.find("#input-name").parent().parent().attr("class").indexOf("edit") == -1) {
            name = main_page.find("#name").html();
        } else {
            name = main_page.find("#input-name").val();
        }

        if (main_page.find("#input-username").parent().parent().attr("class").indexOf("edit") == -1) {
            username = main_page.find("#username").html();
        } else {
            username = main_page.find("#input-username").val();
        }

        if (main_page.find("#input-email").parent().parent().attr("class").indexOf("edit") == -1) {
            email = main_page.find("#email").html();
        } else {
            email = main_page.find("#input-email").val();
        }

        if (main_page.find("#input-sex").parent().parent().attr("class").indexOf("edit") == -1) {
            if (main_page.find("#sex").html().trim(" ") == "女士") {
                sex = "0";
            } else {
                sex = "1";
            };
        } else {
            sex = main_page.find("#input-sex").val();
        }

        if (main_page.find("#input-job-title").parent().parent().attr("class").indexOf("edit") == -1) {
            job_title = main_page.find("#job-title").html();
        } else {
            job_title = main_page.find("#input-job-title").val().trim(" ");
        }

        if (main_page.find("#input-telphone").parent().parent().attr("class").indexOf("edit") == -1) {
            telphone = main_page.find("#telphone").html();
        } else {
            telphone = main_page.find("#input-telphone").val();
        }

        modifyTeacherInfo({
            number: number,
            name: name,
            username: username,
            email: email,
            sex: sex,
            job_title: job_title,
            telphone: telphone
        }, {
            rt_func: function (data) {}
        })

    },
    "get-student-of-add-snap": function () {
        getStudentByNumber({
            number: $(".block-student-number input#student-number").val()
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    var students_html = snap_student_list_html;
                    var flag = 0;
                    var button_remove = $("<div></div>").addClass("button");
                    button_remove.html("删除");
                    var item = $("<li></li>");
                    item.attr("id", data.student.id);
                    item.html(data.student.IdNumber);
                    students_html.children("li").each(function(){
                        if($(this).attr("id") == data.student.id){
                            flag = 1;
                        }
                    });
                    item.css("margin-top", "9px");
                    button_remove.appendTo(item);
                    button_remove.click(function(){
                        $(this).parent().remove();
                    });
                    if (flag == 0){
                        item.appendTo(students_html);
                    }
                    $(".shadow_cover").click();
                    $(".block-student-number .notification.error").hide();
                } else {
                    $(".block-student-number .notification.error").show();
                }
            }
        });
    },

    "hide-auto": function () {
        if (flag_hide == 0) {
            $("#main-page-t-exp-snap-correct").find(".item-question").each(function () {
                if ($(this).find(".attention").length == 0 && $(this).find(".input-attention").length == 0) {
                    $(this).hide();
                }
            });
            flag_hide = 1;
        } else {
            $("#main-page-t-exp-snap-correct").find(".item-question").each(function () {
                if ($(this).find(".attention").length == 0 && $(this).find(".input-attention").length == 0) {
                    $(this).show();
                }
            });
            flag_hide = 0;
        }
    },
    "pre-student": function () {
        if (active_students_index > 0) {
            active_students_index--;
            page_init_func_set["t-exp-snap-correct"]();
        }
    },
    "next-student": function () {
        if (active_students_index < active_students.length - 1) {
            active_students_index++;
            page_init_func_set["t-exp-snap-correct"]();
        }
    },
    "send-ques-answer-question-button": function () {
        var main_page = $(".pop-window .add-ques-answer-question")
        var title = $("#question-input-ques-answer-title").val();
        var answer = $("#question-input-ques-answer-answer").val();
        var score = {
            correct: $("#question-input-ques-answer-score").val()
        };
        var image = main_page.find("#image-block img").attr("src");
        var flag;
        main_page.find(".onedit").children("input").each(function(){
            if($(this).val() == ""){
                flag = 1;
                $(this).addClass("error");
                $(this).focus(function(){
                    $(this).removeClass("error");
                });
            }
        });
        if(flag == 1){
            return;
        }
        createQuestion({
            title: title,
            parentId: 0,
            type: "ques-answer",
            body: JSON.stringify({
                test: "test",
                image: image
            })
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    createAnswer({
                        questionId: data.question.id,
                        body: JSON.stringify({
                            answer: answer
                        })
                    }, {
                        rt_func: function (data) {
                            if (data.status == "SUCCESS") {
                                var target = $("#" + question_list_parent + " #question-list");
                                var item = $("<li></li>");
                                item.attr("id", JSON.stringify(score) + "&&" + data.answer.questionId);
                                item.html("题号" + (target.children("li").length + 1));
                                item.append(button_delete_li());
                                item.appendTo(target);
                                $(".shadow_cover").click();
                            }
                        }
                    });
                }
            }
        });
    },
    "send-select-question-button": function () {
        var type;
        var score;
        var flag;
        var main_page = $(".pop-window .add-select-question");
        main_page.find(".onedit").children("input").each(function(){
            if($(this).val() == ""){
                flag = 1;
                $(this).addClass("error");
                $(this).focus(function(){
                    $(this).removeClass("error");
                });
            }
        });
        if(flag == 1){
            return;
        }
        if ($("#question-type-input-select").val().trim(" ") == "多选题") {
            var result = $("#question-input-select-score").val().split(",");
            score = JSON.stringify({
                correct: result[0],
                half: result[1]
            });
            type = "select_muti";
        } else {
            score = JSON.stringify({
                correct: $("#question-input-select-score").val()
            });
            type = "select_single";
        }
        var image_q = main_page.find(".image-q img").attr("src");

        var image_a = main_page.find(".image-a img").attr("src");
        var image_b = main_page.find(".image-b img").attr("src");
        var image_c = main_page.find(".image-c img").attr("src");
        var image_d = main_page.find(".image-d img").attr("src");

        createQuestion({
            title: $("#question-title-input-select").val(),
            parentId: 0,
            type: type,
            body: JSON.stringify({
                image_q: image_q,
                image_a: image_a,
                image_b: image_b,
                image_c: image_c,
                image_d: image_d,
                select_a: "" + $("#question-input-select-a").val(),
                select_b: "" + $("#question-input-select-b").val(),
                select_c: "" + $("#question-input-select-c").val(),
                select_d: "" + $("#question-input-select-d").val(),
            })
        }, {
            rt_func: function (data) {
                var question = data;

                if (data.status == "SUCCESS") {
                    createAnswer({
                        questionId: data.question.id,
                        body: JSON.stringify({
                            answer: $("#question-input-select-answer").val()
                        })
                    }, {
                        rt_func: function (data) {
                            if (data.status == "SUCCESS") {
                                var target = $("#" + question_list_parent + " #question-list");
                                var item = $("<li></li>");
                                item.attr("id", score + "&&" + data.answer.questionId);
                                item.html("题号" + (target.children("li").length + 1));
                                item.append(button_delete_li());
                                item.appendTo(target);
                                $(".shadow_cover").click();
                            }
                        }
                    }); // end fo createAnswer
                }
            } //end rt_func
        });
    },
    //创建填空题的事件；
    "send-fill-question-button": function () {
        var main_page = $(".pop-window .add-fill-question")
        var q_body = $("#question-input-fill-title").val();
        var f_list = []; //question fill list
        var a_list = []; //answer fill list
        var s_list = []; //score fill list
        var flag;
        main_page.find(".onedit").children("input").each(function(){
            if($(this).val() == ""){
                flag = 1;
                $(this).addClass("error");
                $(this).focus(function(){
                    $(this).removeClass("error");
                });
            }
        });
        if(flag == 1){
            return;
        }
      
        
        var image = main_page.find("#image-block img").attr("src");
        for (var i = 0; i < q_body.split("____").length - 1; i++) {
            var item = {};
            var a_item = {};
            var s_item = {};
            a_item["answer"] = $("#add-fill-answer-num-" + i).val();
            a_item["number"] = i;
            s_item["score"] = $("#add-fill-score-num-" + i).val();
            s_item["number"] = i;
            item["number"] = i;
            var type_fill = $(".add-fill-question-num-" + i + "  #question-type-input-select").val().trim(" ");
            if (type_fill == "完全判断") {
                item["type"] = "complite";
            } else if (type_fill == "范围判断") {
                item["type"] = "range";
            } else if (type_fill == "多值判断") {
                item["type"] = "select";
            } else if (type_fill == "公式判断") {
                item["type"] = "formula";
            } else if (type_fill == "手动判题") {
                item["type"] = "not_auto";
            }
            item["image"] = image;
            a_list[i] = a_item;
            f_list[i] = item;
            s_list[i] = s_item;
        }
        createQuestion({
            type: "fill",
            title: q_body,
            body: JSON.stringify(f_list)
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    var question = data.question;
                    var answerlist = [];
                    createAnswer({
                        questionId: question.id,
                        body: JSON.stringify(a_list)
                    }, {
                        rt_func: function (data) {
                            if (data.status == "SUCCESS") {
                                var target = $("#" + question_list_parent + " #question-list");
                                var item = $("<li></li>");
                                item.attr("id", JSON.stringify(s_list) + "&&" + data.answer.questionId);
                                item.html("题号" + (target.children("li").length + 1));
                                item.append(button_delete_li());
                                item.appendTo(target);
                                $(".shadow_cover").click();
                            }
                        }
                    });
                }
            }
        });

    },
    "send-report-modify-button":function(){
        var main_page = $("#main-page-t-report-modify");
        var questionList = $("#main-page-t-report-modify #question-list li");
        if(main_page.find("#report-require").val() == ""){
            main_page.find("#report-require").addClass("error");
            main_page.find("#report-require").focus(function(){
                $(this.removeClass("error"));
            });
            return ;
        }
        var question = active_paper.Questions;
        for (var i = 0; i < questionList.length; i++){
            if(questionList[i].id.split("&&").length == 2){
                question.push({
                    score: JSON.parse(questionList[i].id.split("&&")[0]),
                    questionId: questionList[i].id.split("&&")[1]
                });
            }
        }
            modifyPaper({
                paperid:active_paper.id,
                description: JSON.stringify({
                    "exp-require": main_page.find("#report-require").val()
                }),
                questions: JSON.stringify(question)
            },{
                rt_func:function(data){
                    if(data.status == "SUCCESS")
                    {
                        f_load_sub_menu("t-report-show");
                    }
                }
            });
    },
    //创建报告按钮事件
    "send-report-button": function () {
        var questionList = $("#main-page-t-report-create #question-list li");
        if( $("#report-title-input-create").val() == ""){
            $("#report-title-input-create").addClass("error");
            $("#report-title-input-create").focus(function(){
                $(this).removeClass("error");
            });
            return ;
        }


        var question = [];
        var i;
        for (i = 0; i < questionList.length; i++) {
            question[i] = ({
                score: JSON.parse(questionList[i].id.split("&&")[0]),
                questionId: questionList[i].id.split("&&")[1]
            });
        }
        createPaper({
            title: $("#report-title-input-create").val(),
            type: "experiment_report",
            projectId: active_exp_id,
            description: JSON.stringify({
                "exp-require": $("#report-require-input-create").val()
            }),
            questions: JSON.stringify(question)
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    $("header .menu-func li[cmd$=t-exp-report]").click();
                }
            }
        });
    },
    //创建实验按钮事件
    "create-exp-button": function () {
        var main_page = $("#main-page-t-exp-create");
        var flag = 0;
        main_page.find("input").each(function(){
            if ($(this).val() == ""){
                flag = 1;
                $(this).addClass("error")
            $(this).focus(function(){
                $(this).removeClass("error");
            });
            }
        });

        if (flag == 1)
            return ;
        createProject({
            title: $("#exp-title-input-create").val(),
            type: "experiment",
            classType: $("#exp-type-input-create").val().trim(" "),
            desc: $("#exp-desc-input-create").val()
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    getProjectList({
                        type: "experiment"
                    }, {
                        rt_func: function (data) {
                            $("#exp-list").empty();
                            for (item in data.projectList) {
                                var v = $("<li></li>");
                                v.html(data.projectList[item].title);
                                v.attr("id", "" + data.projectList[item].id);
                                v.appendTo($("#exp-list"));
                            }
                        }
                    });
                    f_load_main_menu('m-teacher');
                } else {
                    alert("添加实验失败!");
                }

            }
        });
    },
    "send-new-major": function () {
        var major_name = $(".pop-add-major #major-name").val();
        createMajor({
            name: major_name
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    var target = $("#main-page-t-stu-create #major-list");
                    var major = data.major;
                    var option = $("<option></option>");
                    option.attr("value", major.id);
                    option.html(major.name);
                    option.appendTo(target);
                    $('.shadow_cover').click();
                }
            }
        });
    },
    "get-student-list": function () {
        var main_page = $(".pop-add-stu-to-snap");
        getStudentList({
            major: main_page.find("#major-list").val(),
            grade: main_page.find("#grade-list").val(),
            class: main_page.find("#class-list").val()
        }, {
            rt_func: function (data) {
                var students_html = snap_student_list_html;
                if (data.status == "SUCCESS") {
                    for (var i in data.results) {
                        var flag = 0;
                        var item = $("<li></li>");
                        item.attr("id", data.results[i].Id);
                        item.html(data.results[i].IdNumber);
                        students_html.children("li").each(function(){
                            if(data.results[i].Id == $(this).attr("id")){
                                flag = 1;
                            }
                        });
                        if(flag == 1){
                            continue;
                        }
                        item.css("margin-top", "9px");
                        item.appendTo(students_html);
                        var item_remove = $("<div></div>").addClass("button");
                        item_remove.click(function(){
                            $(this).parent().remove();
                        });
                        item_remove.html("删除");
                        item_remove.appendTo(item);
                    }
                        $(".shadow_cover").click();
                }
            }
        });
    },
    "send-new-snap": function () {
        var main_page = $("#main-page-t-snap-create");
        var sTime = main_page.find("#start-time").val();
        var eTime = main_page.find("#end-time").val();
        var title = main_page.find("#snap-title").val();
        var report = main_page.find("#paper-list").val();
        var students = [];

        var flag = 0;
        main_page.find(".onedit").children("input").each(function(){
            if($(this).val() == ""){
                flag = 1;
                $(this).addClass("error");
                $(this).focus(function(){
                    $(this).removeClass("error");
                });
            }
        });
        if(flag == 1){
            return;
        }
        var students_html = main_page.find("#student-list li");
        students_html.each(function (i, n) {
            students[i] = {
                userId: $(n).attr("id")
            };
        });
        createSnap({
            projectId: active_exp_id,
            title: title,
            type: "experiment",
            startTime: getTimeStamp(sTime.replace("T", " ") + ":00"),
            endTime: getTimeStamp(eTime.replace("T", " ") + ":00"),
            paperId: report,
            studentList: JSON.stringify(students)
        }, {
            rt_func: function (data) {
                alert(data.status);
            }
        });



    },
    "send-new-student": function () {
        var main_page = $("#main-page-t-stu-create");

        var student_number = main_page.find("#input-student-id").val();
        if(student_number == "")
        {
            main_page.find("#input-student-id").addClass("error");
            main_page.find("#input-student-id").focus(function(){
                $(this).removeClass("error");
            });
            return;
        }
        var student_name = main_page.find("#input-student-name").val();
        if(student_name == ""){
            main_page.find("#input-student-name").addClass("error");
            main_page.find("#input-student-name").focus(function(){
                $(this).removeClass("error");
            })
            return;
        }
        var student_grade = main_page.find("#input-grade").val();
        if(student_grade ==""){
            main_page.find("#input-grade").addClass("error") ;
            main_page.find("#input-grade").focus(function(){
                $(this).removeClass("error");
            });
            return ;
        }
        var student_class = main_page.find("#input-class").val();
        if(student_class == ""){
            main_page.find("#input-class").addClass("error");
            main_page.find("#input-class").focus(function(){
                $(this).removeClass("error");
            });
            return ;
        }
        var student_major = main_page.find("#major-list").val();

        createStudent({
            number: student_number,
            name: student_name,
            grade: student_grade,
            class: student_class,
            major: student_major
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    alert("添加学生成功");
                }
            }
        });
    },

    "send-muti-question-button": function () {
        var main_page = $(".pop-window .add-muti-question")
        var title = $("#question-muti-input-title").val();
        var q_body = [];
        var body = $("#create-muti-question-list");
        var scores = [];
        var image = main_page.find(".image-muti img").attr("src");

        var flag;
        main_page.find(".onedit").children("input").each(function(){
            if($(this).val() == ""){
                flag = 1;
                $(this).addClass("error");
                $(this).focus(function(){
                    $(this).removeClass("error");
                });
            }
        });
        if(flag == 1){
            return;
        }



        for (var i = 0; i < body.children("li").length; i++) {
            var item_li = body.children("li")[i].id;
            q_body[i] = {
                questionId: item_li.split("&&")[1],
                number: i,
                image: image
            };
            scores[i] = {
                questionId: item_li.split("&&")[1],
                score: JSON.parse(item_li.split("&&")[0]),
            };
        }
        createQuestion({
            title: title,
            parentId: 0,
            type: "muti",
            body: JSON.stringify(q_body)
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    createAnswer({
                        questionId: data.question.id,
                        body: JSON.stringify({
                            answer: JSON.stringify(scores)
                        })
                    }, {
                        rt_func: function (data) {
                            if (data.status == "SUCCESS") {
                                var target = $("#" + question_list_parent + "   #question-list");
                                var main_page = $("#" + question_list_parent);
                                var item = $("<li></li>");
                                item.attr("id", JSON.stringify(scores) + "&&" + data.answer.questionId);
                                item.html("题号" + (main_page.find("#question-list li").length + 1));
                                item.append(button_delete_li());
                                item.appendTo(target);
                                $(".shadow_cover").click();
                            }
                        }
                    });
                }
            }
        });
    }
};

function init_page() {
    init_pop_add_student_page();
    init_pop_add_question();
 /*   $(".add-resource-table").click(function(){
        var main_page = $(this).parent().parent().parent().parent().parent();
        var table_div = $("<div></div>");
        main_page.children(".resource-table").remove();
        table_div.addClass("resource-table");
        main_page.append(table_div);
        add_table_resource(table_div);
    });
*/
}

function init_pop_add_student_page() {
    var main_page = $(".pop-add-stu-to-snap");
    main_page.find(".student-label").click(function () {
        main_page.find(".student-label").each(function () {
            $(this).removeClass("active")
        });
        $(this).addClass("active");
        var block_name = $(this).attr("add_type");
        main_page.children("section").hide();
        main_page.find("section.block-" + block_name).show();
    });

    main_page.children("section").hide();
    main_page.find("section.block-student-class").show();
}

function init_pop_add_question() {
    var main_page = $(".pop-add-question");
    var title_button = main_page.find(".add-resource");

    title_button.children("ul").hide();
    title_button.hover(function () {
        $(this).children("ul").show();
    }, function () {
        $(this).children("ul").hide();
    });
    main_page.find(".image-show").hide();
    main_page.find(".upload_image").ys_click_upload_file_init({
        upload_url: "/file/uploadimage",
        callback: function (data) {
            active_block.find("#image-block").show();
            active_block.find("#image-block").find("img").attr("src", "/static/file/" + data.fillname);
        },
    });
}

$(document).ready(function () {
    $.var_init();
    active_theme.fit();
    f_page_resize();
    f_load_main_menu($("#main-body").attr("class"));
    init_page();
    $(".cmd_link").click(function () {
        click_elem = $(this);
        cmd_map[$(this).attr('cmd')]();
    });
});
