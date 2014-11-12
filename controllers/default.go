package controllers

import (
    "github.com/astaxie/beego"
)

type MainController struct {
    beego.Controller
}

func (this *MainController) Get() {
    this.TplNames = "birthday.html"
}

func (this *MainController) BirthDay() {
    this.TplNames = "index.html"
}
