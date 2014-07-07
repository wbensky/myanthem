package main

import (
    _ "Pangea/models"
    _ "Pangea/routers"
    "fmt"
    "github.com/astaxie/beego"
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
    "labix.org/v2/mgo"
)

func init() {
    orm.RegisterDriver("mysql", orm.DR_MySQL)
    orm.RegisterDataBase("defautl", "mysql", "root@mydb?charset=utf8")

}

func main() {
    var err error
    beego.EnableXSRF = false
    orm.Debug = true
    orm.RunSyncdb("default", false, false)
    sess, _ := mgo.Dial("")
    sess.SetMode(mgo.Monotonic, true)
    mdb := sess.DB("eelab")
    col := mdb.C("account")
    var result []interface{}
    err = col.Find(nil).All(&result)
    if err != nil {
        fmt.Println(err.Error())
    }
    for i, _ := range result {
        fmt.Println(result[i])
    }
}
