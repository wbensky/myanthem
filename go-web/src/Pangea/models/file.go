package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
)

type File struct {
    Id       int64  `json:"id"`
    Type     int64  `json:"type"`
    Name     string `json:"name"`
    Filename string `json:"filename"`
}

func (m *File) Insert() error {
    if _, err := orm.NewOrm().Insert(m); err != nil {
        return err
    }
    return nil
}

func (m *File) Read(fields ...string) error {
    if err := orm.NewOrm().Read(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *File) Update(fields ...string) error {
    if _, err := orm.NewOrm().Update(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *File) Delete() error {
    if _, err := orm.NewOrm().Delete(m); err != nil {
        return err
    }
    return nil
}
func (m *File) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}
