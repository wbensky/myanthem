package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    "fmt"
    "github.com/astaxie/beego"
    //   "github.com/astaxie/beego/orm"
    //  "time"
)

type ScoreController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *ScoreController) Prepare() {
    se := this.GetSession("uid")
    fmt.Println("score")
    this.Data["uid"] = se
    this.ret = make(map[string]interface{})
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.CheckPerm(this.GetString(":param"))
}

func (this *ScoreController) CheckPerm(url string) {
    var perm models.UserPermission
    if this.Data["uid"] == nil {
        this.TplNames = "login.html"
        return
    }
    switch url {
    case "create":
        if perm.GetPermission(this.Data["uid"].(int64), "score_add") == false {
            utils.YsStop(this, &this.Data, "NO_PERM")
        } else {
            this.Create()
        }
    case "get":
        this.Get()
    }
}

func (this *ScoreController) Create() {
    var err error
    var score models.Score
    score.QuestionId, err = this.GetInt("questionId")
    score.SnapId, err = this.GetInt("snapId")
    score.Status = this.GetString("status")
    score.StudentId, err = this.GetInt("studentId")
    err = score.Read("QuestionId", "SnapId", "Status", "StudentId")
    score.Score, _ = this.GetInt("score")
    fmt.Println(score)
    if err == nil {
        err = score.Update("Score")
        utils.YsError(this, &this.Data, err, "UPDATA_FAILED")
        this.ret["score"] = score
        this.ServeJson()
    } else {
        err = score.Insert()
        utils.YsError(this, &this.Data, err, "INSERT_FAILED")
        this.ret["score"] = score
        this.ServeJson()
    }
}

func (this *ScoreController) Get() {
    var err error
    var score models.Score

    score.SnapId, err = this.GetInt("snapId")
    score.QuestionId, err = this.GetInt("questionId")
    score.StudentId, err = this.GetInt("studentId")
    score.Status = this.GetString("status")
    if score.Status == "" {
        err = score.Read("SnapId", "QuestionId", "StudentId")
        utils.YsError(this, &this.Data, err, "READ_FAILED")
        this.ret["score"] = score
        this.ServeJson()
    } else {
        err = score.Read("SnapId", "QuestionId", "StudentId", "Status")
        utils.YsError(this, &this.Data, err, "READ_FAILED")
        this.ret["score"] = score
        this.ServeJson()
    }
}
