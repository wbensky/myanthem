package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    "fmt"
    "github.com/astaxie/beego"
    "github.com/astaxie/beego/orm"
    "strings"
)

type NoticeController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *NoticeController) Prepare() {
    fmt.Println("Notice")
    uid := this.GetSession("uid")
    this.ret = make(map[string]interface{})
    this.Data["uid"] = uid
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.CheckPerm(this.Ctx.Input.Param(":param"))
}

func (this *NoticeController) CheckPerm(url string) {

    fmt.Println(url)
    switch strings.Split(url, "/")[0] {
    case "create":
        this.Create()
    case "list":
        this.List()
    case "next":
        this.Next()
    case "delete":
        this.Delete()
    case "update":
        this.Update()
    case "firstpage":
        this.FirstPage()
    case "get":
        this.GetNotice()
    default:
        fmt.Println("default")
    }
}

func (this *NoticeController) Detail() {
    fmt.Println("detail")
    this.TplNames = "notice.html"
}

func (this *NoticeController) Get() {
    page_type := this.Ctx.Input.Param(":param")
    switch page_type {
    case "import_notices", "center_notices", "scindy_notices", "pride_notices", "device_notices", "competition_notices", "exp_notices", "invol_notices":
        this.Data["notice_title"] = page_type
        this.TplNames = "eelab_notice.html"
    default:
        this.Data["notice_id"] = page_type
        this.TplNames = "notice.html"
    }
}

func (this *NoticeController) GetNotice() {
    var err error
    var notice models.Notice

    notice.Id, err = this.GetInt("notice_id")
    err = notice.Read("Id")
    utils.YsError(this, &this.Data, err, "NoticeReadFailed")

    this.ret["notice"] = notice
    this.ServeJson()
}

func (this *NoticeController) Delete() {
    var err error
    var notice models.Notice

    notice.Id, err = this.GetInt("notice_id")
    err = notice.Delete()
    utils.YsError(this, &this.Data, err, "NoticeReadFailed")

    this.ret["notice"] = notice
    this.ServeJson()
}

func (this *NoticeController) Update() {
    var err error
    var notice models.Notice

    notice.Id, err = this.GetInt("notice_id")
    notice.Type, err = this.GetInt("type")
    notice.Desc = this.GetString("desc")
    notice.Title = this.GetString("title")
    notice.Content = this.GetString("content")
    notice.Status, _ = this.GetInt("status")

    err = notice.Update()
    fmt.Println(err)
    utils.YsError(this, &this.Data, err, "NoticeUpdateFailed")

    this.ret["notice"] = notice
    this.ServeJson()
}

func (this *NoticeController) Create() {
    var err error
    var notice models.Notice

    notice.Type, err = this.GetInt("type")
    notice.Title = this.GetString("title")
    notice.Desc = this.GetString("desc")
    notice.Content = this.GetString("content")
    notice.Status, _ = this.GetInt("status")

    err = notice.Insert()
    if err != nil {
        utils.YsError(this, &this.Data, err, "EMCREATEFAILED")
    }
    this.ret["notice"] = notice
    this.ServeJson()
}

func (this *NoticeController) List() {
    //var err error
    var notice models.Notice
    var notices []orm.Params

    typeId, _ := this.GetInt("type")

    notice.Query().Filter("Type", typeId).OrderBy("-created_time").Limit(20).Values(&notices, "id", "type", "title", "desc", "status", "created_time")
    count, _ := notice.Query().Filter("Type", typeId).Count()
    //utils.YsError(this, &this.Data, err, "MA_QUERY_FAILED")
    fmt.Println("emp list")
    this.ret["notices"] = notices
    this.ret["count"] = count
    this.ret["page"] = 1
    this.ServeJson()
}

func (this *NoticeController) Next() {
    var notice models.Notice
    var notices []orm.Params
    typeId, _ := this.GetInt("type")
    pageNumber, _ := this.GetInt("page")
    notice.Query().Filter("Type", typeId).OrderBy("-created_time").Limit(20, (pageNumber-1)*20).Values(&notices, "id", "type", "title", "desc", "status", "created_time")
    count, _ := notice.Query().Filter("Type", typeId).Count()
    this.ret["notices"] = notices
    this.ret["count"] = count
    this.ret["page"] = pageNumber
    this.ServeJson()
}

func (this *NoticeController) FirstPage() {
    var notice models.Notice
    var notices []orm.Params

    notice.Query().Filter("Status", 1).OrderBy("-created_time").Limit(10).Values(&notices, "id", "type", "title", "desc", "created_time")
    this.ret["notices"] = notices
    this.ServeJson()
}

func (this *NoticeController) Finish() {
}
