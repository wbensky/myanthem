package controllers

/*
import (
    "Pangea/models"
    //"encoding/json"
    //"fmt"
    "github.com/astaxie/beego"
    "strings"
)

type PermissionController struct {
    beego.Controller
    ret map[string]interface{}
}

// only admin can though check
func (this *PermissionController) Prepare() {
    uid := this.GetSession("uid")
    this.ret = make(map[string]interface{})
    if uid == nil {
        this.ret["status"] = "CF_NO_LOGIN"
        this.Data["json"] = &this.ret
        this.ServeJson()
        this.StopRun()
    }
    this.Data["uid"] = uid
}

func (this *PermissionController) CreateGroup() {
    group := &models.Group{}
    group.Name = this.GetString("name")
    group.Desc = this.GetString("desc")
    if strings.EqualFold("", group.Name) {
        this.ret["status"] = "NO_NAME"
        this.Data["json"] = &this.ret
        this.ServeJson()
        return
    }
    err := group.Insert()
    if err != nil {
        this.ret["status"] = "UNKNOW_ERROR"
        this.Data["json"] = &this.ret
        this.ServeJson()
        return
    }
    var modules []*models.Module
    var module models.Module
    num, err := module.Query().All(&modules)
    if err != nil {
        this.ret["status"] = "UNKNOW_ERROR"
        this.Data["json"] = &this.ret
        this.ServeJson()
        return
    }
    var i int64
    for i = 0; i < num; i++ {
        p := models.GroupPermission{ModuleId: modules[i].Id,
            Permission: 15,
            GroupId:    group.Id}
        err = p.Insert()
        if err != nil {
            this.ret["status"] = "UNKNOW_ERROR"
            this.Data["json"] = &this.ret
            this.ServeJson()
            return
        }
    }
    this.ret["status"] = "SUCCESS"
    this.ret["group"] = group
    this.Data["json"] = &this.ret
    this.ServeJson()
}
func (this *PermissionController) ADDUserToGroup() {
    var err error
    userGroup := &models.UserGroup{}
    userGroup.UserId, err = this.GetInt("userId")
    userGroup.GroupId, err = this.GetInt("groupId")
    if userGroup.UserId == 0 || userGroup.GroupId == 0 {
        this.ret["status"] = "NO_ID"
        this.Data["json"] = &this.ret
        this.ServeJson()
        return
    }
    err = userGroup.Insert()
    if err != nil {
        this.ret["status"] = "UNKNOW_ERROR"
        this.Data["json"] = &this.ret
        this.ServeJson()
        return
    }
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.ServeJson()
}

func (this *PermissionController) DeleteUserFromGroup() {
    var err error
    userGroup := &models.UserGroup{}
    userGroup.Id, err = this.GetInt("userGroupId")
    if userGroup.Id == 0 {
        this.ret["status"] = "NO_ID"
        this.Data["json"] = &this.ret
        this.ServeJson()
        return
    }
    err = userGroup.Delete()
    if err != nil {
        this.ret["status"] = "UNKNOW_ERROR"
        this.Data["json"] = &this.ret
        this.ServeJson()
        return
    }
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.ServeJson()
}

func (this *PermissionController) AddPermission() {
    permissionId, _ := this.GetInt("permissionId")
    permission, err := this.GetInt("permission")
    if permissionId == 0 || err != nil {
        this.ret["status"] = "NO_ID"
        this.Data["json"] = &this.ret
        return
    }
    p := &models.GroupPermission{Id: permissionId}
    if p.Read() == nil {
        p.Permission = p.Permission | permission
        if p.Update() == nil {
            this.ret["status"] = "SUCCESS"
            this.Data["json"] = &this.ret
            this.ServeJson()
            return
        }
    }
    this.ret["status"] = "FAIL"
    this.Data["json"] = &this.ret
    this.ServeJson()
    return
}

func (this *PermissionController) DeletePermission() {
    permissionId, _ := this.GetInt("permissionId")
    permission, err := this.GetInt("permission")
    if permissionId == 0 || err != nil {
        this.ret["status"] = "NO_ID"
        this.Data["json"] = &this.ret
        return
    }
    p := &models.GroupPermission{Id: permissionId}
    if p.Read() == nil {
        p.Permission = p.Permission & (^permission)
        if p.Update() == nil {
            this.ret["status"] = "SUCCESS"
            this.Data["json"] = &this.ret
            this.ServeJson()
            return
        }
    }
    this.ret["status"] = "FAIL"
    this.Data["json"] = &this.ret
    this.ServeJson()
    return
}

func (this *PermissionController) List() {
}

func (this *PermissionController) Finish() {
}
*/
