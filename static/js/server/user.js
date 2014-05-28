//登陆  option传入的为用户名和密码, func传入的为错误处理函数和回调函数
function login(option,func){
    value = {
        username:"",
        password:""
    };

    op = {
        err_occur:function(){return true},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }

    for(key in func){
        op[key] = func[key];
    }

    $.ys_ajax({url: "/user/login",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });

}
//注册： option传入的为用户信息, func 传入的错误处理函数和回调函数
function register(option, func ){
    value = {
        username:"",
        password:"",
        role:"student",
        idnumber:""
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key]; 
    } 

    $.ys_ajax({url: "/user/register",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,	
        rt_func:op.rt_func 
    });

}

function createTeacher(option, func ){
    value = {
        number:"",
        name:"",
        job_title:"",
        email:"",
        telphone:"",
        sex:""
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key]; 
    } 
    $.ys_ajax({url: "/user/createteacher",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}


function createStudent(option, func ){
    value = {
        number:"",
        name:"",
        grade:"",
        class:"",
        major:""
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key]; 
    } 
    $.ys_ajax({url: "/user/createstudent",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}

function getStudent(option, func ){
    value = {
        studentId:"",
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key];
    }
    $.ys_ajax({url: "/user/getstudent",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}

function getStudentByNumber(option, func ){
    value = {
        number:"",
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key];
    }
    $.ys_ajax({url: "/user/getstudentbynumber",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}



function getStudentList(option, func ){
    value = {
        grade:"",
        class:"",
        major:""
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key]; 
    }
    $.ys_ajax({url: "/user/studentlist",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}


function getGradeList(option, func ){
    value = {
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key];
    }
    $.ys_ajax({url: "/user/gradelist",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}


function getClassList(option, func ){
    value = {
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key]; 
    } 
    $.ys_ajax({url: "/user/classlist",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}


function getMajorListFromUser(option, func ){
    value = {
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key];
    }
    $.ys_ajax({url: "/user/majorlist",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}




//用户信息修改
function userModifyPassword(option, func){
    value = {
        password:""
    };
    op = {
        err_occur:function() {return true},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key]
    }
    for(key in func){
        op[key] = func[key]
    }

    $.ys_ajax({url:"/user/modifypassword",
        type:"POST" ,
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    })

}
//获取用户信息  需要传入处理用户的信息的回调函数
function getUserInfo(func){
    op = {
        rt_func :function(data){}
    };

    for(key in func){
        op[key] = func[key];
    }
    $.ys_ajax({
        url :"/user/get",
        type:"GET",
        data:{},
        datatype:"json",
        rt_func:op.rt_func
    });
}
// 登出
function logout(){
    $.ys_ajax({
        url:"/user/logout",
    type:"POST",
    data:{},
    datatype:"json",
    });
}
function modifyTeacherInfoById(option, func){
  value = {
        number:"",
        name:"",
        email:"",
        sex:"",
        job_title:"",
        telphone:""
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key];
    }
    $.ys_ajax({url: "/user/modifyteacherinfobyid",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}


function modifyTeacherInfo(option, func){
  value = {
        number:"",
        name:"",
        email:"",
        sex:"",
        job_title:"",
        telphone:""
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key];
    }
    $.ys_ajax({url: "/user/modifyteacherinfo",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}

function modifyPasswordByIdTeacher(option, func){
  value = {
        id:"",
        password:""
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key];
    }
    $.ys_ajax({url: "/user/mpbyidteacher",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}


function modifyPasswordByIdStudent(option, func){
  value = {
        id:"",
        password:""
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key];
    }
    $.ys_ajax({url: "/user/mpbyidstudent",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}


function modifyStuInfo(option, func){
  value = {
        number:"",
        name:"",
        username:"",
        grade:"",
        class:"sfsdf",
        id:"",
        major:""
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key];
    }
    $.ys_ajax({url: "/user/modifystuinfo",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}

function getTeacherList(option, func ){
    value = {
        number:"",
        name:"",
        jobTitle:""
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key];
    }
    $.ys_ajax({url: "/user/teacherlist",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}


function getTeacher(option, func ){
    value = {
        number:"",
    };
    op = {
        err_occur:function(){return true;},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }
    for(key in func){
        op[key] = func[key];
    }
    $.ys_ajax({url: "/user/getteacher",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}


