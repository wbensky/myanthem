
function createScore(option,func){
    value = {
        questionId:0,
        snapId:0,
        score: 0,
        studentId:0,
        status:0
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

    $.ys_ajax({url: "/score/create",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}

function getScore(option,func){
    value = {
        questionId:0,
        snapId:0,
        studentId:0,
        status:""
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

    $.ys_ajax({url: "/score/get",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}

