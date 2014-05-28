package models

import (
    //    "fmt"
    "reflect"
    "strings"
    "time"
)

type Question struct {
    Id          int64       `bson:"_id" json:"id"`
    CreatedId   int64       `bson:"CreatedId" json:"createdId"`
    Title       string      `bson:"Title" json:"title"`
    Type        string      `bson:"Type" json:"type"`
    Body        interface{} `bson:"Body"`
    State       int64       `bson:"State" json"state"`
    CreatedTime int64       `bson:"CreatedTime"`
    Parent      int64       `bson:"Parent" json:"parent"`
}

func (this *Question) Insert() error {
    this.CreatedTime = time.Now().Unix()
    return insertWithAutoIncId(this, &this.Id, mdb.C("Question"))
}

func (this *Question) Read(query ...string) error {
    q := make(map[string]interface{})
    vv := reflect.ValueOf(*this)
    for _, arg := range query {
        if strings.EqualFold("Id", arg) {
            q["_id"] = vv.FieldByName(arg).Interface()
            continue
        }
        q[arg] = vv.FieldByName(arg).Interface()
    }
    err := mdb.C("Question").Find(q).One(this)
    return err
}

func (this *Question) Update(update interface{}) error {
    err := mdb.C("Question").UpdateId(this.Id, update)
    return err
}

func (this *Question) Delete() error {
    err := mdb.C("Question").RemoveId(this.Id)
    return err
}

func (this *Question) QueryByMap(m map[string]interface{}) (result []Question, err error) {
    err = mdb.C("Question").Find(m).All(&result)
    return result, nil
}
