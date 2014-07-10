function createStudentAnswer(option,func){
    value = {
        snapId:active_snap_id,
        questionId:-1,
        body:{}
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
    $.ys_ajax({url: "/studentanswer/create",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}

function getMyAnswer(option,func){
    value = {
        questionId:0,
        snapid:active_snap_id
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
    $.ys_ajax({url: "/studentanswer/getmyanswer",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,
                rt_func:op.rt_func
               });
}

function getStudentAnswer(option,func){
    value = {
        questionId:0,
        answerId:0,
        snapid:active_snap_id,
        createdId:0
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

    $.ys_ajax({url: "/studentanswer/get",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}
