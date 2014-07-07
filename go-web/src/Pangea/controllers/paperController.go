package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    "encoding/json"
    "fmt"
    "github.com/astaxie/beego"
    "labix.org/v2/mgo/bson"
    "strings"
    "time"
)

type PaperController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *PaperController) Prepare() {

    fmt.Println("Paper")
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
}

func (this *PaperController) CanModify() {
    if this.isModify() == nil {
        this.ret["flag"] = "yes"
    } else {
        this.ret["flag"] = "no"
    }
    this.ServeJson()
}

func (this *PaperController) isModify() (result []models.Snap) {
    query := make(map[string]interface{})
    var err error
    var snap models.Snap

    datetime := time.Now().Unix()
    query["StartTime"] = bson.M{"$lt": datetime}

    paperId, err := this.GetInt("paperid")
    utils.YsError(this, &this.Data, err, "NO_PaperId")
    query["PaperId"] = paperId

    ret, err := snap.QueryByMap(query)
    utils.YsError(this, &this.Data, err, "SN_QUERY_FAILED")
    return ret
}

func (this *PaperController) CheckPerm(url string) {
    var perm models.UserPermission
    if this.Data["uid"] == nil {
        this.TplNames = "login.html"
        return
    }
    switch url {
    case "create":
        if perm.GetPermission(this.Data["uid"].(int64), "paper_add") {
            this.Create()
        } else {
            utils.YsStop(this, &this.Data, "NO_PERM")
        }
    case "get":
        this.Get()
    case "list":
        this.List()
    case "canmodify":
        this.CanModify()
    case "modify":
        if perm.GetPermission(this.Data["uid"].(int64), "paper_update") {
            this.Update()
        } else {
            utils.YsStop(this, &this.Data, "NO_PERM")
        }
    }
}

func (this *PaperController) Create() {
    var err error
    paper := &models.Paper{}

    paper.CreatedId = this.Data["uid"].(int64)
    paper.Type = this.GetString("type")
    paper.Title = this.GetString("title")
    paper.ProjectId, err = this.GetInt("projectId")
    utils.YsError(this, &this.Data, err, "PA_NO_ID")

    err = json.Unmarshal([]byte(this.GetString("questions")), &paper.Questions)
    utils.YsError(this, &this.Data, err, "JSON_ERROR_pro")

    err = json.Unmarshal([]byte(this.GetString("description")), &paper.Description)
    utils.YsError(this, &this.Data, err, "JSON_ERROR")

    err = paper.Insert()
    utils.YsError(this, &this.Data, err, "PA_ADD_FAILED")

    this.ret["paper"] = paper
    this.ServeJson()
}

func (this *PaperController) Get() {
    var paper models.Paper
    var err error

    paper.Id, err = this.GetInt("paperId")
    utils.YsError(this, &this.Data, err, "PA_NO_ID")

    err = paper.Read("Id")
    utils.YsError(this, &this.Data, err, "PA_READ_FAILED")
    this.ret["paper"] = paper
    this.ServeJson()
}

func (this *PaperController) Delete() {
    var paper models.Paper
    var err error
    paper.Id, err = this.GetInt("paperId")
    utils.YsError(this, &this.Data, err, "PA_NO_ID")

    err = paper.Delete()
    utils.YsError(this, &this.Data, err, "PA_DELETE_FAILED")

    this.ret["status"] = "SUCCESS"
}

func (this *PaperController) List() {
    query := make(map[string]interface{})
    var paper models.Paper
    var err error

    createdId := this.Data["uid"]
    if createdId != -1 {
        query["CreatedId"] = createdId
    }

    if strings.EqualFold(this.GetString("type"), "") == false {
        query["Type"] = this.GetString("type")
    }

    proId, err := this.GetInt("projectId")
    if err == nil && proId != -1 {
        query["ProjectId"] = proId
    }

    result, err := paper.QueryByMap(query)
    utils.YsError(this, &this.Data, err, "PA_QUERY_FAILED")
    this.ret["paperList"] = result
    this.ServeJson()
}

func (this *PaperController) Update() {
    var err error
    var paper models.Paper
    if this.isModify() != nil {
        utils.YsStop(this, &this.Data, "NOT_MOD")
    }
    paper.Id, _ = this.GetInt("paperid")
    paper.CreatedId = this.Data["uid"].(int64)
    err = paper.Read("Id", "CreatedId")
    utils.YsError(this, &this.Data, err, "FAILED")
    err = json.Unmarshal([]byte(this.GetString("questions")), &paper.Questions)
    utils.YsError(this, &this.Data, err, "JSON_ERROR_pro")

    err = json.Unmarshal([]byte(this.GetString("description")), &paper.Description)
    utils.YsError(this, &this.Data, err, "JSON_ERROR")
    err = paper.Update()
    utils.YsError(this, &this.Data, err, "FAILED")
    this.ret["paper"] = paper
    this.ServeJson()
}

func (this *PaperController) Finish() {
    models.CloseMgo()
}
