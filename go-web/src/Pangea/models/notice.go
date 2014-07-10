package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
    "time"
)

type Notice struct {
    Id          int64  `json:"id"`
    Type        int64  `json:"type"`
    Title       string `json:"title"`
    Content     string `json:"content"`
    Desc        string `json:"desc"`
    Status      int64  `json:"status"`
    CreatedTime int64  `json:"createdtime"`
}

func (m *Notice) Insert() error {
    m.CreatedTime = time.Now().Unix()
    if _, err := orm.NewOrm().Insert(m); err != nil {
        return err
    }
    return nil
}

func (m *Notice) Read(fields ...string) error {
    if err := orm.NewOrm().Read(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Notice) Update(fields ...string) error {
    if _, err := orm.NewOrm().Update(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Notice) Delete() error {
    if _, err := orm.NewOrm().Delete(m); err != nil {
        return err
    }
    return nil
}

func (m *Notice) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}
