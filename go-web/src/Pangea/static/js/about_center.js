
$(document).ready(function(){
    init_left_menu();
    init_left_menu_click();
    add_pop_button_login();
    var sub_menu = $.cookie("sub_menu");
    if(sub_menu == null){
        $(".sub-page-content .content .left ul").find("li")[0].click();
    }else{
        $(".sub-page-content .content .left ul").find("li").each(function(){
            if($(this).attr("target") == sub_menu)
                $(this).click();
        });
        $.cookie("sub_menu", "", {expires : -1});
    }

});


function init_left_menu(){
    var target = $(".sub-page-content .content .left ul");
    for( var i = 0; i < map_nav["about-center"].length; i++) {
        var item_b = $("<b></b>");
        var item_li = $("<li></li>");
        item_li.attr("target", map_nav_link["about-center"][i]);
        item_b.html(map_nav["about-center"][i]);
        item_li.append(item_b);
        item_li.appendTo(target);
    }
}

function init_left_menu_click(){
    var target = $(".sub-page-content .content .left ul");
    target.children("li").click(function(){
        var title = $(this).children("b").html()
        link = $(this).attr("target");
        $(".sub-page-content .content .right .title h4").html(title);
        $(".sub-page-content .content .right .content").empty();
        about_center_menu_function[link]();
    });
}


var about_center_menu_function= {
        "general":function(){
            var target = $(".sub-page-content .content .right .content");
            target.empty();
            target.html(general_html);
        },
        "instruction":function(){
            var target = $(".sub-page-content .content .right .content");
            target.empty();
            var item_img = $("<img/>");
            item_img.addClass("only-image");
            item_img.attr("src","/img/about-center-instruction.jpeg");
            item_img.appendTo(target);
        },
        "target":function(){
            var target = $(".sub-page-content .content .right .content");
            target.empty();
            var item_div = $("<div></div>").addClass("only-text");
            item_div.html(target_html);
            target.append(item_div);
        },
        "plan":function(){
            var target = $(".sub-page-content .content .right .content");
            target.empty();
            target.html(plan_html);
        },
        "teacher":function(){
            $.ys_ajax({
                url:"/employee/list",
                datatype:"JSON",
                type:"POST",
                rt_func:function(data){
                    init_teacher_list(data.employees);
                },
            });
        },
        "lesson":function(){
            var data_list = [
                "理论教学体系",
                "实践教学体系"
                ];
            var data_id = [
                "theory",
                "practice",
                ];
            var item_table = init_right_list_without_time(data_list, data_id);
            item_table.find("td").click(function(){
                about_center_menu_function["show"]($(this).attr("id"));
            });
        },
        "show":function(id){
            var target = $(".sub-page-content .content .right .content");
            target.empty();
            var item_img = $("<img/>");
            item_img.addClass("only-image");
            item_img.attr("src","/img/about-center-"+ id + ".jpg");
            item_img.appendTo(target);
            target.append($("<hr>").css("margin", "10px 0"));
            target.append($("<div></div>").addClass("button").html("返回").click(function(){
                about_center_menu_function["lesson"]();
            }));
        },
        "harvest":function(){
            target = $(".main-content .sub-page-content .right .content");
            target.empty();
            var item_table = init_harvest_list(teach_harvest);
            item_table.find("td").click(function(){
                about_center_menu_function["about-center-teach-harvest-detail"]($(this).attr("id"));
            });
        },
        "about-center-scin-detail":function(type){
            var title = $(".main-content .sub-page-content .right .title");
            title.find("h4").html(teach_harvest[type - 20].title);
            var target = $(".main-content .sub-page-content .right .content");
            target.empty();

            $("<hr>").css("margin", "10px 0").appendTo(target);
            var pop = $("#pop-window-add-table");
            pop.find(".content").attr("type_id", type);
            var sub_title_length = sr_harvest[type-20].sub_title.length;
            for(var i = 1; i < 7; i++){
                if(i < sub_title_length + 1){
                    pop.find("#c" + (i)) .find(".title").html(sr_harvest[type-20].sub_title[i - 1]);
                }else{
                    pop.find("#c" + i).hide();
                }
            }
            $.ys_ajax({
                url:"/table/list",
                type:"POST",
                datatype:"JSON",
                data:{
                    type:type,
                },
                rt_func:function(data){
                    var item_table = init_harvest_detail_list_no_func(data.tables, type);
                    $("<hr>").css("margin", "10px 0").appendTo(target);
                    var item_button_back = add_button_to_html({target:target, title:"返回"});
                    item_button_back.click(function(){
                        about_center_menu_function["scientific"]();
                    });
                }
            });

        },
        "about-center-teach-harvest-detail":function(type){

            var title = $(".main-content .sub-page-content .right .title");
            title.find("h4").html(teach_harvest[type-1].title);
            var target = $(".main-content .sub-page-content .right .content");
            target.empty();

            $("<hr>").css("margin", "10px 0").appendTo(target);
            var pop = $("#pop-window-add-table");
            pop.find(".content").attr("type_id", type);
            var sub_title_length = teach_harvest[type-1].sub_title.length;
            for(var i = 1; i < 7; i++){
                if(i < sub_title_length + 1){
                    pop.find("#c" + (i)) .find(".title").html(teach_harvest[type-1].sub_title[i - 1]);
                }else{
                    pop.find("#c" + i).hide();
                }
            }
            $.ys_ajax({
                url:"/table/list",
                type:"POST",
                datatype:"JSON",
                data:{
                    type:type,
                },
                rt_func:function(data){
                    var item_table = init_harvest_detail_list_no_func(data.tables, type);
                    $("<hr>").css("margin", "10px 0").appendTo(target);
                    var item_button_back = add_button_to_html({target:target, title:"返回"});
                    item_button_back.click(function(){
                        about_center_menu_function["harvest"]();
                    });
                }
            });
        },
        "around":function(){
            var target = $(".sub-page-content .content .right .content") ;
            target.empty();
            target.html(around_html);
        },
        "scientific":function(){
            target = $(".main-content .sub-page-content .right .content");
            target.empty();
            var item_table = init_harvest_list(sr_harvest);
            item_table.find("td").click(function(){
                about_center_menu_function["about-center-scin-detail"]($(this).attr("id"));
            });
        },
        "video":function(){},
       };

