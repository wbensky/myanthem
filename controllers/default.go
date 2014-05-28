package controllers

import (
    "Pangea/models"
    "fmt"
    "github.com/astaxie/beego"
)

type MainController struct {
    beego.Controller
}

func (this *MainController) Login() {
    this.TplNames = "login.html"
}

func (this *MainController) Prepare() {
    sess := this.GetSession("uid")
    this.Data["uid"] = sess
}

func (this *MainController) Get() {
    uid := this.Data["uid"]
    fmt.Println(uid)
    page := this.Ctx.Input.Param(":all")
    if this.Data["uid"] == nil {
        this.TplNames = "login.html"
        return
    }
    if page == "" {
        this.Redirect("page/loginl.html", 0)
        return
    }

    var perm models.UserPermission
    switch page {
    case "login.html":
        this.TplNames = "login.html"
    case "index.html":
        if perm.GetPermission(this.Data["uid"].(int64), "teacher_page_read") == false {
            this.TplNames = "login.html"
        } else {
            this.TplNames = "index.html"
        }
    case "student.html":
        if perm.GetPermission(this.Data["uid"].(int64), "student_page_read") == false {
            this.TplNames = "login.html"
        } else {
            this.TplNames = "student.html"
        }
    case "admin.html":
        if perm.GetPermission(this.Data["uid"].(int64), "admin_page_read") == false {
            this.TplNames = "login.html"
        } else {
            this.TplNames = "admin.html"
        }
    }
}
