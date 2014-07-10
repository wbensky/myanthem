package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
)

type Table struct {
    Id   int64  `json:"id"`
    Type int64  `json:"type"`
    C1   string `json:"c1"`
    C2   string `json:"c2"`
    C3   string `json:"c3"`
    C4   string `json:"c4"`
    C5   string `json:"c5"`
    C6   string `json:"c6"`
}

func (m *Table) Insert() error {
    if _, err := orm.NewOrm().Insert(m); err != nil {
        return err
    }
    return nil
}

func (m *Table) Read(fields ...string) error {
    if err := orm.NewOrm().Read(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Table) Update(fields ...string) error {
    if _, err := orm.NewOrm().Update(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *Table) Delete() error {
    if _, err := orm.NewOrm().Delete(m); err != nil {
        return err
    }
    return nil
}

func (m *Table) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}