function add_pop_button_login(){
    var item_button = $("<button></button>").attr("id", "pop-button-login").hide();
    item_button.ys_pop_window({
        index:"102",
        target:$("#pop-window-login")});

    $("body").append(item_button);
}


var general_html= '<div class="only-text"><br>                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;青岛大学是山东省重点建设的综合性大学，是我国首批合并办学的院校之一，是一所朝气蓬勃、充满活力的大学。青岛大学电工电子实验教学中心在教学改革中应运而生，是中央与地方共建高校基础实验室、山东省高等学校实验教学示范中心。中心的建设定位是：创建一流的实验教学示范中心，担负起培养厚基础、宽口径、结构优、素质强的应用型、适应型、创新型人才的重任。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;自2002年开始重点建设以来，先后投资1667万元，建成面积近4000平方米的现代化实验教学中心；每年面向全校8个学院、27个专业、近5000名学生开设12门理论课程、17门实验课程；可开设各层次实验项目200多个，年实验人时数达25万以上。作为山东省高等学校基础课实验教学示范中心电工电子学科组主任单位，主持制订了《山东省电工电子实验教学示范中心建设标准》，主持编写了山东省高等学校电工电子新体系立体化系列实验教材。2005年6月，山东省教育厅在青岛大学召开山东省高校基础课实验教学示范中心建设经验现场交流会，代表们一致认为：青岛大学电工电子实验教学中心对山东省基础课实验教学示范中心的建设有很强的示范作用。 <br>一、实验教学 <br>1．教学理念与改革思路 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;学校秉承“博学笃志，明德求真，守正出奇”的校训，以培养适应型、创新型、国际化人才为目标，坚持科学教育与人文教育相互融合，注重创新精神和实践能力培养，促进学生思想道德素质、科学文化素质、身心健康素质协调发展，构建通识教育基础上的宽口径专业教育人才培养模式。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;根据学校人才培养定位，电工电子实验教学中心坚持理论与实践并重，能力培养与素质提高并行，课程实验与工程训练、创新设计、科学研究有机结合，创造以学生为本的人文环境，坚持把知识传授、能力提高、素质培养贯穿于实验教学始终的教学理念，在建设一流的实验条件和环境的基础上，在教学体系、管理体制、运行机制等方面进行大胆改革与创新，实行开放式教学，着力培养学生的创新精神和实践能力。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;具体改革思路是：以培养学生创新精神和实践能力为主线，坚持“三个结合”，实现“三个转变”，坚持实践教学与理论教学相结合，工程训练与课程实验相结合，创新实验与科学研究相结合；实现由基础验证向综合应用转变，由规定性实验向自主性实验转变，由传统型实验向开放型实验转变。创建国内一流的实验教学环境，全面提高实践教学质量，培养应用型、适应型、创新型人才。 <br>2．教学体系与教学内容&nbsp;&nbsp; <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结合电子学科自身特点，将理论课程和实验课程统筹安排，构建了实验与理论互通的实验教学体系，该体系包括模块化的实验课程、分层次的实验内容、多样化的培养模式、现代化的实验手段、多元化的教学方法和完善的考核方式等内容。 <br>◆模块化的实验课程：教学体系按电工、电子、计算机应用、工程训练、综合创新五个模块设置。 <br>◆分层次设置的实验内容：将实验内容分层设置，由基础验证、综合设计和创新研究三个层次构成，其中综合设计、创新研究性实验占80%以上。实验内容的设置体现了基础与前沿、经典与现代的结合，体现了与科研、工程、社会应用结合，推动了实验教学与理论教学之间、各门实验课程内容之间的合理衔接。 <br>◆多样化的培养模式：以“发展个性、因材施教”为基本原则，以“分层培养、启发创新”为基本教学思路，创建多样化的培养模式。 <br>保证大面积成才；促进优秀生拔尖生脱颖而出。创新实验室对学有余力的学生开放，聘请校内外相关学科的高水平教师担任导师，为优秀学生的脱颖而出创造良好的环境。 <br>◆现代化的实验手段：淡化软件实验与硬件实验的界限，软、硬件结合；所有实验课程全部采用多媒体教学，所有教学课件均为教师自行研制；充分利用网络技术开通网络课堂和教学论坛，采用网上预约、网上预习、网上在线实验等方式，消除了空间和时间障碍，实现了教与学、师与生的良好互动。 <br>◆多元化的教学方法：基础型实验教学主要采取教师在实验现场授课和指导实验的教学方法；综合设计型实验教学实行开放式自主实践教学方式；创新研究型实验教学主要采取研究式教学方式。不同层次的实验教学形成了多元化的教学模式。 <br>◆完善的考核方式：基础性实验考核的主要依据是实验预习与报告、实验操作、实验考试；综合设计性实验考核的主要依据是选题的合理性和难度、设计方案的完整性、合理性与经济性，仿真优化的正确性、硬件制作、测试结果和设计报告等；创新研究性实验的考核主要与项目作品、论文、答辩情况以及竞赛结果结合。通过综合问卷、跟踪调查、网上反馈、师生座谈四种质量监控方式对实验教学效果进行客观评价，不断提高实验教学的质量。 <br>二、条件建设 <br>1．整体规划 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;按基础常规、综合应用、创新研究三个层次建设实验平台和电工电子工程训练实验室。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基础常规实验平台建设包括：电路基础实验室、电子技术实验室、电工技术实验室、EDA和DSP实验室、计算机应用实验室、信号与控制实验室；建设目标为：实验全部实现单人单组，通过&nbsp;常规实验的训练，使学生掌握基本实验理论、基本实验方法和基本实验技能。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;综合应用实验平台建设包括：嵌入式实验室、电气控制实验室、应用电子实验室；目标是建设不同侧重点的综合实验室，培养学生对所学知识的综合应用能力。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创新研究实验平台建设包括：电子创新实验室和电子综合实验室；目的是为动手能力较强的学生进行创新设计提供较完备的实验设备和开放的实验环境，培养学生的创新思维，激发发明创造的潜能。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工程训练是培养学生基本工程素质、提高工程实践能力、培养高素质应用型人才的重要手段。通过建设电气工程训练实验室和电子工程训练实验室，营造了一个与我国电工电子制造业接轨的工程实习环境。学生还可以利用该平台进行创新设计，完成创新实验项目，进行电子创新设计的工艺操作。 <br>分步实施 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;青岛大学电工电子实验教学中心共经历了三个建设阶段： <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第一阶段：启动阶段。2002年3月，学校决定建设面向全校的电工电子实验教学中心，制定了建设目标、建设规划和分步实施方案。建立了比较完整的管理制度，整合相关学院的电工电子类实验室，初步建成了基础实验平台。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第二阶段：全面建设阶段。建成了基础平台、综合应用平台和创新研究平台。2004年，立项建设“中央与地方共建高校基础实验室”，2005年建成山东省高等学校实验教学示范中心。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第三阶段：全面提高阶段。充分发挥实验教学中心的示范和辐射作用，以软件建设为重点，不断完善管理制度，提高教学管理水平和实验教学质量；进一步优化实验教学环境，建成国内一流的电工电子实验教学平台。 <br>自制设备 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中心自行设计的数字电路实验箱等仪器设备，自行研制并运行指纹式实验室管理系统，视频教学、监控系统、网络信息管理系统不仅满足了开放式实验教学的要求，而且节约了大量资金。 <br>校企共建 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中心与西门子公司、欧姆龙公司、美国微芯公司、固纬公司等共建了联合实验室，开拓了实验室建设的新途径，提升了合作层次，节约了建设资金，推动了教学改革和实验室建设的进度。 <br>三、师资队伍 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;电工电子实验教学中心建设了一支结构合理、爱岗敬业、勇于创新的师资队伍。 <br>实验与理论教学队伍互通，教学、实验兼容 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;100%的理论教师参加实验课程的教学，并承担实验课程建设任务； <br>核心骨干稳定，梯队结构合理 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共有专职教师31人，&nbsp;每个课程系列都有课程负责人，有相对稳定的理论与实验教学队伍。 <br>专兼职教师结合，以科研提升教学 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;将与本中心实验教学相关学科的教学科研骨干聘为中心兼职教师，承担部分教学实验任务，带动了中心教学科研水平的整体提高。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中心鼓励实验教学人员提高学历层次，进行学术交流，参加各种培训。目前，已有100多人次参加了各种学术交流和培训。 <br>团队精神 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;勤奋、敬业、奉献、创新是这个优秀团队的精神。中心先后获得山东省师德先进集体、山东省巾帼文明示范岗等诸多荣誉。 <br>四、管理模式 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中心实行校、院两级管理和中心主任负责制，人、财、物统一管理和调配，实现了资源共享。中心建有完善的实验室管理制度和考核体系，实现了规范化、科学化管理。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中心不断加强网络化实验教学和实验室管理信息平台建设，建立了教学网站，集成了师资信息查询、网络选课、教学论坛、实验室管理、设备管理、实验开放管理及教学效果反馈等多项功能，实现了网上教学资源的共享。中心实验室实行开放运行机制：实验资源向全校师生开放，部分实验室面向社会开放；师生可按照预约时间进入实验室进行实验或研究。为保证实验室的有效开放，制定了开放管理细则，研制了指纹式开放管理系统，安装了实验监控系统。学校为中心配套运行经费，出台优惠政策扶持中心发展。 <br>五、成果丰硕 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;电工电子实验教学中心围绕教学观念、课程体系、教学内容、实验手段等内容对实验教学体系建设进行了不间断的探索，取得了丰硕成果： <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中心教师共主持和参与国家级教学科研项目13项、省部级教学科研项目22项，出版教材12本，发表教研、科研论文160余篇；其中SCI、EI、ISTP收录37篇。一部教材获全国普通高等学校优秀教材二等奖，获省级教学科研成果奖励12项。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;主持制订了《山东省电工电子实验教学示范中心建设标准》；主持编写了山东省高等学校电工电子新体系立体化系列实验教材；建成3门省级精品课程，5门校级精品课程；所有课程均建成网络课程。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中心教师指导的学生作品在全国大学生竞赛中获特等奖1项、一等奖1项、二等奖4项。&nbsp; <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;教育部领导及全国一百多所高校的领导和专家先后前来中心视察、参观、指导工作。中央与地方共建实验室考评专家对电工电子实验中心建设的评价是：精心设计，严格管理，成效卓著，堪称典范。 <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;遵循“先进性、开放性、共享性、示范性”原则，以知识、能力、素质全面协调发展的教育理念和以能力培养为核心的教学观念为先导，青岛大学电工电子实验教学中心形成了鲜明的特色：工程训练与课程实验、创新设计有机结合，理论与实验互通并重，实验训练平台规模化、集约化、现代化，管理系统网络化、智能化。</div>'

