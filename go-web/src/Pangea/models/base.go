package models

import (
    "crypto/md5"
    "fmt"
    "github.com/astaxie/beego"
    "github.com/astaxie/beego/orm"
    _ "github.com/go-sql-driver/mysql"
    "labix.org/v2/mgo"
    "net/url"
    "strings"
    //    "time"
)

// init mysql, include host user  and table
func init() {
    dbhost := beego.AppConfig.String("dbhost")
    dbport := beego.AppConfig.String("dbport")
    dbuser := beego.AppConfig.String("dbuser")
    dbpassword := beego.AppConfig.String("dbpassword")
    dbname := beego.AppConfig.String("dbname")
    if dbport == "" {
        dbport = "3306"
    }
    dsn := dbuser + ":" + dbpassword + "@" + dbhost + "/" + dbname + "?charset=utf8&allowOldPasswords=1"
    orm.RegisterDataBase("default", "mysql", dsn)
    orm.RegisterModel(new(User))
    orm.RegisterModel(new(UserPermission))
    orm.RegisterModel(new(Module))
    orm.RegisterModel(new(Profile))
    orm.RegisterModel(new(Major))
    orm.RegisterModel(new(Score))
    orm.RegisterModel(new(Employee))
    orm.RegisterModel(new(Device))
    orm.RegisterModel(new(DeviceLibrary))
    orm.RegisterModel(new(Table))
    orm.RegisterModel(new(Notice))
    orm.RegisterModel(new(File))
    orm.RegisterModel(new(DeviceLoan))
}

// ---------- init mongo -----------
var sess *mgo.Session
var mdb *mgo.Database

func InitMgo() {
    sess, _ = mgo.Dial("")
    sess.SetMode(mgo.Monotonic, true)
    mdb = sess.DB("local")
}

func insertWithAutoIncId(docs interface{}, Id *int64, coll *mgo.Collection) error {
    maxId, err := coll.Find(nil).Count()
    for i := 1; i < 5; i++ {
        *Id = int64(maxId + i)
        err = coll.Insert(docs)
        if err == nil {
            break
        }
        if strings.Contains(err.Error(), "E11000") == false {
            break
        }
    }
    return err
}

func CloseMgo() {
    if sess != nil {
        sess.Close()
    }
}

//------password encrpt -------
func Md5(buf []byte) string {
    hash := md5.New()
    hash.Write(buf)
    return fmt.Sprintf("%x", hash.Sum(nil))
}

func Rawurlencode(str string) string {
    return strings.Replace(url.QueryEscape(str), "+", "%20", -1)
}

//返回带前缀的表名
func TableName(str string) string {
    return fmt.Sprintf("%s%s", beego.AppConfig.String("dbprefix"), str)
}
