function delete_question_from_active_paper(question_id){
    for(var i = 0; i< active_paper.Questions.length; i++){
        if(active_paper.Questions[i].questionId = question_id){
            active_paper.Questions.splice(i, 1);
        }
    }
}

function init_add_question_pop_window(){
    $("#add-sub-question-button").hover(
            function () {
                $("#sub-question-type-menu").show();
            }, function () {
                $("#sub-question-type-menu").hide();
            });

    $("#add-sub-question-button ul li").click(function () {
        var type = $(this).attr("name");
        var target = "create-muti-question-list";
        if (type == "select") {
            add_sub_select_question(target);
        } else if (type == "fill") {
            add_sub_fill_question(target);
        } else if (type == "ques-answer") {
            add_sub_ques_answer_question(target);
        } else if (type == "table") {
            add_sub_table_question(target);
        } else if (type == "muti") {
            add_sub_muti_question(target);
        }
    });
    $('.add-question-type-button').click(function () {
        $('.page-add-question').hide();
        $('.add-' + $(this).attr("questiontype") + '-question').show();
    });
    //填空题输入时动态的添加输入框
    $('#question-input-fill-title').keyup(function () {
        $(".add-fill-answer-option").remove();
        var question_title = $(this).val();
        var result = question_title.split("____");
        var i = 0;
        for (i = 0; i < result.length - 1; i++) {
            var article = $("<article></article>");
            article.addClass("info-item add-fill-answer-option");
            var d = $("<div></div>");
            d.addClass("add-fill-question-num-" + i);
            var item = $("<div></div>");
            item.addClass("title");
            item.html("空" + (i + 1) + "答案");
            item.appendTo(d);

            item = $("<div></div>");
            item.addClass("body edit");
            item.append($("<div></div>").addClass("onedit").append($("<input/>").attr("id", "add-fill-answer-num-" + i)));
            item.appendTo(d);
            item = $("<div></div>");
            item.addClass("title");
            item.html("空" + (i + 1) + "分数");
            item.appendTo(d);

            item = $("<div></div>");
            item.addClass("body edit");
            item.append($("<div></div>").addClass("onedit").append($("<input/>").attr("id", "add-fill-score-num-" + i)));
            item.appendTo(d);

            item = $('<div class="body edit"><div class="onedit"><select id="question-type-input-select"><option>完全判断</option><option> 范围判断</option><option>多值判断</option><option>公式判断</option><option>手动判题</option></select></div></div>');
            item.appendTo(d);
            d.appendTo(article);
            article.appendTo($(".add-fill-question #answer-block"));
        }
    });
    $('.page-add-question').hide();
    $('.add-select-question').show();
}


