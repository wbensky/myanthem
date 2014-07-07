package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
    "time"
)

//Models Struct
type Profile struct {
    Id            int64  `json:"id"`
    Name          string `json:"name"`
    Email         string `json:"email"`
    Sex           string `json:"sex"`
    TelPhone      string `json:"telPhone"`
    JobTitle      string `json:"jobTitle"`
    StudentNumber string `json:"studentNumber"`
    Grade         int64  `json:"grade"`
    Major         int64  `json:"major"`
    Class         int64  `json:"class"`
    CreateTime    int64  `json:"createTime"`
    User          *User  `orm:"reverse(one)"`
}

func (m *Profile) GradeList() ([]orm.Params, error) {
    var lists []orm.Params
    _, err := orm.NewOrm().Raw("select distinct grade from profile").Values(&lists)
    return lists, err
}

func (m *Profile) ClassList() ([]orm.Params, error) {
    var lists []orm.Params
    _, err := orm.NewOrm().Raw("select distinct class from profile").Values(&lists)
    return lists, err
}

func (m *Profile) MajorList() ([]orm.Params, error) {
    var lists []orm.Params
    _, err := orm.NewOrm().Raw("select distinct major from profile").Values(&lists)
    return lists, err
}

func (m *Profile) Insert() error {
    m.CreateTime = time.Now().Unix()
    if _, err := orm.NewOrm().Insert(m); err != nil {
        return err
    }
    return nil
}

func (m *Profile) Read(fields ...string) error {
    if err := orm.NewOrm().Read(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Profile) Update(fields ...string) error {
    if _, err := orm.NewOrm().Update(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Profile) Delete() error {
    if _, err := orm.NewOrm().Delete(m); err != nil {
        return err
    }
    return nil
}

func (m *Profile) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}
