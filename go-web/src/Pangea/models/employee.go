package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
)

type Employee struct {
    Id         int64  `json:"id"`
    Name       string `orm:"unique" json:"name"`
    Sex        int64  `orm:"unique" json:"sex"`
    Number     int64  `orm:"unique" json:"number"`
    Birth      string `json:"birth"`
    Degree     string `json:"degree"`
    Post       string `json:"post"`
    MajorPost  string `json:"majorpost"`
    Course     string `json:"course"`
    IsFullTime string `json:"isfulltime"`
}

func (m *Employee) Insert() error {
    if _, err := orm.NewOrm().Insert(m); err != nil {
        return err
    }
    return nil
}

func (m *Employee) Read(fields ...string) error {
    if err := orm.NewOrm().Read(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Employee) Update(fields ...string) error {
    if _, err := orm.NewOrm().Update(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Employee) Delete() error {
    if _, err := orm.NewOrm().Delete(m); err != nil {
        return err
    }
    return nil
}

func (m *Employee) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}
