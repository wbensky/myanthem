
function createAnswer(option,func){
    value = {
        questionId:0,
        body:{},
        rightRole:JSON.stringify({"test": "test"})
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

    $.ys_ajax({url: "/answer/create",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,	
        rt_func:op.rt_func 
    });
}

function getAnswer(option,func){
    value = {
        questionId:0,
        answerId:0
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

    $.ys_ajax({url: "/answer/get",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,	
        rt_func:op.rt_func 
    });
}


function deleteAnswer(option,func){
    value = {
        questionId:0,
        answerId:0
    };

    op = { 
        err_occur:function(){return true},
        rt_func:function(data){}
    };
    for(key in option){
        value[key] = option[key];
    }

    for(key in func){
        op[key] = option[key];
    } 

    $.ys_ajax({url: "/answer/delete",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,	
        rt_func:op.rt_func 
    });
}