var target_html = " <br>&nbsp &nbsp &nbsp &nbsp 以本科教学为主体，以知识、能力、素质全面协调发展的教育理念和以能力培养为核心的教学观念为先导，全面落实“以学生为本”的办学理念，建设理论与实践并重、能力培养与素质提高并行的教学体系，建设教学实验兼容、核心骨干稳定、层次结构合理的师资队伍，建设规模化、现代化、开放型、共享型的实验教学环境，建立现代、高效的运行管理机制。培养学科基础厚，专业口径宽，知识结构优、工程素质强的复合型、应用型人才。建成国内一流的实验教学示范中心。" 

var plan_html = '<div class="only-text"><br>&nbsp;&nbsp;&nbsp; 根据《高等学校基础课实验示范中心的建设标准》，紧密结合电工电子教学实践改革，遵循“先进性、开放性、共享性”的建设原则，在教育理念、师资队伍、教学体系、实验条件、管理体制等诸方面制订整体规划与分步实施措施。&nbsp;<br>&nbsp;&nbsp;&nbsp; 1、教育理念：在实验室的建设中注重建立先进的教育理念和教学指导思想，特别注重理论教学与实验实践教学统筹协调的理念，将理论教学与实践教学有机结合。在理论教学与实践教学中以创新为灵魂，以能力培养为主线，中心实验室是创新的源头，也是创新的基地。&nbsp;<br>&nbsp;&nbsp;&nbsp; 2、师资队伍：重视基础理论与实验教学队伍建设，制定相应的政策，采取有效的措施，建设实验与理论教学队伍互通，教学、实验兼容，核心骨干稳定，结构合理的基础理论与实验教学团队。采取重点引进和自我培养的方针，建成一支职称、年龄、学历结构合理，基础扎实、教学水平高、研究方向明显的师资队伍。&nbsp;<br>&nbsp;&nbsp;&nbsp; 3、课程体系：根据培养新世纪创新型科技人才的要求，按照大基础的概念对实验教学体系、实验课程内容、教学方法和教学手段等方面进行了全方位的改革，建设理论与实践内容一致的理论教学体系和实验教学体系。&nbsp;<br>&nbsp;&nbsp;&nbsp; 4、实验条件：实验仪器、实验设备、实验室环境是实验教学的重要条件，改善充实实验设备，优化实验室环境，为学生营造良好的实验氛围。仪器设备配置具有一定的前瞻性，品质精良，组合优化，数量充足，满足设计性、综合性、研究性等现代实验教学的要求。适应开放管理和学生自主学习的需要。建立一个面向理工科的高性能、高标准、国内一流的实验中心&nbsp;，为基础实验教学、综合实验教学、创新实验教学提供可靠保证。分三个层次建设实验平台：基础常规实验平台，综合应用实验平台，创新研究实验平台。&nbsp;<br>&nbsp;&nbsp;&nbsp; 5、实验模式：&nbsp;实验教学的改革是“示范中心建设标准”的核心。改革实验教学体系，创建多目标、多层次、适应学生能力培养、推进学生自主学习，合作学习，研究性学习的实验教学模式。&nbsp;<br>&nbsp;&nbsp;&nbsp; 6、管理体制：理顺实验教学中心的管理体制，实行中心主任负责制，统筹安排、调配、使用实验教学资源和相关教育资源，实现优质资源共享。建立实验教学的科学评价机制，引导教师积极改革创新。建立实验教学开放运行的政策、经费、人事等保障机制，完善实验教学质量保证体系。&nbsp;“中心”的管理做到“规范化、规模化、中心化、网络化”。依据《标准》制定有关政策和一整套管理规章制度，使实验室管理更加科学。&nbsp; <br></div>';

