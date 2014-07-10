package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    "encoding/json"
    "fmt"
    "github.com/astaxie/beego"
    "labix.org/v2/mgo/bson"
    "strings"
)

type QuestionController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *QuestionController) Prepare() {
    uid := this.GetSession("uid")
    this.ret = make(map[string]interface{})
    if uid == nil {
        utils.YsStop(this, &this.Data, "NO_LOGIN")
    }
    this.Data["uid"] = uid
    models.InitMgo()
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    fmt.Println("question")
    this.CheckPerm(this.Ctx.Input.Param(":param"))
}

func (this *QuestionController) CheckPerm(url string) {
    switch url {
    case "create":
        this.Create()
    case "get":
        this.Get()
    case "list":
        this.List()
    case "update":
        this.Update()
    }
}

func (this *QuestionController) Create() {
    var err error
    var question models.Question
    question.CreatedId = this.Data["uid"].(int64)
    fmt.Println("create")
    question.Title = this.GetString("title")
    if strings.EqualFold("", question.Title) {
        utils.YsStop(this, &this.Data, "Q_TITLE_NULL")
    }

    question.Type = this.GetString("type")
    if strings.EqualFold("", question.Type) {
        utils.YsStop(this, &this.Data, "Q_TYPE_NULL")
    }

    question.State, _ = this.GetInt("state")
    question.Parent, err = this.GetInt("parent")
    err = json.Unmarshal([]byte(this.GetString("body")), &question.Body)
    utils.YsError(this, &this.Data, err, "JSON_ERROR")

    err = question.Insert()
    utils.YsError(this, &this.Data, err, "Q_ADD_FAILED")
    this.ret["question"] = question
    this.ServeJson()
}

func (this *QuestionController) Get() {
    var question models.Question
    var err error
    question.Id, err = this.GetInt("questionId")
    utils.YsError(this, &this.Data, err, "Q_NO_ID")
    err = question.Read("Id")
    utils.YsError(this, &this.Data, err, "Q_READ_ID")
    this.ret["status"] = "SUCCESS"
    this.ret["question"] = question
    this.Data["json"] = &this.ret
    this.ServeJson()
}

func (this *QuestionController) Store() {
}

func (this *QuestionController) Update() {

}

func (this *QuestionController) Delete() {
    var question models.Question
    var err error
    question.Id, err = this.GetInt("questionId")
    fmt.Println(question.Id, "id")
    if err != nil {
        this.ret["status"] = "NO_ID"
        this.Data["json"] = &this.ret
        this.ServeJson()
        return
    }
    err = question.Delete()
    if err != nil {
        this.ret["status"] = "NO_ID"
        this.Data["json"] = &this.ret
        this.ServeJson()
        return
    }
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.ServeJson()
}

func (this *QuestionController) List() {
    query := make(map[string]interface{})
    var question models.Question
    var err error

    createdId, err := this.GetInt("createdId")
    if err == nil && createdId != -1 {
        query["CreateId"] = createdId
    }

    if strings.EqualFold(this.GetString("type"), "") == false {
        query["Type"] = this.GetString("type")
    }

    query["State"], err = this.GetInt("state")
    query["Parent"], err = this.GetInt("parent")
    query["Title"] = bson.M{"$regex": bson.RegEx{this.GetString("title"), "i"}}
    fmt.Println(query)
    result, err := question.QueryByMap(query)
    utils.YsError(this, &this.Data, err, "Q_QUERY_FAILED")

    this.ret["questionList"] = result
    this.ServeJson()
    return
}

func (this *QuestionController) Finish() {
    models.CloseMgo()
}
