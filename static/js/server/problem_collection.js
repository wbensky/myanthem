//创建题集

function createProColl(option,func){
    value = {
   		lessonId:0,
        state:0,
        type:"exam",
        title:"hehe",
        questions:JSON.stringify({})
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
    
    $.ys_ajax({url: "/procoll/create",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}

function getProColl(option, func){
      value = {
 		 proCollId:"",
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
    
    $.ys_ajax({url: "/procoll/get",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               }); 
}
// 获取题集列表, userId 为0时  表示自身
function getProCollList(option, func){
    value = {
        lessonId:-1,
   		type:"" ,
        name:-1
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
    
    $.ys_ajax({url: "/procoll/list",
              	type:"POST",
                data:value,
       			datatype:"json",
               err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}
function deleteProColl(option, func){
 value = {
        proCollId:-1
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
    
    $.ys_ajax({url: "/procoll/delete",
              	type:"POST",
                data:value,
       			datatype:"json",
               err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });

}