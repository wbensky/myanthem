package models

import (
    //    "fmt"
    //    "labix.org/v2/mgo/bson"
    "reflect"
    "strings"
    "time"
)

type Project struct {
    Id          int64  `bson:"_id" json:"id"`
    CreatedId   int64  `bson:"CreatedId" json:"createdId"`
    Title       string `bson:"Title" json:"title"`
    Type        string `bson:"Type" json:"type"`
    CreatedTime int64  `bson:"CreatedTime" json:"createdTime"`
    State       int    `bson:"State" json:"state"` // 0 no store 1 store
    ClassType   string `bson:"ClassType" json:"ClassType"`
    Desc        string `bson:"Desc" json:"desc"`
}

func (this *Project) Insert() error {
    this.CreatedTime = time.Now().Unix()
    return insertWithAutoIncId(this, &this.Id, mdb.C("Project"))
}

func (this *Project) Read(query ...string) error {
    q := make(map[string]interface{})
    vv := reflect.ValueOf(*this)
    for _, arg := range query {
        if strings.EqualFold("Id", arg) {
            q["_id"] = vv.FieldByName(arg).Interface()
            continue
        }
        q[arg] = vv.FieldByName(arg).Interface()
    }

    err := mdb.C("Project").Find(q).One(this)
    return err
}

func (this *Project) Update() error {
    err := mdb.C("Project").UpdateId(this.Id, *this)
    return err
}

func (this *Project) Delete() error {
    err := mdb.C("Project").RemoveId(this.Id)
    return err
}

func (this *Project) QueryByMap(m map[string]interface{}) (result []Project, err error) {
    err = mdb.C("Project").Find(m).All(&result)
    return result, nil
}
