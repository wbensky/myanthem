/*** table question block***/

function add_table_resource(target) {
    var item_section = $("<section></section");
    item_section.addClass("sub-question-block");
    var item_fill_list = $("<div></div>");
    item_section.html("");

    item_section.append(add_title_input_item({
        title:"行数",
        class:"sub-info",
        input_id:"sub-fill-row-number"
    }));

    item_section.append(add_title_input_item({
        title:"列数",
        class:"sub-info",
        input_id:"sub-fill-col-number"
    }));
    var table_block = $("<div></div>").attr("id", "table-block");
    table_block.appendTo(item_section);
    item_section.find("#sub-fill-title").parent().append(add_resourse_select());
    item_section.find("#sub-fill-title").parent().parent().parent().append(add_image_block("fill-image"));

    var cancel_button = $("<div id='cancel-question' class='button'></div>");
    cancel_button.html("取消资源");
    cancel_button.css("margin-left", "20px");
    cancel_button.click(function(){
        $(this).parent().remove();
    });

    var create_table_button = $("<div id='create-table' class='button'></div>");
    create_table_button.html("创建表格");
    create_table_button.click(function(){
        var row_number = $(this).parent().find("#sub-fill-row-number").val();
        var col_number = $(this).parent().find("#sub-fill-col-number").val();

        $(this).parent().find("#sub-fill-col-number").parent().parent().parent().hide();
        $(this).parent().find("#sub-fill-row-number").parent().parent().parent().hide();
        $(this).parent().children("#cancel-table").show();
        add_table_block_to_html(row_number, col_number, $(this).parent().find("#table-block"));
        $(this).parent().children("#submit-question").show();

        $(this).hide();
    });

    var cancel_table_button = $("<div id ='cancel-table' class='button'></div>");
    cancel_table_button.html("取消表格");
    cancel_table_button.hide();
    cancel_table_button.click(function(){
        $(this).parent().children("#create-table").show();
        $(this).parent().find("#sub-fill-col-number").parent().parent().parent().hide();
        $(this).parent().find("#sub-fill-row-number").parent().parent().parent().hide();
        $(this).parent().children("#submit-question").hide();
        $(this).hide();
    });

    var submit_button = $("<div id = 'submit-question' class='button'></div>");
    submit_button.html("保存表格");
    submit_button.css("margin-left", "20px");
    submit_button.hide();
    submit_button.click(function(){
        var main_page = $(this).parent();
        var row_number = main_page.find("table").attr("rownumber");
        var col_number = main_page.find("table").attr("colnumber");
        var q_body = main_page.find("#sub-fill-title").val();
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
                }
            }
        }
        createQuestion({
            type:"table",
            title:q_body,
            body:JSON.stringify(f_list)
        },{
            rt_func:function(data){
            }
        });
    });
    create_table_button.appendTo(item_section);
    cancel_table_button.appendTo(item_section);
    submit_button.appendTo(item_section);
    cancel_button.appendTo(item_section);
    item_section.appendTo(target);
}



function add_sub_table_question(target) {
    var item_section = $("<section></section");
    item_section.addClass("sub-question-block");
    var item_fill_list = $("<div></div>");
    item_section.html("");
    item_section.append(add_title_input_item({
        title: "问题描述",
        class: "sub-info",
        input_id: "sub-fill-title"
    }));

    item_section.append(add_title_input_item({
        title:"行数",
        class:"sub-info",
        input_id:"sub-fill-row-number"
    }));

    item_section.append(add_title_input_item({
        title:"列数",
        class:"sub-info",
        input_id:"sub-fill-col-number"
    }));
    var table_block = $("<div></div>").attr("id", "table-block");
    table_block.appendTo(item_section);
    item_section.find("#sub-fill-title").parent().append(add_resourse_select());
    item_section.find("#sub-fill-title").parent().parent().parent().append(add_image_block("fill-image"));

    var cancel_button = $("<div id='cancel-question' class='button'></div>");
    cancel_button.html("取消子问题");
    cancel_button.css("margin-left", "20px");
    cancel_button.click(function(){
        $(this).parent().remove();
    });

    var create_table_button = $("<div id='create-table' class='button'></div>");
    create_table_button.html("创建表格");
    create_table_button.click(function(){
        var row_number = $(this).parent().find("#sub-fill-row-number").val();
        var col_number = $(this).parent().find("#sub-fill-col-number").val();

        $(this).parent().find("#sub-fill-col-number").parent().parent().parent().hide();
        $(this).parent().find("#sub-fill-row-number").parent().parent().parent().hide();
        $(this).parent().children("#cancel-table").show();
        add_table_block_to_html(row_number, col_number, $(this).parent().find("#table-block"));
        $(this).parent().children("#submit-question").show();





        $(this).hide();
    });

    var cancel_table_button = $("<div id ='cancel-table' class='button'></div>");
    cancel_table_button.html("取消表格");
    cancel_table_button.hide();
    cancel_table_button.click(function(){
        $(this).parent().children("#create-table").show();
        $(this).parent().find("#sub-fill-col-number").parent().parent().parent().hide();
        $(this).parent().find("#sub-fill-row-number").parent().parent().parent().hide();
        $(this).parent().children("#submit-question").hide();
        $(this).hide();
    });

    var submit_button = $("<div id = 'submit-question' class='button'></div>");
    submit_button.html("提交子问题");
    submit_button.css("margin-left", "20px");
    submit_button.hide();
    submit_button.click(function(){
            var main_page = $(this).parent();
            var row_number = main_page.find("table").attr("rownumber");
            var col_number = main_page.find("table").attr("colnumber");
            var q_body = main_page.find("#sub-fill-title").val();
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
                                    var target = main_page.parent();
                                    var item = $("<li></li>");
                                    item.attr("id", JSON.stringify(s_list) + "&&" + data.answer.questionId);
                                    item.html("题号" + (target.children("li").length + 1));
                                    item.append(button_delete_li());
                                    item.appendTo(target);
                                    main_page.hide();
                                }
                            }
                        });
                    }
                }
            });
        
    });

    create_table_button.appendTo(item_section);
    cancel_table_button.appendTo(item_section);
    submit_button.appendTo(item_section);
    cancel_button.appendTo(item_section);
    item_section.appendTo($("#" + target));
}


function auto_correct_table_question(main_page){
    var scores = get_score_from_scores(main_page.attr("id"), active_report.Questions);
    main_page.find("table").find("input.fill").each(function(data){
        var td = $(this).parent().parent();
        var questionType = td.attr("answer_type");
        var student_answer = td.find("a").html();
        var answer = td.find("#pop-answer").find("#answer").html();
        var row = td.attr("id").split("-")[1];
        var col = td.attr("id").split("-")[3];
        var score = get_table_score(scores,row,col);
        if (questionType == "complite") {
            if (answer == student_answer) {
                var n = main_page.find(".answer_score").val();
                if (n == null || n == "") {
                    main_page.find(".answer_score").val(score.score);
                } else {
                    main_page.find(".answer_score").val(parseInt(score.score) + parseInt(n));
                }
            } else {
                var n = main_page.find(".answer_score").val();
                if (n == "") {
                    n = 0;
                }
                main_page.find(".answer_score").val(parseInt(n) + 0);
            }
        } else if (questionType == "range") {
            if (correct_range_fill_answer(student_answer, answer) == true) {
                var n = main_page.find(".answer_score").val();
                if (n == null || n == "") {
                    main_page.find(".answer_score").val(score.score);
                } else {
                    main_page.find(".answer_score").val(parseInt(score.score) + parseInt(n));
                }
            } else {
                var n = main_page.find(".answer_score").val();
                if (n == "") {
                    n = 0;
                }
                main_page.find(".answer_score").val(parseInt(n) + 0);
            }
        } else if (questionType == "select") {
            if (correct_select_fill_answer(student_answer, answer) == true) {
                var n = main_page.find(".answer_score").val();
                if (n == null || n == "") {
                    main_page.find(".answer_score").val(score.score);
                } else {
                    main_page.find(".answer_score").val(parseInt(score.score) + parseInt(n));
                }
            } else {
                var n = main_page.find(".answer_score").val();
                if (n == "") {
                    n = 0;
                }
                main_page.find(".answer_score").val(parseInt(n) + 0);
            }
        } else if (questionType == "formula") {} else {
            var n = main_page.find(".answer_score").val();
            if (n == null || n == "") {
                main_page.find(".answer_score").val(score.score);
            } else {
                main_page.find(".answer_score").val(parseInt(score.score) + parseInt(n));
            }

        }
       
    });


}

