package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    "encoding/json"
    "fmt"
    "github.com/astaxie/beego"
    "labix.org/v2/mgo/bson"
    "strconv"
    "strings"
)

type SnapController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *SnapController) Prepare() {
    uid := this.GetSession("uid")
    fmt.Println("Snap")
    if uid == nil {
        utils.YsStop(this, &this.Data, "NO_LOGIN")
    }
    models.InitMgo()
    this.Data["uid"] = uid
    this.ret = make(map[string]interface{})
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.CheckPerm(this.Ctx.Input.Param(":param"))
}

func (this *SnapController) CheckPerm(url string) {
    var perm models.UserPermission

    if this.Data["uid"] == nil {
        this.TplNames = "login.html"
        return
    }

    switch url {
    case "create":
        if perm.GetPermission(this.Data["uid"].(int64), "snap_add") {
            this.Create()
        } else {
            utils.YsStop(this, &this.Data, "NO_PERM")
        }
    case "get":
        this.Get()
    case "store":
        if perm.GetPermission(this.Data["uid"].(int64), "snap_store") {
            this.Store()
        } else {
            utils.YsStop(this, &this.Data, "NO_PERM")
        }
    case "list":
        this.List()
    case "update":
        {
            if perm.GetPermission(this.Data["uid"].(int64), "snap_update") {
                this.Update()
            } else {
                utils.YsStop(this, &this.Data, "NO_PERM")
            }
        }
    }
}

func (this *SnapController) Update() {
    var err error
    var snap models.Snap

    snap.Id, _ = this.GetInt("snap_id")
    err = snap.Read("Id")
    utils.YsError(this, &this.Data, err, "SnapReadFailed")
    title := this.GetString("title")
    if title != "" {
        snap.Title = title
    }

    snapType := this.GetString("type")
    if snapType != "" {
        snap.Type = snapType
    }

    startTime, err := this.GetInt("startTime")
    if err == nil && startTime != 0 {
        snap.StartTime = startTime
    }

    endTime, err := this.GetInt("endTime")
    if err == nil && endTime != 0 {
        snap.EndTime = endTime
    }
    err = json.Unmarshal([]byte(this.GetString("studentList")), &snap.StudentList)
    utils.YsError(this, &this.Data, err, "JSON_ERROR")
    fmt.Println(snap)
    snap.Update()
    this.ret["snap"] = snap
    this.ServeJson()
}

func (this *SnapController) Create() {
    var snap models.Snap
    var err error

    snap.CreatedId = this.Data["uid"].(int64)
    snap.Title = this.GetString("title")
    snap.Type = this.GetString("type")

    snap.StartTime, err = this.GetInt("startTime")
    utils.YsError(this, &this.Data, err, "SN_NO_STIME")

    snap.ProjectId, err = this.GetInt("projectId")
    utils.YsError(this, &this.Data, err, "SN_NO_PID")

    snap.EndTime, err = this.GetInt("endTime")
    utils.YsError(this, &this.Data, err, "SN_NO_ETIME")

    snap.PaperId, err = this.GetInt("paperId")
    utils.YsError(this, &this.Data, err, "SN_NO_PID")

    snap.State = 0
    err = json.Unmarshal([]byte(this.GetString("studentList")), &snap.StudentList)
    utils.YsError(this, &this.Data, err, "JSON_ERROR")

    err = snap.Insert()
    utils.YsError(this, &this.Data, err, "SN_ADD_FAILED")
    this.ret["snap"] = snap
    this.ServeJson()
}

func (this *SnapController) Get() {
    var snap models.Snap
    var err error
    var studentList []models.User

    snap.Id, err = this.GetInt("snapId")
    utils.YsError(this, &this.Data, err, "SN_NO_ID")

    err = snap.Read("Id")
    utils.YsError(this, &this.Data, err, "SN_READ_FAILED")
    s := snap.StudentList.([]interface{})
    fmt.Println(s)
    for i, _ := range s {
        var student models.User
        id, _ := strconv.Atoi(s[i].(bson.M)["userId"].(string))
        student.Id = int64(id)
        student.Read("Id")
        studentList = append(studentList, student)
    }
    this.ret["snap"] = snap

    var paper models.Paper
    paper.Id = snap.PaperId
    err = paper.Read("Id")
    utils.YsError(this, &this.Data, err, "SN_NO_PAPER_ID")
    this.ret["paperTitle"] = paper.Title
    this.ret["studentList"] = studentList
    this.ServeJson()
}

func (this *SnapController) Store() {
    var snap models.Snap
    var err error

    snap.Id, err = this.GetInt("snapId")
    utils.YsError(this, &this.Data, err, "SN_NO_ID")

    err = snap.Read("Id")
    utils.YsError(this, &this.Data, err, "SN_NO_ID")

    snap.State = 1
    err = snap.Update()
    utils.YsError(this, &this.Data, err, "SN_UPDATE_FAILED")

    this.ret["snap"] = snap
    this.ServeJson()
}

func (this *SnapController) List() {
    query := make(map[string]interface{})
    var err error
    var snap models.Snap

    createdId, err := this.GetInt("createdId")
    if err == nil {
        if createdId != -1 {
            query["CreatedId"] = 1
        }
    } else {
        query["CreatedId"] = this.Data["uid"]
    }

    projectId, err := this.GetInt("projectId")
    if err == nil {
        query["ProjectId"] = projectId
    }
    datetime, err := this.GetInt("datetime")
    if err == nil {
        query["StartTime"] = bson.M{"$lt": datetime}
        query["EndTime"] = bson.M{"$gt": datetime}
    }

    state, err := this.GetInt("State")
    if err == nil {
        query["State"] = state
    } else {
        query["State"] = 0
    }

    ty := this.GetString("type")
    if strings.EqualFold("", ty) == false {
        query["Type"] = ty
    }

    title := this.GetString("title")
    if strings.EqualFold("", title) == false {
        query["Title"] = bson.M{"$regex": bson.RegEx{title, "i"}}
    }

    studentId, err := this.GetInt("studentId")
    if err == nil {
        studentId = this.Data["uid"].(int64)
        query["StudentList"] = bson.M{"$elemMatch": bson.M{"userId": strconv.FormatInt(studentId, 10)}}
        result, err := snap.QueryByMap(query)
        utils.YsError(this, &this.Data, err, "SN_QUERY_FAILED")
        this.ret["snapList"] = result
        this.ServeJson()
    }
    result, err := snap.QueryByMap(query)
    utils.YsError(this, &this.Data, err, "SN_QUERY_FAILED")

    this.ret["snapList"] = result
    this.ServeJson()
}

func (this *SnapController) Finish() {
    models.CloseMgo()
}
