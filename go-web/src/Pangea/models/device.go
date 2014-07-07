package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
)

type Device struct {
    Id   int64  `json:"id"`
    Name string `orm:"unique" json:"name"`
    Desc string `json:"desc"`
}

func (m *Device) Insert() error {
    if _, err := orm.NewOrm().Insert(m); err != nil {
        return err
    }
    return nil
}

func (m *Device) Read(fields ...string) error {
    if err := orm.NewOrm().Read(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Device) Update(fields ...string) error {
    if _, err := orm.NewOrm().Update(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Device) Delete() error {
    if _, err := orm.NewOrm().Delete(m); err != nil {
        return err
    }
    return nil
}

func (m *Device) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}

func (m *Device) List() ([]orm.Params, error) {
    var lists []orm.Params
    _, err := orm.NewOrm().Raw("select id, name from device").Values(&lists)
    return lists, err
}