function get_content_from_table_question(fills, row, col){
    for(var i = 0; i< fills.length; i++){
            if(fills[i].row == row && fills[i].col == col)
                return fills[i];
    }
    return null
}

function add_table_to_html(option) {
    var question = option.question;
    var fills = question.Body;
    var item_div = $("<div></div>");
    var title = $("<h4></h4>");
    title.html(question.title);
    title.appendTo(item_div);
    if(question.Body[0].image != undefined){
        var image_block = add_image_block("");
        image_block.show();
        image_block.find("img").attr("src", question.Body[0].image);
        image_block.appendTo(item_div);
    }

    var row_number = fills[fills.length - 1].row + 1;
    var col_number = fills[fills.length - 1].col + 1;
    var table_block = $("<div></div>");
    var item_table = $("<table></table>");
    item_table.attr("colnumber", col_number);
    item_table.attr("rownumber", row_number);
    item_table.attr("answer_type","content");

    for(var i = 0; i< row_number; i++){
        var item_tr = $("<tr></tr>");
        for(var j= 0; j< col_number; j++){
            var item_td = $("<td></td>");
            item_td.attr("id", "row-" + i + "-col-" + j);
            item_td.attr("answer_type", "content");
            item_td.appendTo(item_tr);
            var content = get_content_from_table_question(question.Body, i, j);
            var block_div = $("<div></div>");
            block_div.css("padding", "3px 5px");
            block_div.addClass("remove-margin");
            if(content.type == "content"){
                item_input =  $("<input readonly='readonly'>");
                item_input.val(content.content);
            }else{
                item_td.addClass("table-td-active");
                item_td.attr("answer_type", content.type);
                item_input= $("<input></input>");
                item_input.addClass("fill");
            }
            item_input.css("margin-top","0px");
            item_input.appendTo(block_div);
            item_td.append(block_div);
        }
        item_tr.appendTo(item_table);
    } item_table.appendTo(table_block); table_block.attr("id", "table-block");
    table_block.appendTo(item_div);
    item_div.appendTo(option.position);
    option.position.unbind("click");
    if(option.stu_answer == true){
        getMyAnswer({
            questionId:question.id
        },{
            rt_func:function(data){
                if(data.status == "SUCCESS"){
                    for(var i = 0; i< data.answer.body.length; i++){
                        var answer = data.answer.body[i];
                        option.position.find("#row-" + answer.row + "-col-"+ answer.col ).find("input").val(answer.answer);
                    } 
                } 
            }
        });
    }
}

function get_table_answer_from_answers(answers, row, col){
    for(var i = 0; i < answers.length; i++){
        if(answers[i].row == row && answers[i].col == col){
            return answers[i];
        }
    }
    return null;
}

function add_table_student_answer_to_html(option) {
    option.position.find("table").find("input.fill").each(function(){
                var input = $(this);
                var td = $(this).parent().parent();
                var row = td.attr("id").split("-")[1];
                var col = td.attr("id").split("-")[3];
                var content = get_content_from_table_question(option.question.Body, row, col);
                if(content.type == "content"){
                    input.parent().append("<a>" + content.content + "</a>");
                }else{
                    if(option.answer == undefined){
                        input.parent().append("<a>" + "学生未提交答案"+ "</a>");
                    }else{
                    var ans = get_table_answer_from_answers(option.answer.body, row, col);
                    input.parent().append("<a>" + ans.answer + "</a>");
                    } 
                }
                if(content.type == "not_auto"){
                    td.addClass("attention");
                }
                input.hide();
                td.append(pop_add_table_fill_answer())
                td.hover(function(){
                    $(this).find("#pop-answer").show();
                }, function(){
                    $(this).find("#pop-answer").hide();
                });

    
            td.click(function () {
                //todo
                var row = $(this).attr("id").split("-")[1];
                var col = $(this).attr("id").split("-")[3];
                var scores = get_score_from_scores(option.question.id, active_report.Questions)
                var score = get_table_score(scores, row, col);
                
                var main_page = $(this).parent().parent().parent().parent().parent().parent();
                if ($(this).attr("class").indexOf("attention") != -1) {
                    $(this).removeClass("attention");
                    $(this).addClass("error");
                    var n = main_page.find(".answer_score").val();
                    if (n == null || n == "") {
                        main_page.find(".answer_score").val(score.score);
                    } else {
                        main_page.find(".answer_score").val(parseInt(n) - parseInt(score.score));
                    }
                } else {
                    $(this).removeClass("error");
                    $(this).addClass("attention");

                    var n = main_page.find(".answer_score").val();
                    if (n == null || n == "") {
                        main_page.find(".answer_score").val(score.score);
                    } else {
                        main_page.find(".answer_score").val(parseInt(n) + parseInt(score.score));
                    }

                }
                modify_all_score(main_page.parent().parent());
            });

    
    
    
    });

    getAnswer({
        questionId:option.question.id
    },{
        rt_func:function(data){
            if(data.status == "SUCCESS"){
                var scores = get_score_from_scores(option.question.id, active_report.Questions);
                option.position.find("table").find("#pop-answer").each(function(){
                    var td = $(this).parent();
                    var row = td.attr("id").split("-")[1];
                    var col = td.attr("id").split("-")[3];
                    var answer = get_table_answer_from_answers(data.answer.body, row, col);
                    $(this).find("#answer").html(answer.answer);
                    var score = get_table_score(scores, row, col);
                    $(this).find("#score").html(score.score);
               }) ;
            }
        }
    })
    //todo suspend and correct
}

function get_table_score(scores, row, col){
    for(var i = 0; i< scores.length; i++){
        if(scores[i].row == row && scores[i].col == col){
            return scores[i];
        }
    }
    return null;
}



function add_table_block_to_html(row_number, col_number, target){
    if(row_number == undefined || row_number == 0 )
        return;

    if(col_number == undefined || col_number == 0 )
        return ;

    var item_table = $("<table></table>");
    item_table.attr("colnumber", col_number);
    item_table.attr("rownumber", row_number);
    item_table.attr("answer_type","content");

    for(var i = 0; i< row_number; i++){
        var item_tr = $("<tr></tr>");
        for(var j= 0; j< col_number; j++){
            var item_td = $("<td></td>");
            item_td.attr("id", "row-" + i + "-col-" + j);
            item_td.attr("answer_type", "content");
            item_td.appendTo(item_tr);
            var block_div = $("<div></div>");
            var item_input = $("<input></input>");
            var item_button = $("<div></div>");
            item_button.addClass("button");
            item_input.appendTo(block_div);
            item_button.appendTo(block_div);
            item_button.addClass("pop-add-table-fill-answer");
            block_div.append(pop_add_table_fill());
            block_div.append(pop_add_table_fill_answer());

            item_button.click(function(){
                var pop = $(this).parent().children("#pop");
                pop.show();
            });
            item_button.hover(function(){
                var pop = $(this).parent().children("#pop-answer");
                var item_td = $(this).parent().parent();
                var answer_type = item_td.attr("answer_type");
                if(answer_type != "content"){
                    var score = item_td.attr("score");
                    var answer = item_td.attr("answer");
                    pop.find("#answer").html(answer);
                    pop.find("#score").html(score);
                    pop.show();
                }
            },function(){
                var pop = $(this).parent().children("#pop-answer");
                pop.hide();
            });
            item_td.append(block_div);
        }
        item_tr.appendTo(item_table);
    }
    item_table.appendTo(target);
}

