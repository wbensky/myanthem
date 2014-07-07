package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
)

type LessonSystem struct {
    Id       int64  `json:"id"`
    SDesc    string `json:"sdesc"`
    Outline  string `json:"outline"`
    Plan     string `json:"plan"`
    Content  string `json:"content"`
    Practice string `json:"practice"`
    Video    string `json:"video"`
}

func (m *LessonSystem) Insert() error {
    if _, err := orm.NewOrm().Insert(m); err != nil {
        return err
    }
    return nil
}

func (m *LessonSystem) Read(fields ...string) error {
    if err := orm.NewOrm().Read(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *LessonSystem) Update(fields ...string) error {
    if _, err := orm.NewOrm().Update(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *LessonSystem) Delete() error {
    if _, err := orm.NewOrm().Delete(m); err != nil {
        return err
    }
    return nil
}

func (m *LessonSystem) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}
