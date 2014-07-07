package models

import (
    //"fmt"
    "reflect"
    "strings"
    "time"
)

type Paper struct {
    Id          int64       `bson:"_id" json:"id"`
    CreatedId   int64       `bson:"CreatedId" json:"createdId"`
    Title       string      `bson:"Title" json:"title"`
    Type        string      `bson:"Type" json:"type"`
    CreatedTime int64       `bson:"CreatedTime"`
    ProjectId   int64       `bson:"ProjectId" json"projectId"`
    Description interface{} `bson:"Description" json:"description"`
    Questions   interface{} `bson:"Questions", json"body"`
}

func (this *Paper) Insert() error {
    this.CreatedTime = time.Now().Unix()
    return insertWithAutoIncId(this, &this.Id, mdb.C("Paper"))
}

func (this *Paper) Read(query ...string) error {
    q := make(map[string]interface{})
    vv := reflect.ValueOf(*this)
    for _, arg := range query {
        if strings.EqualFold("Id", arg) {
            q["_id"] = vv.FieldByName(arg).Interface()
            continue
        }
        q[arg] = vv.FieldByName(arg).Interface()
    }
    err := mdb.C("Paper").Find(q).One(this)
    return err
}

func (this *Paper) Update() error {
    err := mdb.C("Paper").UpdateId(this.Id, *this)
    return err
}

func (this *Paper) Delete() error {
    err := mdb.C("Paper").RemoveId(this.Id)
    return err
}

func (this *Paper) QueryByMap(m map[string]interface{}) (result []Paper, err error) {
    err = mdb.C("Paper").Find(m).All(&result)
    return result, nil
}
