package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    "encoding/json"
    "fmt"
    "github.com/astaxie/beego"
    "strings"
)

type AnswerController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *AnswerController) Prepare() {
    uid := this.GetSession("uid")
    this.ret = make(map[string]interface{})
    if uid == nil {
        utils.YsStop(this, &this.Data, "NO_LOGIN")
    }
    this.Data["uid"] = uid
    models.InitMgo()
    fmt.Println("answer")
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.CheckPerm(this.Ctx.Input.Param(":param"))
}

func (this *AnswerController) CheckPerm(url string) {
    switch url {
    case "create":
        this.Create()
    case "get":
        this.Get()
    case "delete":
        this.Delete()
    case "update":
        this.Update()
    }
}

func (this *AnswerController) Create() {
    var err error
    answer := &models.Answer{}

    answer.CreatedId = this.Data["uid"].(int64)
    answer.QuestionId, err = this.GetInt("questionId")

    err = json.Unmarshal([]byte(this.GetString("body")), &answer.Body)
    utils.YsError(this, &this.Data, err, "JSON_ERROR")

    err = json.Unmarshal([]byte(this.GetString("rightRole")), &answer.RightRole)
    utils.YsError(this, &this.Data, err, "JSON_ERROR")

    err = answer.Insert()
    utils.YsError(this, &this.Data, err, "AN_INSERT_ERROR")
    this.ret["answer"] = answer
    this.ServeJson()
}

func (this *AnswerController) Get() {
    var answer models.Answer
    var err error

    answer.Id, err = this.GetInt("answerId")
    answer.QuestionId, err = this.GetInt("questionId")
    if answer.Id == 0 && answer.QuestionId == 0 {
        utils.YsStop(this, &this.Data, "AN_NO_ID")
    }
    if answer.Id != 0 {
        err = answer.Read("Id")
        utils.YsError(this, &this.Data, err, "AN_READ_FAILED")
    } else {
        err = answer.Read("QuestionId")
        utils.YsError(this, &this.Data, err, "AN_READ_FAILED")
    }

    this.ret["answer"] = answer
    this.ServeJson()
}

func (this *AnswerController) Store() {
}

func (this *AnswerController) Delete() {
    var answer models.Answer
    var err error

    answer.Id, err = this.GetInt("answerId")
    answer.QuestionId, err = this.GetInt("questionId")

    if answer.Id == 0 && answer.QuestionId == 0 {
        utils.YsStop(this, &this.Data, "AN_NO_ID")
    }

    if answer.Id != 0 {
        err = answer.Delete()
        utils.YsError(this, &this.Data, err, "AN_NO_ID")
    } else {
        err = answer.Read("QuestionId")
        utils.YsError(this, &this.Data, err, "AN_NO_ID")
        err = answer.Delete()
        utils.YsError(this, &this.Data, err, "AN_DELETE_FAILED")
    }
    this.ServeJson()
}

func (this *AnswerController) List() {
    query := make(map[string]interface{})
    var answer models.Answer
    var err error

    createdId, err := this.GetInt("createdId")
    if err == nil && createdId != -1 {
        query["CreateId"] = createdId
    }
    if strings.EqualFold(this.GetString("type"), "") == false {
        query["Type"] = this.GetString("type")
    }
    proId, err := this.GetInt("proCollId")
    if err == nil && proId != -1 {
        query["ProCollId"] = proId
    }
    result, err := answer.QueryByMap(query)
    if err != nil {
        this.ret["status"] = "UNKNOW_EXP"
        this.Data["json"] = &this.ret
        this.ServeJson()
        return
    }

    this.ret["status"] = "SUCCESS"
    this.ret["answerList"] = result
    this.Data["json"] = &this.ret
    this.ServeJson()
    return
}
func (this *AnswerController) Update() {
}

func (this *AnswerController) edit() {
}

func (this *AnswerController) Finish() {
    models.CloseMgo()
}
