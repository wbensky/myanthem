package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    "fmt"
    "github.com/astaxie/beego"
    //    "strings"
)

type EmployeeController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *EmployeeController) Prepare() {
    fmt.Println("Employee")
    uid := this.GetSession("uid")
    this.ret = make(map[string]interface{})
    this.Data["uid"] = uid
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.CheckPerm(this.Ctx.Input.Param(":param"))
}

func (this *EmployeeController) CheckPerm(url string) {
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

func (this *EmployeeController) Get() {
    var err error
    var employee models.Employee

    employee.Id, err = this.GetInt("employee_id")
    err = employee.Read("Id")
    utils.YsError(this, &this.Data, err, "EmployeeReadFailed")

    this.ret["employee"] = employee
    this.ServeJson()
}

func (this *EmployeeController) Delete() {
    var err error
    var employee models.Employee

    employee.Id, err = this.GetInt("employee_id")
    err = employee.Delete()
    utils.YsError(this, &this.Data, err, "EmployeeReadFailed")

    this.ret["employee"] = employee
    this.ServeJson()
}

func (this *EmployeeController) Update() {
    var err error
    var employee models.Employee

    employee.Id, err = this.GetInt("employee_id")
    employee.Name = this.GetString("name")
    employee.Number, err = this.GetInt("number")
    employee.Sex, err = this.GetInt("sex")
    employee.Birth = this.GetString("birth")
    employee.Degree = this.GetString("degree")
    employee.Post = this.GetString("post")
    employee.MajorPost = this.GetString("majorpost")
    employee.Course = this.GetString("course")
    employee.IsFullTime = this.GetString("isfulltime")

    err = employee.Update()
    utils.YsError(this, &this.Data, err, "EmployeeUpdateFailed")

    this.ret["employee"] = employee
    this.ServeJson()
}

func (this *EmployeeController) Create() {
    var err error
    var employee models.Employee

    employee.Name = this.GetString("name")
    employee.Number, err = this.GetInt("number")
    employee.Sex, err = this.GetInt("sex")
    employee.Birth = this.GetString("birth")
    employee.Degree = this.GetString("degree")
    employee.Post = this.GetString("post")
    employee.MajorPost = this.GetString("majorpost")
    employee.Course = this.GetString("course")
    employee.IsFullTime = this.GetString("isfulltime")

    err = employee.Insert()
    if err != nil {
        utils.YsError(this, &this.Data, err, "EMCREATEFAILED")
    }
    this.ret["employee"] = employee
    this.ServeJson()
}

func (this *EmployeeController) List() {
    //var err error
    var employee models.Employee
    var employees []*models.Employee
    employee.Query().All(&employees)
    //utils.YsError(this, &this.Data, err, "MA_QUERY_FAILED")
    fmt.Println("emp list")
    this.ret["employees"] = employees
    this.ServeJson()
}

func (this *EmployeeController) Finish() {
    models.CloseMgo()
}
