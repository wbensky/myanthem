package main

import (
    _ "Pangea/models"
    _ "Pangea/routers"
    "github.com/astaxie/beego"
    "github.com/astaxie/beego/logs"
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
)

func init() {
    orm.RegisterDriver("mysql", orm.DR_MySQL)
    orm.RegisterDataBase("defautl", "mysql", "root@mydb?charset=utf8")

}

func main() {
    beego.EnableXSRF = false
    log := logs.NewLogger(10000)
    log.SetLogger("file", `{"filename":"test.log"}`)
    log.EnableFuncCallDepth(true)
    beego.SetStaticPath("/static", "static")
    beego.SetStaticPath("/css", "static/css")
    beego.SetStaticPath("/js", "static/js")
    beego.SetStaticPath("/img", "static/img")
    beego.SetStaticPath("/theme", "static/theme")
    orm.Debug = true
    orm.RunSyncdb("default", false, false)
    beego.Run()
}
