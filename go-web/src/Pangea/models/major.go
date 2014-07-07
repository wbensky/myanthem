package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
    "time"
)

type Major struct {
    Id          int64  `json:"id"`
    Desc        string `json:"desc"`
    Name        string `orm:"unique" json:"name"`
    CreatedTime int64  `json:"createTime"`
}

func (m *Major) Insert() error {
    m.CreatedTime = time.Now().Unix()
    if _, err := orm.NewOrm().Insert(m); err != nil {
        return err
    }
    return nil
}

func (m *Major) Read(fields ...string) error {
    if err := orm.NewOrm().Read(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Major) Update(fields ...string) error {
    if _, err := orm.NewOrm().Update(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Major) Delete() error {
    if _, err := orm.NewOrm().Delete(m); err != nil {
        return err
    }
    return nil
}

func (m *Major) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}
