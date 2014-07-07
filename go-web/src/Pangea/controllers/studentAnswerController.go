package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    "encoding/json"
    "fmt"
    "github.com/astaxie/beego"
    "strings"
)

type StudentAnswerController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *StudentAnswerController) Prepare() {
    uid := this.GetSession("uid")
    this.ret = make(map[string]interface{})
    if uid == nil {
        utils.YsStop(this, &this.Data, "NO_LOGIN")
    }
    this.Data["uid"] = uid
    models.InitMgo()
    fmt.Println("student answer")
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.checkPerm(this.Ctx.Input.Param(":param"))
}

func (this *StudentAnswerController) checkPerm(url string) {
    switch url {
    case "create":
        this.Create()
    case "delete":
        this.Delete()
    case "get":
        this.Get()
    case "update":
        this.Update()
    case "getmyanswer":
        this.GetMyAnswer()
    }
}

func (this *StudentAnswerController) Create() {
    var err error
    var answer models.StudentAnswer

    answer.CreatedId = this.Data["uid"].(int64)
    answer.QuestionId, err = this.GetInt("questionId")
    utils.YsError(this, &this.Data, err, "SA_NO_Q_ID")

    err = answer.Read("QuestionId", "CreatedId")
    if err == nil {
        err = json.Unmarshal([]byte(this.GetString("body")), &answer.Body)
        utils.YsError(this, &this.Data, err, "JSON_ERROR")
        err = answer.Update()
        utils.YsError(this, &this.Data, err, "SA_ADD_FAILED")
        this.ret["answer"] = answer
        this.ServeJson()
    } else {

        err = json.Unmarshal([]byte(this.GetString("body")), &answer.Body)
        utils.YsError(this, &this.Data, err, "JSON_ERROR")
        err = answer.Insert()
        utils.YsError(this, &this.Data, err, "SA_ADD_FAILED")
        this.ret["answer"] = answer
        this.ServeJson()
    }
}

func (this *StudentAnswerController) GetMyAnswer() {
    var answer models.StudentAnswer
    var err error
    answer.QuestionId, err = this.GetInt("questionId")
    utils.YsError(this, &this.Data, err, "SA_NO_Q_ID")

    answer.CreatedId = this.Data["uid"].(int64)
    utils.YsError(this, &this.Data, err, "SA_NO_CREATEDID")

    err = answer.Read("QuestionId", "CreatedId")
    utils.YsError(this, &this.Data, err, "SA_READ_FAILED")
    this.ret["answer"] = answer
    this.ServeJson()
}

func (this *StudentAnswerController) Get() {
    var answer models.StudentAnswer
    var err error
    answer.Id, err = this.GetInt("answerId")
    if err == nil && answer.Id != 0 {
        err = answer.Read("Id")
        utils.YsError(this, &this.Data, err, "SA_NO_ID")
        this.ret["answer"] = answer
        this.ServeJson()
    } else {
        answer.QuestionId, err = this.GetInt("questionId")
        utils.YsError(this, &this.Data, err, "SA_NO_Q_ID")

        answer.CreatedId, err = this.GetInt("createdId")
        utils.YsError(this, &this.Data, err, "SA_NO_CREATEDID")

        err = answer.Read("QuestionId", "CreatedId")
        utils.YsError(this, &this.Data, err, "SA_READ_FAILED")
        this.ret["answer"] = answer
        this.ServeJson()
    }
}

func (this *StudentAnswerController) Delete() {
    var answer models.StudentAnswer
    var err error

    answer.Id, err = this.GetInt("answerId")
    utils.YsError(this, &this.Data, err, "SA_NO_ID")

    err = answer.Delete()
    utils.YsError(this, &this.Data, err, "SA_DELETE_FAILED")

    this.ServeJson()
}

func (this *StudentAnswerController) List() {
    query := make(map[string]interface{})
    var answer models.StudentAnswer
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

func (this *StudentAnswerController) Update() {
    var err error
    var answer models.StudentAnswer
    var score int64

    answer.Id, err = this.GetInt("answerId")
    utils.YsError(this, &this.Data, err, "SA_NO_ID")

    err = answer.Read("Id")
    utils.YsError(this, &this.Data, err, "SA_NO_ID")

    score, err = this.GetInt("score")
    if err == nil {
        answer.Score = score
    }

    if strings.EqualFold(this.GetString("body"), "") == false {
        err = json.Unmarshal([]byte(this.GetString("body")), &answer.Body)
        utils.YsError(this, &this.Data, err, "JSON_ERROR")
    }
    err = answer.Update()
    utils.YsError(this, &this.Data, err, "SA_UPDATE_FAILED")
    this.ret["answer"] = answer
    this.ServeJson()
}

func (this *StudentAnswerController) Finish() {

    models.CloseMgo()
}
