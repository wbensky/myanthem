package controllers

import (
    //    "Pangea/utils"
    "fmt"
    "github.com/astaxie/beego"
)

type ExpOnlineController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *ExpOnlineController) Prepare() {
    fmt.Println("ExpOnline")
    uid := this.GetSession("uid")
    this.ret = make(map[string]interface{})
    this.Data["uid"] = uid
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.CheckPerm(this.Ctx.Input.Param(":param"))
}

func (this *ExpOnlineController) CheckPerm(url string) {
    switch url {
    case "notices":
        this.Notice()
    }
}

func (this *ExpOnlineController) Notice() {
    var notice []interface{}

    for i := 0; i < 5; i++ {
        test := make(map[string]string)
        test["time"] = "2013-05-06"
        test["title"] = "nijflak将开发的进口量啊节抵抗力放假eimeinimeiminimie"
        notice = append(notice, test)
    }
    this.ret["notice"] = notice
    this.ServeJson()
}
