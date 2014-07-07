package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
    "time"
)

type DeviceLoan struct {
    Id       int64  `json:"id"`
    User     string `json:"user"`
    LoanTime int64  `json:"loantime"`
    Return   int64  `json:"returntime"`
    Number   string `json:"number"`
}

func (this *DeviceLoan) Insert() error {
    this.LoanTime = time.Now().Unix()
    _, err := orm.NewOrm().Insert(this)
    return err
}

func (this *DeviceLoan) Read(fields ...string) error {
    return orm.NewOrm().Read(this, fields...)
}

func (this *DeviceLoan) Update(fields ...string) error {
    _, err := orm.NewOrm().Update(this, fields...)
    return err
}

func (this *DeviceLoan) Delete() error {
    _, err := orm.NewOrm().Delete(this)
    return err
}

func (this *DeviceLoan) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(this)
}