function pop_add_table_fill_answer(){
    var item_block = $("<div></div>");
    var item_h3 = $("<h3></h3>");
    item_h3.html("填空");
    item_h3.appendTo(item_block);
    item_block.append("<hr/>");

    item_block.hide();
    item_block.addClass("suspend");
    item_block.addClass("pop-table-fill")

    item_block.attr("id", "pop-answer");


    item_block.append(add_title_value_item({
        title:"此空答案:",
        value:"",
        id:"answer"
    }));
    item_block.append(add_title_value_item({
        title:"分数:",
        value:"",
        id:"score"
    }));
    var item_button = $("<div></div>");
    item_button.addClass("button");
    item_button.html("设为非填空");
    item_button.css("margin-right", "10px");
    //item_button.appendTo(item_block);
    item_button.click(function(){
        var block = $(this).parent();
        var td = $(this).parent().parent().parent();
        td.css("border-color", "#ff0000")
        td.attr("answer_type","content");
        block.hide();
    });
    item_block.hover(function(){
        $(this).show();
    },function(){
        $(this).hide();
    });
    return item_block;
}

function pop_add_table_fill(){
    var item_block = $("<div></div>");
    var item_h3 = $("<h3></h3>");
    item_h3.html("设为填空");
    item_h3.appendTo(item_block);
    item_block.append("<hr/>");

    item_block.hide();
    item_block.addClass("suspend");
    item_block.addClass("pop-table-fill")

    item_block.attr("id", "pop");


    item_block.append(add_title_input_item({
        title:"参考答案:",
        input_id:"answer"
    }));
    item_block.append(add_title_input_item({
        title:"分数:",
        input_id:"score"
    }));
    item_block.append(add_title_select_item(
                {
                title: "判题类型",
                class: "sub-info",
                select_id: "sub-fill-type",
                options: [{
                    name: "完全判断",
                    value:"complite"
                }, {
                    name: "范围判断",
                    value:"range"
                }, {
                    name: "多值判断",
                    value:"select"
                }, {
                    name: "公式判断",
                    value:"formula"
                }, {
                    name: "手动判断",
                    value: "not_auto"
                }]}
                ));
    var item_button = $("<div></div>");
    item_button.addClass("button");
    item_button.html("保存");
    item_button.css("margin-right", "10px");
    item_button.appendTo(item_block);
    item_button.click(function(){
        var block = $(this).parent();
        var td = $(this).parent().parent().parent();
        var answer = block.find("#answer").val();
        var score = block.find("#score").val();
        var answer_type = block.find("#sub-fill-type").val();
        td.addClass("table-td-active");
        td.attr("answer", answer);
        td.attr("score",score);
        td.attr("answer_type",answer_type);
        block.hide();
    });
    var item_button = $("<div></div>");
    item_button.addClass("button");
    item_button.html("取消");
    item_button.appendTo(item_block);
    item_button.click(function(){
        $(this).parent().hide(); 
    });
    return item_block;
}
/*** end table question block ***/

function fill_score_to_input(target){
    target.find(".item-question").each(function(){
        var questionId = $(this).attr("id");
        var item_input = $(this).find("input.answer_score");
        getScore({
            questionId:questionId,
            snapId:active_snap.id,
            studentId:active_students[active_students_index].id
        },{
            rt_func:function(data){
                if(data.status == "SUCCESS"){
                    item_input.val(data.score.score);
                }
            }
        });
    });
    getScore({
        questionId:0,
        snapId:active_snap.id,
        studentId:active_students[active_students_index].id
    },{
        rt_func:function(data){
            if(data.status == "SUCCESS"){
                target.find("#all-score").val(data.score.score);
            }
        }
    });
}


//
function add_score_block(question, target) {
    var item_div = $("<div></div>");
    var score = get_score_from_scores(question.id, active_report.Questions);
    item_div.html("本题分数:" + "<a> " + score.correct + "</a>");
    item_div.addClass("suspend");
    item_div.appendTo(target);
    item_div.hide();
}


function submit_score_to_server(target) {
    questionId = target.attr("id");
    studentId = active_students[active_students_index].id;
    snapId = active_snap.id;
    qtype = get_question_type_from_activeQList(questionId);
    if (qtype == "select_single" || qtype == "select_muti") {
        score = target.find(".answer_score").val();
        createScore({
            questionId: questionId,
            snapId: snapId,
            studentId: studentId,
            score: score,
            status: "select"
        });
    } else if (qtype == "fill") {
        score = target.find(".answer_score").val();
        createScore({
            questionId: questionId,
            snapId: snapId,
            studentId: studentId,
            score: score,
            status: "fill"
        });
    }else if (qtype == "ques-answer") {
        score = target.find(".answer_score").val();
        createScore({
            questionId: questionId,
            snapId: snapId,
            studentId: studentId,
            score: score,
            status: "ques-answer"
        });
    } else if (qtype == "table") {
        score = target.find(".answer_score").val();
        createScore({
            questionId: questionId,
            snapId: snapId,
            studentId: studentId,
            score: score,
            status: "table"
        });
    }
}

//计算总得分
function modify_all_score(target) {
    var score = 0;
    target.find(".answer_score").each(function () {
        if ($(this).val() != "")
            score += parseInt($(this).val());
    });
    target.find("#all-score").val(score);
}

/********************自动判题代码******************/
function auto_correct_question(main_page) {
    main_page.children(".item-question").each(function (index) {
        var target = $(this);
        var q_type = get_question_type_from_activeQList(target.attr("id"));
        var score;
        if (q_type == "select_single") {
            score = auto_correct_select_question(target);
        } else if (q_type == "select_muti") {
            score = auto_correct_select_muti_question(target);
        } else if (q_type == "fill") {
            score = auto_correct_fill_question(target);
        } else if(q_type == "table"){
            score = auto_correct_table_question(target);
        }
    });
    modify_all_score($("#main-page-t-exp-snap-student-correct"));
}

function auto_correct_select_question(main_page) {
    var questionId = main_page.attr("id");
    var answer = main_page.find("#correct-question").html();
    var student_answer = main_page.find(".student-answer").html();
    if (answer == student_answer) {
        main_page.find(".answer_score").val(get_score_from_scores(questionId, active_report.Questions).correct);
    } else {
        main_page.find(".answer_score").val(0);
    }
}

function auto_correct_select_muti_question(main_page) {
    var questionId = main_page.attr("id");
    var answer = main_page.find("#correct-question").html();
    var student_answer = main_page.find(".student-answer").html();
    if (answer == student_answer) {
        main_page.find(".answer_score").val(get_score_from_scores(questionId, active_report.Questions).correct);
    } else if (answer.match(studen_answer) != null) {
        main_page.find(".answer_score").val(get_score_from_scores(questionId, active_report.Questions).half)
    } else {
        main_page.find(".answer_score").val(0);
    }
}

