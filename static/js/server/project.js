

function createProject(option,func){
    value = {
 		type :"",   //exp, exam , homework
   		tilte:"",
        classType:"",
        desc:""
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
    
    $.ys_ajax({url: "/project/create",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}


function getProject(option,func){
    value = {
 		projectId :""
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
    
    $.ys_ajax({url: "/project/get",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}


function getProjectList(option,func){
    value = {
 		type :""
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
    
    $.ys_ajax({url: "/project/list",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}

function storeProject(option,func){
    value = {
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
   		op[key] = option[key];
    } 
    
    $.ys_ajax({url: "/project/store",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}

