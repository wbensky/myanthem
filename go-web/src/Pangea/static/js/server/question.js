function getQuestionList(option, func){

 value = {
 		type : "",
    	title:"", 	
     	parent:0,
     	state:0,
     
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
    
    $.ys_ajax({url: "/question/list",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });

}


function getQuestion(option ,func){

  value = {
 		questionId :-1, //题目类型 选择填空 填表 问答
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
    
    $.ys_ajax({url: "/question/get",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });

}


function createQuestion(option,func){
    value = {
 	    type : "",
     	title:"",
     	parendId:0,
        body:""
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
    
    $.ys_ajax({url: "/question/create",
              	type:"POST",
                data:value,
       			datatype:"json",
               	err_occur:op.err_occur,	
                rt_func:op.rt_func 
               });
}

function getSelectQuestion(option){
	value = {
   		type:"single",  //选择题 单选还是多选
   		title:"",
        designResource:"",
        choiceA:"",
        choiceAResource:"",
        choiceB:"",
        choiceBResource:"",
        choiceC:"",
        choiceCResource:"",
       	choiceD:"",
        choiceDResource:"",
    };
	for(key in option){
   		value[key] = option[key];
    }
    return JSON.stringify(value);
}

function getEssayQuestion(option){
	value = {
   		type:"essay",
        title:"",
        sub:[]
    };
	for(key in option){
   		value[key] = option[key];
    }
    return JSON.stringify(value);
}

function getFillQuestion(option){
	value = {
   		type:"fill",
    	title:"",
       	resource:"",
   		number:0 
    };
    for (key in option){
   		value[key] = option[key] ; 
    }
	str = value.design.split("____");	
	value.number = str.length;
}
