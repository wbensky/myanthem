package models

import (
    //"labix.org/v2/mgo"
    //    "fmt"
    "reflect"
    "strings"
    "time"
)

// Model Struct
type ProColl struct {
    Id          int64       `bson:"_id" json:"id"`
    CreatedId   int64       `bson:"CreatedId" json:"createdId"`
    LessonId    int64       `json:"lesson" bson:"LessonId"`
    State       int64       `json:"state" bson:"State"`
    Type        string      `json:"type" bson:"Type"`
    Title       string      `json:"title" bson:"Title"`
    Questions   interface{} `json:"questions" bson:"Questions"`
    CreatedTime int64       `json:"createdTime" bson:"CreatedTime"`
}

func init() {
}

func (this *ProColl) Insert() error {
    this.CreatedTime = time.Now().Unix()
    return insertWithAutoIncId(this, &this.Id, mdb.C("ProColl"))
}

func (m *ProColl) Read(query ...string) error {
    q := make(map[string]interface{})
    vv := reflect.ValueOf(*m)
    for _, arg := range query {
        if strings.EqualFold("Id", arg) {
            q["_id"] = vv.FieldByName(arg).Interface()
            continue
        }
        q[arg] = vv.FieldByName(arg).Interface()
    }
    err := mdb.C("ProColl").Find(q).One(m)
    return err
}

func (m *ProColl) Update(update interface{}) error {
    err := mdb.C("ProColl").UpdateId(m.Id, update)
    return err
}

func (m *ProColl) Delete() error {
    err := mdb.C("ProColl").RemoveId(m.Id)
    return err
}

func (m *ProColl) Query(query ...string) (result []ProColl, err error) {
    q := make(map[string]interface{})
    vv := reflect.ValueOf(m)

    for _, arg := range query {
        if strings.EqualFold(arg, "Id") {
            q["_id"] = vv.FieldByName(arg).Interface()
            continue
        }
        q[arg] = vv.FieldByName(arg).Interface()
    }
    err = mdb.C("ProColl").Find(q).All(&result)
    return result, err
}

func (m *ProColl) QueryByMap(ma map[string]interface{}) (result []ProColl, err error) {
    err = mdb.C("ProColl").Find(ma).All(&result)
    return result, err
}
