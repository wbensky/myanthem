package utils

import (
    "Pangea/models"
    //    "github.com/astaxie/beego/logs"
    "regexp"
    "sort"
)

var ySFilterRegex map[string]string
var ySWF map[string]string

func init() {
    ySFilterRegex = map[string]string{"email": `^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$`,
        "id":       "^[0-9]{1,20}$",
        "num":      `^[0-9\.]{1,10}$`,
        "password": "^(.){6,30}$",
        "username": `^\w[a-zA-Z0-9_]{3,30}$`,
        "tag":      "^[ a-zA-Z0-9_-]{1,20}$",
        "title":    "^.{1,50}$"}
    ySWF = map[string]string{"username": "WF_USERNAME",
        "id":       "WF_ID",
        "num":      "WF_NUM",
        "password": "WF_PASSWD",
        "email":    "WF_EMAIL",
        "tag":      "WF_TAGS",
        "title":    "WF_TITLE"}
}

func YSCheckRegex(key, value string) (ret bool, ret1 string) {
    reg, err := ySFilterRegex[key]
    if err == false {
        return false, "No Key"
    }
    match, _ := regexp.MatchString(reg, value)
    if match == true {
        return true, ""
    } else {
        return false, ySWF[key]
    }
}

func YsSortString(str string) string {
    nums := make([]int, len(str))
    var result string
    var i int
    for i = 0; i < len(str); i++ {
        nums[i] = int(str[i])
    }

    sort.Sort(sort.IntSlice(nums))
    for i = 0; i < len(nums); i++ {
        result += string(byte(nums[i]))
    }
    return result
}

type YSBeegoController interface {
    StopRun()
    ServeJson(enconding ...bool)
}

func YsError(controller YSBeegoController, d *map[interface{}]interface{}, err error, errCode ...string) {
    if err == nil {

        return
    }
    ret := make(map[string]interface{})
    ret["status"] = errCode[0]
    (*d)["json"] = &ret
    models.CloseMgo()
    controller.ServeJson()
    controller.StopRun()
}

func YsStop(controller YSBeegoController, d *map[interface{}]interface{}, errCode ...string) {
    ret := make(map[string]interface{})

    ret["status"] = errCode[0]
    (*d)["json"] = &ret
    models.CloseMgo()
    controller.ServeJson()
    controller.StopRun()
}