var page_init_func_set = {
    "t-report-modify":function(){
        question_list_parent = "main-page-t-report-modify";
        $('#modify-report-add-question').ys_pop_window({
            target: "pop-add-question",
            index: 100
        });
        init_add_question_pop_window();
        canModifyPaper({
            paperid:active_report_id
        },{
            rt_func:function(data){
                if(data.flag == "no"){
                    alert("实验已经开始了，无法修改实验报告");
                    f_load_sub_menu("t-report-show");
                }
            }
        });
        getPaper({
            paperId: active_report_id
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    active_paper = data.paper;
                    var questions = data.paper.Questions;
                    var questionList = $("#main-page-t-report-modify #question-list");
                    var infoList = $("#main-page-t-report-modify #report-info");
                    questionList.empty();
                    $("#main-page-t-report-modify h2").html(data.paper.title);
                    $("#main-page-t-report-modify #report-require").css("width", "440px");
                    $("#main-page-t-report-modify #report-require").val(data.paper.description["exp-require"]);
                    for (var i in questions) {
                        questionList.append(add_title_li_item({
                            class: "question-li",
                            id: questions[i].questionId,
                            value: "题目" + (parseInt(i) + 1)
                        }));
                    }
                    questionList.find("li").click(function () {
                        var questionId = $(this).attr("id");
                        var target = $(this);

                        getQuestion({
                            questionId: questionId
                        }, {
                            rt_func: function (data) {
                                if (data.status == "SUCCESS") {
                                }
                            }
                        });
                    });
                    questionList.find("li").unbind("click");
                    questionList.find("li").each(function(){
                        var delete_button = $("<div></div>");
                        $(this).append(delete_button);
                        delete_button.html("删除");
                        delete_button.addClass("button");
                        delete_button.click(function(){
                            delete_question_from_active_paper($(this).parent().attr("id"));
                            var main = $(this).parent().parent();
                            $(this).parent().remove();
                            main.children("li").each(function(index){
                                if($(this).attr("id").split("&&").length != 2){
                                    $(this).find("a").html("题号" + (index + 1));
                                }else{
                                    $(this).html("题号"+ (index + 1));
                                    $(this).append(button_delete_li());
                                }

                            });
                        });
                    });
                }
            }
        });
    },
    "t-report-correct-show": function () {
        var main_page = $("#main-page-t-report-correct-show");
        main_page.find("#question-list").empty();

        for (var i = 0; i < active_qList.length; i++) {
            var item_div = $("<div></div>")
                if (active_qList[i].type == "muti") {
                    continue;
                }
            item_div.attr("id", active_qList[i].id);

            add_question_to_html({
                question: active_qList[i],
                position: item_div,
                status: "correct"
            });
            if (active_qList[i].type != "fill") {
                getAnswer({
                    questionId: active_qList[i].id
                }, {
                    rt_func: function (data) {
                        add_answer_to_html({
                            answer: data.answer,
                            position: item_div,
                            question: active_qList[i]
                        });
                    }
                });
            }
            getStudentAnswer({
                createdId: active_students[active_students_index].id,
                questionId: active_qList[i].id
            }, {
                rt_func: function (data) {
                    add_student_answer_to_html({
                        answer: data.answer,
                        position: item_div,
                        question: active_qList[i]
                    });
                }
            });
            score_div = $("<div></div>");
            var score_a = $("<a></a>");
            score_a.html("得分:");
            score_a.appendTo(score_div);
            var score_div_input = $("<input></input>");

            score_div_input.addClass("answer_score");



            if (active_qList[i].type == "ques-answer") {
                score_div_input.addClass("input-attention");
            } else {
                score_div_input.addClass("input-readonly");
            }

            score_div_input.appendTo(score_div);
            if (active_qList[i].type == "ques-answer") {
                add_score_block(active_qList[i], score_div);
                score_div_input.hover(function () {
                    $(this).parent().find(".suspend").show();
                }, function () {
                    $(this).parent().find(".suspend").hide();
                })
            }
            score_div_input.attr("type", "number");
            score_div_input.bind("change", function () {
                modify_all_score(main_page);
            });
            score_div.appendTo(item_div);
            item_div.addClass("item-question");
            item_div.appendTo(main_page.find("#question-list"));
            main_page.find("#question-list").append("<hr/>");
        }
        fill_score_to_input(main_page);
    },

    "t-exp-snap-correct": function () {
        var main_page = $("#main-page-t-exp-snap-correct");
        main_page.find("#pre-student").show();
        main_page.find("#next-student").show();
        if (active_students_index == 0) {
            main_page.find("#pre-student").hide();
        }
        if (active_students_index == active_students.length - 1) {
            main_page.find("#next-student").hide();
        }
        main_page.find("#question-list").empty();

        for (var i = 0; i < active_qList.length; i++) {
            var item_div = $("<div></div>")
                if (active_qList[i].type == "muti") {
                    continue;
                }
            item_div.attr("id", active_qList[i].id);

            add_question_to_html({
                question: active_qList[i],
                position: item_div,
                status: "correct"
            });
            //if(active_qList[i].type == "ques-answer")
            //   item_div.css("background", "#888888");
            if (active_qList[i].type != "fill" && active_qList[i].type != "table") {
                getAnswer({
                    questionId: active_qList[i].id
                }, {
                    rt_func: function (data) {
                        add_answer_to_html({
                            answer: data.answer,
                            position: item_div,
                            question: active_qList[i]
                        });
                    }
                });
            }
            getStudentAnswer({
                createdId: active_students[active_students_index].id,
                questionId: active_qList[i].id
            }, {
                rt_func: function (data) {
                    add_student_answer_to_html({
                        answer: data.answer,
                    position: item_div,
                    question: active_qList[i]
                    });
                }
            });
            score_div = $("<div></div>");
            var score_a = $("<a></a>");
            score_a.html("得分:");
            score_a.appendTo(score_div);
           var score_div_input = $("<input></input>");

            score_div_input.addClass("answer_score");



            if (active_qList[i].type == "ques-answer") {
                score_div_input.addClass("input-attention");
            } else {
                score_div_input.addClass("input-readonly");
            }

            score_div_input.appendTo(score_div);
            if(active_qList[i].type == "table"){
                var button_create_line = $("<div class = 'button'>生成曲线图</div>");
                button_create_line.appendTo(score_div);
                button_create_line.addClass("cmd_link");
                button_create_line.attr("cmd", "create-line");
                button_create_line.click(function(){
                    var item_table = $(this).parent().parent().find("table");
                    var row_number = item_table.attr("rownumber");
                    var col_number = item_table.attr("colnumber");
                    var ykeys = [];
                    for(var i = 1; i < row_number; i++){
                        ykeys.push(item_table.find("#row-"+i+"-col-0").find("input").val());
                    }
                    xkey = item_table.find("#row-0-col-0").find("input").val();
                    var d = [];
                    for(var i = 1; i < col_number; i++){
                        var item_data = {};
                        item_data[xkey] = item_table.find("#row-0-col-" + i).find("input").val();
                        for (var j = 1; j< row_number; j++){
                            if(item_data[ykeys[j - 1]] = item_table.find("#row-" +j+  "-col-" + i).find("input").hasClass("fill")){
                                 
                            item_data[ykeys[j - 1]] = item_table.find("#row-" +j+  "-col-" + i).find("input").parent().find("a").html();
                            }else{
                            item_data[ykeys[j - 1]] = item_table.find("#row-" +j+  "-col-" + i).find("input").val();
                            }
                        }
                        d.push(item_data);
                    }
                    var line_div = $("<div></div>");
                    line_div.css("width", "700px");
                    line_div.css("height", "300px");
                    line_div.css("padding", "20px");
                    line_div.css("border", "1px solid");
                    line_div.css("margin-top","10px");
                    line_div.css("margin-bottom","10px");
                    var line_id =  "line-"  + item_table.parent().parent().parent().attr("id");
                    line_div.attr("id", line_id);

                    line_div.appendTo(item_table.parent());
                    new Morris.Line({
                        element:line_id,
                        data:d,
                        xkey:xkey,
                        ykeys:ykeys,
                        labels:ykeys,
                        smooth:true,
                        parseTime:false,
                    });
                });
            }
            if (active_qList[i].type == "ques-answer") {
                add_score_block(active_qList[i], score_div);
                score_div_input.hover(function () {
                    $(this).parent().find(".suspend").show();
                }, function () {
                    $(this).parent().find(".suspend").hide();
                })
            }
            score_div_input.attr("type", "number");
            score_div_input.bind("change", function () {
                modify_all_score(main_page);
            });
            score_div.appendTo(item_div);
            item_div.addClass("item-question");
            item_div.appendTo(main_page.find("#question-list"));
            main_page.find("#question-list").append("<hr/>");
        }
        auto_correct_question(main_page.find("#question-list"));
        modify_all_score(main_page);
    },
    "t-exp-snap-correct-list": function () {
        getSnap({
            snapId: active_exp_snap_id
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    active_snap = data.snap;
                    active_students = data.studentList;
                    var target = $("#main-page-t-exp-snap-correct-list");
                    target.find("#student-list").empty();
                    if(active_snap.endTime > (new Date).getTime()/1000){
                        target.find("h2").html("实验还未结束");
                        return;
                    }else{
                        target.find("h2").html("批改实验报告");
                    }
                    for (var i = 0; i < data.studentList.length; i++) {
                        var item_li = $("<li></li>");
                        item_li.attr("id", data.studentList[i].id);
                        item_li.html(data.studentList[i].IdNumber);
                        item_li.appendTo(target.find("#student-list"));
                        getScore({
                            questionId: 0,
                            snapId: active_snap.id,
                            studentId: data.studentList[i].id,
                            status: "all"
                        }, {
                            rt_func: function (data) {
                                if (data.score != undefined && data.score != null) {
                                    var a = $("<a></a>");
                                    a.html("      得分：" + data.score.score);
                                    a.appendTo(item_li);
                                }
                            }
                        });
                    }
                    target.find("#student-list li").click(function () {
                        active_students_index = 0
                        var i;
                    for (i = 0; i < active_students.length; i++) {
                        if (active_students[i].id == $(this).attr("id")) {
                            break;
                        }
                    }
                    active_students_index = i;
                    $(this).attr("id");
                    if ($(this).find("a").length != 0) {
                        f_load_sub_menu("t-report-correct-show");
                    } else {
                        f_load_sub_menu("t-exp-snap-correct");
                    }
                    });
                    getPaper({
                        paperId: active_snap.paperId
                    }, {
                        rt_func: function (data) {
                            active_report = data.paper;
                            active_questions = data.paper.Questions;
                        }
                    });
                }
            }
        });
        getQList({
            paperId: active_snap.paperId
        }, {
            rt_func: function (data) {
                active_qList = data.questions;
            }
        });
    },


    "t-exp-snap-show": function () {
        var main_page = $("#main-page-t-exp-snap-show");
        main_page.find("#start-update-content").show();
        main_page.find("#send-snap-content").hide();
        main_page.find("#add-student-to-snap").hide();
        main_page.find("#add-student-to-snap").ys_pop_window({
            target: "pop-add-stu-to-snap",
            index: 100
        });

        snap_student_list_html = main_page.find("#student-list")
            main_page.find("#start-update-content").click(function(){
                var button_self = $(this);
                main_page.find("#send-snap-content").show();
                main_page.find("#add-student-to-snap").show();
                button_self.hide();
                main_page.find("#start-time").parent().addClass("edit");
                main_page.find("#end-time").parent().addClass("edit");
                main_page.find("#student-list").children("li").each(function(){
                    var item_div = $("<div></div>").addClass("button");
                    item_div.click(function(){
                        $(this).parent().remove();
                    });
                    item_div.html("删除");
                    if( $(this).find(".button").length == 0){
                        $(this).append(item_div);
                    }
                });
            });
        main_page.find("#send-snap-content").click(function(){
            var button_self = $(this);
            main_page.find("#start-update-content").show();
            main_page.find("#start-update-content").hide();
            main_page.find("#add-student-to-snap").hide();
            button_self.hide();
            main_page.find("#start-time").parent().removeClass("edit");
            main_page.find("#end-time").parent().removeClass("edit");
            var students = [];
            var sTime = main_page.find("#input-start-time").val();
            var eTime = main_page.find("#input-end-time").val();
            if (sTime == ""){
                main_page.find("#input-start-time").addClass("error");
                main_page.find("#input-start-time").focus(function(){
                    $(this).removeClass("error");
                });
                return ;
            }
            if (eTime == ""){
                main_page.find("#input-end-time").addClass("error");
                main_page.find("#input-end-time").focus(function(){
                    $(this).removeClass("error");
                });
                return ;
            }

            main_page.find("#student-list li").each(function(i, n){

                students[i] = {
                    userId: $(n).attr("id")
                };
            });
            updateSnap({
                snap_id:main_page.attr("snapid"),
                startTime: getTimeStamp(sTime.replace("T", " ") + ":00"),
                endTime:getTimeStamp(eTime.replace("T", " ") + ":00"),
                studentList:JSON.stringify(students)
            },{
                rt_func:function(data){
                    f_load_sub_menu('t-exp-snap-show');
                }
            });


        });
        getSnap({
            snapId: active_exp_snap_id
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    var snap = data.snap;
                    var target = $("#main-page-t-exp-snap-show");
                    target.attr("snapid", data.snap.id);
                    target.find("h2").html(data.snap.title);
                    target.find("#paper-id").html(data.paperTitle);
                    target.find("#start-time").html(unix_to_datetime(snap.startTime));
                    target.find("#input-start-time").val(get_datetime_local(snap.startTime));

                    target.find("#end-time").html(unix_to_datetime(snap.endTime));
                    target.find("#input-end-time").val(get_datetime_local(snap.endTime));
                    target.find("#created-time").html(unix_to_datetime(snap.createdTime));
                    if (data.snap.state == 0) {
                        target.find("#status").html("未归档");
                    } else {
                        target.find("#status").html("已归档");
                    }
                    target.find("#student-list").empty();
                    for (var i = 0; i < data.studentList.length; i++) {
                        var item_li = $("<li></li>");
                        item_li.attr("id", data.studentList[i].id);
                        item_li.html(data.studentList[i].IdNumber);
                        item_li.appendTo(target.find("#student-list"));
                    }
                }
            }
        });

        var pop_page = $(".pop-add-stu-to-snap");
        getGradeList({}, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    pop_page.find("#grade-list").empty();
                    for (var i in data.result) {
                        var option = $("<option></option>");
                        option.html(data.result[i]["grade"]);
                        option.attr("value", data.result[i]["grade"]);
                        option.appendTo(pop_page.find("#grade-list"));
                    }
                }
            }
        });
        getClassList({}, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    pop_page.find("#class-list").empty();
                    for (var i in data.result) {
                        var option = $("<option></option>");
                        option.html(data.result[i]["class"]);
                        option.attr("value", data.result[i]["class"]);
                        option.appendTo(pop_page.find("#class-list"));
                    }
                }
            }
        });
        getMajorListFromUser({}, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    pop_page.find("#major-list").empty();
                    for (var i in data.result) {
                        var option = $("<option></option>");
                        option.html(data.result[i].name);
                        option.attr("value", data.result[i].id);
                        option.appendTo(pop_page.find("#major-list"));
                    }
                }
            }
        });

    },
    "t-exp-snap-list": function () {
        var main_page = $("#main-page-t-exp-snap-list");
        getSnapList({
            projectId: active_exp_id
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    var snaps = data.snapList;
                    if (snaps == null || snaps.length == 0){
                        main_page.children("h2").html("您还未开始过实验");
                    }else{
                        main_page.children("h2").html("试验集列表");
                    }
                    $("#main-page-t-exp-snap-list #snap-list").empty();
                    for (var i = 0; i < snaps.length; i++) {
                        var item = $("<li></li>");
                        item.attr("id", snaps[i].id);
                        item.html(snaps[i].title);
                        item.appendTo($("#main-page-t-exp-snap-list #snap-list"));

                    }
                    $("#main-page-t-exp-snap-list #snap-list li").click(function () {
                        active_snap_id = $(this).attr("id");
                        active_exp_snap_id = $(this).attr("id");
                        f_load_sub_menu('t-exp-snap-show');
                    });
                }
            }
        });
    },
    "t-stu-info": function () {
        var main_page = $("#main-page-t-stu-info");

        main_page.find("#suspend-item #major-list").empty();
        getMajorListFromUser({}, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    var result = data.result;
                    main_page.find("#suspend-item #major-list").empty();
                    for (var i = 0; i < result.length; i++) {
                        if(result[i].name.length==0){
                            continue;
                        }
                        var item_option = $("<option></option>");
                        item_option.attr("value", result[i].id);
                        item_option.html(result[i].name);
                        item_option.appendTo(main_page.find("#suspend-item #major-list"));
                    }
                }
            }
        });

        main_page.find("#suspend-item #grade-list").empty();
        getGradeList({}, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    var result = data.result;
                    main_page.find("#suspend-item #grade-list").empty();
                    for (var i = 0; i < result.length; i++) {
                        if(result[i].grade == 0){
                            continue;
                        }
                        var item_option = $("<option></option>");
                        item_option.attr("value", result[i].grade);
                        item_option.html(result[i].grade);
                        item_option.appendTo(main_page.find("#suspend-item #grade-list"))
                    }
                }
            }
        });
        main_page.find("#suspend-item #class-list").empty();
        getClassList({}, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    var result = data.result;
                    main_page.find("#suspend-item #class-list").empty();
                    for (var i = 0; i < result.length; i++) {
                        if(result[i].class == 0){
                            continue;
                        }
                        var item_option = $("<option></option>");
                        item_option.attr("value", result[i].class);
                        item_option.html(result[i].class);
                        item_option.appendTo(main_page.find("#suspend-item #class-list"));
                    }
                }

            }

        });
    },
    "t-stu-create": function () {
        $("#main-page-t-stu-create #add-new-major").ys_pop_window({
            target: "pop-add-major",
        index: 100
        });
        getMajorList({}, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    var target = $("#main-page-t-stu-create #major-list");
                    var majors = data.majors
            for (var i = 0; i < majors.length; i++) {
                var option = $("<option></option>");
                option.attr("value", majors[i].id);
                option.html(majors[i].name);
                option.appendTo(target);
            }
                }
            }
        });

    },
    't-snap-create': function () {
        var main_page = $("#main-page-t-snap-create");
        var pop_page = $(".pop-add-stu-to-snap");
        snap_student_list_html = main_page.find("#student-list");
        snap_student_list_html = main_page.find("#student-list");
        getPaperList({
            projectId: active_exp_id
        }, {
            rt_func: function (data) {
                var reportList = $("#main-page-t-snap-create #paper-list");
                reportList.empty();
                for (var i in data.paperList) {
                    var item = $("<option></option>");

                    item.attr("value", data.paperList[i].id);
                    item.html(data.paperList[i].title);
                    item.appendTo(reportList);
                }
            }
        });
        main_page.find("#snap-create").click(function () {
            var item_select = main_page.find("#paper-list");

        });
        main_page.find("#add-student").ys_pop_window({
            target: "pop-add-stu-to-snap",
            index: 100
        });
        getGradeList({}, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    for (var i in data.result) {
                        var option = $("<option></option>");
                        option.html(data.result[i]["grade"]);
                        option.attr("value", data.result[i]["grade"]);
                        option.appendTo(pop_page.find("#grade-list"));
                    }
                }
            }
        });
        getClassList({}, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    for (var i in data.result) {
                        var option = $("<option></option>");
                        option.html(data.result[i]["class"]);
                        option.attr("value", data.result[i]["class"]);
                        option.appendTo(pop_page.find("#class-list"));
                    }
                }
            }
        });
        getMajorListFromUser({}, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    for (var i in data.result) {
                        var option = $("<option></option>");
                        option.html(data.result[i].name);
                        option.attr("value", data.result[i].id);
                        option.appendTo(pop_page.find("#major-list"));
                    }
                }
            }
        });
    },
    't-report-show': function () {
        getPaper({
            paperId: active_report_id
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    var questions = data.paper.Questions;
                    var questionList = $("#main-page-t-report-show #question-list");
                    var infoList = $("#main-page-t-report-show #report-info");
                    questionList.empty();
                    infoList.empty();
                    $("#main-page-t-report-show h2").html(data.paper.title);
                    infoList.empty();
                    infoList.append(add_title_value_item({
                        title: "实验要求:",
                        value: data.paper.description["exp-require"]
                    }));
                    for (var i in questions) {
                        questionList.append(add_title_li_item({
                            class: "question-li",
                            id: questions[i].questionId,
                            value: "题目" + (parseInt(i) + 1) + ":"
                        }));
                        var item_hr = $("<hr/>");
                        item_hr.css("background-color", "#fff");
                        item_hr.css("width", "1000px");
                        questionList.append(item_hr);
                    }
                    questionList.find("li").click(function () {
                        var questionId = $(this).attr("id");
                        var target = $(this);

                        getQuestion({
                            questionId: questionId
                        }, {
                            rt_func: function (data) {
                                if (data.status == "SUCCESS") {
                                    add_question_to_html({
                                        question: data.question,
                                        position: target,
                                        flag:"report_show",
                                    });
                                    $
                                }
                            }
                        });
                    });
                    questionList.find("li").each(function () {
                        $(this).click();
                        $(this).unbind("click");
                    });
                }
            }
        });
    },
    't-exp-list': function () {
        var main_page = $("#main-page-t-exp-list");
        getProjectList({
            type: "experiment"
        }, {
            rt_func: function (data) {
                if (data.status == "NO_LOGIN") {
                    window.location.href = "/page/login.html"
                }
                if (data.projectList == null) {
                    main_page.children("h2").html("您还没有创建实验");
                } else {
                    main_page.children("h2").html("实验列表");
                }
                $("#exp-list").empty();
                for (item in data.projectList) {
                    var v = $("<li></li>");
                    v.html(data.projectList[item].title);
                    v.attr("id", "" + data.projectList[item].id);
                    v.appendTo(main_page.find("#exp-list"));
                }
            }
        });


        $('#main-page-t-exp-list .info-list li').click(function () {
            active_exp_id = $(this).attr("id");
            f_load_sub_menu('t-exp-show');
        });
        //load explist of teacher
    },
    't-exp-create': function () {
        //ready exp create for teacher
    },
    't-report-create': function () {
        question_list_parent = "main-page-t-report-create";
        $('#create-report-add-question').ys_pop_window({
            target: "pop-add-question",
            index: 100
        });
        init_add_question_pop_window();
    },
    //实验报告页面
    't-exp-report': function () {
        //f_load_sub_menu('t-exp-show', 'test');

        getPaperList({
            projectId: active_exp_id
        }, {
            rt_func: function (data) {
                var main_page = $("#main-page-t-exp-report");
                var reportList = $("#main-page-t-exp-report #exp-report-list");
                reportList.empty();
                if (data.paperList == null) {
                    main_page.children("h2").html("本实验还未创建实验报告");
                } else {
                    main_page.children("h2").html("实验报告列表");
                }
                for (var i in data.paperList) {
                    var item = $("<li></li>");
                    item.attr("id", data.paperList[i].id);
                    item.html(data.paperList[i].title);
                    item.appendTo(reportList);
                }
                $("#main-page-t-exp-report #exp-report-list li").click(function () {
                    active_report_id = $(this).attr("id");
                    f_load_sub_menu('t-report-show');
                });
            }
        });
    },
    'user-info': function () {
        var main_page = $("#main-page-user-info");
        main_page.find(".onshow").click(function () {
            $(this).parent().addClass("edit");
        });

        $("#modify-password-button").ys_pop_window({
            index: 100,
            target: "modify-password-block"
        });


        main_page.find(".body").removeClass("edit");

        getUserInfo({
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    user = data.user;
                    main_page.find("#job-number").html(user.IdNumber);
                    main_page.find("#name").html(user.Profile.name);
                    main_page.find("#username").html(user.username);
                    main_page.find("#email").html(user.Profile.email);
                    if (user.Profile.sex == 1) {
                        main_page.find("#sex").html("先生");
                    } else {
                        main_page.find("#sex").html("女士");
                    }
                    main_page.find("#job-title").html(user.Profile.jobTitle);
                    main_page.find("#telphone").html(user.Profile.telPhone);
                }
            }
        });
    }
};
