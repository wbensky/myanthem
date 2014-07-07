package models

import (
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
)

type DeviceLibrary struct {
    Id       int64  `json:"id"`
    DeviceId int64  `json:"deviceid"`
    Number   string `json:"number" orm:"unique"`
    Status   string `json:"status"`
    IsIn     string `json:"isin"`
}

func (m *DeviceLibrary) Insert() error {
    if _, err := orm.NewOrm().Insert(m); err != nil {
        return err
    }
    return nil
}

func (m *DeviceLibrary) Read(fields ...string) error {
    if err := orm.NewOrm().Read(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *DeviceLibrary) Update(fields ...string) error {
    if _, err := orm.NewOrm().Update(m, fields...); err != nil {
        return err
    }
    return nil
}

func (m *DeviceLibrary) Delete() error {
    if _, err := orm.NewOrm().Delete(m); err != nil {
        return err
    }
    return nil
}

func (m *DeviceLibrary) Query() orm.QuerySeter {
    return orm.NewOrm().QueryTable(m)
}

/*
func (m *DeviceLibrary) List(device_id int64) ([]orm.Params, error) {
    var lists []orm.Params
    _, err := orm.NewOrm().Raw("select * from device where device_id = " + device_id)
    return lists, err
}
*/