function auto_correct_fill_question(main_page) {
    var questionId = main_page.attr("id");
    scores = get_score_from_scores(questionId, active_report.Questions);
    main_page.find(".correct-question").each(function (index) {
        var questionType = $(this).attr("questiontype");
        var answer = $(this).find("#correct-answer").html();
        var number = index;
        var s = $(this);
        var student_answer = $(this).html().split("___")[1];
        var score = get_fill_score(number, scores);

        if (questionType == "complite") {
            if (answer == student_answer) {
                var n = main_page.find(".answer_score").val();
                if (n == null || n == "") {
                    main_page.find(".answer_score").val(score.score);
                } else {
                    main_page.find(".answer_score").val(parseInt(score.score) + parseInt(n));
                }
            } else {
                var n = main_page.find(".answer_score").val();
                if (n == "") {
                    n = 0;
                }
                main_page.find(".answer_score").val(parseInt(n) + 0);
            }
        } else if (questionType == "range") {
            if (correct_range_fill_answer(student_answer, answer) == true) {
                var n = main_page.find(".answer_score").val();
                if (n == null || n == "") {
                    main_page.find(".answer_score").val(score.score);
                } else {
                    main_page.find(".answer_score").val(parseInt(score.score) + parseInt(n));
                }
            } else {
                var n = main_page.find(".answer_score").val();
                if (n == "") {
                    n = 0;
                }
                main_page.find(".answer_score").val(parseInt(n) + 0);
            }
        } else if (questionType == "select") {
            if (correct_select_fill_answer(student_answer, answer) == true) {
                var n = main_page.find(".answer_score").val();
                if (n == null || n == "") {
                    main_page.find(".answer_score").val(score.score);
                } else {
                    main_page.find(".answer_score").val(parseInt(score.score) + parseInt(n));
                }
            } else {
                var n = main_page.find(".answer_score").val();
                if (n == "") {
                    n = 0;
                }
                main_page.find(".answer_score").val(parseInt(n) + 0);
            }
        } else if (questionType == "formula") {} else {
            var n = main_page.find(".answer_score").val();
            if (n == null || n == "") {
                main_page.find(".answer_score").val(score.score);
            } else {
                main_page.find(".answer_score").val(parseInt(score.score) + parseInt(n));
            }

        }
    });
}

function correct_range_fill_answer(student_answer, answer) {
    var first;
    var second;
    var aList = answer.substr(1, answer.length - 2).split(",");
    if (answer.charAt(0) == "[")
        first = (student_answer >= aList[0].trim());
    if (answer.charAt(0) == "(")
        first = (student_answer > aList[0].trim());
    if (answer.charAt(answer.length - 1) == "]")
        second = (student_answer <= aList[1].trim(" "));
    if (answer.charAt(answer.length - 1) == ")")
        second = (student_answer < aList[1].trim());
    return (first && second);
}

function correct_select_fill_answer(student_answer, answer) {
    sList = answer.split(",");
    for (var i = 0; i < sList.length; i++) {
        if (sList[i] == student_answer)
            return true;
    }
    return false;
}

/************获取分数***********/
function get_fill_score(number, scores) {
    for (var i = 0; i < scores.length; i++) {
        if (scores[i].number + "" == number)
            return scores[i];
    }
    return null;
}

function get_score_from_scores(questionId, scores) {
    for (var i = 0; i < scores.length; i++) {
        var questionType = get_question_type_from_activeQList(scores[i].questionId);
        if (questionId == scores[i].questionId) {
            return scores[i].score;
        }
        if (questionType == "muti") {
            var result = get_score_from_scores(questionId, scores[i].score);
            if (result != null)
                return result;
        }
    }
    return null
}

/*****************获取问题类型****************/
function get_question_type_from_activeQList(questionId) {
    for (var i = 0; i < active_qList.length; i++) {
        if (active_qList[i].id == questionId) {
            return active_qList[i].type;
        }
    }
}

//添加学生答案到html
function add_student_answer_to_html(option) {
    var question = option.question;
    var answer = option.answer;
    if (question.type == "select_single") {
        add_select_student_answer_to_html(option);
    } else if (question.type == "select_muti") {
        add_muti_select_student_answer_to_html(option);
    } else if (question.type == "fill") {
        add_fill_student_answer_to_html(option);
    } else if (question.type == "table") {
        add_table_student_answer_to_html(option);
    } else if (question.type == "ques-answer") {
        add_qa_student_answer_to_html(option);
    }
}

function add_select_student_answer_to_html(option) {
    var answer_div = $("<div></div>");
    var a_div = $("<div></div>");
    var a = $("<a></a>");
    answer_div.addClass("student-answer");
    a.html("学生答案:");
    a.appendTo(answer_div);
    if(option.answer == undefined){
        a_div.html("学生未答题!")
    }else{
        a_div.html(option.answer.body.answer);
    }
    a_div.addClass("student-answer");
    a_div.appendTo(answer_div);
    answer_div.appendTo(option.position);
}

function add_muti_select_student_answer_to_html(option) {
    var answer_div = $("<div></div>");
    var a_div = $("<div></div>");
    var a = $("<a></a>");

    a.html("学生答案: ");
    a.appendTo(answer_div);
    if(option.answer == undefined){
        a_div.html("学生未答题!")
    }else{
        a_div.html(option.answer.body.answer);
    }
    a_div.addClass("student-answer");
    a_div.appendto(answer_div);

    answer_div.addClass("studnent-answer");
    answer_div.appendTo(option.position);
}

function add_fill_student_answer_to_html(option) {
    var qbody = option.position.find("h4").html();
    var answerBody;
    var answers = qbody.split("____");
    var item = option.position.find("h4");
    item.empty();
    if (option.answer != undefined){
        answerBody = option.answer.body;
    }else{
        answerBody = null;
    }

    for (i = 0; i < answers.length; i++) {
        item.append(answers[i]);
        if (i < answers.length - 1) {
            var u = $("<u></u>");
            var fillType = get_fill_type_from_question(option.question.Body, i);
            if (fillType == "not_auto") {
                u.addClass("notification");
                u.addClass("attention");
            } else {
                u.addClass("notification-no-border");
            }
            u.attr("questionType", fillType);
            u.addClass("correct-question");
            if(answerBody == null){
                u.html("___"+ "学生未提交答案" + "___");
            }else{
                u.html("___" + getanswer(answerBody, i) + "___");
            }
            u.attr("fillnumber", i);
            u.appendTo(item);
            var test = $("<div></div>");
            test.html("test");
            test.addClass("suspend");
            test.appendTo(u);
            test.hide();

            u.hover(function () {
                    $(this).find("div").show();
                },
                function () {
                    $(this).find("div").hide();
                });

            u.click(function () {
                var scores = get_score_from_scores(option.question.id, active_report.Questions)
                var score = get_fill_score($(this).attr("fillnumber"), scores);
                var main_page = $(this).parent().parent().parent();
                if ($(this).attr("class").indexOf("attention") != -1) {
                    $(this).removeClass("attention");
                    $(this).addClass("error");
                    var n = main_page.find(".answer_score").val();
                    if (n == null || n == "") {
                        main_page.find(".answer_score").val(score.score);
                    } else {
                        main_page.find(".answer_score").val(parseInt(n) - parseInt(score.score));
                    }
                } else if($(this).attr("class").indexOf("error") != -1) {
                    $(this).removeClass("error");
                    $(this).addClass("attention");

                    var n = main_page.find(".answer_score").val();
                    if (n == null || n == "") {
                        main_page.find(".answer_score").val(score.score);
                    } else {
                        main_page.find(".answer_score").val(parseInt(n) + parseInt(score.score));
                    }

                }
                modify_all_score(main_page.parent().parent());
            });
        }
    }
    getAnswer({
        questionId: option.question.id
    }, {
        rt_func: function (data) {
            item.find("u").each(function (index) {
                var scores = get_score_from_scores(option.question.id, active_report.Questions);
                var score = get_fill_score(index, scores)
                var it = $(this).children("div").html("正确答案:" + "<br/> <a id='correct-answer'>" + getanswer(data.answer.body, index) + "</a>" + "<br/>" + "分数：<a> " + "<br/>" + score.score + "</a>");
            });
        }
    });
}

