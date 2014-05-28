package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
    "time"
)

type Score struct {
    Id          int64  `json:"id"`
    QuestionId  int64  `json:"questionId"`
    SnapId      int64  `json:"snapId"`
    Status      string `json:"status"`
    Score       int64  `json:"score"`
    CreatedTime int64  `json:"createTime"`
    StudentId   int64  `json:"studentId"`
}

func (m *Score) Insert() error {
    m.CreatedTime = time.Now().Unix()
    if _, err := orm.NewOrm().Insert(m); err != nil {
        return err
    }
    return nil
}

func (m *Score) Read(fields ...string) error {
    if err := orm.NewOrm().Read(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Score) Update(fields ...string) error {
    if _, err := orm.NewOrm().Update(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Score) Delete() error {
    if _, err := orm.NewOrm().Delete(m); err != nil {
        return err
    }
    return nil
}

func (m *Score) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}
