function createSnap(option, func){

    value = {
        type : "",
        title:"", 	
        startTime:"",
        endTime :"",
        studentList:{},
        paperId:0
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

    $.ys_ajax({url: "/snap/create",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });

}

function updateSnap(option, func){
    value = {
        snap_id : "",
        type : "",
        title:"",
        startTime:"",
        endTime :"",
        studentList:{},
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

    $.ys_ajax({url: "/snap/update",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,
        rt_func:op.rt_func
    });
}




function getSnap(option, func){

    value = {
        snapId:0 
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

    $.ys_ajax({url: "/snap/get",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,	
        rt_func:op.rt_func 
    });

}

function getSnapList(option, func){

    value = {
        datetime:"",
        createId:0
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

    $.ys_ajax({url: "/snap/list",
        type:"POST",
        data:value,
        datatype:"json",
        err_occur:op.err_occur,	
        rt_func:op.rt_func 
    });

}