//获取填空题每个空得判题类型
function get_fill_type_from_question(fills, number) {
    for (var i = 0; i < fills.length; i++) {
        if (parseInt(fills[i].number) == parseInt(number)) {
            return fills[i].type;
        }
    }
    return "";
}

//获取答案
function getanswer(answers, number) {
    for (var i = 0; i < answers.length; i++) {
        if (parseInt(answers[i].number) == parseInt(number))
            return answers[i].answer;
    }
    return "";
}

function add_qa_student_answer_to_html(option) {
    var answer_div = $("<div></div>");
    var a_div = $("<div></div>");
    var a = $("<a></a>");

    a.html("学生答案: ");
    a.appendTo(answer_div);
    if(option.answer != undefined){
        a_div.html(option.answer.body.answer);
    }else{
        a_div.html("学生未提交答案");
    }
    a_div.addClass("student-answer");
    a_div.appendTo(answer_div);

    answer_div.addClass("student-answer");
    answer_div.appendTo(option.position);
}

//添加正确答案到html
function add_answer_to_html(option) {
    var question = option.question;
    var answer = option.answer;
    if (question.type == "select_single") {
        add_select_answer_to_html(option);
    } else if (question.type == "select_muti") {
        add_muti_select_answer_to_html(option);
    } else if (question.type == "fill") {
        add_fill_answer_to_html(option);
    } else if (question.type == "table") {
        add_table_answer_to_html(option);
    } else if (question.type == "ques-answer") {
        add_qa_answer_to_html(option);
    }
}

function add_select_answer_to_html(option) {
    var answer_div = $("<div></div>");
    var item_a = $("<a></a>");
    answer_div.addClass("right-answer");
    item_a.html("答案:");
    answer_div.append(item_a);

    var a_div = $("<div></div>");
    a_div.html(option.answer.body.answer);
    a_div.appendTo(answer_div);
    a_div.attr("id", "correct-question");
    a_div.attr("questionType", "complite");
    answer_div.appendTo(option.position);
}

function add_muti_select_answer_to_html(option) {
    var answer_div = $("<div></div>");
    var item_a = $("<a></a>");
    answer_div.addClass("right-answer");
    item_a.html("答案:");
    answer_div.append(item_a);

    var a_div = $("<div></div>");
    a_div.html(option.answer.body.answer);
    a_div.appendTo(answer_div);
    a_div.addClass("correct-question");
    a_div.attr("questionType", "complite");
    answer_div.appendTo(option.position);
}

function add_fill_answer_to_html(option) {
    var qBody = option.position.find("h4").html();
}

function add_table_answer_to_html(option) {

}

function add_qa_answer_to_html(option) {
    var answer_div = $("<div></div>");
    var a = $("<a></a>")
    a.html("参考答案: ");
    a.appendTo(answer_div);
    answer_div.addClass("right-answer");
    var a_div = $("<div></div>");
    a_div.html(option.answer.body.answer);
    a_div.addClass("correct-question");
    a_div.appendTo(answer_div);
    answer_div.appendTo(option.position);
}

//添加问题到html
function add_question_to_html(option) {
    var question = option.question;
    if (question.type == "select_single") {
        add_select_to_html(option);
    } else if (question.type == "select_muti") {
        add_muti_select_to_html(option);
    } else if (question.type == "fill") {
        add_fill_to_html(option);
    } else if (question.type == "table") {
        add_table_to_html(option);
    } else if (question.type == "muti") {
        add_muti_to_html(option);
    } else if (question.type == "ques-answer") {
        add_qa_to_html(option);
    }
}

function add_muti_select_to_html(option) {
    var title = $("<h4></h4>");
    var target = option.position;
    var question = option.question;
    var option_div = $("<div></div>");
    title.html(question.title);
    target.unbind("click");
    for (var i = 0; i < 4; i++) {
        var t = $("<div></div>");
        var item_input = $("<input> </input>");

        item_input.addClass("muti-select");
        item_input.attr("type", "checkbox");
        item_input.attr("id", "select" + question.id + get_select_letter(i));
        item_input.attr("value", i);
        item_input.attr("select_status", "no")
        item_input.click(function () {
            if ($(this).attr("select_status") == "no") {
                $(this).attr("select_status", "yes");
                $(this).css("background", "darkgrey");
            } else {
                $(this).attr("select_status", "no");
                $(this).css("background", "white");
            }

        });
        t.html(get_select_option(question, i));
        item_input.appendTo(option_div);
        t.appendTo(option_div);
        if(question.Body["image_" + get_select_little_letter(i)] != undefined){
            var image_block = add_image_block("");
            image_block.show();
            image_block.find("img").attr("src", question.Body.image_q);
            image_block.appendTo(option_div);
        }
        if (option.status == "correct") {
            item_input.hide();
        }
    }
    title.appendTo(target);
    if(question.Body.image_q != undefined){ 
        var image_block = add_image_block("");
        image_block.show();
        image_block.find("img").attr("src", question.Body.image_q);
        image_block.appendTo(target);
    }
    option_div.appendTo(target);
    if(option.stu_answer == true){
        getMyAnswer({
            questionId:question.id
        }, {
            rt_func:function(data){
                for(var i = 0; i< data.answer.body.answer.length; i++){
                    target.find("input[id=select" +  question.id + data.answer.body.answer[i]  +"]").click();
                }
            }
        })
    }
}


function add_select_to_html(option) {
    var title = $("<h4></h4>");
    var target = option.position;
    var question = option.question;
    var option_div = $("<div></div>");
    option_div.addClass("select-option-block");
    title.html(question.title);
    target.unbind("click");
    for (var i = 0; i < 4; i++) {
        var t = $("<div></div");
        t.addClass("select-option");
        var item_input = $("<input></input>");
        item_input.attr("type", "radio");
        item_input.attr("id", "select" + question.id);
        item_input.attr("name", "select" + question.id);
        item_input.attr("value", i);
        t.html(get_select_option(question, i));
        item_input.appendTo(option_div);
        t.appendTo(option_div);
        if(question.Body["image_" + get_select_little_letter(i)] != undefined){
            var image_block = add_image_block("");
            image_block.show();
            image_block.find("img").attr("src", question.Body.image_q);
            image_block.appendTo(option_div);
        }
    }
    if (option.status == "correct")
        option_div.hide();
    title.appendTo(target);
    if(question.Body.image_q != undefined){
        var image_block = add_image_block("");
        image_block.show();
        image_block.find("img").attr("src", question.Body.image_q);
        image_block.appendTo(target);
    }
    option_div.appendTo(target);
    if(option.stu_answer == true){
        getMyAnswer({
            questionId:question.id
        },{rt_func:function(data){
            if(data.status == "SUCCESS"){
                target.find("input[value=" + get_select_number(data.answer.body.answer)  + "]").click();
            }
        }});
    }
}

