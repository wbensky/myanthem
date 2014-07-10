package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    //    "encoding/json"
    "fmt"
    "github.com/astaxie/beego"
    "strings"
)

type ProjectController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *ProjectController) Prepare() {
    fmt.Println("project")
    uid := this.GetSession("uid")
    this.ret = make(map[string]interface{})
    if uid == nil {
        this.ret["status"] = "NO_LOGIN"
        this.Data["json"] = &this.ret
        this.ServeJson()
        this.StopRun()
    }
    this.Data["uid"] = uid
    models.InitMgo()
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.CheckPerm(this.Ctx.Input.Param(":param"))
}
func (this *ProjectController) CheckPerm(url string) {
    var perm models.UserPermission
    if this.Data["uid"] == nil {
        this.TplNames = "login.html"
        return
    }

    switch url {
    case "list":
        this.List()
    case "create":
        if perm.GetPermission(this.Data["uid"].(int64), "project_add") {
            this.Create()
        } else {
            utils.YsStop(this, &this.Data, "NO_PERM")
        }
    case "get":
        this.Get()
    case "store":
        if perm.GetPermission(this.Data["uid"].(int64), "project_store") {
            this.Create()
        } else {
            utils.YsStop(this, &this.Data, "NO_PERM")
        }
    }
}

func (this *ProjectController) Create() {
    var err error

    project := &models.Project{}
    project.CreatedId = this.Data["uid"].(int64)
    project.Type = this.GetString("type")
    project.Title = this.GetString("title")
    project.ClassType = strings.Trim(this.GetString("classType"), " \n")
    fmt.Println(this.GetString("desc"))
    project.Desc = this.GetString("desc")
    project.State = 0
    err = project.Insert()
    utils.YsError(this, &this.Data, err, "PR_ADD_FAILED")
    this.ret["project"] = project
    this.ServeJson()
}

func (this *ProjectController) Store() {
    var err error
    project := &models.Project{}

    project.Id, err = this.GetInt("projectId")
    utils.YsError(this, &this.Data, err, "PR_NO_ID")

    err = project.Read("Id")
    utils.YsError(this, &this.Data, err, "PR_NO_ID")

    project.State = 1
    err = project.Update()
    utils.YsError(this, &this.Data, err, "PR_STORE_FAILED")
    this.ServeJson()
}

func (this *ProjectController) Get() {
    var project models.Project
    var err error
    project.Id, err = this.GetInt("projectId")
    utils.YsError(this, &this.Data, err, "PR_NO_ID")
    err = project.Read("Id")
    utils.YsError(this, &this.Data, err, "PR_NO_ID")
    this.ret["question"] = project
    this.ServeJson()
}

func (this *ProjectController) List() {
    query := make(map[string]interface{})
    var question models.Project
    var err error

    createdId := this.Data["uid"].(int64)
    if createdId != -1 { // -1 all
        query["CreatedId"] = createdId
    }

    if strings.EqualFold(this.GetString("type"), "") == false {
        query["Type"] = this.GetString("type")
    }

    if strings.EqualFold(this.GetString("State"), "") == false {
        query["State"] = this.GetString("State")
    }

    fmt.Println(query)
    result, err := question.QueryByMap(query)
    utils.YsError(this, &this.Data, err, "PR_QUERY_FAILED")
    this.ret["projectList"] = result
    fmt.Println(result)
    this.ServeJson()
}

func (this *ProjectController) edit() {

}

func (this *ProjectController) Finish() {
    models.CloseMgo()
}
