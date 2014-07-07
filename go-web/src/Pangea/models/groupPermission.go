package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql" // import your used driver
)

// 1create 2 delete 4update 8 query
type UserPermission struct {
    Id         int64  `json:"Id"`
    Role       string `json:"groupId"`
    Permission string `json:"permission"`
    Desc       string `json:"desc"`
}

func (m *UserPermission) Insert() error {
    _, err := orm.NewOrm().Insert(m)
    return err
}

func (m *UserPermission) Read(fields ...string) error {
    err := orm.NewOrm().Read(m, fields...)
    return err
}

func (m *UserPermission) Update(fields ...string) error {
    _, err := orm.NewOrm().Update(m, fields...)
    return err
}

func (m *UserPermission) Delete() error {
    _, err := orm.NewOrm().Delete(m)
    return err
}

func (m *UserPermission) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}

func (m *UserPermission) GetPermission(uid int64, permission string) bool {
    var user User
    var err error
    user.Id = uid
    err = user.Read("Id")
    if err != nil {
        return false
    }
    m.Role = user.Role
    m.Permission = permission
    err = orm.NewOrm().Read(m, "Role", "Permission")
    if err != nil {
        return false
    }
    return true
}

/*
func getPermission(moduleName string, uid int64, permission string) bool {
    var p int64
    switch permission {
    case "create":
        p = 1
    case "delete":
        p = 2
    case "update":
        p = 4
    case "query":
        p = 8
    }
    var userUser UserUser
    var userUsers []*UserUser
    num, err := userUser.Query().Filter("UserId", uid).All(&userUsers)

    if err != nil {
        return false
    }
    module := &Module{Name: moduleName}
    if module.Read("Name") != nil {
        return false
    }
    var i int64
    var gp UserPermission
    for i = 0; i < num; i++ {
        gp.ModuleId = module.Id
        gp.UserId = userUsers[i].Id
        err = gp.Read("UserId", "ModuleId")
        if err == nil {
            if (gp.Permission & p) != 0 {
                return true
            }
            return false
        }
    }
    return false
}*/
