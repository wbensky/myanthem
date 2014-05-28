package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    "fmt"
    "github.com/astaxie/beego"
    //    "strings"
)

type MajorController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *MajorController) Prepare() {
    fmt.Println("Major")
    uid := this.GetSession("uid")
    this.ret = make(map[string]interface{})
    if uid == nil {
        utils.YsStop(this, &this.Data, "NO_LOGIN")
    }

    this.Data["uid"] = uid
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.CheckPerm(this.Ctx.Input.Param(":param"))
}

func (this *MajorController) CheckPerm(url string) {
    switch url {
    case "create":
        this.Create()
    case "list":
        this.List()
    case "get":
        this.Get()
    }
}

func (this *MajorController) Get() {
    var err error
    var major models.Major

    major.Id, err = this.GetInt("major_id")
    err = major.Read("Id")
    utils.YsError(this, &this.Data, err, "MajorReadFailed")

    this.ret["major"] = major
    this.ServeJson()
}

func (this *MajorController) Create() {
    var err error
    var major models.Major

    fmt.Println(this.Data)
    major.Name = this.GetString("name")
    number, err := major.Query().Filter("Name", major.Name).Count()
    utils.YsError(this, &this.Data, err, "MA_CREATED_FAILED")
    if number != 0 {
        utils.YsStop(this, &this.Data, "MA_EXSITED")
    }

    err = major.Insert()
    if err != nil {
        fmt.Println(err.Error())
    }

    utils.YsError(this, &this.Data, err, "MA_CREATE_FAILED")
    this.ret["major"] = major
    this.ServeJson()
}

func (this *MajorController) List() {
    //var err error
    var major models.Major
    var majors []*models.Major
    major.Query().All(&majors)
    //utils.YsError(this, &this.Data, err, "MA_QUERY_FAILED")

    this.ret["majors"] = majors
    this.ServeJson()
}

func (this *MajorController) Finish() {
    models.CloseMgo()
}
