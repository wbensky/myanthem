package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    "fmt"
    "github.com/astaxie/beego"
    "github.com/astaxie/beego/orm"
    "time"
    //    "strings"
)

type DeviceController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *DeviceController) Prepare() {
    fmt.Println("Device")
    uid := this.GetSession("uid")
    this.ret = make(map[string]interface{})
    this.Data["uid"] = uid
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.CheckPerm(this.Ctx.Input.Param(":param"))
}

func (this *DeviceController) CheckPerm(url string) {
    switch url {
    case "create":
        this.Create()
    case "list":
        this.List()
    case "get":
        this.GetDevice()
    case "delete":
        this.Delete()
    case "update":
        this.Update()
    case "enter":
        this.Enter()
    case "numberlist":
        this.NumberList()
    case "loan":
        this.Loan()
    case "deletedevice":
        this.DeleteDevice()
    case "return":
        this.Return()
    case "record":
        this.Record()
    case "search":
        this.Search()
    }
}

func (this *DeviceController) Record() {
    var loan models.DeviceLoan
    var loans []*models.DeviceLoan

    loan.Query().Filter("Number", this.GetString("number")).All(&loans)
    this.ret["loans"] = loans
    this.ServeJson()
}

func (this *DeviceController) DeleteDevice() {
    var deviceL models.DeviceLibrary

    deviceL.Id, _ = this.GetInt("deviceLId")
    deviceL.Delete()
    this.ServeJson()
}

func (this *DeviceController) Enter() {
    var err error
    var deviceL models.DeviceLibrary

    deviceL.DeviceId, err = this.GetInt("device_id")
    utils.YsError(this, &this.Data, err, "DLNOID")
    deviceL.Number = this.GetString("number")
    deviceL.Status = this.GetString("status")
    deviceL.IsIn = "在库"

    err = deviceL.Insert()
    utils.YsError(this, &this.Data, err, "DLINSERTFAILED")
    this.ret["deviceL"] = deviceL
    this.ServeJson()
}
func (this *DeviceController) NumberList() {
    var deviceL models.DeviceLibrary
    var deviceLs []models.DeviceLibrary
    fmt.Print("")
    deviceL.DeviceId, _ = this.GetInt("device_id")
    deviceL.Query().Filter("device_id", deviceL.DeviceId).All(&deviceLs)
    this.ret["deviceLs"] = deviceLs
    this.ServeJson()
}

func (this *DeviceController) Loan() {
    var loan models.DeviceLoan
    var device models.DeviceLibrary

    device.Number = this.GetString("number")
    err := device.Read("Number")
    if err != nil {
        utils.YsStop(this, &this.Data, "NoDevice")
    }
    if device.IsIn == "借出" {
        this.ret["status"] = "loaned"
        this.ServeJson()
        return
    }
    loan.Number = device.Number
    loan.User = this.GetString("user")
    loan.Insert()
    device.IsIn = "借出"
    device.Update()
    this.ret["loan"] = loan
    this.ServeJson()
}
func (this *DeviceController) Return() {
    var loan models.DeviceLoan
    var device models.DeviceLibrary

    device.Number = this.GetString("number")
    err := device.Read("Number")
    if err != nil {
        this.ret["status"] = "NoDevice"
        this.ServeJson()
        return
    }

    loan.Number = device.Number
    loan.Return = 0
    err = loan.Read("Number", "Return")
    utils.YsError(this, &this.Data, err, "ReadFailed")
    loan.Return = time.Now().Unix()
    loan.Update()
    device.IsIn = "在库"
    device.Update()
    this.ret["loan"] = loan
    this.ServeJson()
}

func (this *DeviceController) Get() {
    this.Data["device_id"] = this.Ctx.Input.Param(":param")
    this.TplNames = "device.html"
}

func (this *DeviceController) GetDevice() {
    var err error
    var device models.Device

    device.Id, err = this.GetInt("device_id")
    err = device.Read("Id")
    utils.YsError(this, &this.Data, err, "DeviceReadFailed")

    this.ret["device"] = device
    this.ServeJson()
}

func (this *DeviceController) Delete() {
    var err error
    var device models.Device

    device.Id, err = this.GetInt("device_id")
    err = device.Delete()
    utils.YsError(this, &this.Data, err, "DeviceReadFailed")

    this.ret["device"] = device
    this.ServeJson()
}

func (this *DeviceController) Update() {
    var err error
    var device models.Device

    device.Id, err = this.GetInt("device_id")
    device.Name = this.GetString("name")
    device.Desc = this.GetString("desc")

    err = device.Update()
    utils.YsError(this, &this.Data, err, "DeviceUpdateFailed")

    this.ret["device"] = device
    this.ServeJson()
}

func (this *DeviceController) Create() {
    var err error
    var device models.Device

    device.Name = this.GetString("name")
    device.Desc = this.GetString("desc")

    err = device.Insert()
    if err != nil {
        utils.YsError(this, &this.Data, err, "EMCREATEFAILED")
    }
    this.ret["device"] = device
    this.ServeJson()
}

func (this *DeviceController) List() {
    //var err error
    var device models.Device
    lists, err := device.List()
    utils.YsError(this, &this.Data, err, "De_QUERY_FAILED")
    fmt.Println("emp list")
    this.ret["devices"] = lists
    this.ServeJson()
}
func (this *DeviceController) Search() {
    var device models.Device
    var devices []orm.Params
    device.Query().Filter("name__contains", this.GetString("name")).Values(&devices, "id", "name")
    this.ret["devices"] = devices
    this.ServeJson()
}

func (this *DeviceController) Finish() {
    models.CloseMgo()
}