function get_select_option(question, i) {
    if (i == 0)
        return question.Body.select_a;
    if (i == 1)
        return question.Body.select_b;
    if (i == 2)
        return question.Body.select_c;
    if (i == 3)
        return question.Body.select_d;
}

function get_select_little_letter(i) {
    if (i == 0)
        return "a";
    if (i == 1)
        return "b";
    if (i == 2)
        return "c";
    if (i == 3)
        return "d";
}

function get_select_number(i) {
    if (i == "A")
        return 0;
    if (i == "B")
        return 1;
    if (i == "C")
        return 2;
    if (i == "D")
        return 3;
}


function get_select_letter(i) {
    if (i == 0)
        return "A";
    if (i == 1)
        return "B";
    if (i == 2)
        return "C";
    if (i == 3)
        return "D";
}

function add_fill_to_html(option) {
    var question = option.question;
    var item_div = $("<div></div>");
    var title = $("<h4></h4>");
    option.position.unbind("click"),
    title.html(question.title);
    title.appendTo(item_div);
    if(question.Body[0].image != undefined){
        var image_block = add_image_block("");
        image_block.show();
        image_block.find("img").attr("src", question.Body[0].image);
        image_block.appendTo(item_div);
    }


    for (var i = 0; i < question.title.split("____").length - 1; i++) {
        var input_div = $("<div><div>");
        var input = $("<input></input>");
        input.css("width", "300px");
        input_div.html("填空" + (i + 1) + ":");
        input.attr("id", question.id + "&&" + i);
        input.addClass("fill-answer");
        input.appendTo(input_div);
        input_div.appendTo(item_div);
        if (option.status == "correct") {
            input_div.hide();
        }
    }
    item_div.appendTo(option.position);
    if(option.stu_answer == true){
        getMyAnswer({
            questionId :question.id
        },{
            rt_func:function(data){
                if(data.status =="SUCCESS"){
                    var answer = data.answer.body;
                    for (var i = 0; i < answer.length; i++){
                        option.position.find(".fill-answer").each(function(){
                            if($(this).attr("id") == question.id + "&&" + i){
                                $(this).val(answer[i].answer);
                            }
                        })
                    }
                }
            }
        });
    }
}

function add_muti_to_html(option) {
    var question = option.question;
    var item_div = $("<div></div>");
    var title = $("<h4></h4>");
    title.html(question.title);
    title.appendTo(item_div);
    if(question.Body[0].image != undefined){
        var image_block = add_image_block("");
        image_block.show();
        image_block.find("img").attr("src", question.Body[0].image);
        image_block.appendTo(item_div);
    }

    for (var i = 0; i < question.Body.length; i++) {
        var sub_div = $("<div></div>");
        sub_div.addClass("sub-muti-question");
        var title_div = $("<a></a>");
         
        title_div.html(option.position.children("a").html().split(":")[0]  + "."+  (i + 1));
        title_div.appendTo(sub_div);
        getQuestion({
            questionId: question.Body[i].questionId
        }, {
            rt_func: function (data) {
                if (data.status == "SUCCESS") {
                    sub_div.attr("id", data.question.id + "&&" + data.question.type);
                    if (data.question.type != "muti") {
                        sub_div.addClass("sub-question-answer");
                    }
                    if(option.stu_answer == true){
                        add_question_to_html({
                            question: data.question,
                            position: sub_div,
                            stu_answer:true
                        });
                    }else{
                         add_question_to_html({
                            question: data.question,
                            position: sub_div
                        });
                    }
                }
                sub_div.appendTo(item_div);
            }
        });
    }
    item_div.appendTo(option.position);
}
function add_qa_to_html(option) {
    var question = option.question;
    var item_div = $("<div></div>");
    var title = $("<h4></h4>");
    var input = $("<textarea></textarea>");
    input.css("width", "500px");
    option.position.unbind("click");
    title.html(question.title);
    title.appendTo(item_div);
    if(question.Body.image != undefined){
        var image_block = add_image_block("");
        image_block.show();
        image_block.find("img").attr("src", question.Body.image);
        image_block.appendTo(item_div);
    }
    input.attr("id", "fill" + "&&" + question.id);
    if (option.status == "correct") {
        input.hide();
    }
    input.appendTo(item_div);
    item_div.appendTo(option.position);
    if(option.stu_answer == true){
        getMyAnswer({
            questionId:question.id
        }, {
            rt_func:function(data){
                if(data.status == "SUCCESS"){
                    option.position.find("textarea").val(data.answer.body.answer)
                }
            }
        });
    }
}





function add_title_li_item(option) {
    var item = $("<li></li>");
    var item_a = $("<a></a>");
    if (option.class != undefined) {
        item.addClass(option.class);
    }
    item.attr("id", option.id);
    item_a.html("" + option.value);
    item_a.appendTo(item);
    return item;
}

function add_title_value_item(option) {
    var item_article = $("<article></article>");
    var item_div = $("<div></div>");
    var item_div2 = $("<div></div>");
    var item_sub_div = $("<div></div>");

    item_div.addClass("title");
    item_div.html(option.title);
    item_div.appendTo(item_article);

    item_div2.addClass("body");

    item_sub_div.addClass("onshow");
    item_sub_div.html(option.value);
    if(option.id != undefined){
        item_sub_div.attr("id", option.id);
    }
    item_sub_div.appendTo(item_div2);
    item_div2.appendTo(item_article);
    return item_article;
}


function add_title_input_item(option) {
    var item_article = $("<article></article>");
    var item_div = $("<div></div>");
    var item_div2 = $("<div></div>");
    var item_sub_div = $("<div></div>");
    var item_input = $("<input></input>");

    if (option.class != undefined) {
        item_article.addClass(option.class);
    }

    item_div.addClass("title");
    item_div.html(option.title);
    item_div.appendTo(item_article);

    item_div2.addClass("body");
    item_div2.addClass("edit");

    item_sub_div.addClass("onedit");
    item_input.attr("id", option.input_id);

    item_input.appendTo(item_sub_div);
    item_sub_div.appendTo(item_div2);
    item_div2.appendTo(item_article);
    return item_article;
}

function add_title_select_item(option) {
    var item_article = $("<article></article>");
    var item_div = $("<div></div>");
    var item_div2 = $("<div></div>");
    var item_sub_div = $("<div></div>");
    var item_select = $("<select></select>");

    if (option.class != undefined) {
        item_article.addClass(option.class);
    }

    item_div.addClass("title");
    item_div.html(option.title);
    item_div.appendTo(item_article);

    item_div2.addClass("body");
    item_div2.addClass("edit");

    item_sub_div.addClass("onedit");
    item_select.attr("id", option.select_id);
    var options = option.options;
    for (var i in option.options) {
        var item_option = $("<option></option>");
        item_option.html(options[i].name);
        if(options[i].value !=undefined){
            item_option.attr("value", options[i].value);}
        item_option.appendTo(item_select);
    }
    item_select.appendTo(item_sub_div);
    item_sub_div.appendTo(item_div2);
    item_div2.appendTo(item_article);
    return item_article;
}
function add_image_block(class_name){
    var item_div = $("<div></div>");
    item_div.attr("id", "image-block");
    item_div.addClass("image-show");
    item_div.addClass(class_name);
    item_div.append($("<img/>"));
    item_div.hide();
    return item_div;
}

