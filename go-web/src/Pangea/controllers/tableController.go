package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    "fmt"
    "github.com/astaxie/beego"
    //    "strings"
)

type TableController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *TableController) Prepare() {
    fmt.Println("Table")
    uid := this.GetSession("uid")
    this.ret = make(map[string]interface{})
    this.Data["uid"] = uid
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.CheckPerm(this.Ctx.Input.Param(":param"))
}

func (this *TableController) CheckPerm(url string) {
    switch url {
    case "create":
        this.Create()
    case "list":
        this.List()
    case "get":
        this.Get()
    case "delete":
        this.Delete()
    case "update":
        this.Update()
    }
}

func (this *TableController) Get() {
    var err error
    var table models.Table

    table.Id, err = this.GetInt("table_id")
    err = table.Read("Id")
    utils.YsError(this, &this.Data, err, "TableReadFailed")

    this.ret["table"] = table
    this.ServeJson()
}

func (this *TableController) Delete() {
    var err error
    var table models.Table

    table.Id, err = this.GetInt("table_id")
    err = table.Delete()
    utils.YsError(this, &this.Data, err, "TableReadFailed")

    this.ret["table"] = table
    this.ServeJson()
}

func (this *TableController) Update() {
    var err error
    var table models.Table

    table.Id, err = this.GetInt("table_id")
    table.Type, err = this.GetInt("type")
    table.C1 = this.GetString("c1")
    table.C2 = this.GetString("c2")
    table.C3 = this.GetString("c3")
    table.C4 = this.GetString("c4")
    table.C5 = this.GetString("c5")
    table.C6 = this.GetString("c6")

    err = table.Update()
    fmt.Println(err)
    utils.YsError(this, &this.Data, err, "TableUpdateFailed")

    this.ret["table"] = table
    this.ServeJson()
}

func (this *TableController) Create() {
    var err error
    var table models.Table

    table.Type, err = this.GetInt("type")
    table.C1 = this.GetString("c1")
    table.C2 = this.GetString("c2")
    table.C3 = this.GetString("c3")
    table.C4 = this.GetString("c4")
    table.C5 = this.GetString("c5")
    table.C6 = this.GetString("c6")

    err = table.Insert()
    if err != nil {
        utils.YsError(this, &this.Data, err, "EMCREATEFAILED")
    }
    this.ret["table"] = table
    this.ServeJson()
}

func (this *TableController) List() {
    //var err error
    var table models.Table
    var tables []*models.Table

    typeId, _ := this.GetInt("type")

    table.Query().Filter("Type", typeId).All(&tables)
    //utils.YsError(this, &this.Data, err, "MA_QUERY_FAILED")
    fmt.Println("emp list")
    this.ret["tables"] = tables
    this.ServeJson()
}

func (this *TableController) Finish() {
    models.CloseMgo()
}
