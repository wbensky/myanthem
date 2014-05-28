package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    "encoding/json"
    "fmt"
    "github.com/astaxie/beego"
    "strings"
    //    "time"
)

type ProCollController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *ProCollController) Prepare() {
    uid := this.GetSession("uid")
    this.ret = make(map[string]interface{})
    if uid == nil {
        utils.YsStop(this, &this.Data, "NO_LOGIN")
    }
    this.Data["uid"] = uid
    models.InitMgo()
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.CheckPerm(this.Ctx.Input.Param(":param"))
    fmt.Println("proColl")
}

func (this *ProCollController) CheckPerm(url string) {
    switch url {
    case "create":
        this.Create()
    case "get":
        this.Get()
    case "list":
        this.List()
    case "delete":
        this.Delete()
    }
}

func (this *ProCollController) Create() {
    var err error
    var proColl models.ProColl

    proColl.CreatedId = this.Data["uid"].(int64)
    proColl.LessonId, err = this.GetInt("lessonId")
    proColl.State, err = this.GetInt("state")
    proColl.Type = this.GetString("type")
    proColl.Title = this.GetString("title")

    err = json.Unmarshal([]byte(this.GetString("questions")), &proColl.Questions)
    utils.YsError(this, &this.Data, err, "JSON_ERROR")

    err = proColl.Insert()
    utils.YsError(this, &this.Data, err, "PRO_ADD_FAILED")

    fmt.Println("hehe")
    this.ret["status"] = "SUCCESS"
    this.ret["proColl"] = proColl
    this.Data["json"] = &this.ret
    this.ServeJson()
}

func (this *ProCollController) Get() {
    var err error
    var proColl models.ProColl

    proColl.Id, err = this.GetInt("proCollId")
    utils.YsError(this, &this.Data, err, "PRO_NO_ID")

    err = proColl.Read("Id")
    utils.YsError(this, &this.Data, err, "PRO_READ_FAILED")
    this.ret["proColl"] = proColl
    this.ServeJson()
}

func (this *ProCollController) Delete() {
    proColl := &models.ProColl{}
    var err error
    proColl.Id, err = this.GetInt("proCollId")
    utils.YsError(this, &this.Data, err, "PRO_NO_ID")
    fmt.Println(proColl.Id)
    err = proColl.Delete()
    utils.YsError(this, &this.Data, err, "PRO_NO_ID")
    this.ServeJson()
}

func (this *ProCollController) List() {
    proColl := &models.ProColl{}
    q := make(map[string]interface{})

    lessonId, err := this.GetInt("lessonId")
    if err != nil && lessonId != -1 {
        q["LessonId"] = lessonId
    }

    state, err := this.GetInt("state")
    if err != nil && state != -1 {
        q["State"] = state
    }
    if strings.EqualFold(this.GetString("type"), "") == false {
        q["Type"] = this.GetString("type")
    }

    result, err := proColl.QueryByMap(q)
    utils.YsError(this, &this.Data, err, "PRO_QUERY_FAILED")

    this.ret["status"] = "SUCCESS"
    this.ret["proCollList"] = result
    this.Data["json"] = &this.ret
    this.ServeJson()
}

func (this *ProCollController) Modify() {
}

func (this *ProCollController) Finish() {
    models.CloseMgo()
}