function add_resourse_select(){
    var item_div = $("<div></div>");
    var item_ul = $("<ul></ul>");
    var item_li_a = $("<li></li>");
    //var item_li_b = $("<li></li>");

    item_div.html("添加资源");
    item_li_a.append($("<a></a>").html("添加图片"));
    item_li_a.ys_click_upload_file_init({
        upload_url:"/file/uploadimage",
        callback:function(data){
            active_block.find("#image-block").show();
           active_block.find("#image-block").find("img").attr("src", "/static/file/" + data.fillname);
        },
    });
    //item_li_b.append($("<a></a>").html("添加表格"));
    item_li_a.appendTo(item_ul);
    //item_li_b.appendTo(item_ul);

    item_ul.addClass("suspend");
    item_ul.appendTo(item_div);
    item_ul.hide();
    item_div.addClass("add-resource");
    item_div.addClass("active");
    item_div.hover(function(){
        $(this).children("ul").show();
    },function(){
        $(this).children("ul").hide();
    });

    return item_div;
}

function add_sub_select_question(target) {
    var item_section = $("<section></setction>");
    item_section.addClass("sub-question-block");
    item_section.append(add_title_input_item({
        title: "问题描述:",
        input_id: "sub-select-title",
        class: "sub-info"
    }));

    item_section.find("#sub-select-title").parent().append(add_resourse_select());
    item_section.find("#sub-select-title").parent().parent().parent().append(add_image_block("image-q"));

    item_section.append(add_title_select_item({
        title: "类型:",
        select_id: "sub-select-type",
        class: "sub-info",
        options: [{
            name: "单选题"
        }, {
            name: "多选题"
        }]
    }));
    item_section.append(add_title_input_item({
        title: "选项A:",
        class: "sub-info",
        input_id: "sub-select-a"
    }));
    item_section.find("#sub-select-a").parent().append(add_resourse_select());
    item_section.find("#sub-select-a").parent().parent().parent().append(add_image_block("image-a"));
    item_section.append(add_title_input_item({
        title: "选项B:",
        class: "sub-info",
        input_id: "sub-select-b"
    }));
    item_section.find("#sub-select-b").parent().append(add_resourse_select());
    item_section.find("#sub-select-b").parent().parent().parent().append(add_image_block("image-b"));
    item_section.append(add_title_input_item({
        title: "选项C:",
        class: "sub-info",
        input_id: "sub-select-c"
    }));
    item_section.find("#sub-select-c").parent().append(add_resourse_select());
    item_section.find("#sub-select-c").parent().parent().parent().append(add_image_block("image-c"));
    item_section.append(add_title_input_item({
        title: "选项D:",
        class: "sub-info",
        input_id: "sub-select-d"
    }));
    item_section.find("#sub-select-d").parent().append(add_resourse_select());
    item_section.find("#sub-select-d").parent().parent().parent().append(add_image_block("image-d"));
    item_section.append(add_title_input_item({
        title: "正确答案:",
        class: "sub-info",
        input_id: "sub-select-answer"
    }));
    item_section.append(add_title_input_item({
        title: "分数:",
        class: "sub-info",
        input_id: "sub-select-score"
    }));


    var item_button = $("<div></div>");
    item_button.addClass("button");
    item_button.html("提交子问题");
    item_button.click(function () {
        var item_block = $(this).parent();
        var type;
        var score;
        var flag = 0;
        $(this).parent().find(".onedit").children("input").each(function(){
            if($(this).val() == ""){
                $(this).addClass("error");
                flag = 1;
                $(this).focus(function(){
                    $(this).removeClass("error")
                });
            }
        });
        if(flag == 1){
            return;
        }
        if (item_block.find("#sub-select-type").val().trim(" ") == "多选题") {
            var result = item_block.find("#sub-select-score").val().split(",");
            score = JSON.stringify({
                correct: result[0],
                half: result[1]
            });
            type = "select_muti";
        } else {
            score = JSON.stringify({
                correct: item_block.find("#sub-select-score").val()
            });
            type = "select_single";
        }
        createQuestion({
            title: item_block.find("#sub-select-title").val(),
            parentId: 0,
            type: type,
            state: 1,
            body: JSON.stringify({
                image_q: item_block.find(".image-q img").attr("src"),
                image_a: item_block.find(".image-a img").attr("src"),
                image_b: item_block.find(".image-b img").attr("src"),
                image_c: item_block.find(".image-c img").attr("src"),
                image_d: item_block.find(".image-d img").attr("src"),
                select_a: "" + item_block.find("#sub-select-a").val(),
                select_b: "" + item_block.find("#sub-select-b").val(),
                select_c: "" + item_block.find("#sub-select-c").val(),
                select_d: "" + item_block.find("#sub-select-d").val()
            })
        }, {
            rt_func: function (data) {
                var question = data;
                if (data.status == "SUCCESS") {
                    createAnswer({
                        questionId: data.question.id,
                        body: JSON.stringify({
                            answer: item_block.find("sub-select-answer").val()
                        })
                    }, {
                        rt_func: function (data) {
                            if (data.status == "SUCCESS") {

                                $("#" + target).find("section").hide()
                                var item = $("<li></li>");
                                item.attr("id", score + "&&" + data.answer.questionId);
                                item.html("题号" + ($("#" + target).children("li").length + 1));
                                item.append(button_delete_li());
                                item.appendTo($("#" + target));
                            }
                        }
                    }); // end fo createAnswer 
                }
            } //end rt_func
        });

    });

    item_button.appendTo(item_section);
    item_section.append(add_cancel_button);
    item_section.appendTo($("#" + target));
}

function button_delete_li() {
    var delete_button = $("<div> </div>");
    delete_button.html("删除");
    delete_button.addClass("button");
    delete_button.click(function () {
        target = $(this).parent();
        main = target.parent();
        target.remove();
        main.children("li").each(function (index) {
            $(this).html("题号" + (index + 1));
            $(this).append(button_delete_li());
        })
    });
    return delete_button;
}

function add_cancel_button() {
    var cancel_button = $("<div></div>");
    cancel_button.addClass("button");
    cancel_button.html("取消");
    cancel_button.click(function () {
        $(this).parent().remove();
    });
    cancel_button.css("margin-left", "20px");
    return cancel_button;
}