var around_html = '<div class = "only-text"><strong>中心特色</strong><br>  &nbsp  &nbsp  &nbsp  &nbsp 遵循“先进性、开放性、共享性”原则，以人为本，以知识、能力、素质全面协调发展的教育理念和以能力培养为核心的教学观念为先导，青岛大学电工电子实验教学中心形成了课程实验、工程训练与创新设计有机结合，理论与实验互通并重，实验训练平台规模化、集约化、现代化的鲜明特色。<br><strong>一、课程实验、工程训练与创新设计有机结合</strong><br>   &nbsp  &nbsp  &nbsp  &nbsp 重视工程训练与创新设计实验室的建设，建成了电气工程训练、电子工程训练及创新设计实验室；在强化基础实验的同时，营造了一个与我国电工电子制造业接轨的工业工程实际环境,让学生了解现代制造业的生产方式和工艺流程，从而掌握工程操作技能。在课程实验、工程训练与创新设计框架内，强化校内外、课内外教学的有机结合。加强课内实验教学，增加综合性、创新性实验，不断开发具有创意的新的实验项目；建立大学生科技创新实验基地及校外教学基地，形成了课内与课外互补、实践教学与理论教学互补的人才培养模式。<br><strong>二、实验与理论互通并重</strong><br>  &nbsp  &nbsp  &nbsp  &nbsp 实验与理论并重的教学观念。淡化理论教学与实验教学的界限，建立了互通的实验教学与理论教学体系。实现理论教学与实验教学有机结合；实验教学与理论教学并重，将实验教学作为理论教学的延伸；将实验教学的目标提升为提高学生的实践能力、培养学生的创新精神。 实验与理论互通的师资队伍。培养了一支实验与理论教学互通、教学与实验兼容、核心骨干稳定、梯队结构合理的教学团队。实验与理论并重的教材建设。加强教材建设，主持编写并相继出版了山东省高等学校电工电子新体系立体化系列实验教材,能够满足和适应不同学科专业、不同教学内容的要求，被许多高校采用。<br><strong>三、实验训练平台规模化、现代化，开放性、共享性、示范性</strong><br>   &nbsp  &nbsp  &nbsp  &nbsp  中心拥有面积近4000平方米，配置了现代化的仪器设备，仪器设备值近1400万元，每年面向近5000学生开设电工电子类课程实验。所有课程建成网络课程，所有实验室采用多媒体教学课件进行实验教学；中心建立了实验教学管理网站，实现了设备管理、实验预约、实验预习、在线实验的网络化管理；实验室实现开放式管理，提高了设备利用率，实现了资源共享，形成了开放式管理模式。作为“山东省电工电子实验教学示范中心”学科组主任单位，中心主持制订了《山东省电工电子实验教学示范中心建设标准》。财政部专家、教育部领导及全国一百多所高校的领导和专家先后前来参观、指导工作。山东省高校基础课实验教学示范中心建设经验交流会在此召开，参会专家认为：青岛大学电工电子实验教学中心对山东省基础课实验教学示范中心的建设有很强的示范作用。<br><strong>辐射作用</strong><br>&nbsp  &nbsp  &nbsp  &nbsp 先后有全国百余所院校的领导、专家和同行前来参观、考察和指导，给予很高评价，认为对实验中心的建设具有很好的示范作用。先后有人民大学、同济大学、南京大学、宁夏大学、北京理工大学、贵州大学、中国传媒大学、燕山大学、北京科技大学、南京理工大学、中国矿业大学、西安交通济大学、天津大学、中国政法大学、新疆大学、南昌大学、内蒙古大学、河海大学、杭州电子科大、厦门理工学院等院校的专家到中心参观指导。2005年6月，山东省教育厅在青岛大学召开山东省高校基础课实验教学示范中心建设经验交流会，全省20余所高校的部分校领导、负责基础课实验教学示范中心建设的主管部门负责人、在建的省级实验教学示范中心的负责人共100多人前来参观，给予高度评价，认为：青岛大学电工电子实验教学中心对山东省实验教学示范中心的建设具有很强的示范作用。山东教育电视台当天作为头条新闻播出。对青岛大学其它实验中心的建设具有直接的示范作用。中心的教改理念和教改实践带动了整个学校基础课程的改革；广大教师的教学观念、教学方法及知识结构产生了很大变化。中心引进的许多先进硬件设备和软件，提升了学校教学与科研的技术含量，对实验课教师的科研起到了促进作用。近年来，青岛大学同时建设的6个基础课实验教学中心，以电工电子实验教学中心建设的成功经验为参考，进展迅速。</div>'

