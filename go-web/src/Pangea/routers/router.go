package routers

import (
    "Pangea/controllers"
    "github.com/astaxie/beego"
)

func init() {

    beego.Router("/", &controllers.MainController{})
    //account
    beego.Router("/user/:param", &controllers.UserController{})
    //major
    beego.Router("/major/:param", &controllers.MajorController{})
    //prject
    beego.Router("/project/:param", &controllers.ProjectController{})
    //paper
    beego.Router("/paper/:param", &controllers.PaperController{})
    //proColl
    beego.Router("/procoll/:param", &controllers.ProCollController{})

    //question
    beego.Router("/question/:param", &controllers.QuestionController{})

    //answer
    beego.Router("/answer/:param", &controllers.AnswerController{})

    //StudentAnswer
    beego.Router("/studentanswer/:param", &controllers.StudentAnswerController{})

    //Auto Correct question
    beego.Router("/correct/:param", &controllers.CorrectController{})

    //score
    beego.Router("/score/:param", &controllers.ScoreController{})

    //exp_online
    beego.Router("/exponline/:param", &controllers.ExpOnlineController{})

    //device
    beego.Router("/device/:param", &controllers.DeviceController{})
    //employee
    beego.Router("/employee/:param", &controllers.EmployeeController{})
    //Snap
    beego.Router("/snap/:param", &controllers.SnapController{})
    //table
    beego.Router("/table/:param", &controllers.TableController{})
    //notice
    beego.Router("/notice/:param", &controllers.NoticeController{})
    //file
    beego.Router("/file/:param", &controllers.FileController{})
    //page
    beego.Router("/:all", &controllers.MainController{})
}
