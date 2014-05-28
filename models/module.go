package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql" // import your used driver
)

// permission  module
type Module struct {
    Id   int64  `json:"Id"`
    Name string `json:"name"`
    Desc string `json:"desc"`
}

func (m *Module) Insert() error {
    _, err := orm.NewOrm().Insert(m)
    return err
}

func (m *Module) Read(fields ...string) error {
    err := orm.NewOrm().Read(m, fields...)
    return err
}

func (m *Module) Update(fields ...string) error {
    _, err := orm.NewOrm().Update(m, fields...)
    return err
}

func (m *Module) Delete() error {
    _, err := orm.NewOrm().Delete(m)
    return err
}

func (m *Module) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}
