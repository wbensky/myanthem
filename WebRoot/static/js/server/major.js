
function getMajor(option,func){
    value = {
        major_id:""
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

    $.ys_ajax({url: "/major/get",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,	
        rt_func:op.rt_func 
    });
}



function createMajor(option,func){
    value = {
        name:""
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

    $.ys_ajax({url: "/major/create",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,	
        rt_func:op.rt_func 
    });
}


function getMajorList(option, func){
    value = {
        name:""
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

    $.ys_ajax({url: "/major/list",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,	
        rt_func:op.rt_func 
    });
}
