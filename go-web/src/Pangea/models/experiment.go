package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql" // import your used driver
)

// Model Struct
type Experiment struct {
    Id       int    `json:"_id"`
    User     *User  `orm:"rel(fk)"`
    LessonId int    `json:"lession"`
    State    string `json:"state"`
    Title    string `json:"title"`
}

func (m *Experiment) Insert() error {
    if _, err := orm.NewOrm().Insert(m); err != nil {
        return err
    }
    return nil
}

func (m *Experiment) Read(fields ...string) error {
    if err := orm.NewOrm().Read(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Experiment) Update(fields ...string) error {
    if _, err := orm.NewOrm().Update(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Experiment) Delete() error {
    if _, err := orm.NewOrm().Delete(m); err != nil {
        return err
    }
    return nil
}

func (m *Experiment) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}
