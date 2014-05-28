function autoCorrect(option, func){

 value = {
 	snapId : "",
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
    
    $.ys_ajax({url: "/correct/auto",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}

function getQList(option, func){

 value = {
 	paperId : "",
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
    $.ys_ajax({url: "/correct/questionlist",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}


