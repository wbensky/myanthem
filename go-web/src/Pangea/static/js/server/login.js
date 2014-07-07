$("document").ready(function () {

    $("#password-input").keydown(function(e){
        if(e.which == 13){
            $("#login-button").click();
        }
    });

    $("input").focus(function(){
        $(".tip").hide();
    });

    $("#login-button").click(function () {
        login({
            username: $("#username-input").val(),
            password: $("#password-input").val()
        }, {
            rt_func: function (data) {
           		if(data.status == "SUCCESS"){
                    if(data.user.role == "student"){
                        window.location.href="/student.html"
                    }else if(data.user.role == "teacher"){
                        window.location.href="/index.html";
                    }else if(data.user.role == "admin"){
                        window.location.href ="/admin.html"
                    }
                }else{
                    $(".tip").show();
                }
            }
        });
    });
});
