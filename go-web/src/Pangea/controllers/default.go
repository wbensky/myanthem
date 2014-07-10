package controllers

import (
    "Pangea/models"
    "fmt"
    "github.com/astaxie/beego"
    "strings"
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
    /*
       if this.Data["uid"] == nil {
           this.TplNames = "login.html"
           return
       }
    */
    if page == "" {
        this.Redirect("page/login.html", 0)
        return
    }
    pages := strings.Split(page, "/")
    var perm models.UserPermission
    switch pages[0] {
    case "login.html":
        this.TplNames = "login.html"
    case "index.html":
        if this.Data["uid"] == nil {
            this.TplNames = "login.html"
            return
        }
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
    case "eelab.html":
        this.TplNames = "eelab.html"
    case "eelab-sub.html":
        this.TplNames = "eelab-sub.html"
    case "exp-online.html":
        this.TplNames = "exp-online.html"
    case "about-center.html":
        this.TplNames = "about-center.html"
    default:
        this.TplNames = pages[0]

    }
}
