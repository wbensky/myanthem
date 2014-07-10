var v_main_menu = {'m-teacher':{'实验管理':'t-exp',
                                '学生管理':'t-stu',
                                '账户':'account'}
                  };


//退出时，切换到登陆页
function f_logout(){
    window.location.href="login.html";
}

var v_sub_menu = {
    't-exp': {'实验列表':'t-exp-list',
              '创建新实验':'t-exp-create'},
    't-exp-show':{  '模拟电路实验':null,
                    '实验报告':'t-exp-report',
                    '批改':'t-exp-judge',
                    '试验状态':'t-exp-status'
                    },
    'account': {'用户信息':'user-info',
                '登出':f_logout},
    'hello': {'哈哈':'hello'}
};

var page_init_func_set = {
    't-exp-list': function(){
        $('#main-page-t-exp-list .info-list').click(function(){
            f_load_sub_menu('t-exp-show');
        });
        //load explist of teacher
    },
    't-exp-create': function(){
        //ready exp create for teacher
    },
    't-exp-report': function(){
        
    }
};

active_theme = theme_hope;

function f_cmd_link(){
    
}

$(document).ready(function(){
    $.var_init();
    active_theme.fit();
    f_page_resize();
    f_load_main_menu('m-teacher'); 
});