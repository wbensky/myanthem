package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql" // import your used driver
    "time"
)

// Model Struct
type User struct {
    Id       int64    `json:"id"`
    IdNumber string   `json "idnumber"`
    Username string   `json:"username"`
    Password string   `json:"-"`
    Role     string   `json:"role"`
    Date     int64    `json:"date"`
    Profile  *Profile `orm:"rel(one)"`
}

func (m *User) Insert() error {
    m.Date = time.Now().Unix()
    if _, err := orm.NewOrm().Insert(m); err != nil {
        return err
    }
    return nil
}

func (m *User) Read(fields ...string) error {
    if err := orm.NewOrm().Read(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *User) Update(fields ...string) error {
    if _, err := orm.NewOrm().Update(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *User) Delete() error {
    if _, err := orm.NewOrm().Delete(m); err != nil {
        return err
    }
    return nil
}

func (m *User) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}