function add_sub_fill_question(target) {
    var item_section = $("<section></section");
    item_section.addClass("sub-question-block");
    var item_fill_list = $("<div></div>");
    item_section.html("")
    item_section.append(add_title_input_item({
        title: "问题描述",
        class: "sub-info",
        input_id: "sub-fill-title"
    }));
    item_section.find("#sub-fill-title").parent().append(add_resourse_select());
    item_section.find("#sub-fill-title").parent().parent().parent().append(add_image_block("fill-image"));

    item_section.find("#sub-fill-title").keyup(function () {
        item_section.find(".sub-fill-answer").remove();
        var result = $(this).val().split("____");
        for (var i = 0; i < result.length - 1; i++) {
            var item = $("<div></div>");
            item.append(add_title_input_item({
                title: "空" + (i + 1) + "答案",
                class: "sub-info",
                input_id: "sub-fill-num-" + i
            }));

            item.append(add_title_input_item({
                title: "空" + (i + 1) + "分数",
                class: "sub-info",
                input_id: "sub-fill-score-" + i
            }));
            item.append(add_title_select_item({
                title: "",
                class: "sub-info",
                select_id: "sub-fill-type-" + i,
                options: [{
                    name: "完全判断"
                }, {
                    name: "范围判断"
                }, {
                    name: "多值判断"
                }, {
                    name: "公式判断"
                }, {
                    name: "手动判断"
                }]
            }));
            item.addClass("sub-fill-answer");
            item.appendTo(item_fill_list);
        }
    });
    item_fill_list.appendTo(item_section);
    var item_button = $("<div></div>");
    item_button.addClass("button");
    item_button.html("提交子问题");
    item_button.click(function () {
        var item_block = $(this).parent();

        var q_body = item_block.find("#sub-fill-title").val();
        var f_list = []; //question fill list
        var a_list = []; //answer fill list
        var s_list = []; //score fill list
        var image = item_block.find("#image-block img").attr("src");
        var flag = 0;
        item_block.find(".onedit").children("input").each(function(){
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
        for (var i = 0; i < q_body.split("____").length - 1; i++) {
            var item = {};
            var a_item = {};
            var s_item = {};
            a_item["answer"] = item_block.find("#sub-fill-num-" + i).val();
            a_item["number"] = i;
            s_item["score"] = item_block.find("#sub-fill-score-" + i).val();
            s_item["number"] = i;

            item["number"] = i;
            var type_fill = item_block.find("#sub-fill-type-" + i).val().trim(" ");
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
            item["image"]=image;
            a_list[i] = a_item;
            f_list[i] = item;
            s_list[i] = s_item;
        }
        createQuestion({
            type: "fill",
            state: 1,
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
                                $("#" + target).find("section").hide();
                                var item = $("<li></li>");
                                item.attr("id", JSON.stringify(s_list) + "&&" + data.answer.questionId);
                                item.html("题号" + ($("#" + target).children("li").length + 1));
                                item.append(button_delete_li());
                                item.appendTo($("#" + target));
                            }
                        }
                    });
                }
            }
        });
    });
    item_button.appendTo(item_section);
    item_section.append(add_cancel_button());
    item_section.appendTo($("#" + target));
}

function add_sub_ques_answer_question(target) {
    var item_section = $("<section></section>");
    item_section.addClass("sub-question-block");
    item_section.append(add_title_input_item({
        title: "题目描述",
        class: "sub-info",
        input_id: "sub-ques-answer-title"
    }));
    item_section.find("#sub-ques-answer-title").parent().append(add_resourse_select());
    item_section.find("#sub-ques-answer-title").parent().parent().parent().append(add_image_block(""));

    item_section.append(add_title_input_item({
        title: "参考答案",
        class: "sub-info",
        input_id: "sub-ques-answer-answer"
    }));
    item_section.append(add_title_input_item({
        title: "分数",
        class: "sub-info",
        input_id: "sub-ques-answer-score"
    }));

    var item_button = $("<div></div>");
    item_button.addClass("button");
    item_button.html("提交子问题");
    item_button.click(function () {
        var item_block = $(this).parent();
        var title = item_block.find("#sub-ques-answer-title").val();
        var answer = item_block.find("#sub-ques-answer-answer").val();
        var score = {
            correct: item_block.find("#sub-ques-answer-score").val()
        };
        var image = item_block.find("#image-block img").attr("src");
        var flag = 0;
        item_block.find(".onedit").children("input").each(function(){
            if($(this).val() == ""){
                $(this).addClass("error");
                flag = 1;
                $(this).focus(function(){
                    $(this).removeClass("error");
                });}
        });
        if(flag == 1){
            return ;
        }

        createQuestion({
            title: title,
            state: 1,
            parentId: 0,
            type: "ques-answer",
            body: JSON.stringify({
                test: "test",
                image:image
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
                                $("#" + target).find("section").hide();
                                var item = $("<li></li>");
                                item.attr("id", JSON.stringify(score) + "&&" + data.answer.questionId);
                                item.html("题号" + ($("#" + target).children("li").length + 1));
                                item.append(button_delete_li());
                                item.appendTo($("#" + target));
                            }
                        }
                    });
                }
            }
        });

    });
    item_button.appendTo(item_section);
    item_section.append(add_cancel_button());
    item_section.appendTo($("#" + target));
}


function add_sub_muti_question(target) {
    var item_section = $("<section> </section>");
    var myDate = new Date();
    var new_target = "sub-question-list" + myDate.getTime();
    item_section.addClass("sub-question-block");
    item_section.append(add_title_input_item({
        title: "子问题描述:",
        input_id: "sub_input_title"
    }));
    item_section.append($("<div></div>").addClass("").html("子问题列表:"));
    item_section.append($("<hr/>"));
    var qList = $("<ul></ul>");
    qList.attr("id", new_target);
    qList.appendTo(item_section);

    item_section.append($("<hr/>"));
    item_section.append(add_button_question_type(new_target));
    var item_button = $("<div></div>");
    item_button.addClass("button");
    item_button.html("提交");
    item_button.click(function () {
        var q_block = $(this).parent();
        var title = q_block.find("#sub_input_title").val();
        var q_body = [];
        var body = q_block.find("#" + new_target);
        var scores = [];

        for (var i = 0; i < body.children("li").length; i++) {
            var item_li = body.children("li")[i].id;
            q_body[i] = {
                questionId: item_li.split("&&")[1],
                number: i
            };
            scores[i] = {
                questionId: item_li.split("&&")[1],
                score: JSON.parse(item_li.split("&&")[0])
            };
        }
        createQuestion({
            title: title,
            state: 1,
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
                        }),
                    }, {
                        rt_func: function (data) {
                            $("#" + target).find("section").hide();
                            var item = $("<li></li>");
                            item.attr("id", JSON.stringify(scores) + "&&" + data.answer.questionId);
                            item.html("题号" + ($("#" + target).children("li").length + 1));
                            item.append(button_delete_li());
                            item.appendTo($("#" + target));
                        }
                    });
                }
            }
        })

    });
    item_section.append($("<hr/>"));
    item_button.appendTo(item_section);
    item_section.append(add_cancel_button());
    item_section.appendTo($("#" + target));

}

function add_button_question_type(target) {
    var item = $("<div></div>");
    item.addClass("title-button");
    item.addClass("active");
    item.html("添加子问题");

    var item_ul = $("<ul></ul>");
    item_ul.attr("id", "button-add-question");

    var li_select = $("<li></li>");
    li_select.html("选择题");
    li_select.appendTo(item_ul);
    li_select.click(function () {
        add_sub_select_question(target);
    });

    var li_fill = $("<li></li>");
    li_fill.html("填空题");
    li_fill.appendTo(item_ul);
    li_fill.click(function () {
        add_sub_fill_question(target);
    });

    var li_qs = $("<li></li>");
    li_qs.html("问答题");
    li_qs.appendTo(item_ul);
    li_qs.click(function () {
        add_sub_ques_answer_question(target);
    });

    var li_muti = $("<li></li>");
    li_muti.html("综合题");
    li_muti.appendTo(item_ul);
    li_muti.click(function () {
        add_sub_muti_question(target);
    });

    var li_table = $("<li></li>");
    li_table.html("填表题");
    li_table.appendTo(item_ul);
    li_table.click(function () {
        add_sub_table_question(target);
    });

    item_ul.hide();
    item_ul.appendTo(item);
    item.hover(function () {
        $(this).parent().find("#button-add-question").show();
    }, function () {
        $(this).parent().find("#button-add-question").hide();
    });
    return item;
}




//获取时间戳
function getTimeStamp(day) {
    re = /(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/.exec(day);
    return new Date(re[1], (re[2] || 1) - 1, re[3] || 1, re[4] || 0, re[5] || 0, re[6] || 0).getTime() / 1000;
}
//时间戳转换为时间
function unix_to_datetime(unix) {
    var time = new Date(parseInt(unix) * 1000);
    
    return time.toLocaleString()
}

function get_datetime_local(unix){
    var time = new Date(parseInt(unix) * 1000);
    return time.Format("yyyy-MM-ddThh:mm:ss");
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
