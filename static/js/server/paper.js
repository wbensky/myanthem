function canModifyPaper(option,func){
    value = {
        paperid:0,
        datetime:parseInt((new Date()).getTime()/1000),
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
    $.ys_ajax({url: "/paper/canmodify",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,
                rt_func:op.rt_func
               });
}

function modifyPaper(option,func){
    value = {
        paperid:0,
        description:"",
        questions:[]
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
    $.ys_ajax({url: "/paper/modify",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,
                rt_func:op.rt_func
               });
}




function createPaper(option,func){
    value = {
   		title:"",
        type:"",
        projectId:"",
        Description:"",
        questions:""
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
    
    $.ys_ajax({url: "/paper/create",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}

function getPaper(option,func){
    value = {
        paperId:""
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
    
    $.ys_ajax({url: "/paper/get",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}

function getPaperList(option,func){
    value = {
   		type:"" ,
   		projectId:0 
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
    
    $.ys_ajax({url: "/paper/list",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}
