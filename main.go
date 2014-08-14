package main

import (
	_ "edurun/routers"
	"github.com/astaxie/beego"
)

func main() {
    beego.SetStaticPath("/static", "static") 
    beego.SetStaticPath("/img", "static/img") 
    beego.SetStaticPath("/js", "static/js") 
    beego.SetStaticPath("/css", "static/css") 
    beego.SetStaticPath("/color", "static/color") 
    beego.SetStaticPath("/fonts", "static/fonts") 
	beego.Run()
}

