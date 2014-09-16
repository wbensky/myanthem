package routers

import (
    "edurun/controllers"
    "github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.MainController{})
    beego.Router("/birthday", &controllers.MainController{}, "*:BirthDay")
}
